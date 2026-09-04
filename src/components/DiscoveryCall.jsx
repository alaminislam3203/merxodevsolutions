'use client';

import { useState } from 'react';
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

const CALENDLY_LINK = 'https://calendly.com/merxodevsolutions/15min';
const WHATSAPP_LINK = 'https://wa.me/8801313334279?text=Hello%20MerxoDev%20Team,%20I%20would%20like%20to%20schedule%20a%2015-minute%20discovery%20call%20for%20my%20project.';

export default function DiscoveryCall() {
  const { t, i18n } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const isBn = i18n.language === 'bn';

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
      className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900/60 dark:to-zinc-950"
      aria-label="Book a 15-Minute Discovery Call"
    >
      {/* Ambient background glowing orbs */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-violet-600/15 dark:bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-500/15 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden border border-zinc-200/90 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-2xl shadow-violet-500/5">
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
                  <FiCalendar size={18} />
                  <span>{isBn ? '১৫ মিনিটের কল শিডিউল করুন' : 'Book 15-Min Discovery Call'}</span>
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
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-violet-500/20">
                    MD
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
                    <FiVideo className="text-violet-600 dark:text-cyan-400 shrink-0" size={16} />
                    <span>{isBn ? 'প্ল্যাটফর্ম: Google Meet / Zoom' : 'Location: Google Meet / Zoom video call'}</span>
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

      {/* Booking Modal (Calendly / Direct Scheduler) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold">
                  <FiCalendar size={20} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                    {isBn ? '১৫ মিনিটের ডিসকভারি কল শিডিউল করুন' : 'Schedule 15-Min Discovery Call'}
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
                {/* Option 1: Calendly Google Meet */}
                <a
                  href={CALENDLY_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl border-2 border-violet-500/40 hover:border-violet-500 bg-violet-50/40 dark:bg-violet-950/20 hover:bg-violet-50 dark:hover:bg-violet-950/40 transition-all flex flex-col justify-between gap-4 group cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center">
                      <FiCalendar size={20} />
                    </div>
                    <h4 className="text-base font-bold text-zinc-900 dark:text-white">
                      Calendly Calendar
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      {isBn
                        ? 'ক্যালেন্ডারে আপনার সুবিধাজনক তারিখ ও সময় বেছে নিন।'
                        : 'Pick your exact preferred date and time slot from our live calendar.'}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 group-hover:translate-x-1 transition-transform">
                    {isBn ? 'ক্যালেন্ডার খুলুন' : 'Open Calendar'} →
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
