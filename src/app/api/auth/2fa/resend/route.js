import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
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
    const rateCheck = checkRateLimit(`resend-2fa:${clientIp}`, { limit: 5, windowMs: 15 * 60 * 1000 });
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Too many resend requests. Please wait a few minutes before trying again.' },
        { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfter) } }
      );
    }

    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    const emailTrimmed = email.toLowerCase().trim();

    // Check user or admin
    const user = await prisma.user.findUnique({ where: { email: emailTrimmed } });
    const admin = !user ? await prisma.admin.findUnique({ where: { email: emailTrimmed } }) : null;
    const account = user || admin;

    let is2FA = account?.twoFactorEnabled;
    if (account && is2FA === undefined) {
      try {
        if (user) {
          const rows = await prisma.$queryRaw`SELECT "twoFactorEnabled" FROM "User" WHERE "id" = ${user.id} LIMIT 1`;
          is2FA = Boolean(rows?.[0]?.twoFactorEnabled);
        } else if (admin) {
          const rows = await prisma.$queryRaw`SELECT "twoFactorEnabled" FROM "Admin" WHERE "id" = ${admin.id} LIMIT 1`;
          is2FA = Boolean(rows?.[0]?.twoFactorEnabled);
        }
      } catch (_) {}
    }

    if (!account || !is2FA) {
      return NextResponse.json({ error: 'Account not found or 2FA is not enabled.' }, { status: 400 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes expiry

    await prisma.twoFactorToken.deleteMany({ where: { email: emailTrimmed } });
    await prisma.twoFactorToken.create({
      data: {
        email: emailTrimmed,
        code: otp,
        expiresAt,
      },
    });

    const transporter = createTransporter();
    if (!transporter) {
      return NextResponse.json({ error: 'Email service unavailable.' }, { status: 500 });
    }

    const recipientName = account.name || 'Valued Client';
    const emailHtml = renderOtpSecurityEmail({
      title: 'New 2FA Verification Code',
      badgeText: '2FA Resend Request',
      recipientName,
      introText:
        'Here is your newly requested 6-digit Two-Factor Authentication verification code:',
      code: otp,
      expiryMinutes: 2,
      footerWarning:
        'If you did not request this verification code, please secure your account immediately.',
      useCid: true,
    });

    await transporter.sendMail({
      from: `"MerxoDev Security" <${process.env.GMAIL_USER}>`,
      to: emailTrimmed,
      subject: `${otp} is your new MerxoDev 2FA code`,
      html: emailHtml,
      text: `Your new MerxoDev 2FA code is: ${otp} (Valid for 2 minutes).`,
      attachments: getBrandEmailAttachments(),
    });

    return NextResponse.json({ message: 'A fresh 2FA code has been sent to your email.' });
  } catch (error) {
    console.error('Error resending 2FA code:', error);
    return NextResponse.json({ error: error?.message || 'Failed to resend code.' }, { status: 500 });
  }
}
