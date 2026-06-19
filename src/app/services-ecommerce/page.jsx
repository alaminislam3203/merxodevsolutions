'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '@/components/i18n';
import {
  FiArrowRight,
  FiCheckCircle,
  FiPackage,
  FiCreditCard,
  FiTrendingUp,
  FiSmartphone,
  FiSearch,
  FiBarChart2,
  FiShield,
  FiRefreshCw,
  FiDatabase,
} from 'react-icons/fi';

// ─── Static visual metadata (icons/colors aren't translated, only text is) ──
const featureMeta = [
  {
    icon: <FiPackage size={22} />,
    lightBg: 'bg-cyan-50 dark:bg-cyan-950',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    accent: 'from-cyan-500 to-teal-500',
  },
  {
    icon: <FiCreditCard size={22} />,
    lightBg: 'bg-violet-50 dark:bg-violet-950',
    iconColor: 'text-violet-600 dark:text-violet-400',
    accent: 'from-violet-500 to-indigo-500',
  },
  {
    icon: <FiSmartphone size={22} />,
    lightBg: 'bg-emerald-50 dark:bg-emerald-950',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    icon: <FiShield size={22} />,
    lightBg: 'bg-green-50 dark:bg-green-950',
    iconColor: 'text-green-600 dark:text-green-400',
    accent: 'from-green-600 to-emerald-500',
  },
  {
    icon: <FiSearch size={22} />,
    lightBg: 'bg-blue-50 dark:bg-blue-950',
    iconColor: 'text-blue-600 dark:text-blue-400',
    accent: 'from-blue-500 to-cyan-500',
  },
  {
    icon: <FiBarChart2 size={22} />,
    lightBg: 'bg-amber-50 dark:bg-amber-950',
    iconColor: 'text-amber-600 dark:text-amber-400',
    accent: 'from-amber-500 to-orange-500',
  },
  {
    icon: <FiRefreshCw size={22} />,
    lightBg: 'bg-pink-50 dark:bg-pink-950',
    iconColor: 'text-pink-600 dark:text-pink-400',
    accent: 'from-pink-500 to-rose-500',
  },
  {
    icon: <FiTrendingUp size={22} />,
    lightBg: 'bg-indigo-50 dark:bg-indigo-950',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    accent: 'from-indigo-500 to-violet-500',
  },
  {
    icon: <FiDatabase size={22} />,
    lightBg: 'bg-teal-50 dark:bg-teal-950',
    iconColor: 'text-teal-600 dark:text-teal-400',
    accent: 'from-teal-500 to-cyan-500',
  },
];

// Proper-noun tech labels stay untranslated; only the category is translated
const techStack = [
  { label: 'Next.js 14', category: 'Frontend' },
  { label: 'React', category: 'Frontend' },
  { label: 'Tailwind CSS', category: 'Frontend' },
  { label: 'Node.js', category: 'Backend' },
  { label: 'MongoDB', category: 'Database' },
  { label: 'PostgreSQL', category: 'Database' },
  { label: 'Stripe', category: 'Payments' },
  { label: 'SSLCommerz', category: 'Payments' },
  { label: 'bKash API', category: 'Payments' },
  { label: 'Nagad API', category: 'Payments' },
  { label: 'AWS S3', category: 'Storage' },
  { label: 'Vercel', category: 'Hosting' },
];

const relatedMeta = [
  {
    icon: <FiCreditCard size={20} />,
    href: '/services-payment',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-950',
  },
  {
    icon: <FiTrendingUp size={20} />,
    href: '/services-seo',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950',
  },
  {
    icon: <FiBarChart2 size={20} />,
    href: '/services-dashboard',
    color: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-50 dark:bg-cyan-950',
  },
];

// Safe helper — falls back to [] if a key is missing so the page never crashes
function arr(t, key) {
  const val = t(key, { returnObjects: true });
  return Array.isArray(val) ? val : [];
}

