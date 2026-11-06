import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { ensureWorkspaceTables, logActivity } from "@/lib/workspaceStore";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await ensureWorkspaceTables();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      await prisma.$executeRaw`
        UPDATE "BlogPost" SET "views" = "views" + 1 WHERE "slug" = ${slug}
      `;
      const rows = await prisma.$queryRaw`
        SELECT * FROM "BlogPost" WHERE "slug" = ${slug} LIMIT 1
      `;
      return NextResponse.json({ post: rows?.[0] || null });
    }

    const posts = await prisma.$queryRaw`
      SELECT * FROM "BlogPost"
      WHERE "isPublished" = true
      ORDER BY "createdAt" DESC
    `;

    return NextResponse.json({ posts: posts || [] });
  } catch (error) {
    console.error("GET /api/blog error:", error);
    return NextResponse.json({ posts: [] });
  }
}

export async function POST(request) {
  const { authorized, session, isAdmin, response } = await requireAdmin({
    allowTeamMember: true,
  });
  if (!authorized) return response;

  try {
    await ensureWorkspaceTables();
    const body = await request.json();
    const { action } = body || {};

    if (action === "delete") {
      if (!isAdmin) {
        return NextResponse.json(
          { error: "Only Admin can delete blog posts" },
          { status: 403 }
        );
      }
      const id = String(body.id || "").trim();
      await prisma.$executeRaw`DELETE FROM "BlogPost" WHERE "id" = ${id}`;
      return NextResponse.json({ success: true });
    }

    const title = String(body.title || "").trim();
    const slug =
      String(body.slug || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    const excerpt = String(body.excerpt || "").trim();
    const content = String(body.content || "").trim();
    const category = String(body.category || "Web Engineering").trim();
    const readTime = String(body.readTime || "5 min read").trim();
    const tags = String(body.tags || "Next.js, Web Development, SEO").trim();
    const coverImage = String(body.coverImage || "").trim() || null;
    const authorName =
      session?.user?.name || "MerxoDev Engineering";
    const authorRole = isAdmin ? "Lead Architect" : "Engineering Team";

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const id =
      body.id ||
      "blog_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 6);

    await prisma.$executeRaw`
      INSERT INTO "BlogPost" (
        "id", "slug", "title", "excerpt", "content", "category", "coverImage",
        "authorName", "authorRole", "readTime", "tags", "isPublished", "createdAt", "updatedAt"
      )
      VALUES (
        ${id}, ${slug}, ${title}, ${excerpt || content.slice(0, 160)}, ${content},
        ${category}, ${coverImage}, ${authorName}, ${authorRole}, ${readTime},
        ${tags}, true, NOW(), NOW()
      )
      ON CONFLICT ("slug") DO UPDATE SET
        "title" = EXCLUDED."title",
        "excerpt" = EXCLUDED."excerpt",
        "content" = EXCLUDED."content",
        "category" = EXCLUDED."category",
        "coverImage" = EXCLUDED."coverImage",
        "readTime" = EXCLUDED."readTime",
        "tags" = EXCLUDED."tags",
        "updatedAt" = NOW()
    `;

    await logActivity({
      user: session?.user,
      action: "BLOG_PUBLISHED",
      target: title,
      details: `Published SEO blog post "${title}" (/blog/${slug})`,
    });

    return NextResponse.json({ success: true, id, slug });
  } catch (error) {
    console.error("POST /api/blog error:", error);
    return NextResponse.json(
      { error: "Failed to save blog post" },
      { status: 500 }
    );
  }
}
