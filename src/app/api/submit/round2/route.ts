import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma"; 

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOption);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "You must be logged in" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const {
      implementationDescription,
      challengesFaced,
      learnings,
      futureScope,
      demoVideoLink,
      liveDeploymentLink,
      updatedGithubLink,
      additionalMaterials,
      techStackUpdates = [],
    } = body;

    if (!demoVideoLink?.trim()) {
      return NextResponse.json(
        { success: false, error: "Demo video link is required for Round 2" },
        { status: 400 }
      );
    }

    const student = await prisma.vITStudent.findUnique({
      where: { userId: session.user.id as string },
      select: { teamId: true },
    });

    if (!student?.teamId) {
      return NextResponse.json(
        { success: false, error: "You are not part of any team" },
        { status: 403 }
      );
    }

    const existing = await prisma.round2.findUnique({
      where: { teamId: student.teamId },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "Your team has already submitted Round 2" },
        { status: 409 }
      );
    }

    const submission = await prisma.round2.create({
      data: {
        teamId: student.teamId,
        implementationDescription: implementationDescription?.trim() ?? null,
        challengesFaced: challengesFaced?.trim() ?? null,
        learnings: learnings?.trim() ?? null,
        futureScope: futureScope?.trim() ?? null,
        demoVideoLink: demoVideoLink.trim(),
        liveDeploymentLink: liveDeploymentLink?.trim() ?? null,
        updatedGithubLink: updatedGithubLink?.trim() ?? null,
        additionalMaterials: additionalMaterials?.trim() ?? null,
        techStackUpdates: Array.isArray(techStackUpdates)
          ? techStackUpdates.map((t: string) => t.trim())
          : [],
        submittedBy: session.user.id as string,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Round 2 submitted successfully",
        submissionId: submission.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[ROUND2_SUBMIT_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOption);

    if (!session?.user?.id) {
      return NextResponse.json({ submitted: false, reason: "not logged in" });
    }

    const student = await prisma.vITStudent.findUnique({
      where: { userId: session.user.id as string },
      select: { teamId: true },
    });

    if (!student?.teamId) {
      return NextResponse.json({ submitted: false, reason: "no team" });
    }

    const submission = await prisma.round2.findUnique({
      where: { teamId: student.teamId },
      select: { id: true, submittedAt: true, demoVideoLink: true },
    });

    return NextResponse.json({
      submitted: !!submission,
      submittedAt: submission?.submittedAt,
      demoVideoLink: submission?.demoVideoLink,
    });
  } catch {
    return NextResponse.json({ submitted: false });
  }
}