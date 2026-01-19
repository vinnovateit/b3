import { NextResponse } from "next/server";
import { leaveTeam } from "@/services/team.service";

/**
 * Handles a request for the authenticated student to leave their current team.
 *
 * @async
 * @param {Request} req - The incoming HTTP request.
 * @returns {Promise<NextResponse>} A JSON response indicating success or failure.
 *
 * @description
 * This endpoint resolves the currently authenticated student from context and
 * removes them from their existing team by clearing the student's `teamId`.
 * The request does not accept any identifiers in the payload; identity and
 * team membership are derived entirely from the authenticated context.
 *
 * @throws {Error} If the student is not part of any team.
 * @throws {Error} If the student context cannot be resolved.
 */
export async function POST(req: Request): Promise<NextResponse> {
    const contentLength = req.headers.get("content-length");

    // Disallow any request body.
    if (contentLength && Number(contentLength) > 0) {
        return NextResponse.json(
            { error: "Request body is not allowed for this endpoint." },
            { status: 400 }
        );
    }

    try {
        const message = await leaveTeam();

        return NextResponse.json(
            { success: true, message: message },
            { status: 201 }
        );
    }
    catch (err: any) {

        return NextResponse.json(
            { success: false, message: err.message },
            { status: 400 }
        );
    }
}
