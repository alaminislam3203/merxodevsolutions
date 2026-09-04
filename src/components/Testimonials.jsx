'use client';

import { useTranslation } from 'react-i18next';
import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useSession, signIn } from 'next-auth/react';
import { 
  FaStar, 
  FaQuoteLeft, 
  FaCheckCircle, 
  FaArrowLeft, 
  FaArrowRight, 
  FaPenNib,
  FaTimes,
  FaUserCircle,
  FaLock,
  FaEnvelope,
  FaBuilding,
  FaMapMarkerAlt,
  FaTag
} from 'react-icons/fa';
import { BsStars, BsShieldCheck } from 'react-icons/bs';
import '@/components/i18n';

const FALLBACK_REVIEWS = [
  {
    id: 'f1',
    userName: 'Rakibul Islam',
    userRole: 'CEO & Founder',
    company: 'TechStart BD',
    location: 'Dhaka, Bangladesh',
    rating: 5,
    tag: 'E-Commerce Platform',
    comment:
      'MerxoDev delivered our full-scale e-commerce platform 5 days ahead of schedule! The Next.js code quality was pristine, SEO was spot on, and the team was available 24/7. Highly recommended for any serious business.',
  },
  {
    id: 'f2',
    userName: 'Sarah Johnson',
    userRole: 'Product Director',
    company: 'GrowthLab Digital',
    location: 'London, UK',
    rating: 5,
    tag: 'SaaS Web Application',
    comment:
      'Working with the MerxoDev Solutions engineering team was an absolute delight. They grasped our complex dashboard requirements effortlessly and executed pixel-perfect responsive designs.',
  },
  {
    id: 'f3',
    userName: 'Tanvir Ahmed',
    userRole: 'CTO & Co-Founder',
    company: 'ShopEasy Online',
    location: 'Chittagong, BD',
    rating: 5,
    tag: 'Custom ERP & POS',
    comment:
      'Hands down the most talented developer team we have hired. Clean architecture, zero spaghetti code, high security, and prompt post-launch maintenance. We are already planning our next project with them!',
  },
  {
    id: 'f4',
    userName: 'David Miller',
    userRole: 'Head of Engineering',
    company: 'CloudCore Inc',
    location: 'California, USA',
    rating: 5,
    tag: 'API & Cloud Systems',
    comment:
      'Superb communication and technical expertise. They integrated our microservices with PostgreSQL and Next.js seamlessly. The performance scores jumped to 98+ on Google Lighthouse!',
  },
  {
    id: 'f5',
    userName: 'Anisur Rahman',
    userRole: 'Managing Director',
    company: 'EduLearn Academy',
    location: 'Rajshahi, BD',
    rating: 5,
    tag: 'EdTech Portal',
    comment:
      'From custom payment gateway (bKash/Nagad/SSLCommerz) to student video portals, everything was delivered with top-notch craftsmanship. Their pricing is transparent with zero hidden fees.',
  },
  {
    id: 'f6',
    userName: 'Elena Rostova',
    userRole: 'Creative Director',
    company: 'NovaBrand Studio',
    location: 'Dubai, UAE',
    rating: 5,
    tag: 'UI/UX & Portfolio',
    comment:
      'The GSAP animations and sleek dark mode theme they crafted blew our international clients away. Truly state-of-the-art web design that converts visitors into enterprise contracts!',
  },
];

const AVATAR_GRADIENTS = [
  'from-violet-600 to-indigo-600',
  'from-fuchsia-600 to-pink-600',
  'from-cyan-500 to-blue-600',
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-teal-600',
  'from-purple-600 to-rose-600',
  'from-blue-600 to-violet-600',
  'from-indigo-600 to-cyan-500',
];

