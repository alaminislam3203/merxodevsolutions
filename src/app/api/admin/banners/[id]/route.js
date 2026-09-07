import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// PUT /api/admin/banners/[id] — update a banner
export async function PUT(request, { params }) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  try {
    const { id } = await params;
    const body = await request.json();
    const { imageUrl, title, subtitle, buttonText, buttonLink, isActive, slot, order } = body;

    const banner = await prisma.banner.update({
      where: { id },
      data: {
        ...(imageUrl !== undefined && { imageUrl }),
        ...(title !== undefined && { title: title || null }),
        ...(subtitle !== undefined && { subtitle: subtitle || null }),
        ...(buttonText !== undefined && { buttonText: buttonText || null }),
        ...(buttonLink !== undefined && { buttonLink: buttonLink || null }),
        ...(isActive !== undefined && { isActive: Boolean(isActive) }),
        ...(slot !== undefined && { slot }),
        ...(order !== undefined && { order: Number(order) }),
      },
    });

    try {
      revalidatePath("/", "layout");
    } catch (revalErr) {
      console.error("Revalidation error:", revalErr);
    }

    return NextResponse.json(banner);
  } catch (error) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/admin/banners/[id] — delete a banner
export async function DELETE(request, { params }) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  try {
    const { id } = await params;
    await prisma.banner.delete({ where: { id } });

    try {
      revalidatePath("/", "layout");
    } catch (revalErr) {
      console.error("Revalidation error:", revalErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
