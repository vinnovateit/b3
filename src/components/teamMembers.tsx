"use client";

import type { Team, User } from "@prisma/client";

interface TeamMembersProps {
  team: Team & { users: User[] };
}

export default function TeamMembers({ team }: TeamMembersProps) {
  const users = team?.users || [];

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
        {users.map((user, index) => {
          const isLeader = index === 0;

          return (
            <div key={user.id} className="memberRow">
              <div className="memberInfo">
                <p className="memberName">{user.name || "Anonymous"}</p>
                <p className="memberEmail">{user.email}</p>
              </div>

              {isLeader ? (
                <span className="leaderBadge">Team Leader</span>
              ) : (
                <button
                  className="removeBtn"
                  disabled
                >
                  Remove member
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
