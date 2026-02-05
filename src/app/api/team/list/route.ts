import { prisma } from "@/lib/prisma";
import { errorResponse, successResponse, logRequest, logResponse } from "@/lib/api-helpers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import type { NextRequest } from "next/server";
import type { NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();

  try {
    logRequest("POST", "/api/team/list");

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      logResponse("POST", "/api/team/list", 401, Date.now() - startTime);
      return errorResponse("Unauthorized", 401);
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        team: {
          include: {
            users: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            teamLeader: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        leadTeams: {
          include: {
            users: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            teamLeader: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      logResponse("POST", "/api/team/list", 404, Date.now() - startTime);
      return errorResponse("User not found", 404);
    }

    const teams = [];
    
    if (user.team) {
      teams.push({
        ...user.team,
        role: "member",
        createdAt: user.team.createdAt.toISOString(),
        updatedAt: user.team.updatedAt.toISOString(),
      });
    }

    user.leadTeams.forEach((team) => {
      teams.push({
        ...team,
        role: "leader",
        createdAt: team.createdAt.toISOString(),
        updatedAt: team.updatedAt.toISOString(),
      });
    });

    logResponse("POST", "/api/team/list", 200, Date.now() - startTime);
    return successResponse(teams, "Teams retrieved successfully");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[API] POST /api/team/list error:", {
      error: errorMessage,
      timestamp: new Date().toISOString(),
      duration: `${Date.now() - startTime}ms`,
    });

    logResponse("POST", "/api/team/list", 500, Date.now() - startTime);
    return errorResponse("Failed to retrieve teams. Please try again.", 500);
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();

  try {
    logRequest("GET", "/api/team/list");

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      logResponse("GET", "/api/team/list", 401, Date.now() - startTime);
      return errorResponse("Unauthorized", 401);
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        team: {
          include: {
            users: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            teamLeader: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        leadTeams: {
          include: {
            users: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            teamLeader: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      logResponse("GET", "/api/team/list", 404, Date.now() - startTime);
      return errorResponse("User not found", 404);
    }

    const teams = [];
    
    if (user.team) {
      teams.push({
        ...user.team,
        role: "member",
        createdAt: user.team.createdAt.toISOString(),
        updatedAt: user.team.updatedAt.toISOString(),
      });
    }

    user.leadTeams.forEach((team) => {
      teams.push({
        ...team,
        role: "leader",
        createdAt: team.createdAt.toISOString(),
        updatedAt: team.updatedAt.toISOString(),
      });
    });

    logResponse("GET", "/api/team/list", 200, Date.now() - startTime);
    return successResponse(teams, "Teams retrieved successfully");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[API] GET /api/team/list error:", {
      error: errorMessage,
      timestamp: new Date().toISOString(),
      duration: `${Date.now() - startTime}ms`,
    });

    logResponse("GET", "/api/team/list", 500, Date.now() - startTime);
    return errorResponse("Failed to retrieve teams. Please try again.", 500);
  }
}
