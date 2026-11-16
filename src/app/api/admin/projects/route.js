import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";
import { logActivity } from "@/lib/workspaceStore";
import { cleanProjectUrl } from "@/app/lib/projects";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET /api/admin/projects
export async function GET() {
  const { authorized, response } = await requireAdmin({ allowTeamMember: true });
  if (!authorized) return response;

  try {
    let projects;
    try {
      projects = await prisma.project.findMany({
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      });
    } catch (orderErr) {
      console.warn("Fallback finding projects without order sort:", orderErr?.message);
      projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
      });
    }
    return NextResponse.json(projects || [], {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("GET /api/admin/projects error:", error);
    return NextResponse.json({ error: error.message || "Failed to load projects" }, { status: 500 });
  }
}

// POST /api/admin/projects
export async function POST(request) {
  const { authorized, session, response } = await requireAdmin({ allowTeamMember: true });
  if (!authorized) return response;

  try {
    const body = await request.json();
    const { slug, tag, title, description, image, images, liveUrl, accent, details, order } = body;

    if (!slug || !title || !tag || !accent) {
      return NextResponse.json({ error: "slug, title, tag and accent are required" }, { status: 400 });
    }

    const isTeamMember = session?.user?.role === "TEAM_MEMBER";
    const projectOrder = order !== undefined && order !== null && !isNaN(Number(order)) ? Number(order) : 0;
    const baseDetails = details && typeof details === "object"
      ? details
      : { client: "", duration: "", tech: [], features: [] };

    const enrichedDetails = {
      ...baseDetails,
      approvalStatus: isTeamMember ? "PENDING" : "APPROVED",
      submittedBy: session?.user?.name || session?.user?.email || "Admin",
      submittedByEmail: session?.user?.email || "",
      submittedByRole: session?.user?.role || "ADMIN",
    };

    let project;
    try {
      project = await prisma.project.create({
        data: {
          slug,
          tag,
          title,
          description: description || "",
          image: image || null,
          images: images || { mobile: [], desktop: [] },
          liveUrl: cleanProjectUrl(liveUrl) || null,
          accent,
          details: enrichedDetails,
          order: projectOrder,
        },
      });
    } catch (createErr) {
      project = await prisma.project.create({
        data: {
          slug,
          tag,
          title,
          description: description || "",
          image: image || null,
          images: images || { mobile: [], desktop: [] },
          liveUrl: cleanProjectUrl(liveUrl) || null,
          accent,
          details: enrichedDetails,
        },
      });
      try {
        await prisma.$executeRaw`
          UPDATE "Project" SET "order" = ${projectOrder} WHERE "id" = ${project.id}
        `;
      } catch (rawErr) {
        console.warn("Failed to set raw order on Project:", rawErr);
      }
    }

    await logActivity({
      user: session?.user,
      action: isTeamMember ? "PROJECT_SUBMITTED" : "PROJECT_CREATED",
      target: title,
      details: isTeamMember
        ? `Submitted project "${title}" for Admin approval`
        : `Created and published project "${title}"`,
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
