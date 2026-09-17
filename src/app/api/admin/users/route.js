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

    // Fetch users with their reviews count, with robust raw SQL fallback
    let users = [];
    try {
      users = await prisma.user.findMany({
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
    } catch (userErr) {
      console.warn("prisma.user.findMany with select failed, using raw fallback:", userErr?.message);
      try {
        const rawUsers = await prisma.$queryRaw`
          SELECT 
            u."id", 
            u."name", 
            u."email", 
            u."image", 
            COALESCE(u."role", 'USER') as "role", 
            COALESCE(u."twoFactorEnabled", false) as "twoFactorEnabled",
            COALESCE(u."isActive", true) as "isActive",
            u."createdAt", 
            u."updatedAt",
            COALESCE(COUNT(r."id")::int, 0) as "reviewCount"
          FROM "User" u
          LEFT JOIN "Review" r ON r."userId" = u."id"
          GROUP BY u."id"
          ORDER BY u."createdAt" DESC
        `;
        users = (rawUsers || []).map((ru) => ({
          id: ru.id,
          name: ru.name || "User",
          email: ru.email || "",
          image: ru.image || null,
          role: ru.role || "USER",
          twoFactorEnabled: Boolean(ru.twoFactorEnabled),
          isActive: ru.isActive !== false,
          createdAt: ru.createdAt,
          updatedAt: ru.updatedAt,
          _count: { reviews: Number(ru.reviewCount || 0) },
        }));
      } catch (rawErr) {
        console.error("Raw user fallback also failed:", rawErr?.message);
        const basicUsers = await prisma.user.findMany({
          orderBy: { createdAt: "desc" },
        }).catch(() => []);
        users = (basicUsers || []).map((bu) => ({
          ...bu,
          twoFactorEnabled: Boolean(bu.twoFactorEnabled),
          isActive: bu.isActive !== false,
          _count: { reviews: 0 },
        }));
      }
    }

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
    } catch (_) {
      try {
        const rawAdmins = await prisma.$queryRaw`
          SELECT "id", "name", "email", "image", COALESCE("twoFactorEnabled", false) as "twoFactorEnabled", "createdAt", "updatedAt"
          FROM "Admin"
          ORDER BY "createdAt" DESC
        `;
        admins = (rawAdmins || []).map((ra) => ({
          id: ra.id,
          name: ra.name || "Admin",
          email: ra.email || "",
          image: ra.image || null,
          twoFactorEnabled: Boolean(ra.twoFactorEnabled),
          createdAt: ra.createdAt,
          updatedAt: ra.updatedAt,
        }));
      } catch {
        admins = [];
      }
    }

    // Combine admins into list if not already present in User table
    const existingEmails = new Set(
      users
        .filter((u) => u && u.email)
        .map((u) => String(u.email).toLowerCase().trim())
    );

    const adminAsUsers = admins
      .filter((a) => a && a.email && !existingEmails.has(String(a.email).toLowerCase().trim()))
      .map((a) => ({
        id: a.id,
        name: a.name || "Admin",
        email: a.email,
        image: a.image || null,
        role: "ADMIN",
        twoFactorEnabled: Boolean(a.twoFactorEnabled),
        isActive: true,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
        _count: { reviews: 0 },
        isDedicatedAdminModel: true,
      }));

    let allAccounts = [...users, ...adminAsUsers].map((u) => {
      const emailLower = String(u.email || "").toLowerCase().trim();
      const isMainAdmin = emailLower === "merxodevsolutions@gmail.com";
      return {
        ...u,
        name: u.name || "User",
        email: u.email || "",
        role: isMainAdmin ? "ADMIN" : (u.role || "USER"),
        isActive: isMainAdmin ? true : (u.isActive !== false),
        twoFactorEnabled: Boolean(u.twoFactorEnabled),
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
          (u.name && String(u.name).toLowerCase().includes(search)) ||
          (u.email && String(u.email).toLowerCase().includes(search))
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
    return NextResponse.json(
      {
        error: error?.message || "Failed to fetch users",
        users: [],
        stats: { total: 0, admins: 0, twoFactorCount: 0, activeCount: 0, suspendedCount: 0 },
      },
      { status: 500 }
    );
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
