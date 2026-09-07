import { NextResponse } from "next/server";
import { getTeamMembers } from "@/app/lib/team";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET /api/team — public, returns active team members
export async function GET() {
  try {
    const team = await getTeamMembers();
    return NextResponse.json(
      { team },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
