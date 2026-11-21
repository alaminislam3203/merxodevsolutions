"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FiDownload,
  FiFileText,
  FiCheckCircle,
  FiExternalLink,
  FiAward,
  FiCode,
  FiUsers,
  FiPrinter,
  FiX,
} from "react-icons/fi";
import "@/components/i18n";

export default function CompanyDeck() {
  const { t } = useTranslation();
  const [previewOpen, setPreviewOpen] = useState(false);

  const handlePrintOrDownload = () => {
    window.print();
  };

  return (
    <section
      id="company-profile"
      className="py-16 sm:py-24 relative overflow-hidden"
      aria-label="Company Profile and Portfolio Deck"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl p-8 sm:p-12 border border-zinc-200/90 dark:border-zinc-800 bg-gradient-to-br from-white via-zinc-50 to-violet-50/20 dark:from-zinc-900 dark:via-zinc-900/90 dark:to-violet-950/20 shadow-xl overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 dark:bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text & Pitch Column */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-950/70 border border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 text-xs font-bold tracking-wide">
                <FiFileText className="text-cyan-600 dark:text-cyan-400" />
                <span>{t("companyDeck.badge")}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                {t("companyDeck.titleStart")}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-rose-500 to-cyan-500">
                  {t("companyDeck.titleHighlight")}
                </span>
              </h2>

              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-2xl">
                {t("companyDeck.subtitle")}
              </p>

              {/* Quick Specs Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 shadow-sm">
                  <FiAward className="text-violet-500" />
                  <span>{t("companyDeck.deliveredProjects")}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 shadow-sm">
                  <FiUsers className="text-cyan-500" />
                  <span>{t("companyDeck.globalClients")}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 shadow-sm">
                  <FiCode className="text-emerald-500" />
                  <span>{t("companyDeck.techStack")}</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons Column */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 shrink-0">
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-violet-500/25 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer w-full"
              >
                <FiFileText size={16} />
                <span>{t("companyDeck.previewBtn")}</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold text-xs sm:text-sm shadow-sm transition-all duration-300 cursor-pointer w-full"
              >
                <FiDownload
                  size={16}
                  className="text-violet-600 dark:text-cyan-400"
                />
                <span>{t("companyDeck.savePdfBtn")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Company Deck Printable / Interactive Modal */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-2xl flex flex-col">
            {/* Modal Controls Bar */}
            <div className="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900">
              <div className="flex items-center gap-2">
                <FiFileText
                  className="text-violet-600 dark:text-cyan-400"
                  size={18}
                />
                <span className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white">
                  {t("companyDeck.modalTitle")}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handlePrintOrDownload}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow transition-all cursor-pointer"
                >
                  <FiPrinter size={14} />
                  <span>{t("companyDeck.printSaveBtn")}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewOpen(false)}
                  className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <FiX size={18} />
                </button>
              </div>
            </div>

            {/* Modal Document Body */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-zinc-900 dark:text-zinc-100 print:text-black">
              {/* Document Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                    MerxoDev Solutions
                  </h1>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    {t("companyDeck.agencySubtitle")}
                  </p>
                </div>
                <div className="text-xs sm:text-right text-zinc-600 dark:text-zinc-400 space-y-0.5">
                  <p className="font-bold text-violet-600 dark:text-cyan-400">
                    merxodevsolutions.pro.bd
                  </p>
                  <p>merxodevsolutions@gmail.com</p>
                  <p>+880 1313-334279</p>
                </div>
              </div>

              {/* Core Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-center">
                  <span className="text-2xl sm:text-3xl font-black text-violet-600 dark:text-violet-400">
                    65+
                  </span>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                    {t("companyDeck.metricProjects", "Projects Delivered")}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-center">
                  <span className="text-2xl sm:text-3xl font-black text-amber-500">
                    46+
                  </span>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                    {t("companyDeck.metricClients", "Happy Clients")}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-center">
                  <span className="text-2xl sm:text-3xl font-black text-cyan-500">
                    4+
                  </span>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                    {t("companyDeck.metricYears", "Years Active")}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-center">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-500">
                    99%
                  </span>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                    {t("companyDeck.metricSatisfaction", "Client Satisfaction")}
                  </p>
                </div>
              </div>

              {/* Services & Capabilities */}
              <div className="space-y-3">
                <h3 className="text-base font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                  Engineering Services
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
                    <h4 className="font-bold">Next.js & Full-Stack Web Apps</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Scalable SaaS platforms, custom dashboards,
                      authentication, database design.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
                    <h4 className="font-bold">High-Converting E-Commerce</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Online stores, bKash/Nagad/SSLCommerz/Stripe payment
                      gateways, inventory sync.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
                    <h4 className="font-bold">
                      Modern UI/UX & Responsive Design
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Tailored Figma designs, pixel-perfect Tailwind CSS, 60fps
                      micro-animations.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
                    <h4 className="font-bold">API Integration & Automation</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Custom REST/GraphQL APIs, CRM & WhatsApp integrations,
                      automated workflows.
                    </p>
                  </div>
                </div>
              </div>

              {/* Work Guarantees */}
              <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 space-y-2">
                <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                  Our Direct Commitments:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-emerald-500" /> 100% Full
                    Source Code Ownership
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-emerald-500" /> Sub-1s Page
                    Load Speed Guarantee
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-emerald-500" /> 1–6 Months
                    Free Post-Launch Support
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-emerald-500" /> Transparent
                    Fixed Pricing, Zero Surprises
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
