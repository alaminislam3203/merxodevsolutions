import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";
import { parseEnvStats } from "@/lib/envParser";

export const dynamic = "force-dynamic";

// GET /api/admin/env-vault - List all env items
export async function GET(request) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const environment = searchParams.get("environment") || "";

    const where = {};
    if (search) {
      where.projectName = search;
    }
    if (environment && environment !== "all") {
      where.environment = environment;
    }

    const items = await prisma.envVault.findMany({
      where,
      orderBy: { updatedAt: "desc" },
    });

    // Map items for the list view, calculate stats and hide full raw content for security
    const list = items.map((item) => {
      const stats = parseEnvStats(item.content);
      return {
        id: item.id,
        projectName: item.projectName,
        environment: item.environment,
        fileName: item.fileName,
        description: item.description,
        keyCount: stats.keyCount,
        keys: stats.keys,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
    });

    return NextResponse.json({ success: true, items: list });
  } catch (error) {
    console.error("GET /api/admin/env-vault error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch env records" }, { status: 500 });
  }
}

// POST /api/admin/env-vault - Create new env item
export async function POST(request) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  try {
    const body = await request.json();
    const { projectName, environment, fileName, content, description } = body;

    if (!projectName || !projectName.trim()) {
      return NextResponse.json({ error: "Project name is required" }, { status: 400 });
    }

    if (!content || !content.trim()) {
      return NextResponse.json({ error: "Environment content (.env) cannot be empty" }, { status: 400 });
    }

    const created = await prisma.envVault.create({
      data: {
        projectName: projectName.trim(),
        environment: environment || "production",
        fileName: fileName?.trim() || ".env",
        content: content.trim(),
        description: description?.trim() || null,
      },
    });

    const stats = parseEnvStats(created.content);

    return NextResponse.json(
      {
        success: true,
        item: {
          id: created.id,
          projectName: created.projectName,
          environment: created.environment,
          fileName: created.fileName,
          description: created.description,
          keyCount: stats.keyCount,
          createdAt: created.createdAt,
          updatedAt: created.updatedAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/admin/env-vault error:", error);
    return NextResponse.json({ error: error.message || "Failed to save env record" }, { status: 500 });
  }
}
