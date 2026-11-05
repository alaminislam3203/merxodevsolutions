import prisma from "@/lib/prisma";

let workspaceTablesInitialized = false;

export async function ensureWorkspaceTables() {
  if (workspaceTablesInitialized) return;
  try {
    // 1. Team & Admin Activity Audit Log Table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "ActivityLog" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "actorEmail" TEXT NOT NULL,
        "actorName" TEXT NOT NULL,
        "actorRole" TEXT NOT NULL DEFAULT 'ADMIN',
        "action" TEXT NOT NULL,
        "target" TEXT,
        "details" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "ActivityLog_createdAt_idx" ON "ActivityLog"("createdAt" DESC);
    `);

    // 2. Team Task Board Table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "TeamTask" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "title" TEXT NOT NULL,
        "description" TEXT,
        "assignedToEmail" TEXT NOT NULL,
        "assignedToName" TEXT NOT NULL,
        "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
        "status" TEXT NOT NULL DEFAULT 'TODO',
        "dueDate" TEXT,
        "createdBy" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. CRM Leads & Client Project Tracker / Invoice Table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "ClientLead" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "clientName" TEXT NOT NULL,
        "clientEmail" TEXT NOT NULL,
        "clientPhone" TEXT,
        "company" TEXT,
        "projectTitle" TEXT NOT NULL,
        "serviceType" TEXT NOT NULL DEFAULT 'Custom Web Application',
        "budget" TEXT,
        "notes" TEXT,
        "status" TEXT NOT NULL DEFAULT 'NEW',
        "assignedTo" TEXT,
        "progress" INTEGER NOT NULL DEFAULT 15,
        "milestones" JSONB NOT NULL DEFAULT '{"uiDesign": 100, "frontend": 40, "backend": 20, "deployment": 0}',
        "liveDemoUrl" TEXT,
        "invoiceAmount" TEXT,
        "invoiceStatus" TEXT NOT NULL DEFAULT 'UNPAID',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "ClientLead_clientEmail_idx" ON "ClientLead"("clientEmail");
    `);

    workspaceTablesInitialized = true;
  } catch (err) {
    console.error("Failed to initialize workspace tables:", err?.message);
  }
}

export async function logActivity({ user, action, target = "", details = "" }) {
  try {
    await ensureWorkspaceTables();
    const id = "act_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7);
    const actorEmail = String(user?.email || "admin@merxodev.com").toLowerCase();
    const actorName = String(user?.name || actorEmail.split("@")[0] || "Admin");
    const actorRole = String(user?.role || "ADMIN");

    await prisma.$executeRaw`
      INSERT INTO "ActivityLog" ("id", "actorEmail", "actorName", "actorRole", "action", "target", "details", "createdAt")
      VALUES (${id}, ${actorEmail}, ${actorName}, ${actorRole}, ${action}, ${target}, ${details}, NOW())
    `;
  } catch (err) {
    console.warn("ActivityLog insert skipped:", err?.message);
  }
}
