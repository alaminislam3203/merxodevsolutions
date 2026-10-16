'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '@/components/i18n';
import {
  FiShield,
  FiLock,
  FiServer,
  FiUserCheck,
  FiCheckCircle,
  FiRefreshCw,
  FiFileText,
  FiArrowRight,
  FiClock,
} from 'react-icons/fi';

const highlightIcons = [
  <FiLock key="lock" className="w-5 h-5 text-violet-500" />,
  <FiShield key="shield" className="w-5 h-5 text-cyan-500" />,
  <FiServer key="server" className="w-5 h-5 text-emerald-500" />,
  <FiUserCheck key="user" className="w-5 h-5 text-amber-500" />,
];

const defaultHighlights = [
  {
    title: '100% Client Code Ownership',
    desc: 'You retain full rights and ownership of your bespoke software, source code, and design assets.',
  },
  {
    title: 'Zero Data Selling',
    desc: 'We never sell, broker, or monetize your contact information, analytics, or project data.',
  },
  {
    title: 'Bank-Grade Encryption',
    desc: 'All project data, credentials, and API tokens are handled with strict TLS 1.3 encryption and access controls.',
  },
  {
    title: 'Mutual NDA Ready',
    desc: 'We sign comprehensive Non-Disclosure Agreements prior to accessing sensitive repositories and databases.',
  },
];

const defaultSections = [
  { id: 'introduction', label: '1. Introduction & Scope' },
  { id: 'data-collection', label: '2. Information We Collect' },
  { id: 'data-usage', label: '3. How We Use Your Data' },
  { id: 'code-and-ip', label: '4. Client IP & Code Privacy' },
  { id: 'third-parties', label: '5. Subprocessors & Cloud Vendors' },
  { id: 'cookies', label: '6. Cookies & Analytics' },
  { id: 'data-security', label: '7. Security Standards' },
  { id: 'your-rights', label: '8. Your Rights (GDPR & Global)' },
  { id: 'retention', label: '9. Data Retention & Deletion' },
  { id: 'contact', label: '10. Contact & Privacy Officer' },
];

