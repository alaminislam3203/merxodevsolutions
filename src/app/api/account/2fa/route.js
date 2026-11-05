import { NextResponse } from 'next/server';
import { auth } from '@/auth';
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

// GET /api/account/2fa - Check current 2FA status
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const email = session.user.email.toLowerCase().trim();

    // Check user table via direct SQL first to avoid stale schema issues
    try {
      const rows = await prisma.$queryRaw`
        SELECT "id", "twoFactorEnabled" FROM "User"
        WHERE LOWER("email") = LOWER(${email})
        LIMIT 1
      `;
      if (rows && rows.length > 0) {
        return NextResponse.json({ enabled: Boolean(rows[0].twoFactorEnabled) });
      }
    } catch (rawErr) {
      const user = await prisma.user.findFirst({
        where: { email: { equals: email, mode: 'insensitive' } },
      });
      if (user) {
        return NextResponse.json({ enabled: Boolean(user.twoFactorEnabled) });
      }
    }

    // Check admin table via direct SQL first
    try {
      const adminRows = await prisma.$queryRaw`
        SELECT "id", "twoFactorEnabled" FROM "Admin"
        WHERE LOWER("email") = LOWER(${email})
        LIMIT 1
      `;
      if (adminRows && adminRows.length > 0) {
        return NextResponse.json({ enabled: Boolean(adminRows[0].twoFactorEnabled) });
      }
    } catch (rawErr) {
      const admin = await prisma.admin.findFirst({
        where: { email: { equals: email, mode: 'insensitive' } },
      });
      if (admin) {
        return NextResponse.json({ enabled: Boolean(admin.twoFactorEnabled) });
      }
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

      const emailHtml = renderOtpSecurityEmail({
        title: 'Two-Factor Authentication Setup',
        badgeText: '2FA Activation',
        recipientName: session.user.name || 'Valued Client',
        introText:
          'You requested to enable Two-Factor Authentication (2FA) for your MerxoDev account. Use the 6-digit confirmation code below to activate 2FA:',
        code: otp,
        expiryMinutes: 2,
        footerWarning:
          'If you did not request to enable 2FA, please immediately review your account security settings.',
        useCid: true,
      });

      await transporter.sendMail({
        from: `"MerxoDev Security" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: `${otp} is your MerxoDev 2FA activation code`,
        html: emailHtml,
        text: `Your MerxoDev 2FA activation code is: ${otp} (Valid for 2 minutes).`,
        attachments: getBrandEmailAttachments(),
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

      // Update User or Admin with resilient SQL execution
      const user = await prisma.user.findFirst({
        where: { email: { equals: email, mode: 'insensitive' } },
      });

      if (user) {
        try {
          await prisma.$executeRaw`
            UPDATE "User"
            SET "twoFactorEnabled" = true, "updatedAt" = NOW()
            WHERE "id" = ${user.id}
          `;
        } catch (sqlErr) {
          console.warn('Raw SQL update failed, fallback to model update:', sqlErr);
          await prisma.user.update({
            where: { id: user.id },
            data: { twoFactorEnabled: true },
          });
        }
      } else {
        const admin = await prisma.admin.findFirst({
          where: { email: { equals: email, mode: 'insensitive' } },
        });
        if (admin) {
          try {
            await prisma.$executeRaw`
              UPDATE "Admin"
              SET "twoFactorEnabled" = true, "updatedAt" = NOW()
              WHERE "id" = ${admin.id}
            `;
          } catch (sqlErr) {
            console.warn('Raw SQL update failed, fallback to model update:', sqlErr);
            await prisma.admin.update({
              where: { id: admin.id },
              data: { twoFactorEnabled: true },
            });
          }
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
        try {
          await prisma.$executeRaw`
            UPDATE "User"
            SET "twoFactorEnabled" = false, "updatedAt" = NOW()
            WHERE "id" = ${user.id}
          `;
        } catch (sqlErr) {
          console.warn('Raw SQL update failed, fallback to model update:', sqlErr);
          await prisma.user.update({
            where: { id: user.id },
            data: { twoFactorEnabled: false },
          });
        }
      } else {
        const admin = await prisma.admin.findFirst({
          where: { email: { equals: email, mode: 'insensitive' } },
        });
        if (admin) {
          try {
            await prisma.$executeRaw`
              UPDATE "Admin"
              SET "twoFactorEnabled" = false, "updatedAt" = NOW()
              WHERE "id" = ${admin.id}
            `;
          } catch (sqlErr) {
            console.warn('Raw SQL update failed, fallback to model update:', sqlErr);
            await prisma.admin.update({
              where: { id: admin.id },
              data: { twoFactorEnabled: false },
            });
          }
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
