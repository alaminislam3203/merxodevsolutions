'use client';

import { useState } from 'react';

const services = [
  'Website Development',
  'Web App Development',
  'E-commerce Store',
  'UI/UX Design',
  'SEO & Performance',
  'Other',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        },
      );
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({
          name: '',
          email: '',
          phone: '',
          service: '',
          budget: '',
          message: '',
        });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };
  return (
    <div className="relative min-h-screen bg-white dark:bg-zinc-950 pt-24 pb-32 px-6 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #7c3aed, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #06b6d4, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            We respond within 24 hours
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-widest leading-tight">
            Let's{' '}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              Work Together
            </span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed">
            Tell us about your project and we'll get back to you with a tailored
            plan.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest text-amber-500 uppercase font-raleway">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            />
          </div>

          {/* Email — full width */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest text-amber-500 uppercase font-raleway">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-2 transition ${
                errors.email
                  ? 'border-rose-500 focus:ring-rose-500'
                  : 'border-zinc-200 dark:border-zinc-800 focus:ring-violet-500'
              }`}
            />
            {errors.email && (
              <p className="text-[11px] text-rose-500 font-medium font-raleway">
                ⚠ {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest text-amber-500 uppercase font-raleway">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+880 1234 567890"
              className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            />
          </div>

          {/* Service & Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest text-amber-500 uppercase font-raleway">
                Service Needed
              </label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
              >
                <option value="">Select a service</option>
                {services.map(s => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest text-amber-500 uppercase font-raleway">
                Budget Range ($)
              </label>
              <input
                type="text"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                placeholder="e.g. 500 - 2000"
                className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
              />
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest text-amber-500 uppercase font-raleway">
              Your Message *
            </label>
            <textarea
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="mt-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25 disabled:opacity-60 font-raleway"
          >
            {status === 'loading' ? 'Sending...' : 'Send Message →'}
          </button>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="relative overflow-hidden flex items-start gap-4 px-5 py-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/60 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-800">
              {/* Decorative glow */}
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-emerald-200 dark:bg-emerald-800 opacity-30 blur-2xl pointer-events-none" />

              {/* Animated check icon */}
              <div className="relative shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-200 dark:shadow-emerald-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <div className="relative flex flex-col gap-1">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300 font-raleway">
                  Message sent successfully!
                </p>
                <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80 font-raleway leading-relaxed">
                  We'll get back to you within 24 hours. Check your email .
                </p>
              </div>
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-rose-50 dark:bg-rose-950 border border-rose-200 dark:border-rose-800">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <p className="text-sm font-medium text-rose-600 dark:text-rose-400 font-raleway">
                Something went wrong. Please try again or email us directly.
              </p>
            </div>
          )}
        </form>

        {/* Direct Contact */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="mailto:merxodevsolutions@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 hover:border-red-400 dark:hover:border-red-600 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-red-200 dark:border-red-800 flex items-center justify-center shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#EA4335"
                  d="M5.457 7.165l6.543 4.91 6.543-4.91v-1.95L12 10.13 5.457 5.215z"
                />
                <path
                  fill="#FBBC05"
                  d="M2 6.524v10.952c0 .82.665 1.485 1.485 1.485h1.972V8.474L2 6.524z"
                />
                <path
                  fill="#34A853"
                  d="M18.543 18.961h1.972c.82 0 1.485-.665 1.485-1.485V6.524l-3.457 1.95z"
                />
                <path
                  fill="#C5221F"
                  d="M5.457 5.215L2 6.524l3.457 1.95L12 12.872l6.543-4.398L22 6.524l-3.457-1.309L12 9.825z"
                />
                <path
                  fill="#4285F4"
                  d="M5.457 8.474v10.487h7.086V12.075L5.457 8.474z"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase font-raleway">
                Email
              </span>
              <span className="text-sm font-semibold text-red-600 dark:text-red-400 font-raleway">
                Mail with us →
              </span>
              <span className="text-xs text-zinc-400 font-raleway">
                merxodevsolutions@gmail.com
              </span>
            </div>
          </a>

          <a
            href="https://wa.me/8801313334279"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.523 5.847L.057 23.882l6.197-1.448A11.948 11.948 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.853 0-3.587-.5-5.084-1.375l-.361-.214-3.757.877.894-3.665-.236-.374A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase font-raleway">
                WhatsApp
              </span>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 font-raleway">
                Chat with us →
              </span>
              <span className="text-xs text-zinc-400 font-raleway">
                +880 1313 334279
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
