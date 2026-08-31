import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

// PUT /api/admin/banners/[id] — update a banner
export async function PUT(request, { params }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    await prisma.banner.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
