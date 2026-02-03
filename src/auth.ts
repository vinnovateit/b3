import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { DefaultSession } from "next-auth";

/**
 * Extend NextAuth session type to include teamCode and isTeamLeader
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      teamCode?: string | null;
      isTeamLeader?: boolean;
    };
  }
}

declare module "next-auth" {
  interface JWT {
    teamCode?: string | null;
    isTeamLeader?: boolean;
  }
}

// Validate email domain
function isVITStudentEmail(email: string): boolean {
  return email.endsWith("@vitstudent.ac.in");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: false,
    }),
  ],
  pages: {
    error: "/",
  },
  callbacks: {
    async signIn({ user, email }) {
      // // Validate email domain
      //Local testing bypass
      // if (!user.email || !isVITStudentEmail(user.email)) {
      //   console.warn(`[Auth] Unauthorized login attempt from non-VIT email: ${user.email}`);
      //   return false;
      // }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        // Fetch team info from database
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
          include: {
            leadTeams: {
              select: { code: true },
              take: 1,
            },
          },
        });

        if (dbUser) {
          // Check if user is leading any team
          const leadsTeam = dbUser.leadTeams.length > 0;
          token.teamCode = dbUser.teamCode;
          token.isTeamLeader = leadsTeam;
        }
      } else if (token.email) {
        // Refresh team info on each session check
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email as string },
          include: {
            leadTeams: {
              select: { code: true },
              take: 1,
            },
          },
        });

        if (dbUser) {
          token.teamCode = dbUser.teamCode;
          token.isTeamLeader = dbUser.leadTeams.length > 0;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.teamCode = (token.teamCode as string | null) || null;
        session.user.isTeamLeader = (token.isTeamLeader as boolean) || false;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
