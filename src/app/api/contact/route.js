import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import emailTemplate from '@/lib/templates/emailTemplate';
import autoReplyTemplate from '@/lib/templates/autoReplyTemplate';

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
    const adminEmail = process.env.ADMIN_INBOX_EMAIL || process.env.GMAIL_USER || 'merxodevsolutions@gmail.com';

    // Plain text fallbacks
    const adminPlainText = `New Project Inquiry:
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Service: ${service || 'General Inquiry'}
Budget: ${budget || 'Not specified'}
Message:
${message}
Received: ${now.toLocaleString()}`;

    const clientPlainText = `Hi ${name},

Thank you for reaching out to MerxoDev Solutions! We have successfully received your project inquiry.

Summary of your inquiry:
- Service: ${service || 'General Inquiry'}
- Budget: ${budget || 'Not specified'}
- Message: ${message}

Our lead engineering team will review your requirements and get back to you within 2–12 hours.

Best regards,
The MerxoDev Solutions Team
Website: https://merxodevsolutions.pro.bd
Phone: +880 1313-334279
Email: merxodevsolutions@gmail.com`;

    const adminHtml = emailTemplate({
      name,
      email,
      phone,
      service,
      budget,
      message,
      createdAt: now,
    });

    const clientHtml = autoReplyTemplate({
      name,
      email,
      service,
      budget,
      message,
    });

    // ── Method 1: Use Resend if RESEND_API_KEY is available ──
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromSender = process.env.RESEND_FROM_EMAIL || 'MerxoDev Solutions <onboarding@resend.dev>';

      // 1. Send Admin Notification Email
      await resend.emails.send({
        from: fromSender,
        to: adminEmail,
        replyTo: email,
        subject: `New Project Inquiry: ${name} — ${service || 'General Inquiry'}`,
        text: adminPlainText,
        html: adminHtml,
      });

      // 2. Send Client Auto-Reply Email
      await resend.emails.send({
        from: fromSender,
        to: email,
        replyTo: adminEmail,
        subject: `We received your inquiry, ${name} | MerxoDev Solutions`,
        text: clientPlainText,
        html: clientHtml,
      });

      return Response.json({ success: true, provider: 'resend' });
    }

    // ── Method 2: Fallback to Gmail SMTP via Nodemailer ──
    if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      // 1. Send Admin Notification Email
      await transporter.sendMail({
        from: `"MerxoDev Solutions" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        replyTo: email,
        subject: `New Project Inquiry: ${name} — ${service || 'General Inquiry'}`,
        text: adminPlainText,
        html: adminHtml,
        headers: {
          'X-Priority': '3',
          'X-MSMail-Priority': 'Normal',
          Importance: 'Normal',
        },
      });

      // 2. Send Client Auto-Reply Email
      await transporter.sendMail({
        from: `"MerxoDev Solutions" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: `We received your inquiry, ${name} | MerxoDev Solutions`,
        text: clientPlainText,
        html: clientHtml,
        headers: {
          'X-Priority': '3',
          'X-MSMail-Priority': 'Normal',
          Importance: 'Normal',
        },
      });

      return Response.json({ success: true, provider: 'nodemailer' });
    }

    return Response.json(
      { error: 'Email service credentials not configured' },
      { status: 500 },
    );
  } catch (error) {
    console.error('Contact email error:', error);
    return Response.json(
      { error: 'Failed to send message' },
      { status: 500 },
    );
  }
}
