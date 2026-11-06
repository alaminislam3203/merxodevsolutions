"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import "@/components/i18n";
import {
  Calculator,
  CheckCircle2,
  Clock,
  Download,
  Send,
  Sparkles,
  Layers,
  Globe,
  ShoppingCart,
  Cpu,
  MessageSquare,
  ChevronRight,
  Zap,
} from "lucide-react";
import { downloadOfficialInvoice } from "@/lib/invoiceGenerator";

const PROJECT_TYPES = [
  { id: "landing", icon: Globe, basePrice: 1200, baseDays: 4 },
  { id: "business", icon: Layers, basePrice: 2200, baseDays: 7 },
  { id: "ecommerce", icon: ShoppingCart, basePrice: 3200, baseDays: 12 },
  { id: "saas", icon: Cpu, basePrice: 4500, baseDays: 18 },
];

const PAGE_SCALES = [
  { id: "small", extraPrice: 0, extraDays: 0 },
  { id: "medium", extraPrice: 800, extraDays: 3 },
  { id: "large", extraPrice: 1800, extraDays: 7 },
];

const ADDON_FEATURES = [
  { id: "payment", price: 700, days: 2 },
  { id: "auth", price: 600, days: 2 },
  { id: "cms", price: 800, days: 3 },
  { id: "ai", price: 900, days: 2 },
  { id: "i18n", price: 500, days: 1 },
  { id: "seo", price: 400, days: 1 },
];

const URGENCY_OPTIONS = [
  { id: "relaxed", multiplier: 1.0, daysMultiplier: 1.0 },
  { id: "fast", multiplier: 1.2, daysMultiplier: 0.65 },
  { id: "urgent", multiplier: 1.4, daysMultiplier: 0.45 },
];

