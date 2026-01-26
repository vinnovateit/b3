import { prisma } from "@/lib/prisma";
import { validateSubmissionLinks } from "@/lib/validators";
import { errorResponse, successResponse, parseJsonBody, logRequest, logResponse } from "@/lib/api-helpers";
import type { NextRequest } from "next/server";
import type { NextResponse } from "next/server";

interface SubmissionRequest {
  teamId: string;
  githubLink?: string | null;
  figmaLink?: string | null;
  pptLink?: string | null;
  otherLinks?: string | null;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();

  try {
    logRequest("POST", "/api/submit");

    // Parse request body
    const body = await parseJsonBody(request);

    // Validate request structure
    const submissionData = body as SubmissionRequest;

    if (!submissionData.teamId || typeof submissionData.teamId !== "string") {
      logResponse("POST", "/api/submit", 400);
      return errorResponse("teamId is required and must be a string", 400);
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

    // Verify team exists
    const team = await prisma.team.findUnique({
      where: { id: submissionData.teamId },
      select: { id: true },
    });

    if (!team) {
      logResponse("POST", "/api/submit", 404, Date.now() - startTime);
      return errorResponse("Team not found", 404);
    }

    // Update team with cleaned links
    await prisma.team.update({
      where: { id: submissionData.teamId },
      data: {
        githubLink: validation.cleanedLinks.githubLink || null,
        figmaLink: validation.cleanedLinks.figmaLink || null,
        pptLink: validation.cleanedLinks.pptLink || null,
        otherLinks: validation.cleanedLinks.otherLinks || null,
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
