import { NextResponse } from "next/server";
import { removeMember } from "@/services/team.service";
import { removeTeamMemberSchema } from "@/validators/team/removeMember.schema";
import { ZodError } from 'zod';


/**
 * Handles the removal of member from the team.
 * 
 * @async
 * @param {Request} req - The incoming HTTP request.
 * @returns {Promise<NextResponse>} JSON response containing message or error.
 * 
 * @description
 * This endpoint resolves the currently authenticated student from context and
 * check whether they are leader before authorizing the removal of member.
 * Only leader can remove a team member.
 * The request accept removeMemberId in the payload and validates the request against {@link removeTeamMemberSchema}.
 * 
 * @throws {Error} If the student is not a part of any team.
 * @throws {Error} If the student is not the leader of the team.
 * @throws {Error} If the remove student is not the member of team.
 * @throws {ZodError} If validation fails.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const memberId = removeTeamMemberSchema.parse(body);
        const result = await removeMember(memberId);

        return NextResponse.json(result);
    } catch (err: any) {
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
