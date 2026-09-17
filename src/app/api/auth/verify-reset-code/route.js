import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

export async function POST(request) {
  try {
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`verify-reset-code:${clientIp}`, { limit: 15, windowMs: 15 * 60 * 1000 });
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Too many verification attempts. Please wait a few minutes before trying again.' },
        { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfter) } }
      );
    }

    const { email, code } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required.' },
        { status: 400 }
      );
    }

    if (!code || typeof code !== 'string' || code.trim().length !== 6) {
      return NextResponse.json(
        { error: 'Please provide a valid 6-digit verification code.' },
        { status: 400 }
      );
    }

    const emailTrimmed = email.toLowerCase().trim();
    const codeTrimmed = code.trim();

    // Verify reset code in DB
    let validToken = null;
    try {
      if (prisma?.passwordResetToken?.findFirst) {
        validToken = await prisma.passwordResetToken.findFirst({
          where: {
            email: emailTrimmed,
            code: codeTrimmed,
            expiresAt: { gt: new Date() },
          },
          orderBy: { createdAt: 'desc' },
        });
      }
    } catch {}

    if (!validToken) {
      const rows = await prisma.$queryRaw`
        SELECT * FROM "PasswordResetToken"
        WHERE LOWER("email") = LOWER(${emailTrimmed})
          AND "code" = ${codeTrimmed}
          AND "expiresAt" > NOW()
        ORDER BY "createdAt" DESC
        LIMIT 1
      `.catch(() => []);
      validToken = rows?.[0] || null;
    }

    if (!validToken) {
      return NextResponse.json(
        { error: 'Invalid or expired verification code. Please check the code in your email or request a new one.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Code verified successfully! You can now set your new password.',
    });
  } catch (error) {
    console.error('Verify Code Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to verify code. Please try again.' },
      { status: 500 }
    );
  }
}
