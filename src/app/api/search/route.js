import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();

  if (!q) {
    return NextResponse.json({ projects: [], pages: [], services: [] });
  }

  try {
    // 1. Search database projects
    const allProjects = await prisma.project.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
        tag: true,
        description: true,
        image: true,
      },
    });

    const matchingProjects = allProjects.filter((p) => {
      const title = (p.title || "").toLowerCase();
      const tag = (p.tag || "").toLowerCase();
      const desc = (p.description || "").toLowerCase();
      return title.includes(q) || tag.includes(q) || desc.includes(q);
    });

    // 2. Static site sections & services index
    const staticItems = [
      {
        title: "Web Application Development",
        category: "Services",
        description: "Full-stack modern web applications built with Next.js & React.",
        href: "/services",
      },
      {
        title: "UI / UX Design",
        category: "Services",
        description: "Creative, conversion-focused and user-centric interfaces in Figma.",
        href: "/services",
      },
      {
        title: "Custom Software Solutions",
        category: "Services",
        description: "Tailored digital architectures and high-performance backends.",
        href: "/services",
      },
      {
        title: "Mobile App Development",
        category: "Services",
        description: "Cross-platform mobile apps for iOS and Android.",
        href: "/services",
      },
      {
        title: "Our Journey & Milestones",
        category: "Company",
        description: "Explore the roadmap and story of MerxoDev Solutions.",
        href: "/our-journey",
      },
      {
        title: "About MerxoDev Solutions",
        category: "Company",
        description: "Our mission, vision, and the passionate team behind the work.",
        href: "/about",
      },
      {
        title: "Contact & Hire Us",
        category: "Contact",
        description: "Get in touch for new projects, consultations, or direct calls.",
        href: "/contact",
      },
      {
        title: "Our Portfolio & Projects",
        category: "Projects",
        description: "Browse our complete catalog of delivered digital products.",
        href: "/our-projects",
      },
      {
        title: "Tech Stack & Tools",
        category: "Home",
        description: "Technologies we use: React, Next.js, Node, PostgreSQL, Tailwind, etc.",
        href: "/#tech-stack",
      },
      {
        title: "Client Testimonials & Reviews",
        category: "Home",
        description: "What our happy clients say about our development process.",
        href: "/#testimonials",
      },
      {
        title: "Featured Projects Section",
        category: "Home",
        description: "Top selected showcase works on the homepage.",
        href: "/#featured-projects",
      },
    ];

    const matchingStatic = staticItems.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });

    return NextResponse.json(
      {
        projects: matchingProjects.slice(0, 5),
        results: matchingStatic.slice(0, 6),
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message, projects: [], results: [] }, { status: 500 });
  }
}
