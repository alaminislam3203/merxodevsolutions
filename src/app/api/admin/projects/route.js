import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

// GET /api/admin/projects
export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(projects);
}

// POST /api/admin/projects
export async function POST(request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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
