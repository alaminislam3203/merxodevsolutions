'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { showToast } from '@/lib/toast';
import {
  FiShield,
  FiLock,
  FiMail,
  FiZap,
  FiArrowRight,
  FiAlertCircle,
  FiCheckCircle,
  FiRotateCw,
  FiEdit3,
} from 'react-icons/fi';

function VerifyCodeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') || '';

  const [email, setEmail] = useState(emailParam);
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [resendCooldown, setResendCooldown] = useState(120); // 2 minutes cooldown
  const inputsRef = useRef([]);

  // Sync email from search params
  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [emailParam]);

  // Resend Cooldown Countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

  const fullCode = digits.join('');

  // Core verification function
  const handleVerify = async (codeToVerify) => {
    const code = codeToVerify || fullCode;
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      showToast.error('Please provide a valid email address.');
      return;
    }

    if (code.length !== 6) {
      setError('Please enter all 6 digits of the verification code.');
      showToast.error('Please enter all 6 digits of the verification code.');
      return;
    }

    setError('');
    setVerifying(true);

    try {
      const res = await fetch('/api/auth/verify-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          code: code.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid or expired verification code.');
      }

      setSuccessMessage('Code verified successfully! Opening password setup...');
      showToast.success('Code verified successfully!');
      setTimeout(() => {
        router.push(
          `/account/reset-password?email=${encodeURIComponent(email.trim())}&code=${encodeURIComponent(code.trim())}`
        );
      }, 600);
    } catch (err) {
      const errMsg = err?.message || 'Verification failed. Please check the code.';
      setError(errMsg);
      showToast.error(errMsg);
      setVerifying(false);
    }
  };

  // Handle single digit input
  const handleChange = (index, value) => {
    // Only accept numeric digit
    const cleaned = value.replace(/\D/g, '');
    if (!cleaned) {
      const nextDigits = [...digits];
      nextDigits[index] = '';
      setDigits(nextDigits);
      return;
    }

    // If user typed or pasted more than 1 character
    if (cleaned.length > 1) {
      handlePastedText(cleaned, index);
      return;
    }

    const nextDigits = [...digits];
    nextDigits[index] = cleaned[0];
    setDigits(nextDigits);
    setError('');

    // Advance focus to next input
    if (index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    // Auto verify if this was the last digit and all digits are filled
    const candidateCode = nextDigits.join('');
    if (candidateCode.length === 6) {
      handleVerify(candidateCode);
    }
  };

  // Handle Backspace navigation
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Handle Paste (auto populate all 6 boxes and auto verify)
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    handlePastedText(pastedData);
  };

  const handlePastedText = (rawText, startIndex = 0) => {
    const cleaned = rawText.replace(/\D/g, '').slice(0, 6);
    if (!cleaned) return;

    const nextDigits = [...digits];
    for (let i = 0; i < 6; i++) {
      if (cleaned[i]) {
        nextDigits[i] = cleaned[i];
      }
    }
    setDigits(nextDigits);
    setError('');

    // Focus on the appropriate input or the last one
    const focusIndex = Math.min(cleaned.length, 5);
    inputsRef.current[focusIndex]?.focus();

    // Auto verify if 6 digits provided
    if (cleaned.length === 6) {
      handleVerify(cleaned);
    }
  };

  // Resend code action
  const handleResend = async () => {
    if (resendCooldown > 0 || !email) return;
    setError('');
    setSuccessMessage('');
    setResending(true);

    try {
      const res = await fetch('/api/auth/send-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to resend code.');
      }

      setSuccessMessage('A fresh 6-digit code has been sent to your email.');
      showToast.success('A fresh 6-digit code has been sent to your email.');
      setResendCooldown(120); // Reset to 2 minutes
      setDigits(['', '', '', '', '', '']);
      inputsRef.current[0]?.focus();
    } catch (err) {
      const errMsg = err?.message || 'Failed to resend code.';
      setError(errMsg);
      showToast.error(errMsg);
    } finally {
      setResending(false);
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
            Verify Your{' '}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              Security Code
            </span>
          </h1>

          <p className="text-zinc-400 text-base font-raleway leading-relaxed mb-8">
            Check your email inbox or spam folder. Enter the 6-digit verification code below to verify your ownership and unlock password reset.
          </p>

          {/* Value props list */}
          <div className="space-y-4 mb-10">
            {[
              {
                icon: FiLock,
                title: 'Auto-Verification Support',
                desc: 'Paste or type all 6 digits and verification triggers automatically without extra clicks.',
              },
              {
                icon: FiMail,
                title: 'Check Inbox & Spam Folder',
                desc: 'In rare cases, your mail filter may route the OTP to your spam or junk folder.',
              },
              {
                icon: FiZap,
                title: '2-Minute Safe Window',
                desc: 'For your security, OTP codes expire automatically after 120 seconds.',
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
              { value: '2 Mins', label: 'OTP Expiry', color: 'from-violet-400 to-indigo-400' },
              { value: '6 Digits', label: 'Code Length', color: 'from-cyan-400 to-teal-400' },
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

      {/* ── Right Step 2 Panel: 6-Box Code Verification ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12 py-16 mt-10 sm:mt-6">
        <div className="w-full max-w-md">
          {/* Step Indicator */}
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-violet-600 text-white text-xs font-bold font-mono">
              2
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-cyan-400 font-raleway">
              Step 2 of 3: Verify Code
            </span>
          </div>

          {/* Header Title */}
          <div className="mb-6">
            <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-[#27003B] dark:text-white mb-2">
              Enter 6-Digit Code
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 font-raleway">
              <span>Code sent to:</span>
              <strong className="text-zinc-900 dark:text-white font-mono break-all">
                {email || 'your email'}
              </strong>
              <Link
                href="/account/forgot-password"
                className="inline-flex items-center gap-1 text-xs text-violet-600 dark:text-cyan-400 hover:underline font-bold font-raleway"
              >
                <FiEdit3 size={12} />
                <span>Change</span>
              </Link>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs sm:text-sm font-raleway flex items-center gap-2.5">
              <FiAlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-raleway flex items-center gap-2.5">
              <FiCheckCircle size={16} className="shrink-0 text-emerald-500" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* ── 6-Box OTP Input Form ── */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleVerify();
            }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-raleway">
                  Verification Code <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-bold">
                  Valid 2 Mins
                </span>
              </div>

              {/* Box inputs row */}
              <div className="flex items-center justify-between gap-2 sm:gap-3" onPaste={handlePaste}>
                {digits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputsRef.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    disabled={verifying}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-11 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-mono font-bold rounded-2xl border transition-all select-all ${
                      digit
                        ? 'border-violet-500 dark:border-cyan-400 bg-violet-50/50 dark:bg-violet-950/30 text-violet-700 dark:text-white shadow-md shadow-violet-500/10'
                        : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 text-zinc-900 dark:text-white'
                    } focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 disabled:opacity-50`}
                  />
                ))}
              </div>

              <p className="mt-2 text-center text-[11px] text-zinc-500 dark:text-zinc-400 font-raleway">
                Paste your 6-digit code or type it in. Auto-verifies upon 6th digit.
              </p>
            </div>

            {/* Manual Verify Code Button */}
            <button
              type="submit"
              disabled={verifying || fullCode.length !== 6}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-violet-500/25 hover:shadow-cyan-500/30 hover:scale-[1.01] active:scale-98 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 cursor-pointer font-raleway uppercase tracking-wider"
            >
              {verifying ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <span>Verify Code</span>
                  <FiArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Resend Code Section */}
          <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-raleway">
            <span className="text-zinc-500 dark:text-zinc-400">
              Didn’t receive the code?
            </span>
            {resendCooldown > 0 ? (
              <span className="text-zinc-400 dark:text-zinc-500 font-mono font-semibold">
                Resend in {Math.floor(resendCooldown / 60)}:{(resendCooldown % 60).toString().padStart(2, '0')}
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="inline-flex items-center gap-1.5 text-violet-600 dark:text-cyan-400 font-bold hover:underline cursor-pointer disabled:opacity-50"
              >
                <FiRotateCw size={13} className={resending ? 'animate-spin' : ''} />
                <span>{resending ? 'Sending...' : 'Resend Code'}</span>
              </button>
            )}
          </div>

          {/* Back to Email link */}
          <div className="mt-4 text-center">
            <Link
              href="/account/forgot-password"
              className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-cyan-400 font-raleway transition-colors"
            >
              ← Back to Email Request
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyCodePage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-zinc-400 font-raleway">Loading...</div>}>
      <VerifyCodeContent />
    </Suspense>
  );
}
