"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import "@/components/i18n";
import {
  FiLink,
  FiCopy,
  FiCheck,
  FiDownload,
  FiRefreshCw,
  FiTrash2,
  FiArrowLeft,
  FiLock,
  FiCheckCircle,
  FiAlertCircle,
  FiCode,
  FiGlobe,
} from "react-icons/fi";

const SAMPLE_URL =
  "https://merxodevsolutions.pro.bd/search?category=web & saas&query=বাংলা ফ্রন্টএন্ড&ref=facebook&utm_source=social #preview";

export default function UrlEncoderClient() {
  const { t } = useTranslation();
  const [inputVal, setInputVal] = useState(SAMPLE_URL);
  const [mode, setMode] = useState("encode"); // 'encode' | 'decode'
  const [scope, setScope] = useState("component"); // 'component' (encodeURIComponent) | 'full' (encodeURI)
  const [copied, setCopied] = useState(false);

  // Conversion logic
  const outputResult = useMemo(() => {
    if (!inputVal.trim()) return { success: true, result: "", error: null };
    try {
      if (mode === "encode") {
        const encoded =
          scope === "component"
            ? encodeURIComponent(inputVal)
            : encodeURI(inputVal);
        return { success: true, result: encoded, error: null };
      } else {
        const decoded =
          scope === "component"
            ? decodeURIComponent(inputVal)
            : decodeURI(inputVal);
        return { success: true, result: decoded, error: null };
      }
    } catch {
      return {
        success: false,
        result: "",
        error: "Malformed URI sequence. Check percent-encoded sequences.",
      };
    }
  }, [inputVal, mode, scope]);

  const handleCopy = () => {
    if (!outputResult.result) return;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(outputResult.result).then(() => {
        setCopied(true);
        toast.success(t("devTools.common.copiedToClipboard"));
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleDownload = () => {
    if (!outputResult.result) return;
    const blob = new Blob([outputResult.result], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = mode === "encode" ? "url_encoded.txt" : "url_decoded.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(t("devTools.common.download"));
  };

  return (
    <div className="min-h-screen pb-24 overflow-hidden pt-4 sm:pt-6 mt-8">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #3b82f6, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, #8b5cf6, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="pt-16 flex items-center gap-2 text-xs font-exo-extralight text-zinc-400 dark:text-zinc-600"
        >
          <Link
            href="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {t("devTools.common.home")}
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <Link
            href="/tools"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {t("devTools.common.tools")}
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="text-zinc-700 dark:text-zinc-300 font-semibold">
            {t("devTools.urlEncoder.titleStart")}{" "}
            {t("devTools.urlEncoder.titleHighlight")}
          </span>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 font-exo-extralight uppercase tracking-widest">
                <FiLink className="w-3.5 h-3.5" />
                {t("devTools.common.formattersConverters")}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                <FiLock className="w-3 h-3 text-emerald-500" />
                {t("devTools.common.clientSidePrivacy")}
              </span>
            </div>

            <h1 className="font-exo-medium text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-tight">
              {t("devTools.urlEncoder.titleStart")}{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
                {t("devTools.urlEncoder.titleHighlight")}
              </span>
            </h1>
            <p className="max-w-xl text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1.5 font-exo-extralight">
              {t("devTools.urlEncoder.subtitle")}
            </p>
          </div>

          <Link
            href="/tools"
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 text-xs font-bold uppercase tracking-wider font-exo-extralight transition-all shadow-sm"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            {t("devTools.common.allTools")}
          </Link>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 mb-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Mode switch */}
            <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <button
                onClick={() => setMode("encode")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-exo-extralight uppercase transition-all ${
                  mode === "encode"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {t("devTools.urlEncoder.encodeMode")}
              </button>
              <button
                onClick={() => setMode("decode")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-exo-extralight uppercase transition-all ${
                  mode === "decode"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {t("devTools.urlEncoder.decodeMode")}
              </button>
            </div>

            {/* Scope: Component vs Full */}
            <div className="flex items-center gap-1.5 text-xs font-exo-extralight text-zinc-600 dark:text-zinc-300 pl-2 border-l border-zinc-200 dark:border-zinc-800">
              <span className="text-zinc-400 hidden sm:inline">
                {t("devTools.urlEncoder.method")}
              </span>
              <select
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-zinc-700 dark:text-zinc-200 font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="component">
                  {t("devTools.urlEncoder.optComponent")}
                </option>
                <option value="full">{t("devTools.urlEncoder.optFull")}</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setInputVal(SAMPLE_URL)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold font-exo-extralight transition-all"
            >
              <FiRefreshCw className="w-3.5 h-3.5" />
              {t("devTools.common.loadSample")}
            </button>

            <button
              onClick={() => setInputVal("")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold font-exo-extralight transition-all"
            >
              <FiTrash2 className="w-3.5 h-3.5" />
              {t("devTools.common.clear")}
            </button>
          </div>
        </div>

        {/* Error banner */}
        {outputResult.error && (
          <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs">
            <FiAlertCircle className="w-4 h-4 shrink-0" />
            <span>{outputResult.error}</span>
          </div>
        )}

        {/* Side-by-side Input & Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-bold uppercase tracking-wider font-exo-extralight text-zinc-700 dark:text-zinc-200">
                {mode === "encode"
                  ? t("devTools.urlEncoder.rawInput")
                  : t("devTools.urlEncoder.encodedInput")}
              </span>
              <span className="text-[11px] text-zinc-400 font-mono">
                {inputVal.length} {t("devTools.common.chars")}
              </span>
            </div>
            <div className="p-4 flex-1 min-h-[380px]">
              <textarea
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={
                  mode === "encode"
                    ? t("devTools.urlEncoder.rawPlaceholder")
                    : t("devTools.urlEncoder.encodedPlaceholder")
                }
                className="w-full h-full min-h-[360px] font-mono text-xs text-zinc-900 dark:text-zinc-100 bg-transparent resize-y focus:outline-none placeholder-zinc-400 leading-relaxed"
              />
            </div>
          </div>

          {/* Output */}
          <div className="flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-bold uppercase tracking-wider font-exo-extralight text-zinc-700 dark:text-zinc-200">
                {mode === "encode"
                  ? t("devTools.urlEncoder.encodedOutput")
                  : t("devTools.urlEncoder.decodedOutput")}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopy}
                  disabled={!outputResult.result}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold transition-all disabled:opacity-40"
                >
                  {copied ? (
                    <FiCheck className="text-emerald-400" />
                  ) : (
                    <FiCopy />
                  )}
                  <span>
                    {copied
                      ? t("devTools.common.copied")
                      : t("devTools.common.copy")}
                  </span>
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!outputResult.result}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold transition-all disabled:opacity-40"
                >
                  <FiDownload />
                  <span className="hidden sm:inline">
                    {t("devTools.common.save")}
                  </span>
                </button>
              </div>
            </div>

            <div className="p-4 flex-1 min-h-[380px] bg-zinc-950 font-mono text-xs text-blue-200">
              <pre className="whitespace-pre-wrap break-all leading-relaxed">
                {outputResult.result || (
                  <span className="text-zinc-600 font-sans italic">
                    {t("devTools.urlEncoder.outputPlaceholder")}
                  </span>
                )}
              </pre>
            </div>
          </div>
        </div>

        {/* Informational Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
              <FiGlobe className="w-5 h-5" />
            </div>
            <h3 className="font-exo-medium text-lg font-bold text-zinc-900 dark:text-white mb-2">
              {t("devTools.urlEncoder.card1Title")}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight leading-relaxed">
              {t("devTools.urlEncoder.card1Desc")}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-4">
              <FiCode className="w-5 h-5" />
            </div>
            <h3 className="font-exo-medium text-lg font-bold text-zinc-900 dark:text-white mb-2">
              {t("devTools.urlEncoder.card2Title")}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight leading-relaxed">
              {t("devTools.urlEncoder.card2Desc")}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
              <FiCheckCircle className="w-5 h-5" />
            </div>
            <h3 className="font-exo-medium text-lg font-bold text-zinc-900 dark:text-white mb-2">
              {t("devTools.urlEncoder.card3Title")}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight leading-relaxed">
              {t("devTools.urlEncoder.card3Desc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
