import { z } from "zod";


export const Round1Schema = z.object({
    team_name: z.string().min(1),
    project_title: z.string().min(1),
    project_description: z.string().min(50),
    tech_stack: z.string(),
    github_link: z.string().url(),
    figma_link: z.string().url(),
    total_members: z.number().int()
});