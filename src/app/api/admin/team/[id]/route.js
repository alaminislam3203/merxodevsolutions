import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// PUT /api/admin/team/[id] — update a team member
export async function PUT(request, { params }) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  try {
    const { id } = await params;
    const body = await request.json();
    const { name, role, image, bio, color, order, isActive, socialLinks } = body;

    const dataToUpdate = {};
    if (name !== undefined) dataToUpdate.name = name.trim();
    if (role !== undefined) dataToUpdate.role = role.trim();
    if (image !== undefined) dataToUpdate.image = image || null;
    if (bio !== undefined) dataToUpdate.bio = bio ? bio.trim() : null;
    if (color !== undefined) dataToUpdate.color = color;
    if (order !== undefined) dataToUpdate.order = Number(order);
    if (isActive !== undefined) dataToUpdate.isActive = Boolean(isActive);
    if (socialLinks !== undefined) dataToUpdate.socialLinks = socialLinks;

    const member = await prisma.teamMember.update({
      where: { id },
      data: dataToUpdate,
    });

    try {
      revalidatePath("/about");
      revalidatePath("/", "layout");
    } catch (revalErr) {
      console.error("Revalidation error:", revalErr);
    }

    return NextResponse.json(member);
  } catch (error) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/admin/team/[id] — delete a team member
export async function DELETE(request, { params }) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  try {
    const { id } = await params;
    await prisma.teamMember.delete({ where: { id } });

    try {
      revalidatePath("/about");
      revalidatePath("/", "layout");
    } catch (revalErr) {
      console.error("Revalidation error:", revalErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
