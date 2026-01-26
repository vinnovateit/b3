import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import type { DefaultSession } from "next-auth";

/**
 * Extend NextAuth session type to include teamCode
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      teamCode?: string;
    };
  }
}

declare module "next-auth" {
  interface JWT {
    teamCode?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Team Code",
      credentials: {
        code: { label: "Team Code", type: "text", placeholder: "TEAM01" },
      },
      async authorize(credentials) {
        const code = credentials?.code;

        if (!code || typeof code !== "string") {
          console.warn("[Auth] Missing or invalid team code");
          return null;
        }

        const normalizedCode = code.trim().toUpperCase();

        try {
          // Find team by code
          const team = await prisma.team.findUnique({
            where: { code: normalizedCode },
            include: {
              users: {
                take: 1,
              },
            },
          });

          if (!team) {
            console.warn(`[Auth] Team not found with code: ${normalizedCode}`);
            return null;
          }

          // Get or create a user for this team
          let user = team.users[0];

          if (!user) {
            // Create a user for this team if none exists
            user = await prisma.user.create({
              data: {
                email: `${normalizedCode.toLowerCase()}@team.local`,
                name: team.name,
                teamCode: normalizedCode,
              },
            });
          }

          // Return user object with team info
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            teamCode: team.code,
          };
        } catch (error) {
          console.error("[Auth] Authorization error:", {
            error: error instanceof Error ? error.message : "Unknown error",
            code: normalizedCode,
          });
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.teamCode = (user as any).teamCode;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && typeof token.teamCode === "string") {
        session.user.teamCode = token.teamCode;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
});
