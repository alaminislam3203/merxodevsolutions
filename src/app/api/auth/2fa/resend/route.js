import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

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

    if (!account || !account.twoFactorEnabled) {
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
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>2FA Verification Code</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #060b19; font-family: sans-serif; color: #ffffff;">
        <div style="max-width: 560px; margin: 30px auto; padding: 32px 24px; background: #0c1328; border: 1px solid rgba(124, 58, 237, 0.3); border-radius: 20px;">
          <h2 style="color: #38bdf8; text-align: center;">MerxoDev Solutions</h2>
          <p>Hello <strong>${recipientName}</strong>,</p>
          <p>Your requested 2FA verification code is:</p>
          <div style="text-align: center; margin: 24px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #38bdf8; font-family: monospace; background: rgba(124, 58, 237, 0.2); padding: 12px 24px; border: 2px dashed #7c3aed; border-radius: 12px;">
              ${otp}
            </span>
            <p style="color: #f59e0b; font-size: 12px; margin-top: 10px;">⚠️ Valid for 2 minutes.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"MerxoDev Security" <${process.env.GMAIL_USER}>`,
      to: emailTrimmed,
      subject: `${otp} is your new MerxoDev 2FA code`,
      html: emailHtml,
      text: `Your new MerxoDev 2FA code is: ${otp} (Valid for 2 minutes).`,
    });

    return NextResponse.json({ message: 'A fresh 2FA code has been sent to your email.' });
  } catch (error) {
    console.error('Error resending 2FA code:', error);
    return NextResponse.json({ error: error?.message || 'Failed to resend code.' }, { status: 500 });
  }
}
