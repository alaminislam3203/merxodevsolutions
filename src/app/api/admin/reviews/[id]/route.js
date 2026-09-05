import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/adminAuth';

// PATCH: Approve, Reject, Feature, or Edit a review
export async function PATCH(request, { params }) {
  try {
    const { authorized, response } = await requireAdmin();
    if (!authorized) return response;

    const { id } = await params;
    const body = await request.json();

    const existingReview = await prisma.review.findUnique({
      where: { id },
    });

    if (!existingReview) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    const updateData = {};
    if (body.isApproved !== undefined) updateData.isApproved = Boolean(body.isApproved);
    if (body.isFeatured !== undefined) updateData.isFeatured = Boolean(body.isFeatured);
    if (body.userName) updateData.userName = body.userName.trim();
    if (body.userRole !== undefined) updateData.userRole = body.userRole.trim();
    if (body.company !== undefined) updateData.company = body.company.trim();
    if (body.location !== undefined) updateData.location = body.location.trim();
    if (body.tag !== undefined) updateData.tag = body.tag.trim();
    if (body.userImage !== undefined) updateData.userImage = body.userImage && typeof body.userImage === 'string' ? body.userImage.trim() : null;
    if (body.rating !== undefined) updateData.rating = Math.max(1, Math.min(5, parseInt(body.rating, 10)));
    if (body.comment) updateData.comment = body.comment.trim();

    const updated = await prisma.review.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      message: 'Review updated successfully',
      review: updated,
    });
  } catch (error) {
    console.error('Admin PATCH Review Error:', error);
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}

// DELETE: Delete a review by ID
export async function DELETE(request, { params }) {
  try {
    const { authorized, response } = await requireAdmin();
    if (!authorized) return response;

    const { id } = await params;

    await prisma.review.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Admin DELETE Review Error:', error);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
