"use client";

import { useEffect } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isSigningIn, setIsSigningIn] = React.useState(false);

  useEffect(() => {
    // If user is already logged in, redirect appropriately
    if (status === "authenticated" && session?.user) {
      const userSession = session.user as any;
      if (userSession.teamCode) {
        // User has a team, go to dashboard
        router.push("/dashboard");
      } else {
        // User needs to join a team
        router.push("/join-team");
      }
    }
  }, [session, router, status]);

  // Show loading state while auth is being checked
  if (status === "loading") {
    return (
      <div style={{ minHeight: "100vh", background: "#0b1021", color: "#e8ecf5", display: "grid", placeItems: "center" }}>
        <p>Loading...</p>
      </div>
    );
  }

  // If already authenticated, show loading instead of login form
  if (status === "authenticated") {
    return (
      <div style={{ minHeight: "100vh", background: "#0b1021", color: "#e8ecf5", display: "grid", placeItems: "center" }}>
        <p>Redirecting...</p>
      </div>
    );
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsSigningIn(true);
      await signIn("google");
    } catch (error) {
      console.error("Sign in error:", error);
      setIsSigningIn(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0b1021", color: "#e8ecf5", display: "grid", placeItems: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: 420, background: "#121834", borderRadius: 12, padding: "1.5rem", boxShadow: "0 6px 24px rgba(0,0,0,0.3)", textAlign: "center" }}>
        <h1 style={{ margin: "0 0 0.5rem 0", fontSize: 24 }}>Yantra</h1>
        <p style={{ margin: "0 0 1.5rem 0", color: "#a0a8c0", fontSize: 14 }}>Sign in with your VIT Student email to continue</p>

        <button
          onClick={handleGoogleSignIn}
          disabled={isSigningIn}
          style={{
            width: "100%",
            padding: "0.75rem 1rem",
            borderRadius: 8,
            background: isSigningIn ? "#2b3566" : "#4f6cff",
            color: "white",
            border: "none",
            cursor: isSigningIn ? "not-allowed" : "pointer",
            fontSize: 15,
            fontWeight: 500,
          }}
        >
          {isSigningIn ? "Signing in..." : "Sign in with Google"}
        </button>

        <p style={{ margin: "1.5rem 0 0 0", fontSize: 12, color: "#6b738c" }}>
          Only @vitstudent.ac.in email addresses are allowed
        </p>
      </div>
    </div>
  );
}

