'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '@/components/i18n';
import {
  FiArrowRight,
  FiCheckCircle,
  FiLayout,
  FiCode,
  FiCloud,
  FiLock,
  FiZap,
  FiUsers,
  FiRefreshCw,
  FiMonitor,
  FiDatabase,
  FiChevronDown,
  FiCpu,
  FiShield,
  FiTrendingUp,
  FiLayers,
} from 'react-icons/fi';

const featureMeta = [
  {
    icon: <FiLayout size={24} />,
    lightBg: 'bg-violet-50 dark:bg-violet-950/80',
    iconColor: 'text-violet-600 dark:text-violet-400',
    accent: 'from-violet-500 to-indigo-500',
    borderGlow: 'hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-violet-500/15',
  },
  {
    icon: <FiCode size={24} />,
    lightBg: 'bg-cyan-50 dark:bg-cyan-950/80',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    accent: 'from-cyan-500 to-blue-500',
    borderGlow: 'hover:border-cyan-400 dark:hover:border-cyan-600 hover:shadow-cyan-500/15',
  },
  {
    icon: <FiCloud size={24} />,
    lightBg: 'bg-sky-50 dark:bg-sky-950/80',
    iconColor: 'text-sky-600 dark:text-sky-400',
    accent: 'from-sky-500 to-cyan-500',
    borderGlow: 'hover:border-sky-400 dark:hover:border-sky-600 hover:shadow-sky-500/15',
  },
  {
    icon: <FiLock size={24} />,
    lightBg: 'bg-green-50 dark:bg-green-950/80',
    iconColor: 'text-green-600 dark:text-green-400',
    accent: 'from-green-600 to-emerald-500',
    borderGlow: 'hover:border-green-400 dark:hover:border-green-600 hover:shadow-green-500/15',
  },
  {
    icon: <FiZap size={24} />,
    lightBg: 'bg-amber-50 dark:bg-amber-950/80',
    iconColor: 'text-amber-600 dark:text-amber-400',
    accent: 'from-amber-500 to-orange-500',
    borderGlow: 'hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-amber-500/15',
  },
  {
    icon: <FiUsers size={24} />,
    lightBg: 'bg-pink-50 dark:bg-pink-950/80',
    iconColor: 'text-pink-600 dark:text-pink-400',
    accent: 'from-pink-500 to-rose-500',
    borderGlow: 'hover:border-pink-400 dark:hover:border-pink-600 hover:shadow-pink-500/15',
  },
  {
    icon: <FiRefreshCw size={24} />,
    lightBg: 'bg-teal-50 dark:bg-teal-950/80',
    iconColor: 'text-teal-600 dark:text-teal-400',
    accent: 'from-teal-500 to-cyan-500',
    borderGlow: 'hover:border-teal-400 dark:hover:border-teal-600 hover:shadow-teal-500/15',
  },
  {
    icon: <FiMonitor size={24} />,
    lightBg: 'bg-indigo-50 dark:bg-indigo-950/80',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    accent: 'from-indigo-500 to-violet-500',
    borderGlow: 'hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-indigo-500/15',
  },
  {
    icon: <FiDatabase size={24} />,
    lightBg: 'bg-emerald-50 dark:bg-emerald-950/80',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    accent: 'from-emerald-500 to-teal-500',
    borderGlow: 'hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-emerald-500/15',
  },
];

const fallbackFeatures = [
  {
    title: 'Custom SaaS & Cloud Platforms',
    desc: 'Multi-tenant software architecture with automated user onboarding, subscription billing, and isolated workspaces.',
  },
  {
    title: 'Interactive Real-Time Dashboards',
    desc: 'Real-time metrics, live WebSocket updates, charting, and customizable role-based analytics views.',
  },
  {
    title: 'Scalable REST & GraphQL APIs',
    desc: 'Robust Node.js and Next.js backend services with rate-limiting, Redis caching, and microservices architecture.',
  },
  {
    title: 'Role-Based Access Control (RBAC)',
    desc: 'Granular admin, manager, and user permissions with OAuth 2.0, NextAuth JWT, and session management.',
  },
  {
    title: 'Relational & NoSQL Databases',
    desc: 'High-speed data querying and indexing with PostgreSQL, Prisma, Neon DB, and MongoDB clusters.',
  },
  {
    title: 'Automated CI/CD & DevOps',
    desc: 'Automated unit/integration testing pipelines and blue-green deployments on Vercel and AWS container fleets.',
  },
  {
    title: 'Payment Gateway & Invoicing',
    desc: 'Seamless checkout with Stripe, SSLCommerz, bKash, and automated invoice PDF generation.',
  },
  {
    title: 'Export & Bulk Data Processing',
    desc: 'Background job queues with BullMQ/Redis for Excel/CSV exports, scheduled reports, and batch processing.',
  },
  {
    title: 'Complete 30-Day SLA & Code Handover',
    desc: 'Full repository ownership, environment documentation, and dedicated warranty support after deployment.',
  },
];

