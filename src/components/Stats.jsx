'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  FiCode,
  FiUsers,
  FiAward,
  FiStar,
  FiShield,
  FiClock,
  FiHeadphones,
  FiLock,
  FiArrowUpRight,
  FiCheck,
} from 'react-icons/fi';
import '@/components/i18n';

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) {
      setCount(0);
      return;
    }
    let startTime = null;
    let frameId = null;
    const numTarget = typeof target === 'number' ? target : parseFloat(target) || 0;

    const step = timestamp => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic deceleration curve
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * numTarget));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(numTarget);
      }
    };
    frameId = requestAnimationFrame(step);
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [start, target, duration]);
  return count;
}

function StatCard({ stat, color, index, animate, icon: IconComponent }) {
  const count = useCountUp(stat.value, 2200, animate);

  return (
    <div
      className={`relative flex flex-col items-center justify-between gap-2.5 sm:gap-3 p-4 sm:p-7 rounded-2xl border ${color.border} ${color.bg} text-center card-hover-lift hover:shadow-xl transition-all duration-300 group cursor-default`}
      itemProp="itemListElement"
      itemScope
      itemType="https://schema.org/ListItem"
    >
      <meta itemProp="position" content={String(index + 1)} />
      <meta itemProp="name" content={stat.label} />

      {/* Top Icon Badge */}
      <div
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg sm:text-xl transition-transform duration-300 group-hover:scale-110 shadow-sm ${color.iconBg} ${color.iconText}`}
      >
        <IconComponent aria-hidden="true" className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      {/* Animated Number */}
      <div className="flex flex-col items-center gap-0.5 sm:gap-1">
        <span
          className={`font-exo-medium text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight ${color.text}`}
          aria-label={`${count}${stat.suffix} ${stat.label}`}
        >
          {count}
          {stat.suffix}
        </span>
        <span className="text-xs sm:text-base font-exo-medium font-bold text-zinc-800 dark:text-zinc-100 uppercase tracking-wider">
          {stat.label}
        </span>
      </div>

      {/* Micro-Proof Subtext */}
      {stat.microProof && (
        <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight leading-relaxed max-w-[210px] mx-auto">
          {stat.microProof}
        </p>
      )}

      {/* Interactive Micro-Link or Badge */}
      <div className="pt-0.5">
        {stat.href ? (
          <Link
            href={stat.href}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold text-violet-600 dark:text-violet-400 bg-violet-100/60 dark:bg-violet-950/60 hover:bg-violet-200/60 dark:hover:bg-violet-900/60 border border-violet-200/80 dark:border-violet-800/80 transition-all group-hover:translate-x-0.5"
          >
            <span>{stat.actionLabel || 'View Details'}</span>
            <FiArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </Link>
        ) : stat.badge ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <FiCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span>{stat.badge}</span>
          </span>
        ) : null}
      </div>

      {/* Ambient background glow */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-2xl opacity-5 blur-xl transition-opacity duration-300 group-hover:opacity-10 ${color.glow}`}
      />
    </div>
  );
}

const colors = [
  {
    text: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50/60 dark:bg-violet-950/20',
    border: 'border-violet-200/80 dark:border-violet-800/50',
    glow: 'bg-violet-500',
    iconBg: 'bg-violet-100 dark:bg-violet-900/40',
    iconText: 'text-violet-600 dark:text-violet-300',
  },
  {
    text: 'text-amber-500 dark:text-amber-400',
    bg: 'bg-amber-50/60 dark:bg-amber-950/20',
    border: 'border-amber-200/80 dark:border-amber-800/50',
    glow: 'bg-amber-400',
    iconBg: 'bg-amber-100 dark:bg-amber-900/40',
    iconText: 'text-amber-600 dark:text-amber-300',
  },
  {
    text: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-50/60 dark:bg-cyan-950/20',
    border: 'border-cyan-200/80 dark:border-cyan-800/50',
    glow: 'bg-cyan-400',
    iconBg: 'bg-cyan-100 dark:bg-cyan-900/40',
    iconText: 'text-cyan-600 dark:text-cyan-300',
  },
  {
    text: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50/60 dark:bg-emerald-950/20',
    border: 'border-emerald-200/80 dark:border-emerald-800/50',
    glow: 'bg-emerald-400',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/40',
    iconText: 'text-emerald-600 dark:text-emerald-300',
  },
];

const defaultIcons = [FiCode, FiUsers, FiAward, FiStar];

