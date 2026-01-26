"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function HomePage() {
	const router = useRouter();
	const [code, setCode] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const trimmed = code.trim().toUpperCase();
		if (!trimmed) {
			setError("Enter a team code");
			return;
		}
		
		setError(null);
		setLoading(true);

		try {
			const result = await signIn("credentials", {
				code: trimmed,
				redirect: false,
			});

			if (result?.error) {
				setError("Invalid team code");
				setLoading(false);
			} else {
				router.push("/dashboard");
				router.refresh();
			}
		} catch (err) {
			setError("Something went wrong");
			setLoading(false);
		}
	};

	return (
		<div style={{ minHeight: "100vh", background: "#0b1021", color: "#e8ecf5", display: "grid", placeItems: "center", padding: "2rem" }}>
			<form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 420, background: "#121834", borderRadius: 12, padding: "1.25rem", boxShadow: "0 6px 24px rgba(0,0,0,0.3)" }}>
				<h1 style={{ margin: 0, marginBottom: "0.75rem", fontSize: 20 }}>Enter Team Code</h1>
				<input
					type="text"
					value={code}
					onChange={(e) => setCode(e.target.value)}
					placeholder="e.g., TEAM01"
					disabled={loading}
					style={{ width: "100%", padding: "0.65rem 0.8rem", borderRadius: 8, border: "1px solid #2b3566", background: "#0f1530", color: "#e8ecf5" }}
				/>
				<button 
					type="submit" 
					disabled={loading}
					style={{ marginTop: "0.8rem", width: "100%", padding: "0.6rem 0.8rem", borderRadius: 8, background: loading ? "#2b3566" : "#4f6cff", color: "white", border: "none", cursor: loading ? "not-allowed" : "pointer" }}
				>
					{loading ? "Logging in..." : "Go to Dashboard"}
				</button>
				{error && <div style={{ marginTop: 8, color: "#ff8a8a" }}>{error}</div>}
			</form>
		</div>
	);
}

