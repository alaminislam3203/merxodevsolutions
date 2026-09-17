import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis;

function attachFallbacks(client) {
  if (!client) return client;

  // Fallback for PasswordResetToken if cached Node.js dev process has stale Prisma Client
  if (!client.passwordResetToken) {
    client.passwordResetToken = {
      async findFirst({ where } = {}) {
        const email = where?.email ? String(where.email).toLowerCase().trim() : '';
        const code = where?.code ? String(where.code).trim() : '';
        const rows = await client.$queryRaw`
          SELECT * FROM "PasswordResetToken"
          WHERE LOWER("email") = LOWER(${email})
            AND "code" = ${code}
            AND "expiresAt" > NOW()
          ORDER BY "createdAt" DESC
          LIMIT 1
        `;
        return rows?.[0] || null;
      },
      async deleteMany({ where } = {}) {
        const email = where?.email ? String(where.email).toLowerCase().trim() : '';
        const count = await client.$executeRaw`
          DELETE FROM "PasswordResetToken"
          WHERE LOWER("email") = LOWER(${email})
        `;
        return { count };
      },
      async create({ data } = {}) {
        const id = 'rst_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
        const email = String(data?.email || '').toLowerCase().trim();
        const code = String(data?.code || '').trim();
        const expiresAt = data?.expiresAt || new Date(Date.now() + 2 * 60 * 1000);
        await client.$executeRaw`
          INSERT INTO "PasswordResetToken" ("id", "email", "code", "expiresAt", "createdAt")
          VALUES (${id}, ${email}, ${code}, ${expiresAt}, NOW())
        `;
        return { id, email, code, expiresAt };
      },
    };
  }

  // Fallback for TwoFactorToken if cached Node.js dev process has stale Prisma Client
  if (!client.twoFactorToken) {
    client.twoFactorToken = {
      async findFirst({ where } = {}) {
        const email = where?.email ? String(where.email).toLowerCase().trim() : '';
        const code = where?.code ? String(where.code).trim() : '';
        const rows = await client.$queryRaw`
          SELECT * FROM "TwoFactorToken"
          WHERE LOWER("email") = LOWER(${email})
            AND "code" = ${code}
            AND "expiresAt" > NOW()
          ORDER BY "createdAt" DESC
          LIMIT 1
        `;
        return rows?.[0] || null;
      },
      async deleteMany({ where } = {}) {
        const email = where?.email ? String(where.email).toLowerCase().trim() : '';
        const count = await client.$executeRaw`
          DELETE FROM "TwoFactorToken"
          WHERE LOWER("email") = LOWER(${email})
        `;
        return { count };
      },
      async create({ data } = {}) {
        const id = '2fa_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
        const email = String(data?.email || '').toLowerCase().trim();
        const code = String(data?.code || '').trim();
        const expiresAt = data?.expiresAt || new Date(Date.now() + 2 * 60 * 1000);
        await client.$executeRaw`
          INSERT INTO "TwoFactorToken" ("id", "email", "code", "expiresAt", "createdAt")
          VALUES (${id}, ${email}, ${code}, ${expiresAt}, NOW())
        `;
        return { id, email, code, expiresAt };
      },
    };
  }

  return client;
}

function createPrismaClient() {
  const rawUrl = process.env.DATABASE_URL || "";
  // Strip channel_binding which causes node-postgres SCRAM SASL auth failures
  const connectionString = rawUrl
    .replace(/[?&]channel_binding=[^&]+/, "")
    .replace(/\?$/, "");

  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 15000,
    idleTimeoutMillis: 30000,
    max: 10,
  });

  const adapter = new PrismaPg(pool);
  const client = new PrismaClient({ adapter });
  return attachFallbacks(client);
}

// Force recreation of PrismaClient if cached instance in dev server is stale
const SCHEMA_VERSION = "2026-09-17-v5";

let prismaInstance = globalForPrisma.prisma;
if (!prismaInstance || prismaInstance._schemaVersion !== SCHEMA_VERSION) {
  prismaInstance = createPrismaClient();
  prismaInstance._schemaVersion = SCHEMA_VERSION;
} else {
  // Always guarantee fallbacks are attached even to existing global instances
  attachFallbacks(prismaInstance);
}

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prismaInstance;
}

export default prismaInstance;