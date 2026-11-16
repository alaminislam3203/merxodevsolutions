import { defineConfig } from "prisma/config";

const rawUrl =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_lm3TwS0RyCKD@ep-ancient-thunder-ayouhmfa-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=verify-full&uselibpqcompat=true";

// Normalize sslmode to verify-full, enable uselibpqcompat, and strip channel_binding to silence pg v8/v9 deprecation warning
let normalizedUrl = rawUrl
  .replace("sslmode=require", "sslmode=verify-full")
  .replace(/[?&]channel_binding=[^&]+/, "");

if (!normalizedUrl.includes("uselibpqcompat=true")) {
  normalizedUrl += (normalizedUrl.includes("?") ? "&" : "?") + "uselibpqcompat=true";
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: normalizedUrl,
  },
});
