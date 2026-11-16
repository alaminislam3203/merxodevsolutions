'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import '@/components/i18n';
import { showToast } from '@/lib/toast';
import {
  FiMail,
  FiArrowRight,
  FiAlertCircle,
  FiCheckCircle,
  FiShield,
  FiLock,
  FiZap,
} from 'react-icons/fi';
import AuthAnimation from '@/components/AuthAnimation';

function ForgotPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get('email') || '';
  const { t } = useTranslation();

  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email.trim() || !email.includes('@')) {
      const msg = t('auth.forgotPassword.validEmailError', 'Please provide a valid email address.');
      setError(msg);
      showToast.error(msg);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/send-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send verification code.');
      }

      setSuccessMessage(t('auth.forgotPassword.codeSentSuccess', 'Verification code sent! Please check your email inbox.'));
      showToast.success(t('auth.forgotPassword.codeSentSuccess', 'Verification code sent! Please check your email inbox.'));
      setTimeout(() => {
        router.push(`/account/verify-code?email=${encodeURIComponent(email.trim())}`);
      }, 700);
    } catch (err) {
      const errMsg = err?.message || 'Something went wrong. Please try again.';
      setError(errMsg);
      showToast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden bg-slate-50 dark:bg-[#060b19] mt-12 sm:mt-6">
      {/* Ambient Glows across the entire page */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-violet-400/15 dark:bg-violet-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[450px] h-[450px] rounded-full bg-cyan-400/15 dark:bg-cyan-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-indigo-300/15 dark:bg-indigo-900/10 blur-[150px] pointer-events-none" />

      {/* ── Left Showcase Panel (Desktop) Matching Login Page ── */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-between p-12 xl:p-16">

        {/* Hero Narrative */}
        <div className="relative z-10 my-auto py-12 max-w-xl">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold bg-violet-100/90 dark:bg-violet-950/80 text-violet-800 dark:text-violet-300 border border-violet-200 dark:border-violet-800/80 font-exo-extralight uppercase tracking-widest shadow-xs mb-6">
            <FiShield className="text-violet-600 dark:text-violet-400" />
            <span>{t('auth.forgotPassword.badge', 'MerxoDev Security & Account Recovery')}</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-extrabold font-exo-medium uppercase tracking-tight text-zinc-900 dark:text-white leading-[1.15] mb-6">
            {t('auth.forgotPassword.heroTitleStart', 'Recover Your')}{' '}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 dark:from-violet-400 dark:via-indigo-300 dark:to-cyan-400 bg-clip-text text-transparent">
              {t('auth.forgotPassword.heroTitleGradient', 'Account Securely')}
            </span>
          </h1>

          <p className="text-zinc-600 dark:text-zinc-400 text-base font-exo-extralight leading-relaxed mb-8">
            {t('auth.forgotPassword.heroDesc', 'Forgot your password? No worries. We will send a secure 6-digit verification code to your registered email to confirm your identity.')}
          </p>

          {/* Themed Lottie Vector Animation */}
          <div className="mb-8 flex items-center justify-center">
            <AuthAnimation type="forgot-password" />
          </div>

          {/* Value props list */}
          <div className="space-y-4 mb-10">
            {[
              {
                icon: FiLock,
                title: t('auth.forgotPassword.prop1Title', 'Encrypted Security'),
                desc: t('auth.forgotPassword.prop1Desc', 'End-to-end encrypted token verification with 2-minute safety window.'),
              },
              {
                icon: FiMail,
                title: t('auth.forgotPassword.prop2Title', 'Instant Email Delivery'),
                desc: t('auth.forgotPassword.prop2Desc', 'Direct OTP sent straight to your inbox with anti-spam protection.'),
              },
              {
                icon: FiZap,
                title: t('auth.forgotPassword.prop3Title', 'Quick 3-Step Process'),
                desc: t('auth.forgotPassword.prop3Desc', 'Enter email → Verify 6-digit box code → Set new secure password.'),
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800/60 flex items-center justify-center text-violet-600 dark:text-violet-400 shrink-0 mt-0.5">
                  <item.icon size={15} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 font-exo-extralight">{item.title}</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-exo-extralight">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800/80">
            {[
              { value: t('auth.forgotPassword.metric1Value', '2 Mins'), label: t('auth.forgotPassword.metric1Label', 'OTP Expiry'), color: 'from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400' },
              { value: t('auth.forgotPassword.metric2Value', '6 Digits'), label: t('auth.forgotPassword.metric2Label', 'Code Length'), color: 'from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400' },
              { value: t('auth.forgotPassword.metric3Value', '100%'), label: t('auth.forgotPassword.metric3Label', 'Secure Access'), color: 'from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-500' },
            ].map((s) => (
              <div
                key={s.label}
                className="p-4 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/40 backdrop-blur-md text-center shadow-xs dark:shadow-none group hover:border-violet-400 dark:hover:border-violet-500/50 transition-colors"
              >
                <p className={`text-2xl font-extrabold font-exo-medium bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>
                  {s.value}
                </p>
                <p className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider font-exo-extralight mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500 font-exo-extralight border-t border-zinc-200 dark:border-zinc-800/60 pt-6">
          <span>© {new Date().getFullYear()} MerxoDev Solutions. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">{t('auth.login.privacy', 'Privacy')}</Link>
            <Link href="/terms" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">{t('auth.login.terms', 'Terms')}</Link>
          </div>
        </div>
      </div>

      {/* ── Right Step 1 Panel: Request Code ── */}
      <div className="w-full lg:w-1/2 relative z-10 flex items-center justify-center px-6 sm:px-12 py-16 mt-10 sm:mt-6">
        <div className="w-full max-w-md">
          {/* Mobile Animation */}
          <div className="lg:hidden flex justify-center mb-6">
            <AuthAnimation type="forgot-password" size="sm" />
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-violet-600 text-white text-xs font-bold font-mono">
              1
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-cyan-400 font-exo-extralight">
              {t('auth.forgotPassword.stepIndicator', 'Step 1 of 3: Enter Email')}
            </span>
          </div>

          {/* Header Title */}
          <div className="mb-8">
            <h2 className="font-exo-medium text-3xl sm:text-4xl uppercase tracking-wide text-[#27003B] dark:text-white mb-2">
              {t('auth.forgotPassword.title', 'Forgot Password?')}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm font-exo-extralight">
              {t('auth.forgotPassword.subtitle', 'Enter your registered email and we’ll send you a 6-digit verification code to reset your password.')}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs sm:text-sm font-exo-extralight flex items-center gap-2.5">
              <FiAlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/80 text-cyan-800 dark:text-cyan-300 text-xs sm:text-sm font-exo-extralight flex items-center gap-2.5">
              <FiCheckCircle size={16} className="shrink-0 text-cyan-500" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSendCode} className="space-y-6">
            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-exo-extralight">
                {t('auth.forgotPassword.registeredEmailLabel', 'Registered Email Address')} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <FiMail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                <input
                  type="email"
                  required
                  disabled={loading}
                  placeholder={t('auth.forgotPassword.emailPlaceholder', 'Enter your registered email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all font-exo-extralight disabled:opacity-70"
                />
              </div>
              <p className="mt-1.5 text-[11px] text-zinc-500 dark:text-zinc-400 font-exo-extralight">
                {t('auth.forgotPassword.helperNote', 'We will send a 6-digit one-time code to this address (Valid for 2 minutes).')}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-violet-500/25 hover:shadow-cyan-500/30 hover:scale-[1.01] active:scale-98 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 cursor-pointer font-exo-extralight uppercase tracking-wider"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>{t('auth.forgotPassword.sending', 'Sending Code...')}</span>
                </>
              ) : (
                <>
                  <span>{t('auth.forgotPassword.sendBtn', 'Send Verification Code')}</span>
                  <FiArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Direct link to code verification if user already received code */}
          <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Link
              href="/account/login"
              className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-cyan-400 font-exo-extralight transition-colors"
            >
              {t('auth.forgotPassword.backToLogin', 'Back to Sign In')}
            </Link>
            <Link
              href={email.trim() ? `/account/verify-code?email=${encodeURIComponent(email.trim())}` : '/account/verify-code'}
              className="text-xs text-violet-600 dark:text-cyan-400 font-bold hover:underline font-exo-extralight"
            >
              {t('auth.forgotPassword.alreadyHaveCode', 'Already have a code? Verify now →')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-zinc-400 font-exo-extralight">Loading...</div>}>
      <ForgotPasswordContent />
    </Suspense>
  );
}
