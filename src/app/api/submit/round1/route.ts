import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOption } from '@/app/lib/auth'; 
import { prisma } from "@/app/lib/prisma";


export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOption)

    console.log('[SUBMIT/ROUND1] Session:', session?.user?.email, session?.user?.id)

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'You must be logged in' },
        { status: 401 }
      )
    }

    const body = await req.json()

    const {
      projectTitle,
      projectDescription,
      githubLink = null,
      figmaLink = null,
      pptLink = null,
      otherLinks = null,
      techStack = [],
      track = null,
    } = body

    if (!projectTitle?.trim() || !projectDescription?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Title and description are required' },
        { status: 400 }
      )
    }

    if (!Array.isArray(techStack) || techStack.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Please select at least one technology' },
        { status: 400 }
      )
    }

    const student = await prisma.vITStudent.findUnique({
      where: { userId: session.user.id as string },
      select: { teamId: true },
    })

    if (!student?.teamId) {
      return NextResponse.json(
        { success: false, error: 'You must join/create a team first' },
        { status: 403 }
      )
    }

    const existing = await prisma.round1.findUnique({
      where: { teamId: student.teamId },
    })

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Your team has already submitted Round 1' },
        { status: 409 }
      )
    }

    const submission = await prisma.round1.create({
      data: {
        teamId: student.teamId,
        projectTitle: projectTitle.trim(),
        projectDescription: projectDescription.trim(),
        githubLink: githubLink?.trim() ?? null,
        figmaLink: figmaLink?.trim() ?? null,
        pptLink: pptLink?.trim() ?? null,
        otherLinks: otherLinks?.trim() ?? null,
        techStack: techStack.map((t: string) => t.trim()),
        track: track?.trim() ?? null,
        submittedBy: session.user.id as string,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Round 1 submitted successfully',
        submissionId: submission.id,
      },
      { status: 201 }
    )
  } catch (err: any) {
    console.error('[ROUND1 SUBMIT ERROR]', err)
    return NextResponse.json(
      { success: false, error: 'Server error', details: err.message },
      { status: 500 }
    )
  }
}
  export async function GET(req: NextRequest) {
  console.log("=== DEBUG GET /submit/round1 ===");
  console.log("Cookies (req.cookies):", req.cookies.getAll());
  console.log("Raw Cookie header:", req.headers.get("cookie"));

  
  const session = await getServerSession(authOption);
  console.log("getServerSession result:", session ? {
    userId: session.user?.id,
    email: session.user?.email,
    expires: session.expires
  } : "NULL - no session");
  if (!session?.user?.id) {
    return NextResponse.json({ submitted: false, reason: "not logged in" }, { status: 200 });
  }

  const vitStudent = await prisma.vITStudent.findUnique({
    where: { userId: session.user.id },
    select: { 
      id: true, 
      teamId: true,
      name: true,          
      regNo: true
    },
  });

  console.log("Current user VITStudent:", vitStudent);

  if (!vitStudent) {
    return NextResponse.json({ 
      submitted: false, 
      reason: "Not a VIT student record" 
    }, { status: 200 });
  }

  if (!vitStudent.teamId) {
    return NextResponse.json({ 
      submitted: false, 
      reason: "User is not in any team yet", 
      vitStudentId: vitStudent.id 
    }, { status: 200 });
  }

  const submission = await prisma.round1.findUnique({
    where: { teamId: vitStudent.teamId },
  });

  console.log("Found submission for team:", submission);

  return NextResponse.json({
    submitted: !!submission,
    teamId: vitStudent.teamId,
    submission: submission ? { 
      id: submission.id, 
      submittedAt: submission.submittedAt 
    } : null
  }, { status: 200 });
}