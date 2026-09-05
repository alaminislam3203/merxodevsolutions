'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect, useCallback } from 'react';

// ─── Accent Map ───────────────────────────────────────────────────────────────
const accentMap = {
  violet: {
    tag: 'bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800',
    dot: 'bg-violet-500',
    liveBtn:
      'bg-gradient-to-r from-violet-600 to-fuchsia-500 shadow-violet-500/30',
    detailBtn:
      'border-violet-400 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/60',
    glow: 'from-violet-500/10 to-transparent',
    border: 'hover:border-violet-400/50',
    indicator: 'bg-violet-500',
  },
  cyan: {
    tag: 'bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800',
    dot: 'bg-cyan-500',
    liveBtn: 'bg-gradient-to-r from-cyan-500 to-violet-600 shadow-cyan-500/30',
    detailBtn:
      'border-cyan-400 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/60',
    glow: 'from-cyan-500/10 to-transparent',
    border: 'hover:border-cyan-400/50',
    indicator: 'bg-cyan-500',
  },
  amber: {
    tag: 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
    dot: 'bg-amber-400',
    liveBtn:
      'bg-gradient-to-r from-amber-400 to-orange-500 shadow-amber-500/30',
    detailBtn:
      'border-amber-400 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/60',
    glow: 'from-amber-500/10 to-transparent',
    border: 'hover:border-amber-400/50',
    indicator: 'bg-amber-400',
  },
  emerald: {
    tag: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
    dot: 'bg-emerald-500',
    liveBtn:
      'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/30',
    detailBtn:
      'border-emerald-400 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/60',
    glow: 'from-emerald-500/10 to-transparent',
    border: 'hover:border-emerald-400/50',
    indicator: 'bg-emerald-500',
  },
  rose: {
    tag: 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800',
    dot: 'bg-rose-500',
    liveBtn: 'bg-gradient-to-r from-rose-500 to-pink-500 shadow-rose-500/30',
    detailBtn:
      'border-rose-400 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60',
    glow: 'from-rose-500/10 to-transparent',
    border: 'hover:border-rose-400/50',
    indicator: 'bg-rose-500',
  },
};

