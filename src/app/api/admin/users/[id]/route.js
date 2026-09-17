import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

// PUT /api/admin/users/[id] - Update role, status (isActive), or details
export async function PUT(request, { params }) {
  try {
    const { authorized, response, session } = await requireAdmin();
    if (!authorized) return response;

    const { id } = await params;
    const body = await request.json();
    const { role, isActive, name } = body;

    // Check if target user exists in User table
    const user = await prisma.user.findUnique({ where: { id } });

    if (user) {
      // Prevent demoting the currently logged-in admin
      if (
        session?.user?.email?.toLowerCase() === user.email.toLowerCase() &&
        role &&
        role !== "ADMIN"
      ) {
        return NextResponse.json(
          { error: "You cannot remove your own admin privileges." },
          { status: 400 }
        );
      }

      const updateData = {};
      if (role && (role === "USER" || role === "ADMIN")) {
        updateData.role = role;
      }
      if (typeof isActive === "boolean") {
        updateData.isActive = isActive;
      }
      if (name && typeof name === "string") {
        updateData.name = name.trim();
      }

      // Execute update
      const updated = await prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          updatedAt: true,
        },
      });

      return NextResponse.json({
        success: true,
        user: updated,
        message: `User ${updated.name} updated successfully.`,
      });
    }

    // Check if it's in Admin table
    const admin = await prisma.admin.findUnique({ where: { id } });
    if (admin) {
      if (name && typeof name === "string") {
        const updatedAdmin = await prisma.admin.update({
          where: { id },
          data: { name: name.trim() },
        });
        return NextResponse.json({
          success: true,
          user: { ...updatedAdmin, role: "ADMIN", isActive: true },
          message: `Admin ${updatedAdmin.name} updated successfully.`,
        });
      }
      return NextResponse.json({
        success: true,
        message: "Admin account verified.",
      });
    }

    return NextResponse.json({ error: "User not found" }, { status: 404 });
  } catch (error) {
    console.error("Admin Update User Error:", error);
    return NextResponse.json({ error: "Failed to update user." }, { status: 500 });
  }
}

// DELETE /api/admin/users/[id] - Safely delete user account
export async function DELETE(request, { params }) {
  try {
    const { authorized, response, session } = await requireAdmin();
    if (!authorized) return response;

    const { id } = await params;

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Guard: Do not allow deleting own active session account
    if (session?.user?.email?.toLowerCase() === user.email.toLowerCase()) {
      return NextResponse.json(
        { error: "You cannot delete your own logged-in account." },
        { status: 400 }
      );
    }

    // First nullify or cascade user reviews if needed
    try {
      await prisma.review.updateMany({
        where: { userId: id },
        data: { userId: null },
      });
    } catch (_) {}

    // Delete user tokens
    try {
      await prisma.passwordResetToken.deleteMany({ where: { email: user.email } });
      await prisma.twoFactorToken.deleteMany({ where: { email: user.email } });
    } catch (_) {}

    // Delete user
    await prisma.user.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: `User account for ${user.email} was permanently deleted.`,
    });
  } catch (error) {
    console.error("Admin DELETE User Error:", error);
    return NextResponse.json({ error: "Failed to delete user." }, { status: 500 });
  }
}
