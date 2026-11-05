import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import {
  renderOtpSecurityEmail,
  getBrandEmailAttachments,
} from '@/lib/templates/brandEmailLayout';

function createTransporter() {
  if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
  }
  return null;
}

export async function POST(request) {
  try {
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`login-check-2fa:${clientIp}`, { limit: 15, windowMs: 15 * 60 * 1000 });
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please wait a few minutes before trying again.' },
        { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfter) } }
      );
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const emailTrimmed = email.toLowerCase().trim();

    // 1. Check Admin
    const admin = await prisma.admin.findUnique({
      where: { email: emailTrimmed },
    });

    let account = null;
    let isAdmin = false;

    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (isMatch) {
        account = admin;
        isAdmin = true;
      }
    }

    // 2. Check User if not admin
    if (!account) {
      const user = await prisma.user.findUnique({
        where: { email: emailTrimmed },
      });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          account = user;
          isAdmin = false;
        }
      }
    }

    // If credentials don't match any account
    if (!account) {
      return NextResponse.json(
        { error: 'Invalid email or password. Please verify your credentials.' },
        { status: 401 }
      );
    }

    // Check if account is suspended
    if (!isAdmin && account.isActive === false) {
      return NextResponse.json(
        { error: 'Your account has been suspended by the administrator. Please contact support.' },
        { status: 403 }
      );
    }

    // Check if 2FA is enabled
    let is2FA = account.twoFactorEnabled;
    if (is2FA === undefined) {
      try {
        if (isAdmin) {
          const rows = await prisma.$queryRaw`SELECT "twoFactorEnabled" FROM "Admin" WHERE "id" = ${account.id} LIMIT 1`;
          is2FA = Boolean(rows?.[0]?.twoFactorEnabled);
        } else {
          const rows = await prisma.$queryRaw`SELECT "twoFactorEnabled" FROM "User" WHERE "id" = ${account.id} LIMIT 1`;
          is2FA = Boolean(rows?.[0]?.twoFactorEnabled);
        }
      } catch (_) {}
    }

    if (!is2FA) {
      return NextResponse.json({
        requires2FA: false,
      });
    }

    // 2FA IS ENABLED: Generate code and send email
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes expiry

    // Delete any older tokens for this email
    await prisma.twoFactorToken.deleteMany({
      where: { email: emailTrimmed },
    });

    // Save token
    await prisma.twoFactorToken.create({
      data: {
        email: emailTrimmed,
        code: otp,
        expiresAt,
      },
    });

    const transporter = createTransporter();
    if (!transporter) {
      console.error('Gmail SMTP credentials not configured.');
      return NextResponse.json(
        { error: 'Email service unavailable for 2FA verification. Please contact support.' },
        { status: 500 }
      );
    }

    const recipientName = account.name || (isAdmin ? 'Admin' : 'Valued Client');

    const emailHtml = renderOtpSecurityEmail({
      title: 'Two-Factor Login Verification',
      badgeText: '2FA Login Security',
      recipientName,
      introText:
        'Someone is attempting to log into your MerxoDev account. Use the 6-digit 2FA verification code below to authorize this session:',
      code: otp,
      expiryMinutes: 2,
      footerWarning:
        'If you did not attempt to log in, someone may know your password. We strongly recommend resetting your password immediately.',
      useCid: true,
    });

    await transporter.sendMail({
      from: `"MerxoDev Security" <${process.env.GMAIL_USER}>`,
      to: emailTrimmed,
      subject: `${otp} is your MerxoDev 2FA login verification code`,
      html: emailHtml,
      text: `Your MerxoDev 2FA login code is: ${otp} (Valid for 2 minutes).`,
      attachments: getBrandEmailAttachments(),
    });

    return NextResponse.json({
      requires2FA: true,
      email: emailTrimmed,
      message: '2FA security code sent to your email address.',
    });
  } catch (error) {
    console.error('Error in 2FA login check:', error);
    return NextResponse.json(
      { error: error?.message || 'Login verification failed. Please try again.' },
      { status: 500 }
    );
  }
}
