import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";
import { logActivity } from "@/lib/workspaceStore";

export const dynamic = "force-dynamic";

function normalizePersonName(str) {
  return String(str || "")
    .toLowerCase()
    .replace(/[^a-z0-9\u0980-\u09FF]+/g, " ")
    .trim();
}

function isMemberOwnedByUser(member, user) {
  if (!member || !user) return false;
  const userEmail = String(user.email || "").toLowerCase().trim();
  const userName = normalizePersonName(user.name);
  const memberName = normalizePersonName(member.name);

  let social = {};
  if (typeof member.socialLinks === "string") {
    try {
      social = JSON.parse(member.socialLinks);
    } catch {
      social = {};
    }
  } else if (member.socialLinks && typeof member.socialLinks === "object") {
    social = member.socialLinks;
  }

  const linkedEmail = String(social?.email || "").toLowerCase().trim();
  if (linkedEmail) {
    return linkedEmail === userEmail;
  }

  if (userName && memberName && userName === memberName) {
    return true;
  }

  // Also match if user's full name is contained in member name or vice versa (at least 3 chars)
  if (
    userName.length >= 3 &&
    memberName.length >= 3 &&
    (memberName.includes(userName) || userName.includes(memberName))
  ) {
    return true;
  }

  return false;
}

// PUT /api/admin/team/[id] — update a team member (Admin can update any; Team Member can update only their own profile)
export async function PUT(request, { params }) {
  const { authorized, session, response } = await requireAdmin({ allowTeamMember: true });
  if (!authorized) return response;

  try {
    const { id } = await params;
    const isAdmin = session?.user?.role === "ADMIN";

    const existing = await prisma.teamMember.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    if (!isAdmin && !isMemberOwnedByUser(existing, session?.user)) {
      return NextResponse.json(
        { error: "Forbidden — You can only edit your own team profile" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, role, image, bio, color, order, isActive, socialLinks } = body;

    let existingSocial = {};
    if (typeof existing.socialLinks === "string") {
      try {
        existingSocial = JSON.parse(existing.socialLinks);
      } catch {
        existingSocial = {};
      }
    } else if (existing.socialLinks && typeof existing.socialLinks === "object") {
      existingSocial = existing.socialLinks;
    }

    const dataToUpdate = {};
    if (name !== undefined) dataToUpdate.name = name.trim();
    if (role !== undefined) dataToUpdate.role = role.trim();
    if (image !== undefined) dataToUpdate.image = image || null;
    if (bio !== undefined) dataToUpdate.bio = bio ? bio.trim() : null;
    if (color !== undefined) dataToUpdate.color = color;

    // Only ADMIN can change display order or active visibility status
    if (isAdmin) {
      if (order !== undefined) dataToUpdate.order = Number(order);
      if (isActive !== undefined) dataToUpdate.isActive = Boolean(isActive);
    }

    if (socialLinks !== undefined) {
      const mergedSocial = {
        ...existingSocial,
        ...socialLinks,
      };
      // If edited by team-member, bind their account email so future name edits stay linked
      if (!isAdmin && session?.user?.email) {
        mergedSocial.email = String(session.user.email).toLowerCase().trim();
      }
      dataToUpdate.socialLinks = mergedSocial;
    }

    const member = await prisma.teamMember.update({
      where: { id },
      data: dataToUpdate,
    });

    try {
      revalidatePath("/about");
      revalidatePath("/our-team");
      revalidatePath("/", "layout");
    } catch (revalErr) {
      console.error("Revalidation error:", revalErr);
    }

    await logActivity({
      user: session?.user,
      action: "TEAM_PROFILE_UPDATED",
      target: member.name,
      details: `${isAdmin ? "Admin updated" : "Updated own"} team profile for ${member.name}`,
    });

    return NextResponse.json(member);
  } catch (error) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/admin/team/[id] — delete a team member
export async function DELETE(request, { params }) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  try {
    const { id } = await params;
    await prisma.teamMember.delete({ where: { id } });

    try {
      revalidatePath("/about");
      revalidatePath("/", "layout");
    } catch (revalErr) {
      console.error("Revalidation error:", revalErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
