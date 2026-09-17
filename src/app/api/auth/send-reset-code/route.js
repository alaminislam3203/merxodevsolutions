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
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    // Remove any previous unused reset tokens for this email
    await prisma.passwordResetToken.deleteMany({
      where: { email: emailTrimmed },
    });

    // Save token in DB
    await prisma.passwordResetToken.create({
      data: {
        email: emailTrimmed,
        code,
        expiresAt,
      },
    });

    // Dispatch email
    const transporter = createTransporter();
    if (!transporter) {
      console.error('Gmail SMTP credentials not configured.');
      return NextResponse.json(
        { error: 'Mail delivery service is currently unavailable. Please contact support.' },
        { status: 500 }
      );
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Password Reset Code</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #060b19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
        <div style="max-width: 560px; margin: 30px auto; padding: 32px 24px; background: #0c1328; border: 1px solid rgba(124, 58, 237, 0.3); border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 800; background: linear-gradient(135deg, #7c3aed, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
              MerxoDev Solutions
            </h1>
            <p style="margin: 6px 0 0 0; font-size: 12px; color: #94a3b8; letter-spacing: 0.1em; text-transform: uppercase;">
              Security & Account Verification
            </p>
          </div>

          <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
            <p style="margin: 0 0 12px 0; font-size: 15px; color: #e2e8f0;">
              Hello <strong>${recipientName}</strong>,
            </p>
            <p style="margin: 0 0 20px 0; font-size: 14px; color: #94a3b8; line-height: 1.6;">
              We received a request to reset the password for your MerxoDev account. Use the 6-digit verification code below to complete your password reset:
            </p>

            <div style="text-align: center; margin: 28px 0;">
              <div style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(6, 182, 212, 0.2)); border: 2px dashed #7c3aed; border-radius: 14px; letter-spacing: 8px; font-size: 32px; font-weight: 800; color: #38bdf8; font-family: monospace;">
                ${code}
              </div>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #f59e0b;">
                ⚠️ This code will expire in <strong>10 minutes</strong>.
              </p>
            </div>

            <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">
              If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged and your account is secure.
            </p>
          </div>

          <div style="text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 18px; font-size: 11px; color: #64748b;">
            <p style="margin: 0 0 6px 0;">© ${new Date().getFullYear()} MerxoDev Solutions. All rights reserved.</p>
            <p style="margin: 0;">Dhaka, Bangladesh • <a href="https://merxodev.com" style="color: #38bdf8; text-decoration: none;">merxodev.com</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"MerxoDev Solutions" <${process.env.GMAIL_USER}>`,
      to: emailTrimmed,
      subject: `${code} is your MerxoDev password reset verification code`,
      html: emailHtml,
      text: `Hello ${recipientName},\n\nYour MerxoDev password reset code is: ${code}\n\nThis code will expire in 10 minutes.\n\nIf you did not request this, please ignore this email.`,
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
