import { auth } from "@/auth";
import { NextResponse } from "next/server";

/**
 * Server-side guard to verify authenticated ADMIN role
 * Use in all /api/admin/* route handlers
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session || !session.user) {
    return {
      authorized: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  const emailLower = String(session.user.email || "").toLowerCase().trim();
  const isOwner = emailLower === "merxodevsolutions@gmail.com";

  // If role is explicitly set to non-admin and not owner, deny access
  if (!isOwner && session.user.role && session.user.role !== "ADMIN") {
    return {
      authorized: false,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { authorized: true, session };
}
