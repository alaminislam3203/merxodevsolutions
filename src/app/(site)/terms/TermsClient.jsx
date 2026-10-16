'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '@/components/i18n';
import {
  FiFileText,
  FiCheckCircle,
  FiShield,
  FiCode,
  FiDollarSign,
  FiRefreshCw,
  FiClock,
  FiArrowRight,
  FiAward,
} from 'react-icons/fi';

const highlightIcons = [
  <FiCode key="code" className="w-5 h-5 text-violet-500" />,
  <FiAward key="award" className="w-5 h-5 text-emerald-500" />,
  <FiDollarSign key="dollar" className="w-5 h-5 text-amber-500" />,
  <FiShield key="shield" className="w-5 h-5 text-cyan-500" />,
];

const defaultHighlights = [
  {
    title: 'Complete IP Transfer',
    desc: 'You own 100% of your bespoke source code, database architectures, and designs upon final milestone payment.',
  },
  {
    title: '30-Day Free Warranty',
    desc: 'Every project includes 30 days of complimentary bug-fixing and technical stabilization post-deployment.',
  },
  {
    title: 'Milestone-Based Billing',
    desc: 'Pay safely in structured phases (kickoff, review, final delivery). No surprise fees or hidden charges.',
  },
  {
    title: 'Built-in Mutual NDA',
    desc: 'Both parties are legally protected against unauthorized disclosure of proprietary data and business strategies.',
  },
];

const defaultSections = [
  { id: 'acceptance', label: '1. Acceptance of Terms' },
  { id: 'services-scope', label: '2. Services & Statements of Work' },
  { id: 'client-duties', label: '3. Client Responsibilities' },
  { id: 'ip-ownership', label: '4. IP & Source Code Ownership' },
  { id: 'pricing-payment', label: '5. Milestones & Payment Terms' },
  { id: 'revisions-scope', label: '6. Revisions & Scope Changes' },
  { id: 'warranty-support', label: '7. 30-Day Warranty & SLA' },
  { id: 'disclaimers', label: '8. Disclaimers & Limitations' },
  { id: 'confidentiality', label: '9. Confidentiality & Non-Disclosure' },
  { id: 'termination', label: '10. Termination & Handover' },
  { id: 'governing-law', label: '11. Governing Law & Disputes' },
  { id: 'contact-terms', label: '12. Legal Inquiries' },
];

