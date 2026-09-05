import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

// GET /api/admin/content
export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const existingMeet = await prisma.contentBlock.findUnique({
      where: { key: "google_meet_link" },
    });
    if (!existingMeet) {
      await prisma.contentBlock.create({
        data: {
          key: "google_meet_link",
          title: "Google Meet Link",
          value: process.env.NEXT_PUBLIC_GOOGLE_MEET_LINK || "https://meet.google.com/new",
          section: "general",
        },
      }).catch(() => {});
    }
  } catch (err) {
    // Non-blocking if table is being read
  }

  const content = await prisma.contentBlock.findMany({
    orderBy: [{ section: "asc" }, { key: "asc" }],
  });
  return NextResponse.json(content);
}

// PUT /api/admin/content - Update a content block by key
export async function PUT(request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, key, title, value, section } = await request.json();

    const block = await prisma.contentBlock.upsert({
      where: { key },
      update: { title, value, section },
      create: { key, title, value, section: section || "general" },
    });

    return NextResponse.json(block);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/admin/content - Create new content block
export async function POST(request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { key, title, value, section } = await request.json();

    const block = await prisma.contentBlock.create({
      data: { key, title, value, section: section || "general" },
    });
    return NextResponse.json(block, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/admin/content?key=xxx
export async function DELETE(request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");
    await prisma.contentBlock.delete({ where: { key } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
