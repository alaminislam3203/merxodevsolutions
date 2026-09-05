import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";
import { deleteImage } from "@/lib/cloudinary";

// DELETE /api/admin/images/[id]
export async function DELETE(request, { params }) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  try {
    const { id } = await params;
    const image = await prisma.mediaFile.findUnique({ where: { id } });
    if (!image) return NextResponse.json({ error: "Image not found" }, { status: 404 });

    // Delete from Cloudinary
    await deleteImage(image.publicId);

    // Delete from DB
    await prisma.mediaFile.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/admin/images/[id] - Update alt text / caption
export async function PUT(request, { params }) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  try {
    const { id } = await params;
    const { altText, caption } = await request.json();
    const image = await prisma.mediaFile.update({
      where: { id },
      data: { altText: altText || "", caption: caption || "" },
    });
    return NextResponse.json(image);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}