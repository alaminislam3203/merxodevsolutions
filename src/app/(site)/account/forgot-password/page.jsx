'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheckCircle,
  FiAlertCircle,
  FiKey,
  FiShield,
  FiRotateCw,
} from 'react-icons/fi';
import toast from 'react-hot-toast';

function ForgotPasswordContent() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // States
  const [codeSent, setCodeSent] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Handle Send / Resend Code
  const handleSendCode = async (e) => {
    e?.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid registered email address.');
      return;
    }

    setSendingCode(true);

    try {
      const res = await fetch('/api/auth/send-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || 'Failed to send verification code. Please check your email.');
        setSendingCode(false);
      } else {
        setSendingCode(false);
        setCodeSent(true);
        setResendCooldown(60); // 60 seconds cooldown
        setSuccessMessage('A 6-digit verification code has been sent to your email. Please check your inbox or spam folder.');
        toast.success('Verification code sent to your email!');
      }
    } catch (err) {
      setSendingCode(false);
      setError(err?.message || 'Network error. Please try again.');
    }
  };

  // Handle Verify & Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your account email address.');
      return;
    }

    if (!code.trim() || code.trim().length < 4) {
      setError('Please enter the 6-digit verification code sent to your email.');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please verify your new password.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          code: code.trim(),
          newPassword,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || 'Failed to reset password. Please check your code.');
        setSubmitting(false);
      } else {
        setSubmitting(false);
        setIsSuccess(true);
        toast.success('Password reset successfully!');
      }
    } catch (err) {
      setSubmitting(false);
      setError(err?.message || 'Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-[#060b19] mt-12 sm:mt-6">
      {/* ── Left Showcase Panel (Matching Login Page Style) ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#060b19] relative overflow-hidden flex-col justify-between p-12 xl:p-16 border-r border-violet-900/30">
        {/* Ambient Glows */}
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-violet-600/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-80px] right-[-80px] w-[450px] h-[450px] rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-900/10 blur-[150px] pointer-events-none" />

        {/* Hero Narrative */}
        <div className="relative z-10 my-auto py-12 max-w-xl">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold bg-violet-950/80 text-violet-300 border border-violet-800/80 font-raleway uppercase tracking-widest shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Enterprise Security & Account Recovery</span>
          </div>

          <h1 className="font-display text-4xl xl:text-5xl uppercase tracking-wide text-white leading-tight mb-5">
            SECURE YOUR <span className="text-orange-500">CLIENT</span>{' '}
            <span className="bg-gradient-to-r from-orange-400 via-white to-[#84cc16] bg-clip-text text-transparent">
              ACCOUNT
            </span>
          </h1>

          <p className="text-zinc-400 text-base leading-relaxed font-raleway mb-10">
            Verify your email identity with a secure 6-digit one-time code to safely reset your password and regain immediate access to your client dashboard and projects.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '256-bit', label: 'Bcrypt Encryption', color: 'from-violet-500 to-indigo-500' },
              { value: '10 Min', label: 'Code Validity', color: 'from-cyan-400 to-blue-500' },
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

      {/* ── Right Reset Password Panel (Matching Login Page Structure) ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12 py-16">
        <div className="w-full max-w-md">
          {/* Header Title */}
          <div className="mb-8">
            <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-[#27003B] dark:text-white mb-2">
              {isSuccess ? 'Password Updated' : 'Reset Password'}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm font-raleway">
              {isSuccess
                ? 'Your password has been changed successfully.'
                : 'Verify your account with a 6-digit email code to choose a new password.'}
            </p>
          </div>

          {/* Success Banner after reset */}
          {isSuccess ? (
            <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-center space-y-5 animate-fade-in">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-3xl shadow-sm">
                <FiCheckCircle />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-raleway">
                  Password Reset Successfully!
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-raleway leading-relaxed">
                  Your credentials have been securely updated. You can now log into your account using your new password.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/account/login"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-lg shadow-violet-500/25 hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>Sign In Now</span>
                  <FiArrowRight size={16} />
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs sm:text-sm font-raleway flex items-center gap-2.5">
                  <FiAlertCircle size={16} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Code Sent Notice */}
              {successMessage && (
                <div className="mb-6 p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/80 text-cyan-800 dark:text-cyan-300 text-xs sm:text-sm font-raleway flex items-center gap-2.5">
                  <FiCheckCircle size={16} className="shrink-0 text-cyan-500" />
                  <span>{successMessage}</span>
                </div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-5">
                {/* Email Address with Send Code Trigger */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-raleway">
                    Registered Email
                  </label>
                  <div className="relative flex items-center gap-2">
                    <div className="relative flex-1">
                      <FiMail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                      <input
                        type="email"
                        required
                        disabled={sendingCode || (codeSent && resendCooldown > 40)}
                        placeholder="client@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all font-raleway disabled:opacity-70"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleSendCode}
                      disabled={sendingCode || resendCooldown > 0 || !email.trim()}
                      className="px-4 py-3.5 rounded-2xl bg-violet-100 hover:bg-violet-200 dark:bg-violet-950/70 dark:hover:bg-violet-900/80 text-violet-700 dark:text-cyan-400 border border-violet-200 dark:border-violet-800/80 font-bold text-xs font-raleway transition-all shrink-0 disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex items-center gap-1.5"
                    >
                      {sendingCode ? (
                        <>
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : resendCooldown > 0 ? (
                        <span>Resend ({resendCooldown}s)</span>
                      ) : codeSent ? (
                        <>
                          <FiRotateCw size={13} />
                          <span>Resend Code</span>
                        </>
                      ) : (
                        <>
                          <FiKey size={13} />
                          <span>Send Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400 font-raleway">
                    {codeSent
                      ? 'Check your inbox for the 6-digit verification code.'
                      : 'Click "Send Code" to receive your verification OTP.'}
                  </p>
                </div>

                {/* Verification Code Field (Shown after code is requested) */}
                {codeSent && (
                  <div className="space-y-1.5 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-raleway">
                        6-Digit Verification Code <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-bold">
                        Valid 10 Mins
                      </span>
                    </div>
                    <div className="relative">
                      <FiKey size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="Enter 6-digit code (e.g. 123456)"
                        value={code}
                        onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-violet-300 dark:border-violet-700/60 bg-violet-50/50 dark:bg-violet-950/20 text-base font-mono tracking-widest text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all font-raleway"
                      />
                    </div>
                  </div>
                )}

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
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                      aria-label="Toggle password visibility"
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
                    <FiLock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      placeholder="Confirm your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-11 pr-11 py-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all font-raleway"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirmPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                    </button>
                  </div>
                </div>

                {/* Submit Reset Button */}
                <button
                  type="submit"
                  disabled={submitting || !codeSent || !code.trim() || newPassword.length < 6 || !confirmPassword}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-violet-500/25 hover:shadow-cyan-500/30 hover:scale-[1.01] active:scale-98 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 cursor-pointer font-raleway uppercase tracking-wider"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>Verifying & Resetting...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify Code & Reset Password</span>
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

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-zinc-400 font-raleway">Loading...</div>}>
      <ForgotPasswordContent />
    </Suspense>
  );
}
