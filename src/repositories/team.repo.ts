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
 * Team name Check
 */
export async function teamNameExists(name: string) {
    return prisma.team.findFirst({
        where: { name },
    });
}


/**
 * Find student by regno list
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