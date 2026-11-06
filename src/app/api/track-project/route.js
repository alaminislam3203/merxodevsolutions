import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ensureWorkspaceTables } from "@/lib/workspaceStore";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await ensureWorkspaceTables();
    const { searchParams } = new URL(request.url);
    const query = String(searchParams.get("q") || "").trim();

    if (!query || query.length < 3) {
      return NextResponse.json(
        { error: "Please enter a valid Project Tracking ID (e.g. MD-1024) or Email" },
        { status: 400 }
      );
    }

    const qUpper = query.toUpperCase();
    const qLower = query.toLowerCase();

    const rows = await prisma.$queryRaw`
      SELECT
        "id", "clientName", "clientEmail", "projectTitle", "serviceType",
        "budget", "status", "progress", "milestones", "liveDemoUrl",
        "invoiceAmount", "invoiceStatus", "createdAt", "updatedAt"
      FROM "ClientLead"
      WHERE UPPER("id") = ${qUpper}
         OR LOWER("clientEmail") = ${qLower}
      ORDER BY "updatedAt" DESC
      LIMIT 10
    `;

    const projects = (rows || []).map((l) => {
      let milestones = { uiDesign: 100, frontend: 40, backend: 20, deployment: 0 };
      try {
        milestones =
          typeof l.milestones === "string"
            ? JSON.parse(l.milestones)
            : l.milestones || milestones;
      } catch {}
      return { ...l, milestones };
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("GET /api/track-project error:", error);
    return NextResponse.json(
      { error: "Unable to look up project right now" },
      { status: 500 }
    );
  }
}

