'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useSafeTranslation } from '@/hooks/useSafeTranslation';
import '@/components/i18n';
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
import AuthLottie from '@/components/AuthLottie';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '';
  const { t } = useSafeTranslation();

  const { data: session, status } = useSession();

  // If already logged in, redirect away
  useEffect(() => {
    if (status === 'authenticated') {
      const emailLower = String(session?.user?.email || '').toLowerCase().trim();
      const isAdmin = session?.user?.role === 'ADMIN' || emailLower === 'merxodevsolutions@gmail.com';

      let destination = '/';
      if (isAdmin) {
        destination = redirectUrl && redirectUrl.startsWith('/709832') ? redirectUrl : '/709832';
      } else {
        destination = redirectUrl && !redirectUrl.startsWith('/709832') && !redirectUrl.startsWith('/account') ? redirectUrl : '/';
      }
      router.replace(destination);
    }
  }, [status, session, router, redirectUrl]);

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
    if (pass.length < 6) return { score: 1, label: t('auth.register.strengthTooShort', 'Too Short (Min 6 chars)'), width: '25%', color: 'bg-rose-500' };
    if (pass.length < 8) return { score: 2, label: t('auth.register.strengthWeak', 'Weak'), width: '50%', color: 'bg-amber-500' };
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) {
      return { score: 4, label: t('auth.register.strengthVeryStrong', 'Very Strong'), width: '100%', color: 'bg-emerald-500' };
    }
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) {
      return { score: 3, label: t('auth.register.strengthStrong', 'Strong'), width: '75%', color: 'bg-cyan-500' };
    }
    return { score: 2, label: t('auth.register.strengthFair', 'Fair'), width: '50%', color: 'bg-amber-400' };
  };

  const strength = calculateStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      const msg = t('auth.register.agreeTermsError', 'You must agree to the Terms of Service and Privacy Policy.');
      setError(msg);
      showToast.error(msg);
      return;
    }

    if (formData.password.length < 6) {
      const msg = t('auth.register.passwordLengthError', 'Password must be at least 6 characters long.');
      setError(msg);
      showToast.error(msg);
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
        showToast.success(t('auth.register.regSuccessRedirect', 'Account created successfully! Redirecting to login...'));
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
    t('auth.register.benefit1', 'Direct collaboration with lead software architects'),
    t('auth.register.benefit2', 'Submit and track custom web & app inquiries'),
    t('auth.register.benefit3', 'Publish verified client reviews and testimonials'),
    t('auth.register.benefit4', 'Priority engineering response & SLA support'),
  ];

  if (status === 'loading' || status === 'authenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#060b19]">
        <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden bg-slate-50 dark:bg-[#060b19] no-gsap mt-12 sm:mt-6">
      {/* Ambient Glows across the entire page */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-cyan-400/15 dark:bg-cyan-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[450px] h-[450px] rounded-full bg-violet-400/15 dark:bg-violet-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-indigo-300/15 dark:bg-indigo-900/10 blur-[150px] pointer-events-none" />

      {/* ── Left Showcase Panel (Desktop) ── */}
      <div className="hidden lg:flex lg:flex-1 relative z-10 flex-col justify-between p-12 xl:p-16">

        {/* Narrative & Benefits */}
        <div className="relative z-10 my-auto py-10 max-w-xl">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold bg-cyan-100/90 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/80 font-exo-extralight uppercase tracking-widest shadow-xs mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
            <span>{t('auth.register.badge', 'MerxoDev Client Network')}</span>
          </div>

          <h1
            suppressHydrationWarning
            className="font-exo-medium text-4xl xl:text-5xl uppercase tracking-wide text-zinc-900 dark:text-white leading-tight mb-5"
          >
            {t('auth.register.heroTitleStart', 'Start Your')}{' '}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-400 bg-clip-text text-transparent">
              {t('auth.register.heroTitleGradient', 'Digital Journey')}
            </span>
          </h1>

          <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed font-exo-extralight mb-8">
            {t('auth.register.heroDesc', 'Create an account to submit project scopes, review proposals, coordinate with engineering leads, and leave verified reviews.')}
          </p>

          {/* Benefits List */}
          <div className="space-y-3.5 mb-10">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300 font-exo-extralight">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center text-white shrink-0 text-xs shadow-xs">
                  <FiCheck size={12} strokeWidth={3} />
                </div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 border-t border-zinc-200 dark:border-zinc-800/80 pt-6">
            <div>
              <p className="font-exo-medium text-xl text-zinc-900 dark:text-white font-extrabold">{t('auth.register.metric1Value', '100%')}</p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-exo-extralight">{t('auth.register.metric1Label', 'Code Ownership')}</p>
            </div>
            <div>
              <p className="font-exo-medium text-xl text-cyan-600 dark:text-cyan-400 font-extrabold">{t('auth.register.metric2Value', '2–12h')}</p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-exo-extralight">{t('auth.register.metric2Label', 'Response SLA')}</p>
            </div>
            <div>
              <p className="font-exo-medium text-xl text-amber-500 dark:text-amber-400 font-extrabold">{t('auth.register.metric3Value', 'Verified')}</p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-exo-extralight">{t('auth.register.metric3Label', 'Client Reviews')}</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500 font-exo-extralight border-t border-zinc-200 dark:border-zinc-800/60 pt-6">
          <span suppressHydrationWarning>© {new Date().getFullYear()} MerxoDev Solutions. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">{t('auth.register.privacy', 'Privacy Policy')}</Link>
            <Link href="/terms" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">{t('auth.register.terms', 'Terms of Service')}</Link>
          </div>
        </div>
      </div>

      {/* ── Center Divider with Animated Man / Character (Desktop) ── */}
      <div className="hidden lg:flex flex-col items-center justify-center relative z-20 px-2 xl:px-4 self-stretch my-8 shrink-0">
        {/* Top subtle vertical divider line */}
        <div className="w-[1.5px] flex-1 min-h-[50px] bg-gradient-to-b from-transparent via-zinc-300 dark:via-zinc-800 to-cyan-500/60 dark:to-cyan-400/80 opacity-70" />

        {/* Themed Lottie Animation */}
        <div className="my-4 transition-transform hover:scale-105 duration-300">
          <AuthLottie type="register" size="md" />
        </div>

        {/* Bottom subtle vertical divider line */}
        <div className="w-[1.5px] flex-1 min-h-[50px] bg-gradient-to-b from-cyan-500/60 dark:from-cyan-400/80 via-zinc-300 dark:via-zinc-800 to-transparent opacity-70" />
      </div>

      {/* ── Right Registration Panel ── */}
      <div className="w-full lg:flex-1 relative z-10 flex items-center justify-center px-6 sm:px-12 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2
              suppressHydrationWarning
              className="font-exo-medium text-3xl sm:text-4xl uppercase tracking-wide text-[#27003B] dark:text-white mb-2"
            >
              {t('auth.register.title', 'Create Account')}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm font-exo-extralight">
              {t('auth.register.subtitle', 'Fill in your details to set up your client account.')}
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
                {t('auth.register.fullName', 'Full Name')}
              </label>
              <div className="relative">
                <FiUser size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  required
                  placeholder={t('auth.register.fullNamePlaceholder', 'Enter Your Name')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-exo-extralight"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-exo-extralight mb-1.5">
                {t('auth.register.emailLabel', 'Email Address')}
              </label>
              <div className="relative">
                <FiMail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="email"
                  required
                  placeholder={t('auth.register.emailPlaceholder', 'Enter Your Email')}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-exo-extralight"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-exo-extralight mb-1.5">
                {t('auth.register.passwordLabel', 'Password')}
              </label>
              <div className="relative">
                <FiLock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder={t('auth.register.passwordPlaceholder', 'Create a strong password (min 6 chars)')}
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

              {/* Password Strength Indicator */}
              {formData.password.length > 0 && (
                <div className="mt-2.5">
                  <div className="flex items-center justify-between text-[11px] font-exo-extralight mb-1">
                    <span className="text-zinc-500 dark:text-zinc-400">{t('auth.register.passwordStrength', 'Password Strength:')}</span>
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
                  {t('auth.register.agreeTerms', "I agree to MerxoDev's")}{' '}
                  <Link href="/terms" target="_blank" className="text-violet-600 dark:text-cyan-400 hover:underline">
                    {t('auth.register.terms', 'Terms of Service')}
                  </Link>{' '}
                  {t('auth.register.and', 'and')}{' '}
                  <Link href="/privacy" target="_blank" className="text-violet-600 dark:text-cyan-400 hover:underline">
                    {t('auth.register.privacy', 'Privacy Policy')}
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
                  <span>{t('auth.register.createBtn', 'Create Account')}</span>
                  <FiArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          {/* Login Prompt */}
          <div className="mt-8 text-center border-t border-zinc-200 dark:border-zinc-800/80 pt-6">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-exo-extralight">
              {t('auth.register.haveAccount', 'Already have an account?')}{' '}
              <Link
                href={`/account/login${redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`}
                className="font-bold text-violet-600 dark:text-cyan-400 hover:underline"
              >
                {t('auth.register.signIn', 'Sign In')}
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
