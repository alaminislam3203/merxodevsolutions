'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import '@/components/i18n';

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = timestamp => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatCard({ value, suffix, label, color, index, animate }) {
  const count = useCountUp(value, 2000, animate);
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-2 p-8 rounded-2xl border ${color.border} ${color.bg} text-center card-hover-lift hover:shadow-xl transition-all duration-300 group cursor-default`}
      itemProp="itemListElement"
      itemScope
      itemType="https://schema.org/ListItem"
    >
      <meta itemProp="position" content={String(index + 1)} />
      <meta itemProp="name" content={label} />
      <span
        className={`font-exo-medium text-5xl sm:text-6xl font-black ${color.text}`}
        aria-label={`${count}${suffix} ${label}`}
      >
        {count}
        {suffix}
      </span>
      <span className="text-sm font-exo-extralight font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
        {label}
      </span>
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-2xl opacity-5 blur-xl ${color.glow}`}
      />
    </div>
  );
}

const colors = [
  {
    text: 'text-violet-500',
    bg: 'bg-violet-400/10',
    border: 'border-violet-400/20',
    glow: 'bg-violet-500',
  },
  {
    text: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20',
    glow: 'bg-amber-400',
  },
  {
    text: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/20',
    glow: 'bg-cyan-400',
  },
  {
    text: 'text-fuchsia-400',
    bg: 'bg-fuchsia-400/10',
    border: 'border-fuchsia-400/20',
    glow: 'bg-fuchsia-400',
  },
];

const fallbackStats = [
  { value: 56, suffix: '+', label: 'Projects Completed' },
  { value: 47, suffix: '+', label: 'Happy Clients' },
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
];

export default function Stats() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);

  const rawStats = t('stats.items', { returnObjects: true });
  const stats = Array.isArray(rawStats) ? rawStats : fallbackStats;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimate(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="stats-heading"
      itemScope
      itemType="https://schema.org/ItemList"
      className="relative py-10 sm:py-14 overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'MerxoDev Solutions Achievements',
            itemListElement: fallbackStats.map((s, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: `${s.value}${s.suffix} ${s.label}`,
            })),
          }),
        }}
      />

      {/* Ambient background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{
          // background: 'radial-gradient(circle, #06b6d4, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-25 blur-3xl"
        style={{
          // background: 'radial-gradient(circle, #7c3aed, transparent 70%)',
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] opacity-10 blur-3xl"
        style={{
          // background: 'radial-gradient(ellipse, #7c3aed, transparent 70%)',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-3 mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800 font-exo-extralight uppercase tracking-widest">
            {t('stats.badge')}
          </span>
          <h2
            id="stats-heading"
            className="font-exo-medium text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
          >
            {t('stats.headingStart')}{' '}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              {t('stats.headingEnd')}
            </span>
          </h2>
          <p className="max-w-xl text-zinc-500 dark:text-zinc-400 text-base leading-relaxed font-exo-extralight">
            {t('stats.subtext')}
          </p>
        </div>

        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          aria-label="MerxoDev Solutions statistics"
        >
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              color={colors[i]}
              index={i}
              animate={animate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
