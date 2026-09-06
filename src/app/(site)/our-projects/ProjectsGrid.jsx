'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { truncateWords } from '@/lib/utils';

// ─── Accent Map ───────────────────────────────────────────────────────────────
const accentMap = {
  violet: {
    tag: 'bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800',
    dot: 'bg-violet-500',
    liveBtn: 'bg-gradient-to-r from-violet-600 to-fuchsia-500 shadow-violet-500/30',
    detailBtn: 'border-violet-400 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/60',
    border: 'hover:border-violet-400/50',
    glow: 'from-violet-500/10 to-transparent',
  },
  cyan: {
    tag: 'bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800',
    dot: 'bg-cyan-500',
    liveBtn: 'bg-gradient-to-r from-cyan-500 to-violet-600 shadow-cyan-500/30',
    detailBtn: 'border-cyan-400 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/60',
    border: 'hover:border-cyan-400/50',
    glow: 'from-cyan-500/10 to-transparent',
  },
  amber: {
    tag: 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
    dot: 'bg-amber-400',
    liveBtn: 'bg-gradient-to-r from-amber-400 to-orange-500 shadow-amber-500/30',
    detailBtn: 'border-amber-400 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/60',
    border: 'hover:border-amber-400/50',
    glow: 'from-amber-500/10 to-transparent',
  },
  emerald: {
    tag: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
    dot: 'bg-emerald-500',
    liveBtn: 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/30',
    detailBtn: 'border-emerald-400 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/60',
    border: 'hover:border-emerald-400/50',
    glow: 'from-emerald-500/10 to-transparent',
  },
  rose: {
    tag: 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800',
    dot: 'bg-rose-500',
    liveBtn: 'bg-gradient-to-r from-rose-500 to-pink-500 shadow-rose-500/30',
    detailBtn: 'border-rose-400 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60',
    border: 'hover:border-rose-400/50',
    glow: 'from-rose-500/10 to-transparent',
  },
};

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index, visible }) {
  const router = useRouter();
  const a = accentMap[project.accent] || accentMap.violet;
  const details = project.details || {};
  const tech = details.tech || [];

  const handleCardClick = (e) => {
    // If clicked on an interactive link/button inside, allow that to handle
    if (e.target.closest('a') || e.target.closest('button')) {
      return;
    }
    router.push(`/our-projects/${project.slug}`);
  };

  return (
    <article
      onClick={handleCardClick}
      className={`group relative flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden transition-all duration-700 cursor-pointer ${a.border} hover:shadow-2xl hover:-translate-y-1.5 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Top glow */}
      <div className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${a.glow} pointer-events-none z-10`} aria-hidden />

      {/* Image */}
      <Link
        href={`/our-projects/${project.slug}`}
        className="block relative w-full h-44 overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 cursor-pointer"
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-400 dark:text-zinc-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
        <div className="absolute top-3 left-3 z-20">
          <span className={`text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full font-raleway backdrop-blur-sm ${a.tag}`}>
            {project.tag}
          </span>
        </div>
      </Link>

      <div className="relative z-10 flex flex-col flex-1 p-5 gap-3">
        <Link
          href={`/our-projects/${project.slug}`}
          className="cursor-pointer group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors"
        >
          <h2 className="font-display text-base font-extrabold text-[#27003B] dark:text-white uppercase tracking-wide leading-snug">
            {project.title}
          </h2>
        </Link>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-raleway flex-1">
          {truncateWords(project.description, 20)}
        </p>

        {/* Tech badges */}
        {tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tech.map(t => (
              <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-raleway">
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center justify-between gap-3 mt-1 pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <Link
            href={`/our-projects/${project.slug}`}
            aria-label={`View details for ${project.title}`}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-semibold uppercase tracking-widest font-raleway transition-all duration-300 hover:scale-105 active:scale-95 ${a.detailBtn}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Details
          </Link>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// ─── Main Grid (Client Component) ────────────────────────────────────────────
export default function ProjectsGrid({ projects }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const tags = ['All', ...Array.from(new Set(projects.map(p => p.tag)))];
  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.tag === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleFilter = tag => {
    setVisible(false);
    setActiveFilter(tag);
    setTimeout(() => setVisible(true), 50);
  };

  return (
    <main ref={sectionRef} className="min-h-screen pb-24 overflow-hidden mt-2">
      {/* Background glows */}
      <div aria-hidden className="pointer-events-none fixed -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"

        style={{
          //  background: 'radial-gradient(circle, #7c3aed, transparent 70%)'
        }} />
      <div aria-hidden className="pointer-events-none fixed -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl" style={{
        // background: 'radial-gradient(circle, #06b6d4, transparent 70%)'
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className={`pt-8 flex items-center gap-2 text-xs font-raleway text-zinc-400 dark:text-zinc-600 transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <Link href="/" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Home</Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="9 18 15 12 9 6" /></svg>
          <span className="text-zinc-600 dark:text-zinc-400 font-semibold">Our Projects</span>
        </nav>

        {/* Hero Header */}
        <div className={`flex flex-col gap-4 mt-10 mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800 font-raleway uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" aria-hidden />
            Portfolio
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-wide leading-tight">
            Our{' '}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="max-w-xl text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-raleway">
            Every project here is built with precision — from SaaS platforms to e-commerce storefronts, we craft digital products that perform.
          </p>
          <div className="flex flex-wrap gap-6 mt-2">
            {[
              { value: `${projects.length}+`, label: 'Projects Delivered' },
              { value: '100%', label: 'Client Satisfaction' },
              { value: '5★', label: 'Average Rating' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="font-display text-2xl font-extrabold text-[#27003B] dark:text-white">{value}</span>
                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-raleway uppercase tracking-widest">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className={`flex flex-wrap gap-2 mb-10 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} role="tablist" aria-label="Filter projects by category">
          {tags.map(tag => (
            <button
              key={tag}
              role="tab"
              aria-selected={activeFilter === tag}
              onClick={() => handleFilter(tag)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest font-raleway transition-all duration-200 border ${activeFilter === tag
                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white border-transparent shadow-lg shadow-violet-500/20'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-violet-400 dark:hover:border-violet-600 hover:text-violet-600 dark:hover:text-violet-400'
                }`}
            >
              {tag}
              {tag !== 'All' && (
                <span className="ml-1.5 opacity-60">({projects.filter(p => p.tag === tag).length})</span>
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} visible={visible} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400" aria-hidden>
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 font-raleway text-sm">No projects found in this category.</p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className={`mt-20 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-10 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h2 className="font-display text-xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-wide">Have a Project in Mind?</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-raleway max-w-sm">We turn ideas into polished digital products. Let's talk about what we can build together.</p>
          </div>
          <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-white text-sm font-semibold uppercase tracking-widest font-raleway bg-gradient-to-r from-violet-600 to-fuchsia-500 shadow-lg shadow-violet-500/30 transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95 shrink-0">
            Start a Project
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
