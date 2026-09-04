import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import emailTemplate from '@/lib/templates/emailTemplate';

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
async function dispatchEmail({ to, subject, html, text, replyTo }) {
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
        html,
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

  // 2. Fallback to Gmail SMTP via Nodemailer
  const transporter = createNodemailerTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"MerxoDev Solutions" <${process.env.GMAIL_USER}>`,
        to,
        replyTo: replyTo || process.env.GMAIL_USER,
        subject,
        text,
        html,
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
    const { name, email, phone, service, budget, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json(
        { error: 'Required fields missing' },
        { status: 400 },
      );
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

    const adminHtml = emailTemplate({
      name,
      email,
      phone,
      service,
      budget,
      message,
      createdAt: now,
    });

    // Send Admin Notification email only (no auto-reply sent to client)
    const adminResult = await dispatchEmail({
      to: adminInbox,
      subject: `New Project Inquiry: ${name} — ${service || 'General Inquiry'}`,
      html: adminHtml,
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
