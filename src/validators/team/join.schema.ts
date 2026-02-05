import { z } from "zod";

/**
 * Validation schema for join a team.
 */
export const joinTeamSchema = z.object({
    code: z.string().trim().length(6).transform(code => code.toUpperCase()),
});
