import { defineConfig } from "prisma/config";

const rawUrl =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_lm3TwS0RyCKD@ep-ancient-thunder-ayouhmfa-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=verify-full";

// Normalize sslmode to verify-full and strip channel_binding to silence pg v8/v9 deprecation warning
const normalizedUrl = rawUrl
  .replace("sslmode=require", "sslmode=verify-full")
  .replace(/[?&]channel_binding=[^&]+/, "");

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: normalizedUrl,
  },
});
