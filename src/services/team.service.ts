/**
 * @fileoverview Service layer for Team registration and business logic.
 * Handles the orchestration of team creation, including student validation,
 * duplicate name checks, and collision-resistant team code generation.
 * @module services/team.service
 */

import prisma from "@/lib/prisma";

import * as repo from "@/repositories/team.repo";
import { getCurrentStudent } from "@/lib/getCurrentStudent";
import { generateTeamCode } from "@/utils/teamCode";
import { CreateTeamDTO, JoinTeamDTO, TransferLeaderDTO, UpdateTeamDTO, RemoveTeamMemberDTO } from "@/types/team";
import { MAX_TEAM_CODE_GEN_TRIES, MAX_TEAM_SIZE } from "@/constants/team";

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

            // Create team using transaction
            return await prisma.$transaction(async (tx) => {
                const team = await tx.team.create({
                    data: {
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

                        leaderId: creator.id,    // Track team creator / leader
                    },
                });

                // Only create team if student connects to the team
                await tx.vITStudent.update({
                    where: { id: creator.id },
                    data: { teamId: team.id },
                });

                return team;
            });

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
        await repo.attachStudentToTeam(joiner.id, team.id);
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
        throw new Error("Student is not a part of any team");
    }

    // Check whether the student is team leader or not
    const team = await repo.getTeamById(student.teamId);

    if (!team) {
        throw new Error("Team not found");
    }

    // Leader cannot leave the team
    if (team.leaderId === student.id) {
        throw new Error("Team leader cannot leave the team");
    }

    try {
        await repo.removeStudentFromTeam(student.id);
        return {
            message: "Student has left the team."
        };

    } catch (err: any) {
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


export async function disbandTeam() {
    const student = await getCurrentStudent();

    // Ensure the student is in a team.
    if (!student.teamId) {
        throw new Error("Student is not a part of any team");
    }

    // Check whether the student is team leader or not
    const team = await repo.getTeamById(student.teamId);

    if (!team) {
        throw new Error("Team not found");
    }

    // Only Leader can disband the team
    if (team.leaderId !== student.id) {
        throw new Error("Only team leader can disband the team");
    }

    try {
        // Delete team using transaction
        await prisma.$transaction(async (tx) => {
            // Only delete team if every student is removed from the team
            await tx.vITStudent.updateMany({
                where: { teamId: team.id },
                data: { teamId: null },
            });

            await tx.team.delete({
                where: { id: team.id },
            });
        });
        return "Team deleted successfully"

    } catch (err: any) {
        throw err;
    }
}


export async function updateTeam(payload: UpdateTeamDTO) {
    const student = await getCurrentStudent();

    // Ensure the student is in a team.
    if (!student.teamId) {
        throw new Error("Student is not a part of any team");
    }

    // Check whether the student is team leader or not
    const team = await repo.getTeamById(student.teamId);

    if (!team) {
        throw new Error("Team not found");
    }

    // Only leader can edit the details
    if (team.leaderId !== student.id) {
        throw new Error("Only team leader can edit the team details");
    }

    return await repo.updateTeamById(team.id, payload);
}


export async function transferLeadership(payload: TransferLeaderDTO) {
    const student = await getCurrentStudent();
    // Ensure the student is in a team.
    if (!student.teamId) {
        throw new Error("Student is not a part of any team");
    }

    // Check whether the student is team leader or not
    const team = await repo.getTeamById(student.teamId);

    if (!team) {
        throw new Error("Team not found");
    }

    // Only leader can transfer leadership
    if (team.leaderId !== student.id) {
        throw new Error("Only team leader can transfer team leadership");
    }

    if (team.leaderId === payload.newLeaderId) {
        throw new Error("Already the team leader")
    }

    // Ensure new leader is in the same team
    const newLeader = await prisma.vITStudent.findUnique({
        where: { id: payload.newLeaderId },
    });

    if (!newLeader || newLeader.teamId !== team.id) {
        throw new Error("New leader must be a member of the same team");
    }

    // Transfer leadership
    await repo.updateTeamLeader(team.id, payload.newLeaderId);

    return {
        success: true,
        leaderId: payload.newLeaderId,
    };
}


export async function removeMember(payload: RemoveTeamMemberDTO) {
    const leader = await getCurrentStudent();
    // Ensure the student is in a team.
    if (!leader.teamId) {
        throw new Error("Student is not a part of any team");
    }

    // Check whether the student is team leader or not
    const team = await repo.getTeamById(leader.teamId);

    if (!team) {
        throw new Error("Team not found");
    }

    // Only leader can remove team member
    if (team.leaderId !== leader.id) {
        throw new Error("Only team leader can remove a member");
    }

    if (team.leaderId === payload.removeMemberId) {
        throw new Error("Team leader cannot be removed")
    }

    // Ensure the member is in the same team
    const removeMember = await prisma.vITStudent.findUnique({
        where: { id: payload.removeMemberId },
    });

    if (!removeMember || removeMember.teamId !== team.id) {
        throw new Error("Member is not in the team");
    }

    // Remove member
    await repo.removeStudentFromTeam(payload.removeMemberId);

    return {
        success: true,
        removeMemberId: payload.removeMemberId,
    };
}








