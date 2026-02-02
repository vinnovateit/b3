"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

interface ProfileMenuProps {
  currentUserEmail?: string;
}

export default function ProfileMenu({ currentUserEmail }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: true, redirectTo: "/" });
  };

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)}>Profile</button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            border: "1px solid #2b3566",
            borderRadius: 8,
            padding: "1rem",
            background: "#121834",
            color: "#e8ecf5",
            minWidth: 250,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <p style={{ margin: "0 0 0.5rem 0", fontSize: 13 }}>
            <strong>Name:</strong> {session?.user?.name || "N/A"}
          </p>
          <p style={{ margin: "0 0 0.5rem 0", fontSize: 13 }}>
            <strong>Email:</strong> {session?.user?.email || "N/A"}
          </p>
          <p style={{ margin: "0 0 1rem 0", fontSize: 13 }}>
            <strong>Team:</strong> {(session?.user as any)?.teamCode || "N/A"}
          </p>

          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "0.6rem 0.8rem",
              borderRadius: 6,
              background: "#4f6cff",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
