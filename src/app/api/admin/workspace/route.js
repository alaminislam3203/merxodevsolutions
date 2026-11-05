import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { ensureWorkspaceTables, logActivity } from "@/lib/workspaceStore";
import { sendBrandEmail } from "@/lib/templates/brandEmailLayout";
import {
  taskAssignedTemplate,
  projectMilestoneUpdateTemplate,
  invoiceReceiptTemplate,
  clientReviewCompletedTemplate,
} from "@/lib/templates/agencyEmailTemplates";

export const dynamic = "force-dynamic";

export async function GET() {
  const { authorized, session, isAdmin, response } = await requireAdmin({
    allowTeamMember: true,
  });
  if (!authorized) return response;

  try {
    await ensureWorkspaceTables();
    const userEmail = String(session?.user?.email || "").toLowerCase().trim();

    // 1. Load Activity Logs
    const activities = await prisma.$queryRaw`
      SELECT * FROM "ActivityLog"
      ORDER BY "createdAt" DESC
      LIMIT 80
    `;

    // 2. Load Team Tasks
    const allTasks = await prisma.$queryRaw`
      SELECT * FROM "TeamTask"
      ORDER BY
        CASE "status"
          WHEN 'IN_PROGRESS' THEN 1
          WHEN 'TODO' THEN 2
          ELSE 3
        END,
        "createdAt" DESC
    `;

    const tasks = isAdmin
      ? allTasks || []
      : (allTasks || []).filter(
          (t) =>
            String(t.assignedToEmail || "").toLowerCase() === userEmail ||
            String(t.assignedToEmail || "").toLowerCase() === "all"
        );

    // 3. Load Client Leads / Project Tracker
    const rawLeads = await prisma.$queryRaw`
      SELECT * FROM "ClientLead"
      ORDER BY "updatedAt" DESC
    `;

    const leads = (rawLeads || []).map((l) => {
      let milestones = { uiDesign: 100, frontend: 40, backend: 20, deployment: 0 };
      try {
        milestones =
          typeof l.milestones === "string"
            ? JSON.parse(l.milestones)
            : l.milestones || milestones;
      } catch {}
      return { ...l, milestones };
    });

    // 4. Load Team Members / Staff list for task & lead assignment dropdowns
    const staffUsers = await prisma.user.findMany({
      where: {
        role: { in: ["ADMIN", "TEAM_MEMBER"] },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({
      activities: activities || [],
      tasks,
      leads,
      staffUsers: staffUsers || [],
    });
  } catch (error) {
    console.error("GET /api/admin/workspace error:", error);
    return NextResponse.json(
      { error: "Failed to load workspace data" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const { authorized, session, isAdmin, response } = await requireAdmin({
    allowTeamMember: true,
  });
  if (!authorized) return response;

  try {
    await ensureWorkspaceTables();
    const body = await request.json();
    const { action } = body || {};

    // ─── 1. CREATE TASK (Admin Only) ─────────────────────────────────────────
    if (action === "create_task") {
      if (!isAdmin) {
        return NextResponse.json(
          { error: "Only Admin can assign new tasks" },
          { status: 403 }
        );
      }
      const title = String(body.title || "").trim();
      const description = String(body.description || "").trim();
      const assignedToEmail = String(body.assignedToEmail || "all")
        .toLowerCase()
        .trim();
      const assignedToName = String(
        body.assignedToName || "All Team Members"
      ).trim();
      const priority = String(body.priority || "MEDIUM").toUpperCase();
      const dueDate = String(body.dueDate || "").trim() || null;

      if (!title) {
        return NextResponse.json(
          { error: "Task title is required" },
          { status: 400 }
        );
      }

      const id =
        "task_" +
        Date.now().toString(36) +
        "_" +
        Math.random().toString(36).slice(2, 6);
      const createdBy = session?.user?.name || session?.user?.email || "Admin";

      await prisma.$executeRaw`
        INSERT INTO "TeamTask" (
          "id", "title", "description", "assignedToEmail", "assignedToName", "priority", "status", "dueDate", "createdBy", "createdAt", "updatedAt"
        )
        VALUES (
          ${id}, ${title}, ${description}, ${assignedToEmail}, ${assignedToName}, ${priority}, 'TODO', ${dueDate}, ${createdBy}, NOW(), NOW()
        )
      `;

      await logActivity({
        user: session?.user,
        action: "TASK_ASSIGNED",
        target: assignedToName,
        details: `Assigned task "${title}" to ${assignedToName}`,
      });

      // Send Task Assigned Email to the team member (if specific email)
      if (assignedToEmail && assignedToEmail !== "all" && assignedToEmail.includes("@")) {
        try {
          await sendBrandEmail({
            to: assignedToEmail,
            subject: `New Task Assigned: ${title} (${priority}) — MerxoDev Workspace`,
            buildHtml: (useCid) =>
              taskAssignedTemplate({
                assignedToName,
                title,
                description,
                priority,
                dueDate,
                assignedBy: createdBy,
                useCid,
              }),
            text: `Hi ${assignedToName}, a new task "${title}" (${priority}) has been assigned to you by ${createdBy}.`,
          });
        } catch (mailErr) {
          console.warn("Task assigned email warning:", mailErr.message);
        }
      }

      return NextResponse.json({ success: true, id });
    }

    // ─── 2. UPDATE TASK STATUS (Admin or Assigned Team Member) ───────────────
    if (action === "update_task_status") {
      const id = String(body.id || "").trim();
      const status = String(body.status || "TODO").toUpperCase();
      if (!id) {
        return NextResponse.json({ error: "Task ID required" }, { status: 400 });
      }

      const rows = await prisma.$queryRaw`
        SELECT * FROM "TeamTask" WHERE "id" = ${id} LIMIT 1
      `;
      const task = rows?.[0];
      if (!task) {
        return NextResponse.json({ error: "Task not found" }, { status: 404 });
      }

      await prisma.$executeRaw`
        UPDATE "TeamTask"
        SET "status" = ${status}, "updatedAt" = NOW()
        WHERE "id" = ${id}
      `;

      await logActivity({
        user: session?.user,
        action: "TASK_STATUS_CHANGED",
        target: task.title,
        details: `Marked task "${task.title}" as ${status}`,
      });

      return NextResponse.json({ success: true });
    }

    // ─── 3. DELETE TASK (Admin Only) ─────────────────────────────────────────
    if (action === "delete_task") {
      if (!isAdmin) {
        return NextResponse.json({ error: "Admin only" }, { status: 403 });
      }
      const id = String(body.id || "").trim();
      await prisma.$executeRaw`
        DELETE FROM "TeamTask" WHERE "id" = ${id}
      `;
      return NextResponse.json({ success: true });
    }

    // ─── 4. CREATE CLIENT LEAD / PROJECT TRACKER ─────────────────────────────
    if (action === "create_lead") {
      const clientName = String(body.clientName || "").trim();
      const clientEmail = String(body.clientEmail || "")
        .toLowerCase()
        .trim();
      const clientPhone = String(body.clientPhone || "").trim() || null;
      const company = String(body.company || "").trim() || null;
      const projectTitle = String(body.projectTitle || "").trim();
      const serviceType = String(
        body.serviceType || "Custom Web Application"
      ).trim();
      const budget = String(body.budget || "").trim() || null;
      const notes = String(body.notes || "").trim() || null;
      const status = String(body.status || "NEW").toUpperCase();
      const assignedTo = String(body.assignedTo || "").trim() || null;
      const progress = Math.max(0, Math.min(100, Number(body.progress ?? 15)));
      const milestones = JSON.stringify(
        body.milestones || {
          uiDesign: 100,
          frontend: 40,
          backend: 20,
          deployment: 0,
        }
      );
      const liveDemoUrl = String(body.liveDemoUrl || "").trim() || null;
      const invoiceAmount = String(body.invoiceAmount || "").trim() || null;
      const invoiceStatus = String(body.invoiceStatus || "UNPAID").toUpperCase();

      if (!clientName || !clientEmail || !projectTitle) {
        return NextResponse.json(
          { error: "Client name, email, and project title are required" },
          { status: 400 }
        );
      }

      const id =
        "MD-" +
        Math.floor(1000 + Math.random() * 9000) +
        "-" +
        Date.now().toString(36).slice(-3).toUpperCase();

      await prisma.$executeRaw`
        INSERT INTO "ClientLead" (
          "id", "clientName", "clientEmail", "clientPhone", "company",
          "projectTitle", "serviceType", "budget", "notes", "status",
          "assignedTo", "progress", "milestones", "liveDemoUrl",
          "invoiceAmount", "invoiceStatus", "createdAt", "updatedAt"
        )
        VALUES (
          ${id}, ${clientName}, ${clientEmail}, ${clientPhone}, ${company},
          ${projectTitle}, ${serviceType}, ${budget}, ${notes}, ${status},
          ${assignedTo}, ${progress}, ${milestones}::jsonb, ${liveDemoUrl},
          ${invoiceAmount}, ${invoiceStatus}, NOW(), NOW()
        )
      `;

      await logActivity({
        user: session?.user,
        action: "LEAD_CREATED",
        target: `${clientName} (${projectTitle})`,
        details: `Created client project/lead #${id} for ${clientEmail}`,
      });

      return NextResponse.json({ success: true, id });
    }

    // ─── 5. UPDATE CLIENT LEAD / PROJECT PROGRESS / INVOICE ──────────────────
    if (action === "update_lead") {
      const id = String(body.id || "").trim();
      if (!id) {
        return NextResponse.json({ error: "Lead ID required" }, { status: 400 });
      }

      const rows = await prisma.$queryRaw`
        SELECT * FROM "ClientLead" WHERE "id" = ${id} LIMIT 1
      `;
      const existing = rows?.[0];
      if (!existing) {
        return NextResponse.json({ error: "Lead not found" }, { status: 404 });
      }

      const clientName =
        body.clientName !== undefined
          ? String(body.clientName).trim()
          : existing.clientName;
      const clientEmail =
        body.clientEmail !== undefined
          ? String(body.clientEmail).toLowerCase().trim()
          : existing.clientEmail;
      const clientPhone =
        body.clientPhone !== undefined
          ? String(body.clientPhone || "").trim() || null
          : existing.clientPhone;
      const projectTitle =
        body.projectTitle !== undefined
          ? String(body.projectTitle).trim()
          : existing.projectTitle;
      const serviceType =
        body.serviceType !== undefined
          ? String(body.serviceType).trim()
          : existing.serviceType;
      const budget =
        body.budget !== undefined
          ? String(body.budget || "").trim() || null
          : existing.budget;
      const notes =
        body.notes !== undefined
          ? String(body.notes || "").trim() || null
          : existing.notes;
      const status =
        body.status !== undefined
          ? String(body.status).toUpperCase()
          : existing.status;
      const assignedTo =
        body.assignedTo !== undefined
          ? String(body.assignedTo || "").trim() || null
          : existing.assignedTo;
      const progress =
        body.progress !== undefined
          ? Math.max(0, Math.min(100, Number(body.progress)))
          : Number(existing.progress || 0);
      const milestones = JSON.stringify(
        body.milestones !== undefined ? body.milestones : existing.milestones || {}
      );
      const liveDemoUrl =
        body.liveDemoUrl !== undefined
          ? String(body.liveDemoUrl || "").trim() || null
          : existing.liveDemoUrl;
      const invoiceAmount =
        body.invoiceAmount !== undefined
          ? String(body.invoiceAmount || "").trim() || null
          : existing.invoiceAmount;
      const invoiceStatus =
        body.invoiceStatus !== undefined
          ? String(body.invoiceStatus).toUpperCase()
          : existing.invoiceStatus;

      await prisma.$executeRaw`
        UPDATE "ClientLead"
        SET
          "clientName" = ${clientName},
          "clientEmail" = ${clientEmail},
          "clientPhone" = ${clientPhone},
          "projectTitle" = ${projectTitle},
          "serviceType" = ${serviceType},
          "budget" = ${budget},
          "notes" = ${notes},
          "status" = ${status},
          "assignedTo" = ${assignedTo},
          "progress" = ${progress},
          "milestones" = ${milestones}::jsonb,
          "liveDemoUrl" = ${liveDemoUrl},
          "invoiceAmount" = ${invoiceAmount},
          "invoiceStatus" = ${invoiceStatus},
          "updatedAt" = NOW()
        WHERE "id" = ${id}
      `;

      await logActivity({
        user: session?.user,
        action: "LEAD_UPDATED",
        target: `${clientName} (${projectTitle})`,
        details: `Updated #${id}: Status=${status}, Progress=${progress}%, Invoice=${invoiceStatus}`,
      });

      // Automatically send Client Emails when Progress, Completion, or Invoice Status changes
      if (clientEmail && clientEmail.includes("@")) {
        let parsedMilestones = {};
        try {
          parsedMilestones = JSON.parse(milestones);
        } catch {}

        // A. Project marked COMPLETED -> Send Completion + Review Request Email
        if (status === "COMPLETED" && existing.status !== "COMPLETED") {
          try {
            await sendBrandEmail({
              to: clientEmail,
              subject: `Your Project "${projectTitle}" (#${id}) is 100% Completed! 🎉`,
              buildHtml: (useCid) =>
                clientReviewCompletedTemplate({
                  clientName,
                  projectTitle,
                  projectId: id,
                  liveDemoUrl,
                  useCid,
                }),
              text: `Dear ${clientName}, your project "${projectTitle}" (#${id}) is now 100% completed!`,
            });
          } catch (err) {
            console.warn("Project completion email warning:", err.message);
          }
        }
        // B. Progress or Status updated -> Send Milestone Progress Update Email
        else if (
          Number(progress) !== Number(existing.progress || 0) ||
          status !== existing.status ||
          body.milestones !== undefined
        ) {
          try {
            await sendBrandEmail({
              to: clientEmail,
              subject: `Project Progress Update (${progress}%): ${projectTitle} (#${id})`,
              buildHtml: (useCid) =>
                projectMilestoneUpdateTemplate({
                  clientName,
                  projectId: id,
                  projectTitle,
                  serviceType,
                  status,
                  progress,
                  milestones: parsedMilestones,
                  liveDemoUrl,
                  notes,
                  useCid,
                }),
              text: `Hello ${clientName}, your project "${projectTitle}" (#${id}) is now at ${progress}% completion (${status}).`,
            });
          } catch (err) {
            console.warn("Milestone update email warning:", err.message);
          }
        }

        // C. Invoice Status or Amount changed -> Send Official Invoice / Payment Receipt Email
        if (
          invoiceStatus !== existing.invoiceStatus ||
          (invoiceAmount && invoiceAmount !== existing.invoiceAmount)
        ) {
          try {
            await sendBrandEmail({
              to: clientEmail,
              subject:
                invoiceStatus === "PAID"
                  ? `Official Payment Receipt Confirmed (#${id}) — MerxoDev Solutions`
                  : `Invoice Statement Updated (#${id}) — MerxoDev Solutions`,
              buildHtml: (useCid) =>
                invoiceReceiptTemplate({
                  clientName,
                  projectId: id,
                  projectTitle,
                  serviceType,
                  invoiceAmount,
                  invoiceStatus,
                  budget,
                  useCid,
                }),
              text: `Dear ${clientName}, invoice #${id} for "${projectTitle}" is now marked as ${invoiceStatus}.`,
            });
          } catch (err) {
            console.warn("Invoice email warning:", err.message);
          }
        }
      }

      return NextResponse.json({ success: true });
    }

    // ─── 6. DELETE LEAD (Admin Only) ─────────────────────────────────────────
    if (action === "delete_lead") {
      if (!isAdmin) {
        return NextResponse.json({ error: "Admin only" }, { status: 403 });
      }
      const id = String(body.id || "").trim();
      await prisma.$executeRaw`
        DELETE FROM "ClientLead" WHERE "id" = ${id}
      `;
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("POST /api/admin/workspace error:", error);
    return NextResponse.json(
      { error: "Failed to process workspace action" },
      { status: 500 }
    );
  }
}

