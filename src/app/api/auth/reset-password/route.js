import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

export async function POST(request) {
  try {
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`reset-pw:${clientIp}`, { limit: 10, windowMs: 15 * 60 * 1000 });
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Too many password reset attempts. Please wait a few minutes before trying again.' },
        { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfter) } }
      );
    }

    const { email, code, newPassword } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Valid email address is required.' },
        { status: 400 }
      );
    }

    if (!code || typeof code !== 'string' || code.trim().length < 4) {
      return NextResponse.json(
        { error: 'Please provide the 6-digit verification code sent to your email.' },
        { status: 400 }
      );
    }

    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    const emailTrimmed = email.toLowerCase().trim();
    const codeTrimmed = code.trim();

    // Verify reset code in DB
    const validToken = await prisma.passwordResetToken.findFirst({
      where: {
        email: emailTrimmed,
        code: codeTrimmed,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!validToken) {
      return NextResponse.json(
        { error: 'Invalid or expired verification code. Please check the code in your email or request a new one.' },
        { status: 400 }
      );
    }

    // 1. Check if user exists in User table
    const user = await prisma.user.findUnique({
      where: { email: emailTrimmed },
    });

    if (user) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });

      // Cleanup used reset tokens
      await prisma.passwordResetToken.deleteMany({
        where: { email: emailTrimmed },
      });

      return NextResponse.json({
        message: 'Password reset successfully! You can now sign in with your new password.',
      });
    }

    // 2. Check if user exists in Admin table
    const admin = await prisma.admin.findUnique({
      where: { email: emailTrimmed },
    });

    if (admin) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await prisma.admin.update({
        where: { id: admin.id },
        data: { password: hashedPassword },
      });

      // Cleanup used reset tokens
      await prisma.passwordResetToken.deleteMany({
        where: { email: emailTrimmed },
      });

      return NextResponse.json({
        message: 'Admin password reset successfully! You can now sign in with your new password.',
      });
    }

    // Neither found
    return NextResponse.json(
      { error: 'No registered account found with this email address.' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Password Reset Error:', error);
    return NextResponse.json(
      { error: 'Failed to reset password. Please try again later.' },
      { status: 500 }
    );
  }
}
