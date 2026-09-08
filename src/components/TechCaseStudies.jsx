'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FiBookOpen,
  FiArrowUpRight,
  FiZap,
  FiShield,
  FiLayers,
  FiClock,
  FiCheckCircle,
  FiX,
} from 'react-icons/fi';
import '@/components/i18n';

const CASE_STUDIES = [
  {
    id: 'merxomart-scale',
    badge: 'E-Commerce Architecture',
    titleEn: 'Scaling MerxoMart: How We Cut Page Load to 0.7s and Boosted Checkout by 340%',
    titleBn: 'MerxoMart আর্কিটেকচার: কীভাবে ০.৭ সেকেন্ড লোড টাইম ও ৩৪০% সেলস গ্রোথ অর্জন করেছি',
    descEn:
      'A deep dive into Next.js 15 Turbopack, Redis cache layer, and payment gateway optimizations for high-traffic Bangladeshi online retail.',
    descBn:
      'Next.js 15, Redis ক্যাশিং ও বিকাশ/নগদ পেমেন্ট গেটওয়ে ইন্টিগ্রেশনের মাধ্যমে কীভাবে হাই-ট্রাফিক স্টোর স্কেল করা হয়েছে তার কেস স্টাডি।',
    metrics: [
      { label: 'Page Load Speed', value: '0.7s', highlight: true },
      { label: 'Conversion Boost', value: '+340%', highlight: true },
      { label: 'Uptime', value: '99.99%', highlight: false },
    ],
    tags: ['Next.js 15', 'Redis', 'PostgreSQL', 'SSLCommerz', 'Tailwind'],
    readTime: '4 min read',
    date: 'August 2026',
    fullContent: {
      problem:
        'The previous WordPress/WooCommerce site took 4.5+ seconds to load on mobile networks, leading to a 68% cart abandonment rate during flash sales.',
      solution:
        'We migrated the core frontend to Next.js with Server-Side Rendering (SSR) and edge-cached static assets on Vercel. Database queries were indexed with PostgreSQL and frequently accessed catalog items were stored in Redis.',
      result:
        'Lighthouse performance score jumped from 32 to 98/100, page load dropped to 700ms, and mobile checkout conversion increased by 340% in the first 30 days.',
    },
  },
  {
    id: 'taskflow-saas',
    badge: 'Full-Stack SaaS',
    titleEn: 'TaskFlow Pro: Designing a Real-Time Multi-Tenant Workspace with PostgreSQL & WebSockets',
    titleBn: 'TaskFlow Pro: মাল্টি-টেন্যান্ট রিয়েল-টাইম SaaS ওয়ার্কস্পেস আর্কিটেকচার',
    descEn:
      'Building role-based access control (RBAC), live collaborative boards, and automated cron task pipelines for enterprise teams.',
    descBn:
      'রোল-বেসড এক্সেস কন্ট্রোল (RBAC), লাইভ কলাবোরেশন বোর্ড ও অটোমেটেড ক্রন জব দিয়ে তৈরি এন্টারপ্রাইজ SaaS প্ল্যাটফর্ম।',
    metrics: [
      { label: 'Sync Latency', value: '<45ms', highlight: true },
      { label: 'Data Loss', value: '0.00%', highlight: false },
      { label: 'Concurrent Users', value: '10k+', highlight: true },
    ],
    tags: ['React', 'Node.js', 'WebSockets', 'Tailwind', 'JWT Auth'],
    readTime: '5 min read',
    date: 'July 2026',
    fullContent: {
      problem:
        'Teams needed real-time status updates across multiple branches without manual page refreshes or database lock bottlenecks.',
      solution:
        'Implemented bi-directional WebSocket channels with optimistic UI updates on the frontend and row-level security (RLS) policies in PostgreSQL.',
      result:
        'Zero sync conflicts, sub-50ms live updates, and smooth handling of over 10,000 concurrent active sessions.',
    },
  },
  {
    id: 'artspace-design',
    badge: 'UI/UX & Micro-Interactions',
    titleEn: 'ArtSpace Gallery: Crafting 60FPS Micro-Animations Without Hurting Mobile Battery or SEO',
    titleBn: 'ArtSpace Gallery: ৬০FPS প্রিমিয়াম মাইক্রো-অ্যানিমেশন ও আল্ট্রাফাস্ট UI/UX ইঞ্জিনিয়ারিং',
    descEn:
      'How we achieved award-winning interactive design, GPU-accelerated transforms, and high Core Web Vitals rankings simultaneously.',
    descBn:
      'GPU-এক্সিলারেটেড ট্রানজিশন, কাঁচের মতো গ্লাস মরফিজম ও Core Web Vitals ১০০/১০০ স্কোরসহ এক্সক্লুসিভ UI/UX ডেভেলপমেন্ট।',
    metrics: [
      { label: 'Frame Rate', value: '60 FPS', highlight: true },
      { label: 'Lighthouse Score', value: '99/100', highlight: true },
      { label: 'Bounce Rate', value: '-42%', highlight: false },
    ],
    tags: ['GSAP', 'CSS Variables', 'Responsive', 'A11y', 'Figma'],
    readTime: '3 min read',
    date: 'June 2026',
    fullContent: {
      problem:
        'Complex animation libraries often inflate JavaScript bundle sizes and drop frame rates on low-to-mid-range smartphones.',
      solution:
        'Engineered custom CSS transform compositing with hardware acceleration, lazy-loading heavy canvas elements, and zero unnecessary re-renders.',
      result:
        'Buttery smooth 60fps scrolling on both iOS & Android with a total initial JS payload under 85KB.',
    },
  },
];

