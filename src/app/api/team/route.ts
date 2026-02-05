import { NextResponse } from "next/server";
import { ZodError } from 'zod';
import { viewTeam, updateTeam, disbandTeam, } from "@/services/team.service";
import { updateTeamSchema } from "@/validators/team/update.schema";

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


/**
 * Handle disband team request.
 * 
 * @async
 * @param {Request} req - The incoming HTTP request.
 * @returns {Promise<NextResponse>} JSON response containing message or error
 * 
 * @description
 * This endpoint resolves the currently authenticated student from context and
 * deletes the entire team row and removes every member from the team.
 * Only the team creator / leader is authorized to perform this operation.
 * 
 * @throws {Error} If the student is not the creator of the team.
 * @throws {Error} If the student context cannot be resolved.
 */
export async function DELETE(req: Request): Promise<NextResponse> {
    try {
        const message = await disbandTeam();

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


/**
 * Handle update team request.
 * 
 * @async
 * @param {Request} req - The incoming HTTP request.
 * @returns {Promise<NextResponse>} JSON response containing updated team details or error
 * 
 * @description
 * This endpoint resolves the currently authenticated student from context and
 * and performs update on requested team.
 * The request body is validated against {@link updateTeamSchema}.
 * Only the team creator / leader is authorized to perform this operation.
 * 
 * @throws {ZodError} if validation fails.
 * @throws {Error} If the student is not the creator of the team.
 * @throws {Error} If the student context cannot be resolved.
 */
export async function PATCH(req: Request): Promise<NextResponse> {
    try {

        const body = await req.json();
        const parsed = updateTeamSchema.parse(body)

        const team = await updateTeam(parsed);

        return NextResponse.json(
            { success: true, team: team },
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


