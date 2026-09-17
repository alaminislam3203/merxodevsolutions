'use client';

import { useState } from 'react';
import Link from 'next/link';
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

const serviceOptions = [
  'Website Development',
  'Web App (Next.js/React)',
  'E-commerce Store',
  'UI/UX Design (Figma)',
  'Custom Software',
  'SEO & Performance',
];

const budgetOptions = [
  'Under $500',
  '$500 – $1,500',
  '$1,500 – $3,000',
  '$3,000 – $5,000+',
];

const faqs = [
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
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Website Development',
    budget: '$500 – $1,500',
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

  const setService = (service) => {
    setForm((prev) => ({ ...prev, service }));
  };

  const setBudget = (budget) => {
    setForm((prev) => ({ ...prev, budget }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Please enter your name';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (form.phone && !/^[+\d\s\-()]{7,18}$/.test(form.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!form.message.trim()) {
      newErrors.message = 'Please provide details about your project';
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (form.message.trim().length > 2000) {
      newErrors.message = 'Message must be under 2000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setForm({
          name: '',
          email: '',
          phone: '',
          service: 'Website Development',
          budget: '$500 – $1,500',
          message: '',
        });
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
        <div className="flex flex-col items-center text-center gap-4 mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800/80 font-raleway uppercase tracking-widest shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Available For New Projects • 2–12h Response
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-wider leading-tight">
            Let's Build Something{' '}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              Exceptional
            </span>
          </h1>

          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed font-raleway max-w-2xl">
            Have an idea, project, or need custom engineering? Tell us about your
            vision and our team will craft the optimal roadmap and quote for you.
          </p>
        </div>

        {/* ── 2-Column Split Section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct Channels & Trust Badges (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Quick Contact Cards Grid */}
            <div className="flex flex-col gap-3.5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-500 font-raleway mb-1">
                Direct Communication Channels
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
                    <span className="text-[10px] font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase font-raleway">
                      WhatsApp Live Chat
                    </span>
                    <span className="text-sm font-bold text-zinc-900 dark:text-white font-raleway">
                      +880 1313 334279
                    </span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400/80 font-medium">
                      Instant reply within minutes
                    </span>
                  </div>
                </div>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>

              {/* Email Card */}
              <a
                href="mailto:merxodevsolutions@gmail.com"
                className="group flex items-center justify-between p-4 rounded-2xl bg-violet-50/70 dark:bg-violet-950/30 border border-violet-200/80 dark:border-violet-800/50 hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-violet-500/30 shrink-0 group-hover:scale-105 transition-transform">
                    <FaEnvelope size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-widest text-violet-700 dark:text-violet-400 uppercase font-raleway">
                      Official Email
                    </span>
                    <span className="text-sm font-bold text-zinc-900 dark:text-white font-raleway break-all">
                      merxodevsolutions@gmail.com
                    </span>
                    <span className="text-xs text-violet-600 dark:text-violet-400/80 font-medium">
                      Detailed proposals & RFPs
                    </span>
                  </div>
                </div>
                <span className="text-violet-600 dark:text-violet-400 font-bold text-sm group-hover:translate-x-1 transition-transform">
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
                    <span className="text-[10px] font-bold tracking-widest text-cyan-700 dark:text-cyan-400 uppercase font-raleway">
                      Direct Phone
                    </span>
                    <span className="text-sm font-bold text-zinc-900 dark:text-white font-raleway">
                      +880 1313 334279
                    </span>
                    <span className="text-xs text-cyan-600 dark:text-cyan-400/80 font-medium">
                      Mon – Sat, 9:00 AM – 11:00 PM (GMT+6)
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
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-raleway">
                Why Clients Trust MerxoDev
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex items-start gap-2.5">
                  <FaBolt className="text-amber-500 mt-1 shrink-0" size={14} />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 font-raleway">
                      Fast Turnaround
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Sprint-based agile delivery
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <FaShieldAlt className="text-violet-500 mt-1 shrink-0" size={14} />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 font-raleway">
                      100% IP Security
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Full code & asset ownership
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <FaCheckCircle className="text-emerald-500 mt-1 shrink-0" size={14} />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 font-raleway">
                      Transparent Pricing
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Milestones & zero hidden fees
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <FaClock className="text-cyan-500 mt-1 shrink-0" size={14} />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 font-raleway">
                      Post-Launch Care
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      30 days free warranty support
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
                <span className="text-xs font-bold text-zinc-900 dark:text-white font-raleway">
                  Global Software Agency
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  Headquartered in Rangpur, BD • Serving worldwide
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl backdrop-blur-2xl p-6 sm:p-10 border border-zinc-200 dark:border-zinc-800 shadow-2xl shadow-violet-950/10">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-5 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#27003B] dark:text-white font-display uppercase tracking-wide">
                    Send Project Inquiry
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-raleway mt-1">
                    Fill out the form below to receive a personalized estimate.
                  </p>
                </div>
                <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-300 border border-violet-200 dark:border-violet-800 uppercase tracking-widest">
                  Step 1 of 1
                </span>
              </div>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                {/* Honeypot Bot Trap (Invisible to humans, traps automated spam scripts) */}
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
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-raleway">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all font-raleway ${errors.name
                        ? 'border-rose-500 focus:ring-rose-500/30'
                        : 'border-zinc-200 dark:border-zinc-800 focus:border-violet-500 focus:ring-violet-500/20'
                        }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-rose-500 font-semibold font-raleway">
                        ⚠ {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-raleway">
                      Work Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all font-raleway ${errors.email
                        ? 'border-rose-500 focus:ring-rose-500/30'
                        : 'border-zinc-200 dark:border-zinc-800 focus:border-violet-500 focus:ring-violet-500/20'
                        }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-500 font-semibold font-raleway">
                        ⚠ {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-raleway">
                    Phone / WhatsApp{' '}
                    <span className="text-xs text-zinc-400 font-normal">
                      (Optional)
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 234 567 8900"
                    className={`w-full px-4 py-3 rounded-xl  border text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all font-raleway ${errors.phone
                      ? 'border-rose-500 focus:ring-rose-500/30'
                      : 'border-zinc-200 dark:border-zinc-800 focus:border-violet-500 focus:ring-violet-500/20'
                      }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-rose-500 font-semibold font-raleway">
                      ⚠ {errors.phone}
                    </p>
                  )}
                </div>

                {/* Service Selection (Interactive Chips) */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-raleway">
                    What Service Do You Need?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((s) => {
                      const isSelected = form.service === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setService(s)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold font-raleway transition-all ${isSelected
                            ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md shadow-violet-500/25 scale-[1.02]'
                            : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                            }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget Selection (Interactive Chips) */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-raleway">
                    Approximate Budget Range
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgetOptions.map((b) => {
                      const isSelected = form.budget === b;
                      return (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBudget(b)}
                          className={`py-2 px-2 text-center rounded-xl text-xs font-bold font-raleway transition-all ${isSelected
                            ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/25 scale-[1.02]'
                            : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                            }`}
                        >
                          {b}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-raleway">
                    Project Overview & Details <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about the project goals, features needed, timeline, or reference links..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all resize-none font-raleway ${errors.message
                      ? 'border-rose-500 focus:ring-rose-500/30'
                      : 'border-zinc-200 dark:border-zinc-800 focus:border-violet-500 focus:ring-violet-500/20'
                      }`}
                  />
                  <div className="flex justify-between items-center mt-0.5">
                    {errors.message ? (
                      <p className="text-[11px] text-rose-500 font-semibold font-raleway">
                        ⚠ {errors.message}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span
                      className={`text-[11px] font-raleway font-medium ml-auto ${form.message.length > 1800
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
                  className="w-full mt-2 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-violet-700 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-sm font-bold uppercase tracking-widest hover:opacity-95 transition-all shadow-xl shadow-violet-500/25 disabled:opacity-60 font-raleway flex items-center justify-center gap-2 group cursor-pointer"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending Your Inquiry...
                    </>
                  ) : (
                    <>
                      <span>Send Project Request</span>
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
                      <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-200 font-raleway">
                        Inquiry Received Successfully!
                      </h4>
                      <p className="text-xs text-emerald-700 dark:text-emerald-300/90 font-raleway leading-relaxed">
                        Thank you for reaching out. We have received your project
                        details and our lead engineer will review and contact you
                        within 2–12 hours.
                      </p>
                    </div>
                  </div>
                )}

                {status === 'ratelimit' && (
                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-xs font-semibold text-amber-700 dark:text-amber-300 font-raleway">
                    ⏳ Too many submissions from your connection. Please wait an
                    hour or message us directly on WhatsApp or Email.
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-xs font-semibold text-rose-700 dark:text-rose-300 font-raleway">
                    ⚠ Something went wrong sending the message. Please contact us
                    directly via WhatsApp (+880 1313 334279) or Email.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* ── Client FAQ Section ── */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-bold bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 uppercase tracking-widest font-raleway">
              Client Questions
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-wide font-display mt-2">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-zinc-900 dark:text-white font-raleway text-sm sm:text-base hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <FaChevronDown
                      size={14}
                      className={`text-zinc-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-violet-600' : ''
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-raleway leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60">
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
