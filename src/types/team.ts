import { z } from "zod";
import {
    createTeamSchema,
} from "@/validators/createTeam.schema";

/**
 * Data Transfer Object for creating a new team.
 * Inferred from the {@link createTeamSchema} Zod validation schema.
 */
export type CreateTeamDTO = z.infer<typeof createTeamSchema>;
