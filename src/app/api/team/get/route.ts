import { prisma } from "@/lib/prisma";
import { errorResponse, successResponse, parseJsonBody, logRequest, logResponse } from "@/lib/api-helpers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import type { NextRequest } from "next/server";
import type { NextResponse } from "next/server";

interface GetTeamRequest {
  teamId?: string;
  teamCode?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();

  try {
    logRequest("POST", "/api/team/get");

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      logResponse("POST", "/api/team/get", 401, Date.now() - startTime);
      return errorResponse("Unauthorized", 401);
    }

    const body = await parseJsonBody(request);
    const { teamId, teamCode } = body as GetTeamRequest;

    if (!teamId && !teamCode) {
      logResponse("POST", "/api/team/get", 400, Date.now() - startTime);
      return errorResponse("Either teamId or teamCode is required", 400);
    }

    const query = teamId ? { id: teamId } : { code: (teamCode as string).toUpperCase() };

    const team = await prisma.team.findUnique({
      where: query,
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        teamLeader: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    if (!team) {
      logResponse("POST", "/api/team/get", 404, Date.now() - startTime);
      return errorResponse("Team not found", 404);
    }

    // Check if user is a member of the team
    const isMember = team.users.some((u) => u.email === session.user?.email);
    const isLeader = team.teamLeader?.email === session.user?.email;

    if (!isMember && !isLeader) {
      logResponse("POST", "/api/team/get", 403, Date.now() - startTime);
      return errorResponse("You are not a member of this team", 403);
    }

    const teamData = {
      ...team,
      createdAt: team.createdAt.toISOString(),
      updatedAt: team.updatedAt.toISOString(),
    };

    logResponse("POST", "/api/team/get", 200, Date.now() - startTime);
    return successResponse(teamData, "Team retrieved successfully");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[API] POST /api/team/get error:", {
      error: errorMessage,
      timestamp: new Date().toISOString(),
      duration: `${Date.now() - startTime}ms`,
    });

    logResponse("POST", "/api/team/get", 500, Date.now() - startTime);
    return errorResponse("Failed to retrieve team. Please try again.", 500);
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();

  try {
    logRequest("GET", "/api/team/get");

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      logResponse("GET", "/api/team/get", 401, Date.now() - startTime);
      return errorResponse("Unauthorized", 401);
    }

    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get("teamId");
    const teamCode = searchParams.get("teamCode");

    if (!teamId && !teamCode) {
      logResponse("GET", "/api/team/get", 400, Date.now() - startTime);
      return errorResponse("Either teamId or teamCode query parameter is required", 400);
    }

    const query = teamId ? { id: teamId } : { code: (teamCode as string).toUpperCase() };

    const team = await prisma.team.findUnique({
      where: query,
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        teamLeader: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    if (!team) {
      logResponse("GET", "/api/team/get", 404, Date.now() - startTime);
      return errorResponse("Team not found", 404);
    }

    // Check if user is a member of the team
    const isMember = team.users.some((u) => u.email === session.user?.email);
    const isLeader = team.teamLeader?.email === session.user?.email;

    if (!isMember && !isLeader) {
      logResponse("GET", "/api/team/get", 403, Date.now() - startTime);
      return errorResponse("You are not a member of this team", 403);
    }

    const teamData = {
      ...team,
      createdAt: team.createdAt.toISOString(),
      updatedAt: team.updatedAt.toISOString(),
    };

    logResponse("GET", "/api/team/get", 200, Date.now() - startTime);
    return successResponse(teamData, "Team retrieved successfully");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[API] GET /api/team/get error:", {
      error: errorMessage,
      timestamp: new Date().toISOString(),
      duration: `${Date.now() - startTime}ms`,
    });

    logResponse("GET", "/api/team/get", 500, Date.now() - startTime);
    return errorResponse("Failed to retrieve team. Please try again.", 500);
  }
}
