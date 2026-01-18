import { z } from "zod";

/**
 * Validation schema for creating a new team and its associated project.
 */
export const createTeamSchema = z.object({
    name: z.string().min(3),
    description: z.string().optional(),
    category: z.string(),

    projectTitle: z.string().optional(),
    projectDescription: z.string().optional(),
    track: z.string().optional(),

    githubLink: z.string().url("Invalid GitHub URL").optional(),
    figmaLink: z.string().url("Invalid Figma URL").optional(),
    pptLink: z.string().url("Invalid Presentation URL").optional(),
    otherLinks: z.string().optional(),

});
