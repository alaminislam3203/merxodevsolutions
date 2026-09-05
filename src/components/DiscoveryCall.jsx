'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import {
  FiCalendar,
  FiClock,
  FiVideo,
  FiCheckCircle,
  FiArrowRight,
  FiMessageSquare,
  FiShield,
  FiX,
  FiUserCheck,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import '@/components/i18n';

// Official multi-color Google Meet icon
function GoogleMeetIcon({ size = 20, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
      aria-label="Google Meet"
    >
      <path fill="#ea4335" d="M166 106v90H76" />
      <path fill="#ffba00" d="M166 106v90h120v62l90-73v-49q0-30-30-30" />
      <path fill="#00ac47" d="M346 406q30 0 30-30V327l-90-71v60H164v90m212-77 42 34c9 7 18 7 18-7V156c0-14-9-14-18-7l-42 34" />
      <path fill="#0066da" d="M76 314v62q0 30 30 30h60v-92" />
      <path fill="#2684fc" d="M76 196h90v120H76" />
      <path fill="#00832d" d="M286 256l90-73v146" />
    </svg>
  );
}

const GOOGLE_MEET_LINK = process.env.NEXT_PUBLIC_GOOGLE_MEET_LINK || 'https://meet.google.com/new';
const WHATSAPP_LINK = 'https://wa.me/8801313334279?text=Hello%20MerxoDev%20Team,%20I%20would%20like%20to%20schedule%20a%2015-minute%20discovery%20call%20for%20my%20project.';

