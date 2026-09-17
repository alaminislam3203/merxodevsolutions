'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { showToast } from '@/lib/toast';
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
      setError('New password must be at least 6 characters long.');
      showToast.error('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      showToast.error('Passwords do not match. Please re-enter.');
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
      showToast.success('Password updated successfully! You can now log in.');
    } catch (err) {
      const errMsg = err?.message || 'Failed to update password. Please try again.';
      setError(errMsg);
      showToast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row mt-12 sm:mt-6">
      {/* ── Left Showcase Panel (Desktop) Matching Login Page ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#060b19] relative overflow-hidden flex-col justify-between p-12 xl:p-16 border-r border-violet-900/30">
        {/* Ambient Glows */}
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-violet-600/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-80px] right-[-80px] w-[450px] h-[450px] rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-900/10 blur-[150px] pointer-events-none" />

        {/* Hero Narrative */}
        <div className="relative z-10 my-auto py-12 max-w-xl">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold bg-violet-950/80 text-violet-300 border border-violet-800/80 font-raleway uppercase tracking-widest shadow-sm mb-6">
            <FiShield className="text-violet-400" />
            <span>MerxoDev Security & Account Recovery</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-extrabold font-display uppercase tracking-tight text-white leading-[1.15] mb-6">
            Create Your{' '}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              New Password
            </span>
          </h1>

          <p className="text-zinc-400 text-base font-raleway leading-relaxed mb-8">
            Your verification code was confirmed. Choose a strong, unique password to complete your account recovery.
          </p>

          {/* Value props list */}
          <div className="space-y-4 mb-10">
            {[
              {
                icon: FiLock,
                title: 'Bcrypt Password Hashing',
                desc: 'Passwords are irreversibly hashed with salt before storage in PostgreSQL.',
              },
              {
                icon: FiKey,
                title: 'Instant Session Invalidation',
                desc: 'Old reset tokens are permanently destroyed once your new password is saved.',
              },
              {
                icon: FiZap,
                title: 'Seamless Login',
                desc: 'Sign straight into your dashboard or client portal with your updated credentials.',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-violet-950/60 border border-violet-800/60 flex items-center justify-center text-violet-400 shrink-0 mt-0.5">
                  <item.icon size={15} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-200 font-raleway">{item.title}</h4>
                  <p className="text-xs text-zinc-400 font-raleway">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80">
            {[
              { value: 'Verified', label: 'OTP Status', color: 'from-emerald-400 to-teal-400' },
              { value: 'Min 6', label: 'Characters', color: 'from-cyan-400 to-indigo-400' },
              { value: '100%', label: 'Secure Access', color: 'from-amber-400 to-orange-500' },
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

      {/* ── Right Step 3 Panel: Set New Password ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12 py-16 mt-10 sm:mt-6">
        <div className="w-full max-w-md">
          {/* Step Indicator */}
          {!isSuccess && (
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold font-mono">
                3
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-raleway">
                Step 3 of 3: New Password
              </span>
            </div>
          )}

          {/* Missing verification warning if reached without code */}
          {isMissingVerification && !isSuccess ? (
            <div className="p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center text-2xl">
                <FiAlertCircle />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white font-raleway">
                Verification Required
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-raleway leading-relaxed">
                You must verify your email with a 6-digit code before creating a new password.
              </p>
              <Link
                href="/account/forgot-password"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-md"
              >
                <span>Start Password Reset</span>
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
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-raleway">
                  Password Updated!
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-raleway leading-relaxed">
                  Your password has been changed successfully. You can now sign into your account with your new credentials.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/account/login"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-violet-500/25 hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>Sign In Now</span>
                  <FiArrowRight size={16} />
                </Link>
              </div>
            </div>
          ) : (
            /* Set Password Form */
            <>
              {/* Header */}
              <div className="mb-6">
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-[#27003B] dark:text-white mb-2">
                  Set New Password
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm font-raleway">
                  Create a new password for <strong className="text-zinc-900 dark:text-white font-mono">{email}</strong>.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs sm:text-sm font-raleway flex items-center gap-2.5">
                  <FiAlertCircle size={16} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-5">
                {/* New Password Field */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-raleway">
                    New Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <FiLock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      placeholder="At least 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-11 pr-11 py-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all font-raleway"
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-raleway">
                    Confirm New Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <FiKey size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      placeholder="Re-type your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full pl-11 pr-11 py-3.5 rounded-2xl border bg-white dark:bg-zinc-900/90 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-raleway ${
                        confirmPassword && confirmPassword !== newPassword
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
                    <p className="mt-1 text-[11px] text-rose-500 font-raleway">
                      Passwords do not match.
                    </p>
                  )}
                </div>

                {/* Submit Reset Button */}
                <button
                  type="submit"
                  disabled={loading || newPassword.length < 6 || !confirmPassword || newPassword !== confirmPassword}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-violet-500/25 hover:shadow-cyan-500/30 hover:scale-[1.01] active:scale-98 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 cursor-pointer font-raleway uppercase tracking-wider"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>Updating Password...</span>
                    </>
                  ) : (
                    <>
                      <span>Save New Password</span>
                      <FiArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              {/* Back to Sign In Link */}
              <div className="mt-8 text-center">
                <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm font-raleway">
                  Remember your password?{' '}
                  <Link
                    href="/account/login"
                    className="text-violet-600 dark:text-cyan-400 font-bold hover:underline"
                  >
                    Back to Sign In
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
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-zinc-400 font-raleway">Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
