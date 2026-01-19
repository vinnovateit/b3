import { TEMP_CURRENT_STUDENT } from "@/constants/team";
import prisma from "@/lib/prisma";

export async function getCurrentStudent() {
    // TODO: Use auth context to get student info
    const TEMP_REG_NO = TEMP_CURRENT_STUDENT;  // Temporary get student

    const student = await prisma.vITStudent.findUnique({
        where: { regNo: TEMP_REG_NO },
    });

    if (!student) {
        throw new Error("Student not found");
    }

    return student;
}