export default function TermsClient() {
  const { t } = useTranslation();

  const localizedHighlights = t('termsPage.highlights', { returnObjects: true });
  const highlightsList =
    Array.isArray(localizedHighlights) && localizedHighlights.length === 4
      ? localizedHighlights
      : defaultHighlights;

  const localizedSections = t('termsPage.sections', { returnObjects: true });
  const sectionsList =
    Array.isArray(localizedSections) && localizedSections.length === 12
      ? localizedSections
      : defaultSections;

  return (
    <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 bg-zinc-50/50 dark:bg-black text-[#27003B] dark:text-zinc-100 transition-colors">
      {/* Background ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-600/10 via-violet-500/10 to-fuchsia-500/10 blur-[130px] opacity-70 dark:opacity-40" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* ── Breadcrumbs & Switcher ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs font-semibold uppercase tracking-wider font-exo-extralight text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
              {t('termsPage.breadcrumbHome', 'Home')}
            </Link>
            <span>/</span>
            <span className="text-violet-600 dark:text-violet-400">
              {t('termsPage.breadcrumbCurrent', 'Terms of Service')}
            </span>
          </div>

          {/* Toggle pill between Privacy & Terms */}
          <div className="inline-flex p-1 rounded-xl bg-zinc-200/80 dark:bg-zinc-900/90 border border-zinc-300/80 dark:border-zinc-800 text-xs">
            <Link
              href="/privacy"
              className="px-3.5 py-1.5 rounded-lg hover:text-violet-600 dark:hover:text-violet-400 text-zinc-600 dark:text-zinc-400 transition-colors font-medium"
            >
              {t('termsPage.tabPrivacy', 'Privacy Policy')}
            </Link>
            <span className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-zinc-800 text-violet-600 dark:text-violet-300 font-bold shadow-sm">
              {t('termsPage.tabTerms', 'Terms of Service')}
            </span>
          </div>
        </div>

        {/* ── Page Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase font-exo-extralight bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-200/80 dark:border-cyan-800/80 mb-5 shadow-sm">
            <FiShield className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-pulse" />
            {t('termsPage.badge', 'Fair & Transparent Engagement')}
          </div>

          <h1 className="font-exo-medium text-3xl sm:text-5xl lg:text-6xl font-black text-[#27003B] dark:text-white uppercase tracking-tight leading-tight mb-5">
            {t('termsPage.titleStart', 'Terms of ')}
            <span className="bg-gradient-to-r from-cyan-500 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              {t('termsPage.titleHighlight', 'Service')}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-exo-extralight leading-relaxed">
            {t(
              'termsPage.desc',
              'These terms establish a balanced, collaborative foundation for our engineering contracts, ensuring crystal-clear deliverables, milestone payments, and unambiguous intellectual property ownership.'
            )}
          </p>

          {/* Meta badge strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <FiClock className="w-3 h-3 text-cyan-500" />
              {t('termsPage.effective', 'Effective: Jan 1, 2026')}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <FiRefreshCw className="w-3 h-3 text-violet-500" />
              {t('termsPage.lastRevised', 'Last Revised: March 2026')}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <FiCheckCircle className="w-3 h-3" />
              {t('termsPage.status', 'Standard Agency Agreement')}
            </span>
          </div>
        </div>

        {/* ── Key Highlights Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {highlightsList.map((h, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                {highlightIcons[i]}
              </div>
              <h2 className="text-sm font-bold font-exo-extralight text-[#27003B] dark:text-white uppercase mb-1 tracking-wide">
                {h.title}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-exo-extralight">
                {h.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ── Main Two Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sticky Table of Contents & Quick Support */}
          <aside className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="p-5 rounded-2xl bg-white/90 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl shadow-lg">
              <h3 className="text-xs font-bold uppercase tracking-widest font-exo-extralight text-cyan-600 dark:text-cyan-400 mb-4 flex items-center gap-2">
                <FiFileText className="w-4 h-4" />
                {t('termsPage.tocTitle', 'Table of Contents')}
              </h3>
              <nav className="space-y-1.5 text-xs font-medium font-exo-extralight">
                {sectionsList.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Quick Action Widget */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-600 to-violet-600 text-white shadow-xl">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-full inline-block mb-3 font-exo-extralight">
                {t('termsPage.ctaBadge', 'Custom Enterprise Contracts')}
              </span>
              <h4 className="text-base font-bold font-exo-medium uppercase tracking-wide mb-2">
                {t('termsPage.ctaTitle', 'Have Specific Terms?')}
              </h4>
              <p className="text-xs text-white/90 leading-relaxed mb-4 font-exo-extralight">
                {t(
                  'termsPage.ctaDesc',
                  'We accommodate enterprise master service agreements (MSAs) and custom vendor onboarding workflows.'
                )}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white text-cyan-800 hover:bg-zinc-100 font-bold text-xs uppercase tracking-wider font-exo-extralight transition-transform hover:scale-[1.02] active:scale-95 shadow-md"
              >
                <span>{t('termsPage.ctaBtn', 'Request Custom SOW')}</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>

          {/* Right Column: Full Document Sections */}
          <div className="lg:col-span-8 space-y-10">
            {/* Section 1 */}
            <section
              id="acceptance"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-md backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-exo-medium uppercase tracking-wide text-[#27003B] dark:text-white">
                  {t('termsPage.s1Title', 'Acceptance of Terms')}
                </h2>
              </div>
              <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300 font-exo-extralight leading-relaxed">
                <p>
                  {t(
                    'termsPage.s1P1',
                    'These Terms of Service constitute a legally binding agreement between MerxoDev Solutions ("Agency", "we", "us") and the person or corporate entity ("Client", "you") engaging our digital engineering, software architecture, UI/UX design, or cloud maintenance services.'
                  )}
                </p>
                <p>
                  {t(
                    'termsPage.s1P2',
                    'By approving a formal project proposal, paying an invoice deposit, or signing a Statement of Work (SOW), you confirm that you have read, understood, and agreed to be governed by these terms.'
                  )}
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section
              id="services-scope"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-md backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-exo-medium uppercase tracking-wide text-[#27003B] dark:text-white">
                  {t('termsPage.s2Title', 'Services & Statements of Work')}
                </h2>
              </div>
              <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300 font-exo-extralight leading-relaxed">
                <p>
                  {t(
                    'termsPage.s2Intro',
                    'We deliver custom digital solutions across multiple specialized disciplines:'
                  )}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40">
                    <strong className="text-violet-600 dark:text-violet-400 block mb-1">
                      {t('termsPage.s2Card1Title', 'Web Applications & SaaS')}
                    </strong>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {t(
                        'termsPage.s2Card1Desc',
                        'Next.js, React, Node.js, and high-performance serverless systems.'
                      )}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40">
                    <strong className="text-cyan-600 dark:text-cyan-400 block mb-1">
                      {t('termsPage.s2Card2Title', 'E-Commerce Architecture')}
                    </strong>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {t(
                        'termsPage.s2Card2Desc',
                        'Custom storefronts, multi-vendor platforms, and checkout optimizations.'
                      )}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40">
                    <strong className="text-emerald-600 dark:text-emerald-400 block mb-1">
                      {t('termsPage.s2Card3Title', 'Mobile Applications')}
                    </strong>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {t(
                        'termsPage.s2Card3Desc',
                        'Cross-platform iOS and Android apps powered by React Native and Flutter.'
                      )}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40">
                    <strong className="text-amber-600 dark:text-amber-400 block mb-1">
                      {t('termsPage.s2Card4Title', 'Cloud, Database & DevOps')}
                    </strong>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {t(
                        'termsPage.s2Card4Desc',
                        'PostgreSQL, Prisma, AWS, Vercel CI/CD pipelines, and automated backups.'
                      )}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-2">
                  {t(
                    'termsPage.s2Note',
                    'Each engagement is governed by an accompanying Statement of Work (SOW) outlining technical specifications, timelines, milestone deliverables, and agreed fees.'
                  )}
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section
              id="client-duties"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-md backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-exo-medium uppercase tracking-wide text-[#27003B] dark:text-white">
                  {t('termsPage.s3Title', 'Client Responsibilities')}
                </h2>
              </div>
              <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300 font-exo-extralight leading-relaxed">
                <p>
                  {t(
                    'termsPage.s3Intro',
                    'To ensure milestone deliveries remain strictly on schedule, Client agrees to:'
                  )}
                </p>
                <ul className="space-y-2 list-none pl-0 text-xs">
                  <li className="flex items-start gap-2.5">
                    <FiCheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>
                      <strong>{t('termsPage.s3Item1Label', 'Asset & Copy Delivery:')} </strong>
                      {t(
                        'termsPage.s3Item1Desc',
                        'Provide required logos, copy, branding guidelines, and product information in a timely manner.'
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FiCheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>
                      <strong>{t('termsPage.s3Item2Label', 'Review Turnaround:')} </strong>
                      {t(
                        'termsPage.s3Item2Desc',
                        'Review sprint demonstrations and provide unified, consolidated feedback within 3–5 business days.'
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FiCheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>
                      <strong>{t('termsPage.s3Item3Label', 'Legal Authorization:')} </strong>
                      {t(
                        'termsPage.s3Item3Desc',
                        'Ensure that all third-party media, fonts, and trademarks provided to us are legally licensed for use.'
                      )}
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section
              id="ip-ownership"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-md backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-exo-medium uppercase tracking-wide text-[#27003B] dark:text-white">
                  {t('termsPage.s4Title', 'IP & Source Code Ownership')}
                </h2>
              </div>
              <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-300 font-exo-extralight leading-relaxed">
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-200 font-medium leading-relaxed">
                  <strong>{t('termsPage.s4TransferLabel', 'Unconditional Transfer:')} </strong>
                  {t(
                    'termsPage.s4TransferDesc',
                    'Upon receipt of 100% of agreed contract fees, Client receives full, unconditional ownership of all custom software code, UI designs, and database schemas created specifically for the project.'
                  )}
                </div>
                <p>
                  <strong>{t('termsPage.s4ToolingLabel', 'Agency Tooling & Open-Source:')} </strong>
                  {t(
                    'termsPage.s4ToolingDesc',
                    'Pre-existing reusable utility scripts, open-source libraries (e.g. Next.js, React, Tailwind, Prisma), and third-party modules remain governed by their respective MIT/Apache licenses.'
                  )}
                </p>
                <p>
                  <strong>{t('termsPage.s4RepoLabel', 'Repository Handover:')} </strong>
                  {t(
                    'termsPage.s4RepoDesc',
                    'Upon final clearance, we transfer full Git repository administrator access to Client’s designated GitHub/GitLab organizations.'
                  )}
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section
              id="pricing-payment"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-md backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-sm">
                  5
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-exo-medium uppercase tracking-wide text-[#27003B] dark:text-white">
                  {t('termsPage.s5Title', 'Milestones & Payment Terms')}
                </h2>
              </div>
              <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300 font-exo-extralight leading-relaxed">
                <p>
                  {t(
                    'termsPage.s5Intro',
                    'Unless customized in your specific SOW, standard fixed-price projects follow a milestone billing schedule:'
                  )}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
                  <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                    <span className="text-lg font-black text-violet-600 dark:text-violet-400 block mb-1">
                      {t('termsPage.s5Card1Title', '30% Deposit')}
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {t(
                        'termsPage.s5Card1Desc',
                        'Project kickoff, UX wireframing & architecture planning.'
                      )}
                    </span>
                  </div>
                  <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                    <span className="text-lg font-black text-cyan-600 dark:text-cyan-400 block mb-1">
                      {t('termsPage.s5Card2Title', '40% Milestone')}
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {t(
                        'termsPage.s5Card2Desc',
                        'Core feature completion, staging environment demo.'
                      )}
                    </span>
                  </div>
                  <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                    <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 block mb-1">
                      {t('termsPage.s5Card3Title', '30% Final')}
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {t(
                        'termsPage.s5Card3Desc',
                        'Final QA, DNS propagation & production deployment.'
                      )}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-2">
                  {t(
                    'termsPage.s5Note',
                    'Invoices are payable within 7 business days via Wire Transfer, Wise, Stripe, or approved bank channels.'
                  )}
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section
              id="revisions-scope"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-md backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-sm">
                  6
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-exo-medium uppercase tracking-wide text-[#27003B] dark:text-white">
                  {t('termsPage.s6Title', 'Revisions & Scope Changes')}
                </h2>
              </div>
              <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300 font-exo-extralight leading-relaxed">
                <p>
                  {t(
                    'termsPage.s6P1',
                    'Every contract includes 2–3 rounds of design and interface revisions within the approved scope of work.'
                  )}
                </p>
                <p>
                  <strong>{t('termsPage.s6ScopeCreepLabel', 'Scope Creep Policy:')} </strong>
                  {t(
                    'termsPage.s6ScopeCreepDesc',
                    'New feature requests, structural database changes, or architectural shifts introduced after milestone sign-off are quoted transparently as formal Change Requests (CR) before engineering begins.'
                  )}
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section
              id="warranty-support"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-md backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
                  7
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-exo-medium uppercase tracking-wide text-[#27003B] dark:text-white">
                  {t('termsPage.s7Title', '30-Day Free Warranty & SLA')}
                </h2>
              </div>
              <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300 font-exo-extralight leading-relaxed">
                <p>
                  {t(
                    'termsPage.s7P1',
                    'We stand 100% behind our code. Every bespoke project includes a 30-day complimentary post-launch warranty period starting on the date of production release.'
                  )}
                </p>
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 space-y-1.5 text-xs">
                  <p>
                    • <strong>{t('termsPage.s7IncludedLabel', 'Included in Warranty:')} </strong>
                    {t(
                      'termsPage.s7IncludedDesc',
                      'Fixing reproducible bugs, rendering defects, or database query errors stemming from our development.'
                    )}
                  </p>
                  <p>
                    • <strong>{t('termsPage.s7ExcludedLabel', 'Excluded from Warranty:')} </strong>
                    {t(
                      'termsPage.s7ExcludedDesc',
                      'Issues caused by unauthorized third-party code modifications, external API outages (e.g. Stripe, OpenAI), or client hosting server terminations.'
                    )}
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section
              id="disclaimers"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-md backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-sm">
                  8
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-exo-medium uppercase tracking-wide text-[#27003B] dark:text-white">
                  {t('termsPage.s8Title', 'Disclaimers & Limitations')}
                </h2>
              </div>
              <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300 font-exo-extralight leading-relaxed">
                <p>
                  {t(
                    'termsPage.s8P1',
                    'While we engineer software to modern performance and security standards, Agency cannot guarantee specific commercial outcomes, sales conversions, or search engine rankings, as those depend on market forces and marketing execution.'
                  )}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {t(
                    'termsPage.s8P2',
                    'To the maximum extent permitted by law, Agency’s cumulative financial liability for any claim arising from an engagement shall not exceed the total fees actually paid by Client under the applicable SOW.'
                  )}
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section
              id="confidentiality"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-md backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-sm">
                  9
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-exo-medium uppercase tracking-wide text-[#27003B] dark:text-white">
                  {t('termsPage.s9Title', 'Confidentiality & Non-Disclosure')}
                </h2>
              </div>
              <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300 font-exo-extralight leading-relaxed">
                <p>
                  {t(
                    'termsPage.s9P1',
                    'Both parties agree to protect and keep confidential all non-public technical, financial, and strategic information disclosed during the engagement.'
                  )}
                </p>
                <p>
                  {t(
                    'termsPage.s9P2',
                    'This obligation of non-disclosure survives the delivery or termination of the project for a period of 3 years.'
                  )}
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section
              id="termination"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-md backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
                  10
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-exo-medium uppercase tracking-wide text-[#27003B] dark:text-white">
                  {t('termsPage.s10Title', 'Termination & Handover')}
                </h2>
              </div>
              <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300 font-exo-extralight leading-relaxed">
                <p>
                  {t(
                    'termsPage.s10P1',
                    'Either party may terminate an agreement with 14 business days written notice. In the event of early termination, Client pays only for approved milestones and hours completed to date, and Agency immediately transfers all corresponding project code and assets.'
                  )}
                </p>
              </div>
            </section>

            {/* Section 11 */}
            <section
              id="governing-law"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-md backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-sm">
                  11
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-exo-medium uppercase tracking-wide text-[#27003B] dark:text-white">
                  {t('termsPage.s11Title', 'Governing Law & Disputes')}
                </h2>
              </div>
              <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300 font-exo-extralight leading-relaxed">
                <p>
                  {t(
                    'termsPage.s11P1',
                    'These Terms shall be interpreted and governed in accordance with the commercial and civil laws of Bangladesh. In the event of any disagreement, both parties commit to an initial 30-day amicable mediation period prior to initiating any formal arbitration.'
                  )}
                </p>
              </div>
            </section>

            {/* Section 12 */}
            <section
              id="contact-terms"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-md backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-sm">
                  12
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-exo-medium uppercase tracking-wide text-[#27003B] dark:text-white">
                  {t('termsPage.s12Title', 'Legal Inquiries & Contracts')}
                </h2>
              </div>
              <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-300 font-exo-extralight leading-relaxed">
                <p>
                  {t(
                    'termsPage.s12P1',
                    'For contract queries, master service agreement reviews, or billing questions, reach out directly:'
                  )}
                </p>
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700 space-y-2 text-xs">
                  <p>
                    <strong>{t('termsPage.s12Entity', 'Entity:')} </strong>
                    MerxoDev Solutions
                  </p>
                  <p>
                    <strong>{t('termsPage.s12Email', 'Email:')} </strong>
                    <a
                      href="mailto:merxodevsolutions@gmail.com"
                      className="text-cyan-600 dark:text-cyan-400 underline font-mono"
                    >
                      merxodevsolutions@gmail.com
                    </a>
                  </p>
                  <p>
                    <strong>{t('termsPage.s12Office', 'Office:')} </strong>
                    {t('termsPage.s12OfficeVal', 'Rangpur, Bangladesh')}
                  </p>
                  <p>
                    <strong>{t('termsPage.s12Desk', 'Legal Desk:')} </strong>
                    {t(
                      'termsPage.s12DeskVal',
                      'Available Sunday through Thursday (9:00 AM – 6:00 PM BST)'
                    )}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
