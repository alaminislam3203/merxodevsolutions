import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllProjects, getProjectBySlug } from '@/app/lib/projects';
import ProjectDetailClient from './ProjectDetailClient';


// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    return {
      title: 'Project Not Found — MerxoDev Solutions',
      description: 'The requested project case study could not be found.',
    };
  }

  const canonicalUrl = `https://merxodevsolutions.pro.bd/our-projects/${project.slug}`;
  const keywords = [
    // English
    project.title,
    `${project.title} case study`,
    `${project.title} web app`,
    project.tag || 'Web Development',
    'custom web application Bangladesh',
    'portfolio showcase MerxoDev',
    'Next.js case study Bangladesh',
    // Bengali (বাংলা)
    `${project.title} প্রজেক্ট`,
    'ক্লায়েন্ট প্রজেক্ট রিভিউ',
    'ওয়েবসাইট কেস স্টাডি',
    'মারক্সোদেব প্রজেক্ট পোর্টফোলিও',
    // Banglish (বাংলিশ)
    `${project.slug} live demo`,
    'previous work case study',
    'website kivabe banano hoyeche',
  ];

  return {
    title: `${project.title} — Case Study & Project Showcase | MerxoDev Solutions`,
    description:
      project.description ||
      `Explore the architecture, tech stack, and results of ${project.title} delivered by MerxoDev Solutions.`,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${project.title} — Case Study | MerxoDev Solutions`,
      description: project.description,
      url: canonicalUrl,
      siteName: 'MerxoDev Solutions',
      locale: 'en_US',
      type: 'article',
      images: project.image
        ? [
          {
            url: project.image,
            width: 1200,
            height: 630,
            alt: `${project.title} Preview`,
          },
        ]
        : [
          {
            url: 'https://merxodevsolutions.pro.bd/logo-light.png',
            width: 1200,
            height: 630,
            alt: 'MerxoDev Solutions',
          },
        ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Case Study | MerxoDev Solutions`,
      description: project.description,
      images: project.image ? [project.image] : ['https://merxodevsolutions.pro.bd/logo-light.png'],
    },
  };
}

// ─── Dynamic Config ──────────────────────────────────────────────────────────
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// ─── Accent Map ───────────────────────────────────────────────────────────────
const accentMap = {
  violet: {
    tag: 'bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800',
    badge:
      'bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300',
    dot: 'bg-violet-500',
    gradient: 'from-violet-600 to-fuchsia-500',
    btn: 'bg-gradient-to-r from-violet-600 to-fuchsia-500 shadow-violet-500/30',
    back: 'text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-200',
    border: 'border-violet-200 dark:border-violet-800',
    glow: 'from-violet-500/10 to-transparent',
  },
  cyan: {
    tag: 'bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800',
    badge: 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300',
    dot: 'bg-cyan-500',
    gradient: 'from-cyan-500 to-violet-600',
    btn: 'bg-gradient-to-r from-cyan-500 to-violet-600 shadow-cyan-500/30',
    back: 'text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-200',
    border: 'border-cyan-200 dark:border-cyan-800',
    glow: 'from-cyan-500/10 to-transparent',
  },
  amber: {
    tag: 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
    badge:
      'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300',
    dot: 'bg-amber-400',
    gradient: 'from-amber-400 to-orange-500',
    btn: 'bg-gradient-to-r from-amber-400 to-orange-500 shadow-amber-500/30',
    back: 'text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200',
    border: 'border-amber-200 dark:border-amber-800',
    glow: 'from-amber-500/10 to-transparent',
  },
  emerald: {
    tag: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
    badge:
      'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300',
    dot: 'bg-emerald-500',
    gradient: 'from-emerald-500 to-teal-500',
    btn: 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/30',
    back: 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200',
    border: 'border-emerald-200 dark:border-emerald-800',
    glow: 'from-emerald-500/10 to-transparent',
  },
  rose: {
    tag: 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800',
    badge: 'bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300',
    dot: 'bg-rose-500',
    gradient: 'from-rose-500 to-pink-500',
    btn: 'bg-gradient-to-r from-rose-500 to-pink-500 shadow-rose-500/30',
    back: 'text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-200',
    border: 'border-rose-200 dark:border-rose-800',
    glow: 'from-rose-500/10 to-transparent',
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const a = accentMap[project.accent] || accentMap.violet;
  const details = project.details || {};
  const images = project.images || { mobile: [], desktop: [] };
  const desktopList = Array.isArray(images.desktop) ? images.desktop.filter(Boolean) : [];
  const mobileList = Array.isArray(images.mobile) ? images.mobile.filter(Boolean) : [];

  // 2 Side-by-side showcase images:
  // Card 1: 1st desktop screenshot (or cover image)
  const card1Image = desktopList[0] || project.image;
  // Card 2: 2nd desktop screenshot, or cover image (if 1st was desktop image), or mobile screenshot, or fallback
  const card2Image = desktopList[1] || (desktopList[0] && desktopList[0] !== project.image ? project.image : (mobileList[0] || desktopList[0] || project.image));

  // Related projects (other 2 excluding current)
  const allProjects = await getAllProjects();
  const related = allProjects.filter(p => p.slug !== project.slug).slice(0, 2);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            description: project.description,
            url: project.liveUrl,
            image: project.image,
            creator: { '@type': 'Organization', name: 'MerxoDev Solutions' },
          }),
        }}
      />

      <ProjectDetailClient
        project={project}
        related={related}
        card1Image={card1Image}
        card2Image={card2Image}
        a={a}
      />
    </>
  );
}

