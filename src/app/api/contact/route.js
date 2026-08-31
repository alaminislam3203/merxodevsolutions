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

    // 1. Send Notification Email to Admin
    await transporter.sendMail({
      from: `"MerxoDevSolutions" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `✦ New Inquiry: ${name} — ${service || 'General Inquiry'}`,
      html: emailTemplate({
        name,
        email,
        phone,
        service,
        budget,
        message,
        createdAt: now,
      }),
    });

    // 2. Send Auto-Reply Email to Client
    await transporter.sendMail({
      from: `"MerxoDevSolutions" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `✦ We received your inquiry, ${name}!`,
      html: autoReplyTemplate({
        name,
        email,
        service,
        budget,
        message,
      }),
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
