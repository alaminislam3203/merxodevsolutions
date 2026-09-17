import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const emailLower = credentials.email.toLowerCase().trim();

        // 1. Try Admin Account
        const admin = await prisma.admin.findUnique({
          where: { email: emailLower },
        });

        if (admin) {
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            admin.password
          );
          if (isPasswordValid) {
            return {
              id: admin.id,
              email: admin.email,
              name: admin.name,
              image: admin.image || null,
              role: "ADMIN",
            };
          }
        }

        // 2. Try User Account
        const user = await prisma.user.findUnique({
          where: { email: emailLower },
        });

        if (user) {
          const isUserPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isUserPasswordValid) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
              role: user.role || "USER",
            };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    authorized: authConfig.callbacks.authorized,
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role || "USER";
        token.image = user.image || null;
      }
      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
        if (session.image !== undefined) token.image = session.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role || "USER";
        session.user.image = token.image || null;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
});