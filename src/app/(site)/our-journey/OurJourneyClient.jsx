'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import {
  FiFlag,
  FiUsers,
  FiCode,
  FiStar,
  FiGlobe,
  FiTrendingUp,
  FiAward,
  FiHeart,
  FiArrowRight,
  FiCheckCircle,
  FiZap,
  FiTarget,
} from 'react-icons/fi';

const milestoneMeta = [
  {
    icon: <FiFlag size={20} />,
    color: 'from-violet-600 to-indigo-600',
    lightBg: 'bg-violet-50 dark:bg-violet-950',
    iconColor: 'text-violet-600 dark:text-violet-400',
  },
  {
    icon: <FiUsers size={20} />,
    color: 'from-cyan-500 to-teal-500',
    lightBg: 'bg-cyan-50 dark:bg-cyan-950',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
  },
  {
    icon: <FiCode size={20} />,
    color: 'from-pink-500 to-rose-500',
    lightBg: 'bg-pink-50 dark:bg-pink-950',
    iconColor: 'text-pink-600 dark:text-pink-400',
  },
  {
    icon: <FiStar size={20} />,
    color: 'from-amber-500 to-orange-500',
    lightBg: 'bg-amber-50 dark:bg-amber-950',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    icon: <FiGlobe size={20} />,
    color: 'from-blue-600 to-cyan-500',
    lightBg: 'bg-blue-50 dark:bg-blue-950',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    icon: <FiTrendingUp size={20} />,
    color: 'from-emerald-500 to-teal-500',
    lightBg: 'bg-emerald-50 dark:bg-emerald-950',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    icon: <FiAward size={20} />,
    color: 'from-violet-600 to-pink-500',
    lightBg: 'bg-violet-50 dark:bg-violet-950',
    iconColor: 'text-violet-600 dark:text-violet-400',
  },
  {
    icon: <FiZap size={20} />,
    color: 'from-cyan-500 to-blue-600',
    lightBg: 'bg-cyan-50 dark:bg-cyan-950',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
  },
];

const visionIcons = [
  <FiTarget key="target" size={22} />,
  <FiGlobe key="globe" size={22} />,
  <FiHeart key="heart" size={22} />,
];

