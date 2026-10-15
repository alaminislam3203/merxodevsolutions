'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FiArrowRight,
  FiCheckCircle,
  FiLayout,
  FiLayers,
  FiSmartphone,
  FiEye,
  FiGrid,
  FiSliders,
  FiPenTool,
  FiChevronDown,
  FiShield,
  FiAward,
  FiZap,
} from 'react-icons/fi';
import { FaFigma, FaPalette, FaMagic } from 'react-icons/fa';

export default function ServicesDesignPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const stats = [
    { value: '100%', label: 'Pixel-Perfect Designs' },
    { value: '4.9/5', label: 'Design Satisfaction' },
    { value: '40+', label: 'Design Systems Built' },
    { value: '2x-3x', label: 'Higher Conversion UX' },
  ];

  const featureMeta = [
    {
      icon: <FaFigma size={24} />,
      title: 'Interactive Figma Prototypes',
      desc: 'Clickable, high-fidelity prototypes that let you test real user flows, animations, and interactions before writing code.',
      lightBg: 'bg-purple-50 dark:bg-purple-950/80',
      iconColor: 'text-purple-600 dark:text-purple-400',
      borderGlow: 'hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-purple-500/15',
    },
    {
      icon: <FiLayout size={24} />,
      title: 'SaaS & Web App Dashboard UX',
      desc: 'Intuitive data visualizations, clean tabular views, and modular widgets crafted for effortless user navigation.',
      lightBg: 'bg-violet-50 dark:bg-violet-950/80',
      iconColor: 'text-violet-600 dark:text-violet-400',
      borderGlow: 'hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-violet-500/15',
    },
    {
      icon: <FiSmartphone size={24} />,
      title: 'Mobile App & Responsive UI',
      desc: 'Ergonomic touch-first interfaces designed strictly around iOS and Android guidelines, adaptable to any screen width.',
      lightBg: 'bg-cyan-50 dark:bg-cyan-950/80',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      borderGlow: 'hover:border-cyan-400 dark:hover:border-cyan-600 hover:shadow-cyan-500/15',
    },
    {
      icon: <FiLayers size={24} />,
      title: 'Design Systems & Component Tokens',
      desc: 'Scalable UI libraries with reusable typography scales, color palettes, spacing tokens, and component states.',
      lightBg: 'bg-pink-50 dark:bg-pink-950/80',
      iconColor: 'text-pink-600 dark:text-pink-400',
      borderGlow: 'hover:border-pink-400 dark:hover:border-pink-600 hover:shadow-pink-500/15',
    },
    {
      icon: <FiEye size={24} />,
      title: 'User Research & Wireframing',
      desc: 'Deep persona mapping, competitor teardowns, low-fidelity wireframes, and user journey optimization.',
      lightBg: 'bg-amber-50 dark:bg-amber-950/80',
      iconColor: 'text-amber-600 dark:text-amber-400',
      borderGlow: 'hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-amber-500/15',
    },
    {
      icon: <FaMagic size={24} />,
      title: 'Micro-Animations & Visual Physics',
      desc: 'Smooth hover transitions, kinetic typography, glassmorphism overlays, and state-of-the-art visual accents.',
      lightBg: 'bg-emerald-50 dark:bg-emerald-950/80',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      borderGlow: 'hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-emerald-500/15',
    },
    {
      icon: <FiGrid size={24} />,
      title: 'Landing Page & Conversion Design',
      desc: 'High-converting hero sections, trust signals, feature breakdowns, and CTA placements scientifically proven to drive sales.',
      lightBg: 'bg-blue-50 dark:bg-blue-950/80',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderGlow: 'hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-blue-500/15',
    },
    {
      icon: <FiSliders size={24} />,
      title: 'E-Commerce UX & Checkout Optimization',
      desc: 'Frictionless product browsing, smart filters, sticky add-to-cart, and one-page checkout experiences.',
      lightBg: 'bg-teal-50 dark:bg-teal-950/80',
      iconColor: 'text-teal-600 dark:text-teal-400',
      borderGlow: 'hover:border-teal-400 dark:hover:border-teal-600 hover:shadow-teal-500/15',
    },
    {
      icon: <FiPenTool size={24} />,
      title: 'Developer-Ready Asset Handover',
      desc: 'Complete auto-layout Figma source files, vector SVG assets, CSS variables, and design specs for instant coding.',
      lightBg: 'bg-indigo-50 dark:bg-indigo-950/80',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      borderGlow: 'hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-indigo-500/15',
    },
  ];

  const techStack = [
    { label: 'Figma Auto-Layout', category: 'UI Tool' },
    { label: 'Adobe XD', category: 'UI Tool' },
    { label: 'Design Tokens', category: 'System' },
    { label: 'Tailwind CSS Compatibility', category: 'Code Prep' },
    { label: 'Framer', category: 'Prototyping' },
    { label: 'Lottie Animations', category: 'Motion' },
    { label: 'Adobe Illustrator', category: 'Vectors' },
    { label: 'Photoshop', category: 'Graphics' },
    { label: 'WCAG Accessibility', category: 'Standard' },
    { label: 'Mobile-First Grids', category: 'Layout' },
  ];

  const plans = [
    {
      name: 'Landing Page UI',
      price: 'BDT 1200',
      desc: 'High-impact, conversion-optimized landing page design for your new product or campaign.',
      features: [
        'Desktop & Mobile UI in Figma',
        'Interactive Clickable Prototype',
        'Custom Vector Graphics & Icons',
        'Design System & Color Tokens',
        '3 Rounds of Revisions',
        'Developer-Ready Handover',
      ],
      popular: false,
      cta: 'Choose Landing UI',
    },
    {
      name: 'Complete Website / App UX',
      price: 'BDT 20000',
      desc: 'Our most sought-after package for multi-page websites or full web application flows.',
      features: [
        'Up to 10 Custom Screens/Pages',
        'Full Figma Interactive Prototypes',
        'User Journey & Wireframe Specs',
        'Dark & Light Mode Variants',
        'Component Library & Auto-Layout',
        'Micro-Interactions Guidelines',
        'Unlimited Revisions during Sprint',
      ],
      popular: true,
      cta: 'Get Full UX Package',
    },
    {
      name: 'Enterprise Design System',
      price: 'BDT 1200',
      desc: 'Comprehensive multi-platform design architecture and tokens for scaling enterprises.',
      features: [
        'Complete Product UI Suite (20+ Screens)',
        'Full Design System & Token Library',
        'iOS, Android & Web Variants',
        'User Testing & Heuristic Evaluation',
        'Interactive Motion / Lottie Specs',
        'Developer Pair Programming Support',
        '60 Days Design Maintenance',
      ],
      popular: false,
      cta: 'Consult Lead Designer',
    },
  ];

  const faqs = [
    {
      q: 'What deliverables will I receive upon project completion?',
      a: 'You receive full access to the organized Figma source file with Auto-Layout, interactive prototypes, component library, exported SVG/PNG vector assets, and a developer design specification guide.',
    },
    {
      q: 'How many design revisions are included?',
      a: 'We work iteratively with milestone reviews. Landing UI includes 3 revision rounds, while our Full UX and Enterprise packages include unlimited revisions during the design sprint until you are 100% satisfied.',
    },
    {
      q: 'Can your team also code the design into Next.js / React?',
      a: 'Yes! As a full-stack digital solutions agency, we can seamlessly take your approved Figma design and build it into a lightning-fast Next.js application with zero design-to-code drift.',
    },
    {
      q: 'Do you design both Dark Mode and Light Mode?',
      a: 'Yes, all our design systems incorporate tailored HSL color tokens for both sleek dark mode and radiant light mode themes.',
    },
  ];

  return (
    <main className="text-[#27003B] dark:text-white transition-colors duration-300">
      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-30 blur-3xl animate-pulse-glow"
          style={{
            // background: 'radial-gradient(circle, #a855f7, #ec4899, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
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
            <span className="text-pink-600 dark:text-pink-400 font-semibold">
              UI/UX Design
            </span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-pink-100 dark:bg-pink-950/90 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800 uppercase tracking-widest font-exo-extralight mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
            Figma & World-Class Product Design
          </div>

          <h1 className="font-exo-medium text-4xl sm:text-6xl lg:text-7xl uppercase tracking-wide leading-tight mb-6 text-[#27003B] dark:text-white">
            UI/UX Design That{' '}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent animated-gradient-text">
              Inspires & Converts
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto mb-10 font-exo-extralight">
            We craft visually breathtaking, user-obsessed digital experiences — from high-converting landing pages to complex SaaS dashboard architectures in Figma.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/contact?service=UI/UX%20Design"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white text-sm font-black uppercase tracking-wider font-exo-extralight hover:shadow-xl hover:shadow-pink-500/25 hover:scale-105 transition-all duration-300"
            >
              <span>Book Design Consultation</span>
              <FiArrowRight size={18} />
            </Link>
            <Link
              href="/our-projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-sm font-bold font-exo-extralight text-zinc-800 dark:text-zinc-200 hover:border-pink-500 hover:text-pink-600 transition-all duration-300"
            >
              View Design Showcase
            </Link>
          </div>

          {/* Trust Highlights Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 text-xs font-semibold text-zinc-600 dark:text-zinc-400 font-exo-extralight">
            <div className="flex items-center justify-center gap-1.5">
              <FaPalette className="text-pink-500" />
              <span>Figma Auto-Layout</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FiZap className="text-amber-500" />
              <span>Interactive Prototypes</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FiAward className="text-purple-500" />
              <span>Design System Tokens</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FiCheckCircle className="text-emerald-500" />
              <span>Developer-Ready Code Handover</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Metric Bar ── */}
      <section className="px-4 sm:px-6 pb-20" aria-label="Design stats">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 backdrop-blur-xl shadow-xl shadow-pink-950/5 card-hover-lift"
            >
              <p className="text-3xl sm:text-4xl font-exo-medium uppercase tracking-wide bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-1">
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
            <span className="inline-block text-xs font-bold tracking-widest text-pink-600 dark:text-pink-400 uppercase font-exo-extralight mb-3">
              ✦ Human-Centered Craftsmanship
            </span>
            <h2
              id="features-heading"
              className="font-exo-medium text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
            >
              Comprehensive UI/UX{' '}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                Design Services
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureMeta.map((feature, i) => (
              <div
                key={i}
                className={`group relative flex flex-col justify-between p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-xl card-hover-lift transition-all duration-300 ${feature.borderGlow}`}
              >
                <div>
                  <div
                    className={`w-14 h-14 rounded-2xl ${feature.lightBg} border border-zinc-200/60 dark:border-zinc-800 flex items-center justify-center ${feature.iconColor} shadow-md mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>

                  <h3 className="font-exo-medium text-xl uppercase tracking-wide text-zinc-900 dark:text-white mb-3 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight">
                    {feature.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2 text-xs font-bold text-pink-600 dark:text-pink-400 font-exo-extralight group-hover:translate-x-1 transition-transform">
                  <span>Pixel-Perfect Fidelity</span>
                  <FiCheckCircle size={14} className="text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modern Toolchain Pills ── */}
      <section className="px-4 sm:px-6 pb-24" aria-label="Design tools">
        <div className="max-w-[1440px] mx-auto p-10 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-br from-pink-50/50 via-white to-purple-50/50 dark:from-zinc-900/90 dark:via-zinc-900/60 dark:to-zinc-950 backdrop-blur-2xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-pink-600 dark:text-pink-400 uppercase font-exo-extralight mb-2 block">
              ✦ Professional Design Stack
            </span>
            <h3 className="font-exo-medium text-2xl sm:text-4xl uppercase tracking-wide">
              Industry-Leading Design Tools
            </h3>
          </div>

          <div className="flex flex-wrap gap-3 justify-center items-center">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-sm hover:border-pink-500 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600" />
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
            <span className="inline-block text-xs font-bold tracking-widest text-pink-600 dark:text-pink-400 uppercase font-exo-extralight mb-3">
              ✦ Transparent Design Investment
            </span>
            <h2
              id="pricing-heading"
              className="font-exo-medium text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
            >
              Choose Your{' '}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                Design Package
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl transition-all duration-300 card-hover-lift ${plan.popular
                  ? 'border-2 border-pink-500 bg-gradient-to-b from-pink-50/80 via-white to-white dark:from-pink-950/50 dark:via-zinc-900 dark:to-zinc-900 shadow-2xl shadow-pink-500/20 scale-105 z-10'
                  : 'border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/80 shadow-lg'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-black uppercase tracking-widest shadow-md">
                    ★ Most Popular Choice
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
                    <span className="font-exo-medium text-4xl sm:text-5xl uppercase tracking-tight text-pink-600 dark:text-pink-400">
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
                  href={`/contact?service=UI/UX%20Design&package=${encodeURIComponent(plan.name)}`}
                  className={`w-full py-4 rounded-2xl text-center text-sm font-black uppercase tracking-wider font-exo-extralight transition-all duration-200 ${plan.popular
                    ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white hover:opacity-95 shadow-lg shadow-pink-500/25'
                    : 'border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 hover:border-pink-500 hover:text-pink-600'
                    }`}
                >
                  {plan.cta || 'Select Design Tier'}
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
            <span className="text-xs font-bold tracking-widest text-pink-600 dark:text-pink-400 uppercase font-exo-extralight mb-2 block">
              ✦ Design FAQs
            </span>
            <h2
              id="faq-heading"
              className="font-exo-medium text-3xl sm:text-5xl uppercase tracking-wide"
            >
              Frequently Asked Questions
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
                      className={`text-pink-600 dark:text-pink-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
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
        <div className="relative max-w-[1440px] mx-auto p-10 sm:p-16 rounded-3xl overflow-hidden bg-gradient-to-r from-[#200329] via-[#1a0533] to-[#0d0426] border border-pink-500/30 text-white text-center shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-400 font-exo-extralight mb-4">
              ✦ Ready to Redefine Your Brand's Visual Identity?
            </span>
            <h2 className="font-exo-medium text-3xl sm:text-5xl lg:text-6xl uppercase tracking-wide mb-6">
              Let's Create Exceptional Design Together
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 font-exo-extralight leading-relaxed mb-8">
              Work directly with our senior product designers to craft a digital interface that elevates your brand and turns visitors into loyal customers.
            </p>
            <Link
              href="/contact?service=UI/UX%20Design"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-black text-sm uppercase tracking-wider font-exo-extralight hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300"
            >
              <span>Schedule Design Discovery</span>
              <FiArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
