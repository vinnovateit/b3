"use client";

import SubmissionBox from "./submission";

type RoundProps = {
  title: string;
  status: "current" | "completed" | "locked";
  teamId: string;
  roundNo: number;
  links: {
    githubLink: string;
    figmaLink: string;
    pptLink: string;
    otherLinks: string;
    progressNote: string;
  };
  teamInfo?: {
    track?: string | null;
    projectTitle?: string | null;
    projectDescription?: string | null;
    roundNo: number;
  };
};

export default function RoundTemplate({ title, status, teamId, roundNo, links, teamInfo }: RoundProps) {
  const isLocked = status === "locked";

  return (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      <div>
        <h3 style={{ margin: "4px 0", fontSize: 22 }}>{title}</h3>
      </div>

      <SubmissionBox
        teamId={teamId}
        roundNo={roundNo}
        initialLinks={links}
        isLocked={isLocked}
        teamInfo={teamInfo}
      />
    </div>
  );
}
