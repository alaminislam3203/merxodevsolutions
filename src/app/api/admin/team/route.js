import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";
import { defaultTeam } from "@/app/lib/team";

export const dynamic = "force-dynamic";

// GET /api/admin/team — list all team members (admin + team-member)
export async function GET() {
  const { authorized, response } = await requireAdmin({ allowTeamMember: true });
  if (!authorized) return response;

  try {
    let members = await prisma.teamMember.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });

    // Auto-seed initial members into DB if empty
    if (members.length === 0) {
      for (const def of defaultTeam) {
        await prisma.teamMember.create({
          data: {
            name: def.name,
            role: def.role,
            image: def.image,
            bio: def.bio,
            color: def.color,
            order: def.order,
            isActive: def.isActive,
            socialLinks: def.socialLinks || {},
          },
        });
      }
      members = await prisma.teamMember.findMany({
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      });
    }

    return NextResponse.json({ members });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/admin/team — create a new team member
export async function POST(request) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  try {
    const body = await request.json();
    const { name, role, image, bio, color, order, isActive, socialLinks } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!role || !role.trim()) {
      return NextResponse.json({ error: "Role/Designation is required" }, { status: 400 });
    }

    const member = await prisma.teamMember.create({
      data: {
        name: name.trim(),
        role: role.trim(),
        image: image || null,
        bio: bio ? bio.trim() : null,
        color: color || "from-violet-600 to-cyan-500",
        order: order !== undefined && order !== null ? Number(order) : 0,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
        socialLinks: socialLinks || {},
      },
    });

    try {
      revalidatePath("/about");
      revalidatePath("/", "layout");
    } catch (revalErr) {
      console.error("Revalidation error:", revalErr);
    }

    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
