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

// In dev, if PrismaClient in memory was instantiated before newly generated models (e.g. teamMember), recreate it
const prisma =
  globalForPrisma.prisma && globalForPrisma.prisma.teamMember
    ? globalForPrisma.prisma
    : createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;