import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET /api/settings - Public settings endpoint
export async function GET() {
  try {
    const meetBlock = await prisma.contentBlock.findUnique({
      where: { key: "google_meet_link" },
    });

    const googleMeetLink =
      meetBlock?.value ||
      process.env.NEXT_PUBLIC_GOOGLE_MEET_LINK ||
      "https://meet.google.com/new";

    return NextResponse.json({
      googleMeetLink,
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({
      googleMeetLink:
        process.env.NEXT_PUBLIC_GOOGLE_MEET_LINK ||
        "https://meet.google.com/new",
    });
  }
}