export default function CostCalculatorPage() {
  const { t } = useTranslation();

  const [selectedType, setSelectedType] = useState("business");
  const [selectedScale, setSelectedScale] = useState("medium");
  const [selectedAddons, setSelectedAddons] = useState(["seo", "cms"]);
  const [selectedUrgency, setSelectedUrgency] = useState("relaxed");

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const calculation = useMemo(() => {
    const typeObj =
      PROJECT_TYPES.find((p) => p.id === selectedType) || PROJECT_TYPES[0];
    const scaleObj =
      PAGE_SCALES.find((s) => s.id === selectedScale) || PAGE_SCALES[0];
    const urgencyObj =
      URGENCY_OPTIONS.find((u) => u.id === selectedUrgency) ||
      URGENCY_OPTIONS[0];

    const addonsTotal = selectedAddons.reduce((sum, id) => {
      const f = ADDON_FEATURES.find((item) => item.id === id);
      return sum + (f ? f.price : 0);
    }, 0);

    const addonsDays = selectedAddons.reduce((sum, id) => {
      const f = ADDON_FEATURES.find((item) => item.id === id);
      return sum + (f ? f.days : 0);
    }, 0);

    const subtotal = typeObj.basePrice + scaleObj.extraPrice + addonsTotal;
    const totalBudget = Math.round(subtotal * urgencyObj.multiplier);
    const rawDays = typeObj.baseDays + scaleObj.extraDays + addonsDays;
    const estimatedDays = Math.max(
      2,
      Math.round(rawDays * urgencyObj.daysMultiplier),
    );

    return {
      typeObj,
      scaleObj,
      urgencyObj,
      addonsTotal,
      subtotal,
      totalBudget,
      estimatedDays,
    };
  }, [selectedType, selectedScale, selectedAddons, selectedUrgency]);

  const handleDownloadQuotation = () => {
    const typeLabel = t(`costCalculatorPage.types.${selectedType}.label`, {
      defaultValue: selectedType,
    });
    const scaleLabel = t(`costCalculatorPage.scales.${selectedScale}.label`, {
      defaultValue: selectedScale,
    });
    const addonLabels = selectedAddons
      .map((id) => t(`costCalculatorPage.features.${id}`, { defaultValue: id }))
      .join(", ");

    downloadOfficialInvoice({
      docType: "QUOTATION",
      invoiceNo: `QUO-${Date.now().toString().slice(-6)}`,
      title: `${typeLabel} (${scaleLabel})`,
      client: clientName || "Valued Client",
      clientEmail: clientEmail || "info@merxodev.com",
      clientPhone: clientPhone || "",
      budget: calculation.totalBudget,
      paidAmount: 0,
      stage: `Est. ${calculation.estimatedDays} Days Delivery`,
      notes: `Add-ons: ${addonLabels || "Standard Core"}. ${notes ? `Client Notes: ${notes}` : ""}`,
    });
  };

  const handleSubmitEstimate = async (e) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) return;
    setSubmitting(true);

    const typeLabel = t(`costCalculatorPage.types.${selectedType}.label`, {
      defaultValue: selectedType,
    });
    const scaleLabel = t(`costCalculatorPage.scales.${selectedScale}.label`, {
      defaultValue: selectedScale,
    });
    const addonLabels = selectedAddons
      .map((id) => t(`costCalculatorPage.features.${id}`, { defaultValue: id }))
      .join(", ");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: clientName,
          email: clientEmail,
          phone: clientPhone,
          service: `Cost Calculator: ${typeLabel}`,
          budget: `BDT ${calculation.totalBudget.toLocaleString()}`,
          message: `[Interactive Cost Estimate]\nProject Type: ${typeLabel}\nScale: ${scaleLabel}\nSelected Add-ons: ${addonLabels || "None"}\nEstimated Delivery: ${calculation.estimatedDays} Days\nEstimated Budget: BDT ${calculation.totalBudget.toLocaleString()}\n\nAdditional Notes: ${notes || "N/A"}`,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappSummaryUrl = useMemo(() => {
    const typeLabel = t(`costCalculatorPage.types.${selectedType}.label`, {
      defaultValue: selectedType,
    });
    const scaleLabel = t(`costCalculatorPage.scales.${selectedScale}.label`, {
      defaultValue: selectedScale,
    });
    const text = `Hello MerxoDev Team! I calculated an estimate on your website:\n- Project: ${typeLabel} (${scaleLabel})\n- Estimated Budget: BDT ${calculation.totalBudget.toLocaleString()}\n- Timeline: ~${calculation.estimatedDays} Days\nI'd love to discuss starting this project!`;
    return `https://wa.me/8801313334279?text=${encodeURIComponent(text)}`;
  }, [selectedType, selectedScale, calculation, t]);

  return (
    <div className="min-h-screen pb-24 overflow-hidden pt-4 sm:pt-6 mt-8">
      {/* Ambient decorative glows matching other pages */}
      <div
        className="pointer-events-none fixed top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.07] dark:opacity-[0.12] blur-[130px] z-0"
        style={{
          background: "radial-gradient(circle, #7c3aed, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none fixed bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.06] dark:opacity-[0.10] blur-[110px] z-0"
        style={{
          background: "radial-gradient(circle, #06b6d4, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="pt-16 flex items-center gap-2 text-xs font-exo-extralight text-zinc-400 dark:text-zinc-600">
          <Link href="/" className="hover:text-violet-500 transition-colors">
            {t("costCalculatorPage.breadcrumbHome", { defaultValue: "Home" })}
          </Link>
          <ChevronRight size={12} />
          <span className="text-zinc-600 dark:text-zinc-400">
            {t("costCalculatorPage.breadcrumbCurrent", {
              defaultValue: "Cost Calculator",
            })}
          </span>
        </div>

        {/* Hero Header */}
        <div className="pt-8 pb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-exo-extralight tracking-widest uppercase border border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400 mb-5">
            <Calculator size={12} />
            {t("costCalculatorPage.badge", {
              defaultValue: "Interactive Project Estimator",
            })}
          </div>

          <h1 className="font-exo-medium text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#27003B] dark:text-white mb-4 uppercase tracking-tight leading-tight">
            {t("costCalculatorPage.titlePrefix", {
              defaultValue: "Instant Website ",
            })}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              {t("costCalculatorPage.titleHighlight", {
                defaultValue: "Cost Calculator",
              })}
            </span>
          </h1>

          <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base font-exo-extralight leading-relaxed">
            {t("costCalculatorPage.subtitle")}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Builder Steps */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Project Type */}
            <div className="bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm">
              <h2 className="font-exo-medium text-base sm:text-lg font-bold text-[#27003B] dark:text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-500" />
                {t("costCalculatorPage.step1Title")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {PROJECT_TYPES.map((item) => {
                  const Icon = item.icon;
                  const active = selectedType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedType(item.id)}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                        active
                          ? "border-violet-500 bg-violet-500/10 dark:bg-violet-500/15 shadow-sm"
                          : "border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40 hover:border-violet-400/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                            active
                              ? "bg-gradient-to-br from-violet-600 to-cyan-500 text-white"
                              : "bg-zinc-200/70 dark:bg-zinc-700/60 text-zinc-600 dark:text-zinc-300"
                          }`}
                        >
                          <Icon size={18} />
                        </span>
                        <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
                          ৳{item.basePrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="font-exo-medium text-sm font-bold text-[#27003B] dark:text-white">
                        {t(`costCalculatorPage.types.${item.id}.label`)}
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight mt-1">
                        {t(`costCalculatorPage.types.${item.id}.desc`)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Page Scale */}
            <div className="bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm">
              <h2 className="font-exo-medium text-base sm:text-lg font-bold text-[#27003B] dark:text-white mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-500" />
                {t("costCalculatorPage.step2Title")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {PAGE_SCALES.map((scale) => {
                  const active = selectedScale === scale.id;
                  return (
                    <button
                      key={scale.id}
                      type="button"
                      onClick={() => setSelectedScale(scale.id)}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                        active
                          ? "border-violet-500 bg-violet-500/10 dark:bg-violet-500/15 shadow-sm"
                          : "border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40 hover:border-violet-400/50"
                      }`}
                    >
                      <div className="font-exo-medium text-sm font-bold text-[#27003B] dark:text-white">
                        {t(`costCalculatorPage.scales.${scale.id}.label`)}
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight mt-1">
                        {t(`costCalculatorPage.scales.${scale.id}.desc`)}
                      </p>
                      <div className="mt-2 text-xs font-semibold text-violet-600 dark:text-violet-400">
                        {scale.extraPrice === 0
                          ? "Included"
                          : `+৳${scale.extraPrice.toLocaleString()}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Add-on Features */}
            <div className="bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm">
              <h2 className="font-exo-medium text-base sm:text-lg font-bold text-[#27003B] dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-fuchsia-500" />
                {t("costCalculatorPage.step3Title")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ADDON_FEATURES.map((feat) => {
                  const active = selectedAddons.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      type="button"
                      onClick={() => toggleAddon(feat.id)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                        active
                          ? "border-violet-500 bg-violet-500/10 dark:bg-violet-500/15"
                          : "border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40 hover:border-violet-400/50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 pr-2">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            active
                              ? "bg-violet-600 border-violet-600 text-white"
                              : "border-zinc-400 dark:border-zinc-600"
                          }`}
                        >
                          {active && <CheckCircle2 size={12} />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200">
                          {t(`costCalculatorPage.features.${feat.id}`)}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-violet-600 dark:text-violet-400 shrink-0">
                        +৳{feat.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Urgency */}
            <div className="bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm">
              <h2 className="font-exo-medium text-base sm:text-lg font-bold text-[#27003B] dark:text-white mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                {t("costCalculatorPage.step4Title")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {URGENCY_OPTIONS.map((urg) => {
                  const active = selectedUrgency === urg.id;
                  return (
                    <button
                      key={urg.id}
                      type="button"
                      onClick={() => setSelectedUrgency(urg.id)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        active
                          ? "border-violet-500 bg-violet-500/10 dark:bg-violet-500/15 shadow-sm"
                          : "border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40 hover:border-violet-400/50"
                      }`}
                    >
                      <div className="font-exo-medium text-sm font-bold text-[#27003B] dark:text-white">
                        {t(`costCalculatorPage.urgencies.${urg.id}.label`)}
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight mt-1">
                        {t(`costCalculatorPage.urgencies.${urg.id}.desc`)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Live Summary & Lock Estimate Form */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white/90 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-lg">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 mb-4">
                <Sparkles size={11} />
                {t("costCalculatorPage.summaryBadge")}
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-600/10 via-fuchsia-500/10 to-cyan-500/10 border border-violet-500/20 mb-5">
                <div className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-exo-extralight">
                  {t("costCalculatorPage.estimatedInvestment")}
                </div>
                <div className="font-exo-medium text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent mt-1">
                  ৳{calculation.totalBudget.toLocaleString()} BDT
                </div>
                <div className="flex items-center gap-2 mt-3 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                  <Clock size={15} className="text-cyan-500" />
                  <span>
                    {t("costCalculatorPage.estimatedDelivery")}{" "}
                    <strong>
                      ~{calculation.estimatedDays}{" "}
                      {t("costCalculatorPage.daysUnit")}
                    </strong>
                  </span>
                </div>
              </div>

              {/* Breakdown lines */}
              <div className="space-y-2.5 text-xs sm:text-sm border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-5">
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>{t("costCalculatorPage.basePackage")}</span>
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    ৳{calculation.typeObj.basePrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>{t("costCalculatorPage.extraPages")}</span>
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    +৳{calculation.scaleObj.extraPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>
                    {t("costCalculatorPage.selectedAddons")} (
                    {selectedAddons.length})
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    +৳{calculation.addonsTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>{t("costCalculatorPage.urgencyMultiplier")}</span>
                  <span className="font-semibold text-violet-600 dark:text-violet-400">
                    {calculation.urgencyObj.multiplier}x
                  </span>
                </div>
              </div>

              {/* Client Details & Actions */}
              <form onSubmit={handleSubmitEstimate} className="space-y-3">
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder={t("costCalculatorPage.yourNamePlaceholder")}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder={t("costCalculatorPage.yourEmailPlaceholder")}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder={t("costCalculatorPage.yourPhonePlaceholder")}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t("costCalculatorPage.notesPlaceholder")}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />

                {submitted && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                    {t("costCalculatorPage.successMessage")}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || submitted}
                  className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-sm shadow-md hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Send size={16} />
                  {submitting
                    ? t("costCalculatorPage.submittingBtn")
                    : submitted
                      ? t("costCalculatorPage.submittedBtn")
                      : t("costCalculatorPage.submitBtn")}
                </button>
              </form>

              <div className="mt-3 grid grid-cols-1 gap-2.5">
                <button
                  type="button"
                  onClick={handleDownloadQuotation}
                  className="w-full py-2.5 px-4 rounded-xl border border-violet-500/40 bg-violet-500/10 text-violet-700 dark:text-violet-300 hover:bg-violet-500/20 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Download size={15} />
                  {t("costCalculatorPage.downloadPdfBtn")}
                </button>

                <a
                  href={whatsappSummaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare size={15} />
                  {t("costCalculatorPage.whatsappBtn")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
