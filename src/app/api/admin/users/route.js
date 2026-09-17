import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { requireAdmin } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

// GET /api/admin/users - List all users with filtering, search & review counts
export async function GET(request) {
  try {
    const { authorized, response } = await requireAdmin();
    if (!authorized) return response;

    const { searchParams } = new URL(request.url);
    const search = (searchParams.get("search") || "").trim().toLowerCase();
    const roleFilter = (searchParams.get("role") || "ALL").toUpperCase();
    const statusFilter = searchParams.get("status") || "ALL"; // 'ALL', 'ACTIVE', 'SUSPENDED'

    // Fetch users with their reviews count
    let users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        twoFactorEnabled: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: { reviews: true },
        },
      },
    });

    // Also fetch admin table accounts to display total administrative staff
    let admins = [];
    try {
      admins = await prisma.admin.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          twoFactorEnabled: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (_) {}

    // Combine admins into list if not already present in User table
    const existingEmails = new Set(users.map((u) => u.email.toLowerCase()));
    const adminAsUsers = admins
      .filter((a) => !existingEmails.has(a.email.toLowerCase()))
      .map((a) => ({
        id: a.id,
        name: a.name,
        email: a.email,
        image: a.image,
        role: "ADMIN",
        twoFactorEnabled: a.twoFactorEnabled,
        isActive: true,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
        _count: { reviews: 0 },
        isDedicatedAdminModel: true,
      }));

    let allAccounts = [...users, ...adminAsUsers].map((u) => {
      const isMainAdmin = u.email.toLowerCase() === "merxodevsolutions@gmail.com";
      return {
        ...u,
        role: isMainAdmin ? "ADMIN" : u.role,
        isActive: isMainAdmin ? true : u.isActive,
        isMainAdmin,
      };
    });

    // Main Admin always pinned at the very top
    allAccounts.sort((a, b) => {
      if (a.isMainAdmin) return -1;
      if (b.isMainAdmin) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Compute metrics
    const totalUsers = allAccounts.length;
    const adminCount = allAccounts.filter((u) => u.role === "ADMIN").length;
    const twoFactorCount = allAccounts.filter((u) => u.twoFactorEnabled).length;
    const suspendedCount = allAccounts.filter((u) => u.isActive === false).length;
    const activeCount = totalUsers - suspendedCount;

    // Apply filters
    if (search) {
      allAccounts = allAccounts.filter(
        (u) =>
          u.name.toLowerCase().includes(search) ||
          u.email.toLowerCase().includes(search)
      );
    }

    if (roleFilter !== "ALL") {
      allAccounts = allAccounts.filter((u) => u.role === roleFilter);
    }

    if (statusFilter === "ACTIVE") {
      allAccounts = allAccounts.filter((u) => u.isActive !== false);
    } else if (statusFilter === "SUSPENDED") {
      allAccounts = allAccounts.filter((u) => u.isActive === false);
    }

    return NextResponse.json({
      users: allAccounts,
      stats: {
        total: totalUsers,
        admins: adminCount,
        twoFactorCount,
        activeCount,
        suspendedCount,
      },
    });
  } catch (error) {
    console.error("Admin GET Users Error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// POST /api/admin/users - Manually create a new user from Admin Panel
export async function POST(request) {
  try {
    const { authorized, response } = await requireAdmin();
    if (!authorized) return response;

    const body = await request.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    const emailTrimmed = email.toLowerCase().trim();

    // Check existing
    const existing = await prisma.user.findUnique({ where: { email: emailTrimmed } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const assignedRole = role === "ADMIN" ? "ADMIN" : "USER";

    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: emailTrimmed,
        password: hashedPassword,
        role: assignedRole,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      user: newUser,
      message: `Account created successfully for ${newUser.name}.`,
    });
  } catch (error) {
    console.error("Admin Create User Error:", error);
    return NextResponse.json({ error: "Failed to create user." }, { status: 500 });
  }
}
