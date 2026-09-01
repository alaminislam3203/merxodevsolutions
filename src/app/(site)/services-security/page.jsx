'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FiArrowRight,
  FiCheckCircle,
  FiShield,
  FiLock,
  FiKey,
  FiEye,
  FiAlertTriangle,
  FiUserCheck,
  FiActivity,
  FiServer,
  FiChevronDown,
} from 'react-icons/fi';
import { FaUserShield, FaFingerprint } from 'react-icons/fa';

export default function ServicesSecurityPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const stats = [
    { value: '100%', label: 'OWASP Top 10 Compliant' },
    { value: '2FA/MFA', label: 'Multi-Factor Defense' },
    { value: 'Zero-Trust', label: 'Role-Based Access (RBAC)' },
    { value: '256-Bit', label: 'End-to-End Encryption' },
  ];

  const featureMeta = [
    {
      icon: <FiShield size={24} />,
      title: 'OAuth 2.0 & NextAuth / Auth0 System',
      desc: 'Seamless multi-provider authentication with Google, GitHub, Apple, and passwordless magic links with JWT token rotation.',
      lightBg: 'bg-emerald-50 dark:bg-emerald-950/80',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      borderGlow: 'hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-emerald-500/15',
    },
    {
      icon: <FaFingerprint size={24} />,
      title: 'Two-Factor Authentication (2FA/TOTP)',
      desc: 'Time-based OTP verification via Google Authenticator, Authy, hardware keys (WebAuthn/FIDO2), and SMS backup codes.',
      lightBg: 'bg-teal-50 dark:bg-teal-950/80',
      iconColor: 'text-teal-600 dark:text-teal-400',
      borderGlow: 'hover:border-teal-400 dark:hover:border-teal-600 hover:shadow-teal-500/15',
    },
    {
      icon: <FaUserShield size={24} />,
      title: 'Granular Role-Based Access Control (RBAC)',
      desc: 'Hierarchical permission trees, custom tenant roles, middleware route guards, and granular action authorizations.',
      lightBg: 'bg-violet-50 dark:bg-violet-950/80',
      iconColor: 'text-violet-600 dark:text-violet-400',
      borderGlow: 'hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-violet-500/15',
    },
    {
      icon: <FiLock size={24} />,
      title: 'Data-at-Rest & In-Transit Encryption',
      desc: 'AES-256 database column encryption, TLS 1.3 cryptographic protocols, secure HTTP-only cookies, and salt hashing (Argon2/Bcrypt).',
      lightBg: 'bg-cyan-50 dark:bg-cyan-950/80',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      borderGlow: 'hover:border-cyan-400 dark:hover:border-cyan-600 hover:shadow-cyan-500/15',
    },
    {
      icon: <FiAlertTriangle size={24} />,
      title: 'OWASP Vulnerability & Pen Testing',
      desc: 'Proactive mitigation of SQL injection, XSS, CSRF, SSRF, Broken Object Level Authorization (BOLA), and session hijacking.',
      lightBg: 'bg-rose-50 dark:bg-rose-950/80',
      iconColor: 'text-rose-600 dark:text-rose-400',
      borderGlow: 'hover:border-rose-400 dark:hover:border-rose-600 hover:shadow-rose-500/15',
    },
    {
      icon: <FiActivity size={24} />,
      title: 'DDoS Mitigation & Cloudflare Armor',
      desc: 'Cloudflare WAF rules, bot fight mode, IP reputation blocking, rate-limit triggers, and malicious request scrubbers.',
      lightBg: 'bg-amber-50 dark:bg-amber-950/80',
      iconColor: 'text-amber-600 dark:text-amber-400',
      borderGlow: 'hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-amber-500/15',
    },
    {
      icon: <FiEye size={24} />,
      title: 'Audit Logging & Intrusion Detection',
      desc: 'Immutable administrative audit trails, suspicious IP login anomaly alerts, and brute-force lockouts.',
      lightBg: 'bg-indigo-50 dark:bg-indigo-950/80',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      borderGlow: 'hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-indigo-500/15',
    },
    {
      icon: <FiKey size={24} />,
      title: 'Secrets Management & Vault Security',
      desc: 'Zero-hardcoded secrets policy with AWS Secrets Manager, Doppler, and secure serverless environment isolation.',
      lightBg: 'bg-pink-50 dark:bg-pink-950/80',
      iconColor: 'text-pink-600 dark:text-pink-400',
      borderGlow: 'hover:border-pink-400 dark:hover:border-pink-600 hover:shadow-pink-500/15',
    },
    {
      icon: <FiServer size={24} />,
      title: 'Database Security & Row-Level Policies',
      desc: 'PostgreSQL Row-Level Security (RLS), Prisma schema verification, connection pooling security, and automated encrypted backups.',
      lightBg: 'bg-green-50 dark:bg-green-950/80',
      iconColor: 'text-green-600 dark:text-green-400',
      borderGlow: 'hover:border-green-400 dark:hover:border-green-600 hover:shadow-green-500/15',
    },
  ];

  const techStack = [
    { label: 'NextAuth.js v5', category: 'Auth Engine' },
    { label: 'JWT & Jose', category: 'Tokens' },
    { label: 'Bcrypt & Argon2', category: 'Hashing' },
    { label: 'TOTP / Google Auth', category: '2FA' },
    { label: 'Cloudflare WAF', category: 'DDoS Defense' },
    { label: 'PostgreSQL RLS', category: 'DB Security' },
    { label: 'Helmet & CSP', category: 'Headers' },
    { label: 'Redis Rate Limiter', category: 'Brute Force' },
  ];

  const plans = [
    {
      name: 'Auth System & RBAC',
      price: 'BDT 1400',
      desc: 'Complete modern authentication setup with OAuth providers and multi-role user dashboards.',
      features: [
        'NextAuth / JWT Login & Registration',
        'Google & GitHub Social Logins',
        'Password Reset & Verification Emails',
        'Role-Based Dashboard Permissions',
        'Secure HTTP-Only Cookie Sessions',
        '15 Days Integration Warranty',
      ],
      popular: false,
      cta: 'Implement Auth System',
    },
    {
      name: 'Full Security Hardening & 2FA',
      price: 'BDT 2700',
      desc: 'Our most recommended package for SaaS, e-commerce, and fintech platforms demanding ironclad safety.',
      features: [
        'Two-Factor Authentication (2FA/TOTP)',
        'Full OWASP Top 10 Vulnerability Audit',
        'Redis Rate Limiting & Anti-Brute-Force',
        'Security Headers & Strict CSP Config',
        'Encrypted Sensitive DB Fields',
        'Audit Logging & Suspicious Alerting',
        '30 Days Security Monitoring',
      ],
      popular: true,
      cta: 'Harden Application Now',
    },
    {
      name: 'Enterprise Zero-Trust Defense',
      price: 'BDT 3900',
      desc: 'End-to-end enterprise compliance, penetration testing, and multi-tenant security architecture.',
      features: [
        'Comprehensive Penetration Testing',
        'Cloudflare Enterprise WAF Ruleset',
        'PostgreSQL Row-Level Security (RLS)',
        'GDPR/HIPAA Data Protection Specs',
        'Automated Intrusion Detection & Reports',
        'Dedicated Security Architect Support',
        '60 Days Priority Warranty',
      ],
      popular: false,
      cta: 'Request Enterprise Audit',
    },
  ];

  const faqs = [
    {
      q: 'How do you protect users against password leaks and brute-force attacks?',
      a: 'We use adaptive Bcrypt/Argon2 hashing with high salt rounds, enforce strong password policies, rate-limit login attempts using Redis, and trigger temporary account lockouts upon repeated failures.',
    },
    {
      q: 'Can you implement social login alongside email/password and phone OTP?',
      a: 'Yes! We support hybrid login systems allowing users to seamlessly sign in with Google, GitHub, Apple, Email Magic Links, or Bangladeshi mobile OTPs.',
    },
    {
      q: 'What is Row-Level Security (RLS) and why is it important for SaaS?',
      a: 'RLS ensures that even if an attacker attempts an unauthorized query, the database itself guarantees that user A can NEVER view or modify user B’s records at the storage level.',
    },
  ];

  return (
    <main className="bg-white dark:bg-zinc-950 text-[#27003B] dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-30 blur-3xl animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, #10b981, #6366f1, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-xs text-zinc-400 font-raleway mb-6"
          >
            <Link href="/" className="hover:text-emerald-500 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-emerald-500 transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
              Authentication & Security
            </span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/90 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 uppercase tracking-widest font-raleway mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Ironclad Zero-Trust Web Protection
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase tracking-wide leading-tight mb-6 text-[#27003B] dark:text-white">
            Authentication &{' '}
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 bg-clip-text text-transparent animated-gradient-text">
              Security
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto mb-10 font-raleway">
            Protect your users, data, and revenue with enterprise-grade OAuth 2.0 authentication, 2FA/MFA, role-based access control, and OWASP vulnerability defense.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/contact?service=Authentication%20%26%20Security"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 text-white text-sm font-black uppercase tracking-wider font-raleway hover:shadow-xl hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300"
            >
              <span>Protect Your App</span>
              <FiArrowRight size={18} />
            </Link>
            <Link
              href="/our-projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-sm font-bold font-raleway text-zinc-800 dark:text-zinc-200 hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300"
            >
              Security Audits
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 text-xs font-semibold text-zinc-600 dark:text-zinc-400 font-raleway">
            <div className="flex items-center justify-center gap-1.5">
              <FiShield className="text-emerald-500" />
              <span>OWASP Top 10 Immune</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FaFingerprint className="text-teal-500" />
              <span>2FA & Google Auth</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FiLock className="text-violet-500" />
              <span>AES-256 Encryption</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FaUserShield className="text-cyan-500" />
              <span>Role-Based Guards</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="px-4 sm:px-6 pb-20" aria-label="Security stats">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 backdrop-blur-xl shadow-xl shadow-emerald-950/5 card-hover-lift"
            >
              <p className="text-3xl sm:text-4xl font-display uppercase tracking-wide bg-gradient-to-r from-emerald-500 to-indigo-600 bg-clip-text text-transparent mb-1">
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
            <span className="inline-block text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-raleway mb-3">
              ✦ Defense-in-Depth Architecture
            </span>
            <h2
              id="features-heading"
              className="font-display text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
            >
              Comprehensive Security{' '}
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 bg-clip-text text-transparent">
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

                  <h3 className="font-display text-xl uppercase tracking-wide text-zinc-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-raleway">
                    {feature.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 font-raleway group-hover:translate-x-1 transition-transform">
                  <span>Zero-Trust Verified</span>
                  <FiCheckCircle size={14} className="text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Pills */}
      <section className="px-4 sm:px-6 pb-24" aria-label="Security stack">
        <div className="max-w-6xl mx-auto p-10 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-br from-emerald-50/50 via-white to-indigo-50/50 dark:from-zinc-900/90 dark:via-zinc-900/60 dark:to-zinc-950 backdrop-blur-2xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-raleway mb-2 block">
              ✦ Hardened Security Standards
            </span>
            <h3 className="font-display text-2xl sm:text-4xl uppercase tracking-wide">
              Security Toolchain & Protocols
            </h3>
          </div>

          <div className="flex flex-wrap gap-3 justify-center items-center">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-sm hover:border-emerald-500 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-indigo-600" />
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
            <span className="inline-block text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-raleway mb-3">
              ✦ Transparent Security Hardening
            </span>
            <h2
              id="pricing-heading"
              className="font-display text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
            >
              Choose Your{' '}
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 bg-clip-text text-transparent">
                Defense Package
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl transition-all duration-300 card-hover-lift ${
                  plan.popular
                    ? 'border-2 border-emerald-500 bg-gradient-to-b from-emerald-50/80 via-white to-white dark:from-emerald-950/50 dark:via-zinc-900 dark:to-zinc-900 shadow-2xl shadow-emerald-500/20 scale-105 z-10'
                    : 'border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/80 shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-indigo-600 text-white text-xs font-black uppercase tracking-widest shadow-md">
                    ★ Maximum Security
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
                    <span className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-emerald-600 dark:text-emerald-400">
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
                  href={`/contact?service=Authentication%20%26%20Security&package=${encodeURIComponent(plan.name)}`}
                  className={`w-full py-4 rounded-2xl text-center text-sm font-black uppercase tracking-wider font-raleway transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 text-white hover:opacity-95 shadow-lg shadow-emerald-500/25'
                      : 'border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 hover:border-emerald-500 hover:text-emerald-600'
                  }`}
                >
                  {plan.cta || 'Get Protected'}
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
            <span className="text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-raleway mb-2 block">
              ✦ Security FAQs
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
                      className={`text-emerald-600 dark:text-emerald-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
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
        <div className="relative max-w-6xl mx-auto p-10 sm:p-16 rounded-3xl overflow-hidden bg-gradient-to-r from-[#012419] via-[#021f24] to-[#0a182e] border border-emerald-500/30 text-white text-center shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-400 font-raleway mb-4">
              ✦ Total Data Security & Peace of Mind
            </span>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase tracking-wide mb-6">
              Lock Down Your Web App Against Threats
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 font-raleway leading-relaxed mb-8">
              Protect your users and corporate assets with full-stack authentication hardening and real-time threat prevention.
            </p>
            <Link
              href="/contact?service=Authentication%20%26%20Security"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 text-white font-black text-sm uppercase tracking-wider font-raleway hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300"
            >
              <span>Schedule Security Audit</span>
              <FiArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
