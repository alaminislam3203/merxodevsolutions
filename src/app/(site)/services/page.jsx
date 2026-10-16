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
  title: 'Full-Stack IT & Web Development Services — MerxoDev Solutions Bangladesh',
  description:
    'End-to-end software development services: Next.js websites, SaaS web apps, e-commerce stores, payment gateway integration, UI/UX design, and business automation in Bangladesh.',
  keywords: [
    // English
    'web development services Bangladesh',
    'custom web application services',
    'ecommerce development Bangladesh',
    'payment gateway integration bKash Nagad',
    'UI UX design agency Rangpur',
    'API integration services',
    'database design PostgreSQL MongoDB',
    'SEO optimization Bangladesh',
    'IT solutions provider Bangladesh',
    // Bengali (বাংলা)
    'আইটি সার্ভিসেস বাংলাদেশ',
    'ওয়েবসাইট ডেভেলপমেন্ট সার্ভিস',
    'ই-কমার্স ওয়েবসাইট তৈরি',
    'পেমেন্ট গেটওয়ে সেটআপ বিকাশ নগদ',
    'সফটওয়্যার সলিউশনস',
    'ওয়েব ডিজাইন ও ডেভেলপমেন্ট রংপুর ঢাকা',
    // Banglish (বাংলিশ)
    'it service provider bd',
    'website bananor sob dhoroner service',
    'software toiri kora',
    'ecommerce website bananor service',
    'bkash nagad payment add kora',
    'seo service provider bangladesh',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/services',
  },
  openGraph: {
    title: 'Full-Stack IT & Web Development Services — MerxoDev Solutions Bangladesh',
    description:
      'Explore our full suite of digital engineering services: web apps, SaaS, e-commerce, and cloud integrations.',
    url: 'https://merxodevsolutions.pro.bd/services',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://merxodevsolutions.pro.bd/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'MerxoDev Solutions Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Full-Stack IT & Web Development Services — MerxoDev Solutions Bangladesh',
    description:
      'Web, mobile, e-commerce, and software development services tailored for growing businesses.',
    images: ['https://merxodevsolutions.pro.bd/logo-light.png'],
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
    lightBg: 'bg-amber-50 dark:bg-amber-950/80',
    iconColor: 'text-amber-600 dark:text-amber-400',
    glowColor: 'hover:shadow-amber-500/20 hover:border-amber-400 dark:hover:border-amber-500',
    href: '/services-api-integration',
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
    lightBg: 'bg-violet-50 dark:bg-violet-950/80',
    iconColor: 'text-violet-600 dark:text-violet-400',
    glowColor: 'hover:shadow-violet-500/20 hover:border-violet-400 dark:hover:border-violet-500',
    href: '/services-payment-gateway',
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
    lightBg: 'bg-slate-50 dark:bg-slate-900/80',
    iconColor: 'text-slate-600 dark:text-slate-400',
    glowColor: 'hover:shadow-slate-500/20 hover:border-slate-400 dark:hover:border-slate-500',
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
    lightBg: 'bg-emerald-50 dark:bg-emerald-950/80',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    glowColor: 'hover:shadow-emerald-500/20 hover:border-emerald-400 dark:hover:border-emerald-500',
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
    lightBg: 'bg-orange-50 dark:bg-orange-950/80',
    iconColor: 'text-orange-600 dark:text-orange-400',
    glowColor: 'hover:shadow-orange-500/20 hover:border-orange-400 dark:hover:border-orange-500',
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

import ServicesClient from './ServicesClient';

export default function ServicesPage() {
  const servicesCatalogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Software & Web Development',
    provider: {
      '@type': 'Organization',
      name: 'MerxoDev Solutions',
      url: 'https://merxodevsolutions.pro.bd',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Bangladesh',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital & Software Development Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.desc,
          url: `https://merxodevsolutions.pro.bd${s.href}`,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesCatalogSchema) }}
      />
      <ServicesClient />
    </>
  );
}
