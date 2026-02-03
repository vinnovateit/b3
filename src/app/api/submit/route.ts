import { prisma } from "@/lib/prisma";
import { validateSubmissionLinks } from "@/lib/validators";
import { errorResponse, successResponse, parseJsonBody, logRequest, logResponse } from "@/lib/api-helpers";
import { auth } from "@/auth";
import type { NextRequest } from "next/server";
import type { NextResponse } from "next/server";

interface SubmissionRequest {
  projectTitle:string;
  projectDescription:string;
  track:string;
  teamId: string;
  roundNo?: number;
  githubLink?: string | null;
  figmaLink?: string | null;
  pptLink?: string | null;
  otherLinks?: string | null;
  progressNote?: string | null;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();

  try {
    logRequest("POST", "/api/submit");

    // Get authenticated user
    const session = await auth();
    if (!session?.user?.email) {
      logResponse("POST", "/api/submit", 401, Date.now() - startTime);
      return errorResponse("Unauthorized", 401);
    }

    // Parse request body
    const body = await parseJsonBody(request);

    // Validate request structure
    const submissionData = body as SubmissionRequest;

    if (!submissionData.teamId || typeof submissionData.teamId !== "string") {
      logResponse("POST", "/api/submit", 400);
      return errorResponse("teamId is required and must be a string", 400);
    }

    if (
      typeof submissionData.roundNo !== "number" ||
      !Number.isInteger(submissionData.roundNo) ||
      submissionData.roundNo < 1 ||
      submissionData.roundNo > 3
    ) {
      logResponse("POST", "/api/submit", 400);
      return errorResponse("roundNo must be an integer between 1 and 3", 400);
    }

    // Verify team exists and user is a member
    const team = await prisma.team.findUnique({
      where: { id: submissionData.teamId },
      include: {
        users: {
          where: { email: session.user.email },
          select: { id: true },
        },
      },
    });

    if (!team) {
      logResponse("POST", "/api/submit", 404, Date.now() - startTime);
      return errorResponse("Team not found", 404);
    }

    // Check if user is a team member
    if (team.users.length === 0) {
      logResponse("POST", "/api/submit", 403, Date.now() - startTime);
      return errorResponse("You are not a member of this team", 403);
    }

    // Validate submission links
    const validation = validateSubmissionLinks({
      githubLink: submissionData.githubLink,
      figmaLink: submissionData.figmaLink,
      pptLink: submissionData.pptLink,
      otherLinks: submissionData.otherLinks,
    });

    if (!validation.isValid) {
      logResponse("POST", "/api/submit", 400, Date.now() - startTime);
      return errorResponse("Invalid submission links", 400, validation.errors);
    }

    // Update team with cleaned links
    const progressFieldByRound: Record<number, "round1Progress" | "round2Progress" | "round3Progress"> = {
      1: "round1Progress",
      2: "round2Progress",
      3: "round3Progress",
    };

    const progressField = progressFieldByRound[submissionData.roundNo];
    const progressNote = submissionData.progressNote?.trim() || "";

    await prisma.team.update({
      where: { id: submissionData.teamId },
      data: {
        githubLink: validation.cleanedLinks.githubLink || null,
        figmaLink: validation.cleanedLinks.figmaLink || null,
        pptLink: validation.cleanedLinks.pptLink || null,
        otherLinks: validation.cleanedLinks.otherLinks || null,
        [progressField]: progressNote || null,
      },
    });

    logResponse("POST", "/api/submit", 200, Date.now() - startTime);
    return successResponse(undefined, "Submission saved successfully");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[API] POST /api/submit error:", {
      error: errorMessage,
      timestamp: new Date().toISOString(),
      duration: `${Date.now() - startTime}ms`,
    });

    logResponse("POST", "/api/submit", 500, Date.now() - startTime);
    return errorResponse("Failed to save submission. Please try again.", 500);
  }
}