// ─── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, index, visible }) {
  const router = useRouter();
  const a = accentMap[project.accent] || accentMap.violet;

  const handleCardClick = (e) => {
    // If clicked on an explicit interactive link/button, let that event proceed
    if (e.target.closest('a') || e.target.closest('button')) {
      return;
    }
    router.push(`/our-projects/${project.slug}`);
  };

  return (
    <article
      onClick={handleCardClick}
      className={`group relative flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden transition-all duration-700 cursor-pointer ${a.border} hover:shadow-2xl hover:-translate-y-1.5 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Top glow */}
      <div
        className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${a.glow} pointer-events-none z-10`}
        aria-hidden
      />

      {/* Project Image */}
      <Link
        href={`/our-projects/${project.slug}`}
        className="block relative w-full h-44 overflow-hidden dark:bg-zinc-800 shrink-0 cursor-pointer"
      >
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
        />
        {/* Tag overlay on image */}
        <div className="absolute top-3 left-3 z-20">
          <span
            className={`text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full font-raleway backdrop-blur-sm ${a.tag}`}
          >
            {project.tag}
          </span>
        </div>
      </Link>

      <div className="relative z-10 flex flex-col flex-1 p-5 gap-3">
        {/* Title */}
        <Link
          href={`/our-projects/${project.slug}`}
          className="cursor-pointer group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors"
        >
          <h3 className="font-display text-base font-extrabold text-[#27003B] dark:text-white uppercase tracking-wide leading-snug">
            {project.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-raleway flex-1">
          {project.description}
        </p>

        {/* Buttons row */}
        <div className="flex items-center justify-between gap-3 mt-1 pt-3 border-t border-zinc-100 dark:border-zinc-800">
          {/* View Details — links to the real project page */}
          <Link
            href={`/our-projects/${project.slug}`}
            aria-label={`View details for ${project.title}`}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-semibold uppercase tracking-widest font-raleway transition-all duration-300 hover:scale-105 active:scale-95 ${a.detailBtn}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Details
          </Link>

          {/* View Live */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`View live project: ${project.title}`}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-semibold uppercase tracking-widest font-raleway shadow-lg transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95 ${a.liveBtn}`}
            >
              View Live
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function FeaturedProjects({ projects = [] }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const intervalRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const VISIBLE_CARDS = 3;
  const TOTAL = projects.length;
  const SLIDE_INTERVAL = 3000;

  // Intersection observer for section entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Advance slide
  const next = useCallback(() => {
    setActiveIndex(prev => (prev + 1) % TOTAL);
  }, [TOTAL]);

  const prev = useCallback(() => {
    setActiveIndex(prev => (prev - 1 + TOTAL) % TOTAL);
  }, [TOTAL]);

  const goTo = useCallback(i => setActiveIndex(i), []);

  // Auto-swipe every 3 s
  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, [next, isPaused]);

  // Touch/drag support
  const dragStart = useRef(null);

  const handlePointerDown = e => {
    dragStart.current = e.clientX;
  };
  const handlePointerUp = e => {
    if (dragStart.current === null) return;
    const delta = dragStart.current - e.clientX;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
    dragStart.current = null;
  };

  // Visible indices (wrap-around)
  const visibleIndices = Array.from(
    { length: VISIBLE_CARDS },
    (_, i) => (activeIndex + i) % TOTAL,
  );

  return (
    <>
      {/* ── SEO structured data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Featured Projects by MerxoDev Solutions',
            itemListElement: projects.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: p.title,
              description: p.description,
              url: p.liveUrl,
            })),
          }),
        }}
      />

      <section
        ref={sectionRef}
        aria-labelledby="projects-heading"
        className="relative py-10 sm:py-14 overflow-hidden bg-transparent"
      >
        {/* Background glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            // background: 'radial-gradient(circle, #7c3aed, transparent 70%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
          style={{
            // background: 'radial-gradient(circle, #06b6d4, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* ── Section Header ── */}
          <div
            className={`flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 sm:mb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            <div className="flex flex-col gap-3">
              <span className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800 font-raleway uppercase tracking-widest">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"
                  aria-hidden
                />
                Featured Work
              </span>
              <h2
                id="projects-heading"
                className="font-display text-3xl sm:text-5xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-wide leading-tight"
              >
                Our{' '}
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
                  Projects
                </span>
              </h2>
              <p className="max-w-md text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-raleway">
                Hand-picked work that showcases what we build — from SaaS to
                storefronts, all crafted with precision.
              </p>
            </div>

            <Link
              href="/our-projects"
              aria-label="View all MerxoDev Solutions projects"
              className="hidden sm:inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-violet-400 dark:hover:border-violet-600 transition-all duration-300 font-raleway uppercase tracking-widest group shrink-0"
            >
              All Projects
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* ── Swiper Track ── */}
          <div
            ref={trackRef}
            className="relative select-none"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visibleIndices.map((projIdx, slotIdx) => (
                <ProjectCard
                  key={`${projIdx}-${slotIdx}`}
                  project={projects[projIdx]}
                  index={slotIdx}
                  visible={visible}
                />
              ))}
            </div>

            {/* ── Prev / Next arrows ── */}
            <button
              onClick={() => {
                prev();
                setIsPaused(true);
              }}
              aria-label="Previous projects"
              className="absolute -left-4 top-1/2 -translate-y-1/2 hidden md:flex w-9 h-9 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-md items-center justify-center text-zinc-600 dark:text-zinc-300 hover:border-violet-400 hover:text-violet-600 transition-all duration-200 hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => {
                next();
                setIsPaused(true);
              }}
              aria-label="Next projects"
              className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:flex w-9 h-9 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-md items-center justify-center text-zinc-600 dark:text-zinc-300 hover:border-violet-400 hover:text-violet-600 transition-all duration-200 hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* ── Dot Indicators ── */}
          <div
            className={`flex items-center justify-center gap-2 mt-8 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            role="tablist"
            aria-label="Project slides"
          >
            {projects.map((p, i) => {
              const a = accentMap[p.accent];
              const isActive = i === activeIndex;
              return (
                <button
                  key={p.slug}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to project ${i + 1}: ${p.title}`}
                  onClick={() => {
                    goTo(i);
                    setIsPaused(true);
                  }}
                  className={`rounded-full transition-all duration-300 ${isActive
                      ? `w-6 h-2 ${a.indicator}`
                      : 'w-2 h-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-500'
                    }`}
                />
              );
            })}
          </div>

          {/* ── Auto-play progress bar ── */}
          <div className="mt-4 flex justify-center">
            <div className="w-32 h-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                key={activeIndex}
                className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full"
                style={{
                  animation: isPaused
                    ? 'none'
                    : `progressBar ${SLIDE_INTERVAL}ms linear forwards`,
                }}
              />
            </div>
          </div>

          {/* ── All Projects mobile ── */}
          <div
            className={`sm:hidden flex justify-center mt-10 transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            <Link
              href="/our-projects"
              aria-label="View all MerxoDev Solutions projects"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all font-raleway uppercase tracking-widest group"
            >
              All Projects
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
