import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";
import { generateEnvExample, maskEnvSecrets, parseEnvStats } from "@/lib/envParser";

export const dynamic = "force-dynamic";

// GET /api/admin/env-vault/[id] - Fetch single env item
export async function GET(request, { params }) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  try {
    const { id } = await params;
    const item = await prisma.envVault.findUnique({
      where: { id },
    });

    if (!item) {
      return NextResponse.json({ error: "Environment record not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const download = searchParams.get("download");
    const type = searchParams.get("type"); // "env" | "example"

    const exampleContent = generateEnvExample(item.content);

    // Direct file download handler
    if (download === "1") {
      const isExample = type === "example";
      const fileData = isExample ? exampleContent : item.content;
      const downloadFileName = isExample
        ? `${item.projectName.toLowerCase().replace(/[^a-z0-9_-]/g, "-")}.env.example`
        : `${item.projectName.toLowerCase().replace(/[^a-z0-9_-]/g, "-")}.env`;

      return new Response(fileData, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Content-Disposition": `attachment; filename="${downloadFileName}"`,
        },
      });
    }

    const stats = parseEnvStats(item.content);
    const maskedContent = maskEnvSecrets(item.content);

    return NextResponse.json({
      success: true,
      item: {
        id: item.id,
        projectName: item.projectName,
        environment: item.environment,
        fileName: item.fileName,
        description: item.description,
        content: item.content,
        exampleContent,
        maskedContent,
        stats,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      },
    });
  } catch (error) {
    console.error("GET /api/admin/env-vault/[id] error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch env record" }, { status: 500 });
  }
}

// PUT /api/admin/env-vault/[id] - Update env item
export async function PUT(request, { params }) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  try {
    const { id } = await params;
    const body = await request.json();
    const { projectName, environment, fileName, content, description } = body;

    const existing = await prisma.envVault.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    const updateData = {};
    if (projectName !== undefined) updateData.projectName = projectName.trim();
    if (environment !== undefined) updateData.environment = environment;
    if (fileName !== undefined) updateData.fileName = fileName.trim();
    if (content !== undefined) updateData.content = content.trim();
    if (description !== undefined) updateData.description = description ? description.trim() : null;

    const updated = await prisma.envVault.update({
      where: { id },
      data: updateData,
    });

    const stats = parseEnvStats(updated.content);

    return NextResponse.json({
      success: true,
      item: {
        id: updated.id,
        projectName: updated.projectName,
        environment: updated.environment,
        fileName: updated.fileName,
        description: updated.description,
        keyCount: stats.keyCount,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
      },
    });
  } catch (error) {
    console.error("PUT /api/admin/env-vault/[id] error:", error);
    return NextResponse.json({ error: error.message || "Failed to update env record" }, { status: 500 });
  }
}

// DELETE /api/admin/env-vault/[id] - Delete env item
export async function DELETE(request, { params }) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  try {
    const { id } = await params;
    await prisma.envVault.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Record deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/admin/env-vault/[id] error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete record" }, { status: 500 });
  }
}
