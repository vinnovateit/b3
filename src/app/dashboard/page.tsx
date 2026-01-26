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

  const teamCode = (session.user as any).teamCode;

  if (!teamCode) {
    return (
      <div className="p-6 text-center">
        <h2>No Team Found</h2>
        <p>No team is associated with your account. Please contact support.</p>
      </div>
    );
  }

  let team: (Team & { users: any[] }) | null = null;

  try {
    team = await prisma.team.findUnique({
      where: { code: teamCode },
      include: { users: true },
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
      <header style={{ padding: "1rem 1.5rem", display: "flex", justifyContent: "flex-end" }}>
        <ProfileMenu />
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
        <TeamMembers team={team} />
      </main>
    </div>
  );
}
