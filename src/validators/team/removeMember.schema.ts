import { z } from "zod";

export const removeTeamMemberSchema = z
    .object({
        removeMemberId: z.string().min(1),
    })
    .strict();
