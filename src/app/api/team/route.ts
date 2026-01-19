import { NextResponse } from "next/server";
import { viewTeam } from "@/services/team.service";


/**
 * Handle get team request.
 * 
 * @async
 * @param {Request} req - The incoming HTTP request.
 * @returns {Promise<NextResponse>} JSON response containing complete team details or error.
 * 
 * @description
 * This endpoint resolves the currently authenticated student from context and
 * returns the team details along with name, code and member names according to schema.
 * Refer to Team model schema for more.
 * 
 * @throws {Error} If the student is not a part of any team.
 * @throws {Error} If the student context cannot be resolved.
 */
export async function GET(req: Request): Promise<NextResponse> {
    try {
        const team = await viewTeam();

        return NextResponse.json(
            { success: true, team: team },
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
