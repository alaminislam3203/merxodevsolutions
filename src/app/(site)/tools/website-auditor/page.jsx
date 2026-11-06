"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import "@/components/i18n";
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Lock,
  Unlock,
  Clock,
  FileCode,
  ChevronRight,
  Sparkles,
  Download,
  ArrowRight,
} from "lucide-react";
import { exportRecordsToFile } from "@/lib/invoiceGenerator";

export default function WebsiteAuditorPage() {
  const { t } = useTranslation();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState(null);

  const handleAudit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setReport(null);

    try {
      const res = await fetch("/api/tools/website-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not inspect that URL.");
      } else {
        setReport(data);
      }
    } catch (err) {
      setError("Network error while scanning target website.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = () => {
    if (!report) return;
    exportRecordsToFile({
      filename: `merxodev-seo-audit-${Date.now()}`,
      title: `MerxoDev Website SEO & Health Audit — ${report.url}`,
      format: "pdf",
      columns: [
        { key: "metric", label: "Metric / Check" },
        { key: "value", label: "Result / Details" },
      ],
      rows: [
        { metric: "Target URL", value: report.url },
        { metric: "Overall Health Score", value: `${report.score} / 100` },
        {
          metric: "Server Response Time",
          value: `${report.responseTimeMs} ms`,
        },
        {
          metric: "HTTPS / SSL Security",
          value: report.isHttps ? "Secured (HTTPS)" : "Unsecured (HTTP)",
        },
        { metric: "Page Size", value: `${report.pageSizeKb} KB` },
        { metric: "Meta Title", value: report.meta?.title || "Missing" },
        {
          metric: "Meta Description",
          value: report.meta?.description || "Missing",
        },
        {
          metric: "H1 / H2 Count",
          value: `H1: ${report.headings?.h1Count || 0}, H2: ${report.headings?.h2Count || 0}`,
        },
        ...report.issues.map((iss, i) => ({
          metric: `Recommendation #${i + 1}`,
          value: iss,
        })),
      ],
    });
  };

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

      <div className="relative z-10 max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="pt-16 flex items-center gap-2 text-xs font-exo-extralight text-zinc-400 dark:text-zinc-600">
          <Link href="/" className="hover:text-violet-500 transition-colors">
            {t("websiteAuditorPage.breadcrumbHome", { defaultValue: "Home" })}
          </Link>
          <ChevronRight size={12} />
          <Link
            href="/tools"
            className="hover:text-violet-500 transition-colors"
          >
            {t("websiteAuditorPage.breadcrumbTools", { defaultValue: "Tools" })}
          </Link>
          <ChevronRight size={12} />
          <span className="text-zinc-600 dark:text-zinc-400">
            {t("websiteAuditorPage.breadcrumbCurrent", {
              defaultValue: "Website Auditor",
            })}
          </span>
        </div>

        {/* Hero Header */}
        <div className="pt-8 pb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-exo-extralight tracking-widest uppercase border border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400 mb-5">
            <Activity size={13} />
            {t("websiteAuditorPage.badge")}
          </div>

          <h1 className="font-exo-medium text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#27003B] dark:text-white mb-4 uppercase tracking-tight leading-tight">
            {t("websiteAuditorPage.titlePrefix")}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              {t("websiteAuditorPage.titleHighlight")}
            </span>
          </h1>

          <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base font-exo-extralight leading-relaxed">
            {t("websiteAuditorPage.subtitle")}
          </p>
        </div>

        {/* URL Input Bar */}
        <form
          onSubmit={handleAudit}
          className="max-w-2xl mx-auto bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row gap-3 mb-10"
        >
          <div className="relative flex-1">
            <Globe
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={t("websiteAuditorPage.inputPlaceholder")}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-sm shadow-md hover:scale-[1.02] transition-all disabled:opacity-60 shrink-0"
          >
            {loading
              ? t("websiteAuditorPage.scanningBtn")
              : t("websiteAuditorPage.scanBtn")}
          </button>
        </form>

        {error && (
          <div className="max-w-xl mx-auto p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-center text-sm mb-8">
            {error}
          </div>
        )}

        {/* Audit Report */}
        {report && (
          <div className="space-y-6">
            {/* Top Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/85 dark:bg-zinc-900/75 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-5 shadow-sm">
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  {t("websiteAuditorPage.overallScore")}
                </div>
                <div className="text-3xl font-extrabold bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent mt-1">
                  {report.score} / 100
                </div>
              </div>

              <div className="bg-white/85 dark:bg-zinc-900/75 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-5 shadow-sm">
                <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                  <Clock size={13} className="text-cyan-500" />
                  {t("websiteAuditorPage.responseTime")}
                </div>
                <div className="text-2xl font-extrabold text-[#27003B] dark:text-white mt-1">
                  {report.responseTimeMs} ms
                </div>
              </div>

              <div className="bg-white/85 dark:bg-zinc-900/75 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-5 shadow-sm">
                <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                  {report.isHttps ? (
                    <Lock size={13} className="text-emerald-500" />
                  ) : (
                    <Unlock size={13} className="text-rose-500" />
                  )}
                  {t("websiteAuditorPage.sslSecurity")}
                </div>
                <div
                  className={`text-lg font-extrabold mt-1 ${
                    report.isHttps
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {report.isHttps
                    ? t("websiteAuditorPage.secured")
                    : t("websiteAuditorPage.unsecured")}
                </div>
              </div>

              <div className="bg-white/85 dark:bg-zinc-900/75 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-5 shadow-sm">
                <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                  <FileCode size={13} className="text-violet-500" />
                  {t("websiteAuditorPage.pageSize")}
                </div>
                <div className="text-2xl font-extrabold text-[#27003B] dark:text-white mt-1">
                  {report.pageSizeKb} KB
                </div>
              </div>
            </div>

            {/* Issues & Passed Checks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/85 dark:bg-zinc-900/75 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm">
                <h2 className="font-exo-medium text-base font-bold text-[#27003B] dark:text-white mb-4 flex items-center gap-2">
                  <AlertTriangle size={17} className="text-amber-500" />
                  {t("websiteAuditorPage.actionableIssues")} (
                  {report.issues?.length || 0})
                </h2>
                <div className="space-y-2.5">
                  {report.issues?.map((issue, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 flex items-start gap-2.5"
                    >
                      <AlertTriangle
                        size={15}
                        className="text-amber-500 shrink-0 mt-0.5"
                      />
                      <span>{issue}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/85 dark:bg-zinc-900/75 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm">
                <h2 className="font-exo-medium text-base font-bold text-[#27003B] dark:text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-emerald-500" />
                  {t("websiteAuditorPage.passedAuditChecks")} (
                  {report.passedChecks?.length || 0})
                </h2>
                <div className="space-y-2.5">
                  {report.passedChecks?.map((chk, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 flex items-start gap-2.5"
                    >
                      <CheckCircle2
                        size={15}
                        className="text-emerald-500 shrink-0 mt-0.5"
                      />
                      <span>{chk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Metadata Overview */}
            <div className="bg-white/85 dark:bg-zinc-900/75 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h2 className="font-exo-medium text-base font-bold text-[#27003B] dark:text-white flex items-center gap-2">
                  <Sparkles size={16} className="text-violet-500" />
                  {t("websiteAuditorPage.metaOverview")}
                </h2>
                <button
                  type="button"
                  onClick={handleDownloadReport}
                  className="px-4 py-2 rounded-xl border border-violet-500/40 bg-violet-500/10 text-violet-700 dark:text-violet-300 text-xs font-bold flex items-center gap-1.5 self-start"
                >
                  <Download size={14} />
                  {t("websiteAuditorPage.downloadReportBtn")}
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                  <div className="text-zinc-400 text-xs mb-1">
                    {t("websiteAuditorPage.metaTitle")}
                  </div>
                  <div className="font-semibold text-zinc-800 dark:text-zinc-100">
                    {report.meta?.title || "—"}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                  <div className="text-zinc-400 text-xs mb-1">
                    {t("websiteAuditorPage.metaDescription")}
                  </div>
                  <div className="font-semibold text-zinc-800 dark:text-zinc-100">
                    {report.meta?.description || "—"}
                  </div>
                </div>
              </div>
            </div>

            {/* Agency CTA Banner */}
            <div className="bg-gradient-to-r from-violet-600/15 via-fuchsia-500/15 to-cyan-500/15 border border-violet-500/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-exo-medium text-lg sm:text-xl font-extrabold text-[#27003B] dark:text-white">
                  {t("websiteAuditorPage.ctaTitle")}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-exo-extralight mt-1 max-w-xl">
                  {t("websiteAuditorPage.ctaDesc")}
                </p>
              </div>
              <Link
                href="/cost-calculator"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md hover:scale-[1.02] transition-all flex items-center gap-2 shrink-0"
              >
                {t("websiteAuditorPage.ctaButton")}
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
