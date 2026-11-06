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

    // 4. SEO Tech Blog & Engineering Case Studies Table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "BlogPost" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "slug" TEXT NOT NULL UNIQUE,
        "title" TEXT NOT NULL,
        "excerpt" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "category" TEXT NOT NULL DEFAULT 'Web Engineering',
        "coverImage" TEXT,
        "authorName" TEXT NOT NULL DEFAULT 'MerxoDev Engineering',
        "authorRole" TEXT NOT NULL DEFAULT 'Core Team',
        "readTime" TEXT NOT NULL DEFAULT '5 min read',
        "tags" TEXT,
        "isPublished" BOOLEAN NOT NULL DEFAULT true,
        "views" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed initial SEO blog articles if none exist yet
    try {
      const countRows = await prisma.$queryRaw`SELECT COUNT(*)::int AS cnt FROM "BlogPost"`;
      const cnt = Number(countRows?.[0]?.cnt || 0);
      if (cnt === 0) {
        const defaultPosts = [
          {
            id: "blog_nextjs_seo_bd",
            slug: "website-development-cost-in-bangladesh-2026-guide",
            title: "Website Development Cost in Bangladesh (2026 Complete Pricing Guide)",
            excerpt:
              "Discover the exact cost of building a landing page, corporate website, e-commerce store with bKash/SSLCommerz, or custom SaaS web application in Bangladesh.",
            category: "Pricing & Strategy",
            readTime: "6 min read",
            tags: "Website Cost BD, E-Commerce Price, Next.js Bangladesh, Web Development",
            content: `Building a modern, high-converting website in Bangladesh no longer requires months of waiting or inflated agency retainers. At MerxoDev Solutions, we engineer custom Next.js 16 and React 19 digital platforms designed for speed, SEO dominance, and instant lead conversion.\n\n### 1. Starter Landing Page & Portfolio (BDT 1,000 – 1,500)\nIdeal for startups, personal brands, consultants, and promotional campaigns. Includes custom responsive UI/UX, blazing-fast Core Web Vitals, WhatsApp integration, and technical SEO setup.\n\n### 2. Professional Dynamic Business Website (BDT 2,000 – 3,000)\nDesigned for growing companies, agencies, clinics, and educational institutions. Features multi-page architecture, custom Admin Panel (CMS), PostgreSQL database integration, and interactive lead forms.\n\n### 3. Full-Stack E-Commerce & SaaS Web Application (BDT 3,500 – 4,000+)\nEngineered for online stores and software startups. Includes product catalog, inventory automation, bKash/Nagad/SSLCommerz & Stripe payment gateways, customer accounts, and real-time order tracking.`,
          },
          {
            id: "blog_bkash_sslcommerz_nextjs",
            slug: "integrate-bkash-nagad-sslcommerz-payment-gateway-nextjs",
            title: "How to Integrate bKash, Nagad & SSLCommerz Payment Gateways in Next.js",
            excerpt:
              "A technical walkthrough on tokenized checkout, server-side webhook verification, and automated PDF invoice generation for Bangladeshi e-commerce stores.",
            category: "Payment Gateways",
            readTime: "7 min read",
            tags: "bKash API, SSLCommerz, Nagad, E-Commerce Bangladesh, Next.js",
            content: `Accepting local mobile banking payments (bKash, Nagad, Rocket, Upay) alongside international cards (Visa, Mastercard, Stripe) is essential for scaling any e-commerce platform in Bangladesh.\n\n### Key Architecture Principles\n1. **Tokenized Grant & Execute Flow:** Never expose merchant secrets on the client. Always generate payment tokens inside secure Next.js Server Route Handlers.\n2. **Instant IPN / Webhook Verification:** Validate every transaction signature against the gateway's verification endpoint before marking orders as PAID in PostgreSQL.\n3. **Automated Receipt & Invoice Dispatch:** Immediately trigger a white-background branded email receipt and downloadable PDF invoice to build customer trust.`,
          },
          {
            id: "blog_why_nextjs_beats_wordpress",
            slug: "why-custom-nextjs-websites-outperform-wordpress-for-seo",
            title: "Why Custom Next.js 16 Websites Outperform WordPress in Google Rankings & Speed",
            excerpt:
              "Compare Server Components, sub-second page loads, zero plugin vulnerabilities, and AI search optimization (GEO) between Next.js and legacy CMS platforms.",
            category: "Web Engineering",
            readTime: "5 min read",
            tags: "Next.js 16, Technical SEO, Core Web Vitals, WordPress Alternative",
            content: `When potential clients visit your website on a mobile network, every 100ms of delay reduces conversion rates. Traditional plugin-heavy sites suffer from bloated scripts and frequent security vulnerabilities.\n\n### The MerxoDev Engineering Advantage\n• **99+ Google PageSpeed Score:** Server-rendered React 19 components deliver instant First Contentful Paint.\n• **Enterprise Security:** Role-based access control (Admin, Team Member, Client), 2FA verification, and IP Firewall protection.\n• **AI & Search Engine Ready:** Structured JSON-LD Schema, dynamic sitemaps, and LLM context indexing ensure your brand ranks first on Google and AI search engines.`,
          },
        ];

        for (const p of defaultPosts) {
          await prisma.$executeRaw`
            INSERT INTO "BlogPost" (
              "id", "slug", "title", "excerpt", "content", "category",
              "authorName", "authorRole", "readTime", "tags", "isPublished", "createdAt", "updatedAt"
            )
            VALUES (
              ${p.id}, ${p.slug}, ${p.title}, ${p.excerpt}, ${p.content}, ${p.category},
              'MerxoDev Engineering', 'Core Team', ${p.readTime}, ${p.tags}, true, NOW(), NOW()
            )
            ON CONFLICT ("slug") DO NOTHING
          `;
        }
      }
    } catch (seedErr) {
      console.warn("BlogPost seed skipped:", seedErr?.message);
    }

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

