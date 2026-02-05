import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { errorResponse, successResponse, parseJsonBody, logRequest, logResponse } from "@/lib/api-helpers";
import type { NextRequest } from "next/server";
import type { NextResponse } from "next/server";

interface UpdateProjectRequest {
  projectTitle?: string;
  projectDescription?: string;
  track?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();

  try {
    logRequest("POST", "/api/team/update");

    const session = await auth();
    if (!session?.user?.email) {
      logResponse("POST", "/api/team/update", 401, Date.now() - startTime);
      return errorResponse("Unauthorized", 401);
    }

    const body = await parseJsonBody(request);
    const { projectTitle, projectDescription, track } = body as UpdateProjectRequest;

    // Get user with team info
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        teamCode: true,
        team: {
          select: {
            id: true,
            teamLeaderId: true,
          },
        },
      },
    });

    if (!user?.teamCode || user.teamCode === "") {
      logResponse("POST", "/api/team/update", 400, Date.now() - startTime);
      return errorResponse("User is not part of a team", 400);
    }

    if (!user.team) {
      logResponse("POST", "/api/team/update", 404, Date.now() - startTime);
      return errorResponse("Team not found", 404);
    }

    // Check if user is team leader
    if (user.team.teamLeaderId !== user.id) {
      logResponse("POST", "/api/team/update", 403, Date.now() - startTime);
      return errorResponse("Only team leader can update project information", 403);
    }

    // Update team with new project information
    const updateData: any = {};
    if (projectTitle !== undefined) updateData.projectTitle = projectTitle || null;
    if (projectDescription !== undefined) updateData.projectDescription = projectDescription || null;
    if (track !== undefined) updateData.track = track || null;

    const updatedTeam = await prisma.team.update({
      where: { id: user.team.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        code: true,
        projectTitle: true,
        projectDescription: true,
        track: true,
        roundNo: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    logResponse("POST", "/api/team/update", 200, Date.now() - startTime);
    return successResponse(updatedTeam, "Project information updated successfully");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[API] POST /api/team/update error:", {
      error: errorMessage,
      timestamp: new Date().toISOString(),
      duration: `${Date.now() - startTime}ms`,
    });

    logResponse("POST", "/api/team/update", 500, Date.now() - startTime);
    return errorResponse("Failed to update project information. Please try again.", 500);
  }
}
