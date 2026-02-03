import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { errorResponse, successResponse, parseJsonBody, logRequest, logResponse } from "@/lib/api-helpers";
import type { NextRequest } from "next/server";
import type { NextResponse } from "next/server";

interface RemoveTeamMemberRequest {
  teamId: string;
  userEmailToRemove: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();

  try {
    logRequest("POST", "/api/team/remove-member");

    // Get authenticated user
    const session = await auth();
    if (!session?.user?.email) {
      logResponse("POST", "/api/team/remove-member", 401, Date.now() - startTime);
      return errorResponse("Unauthorized", 401);
    }

    // Parse request body
    const body = await parseJsonBody(request);
    const { teamId, userEmailToRemove } = body as RemoveTeamMemberRequest;

    if (!teamId || !userEmailToRemove) {
      logResponse("POST", "/api/team/remove-member", 400, Date.now() - startTime);
      return errorResponse("Team ID and user email are required", 400);
    }

    // Verify team exists and get current user's leadership status
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: { teamLeader: { select: { email: true } } },
    });

    if (!team) {
      logResponse("POST", "/api/team/remove-member", 404, Date.now() - startTime);
      return errorResponse("Team not found", 404);
    }

    // Check if current user is the team leader
    if (team.teamLeader?.email !== session.user.email) {
      logResponse("POST", "/api/team/remove-member", 403, Date.now() - startTime);
      return errorResponse("Only team leader can remove members", 403);
    }

    // Prevent leader from removing themselves
    if (userEmailToRemove === session.user.email) {
      logResponse("POST", "/api/team/remove-member", 400, Date.now() - startTime);
      return errorResponse("Team leader cannot remove themselves", 400);
    }

    // Remove user from team
    await prisma.user.update({
      where: { email: userEmailToRemove },
      data: { teamCode: null },
    });

    logResponse("POST", "/api/team/remove-member", 200, Date.now() - startTime);
    return successResponse(undefined, "Member removed successfully");
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