const techStack = [
  { label: 'Next.js 16', category: 'Frontend' },
  { label: 'React 19', category: 'Frontend' },
  { label: 'Node.js', category: 'Backend' },
  { label: 'TypeScript', category: 'Language' },
  { label: 'PostgreSQL', category: 'Database' },
  { label: 'Prisma ORM', category: 'Database' },
  { label: 'Redis', category: 'Caching' },
  { label: 'Docker', category: 'Container' },
  { label: 'AWS S3', category: 'Storage' },
  { label: 'NextAuth.js', category: 'Auth' },
  { label: 'Tailwind CSS v4', category: 'Styling' },
  { label: 'Vercel Serverless', category: 'Cloud' },
];

const defaultPlans = [
  {
    name: 'MVP / Startup App',
    price: 'BDT 3500',
    desc: 'Launch your Minimum Viable Product quickly to validate ideas and onboard early users.',
    features: [
      'Authentication & User Profiles',
      'Core CRUD & Business Logic',
      'Admin Management Dashboard',
      'Database Schema & Migrations',
      'Email Notifications Setup',
      '30 Days Technical Warranty',
    ],
    popular: false,
    cta: 'Start MVP Build',
  },
  {
    name: 'Full SaaS / Custom Portal',
    price: 'BDT 1500',
    desc: 'Complete production web application with multi-role permissions and automated workflows.',
    features: [
      'Multi-Role Permissions (RBAC)',
      'Real-Time Charts & Analytics',
      'Payment Gateway (bKash/Nagad/Cards)',
      'Background Task Queue & Exports',
      'API Integration & Webhooks',
      'Cloud Storage & CDN Setup',
      '45 Days Priority Support',
    ],
    popular: true,
    cta: 'Build Custom App',
  },
  {
    name: 'Enterprise Platform',
    price: 'Custom Quote',
    desc: 'High-concurrency systems, microservices, and dedicated engineering for enterprise operations.',
    features: [
      'Microservices / Cloud Architecture',
      'High-Concurrency Redis Caching',
      'Custom Workflow Automations',
      'End-to-End Encryption & Audit Logs',
      'Dedicated CI/CD & DevOps Pipeline',
      'Full Source Code & Architecture Spec',
      '90 Days SLA Support & Training',
    ],
    popular: false,
    cta: 'Consult Enterprise Architect',
  },
];

const defaultFaqs = [
  {
    q: 'What is the typical development timeline for a custom web application?',
    a: 'An MVP usually takes 3–4 weeks, while a comprehensive SaaS or enterprise portal typically takes 5–8 weeks. We deliver weekly demo milestones so you can track real progress.',
  },
  {
    q: 'Will our company own 100% of the source code and intellectual property?',
    a: 'Yes, absolutely. You receive full ownership of the GitHub repository, database schemas, credentials, and all assets upon project completion.',
  },
  {
    q: 'Can the application scale as our user base grows to millions?',
    a: 'Yes. We architect all applications on cloud-native serverless frameworks (Next.js & PostgreSQL/Redis) capable of auto-scaling seamlessly with zero performance degradation.',
  },
  {
    q: 'How is security and data protection handled?',
    a: 'We implement industry best practices: JWT encryption, CSRF protection, SQL injection prevention via Prisma ORM, bcrypt password hashing, and encrypted backups.',
  },
  {
    q: 'Do you provide ongoing maintenance and post-launch updates?',
    a: 'Yes, every project includes 30–90 days of free warranty support, and we also offer flexible monthly maintenance plans for feature iterations.',
  },
];

function arr(t, key) {
  const val = t(key, { returnObjects: true });
  return Array.isArray(val) && val.length > 0 ? val : null;
}

