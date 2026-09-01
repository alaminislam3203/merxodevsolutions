import Link from 'next/link';
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
  FiArrowRight,
  FiCheckCircle,
} from 'react-icons/fi';

export const metadata = {
  title: 'Our Services – MerxoDev Solutions',
  description:
    'MerxoDev Solutions offers professional web development, e-commerce, UI/UX design, API integration, payment gateway, SEO, and more. Custom digital solutions built for your business.',
  keywords: [
    'web development Bangladesh',
    'e-commerce development',
    'custom web application',
    'UI UX design',
    'API integration',
    'payment gateway integration',
    'SEO optimization Bangladesh',
    'admin dashboard development',
    'MerxoDev Solutions services',
  ],
  openGraph: {
    title: 'Our Services – MerxoDev Solutions',
    description:
      'Professional web, mobile, and cloud services from a trusted Bangladesh-based dev team.',
    url: 'https://merxodevsolutions.pro.bd/services',
  },
};

const services = [
  {
    icon: <FiGlobe size={26} />,
    title: 'Website Development',
    desc: 'Fast, responsive, and SEO-ready websites built with Next.js and React. From landing pages to full multi-page business sites — clean code, real performance.',
    highlights: [
      'Next.js & React',
      'Mobile Responsive',
      'Lightning Fast',
      'SEO Ready',
    ],
    accent: 'from-violet-600 to-indigo-600',
    lightBg: 'bg-violet-50 dark:bg-violet-950/80',
    iconColor: 'text-violet-600 dark:text-violet-400',
    glowColor: 'hover:shadow-violet-500/20 hover:border-violet-400 dark:hover:border-violet-500',
    href: '/services-web',
  },
  {
    icon: <FiShoppingCart size={26} />,
    title: 'E-commerce Development',
    desc: 'Full-featured online stores with product management, cart, checkout, and payment — built to convert visitors into customers.',
    highlights: [
      'Product Management',
      'Secure Checkout',
      'Mobile First',
      'Analytics',
    ],
    accent: 'from-cyan-500 to-teal-500',
    lightBg: 'bg-cyan-50 dark:bg-cyan-950/80',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    glowColor: 'hover:shadow-cyan-500/20 hover:border-cyan-400 dark:hover:border-cyan-500',
    href: '/services-ecommerce',
  },
  {
    icon: <FiCode size={26} />,
    title: 'Custom Web Application',
    desc: 'Bespoke web apps tailored exactly to your workflow — dashboards, portals, SaaS tools, and internal systems built to scale.',
    highlights: [
      'Scalable Architecture',
      'Role-based Access',
      'Real-time Features',
      'Custom Logic',
    ],
    accent: 'from-indigo-500 to-violet-600',
    lightBg: 'bg-indigo-50 dark:bg-indigo-950/80',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    glowColor: 'hover:shadow-indigo-500/20 hover:border-indigo-400 dark:hover:border-indigo-500',
    href: '/services-web-app',
  },
  {
    icon: <FiLayout size={26} />,
    title: 'UI/UX Design',
    desc: 'Interfaces that feel natural and look premium. We design in Figma first, then bring every pixel to life in code.',
    highlights: [
      'Figma Prototypes',
      'Design Systems',
      'User Testing',
      'Responsive UI',
    ],
    accent: 'from-pink-500 to-rose-500',
    lightBg: 'bg-pink-50 dark:bg-pink-950/80',
    iconColor: 'text-pink-600 dark:text-pink-400',
    glowColor: 'hover:shadow-pink-500/20 hover:border-pink-400 dark:hover:border-pink-500',
    href: '/contact',
  },
  {
    icon: <FiLink size={26} />,
    title: 'API Development & Integration',
    desc: 'RESTful and GraphQL APIs, plus seamless third-party integrations — connect your app to any service it needs.',
    highlights: [
      'REST & GraphQL',
      'Third-party APIs',
      'Webhooks',
      'Documentation',
    ],
    accent: 'from-amber-500 to-orange-500',
    lightBg: 'bg-amber-50 dark:bg-amber-950/80',
    iconColor: 'text-amber-600 dark:text-amber-400',
    glowColor: 'hover:shadow-amber-500/20 hover:border-amber-400 dark:hover:border-amber-500',
    href: '/contact',
  },
  {
    icon: <FiShield size={26} />,
    title: 'Authentication & Security',
    desc: 'Secure login systems, JWT, OAuth, two-factor auth, and role-based permissions — your users and data stay protected.',
    highlights: [
      'JWT & OAuth',
      '2FA Support',
      'Role Permissions',
      'Data Encryption',
    ],
    accent: 'from-green-600 to-emerald-500',
    lightBg: 'bg-green-50 dark:bg-green-950/80',
    iconColor: 'text-green-600 dark:text-green-400',
    glowColor: 'hover:shadow-green-500/20 hover:border-green-400 dark:hover:border-green-500',
    href: '/contact',
  },
  {
    icon: <FiCreditCard size={26} />,
    title: 'Payment Gateway Integration',
    desc: 'bKash, Nagad, Stripe, SSLCommerz, and more — we integrate the payment methods your customers already trust.',
    highlights: [
      'bKash & Nagad',
      'Stripe & SSLCommerz',
      'Refund Handling',
      'Secure Transactions',
    ],
    accent: 'from-violet-500 to-cyan-500',
    lightBg: 'bg-violet-50 dark:bg-violet-950/80',
    iconColor: 'text-violet-600 dark:text-violet-400',
    glowColor: 'hover:shadow-violet-500/20 hover:border-violet-400 dark:hover:border-violet-500',
    href: '/contact',
  },
  {
    icon: <FiDatabase size={26} />,
    title: 'Database Design & Management',
    desc: 'Well-structured databases that scale cleanly — PostgreSQL, MongoDB, MySQL, with proper indexing and backups.',
    highlights: [
      'PostgreSQL & MongoDB',
      'Schema Design',
      'Query Optimization',
      'Backups',
    ],
    accent: 'from-blue-600 to-cyan-500',
    lightBg: 'bg-blue-50 dark:bg-blue-950/80',
    iconColor: 'text-blue-600 dark:text-blue-400',
    glowColor: 'hover:shadow-blue-500/20 hover:border-blue-400 dark:hover:border-blue-500',
    href: '/contact',
  },
  {
    icon: <FiTool size={26} />,
    title: 'Website Maintenance & Support',
    desc: 'We keep your site updated, secure, and running smoothly — bug fixes, content updates, and performance monitoring.',
    highlights: [
      'Bug Fixes',
      'Security Updates',
      'Performance Monitoring',
      'Content Updates',
    ],
    accent: 'from-slate-600 to-zinc-500',
    lightBg: 'bg-slate-50 dark:bg-slate-900/80',
    iconColor: 'text-slate-600 dark:text-slate-400',
    glowColor: 'hover:shadow-slate-500/20 hover:border-slate-400 dark:hover:border-slate-500',
    href: '/contact',
  },
  {
    icon: <FiTrendingUp size={26} />,
    title: 'SEO Optimization',
    desc: 'Technical SEO, on-page optimization, Core Web Vitals, and structured data — we help you rank and stay ranked.',
    highlights: [
      'Technical SEO',
      'Core Web Vitals',
      'Schema Markup',
      'Page Speed',
    ],
    accent: 'from-emerald-500 to-teal-500',
    lightBg: 'bg-emerald-50 dark:bg-emerald-950/80',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    glowColor: 'hover:shadow-emerald-500/20 hover:border-emerald-400 dark:hover:border-emerald-500',
    href: '/contact',
  },
  {
    icon: <FiCpu size={26} />,
    title: 'Business Automation',
    desc: 'Automate repetitive tasks, workflows, reports, and notifications — so your team focuses on what actually matters.',
    highlights: [
      'Workflow Automation',
      'Auto Reports',
      'Email & SMS Triggers',
      'Scheduled Jobs',
    ],
    accent: 'from-orange-500 to-amber-500',
    lightBg: 'bg-orange-50 dark:bg-orange-950/80',
    iconColor: 'text-orange-600 dark:text-orange-400',
    glowColor: 'hover:shadow-orange-500/20 hover:border-orange-400 dark:hover:border-orange-500',
    href: '/contact',
  },
  {
    icon: <FiMonitor size={26} />,
    title: 'Admin Dashboard Development',
    desc: 'Custom admin panels with real-time data, charts, user management, and full control over your product — built to your exact needs.',
    highlights: [
      'Real-time Data',
      'Charts & Analytics',
      'User Management',
      'Custom Widgets',
    ],
    accent: 'from-cyan-600 to-violet-600',
    lightBg: 'bg-cyan-50 dark:bg-cyan-950/80',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    glowColor: 'hover:shadow-cyan-500/20 hover:border-cyan-400 dark:hover:border-cyan-500',
    href: '/contact',
  },
];

