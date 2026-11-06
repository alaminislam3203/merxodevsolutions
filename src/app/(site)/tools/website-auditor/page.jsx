"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiCheckCircle,
  FiAlertCircle,
  FiZap,
  FiGlobe,
  FiArrowLeft,
  FiArrowRight,
  FiShield,
} from "react-icons/fi";

export default function WebsiteAuditorPage() {
  const [urlInput, setUrlInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  const handleAudit = async (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setLoading(true);
    setError("");
    setReport(null);
    try {
      const res = await fetch("/api/tools/website-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not audit website");
      } else {
        setReport(data);
      }
    } catch {
      setError("Network error while auditing website");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#060914] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white mb-6"
        >
          <FiArrowLeft /> Back to All Developer Tools
        </Link>

        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 mb-4">
            <FiZap /> Free Live Website SEO &amp; Speed Auditor
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Instant Website{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              SEO &amp; Speed Audit
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Enter any website URL to analyze Server Response Time (TTFB), HTTPS security, Title &amp; Meta tags, Heading hierarchy, OpenGraph social cards, and Schema structured data.
          </p>
        </div>

        <form
          onSubmit={handleAudit}
          className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-10"
        >
          <div className="relative flex-1">
            <FiGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <input
              type="text"
              required
              placeholder="https://yourwebsite.com"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full pl-11 pr-4 py-4 rounded-2xl bg-slate-900/90 border border-white/15 text-sm text-white focus:border-emerald-400 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-emerald-500 to-cyan-600 hover:opacity-95 transition-all cursor-pointer"
          >
            {loading ? "Scanning Site..." : "Run Free Audit"}
          </button>
        </form>

        {error && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-center text-sm mb-8">
            {error}
          </div>
        )}

        {report && (
          <div className="space-y-6">
            {/* Overall Score Card */}
            <div className="rounded-3xl bg-slate-900/80 border border-white/15 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-1">
                  Audit Results for {report.hostname}
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-1">
                  {report.title || report.url}
                </h2>
                <p className="text-xs text-slate-400">
                  Response Time: <strong className="text-emerald-400">{report.responseTimeMs} ms</strong> • HTTP Status: <strong>{report.statusCode}</strong>
                </p>
              </div>

              <div className="flex flex-col items-center justify-center w-28 h-28 rounded-full border-4 border-emerald-400/70 bg-slate-950 shrink-0">
                <span className="text-3xl font-black text-white">
                  {report.score}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                  / 100 Score
                </span>
              </div>
            </div>

            {/* Detailed Checklist */}
            <div className="rounded-3xl bg-slate-900/80 border border-white/15 p-6 sm:p-8 space-y-3">
              <h3 className="text-base font-bold text-white mb-3">
                10-Point Technical SEO &amp; Performance Breakdown
              </h3>
              {(report.checks || []).map((chk) => (
                <div
                  key={chk.label}
                  className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-slate-950/70 border border-white/10"
                >
                  <div className="flex items-start gap-3">
                    {chk.passed ? (
                      <FiCheckCircle className="text-emerald-400 text-lg mt-0.5 shrink-0" />
                    ) : (
                      <FiAlertCircle className="text-amber-400 text-lg mt-0.5 shrink-0" />
                    )}
                    <div>
                      <div className="text-sm font-bold text-white">
                        {chk.label}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {chk.detail}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      chk.passed
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-amber-500/15 text-amber-300"
                    }`}
                  >
                    {chk.passed ? "PASSED" : "IMPROVE"}
                  </span>
                </div>
              ))}
            </div>

            {/* Agency CTA */}
            <div className="rounded-3xl bg-gradient-to-r from-orange-500/15 via-purple-600/15 to-cyan-500/15 border border-purple-500/30 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div>
                <h3 className="text-lg font-extrabold text-white mb-1">
                  Want a 99+ Google PageSpeed &amp; #1 SEO Ranking?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Our Next.js engineers at MerxoDev Solutions can fix all technical SEO bottlenecks and supercharge your site within 48 hours.
                </p>
              </div>
              <Link
                href="/cost-calculator"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 text-white text-xs font-bold shrink-0 inline-flex items-center gap-2"
              >
                Fix My Website Now <FiArrowRight />
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

