/**
 * @fileoverview Service layer for Team registration and business logic.
 * Handles the orchestration of team creation, including student validation,
 * duplicate name checks, and collision-resistant team code generation.
 * @module services/team.service
 */

import { Prisma } from "@prisma/client";

import * as repo from "@/repositories/team.repo";
import { getCurrentStudent } from "@/lib/getCurrentStudent";
import { generateTeamCode } from "@/utils/teamCode";
import { CreateTeamDTO, JoinTeamDTO } from "@/types/team";
import { MAX_TEAM_CODE_GEN_TRIES, MAX_TEAM_SIZE } from "@/constants/team";
import { memo } from "react";

// TODO: Create a regNo type 
export async function registerTeam(payload: CreateTeamDTO) {
    // Prevent duplicate team names
    const nameExists = await repo.teamNameExists(payload.name);
    if (nameExists) {
        throw new Error("Team name already registered");
    }

    // Get creator from auth context. 
    const creator = await getCurrentStudent();

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
                    connect: { regNo: creator.regNo },
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

export async function joinTeam(payload: JoinTeamDTO) {
    const joiner = await getCurrentStudent();

    // if (!joiner) {
    //     throw new Error("Student not registered");
    // }

    // Ensure joiner is not already in a team
    if (joiner.teamId) {
        throw new Error("You are already in a team");
    }

    // Find team by code
    const team = await repo.findTeamByCode(payload.code);

    if (!team) {
        throw new Error("Invalid team code");
    }

    if (team.vitStudents.length > MAX_TEAM_SIZE) {
        throw new Error("Team is already full");
    }

    try {
        repo.attachStudentToTeam(joiner.id, team.id);
        return {
            name: team.name,
            code: team.code,
        };

    } catch (err: any) {

        // DB-level safety (race conditions)
        if (err.code === "P2002") {
            throw new Error("Student already assigned to a team");
        }
        throw err;
    }
}


export async function leaveTeam() {
    const student = await getCurrentStudent();

    // Ensure the student is in a team.
    if (!student.teamId) {
        throw new Error("Student is not a part of any team!");
    }

    // TODO: Handle creator of team
    // // Find team by code
    // const team = await repo.findTeamByCode(payload.code);

    // if (!team) {
    //     throw new Error("Invalid team code");
    // }

    // if (team.vitStudents.length > MAX_TEAM_SIZE) {
    //     throw new Error("Team is already full");
    // }

    try {
        repo.removeStudentFromTeam(student.id);
        return {
            message: "Student has left the team."
        };

    } catch (err: any) {

        // DB-level safety (race conditions)
        if (err.code === "P2002") {
            throw new Error("Student has already left the team");
        }
        throw err;
    }
}


export async function viewTeam() {
    const student = await getCurrentStudent();

    if (!student) {
        throw new Error("Student not found")
    }

    if (!student.teamId) {
        throw new Error("Student is not a part of any team");
    }

    try {
        const team = await repo.getTeamById(student.teamId);

        if (!team) {
            throw new Error("Team not found");
        }

        return team;
    }
    catch (err: any) {
        throw err;
    }
}




