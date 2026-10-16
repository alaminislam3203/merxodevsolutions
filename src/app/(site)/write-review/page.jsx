'use client';

import { useState, useEffect, useContext, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SessionContext } from 'next-auth/react';
import {
  FiStar,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiUser,
  FiBriefcase,
  FiMapPin,
  FiTag,
  FiMessageSquare,
  FiArrowLeft,
  FiLogIn,
  FiUserPlus,
  FiShield,
  FiLayers,
  FiHelpCircle,
} from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { BsStars, BsShieldCheck } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const SERVICE_CATEGORIES = [
  'Custom Website Development (Next.js & React)',
  'Web Application & SaaS Platform',
  'E-Commerce & Marketplace Development',
  'UI/UX Design & Brand Prototyping',
  'Mobile Application Development (iOS & Android)',
  'Full-Stack Custom Software Development',
  'API Integration & Backend Architecture',
  'Database Architecture & Performance Optimization',
  'Payment Gateway Integration (bKash/Nagad/Stripe)',
  'SEO & Digital Growth Marketing',
  'Cybersecurity, OAuth & Auth Systems',
  'Website Maintenance & 24/7 Cloud Support',
  'Business Process & Workflow Automation',
  'Others',
];

const RATING_LABELS = {
  5: 'Exceptional (5.0 / 5.0) – Exceeded all expectations',
  4: 'Very Good (4.0 / 5.0) – High quality delivery',
  3: 'Satisfactory (3.0 / 5.0) – Met core requirements',
  2: 'Fair (2.0 / 5.0) – Room for improvement',
  1: 'Poor (1.0 / 5.0) – Did not meet standards',
};

function WriteReviewContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const sessionContext = useContext(SessionContext);
  const session = sessionContext?.data;
  const status = sessionContext?.status || 'loading';

  // Form states
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [tag, setTag] = useState(SERVICE_CATEGORIES[0]);
  const [customTag, setCustomTag] = useState('');
  const [userRole, setUserRole] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [comment, setComment] = useState('');

  // UI states
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tag === 'Others' && !customTag.trim()) {
      const msg = t('writeReviewPage.validationCategory', 'Please specify your custom service category.');
      setError(msg);
      toast.error(msg);
      return;
    }

    if (!comment.trim() || comment.trim().length < 5) {
      const msg = t('writeReviewPage.validationComment', 'Please provide a meaningful review comment of at least 5 characters.');
      setError(msg);
      toast.error(msg);
      return;
    }

    setSubmitting(true);
    setError('');

    const finalTag = tag === 'Others' ? customTag.trim() : tag;

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          userRole: userRole.trim() || 'Client',
          company: company.trim(),
          location: location.trim() || 'Bangladesh',
          tag: finalTag,
          comment: comment.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errMsg = data.error || 'Failed to submit review. Please try again.';
        setError(errMsg);
        toast.error(errMsg);
        setSubmitting(false);
      } else {
        setSubmitting(false);
        setIsSuccess(true);
        toast.success(t('writeReviewPage.successToast', 'Review submitted successfully for review!'));
      }
    } catch (err) {
      setSubmitting(false);
      const errMsg = err?.message || 'Network error. Please try again.';
      setError(errMsg);
      toast.error(errMsg);
    }
  };

  const activeStarCount = hoverRating || rating;

  return (
    <div className="no-gsap min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Ambience & Lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-violet-600/15 via-indigo-600/10 to-cyan-500/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-20 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/?scroll=testimonials"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-violet-600 dark:text-zinc-400 dark:hover:text-cyan-400 transition-colors"
          >
            <FiArrowLeft size={14} />
            <span>{t('writeReviewPage.backToTestimonials', 'Back to Testimonials')}</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100/80 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800/80 text-violet-700 dark:text-violet-300 text-[11px] font-bold">
            <BsStars className="text-violet-600 dark:text-cyan-400" />
            <span>{t('writeReviewPage.verifiedBadge', 'Verified Client Review')}</span>
          </div>
        </div>

        {/* Page Heading */}
        <div className="text-center mb-8">
          <h1
            suppressHydrationWarning
            className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight"
          >
            {t('writeReviewPage.headingStart', 'Share Your Experience with')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500">
              {t('writeReviewPage.headingHighlight', 'MerxoDev Solutions')}
            </span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            {t('writeReviewPage.subheading', 'Your genuine feedback empowers our team to keep building world-class digital products and helps other businesses make informed decisions.')}
          </p>
        </div>

        {/* ─── SCENARIO A: Review Submitted Successfully ─── */}
        {!mounted ? (
          <div className="p-12 rounded-3xl bg-white/90 dark:bg-[#0c1328]/90 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl text-center space-y-4">
            <div className="w-8 h-8 mx-auto border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              {t('writeReviewPage.loadingWorkspace', 'Loading review workspace...')}
            </p>
          </div>
        ) : isSuccess ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-white/90 dark:bg-[#0c1328]/90 backdrop-blur-2xl border border-emerald-500/30 shadow-2xl text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-500 flex items-center justify-center text-4xl shadow-inner">
              <FiCheckCircle />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h2
                suppressHydrationWarning
                className="text-2xl font-bold text-zinc-900 dark:text-white"
              >
                {t('writeReviewPage.thankYouTitle', 'Thank You for Your Feedback!')}
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t('writeReviewPage.thankYouDesc', 'Your client review has been recorded successfully. To maintain platform integrity, all testimonials undergo a brief review and will appear live on our homepage shortly.')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-md mx-auto">
              <Link
                href="/?scroll=testimonials"
                className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-violet-500/20 hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
              >
                <span>{t('writeReviewPage.viewTestimonialsBtn', 'View Homepage Testimonials')}</span>
              </Link>
              <Link
                href="/account"
                className="flex-1 py-3 px-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-bold text-xs sm:text-sm hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
              >
                <span>{t('writeReviewPage.myAccountBtn', 'My Client Account')}</span>
              </Link>
            </div>
          </div>
        ) : !session?.user ? (
          /* ─── SCENARIO B: User is NOT Logged In ─── */
          <div className="p-8 sm:p-12 rounded-3xl bg-white/90 dark:bg-[#0c1328]/90 backdrop-blur-2xl border border-violet-200/80 dark:border-blue-900/40 shadow-2xl text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-violet-600/15 via-indigo-600/15 to-cyan-500/15 border border-violet-500/30 text-violet-600 dark:text-cyan-400 flex items-center justify-center text-3xl shadow-inner">
              <FiShield />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h2
                suppressHydrationWarning
                className="text-2xl font-bold text-zinc-900 dark:text-white"
              >
                {t('writeReviewPage.signInTitle', 'Sign In to Leave a Client Review')}
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t('writeReviewPage.signInDesc', 'To prevent spam and ensure all reviews come from verified clients, you must be logged in to submit a testimonial.')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-md mx-auto">
              <Link
                href="/account/login?redirect=/write-review"
                className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-violet-500/25 hover:shadow-cyan-500/35 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <FiLogIn size={16} />
                <span>{t('writeReviewPage.loginBtn', 'Log In to Account')}</span>
              </Link>
              <Link
                href="/account/register?redirect=/write-review"
                className="flex-1 py-3.5 px-6 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 bg-zinc-100/80 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs sm:text-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <FiUserPlus size={16} />
                <span>{t('writeReviewPage.createAccountBtn', 'Create New Account')}</span>
              </Link>
            </div>

            <div className="pt-4 flex items-center justify-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <BsShieldCheck className="text-emerald-500" />
              <span>{t('writeReviewPage.quickNote', 'Takes 30 seconds • Automatic return here after sign in')}</span>
            </div>
          </div>
        ) : (

          /* ─── SCENARIO C: User is Logged In -> Full Review Form ─── */
          <div className="p-6 sm:p-10">
            {/* Authenticated Client Card Banner */}
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-gradient-to-r from-violet-500/10 via-indigo-500/10 to-cyan-500/10 border border-violet-500/20 mb-8">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || 'Client'}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-violet-400/60 shadow-md shrink-0"
                />
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">
                  {(session.user.name || 'C').charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                    {session.user.name || t('navProfile.valuedClient', 'Valued Client')}
                  </p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                    {t('writeReviewPage.verifiedUser', 'Verified')}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                  {session.user.email}
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2.5">
                <FiAlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star Rating Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                  {t('writeReviewPage.ratingLabel', 'Overall Experience Rating')} <span className="text-rose-500">*</span>
                </label>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-2xl sm:text-3xl transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                        aria-label={`${star} Stars`}
                      >
                        <FaStar
                          className={`${star <= activeStarCount
                            ? 'text-amber-400 drop-shadow-md'
                            : 'text-zinc-300 dark:text-zinc-700'
                            } transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-amber-500 dark:text-amber-400 font-mono">
                    {RATING_LABELS[activeStarCount] || `${activeStarCount} / 5 Stars`}
                  </span>
                </div>
              </div>

              {/* Service Category Dropdown (All 13 Comprehensive Services + Others) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                  {t('writeReviewPage.serviceCategoryLabel', 'Service Category')} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="w-full p-3.5 pr-10 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all cursor-pointer"
                  >
                    {SERVICE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-white dark:bg-zinc-900 py-1">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {t('writeReviewPage.serviceCategoryHint', 'Select the primary technical service MerxoDev Solutions delivered for your project.')}
                </p>

                {/* Dynamic input field when 'Others' is selected */}
                {tag === 'Others' && (
                  <div className="pt-2 space-y-1.5 transition-all duration-200">
                    <label className="block text-xs font-bold text-violet-600 dark:text-cyan-400 uppercase tracking-wider">
                      {t('writeReviewPage.customCategoryLabel', 'Specify Custom Service Category')} <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <FiTag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={15} />
                      <input
                        type="text"
                        required
                        value={customTag}
                        onChange={(e) => setCustomTag(e.target.value)}
                        placeholder={t('writeReviewPage.customCategoryPlaceholder', 'e.g. AI Workflow Integration, DevOps Cloud Architecture, etc.')}
                        className="w-full pl-10 p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-violet-300 dark:border-violet-700/60 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all shadow-sm"
                      />
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      {t('writeReviewPage.customCategoryHint', 'Type the exact name or type of service provided.')}
                    </p>
                  </div>
                )}
              </div>

              {/* Client Role & Company Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                    {t('writeReviewPage.roleLabel', 'Your Role / Title')}
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={15} />
                    <input
                      type="text"
                      value={userRole}
                      onChange={(e) => setUserRole(e.target.value)}
                      placeholder={t('writeReviewPage.rolePlaceholder', 'e.g. Founder & CEO, Product Manager')}
                      className="w-full pl-10 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                    {t('writeReviewPage.companyLabel', 'Company / Organization')}
                  </label>
                  <div className="relative">
                    <FiBriefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={15} />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={t('writeReviewPage.companyPlaceholder', 'e.g. Apex Innovations Ltd')}
                      className="w-full pl-10 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Location Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                  {t('writeReviewPage.locationLabel', 'Location / City')}
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={15} />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={t('writeReviewPage.locationPlaceholder', 'e.g. Dhaka, Bangladesh or London, UK')}
                    className="w-full pl-10 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all"
                  />
                </div>
              </div>

              {/* Detailed Review Comment */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                    {t('writeReviewPage.reviewLabel', 'Your Review & Experience')} <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] font-mono text-zinc-400">
                    {comment.length} / 1000 chars
                  </span>
                </div>
                <textarea
                  required
                  rows={5}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  maxLength={1000}
                  placeholder={t('writeReviewPage.commentPlaceholder', 'Tell us about the project: how did MerxoDev Solutions help solve your problems, speed up your business, or deliver your vision? What stood out in communication, performance, or design quality?')}
                  className="w-full p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 resize-none transition-all"
                />
              </div>

              {/* Submit Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting || comment.trim().length < 5 || (tag === 'Others' && !customTag.trim())}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-violet-500/25 hover:shadow-cyan-500/30 hover:scale-[1.01] active:scale-98 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>{t('writeReviewPage.submittingBtn', 'Submitting Review...')}</span>
                    </>
                  ) : (
                    <>
                      <FiSend size={16} />
                      <span>{t('writeReviewPage.submitBtn', 'Submit Client Review For Approval')}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-2 text-center text-[11px] text-zinc-400 dark:text-zinc-500">
                <span>{t('writeReviewPage.legalConfirm', 'By submitting, you confirm this review represents your genuine experience working with MerxoDev Solutions.')}</span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

export default function WriteReviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-zinc-400">Loading...</div>}>
      <WriteReviewContent />
    </Suspense>
  );
}
