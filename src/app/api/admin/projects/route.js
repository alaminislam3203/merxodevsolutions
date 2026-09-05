import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";

// GET /api/admin/projects
export async function GET() {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(projects);
}

// POST /api/admin/projects
export async function POST(request) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  try {
    const body = await request.json();
    const { slug, tag, title, description, image, images, liveUrl, accent, details } = body;

    if (!slug || !title || !tag || !accent) {
      return NextResponse.json({ error: "slug, title, tag and accent are required" }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        slug,
        tag,
        title,
        description: description || "",
        image: image || null,
        images: images || { mobile: [], desktop: [] },
        liveUrl: liveUrl || null,
        accent,
        details: details || { client: "", duration: "", tech: [], features: [] },
      },
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "A project with this slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
