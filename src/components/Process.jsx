'use client';

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
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
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
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
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
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
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
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>,
];

const colors = [
  {
    text: 'text-violet-400',
    bg: 'bg-violet-400/10',
    border: 'border-violet-400/20',
    line: 'bg-violet-400',
  },
  {
    text: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20',
    line: 'bg-amber-400',
  },
  {
    text: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/20',
    line: 'bg-cyan-400',
  },
  {
    text: 'text-fuchsia-400',
    bg: 'bg-fuchsia-400/10',
    border: 'border-fuchsia-400/20',
    line: 'bg-fuchsia-400',
  },
];

const fallbackSteps = [
  {
    title: 'Discovery',
    description:
      'We understand your goals, audience, and project requirements in detail.',
  },
  {
    title: 'Design',
    description:
      'We craft beautiful, user-friendly interfaces tailored to your brand.',
  },
  {
    title: 'Build',
    description:
      'We develop your product with clean, scalable, and maintainable code.',
  },
  {
    title: 'Launch',
    description:
      'We deploy, test thoroughly, and launch your product to the world.',
  },
];

export default function Process() {
  const { t } = useTranslation();

  const rawSteps = t('process.steps', { returnObjects: true });
  const steps = Array.isArray(rawSteps) ? rawSteps : fallbackSteps;

  return (
    <section
      aria-labelledby="process-heading"
      itemScope
      itemType="https://schema.org/HowTo"
      className="relative py-10 sm:py-14 bg-transparent overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How MerxoDev Solutions Works',
            description:
              'Our step-by-step process for delivering high-quality digital products.',
            step: fallbackSteps.map((s, i) => ({
              '@type': 'HowToStep',
              position: i + 1,
              name: s.title,
              text: s.description,
            })),
          }),
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[400px] opacity-10 blur-3xl"
        style={{
          // background: 'radial-gradient(ellipse, #06b6d4, transparent 70%)',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-3 mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800 font-exo-extralight uppercase tracking-widest">
            {t('process.badge')}
          </span>
          <h2
            id="process-heading"
            className="font-exo-medium text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
          >
            {t('process.headingStart')}{' '}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              {t('process.headingEnd')}
            </span>
          </h2>
          <p className="max-w-xl text-zinc-500 dark:text-zinc-400 text-base leading-relaxed font-exo-extralight">
            {t('process.subtext')}
          </p>
        </div>

        <ol
          className="relative grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          aria-label="Our development process"
        >
          {steps.map((step, i) => (
            <li
              key={i}
              className="relative flex flex-col items-center text-center gap-3 sm:gap-4 group transition-transform duration-300 hover:-translate-y-1 p-2 sm:p-0"
              itemProp="step"
              itemScope
              itemType="https://schema.org/HowToStep"
            >
              <meta itemProp="position" content={String(i + 1)} />
              <meta itemProp="name" content={step.title} />

              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  aria-hidden
                  className={`hidden lg:block absolute top-9 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px ${colors[i].line} opacity-30 group-hover:opacity-70 transition-opacity`}
                />
              )}

              {/* Icon */}
              <div
                className={`relative w-13 h-13 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center ${colors[i].bg} border ${colors[i].border} ${colors[i].text} shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm`}
              >
                {icons[i]}
                <span
                  aria-hidden
                  className={`absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black font-exo-medium text-white ${colors[i].line} shadow-sm`}
                >
                  {i + 1}
                </span>
              </div>

              <div className="flex flex-col gap-1 sm:gap-1.5">
                <h3
                  className={`font-exo-medium text-sm sm:text-lg uppercase tracking-wide ${colors[i].text}`}
                >
                  {step.title}
                </h3>
                <p
                  className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-exo-extralight"
                  itemProp="text"
                >
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
