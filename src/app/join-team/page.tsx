"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function JoinTeamPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [mode, setMode] = useState<"join" | "create">("join");
  const [code, setCode] = useState("");
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If user already has a team, redirect to dashboard
    if (session?.user && (session.user as any).teamCode) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleJoinTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();

    if (!trimmed) {
      setError("Enter a team code");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/team/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamCode: trimmed }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid team code");
        setLoading(false);
        return;
      }

      // Refresh session to update teamCode
      await fetch("/api/auth/session");
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = teamName.trim();

    if (!trimmedName) {
      setError("Enter a team name");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/team/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamName: trimmedName,
          description: description.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create team");
        setLoading(false);
        return;
      }

      // Refresh session to update teamCode
      await fetch("/api/auth/session");
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div style={{ minHeight: "100vh", background: "#0b1021", color: "#e8ecf5", display: "grid", placeItems: "center" }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div style={{ minHeight: "100vh", background: "#0b1021", color: "#e8ecf5", display: "grid", placeItems: "center", padding: "2rem" }}>
        <div style={{ textAlign: "center", maxWidth: 420 }}>
          <h1 style={{ margin: "0 0 1rem 0" }}>Not Logged In</h1>
          <p>Please log in first to join a team.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0b1021", color: "#e8ecf5", display: "grid", placeItems: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: 480, background: "#121834", borderRadius: 12, padding: "1.5rem", boxShadow: "0 6px 24px rgba(0,0,0,0.3)" }}>
        <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          <h1 style={{ margin: "0 0 0.5rem 0", fontSize: 22 }}>Team Setup</h1>
          <p style={{ margin: 0, fontSize: 14, color: "#a0a8c0" }}>Create a new team or join an existing one</p>
        </div>

        {/* Mode Toggle */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", background: "#0f1530", borderRadius: 8, padding: "0.25rem" }}>
          <button
            onClick={() => {
              setMode("join");
              setError(null);
            }}
            style={{
              flex: 1,
              padding: "0.6rem",
              borderRadius: 6,
              background: mode === "join" ? "#4f6cff" : "transparent",
              color: mode === "join" ? "white" : "#a0a8c0",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Join Team
          </button>
          <button
            onClick={() => {
              setMode("create");
              setError(null);
            }}
            style={{
              flex: 1,
              padding: "0.6rem",
              borderRadius: 6,
              background: mode === "create" ? "#4f6cff" : "transparent",
              color: mode === "create" ? "white" : "#a0a8c0",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Create Team
          </button>
        </div>

        {mode === "join" ? (
          <form onSubmit={handleJoinTeam}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: 14 }}>Team Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g., TEAM01"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "0.65rem 0.8rem",
                  borderRadius: 8,
                  border: "1px solid #2b3566",
                  background: "#0f1530",
                  color: "#e8ecf5",
                  fontSize: 14,
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.6rem 0.8rem",
                borderRadius: 8,
                background: loading ? "#2b3566" : "#4f6cff",
                color: "white",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: 14,
                fontWeight: 500,
                marginBottom: "0.8rem",
              }}
            >
              {loading ? "Joining..." : "Join Team"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleCreateTeam}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: 14 }}>Team Name</label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g., Team Phoenix"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "0.65rem 0.8rem",
                  borderRadius: 8,
                  border: "1px solid #2b3566",
                  background: "#0f1530",
                  color: "#e8ecf5",
                  fontSize: 14,
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: 14 }}>
                Description <span style={{ color: "#6b738c", fontSize: 12 }}>(optional)</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of your team..."
                disabled={loading}
                rows={3}
                style={{
                  width: "100%",
                  padding: "0.65rem 0.8rem",
                  borderRadius: 8,
                  border: "1px solid #2b3566",
                  background: "#0f1530",
                  color: "#e8ecf5",
                  fontSize: 14,
                  boxSizing: "border-box",
                  resize: "vertical",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.6rem 0.8rem",
                borderRadius: 8,
                background: loading ? "#2b3566" : "#4f6cff",
                color: "white",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: 14,
                fontWeight: 500,
                marginBottom: "0.8rem",
              }}
            >
              {loading ? "Creating..." : "Create Team"}
            </button>

            <p style={{ margin: 0, fontSize: 12, color: "#6b738c", textAlign: "center" }}>
              You will become the team leader and receive a unique team code
            </p>
          </form>
        )}

        {error && <div style={{ color: "#ff8a8a", fontSize: 13, marginBottom: "0.8rem", marginTop: "0.8rem" }}>{error}</div>}

        <button
          type="button"
          onClick={() => signOut({ redirect: true, redirectTo: "/" })}
          style={{
            width: "100%",
            padding: "0.6rem 0.8rem",
            borderRadius: 8,
            background: "transparent",
            color: "#a0a8c0",
            border: "1px solid #2b3566",
            cursor: "pointer",
            fontSize: 14,
            marginTop: "0.8rem",
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