export default function PrivacyClient() {
  const { t } = useTranslation();

  const localizedHighlights = t('privacyPage.highlights', { returnObjects: true });
  const highlightsList =
    Array.isArray(localizedHighlights) && localizedHighlights.length === 4
      ? localizedHighlights
      : defaultHighlights;

  const localizedSections = t('privacyPage.sections', { returnObjects: true });
  const sectionsList =
    Array.isArray(localizedSections) && localizedSections.length === 10
      ? localizedSections
      : defaultSections;

  return (
    <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 bg-zinc-50/50 dark:bg-black text-[#27003B] dark:text-zinc-100 transition-colors">
      {/* Background ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-tr from-violet-600/10 via-fuchsia-500/10 to-cyan-500/10 blur-[130px] opacity-70 dark:opacity-40" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* ── Breadcrumbs & Switcher ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs font-semibold uppercase tracking-wider font-exo-extralight text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
              {t('privacyPage.breadcrumbHome', 'Home')}
            </Link>
            <span>/</span>
            <span className="text-violet-600 dark:text-violet-400">
              {t('privacyPage.breadcrumbCurrent', 'Privacy Policy')}
            </span>
          </div>

          {/* Toggle pill between Privacy & Terms */}
          <div className="inline-flex p-1 rounded-xl bg-zinc-200/80 dark:bg-zinc-900/90 border border-zinc-300/80 dark:border-zinc-800 text-xs">
            <span className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-zinc-800 text-violet-600 dark:text-violet-300 font-bold shadow-sm">
              {t('privacyPage.tabPrivacy', 'Privacy Policy')}
            </span>
            <Link
              href="/terms"
              className="px-3.5 py-1.5 rounded-lg hover:text-violet-600 dark:hover:text-violet-400 text-zinc-600 dark:text-zinc-400 transition-colors font-medium"
            >
              {t('privacyPage.tabTerms', 'Terms of Service')}
            </Link>
          </div>
        </div>

        {/* ── Page Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase font-exo-extralight bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 border border-violet-200/80 dark:border-violet-800/80 mb-5 shadow-sm">
            <FiShield className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 animate-pulse" />
            {t('privacyPage.badge', 'Transparency & Security')}
          </div>

          <h1 className="font-exo-medium text-3xl sm:text-5xl lg:text-6xl font-black text-[#27003B] dark:text-white uppercase tracking-tight leading-tight mb-5">
            {t('privacyPage.titleStart', 'Privacy ')}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              {t('privacyPage.titleHighlight', 'Policy')}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-exo-extralight leading-relaxed">
            {t(
              'privacyPage.desc',
              'At MerxoDev Solutions, your privacy and intellectual property are treated with the highest level of confidentiality. Here is an honest, straightforward explanation of how your data is protected.'
            )}
          </p>

          {/* Meta badge strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <FiClock className="w-3 h-3 text-violet-500" />
              {t('privacyPage.effective', 'Effective: Jan 1, 2026')}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <FiRefreshCw className="w-3 h-3 text-cyan-500" />
              {t('privacyPage.lastRevised', 'Last Revised: March 2026')}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <FiCheckCircle className="w-3 h-3" />
              {t('privacyPage.status', 'Status: Active & Enforced')}
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
          {/* Left Column: Sticky Table of Contents & Contact Widget */}
          <aside className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="p-5 rounded-2xl bg-white/90 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl shadow-lg">
              <h3 className="text-xs font-bold uppercase tracking-widest font-exo-extralight text-violet-600 dark:text-violet-400 mb-4 flex items-center gap-2">
                <FiFileText className="w-4 h-4" />
                {t('privacyPage.tocTitle', 'Table of Contents')}
              </h3>
              <nav className="space-y-1.5 text-xs font-medium font-exo-extralight">
                {sectionsList.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-950/40 transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Quick Contact Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-600 text-white shadow-xl">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-full inline-block mb-3 font-exo-extralight">
                {t('privacyPage.ctaBadge', 'Have Legal Questions?')}
              </span>
              <h4 className="text-base font-bold font-exo-medium uppercase tracking-wide mb-2">
                {t('privacyPage.ctaTitle', 'Need a Custom NDA?')}
              </h4>
              <p className="text-xs text-white/90 leading-relaxed mb-4 font-exo-extralight">
                {t(
                  'privacyPage.ctaDesc',
                  'We sign formal client NDAs before looking at proprietary code or discussing sensitive logic.'
                )}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white text-violet-700 hover:bg-zinc-100 font-bold text-xs uppercase tracking-wider font-exo-extralight transition-transform hover:scale-[1.02] active:scale-95 shadow-md"
              >
                <span>{t('privacyPage.ctaBtn', 'Contact Legal Team')}</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>

          {/* Right Column: Full Document Sections */}
          <div className="lg:col-span-8 space-y-10">
            {/* Section 1 */}
            <section
              id="introduction"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-md backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-exo-medium uppercase tracking-wide text-[#27003B] dark:text-white">
                  {t('privacyPage.s1Title', 'Introduction & Scope')}
                </h2>
              </div>
              <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300 font-exo-extralight leading-relaxed">
                <p>
                  {t(
                    'privacyPage.s1P1',
                    'Welcome to MerxoDev Solutions ("we", "our", or "us"). We operate as a premier software development and digital solutions agency headquartered in Rangpur, Bangladesh, serving global businesses across SaaS, E-Commerce, Mobile Applications, and Cloud Systems.'
                  )}
                </p>
                <p>
                  {t(
                    'privacyPage.s1P2',
                    'This Privacy Policy details how we collect, store, process, and protect your personal information, client project assets, source code repositories, and credentials when you use our website (merxodevsolutions.pro.bd) or engage us for custom engineering contracts.'
                  )}
                </p>
                <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800/60 text-xs text-violet-900 dark:text-violet-200 font-medium leading-relaxed">
                  <strong>{t('privacyPage.s1CommitmentLabel', 'Key Commitment:')} </strong>
                  {t(
                    'privacyPage.s1Commitment',
                    'By submitting an inquiry, entering a development agreement, or browsing our site, you trust us with your ideas and data. We honor that trust with rigorous security safeguards and unconditional respect for your intellectual property.'
                  )}
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section
              id="data-collection"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-md backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-exo-medium uppercase tracking-wide text-[#27003B] dark:text-white">
                  {t('privacyPage.s2Title', 'Information We Collect')}
                </h2>
              </div>
              <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-300 font-exo-extralight leading-relaxed">
                <p>
                  {t(
                    'privacyPage.s2Intro',
                    'We only collect data that is strictly required to execute our professional engineering and advisory contracts:'
                  )}
                </p>
                <ul className="space-y-2.5 list-none pl-0">
                  <li className="flex items-start gap-2.5">
                    <FiCheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>
                      <strong>{t('privacyPage.s2Item1Label', 'Direct Contact Details:')} </strong>
                      {t(
                        'privacyPage.s2Item1Desc',
                        'Name, professional email address, phone/WhatsApp number, company name, and physical location provided via our inquiry and discovery booking forms.'
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FiCheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>
                      <strong>{t('privacyPage.s2Item2Label', 'Project Technical Specifications:')} </strong>
                      {t(
                        'privacyPage.s2Item2Desc',
                        'Product requirements documents, Figma design files, architectural schematics, database schemas, and feature wishlists shared for quoting and scoping.'
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FiCheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>
                      <strong>{t('privacyPage.s2Item3Label', 'Staging Credentials & API Keys:')} </strong>
                      {t(
                        'privacyPage.s2Item3Desc',
                        'Sandbox credentials, third-party webhook tokens (Stripe, Cloudinary, AWS), and development server access explicitly granted by clients for integration work.'
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FiCheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>
                      <strong>{t('privacyPage.s2Item4Label', 'Device & Technical Telemetry:')} </strong>
                      {t(
                        'privacyPage.s2Item4Desc',
                        'Anonymized IP addresses, browser types, referrer URLs, and operating systems collected via privacy-focused analytics to improve site load speed.'
                      )}
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section
              id="data-usage"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-md backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-exo-medium uppercase tracking-wide text-[#27003B] dark:text-white">
                  {t('privacyPage.s3Title', 'How We Use Your Data')}
                </h2>
              </div>
              <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300 font-exo-extralight leading-relaxed">
                <p>
                  {t(
                    'privacyPage.s3Intro',
                    'We process collected data exclusively for lawful business and engineering purposes:'
                  )}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/70 dark:border-zinc-700/60">
                    <h3 className="font-bold text-xs uppercase text-violet-600 dark:text-violet-400 mb-1">
                      {t('privacyPage.s3Card1Title', 'Contract Delivery')}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {t(
                        'privacyPage.s3Card1Desc',
                        'Designing, writing code, testing, and deploying custom applications agreed in your statement of work.'
                      )}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/70 dark:border-zinc-700/60">
                    <h3 className="font-bold text-xs uppercase text-cyan-600 dark:text-cyan-400 mb-1">
                      {t('privacyPage.s3Card2Title', 'Milestone Communication')}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {t(
                        'privacyPage.s3Card2Desc',
                        'Sending sprint updates, demo links, staging deployments, and invoicing notifications.'
                      )}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/70 dark:border-zinc-700/60">
                    <h3 className="font-bold text-xs uppercase text-emerald-600 dark:text-emerald-400 mb-1">
                      {t('privacyPage.s3Card3Title', 'Quality & Bug Resolution')}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {t(
                        'privacyPage.s3Card3Desc',
                        'Diagnosing system errors and ensuring compliance with performance SLAs and uptime goals.'
                      )}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/70 dark:border-zinc-700/60">
                    <h3 className="font-bold text-xs uppercase text-rose-600 dark:text-rose-400 mb-1">
                      {t('privacyPage.s3Card4Title', 'Legal & Tax Records')}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {t(
                        'privacyPage.s3Card4Desc',
                        'Maintaining accounting, tax compliance, and mutual contract execution proof.'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section
              id="code-and-ip"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-md backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-exo-medium uppercase tracking-wide text-[#27003B] dark:text-white">
                  {t('privacyPage.s4Title', 'Client IP & Code Privacy')}
                </h2>
              </div>
              <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-300 font-exo-extralight leading-relaxed">
                <p>
                  {t(
                    'privacyPage.s4Intro',
                    'As an engineering agency, we recognize that your software architecture and business logic are your most valuable intellectual assets:'
                  )}
                </p>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-2">
                  <h3 className="font-bold text-xs uppercase text-[#27003B] dark:text-white">
                    {t('privacyPage.s4Card1Title', 'Full Intellectual Property Transfer')}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {t(
                      'privacyPage.s4Card1Desc',
                      'Upon completion of project milestone payments, all bespoke source code, database architectures, graphics, and documentation belong 100% exclusively to the client. We make no claims on your IP.'
                    )}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-2">
                  <h3 className="font-bold text-xs uppercase text-[#27003B] dark:text-white">
                    {t('privacyPage.s4Card2Title', 'No Public Exposure Without Consent')}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {t(
                      'privacyPage.s4Card2Desc',
                      'We never publish your project in our case studies, portfolio, or social channels without your explicit written approval. For white-label contracts, confidentiality is permanently maintained.'
                    )}
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section
              id="third-parties"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-md backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-sm">
                  5
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-exo-medium uppercase tracking-wide text-[#27003B] dark:text-white">
                  {t('privacyPage.s5Title', 'Subprocessors & Cloud Vendors')}
                </h2>
              </div>
              <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300 font-exo-extralight leading-relaxed">
                <p>
                  {t(
                    'privacyPage.s5Intro',
                    'We work only with globally certified, SOC-2 and ISO 27001 compliant cloud infrastructure providers:'
                  )}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40">
                    <span className="font-bold text-[#27003B] dark:text-white block">
                      {t('privacyPage.s5Card1Title', 'Vercel & AWS')}
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {t(
                        'privacyPage.s5Card1Desc',
                        'Edge hosting, serverless computing, and static asset distribution.'
                      )}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40">
                    <span className="font-bold text-[#27003B] dark:text-white block">
                      {t('privacyPage.s5Card2Title', 'PostgreSQL (Neon)')}
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {t(
                        'privacyPage.s5Card2Desc',
                        'Serverless relational database hosting with TLS & automated backups.'
                      )}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40">
                    <span className="font-bold text-[#27003B] dark:text-white block">
                      {t('privacyPage.s5Card3Title', 'Cloudinary')}
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {t(
                        'privacyPage.s5Card3Desc',
                        'Optimized media asset storage and responsive image delivery.'
                      )}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40">
                    <span className="font-bold text-[#27003B] dark:text-white block">
                      {t('privacyPage.s5Card4Title', 'Resend & Nodemailer')}
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {t(
                        'privacyPage.s5Card4Desc',
                        'Transactional email notifications and contact form dispatches.'
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section
              id="cookies"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-md backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-sm">
                  6
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-exo-medium uppercase tracking-wide text-[#27003B] dark:text-white">
                  {t('privacyPage.s6Title', 'Cookies & Analytics')}
                </h2>
              </div>
              <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300 font-exo-extralight leading-relaxed">
                <p>
                  {t(
                    'privacyPage.s6Intro',
                    'We utilize cookies strictly to ensure website stability, remember theme preferences (Light vs Dark mode), and retain language settings:'
                  )}
                </p>
                <ul className="space-y-2 list-none pl-0 text-xs">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-500" />
                    <span>
                      <strong>{t('privacyPage.s6Item1Label', 'Essential Cookies:')} </strong>
                      {t(
                        'privacyPage.s6Item1Desc',
                        'Session validation and security tokens for client portal and admin interfaces.'
                      )}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500" />
                    <span>
                      <strong>{t('privacyPage.s6Item2Label', 'Functional Cookies:')} </strong>
                      {t(
                        'privacyPage.s6Item2Desc',
                        'Local storage caching for user interface states and preferred visual contrast.'
                      )}
                    </span>
                  </li>
                </ul>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {t(
                    'privacyPage.s6Note',
                    'You can disable cookies in your browser settings at any time without impacting your core browsing experience.'
                  )}
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section
              id="data-security"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-md backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
                  7
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-exo-medium uppercase tracking-wide text-[#27003B] dark:text-white">
                  {t('privacyPage.s7Title', 'Security Standards')}
                </h2>
              </div>
              <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300 font-exo-extralight leading-relaxed">
                <p>
                  {t(
                    'privacyPage.s7Intro',
                    'We deploy defensive security practices throughout our development lifecycle:'
                  )}
                </p>
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/60 space-y-2 text-xs">
                  <p>
                    • <strong>{t('privacyPage.s7P1Label', 'Transport Security:')} </strong>
                    {t(
                      'privacyPage.s7P1Desc',
                      '100% of traffic is encrypted in transit using modern TLS 1.3 encryption certificates.'
                    )}
                  </p>
                  <p>
                    • <strong>{t('privacyPage.s7P2Label', 'Role-Based Access:')} </strong>
                    {t(
                      'privacyPage.s7P2Desc',
                      'Only engineers actively assigned to your contract can access staging repositories.'
                    )}
                  </p>
                  <p>
                    • <strong>{t('privacyPage.s7P3Label', 'Environment Isolation:')} </strong>
                    {t(
                      'privacyPage.s7P3Desc',
                      'Development and production database environments are strictly separated.'
                    )}
                  </p>
                  <p>
                    • <strong>{t('privacyPage.s7P4Label', 'Automated Vulnerability Scanning:')} </strong>
                    {t(
                      'privacyPage.s7P4Desc',
                      'Dependencies are regularly audited for security advisories.'
                    )}
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section
              id="your-rights"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-md backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
                  8
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-exo-medium uppercase tracking-wide text-[#27003B] dark:text-white">
                  {t('privacyPage.s8Title', 'Your Rights (GDPR & Global)')}
                </h2>
              </div>
              <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300 font-exo-extralight leading-relaxed">
                <p>
                  {t(
                    'privacyPage.s8Intro',
                    'No matter where your business is based, you have guaranteed control over your data:'
                  )}
                </p>
                <ul className="space-y-2 list-none pl-0 text-xs">
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>
                      <strong>{t('privacyPage.s8Item1Label', 'Right to Access:')} </strong>
                      {t(
                        'privacyPage.s8Item1Desc',
                        'Request a complete export of all personal details and records we hold about you.'
                      )}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>
                      <strong>{t('privacyPage.s8Item2Label', 'Right to Erasure (Be Forgotten):')} </strong>
                      {t(
                        'privacyPage.s8Item2Desc',
                        'Request permanent deletion of your inquiry data and project communication records.'
                      )}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>
                      <strong>{t('privacyPage.s8Item3Label', 'Right to Rectification:')} </strong>
                      {t(
                        'privacyPage.s8Item3Desc',
                        'Ask us to amend any inaccurate or outdated contact information promptly.'
                      )}
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 9 */}
            <section
              id="retention"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-md backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-sm">
                  9
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-exo-medium uppercase tracking-wide text-[#27003B] dark:text-white">
                  {t('privacyPage.s9Title', 'Data Retention & Deletion')}
                </h2>
              </div>
              <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300 font-exo-extralight leading-relaxed">
                <p>
                  {t(
                    'privacyPage.s9P1',
                    'Upon final project delivery and termination of maintenance warranties, clients may request a full archival or purge of repository access, design assets, and shared sandbox credentials.'
                  )}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {t(
                    'privacyPage.s9P2',
                    'Standard tax and contractual invoicing records are retained for a period required by applicable corporate laws (typically 3 to 5 years).'
                  )}
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section
              id="contact"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-md backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-sm">
                  10
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-exo-medium uppercase tracking-wide text-[#27003B] dark:text-white">
                  {t('privacyPage.s10Title', 'Contact & Privacy Officer')}
                </h2>
              </div>
              <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-300 font-exo-extralight leading-relaxed">
                <p>
                  {t(
                    'privacyPage.s10P1',
                    'If you have inquiries regarding our data processing, wish to request an NDA, or need to exercise your GDPR rights, contact our leadership team directly:'
                  )}
                </p>
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700 space-y-2 text-xs">
                  <p>
                    <strong>{t('privacyPage.s10Entity', 'Entity:')} </strong>
                    MerxoDev Solutions
                  </p>
                  <p>
                    <strong>{t('privacyPage.s10Email', 'Email:')} </strong>
                    <a
                      href="mailto:merxodevsolutions@gmail.com"
                      className="text-violet-600 dark:text-violet-400 underline font-mono"
                    >
                      merxodevsolutions@gmail.com
                    </a>
                  </p>
                  <p>
                    <strong>{t('privacyPage.s10Hq', 'Headquarters:')} </strong>
                    {t('privacyPage.s10HqVal', 'Rangpur, Bangladesh')}
                  </p>
                  <p>
                    <strong>{t('privacyPage.s10Sla', 'Response SLA:')} </strong>
                    {t(
                      'privacyPage.s10SlaVal',
                      'Inquiries are addressed within 24–48 business hours.'
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
