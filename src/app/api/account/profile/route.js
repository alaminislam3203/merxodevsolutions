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
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
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
    const admin = await prisma.admin.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
      },
    });

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
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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
          { error: 'Failed to upload avatar image. Please try again.' },
          { status: 500 }
        );
      }
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Check if admin is updating their profile
      const admin = await prisma.admin.findUnique({ where: { email } });
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

        const updatedAdmin = await prisma.admin.update({
          where: { email },
          data: updateData,
          select: { id: true, name: true, email: true, image: true, createdAt: true },
        });

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
      where: { email },
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
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
