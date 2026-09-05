import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";

// GET /api/admin/banners — list all banners (admin only)
export async function GET() {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  const banners = await prisma.banner.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(banners);
}

// POST /api/admin/banners — create a new banner
export async function POST(request) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  try {
    const body = await request.json();
    const { imageUrl, title, subtitle, buttonText, buttonLink, isActive, slot, order } = body;

    if (!imageUrl) {
      return NextResponse.json({ error: "imageUrl is required" }, { status: 400 });
    }

    const banner = await prisma.banner.create({
      data: {
        imageUrl,
        title: title || null,
        subtitle: subtitle || null,
        buttonText: buttonText || null,
        buttonLink: buttonLink || null,
        slot: slot || "left",
        isActive: isActive !== undefined ? Boolean(isActive) : true,
        order: order !== undefined ? Number(order) : 0,
      },
    });

    return NextResponse.json(banner, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
