import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";
import { logActivity } from "@/lib/workspaceStore";
import { sendBrandEmail } from "@/lib/templates/brandEmailLayout";
import { projectApprovedTemplate } from "@/lib/templates/agencyEmailTemplates";
import { cleanProjectUrl } from "@/app/lib/projects";

export const dynamic = "force-dynamic";

// GET /api/admin/projects/[id]
export async function GET(request, { params }) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  try {
    const resolvedParams = await params;
    const id = resolvedParams?.id;
    if (!id || id === "undefined") {
      return NextResponse.json({ error: "Project ID or slug is required" }, { status: 400 });
    }

    const project = await prisma.project.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/admin/projects/[id]
export async function PUT(request, { params }) {
  const { authorized, session, response } = await requireAdmin();
  if (!authorized) return response;

  try {
    const resolvedParams = await params;
    const id = resolvedParams?.id;
    const body = await request.json();

    // 1. Locate existing project by id, slug from params, or body.id / body.slug
    let existing = null;
    if (id && id !== "undefined" && id !== "null") {
      existing = await prisma.project.findFirst({
        where: {
          OR: [{ id }, { slug: id }],
        },
      });
    }

    if (!existing && body.id) {
      existing = await prisma.project.findUnique({
        where: { id: body.id },
      });
    }

    if (!existing && body.slug) {
      existing = await prisma.project.findUnique({
        where: { slug: body.slug },
      });
    }

    if (!existing) {
      return NextResponse.json({ error: "Project not found in database" }, { status: 404 });
    }

    // 2. If slug changed, verify no other project uses the new slug
    const targetSlug = body.slug ? String(body.slug).trim() : existing.slug;
    if (targetSlug && targetSlug !== existing.slug) {
      const duplicateSlug = await prisma.project.findUnique({
        where: { slug: targetSlug },
      });
      if (duplicateSlug && duplicateSlug.id !== existing.id) {
        return NextResponse.json(
          { error: "A project with this slug already exists" },
          { status: 409 }
        );
      }
    }

    const existingDetails =
      existing.details && typeof existing.details === "object"
        ? existing.details
        : {};
    const incomingDetails =
      body.details !== undefined && typeof body.details === "object"
        ? { ...existingDetails, ...body.details }
        : { ...existingDetails };

    if (body.approveProject === true) {
      incomingDetails.approvalStatus = "APPROVED";
      incomingDetails.approvedBy = session?.user?.name || session?.user?.email || "Admin";
      incomingDetails.approvedAt = new Date().toISOString();
    }

    // 3. Prepare sanitized update data
    const updateData = {
      slug: targetSlug,
      tag: body.tag ? String(body.tag).trim() : existing.tag,
      title: body.title ? String(body.title).trim() : existing.title,
      accent: body.accent ? String(body.accent).trim() : existing.accent,
      description: body.description !== undefined ? body.description : existing.description,
      image: body.image !== undefined ? (body.image || null) : existing.image,
      images: body.images !== undefined ? body.images : existing.images,
      liveUrl: body.liveUrl !== undefined ? (body.liveUrl || null) : existing.liveUrl,
      details: incomingDetails,
      order: body.order !== undefined && body.order !== null && !isNaN(Number(body.order)) ? Number(body.order) : existing.order,
    };

    // 4. Update the verified project by its primary key (existing.id)
    let project;
    try {
      project = await prisma.project.update({
        where: { id: existing.id },
        data: updateData,
      });
    } catch (updateErr) {
      if (updateData.order !== undefined) {
        const { order, ...restUpdate } = updateData;
        try {
          await prisma.$executeRaw`
            UPDATE "Project" SET "order" = ${updateData.order} WHERE "id" = ${existing.id}
          `;
        } catch (rawErr) {
          console.warn("Failed to update raw order:", rawErr);
        }
        project = await prisma.project.update({
          where: { id: existing.id },
          data: restUpdate,
        });
      } else {
        throw updateErr;
      }
    }

    if (body.approveProject === true) {
      await logActivity({
        user: session?.user,
        action: "PROJECT_APPROVED",
        target: project.title,
        details: `Approved and published project "${project.title}"`,
      });

      // Notify the team member who submitted the project
      const authorEmail = existingDetails?.submittedByEmail;
      if (authorEmail && String(authorEmail).includes("@")) {
        try {
          await sendBrandEmail({
            to: authorEmail,
            subject: `Project Approved & Published: "${project.title}" 🚀`,
            buildHtml: (useCid) =>
              projectApprovedTemplate({
                authorName: existingDetails?.submittedByName || "Team Member",
                projectTitle: project.title,
                projectSlug: project.slug,
                tag: project.tag,
                approvedBy: session?.user?.name || "Admin",
                useCid,
              }),
            text: `Great news! Your project "${project.title}" has been approved and is now live on MerxoDev Solutions.`,
          });
        } catch (mailErr) {
          console.warn("Project approved email warning:", mailErr.message);
        }
      }
    }

    // Invalidate site cache so changes immediately show on Vercel
    try {
      revalidatePath("/", "layout");
      revalidatePath("/our-projects");
      revalidatePath(`/our-projects/${project.slug}`);
      if (existing.slug && existing.slug !== project.slug) {
        revalidatePath(`/our-projects/${existing.slug}`);
      }
    } catch (revalErr) {
      console.error("Revalidation error:", revalErr);
    }

    return NextResponse.json(project);
  } catch (error) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "A project with this slug already exists" }, { status: 409 });
    }
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Project record not found to update" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message || "Failed to update project" }, { status: 500 });
  }
}

// DELETE /api/admin/projects/[id]
export async function DELETE(request, { params }) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  try {
    const resolvedParams = await params;
    const id = resolvedParams?.id;
    if (!id || id === "undefined") {
      return NextResponse.json({ error: "Project ID or slug is required" }, { status: 400 });
    }

    const existing = await prisma.project.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await prisma.project.delete({ where: { id: existing.id } });

    // Invalidate site cache so changes immediately show on Vercel
    try {
      revalidatePath("/", "layout");
      revalidatePath("/our-projects");
      if (existing.slug) {
        revalidatePath(`/our-projects/${existing.slug}`);
      }
    } catch (revalErr) {
      console.error("Revalidation error:", revalErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}