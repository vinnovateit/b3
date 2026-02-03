"use client";

import { useMemo, useState } from "react";
import RoundTemplate from "./roundsTemp";

type Round = {
  id: string;
  title: string;
  roundNo: number;
  status: "current" | "completed" | "locked";
  teamId: string;
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

type Props = {
  rounds: Round[];
};

export default function RoundTabs({ rounds }: Props) {
  const initialActive = useMemo(() => rounds[rounds.length - 1]?.id, [rounds]);
  const [active, setActive] = useState(initialActive);
  
  const currentRoundNo = useMemo(() => Math.max(...rounds.map(r => r.roundNo)), [rounds]);

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <div style={{ display: "grid", gap: "0.75rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        {rounds.map(r => {
          const isActive = r.id === active;
          const isDisabled = r.roundNo < currentRoundNo;
          return (
            <button
              key={r.id}
              onClick={() => setActive(r.id)}
              disabled={isDisabled}
              style={{
                border: "1px solid #26335c",
                background: isActive ? "#1a2342" : "#0f162e",
                color: "#e8ecf5",
                padding: "1rem",
                textAlign: "left",
                borderRadius: 10,
                cursor: isDisabled ? "not-allowed" : "pointer",
                opacity: isDisabled ? 0.5 : 1,
                boxShadow: isActive ? "0 10px 25px rgba(0,0,0,0.35)" : "none",
                transition: "transform 0.15s ease, box-shadow 0.2s ease",
              }}
            >
              <div style={{ fontWeight: 700, marginTop: 6 }}>Round {r.roundNo}</div>
            </button>
          );
        })}
      </div>

      <div style={{ background: "#0f162e", border: "1px solid #26335c", borderRadius: 12, padding: "1rem" }}>
        {rounds.map(
          r =>
            r.id === active && (
              <RoundTemplate
                key={r.id}
                title={r.title}
                status={r.status}
                links={r.links}
                teamId={r.teamId}
                roundNo={r.roundNo}
                teamInfo={r.teamInfo}
              />
            )
        )}
      </div>
    </div>
  );
}
