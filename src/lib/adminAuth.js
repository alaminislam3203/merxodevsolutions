import { auth } from "@/auth";
import { NextResponse } from "next/server";

/**
 * Server-side guard to verify authenticated ADMIN role
 * Use in all /api/admin/* route handlers
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session || session.user?.role !== "ADMIN") {
    return {
      authorized: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  return { authorized: true, session };
}
