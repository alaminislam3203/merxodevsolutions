'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import {
  FiGlobe,
  FiShoppingCart,
  FiCode,
  FiLayout,
  FiLink,
  FiShield,
  FiCreditCard,
  FiDatabase,
  FiTool,
  FiTrendingUp,
  FiCpu,
  FiMonitor,
  FiPackage,
  FiArrowRight,
  FiCheckCircle,
} from 'react-icons/fi';
import '@/components/i18n';

const SERVICE_STYLES = [
  {
    icon: <FiGlobe size={18} />,
    image: '/services/web.png',
    accent: 'from-violet-600 to-indigo-600',
    lightBg: 'bg-violet-50 dark:bg-violet-950/80',
    iconColor: 'text-violet-600 dark:text-violet-400',
    glowColor: 'hover:shadow-violet-500/20 hover:border-violet-400 dark:hover:border-violet-500',
    defaultHref: '/services-web',
  },
  {
    icon: <FiShoppingCart size={18} />,
    image: '/services/ecommerce.png',
    accent: 'from-cyan-500 to-teal-500',
    lightBg: 'bg-cyan-50 dark:bg-cyan-950/80',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    glowColor: 'hover:shadow-cyan-500/20 hover:border-cyan-400 dark:hover:border-cyan-500',
    defaultHref: '/services-ecommerce',
  },
  {
    icon: <FiCode size={18} />,
    image: '/services/web-app.png',
    accent: 'from-indigo-500 to-violet-600',
    lightBg: 'bg-indigo-50 dark:bg-indigo-950/80',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    glowColor: 'hover:shadow-indigo-500/20 hover:border-indigo-400 dark:hover:border-indigo-500',
    defaultHref: '/services-web-app',
  },
  {
    icon: <FiLayout size={18} />,
    image: '/services/design.png',
    accent: 'from-pink-500 to-rose-500',
    lightBg: 'bg-pink-50 dark:bg-pink-950/80',
    iconColor: 'text-pink-600 dark:text-pink-400',
    glowColor: 'hover:shadow-pink-500/20 hover:border-pink-400 dark:hover:border-pink-500',
    defaultHref: '/services-design',
  },
  {
    icon: <FiLink size={18} />,
    image: '/services/api.png',
    accent: 'from-amber-500 to-orange-500',
    lightBg: 'bg-amber-50 dark:bg-amber-950/80',
    iconColor: 'text-amber-600 dark:text-amber-400',
    glowColor: 'hover:shadow-amber-500/20 hover:border-amber-400 dark:hover:border-amber-500',
    defaultHref: '/services-api-integration',
  },
  {
    icon: <FiDatabase size={18} />,
    image: '/services/database.png',
    accent: 'from-blue-600 to-cyan-500',
    lightBg: 'bg-blue-50 dark:bg-blue-950/80',
    iconColor: 'text-blue-600 dark:text-blue-400',
    glowColor: 'hover:shadow-blue-500/20 hover:border-blue-400 dark:hover:border-blue-500',
    defaultHref: '/services-database',
  },
  {
    icon: <FiTool size={18} />,
    image: '/services/maintenance.png',
    accent: 'from-slate-600 to-zinc-500',
    lightBg: 'bg-slate-50 dark:bg-slate-900/80',
    iconColor: 'text-slate-600 dark:text-slate-400',
    glowColor: 'hover:shadow-slate-500/20 hover:border-slate-400 dark:hover:border-slate-500',
    defaultHref: '/services-maintenance',
  },
  {
    icon: <FiTrendingUp size={18} />,
    image: '/services/seo.png',
    accent: 'from-emerald-500 to-teal-500',
    lightBg: 'bg-emerald-50 dark:bg-emerald-950/80',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    glowColor: 'hover:shadow-emerald-500/20 hover:border-emerald-400 dark:hover:border-emerald-500',
    defaultHref: '/services-seo',
  },
  {
    icon: <FiCpu size={18} />,
    image: '/services/automation.png',
    accent: 'from-orange-500 to-amber-500',
    lightBg: 'bg-orange-50 dark:bg-orange-950/80',
    iconColor: 'text-orange-600 dark:text-orange-400',
    glowColor: 'hover:shadow-orange-500/20 hover:border-orange-400 dark:hover:border-orange-500',
    defaultHref: '/services-automation',
  },
  {
    icon: <FiMonitor size={18} />,
    image: '/services/dashboard.png',
    accent: 'from-cyan-600 to-violet-600',
    lightBg: 'bg-cyan-50 dark:bg-cyan-950/80',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    glowColor: 'hover:shadow-cyan-500/20 hover:border-cyan-400 dark:hover:border-cyan-500',
    defaultHref: '/services-dashboard',
  },
  {
    icon: <FiCreditCard size={18} />,
    image: '/services/payment-gateway.png',
    accent: 'from-violet-500 to-cyan-500',
    lightBg: 'bg-violet-50 dark:bg-violet-950/80',
    iconColor: 'text-violet-600 dark:text-violet-400',
    glowColor: 'hover:shadow-violet-500/20 hover:border-violet-400 dark:hover:border-violet-500',
    defaultHref: '/services-payment-gateway',
  },
  {
    icon: <FiPackage size={18} />,
    image: '/services/plugin.png',
    accent: 'from-indigo-600 via-purple-600 to-pink-500',
    lightBg: 'bg-indigo-50 dark:bg-indigo-950/80',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    glowColor: 'hover:shadow-indigo-500/20 hover:border-indigo-400 dark:hover:border-indigo-500',
    defaultHref: '/services-plugin-development',
  },
];

