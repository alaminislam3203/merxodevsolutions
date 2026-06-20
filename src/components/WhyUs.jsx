'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '@/components/i18n';

const icons = [
  <svg
    key="1"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>,
  <svg
    key="2"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>,
  <svg
    key="3"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>,
  <svg
    key="4"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
  </svg>,
  <svg
    key="5"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  <svg
    key="6"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>,
];

const colors = [
  {
    text: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20',
  },
  {
    text: 'text-violet-400',
    bg: 'bg-violet-400/10',
    border: 'border-violet-400/20',
  },
  { text: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20' },
  {
    text: 'text-fuchsia-400',
    bg: 'bg-fuchsia-400/10',
    border: 'border-fuchsia-400/20',
  },
  {
    text: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
  },
  { text: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-400/20' },
];

export default function WhyUs() {
  const { t } = useTranslation();
  const reasons = t('whyUs.reasons', { returnObjects: true });

  return (
    <section
      aria-labelledby="why-us-heading"
      itemScope
      itemType="https://schema.org/ItemList"
      className="relative py-24 bg-white dark:bg-zinc-950 overflow-hidden"
    >
      {/* SEO: Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Why Choose MerxoDev Solutions',
            description:
              'Reasons to choose MerxoDev Solutions for your web and app development needs.',
            itemListElement: [
              'Fast Delivery',
              'Clean Code',
              'Reliable Support',
              'Modern Tech Stack',
              'Client-First Approach',
              'Transparent Pricing',
            ].map((name, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name,
            })),
          }),
        }}
      />

      {/* Background Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #06b6d4, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #7c3aed, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800 font-raleway uppercase tracking-widest">
            {t('whyUs.badge')}
          </span>

          <h2
            id="why-us-heading"
            className="font-display text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
          >
            {t('whyUs.headingStart')}{' '}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              {t('whyUs.headingEnd')}
            </span>
          </h2>

          <p className="max-w-xl text-zinc-500 dark:text-zinc-400 text-base leading-relaxed font-raleway">
            {t('whyUs.subtext')}
          </p>
        </div>

        {/* Cards Grid */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          aria-label="Reasons to choose MerxoDev Solutions"
        >
          {reasons.map((reason, i) => (
            <li
              key={i}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className={`group relative flex flex-col gap-4 p-6 rounded-2xl border ${colors[i].border} ${colors[i].bg} hover:scale-[1.02] transition-transform duration-300`}
            >
              <meta itemProp="position" content={String(i + 1)} />
              <meta itemProp="name" content={reason.title} />

              {/* Icon */}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${colors[i].bg} border ${colors[i].border} ${colors[i].text}`}
                aria-hidden="true"
              >
                {icons[i]}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1.5">
                <h3
                  className={`font-display text-lg uppercase tracking-wide ${colors[i].text}`}
                >
                  {reason.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-raleway">
                  {reason.description}
                </p>
              </div>

              {/* Subtle number */}
              <span
                className="absolute top-4 right-5 text-4xl font-black text-zinc-100 dark:text-zinc-800 select-none font-display"
                aria-hidden="true"
              >
                0{i + 1}
              </span>
            </li>
          ))}
        </ul>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-14">
          <Link
            href="/contact"
            aria-label="Start working with MerxoDev Solutions"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25 font-raleway uppercase tracking-widest"
          >
            {t('whyUs.cta')}
          </Link>
        </div>
      </div>
    </section>
  );
}
