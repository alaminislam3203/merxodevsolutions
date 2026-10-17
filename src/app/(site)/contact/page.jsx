'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '@/components/i18n';
import {
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaShieldAlt,
  FaBolt,
  FaClock,
  FaChevronDown,
} from 'react-icons/fa';
import {
  FiGlobe,
  FiLayers,
  FiShoppingBag,
  FiPenTool,
  FiCode,
  FiTrendingUp,
  FiLink,
  FiShield,
  FiCreditCard,
  FiDatabase,
  FiClock as FiClockIcon,
  FiZap,
  FiPlusCircle,
  FiCheck,
  FiEdit3,
  FiDollarSign,
} from 'react-icons/fi';

const defaultFaqs = [
  {
    q: 'How fast can we start after the initial discussion?',
    a: 'We usually complete the initial discovery call within 12–24 hours and can begin architecture and design sprints within 2–3 business days.',
  },
  {
    q: 'Do you sign Non-Disclosure Agreements (NDAs)?',
    a: 'Yes, absolutely. We respect your intellectual property and sign mutual NDAs before reviewing sensitive requirements.',
  },
  {
    q: 'What is your typical project payment structure?',
    a: 'We work with clear milestone-based invoicing (e.g., 30% upfront kickoff, 40% after core development review, and 30% upon final testing & deployment).',
  },
  {
    q: 'Do you provide post-launch maintenance and support?',
    a: 'Yes, every project includes 30 days of free bug-fixing and dedicated technical support post-deployment, along with optional ongoing maintenance packages.',
  },
];

