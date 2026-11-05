import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import emailTemplate from '@/lib/templates/emailTemplate';
import { getBrandEmailAttachments } from '@/lib/templates/brandEmailLayout';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

function createNodemailerTransporter() {
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

/**
 * Robust email dispatcher:
 * Tries Resend first, if Resend is unavailable or fails (e.g. unverified test domain),
 * smoothly falls back to Gmail SMTP so admin always receives inquiry emails.
 */
async function dispatchEmail({ to, subject, htmlCid, htmlPublic, text, replyTo }) {
  let resendSuccess = false;

  // 1. Attempt Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromSender = process.env.RESEND_FROM_EMAIL || 'MerxoDev Solutions <onboarding@resend.dev>';
      const res = await resend.emails.send({
        from: fromSender,
        to,
        replyTo,
        subject,
        text,
        html: htmlPublic || htmlCid,
      });

      if (!res.error) {
        resendSuccess = true;
        return { success: true, provider: 'resend' };
      } else {
        console.warn('Resend send returned error, falling back to Gmail SMTP:', res.error);
      }
    } catch (resendErr) {
      console.warn('Resend exception, falling back to Gmail SMTP:', resendErr.message);
    }
  }

  // 2. Fallback to Gmail SMTP via Nodemailer (with inline logo.png & favicon.png attachments)
  const transporter = createNodemailerTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"MerxoDev Solutions" <${process.env.GMAIL_USER}>`,
        to,
        replyTo: replyTo || process.env.GMAIL_USER,
        subject,
        text,
        html: htmlCid,
        attachments: getBrandEmailAttachments(),
        headers: {
          'X-Priority': '3',
          'X-MSMail-Priority': 'Normal',
          Importance: 'Normal',
        },
      });
      return { success: true, provider: 'nodemailer' };
    } catch (smtpErr) {
      console.error('Nodemailer SMTP error:', smtpErr.message);
      throw smtpErr;
    }
  }

  if (!resendSuccess) {
    throw new Error('No working email provider configured (both Resend and Gmail SMTP failed/missing)');
  }
}

export async function POST(req) {
  try {
    // 1. IP Rate Limiting (Max 4 inquiries per minute per IP)
    const clientIp = getClientIp(req);
    const rateCheck = checkRateLimit(`contact:${clientIp}`, { limit: 4, windowMs: 60 * 1000 });
    if (!rateCheck.success) {
      return Response.json(
        { error: 'Too many inquiries. Please wait a minute before trying again.' },
        { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfter) } }
      );
    }

    const body = await req.json();
    const { name, email, phone, service, budget, message, honeypot } = body;

    // 2. Honeypot bot protection (if filled, bot triggered)
    if (honeypot) {
      return Response.json({ success: true, message: 'Inquiry received' });
    }

    // 3. Strict Input Validation
    if (!name || !email || !message) {
      return Response.json(
        { error: 'Required fields missing' },
        { status: 400 },
      );
    }

    if (typeof name !== 'string' || name.trim().length > 100) {
      return Response.json({ error: 'Name is too long or invalid' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== 'string' || email.length > 120 || !emailRegex.test(email)) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 });
    }

    if (typeof message !== 'string' || message.trim().length > 3000) {
      return Response.json({ error: 'Message exceeds allowed character limit' }, { status: 400 });
    }

    const now = new Date();
    const adminInbox = process.env.ADMIN_INBOX_EMAIL || process.env.GMAIL_USER || 'merxodevsolutions@gmail.com';

    // Plain text fallback for admin
    const adminPlainText = `New Project Inquiry:
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Service: ${service || 'General Inquiry'}
Budget: ${budget || 'Not specified'}
Message:
${message}
Received: ${now.toLocaleString()}`;

    const adminHtmlCid = emailTemplate({
      name,
      email,
      phone,
      service,
      budget,
      message,
      createdAt: now,
      useCid: true,
    });

    const adminHtmlPublic = emailTemplate({
      name,
      email,
      phone,
      service,
      budget,
      message,
      createdAt: now,
      useCid: false,
    });

    // Send Admin Notification email only (no auto-reply sent to client)
    const adminResult = await dispatchEmail({
      to: adminInbox,
      subject: `New Project Inquiry: ${name} — ${service || 'General Inquiry'}`,
      htmlCid: adminHtmlCid,
      htmlPublic: adminHtmlPublic,
      text: adminPlainText,
      replyTo: email,
    });

    return Response.json({
      success: true,
      message: 'Inquiry successfully delivered to admin',
      provider: adminResult?.provider || 'default',
    });
  } catch (error) {
    console.error('Contact route unhandled error:', error);
    return Response.json(
      { error: 'Failed to process inquiry' },
      { status: 500 },
    );
  }
}
