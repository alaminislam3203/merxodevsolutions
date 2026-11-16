'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import '@/components/i18n';
import { showToast } from '@/lib/toast';
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
  FiKey,
  FiRotateCw,
} from 'react-icons/fi';
import Logo from '@/components/Logo';
import AuthAnimation from '@/components/AuthAnimation';

function LoginForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/account';
  const isRegistered = searchParams.get('registered') === 'true';

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 2FA States
  const [is2FAStep, setIs2FAStep] = useState(false);
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [verifying2FA, setVerifying2FA] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(120);
  const [resending, setResending] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  const inputsRef = useRef([]);

  // 2FA Cooldown Timer
  useEffect(() => {
    if (!is2FAStep || resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [is2FAStep, resendCooldown]);

  const executeSignIn = async (twoFactorCode = null) => {
    const credentials = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      redirect: false,
    };
    if (twoFactorCode) {
      credentials.twoFactorCode = twoFactorCode;
    }

    const res = await signIn('credentials', credentials);
    if (res?.error) {
      const errMsg = twoFactorCode ? t('auth.login.invalid2fa', 'Invalid or expired 2FA code. Please try again.') : t('auth.login.invalidCredentials', 'Invalid email or password.');
      setError(errMsg);
      showToast.error(errMsg);
      setLoading(false);
      setVerifying2FA(false);
      return;
    }

    showToast.success(t('auth.login.loginSuccess', 'Login successful! Redirecting...'));

    // Fetch profile to see if user is ADMIN to redirect appropriately
    try {
      const profileRes = await fetch('/api/account/profile');
      if (profileRes.ok) {
        const data = await profileRes.json();
        if (
          (data?.isAdmin || data?.isTeamMember || data?.canAccessAdminPanel) &&
          (redirectUrl === '/account' || redirectUrl === '/admin')
        ) {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setInfoMessage('');

    try {
      // Pre-flight check: see if account has 2FA enabled
      const checkRes = await fetch('/api/auth/2fa/login-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      const checkData = await checkRes.json();
      if (!checkRes.ok) {
        throw new Error(checkData.error || 'Invalid email or password. Please verify your credentials.');
      }

      // If account requires 2FA, switch to OTP verification step
      if (checkData.requires2FA) {
        setIs2FAStep(true);
        setResendCooldown(120);
        setInfoMessage(t('auth.login.twoFactorSent', 'A 6-digit security code was sent to your email.'));
        showToast.info(t('auth.login.twoFactorSent', 'A 6-digit security code was sent to your email.'));
        setLoading(false);
        setTimeout(() => inputsRef.current[0]?.focus(), 100);
        return;
      }

      // Normal sign-in without 2FA
      await executeSignIn();
    } catch (err) {
      const errMsg = err?.message || 'Authentication failed. Please try again.';
      setError(errMsg);
      showToast.error(errMsg);
      setLoading(false);
    }
  };

  // 2FA Verification Handler
  const handleVerify2FA = async (codeToVerify) => {
    const code = codeToVerify || digits.join('');
    if (code.length !== 6) {
      setError(t('auth.verifyCode.codeLengthError', 'Please enter all 6 digits of the verification code.'));
      showToast.error(t('auth.verifyCode.codeLengthError', 'Please enter all 6 digits of the verification code.'));
      return;
    }

    setError('');
    setVerifying2FA(true);
    await executeSignIn(code);
  };

  const handleDigitChange = (index, value) => {
    const cleaned = value.replace(/\D/g, '');
    if (!cleaned) {
      const next = [...digits];
      next[index] = '';
      setDigits(next);
      return;
    }

    if (cleaned.length > 1) {
      handlePastedCode(cleaned);
      return;
    }

    const next = [...digits];
    next[index] = cleaned[0];
    setDigits(next);
    setError('');

    if (index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    if (next.join('').length === 6) {
      handleVerify2FA(next.join(''));
    }
  };

  const handlePastedCode = (raw) => {
    const cleaned = raw.replace(/\D/g, '').slice(0, 6);
    if (!cleaned) return;
    const next = [...digits];
    for (let i = 0; i < 6; i++) {
      if (cleaned[i]) next[i] = cleaned[i];
    }
    setDigits(next);
    setError('');
    const focusIdx = Math.min(cleaned.length, 5);
    inputsRef.current[focusIdx]?.focus();

    if (cleaned.length === 6) {
      handleVerify2FA(cleaned);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text');
    handlePastedCode(pasted);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleResend2FA = async () => {
    if (resendCooldown > 0 || resending) return;
    setError('');
    setResending(true);
    try {
      const res = await fetch('/api/auth/2fa/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to resend code.');
      setInfoMessage('A fresh 2FA security code has been sent to your email.');
      showToast.success('A fresh 2FA security code has been sent to your email.');
      setResendCooldown(120);
      setDigits(['', '', '', '', '', '']);
      setTimeout(() => inputsRef.current[0]?.focus(), 100);
    } catch (err) {
      const errMsg = err?.message || 'Failed to resend code.';
      setError(errMsg);
      showToast.error(errMsg);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden bg-slate-50 dark:bg-[#060b19] mt-12 sm:mt-6">
      {/* Ambient Glows across the entire page */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-violet-400/15 dark:bg-violet-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[500px] h-[500px] rounded-full bg-cyan-400/15 dark:bg-cyan-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-indigo-300/15 dark:bg-indigo-900/10 blur-[150px] pointer-events-none" />

      {/* ── Left Showcase Panel (Desktop) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-between p-12 xl:p-16">

        {/* Hero Narrative */}
        <div className="relative z-10 my-auto py-12 max-w-xl">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold bg-violet-100/90 dark:bg-violet-950/80 text-violet-800 dark:text-violet-300 border border-violet-200 dark:border-violet-800/80 font-exo-extralight uppercase tracking-widest shadow-xs mb-6">
            <FiShield className="text-violet-600 dark:text-violet-400" />
            <span>{t('auth.login.portalBadge', 'MerxoDev Security & Client Portal')}</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-extrabold font-exo-medium uppercase tracking-tight text-zinc-900 dark:text-white leading-[1.15] mb-6">
            {t('auth.login.heroTitleStart', 'Your Dedicated')}{' '}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 dark:from-violet-400 dark:via-indigo-300 dark:to-cyan-400 bg-clip-text text-transparent">
              {t('auth.login.heroTitleGradient', 'Client Portal')}
            </span>
          </h1>

          <p className="text-zinc-600 dark:text-zinc-400 text-base font-exo-extralight leading-relaxed mb-8">
            {t('auth.login.heroDesc', 'Access your active software blueprints, milestone updates, live staging links, and enterprise development deliverables in one unified dashboard.')}
          </p>

          {/* Themed Lottie Vector Animation */}
          <div className="mb-8 flex items-center justify-center">
            <AuthAnimation type="login" />
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800/80">
            {[
              { value: t('auth.login.metric1Value', '2FA'), label: t('auth.login.metric1Label', 'Security OTP'), color: 'from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400' },
              { value: t('auth.login.metric2Value', '100%'), label: t('auth.login.metric2Label', 'Cloud Access'), color: 'from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400' },
              { value: t('auth.login.metric3Value', '24/7'), label: t('auth.login.metric3Label', 'Live Monitoring'), color: 'from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-500' },
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
            <Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">{t('privacyPolicy', 'Privacy')}</Link>
            <Link href="/terms" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">{t('termsOfService', 'Terms')}</Link>
          </div>
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="w-full lg:w-1/2 relative z-10 flex items-center justify-center px-6 sm:px-12 py-16">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h2 className="font-exo-medium text-3xl sm:text-4xl uppercase tracking-wide text-[#27003B] dark:text-white mb-2">
              {is2FAStep ? t('auth.login.title2fa', 'Two-Factor Verification') : t('auth.login.title', 'Welcome Back')}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm font-exo-extralight">
              {is2FAStep
                ? t('auth.login.subtitle2fa', { email: formData.email, defaultValue: `Enter the 6-digit security code sent to ${formData.email}.` })
                : t('auth.login.subtitle', 'Sign in to manage your client projects and account.')}
            </p>
          </div>

          {/* Registration Success Banner */}
          {isRegistered && !error && !is2FAStep && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-exo-extralight flex items-center gap-3">
              <FiCheckCircle size={18} className="text-emerald-500 shrink-0" />
              <span>{t('auth.login.regSuccess', 'Account created successfully! Please sign in with your email and password.')}</span>
            </div>
          )}

          {/* Info Notice */}
          {infoMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/80 text-cyan-800 dark:text-cyan-300 text-xs sm:text-sm font-exo-extralight flex items-center gap-3">
              <FiShield size={18} className="text-cyan-500 shrink-0" />
              <span>{infoMessage}</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-exo-extralight flex items-center gap-3">
              <FiAlertCircle size={18} className="text-rose-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* ── Conditional View: Step 1 Password OR Step 2 2FA ── */}
          {is2FAStep ? (
            /* 2FA Verification Form */
            <div className="space-y-6 animate-fade-in">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-exo-extralight">
                    {t('auth.login.twoFactorLabel', '6-Digit Security Code')} <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-bold">
                    {t('auth.login.validMins', 'Valid 2 Mins')}
                  </span>
                </div>

                {/* 6 Square OTP Boxes */}
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
                      disabled={verifying2FA}
                      onChange={(e) => handleDigitChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`w-11 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-mono font-bold rounded-2xl border transition-all select-all ${digit
                        ? 'border-violet-500 dark:border-cyan-400 bg-violet-50/50 dark:bg-violet-950/30 text-violet-700 dark:text-white shadow-md shadow-violet-500/10'
                        : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 text-zinc-900 dark:text-white'
                        } focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 disabled:opacity-50`}
                    />
                  ))}
                </div>

                <p className="mt-2 text-center text-[11px] text-zinc-500 dark:text-zinc-400 font-exo-extralight">
                  {t('auth.login.twoFactorHint', 'Paste code or type 6 digits. Auto-verifies on 6th digit.')}
                </p>
              </div>

              {/* Verify & Sign In Button */}
              <button
                type="button"
                onClick={() => handleVerify2FA()}
                disabled={verifying2FA || digits.join('').length !== 6}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm uppercase tracking-wider font-exo-extralight shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all cursor-pointer"
              >
                {verifying2FA ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{t('auth.login.verifying', 'Verifying Code...')}</span>
                  </>
                ) : (
                  <>
                    <span>{t('auth.login.verifyBtn', 'Verify & Sign In')}</span>
                    <FiArrowRight size={17} />
                  </>
                )}
              </button>

              {/* Resend 2FA Code */}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between text-xs font-exo-extralight">
                <span className="text-zinc-500 dark:text-zinc-400">{t('auth.login.noCode', "Didn't receive 2FA code?")}</span>
                {resendCooldown > 0 ? (
                  <span className="text-zinc-400 dark:text-zinc-500 font-mono font-semibold">
                    {t('auth.login.resendIn', 'Resend in')} {Math.floor(resendCooldown / 60)}:{(resendCooldown % 60).toString().padStart(2, '0')}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend2FA}
                    disabled={resending}
                    className="inline-flex items-center gap-1.5 text-violet-600 dark:text-cyan-400 font-bold hover:underline cursor-pointer disabled:opacity-50"
                  >
                    <FiRotateCw size={13} className={resending ? 'animate-spin' : ''} />
                    <span>{resending ? t('auth.login.sending', 'Sending...') : t('auth.login.resendCode', 'Resend Code')}</span>
                  </button>
                )}
              </div>

              {/* Back to Password Step */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIs2FAStep(false);
                    setError('');
                    setInfoMessage('');
                    setDigits(['', '', '', '', '', '']);
                  }}
                  className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-cyan-400 font-exo-extralight transition-colors"
                >
                  {t('auth.login.backToLogin', '← Back to Email & Password')}
                </button>
              </div>
            </div>
          ) : (
            /* Regular Sign In Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-exo-extralight mb-1.5">
                  {t('auth.login.emailLabel', 'Email Address')}
                </label>
                <div className="relative">
                  <FiMail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="email"
                    required
                    placeholder={t('auth.login.emailPlaceholder', 'Enter Your Email')}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all font-exo-extralight"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-exo-extralight">
                    {t('auth.login.passwordLabel', 'Password')}
                  </label>
                  <Link
                    href="/account/forgot-password"
                    className="text-xs text-violet-600 dark:text-cyan-400 hover:underline font-exo-extralight"
                  >
                    {t('auth.login.forgotPassword', 'Forgot password?')}
                  </Link>
                </div>
                <div className="relative">
                  <FiLock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder={t('auth.login.passwordPlaceholder', 'Enter Your Password')}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-11 pr-11 py-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all font-exo-extralight"
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
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm uppercase tracking-wider font-exo-extralight shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 transition-all mt-2 cursor-pointer"
              >
                {loading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{t('auth.login.signInBtn', 'Sign In to Account')}</span>
                    <FiArrowRight size={17} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Register Prompt */}
          {!is2FAStep && (
            <div className="mt-8 text-center border-t border-zinc-200 dark:border-zinc-800/80 pt-6">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-exo-extralight">
                {t('auth.login.noAccount', "Don't have an account yet?")}{' '}
                <Link
                  href={`/account/register${redirectUrl !== '/account' ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`}
                  className="font-bold text-violet-600 dark:text-cyan-400 hover:underline"
                >
                  {t('auth.login.createAccount', 'Create Account')}
                </Link>
              </p>
            </div>
          )}

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <div
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 font-exo-extralight transition-colors"
            >
              <FiShield size={13} />
              <span>{t('auth.login.encryptedWorkspace', 'Encrypted & Protected Workspace')}</span>
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
