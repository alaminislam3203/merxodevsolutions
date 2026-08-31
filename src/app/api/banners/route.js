import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/banners — public, returns active banners grouped by slot
export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    const left = banners.filter((b) => b.slot === "left");
    const right = banners.filter((b) => b.slot === "right");

    return NextResponse.json({ left, right });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
