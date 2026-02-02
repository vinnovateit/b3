import RoundTabs from "@/components/rounds";
import ProfileMenu from "@/components/profileMenu";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import TeamMembers from "@/components/teamMembers";
import type { Team } from "@prisma/client";

interface Round {
  id: string;
  title: string;
  roundNo: number;
  status: "current" | "locked" | "completed";
  teamId: string;
  links: {
    githubLink: string;
    figmaLink: string;
    pptLink: string;
    otherLinks: string;
    progressNote: string;
  };
}

//Temporary rounds data
//Retrieve from DB later
const ROUNDS: Array<{ id: string; title: string; roundNo: number }> = [
  { id: "round-1", title: "Ideation", roundNo: 1 },
  { id: "round-2", title: "Prototype", roundNo: 2 },
  { id: "round-3", title: "Production", roundNo: 3 },
];

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const userSession = session.user as any;
  const teamCode = userSession.teamCode;

  // If user doesn't have a team, redirect to join page
  if (!teamCode) {
    redirect("/join-team");
  }

  let team: (Team & { users: any[], teamLeader: any }) | null = null;

  try {
    team = await prisma.team.findUnique({
      where: { code: teamCode },
      include: {
        users: true,
        teamLeader: {
          select: { id: true, email: true, name: true },
        },
      },
    });
  } catch (error) {
    console.error("[Dashboard] Error fetching team:", {
      error: error instanceof Error ? error.message : "Unknown error",
      teamCode,
    });
  }

  if (!team) {
    return (
      <div className="p-6 text-center">
        <h2>Team Not Found</h2>
        <p>The team associated with your account could not be found.</p>
      </div>
    );
  }

  const accessibleRounds = ROUNDS.filter(round => round.roundNo <= team.roundNo);
  const progressByRound: Record<number, string> = {
    1: team.round1Progress ?? "",
    2: team.round2Progress ?? "",
    3: team.round3Progress ?? "",
  };

  const rounds: Round[] = accessibleRounds.map(round => {
    const isCurrent = team.roundNo === round.roundNo;
    const isCompleted = team.roundNo > round.roundNo;

    return {
      id: round.id,
      title: round.title,
      roundNo: round.roundNo,
      status: isCurrent ? "current" : isCompleted ? "completed" : "locked",
      teamId: team.id,
      links: {
        githubLink: team.githubLink ?? "",
        figmaLink: team.figmaLink ?? "",
        pptLink: team.pptLink ?? "",
        otherLinks: team.otherLinks ?? "",
        progressNote: progressByRound[round.roundNo] ?? "",
      },
      teamInfo: {
        track: team.track,
        projectTitle: team.projectTitle,
        projectDescription: team.projectDescription,
        roundNo: team.roundNo,
      },
    };
  });

  return (
    <div style={{ minHeight: "100vh", background: "#0b1021", color: "#e8ecf5" }}>
      <header style={{ padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 28 }}>Hey, {session.user.name || "Participant"}</h2>
          <p style={{ margin: "0.25rem 0 0 0", color: "#a0a8c0" }}>
            {team.name} : {team.code}
          </p>
        </div>
        <ProfileMenu currentUserEmail={session.user.email} />
      </header>
      <main
        style={{
          padding: "1.5rem",
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <div style={{ width: "100%", maxWidth: 1100 }}>
          <RoundTabs rounds={rounds} />
        </div>
        <TeamMembers team={team} currentUserEmail={session.user.email!} teamLeaderEmail={team.teamLeader?.email} />
      </main>
    </div>
  );
}
