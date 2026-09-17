import { NextResponse } from 'next/server';
import { auth } from '@/auth';
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

// GET /api/account/2fa - Check current 2FA status
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const email = session.user.email.toLowerCase().trim();

    // Check user table
    const user = await prisma.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
      select: { twoFactorEnabled: true },
    });

    if (user) {
      return NextResponse.json({ enabled: Boolean(user.twoFactorEnabled) });
    }

    // Check admin table
    const admin = await prisma.admin.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
      select: { twoFactorEnabled: true },
    });

    if (admin) {
      return NextResponse.json({ enabled: Boolean(admin.twoFactorEnabled) });
    }

    return NextResponse.json({ error: 'Account not found' }, { status: 404 });
  } catch (error) {
    console.error('Error fetching 2FA status:', error);
    return NextResponse.json({ error: 'Failed to fetch 2FA status' }, { status: 500 });
  }
}

// POST /api/account/2fa - Send setup code, verify-enable, or disable
export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`account-2fa:${clientIp}`, { limit: 10, windowMs: 15 * 60 * 1000 });
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a few minutes before trying again.' },
        { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfter) } }
      );
    }

    const email = session.user.email.toLowerCase().trim();
    const body = await request.json();
    const { action, code } = body;

    // 1. ACTION: SEND SETUP CODE TO ENABLE 2FA
    if (action === 'send-setup-code') {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes expiry

      // Clear any previous tokens for this email
      await prisma.twoFactorToken.deleteMany({
        where: { email },
      });

      // Save new token
      await prisma.twoFactorToken.create({
        data: {
          email,
          code: otp,
          expiresAt,
        },
      });

      const transporter = createTransporter();
      if (!transporter) {
        return NextResponse.json(
          { error: 'Email delivery service is currently unavailable.' },
          { status: 500 }
        );
      }

      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>2FA Setup Verification</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #060b19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
          <div style="max-width: 560px; margin: 30px auto; padding: 32px 24px; background: #0c1328; border: 1px solid rgba(124, 58, 237, 0.3); border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 800;">
                MerxoDev Solutions
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 12px; color: #94a3b8; letter-spacing: 0.1em; text-transform: uppercase;">
                Two-Factor Authentication Setup
              </p>
            </div>

            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
              <p style="margin: 0 0 12px 0; font-size: 15px; color: #e2e8f0;">
                Hello <strong>${session.user.name || 'Valued Client'}</strong>,
              </p>
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #94a3b8; line-height: 1.6;">
                You requested to enable Two-Factor Authentication (2FA) for your MerxoDev account. Use the 6-digit confirmation code below to activate 2FA:
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
                If you did not request to enable 2FA, please immediately review your account security settings.
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
        to: email,
        subject: `${otp} is your MerxoDev 2FA activation code`,
        html: emailHtml,
        text: `Your MerxoDev 2FA activation code is: ${otp} (Valid for 2 minutes).`,
      });

      return NextResponse.json({
        message: 'A 6-digit confirmation code has been sent to your email.',
      });
    }

    // 2. ACTION: VERIFY CODE & ENABLE 2FA
    if (action === 'verify-enable') {
      if (!code || typeof code !== 'string' || code.trim().length !== 6) {
        return NextResponse.json(
          { error: 'Please provide a valid 6-digit verification code.' },
          { status: 400 }
        );
      }

      const validToken = await prisma.twoFactorToken.findFirst({
        where: {
          email,
          code: code.trim(),
          expiresAt: { gt: new Date() },
        },
        orderBy: { createdAt: 'desc' },
      });

      if (!validToken) {
        return NextResponse.json(
          { error: 'Invalid or expired confirmation code. Please check your email or request a new code.' },
          { status: 400 }
        );
      }

      // Update User or Admin
      const user = await prisma.user.findFirst({
        where: { email: { equals: email, mode: 'insensitive' } },
      });

      if (user) {
        await prisma.user.update({
          where: { id: user.id },
          data: { twoFactorEnabled: true },
        });
      } else {
        const admin = await prisma.admin.findFirst({
          where: { email: { equals: email, mode: 'insensitive' } },
        });
        if (admin) {
          await prisma.admin.update({
            where: { id: admin.id },
            data: { twoFactorEnabled: true },
          });
        }
      }

      // Clear tokens
      await prisma.twoFactorToken.deleteMany({ where: { email } });

      return NextResponse.json({
        success: true,
        message: 'Two-Factor Authentication (2FA) is now enabled for your account!',
      });
    }

    // 3. ACTION: DISABLE 2FA
    if (action === 'disable') {
      const user = await prisma.user.findFirst({
        where: { email: { equals: email, mode: 'insensitive' } },
      });

      if (user) {
        await prisma.user.update({
          where: { id: user.id },
          data: { twoFactorEnabled: false },
        });
      } else {
        const admin = await prisma.admin.findFirst({
          where: { email: { equals: email, mode: 'insensitive' } },
        });
        if (admin) {
          await prisma.admin.update({
            where: { id: admin.id },
            data: { twoFactorEnabled: false },
          });
        }
      }

      await prisma.twoFactorToken.deleteMany({ where: { email } });

      return NextResponse.json({
        success: true,
        message: 'Two-Factor Authentication (2FA) has been disabled.',
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error managing 2FA:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to update 2FA status. Please try again.' },
      { status: 500 }
    );
  }
}
