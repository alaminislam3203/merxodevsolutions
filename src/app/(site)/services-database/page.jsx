'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FiArrowRight,
  FiCheckCircle,
  FiDatabase,
  FiServer,
  FiZap,
  FiShield,
  FiRefreshCw,
  FiActivity,
  FiTrendingUp,
  FiLayers,
  FiChevronDown,
} from 'react-icons/fi';
import { FaTable, FaHdd } from 'react-icons/fa';

export default function ServicesDatabasePage() {
  const [openFaq, setOpenFaq] = useState(null);

  const stats = [
    { value: '10x', label: 'Query Performance Boost' },
    { value: '99.999%', label: 'Data Durability & Backups' },
    { value: 'Zero-Downtime', label: 'Safe Migrations' },
    { value: 'ACID', label: 'Strict Transaction Safety' },
  ];

  const featureMeta = [
    {
      icon: <FiDatabase size={24} />,
      title: 'PostgreSQL & MySQL Relational Architecture',
      desc: 'Normalized schema modeling, foreign key constraints, composite indexing, and partition tables designed for high data integrity.',
      lightBg: 'bg-blue-50 dark:bg-blue-950/80',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderGlow: 'hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-blue-500/15',
    },
    {
      icon: <FiLayers size={24} />,
      title: 'MongoDB & Document Store Design',
      desc: 'Flexible NoSQL collections, schema validation, aggregation pipelines, and embedded versus referenced document patterns.',
      lightBg: 'bg-emerald-50 dark:bg-emerald-950/80',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      borderGlow: 'hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-emerald-500/15',
    },
    {
      icon: <FiZap size={24} />,
      title: 'Redis In-Memory Caching & Session Storage',
      desc: 'Sub-millisecond data retrieval with Redis key-value caching, Pub/Sub channels, queue processing, and session persistence.',
      lightBg: 'bg-rose-50 dark:bg-rose-950/80',
      iconColor: 'text-rose-600 dark:text-rose-400',
      borderGlow: 'hover:border-rose-400 dark:hover:border-rose-600 hover:shadow-rose-500/15',
    },
    {
      icon: <FaTable size={24} />,
      title: 'Prisma ORM & Type-Safe Data Layer',
      desc: 'Auto-generated TypeScript client models, seamless schema migrations, Prisma Studio integration, and query batching.',
      lightBg: 'bg-indigo-50 dark:bg-indigo-950/80',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      borderGlow: 'hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-indigo-500/15',
    },
    {
      icon: <FiActivity size={24} />,
      title: 'Slow Query Profiling & Index Optimization',
      desc: 'EXPLAIN ANALYZE execution plan inspections, B-Tree and GIN indexes, connection pool tuning, and query refactoring.',
      lightBg: 'bg-amber-50 dark:bg-amber-950/80',
      iconColor: 'text-amber-600 dark:text-amber-400',
      borderGlow: 'hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-amber-500/15',
    },
    {
      icon: <FiRefreshCw size={24} />,
      title: 'Automated Daily Backups & Disaster Recovery',
      desc: 'Point-in-time recovery (PITR), offsite encrypted S3 snapshots, WAL archiving, and zero-data-loss failover strategies.',
      lightBg: 'bg-teal-50 dark:bg-teal-950/80',
      iconColor: 'text-teal-600 dark:text-teal-400',
      borderGlow: 'hover:border-teal-400 dark:hover:border-teal-600 hover:shadow-teal-500/15',
    },
    {
      icon: <FiServer size={24} />,
      title: 'Serverless Cloud DB (Neon, Supabase, PlanetScale)',
      desc: 'Auto-scaling serverless databases, branch-based database migrations, connection pooling with PgBouncer, and edge querying.',
      lightBg: 'bg-violet-50 dark:bg-violet-950/80',
      iconColor: 'text-violet-600 dark:text-violet-400',
      borderGlow: 'hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-violet-500/15',
    },
    {
      icon: <FiShield size={24} />,
      title: 'Data Privacy & Row-Level Security (RLS)',
      desc: 'Database-level encryption at rest, secure SSL connection pooling, automated column masking, and role isolation.',
      lightBg: 'bg-cyan-50 dark:bg-cyan-950/80',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      borderGlow: 'hover:border-cyan-400 dark:hover:border-cyan-600 hover:shadow-cyan-500/15',
    },
    {
      icon: <FaHdd size={24} />,
      title: 'Data Migration & Legacy DB Transition',
      desc: 'Zero-downtime ETL pipelines, sanitizing legacy SQL dumps, deduplication, and schema conversion to modern relational targets.',
      lightBg: 'bg-pink-50 dark:bg-pink-950/80',
      iconColor: 'text-pink-600 dark:text-pink-400',
      borderGlow: 'hover:border-pink-400 dark:hover:border-pink-600 hover:shadow-pink-500/15',
    },
  ];

  const techStack = [
    { label: 'PostgreSQL 16', category: 'Relational' },
    { label: 'Prisma ORM', category: 'Data Layer' },
    { label: 'Redis 7', category: 'In-Memory' },
    { label: 'MongoDB Atlas', category: 'NoSQL' },
    { label: 'Supabase', category: 'Cloud DB' },
    { label: 'Neon Serverless', category: 'Cloud DB' },
    { label: 'PgBouncer', category: 'Pooling' },
    { label: 'AWS S3 Snapshots', category: 'Backups' },
  ];

  const plans = [
    {
      name: 'Schema Design & Setup',
      price: 'BDT 1300',
      desc: 'Professional database schema modeling, relational foreign keys, indexes, and Prisma models for new projects.',
      features: [
        'Complete Relational Schema Modeling',
        'Prisma / Mongoose ORM Setup',
        'Indexes for High Query Speeds',
        'Prisma Seed Scripts & Mock Data',
        'Database Documentation PDF',
        '15 Days Post-Setup Support',
      ],
      popular: false,
      cta: 'Design Schema',
    },
    {
      name: 'Query Optimization & Caching',
      price: 'BDT 2600',
      desc: 'Our most sought-after package for fixing sluggish database responses, adding Redis caching, and optimizing queries.',
      features: [
        'Slow Query Profiling & EXPLAIN Tuning',
        'Composite B-Tree & GIN Index Tuning',
        'Redis Caching & Queue Implementation',
        'Automated Backup Pipeline to Cloud S3',
        'Connection Pooling Setup (PgBouncer)',
        '30 Days Performance Monitoring',
      ],
      popular: true,
      cta: 'Optimize Database',
    },
    {
      name: 'Full Scale Database Architecture',
      price: 'BDT 3800',
      desc: 'High-availability database cluster, zero-downtime ETL migration, replication, and enterprise disaster recovery.',
      features: [
        'Multi-Region Replica & Sharding Spec',
        'Zero-Downtime Data Migration / ETL',
        'PostgreSQL Row-Level Security (RLS)',
        'Point-In-Time Recovery (PITR) Config',
        'Custom DBA Monitoring & Alerts',
        '60 Days Priority DBA Support',
      ],
      popular: false,
      cta: 'Architect Enterprise DB',
    },
  ];

  const faqs = [
    {
      q: 'Why should I use Prisma ORM instead of raw SQL queries?',
      a: 'Prisma provides end-to-end type safety in TypeScript/JavaScript, prevents SQL injection automatically, auto-generates query builders, and simplifies multi-stage schema migrations.',
    },
    {
      q: 'How does Redis caching improve website loading times?',
      a: 'Instead of hitting disk-bound SQL queries repeatedly, Redis serves cached data in-memory within 1–2 milliseconds, reducing server load by up to 90%.',
    },
    {
      q: 'Can you migrate data from an old database without downtime?',
      a: 'Yes, we use dual-write and change-data-capture (CDC) sync techniques to transfer and verify historical records without taking your live production application offline.',
    },
  ];

  return (
    <main className="text-[#27003B] dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-30 blur-3xl animate-pulse-glow"
          style={{
            // background: 'radial-gradient(circle, #3b82f6, #06b6d4, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-xs text-zinc-400 font-raleway mb-6"
          >
            <Link href="/" className="hover:text-blue-500 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-blue-500 transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
              Database Design & Management
            </span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/90 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 uppercase tracking-widest font-raleway mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            PostgreSQL, MongoDB, Prisma & Redis
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase tracking-wide leading-tight mb-6 text-[#27003B] dark:text-white">
            Database Design &{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent animated-gradient-text">
              Management
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto mb-10 font-raleway">
            High-performance, type-safe database architectures with sub-millisecond query optimization, automatic backups, and bulletproof relational integrity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/contact?service=Database%20Design%20%26%20Management"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 text-white text-sm font-black uppercase tracking-wider font-raleway hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300"
            >
              <span>Optimize Your Database</span>
              <FiArrowRight size={18} />
            </Link>
            <Link
              href="/our-projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-sm font-bold font-raleway text-zinc-800 dark:text-zinc-200 hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
            >
              Case Studies
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 text-xs font-semibold text-zinc-600 dark:text-zinc-400 font-raleway">
            <div className="flex items-center justify-center gap-1.5">
              <FiDatabase className="text-blue-500" />
              <span>PostgreSQL & Prisma</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FiZap className="text-rose-500" />
              <span>Redis Caching</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FiRefreshCw className="text-teal-500" />
              <span>Auto S3 Backups</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FiShield className="text-cyan-500" />
              <span>ACID Safe & RLS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="px-4 sm:px-6 pb-20" aria-label="Database stats">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 backdrop-blur-xl shadow-xl shadow-blue-950/5 card-hover-lift"
            >
              <p className="text-3xl sm:text-4xl font-display uppercase tracking-wide bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-raleway font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-4 sm:px-6 pb-24" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase font-raleway mb-3">
              ✦ Engineered for Extreme Data Integrity
            </span>
            <h2
              id="features-heading"
              className="font-display text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
            >
              Comprehensive Database{' '}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent">
                Capabilities
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

                  <h3 className="font-display text-xl uppercase tracking-wide text-zinc-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-raleway">
                    {feature.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 font-raleway group-hover:translate-x-1 transition-transform">
                  <span>Sub-Millisecond Target</span>
                  <FiCheckCircle size={14} className="text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Pills */}
      <section className="px-4 sm:px-6 pb-24" aria-label="Database stack">
        <div className="max-w-6xl mx-auto p-10 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-br from-blue-50/50 via-white to-teal-50/50 dark:from-zinc-900/90 dark:via-zinc-900/60 dark:to-zinc-950 backdrop-blur-2xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase font-raleway mb-2 block">
              ✦ Battle-Tested Database Engines
            </span>
            <h3 className="font-display text-2xl sm:text-4xl uppercase tracking-wide">
              Database Technologies & Engines
            </h3>
          </div>

          <div className="flex flex-wrap gap-3 justify-center items-center">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-sm hover:border-blue-500 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400" />
                <span className="text-sm font-bold text-zinc-900 dark:text-white font-raleway">
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

      {/* Pricing */}
      <section className="px-4 sm:px-6 pb-24" aria-labelledby="pricing-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase font-raleway mb-3">
              ✦ Transparent Database Solutions
            </span>
            <h2
              id="pricing-heading"
              className="font-display text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
            >
              Choose Your{' '}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent">
                Database Tier
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl transition-all duration-300 card-hover-lift ${plan.popular
                    ? 'border-2 border-blue-500 bg-gradient-to-b from-blue-50/80 via-white to-white dark:from-blue-950/50 dark:via-zinc-900 dark:to-zinc-900 shadow-2xl shadow-blue-500/20 scale-105 z-10'
                    : 'border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/80 shadow-lg'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-teal-400 text-white text-xs font-black uppercase tracking-widest shadow-md">
                    ★ Most Requested
                  </div>
                )}

                <div>
                  <h3 className="font-display text-2xl uppercase tracking-wide text-zinc-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-raleway mb-6 min-h-[36px]">
                    {plan.desc}
                  </p>

                  <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-blue-600 dark:text-blue-400">
                      {plan.price}
                    </span>
                    <span className="text-xs text-zinc-400 font-raleway">/ one-time</span>
                  </div>

                  <ul className="space-y-3.5 mb-10">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300 font-raleway">
                        <FiCheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/contact?service=Database%20Design%20%26%20Management&package=${encodeURIComponent(plan.name)}`}
                  className={`w-full py-4 rounded-2xl text-center text-sm font-black uppercase tracking-wider font-raleway transition-all duration-200 ${plan.popular
                      ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 text-white hover:opacity-95 shadow-lg shadow-blue-500/25'
                      : 'border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 hover:border-blue-500 hover:text-blue-600'
                    }`}
                >
                  {plan.cta || 'Get Started Now'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 sm:px-6 pb-24" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase font-raleway mb-2 block">
              ✦ Database FAQs
            </span>
            <h2
              id="faq-heading"
              className="font-display text-3xl sm:text-5xl uppercase tracking-wide"
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
                    <span className="font-display text-lg uppercase tracking-wide text-zinc-900 dark:text-white">
                      {faq.q}
                    </span>
                    <FiChevronDown
                      size={20}
                      className={`text-blue-600 dark:text-blue-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-sm text-zinc-600 dark:text-zinc-400 font-raleway leading-relaxed border-t border-zinc-100 dark:border-zinc-800/80">
                      <p className="pt-4">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 pb-24">
        <div className="relative max-w-6xl mx-auto p-10 sm:p-16 rounded-3xl overflow-hidden bg-gradient-to-r from-[#011429] via-[#021f2d] to-[#041a1a] border border-blue-500/30 text-white text-center shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-cyan-400 font-raleway mb-4">
              ✦ Rock-Solid Scalable Data Layer
            </span>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase tracking-wide mb-6">
              Accelerate Your Data Queries & Storage
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 font-raleway leading-relaxed mb-8">
              Work with our experienced database architects to design, optimize, and scale your data infrastructure.
            </p>
            <Link
              href="/contact?service=Database%20Design%20%26%20Management"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 text-white font-black text-sm uppercase tracking-wider font-raleway hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
            >
              <span>Request Database Consultation</span>
              <FiArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
