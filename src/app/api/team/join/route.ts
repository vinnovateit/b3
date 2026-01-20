import { NextResponse } from "next/server";
import { joinTeam } from "@/services/team.service";
import { joinTeamSchema } from "@/validators/team/join.schema";
import { ZodError } from 'zod';


/**
 * Handles the joining of a existing team.
 * 
 * @async
 * @param {Request} req - The incoming HTTP request.
 * @returns {Promise<NextResponse>} JSON response containing team details or error.
 * 
 * @description
 * This endpoint resolves the currently authenticated student from context and
 * adds them to the existing team using team code by updating the student's `teamId`.
 * The request accept team code in the payload and validates the request against {@link joinTeamSchema}.
 * 
 * @throws {Error} If the student is already a part of team.
 * @throws {ZodError} If validation fails.
 */
export async function POST(req: Request): Promise<NextResponse> {
    try {

        const body = await req.json();
        const parsed = joinTeamSchema.parse(body)
        const team = await joinTeam(parsed);

        return NextResponse.json(
            { success: true, teamName: team.name, teamCode: team.code },
            { status: 201 }
        );
    }
    catch (err: any) {
        let errorMessage = err.message;

        if (err instanceof ZodError) {
            errorMessage = err.issues
        }

        return NextResponse.json(
            { success: false, message: errorMessage },
            { status: 400 }
        );
    }
}
