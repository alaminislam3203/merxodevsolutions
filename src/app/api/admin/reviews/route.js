import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { DEFAULT_REVIEWS } from '@/lib/defaultReviews';

// GET: Fetch all reviews for admin panel
export async function GET(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Auto-seed default reviews if the table is empty so admin can manage them immediately
    const totalCount = await prisma.review.count();
    if (totalCount === 0) {
      await prisma.review.createMany({
        data: DEFAULT_REVIEWS,
      });
    }

    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter'); // 'all' | 'pending' | 'approved'

    let whereClause = {};
    if (filter === 'pending') {
      whereClause.isApproved = false;
    } else if (filter === 'approved') {
      whereClause.isApproved = true;
    }

    const reviews = await prisma.review.findMany({
      where: whereClause,
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
    });

    const pendingCount = await prisma.review.count({
      where: { isApproved: false },
    });

    const approvedCount = await prisma.review.count({
      where: { isApproved: true },
    });

    const allCount = await prisma.review.count();

    return NextResponse.json({
      reviews,
      stats: {
        total: allCount,
        pending: pendingCount,
        approved: approvedCount,
      },
    });
  } catch (error) {
    console.error('Admin GET Reviews Error:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

// POST: Admin manually creates a review
export async function POST(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { userName, userRole, userImage, company, location, tag, rating, comment, isApproved, isFeatured } = body;

    if (!userName || !comment) {
      return NextResponse.json(
        { error: 'User name and review comment are required' },
        { status: 400 }
      );
    }

    const newReview = await prisma.review.create({
      data: {
        userName: userName.trim(),
        userRole: userRole ? userRole.trim() : 'Client',
        userImage: userImage && typeof userImage === 'string' ? userImage.trim() : null,
        company: company ? company.trim() : '',
        location: location ? location.trim() : 'Dhaka, Bangladesh',
        tag: tag ? tag.trim() : 'Verified Client',
        rating: Math.max(1, Math.min(5, parseInt(rating, 10) || 5)),
        comment: comment.trim(),
        isApproved: isApproved !== undefined ? Boolean(isApproved) : true,
        isFeatured: Boolean(isFeatured),
      },
    });

    return NextResponse.json(
      { message: 'Review created successfully', review: newReview },
      { status: 201 }
    );
  } catch (error) {
    console.error('Admin POST Review Error:', error);
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}
