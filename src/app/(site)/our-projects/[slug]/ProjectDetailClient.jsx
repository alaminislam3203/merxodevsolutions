'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import BrowserScrollCard from '@/components/BrowserScrollCard';
import { truncateWords } from '@/lib/utils';

export default function ProjectDetailClient({ project, related, card1Image, card2Image, a }) {
  const { t } = useTranslation();
  const details = project.details || {};

  return (
    <main className="min-h-screen pb-24 pt-20 sm:pt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
        {/* ── Back button ── */}
        <div>
          <Link
            href="/our-projects"
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold font-exo-extralight uppercase tracking-widest transition-all duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 shadow-sm hover:shadow hover:-translate-x-0.5 ${a.border} ${a.back}`}
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
            {t('projectDetail.back', 'Back')}
          </Link>
        </div>

        {/* ── Tag + Title ── */}
        <div className="flex flex-col gap-3">
          <span
            className={`inline-block w-fit text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full font-exo-extralight ${a.tag}`}
          >
            {project.tag}
          </span>
          <h1 className="font-exo-medium text-2xl sm:text-4xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-wide leading-tight">
            {project.title}
          </h1>
        </div>

        {/* ── 2 Browser Auto-Scroll Showcase Cards Side by Side ── */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <BrowserScrollCard
            image={card1Image}
            title={`${project.title} Preview 1`}
            slug={project.slug}
            liveUrl={project.liveUrl}
            accent={a}
            label="view-1"
          />
          <BrowserScrollCard
            image={card2Image}
            title={`${project.title} Preview 2`}
            slug={project.slug}
            liveUrl={project.liveUrl}
            accent={a}
            label="view-2"
          />
        </div>

        {/* Divider */}
        <div className={`h-px bg-gradient-to-r ${a.gradient} opacity-30`} />

        {/* Description + Live button */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div className="max-w-2xl flex flex-col gap-3">
            <h2 className="font-exo-medium text-lg sm:text-xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-wide">
              {details.descriptionTitle || t('projectDetail.aboutProject', 'About The Project')}
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight whitespace-pre-line">
              {project.description}
            </p>
          </div>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold uppercase tracking-widest font-exo-extralight shadow-lg transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95 shrink-0 ${a.btn}`}
            >
              {t('projectDetail.viewLive', 'View Live')}
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
          )}
        </div>

        {/* Divider */}
        <div className={`h-px bg-gradient-to-r ${a.gradient} opacity-30`} />

        {/* Meta Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { label: t('projectDetail.client', 'Client'), value: details.client || '-' },
            { label: t('projectDetail.duration', 'Duration'), value: details.duration || '-' },
            { label: t('projectDetail.category', 'Category'), value: project.tag },
            { label: t('projectDetail.stack', 'Stack'), value: `${(details.tech || []).length} ${t('projectDetail.technologies', 'technologies')}` },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-exo-extralight">
                {label}
              </span>
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 font-exo-extralight">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className={`h-px bg-gradient-to-r ${a.gradient} opacity-30`} />

        {/* Tech Stack */}
        <div className="flex flex-col gap-4">
          <h2 className="font-exo-medium text-lg font-extrabold text-[#27003B] dark:text-white uppercase tracking-wide">
            {t('projectDetail.techStack', 'Tech Stack')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {(details.tech || []).map(tItem => (
              <span
                key={tItem}
                className={`text-xs font-bold px-4 py-1.5 rounded-full font-exo-extralight tracking-wide ${a.badge}`}
              >
                {tItem}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className={`h-px bg-gradient-to-r ${a.gradient} opacity-30`} />

        {/* Key Features */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="font-exo-medium text-lg font-extrabold text-[#27003B] dark:text-white uppercase tracking-wide">
              {t('projectDetail.keyFeatures', 'Key Features')}
            </h2>
            {details.features && details.features.length > 0 && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-exo-extralight">
                {details.features.length} {t('projectDetail.highlights', 'Highlights')}
              </span>
            )}
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(details.features || []).map((f, i) => {
              let title = '';
              let fStyle = details.featureStyle || 'dot';
              let subtitles = [];

              if (typeof f === 'object' && f !== null) {
                title = f.title || '';
                fStyle = f.style || details.featureStyle || 'dot';
                if (Array.isArray(f.subtitles)) {
                  subtitles = f.subtitles.map(s => {
                    if (typeof s === 'string') return { text: s, style: 'dot' };
                    return { text: s?.text || '', style: s?.style || 'dot' };
                  }).filter(s => s.text);
                } else if (f.subtitle) {
                  subtitles = [{ text: f.subtitle, style: 'dot' }];
                }
              } else if (typeof f === 'string') {
                const parts = f.split(' — ');
                title = parts[0].trim();
                fStyle = details.featureStyle || 'dot';
                if (parts.length > 1) {
                  subtitles = [{ text: parts.slice(1).join(' — ').trim(), style: 'dot' }];
                }
              }

              if (!title && subtitles.length === 0) return null;

              const isNumberStyle = fStyle === 'number';

              return (
                <li
                  key={i}
                  className={`group relative flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${a.border} bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm font-exo-extralight`}
                >
                  {/* Number badge or glowing dot */}
                  {isNumberStyle ? (
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 font-dm shadow-sm ${a.badge} border ${a.border}`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  ) : (
                    <span
                      className={`mt-2 w-2.5 h-2.5 rounded-full shrink-0 shadow-sm ${a.dot} ring-4 ring-current/10`}
                      aria-hidden
                    />
                  )}

                  {/* Content */}
                  <div className="flex flex-col gap-2 min-w-0 flex-1">
                    {title && (
                      <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100 leading-snug">
                        {title}
                      </span>
                    )}

                    {/* Subtitles / Points */}
                    {subtitles.length > 0 && (
                      <div className="flex flex-col gap-1.5">
                        {subtitles.map((sub, sIdx) => {
                          const isSubNumber = sub.style === 'number';
                          return (
                            <div key={sIdx} className="flex items-start gap-2">
                              {isSubNumber ? (
                                <span className="text-[11px] font-bold font-mono text-zinc-400 dark:text-zinc-500 shrink-0 mt-0.5">
                                  {sIdx + 1}.
                                </span>
                              ) : (
                                <span className="text-[14px] leading-none text-zinc-400 dark:text-zinc-500 shrink-0 mt-0.5">
                                  •
                                </span>
                              )}
                              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                {sub.text}
                              </p>
                            </div>
                          );
                        })}
                      </div>
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
          <h2 className="font-exo-medium text-lg font-extrabold text-[#27003B] dark:text-white uppercase tracking-wide">
            {t('projectDetail.otherProjects', 'Other Projects')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {related.map(rp => {
              const ra = a;
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
                      className={`text-[10px] font-bold uppercase tracking-widest font-exo-extralight ${ra.back}`}
                    >
                      {rp.tag}
                    </span>
                    <span className="text-sm font-extrabold text-[#27003B] dark:text-white uppercase font-exo-medium truncate">
                      {rp.title}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight line-clamp-2">
                      {truncateWords(rp.description, 20)}
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
            <h3 className="font-exo-medium text-base font-extrabold text-[#27003B] dark:text-white uppercase tracking-wide">
              {t('projectDetail.likeWhatYouSee', 'Like What You See?')}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-exo-extralight">
              {t('projectDetail.buildTogether', "Let's build something amazing together.")}
            </p>
          </div>
          <Link
            href="/contact"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold uppercase tracking-widest font-exo-extralight shadow-lg transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95 shrink-0 ${a.btn}`}
          >
            {t('projectDetail.startProject', 'Start a Project')}
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
  );
}
