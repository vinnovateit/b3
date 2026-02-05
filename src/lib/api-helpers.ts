import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// API Response helpers for consistent error and success responses

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string>;
  timestamp?: string;
}

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data?: T;
  message?: string;
  timestamp?: string;
}


// standardized error response

export function errorResponse(
  message: string,
  status: number = 500,
  errors?: Record<string, string>
): NextResponse<ApiErrorResponse> {
  const body: ApiErrorResponse = {
    message,
    ...(errors && { errors }),
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(body, { status });
}

// standardized success response
export function successResponse<T>(
  data?: T,
  message = "Success",
  status = 200
): NextResponse<ApiSuccessResponse<T>> {
  const body: ApiSuccessResponse<T> = {
    success: true,
    message,
    ...(data && { data }),
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(body, { status });
}

//JSON body validation

export async function parseJsonBody(request: NextRequest): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new Error("Invalid JSON in request body");
  }
}

// validates required fields in request body

export function validateRequiredFields(
  body: unknown,
  requiredFields: string[]
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (typeof body !== "object" || !body) {
    return { _body: "Request body must be a JSON object" };
  }

  const bodyObj = body as Record<string, unknown>;

  requiredFields.forEach((field) => {
    if (!bodyObj[field]) {
      errors[field] = `${field} is required`;
    }
  });

  return errors;
}

// type-safe request handler wrapper with error handling

export async function apiHandler(
  handler: (request: NextRequest) => Promise<NextResponse>
): Promise<(request: NextRequest) => Promise<NextResponse>> {
  return async (request: NextRequest) => {
    try {
      return await handler(request);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error("[API] Unhandled error:", {
        error: errorMessage,
        method: request.method,
        url: request.url,
        timestamp: new Date().toISOString(),
      });

      return errorResponse("Internal server error", 500);
    }
  };
}

// logs API request details for debugging

export function logRequest(
  method: string,
  endpoint: string,
  data?: unknown
): void {
  console.log(`[API] ${method} ${endpoint}`, {
    data,
    timestamp: new Date().toISOString(),
  });
}

// logs API response details for debugging

export function logResponse(
  method: string,
  endpoint: string,
  status: number,
  duration?: number
): void {
  console.log(`[API] ${method} ${endpoint} - ${status}`, {
    duration: duration ? `${duration}ms` : undefined,
    timestamp: new Date().toISOString(),
  });
}