export default function Testimonials() {
  const { t } = useTranslation();
  const { data: session } = useSession();

  const [reviews, setReviews] = useState(FALLBACK_REVIEWS);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Auth Inputs
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  // Review Form Inputs
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [userRole, setUserRole] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [tag, setTag] = useState('Web Development');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Fetch approved reviews from API
  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      if (data.reviews && data.reviews.length > 0) {
        setReviews(data.reviews);
      }
    } catch (err) {
      console.error('Error fetching testimonials:', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
      breakpoints: {
        '(min-width: 640px)': { slidesToScroll: 1 },
        '(min-width: 1024px)': { slidesToScroll: 1 },
      },
    },
    [Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect, reviews]);

  const handleOpenReviewModal = () => {
    setSubmitSuccess(false);
    setSubmitError('');
    setAuthError('');
    setShowModal(true);
  };

  // User Login inside Review Modal
  const handleAuthLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      const res = await signIn('credentials', {
        email: authEmail.trim(),
        password: authPassword,
        redirect: false,
      });
      if (res?.error) {
        setAuthError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setAuthError('Login failed. Please check your credentials.');
    } finally {
      setAuthLoading(false);
    }
  };

  // User Register inside Review Modal
  const handleAuthRegister = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: authName.trim(),
          email: authEmail.trim(),
          password: authPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || 'Failed to register account.');
        setAuthLoading(false);
        return;
      }
      // Auto login after registration
      await signIn('credentials', {
        email: authEmail.trim(),
        password: authPassword,
        redirect: false,
      });
    } catch (err) {
      setAuthError('Registration error. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Submit Review (Waiting for Admin Approval)
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          userRole,
          company,
          location,
          tag,
          comment,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || 'Failed to submit review.');
      } else {
        setSubmitSuccess(true);
        setComment('');
        setUserRole('');
        setCompany('');
      }
    } catch (err) {
      setSubmitError('Failed to submit review. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      aria-labelledby="testimonials-heading"
      itemScope
      itemType="https://schema.org/ItemList"
      className="relative py-10 sm:py-14 overflow-hidden font-raleway"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center gap-3 mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 uppercase tracking-widest shadow-sm">
            <BsStars className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            Verified Client Feedback
          </span>

          <h2
            id="testimonials-heading"
            className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase tracking-wide text-[#27003B] dark:text-white"
          >
            What Clients Say{' '}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent animated-gradient-text">
              About Our Work
            </span>
          </h2>

          <p className="max-w-xl text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            Read authentic reviews from founders, startups, and companies that
            scaled their digital presence with MerxoDev Solutions.
          </p>

          {/* Interactive "Write a Review" Action Button */}
          <div className="mt-2">
            <button
              onClick={handleOpenReviewModal}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20"
            >
              <FaPenNib className="text-amber-300 text-xs" />
              <span>Share Your Feedback & Review</span>
            </button>
          </div>
        </div>

        {/* ── Carousel Container (Embla Auto-Swipe) ── */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4 sm:-ml-6 touch-pan-y">
              {reviews.map((item, i) => {
                const gradient = AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length];
                return (
                  <div
                    key={item.id || i}
                    className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4 sm:pl-6"
                  >
                    <article
                      itemProp="itemListElement"
                      itemScope
                      itemType="https://schema.org/Review"
                      className="h-full flex flex-col justify-between p-7 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-xl card-hover-lift hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-300 relative group"
                    >
                      {/* Top Row: Tag & Verified Badge */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-violet-100/70 dark:bg-violet-950/70 text-violet-700 dark:text-violet-300 border border-violet-200/60 dark:border-violet-800/60">
                          {item.tag || 'Client Feedback'}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          <FaCheckCircle size={12} />
                          <span>Verified</span>
                        </div>
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: item.rating || 5 }).map((_, starIdx) => (
                          <FaStar key={starIdx} size={14} className="text-amber-400 drop-shadow-sm" />
                        ))}
                      </div>

                      {/* Quote Icon & Review Text */}
                      <div className="relative flex-1 mb-6">
                        <FaQuoteLeft
                          size={28}
                          className="text-violet-200 dark:text-violet-900/60 absolute -top-2 -left-1 opacity-40 pointer-events-none"
                        />
                        <p
                          className="relative z-10 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed italic"
                          itemProp="reviewBody"
                        >
                          "{item.comment}"
                        </p>
                      </div>

                      {/* Client Profile Footer */}
                      <div
                        className="flex items-center gap-3.5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80"
                        itemProp="author"
                        itemScope
                        itemType="https://schema.org/Person"
                      >
                        <div
                          aria-hidden
                          className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-display text-base font-black shadow-md shadow-violet-500/20 shrink-0 group-hover:scale-105 transition-transform`}
                        >
                          {(item.userName || 'C').charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <p
                            className="text-sm font-bold text-zinc-900 dark:text-white truncate"
                            itemProp="name"
                          >
                            {item.userName}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                            {item.userRole || 'Client'} {item.company ? `• ${item.company}` : ''}
                          </p>
                          {item.location && (
                            <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
                              📍 {item.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrows (Desktop & Mobile) */}
          <div className="flex items-center justify-between sm:justify-end gap-3 mt-8">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Previous review"
                className="w-11 h-11 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-white hover:bg-violet-600 hover:border-violet-600 flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
              >
                <FaArrowLeft size={14} />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Next review"
                className="w-11 h-11 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-white hover:bg-violet-600 hover:border-violet-600 flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
              >
                <FaArrowRight size={14} />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {scrollSnaps.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => scrollTo(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    selectedIndex === dotIdx
                      ? 'w-6 bg-gradient-to-r from-violet-600 to-cyan-500'
                      : 'w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-violet-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── User Review Submission / Auth Modal ─── */}
      {showModal && (
        <div className="fixed inset-0 z-[999] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#091124] rounded-3xl p-6 sm:p-7 border border-violet-200/80 dark:border-blue-900/60 shadow-2xl shadow-blue-950/40 space-y-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-cyan-400 flex items-center justify-center shadow-xs">
                  <FaPenNib size={14} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-zinc-900 dark:text-white">
                    {session ? 'Write a Client Review' : 'Login to Leave Review'}
                  </h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    {session ? 'Your feedback will be published after admin verification' : 'Please authenticate to submit your review'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white p-1 rounded-lg"
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* SCENARIO A: User is logged in -> Show Review Form */}
            {session ? (
              submitSuccess ? (
                <div className="py-6 text-center space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-2xl shadow-md animate-bounce">
                    <FaCheckCircle />
                  </div>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white">
                    Thank You, {session.user?.name || 'Client'}!
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 max-w-xs mx-auto leading-relaxed">
                    Your review has been submitted successfully! Our engineering admin team will verify and approve it shortly.
                  </p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="mt-3 px-6 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-bold shadow-md hover:opacity-95"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-3.5 text-xs sm:text-sm">
                  {/* Logged in User Bar */}
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900/50">
                    <FaUserCircle className="text-violet-600 dark:text-cyan-400 text-lg shrink-0" />
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-bold text-zinc-900 dark:text-white truncate">
                        Posting as: {session.user?.name}
                      </p>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                        {session.user?.email}
                      </p>
                    </div>
                    <BsShieldCheck className="text-emerald-500 text-base shrink-0" title="Verified Account" />
                  </div>

                  {/* 5-Star Interactive Rating Picker */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Your Rating (Stars) *
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                        >
                          <FaStar
                            size={22}
                            className={`${
                              star <= (hoverRating || rating)
                                ? 'text-amber-400 drop-shadow-md'
                                : 'text-zinc-300 dark:text-zinc-700'
                            } transition-colors`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-amber-500 ml-1">
                        {rating} / 5 Stars
                      </span>
                    </div>
                  </div>

                  {/* Role & Company Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                        Your Role / Position
                      </label>
                      <input
                        type="text"
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value)}
                        placeholder="e.g. Founder, Manager"
                        className="w-full p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                        Company / Business
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Tech BD Ltd"
                        className="w-full p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                  </div>

                  {/* Tag & Location Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                        Service Category
                      </label>
                      <select
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        className="w-full p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        <option value="Web Development">Web Development</option>
                        <option value="E-Commerce Solutions">E-Commerce Solutions</option>
                        <option value="SaaS Web Application">SaaS Web Application</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Payment Gateway">Payment Gateway</option>
                        <option value="SEO & Growth">SEO & Growth</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                        Location / City
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Dhaka, Bangladesh"
                        className="w-full p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                  </div>

                  {/* Comment Textarea */}
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                      Your Feedback / Review *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your experience working with MerxoDev Solutions..."
                      className="w-full p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                    />
                  </div>

                  {submitError && (
                    <p className="text-xs font-bold text-red-500 text-center">{submitError}</p>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting || !comment.trim()}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-md hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer"
                    >
                      {submitting ? 'Submitting Review...' : 'Submit Review For Approval'}
                    </button>
                  </div>
                </form>
              )
            ) : (
              /* SCENARIO B: User is NOT logged in -> Show Login/Register */
              <div className="space-y-4">
                <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => { setAuthMode('login'); setAuthError(''); }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      authMode === 'login'
                        ? 'bg-white dark:bg-zinc-900 text-violet-700 dark:text-cyan-400 shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-white'
                    }`}
                  >
                    Sign In / Log In
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAuthMode('register'); setAuthError(''); }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      authMode === 'register'
                        ? 'bg-white dark:bg-zinc-900 text-violet-700 dark:text-cyan-400 shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-white'
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                {authError && (
                  <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs font-medium text-center">
                    {authError}
                  </div>
                )}

                {authMode === 'login' ? (
                  <form onSubmit={handleAuthLogin} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                        Email Address
                      </label>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                        <FaEnvelope className="text-zinc-400 text-xs" />
                        <input
                          type="email"
                          required
                          value={authEmail}
                          onChange={(e) => setAuthEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full bg-transparent text-xs text-zinc-900 dark:text-white outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                        Password
                      </label>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                        <FaLock className="text-zinc-400 text-xs" />
                        <input
                          type="password"
                          required
                          value={authPassword}
                          onChange={(e) => setAuthPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-transparent text-xs text-zinc-900 dark:text-white outline-none"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={authLoading}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-xs shadow-md hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer"
                    >
                      {authLoading ? 'Signing In...' : 'Log In & Continue to Review'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleAuthRegister} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                        Your Full Name
                      </label>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                        <FaUserCircle className="text-zinc-400 text-xs" />
                        <input
                          type="text"
                          required
                          value={authName}
                          onChange={(e) => setAuthName(e.target.value)}
                          placeholder="e.g. Sarah Johnson"
                          className="w-full bg-transparent text-xs text-zinc-900 dark:text-white outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                        Email Address
                      </label>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                        <FaEnvelope className="text-zinc-400 text-xs" />
                        <input
                          type="email"
                          required
                          value={authEmail}
                          onChange={(e) => setAuthEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full bg-transparent text-xs text-zinc-900 dark:text-white outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                        Create Password (min. 6 characters)
                      </label>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                        <FaLock className="text-zinc-400 text-xs" />
                        <input
                          type="password"
                          required
                          minLength={6}
                          value={authPassword}
                          onChange={(e) => setAuthPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-transparent text-xs text-zinc-900 dark:text-white outline-none"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={authLoading}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-xs shadow-md hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer"
                    >
                      {authLoading ? 'Creating Account...' : 'Register & Continue to Review'}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
