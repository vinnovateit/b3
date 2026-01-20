import { z } from "zod";

export const transferLeadershipSchema = z
    .object({
        newLeaderId: z.string().min(1),
    })
    .strict();