export default function ContactPage() {
  const { t } = useTranslation();

  const serviceOptions = [
    {
      id: 'webDev',
      label: t('contact.serviceOptions.webDev', 'Website Development'),
      desc: t('contact.serviceOptions.webDevDesc', 'Landing pages, portfolio & corporate sites'),
      icon: FiGlobe,
    },
    {
      id: 'webApp',
      label: t('contact.serviceOptions.webApp', 'Custom Web Apps'),
      desc: t('contact.serviceOptions.webAppDesc', 'SaaS, dashboards & client portals'),
      icon: FiLayers,
    },
    {
      id: 'ecommerce',
      label: t('contact.serviceOptions.ecommerce', 'E-Commerce Solutions'),
      desc: t('contact.serviceOptions.ecommerceDesc', 'Online stores & multi-vendor hubs'),
      icon: FiShoppingBag,
    },
    {
      id: 'uiUx',
      label: t('contact.serviceOptions.uiUx', 'UI/UX & Figma Design'),
      desc: t('contact.serviceOptions.uiUxDesc', 'Wireframes, prototypes & brand UI'),
      icon: FiPenTool,
    },
    {
      id: 'customSoft',
      label: t('contact.serviceOptions.customSoft', 'Custom Software'),
      desc: t('contact.serviceOptions.customSoftDesc', 'Tailored enterprise architectures'),
      icon: FiCode,
    },
    {
      id: 'seo',
      label: t('contact.serviceOptions.seo', 'SEO & Growth'),
      desc: t('contact.serviceOptions.seoDesc', 'Search rankings & speed audit'),
      icon: FiTrendingUp,
    },
    {
      id: 'api',
      label: t('contact.serviceOptions.api', 'APIs & Webhooks'),
      desc: t('contact.serviceOptions.apiDesc', 'Third-party & microservice sync'),
      icon: FiLink,
    },
    {
      id: 'security',
      label: t('contact.serviceOptions.security', 'Security & Auth'),
      desc: t('contact.serviceOptions.securityDesc', 'OAuth, 2FA & vulnerability audit'),
      icon: FiShield,
    },
    {
      id: 'payment',
      label: t('contact.serviceOptions.payment', 'Payment Gateway'),
      desc: t('contact.serviceOptions.paymentDesc', 'bKash, Nagad, Stripe & SSLCommerz'),
      icon: FiCreditCard,
    },
    {
      id: 'database',
      label: t('contact.serviceOptions.database', 'Database & Cloud'),
      desc: t('contact.serviceOptions.databaseDesc', 'PostgreSQL, cloud storage & sync'),
      icon: FiDatabase,
    },
    {
      id: 'maintenance',
      label: t('contact.serviceOptions.maintenance', 'Maintenance & 24/7 SLA'),
      desc: t('contact.serviceOptions.maintenanceDesc', 'Bug fixes, uptime & updates'),
      icon: FiClockIcon,
    },
    {
      id: 'automation',
      label: t('contact.serviceOptions.automation', 'Automation & AI'),
      desc: t('contact.serviceOptions.automationDesc', 'Chatbots, scrapers & workflows'),
      icon: FiZap,
    },
    {
      id: 'other',
      label: t('contact.serviceOptions.other', 'Other / Custom Need'),
      desc: t('contact.serviceOptions.otherDesc', 'Tell us your unique specifications'),
      icon: FiPlusCircle,
    },
  ];

  const budgetOptions = [
    {
      id: 'under500',
      label: t('contact.budgetOptions.under500', 'Under $500'),
      badge: t('contact.budgetOptions.under500Badge', 'Starter'),
    },
    {
      id: 'b500to1500',
      label: t('contact.budgetOptions.b500to1500', '$500 – $1,500'),
      badge: t('contact.budgetOptions.b500to1500Badge', 'Popular'),
    },
    {
      id: 'b1500to3000',
      label: t('contact.budgetOptions.b1500to3000', '$1,500 – $3,000'),
      badge: t('contact.budgetOptions.b1500to3000Badge', 'Growth'),
    },
    {
      id: 'b3000to5000',
      label: t('contact.budgetOptions.b3000to5000', '$3,000 – $5,000'),
      badge: t('contact.budgetOptions.b3000to5000Badge', 'Scale'),
    },
    {
      id: 'b5000plus',
      label: t('contact.budgetOptions.b5000plus', '$5,000 – $10k+'),
      badge: t('contact.budgetOptions.b5000plusBadge', 'Enterprise'),
    },
    {
      id: 'other',
      label: t('contact.budgetOptions.other', 'Custom Budget'),
      badge: t('contact.budgetOptions.otherBadge', 'Custom'),
    },
  ];

  const localizedFaqs = t('contact.faqs', { returnObjects: true });
  const activeFaqs = Array.isArray(localizedFaqs) && localizedFaqs.length > 0 ? localizedFaqs : defaultFaqs;

  const [selectedService, setSelectedService] = useState('webDev');
  const [mobileServiceDropdownOpen, setMobileServiceDropdownOpen] = useState(false);
  const [customService, setCustomService] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('b500to1500');
  const [customBudget, setCustomBudget] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    honeypot: '',
  });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = t('contact.validation.nameRequired', 'Please enter your name');
    } else if (form.name.trim().length < 2) {
      newErrors.name = t('contact.validation.nameMin', 'Name must be at least 2 characters');
    }

    if (!form.email.trim()) {
      newErrors.email = t('contact.validation.emailRequired', 'Please enter your email address');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = t('contact.validation.emailInvalid', 'Please enter a valid email');
    }

    if (form.phone && !/^[+\d\s\-()]{7,18}$/.test(form.phone)) {
      newErrors.phone = t('contact.validation.phoneInvalid', 'Please enter a valid phone number');
    }

    if (!form.message.trim()) {
      newErrors.message = t('contact.validation.messageRequired', 'Please provide details about your project');
    } else if (form.message.trim().length < 10) {
      newErrors.message = t('contact.validation.messageMin', 'Message must be at least 10 characters');
    } else if (form.message.trim().length > 2000) {
      newErrors.message = t('contact.validation.messageMax', 'Message must be under 2000 characters');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');

    const resolvedService =
      selectedService === 'other'
        ? (customService.trim() ? `Other: ${customService.trim()}` : t('contact.serviceOptions.other', 'Other / Custom Need'))
        : (serviceOptions.find((s) => s.id === selectedService)?.label || selectedService);

    const resolvedBudget =
      selectedBudget === 'other'
        ? (customBudget.trim() ? `Custom: ${customBudget.trim()}` : t('contact.budgetOptions.other', 'Custom Budget'))
        : (budgetOptions.find((b) => b.id === selectedBudget)?.label || selectedBudget);

    const payload = {
      ...form,
      service: resolvedService,
      budget: resolvedBudget,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setForm({
          name: '',
          email: '',
          phone: '',
          message: '',
          honeypot: '',
        });
        setSelectedService('webDev');
        setCustomService('');
        setSelectedBudget('b500to1500');
        setCustomBudget('');
        setErrors({});
      } else if (res.status === 429) {
        setStatus('ratelimit');
      } else if (data.errors) {
        const serverErrors = {};
        data.errors.forEach((err) => {
          serverErrors[err.path] = err.msg;
        });
        setErrors(serverErrors);
        setStatus('idle');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="relative min-h-screen pt-28 sm:pt-32 pb-32 px-4 sm:px-6 overflow-hidden">
      {/* Background Ambient Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full opacity-20 blur-3xl"
        style={{
          // background: 'radial-gradient(circle, #7c3aed, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full opacity-15 blur-3xl"
        style={{
          // background: 'radial-gradient(circle, #06b6d4, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/3 w-[600px] h-[600px] rounded-full opacity-15 blur-3xl"
        style={{
          // background: 'radial-gradient(circle, #f59e0b, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* ── Page Header ── */}
        <div className="flex flex-col items-center text-center gap-4 mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800/80 font-exo-extralight uppercase tracking-widest shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {t('contact.badge', 'Available For New Projects • 2–12h Response')}
          </div>

          <h1 className="font-exo-medium text-2xl sm:text-3xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-wider">
            {t('contact.headingStart', "Let's Build Something")}{' '}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              {t('contact.headingGradient', 'Exceptional')}
            </span>
          </h1>

          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed font-exo-extralight max-w-2xl">
            {t('contact.subheading', 'Have an idea, project, or need custom engineering? Tell us about your vision and our team will craft the optimal roadmap and quote for you.')}
          </p>
        </div>

        {/* ── 2-Column Split Section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct Channels & Trust Badges (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Quick Contact Cards Grid */}
            <div className="flex flex-col gap-3.5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-500 font-exo-extralight mb-1">
                {t('contact.channelsTitle', 'Direct Communication Channels')}
              </h2>

              {/* WhatsApp Card */}
              <a
                href="https://wa.me/8801313334279"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/50 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30 shrink-0 group-hover:scale-105 transition-transform">
                    <FaWhatsapp size={22} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase font-exo-extralight">
                      {t('contact.whatsappTitle', 'WhatsApp Live Chat')}
                    </span>
                    <span className="text-sm font-bold text-zinc-900 dark:text-white font-exo-extralight">
                      +880 1313 334279
                    </span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400/80 font-medium">
                      {t('contact.whatsappSub', 'Instant reply within minutes')}
                    </span>
                  </div>
                </div>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>

              {/* Email Card (Gmail) */}
              <a
                href="mailto:merxodevsolutions@gmail.com"
                className="group flex items-center justify-between p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-800/50 hover:border-rose-400 dark:hover:border-rose-600 hover:shadow-lg hover:shadow-rose-500/10 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white dark:bg-zinc-900 border border-rose-100 dark:border-zinc-800 flex items-center justify-center shadow-md shadow-rose-500/10 shrink-0 group-hover:scale-105 transition-transform p-2.5">
                    <svg
                      viewBox="52 42 88 66"
                      className="w-full h-full"
                      aria-hidden="true"
                    >
                      <path fill="#4285F4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6" />
                      <path fill="#34A853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15" />
                      <path fill="#FBBC04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2" />
                      <path fill="#EA4335" d="M72 74V48l24 18 24-18v26L96 92" />
                      <path fill="#C5221F" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-widest text-rose-700 dark:text-rose-400 uppercase font-exo-extralight">
                      {t('contact.emailTitle', 'Official Email')}
                    </span>
                    <span className="text-sm font-bold text-zinc-900 dark:text-white font-exo-extralight break-all">
                      merxodevsolutions@gmail.com
                    </span>
                    <span className="text-xs text-rose-600 dark:text-rose-400/80 font-medium">
                      {t('contact.emailSub', 'Detailed proposals & RFPs')}
                    </span>
                  </div>
                </div>
                <span className="text-rose-600 dark:text-rose-400 font-bold text-sm group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>

              {/* Phone / Call Card */}
              <a
                href="tel:+8801313334279"
                className="group flex items-center justify-between p-4 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-200/80 dark:border-cyan-800/50 hover:border-cyan-400 dark:hover:border-cyan-600 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-cyan-500/30 shrink-0 group-hover:scale-105 transition-transform">
                    <FaPhoneAlt size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-widest text-cyan-700 dark:text-cyan-400 uppercase font-exo-extralight">
                      {t('contact.phoneTitle', 'Direct Phone')}
                    </span>
                    <span className="text-sm font-bold text-zinc-900 dark:text-white font-exo-extralight">
                      +880 1313 334279
                    </span>
                    <span className="text-xs text-cyan-600 dark:text-cyan-400/80 font-medium">
                      {t('contact.phoneSub', 'Mon – Sat, 9:00 AM – 11:00 PM (GMT+6)')}
                    </span>
                  </div>
                </div>
                <span className="text-cyan-600 dark:text-cyan-400 font-bold text-sm group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            </div>

            {/* Why Work With Us & Guarantees */}
            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 flex flex-col gap-4 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-exo-extralight">
                {t('contact.trustTitle', 'Why Clients Trust MerxoDev')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex items-start gap-2.5">
                  <FaBolt className="text-amber-500 mt-1 shrink-0" size={14} />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 font-exo-extralight">
                      {t('contact.trustFastTitle', 'Fast Turnaround')}
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      {t('contact.trustFastDesc', 'Sprint-based agile delivery')}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <FaShieldAlt className="text-violet-500 mt-1 shrink-0" size={14} />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 font-exo-extralight">
                      {t('contact.trustIpTitle', '100% IP Security')}
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      {t('contact.trustIpDesc', 'Full code & asset ownership')}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <FaCheckCircle className="text-emerald-500 mt-1 shrink-0" size={14} />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 font-exo-extralight">
                      {t('contact.trustPriceTitle', 'Transparent Pricing')}
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      {t('contact.trustPriceDesc', 'Milestones & zero hidden fees')}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <FaClock className="text-cyan-500 mt-1 shrink-0" size={14} />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 font-exo-extralight">
                      {t('contact.trustCareTitle', 'Post-Launch Care')}
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      {t('contact.trustCareDesc', '30 days free warranty support')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="flex items-center gap-3.5 px-5 py-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                <FaMapMarkerAlt size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-zinc-900 dark:text-white font-exo-extralight">
                  {t('contact.agencyTitle', 'Global Software Agency')}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {t('contact.agencySub', 'Headquartered in Rangpur, BD • Serving worldwide')}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl backdrop-blur-2xl p-6 sm:p-10 border border-zinc-200 dark:border-zinc-800 shadow-2xl shadow-violet-950/10">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-5 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#27003B] dark:text-white font-exo-medium uppercase tracking-wide">
                    {t('contact.formTitle', 'Send Project Inquiry')}
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight mt-1">
                    {t('contact.formSub', 'Fill out the form below to receive a personalized estimate.')}
                  </p>
                </div>
                <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-300 border border-violet-200 dark:border-violet-800 uppercase tracking-widest">
                  {t('contact.stepBadge', 'Step 1 of 1')}
                </span>
              </div>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                {/* Honeypot Bot Trap */}
                <input
                  type="text"
                  name="honeypot"
                  value={form.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: 'none', position: 'absolute', left: '-9999px' }}
                  aria-hidden="true"
                />

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-exo-extralight">
                      {t('contact.nameLabel', 'Your Name')} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t('contact.namePlaceholder', 'Enter your name')}
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all font-exo-extralight ${errors.name
                        ? 'border-rose-500 focus:ring-rose-500/30'
                        : 'border-zinc-200 dark:border-zinc-800 focus:border-violet-500 focus:ring-violet-500/20'
                        }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-rose-500 font-semibold font-exo-extralight">
                        ⚠ {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-exo-extralight">
                      {t('contact.emailLabel', 'Work Email')} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t('contact.emailPlaceholder', 'Enter your email')}
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all font-exo-extralight ${errors.email
                        ? 'border-rose-500 focus:ring-rose-500/30'
                        : 'border-zinc-200 dark:border-zinc-800 focus:border-violet-500 focus:ring-violet-500/20'
                        }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-500 font-semibold font-exo-extralight">
                        ⚠ {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-exo-extralight">
                    {t('contact.phoneLabel', 'Phone / WhatsApp')}{' '}
                    <span className="text-xs text-zinc-400 font-normal">
                      {t('contact.optional', '(Optional)')}
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 234 567 8900"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all font-exo-extralight ${errors.phone
                      ? 'border-rose-500 focus:ring-rose-500/30'
                      : 'border-zinc-200 dark:border-zinc-800 focus:border-violet-500 focus:ring-violet-500/20'
                      }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-rose-500 font-semibold font-exo-extralight">
                      ⚠ {errors.phone}
                    </p>
                  )}
                </div>

                {/* Service Selection (Premium Interactive Cards) */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-exo-extralight flex items-center gap-1.5">
                      <span>{t('contact.serviceLabel', 'What Service Do You Need?')}</span>
                      <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[11px] font-semibold text-violet-600 dark:text-violet-400 font-exo-extralight truncate max-w-[200px]">
                      {serviceOptions.find((s) => s.id === selectedService)?.label}
                    </span>
                  </div>

                  {/* Mobile Dropdown View (sm:hidden) */}
                  <div className="sm:hidden relative">
                    <button
                      type="button"
                      onClick={() => setMobileServiceDropdownOpen((prev) => !prev)}
                      className={`w-full p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 text-left ${
                        mobileServiceDropdownOpen
                          ? 'border-violet-500 ring-2 ring-violet-500/20 bg-white dark:bg-zinc-900 shadow-md'
                          : 'border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 hover:border-violet-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {(() => {
                          const curr = serviceOptions.find((s) => s.id === selectedService) || serviceOptions[0];
                          const CurrIcon = curr.icon;
                          return (
                            <>
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-violet-500/30">
                                <CurrIcon size={18} />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className="text-xs font-bold text-zinc-900 dark:text-white font-exo-extralight truncate">
                                  {curr.label}
                                </span>
                                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-exo-extralight truncate">
                                  {curr.desc}
                                </span>
                              </div>
                            </>
                          );
                        })()}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 text-zinc-400 dark:text-zinc-500">
                        <span className="text-[11px] font-semibold text-violet-600 dark:text-violet-400">
                          {mobileServiceDropdownOpen ? t('common.close', 'Close') : t('common.change', 'Change')}
                        </span>
                        <FaChevronDown
                          size={11}
                          className={`transition-transform duration-200 ${
                            mobileServiceDropdownOpen ? 'rotate-180 text-violet-600' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {/* Mobile Dropdown Menu */}
                    {mobileServiceDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40 backdrop-blur-xs sm:hidden"
                          onClick={() => setMobileServiceDropdownOpen(false)}
                        />
                        <div className="absolute left-0 right-0 top-full mt-2 z-50 p-2 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl max-h-[340px] overflow-y-auto space-y-1.5">
                          {serviceOptions.map((s) => {
                            const isSelected = selectedService === s.id;
                            const IconComponent = s.icon;
                            return (
                              <button
                                key={s.id}
                                type="button"
                                onClick={() => {
                                  setSelectedService(s.id);
                                  setMobileServiceDropdownOpen(false);
                                }}
                                className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2.5 ${
                                  isSelected
                                    ? 'bg-violet-50 dark:bg-violet-950/50 border-violet-500 dark:border-violet-500/80 text-violet-900 dark:text-white'
                                    : 'border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                      isSelected
                                        ? 'bg-violet-600 text-white'
                                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                                    }`}
                                  >
                                    <IconComponent size={15} />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-xs font-bold truncate leading-tight">{s.label}</div>
                                    <div className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                                      {s.desc}
                                    </div>
                                  </div>
                                </div>

                                {isSelected && (
                                  <span className="w-4 h-4 rounded-full bg-violet-600 text-white flex items-center justify-center text-[10px] shrink-0">
                                    <FiCheck size={11} strokeWidth={3} />
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Desktop Grid View (hidden sm:grid) */}
                  <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {serviceOptions.map((s) => {
                      const isSelected = selectedService === s.id;
                      const IconComponent = s.icon;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSelectedService(s.id)}
                          className={`group relative text-left p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center gap-3 ${isSelected
                            ? 'bg-gradient-to-br from-violet-600/10 via-purple-600/5 to-cyan-500/10 border-violet-500 dark:border-violet-400 shadow-md shadow-violet-500/10 ring-1 ring-violet-500/30'
                            : 'bg-white/60 dark:bg-zinc-900/60 border-zinc-200/80 dark:border-zinc-800/80 hover:border-violet-300 dark:hover:border-violet-700/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                            }`}
                        >
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${isSelected
                              ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-sm shadow-violet-500/40'
                              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 group-hover:bg-violet-50 dark:group-hover:bg-violet-950/40'
                              }`}
                          >
                            <IconComponent size={17} />
                          </div>

                          <div className="flex-1 min-w-0 pr-1">
                            <div className="flex items-center justify-between gap-1">
                              <span
                                className={`text-xs font-bold font-exo-extralight truncate leading-tight ${isSelected
                                  ? 'text-violet-950 dark:text-white'
                                  : 'text-zinc-800 dark:text-zinc-200 group-hover:text-violet-700 dark:group-hover:text-violet-300'
                                  }`}
                              >
                                {s.label}
                              </span>
                              {isSelected && (
                                <span className="w-4 h-4 rounded-full bg-violet-600 text-white flex items-center justify-center text-[10px] shrink-0 shadow-sm">
                                  <FiCheck size={11} strokeWidth={3} />
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-exo-extralight truncate mt-0.5">
                              {s.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Service Input when "Other" is selected */}
                  {selectedService === 'other' && (
                    <div className="mt-1 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-violet-50/80 to-purple-50/40 dark:from-violet-950/30 dark:to-zinc-900/60 border border-violet-200 dark:border-violet-800/70 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <FiEdit3 className="text-violet-600 dark:text-violet-400 shrink-0" size={15} />
                        <label className="text-xs font-bold text-violet-950 dark:text-violet-200 font-exo-extralight">
                          {t('contact.otherServiceLabel', 'Specify your custom service or technical needs')}
                        </label>
                      </div>
                      <input
                        type="text"
                        value={customService}
                        onChange={(e) => setCustomService(e.target.value)}
                        placeholder={t(
                          'contact.otherServicePlaceholder',
                          'e.g. Telegram Bot, Custom AI Chatbot, Scraping Engine, Custom ERP...'
                        )}
                        className="w-full px-4 py-2.5 rounded-xl border border-violet-200 dark:border-violet-800/80 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 font-exo-extralight"
                      />
                    </div>
                  )}
                </div>

                {/* Budget Selection (Premium Interactive Cards) */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-exo-extralight flex items-center gap-1.5">
                      <span>{t('contact.budgetLabel', 'Approximate Budget Range')}</span>
                      <span className="text-xs text-zinc-400 font-normal">
                        {t('contact.optional', '(Optional)')}
                      </span>
                    </label>
                    <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 font-exo-extralight">
                      {budgetOptions.find((b) => b.id === selectedBudget)?.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {budgetOptions.map((b) => {
                      const isSelected = selectedBudget === b.id;
                      return (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setSelectedBudget(b.id)}
                          className={`group relative text-left p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[68px] ${isSelected
                            ? 'bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-orange-500/10 border-amber-500 dark:border-amber-400 shadow-md shadow-amber-500/10 ring-1 ring-amber-500/30'
                            : 'bg-white/60 dark:bg-zinc-900/60 border-zinc-200/80 dark:border-zinc-800/80 hover:border-amber-300 dark:hover:border-amber-600/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                            }`}
                        >
                          <div className="flex items-center justify-between gap-1 w-full">
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors ${isSelected
                                ? 'bg-amber-500 text-zinc-950 font-extrabold shadow-sm'
                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:text-amber-600 dark:group-hover:text-amber-400'
                                }`}
                            >
                              {b.badge}
                            </span>
                            {isSelected && (
                              <span className="w-4 h-4 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center text-[10px] shrink-0 shadow-sm">
                                <FiCheck size={11} strokeWidth={3} />
                              </span>
                            )}
                          </div>
                          <span
                            className={`text-xs sm:text-sm font-bold font-exo-extralight mt-1.5 ${isSelected
                              ? 'text-zinc-950 dark:text-white'
                              : 'text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white'
                              }`}
                          >
                            {b.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Budget Input when "Other" is selected */}
                  {selectedBudget === 'other' && (
                    <div className="mt-1 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-amber-50/80 to-orange-50/40 dark:from-amber-950/30 dark:to-zinc-900/60 border border-amber-200 dark:border-amber-800/70 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <FiDollarSign className="text-amber-600 dark:text-amber-400 shrink-0" size={15} />
                        <label className="text-xs font-bold text-amber-950 dark:text-amber-200 font-exo-extralight">
                          {t('contact.otherBudgetLabel', 'Enter your estimated budget or target price')}
                        </label>
                      </div>
                      <input
                        type="text"
                        value={customBudget}
                        onChange={(e) => setCustomBudget(e.target.value)}
                        placeholder={t(
                          'contact.otherBudgetPlaceholder',
                          'e.g. $2,500 or ৳1,00,000 BDT or Negotiable...'
                        )}
                        className="w-full px-4 py-2.5 rounded-xl border border-amber-200 dark:border-amber-800/80 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-exo-extralight"
                      />
                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-exo-extralight">
                    {t('contact.messageLabel', 'Project Overview & Details')} <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t('contact.messagePlaceholder', 'Tell us about the project goals, features needed, timeline, or reference links...')}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all resize-none font-exo-extralight ${errors.message
                      ? 'border-rose-500 focus:ring-rose-500/30'
                      : 'border-zinc-200 dark:border-zinc-800 focus:border-violet-500 focus:ring-violet-500/20'
                      }`}
                  />
                  <div className="flex justify-between items-center mt-0.5">
                    {errors.message ? (
                      <p className="text-[11px] text-rose-500 font-semibold font-exo-extralight">
                        ⚠ {errors.message}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span
                      className={`text-[11px] font-exo-extralight font-medium ml-auto ${form.message.length > 1800
                        ? 'text-rose-500'
                        : 'text-zinc-400'
                        }`}
                    >
                      {form.message.length}/2000
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full mt-2 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-violet-700 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-sm font-bold uppercase tracking-widest hover:opacity-95 transition-all shadow-xl shadow-violet-500/25 disabled:opacity-60 font-exo-extralight flex items-center justify-center gap-2 group cursor-pointer"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t('contact.submitting', 'Sending Your Inquiry...')}
                    </>
                  ) : (
                    <>
                      <span>{t('contact.submitBtn', 'Send Project Request')}</span>
                      <span className="group-hover:translate-x-1.5 transition-transform">
                        →
                      </span>
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {status === 'success' && (
                  <div className="relative overflow-hidden flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/60 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-800 shadow-md">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <FaCheckCircle size={20} />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-200 font-exo-extralight">
                        {t('contact.successTitle', 'Inquiry Received Successfully!')}
                      </h4>
                      <p className="text-xs text-emerald-700 dark:text-emerald-300/90 font-exo-extralight leading-relaxed">
                        {t('contact.successDesc', 'Thank you for reaching out. We have received your project details and our lead engineer will review and contact you within 2–12 hours.')}
                      </p>
                    </div>
                  </div>
                )}

                {status === 'ratelimit' && (
                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-xs font-semibold text-amber-700 dark:text-amber-300 font-exo-extralight">
                    {t('contact.ratelimit', '⏳ Too many submissions from your connection. Please wait an hour or message us directly on WhatsApp or Email.')}
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-xs font-semibold text-rose-700 dark:text-rose-300 font-exo-extralight">
                    {t('contact.error', '⚠ Something went wrong sending the message. Please contact us directly via WhatsApp (+880 1313 334279) or Email.')}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* ── Client FAQ Section ── */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-bold bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 uppercase tracking-widest font-exo-extralight">
              {t('contact.faqBadge', 'Client Questions')}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-wide font-exo-medium mt-2">
              {t('contact.faqTitle', 'Frequently Asked Questions')}
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            {activeFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-zinc-900 dark:text-white font-exo-extralight text-sm sm:text-base hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <FaChevronDown
                      size={14}
                      className={`text-zinc-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-violet-600' : ''
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-exo-extralight leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
