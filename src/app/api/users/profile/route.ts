import { prisma } from "@/lib/prisma";
import { errorResponse, successResponse, parseJsonBody, logRequest, logResponse } from "@/lib/api-helpers";
import { auth } from "@/auth";
import type { NextRequest } from "next/server";
import type { NextResponse } from "next/server";

interface ProfileRequest {
  email?: string;
}

interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  isRegistered: boolean;
  teamCode: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();

  try {
    logRequest("POST", "/api/users/profile");

    const session = await auth();
    if (!session?.user?.email) {
      logResponse("POST", "/api/users/profile", 401, Date.now() - startTime);
      return errorResponse("Unauthorized", 401);
    }

    const body = await parseJsonBody(request);
    const { email } = body as ProfileRequest;

    // If email is provided and different, check authorization
    const targetEmail = email || session.user.email;

    const user = await prisma.user.findUnique({
      where: { email: targetEmail },
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

    if (!user) {
      logResponse("POST", "/api/users/profile", 404, Date.now() - startTime);
      return errorResponse("User not found", 404);
    }

    const profile: UserProfile = {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };

    logResponse("POST", "/api/users/profile", 200, Date.now() - startTime);
    return successResponse(profile, "Profile retrieved successfully");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[API] POST /api/users/profile error:", {
      error: errorMessage,
      timestamp: new Date().toISOString(),
      duration: `${Date.now() - startTime}ms`,
    });

    logResponse("POST", "/api/users/profile", 500, Date.now() - startTime);
    return errorResponse("Failed to retrieve profile. Please try again.", 500);
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();

  try {
    logRequest("GET", "/api/users/profile");

    const session = await auth();
    if (!session?.user?.email) {
      logResponse("GET", "/api/users/profile", 401, Date.now() - startTime);
      return errorResponse("Unauthorized", 401);
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
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

    if (!user) {
      logResponse("GET", "/api/users/profile", 404, Date.now() - startTime);
      return errorResponse("User not found", 404);
    }

    const profile: UserProfile = {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };

    logResponse("GET", "/api/users/profile", 200, Date.now() - startTime);
    return successResponse(profile, "Profile retrieved successfully");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[API] GET /api/users/profile error:", {
      error: errorMessage,
      timestamp: new Date().toISOString(),
      duration: `${Date.now() - startTime}ms`,
    });

    logResponse("GET", "/api/users/profile", 500, Date.now() - startTime);
    return errorResponse("Failed to retrieve profile. Please try again.", 500);
  }
}