export default function WebAppContent() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);

  const stats = arr(t, 'webApp.stats') || [
    { value: '99.99%', label: 'Cloud Uptime' },
    { value: '10x', label: 'Faster Execution' },
    { value: '100%', label: 'IP Ownership' },
    { value: '24/7', label: 'Monitoring Ready' },
  ];

  const features = arr(t, 'webApp.features.items') || fallbackFeatures;
  const plans = arr(t, 'webApp.pricing.plans') || defaultPlans;
  const faqs = arr(t, 'webApp.faq.items') || defaultFaqs;

  return (
    <main className="text-[#27003B] dark:text-white transition-colors duration-300">
      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Glowing Background Auras */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-30 blur-3xl animate-pulse-glow"
          style={{
            // background: 'radial-gradient(circle, #06b6d4, #7c3aed, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-xs text-zinc-400 font-exo-extralight mb-6"
          >
            <Link href="/" className="hover:text-violet-500 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-violet-500 transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
              Web Applications
            </span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-cyan-100 dark:bg-cyan-950/90 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 uppercase tracking-widest font-exo-extralight mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
            Full-Stack SaaS & Enterprise Applications
          </div>

          <h1 className="font-exo-medium text-4xl sm:text-6xl lg:text-7xl uppercase tracking-wide leading-tight mb-6 text-[#27003B] dark:text-white">
            Custom Web Application{' '}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 bg-clip-text text-transparent animated-gradient-text">
              Development
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto mb-10 font-exo-extralight">
            From high-growth SaaS MVPs to enterprise management portals, we build secure, scalable full-stack applications tailored to your business logic.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/contact?service=Web%20Application%20Development"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white text-sm font-black uppercase tracking-wider font-exo-extralight hover:shadow-xl hover:shadow-cyan-500/25 hover:scale-105 transition-all duration-300"
            >
              <span>Build Your Web App</span>
              <FiArrowRight size={18} />
            </Link>
            <Link
              href="/our-projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-sm font-bold font-exo-extralight text-zinc-800 dark:text-zinc-200 hover:border-cyan-500 hover:text-cyan-600 transition-all duration-300"
            >
              Explore Live Apps
            </Link>
          </div>

          {/* Trust Highlights Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 text-xs font-semibold text-zinc-600 dark:text-zinc-400 font-exo-extralight">
            <div className="flex items-center justify-center gap-1.5">
              <FiShield className="text-emerald-500" />
              <span>Full Source Code Ownership</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FiCpu className="text-cyan-500" />
              <span>Cloud-Native Architecture</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FiLock className="text-violet-500" />
              <span>OWASP Top 10 Security</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FiTrendingUp className="text-amber-500" />
              <span>Auto-Scaling Infrastructure</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Metric Bar ── */}
      <section className="px-4 sm:px-6 pb-20" aria-label="Web app stats">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 backdrop-blur-xl shadow-xl shadow-violet-950/5 card-hover-lift"
            >
              <p className="text-3xl sm:text-4xl font-exo-medium uppercase tracking-wide bg-gradient-to-r from-cyan-500 to-violet-600 bg-clip-text text-transparent mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Key Capabilities (9 Interactive 3D Cards) ── */}
      <section className="px-4 sm:px-6 pb-24" aria-labelledby="features-heading">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase font-exo-extralight mb-3">
              ✦ Engineered for Modern Scale
            </span>
            <h2
              id="features-heading"
              className="font-exo-medium text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
            >
              Enterprise-Grade{' '}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Application Features
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const meta = featureMeta[i] || featureMeta[0];
              return (
                <div
                  key={i}
                  className={`group relative flex flex-col justify-between p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-xl card-hover-lift transition-all duration-300 ${meta.borderGlow}`}
                >
                  <div>
                    {/* Floating Icon */}
                    <div
                      className={`w-14 h-14 rounded-2xl ${meta.lightBg} border border-zinc-200/60 dark:border-zinc-800 flex items-center justify-center ${meta.iconColor} shadow-md mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {meta.icon}
                    </div>

                    <h3 className="font-exo-medium text-xl uppercase tracking-wide text-zinc-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight">
                      {feature.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 font-exo-extralight group-hover:translate-x-1 transition-transform">
                    <span>Cloud Ready</span>
                    <FiCheckCircle size={14} className="text-emerald-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Modern Tech Stack Pills ── */}
      <section className="px-4 sm:px-6 pb-24" aria-label="Technology stack">
        <div className="max-w-[1440px] mx-auto p-10 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-br from-cyan-50/50 via-white to-violet-50/50 dark:from-zinc-900/90 dark:via-zinc-900/60 dark:to-zinc-950 backdrop-blur-2xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase font-exo-extralight mb-2 block">
              ✦ Robust & Resilient Infrastructure
            </span>
            <h3 className="font-exo-medium text-2xl sm:text-4xl uppercase tracking-wide">
              Full-Stack Application Stack
            </h3>
          </div>

          <div className="flex flex-wrap gap-3 justify-center items-center">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-sm hover:border-cyan-500 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600" />
                <span className="text-sm font-bold text-zinc-900 dark:text-white font-exo-extralight">
                  {tech.label}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                  {tech.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Transparent Pricing Plans ── */}
      <section className="px-4 sm:px-6 pb-24" aria-labelledby="pricing-heading">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase font-exo-extralight mb-3">
              ✦ Transparent App Packages
            </span>
            <h2
              id="pricing-heading"
              className="font-exo-medium text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
            >
              Choose Your{' '}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Application Tier
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl transition-all duration-300 card-hover-lift ${plan.popular
                  ? 'border-2 border-cyan-500 bg-gradient-to-b from-cyan-50/80 via-white to-white dark:from-cyan-950/50 dark:via-zinc-900 dark:to-zinc-900 shadow-2xl shadow-cyan-500/20 scale-105 z-10'
                  : 'border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/80 shadow-lg'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-xs font-black uppercase tracking-widest shadow-md">
                    ★ Most Recommended
                  </div>
                )}

                <div>
                  <h3 className="font-exo-medium text-2xl uppercase tracking-wide text-zinc-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight mb-6 min-h-[36px]">
                    {plan.desc}
                  </p>

                  <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="font-exo-medium text-4xl sm:text-5xl uppercase tracking-tight text-cyan-600 dark:text-cyan-400">
                      {plan.price}
                    </span>
                    <span className="text-xs text-zinc-400 font-exo-extralight">/ one-time</span>
                  </div>

                  <ul className="space-y-3.5 mb-10">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300 font-exo-extralight">
                        <FiCheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/contact?service=Web%20Application%20Development&package=${encodeURIComponent(plan.name)}`}
                  className={`w-full py-4 rounded-2xl text-center text-sm font-black uppercase tracking-wider font-exo-extralight transition-all duration-200 ${plan.popular
                    ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white hover:opacity-95 shadow-lg shadow-cyan-500/25'
                    : 'border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 hover:border-cyan-500 hover:text-cyan-600'
                    }`}
                >
                  {plan.cta || 'Get Started Now'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Accordion ── */}
      <section className="px-4 sm:px-6 pb-24" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase font-exo-extralight mb-2 block">
              ✦ Have Questions?
            </span>
            <h2
              id="faq-heading"
              className="font-exo-medium text-3xl sm:text-5xl uppercase tracking-wide"
            >
              Web App Development FAQ
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/80 overflow-hidden shadow-sm transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer gap-4"
                  >
                    <span className="font-exo-medium text-lg uppercase tracking-wide text-zinc-900 dark:text-white">
                      {faq.q}
                    </span>
                    <FiChevronDown
                      size={20}
                      className={`text-cyan-600 dark:text-cyan-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-sm text-zinc-600 dark:text-zinc-400 font-exo-extralight leading-relaxed border-t border-zinc-100 dark:border-zinc-800/80">
                      <p className="pt-4">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA Banner ── */}
      <section className="px-4 sm:px-6 pb-24">
        <div className="relative max-w-[1440px] mx-auto p-10 sm:p-16 rounded-3xl overflow-hidden bg-gradient-to-r from-[#031526] via-[#0b1736] to-[#1d0b38] border border-cyan-500/30 text-white text-center shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-400 font-exo-extralight mb-4">
              ✦ Ready to Turn Your Vision into Reality?
            </span>
            <h2 className="font-exo-medium text-3xl sm:text-5xl lg:text-6xl uppercase tracking-wide mb-6">
              Let's Engineer Your SaaS or Web Application
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 font-exo-extralight leading-relaxed mb-8">
              Discuss architecture, technical stack, timeline, and deliverables directly with our lead full-stack engineers.
            </p>
            <Link
              href="/contact?service=Web%20Application%20Development"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-black text-sm uppercase tracking-wider font-exo-extralight hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
            >
              <span>Request Technical Blueprint</span>
              <FiArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
