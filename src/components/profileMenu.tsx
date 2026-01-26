"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)}>Profile</button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            border: "1px solid #ccc",
            padding: 12,
            background: "#000",
            color:"white",
          }}
        >
          <p><strong>Name:</strong> {session?.user?.name || "N/A"}</p>
          <p><strong>Email:</strong> {session?.user?.email || "N/A"}</p>
          <p><strong>Team:</strong> {(session?.user as any)?.teamCode || "N/A"}</p>

          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
