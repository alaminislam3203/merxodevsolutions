import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

const INITIAL_PROJECTS = [
  {
    slug: "merxo-mart",
    tag: "E-Commerce",
    title: "Merxo Mart",
    image: "https://res.cloudinary.com/doogtvaoh/image/upload/v1782106167/Merxo-Mart_-_Modern_E-Commerce_Platform_rybpi5.png",
    images: {
      mobile: [
        "https://res.cloudinary.com/doogtvaoh/image/upload/v1782106833/Merxo-Mart%20-%20Modern%20E-Commerce%20Platform%20Mobile%20Responsive.png",
        "https://res.cloudinary.com/doogtvaoh/image/upload/v1782107369/Merxo-Mart%20-%20Modern%20E-Commerce%20Platform%20Mobile%20Responsive%20Cart.png",
        "https://res.cloudinary.com/doogtvaoh/image/upload/v1782107369/Merxo-Mart%20-%20Modern%20E-Commerce%20Platform%20Mobile%20Responsive%20Order%20Progress.png",
        "https://res.cloudinary.com/doogtvaoh/image/upload/v1782107369/Merxo-Mart%20-%20Modern%20E-Commerce%20Platform%20Order%20Recipt.png",
      ],
      desktop: [
        "https://res.cloudinary.com/doogtvaoh/image/upload/v1782106506/Merxo-Mart_-_Modern_E-Commerce_Platform_Macbook-Air_Responsive_icwvq0.png",
        "https://res.cloudinary.com/doogtvaoh/image/upload/v1782107739/Merxo-Mart%20-%20Modern%20E-Commerce%20Platform%20Admin%20Dashboard.png",
        "https://res.cloudinary.com/doogtvaoh/image/upload/v1782110268/Merxo-Mart_-_Modern_E-Commerce_Platform_Desktop_Manage_Order_2_qkpxlj.png",
      ],
    },
    description: "MerxoMart is a responsive and interactive e-commerce web application designed for online shoppers to explore, buy, and manage products efficiently.",
    liveUrl: "https://merxomart.vercel.app",
    accent: "violet",
    details: {
      client: "Rafiq Ahmed",
      duration: "3 months",
      tech: ["Next.js", "Next Auth", "Node.js", "MongoDB", "sslcommerz"],
      features: [
        "User authentication system",
        "One-tap mobile checkout with bKash, Nagad, Rocket & card support",
        "Product Management",
        "Cart & Orders",
        "Real-time admin dashboard with analytics",
        "SEO-optimized product pages with schema markup",
      ],
    },
  },
  {
    slug: "taskflow-pro",
    tag: "SaaS",
    title: "TaskFlow Pro",
    image: "https://res.cloudinary.com/doogtvaoh/image/upload/q_auto/f_auto/v1782045671/png_dlbvfr.jpg",
    images: { mobile: [], desktop: [] },
    description: "A project management SaaS with Kanban boards, team collaboration tools, and AI-powered task prioritization.",
    liveUrl: "https://taskflowpro.io",
    accent: "cyan",
    details: {
      client: "Nadia Islam",
      duration: "4 months",
      tech: ["React", "FastAPI", "PostgreSQL", "OpenAI"],
      features: [
        "Drag-and-drop Kanban with real-time sync",
        "AI task prioritization engine",
        "Team chat and file sharing built-in",
        "Role-based access with SSO support",
      ],
    },
  },
  {
    slug: "artspace-gallery",
    tag: "Portfolio",
    title: "ArtSpace Gallery",
    image: "https://res.cloudinary.com/doogtvaoh/image/upload/q_auto/f_auto/v1782045671/png_dlbvfr.jpg",
    images: { mobile: [], desktop: [] },
    description: "A stunning digital gallery platform for artists to showcase and sell their work globally with integrated payments.",
    liveUrl: "https://artspacegallery.com",
    accent: "amber",
    details: {
      client: "Sumaiya Khatun",
      duration: "2 months",
      tech: ["Next.js", "Prisma", "Cloudinary", "Stripe"],
      features: [
        "High-resolution lazy-loading gallery grid",
        "Global payment support via Stripe",
        "Artist profile pages with SEO meta",
        "Commission request workflow",
      ],
    },
  },
  {
    slug: "medtrack-bd",
    tag: "Healthcare",
    title: "MedTrack BD",
    image: "https://res.cloudinary.com/doogtvaoh/image/upload/q_auto/f_auto/v1782045671/png_dlbvfr.jpg",
    images: { mobile: [], desktop: [] },
    description: "A digital health record and appointment management system connecting patients with doctors across Bangladesh.",
    liveUrl: "https://medtrackbd.com",
    accent: "emerald",
    details: {
      client: "Dr. Karim Hossain",
      duration: "5 months",
      tech: ["Next.js", "Express", "MySQL", "Twilio"],
      features: [
        "Secure digital health records with encryption",
        "SMS appointment reminders via Twilio",
        "Doctor availability calendar",
        "Prescription history with PDF export",
      ],
    },
  },
  {
    slug: "learnbridge",
    tag: "EdTech",
    title: "LearnBridge",
    image: "https://res.cloudinary.com/doogtvaoh/image/upload/q_auto/f_auto/v1782045671/png_dlbvfr.jpg",
    images: { mobile: [], desktop: [] },
    description: "An interactive e-learning platform with video courses, live quizzes, and progress tracking for Bangladeshi students.",
    liveUrl: "https://learnbridge.edu.bd",
    accent: "rose",
    details: {
      client: "Tanvir Mahmud",
      duration: "3.5 months",
      tech: ["React", "Django", "Redis", "AWS S3"],
      features: [
        "Adaptive video streaming with HLS",
        "Live quiz engine with leaderboards",
        "Student progress dashboard",
        "Certificate generation with QR code",
      ],
    },
  },
];

// POST /api/admin/seed-projects
export async function POST(request) {
  try {
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`seed-projects:${clientIp}`, { limit: 3, windowMs: 15 * 60 * 1000 });
    if (!rateCheck.success) {
      return NextResponse.json({ error: "Too many attempts. Locked for 15 minutes." }, { status: 429 });
    }

    const { secretKey } = await request.json();
    if (!process.env.SEED_SECRET_KEY || secretKey !== process.env.SEED_SECRET_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const results = [];
    for (const project of INITIAL_PROJECTS) {
      const upserted = await prisma.project.upsert({
        where: { slug: project.slug },
        update: project,
        create: project,
      });
      results.push({ slug: upserted.slug, title: upserted.title });
    }

    // Invalidate site cache so changes immediately show on Vercel
    try {
      revalidatePath("/", "layout");
      revalidatePath("/our-projects");
    } catch (revalErr) {
      console.error("Revalidation error:", revalErr);
    }

    return NextResponse.json({ success: true, seeded: results });
  } catch (error) {
    console.error("Seed projects error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
