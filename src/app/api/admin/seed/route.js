import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

// POST /api/admin/seed - Create initial admin user
// Protected by SEED_SECRET_KEY and strict rate limiting
export async function POST(request) {
  try {
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`seed:${clientIp}`, { limit: 3, windowMs: 15 * 60 * 1000 });
    if (!rateCheck.success) {
      return NextResponse.json({ error: "Too many attempts. Locked for 15 minutes." }, { status: 429 });
    }

    const { secretKey, email, password, name } = await request.json();

    if (!process.env.SEED_SECRET_KEY || secretKey !== process.env.SEED_SECRET_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existingAdmin = await prisma.admin.findUnique({ where: { email } });
    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        name: name || "Admin",
      },
    });

    // Also seed some default content blocks
    const defaultContent = [
      { key: "hero_title", title: "Hero Title", value: "MerxoDev Solutions", section: "hero" },
      { key: "hero_subtitle", title: "Hero Subtitle", value: "We build modern web solutions", section: "hero" },
      { key: "about_description", title: "About Description", value: "We are a passionate team of developers...", section: "about" },
      { key: "services_title", title: "Services Title", value: "Our Services", section: "services" },
      { key: "footer_tagline", title: "Footer Tagline", value: "Building digital futures", section: "footer" },
    ];

    for (const block of defaultContent) {
      await prisma.contentBlock.upsert({
        where: { key: block.key },
        update: {},
        create: block,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Admin created successfully",
      admin: { id: admin.id, email: admin.email, name: admin.name },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
