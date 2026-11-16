'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSafeTranslation } from '@/hooks/useSafeTranslation';
import '@/components/i18n';
import { showToast } from '@/lib/toast';
import AuthLottie from '@/components/AuthLottie';
import {
  FiShield,
  FiLock,
  FiKey,
  FiZap,
  FiMail,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiAlertCircle,
  FiCheckCircle,
} from 'react-icons/fi';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const code = searchParams.get('code') || '';
  const { t } = useSafeTranslation();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // If email or code is missing, prompt user to restart verification
  const isMissingVerification = !email || !code || code.length !== 6;

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      const msg = t('auth.resetPassword.passwordLength', 'New password must be at least 6 characters long.');
      setError(msg);
      showToast.error(msg);
      return;
    }

    if (newPassword !== confirmPassword) {
      const msg = t('auth.resetPassword.passwordMismatch', 'Passwords do not match. Please re-enter.');
      setError(msg);
      showToast.error(msg);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          code: code.trim(),
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update password.');
      }

      setIsSuccess(true);
      showToast.success(t('auth.resetPassword.updatedSuccess', 'Password updated successfully! You can now log in.'));
    } catch (err) {
      const errMsg = err?.message || 'Failed to update password. Please try again.';
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
      <div className="hidden lg:flex lg:flex-1 relative z-10 flex-col justify-between p-12 xl:p-16">

        {/* Hero Narrative */}
        <div className="relative z-10 my-auto py-12 max-w-xl">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold bg-violet-100/90 dark:bg-violet-950/80 text-violet-800 dark:text-violet-300 border border-violet-200 dark:border-violet-800/80 font-exo-extralight uppercase tracking-widest shadow-xs mb-6">
            <FiShield className="text-violet-600 dark:text-violet-400" />
            <span>{t('auth.resetPassword.badge', 'MerxoDev Security & Account Recovery')}</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-extrabold font-exo-medium uppercase tracking-tight text-zinc-900 dark:text-white leading-[1.15] mb-6">
            {t('auth.resetPassword.heroTitleStart', 'Create Your')}{' '}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 dark:from-violet-400 dark:via-indigo-300 dark:to-cyan-400 bg-clip-text text-transparent">
              {t('auth.resetPassword.heroTitleGradient', 'New Password')}
            </span>
          </h1>

          <p className="text-zinc-600 dark:text-zinc-400 text-base font-exo-extralight leading-relaxed mb-8">
            {t('auth.resetPassword.heroDesc', 'Your verification code was confirmed. Choose a strong, unique password to complete your account recovery.')}
          </p>

          {/* Value props list */}
          <div className="space-y-4 mb-10">
            {[
              {
                icon: FiLock,
                title: t('auth.resetPassword.prop1Title', 'Bcrypt Password Hashing'),
                desc: t('auth.resetPassword.prop1Desc', 'Passwords are irreversibly hashed with salt before storage in PostgreSQL.'),
              },
              {
                icon: FiKey,
                title: t('auth.resetPassword.prop2Title', 'Instant Session Invalidation'),
                desc: t('auth.resetPassword.prop2Desc', 'Old reset tokens are permanently destroyed once your new password is saved.'),
              },
              {
                icon: FiZap,
                title: t('auth.resetPassword.prop3Title', 'Seamless Login'),
                desc: t('auth.resetPassword.prop3Desc', 'Sign straight into your dashboard or client portal with your updated credentials.'),
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
              { value: t('auth.resetPassword.metric1Value', 'Bcrypt'), label: t('auth.resetPassword.metric1Label', 'Hashing Algo'), color: 'from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-400' },
              { value: t('auth.resetPassword.metric2Value', 'Salt'), label: t('auth.resetPassword.metric2Label', 'Auto-Generated'), color: 'from-cyan-600 to-indigo-600 dark:from-cyan-400 dark:to-indigo-400' },
              { value: t('auth.resetPassword.metric3Value', '100%'), label: t('auth.resetPassword.metric3Label', 'Data Privacy'), color: 'from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-500' },
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

      {/* ── Center Divider with Animated Man / Character (Desktop) ── */}
      <div className="hidden lg:flex flex-col items-center justify-center relative z-20 px-2 xl:px-4 self-stretch my-8 shrink-0">
        {/* Top subtle vertical divider line */}
        <div className="w-[1.5px] flex-1 min-h-[50px] bg-gradient-to-b from-transparent via-zinc-300 dark:via-zinc-800 to-indigo-500/60 dark:to-indigo-400/80 opacity-70" />

        {/* Themed Lottie Animation */}
        <div className="my-4 transition-transform hover:scale-105 duration-300">
          <AuthLottie type="reset-password" size="md" />
        </div>

        {/* Bottom subtle vertical divider line */}
        <div className="w-[1.5px] flex-1 min-h-[50px] bg-gradient-to-b from-indigo-500/60 dark:from-indigo-400/80 via-zinc-300 dark:via-zinc-800 to-transparent opacity-70" />
      </div>

      {/* ── Right Step 3 Panel: Set New Password ── */}
      <div className="w-full lg:flex-1 relative z-10 flex items-center justify-center px-6 sm:px-12 py-16 mt-10 sm:mt-6">
        <div className="w-full max-w-md">
          {/* Step Indicator */}
          {!isSuccess && (
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold font-mono">
                3
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-exo-extralight">
                {t('auth.resetPassword.stepIndicator', 'Step 3 of 3: Set New Password')}
              </span>
            </div>
          )}

          {/* Missing verification warning if reached without code */}
          {isMissingVerification && !isSuccess ? (
            <div className="p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center text-2xl">
                <FiAlertCircle />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white font-exo-extralight">
                {t('auth.resetPassword.title', 'Verification Required')}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-exo-extralight leading-relaxed">
                {t('auth.resetPassword.missingNotice', 'Verification session expired or missing parameters. Please start again from the email step.')}
              </p>
              <Link
                href="/account/forgot-password"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-md"
              >
                <span>{t('auth.resetPassword.restartVerification', 'Start Recovery Again')}</span>
                <FiArrowRight size={14} />
              </Link>
            </div>
          ) : isSuccess ? (
            /* Success Card */
            <div className="p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-center space-y-5 animate-fade-in">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-3xl shadow-sm">
                <FiCheckCircle />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-exo-extralight">
                  {t('auth.resetPassword.successTitle', 'Password Reset Complete!')}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-exo-extralight leading-relaxed">
                  {t('auth.resetPassword.successDesc', 'Your password has been securely updated. You can now log into your account.')}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/account/login"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-violet-500/25 hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>{t('auth.resetPassword.goToLogin', 'Proceed to Log In')}</span>
                  <FiArrowRight size={16} />
                </Link>
              </div>
            </div>
          ) : (
            /* Set Password Form */
            <>
              {/* Header */}
              <div className="mb-6">
                <h2 className="font-exo-medium text-3xl sm:text-4xl uppercase tracking-wide text-[#27003B] dark:text-white mb-2">
                  {t('auth.resetPassword.title', 'Create New Password')}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm font-exo-extralight">
                  {t('auth.resetPassword.subtitle', 'Enter and confirm your new secure password for')}{' '}
                  <strong className="text-zinc-900 dark:text-white font-mono">{email}</strong>.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs sm:text-sm font-exo-extralight flex items-center gap-2.5">
                  <FiAlertCircle size={16} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-5">
                {/* New Password Field */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-exo-extralight">
                    {t('auth.resetPassword.newPasswordLabel', 'New Password')} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <FiLock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      placeholder={t('auth.resetPassword.newPasswordPlaceholder', 'Enter new password (min. 6 chars)')}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-11 pr-11 py-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all font-exo-extralight"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                    >
                      {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-exo-extralight">
                    {t('auth.resetPassword.confirmPasswordLabel', 'Confirm New Password')} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <FiKey size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      placeholder={t('auth.resetPassword.confirmPasswordPlaceholder', 'Re-enter new password')}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full pl-11 pr-11 py-3.5 rounded-2xl border bg-white dark:bg-zinc-900/90 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-exo-extralight ${confirmPassword && confirmPassword !== newPassword
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-zinc-200 dark:border-zinc-800 focus:border-violet-500'
                        }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                    >
                      {showConfirmPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                    </button>
                  </div>
                  {confirmPassword && confirmPassword !== newPassword && (
                    <p className="mt-1 text-[11px] text-rose-500 font-exo-extralight">
                      {t('auth.resetPassword.passwordMismatch', 'Passwords do not match. Please re-enter.')}
                    </p>
                  )}
                </div>

                {/* Submit Reset Button */}
                <button
                  type="submit"
                  disabled={loading || newPassword.length < 6 || !confirmPassword || newPassword !== confirmPassword}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-violet-500/25 hover:shadow-cyan-500/30 hover:scale-[1.01] active:scale-98 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 cursor-pointer font-exo-extralight uppercase tracking-wider"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>{t('auth.resetPassword.updating', 'Updating Password...')}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('auth.resetPassword.updateBtn', 'Update Password & Continue')}</span>
                      <FiArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              {/* Back to Sign In Link */}
              <div className="mt-8 text-center">
                <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm font-exo-extralight">
                  {t('auth.forgotPassword.rememberPassword', 'Remember your password?')}{' '}
                  <Link
                    href="/account/login"
                    className="text-violet-600 dark:text-cyan-400 font-bold hover:underline"
                  >
                    {t('auth.forgotPassword.backToLogin', 'Back to Sign In')}
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-zinc-400 font-exo-extralight">Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
