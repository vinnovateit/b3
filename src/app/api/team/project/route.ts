import { prisma } from "@/lib/prisma";
import { errorResponse, successResponse, parseJsonBody, logRequest, logResponse } from "@/lib/api-helpers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import type { NextRequest } from "next/server";
import type { NextResponse } from "next/server";

interface UpdateTeamProjectRequest {
  teamId?: string;
  teamCode?: string;
  projectTitle?: string;
  projectDescription?: string;
  track?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();

  try {
    logRequest("POST", "/api/team/project");

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      logResponse("POST", "/api/team/project", 401, Date.now() - startTime);
      return errorResponse("Unauthorized", 401);
    }

    const body = await parseJsonBody(request);
    const { teamId, teamCode, projectTitle, projectDescription, track } = body as UpdateTeamProjectRequest;

    if (!teamId && !teamCode) {
      logResponse("POST", "/api/team/project", 400, Date.now() - startTime);
      return errorResponse("Either teamId or teamCode is required", 400);
    }

    const query = teamId ? { id: teamId } : { code: (teamCode as string).toUpperCase() };

    const team = await prisma.team.findUnique({
      where: query,
      include: {
        teamLeader: {
          select: { email: true },
        },
      },
    });

    if (!team) {
      logResponse("POST", "/api/team/project", 404, Date.now() - startTime);
      return errorResponse("Team not found", 404);
    }

    // Only team leader can update project information
    if (team.teamLeader?.email !== session.user.email) {
      logResponse("POST", "/api/team/project", 403, Date.now() - startTime);
      return errorResponse("Only team leader can update project information", 403);
    }

    const updateData: any = {};
    if (projectTitle !== undefined) updateData.projectTitle = projectTitle || null;
    if (projectDescription !== undefined) updateData.projectDescription = projectDescription || null;
    if (track !== undefined) updateData.track = track || null;

    const updatedTeam = await prisma.team.update({
      where: { id: team.id },
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

    logResponse("POST", "/api/team/project", 200, Date.now() - startTime);
    return successResponse(updatedTeam, "Project information updated successfully");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[API] POST /api/team/project error:", {
      error: errorMessage,
      timestamp: new Date().toISOString(),
      duration: `${Date.now() - startTime}ms`,
    });

    logResponse("POST", "/api/team/project", 500, Date.now() - startTime);
    return errorResponse("Failed to update project information. Please try again.", 500);
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();

  try {
    logRequest("GET", "/api/team/project");

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      logResponse("GET", "/api/team/project", 401, Date.now() - startTime);
      return errorResponse("Unauthorized", 401);
    }

    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get("teamId");
    const teamCode = searchParams.get("teamCode");

    if (!teamId && !teamCode) {
      logResponse("GET", "/api/team/project", 400, Date.now() - startTime);
      return errorResponse("Either teamId or teamCode query parameter is required", 400);
    }

    const query = teamId ? { id: teamId } : { code: (teamCode as string).toUpperCase() };

    const team = await prisma.team.findUnique({
      where: query,
      select: {
        id: true,
        projectTitle: true,
        projectDescription: true,
        track: true,
        roundNo: true,
        users: {
          select: { email: true },
        },
      },
    });

    if (!team) {
      logResponse("GET", "/api/team/project", 404, Date.now() - startTime);
      return errorResponse("Team not found", 404);
    }

    // Check if user is a member
    const isMember = team.users.some((u) => u.email === session.user?.email);
    if (!isMember) {
      logResponse("GET", "/api/team/project", 403, Date.now() - startTime);
      return errorResponse("You are not a member of this team", 403);
    }

    const projectData = {
      teamId: team.id,
      projectTitle: team.projectTitle,
      projectDescription: team.projectDescription,
      track: team.track,
      currentRound: team.roundNo,
    };

    logResponse("GET", "/api/team/project", 200, Date.now() - startTime);
    return successResponse(projectData, "Project information retrieved successfully");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[API] GET /api/team/project error:", {
      error: errorMessage,
      timestamp: new Date().toISOString(),
      duration: `${Date.now() - startTime}ms`,
    });

    logResponse("GET", "/api/team/project", 500, Date.now() - startTime);
    return errorResponse("Failed to retrieve project information. Please try again.", 500);
  }
}
