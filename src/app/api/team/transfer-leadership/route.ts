import { NextResponse } from "next/server";
import { transferLeadership } from "@/services/team.service";
import { transferLeadershipSchema } from "@/validators/transferLeadership.schema";
import { ZodError } from 'zod';


/**
 * Handles the transfer of leadership withing a team.
 * 
 * @async
 * @param {Request} req - The incoming HTTP request.
 * @returns {Promise<NextResponse>} JSON response containing message or error.
 * 
 * @description
 * This endpoint resolves the currently authenticated student from context and
 * check whether they are leader before accepting transfer of leadership.
 * Leadership can only be transferred between the team members.
 * The request accept newLeaderId in the payload and validates the request against {@link transferLeadershipSchema}.
 * 
 * @throws {Error} If the student is not a part of any team.
 * @throws {Error} If the student is not the leader of the team.
 * @throws {Error} If the transfer leadership student is not the member od team.
 * @throws {ZodError} If validation fails.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const newLeaderId = transferLeadershipSchema.parse(body);
        const result = await transferLeadership(newLeaderId);

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
