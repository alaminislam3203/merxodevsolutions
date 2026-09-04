import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

const DEFAULT_REVIEWS = [
  {
    userName: 'Rakibul Islam',
    userRole: 'CEO & Founder',
    company: 'TechStart BD',
    location: 'Dhaka, Bangladesh',
    rating: 5,
    tag: 'E-Commerce Platform',
    comment:
      'MerxoDev delivered our full-scale e-commerce platform 5 days ahead of schedule! The Next.js code quality was pristine, SEO was spot on, and the team was available 24/7. Highly recommended for any serious business.',
    isApproved: true,
    isFeatured: true,
  },
  {
    userName: 'Sarah Johnson',
    userRole: 'Product Director',
    company: 'GrowthLab Digital',
    location: 'London, UK',
    rating: 5,
    tag: 'SaaS Web Application',
    comment:
      'Working with the MerxoDev Solutions engineering team was an absolute delight. They grasped our complex dashboard requirements effortlessly and executed pixel-perfect responsive designs.',
    isApproved: true,
    isFeatured: true,
  },
  {
    userName: 'Tanvir Ahmed',
    userRole: 'CTO & Co-Founder',
    company: 'ShopEasy Online',
    location: 'Chittagong, BD',
    rating: 5,
    tag: 'Custom ERP & POS',
    comment:
      'Hands down the most talented developer team we have hired. Clean architecture, zero spaghetti code, high security, and prompt post-launch maintenance. We are already planning our next project with them!',
    isApproved: true,
    isFeatured: true,
  },
  {
    userName: 'David Miller',
    userRole: 'Head of Engineering',
    company: 'CloudCore Inc',
    location: 'California, USA',
    rating: 5,
    tag: 'API & Cloud Systems',
    comment:
      'Superb communication and technical expertise. They integrated our microservices with PostgreSQL and Next.js seamlessly. The performance scores jumped to 98+ on Google Lighthouse!',
    isApproved: true,
    isFeatured: false,
  },
  {
    userName: 'Anisur Rahman',
    userRole: 'Managing Director',
    company: 'EduLearn Academy',
    location: 'Rajshahi, BD',
    rating: 5,
    tag: 'EdTech Portal',
    comment:
      'From custom payment gateway (bKash/Nagad/SSLCommerz) to student video portals, everything was delivered with top-notch craftsmanship. Their pricing is transparent with zero hidden fees.',
    isApproved: true,
    isFeatured: false,
  },
  {
    userName: 'Elena Rostova',
    userRole: 'Creative Director',
    company: 'NovaBrand Studio',
    location: 'Dubai, UAE',
    rating: 5,
    tag: 'UI/UX & Portfolio',
    comment:
      'The GSAP animations and sleek dark mode theme they crafted blew our international clients away. Truly state-of-the-art web design that converts visitors into enterprise contracts!',
    isApproved: true,
    isFeatured: false,
  },
  {
    userName: 'Mahfuzur Rahman',
    userRole: 'Chief Operating Officer',
    company: 'RetailPro Distribution',
    location: 'Sylhet, BD',
    rating: 5,
    tag: 'Inventory Dashboard',
    comment:
      'Fast, reliable, and exceptionally polite. They handled our real-time stock sync with database indexing effortlessly. 10/10 experience with MerxoDev Solutions.',
    isApproved: true,
    isFeatured: false,
  },
  {
    userName: 'Michael Chen',
    userRole: 'Tech Lead',
    company: 'Nexus Logistics Hub',
    location: 'Singapore',
    rating: 5,
    tag: 'Enterprise Tracking Web App',
    comment:
      'Remarkable speed and responsiveness. The team respected our NDA, provided weekly sprint demo builds, and deployed flawlessly to Vercel without a single downtime.',
    isApproved: true,
    isFeatured: false,
  },
];

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

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    // Fallback to static default reviews on DB error
    return NextResponse.json({ reviews: DEFAULT_REVIEWS });
  }
}

// POST: User submits a review (Requires Login, Pending Approval)
export async function POST(request) {
  try {
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
