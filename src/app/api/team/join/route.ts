import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { errorResponse, successResponse, parseJsonBody, logRequest, logResponse } from "@/lib/api-helpers";
import type { NextRequest } from "next/server";
import type { NextResponse } from "next/server";

interface JoinTeamRequest {
  teamCode: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();

  try {
    logRequest("POST", "/api/team/join");

    // Get authenticated user
    const session = await auth();
    if (!session?.user?.email) {
      logResponse("POST", "/api/team/join", 401, Date.now() - startTime);
      return errorResponse("Unauthorized", 401);
    }

    // Parse request body
    const body = await parseJsonBody(request);
    const { teamCode } = body as JoinTeamRequest;

    if (!teamCode || typeof teamCode !== "string") {
      logResponse("POST", "/api/team/join", 400, Date.now() - startTime);
      return errorResponse("Team code is required", 400);
    }

    const normalizedCode = teamCode.trim().toUpperCase();

    // Find team by code
    const team = await prisma.team.findUnique({
      where: { code: normalizedCode },
    });

    if (!team) {
      logResponse("POST", "/api/team/join", 404, Date.now() - startTime);
      return errorResponse("Team not found", 404);
    }

    // Update user with team code
    await prisma.user.update({
      where: { email: session.user.email },
      data: { teamCode: normalizedCode },
    });

    logResponse("POST", "/api/team/join", 200, Date.now() - startTime);
    return successResponse(undefined, "Successfully joined team");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[API] POST /api/team/join error:", {
      error: errorMessage,
      timestamp: new Date().toISOString(),
      duration: `${Date.now() - startTime}ms`,
    });

    logResponse("POST", "/api/team/join", 500, Date.now() - startTime);
    return errorResponse("Failed to join team. Please try again.", 500);
  }
}
