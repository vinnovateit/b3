import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { errorResponse, successResponse, parseJsonBody, logRequest, logResponse } from "@/lib/api-helpers";
import type { NextRequest } from "next/server";
import type { NextResponse } from "next/server";

interface RemoveTeamMemberRequest {
  teamCode: string;
  userEmailToRemove: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();

  try {
    logRequest("POST", "/api/team/remove-member");

    // Get authenticated user
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      logResponse("POST", "/api/team/remove-member", 401, Date.now() - startTime);
      return errorResponse("Unauthorized", 401);
    }

    // Parse request body
    const body = await parseJsonBody(request);
    const { teamCode, userEmailToRemove } = body as RemoveTeamMemberRequest;

    if (!teamCode || !userEmailToRemove) {
      logResponse("POST", "/api/team/remove-member", 402, Date.now() - startTime);
      return errorResponse("Team code and user email are required", 402);
    }

    // Verify team exists and get current user's leadership status
    const team = await prisma.team.findUnique({
      where: { code: teamCode.toUpperCase() },
      include: { teamLeader: { select: { email: true } } },
    });

    if (!team) {
      logResponse("POST", "/api/team/remove-member", 404, Date.now() - startTime);
      return errorResponse("Team not found", 404);
    }

    // Check if user to remove is actually in the team
    const userInTeam = await prisma.user.findFirst({
      where: { 
        email: userEmailToRemove,
        teamCode: teamCode.toUpperCase()
      },
    });

    if (!userInTeam) {
      logResponse("POST", "/api/team/remove-member", 400, Date.now() - startTime);
      return errorResponse("User is not in this team", 400);
    }

    // Check if current user is the team leader
    if (team.teamLeader?.email !== session.user.email) {
      logResponse("POST", "/api/team/remove-member", 403, Date.now() - startTime);
      return errorResponse("Only team leader can remove members", 403);
    }

    // Verify leader and member are in the same team
    const leaderInTeam = await prisma.user.findFirst({
      where: { 
        email: session.user.email,
        teamCode: teamCode.toUpperCase()
      },
    });

    if (!leaderInTeam) {
      logResponse("POST", "/api/team/remove-member", 403, Date.now() - startTime);
      return errorResponse("Leader is not in this team", 403);
    }

    if (leaderInTeam.teamCode !== userInTeam.teamCode) {
      logResponse("POST", "/api/team/remove-member", 403, Date.now() - startTime);
      return errorResponse("Leader and member are not in the same team", 403);
    }

    // Prevent leader from removing themselves
    if (userEmailToRemove === session.user.email) {
      logResponse("POST", "/api/team/remove-member", 405, Date.now() - startTime);
      return errorResponse("Team leader cannot remove themselves", 405);
    }

    // Remove user from team
    await prisma.user.update({
      where: { email: userEmailToRemove },
      data: { 
        teamCode: "",  // Set to empty string as per schema default
        teamId: null 
      },
    });

    logResponse("POST", "/api/team/remove-member", 200, Date.now() - startTime);
    return successResponse(undefined, "User removed from team successfully");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[API] POST /api/team/remove-member error:", {
      error: errorMessage,
      timestamp: new Date().toISOString(),
      duration: `${Date.now() - startTime}ms`,
    });

    logResponse("POST", "/api/team/remove-member", 500, Date.now() - startTime);
    return errorResponse("Failed to remove member. Please try again.", 500);
  }
}
