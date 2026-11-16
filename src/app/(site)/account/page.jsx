'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import '@/components/i18n';
import { showToast, confirmToast } from '@/lib/toast';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { downloadOfficialInvoice } from '@/lib/invoiceGenerator';
import {
  FiUser,
  FiMail,
  FiLock,
  FiEdit2,
  FiLogOut,
  FiShield,
  FiFolder,
  FiStar,
  FiSettings,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiArrowRight,
  FiPlus,
  FiX,
  FiExternalLink,
  FiCheck,
  FiChevronRight,
  FiBriefcase,
  FiCalendar,
  FiCamera,
  FiUploadCloud,
  FiTrash2,
} from 'react-icons/fi';

// ─── Edit Profile Modal ───────────────────────────────────────────────────────
function EditProfileModal({ user, onClose, onSave }) {
  const { t } = useTranslation();
  const [name, setName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  const [preview, setPreview] = useState(user?.image || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        // High quality client-side resize to max 400x400 for instant fast upload
        const canvas = document.createElement('canvas');
        const maxDim = 400;
        let w = img.width;
        let h = img.height;
        if (w > h) {
          if (w > maxDim) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          }
        } else {
          if (h > maxDim) {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const compressed = canvas.toDataURL('image/jpeg', 0.88);
        setPreview(compressed);
        setImage(compressed);
      };
      img.onerror = () => {
        // Fallback to direct base64
        setPreview(event.target.result);
        setImage(event.target.result);
      };
      img.src = event.target.result;
    };
    reader.onerror = () => {
      setError('Failed to read selected image.');
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setImage('');
    setPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name cannot be empty.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/account/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          image: image ? image : null,
        }),
      });

      const data = await res.json().catch(() => ({}));
      setLoading(false);

      if (!res.ok) {
        setError(data.error || 'Failed to update profile.');
        showToast.error(data.error || 'Failed to update profile.');
      } else {
        showToast.success('Profile updated successfully!');
        onSave(data.user);
        onClose();
      }
    } catch (err) {
      setLoading(false);
      setError(err?.message || 'Failed to connect to server.');
      showToast.error(err?.message || 'Failed to connect to server.');
    }
  };

  const userInitial = name?.trim() ? name.trim()[0].toUpperCase() : 'U';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1 rounded-full transition-colors cursor-pointer"
        >
          <FiX size={20} />
        </button>

        <h3 className="text-xl font-bold font-exo-extralight text-zinc-900 dark:text-white mb-1">
          {t('accountPage.modals.editProfileTitle', 'Edit Profile')}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight mb-6">
          {t('accountPage.modals.editProfileSubtitle', 'Update your public profile display name and avatar photo.')}
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-600 text-xs font-exo-extralight flex items-center gap-2">
            <FiAlertCircle size={15} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center justify-center gap-3 py-2">
            <div className="relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-3 border-violet-500/40 dark:border-cyan-500/40 shadow-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Avatar preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-exo-medium text-4xl font-bold text-white uppercase">
                    {userInitial}
                  </span>
                )}
              </div>

              {/* Click to change overlay */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 rounded-full bg-black/50 backdrop-blur-xs flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                title={t('accountPage.modals.changePhoto', 'Change Photo')}
              >
                <FiCamera size={22} />
                <span className="text-[10px] font-bold uppercase tracking-wider font-exo-extralight mt-1">
                  {t('accountPage.modals.changePhoto', 'Change')}
                </span>
              </button>
            </div>

            {/* Hidden native file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/jpg"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Action buttons under avatar */}
            <div className="flex items-center gap-2 mt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-violet-200 dark:border-violet-900/60 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-cyan-400 hover:bg-violet-100 dark:hover:bg-violet-900/60 text-xs font-bold font-exo-extralight transition-colors cursor-pointer"
              >
                <FiUploadCloud size={14} />
                <span>{preview ? t('accountPage.modals.changePhoto', 'Change Photo') : t('accountPage.modals.uploadPhoto', 'Upload Photo')}</span>
              </button>

              {preview && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-xs font-semibold font-exo-extralight transition-colors cursor-pointer"
                  title="Remove custom photo"
                >
                  <FiTrash2 size={13} />
                  <span>{t('accountPage.modals.remove', 'Remove')}</span>
                </button>
              )}
            </div>

            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-exo-extralight text-center">
              {t('accountPage.modals.photoHint', 'JPG, PNG, or WebP. Max 5MB.')}
            </p>
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-exo-extralight mb-1.5">
              {t('accountPage.modals.displayName', 'Display Name')}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('accountPage.modals.displayNamePlaceholder', 'Enter Your Name')}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 font-exo-extralight"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-bold font-exo-extralight uppercase text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-50"
            >
              {t('accountPage.modals.cancel', 'Cancel')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-bold font-exo-extralight uppercase shadow-md hover:scale-105 transition-all disabled:opacity-60 cursor-pointer flex items-center gap-2"
            >
              {loading && <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              <span>{loading ? t('accountPage.modals.saving', 'Saving Profile...') : t('accountPage.modals.save', 'Save Changes')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Change Password Modal ───────────────────────────────────────────────────
function ChangePasswordModal({ onClose }) {
  const { t } = useTranslation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/account/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json().catch(() => ({}));
      setLoading(false);

      if (!res.ok) {
        setError(data.error || 'Failed to update password.');
        showToast.error(data.error || 'Failed to update password.');
      } else {
        setSuccess(true);
        showToast.success('Password changed successfully!');
        setTimeout(() => onClose(), 1200);
      }
    } catch (err) {
      setLoading(false);
      setError(err?.message || 'Server error.');
      showToast.error(err?.message || 'Server connection error.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1 rounded-full transition-colors"
        >
          <FiX size={20} />
        </button>

        <h3 className="text-xl font-bold font-exo-extralight text-zinc-900 dark:text-white mb-1">
          {t('accountPage.modals.changePasswordTitle', 'Change Password')}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight mb-6">
          {t('accountPage.modals.changePasswordSubtitle', 'Ensure your account stays secure with a strong password.')}
        </p>

        {success ? (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm font-exo-extralight flex items-center gap-3">
            <FiCheckCircle size={18} className="text-emerald-500 shrink-0" />
            <span>Password updated successfully!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-600 text-xs font-exo-extralight">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-exo-extralight mb-1.5">
                {t('accountPage.modals.currentPassword', 'Current Password')}
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 font-exo-extralight"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-exo-extralight mb-1.5">
                {t('accountPage.modals.newPassword', 'New Password')}
              </label>
              <input
                type="password"
                required
                placeholder="Min 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 font-exo-extralight"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-exo-extralight mb-1.5">
                {t('accountPage.modals.confirmNewPassword', 'Confirm New Password')}
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 font-exo-extralight"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-bold font-exo-extralight uppercase text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                {t('accountPage.modals.cancel', 'Cancel')}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-bold font-exo-extralight uppercase shadow-md hover:scale-105 transition-all disabled:opacity-60 cursor-pointer"
              >
                {loading ? t('accountPage.modals.updatingPassword', 'Updating Password...') : t('accountPage.modals.updatePasswordBtn', 'Update Password')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Two-Factor Authentication Modal ─────────────────────────────────────────
function TwoFactorModal({ user, onClose, onSuccess }) {
  const { t } = useTranslation();
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(120);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const inputsRef = useRef([]);

  useEffect(() => {
    handleSendCode();
  }, []);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const handleSendCode = async () => {
    setError('');
    setSendingCode(true);
    try {
      const res = await fetch('/api/account/2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send-setup-code' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send verification code');
      setResendCooldown(120);
      setTimeout(() => inputsRef.current[0]?.focus(), 100);
    } catch (err) {
      setError(err?.message || 'Error sending code');
    } finally {
      setSendingCode(false);
    }
  };

  const handleVerify = async (codeToVerify) => {
    const code = codeToVerify || digits.join('');
    if (code.length !== 6) {
      setError('Please enter all 6 digits of the code.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/account/2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify-enable', code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid or expired code');
      setSuccess(t('accountPage.modals.twoFactorSuccessTitle', 'Two-Factor Authentication is now enabled!'));
      showToast.success(t('accountPage.modals.twoFactorSuccessTitle', 'Two-Factor Authentication is now enabled!'));
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 900);
    } catch (err) {
      setError(err?.message || 'Verification failed');
      showToast.error(err?.message || 'Verification failed');
      setLoading(false);
    }
  };

  const handleChange = (index, value) => {
    const cleaned = value.replace(/\D/g, '');
    if (!cleaned) {
      const next = [...digits];
      next[index] = '';
      setDigits(next);
      return;
    }
    if (cleaned.length > 1) {
      handlePasted(cleaned);
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
      handleVerify(next.join(''));
    }
  };

  const handlePasted = (raw) => {
    const cleaned = raw.replace(/\D/g, '').slice(0, 6);
    if (!cleaned) return;
    const next = [...digits];
    for (let i = 0; i < 6; i++) {
      if (cleaned[i]) next[i] = cleaned[i];
    }
    setDigits(next);
    setError('');
    const focusIndex = Math.min(cleaned.length, 5);
    inputsRef.current[focusIndex]?.focus();
    if (cleaned.length === 6) {
      handleVerify(cleaned);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text');
    handlePasted(pasted);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
        >
          <FiX size={20} />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-violet-500/10 text-violet-600 dark:text-cyan-400 flex items-center justify-center text-xl">
            <FiShield />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-exo-extralight">
              {t('accountPage.modals.enable2faTitle', 'Enable 2FA Protection')}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight">
              {t('accountPage.modals.enable2faSubtitle', 'Email-based Two-Factor Authentication')}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs font-exo-extralight flex items-center gap-2">
            <FiAlertCircle size={15} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-center space-y-3">
            <FiCheckCircle size={36} className="text-emerald-500 mx-auto" />
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white font-exo-extralight">
              {success}
            </h4>
            <p className="text-xs text-zinc-500 font-exo-extralight">
              {t('accountPage.modals.twoFactorSuccessDesc', 'Your account is now secured with two-factor authentication.')}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-zinc-600 dark:text-zinc-300 font-exo-extralight leading-relaxed">
              {t('accountPage.modals.twoFactorSentCode', 'We sent a 6-digit confirmation code to')}{' '}
              <strong className="text-zinc-900 dark:text-white font-mono">{user?.email}</strong>.
            </p>

            {/* 6 Square OTP Boxes */}
            <div className="flex items-center justify-between gap-2" onPaste={handlePaste}>
              {digits.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  disabled={loading}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className={`w-11 h-13 sm:w-13 sm:h-14 text-center text-xl font-mono font-bold rounded-xl border transition-all ${digit
                    ? 'border-violet-500 dark:border-cyan-400 bg-violet-50/50 dark:bg-violet-950/30 text-violet-700 dark:text-white'
                    : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white'
                    } focus:outline-none focus:ring-2 focus:ring-violet-500/50`}
                />
              ))}
            </div>

            <p className="text-[11px] text-zinc-400 text-center font-exo-extralight">
              {t('accountPage.modals.twoFactorInstruction', 'Paste or type 6 digits. Auto-verifies upon 6th digit.')}
            </p>

            <button
              type="button"
              onClick={() => handleVerify()}
              disabled={loading || digits.join('').length !== 6}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider font-exo-extralight shadow-md disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>{t('accountPage.modals.verifying', 'Verifying...')}</span>
                </>
              ) : (
                <>
                  <span>{t('accountPage.modals.activate2fa', 'Activate 2FA')}</span>
                  <FiCheck size={14} />
                </>
              )}
            </button>

            <div className="pt-2 flex items-center justify-between text-xs font-exo-extralight border-t border-zinc-100 dark:border-zinc-800">
              <span className="text-zinc-500">{t('accountPage.modals.noCode', "Didn't receive code?")}</span>
              {resendCooldown > 0 ? (
                <span className="text-zinc-400 font-mono">
                  {t('accountPage.modals.resendIn', 'Resend in')} {resendCooldown}s
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={sendingCode}
                  className="text-violet-600 dark:text-cyan-400 font-bold hover:underline cursor-pointer disabled:opacity-50"
                >
                  {sendingCode
                    ? t('accountPage.modals.sending', 'Sending...')
                    : t('accountPage.modals.resendCode', 'Resend Code')}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Account Component ──────────────────────────────────────────────────
function AccountContent() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status, update } = useSession();

  const activeTab = searchParams.get('tab') || 'profile';

  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTeamMember, setIsTeamMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inquiries, setInquiries] = useState([]);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [newInquiry, setNewInquiry] = useState({
    projectTitle: '',
    serviceType: 'Custom Web Application',
    budget: '',
    clientPhone: '',
    notes: '',
  });
  const [submittingInquiry, setSubmittingInquiry] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [twoFactorModalOpen, setTwoFactorModalOpen] = useState(false);
  const [disabling2FA, setDisabling2FA] = useState(false);

  // Handle disabling 2FA
  const handleDisable2FA = async () => {
    const confirmed = await confirmToast(
      'Are you sure you want to disable Two-Factor Authentication? Your account will be less secure.',
      {
        confirmText: 'Disable 2FA',
        cancelText: 'Keep Enabled',
        danger: true,
      }
    );
    if (!confirmed) return;

    setDisabling2FA(true);
    try {
      const res = await fetch('/api/account/2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'disable' }),
      });
      if (res.ok) {
        showToast.success('Two-Factor Authentication has been disabled.');
        setUserData((prev) => ({ ...(prev || {}), twoFactorEnabled: false }));
      } else {
        showToast.error('Failed to disable Two-Factor Authentication.');
      }
    } catch (err) {
      console.error(err);
      showToast.error('Network error disabling 2FA.');
    } finally {
      setDisabling2FA(false);
    }
  };

  // Fetch full user profile
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/account/login?redirect=/account');
      return;
    }

    if (status === 'authenticated') {
      fetch('/api/account/profile')
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.user) {
            setUserData(data.user);
            setIsAdmin(data.isAdmin || data.user.role === 'ADMIN');
            setIsTeamMember(data.isTeamMember || data.user.role === 'TEAM_MEMBER');
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));

      fetch('/api/account/inquiries')
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (Array.isArray(data?.inquiries)) {
            setInquiries(data.inquiries);
          }
        })
        .catch(() => {});
    }
  }, [status, router]);

  const handleSubmitInquiry = async (e) => {
    e.preventDefault();
    if (!newInquiry.projectTitle.trim()) return;
    setSubmittingInquiry(true);
    try {
      const res = await fetch('/api/account/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInquiry),
      });
      if (res.ok) {
        showToast.success('Project request submitted! Our team will update your tracker shortly.');
        setInquiryModalOpen(false);
        setNewInquiry({
          projectTitle: '',
          serviceType: 'Custom Web Application',
          budget: '',
          clientPhone: '',
          notes: '',
        });
        const refreshed = await fetch('/api/account/inquiries').then((r) => (r.ok ? r.json() : null));
        if (Array.isArray(refreshed?.inquiries)) setInquiries(refreshed.inquiries);
      } else {
        showToast.error('Failed to submit project request.');
      }
    } catch {
      showToast.error('Network error.');
    } finally {
      setSubmittingInquiry(false);
    }
  };

  const setTab = (tab) => {
    router.push(`/account?tab=${tab}`);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-violet-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-exo-extralight">
            {t('accountPage.loading', 'Loading Account...')}
          </span>
        </div>
      </div>
    );
  }

  const currentUser = userData || session?.user;
  const userInitials =
    currentUser?.name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'MD';

  const navTabs = [
    { id: 'profile', label: t('accountPage.tabs.profile', 'My Profile'), icon: FiUser },
    { id: 'inquiries', label: t('accountPage.tabs.inquiries', 'Project Inquiries'), icon: FiFolder },
    { id: 'reviews', label: t('accountPage.tabs.reviews', 'My Reviews'), icon: FiStar },
    { id: 'settings', label: t('accountPage.tabs.settings', 'Settings'), icon: FiSettings },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-zinc-50/60 dark:bg-[#060b19] no-gsap">
      <div className="max-w-[1440px] mx-auto">
        {/* Breadcrumb Navigation & Language Switcher */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider font-exo-extralight text-zinc-400 dark:text-zinc-500">
            <Link href="/" className="hover:text-violet-600 dark:hover:text-cyan-400 transition-colors">
              {t('navProfile.home', t('home', 'Home'))}
            </Link>
            <span>/</span>
            <span className="text-violet-600 dark:text-cyan-400">{t('accountPage.portalTitle', 'Account Portal')}</span>
          </nav>

          <div className="shrink-0">
            <LanguageSwitcher />
          </div>
        </div>

        {/* ── Top Hero User Profile Banner ── */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/80 backdrop-blur-xl p-6 sm:p-10 mb-8 shadow-sm">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-600/10 via-cyan-500/10 to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* Avatar with status indicator - Clickable to change photo */}
              <div
                onClick={() => setEditModalOpen(true)}
                className="relative group cursor-pointer"
                title={t('accountPage.changePhotoTitle', 'Click to change profile photo')}
              >
                {currentUser?.image ? (
                  <img
                    src={currentUser.image}
                    alt={currentUser.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-violet-500/30 shadow-md group-hover:opacity-90 transition-opacity"
                  />
                ) : (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white flex items-center justify-center font-exo-medium text-2xl sm:text-3xl font-bold shadow-md">
                    {userInitials}
                  </div>
                )}
                {/* Camera icon badge on hover */}
                <div className="absolute inset-0 rounded-2xl bg-black/40 backdrop-blur-xs flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <FiCamera size={22} />
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-zinc-900 rounded-full flex items-center justify-center z-10">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                  <h1
                    suppressHydrationWarning
                    className="font-exo-medium text-2xl sm:text-3xl uppercase tracking-wide text-zinc-900 dark:text-white"
                  >
                    {currentUser?.name || t('navProfile.valuedClient', 'Valued Client')}
                  </h1>
                  {isAdmin ? (
                    <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 font-exo-extralight flex items-center gap-1">
                      <FiShield size={11} /> {t('accountPage.adminBadge', 'Admin')}
                    </span>
                  ) : isTeamMember ? (
                    <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-exo-extralight flex items-center gap-1">
                      <FiShield size={11} /> {t('accountPage.teamMemberBadge', 'team-member')}
                    </span>
                  ) : (
                    <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 font-exo-extralight flex items-center gap-1">
                      <FiCheckCircle size={11} /> {t('accountPage.clientBadge', 'Client')}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-exo-extralight mb-1 flex items-center gap-2">
                  <FiMail size={14} />
                  <span>{currentUser?.email}</span>
                </p>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-exo-extralight flex items-center gap-1.5">
                  <FiCalendar size={12} />
                  <span>{t('accountPage.memberSince', 'Member since')} {new Date(currentUser?.createdAt || Date.now()).toLocaleDateString(i18n.language === 'bn' ? 'bn-BD' : 'en-US', { month: 'short', year: 'numeric' })}</span>
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => setEditModalOpen(true)}
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-bold font-exo-extralight uppercase text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700/80 transition-colors shadow-sm cursor-pointer"
              >
                <FiEdit2 size={13} />
                <span>{t('accountPage.editProfile', 'Edit Profile')}</span>
              </button>

              {(isAdmin || isTeamMember) && (
                <Link
                  href="/709832"
                  className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold font-exo-extralight uppercase shadow-md shadow-violet-600/25 hover:scale-105 transition-all"
                >
                  <FiShield size={14} />
                  <span>
                    {isTeamMember
                      ? t('navProfile.teamPanel', 'Team Workspace')
                      : t('navProfile.adminPanel', 'Admin Panel')}
                  </span>
                </Link>
              )}

              <button
                onClick={handleSignOut}
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 text-xs font-bold font-exo-extralight uppercase text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
              >
                <FiLogOut size={13} />
                <span>{t('navProfile.signOut', 'Sign Out')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Main Layout: Tabs Sidebar + Tab Content ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar Tabs (Desktop) / Horizontal Scroll (Mobile) */}
          <div className="lg:col-span-1 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none rounded-2xl bg-white dark:bg-zinc-900/60 p-3 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setTab(tab.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-xs sm:text-sm font-bold font-exo-extralight uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${isActive
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-md shadow-violet-600/20'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </div>
                  <FiChevronRight
                    size={14}
                    className={`hidden lg:block transition-transform ${isActive ? 'translate-x-0.5' : 'opacity-40'}`}
                  />
                </button>
              );
            })}

            {(isAdmin || isTeamMember) && (
              <div className="pt-2 mt-2 border-t border-zinc-100 dark:border-zinc-800 hidden lg:block">
                <Link
                  href="/709832"
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-xs font-bold font-exo-extralight uppercase tracking-wider text-violet-600 dark:text-cyan-400 hover:bg-violet-50 dark:hover:bg-violet-950/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FiShield size={16} />
                    <span>
                      {isTeamMember
                        ? t('accountPage.teamDashboard', 'Team Workspace')
                        : t('accountPage.adminDashboard', 'Admin Dashboard')}
                    </span>
                  </div>
                  <FiExternalLink size={14} />
                </Link>
              </div>
            )}
          </div>

          {/* ── Active Tab Content Area ── */}
          <div className="lg:col-span-3 space-y-6">
            {/* 1. Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-fade-in">
                {/* Personal Information Card */}
                <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/80 backdrop-blur-xl shadow-sm">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                    <div>
                      <h2 className="font-exo-medium text-xl uppercase tracking-wide text-zinc-900 dark:text-white">
                        {t('accountPage.profileTab.personalInfo', 'Personal Information')}
                      </h2>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight mt-0.5">
                        {t('accountPage.profileTab.personalInfoDesc', 'Your account contact details and credentials.')}
                      </p>
                    </div>
                    <button
                      onClick={() => setEditModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-bold font-exo-extralight text-violet-600 dark:text-cyan-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      <FiEdit2 size={12} />
                      <span>{t('accountPage.profileTab.edit', 'Edit')}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-exo-extralight mb-1">
                        {t('accountPage.profileTab.fullName', 'Full Name')}
                      </span>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white font-exo-extralight">
                        {currentUser?.name || 'N/A'}
                      </p>
                    </div>

                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-exo-extralight mb-1">
                        {t('accountPage.profileTab.emailAddress', 'Email Address')}
                      </span>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white font-exo-extralight">
                        {currentUser?.email || 'N/A'}
                      </p>
                    </div>

                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-exo-extralight mb-1">
                        {t('accountPage.profileTab.roleAccess', 'Role & Access Level')}
                      </span>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white font-exo-extralight">
                        {isAdmin ? t('accountPage.profileTab.masterAdmin', 'Master Administrator') : t('accountPage.profileTab.clientAccount', 'Standard Client Account')}
                      </p>
                    </div>

                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-exo-extralight mb-1">
                        {t('accountPage.profileTab.accountStatus', 'Account Status')}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 font-exo-extralight">
                        <FiCheckCircle size={14} /> {t('accountPage.profileTab.activeVerified', 'Active & Verified')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Security Card */}
                <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/80 backdrop-blur-xl shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="font-exo-medium text-xl uppercase tracking-wide text-zinc-900 dark:text-white">
                        {t('accountPage.profileTab.accountSecurity', 'Account Security')}
                      </h2>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight mt-0.5">
                        {t('accountPage.profileTab.securityDesc', 'Manage your password and security credentials.')}
                      </p>
                    </div>
                    <button
                      onClick={() => setPasswordModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800 text-xs font-bold font-exo-extralight text-violet-700 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-900/60 transition-colors cursor-pointer"
                    >
                      <FiLock size={12} />
                      <span>{t('accountPage.profileTab.changePassword', 'Change Password')}</span>
                    </button>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight leading-relaxed">
                    {t('accountPage.profileTab.securityNote', 'Your password is encrypted using production bcrypt salted hashing. We recommend updating your password every 90 days.')}
                  </p>
                </div>
              </div>
            )}

            {/* 2. Inquiries / Projects Tab */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6 animate-fade-in">
                <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/80 backdrop-blur-xl shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                    <div>
                      <h2 className="font-exo-medium text-xl uppercase tracking-wide text-zinc-900 dark:text-white">
                        {t('accountPage.inquiriesTab.title', 'Custom Project Blueprints')}
                      </h2>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight mt-0.5">
                        {t('accountPage.inquiriesTab.subtitle', 'Inquiries, scopes, and proposals submitted under your account.')}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setInquiryModalOpen(true)}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-bold font-exo-extralight uppercase shadow-md hover:scale-105 transition-all cursor-pointer"
                    >
                      <FiPlus size={14} />
                      <span>{t('accountPage.inquiriesTab.requestNew', 'Request New Project')}</span>
                    </button>
                  </div>

                  {/* Live Client Projects & Invoices List */}
                  <div className="space-y-5">
                    {(inquiries.length > 0
                      ? inquiries
                      : [
                          {
                            id: 'MD-8201',
                            projectTitle: t(
                              'accountPage.inquiriesTab.sampleTitle',
                              'High-Concurrency Next.js & PostgreSQL SaaS Portal'
                            ),
                            serviceType: t(
                              'accountPage.inquiriesTab.customApp',
                              'Custom Web Application'
                            ),
                            status: 'IN_PROGRESS',
                            progress: 65,
                            milestones: {
                              uiDesign: 100,
                              frontend: 80,
                              backend: 60,
                              deployment: 20,
                            },
                            invoiceAmount: '$1,200',
                            invoiceStatus: 'PARTIAL',
                            liveDemoUrl: '',
                            notes: t(
                              'accountPage.inquiriesTab.sampleDesc',
                              'Architectural roadmap & server blueprint prepared.'
                            ),
                          },
                        ]
                    ).map((proj) => (
                      <div
                        key={proj.id}
                        className="p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300">
                                {proj.serviceType}
                              </span>
                              <span className="text-xs text-zinc-400 font-mono">
                                • #{proj.id}
                              </span>
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                                  proj.invoiceStatus === 'PAID'
                                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                                    : proj.invoiceStatus === 'PARTIAL'
                                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                                      : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                                }`}
                              >
                                Invoice: {proj.invoiceStatus}
                                {proj.invoiceAmount ? ` (${proj.invoiceAmount})` : ''}
                              </span>
                            </div>
                            <h4 className="font-bold text-base text-zinc-900 dark:text-white font-exo-extralight">
                              {proj.projectTitle}
                            </h4>
                            {proj.notes && (
                              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight mt-0.5">
                                {proj.notes}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-3 self-start sm:self-center">
                            <button
                              type="button"
                              onClick={() => downloadOfficialInvoice(proj)}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30 hover:bg-orange-500/25 cursor-pointer"
                            >
                              <span>Invoice PDF</span>
                            </button>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/80 font-exo-extralight">
                              <FiCheckCircle size={13} /> {proj.status}
                            </span>
                            {proj.liveDemoUrl && (
                              <a
                                href={proj.liveDemoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-bold text-violet-600 dark:text-cyan-400 hover:underline font-exo-extralight"
                              >
                                <span>Live Demo</span>
                                <FiExternalLink size={12} />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Overall Progress Bar */}
                        <div>
                          <div className="flex justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                            <span>Overall Project Completion</span>
                            <span className="text-violet-600 dark:text-cyan-400">
                              {proj.progress ?? 0}%
                            </span>
                          </div>
                          <div className="h-2.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 transition-all duration-500"
                              style={{ width: `${proj.progress ?? 0}%` }}
                            />
                          </div>
                        </div>

                        {/* 5-Stage Visual Pipeline Stepper */}
                        <div className="pt-2">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-exo-extralight mb-3">
                            Production Pipeline & Milestones
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                            {[
                              { label: '1. Discovery & Scope', val: 100, done: true },
                              { label: '2. UI/UX Prototype', val: proj.milestones?.uiDesign ?? ((proj.progress ?? 0) > 25 ? 100 : 70), done: (proj.progress ?? 0) >= 30 },
                              { label: '3. Full-Stack Dev', val: proj.milestones?.frontend ?? ((proj.progress ?? 0) > 50 ? 80 : 40), done: (proj.progress ?? 0) >= 60 },
                              { label: '4. QA & Security', val: proj.milestones?.backend ?? ((proj.progress ?? 0) > 80 ? 90 : 20), done: (proj.progress ?? 0) >= 85 },
                              { label: '5. Launch & Deploy', val: proj.milestones?.deployment ?? ((proj.progress ?? 0) === 100 ? 100 : 10), done: (proj.progress ?? 0) === 100 },
                            ].map((step, idx) => (
                              <div
                                key={step.label}
                                className={`p-3 rounded-2xl border transition-all ${
                                  step.done
                                    ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                                    : (proj.progress ?? 0) >= (idx * 20)
                                      ? 'bg-violet-50/60 dark:bg-violet-950/30 border-violet-300 dark:border-violet-700 text-violet-900 dark:text-violet-200 shadow-sm'
                                      : 'bg-white dark:bg-zinc-900/60 border-zinc-200/80 dark:border-zinc-800 text-zinc-400'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-1 mb-1">
                                  <span className="text-[10px] font-mono font-bold">
                                    STEP 0{idx + 1}
                                  </span>
                                  {step.done ? (
                                    <FiCheckCircle size={13} className="text-emerald-500" />
                                  ) : (
                                    <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                                  )}
                                </div>
                                <div className="text-xs font-bold truncate">
                                  {step.label.slice(3)}
                                </div>
                                <div className="text-[11px] opacity-75 font-mono mt-0.5">
                                  {step.val}% Complete
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6 animate-fade-in">
                <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/80 backdrop-blur-xl shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                    <div>
                      <h2 className="font-exo-medium text-xl uppercase tracking-wide text-zinc-900 dark:text-white">
                        {t('accountPage.reviewsTab.title', 'My Reviews & Testimonials')}
                      </h2>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight mt-0.5">
                        {t('accountPage.reviewsTab.subtitle', 'Client feedback submitted for completed engineering projects.')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0">
                      <Link
                        href="/write-review"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-bold font-exo-extralight shadow-md hover:scale-105 transition-all"
                      >
                        <FiStar size={14} />
                        <span>{t('accountPage.reviewsTab.writeReview', 'Write a Review')}</span>
                      </Link>
                      <Link
                        href="/?scroll=testimonials"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold font-exo-extralight hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
                      >
                        <span>{t('accountPage.reviewsTab.viewShowcase', 'View Showcase')}</span>
                      </Link>
                    </div>
                  </div>

                  {userData?.reviews?.length > 0 ? (
                    <div className="space-y-4">
                      {userData.reviews.map((rev) => (
                        <div
                          key={rev.id}
                          className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1 text-amber-400">
                              {[...Array(rev.rating || 5)].map((_, i) => (
                                <FiStar key={i} size={14} className="fill-current" />
                              ))}
                            </div>
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${rev.isApproved
                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                                : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                                }`}
                            >
                              {rev.isApproved
                                ? t('accountPage.reviewsTab.published', 'Published on Site')
                                : t('accountPage.reviewsTab.inReview', 'In Review')}
                            </span>
                          </div>
                          <p className="text-sm text-zinc-700 dark:text-zinc-300 font-exo-extralight leading-relaxed italic">
                            "{rev.comment}"
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <FiStar size={36} className="mx-auto text-zinc-300 dark:text-zinc-700 mb-3" />
                      <h4 className="font-exo-medium text-lg text-zinc-800 dark:text-zinc-200 uppercase mb-1">
                        {t('accountPage.reviewsTab.emptyTitle', 'No Reviews Submitted Yet')}
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight max-w-sm mx-auto mb-4">
                        {t('accountPage.reviewsTab.emptyDesc', 'Completed a project with MerxoDev? Contact our engineering team to publish your verified client testimonial.')}
                      </p>
                      <Link
                        href="/contact?subject=Client%20Review%20Submission"
                        className="inline-flex items-center gap-2 text-xs font-bold text-violet-600 dark:text-cyan-400 hover:underline font-exo-extralight"
                      >
                        <span>{t('accountPage.reviewsTab.submitTestimonial', 'Submit Project Testimonial')}</span>
                        <FiArrowRight size={13} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 4. Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6 animate-fade-in">
                <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/80 backdrop-blur-xl shadow-sm">
                  <h2 className="font-exo-medium text-xl uppercase tracking-wide text-zinc-900 dark:text-white mb-1">
                    {t('accountPage.settingsTab.title', 'Platform Preferences')}
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight mb-6">
                    {t('accountPage.settingsTab.subtitle', 'Manage session preferences and communication alerts.')}
                  </p>

                  <div className="space-y-4">
                    {/* Language Preference */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800 gap-3">
                      <div>
                        <h4 className="text-sm font-bold font-exo-extralight text-zinc-900 dark:text-white">
                          {t('accountPage.settingsTab.languageTitle', 'Interface Language / ভাষা')}
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight">
                          {t('accountPage.settingsTab.languageDesc', 'Choose your preferred interface language across the platform.')}
                        </p>
                      </div>
                      <div className="shrink-0">
                        <LanguageSwitcher />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800">
                      <div>
                        <h4 className="text-sm font-bold font-exo-extralight text-zinc-900 dark:text-white">
                          {t('accountPage.settingsTab.notificationsTitle', 'Project Milestone Notifications')}
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight">
                          {t('accountPage.settingsTab.notificationsDesc', 'Receive email updates when blueprints or milestones are ready.')}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-exo-extralight">
                        {t('accountPage.settingsTab.enabled', 'Enabled')}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800 gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <h4 className="text-sm font-bold font-exo-extralight text-zinc-900 dark:text-white">
                            {t('accountPage.settingsTab.twoFactorTitle', 'Two-Factor Authentication (2FA)')}
                          </h4>
                          {userData?.twoFactorEnabled ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold font-exo-extralight uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/80">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              {t('accountPage.settingsTab.active', 'Active')}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-exo-extralight uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                              {t('accountPage.settingsTab.inactive', 'Inactive')}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight">
                          {userData?.twoFactorEnabled
                            ? t('accountPage.settingsTab.twoFactorActiveDesc', 'Every login requires a 6-digit OTP code sent to your email.')
                            : t('accountPage.settingsTab.twoFactorInactiveDesc', 'Require a 6-digit email code upon every login for enhanced security.')}
                        </p>
                      </div>

                      <div>
                        {userData?.twoFactorEnabled ? (
                          <button
                            type="button"
                            onClick={handleDisable2FA}
                            disabled={disabling2FA}
                            className="px-4 py-2 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-bold font-exo-extralight uppercase transition-all cursor-pointer disabled:opacity-50"
                          >
                            {disabling2FA ? 'Disabling...' : t('accountPage.settingsTab.disable2fa', 'Disable 2FA')}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setTwoFactorModalOpen(true)}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-xs font-bold font-exo-extralight uppercase shadow-md hover:scale-105 transition-all cursor-pointer"
                          >
                            {t('accountPage.settingsTab.enable2fa', 'Enable 2FA')}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-bold font-exo-extralight text-rose-600 dark:text-rose-400">
                        {t('accountPage.settingsTab.signOutAllTitle', 'Sign Out Everywhere')}
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight">
                        {t('accountPage.settingsTab.signOutAllDesc', 'Invalidate this session and return to homepage.')}
                      </p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="px-5 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold font-exo-extralight uppercase transition-colors cursor-pointer"
                    >
                      {t('navProfile.signOut', 'Sign Out')}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {editModalOpen && (
        <EditProfileModal
          user={currentUser}
          onClose={() => setEditModalOpen(false)}
          onSave={(updated) => {
            if (updated) {
              setUserData((prev) => ({ ...(prev || {}), ...updated }));
              if (typeof update === 'function') {
                update({
                  name: updated.name,
                  image: updated.image,
                });
              }
            }
          }}
        />
      )}

      {passwordModalOpen && (
        <ChangePasswordModal onClose={() => setPasswordModalOpen(false)} />
      )}

      {twoFactorModalOpen && (
        <TwoFactorModal
          user={currentUser}
          onClose={() => setTwoFactorModalOpen(false)}
          onSuccess={() => {
            setUserData((prev) => ({ ...(prev || {}), twoFactorEnabled: true }));
          }}
        />
      )}

      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-exo-medium text-xl uppercase text-zinc-900 dark:text-white">
                Request New Project Blueprint
              </h3>
              <button
                type="button"
                onClick={() => setInquiryModalOpen(false)}
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-white cursor-pointer"
              >
                <FiX size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmitInquiry} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-500 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={newInquiry.projectTitle}
                  onChange={(e) => setNewInquiry({ ...newInquiry, projectTitle: e.target.value })}
                  placeholder="e.g. Custom E-Commerce & Mobile App"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-500 mb-1">
                    Service Category
                  </label>
                  <select
                    value={newInquiry.serviceType}
                    onChange={(e) => setNewInquiry({ ...newInquiry, serviceType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white"
                  >
                    <option value="Custom Web Application">Custom Web Application</option>
                    <option value="E-Commerce Platform">E-Commerce Platform</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="AI & SaaS Integration">AI & SaaS Integration</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-500 mb-1">
                    WhatsApp / Phone
                  </label>
                  <input
                    type="text"
                    value={newInquiry.clientPhone}
                    onChange={(e) => setNewInquiry({ ...newInquiry, clientPhone: e.target.value })}
                    placeholder="+8801..."
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-500 mb-1">
                  Project Requirements / Notes
                </label>
                <textarea
                  rows={3}
                  value={newInquiry.notes}
                  onChange={(e) => setNewInquiry({ ...newInquiry, notes: e.target.value })}
                  placeholder="Briefly describe your goals, timeline, or features..."
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setInquiryModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-600 dark:text-zinc-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingInquiry}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-bold uppercase shadow-md cursor-pointer"
                >
                  {submittingInquiry ? 'Submitting...' : 'Submit Project Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center pt-20">
          <span className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AccountContent />
    </Suspense>
  );
}
