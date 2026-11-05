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
    const rateCheck = checkRateLimit(`send-reset-code:${clientIp}`, { limit: 5, windowMs: 15 * 60 * 1000 });
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a few minutes before trying again.' },
        { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfter) } }
      );
    }

    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const emailTrimmed = email.toLowerCase().trim();

    // Check if account exists in User or Admin table
    const user = await prisma.user.findUnique({
      where: { email: emailTrimmed },
      select: { id: true, name: true, email: true },
    });

    const admin = !user
      ? await prisma.admin.findUnique({
        where: { email: emailTrimmed },
        select: { id: true, name: true, email: true },
      })
      : null;

    if (!user && !admin) {
      return NextResponse.json(
        { error: 'No registered account found with this email address.' },
        { status: 404 }
      );
    }

    const recipientName = user?.name || admin?.name || 'Valued Client';

    // Generate 6-digit random code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes expiry

    // Remove any previous unused reset tokens for this email
    try {
      if (prisma?.passwordResetToken?.deleteMany) {
        await prisma.passwordResetToken.deleteMany({
          where: { email: emailTrimmed },
        });
      } else {
        await prisma.$executeRaw`DELETE FROM "PasswordResetToken" WHERE LOWER("email") = LOWER(${emailTrimmed})`;
      }
    } catch {
      await prisma.$executeRaw`DELETE FROM "PasswordResetToken" WHERE LOWER("email") = LOWER(${emailTrimmed})`.catch(() => {});
    }

    // Save token in DB
    try {
      if (prisma?.passwordResetToken?.create) {
        await prisma.passwordResetToken.create({
          data: {
            email: emailTrimmed,
            code,
            expiresAt,
          },
        });
      } else {
        const id = 'rst_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
        await prisma.$executeRaw`
          INSERT INTO "PasswordResetToken" ("id", "email", "code", "expiresAt", "createdAt")
          VALUES (${id}, ${emailTrimmed}, ${code}, ${expiresAt}, NOW())
        `;
      }
    } catch (saveErr) {
      const id = 'rst_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
      await prisma.$executeRaw`
        INSERT INTO "PasswordResetToken" ("id", "email", "code", "expiresAt", "createdAt")
        VALUES (${id}, ${emailTrimmed}, ${code}, ${expiresAt}, NOW())
      `;
    }

    // Dispatch email
    const transporter = createTransporter();
    if (!transporter) {
      console.error('Gmail SMTP credentials not configured.');
      return NextResponse.json(
        { error: 'Mail delivery service is currently unavailable. Please contact support.' },
        { status: 500 }
      );
    }

    const emailHtml = renderOtpSecurityEmail({
      title: 'Password Reset Verification',
      badgeText: 'Account Recovery',
      recipientName,
      introText:
        'We received a request to reset the password for your MerxoDev account. Use the 6-digit verification code below to complete your password reset:',
      code,
      expiryMinutes: 2,
      footerWarning:
        'If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged and your account is secure.',
      useCid: true,
    });

    await transporter.sendMail({
      from: `"MerxoDev Solutions" <${process.env.GMAIL_USER}>`,
      to: emailTrimmed,
      subject: `${code} is your MerxoDev password reset verification code`,
      html: emailHtml,
      text: `Hello ${recipientName},\n\nYour MerxoDev password reset code is: ${code}\n\nThis code will expire in 2 minutes.\n\nIf you did not request this, please ignore this email.`,
      attachments: getBrandEmailAttachments(),
    });

    return NextResponse.json({
      message: 'A 6-digit verification code has been sent to your email address.',
    });
  } catch (error) {
    console.error('Error sending reset code:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to send verification code. Please try again.' },
      { status: 500 }
    );
  }
}
