import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis;

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
  return new PrismaClient({ adapter });
}

// Force recreation of PrismaClient if cached instance in dev server is stale
const SCHEMA_VERSION = "2026-09-17-v4";

const prisma =
  globalForPrisma.prisma &&
  globalForPrisma.prisma._schemaVersion === SCHEMA_VERSION &&
  Boolean(globalForPrisma.prisma.passwordResetToken) &&
  Boolean(globalForPrisma.prisma.twoFactorToken)
    ? globalForPrisma.prisma
    : (() => {
        const client = createPrismaClient();
        client._schemaVersion = SCHEMA_VERSION;
        return client;
      })();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;