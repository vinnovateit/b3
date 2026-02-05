import { NextResponse } from "next/server";
import { registerTeam } from "@/services/team.service";
import { createTeamSchema } from "@/validators/team/create.schema";
import { z, ZodError } from 'zod';


/**
 * Handles the creation of a new team.
 * 
 * @async
 * @param {Request} req - The incoming HTTP request.
 * @returns {Promise<NextResponse>} JSON response containing team details or error.
 * 
 * @description
 * This endpoint validates the request body against {@link createTeamSchema},
 * resolves the currently authenticated student from context and
 * creates a team, updates the teamId of student and generates a unique team code for the team.
 * The request accept team code in the payload and validates the request against {@link joinTeamSchema}.
 * 
 * @throws {ZodError} If validation fails.
 * @throws {Error} If the student is already a part of team.
 * @throws {Error} If the student context cannot be resolved.
 */
export async function POST(req: Request): Promise<NextResponse> {
    try {


        const body = await req.json();
        const parsed = createTeamSchema.parse(body)
        const team = await registerTeam(parsed);

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
