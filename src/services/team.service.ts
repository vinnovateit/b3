/**
 * @fileoverview Service layer for Team registration and business logic.
 * Handles the orchestration of team creation, including student validation,
 * duplicate name checks, and collision-resistant team code generation.
 * @module services/team.service
 */

import * as repo from "@/repositories/team.repo";
import { generateTeamCode } from "@/utils/teamCode";
import { CreateTeamDTO } from "@/types/team";
import { Prisma } from "@prisma/client";
import { MAX_TEAM_CODE_GEN_TRIES } from "@/constants/team";

// TODO: Create a regNo type 
export async function registerTeam(payload: CreateTeamDTO, creatorRegNo: string) {
    // Prevent duplicate team names
    const nameExists = await repo.teamNameExists(payload.name);
    if (nameExists) {
        throw new Error("Team name already registered");
    }

    // Ensure creator exists
    const creator =
        await repo.findStudentByRegNo(creatorRegNo);

    if (!creator) {
        throw new Error("Student not registered");
    }

    // Ensure creator is not already in a team
    if (creator.teamId) {
        throw new Error("You are already in a team");
    }

    // Concurrent safe team creation  
    for (let i = 0; i < MAX_TEAM_CODE_GEN_TRIES; i++) {           // Maximum tries before throwing error
        try {
            const code = generateTeamCode();

            // Create team
            const data: Prisma.TeamCreateInput = {
                name: payload.name,
                code,
                description: payload.description,
                category: payload.category,

                projectTitle: payload.projectTitle,
                projectDescription: payload.projectDescription,
                track: payload.track,
                githubLink: payload.githubLink,
                figmaLink: payload.figmaLink,
                pptLink: payload.pptLink,
                otherLinks: payload.otherLinks,

                vitStudents: {
                    connect: { regNo: creatorRegNo },
                },


            };

            return repo.createTeam(data);

        } catch (err: any) {
            // If code is not unique try again.
            if (err.code !== "P2002") throw err;
        }
    }

    throw new Error("Failed to generate unique team code");
}

