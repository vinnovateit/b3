"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Team, User } from "@prisma/client";

interface TeamMembersProps {
  team: Team & { users: User[], teamLeader: any };
  currentUserEmail: string;
  teamLeaderEmail?: string;
}

export default function TeamMembers({ team, currentUserEmail, teamLeaderEmail }: TeamMembersProps) {
  const router = useRouter();
  const users = team?.users || [];
  const isCurrentUserLeader = currentUserEmail === teamLeaderEmail;
  const isOnlyMember = users.length === 1;
  const [removingEmail, setRemovingEmail] = useState<string | null>(null);
  const [disbanding, setDisbanding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRemoveMember = async (userEmail: string) => {
    if (!window.confirm(`Remove ${userEmail} from the team?`)) {
      return;
    }

    setRemovingEmail(userEmail);
    setError(null);

    try {
      const response = await fetch("/api/team/remove-member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamId: team.id,
          userEmailToRemove: userEmail,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to remove member");
        setRemovingEmail(null);
        return;
      }

      // Reload page to reflect changes
      window.location.reload();
    } catch (err) {
      setError("Something went wrong");
      setRemovingEmail(null);
    }
  };

  const handleDisbandTeam = async () => {
    if (!window.confirm("Are you sure you want to disband this team? This action cannot be undone.")) {
      return;
    }

    setDisbanding(true);
    setError(null);

    try {
      const response = await fetch("/api/team/disband", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to disband team");
        setDisbanding(false);
        return;
      }

      // Redirect to join-team page
      router.push("/join-team");
      router.refresh();
    } catch (err) {
      setError("Something went wrong");
      setDisbanding(false);
    }
  };

  if (users.length === 0) {
    return (
      <div className="teamBox">
        <h3 className="teamTitle">Team Details</h3>
        <p>No team members found.</p>
      </div>
    );
  }

  return (
    <div className="teamBox">
      <h3 className="teamTitle">Team Details</h3>
      <div className="teamInfo">
        <p>
          <strong>Team Name:</strong> {team.name}
        </p>
        <p>
          <strong>Team Code:</strong> {team.code}
        </p>
      </div>

      <div className="memberList">
        <h4>Members ({users.length})</h4>
        {error && <div style={{ color: "#ff8a8a", marginBottom: "0.8rem", fontSize: 13 }}>{error}</div>}
        {users.map((user) => {
          const isLeader = user.email === teamLeaderEmail;
          const isCurrentUser = user.email === currentUserEmail;

          return (
            <div key={user.id} className="memberRow">
              <div className="memberInfo">
                <p className="memberName">{user.name || "Anonymous"}</p>
                <p className="memberEmail">{user.email}</p>
              </div>

              {isLeader ? (
                <span className="leaderBadge">Team Leader</span>
              ) : isCurrentUserLeader && !isCurrentUser ? (
                <button
                  className="removeBtn"
                  onClick={() => handleRemoveMember(user.email)}
                  disabled={removingEmail === user.email}
                  style={{
                    opacity: removingEmail === user.email ? 0.6 : 1,
                    cursor: removingEmail === user.email ? "not-allowed" : "pointer",
                  }}
                >
                  {removingEmail === user.email ? "Removing..." : "Remove"}
                </button>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Disband Team Button (only for leader with no other members) */}
      {isCurrentUserLeader && isOnlyMember && (
        <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid #2b3566" }}>
          <button
            onClick={handleDisbandTeam}
            disabled={disbanding}
            style={{
              width: "100%",
              padding: "0.6rem 0.8rem",
              borderRadius: 6,
              background: disbanding ? "#6b3838" : "#8b3a3a",
              color: "white",
              border: "none",
              cursor: disbanding ? "not-allowed" : "pointer",
              fontSize: 13,
              fontWeight: 500,
              opacity: disbanding ? 0.6 : 1,
            }}
          >
            {disbanding ? "Disbanding..." : "Disband Team"}
          </button>
          <p style={{ margin: "0.5rem 0 0 0", fontSize: 11, color: "#6b738c", textAlign: "center" }}>
            This will permanently delete the team
          </p>
        </div>
      )}
    </div>
  );
}
