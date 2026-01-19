import { z } from "zod";
import { createTeamSchema, } from "@/validators/createTeam.schema";
import { joinTeamSchema } from "@/validators/joinTeam.schema";

/**
 * Data Transfer Object for creating a new team.
 * Inferred from the {@link createTeamSchema} Zod validation schema.
 */
export type CreateTeamDTO = z.infer<typeof createTeamSchema>;

/**
 * Data Transfer Object for joining a team.
 * Inferred from the {@link joinTeamSchema} Zod validation schema.
 */
export type JoinTeamDTO = z.infer<typeof joinTeamSchema>;