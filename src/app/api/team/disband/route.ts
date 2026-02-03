import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { errorResponse, successResponse, logRequest, logResponse } from "@/lib/api-helpers";
import type { NextRequest } from "next/server";
import type { NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();

  try {
    logRequest("POST", "/api/team/disband");

    // Get authenticated user
    const session = await auth();
    if (!session?.user?.email) {
      logResponse("POST", "/api/team/disband", 401, Date.now() - startTime);
      return errorResponse("Unauthorized", 401);
    }

    // Get user and their team
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        team: {
          include: {
            users: true,
            teamLeader: {
              select: { email: true },
            },
          },
        },
      },
    });

    if (!user?.team) {
      logResponse("POST", "/api/team/disband", 404, Date.now() - startTime);
      return errorResponse("You are not part of a team", 404);
    }

    const team = user.team;

    // Check if user is the team leader
    if (team.teamLeader?.email !== session.user.email) {
      logResponse("POST", "/api/team/disband", 403, Date.now() - startTime);
      return errorResponse("Only team leader can disband the team", 403);
    }

    // Check if there are other members
    if (team.users.length > 1) {
      logResponse("POST", "/api/team/disband", 400, Date.now() - startTime);
      return errorResponse(
        "Cannot disband team with other members. Remove all members first.",
        400
      );
    }

    const teamId = team.id;
    const teamCode = team.code;

    // Remove team code from user and clear team leader status
    await prisma.user.update({
      where: { email: session.user.email },
      data: { 
        teamCode: "",
        leadTeams: {
          disconnect: { id: teamId },
        },
      },
    });

    // Delete the team
    await prisma.team.delete({
      where: { id: teamId },
    });

    logResponse("POST", "/api/team/disband", 200, Date.now() - startTime);
    return successResponse(undefined, "Team disbanded successfully");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[API] POST /api/team/disband error:", {
      error: errorMessage,
      timestamp: new Date().toISOString(),
      duration: `${Date.now() - startTime}ms`,
    });

    logResponse("POST", "/api/team/disband", 500, Date.now() - startTime);
    return errorResponse("Failed to disband team. Please try again.", 500);
  }
}