const whyUs = [
  { text: 'Clean, maintainable code — scalable architecture', subtitle: 'Built with Next.js 15 & React 19 standards' },
  { text: 'Delivered on time, every time — agile sprints', subtitle: 'Transparent milestone milestones' },
  { text: 'Direct communication with senior engineers', subtitle: 'Zero middlemen, instant project sync' },
  { text: 'Bangladesh-based, globally minded', subtitle: 'Serving startups across USA, UK, EU & BD' },
  { text: '30 Days post-launch warranty included', subtitle: 'Free bug fixes and dedicated deployment support' },
  { text: 'Transparent pricing with zero hidden fees', subtitle: 'Clear quotes tailored to your scope' },
];

export default function ServicesPage() {
  return (
    <main className="relative bg-white dark:bg-zinc-950 text-[#27003B] dark:text-white overflow-hidden">
      {/* Background Ambient Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/4 w-[700px] h-[500px] rounded-full opacity-25 blur-3xl animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, #7c3aed, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -right-32 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, #06b6d4, transparent 70%)',
          animationDelay: '3s',
        }}
      />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="animate-fade-in-down inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 uppercase tracking-widest font-raleway mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
            Tailored Engineering & Design
          </span>

          <h1 className="animate-fade-in-up text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-wide font-display mb-6 leading-tight uppercase">
            Services Built For{' '}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent animated-gradient-text">
              Real Results.
            </span>
          </h1>

          <p className="animate-fade-in-up text-base sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-10 font-raleway">
            From modern responsive web applications to enterprise digital systems —
            we engineer every layer with state-of-the-art precision.
          </p>

          <div className="animate-fade-in-up flex items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 via-violet-700 to-cyan-500 text-white text-sm font-bold font-raleway uppercase tracking-wider hover:opacity-95 hover:scale-105 transition-all shadow-xl shadow-violet-500/25 group"
            >
              <span>Start a Project</span>
              <FiArrowRight
                size={16}
                className="group-hover:translate-x-1.5 transition-transform"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="relative px-4 sm:px-6 pb-24 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={service.title}
              href={service.href}
              className={`group relative flex flex-col justify-between p-7 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/90 backdrop-blur-sm card-hover-lift hover:shadow-2xl ${service.glowColor} transition-all duration-300 overflow-hidden`}
              style={{
                animationDelay: `${(index % 3) * 150}ms`,
              }}
            >
              {/* Top Accent Gradient Bar on Hover */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div>
                {/* Icon Container with 3D Hover Float */}
                <div
                  className={`w-14 h-14 rounded-2xl ${service.lightBg} flex items-center justify-center ${service.iconColor} mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm group-hover:shadow-md`}
                >
                  {service.icon}
                </div>

                {/* Title & Desc with Hover Slide */}
                <div className="flex flex-col gap-2.5">
                  <h2 className="text-xl font-extrabold font-raleway text-[#27003B] dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 group-hover:translate-x-1 transition-all duration-200 flex items-center justify-between">
                    <span>{service.title}</span>
                    <FiArrowRight
                      size={18}
                      className="text-violet-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 shrink-0"
                    />
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-raleway group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors">
                    {service.desc}
                  </p>
                </div>
              </div>

              {/* Highlights Chips with Staggered Hover Effect */}
              <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800/80">
                {service.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-[11px] font-bold font-raleway px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:bg-violet-50 dark:group-hover:bg-violet-950/60 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-all duration-200"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Why Clients Choose Us ── */}
      <section className="relative px-6 py-20 bg-zinc-50/70 dark:bg-zinc-900/40 border-y border-zinc-200/80 dark:border-zinc-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 uppercase tracking-widest font-raleway mb-3">
              Why MerxoDev
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display uppercase tracking-wide text-[#27003B] dark:text-white">
              Why Clients Choose Our Engineering
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map((item, idx) => (
              <div
                key={idx}
                className="group flex flex-col gap-2 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm card-hover-lift hover:border-violet-400 dark:hover:border-violet-600 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <FiCheckCircle size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white font-raleway">
                    {item.text}
                  </h3>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-raleway pl-11">
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
          <div className="relative rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-cyan-500 p-1 shadow-2xl shadow-violet-500/20 card-hover-lift">
            <div className="rounded-[22px] bg-white dark:bg-zinc-950 px-8 py-14 sm:px-12">
              <span className="inline-block text-[11px] font-bold tracking-widest text-amber-500 uppercase font-raleway mb-3">
                Let's Discuss
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display uppercase tracking-wide mb-4 text-[#27003B] dark:text-white">
                Not sure which service fits your project?
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto font-raleway">
                Share your requirements or idea, and our team will prepare a
                custom scope, timeline, and quote within hours.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-bold font-raleway uppercase tracking-wider hover:opacity-95 hover:scale-105 transition-all shadow-xl shadow-violet-500/25 group"
              >
                <span>Talk to Us Now</span>
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
