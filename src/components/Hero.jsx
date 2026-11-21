"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import "@/components/i18n";
import LottiePlayer from "@/components/LottiePlayer";
import {
  ArrowRight,
  Play,
  CheckCircle,
  Globe,
  Code,
  Zap,
  Sparkles,
  ShieldCheck,
  Activity,
  Layers,
} from "lucide-react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiPostgresql,
  SiTailwindcss,
  SiDocker,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative flex items-center pt-8 sm:pt-12 pb-14 sm:pb-20 lg:pt-16 lg:pb-24 overflow-hidden"
    >
      {/* SEO: Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "MerxoDev Solutions",
            url: "https://merxodevsolutions.pro.bd",
            logo: "https://merxodevsolutions.pro.bd/logo.png",
            description:
              "Custom websites, web apps & digital solutions crafted for startups and growing businesses in Bangladesh and worldwide.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Rangpur",
              addressCountry: "BD",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+8801313334279",
              contactType: "customer service",
            },
            sameAs: [
              "https://www.facebook.com/merxodevsolutions",
              "https://twitter.com/merxodevsolutions",
              "https://linkedin.com/company/merxodevsolutions",
            ],
          }),
        }}
      />

      {/* ── Background Ambience Matching User Theme ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-[320px] md:w-[620px] h-[320px] md:h-[620px] bg-gradient-to-br from-violet-600/20 via-indigo-600/15 to-transparent rounded-full blur-[100px] md:blur-[140px] opacity-60 pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-20 w-[280px] md:w-[520px] h-[280px] md:h-[520px] bg-gradient-to-tr from-cyan-500/20 via-lime-500/15 to-transparent rounded-full blur-[80px] md:blur-[120px] opacity-50 pointer-events-none -z-10"
      />

      {/* Structural Background Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.12)_0%,transparent_75%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.14)_0%,transparent_75%)] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_80%)] -z-10"
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-10 sm:pt-14 lg:pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left Content Column ── */}
          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            {/* Top Innovation / Status Pill */}
            <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full border border-violet-500/30 dark:border-cyan-500/30 bg-violet-500/10 dark:bg-cyan-500/10 text-violet-700 dark:text-cyan-300 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-5 md:mb-6 backdrop-blur-md shadow-sm font-exo-extralight">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500" />
              </span>
              <span>{t("hero.badge") || "Web & App Innovation Lab"}</span>
            </div>

            {/* Main Headline */}
            {(() => {
              const headingEnd = t("hero.headingEnd") || "DREAM Project";
              const parts = headingEnd.split(/(dream)/i);

              return (
                <h1 className="text-[2.6rem] sm:text-6xl lg:text-7xl xl:text-[5rem] font-black text-[#27003B] dark:text-white leading-[1.08] md:leading-[0.98] tracking-tighter mb-6 md:mb-8 font-exo-extralight">
                  {t("hero.headingStart") || "We"}{" "}
                  <span className="text-[#84cc16] dark:text-[#CCFF00] drop-shadow-[0_0_20px_rgba(132,204,22,0.4)]">
                    {t("hero.headingHighlight") || "Build Your"}
                  </span>
                  <br />
                  {parts.length > 1 ? (
                    parts.map((part, idx) => {
                      if (part.toLowerCase() === "dream") {
                        return (
                          <span
                            key={idx}
                            className="text-orange-500 dark:text-orange-400 drop-shadow-[0_0_22px_rgba(249,115,22,0.55)]"
                          >
                            {part}
                          </span>
                        );
                      }
                      return (
                        <span
                          key={idx}
                          className="bg-gradient-to-r from-orange-500 via-black to-[#84cc16] bg-clip-text text-transparent animated-gradient-text drop-shadow-sm"
                        >
                          {part}
                        </span>
                      );
                    })
                  ) : (
                    <span className="bg-gradient-to-r from-orange-500 via-black to-[#84cc16] bg-clip-text text-transparent animated-gradient-text drop-shadow-sm">
                      {headingEnd}
                    </span>
                  )}
                </h1>
              );
            })()}

            {/* Subtitle Description */}
            <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-300 mb-8 md:mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal font-exo-extralight">
              {t("hero.subtext") ||
                "We craft high-performance web apps and software ecosystems that do not just look good — they dominate competition and scale infinitely."}
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center lg:justify-start">
              <Link
                href="/contact"
                aria-label="Start Your Project"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-bold shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-[1.03] active:scale-95 transition-all group overflow-hidden relative text-sm sm:text-base font-exo-extralight"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                <span className="relative z-10">
                  {t("hero.ctaPrimary") || "Start Your Project"}
                </span>
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform relative z-10" />
              </Link>

              <Link
                href="/our-projects"
                aria-label="View Projects"
                className="inline-flex items-center space-x-3 text-zinc-800 dark:text-white font-semibold hover:text-violet-600 dark:hover:text-cyan-400 transition-colors group px-5 py-2 font-exo-extralight"
              >
                <span className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-zinc-300 dark:border-white/20 bg-white/50 dark:bg-white/5 backdrop-blur-md flex items-center justify-center group-hover:border-violet-500 dark:group-hover:border-cyan-400 group-hover:scale-105 transition-all shadow-sm">
                  <Play
                    size={14}
                    className="ml-0.5 text-violet-600 dark:text-cyan-400"
                    fill="currentColor"
                  />
                </span>
                <span className="text-xs md:text-sm font-bold uppercase tracking-wider">
                  {t("hero.ctaSecondary") || "View Projects"}
                </span>
              </Link>
            </div>

            {/* Bottom Key Stats */}
            <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-zinc-200/70 dark:border-white/10 grid grid-cols-3 gap-4 md:gap-8 justify-items-center lg:justify-items-start font-exo-extralight">
              <div>
                <p className="text-xl md:text-2xl font-black text-[#27003B] dark:text-white tracking-tighter">
                  99.9%
                </p>
                <p className="text-[9px] md:text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold mt-0.5">
                  {t("hero.stats.reliability", "Reliability")}
                </p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-black text-[#27003B] dark:text-white tracking-tighter flex items-center gap-1">
                  5.0 <span className="text-amber-400 text-sm">★</span>
                </p>
                <p className="text-[9px] md:text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold mt-0.5">
                  {t("hero.stats.clientRating", "Client Rating")}
                </p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-black bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent tracking-tighter">
                  65+
                </p>
                <p className="text-[9px] md:text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold mt-0.5">
                  {t("hero.stats.projectsShipped", "Projects Shipped")}
                </p>
              </div>
            </div>
          </div>

          {/* ── Right Visual Composition (Glassmorphic Lottie Showcase Frame) ── */}
          <div className="relative h-full flex items-center justify-center">
            {/* Outer Glass Card */}
            <div className="relative p-5 sm:p-6 rounded-[2.5rem] border border-zinc-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl shadow-2xl shadow-violet-950/10 dark:shadow-black/60 h-[520px] sm:h-[580px] w-full max-w-[490px] lg:ml-auto flex flex-col justify-between">
              {/* Inner Mock UI Preview */}
              <div className="relative h-full rounded-[2rem] overflow-hidden border border-zinc-200/70 dark:border-white/10 bg-gradient-to-b from-white/90 via-zinc-50/80 to-zinc-100/90 dark:from-zinc-950/90 dark:via-[#090d16]/90 dark:to-[#060b19]/95 shadow-inner flex flex-col justify-between">
                {/* Browser-style Top Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-white/10 border-b border-zinc-200/60 dark:border-white/10 backdrop-blur-md relative z-20">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                  </div>
                  <div className="px-3 py-0.5 rounded-full bg-zinc-200/60 dark:bg-white/5 border border-zinc-300/60 dark:border-white/10 text-[10px] text-zinc-600 dark:text-zinc-400 font-mono tracking-tight flex items-center gap-1.5">
                    <Code size={11} className="text-violet-500" />
                    <span>merxodev-web-development.live</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                {/* Center: Lottie Animation Container */}
                <div className="relative flex-1 w-full flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                  {/* Subtle radial glow behind animation */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.12)_0%,transparent_70%)] pointer-events-none" />
                  <LottiePlayer
                    animationPath="/animations/web-dev.json"
                    loop={true}
                    autoplay={true}
                    className="w-full h-full max-h-[290px] sm:max-h-[330px] object-contain relative z-10"
                  />
                </div>

                {/* Bottom Card Footer: Live Features & Status */}
                <div className="p-4 sm:p-5 bg-gradient-to-t from-violet-600/10 via-white/60 dark:via-zinc-950/40 to-transparent border-t border-zinc-200/60 dark:border-white/10 relative z-20">
                  <div className="grid grid-cols-2 gap-2.5 mb-3">
                    <div className="p-2.5 rounded-xl bg-white/80 dark:bg-white/5 border border-zinc-200/80 dark:border-white/10 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <div className="text-left">
                        <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                          Performance
                        </p>
                        <p className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                          99+ Core Vitals
                        </p>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/80 dark:bg-white/5 border border-zinc-200/80 dark:border-white/10 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-500" />
                      <div className="text-left">
                        <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                          Scalability
                        </p>
                        <p className="text-xs font-black text-cyan-600 dark:text-cyan-400">
                          Next.js 15 Edge
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 font-exo-extralight">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <Sparkles size={13} className="text-amber-500" /> Web &
                      Digital Engineering
                    </span>
                    <span className="flex items-center gap-1 text-emerald-500 font-bold">
                      <CheckCircle size={13} /> Production Ready
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Floating Element 1 - Speed Indicator (Bottom Left) ── */}
              <div className="animate-float-reverse absolute -bottom-6 -left-6 sm:-left-10 p-4 sm:p-5 rounded-2xl shadow-2xl border border-zinc-200/90 dark:border-white/20 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl flex items-center space-x-3 sm:space-x-4 pr-6 sm:pr-8 z-30 font-exo-extralight">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-amber-500/10 dark:bg-amber-400/15 flex items-center justify-center text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.25)] shrink-0">
                  <Zap size={22} fill="currentColor" />
                </div>
                <div>
                  <p className="text-[9px] text-zinc-500 dark:text-zinc-400 uppercase font-black tracking-widest">
                    Speed Score
                  </p>
                  <p className="text-lg sm:text-xl font-black text-[#27003B] dark:text-white tracking-tighter">
                    100 / 100
                  </p>
                </div>
              </div>

              {/* ── Floating Element 3 - Global Scale (Center Right) ── */}
              <div className="animate-float-side absolute top-1/2 -right-4 sm:-right-8 -translate-y-1/2 px-4 sm:px-5 py-3 rounded-full shadow-2xl border border-zinc-200/90 dark:border-white/20 bg-white/90 dark:bg-zinc-900/90 flex items-center space-x-2.5 whitespace-nowrap backdrop-blur-xl z-40 font-exo-extralight">
                <div className="w-7 h-7 rounded-full bg-cyan-500/15 flex items-center justify-center text-cyan-500">
                  <Globe size={14} />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#27003B] dark:text-white uppercase tracking-wider">
                  Enterprise Scale
                </span>
              </div>
            </div>

            {/* Decorative background orbital dashed circle */}
            <div
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] border border-dashed border-violet-500/20 dark:border-white/10 rounded-full pointer-events-none -z-10 animate-[spin_60s_linear_infinite]"
            />
          </div>
        </div>

        {/* ── Bottom Modern Tech Stack Strip ── */}
        <div className="mt-14 sm:mt-20 pt-8 border-t border-zinc-200/70 dark:border-white/10 flex flex-col items-center gap-4">
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 font-exo-extralight">
            Engineered With State-Of-The-Art Technologies
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-semibold font-exo-extralight text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 hover:border-violet-500/50 transition-colors">
              <SiNextdotjs className="text-zinc-900 dark:text-white" />
              <span>Next.js 15</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 hover:border-cyan-500/50 transition-colors">
              <SiReact className="text-cyan-500" />
              <span>React 19</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 hover:border-blue-500/50 transition-colors">
              <SiTypescript className="text-blue-500" />
              <span>TypeScript</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 hover:border-emerald-500/50 transition-colors">
              <SiNodedotjs className="text-emerald-500" />
              <span>Node.js</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 hover:border-sky-500/50 transition-colors">
              <SiPostgresql className="text-sky-500" />
              <span>PostgreSQL</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 hover:border-teal-500/50 transition-colors">
              <SiTailwindcss className="text-teal-400" />
              <span>Tailwind CSS</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 hover:border-amber-500/50 transition-colors">
              <FaAws className="text-amber-500" />
              <span>AWS Cloud</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 hover:border-blue-400/50 transition-colors">
              <SiDocker className="text-blue-400" />
              <span>Docker</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
