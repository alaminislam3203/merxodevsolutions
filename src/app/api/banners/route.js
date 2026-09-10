import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET /api/banners — public, returns active banners grouped by slot
export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    const left = banners.filter((b) => b.slot === "left" || !b.slot);
    let rightTop = banners.filter((b) => b.slot === "right_top" || b.slot === "top_right");
    let rightBottom = banners.filter((b) => b.slot === "right_bottom" || b.slot === "bottom_right");
    const legacyRight = banners.filter((b) => b.slot === "right");

    if (rightTop.length === 0 && legacyRight.length > 0) {
      rightTop = [legacyRight[0]];
    }
    if (rightBottom.length === 0 && legacyRight.length > 1) {
      rightBottom = legacyRight.slice(1);
    }

    return NextResponse.json(
      { left, rightTop, rightBottom, right: legacyRight },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
