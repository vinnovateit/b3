import { prisma } from "@/lib/prisma";
import { errorResponse, successResponse, parseJsonBody, logRequest, logResponse } from "@/lib/api-helpers";
import { auth } from "@/auth";
import type { NextRequest } from "next/server";
import type { NextResponse } from "next/server";

interface RegisterRequest {
  name: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();

  try {
    logRequest("POST", "/api/users/register");

    const session = await auth();
    if (!session?.user?.email) {
      logResponse("POST", "/api/users/register", 401, Date.now() - startTime);
      return errorResponse("Unauthorized", 401);
    }

    const body = await parseJsonBody(request);
    const { name } = body as RegisterRequest;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      logResponse("POST", "/api/users/register", 400, Date.now() - startTime);
      return errorResponse("Name is required and must be a non-empty string", 400);
    }

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: name.trim(),
        isRegistered: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        isRegistered: true,
        teamCode: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    logResponse("POST", "/api/users/register", 200, Date.now() - startTime);
    return successResponse(user, "User registered successfully");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[API] POST /api/users/register error:", {
      error: errorMessage,
      timestamp: new Date().toISOString(),
      duration: `${Date.now() - startTime}ms`,
    });

    logResponse("POST", "/api/users/register", 500, Date.now() - startTime);
    return errorResponse("Failed to register user. Please try again.", 500);
  }
}
