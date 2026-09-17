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
        twoFactorCode: { label: "2FA Code", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const emailLower = credentials.email.toLowerCase().trim();
        const twoFactorCode = credentials?.twoFactorCode?.trim();

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
            // Check if Admin has 2FA enabled
            let is2FA = admin.twoFactorEnabled;
            if (is2FA === undefined) {
              try {
                const rows = await prisma.$queryRaw`SELECT "twoFactorEnabled" FROM "Admin" WHERE "id" = ${admin.id} LIMIT 1`;
                is2FA = Boolean(rows?.[0]?.twoFactorEnabled);
              } catch (_) {}
            }

            if (is2FA) {
              if (!twoFactorCode || twoFactorCode.length !== 6) {
                return null;
              }
              const validToken = await prisma.twoFactorToken.findFirst({
                where: {
                  email: emailLower,
                  code: twoFactorCode,
                  expiresAt: { gt: new Date() },
                },
              });
              if (!validToken) {
                return null;
              }
              // Clear used token
              await prisma.twoFactorToken.deleteMany({ where: { email: emailLower } });
            }

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
            // Check if User has 2FA enabled
            let is2FA = user.twoFactorEnabled;
            if (is2FA === undefined) {
              try {
                const rows = await prisma.$queryRaw`SELECT "twoFactorEnabled" FROM "User" WHERE "id" = ${user.id} LIMIT 1`;
                is2FA = Boolean(rows?.[0]?.twoFactorEnabled);
              } catch (_) {}
            }

            if (is2FA) {
              if (!twoFactorCode || twoFactorCode.length !== 6) {
                return null;
              }
              const validToken = await prisma.twoFactorToken.findFirst({
                where: {
                  email: emailLower,
                  code: twoFactorCode,
                  expiresAt: { gt: new Date() },
                },
              });
              if (!validToken) {
                return null;
              }
              // Clear used token
              await prisma.twoFactorToken.deleteMany({ where: { email: emailLower } });
            }

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