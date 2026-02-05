import { TEAM_NAME_MESSAGE, TEAM_NAME_REGEX } from "@/constants/validation";
import { z } from "zod";

/**
 * Validation schema for creating a new team and its associated project.
 */
export const createTeamSchema = z.object({
    name: z.string().trim().min(3).max(50).regex(
        TEAM_NAME_REGEX, TEAM_NAME_MESSAGE),
    description: z.string().trim().max(250).optional(),
    category: z.string(),

    projectTitle: z.string().trim().max(80).optional(),
    projectDescription: z.string().trim().max(500).optional(),
    track: z.string().optional(),

    githubLink: z.string().trim().url("Invalid GitHub URL").optional(),
    figmaLink: z.string().trim().url("Invalid Figma URL").optional(),
    pptLink: z.string().trim().url("Invalid Presentation URL").optional(),
    otherLinks: z.string().trim().optional(),

}).strict(); // Block unknown types  
