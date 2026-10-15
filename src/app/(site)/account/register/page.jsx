'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { showToast } from '@/lib/toast';
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheckCircle,
  FiAlertCircle,
  FiShield,
  FiHome,
  FiCheck,
} from 'react-icons/fi';
import Logo from '@/components/Logo';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Dynamic Password Strength Meter (matching organic reference project)
  const calculateStrength = (pass) => {
    if (!pass || pass.length === 0) return { score: 0, label: '', width: '0%', color: 'bg-zinc-700' };
    if (pass.length < 6) return { score: 1, label: 'Too Short (Min 6 chars)', width: '25%', color: 'bg-rose-500' };
    if (pass.length < 8) return { score: 2, label: 'Weak', width: '50%', color: 'bg-amber-500' };
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) {
      return { score: 4, label: 'Very Strong', width: '100%', color: 'bg-emerald-500' };
    }
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) {
      return { score: 3, label: 'Strong', width: '75%', color: 'bg-cyan-500' };
    }
    return { score: 2, label: 'Fair', width: '50%', color: 'bg-amber-400' };
  };

  const strength = calculateStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      showToast.error('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      showToast.error('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));
      setLoading(false);

      if (!res.ok) {
        const errMsg = data.error || data.message || 'Registration failed. Please try again.';
        setError(errMsg);
        showToast.error(errMsg);
      } else {
        showToast.success('Account created successfully! Redirecting to login...');
        const loginUrl = redirectUrl
          ? `/account/login?registered=true&redirect=${encodeURIComponent(redirectUrl)}`
          : '/account/login?registered=true';
        setTimeout(() => router.push(loginUrl), 400);
      }
    } catch (err) {
      setLoading(false);
      const errMsg = err?.message || 'Server connection error. Please try again.';
      setError(errMsg);
      showToast.error(errMsg);
    }
  };

  const benefits = [
    'Direct collaboration with lead software architects',
    'Submit and track custom web & app inquiries',
    'Publish verified client reviews and testimonials',
    'Priority engineering response & SLA support',
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-[#060b19] no-gsap mt-12 sm:mt-6">
      {/* ── Left Showcase Panel (Desktop) ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#060b19] relative overflow-hidden flex-col justify-between p-12 xl:p-16 border-r border-violet-900/30">
        {/* Ambient Glows */}
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-80px] right-[-80px] w-[450px] h-[450px] rounded-full bg-violet-600/15 blur-[120px] pointer-events-none" />

        {/* Top Branding */}
        {/* <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="inline-block transition-transform hover:scale-105">
            <Logo />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold font-exo-extralight text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 backdrop-blur-md transition-colors"
          >
            <FiHome size={14} />
            <span>Back to Home</span>
          </Link>
        </div> */}

        {/* Narrative & Benefits */}
        <div className="relative z-10 my-auto py-10 max-w-xl">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 font-exo-extralight uppercase tracking-widest shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>MerxoDev Client Network</span>
          </div>

          <h1
            suppressHydrationWarning
            className="font-exo-medium text-4xl xl:text-5xl uppercase tracking-wide text-white leading-tight mb-5"
          >
            Start Your{' '}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Digital Journey
            </span>
          </h1>

          <p className="text-zinc-400 text-base leading-relaxed font-exo-extralight mb-8">
            Create an account to submit project scopes, review proposals, coordinate with engineering leads, and leave verified reviews.
          </p>

          {/* Benefits List */}
          <div className="space-y-3.5 mb-10">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-zinc-300 font-exo-extralight">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center text-white shrink-0 text-xs">
                  <FiCheck size={12} strokeWidth={3} />
                </div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 border-t border-zinc-800/80 pt-6">
            <div>
              <p className="font-exo-medium text-xl text-white font-extrabold">100%</p>
              <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-exo-extralight">Code Ownership</p>
            </div>
            <div>
              <p className="font-exo-medium text-xl text-cyan-400 font-extrabold">2–12h</p>
              <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-exo-extralight">Response SLA</p>
            </div>
            <div>
              <p className="font-exo-medium text-xl text-amber-400 font-extrabold">Verified</p>
              <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-exo-extralight">Client Reviews</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex items-center justify-between text-xs text-zinc-500 font-exo-extralight border-t border-zinc-800/60 pt-6">
          <span>© {new Date().getFullYear()} MerxoDev Solutions. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">Terms</Link>
          </div>
        </div>
      </div>

      {/* ── Right Registration Panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12 py-16 bg-zinc-50 dark:bg-[#060b19]">
        <div className="w-full max-w-md">
          {/* Mobile Logo Header */}
          {/* <div className="lg:hidden flex items-center justify-between mb-8">
            <Link href="/">
              <Logo />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold font-exo-extralight text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
            >
              <FiHome size={13} />
              <span>Home</span>
            </Link>
          </div> */}

          <div className="mb-8">
            <h2
              suppressHydrationWarning
              className="font-exo-medium text-3xl sm:text-4xl uppercase tracking-wide text-[#27003B] dark:text-white mb-2"
            >
              Create Account
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm font-exo-extralight">
              Fill in your details to set up your client account.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-exo-extralight flex items-center gap-3">
              <FiAlertCircle size={18} className="text-rose-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-exo-extralight mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <FiUser size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  required
                  placeholder="Enter Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-exo-extralight"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-exo-extralight mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <FiMail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="email"
                  required
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-exo-extralight"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-exo-extralight mb-1.5">
                Password
              </label>
              <div className="relative">
                <FiLock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Create a strong password (min 6 chars)"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-11 pr-11 py-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-exo-extralight"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                </button>
              </div>

              {/* Password Strength Indicator (matching organic reference project) */}
              {formData.password.length > 0 && (
                <div className="mt-2.5">
                  <div className="flex items-center justify-between text-[11px] font-exo-extralight mb-1">
                    <span className="text-zinc-500 dark:text-zinc-400">Password Strength:</span>
                    <span className="font-bold text-zinc-700 dark:text-zinc-300">{strength.label}</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${strength.color} transition-all duration-300`}
                      style={{ width: strength.width }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Terms Agreement Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-zinc-300 text-violet-600 focus:ring-violet-500"
                />
                <span className="text-xs text-zinc-600 dark:text-zinc-400 font-exo-extralight leading-relaxed">
                  I agree to MerxoDev's{' '}
                  <Link href="/terms" target="_blank" className="text-violet-600 dark:text-cyan-400 hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" target="_blank" className="text-violet-600 dark:text-cyan-400 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-bold text-sm uppercase tracking-wider font-exo-extralight shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 transition-all mt-3 cursor-pointer"
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <FiArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          {/* Login Prompt */}
          <div className="mt-8 text-center border-t border-zinc-200 dark:border-zinc-800/80 pt-6">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-exo-extralight">
              Already have an account?{' '}
              <Link
                href={`/account/login${redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`}
                className="font-bold text-violet-600 dark:text-cyan-400 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#060b19]"><span className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <RegisterForm />
    </Suspense>
  );
}