export default function DiscoveryCall() {
  const { t, i18n } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [meetLink, setMeetLink] = useState(GOOGLE_MEET_LINK);
  const isBn = i18n.language === 'bn';

  useEffect(() => {
    let isMounted = true;
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data?.googleMeetLink) {
          setMeetLink(data.googleMeetLink);
        }
      })
      .catch(() => { });
    return () => {
      isMounted = false;
    };
  }, []);

  const benefits = isBn
    ? [
      '১০০% ফ্রি কনসালটেশন — কোনো লুকানো চার্জ বা সেলস প্রেসার নেই',
      'আপনার ধারণার টেকনিক্যাল ফিজিবিলিটি ও আর্কিটেকচার বিশ্লেষণ',
      'সঠিক বাজেট প্ল্যান ও দ্রুততম ডেলিভারি টাইমলাইন নির্ধারণ',
      'সরাসরি লিড ইঞ্জিনিয়ার ও ইউআই/ইউএক্স এক্সপার্টের সাথে আলোচনা',
    ]
    : [
      '100% Free Consultation — zero sales pressure, pure technical insight',
      'In-depth technical feasibility, stack recommendation & architecture plan',
      'Transparent budget estimation & fastest delivery roadmap',
      'Direct 1-on-1 talk with lead full-stack engineers & UI/UX designers',
    ];

  return (
    <section
      id="discovery-call"
      className="relative py-20 sm:py-28 overflow-hidden"
      aria-label="Book a 15-Minute Discovery Call"
    >
      {/* Ambient background glowing orbs */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-violet-600/15 dark:bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-500/15 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden border border-zinc-200/90 dark:border-zinc-800 backdrop-blur-xl">
          {/* Subtle gradient pattern header bar */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-violet-600 via-rose-500 to-cyan-500" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 dark:bg-violet-950/70 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs font-bold mb-5 tracking-wide">
                <FiVideo className="text-violet-600 dark:text-violet-400" />
                <span>{isBn ? 'সরাসরি মিটিং বুক করুন' : 'SCHEDULE A FREE CONSULTATION'}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
                {isBn ? 'আপনার প্রজেক্ট নিয়ে কথা বলুন ' : 'Book a 15-Minute '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-rose-500 to-cyan-500">
                  {isBn ? '১৫ মিনিটের ফ্রি কলে' : 'Discovery Call'}
                </span>
              </h2>

              <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                {isBn
                  ? 'আপনার নতুন আইডিয়া, সফটওয়্যার বা ওয়েবসাইটের প্রয়োজনীয়তা নিয়ে সরাসরি আমাদের টেক টিমের সাথে লাইভ গুগল মিট বা জুম কলে কথা বলুন।'
                  : 'Discuss your project scope, timeline, and exact budget with our senior engineers on Google Meet or Zoom. No commitment required.'}
              </p>

              {/* Value checklist */}
              <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                {benefits.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <FiCheckCircle className="text-emerald-500 shrink-0 mt-1" size={17} />
                    <span className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer w-full sm:w-auto"
                >
                  <GoogleMeetIcon size={20} className="shrink-0" />
                  <span>{isBn ? '১৫ মিনিটের গুগল মিট বুক করুন' : 'Book 15-Min Google Meet'}</span>
                  <FiArrowRight size={16} />
                </button>

                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 font-bold text-sm shadow-sm transition-all duration-300 cursor-pointer w-full sm:w-auto"
                >
                  <FaWhatsapp size={19} className="text-emerald-600 dark:text-emerald-400" />
                  <span>{isBn ? 'হোয়াটসঅ্যাপে ইনস্ট্যান্ট চ্যাট' : 'Instant WhatsApp Call'}</span>
                </a>
              </div>
            </div>

            {/* Right Card / Host Snapshot Column */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-6 sm:p-7 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700/80 p-2 flex items-center justify-center shadow-lg shadow-violet-500/10 shrink-0">
                    <Image
                      src="/favicon.png"
                      alt="MerxoDev Solutions"
                      width={44}
                      height={44}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                        MerxoDev Solutions
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                        Online
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Lead Engineering & Product Architecture Team
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-zinc-200 dark:border-zinc-700/60 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                  <div className="flex items-center gap-3">
                    <FiClock className="text-violet-600 dark:text-cyan-400 shrink-0" size={16} />
                    <span>{isBn ? 'সময়কাল: ১৫ মিনিট দ্রুত আলোচনা' : 'Duration: 15 Minutes Quick Discovery'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <GoogleMeetIcon size={18} className="shrink-0" />
                    <span>{isBn ? 'প্ল্যাটফর্ম: Google Meet ভিডিও কল' : 'Location: Google Meet live video call'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiShield className="text-emerald-500 shrink-0" size={16} />
                    <span>{isBn ? '১০০% ফ্রি ও কোন বাধ্যবাধকতা নেই' : '100% Free & No Obligation'}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-violet-500/10 dark:bg-violet-950/40 border border-violet-200/60 dark:border-violet-800/60 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  💬 {isBn
                    ? 'আপনার আইডিয়া শেয়ার করুন — আমরা ফ্রন্টএন্ড, ব্যাকএন্ড ও খরচের রোডম্যাপ লাইভ শেয়ার করব।'
                    : 'Share your vision — we will show you how to build it efficiently with optimal budget and modern tech.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal (Google Meet / WhatsApp Direct) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 flex items-center justify-center shadow-sm">
                  <GoogleMeetIcon size={22} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                    {isBn ? '১৫ মিনিটের গুগল মিট কল শিডিউল করুন' : '15-Min Google Meet Discovery Call'}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    MerxoDev Solutions Engineering Consultation
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Modal Body / Scheduling Options */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="text-center max-w-lg mx-auto space-y-2">
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {isBn
                    ? 'আপনি কীভাবে আমাদের সাথে দ্রুত কথা বলতে চান তা বেছে নিন:'
                    : 'Choose your preferred way to connect directly with our engineering lead:'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Option 1: Direct Google Meet */}
                <a
                  href={meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl border-2 border-emerald-500/40 hover:border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/40 transition-all flex flex-col justify-between gap-4 group cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="w-11 h-11 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-sm">
                      <GoogleMeetIcon size={24} />
                    </div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-zinc-900 dark:text-white">
                        Google Meet
                      </h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                        {isBn ? 'লাইভ মিটিং' : 'Live Call'}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      {isBn
                        ? 'গুগল মিটে সরাসরি আমাদের লিড ইঞ্জিনিয়ারের সাথে লাইভ ভিডিও কলে যুক্ত হোন।'
                        : 'Join an instant 1-on-1 Google Meet video call with our senior tech team.'}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                    {isBn ? 'গুগল মিট শুরু করুন' : 'Join Google Meet'} →
                  </span>
                </a>

                {/* Option 2: WhatsApp Call & Voice */}
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl border-2 border-emerald-500/40 hover:border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-all flex flex-col justify-between gap-4 group cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                      <FaWhatsapp size={22} />
                    </div>
                    <h4 className="text-base font-bold text-zinc-900 dark:text-white">
                      Direct WhatsApp
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      {isBn
                        ? 'জরুরি প্রজেক্টের জন্য সরাসরি হোয়াটসঅ্যাপে মেসেজ বা কল দিন।'
                        : 'Instant audio/video chat or message directly on WhatsApp (+880 1313-334279).'}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                    {isBn ? 'হোয়াটসঅ্যাপে কথা বলুন' : 'Connect on WhatsApp'} →
                  </span>
                </a>
              </div>

              {/* Direct Phone fallback */}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 text-center text-xs text-zinc-500 dark:text-zinc-400">
                <span>{isBn ? 'সরাসরি ফোন করতে পারেন: ' : 'Prefer a direct phone call? '}</span>
                <a
                  href="tel:+8801313334279"
                  className="font-bold text-violet-600 dark:text-cyan-400 hover:underline"
                >
                  +880 1313-334279
                </a>
                <span> | </span>
                <a
                  href="mailto:merxodevsolutions@gmail.com"
                  className="font-bold text-violet-600 dark:text-cyan-400 hover:underline"
                >
                  merxodevsolutions@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
