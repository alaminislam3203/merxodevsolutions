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
    url: 'https://merxodevsolutions.vercel.app/services',
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
    lightBg: 'bg-violet-50 dark:bg-violet-950',
    iconColor: 'text-violet-600 dark:text-violet-400',
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
    lightBg: 'bg-cyan-50 dark:bg-cyan-950',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
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
    lightBg: 'bg-indigo-50 dark:bg-indigo-950',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
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
    lightBg: 'bg-pink-50 dark:bg-pink-950',
    iconColor: 'text-pink-600 dark:text-pink-400',
    href: '/services-design',
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
    lightBg: 'bg-amber-50 dark:bg-amber-950',
    iconColor: 'text-amber-600 dark:text-amber-400',
    href: '/services-api',
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
    lightBg: 'bg-green-50 dark:bg-green-950',
    iconColor: 'text-green-600 dark:text-green-400',
    href: '/services-security',
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
    lightBg: 'bg-violet-50 dark:bg-violet-950',
    iconColor: 'text-violet-600 dark:text-violet-400',
    href: '/services-payment',
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
    lightBg: 'bg-blue-50 dark:bg-blue-950',
    iconColor: 'text-blue-600 dark:text-blue-400',
    href: '/services-database',
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
    lightBg: 'bg-slate-50 dark:bg-slate-900',
    iconColor: 'text-slate-600 dark:text-slate-400',
    href: '/services-maintenance',
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
    lightBg: 'bg-emerald-50 dark:bg-emerald-950',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    href: '/services-seo',
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
    lightBg: 'bg-orange-50 dark:bg-orange-950',
    iconColor: 'text-orange-600 dark:text-orange-400',
    href: '/services-automation',
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
    lightBg: 'bg-cyan-50 dark:bg-cyan-950',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    href: '/services-dashboard',
  },
];

const whyUs = [
  'Clean, maintainable code — no spaghetti',
  'Delivered on time, every time',
  'Direct communication, no middlemen',
  'Bangladesh-based, globally minded',
  'Post-launch support included',
  'Transparent pricing, no surprises',
];

export default function ServicesPage() {
  return (
    <main className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-br from-violet-100 to-cyan-100 dark:from-violet-950 dark:to-cyan-950 opacity-50 blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-raleway mb-4">
            What We Offer
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight font-raleway mb-6 leading-tight">
            Services built for{' '}
            <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
              real results.
            </span>
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto mb-8">
            From a simple website to a full SaaS product — we cover every layer
            of modern digital development, end to end.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-bold font-raleway hover:opacity-90 transition-opacity"
          >
            Start a Project <FiArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(service => (
            <Link
              key={service.title}
              href={service.href}
              className="group flex flex-col gap-5 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-violet-200 dark:hover:border-violet-800 hover:shadow-lg hover:shadow-violet-50 dark:hover:shadow-violet-950 transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl ${service.lightBg} flex items-center justify-center ${service.iconColor} group-hover:bg-gradient-to-br group-hover:${service.accent} group-hover:text-white transition-all duration-300`}
              >
                {service.icon}
              </div>

              {/* Title & Desc */}
              <div>
                <h2 className="font-black font-raleway text-zinc-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {service.title}
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {service.desc}
                </p>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {service.highlights.map(h => (
                  <span
                    key={h}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-violet-500 font-raleway opacity-0 group-hover:opacity-100 transition-opacity -mt-1">
                Learn more <FiArrowRight size={13} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="px-6 py-16 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-raleway mb-3">
              Why MerxoDev
            </span>
            <h2 className="text-3xl font-black font-raleway">
              Why clients choose us
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {whyUs.map(item => (
              <div
                key={item}
                className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800"
              >
                <FiCheckCircle size={18} className="text-violet-500 shrink-0" />
                <span className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 p-px">
            <div className="rounded-2xl bg-white dark:bg-zinc-950 px-8 py-12">
              <h2 className="text-2xl font-black font-raleway mb-3">
                Not sure which service you need?
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
                Tell us about your idea and we'll figure it out together — no
                commitment needed.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-bold font-raleway hover:opacity-90 transition-opacity"
              >
                Talk to Us <FiArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
