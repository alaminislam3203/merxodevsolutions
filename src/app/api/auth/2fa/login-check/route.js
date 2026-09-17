import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
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

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>2FA Login Verification</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #060b19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
        <div style="max-width: 560px; margin: 30px auto; padding: 32px 24px; background: #0c1328; border: 1px solid rgba(124, 58, 237, 0.3); border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 800;">
              MerxoDev Solutions
            </h1>
            <p style="margin: 6px 0 0 0; font-size: 12px; color: #94a3b8; letter-spacing: 0.1em; text-transform: uppercase;">
              Two-Factor Login Verification
            </p>
          </div>

          <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
            <p style="margin: 0 0 12px 0; font-size: 15px; color: #e2e8f0;">
              Hello <strong>${recipientName}</strong>,
            </p>
            <p style="margin: 0 0 20px 0; font-size: 14px; color: #94a3b8; line-height: 1.6;">
              Someone is attempting to log into your MerxoDev account. Use the 6-digit 2FA verification code below to authorize this session:
            </p>

            <div style="text-align: center; margin: 28px 0;">
              <div style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(6, 182, 212, 0.2)); border: 2px dashed #7c3aed; border-radius: 14px; letter-spacing: 8px; font-size: 32px; font-weight: 800; color: #38bdf8; font-family: monospace;">
                ${otp}
              </div>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #f59e0b;">
                ⚠️ This code will expire in <strong>2 minutes</strong>.
              </p>
            </div>

            <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">
              If you did not attempt to log in, someone may know your password. We strongly recommend resetting your password immediately.
            </p>
          </div>

          <div style="text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 18px; font-size: 11px; color: #64748b;">
            <p style="margin: 0 0 6px 0;">© ${new Date().getFullYear()} MerxoDev Solutions. All rights reserved.</p>
            <p style="margin: 0;">Nilphamari Sadar, Rangpur, Bangladesh • <a href="https://merxodevsolutions.pro.bd/" style="color: #38bdf8; text-decoration: none;">merxodevsolutions.pro.bd</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"MerxoDev Security" <${process.env.GMAIL_USER}>`,
      to: emailTrimmed,
      subject: `${otp} is your MerxoDev 2FA login verification code`,
      html: emailHtml,
      text: `Your MerxoDev 2FA login code is: ${otp} (Valid for 2 minutes).`,
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
