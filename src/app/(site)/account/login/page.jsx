'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheckCircle,
  FiAlertCircle,
  FiLayers,
  FiHome,
  FiShield,
} from 'react-icons/fi';
import Logo from '@/components/Logo';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/account';
  const isRegistered = searchParams.get('registered') === 'true';

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        setError('Invalid email or password. Please verify your credentials.');
        setLoading(false);
      } else {
        // Fetch profile to see if user is ADMIN to redirect appropriately
        try {
          const profileRes = await fetch('/api/account/profile');
          if (profileRes.ok) {
            const data = await profileRes.json();
            if (data?.isAdmin && (redirectUrl === '/account' || redirectUrl === '/admin')) {
              window.location.href = '/709832';
              return;
            }
          }
        } catch { }

        let targetUrl = redirectUrl;
        if (targetUrl === '/#testimonials' || targetUrl === '#testimonials') {
          targetUrl = '/?scroll=testimonials';
        }
        window.location.href = targetUrl;
      }
    } catch (err) {
      setError(err?.message || 'Authentication failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-[#060b19] mt-12 sm:mt-6">
      {/* ── Left Showcase Panel (Desktop) ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#060b19] relative overflow-hidden flex-col justify-between p-12 xl:p-16 border-r border-violet-900/30">
        {/* Ambient Glows */}
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-violet-600/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-80px] right-[-80px] w-[450px] h-[450px] rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-900/10 blur-[150px] pointer-events-none" />

        {/* Top Branding */}
        {/* <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="inline-block transition-transform hover:scale-105">
            <Logo />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold font-raleway text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 backdrop-blur-md transition-colors"
          >
            <FiHome size={14} />
            <span>Back to Home</span>
          </Link>
        </div> */}

        {/* Hero Narrative */}
        <div className="relative z-10 my-auto py-12 max-w-xl">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold bg-violet-950/80 text-violet-300 border border-violet-800/80 font-raleway uppercase tracking-widest shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Enterprise Web & Software Platform</span>
          </div>

          <h1 className="font-display text-4xl xl:text-5xl uppercase tracking-wide text-white leading-tight mb-5">
            We Build Your{' '}
            <span className="text-orange-500">DREAM</span>{' '}
            <span className="bg-gradient-to-r from-orange-400 via-white to-[#84cc16] bg-clip-text text-transparent">
              Project
            </span>
          </h1>

          <p className="text-zinc-400 text-base leading-relaxed font-raleway mb-10">
            Sign in to access your client dashboard, track custom software blueprints, monitor project delivery milestones, and manage verified reviews.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '50+', label: 'Delivered Projects', color: 'from-violet-500 to-indigo-500' },
              { value: '99.9%', label: 'Uptime SLA', color: 'from-cyan-400 to-blue-500' },
              { value: '5.0★', label: 'Client Rating', color: 'from-amber-400 to-orange-500' },
            ].map((s) => (
              <div
                key={s.label}
                className="p-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md text-center group hover:border-violet-500/50 transition-colors"
              >
                <p className={`text-2xl font-extrabold font-display bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>
                  {s.value}
                </p>
                <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider font-raleway mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex items-center justify-between text-xs text-zinc-500 font-raleway border-t border-zinc-800/60 pt-6">
          <span>© {new Date().getFullYear()} MerxoDev Solutions. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">Terms</Link>
          </div>
        </div>
      </div>

      {/* ── Right Login Panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12 py-16">
        <div className="w-full max-w-md">
          {/* Mobile Logo Header */}
          {/* <div className="lg:hidden flex items-center justify-between mb-8">
            <Link href="/">
              <Logo />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold font-raleway text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
            >
              <FiHome size={13} />
              <span>Home</span>
            </Link>
          </div> */}

          <div className="mb-8">
            <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-[#27003B] dark:text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm font-raleway">
              Sign in to manage your client projects and account.
            </p>
          </div>

          {/* Registration Success Banner */}
          {isRegistered && !error && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-raleway flex items-center gap-3">
              <FiCheckCircle size={18} className="text-emerald-500 shrink-0" />
              <span>Account created successfully! Please sign in with your email and password.</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-raleway flex items-center gap-3">
              <FiAlertCircle size={18} className="text-rose-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-raleway mb-1.5">
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
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all font-raleway"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-raleway">
                  Password
                </label>
                <Link
                  href="/account/forgot-password"
                  className="text-xs text-violet-600 dark:text-cyan-400 hover:underline font-raleway"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <FiLock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter Your Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-11 pr-11 py-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all font-raleway"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm uppercase tracking-wider font-raleway shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 transition-all mt-2 cursor-pointer"
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Account</span>
                  <FiArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          {/* Register Prompt */}
          <div className="mt-8 text-center border-t border-zinc-200 dark:border-zinc-800/80 pt-6">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-raleway">
              Don't have an account yet?{' '}
              <Link
                href={`/account/register${redirectUrl !== '/account' ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`}
                className="font-bold text-violet-600 dark:text-cyan-400 hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>

          {/* Admin Portal notice */}
          <div className="mt-6 text-center">
            <div
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 font-raleway transition-colors"
            >
              <FiShield size={13} />
              <span>Client Workspace Portal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#060b19]"><span className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
