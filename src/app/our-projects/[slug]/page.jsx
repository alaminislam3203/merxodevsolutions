import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/app/lib/projects';

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — MerxoDev Solutions`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.image }],
    },
  };
}

// ─── Static Params ────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

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

// ─── Mobile mockup card ─────────────────────────────────────────────────────

function MobileMockup({ src, alt }) {
  if (!src) return null;
  return (
    <div className="relative w-28 sm:w-36 shrink-0">
      <div className="relative aspect-[9/19] rounded-[1.75rem] bg-zinc-900 dark:bg-zinc-100 p-[2px] shadow-xl shadow-zinc-900/10 dark:shadow-black/40">
        <div className="relative w-full h-full rounded-[1.55rem] overflow-hidden bg-zinc-950">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="160px"
          />
        </div>
        {/* Notch */}
        <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-10 h-2.5 rounded-b-lg bg-zinc-900 dark:bg-zinc-100 z-10" />
      </div>
    </div>
  );
}

// ─── Desktop mockup card ────────────────────────────────────────────────────

function DesktopMockup({ src, alt, accent }) {
  if (!src) return null;
  return (
    <div
      className={`rounded-2xl border bg-zinc-50 dark:bg-zinc-900 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ${accent.border}`}
    >
      <div className="flex items-center gap-1.5 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
      </div>
      <div className="relative aspect-[16/8] bg-white dark:bg-zinc-950">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-center"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) notFound();

  const a = accentMap[project.accent];

  // Related projects (other 2 excluding current)
  const related = projects.filter(p => p.slug !== project.slug).slice(0, 2);

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

      <main className="min-h-screen bg-white dark:bg-zinc-950 pb-24 mt-20">
        <div className="max-w-4xl mx-auto px-6 flex flex-col gap-10">
          {/* ── Back button ── */}
          <div>
            <Link
              href="/our-projects"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold font-raleway uppercase tracking-widest transition-all duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 ${a.border} ${a.back}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
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
              Back
            </Link>
          </div>

          {/* ── Tag + Title ── */}
          <div className="flex flex-col gap-3">
            <span
              className={`inline-block w-fit text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full font-raleway ${a.tag}`}
            >
              {project.tag}
            </span>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-wide leading-tight">
              {project.title}
            </h1>
          </div>

          {/* ── Showcase Gallery ── */}
          <div className="mx-[5%] sm:mx-0 sm:relative sm:left-1/2 sm:-translate-x-1/2 sm:w-[90vw] flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start justify-center sm:justify-start">
              <div className="flex flex-col items-center gap-3 shrink-0">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {project.images.mobile.slice(0, 4).map((src, i) => (
                    <MobileMockup
                      key={i}
                      src={src}
                      alt={`${project.title} mobile screenshot ${i + 1}`}
                    />
                  ))}
                </div>
                <span className="hidden sm:block text-[20px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-display">
                  Mobile View
                </span>
              </div>
              <div className="w-full sm:flex-1">
                <DesktopMockup
                  src={project.images.desktop[0]}
                  alt={`${project.title} desktop screenshot 1`}
                  accent={a}
                />
                <span className="hidden sm:block text-[25px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-display mt-2 text-center">
                  Mac-Air View
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <DesktopMockup
                src={project.images.desktop[1]}
                alt={`${project.title} desktop screenshot 2`}
                accent={a}
                compact
              />
              <DesktopMockup
                src={project.images.desktop[2]}
                alt={`${project.title} desktop screenshot 3`}
                accent={a}
                compact
              />
            </div>
            <span className="hidden sm:block text-[25px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-display mt-2 text-center">
              Desktop View
            </span>
          </div>

          {/* Divider */}
          <div className={`h-px bg-gradient-to-r ${a.gradient} opacity-30`} />

          {/* Description + Live button */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-raleway max-w-xl">
              {project.description}
            </p>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold uppercase tracking-widest font-raleway shadow-lg transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95 shrink-0 ${a.btn}`}
            >
              View Live
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
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>

          {/* Divider */}
          <div className={`h-px bg-gradient-to-r ${a.gradient} opacity-30`} />

          {/* Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: 'Client', value: project.details.client },
              { label: 'Duration', value: project.details.duration },
              { label: 'Category', value: project.tag },
              {
                label: 'Stack',
                value: `${project.details.tech.length} technologies`,
              },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-raleway">
                  {label}
                </span>
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 font-raleway">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className={`h-px bg-gradient-to-r ${a.gradient} opacity-30`} />

          {/* Tech Stack */}
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-lg font-extrabold text-[#27003B] dark:text-white uppercase tracking-wide">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.details.tech.map(t => (
                <span
                  key={t}
                  className={`text-xs font-bold px-4 py-1.5 rounded-full font-raleway tracking-wide ${a.badge}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className={`h-px bg-gradient-to-r ${a.gradient} opacity-30`} />

          {/* Key Features */}
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-lg font-extrabold text-[#27003B] dark:text-white uppercase tracking-wide">
              Key Features
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.details.features.map((f, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-3 p-4 rounded-xl border bg-zinc-50 dark:bg-zinc-900 ${a.border} font-raleway`}
                >
                  <span
                    className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${a.dot}`}
                    aria-hidden
                  />
                  <span className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className={`h-px bg-gradient-to-r ${a.gradient} opacity-30`} />

          {/* Related Projects */}
          <div className="flex flex-col gap-5">
            <h2 className="font-display text-lg font-extrabold text-[#27003B] dark:text-white uppercase tracking-wide">
              Other Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map(rp => {
                const ra = accentMap[rp.accent];
                return (
                  <Link
                    key={rp.slug}
                    href={`/our-projects/${rp.slug}`}
                    className={`group flex items-center gap-4 p-4 rounded-xl border bg-zinc-50 dark:bg-zinc-900 hover:shadow-md transition-all duration-300 ${ra.border} hover:-translate-y-0.5`}
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-zinc-200 dark:bg-zinc-800">
                      <Image
                        src={rp.image}
                        alt={rp.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest font-raleway ${ra.back}`}
                      >
                        {rp.tag}
                      </span>
                      <span className="text-sm font-extrabold text-[#27003B] dark:text-white uppercase font-display truncate">
                        {rp.title}
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 font-raleway line-clamp-1">
                        {rp.description}
                      </span>
                    </div>
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
                      className="ml-auto shrink-0 text-zinc-400 group-hover:translate-x-1 transition-transform duration-200"
                      aria-hidden
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <div
            className={`rounded-2xl border ${a.border} bg-zinc-50 dark:bg-zinc-900 p-8 flex flex-col sm:flex-row items-center justify-between gap-5`}
          >
            <div className="flex flex-col gap-1 text-center sm:text-left">
              <h3 className="font-display text-base font-extrabold text-[#27003B] dark:text-white uppercase tracking-wide">
                Like What You See?
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-raleway">
                Let's build something amazing together.
              </p>
            </div>
            <Link
              href="/contact"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold uppercase tracking-widest font-raleway shadow-lg transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95 shrink-0 ${a.btn}`}
            >
              Start a Project
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
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
