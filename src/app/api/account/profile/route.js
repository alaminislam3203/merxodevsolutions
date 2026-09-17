import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { uploadImage } from '@/lib/cloudinary';

// GET /api/account/profile - Get current user profile and their activity
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const email = session.user.email.toLowerCase().trim();

    // Try finding regular user
    const user = await prisma.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        twoFactorEnabled: true,
        createdAt: true,
        reviews: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            comment: true,
            rating: true,
            isApproved: true,
            createdAt: true,
          },
        },
      },
    });

    if (user) {
      return NextResponse.json({ user, isAdmin: user.role === 'ADMIN' });
    }

    // Try finding admin user
    let admin = null;
    try {
      admin = await prisma.admin.findFirst({
        where: { email: { equals: email, mode: 'insensitive' } },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          twoFactorEnabled: true,
          createdAt: true,
        },
      });
    } catch (adminGetErr) {
      if (
        adminGetErr?.message?.includes("Unknown field `image`") ||
        adminGetErr?.message?.includes("Unknown argument `image`")
      ) {
        const rows = await prisma.$queryRaw`SELECT "id", "name", "email", "image", "createdAt" FROM "Admin" WHERE LOWER("email") = LOWER(${email}) LIMIT 1`;
        admin = rows?.[0] || null;
      } else {
        throw adminGetErr;
      }
    }

    if (admin) {
      return NextResponse.json({
        user: {
          ...admin,
          role: 'ADMIN',
          image: admin.image || null,
          reviews: [],
        },
        isAdmin: true,
      });
    }

    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  } catch (err) {
    console.error('Error in GET /api/account/profile:', err);
    return NextResponse.json({ error: err?.message || 'Failed to fetch user profile' }, { status: 500 });
  }
}

// PUT /api/account/profile - Update name, image, or change password
export async function PUT(request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const email = session.user.email.toLowerCase().trim();
    const body = await request.json();
    const { name, image, currentPassword, newPassword } = body;

    // Handle image upload if a base64 string was sent (for either user or admin)
    let finalImageUrl = image;
    if (image && typeof image === 'string' && image.startsWith('data:image/')) {
      try {
        const uploaded = await uploadImage(image);
        finalImageUrl = uploaded.url;
      } catch (uploadErr) {
        console.error('Cloudinary avatar upload error:', uploadErr);
        return NextResponse.json(
          { error: `Avatar upload failed: ${uploadErr?.message || 'Please try again'}` },
          { status: 500 }
        );
      }
    }

    const user = await prisma.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
    });

    if (!user) {
      // Check if admin is updating their profile
      let admin = null;
      try {
        admin = await prisma.admin.findFirst({
          where: { email: { equals: email, mode: 'insensitive' } },
        });
      } catch {
        const rows = await prisma.$queryRaw`SELECT * FROM "Admin" WHERE LOWER("email") = LOWER(${email}) LIMIT 1`;
        admin = rows?.[0] || null;
      }

      if (admin) {
        const updateData = {};
        if (name && name.trim()) updateData.name = name.trim();
        if (image !== undefined) {
          updateData.image = finalImageUrl && finalImageUrl.trim() ? finalImageUrl.trim() : null;
        }

        if (newPassword) {
          if (!currentPassword) {
            return NextResponse.json(
              { error: 'Current password is required to set a new password' },
              { status: 400 }
            );
          }
          const isMatch = await bcrypt.compare(currentPassword, admin.password);
          if (!isMatch) {
            return NextResponse.json(
              { error: 'Current password is incorrect' },
              { status: 400 }
            );
          }
          if (newPassword.length < 6) {
            return NextResponse.json(
              { error: 'New password must be at least 6 characters' },
              { status: 400 }
            );
          }
          updateData.password = await bcrypt.hash(newPassword, 10);
        }

        let updatedAdmin;
        try {
          updatedAdmin = await prisma.admin.update({
            where: { id: admin.id },
            data: updateData,
            select: { id: true, name: true, email: true, image: true, createdAt: true },
          });
        } catch (updateErr) {
          // If in-memory dev bundle has old Prisma schema without Admin.image
          if (
            updateErr?.message?.includes("Unknown argument `image`") ||
            updateErr?.message?.includes("Unknown field `image`")
          ) {
            if (updateData.image !== undefined) {
              await prisma.$executeRaw`UPDATE "Admin" SET "image" = ${updateData.image}, "updatedAt" = NOW() WHERE "id" = ${admin.id}`;
            }
            if (updateData.name) {
              await prisma.$executeRaw`UPDATE "Admin" SET "name" = ${updateData.name}, "updatedAt" = NOW() WHERE "id" = ${admin.id}`;
            }
            if (updateData.password) {
              await prisma.$executeRaw`UPDATE "Admin" SET "password" = ${updateData.password}, "updatedAt" = NOW() WHERE "id" = ${admin.id}`;
            }
            const rows = await prisma.$queryRaw`SELECT "id", "name", "email", "image", "createdAt" FROM "Admin" WHERE "id" = ${admin.id} LIMIT 1`;
            updatedAdmin = rows?.[0] || {
              id: admin.id,
              name: updateData.name || admin.name,
              email: admin.email,
              image: updateData.image !== undefined ? updateData.image : (admin.image || null),
              createdAt: admin.createdAt,
            };
          } else {
            throw updateErr;
          }
        }

        return NextResponse.json({
          message: 'Admin profile updated successfully',
          user: { ...updatedAdmin, role: 'ADMIN' },
        });
      }

      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updateData = {};
    if (name && name.trim()) updateData.name = name.trim();
    if (image !== undefined) {
      updateData.image = finalImageUrl && finalImageUrl.trim() ? finalImageUrl.trim() : null;
    }

    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: 'Current password is required to change password' },
          { status: 400 }
        );
      }
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 400 }
        );
      }
      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: 'New password must be at least 6 characters' },
          { status: 400 }
        );
      }
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (err) {
    console.error('Error in PUT /api/account/profile:', err);
    return NextResponse.json({ error: err?.message || 'Failed to update profile' }, { status: 500 });
  }
}
