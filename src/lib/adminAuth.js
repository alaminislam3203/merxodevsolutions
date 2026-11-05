import { auth } from "@/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export function normalizeRole(rawRole) {
  const r = String(rawRole || "")
    .trim()
    .toUpperCase()
    .replace(/-/g, "_");
  if (r === "ADMIN") return "ADMIN";
  if (r === "TEAM_MEMBER") return "TEAM_MEMBER";
  return "USER";
}

/**
 * Server-side guard to verify authenticated ADMIN (or TEAM_MEMBER when allowTeamMember = true).
 * Use in all /api/admin/* route handlers.
 */
export async function requireAdmin(options = {}) {
  const { allowTeamMember = false } = options;
  const session = await auth();

  if (!session || !session.user) {
    return {
      authorized: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  const emailLower = String(session.user.email || "").toLowerCase().trim();
  const isOwner = emailLower === "merxodevsolutions@gmail.com";

  let role = isOwner ? "ADMIN" : normalizeRole(session.user.role);

  // Sync live role from DB in case Admin recently updated this user's role
  if (!isOwner && emailLower) {
    try {
      const dbUser = await prisma.user.findUnique({
        where: { email: emailLower },
        select: { role: true, isActive: true },
      });
      if (dbUser) {
        if (dbUser.isActive === false) {
          return {
            authorized: false,
            response: NextResponse.json(
              { error: "Account is suspended" },
              { status: 403 }
            ),
          };
        }
        role = normalizeRole(dbUser.role);
      } else {
        const dbAdmin = await prisma.admin.findUnique({
          where: { email: emailLower },
          select: { id: true },
        });
        if (dbAdmin) role = "ADMIN";
      }
    } catch (_) {}
  }

  if (role === "ADMIN") {
    return {
      authorized: true,
      session,
      role: "ADMIN",
      isAdmin: true,
      isTeamMember: false,
    };
  }

  if (allowTeamMember && role === "TEAM_MEMBER") {
    return {
      authorized: true,
      session,
      role: "TEAM_MEMBER",
      isAdmin: false,
      isTeamMember: true,
    };
  }

  return {
    authorized: false,
    role,
    response: NextResponse.json(
      { error: "Forbidden: Insufficient role permissions" },
      { status: 403 }
    ),
  };
}
