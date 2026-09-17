import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { requireAdmin } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function POST(request, { params }) {
  try {
    const { authorized, response } = await requireAdmin();
    if (!authorized) return response;

    const { id } = await params;
    const { newPassword } = await request.json();

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { id } });
    const admin = !user ? await prisma.admin.findUnique({ where: { id } }) : null;
    const targetEmail = (user?.email || admin?.email)?.toLowerCase().trim();

    if (targetEmail === "merxodevsolutions@gmail.com") {
      return NextResponse.json(
        { error: "The Main Administrator password cannot be modified from the user management panel." },
        { status: 403 }
      );
    }

    if (user) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { id },
        data: { password: hashedPassword },
      });

      return NextResponse.json({
        success: true,
        message: `Password for ${user.email} has been reset successfully.`,
      });
    }

    if (admin) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await prisma.admin.update({
        where: { id },
        data: { password: hashedPassword },
      });

      return NextResponse.json({
        success: true,
        message: `Password for Admin ${admin.email} has been reset successfully.`,
      });
    }

    return NextResponse.json({ error: "Account not found." }, { status: 404 });
  } catch (error) {
    console.error("Admin Reset User Password Error:", error);
    return NextResponse.json({ error: "Failed to reset user password." }, { status: 500 });
  }
}
