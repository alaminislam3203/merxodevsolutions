import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET /api/admin/projects
export async function GET() {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  const projects = await prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(projects);
}

// POST /api/admin/projects
export async function POST(request) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  try {
    const body = await request.json();
    const { slug, tag, title, description, image, images, liveUrl, accent, details, order } = body;

    if (!slug || !title || !tag || !accent) {
      return NextResponse.json({ error: "slug, title, tag and accent are required" }, { status: 400 });
    }

    const projectOrder = order !== undefined && order !== null && !isNaN(Number(order)) ? Number(order) : 0;

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
        order: projectOrder,
      },
    });

    // Invalidate site cache so changes immediately show on Vercel
    try {
      revalidatePath("/", "layout");
      revalidatePath("/our-projects");
      revalidatePath(`/our-projects/${slug}`);
    } catch (revalErr) {
      console.error("Revalidation error:", revalErr);
    }

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "A project with this slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
