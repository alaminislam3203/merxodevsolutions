import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_lm3TwS0RyCKD@ep-ancient-thunder-ayouhmfa-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  },
});

