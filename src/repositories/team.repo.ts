/**
 * @fileoverview Prisma database operations for Team and Student management.
 * Provides abstraction for team registration, name validation, and student availability checks.
 */

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";


/**
 * Create team
 */
export async function createTeam(data: Prisma.TeamCreateInput) {
    return prisma.team.create({ data });
}


/**
 * Get team
 */
export async function getTeamById(teamId: string) {
    return prisma.team.findFirst({
        where: { id: teamId },
        include: {
            vitStudents: true,
        },
    })
}


/**
 * Add student to team
 */
export async function attachStudentToTeam(
    studentId: string,
    teamId: string
) {
    return prisma.vITStudent.update({
        where: { id: studentId },
        data: { teamId },
    });
}


/**
 * Remove student from team
 */
export async function removeStudentFromTeam(
    studentId: string,
) {
    return prisma.vITStudent.update({
        where: { id: studentId },
        data: { teamId: null },
    });
}


/**
 * Team name Check
 */
export async function teamNameExists(name: string) {
    return prisma.team.findFirst({
        where: { name },
    });
}


/**
 * Find team by code
 */
export async function findTeamByCode(code: string) {
    return prisma.team.findUnique({
        where: { code },
        include: {
            vitStudents: true,
        },
    });
}


/**
 * Find student by regNo list
 */
export async function findStudentByRegNo(
    regNo: string
) {
    return prisma.vITStudent.findFirst({
        where: { regNo },
    });
}


/**
 * Check if any student already has a team
 */
export async function studentsAlreadyInTeam(
    regNos: string[]
) {
    return prisma.vITStudent.findFirst({
        where: {
            regNo: { in: regNos },
            teamId: { not: null },
        },
    });
}