import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary";

// GET /api/admin/images
export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const images = await prisma.mediaFile.findMany({
    orderBy: { uploadedAt: "desc" },
  });
  return NextResponse.json(images);
}

// POST /api/admin/images - Upload image
export async function POST(request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { base64Image, altText, caption } = body;

    if (!base64Image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const uploaded = await uploadImage(base64Image);

    const mediaFile = await prisma.mediaFile.create({
      data: {
        url: uploaded.url,
        publicId: uploaded.publicId,
        altText: altText || "",
        caption: caption || "",
        fileSize: uploaded.fileSize || null,
        width: uploaded.width || null,
        height: uploaded.height || null,
      },
    });

    return NextResponse.json(mediaFile, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
