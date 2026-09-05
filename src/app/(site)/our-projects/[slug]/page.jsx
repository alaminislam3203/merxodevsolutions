import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllProjects, getProjectBySlug } from '@/app/lib/projects';


// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — MerxoDev Solutions`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.image ? [{ url: project.image }] : [],
    },
  };
}

// ─── Static Params ────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const projects = await getAllProjects();
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

// ─── Premium Browser Auto-Scroll Mockup Card ─────────────────────────────────

function BrowserScrollCard({ image, title, slug, liveUrl, accent }) {
  if (!image) return null;

  return (
    <div
      className={`relative w-full rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border transition-all duration-500 shadow-2xl flex flex-col bg-zinc-900/60 dark:bg-black/60 backdrop-blur-xl ${accent.border}`}
      style={{
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(99, 102, 241, 0.1)",
      }}
    >
      {/* Browser Window Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5 bg-zinc-100 dark:bg-zinc-900/90 border-b border-zinc-200/80 dark:border-zinc-800 relative z-20">
        {/* Window controls */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-red-500/80 shadow-sm" />
          <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-yellow-500/80 shadow-sm" />
          <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-emerald-500/80 shadow-sm" />
        </div>

        {/* Address / Search Bar */}
        <div className="flex-1 mx-3 sm:mx-6 max-w-sm sm:max-w-md">
          <div className="w-full h-6 sm:h-7 rounded-lg bg-zinc-200/70 dark:bg-zinc-800/80 border border-zinc-300/60 dark:border-zinc-700/60 flex items-center justify-center overflow-hidden px-3">
            <span className="text-[10px] sm:text-[11px] text-zinc-600 dark:text-zinc-400 font-mono tracking-tight lowercase truncate">
              merxodevsolutions.pro.bd/our-projects/{slug}
            </span>
          </div>
        </div>

        {/* External Link */}
        {liveUrl ? (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors cursor-pointer p-1"
            title="Open Live Preview"
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
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        ) : (
          <div className="w-3.5 h-3.5" />
        )}
      </div>

      {/* Vertical Scrolling Image Container */}
      <div className="relative h-[360px] sm:h-[480px] md:h-[580px] overflow-hidden group/img bg-zinc-950">
        {/* Subtle Loading Shimmer Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-pulse pointer-events-none z-10" />

        <img
          src={image}
          alt={title}
          className="w-full h-auto absolute top-0 left-0 transition-transform duration-[7000ms] ease-in-out group-hover/img:translate-y-[calc(-100%+360px)] sm:group-hover/img:translate-y-[calc(-100%+480px)] md:group-hover/img:translate-y-[calc(-100%+580px)] will-change-transform"
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
        />

        {/* Bottom indicator hint */}
        <div className="absolute bottom-3 right-4 z-20 pointer-events-none opacity-80 group-hover/img:opacity-0 transition-opacity duration-300">
          <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/70 text-zinc-300 border border-white/10 backdrop-blur-md">
            Hover to scroll
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const a = accentMap[project.accent] || accentMap.violet;
  const details = project.details || {};
  const images = project.images || { mobile: [], desktop: [] };

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

      <main className="min-h-screen pb-24 pt-20 sm:pt-24">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-4">
          {/* ── Back button ── */}
          <div>
            <Link
              href="/our-projects"
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold font-raleway uppercase tracking-widest transition-all duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 shadow-sm hover:shadow hover:-translate-x-0.5 ${a.border} ${a.back}`}
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

          {/* ── Single Full-Width Browser Auto-Scroll Showcase Card ── */}
          <div className="w-full">
            <BrowserScrollCard
              image={project.image}
              title={project.title}
              slug={project.slug}
              liveUrl={project.liveUrl}
              accent={a}
            />
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
              { label: 'Client', value: details.client || '-' },
              { label: 'Duration', value: details.duration || '-' },
              { label: 'Category', value: project.tag },
              { label: 'Stack', value: `${(details.tech || []).length} technologies` },
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
              {(details.tech || []).map(t => (
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
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="font-display text-lg font-extrabold text-[#27003B] dark:text-white uppercase tracking-wide">
                Key Features
              </h2>
              {details.features && details.features.length > 0 && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-raleway">
                  {details.features.length} Highlights
                </span>
              )}
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(details.features || []).map((f, i) => {
                // Support both new object structure { title, subtitle } and legacy string "title — subtitle" or plain string
                let title = "";
                let subtitle = "";
                if (typeof f === "object" && f !== null) {
                  title = f.title || "";
                  subtitle = f.subtitle || "";
                } else if (typeof f === "string") {
                  const parts = f.split(" — ");
                  if (parts.length > 1) {
                    title = parts[0].trim();
                    subtitle = parts.slice(1).join(" — ").trim();
                  } else {
                    title = f.trim();
                  }
                }

                if (!title && !subtitle) return null;

                const isNumberStyle = details.featureStyle === "number";

                return (
                  <li
                    key={i}
                    className={`group relative flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${a.border} bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm font-raleway`}
                  >
                    {/* Number badge or glowing dot */}
                    {isNumberStyle ? (
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 font-dm shadow-sm ${a.badge} border ${a.border}`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    ) : (
                      <span
                        className={`mt-2 w-2.5 h-2.5 rounded-full shrink-0 shadow-sm ${a.dot} ring-4 ring-current/10`}
                        aria-hidden
                      />
                    )}

                    {/* Content */}
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100 leading-snug">
                        {title}
                      </span>
                      {subtitle && (
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {subtitle}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
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
                    className={`group flex items-center gap-4 p-4 rounded-xl border hover:shadow-md transition-all duration-300 ${ra.border} hover:-translate-y-0.5`}
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
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
            className={`rounded-2xl border ${a.border} p-8 flex flex-col sm:flex-row items-center justify-between gap-5`}
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
