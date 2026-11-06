"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import "@/components/i18n";
import {
  FiKey,
  FiCopy,
  FiCheck,
  FiClock,
  FiShield,
  FiAlertCircle,
  FiCheckCircle,
  FiArrowLeft,
  FiRefreshCw,
  FiTrash2,
  FiLock,
  FiCode,
  FiUser,
  FiCalendar,
  FiActivity,
} from "react-icons/fi";

// Safe Base64URL decoder with UTF-8 support
function base64UrlDecode(str) {
  try {
    let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

// Deterministic sample tokens for SSR consistency
function getSampleTokens(nowTime = 1776518400) {
  const header = { alg: "HS256", typ: "JWT" };
  const headerB64 = btoa(JSON.stringify(header))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  // Active token (valid for 30 days)
  const activePayload = {
    sub: "usr_8492049102",
    name: "Al Amin",
    email: "developer@merxodevsolutions.pro.bd",
    role: "super_admin",
    iss: "https://auth.merxodevsolutions.pro.bd",
    aud: "merxodev-api-gateway",
    iat: nowTime - 3600,
    nbf: nowTime - 3600,
    exp: nowTime + 86400 * 30,
  };
  const activePayloadB64 = btoa(JSON.stringify(activePayload))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  const activeSig = "c4dE_39FkL78w0_sample_signature_abc123";

  // Expired token (expired 2 days ago)
  const expiredPayload = {
    sub: "usr_old_5829104",
    name: "Test Visitor",
    email: "guest@example.com",
    role: "tester",
    iss: "https://auth.example.com",
    iat: nowTime - 259200,
    exp: nowTime - 172800,
  };
  const expiredPayloadB64 = btoa(JSON.stringify(expiredPayload))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return {
    active: `${headerB64}.${activePayloadB64}.${activeSig}`,
    expired: `${headerB64}.${expiredPayloadB64}.${activeSig}`,
  };
}

const STATIC_SAMPLES = getSampleTokens();

export default function JwtDecoderClient() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [tokenInput, setTokenInput] = useState(STATIC_SAMPLES.active);
  const [copiedPart, setCopiedPart] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const loadSample = (type) => {
    const currentNow = Math.floor(Date.now() / 1000);
    const dynamicSamples = getSampleTokens(currentNow);
    setTokenInput(dynamicSamples[type]);
  };

  // Decode JWT into parts
  const decodedResult = useMemo(() => {
    const raw = tokenInput.trim();
    if (!raw) {
      return {
        isValid: null,
        header: null,
        payload: null,
        signature: null,
        error: null,
      };
    }

    const parts = raw.split(".");
    if (parts.length !== 3) {
      return {
        isValid: false,
        error: `A valid JWT must have 3 dot-separated parts (Header.Payload.Signature). Found ${parts.length} part(s).`,
        header: null,
        payload: null,
        signature: null,
      };
    }

    const [rawHeader, rawPayload, signature] = parts;
    const decodedHeaderStr = base64UrlDecode(rawHeader);
    const decodedPayloadStr = base64UrlDecode(rawPayload);

    if (!decodedHeaderStr) {
      return {
        isValid: false,
        error: "Invalid Base64Url encoding in JWT Header.",
        header: null,
        payload: null,
      };
    }
    if (!decodedPayloadStr) {
      return {
        isValid: false,
        error: "Invalid Base64Url encoding in JWT Payload.",
        header: null,
        payload: null,
      };
    }

    let headerObj, payloadObj;
    try {
      headerObj = JSON.parse(decodedHeaderStr);
    } catch {
      return {
        isValid: false,
        error: "JWT Header is not valid JSON.",
        header: null,
        payload: null,
      };
    }

    try {
      payloadObj = JSON.parse(decodedPayloadStr);
    } catch {
      return {
        isValid: false,
        error: "JWT Payload is not valid JSON.",
        header: null,
        payload: null,
      };
    }

    // Parse Expiration Status
    let expStatus = null;
    if (payloadObj && typeof payloadObj.exp === "number") {
      const now = mounted ? Math.floor(Date.now() / 1000) : 1776518400;
      const diff = payloadObj.exp - now;
      const expDate = new Date(payloadObj.exp * 1000);

      if (diff > 0) {
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        expStatus = {
          isExpired: false,
          label: t("devTools.jwtDecoder.activeValid"),
          timeRemaining: `${hours}h ${minutes}m ${t("devTools.jwtDecoder.remaining")}`,
          humanDate: mounted ? expDate.toLocaleString() : expDate.toUTCString(),
          utcDate: expDate.toUTCString(),
        };
      } else {
        const absDiff = Math.abs(diff);
        const hours = Math.floor(absDiff / 3600);
        const minutes = Math.floor((absDiff % 3600) / 60);
        expStatus = {
          isExpired: true,
          label: t("devTools.jwtDecoder.expiredTokenLabel"),
          timeRemaining: `${hours}h ${minutes}m ${t("devTools.jwtDecoder.ago")}`,
          humanDate: mounted ? expDate.toLocaleString() : expDate.toUTCString(),
          utcDate: expDate.toUTCString(),
        };
      }
    }

    // Issued At (iat)
    let iatDate = null;
    if (payloadObj && typeof payloadObj.iat === "number") {
      const iatObj = new Date(payloadObj.iat * 1000);
      iatDate = mounted ? iatObj.toLocaleString() : iatObj.toUTCString();
    }

    return {
      isValid: true,
      error: null,
      rawHeader,
      rawPayload,
      signature,
      header: headerObj,
      payload: payloadObj,
      headerFormatted: JSON.stringify(headerObj, null, 2),
      payloadFormatted: JSON.stringify(payloadObj, null, 2),
      expStatus,
      iatDate,
    };
  }, [tokenInput, mounted, t]);

  const handleCopy = (text, partName) => {
    if (!text) return;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedPart(partName);
        toast.success(t("devTools.common.copiedToClipboard"));
        setTimeout(() => setCopiedPart(null), 2000);
      });
    }
  };

  return (
    <div className="min-h-screen pb-24 overflow-hidden pt-4 sm:pt-6 mt-8">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #10b981, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, #7c3aed, transparent 70%)",
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
            className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
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
            className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
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
            {t("devTools.jwtDecoder.titleStart")}{" "}
            {t("devTools.jwtDecoder.titleHighlight")}
          </span>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-exo-extralight uppercase tracking-widest">
                <FiKey className="w-3.5 h-3.5" />
                {t("devTools.common.securityAuth")}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                <FiLock className="w-3 h-3 text-emerald-500" />
                {t("devTools.common.clientSideNoLogs")}
              </span>
            </div>

            <h1 className="font-exo-medium text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-tight">
              {t("devTools.jwtDecoder.titleStart")}{" "}
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                {t("devTools.jwtDecoder.titleHighlight")}
              </span>
            </h1>
            <p className="max-w-xl text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1.5 font-exo-extralight">
              {t("devTools.jwtDecoder.subtitle")}
            </p>
          </div>

          <Link
            href="/tools"
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-400 text-xs font-bold uppercase tracking-wider font-exo-extralight transition-all shadow-sm"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            {t("devTools.common.allTools")}
          </Link>
        </div>

        {/* Quick Sample Selector Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 mb-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-exo-extralight font-semibold text-zinc-600 dark:text-zinc-300">
            <span>{t("devTools.jwtDecoder.testWithSamples")}</span>
            <button
              onClick={() => loadSample("active")}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition-all border border-emerald-200 dark:border-emerald-800"
            >
              {t("devTools.jwtDecoder.activeToken")}
            </button>
            <button
              onClick={() => loadSample("expired")}
              className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold transition-all border border-rose-200 dark:border-rose-800"
            >
              {t("devTools.jwtDecoder.expiredToken")}
            </button>
          </div>

          <button
            onClick={() => setTokenInput("")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-rose-50 dark:bg-zinc-800 dark:hover:bg-rose-950/40 text-zinc-600 hover:text-rose-600 dark:text-zinc-300 text-xs font-bold font-exo-extralight transition-all"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
            {t("devTools.common.clear")}
          </button>
        </div>

        {/* Expiration & Token Status Banner */}
        {decodedResult.isValid && decodedResult.expStatus && (
          <div
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 mb-6 rounded-2xl border ${
              decodedResult.expStatus.isExpired
                ? "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/80 text-rose-900 dark:text-rose-200"
                : "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  decodedResult.expStatus.isExpired
                    ? "bg-rose-200/70 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300"
                    : "bg-emerald-200/70 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300"
                }`}
              >
                <FiClock className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    suppressHydrationWarning
                    className="font-bold text-sm font-exo-extralight"
                  >
                    {decodedResult.expStatus.label}
                  </span>
                  <span
                    suppressHydrationWarning
                    className="text-xs px-2 py-0.5 rounded-full font-mono font-semibold bg-white/70 dark:bg-black/40"
                  >
                    {decodedResult.expStatus.timeRemaining}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 font-exo-extralight">
                  {t("devTools.jwtDecoder.expiresOn")}{" "}
                  <span suppressHydrationWarning className="font-semibold">
                    {decodedResult.expStatus.humanDate}
                  </span>{" "}
                  (
                  <span suppressHydrationWarning>
                    {decodedResult.expStatus.utcDate}
                  </span>
                  )
                </p>
              </div>
            </div>

            {decodedResult.iatDate && (
              <div className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight sm:text-right">
                <span>{t("devTools.jwtDecoder.issuedAt")}</span>
                <div
                  suppressHydrationWarning
                  className="font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  {decodedResult.iatDate}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error Banner */}
        {decodedResult.isValid === false && (
          <div className="flex items-start gap-2.5 px-4 py-3 mb-6 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 text-rose-800 dark:text-rose-300 text-xs">
            <FiAlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold block mb-0.5">
                {t("devTools.jwtDecoder.invalidFormat")}
              </span>
              <p className="font-exo-extralight text-zinc-600 dark:text-zinc-400">
                {decodedResult.error}
              </p>
            </div>
          </div>
        )}

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Raw Encoded Token Input (5 cols) */}
          <div className="lg:col-span-5 flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <FiKey className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-wider font-exo-extralight text-zinc-700 dark:text-zinc-200">
                  {t("devTools.jwtDecoder.encodedToken")}
                </span>
              </div>
              <button
                onClick={() => handleCopy(tokenInput, "Encoded Token")}
                disabled={!tokenInput}
                className="text-[11px] font-semibold text-zinc-500 hover:text-emerald-600 flex items-center gap-1 transition-colors"
              >
                {copiedPart === "Encoded Token" ? (
                  <FiCheck className="text-emerald-500" />
                ) : (
                  <FiCopy />
                )}
                {t("devTools.jwtDecoder.copyToken")}
              </button>
            </div>

            <div className="relative flex-1 p-4 min-h-[440px]">
              <textarea
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder={t("devTools.jwtDecoder.placeholder")}
                spellCheck={false}
                className="w-full h-full min-h-[420px] font-mono text-xs text-zinc-900 dark:text-zinc-100 bg-transparent resize-y focus:outline-none placeholder-zinc-400 break-all leading-relaxed"
              />
            </div>

            {/* Token segment legend */}
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center gap-3 text-[11px] font-mono">
              <span className="flex items-center gap-1.5 text-rose-500">
                <span className="w-2 h-2 rounded-full bg-rose-500" />{" "}
                {t("devTools.jwtDecoder.legendHeader")}
              </span>
              <span className="flex items-center gap-1.5 text-violet-500">
                <span className="w-2 h-2 rounded-full bg-violet-500" />{" "}
                {t("devTools.jwtDecoder.legendPayload")}
              </span>
              <span className="flex items-center gap-1.5 text-cyan-500">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />{" "}
                {t("devTools.jwtDecoder.legendSignature")}
              </span>
            </div>
          </div>

          {/* RIGHT: Decoded Inspector (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* 1. Header Box */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-4 py-3 bg-rose-50/50 dark:bg-rose-950/20 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="text-xs font-bold uppercase tracking-wider font-exo-extralight text-rose-600 dark:text-rose-400">
                    {t("devTools.jwtDecoder.headerTitle")}
                  </span>
                </div>
                <button
                  onClick={() =>
                    handleCopy(decodedResult.headerFormatted, "Header JSON")
                  }
                  disabled={!decodedResult.headerFormatted}
                  className="text-[11px] font-semibold text-zinc-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
                >
                  {copiedPart === "Header JSON" ? (
                    <FiCheck className="text-emerald-500" />
                  ) : (
                    <FiCopy />
                  )}
                  {t("devTools.jwtDecoder.copyHeader")}
                </button>
              </div>

              <div className="p-4 bg-zinc-950 font-mono text-xs text-rose-300">
                <pre className="whitespace-pre overflow-x-auto">
                  {decodedResult.headerFormatted || (
                    <span className="text-zinc-600 font-sans italic">
                      {t("devTools.jwtDecoder.headerPlaceholder")}
                    </span>
                  )}
                </pre>
              </div>
            </div>

            {/* 2. Payload Claims Box */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-4 py-3 bg-violet-50/50 dark:bg-violet-950/20 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                  <span className="text-xs font-bold uppercase tracking-wider font-exo-extralight text-violet-600 dark:text-violet-400">
                    {t("devTools.jwtDecoder.payloadTitle")}
                  </span>
                </div>
                <button
                  onClick={() =>
                    handleCopy(decodedResult.payloadFormatted, "Payload JSON")
                  }
                  disabled={!decodedResult.payloadFormatted}
                  className="text-[11px] font-semibold text-zinc-500 hover:text-violet-600 flex items-center gap-1 transition-colors"
                >
                  {copiedPart === "Payload JSON" ? (
                    <FiCheck className="text-emerald-500" />
                  ) : (
                    <FiCopy />
                  )}
                  {t("devTools.jwtDecoder.copyPayload")}
                </button>
              </div>

              <div className="p-4 bg-zinc-950 font-mono text-xs text-violet-200">
                <pre className="whitespace-pre overflow-x-auto leading-relaxed">
                  {decodedResult.payloadFormatted || (
                    <span className="text-zinc-600 font-sans italic">
                      {t("devTools.jwtDecoder.payloadPlaceholder")}
                    </span>
                  )}
                </pre>
              </div>
            </div>

            {/* 3. Signature & Verification Banner */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-50 dark:bg-cyan-950 flex items-center justify-center text-cyan-600 shrink-0">
                <FiShield className="w-4 h-4" />
              </div>
              <div className="text-xs font-exo-extralight flex-1">
                <span className="font-bold text-zinc-800 dark:text-zinc-200 block mb-0.5">
                  {t("devTools.jwtDecoder.sigTitle")}
                </span>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {t("devTools.jwtDecoder.sigDesc")}
                </p>
                {decodedResult.signature && (
                  <div className="mt-2 font-mono text-[11px] text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-200 dark:border-cyan-800/60 break-all">
                    {t("devTools.jwtDecoder.sigLabel")}{" "}
                    {decodedResult.signature}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Information Highlights Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
              <FiLock className="w-5 h-5" />
            </div>
            <h3 className="font-exo-medium text-lg font-bold text-zinc-900 dark:text-white mb-2">
              {t("devTools.jwtDecoder.card1Title")}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight leading-relaxed">
              {t("devTools.jwtDecoder.card1Desc")}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-4">
              <FiClock className="w-5 h-5" />
            </div>
            <h3 className="font-exo-medium text-lg font-bold text-zinc-900 dark:text-white mb-2">
              {t("devTools.jwtDecoder.card2Title")}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight leading-relaxed">
              {t("devTools.jwtDecoder.card2Desc")}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-4">
              <FiShield className="w-5 h-5" />
            </div>
            <h3 className="font-exo-medium text-lg font-bold text-zinc-900 dark:text-white mb-2">
              {t("devTools.jwtDecoder.card3Title")}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight leading-relaxed">
              {t("devTools.jwtDecoder.card3Desc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