const STYLE_MAP = {
  '/services-web': SERVICE_STYLES[0],
  '/services-ecommerce': SERVICE_STYLES[1],
  '/services-web-app': SERVICE_STYLES[2],
  '/services-design': SERVICE_STYLES[3],
  '/services-api-integration': SERVICE_STYLES[4],
  '/services-database': SERVICE_STYLES[5],
  '/services-maintenance': SERVICE_STYLES[6],
  '/services-seo': SERVICE_STYLES[7],
  '/services-automation': SERVICE_STYLES[8],
  '/services-dashboard': SERVICE_STYLES[9],
  '/services-payment-gateway': SERVICE_STYLES[10],
  '/services-plugin-development': SERVICE_STYLES[11],
};

export default function ServicesClient() {
  const { t } = useTranslation();
  const servicesData = t('servicesPage.services', { returnObjects: true }) || [];
  const whyUsData = t('servicesPage.whyUs', { returnObjects: true }) || [];

  return (
    <main className="relative text-[#27003B] dark:text-white overflow-hidden">
      {/* Background Ambient Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/4 w-[700px] h-[500px] rounded-full opacity-25 blur-3xl animate-pulse-glow"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -right-32 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl animate-pulse-glow"
        style={{
          animationDelay: '3s',
        }}
      />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="animate-fade-in-down inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 uppercase tracking-widest font-exo-extralight mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
            {t('servicesPage.heroBadge')}
          </span>

          <h1 className="animate-fade-in-up text-xl sm:text-6xl lg:text-3xl font-extrabold tracking-wide font-exo-medium mb-0 leading-tight uppercase">
            {t('servicesPage.heroTitleStart')}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent animated-gradient-text">
              {t('servicesPage.heroTitleHighlight')}
            </span>
          </h1>

          <p className="animate-fade-in-up text-base sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl mx-auto mb-5 font-exo-extralight">
            {t('servicesPage.heroSubtitle')}
          </p>

          <div className="animate-fade-in-up flex items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 via-violet-700 to-cyan-500 text-white text-sm font-bold font-exo-extralight uppercase tracking-wider hover:opacity-95 hover:scale-105 transition-all shadow-xl shadow-violet-500/25 group"
            >
              <span>{t('servicesPage.startProjectBtn')}</span>
              <FiArrowRight
                size={16}
                className="group-hover:translate-x-1.5 transition-transform"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="relative px-3 sm:px-6 pb-24 z-10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
          {Array.isArray(servicesData) &&
            servicesData.map((service, index) => {
              const targetHref = service.href || SERVICE_STYLES[index]?.defaultHref || '/services';
              const style = STYLE_MAP[targetHref] || SERVICE_STYLES[index] || SERVICE_STYLES[0];

              return (
                <Link
                  key={service.title || index}
                  href={targetHref}
                  className={`group relative flex flex-col justify-between p-3.5 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm card-hover-lift hover:shadow-2xl ${style.glowColor} transition-all duration-300 overflow-hidden`}
                  style={{
                    animationDelay: `${(index % 4) * 100}ms`,
                  }}
                >
                  {/* Top Accent Gradient Bar on Hover */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${style.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  <div>
                    {/* Illustration Showcase Card Header */}
                    <div className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50/50 dark:from-zinc-950/70 dark:via-zinc-900/60 dark:to-zinc-950/90 p-2 sm:p-3 mb-3 sm:mb-4 border border-zinc-200/70 dark:border-zinc-800/70 flex items-center justify-center group-hover:border-violet-500/40 transition-all duration-300 shadow-sm">
                      {/* Subtle hover gradient glow */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-tr ${style.accent} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      />

                      <Image
                        src={style.image}
                        alt={service.title}
                        width={400}
                        height={400}
                        className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-108 transition-transform duration-500 ease-out"
                        priority={index < 4}
                      />

                      {/* Floating Mini Icon Badge */}
                      <div
                        className={`absolute top-2 left-2 sm:top-3 sm:left-3 w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl ${style.lightBg} ${style.iconColor} flex items-center justify-center shadow-md backdrop-blur-md border border-white/60 dark:border-zinc-800/80 group-hover:scale-110 transition-transform`}
                      >
                        <span className="scale-75 sm:scale-100">{style.icon}</span>
                      </div>
                    </div>

                    {/* Title & Desc with Hover Slide */}
                    <div className="flex flex-col gap-1.5 sm:gap-2.5">
                      <h2 className="text-sm sm:text-base lg:text-lg font-extrabold font-exo-extralight text-[#27003B] dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 group-hover:translate-x-0.5 sm:group-hover:translate-x-1 transition-all duration-200 flex items-center justify-between gap-1 leading-snug">
                        <span>{service.title}</span>
                        <FiArrowRight
                          size={16}
                          className="text-violet-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 shrink-0 hidden sm:block"
                        />
                      </h2>
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors line-clamp-2 sm:line-clamp-3">
                        {service.desc}
                      </p>
                    </div>
                  </div>

                  {/* Highlights Chips with Staggered Hover Effect */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-3 sm:mt-5 pt-3 sm:pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                    {Array.isArray(service.highlights) &&
                      service.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-[9px] sm:text-[11px] font-bold font-exo-extralight px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:bg-violet-50 dark:group-hover:bg-violet-950/60 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-all duration-200"
                        >
                          {h}
                        </span>
                      ))}
                  </div>
                </Link>
              );
            })}
        </div>
      </section>

      {/* ── Why Clients Choose Us ── */}
      <section className="relative px-6 py-20 border-y border-zinc-200/80 dark:border-zinc-800/80">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-widest font-exo-extralight mb-3">
              {t('servicesPage.whyBadge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-exo-medium uppercase tracking-wide text-[#27003B] dark:text-white">
              {t('servicesPage.whyTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.isArray(whyUsData) &&
              whyUsData.map((item, idx) => (
                <div
                  key={idx}
                  className="group flex flex-col gap-2 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm card-hover-lift hover:border-violet-400 dark:hover:border-violet-600 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <FiCheckCircle size={18} />
                    </div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white font-exo-extralight">
                      {item.text}
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight pl-11">
                    {item.subtitle}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative card-hover-lift">
            <div className="px-8 py-14 sm:px-12">
              <span className="inline-block text-[11px] font-bold tracking-widest text-amber-500 uppercase font-exo-extralight mb-3">
                {t('servicesPage.ctaBadge')}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-exo-medium uppercase tracking-wide mb-4 text-[#27003B] dark:text-white">
                {t('servicesPage.ctaTitle')}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto font-exo-extralight">
                {t('servicesPage.ctaDesc')}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-bold font-exo-extralight uppercase tracking-wider hover:opacity-95 hover:scale-105 transition-all shadow-xl shadow-violet-500/25 group"
              >
                <span>{t('servicesPage.talkToUsBtn')}</span>
                <FiArrowRight
                  size={16}
                  className="group-hover:translate-x-1.5 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
