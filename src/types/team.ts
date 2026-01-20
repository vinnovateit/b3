import { z } from "zod";
import { createTeamSchema, } from "@/validators/createTeam.schema";
import { joinTeamSchema } from "@/validators/joinTeam.schema";
import { updateTeamSchema } from "@/validators/updateTeam.schema";

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

/**
 * Data Transfer Object for updating team.
 * Inferred from the {@link updateTeamSchema} Zod validation schema.
 */
export type UpdateTeamDTO = z.infer<typeof updateTeamSchema>;