const fallbackStats = [
  {
    value: 65,
    suffix: '+',
    label: 'Projects Completed',
    microProof: 'E-Commerce, SaaS & Custom Portals',
    actionLabel: 'Explore Portfolio',
    href: '/our-projects',
  },
  {
    value: 46,
    suffix: '+',
    label: 'Happy Clients',
    microProof: 'Startups & Growing Businesses',
    badge: '100% Retention',
  },
  {
    value: 4,
    suffix: '+',
    label: 'Years Experience',
    microProof: 'Full-Stack & Cloud Architecture',
    badge: 'Since 2021',
  },
  {
    value: 99,
    suffix: '%',
    label: 'Client Satisfaction',
    microProof: '4.9/5 Average Client Rating',
    actionLabel: 'Read Reviews',
    href: '#testimonials',
  },
];

const defaultGuarantees = [
  {
    icon: FiShield,
    color: 'text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-950/60',
    titleKey: 'stats.guarantees.ipTitle',
    descKey: 'stats.guarantees.ipDesc',
    fallbackTitle: '100% Code & IP Ownership',
    fallbackDesc: 'Full GitHub repository, custom code & database schemas handed over upon launch.',
  },
  {
    icon: FiClock,
    color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950/60',
    titleKey: 'stats.guarantees.deliveryTitle',
    descKey: 'stats.guarantees.deliveryDesc',
    fallbackTitle: 'On-Time Sprint Delivery',
    fallbackDesc: 'Milestone-driven agile execution with regular staging demos and zero project delays.',
  },
  {
    icon: FiHeadphones,
    color: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60',
    titleKey: 'stats.guarantees.supportTitle',
    descKey: 'stats.guarantees.supportDesc',
    fallbackTitle: '24/7 Dedicated Support',
    fallbackDesc: 'Direct communication with senior engineers and 30-day post-launch warranty.',
  },
  {
    icon: FiLock,
    color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60',
    titleKey: 'stats.guarantees.securityTitle',
    descKey: 'stats.guarantees.securityDesc',
    fallbackTitle: 'Enterprise-Grade Security',
    fallbackDesc: 'OWASP standards, bcrypt salted hashing, and resilient cloud architecture.',
  },
];

export default function Stats() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);

  const rawStats = t('stats.items', { returnObjects: true });
  const stats = Array.isArray(rawStats) && rawStats.length === 4 ? rawStats : fallbackStats;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimate(true);
      },
      { threshold: 0.25 },
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
      className="relative py-12 sm:py-16 overflow-hidden"
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
        className="pointer-events-none absolute top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-15 blur-3xl bg-cyan-400/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl bg-violet-600/20"
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center gap-3 mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800 font-exo-extralight uppercase tracking-widest">
            {t('stats.badge', 'PROVEN TRACK RECORD')}
          </span>
          <h2
            id="stats-heading"
            className="font-exo-medium text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
          >
            {t('stats.headingStart', 'Numbers That')}{' '}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              {t('stats.headingEnd', 'Speak For Themselves')}
            </span>
          </h2>
          <p className="max-w-xl text-zinc-500 dark:text-zinc-400 text-base leading-relaxed font-exo-extralight">
            {t(
              'stats.subtext',
              'Proven engineering excellence and delivered digital solutions across Bangladesh and international markets.',
            )}
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6"
          aria-label="MerxoDev Solutions statistics"
        >
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              stat={stat}
              color={colors[i % colors.length]}
              index={i}
              animate={animate}
              icon={defaultIcons[i % defaultIcons.length]}
            />
          ))}
        </div>

        {/* Trust Guarantee Bar (ট্রাস্ট গ্যারান্টি বার) */}
        <div className="mt-10 sm:mt-12 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-b from-white/80 to-zinc-50/80 dark:from-[#0d1222]/80 dark:to-[#070b16]/80 backdrop-blur-md p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-6 border-b border-zinc-200/70 dark:border-zinc-800/70 mb-6 text-center sm:text-left">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 border border-violet-200/80 dark:border-violet-800/80">
                <FiShield className="w-3.5 h-3.5" />
                {t('stats.guarantees.badge', 'MerxoDev Client Guarantee')}
              </span>
              <h3 className="text-lg sm:text-xl font-exo-medium font-bold text-zinc-900 dark:text-white mt-1.5">
                {t('stats.guarantees.title', 'Our Commitment to Quality & Trust')}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-exo-extralight max-w-sm text-center sm:text-right">
              {t(
                'stats.guarantees.pillText',
                'Zero vendor lock-in • 100% production transparency • Dedicated SLA',
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {defaultGuarantees.map((item, idx) => {
              const GuaranteeIcon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-zinc-100/60 dark:hover:bg-zinc-900/40 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}
                  >
                    <GuaranteeIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-exo-medium font-bold text-zinc-900 dark:text-white">
                      {t(item.titleKey, item.fallbackTitle)}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight mt-1 leading-relaxed">
                      {t(item.descKey, item.fallbackDesc)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
