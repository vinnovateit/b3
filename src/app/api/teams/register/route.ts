import { NextResponse } from "next/server";
import { registerTeam } from "@/services/team.service";
import { createTeamSchema } from "@/validators/createTeam.schema";
import { z, ZodError } from 'zod';


/**
 * Handles the creation of a new team.
 * 
 * @async
 * @param {Request} req - The incoming HTTP request.
 * @returns {Promise<NextResponse>} JSON response containing team details or error.
 * 
 * @description
 * This endpoint performs the following:
 * 1. Retrieves the **Registration Number** (currently mocked as `temp_reg_no`).
 *    - This ID serves as the foreign key to link the team to its creator.
 * 2. Validates the request body against {@link createTeamSchema}.
 * 3. Registers the team via {@link registerTeam}, associating it with the reg no.
 * 
 * @throws {ZodError} If validation fails.
 */
export async function POST(req: Request): Promise<NextResponse> {
    try {

        // TODO: Get register no through user auth 
        const temp_reg_no = "24BCE1234"

        const body = await req.json();
        const parsed = createTeamSchema.parse(body)
        const team = await registerTeam(parsed, temp_reg_no);

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