export default function TechCaseStudies() {
  const { i18n } = useTranslation();
  const [activeStudy, setActiveStudy] = useState(null);
  const isBn = i18n.language === 'bn';

  return (
    <section
      id="case-studies"
      className="py-20 sm:py-28 relative overflow-hidden"
      aria-labelledby="case-studies-heading"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-violet-600/10 dark:bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 dark:bg-violet-950/70 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs font-bold mb-4 tracking-wide">
              <FiBookOpen className="text-violet-600 dark:text-violet-400" />
              <span>{isBn ? 'কেস স্টাডি ও টেকনিক্যাল ইনসাইট' : 'CASE STUDIES & TECH INSIGHTS'}</span>
            </div>

            <h2
              id="case-studies-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight"
            >
              {isBn ? 'বাস্তব প্রজেক্টের ' : 'Real Engineering '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-rose-500 to-cyan-500">
                {isBn ? 'কেস স্টাডি ও ফলাফল' : 'Case Studies & Results'}
              </span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              {isBn
                ? 'আমরা কীভাবে জটিল টেকনিক্যাল চ্যালেঞ্জ সমাধান করি এবং ক্লায়েন্টদের জন্য মেজারেবল ফলাফল তৈরি করি তা দেখে নিন।'
                : 'Explore how we engineer scalable architectures, optimize performance to sub-second load times, and deliver measurable business ROI.'}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 text-xs font-bold text-zinc-500 dark:text-zinc-400">
            <FiZap className="text-amber-500" />
            <span>Proven Engineering Standards</span>
          </div>
        </div>

        {/* Case Studies Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CASE_STUDIES.map((study) => {
            const title = isBn ? study.titleBn : study.titleEn;
            const desc = isBn ? study.descBn : study.descEn;

            return (
              <div
                key={study.id}
                className="group relative rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between hover:border-violet-400 dark:hover:border-violet-700 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-300"
              >
                <div>
                  {/* Top Badge & Metadata */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-violet-50 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 border border-violet-200/60 dark:border-violet-900/60">
                      {study.badge}
                    </span>
                    <span className="text-[11px] text-zinc-400 dark:text-zinc-500 flex items-center gap-1 font-medium">
                      <FiClock size={12} />
                      {study.readTime}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-snug group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light line-clamp-3">
                    {desc}
                  </p>

                  {/* Key Metrics Badges */}
                  <div className="mt-5 grid grid-cols-3 gap-2 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 text-center">
                    {study.metrics.map((metric, i) => (
                      <div key={i} className="min-w-0">
                        <span
                          className={`block text-xs sm:text-sm font-black truncate ${metric.highlight
                              ? 'text-violet-600 dark:text-cyan-400'
                              : 'text-zinc-900 dark:text-zinc-200'
                            }`}
                        >
                          {metric.value}
                        </span>
                        <span className="block text-[9px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Read Full Breakdown Button */}
                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveStudy(study)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 group-hover:text-violet-700 dark:group-hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    <span>{isBn ? 'সম্পূর্ণ কেস স্টাডি পড়ুন' : 'Read Case Study'}</span>
                    <FiArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                  <span className="text-[11px] text-zinc-400 dark:text-zinc-500">{study.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {activeStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-2xl flex flex-col">
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-start justify-between gap-4 bg-zinc-50 dark:bg-zinc-900">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300">
                  {activeStudy.badge}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-snug">
                  {isBn ? activeStudy.titleBn : activeStudy.titleEn}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveStudy(null)}
                className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                aria-label="Close modal"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {/* Challenge */}
              <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                  {isBn ? '১. মূল চ্যালেঞ্জ (Problem)' : '1. The Core Challenge'}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                  {activeStudy.fullContent.problem}
                </p>
              </div>

              {/* Engineering Solution */}
              <div className="p-4 rounded-2xl bg-violet-50/50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-900/40 space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-violet-700 dark:text-violet-400">
                  {isBn ? '২. টেকনিক্যাল সমাধান (Engineering Solution)' : '2. Engineering Solution'}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                  {activeStudy.fullContent.solution}
                </p>
              </div>

              {/* Measurable Results */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  {isBn ? '৩. মেজারেবল ফলাফল (Measurable ROI & Results)' : '3. Measurable ROI & Results'}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                  {activeStudy.fullContent.result}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
