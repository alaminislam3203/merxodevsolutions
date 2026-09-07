import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { DEFAULT_REVIEWS } from '@/lib/defaultReviews';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET: Fetch all approved reviews
export async function GET() {
  try {
    let reviews = await prisma.review.findMany({
      where: { isApproved: true },
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
    });

    // Auto-seed default approved reviews if table is empty
    if (!reviews || reviews.length === 0) {
      await prisma.review.createMany({
        data: DEFAULT_REVIEWS,
      });
      reviews = await prisma.review.findMany({
        where: { isApproved: true },
        orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
      });
    }

    return NextResponse.json(
      { reviews },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching reviews:', error);
    // Fallback to static default reviews on DB error
    return NextResponse.json({ reviews: DEFAULT_REVIEWS });
  }
}

// POST: User submits a review (Requires Login, Pending Approval)
export async function POST(request) {
  try {
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`review:${clientIp}`, { limit: 5, windowMs: 10 * 60 * 1000 });
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Too many review submissions. Please wait a few minutes before trying again.' },
        { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfter) } }
      );
    }

    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'You must be logged in to submit a review.' },
        { status: 401 }
      );
    }

    const { rating, comment, userRole, company, location, tag } = await request.json();

    if (!comment || typeof comment !== 'string' || comment.trim().length < 5) {
      return NextResponse.json(
        { error: 'Review comment must be at least 5 characters long.' },
        { status: 400 }
      );
    }

    if (comment.length > 1000) {
      return NextResponse.json(
        { error: 'Review comment must not exceed 1000 characters.' },
        { status: 400 }
      );
    }

    const parsedRating = Math.max(1, Math.min(5, parseInt(rating, 10) || 5));

    // Create review with isApproved: false (Waiting for Admin Approval)
    const review = await prisma.review.create({
      data: {
        userName: session.user.name || 'Client',
        userRole: userRole ? userRole.trim() : 'Client',
        userEmail: session.user.email,
        userImage: session.user.image || null,
        company: company ? company.trim() : '',
        location: location ? location.trim() : 'Bangladesh',
        tag: tag ? tag.trim() : 'Client Review',
        rating: parsedRating,
        comment: comment.trim(),
        isApproved: false, // Must be approved by Admin
        isFeatured: false,
        userId: session.user.id || null,
      },
    });

    return NextResponse.json(
      {
        message: 'Your review has been submitted successfully! It will be displayed once approved by our team.',
        review,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting review:', error);
    return NextResponse.json(
      { error: 'Failed to submit review. Please try again later.' },
      { status: 500 }
    );
  }
}
