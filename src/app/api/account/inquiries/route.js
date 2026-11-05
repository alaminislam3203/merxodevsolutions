import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { ensureWorkspaceTables } from "@/lib/workspaceStore";
import autoReplyTemplate from "@/lib/templates/autoReplyTemplate";
import { getBrandEmailAttachments } from "@/lib/templates/brandEmailLayout";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureWorkspaceTables();
    const email = String(session.user.email).toLowerCase().trim();

    const rows = await prisma.$queryRaw`
      SELECT * FROM "ClientLead"
      WHERE LOWER("clientEmail") = ${email}
      ORDER BY "updatedAt" DESC
    `;

    const inquiries = (rows || []).map((l) => {
      let milestones = { uiDesign: 100, frontend: 40, backend: 20, deployment: 0 };
      try {
        milestones =
          typeof l.milestones === "string"
            ? JSON.parse(l.milestones)
            : l.milestones || milestones;
      } catch {}
      return { ...l, milestones };
    });

    return NextResponse.json({ inquiries });
  } catch (error) {
    console.error("GET /api/account/inquiries error:", error);
    return NextResponse.json({ inquiries: [] });
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureWorkspaceTables();
    const body = await request.json();
    const projectTitle = String(body.projectTitle || "").trim();
    const serviceType = String(
      body.serviceType || "Custom Web Application"
    ).trim();
    const budget = String(body.budget || "").trim() || null;
    const clientPhone = String(body.clientPhone || "").trim() || null;
    const notes = String(body.notes || "").trim() || null;

    if (!projectTitle) {
      return NextResponse.json(
        { error: "Project title is required" },
        { status: 400 }
      );
    }

    const id =
      "MD-" +
      Math.floor(1000 + Math.random() * 9000) +
      "-" +
      Date.now().toString(36).slice(-3).toUpperCase();

    const clientName = session.user.name || session.user.email.split("@")[0];
    const clientEmail = String(session.user.email).toLowerCase().trim();
    const defaultMilestones = JSON.stringify({
      uiDesign: 25,
      frontend: 0,
      backend: 0,
      deployment: 0,
    });

    await prisma.$executeRaw`
      INSERT INTO "ClientLead" (
        "id", "clientName", "clientEmail", "clientPhone",
        "projectTitle", "serviceType", "budget", "notes",
        "status", "progress", "milestones", "invoiceStatus",
        "createdAt", "updatedAt"
      )
      VALUES (
        ${id}, ${clientName}, ${clientEmail}, ${clientPhone},
        ${projectTitle}, ${serviceType}, ${budget}, ${notes},
        'NEW', 10, ${defaultMilestones}::jsonb, 'UNPAID',
        NOW(), NOW()
      )
    `;

    // Send White-BG Auto-Reply Confirmation Email with logo.png & favicon.png to the client
    if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
          },
        });

        const htmlCid = autoReplyTemplate({
          name: clientName,
          email: clientEmail,
          phone: clientPhone,
          service: `${projectTitle} (${serviceType})`,
          budget: budget || "Flexible / To be discussed",
          message: notes || `Project inquiry submitted for "${projectTitle}" via Client Portal.`,
          createdAt: new Date(),
          useCid: true,
        });

        await transporter.sendMail({
          from: `"MerxoDev Solutions" <${process.env.GMAIL_USER}>`,
          to: clientEmail,
          subject: `We've Received Your Project Inquiry (${id}) — MerxoDev Solutions`,
          html: htmlCid,
          attachments: getBrandEmailAttachments(),
        });
      } catch (mailErr) {
        console.warn("Account inquiry auto-reply email warning:", mailErr.message);
      }
    }

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("POST /api/account/inquiries error:", error);
    return NextResponse.json(
      { error: "Failed to submit project inquiry" },
      { status: 500 }
    );
  }
}