export default function EcommerceContent() {
  const { t } = useTranslation();

  const stats = arr(t, 'ecommerce.stats');
  const features = arr(t, 'ecommerce.features.items');
  const included = arr(t, 'ecommerce.included.items');
  const processSteps = arr(t, 'ecommerce.process.steps');
  const faqs = arr(t, 'ecommerce.faq.items');
  const related = arr(t, 'ecommerce.related.items');

  return (
    <main className="bg-white dark:bg-zinc-950 text-[#27003B] dark:text-white ">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-950 dark:to-teal-950 opacity-50 blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-[11px] text-zinc-400 font-display mb-5"
          >
            <Link href="/" className="hover:text-violet-500 transition-colors">
              {t('ecommerce.breadcrumb.home')}
            </Link>
            <span>/</span>
            <Link
              href="/services"
              className="hover:text-violet-500 transition-colors"
            >
              {t('ecommerce.breadcrumb.services')}
            </Link>
            <span>/</span>
            <span className="text-cyan-500">
              {t('ecommerce.breadcrumb.current')}
            </span>
          </nav>

          <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-raleway mb-4">
            {t('ecommerce.badge')}
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase font-display mb-6 leading-tight">
            {t('ecommerce.heroTitleStart')}{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
              {t('ecommerce.heroTitleHighlight')}
            </span>
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto mb-8">
            {t('ecommerce.heroDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm font-bold font-raleway hover:opacity-90 transition-opacity"
            >
              {t('ecommerce.ctaStartStore')} <FiArrowRight size={16} />
            </Link>
            <Link
              href="/our-projects"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-bold font-raleway hover:border-cyan-300 dark:hover:border-cyan-700 transition-colors"
            >
              {t('ecommerce.ctaViewWork')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="px-6 pb-16" aria-label="E-commerce results">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800"
            >
              <p className="text-3xl font-black font-raleway bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Core Features ── */}
      <section className="px-6 pb-20" aria-labelledby="features-heading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-raleway mb-3">
              {t('ecommerce.features.badge')}
            </span>
            <h2
              id="features-heading"
              className="text-3xl font-black font-raleway"
            >
              {t('ecommerce.features.heading')}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => {
              const meta = featureMeta[i] || featureMeta[0];
              return (
                <div
                  key={i}
                  className="group flex flex-col gap-4 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-cyan-200 dark:hover:border-cyan-800 hover:shadow-lg hover:shadow-cyan-50 dark:hover:shadow-cyan-950 transition-all duration-300"
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${meta.lightBg} flex items-center justify-center ${meta.iconColor} group-hover:bg-gradient-to-br group-hover:${meta.accent} group-hover:text-white transition-all duration-300`}
                  >
                    {meta.icon}
                  </div>
                  <div>
                    <h3 className="font-black font-raleway text-[#27003B] dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors uppercase">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section
        className="px-6 py-16 bg-zinc-50 dark:bg-zinc-900"
        aria-labelledby="included-heading"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-raleway mb-3">
              {t('ecommerce.included.badge')}
            </span>
            <h2
              id="included-heading"
              className="text-3xl font-black font-raleway uppercase"
            >
              {t('ecommerce.included.heading')}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {included.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800"
              >
                <FiCheckCircle size={17} className="text-cyan-500 shrink-0" />
                <span className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="px-6 py-20" aria-labelledby="process-heading">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-raleway mb-3">
              {t('ecommerce.process.badge')}
            </span>
            <h2
              id="process-heading"
              className="text-3xl font-black font-raleway"
            >
              {t('ecommerce.process.heading')}
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {processSteps.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-5 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950"
              >
                <span className="text-3xl font-black font-raleway bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent leading-none shrink-0 w-10">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-black font-raleway text-[#27003B] dark:text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section
        className="px-6 py-16 bg-zinc-50 dark:bg-zinc-900"
        aria-labelledby="tech-heading"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-raleway mb-3">
              {t('ecommerce.tech.badge')}
            </span>
            <h2 id="tech-heading" className="text-3xl font-black font-raleway">
              {t('ecommerce.tech.heading')}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {techStack.map(tech => (
              <span
                key={tech.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-sm font-semibold text-zinc-600 dark:text-zinc-300"
              >
                <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-wider">
                  {t(`ecommerce.tech.categories.${tech.category}`)}
                </span>
                {tech.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 py-20" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-raleway mb-3">
              {t('ecommerce.faq.badge')}
            </span>
            <h2 id="faq-heading" className="text-3xl font-black font-raleway">
              {t('ecommerce.faq.heading')}
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950"
              >
                <h3 className="font-black font-raleway text-[#27003B] dark:text-white mb-2 text-sm">
                  {faq.q}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Services ── */}
      <section
        className="px-6 py-16 bg-zinc-50 dark:bg-zinc-900"
        aria-labelledby="related-heading"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-raleway mb-3">
              {t('ecommerce.related.badge')}
            </span>
            <h2
              id="related-heading"
              className="text-3xl font-black font-raleway"
            >
              {t('ecommerce.related.heading')}
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {related.map((rel, i) => {
              const meta = relatedMeta[i] || relatedMeta[0];
              return (
                <Link
                  key={i}
                  href={meta.href}
                  className="group flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 hover:border-cyan-200 dark:hover:border-cyan-800 transition-all"
                >
                  <span
                    className={`w-9 h-9 rounded-lg ${meta.bg} flex items-center justify-center ${meta.color} shrink-0`}
                  >
                    {meta.icon}
                  </span>
                  <span className="text-sm font-bold font-raleway group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {rel.label}
                  </span>
                  <FiArrowRight
                    size={14}
                    className="ml-auto text-zinc-300 dark:text-zinc-600 group-hover:text-cyan-500 transition-colors"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 p-px">
            <div className="rounded-2xl bg-white dark:bg-zinc-950 px-8 py-12">
              <h2 className="text-2xl font-black font-raleway mb-3">
                {t('ecommerce.cta.heading')}
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
                {t('ecommerce.cta.desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm font-bold font-raleway hover:opacity-90 transition-opacity"
                >
                  {t('ecommerce.cta.getQuote')} <FiArrowRight size={16} />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-bold font-raleway hover:border-cyan-300 dark:hover:border-cyan-700 transition-colors"
                >
                  {t('ecommerce.cta.allServices')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
