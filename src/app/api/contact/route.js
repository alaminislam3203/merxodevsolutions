import nodemailer from 'nodemailer';
import emailTemplate from '@/lib/templates/emailTemplate';
import autoReplyTemplate from '@/lib/templates/autoReplyTemplate';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

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

    // Plain text fallbacks (Crucial for preventing Spam flags)
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

    // 1. Send Notification Email to Admin
    await transporter.sendMail({
      from: `"MerxoDev Solutions" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `New Project Inquiry: ${name} — ${service || 'General Inquiry'}`,
      text: adminPlainText,
      html: emailTemplate({
        name,
        email,
        phone,
        service,
        budget,
        message,
        createdAt: now,
      }),
      headers: {
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        Importance: 'Normal',
      },
    });

    // 2. Send Auto-Reply Email to Client
    await transporter.sendMail({
      from: `"MerxoDev Solutions" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `We received your inquiry, ${name} | MerxoDev Solutions`,
      text: clientPlainText,
      html: autoReplyTemplate({
        name,
        email,
        service,
        budget,
        message,
      }),
      headers: {
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        Importance: 'Normal',
      },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Contact email error:', error);
    return Response.json(
      { error: 'Failed to send message' },
      { status: 500 },
    );
  }
}