export default function OurJourneyClient() {
  const { t } = useTranslation();

  const rawNumbers = t('ourJourney.numbers', { returnObjects: true }) || [];
  const numbers = Array.isArray(rawNumbers) && rawNumbers.length === 4
    ? rawNumbers
    : [
        { value: '3+', label: 'Years Active' },
        { value: '56+', label: 'Projects Done' },
        { value: '47+', label: 'Happy Clients' },
        { value: '3', label: 'Countries Served' },
      ];

  const rawMilestones = t('ourJourney.milestones', { returnObjects: true }) || [];
  const milestones = Array.isArray(rawMilestones) && rawMilestones.length > 0
    ? rawMilestones.map((m, idx) => ({
        ...m,
        ...(milestoneMeta[idx] || milestoneMeta[0]),
      }))
    : [];

  const rawVision = t('ourJourney.visionItems', { returnObjects: true }) || [];
  const vision = Array.isArray(rawVision) && rawVision.length === 3
    ? rawVision.map((v, idx) => ({ ...v, icon: visionIcons[idx] }))
    : [
        {
          icon: visionIcons[0],
          title: 'Our Mission',
          desc: 'Make premium software development accessible to businesses of every size — not just the ones with big budgets.',
        },
        {
          icon: visionIcons[1],
          title: 'Our Vision',
          desc: 'Become the most trusted digital partner for growing businesses across South Asia.',
        },
        {
          icon: visionIcons[2],
          title: 'Our Promise',
          desc: 'Every project we take on gets our full attention, honest communication, and code we are proud to put our name on.',
        },
      ];

  const rawLessons = t('ourJourney.lessons', { returnObjects: true }) || [];
  const lessons = Array.isArray(rawLessons) && rawLessons.length > 0
    ? rawLessons
    : [
        'Communication beats code quality when clients are concerned.',
        'A slow, right solution beats a fast, broken one every time.',
        'Small teams move faster — and care more.',
        'The best clients come from referrals, not ads.',
        'Saying no to the wrong project saves everyone time.',
        'Consistency over time is the only real growth strategy.',
      ];

  return (
    <main className="text-[#27003B] dark:text-white">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full dark:from-violet-950 dark:to-cyan-950 opacity-40 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-exo-extralight mb-4">
            {t('ourJourney.heroBadge')}
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight font-exo-extralight mb-6 leading-tight">
            {t('ourJourney.heroTitleStart')}{' '}
            <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
              {t('ourJourney.heroTitleHighlight')}
            </span>
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto">
            {t('ourJourney.heroDesc')}
          </p>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="px-6 pb-16">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {numbers.map(n => (
            <div
              key={n.label}
              className="flex flex-col items-center gap-1.5 py-7 px-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800"
            >
              <span className="text-3xl font-black font-exo-extralight bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                {n.value}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 text-center font-medium">
                {n.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="px-6 py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-exo-extralight mb-3">
              {t('ourJourney.timelineBadge')}
            </span>
            <h2 className="text-3xl font-black font-exo-extralight">
              {t('ourJourney.timelineTitle')}
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 -translate-x-1/2" />

            <div className="flex flex-col gap-10">
              {milestones.map((m, i) => (
                <div
                  key={m.title}
                  className={`relative flex gap-6 md:gap-0 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ${
                      i % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:pl-10'
                    } pl-14 md:pl-0`}
                  >
                    <div
                      className={`inline-flex items-center gap-2 mb-3 ${
                        i % 2 === 0 ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      <span className="text-[11px] font-bold tracking-widest text-amber-400 uppercase font-exo-extralight">
                        {m.year} · {m.quarter}
                      </span>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 hover:border-violet-200 dark:hover:border-violet-800 transition-colors">
                      <h3 className="font-black font-exo-extralight text-[#27003B] dark:text-white mb-2">
                        {m.title}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">
                        {m.desc}
                      </p>
                      {m.tags && (
                        <div className={`flex flex-wrap gap-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                          {m.tags.map(tag => (
                            <span
                              key={tag}
                              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${m.lightBg} ${m.iconColor}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-8 z-10">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-white shadow-md`}
                    >
                      {m.icon}
                    </div>
                  </div>

                  {/* Empty half for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision / Mission ── */}
      <section className="px-6 py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-exo-extralight mb-3">
              {t('ourJourney.visionBadge')}
            </span>
            <h2 className="text-3xl font-black font-exo-extralight">
              {t('ourJourney.visionTitle')}
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {vision.map(v => (
              <div
                key={v.title}
                className="flex flex-col gap-4 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-violet-200 dark:hover:border-violet-800 transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-violet-50 dark:bg-violet-950 flex items-center justify-center text-violet-600 dark:text-violet-400 group-hover:bg-gradient-to-br group-hover:from-violet-600 group-hover:to-cyan-500 group-hover:text-white transition-all">
                  {v.icon}
                </div>
                <div>
                  <h3 className="font-black font-exo-extralight text-[#27003B] dark:text-white mb-1.5">
                    {v.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Learned ── */}
      <section className="px-6 py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-exo-extralight mb-3">
              {t('ourJourney.lessonsBadge')}
            </span>
            <h2 className="text-3xl font-black font-exo-extralight">
              {t('ourJourney.lessonsTitle')}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {lessons.map(lesson => (
              <div
                key={lesson}
                className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800"
              >
                <FiCheckCircle
                  size={17}
                  className="text-violet-500 shrink-0 mt-0.5"
                />
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {lesson}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-px">
            <div className="rounded-2xl px-8 py-12">
              <h2 className="text-2xl font-black font-exo-extralight mb-3">
                {t('ourJourney.ctaTitle')}
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
                {t('ourJourney.ctaDesc')}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-bold font-exo-extralight hover:opacity-90 transition-opacity"
              >
                {t('ourJourney.startProjectBtn')} <FiArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
