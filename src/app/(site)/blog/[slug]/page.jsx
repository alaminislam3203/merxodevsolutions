"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import "@/components/i18n";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Check,
  Sparkles,
  Calculator,
  ChevronRight,
} from "lucide-react";

export default function BlogPostDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/blog?slug=${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data.post || null);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleCopyLink = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

      <div className="relative z-10 max-w-[950px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="pt-16 flex items-center gap-2 text-xs font-exo-extralight text-zinc-400 dark:text-zinc-600 mb-6">
          <Link href="/" className="hover:text-violet-500 transition-colors">
            {t("blogPage.breadcrumbHome", { defaultValue: "Home" })}
          </Link>
          <ChevronRight size={12} />
          <Link
            href="/blog"
            className="hover:text-violet-500 transition-colors"
          >
            {t("blogPage.breadcrumbCurrent", {
              defaultValue: "Engineering Blog",
            })}
          </Link>
          <ChevronRight size={12} />
          <span className="text-zinc-600 dark:text-zinc-400 truncate max-w-[200px]">
            {post?.title || slug}
          </span>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline mb-6"
        >
          <ArrowLeft size={14} />
          {t("blogPage.backToBlog")}
        </Link>

        {loading ? (
          <div className="h-96 rounded-2xl bg-white/60 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 animate-pulse" />
        ) : !post ? (
          <div className="p-12 text-center bg-white/80 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-500">
            {t("blogPage.noPostsFound")}
          </div>
        ) : (
          <article className="bg-white/85 dark:bg-zinc-900/75 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 sm:p-10 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                <Sparkles size={12} />
                {post.category}
              </span>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:border-violet-400 transition-all"
              >
                {copied ? (
                  <Check size={14} className="text-emerald-500" />
                ) : (
                  <Share2 size={14} />
                )}
                {copied ? t("blogPage.copiedLink") : t("blogPage.shareArticle")}
              </button>
            </div>

            <h1 className="font-exo-medium text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#27003B] dark:text-white leading-tight mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-8">
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                By {post.author || "MerxoDev Engineering Team"}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={13} />
                {new Date(post.publishedAt || Date.now()).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={13} />
                {post.readTime || "5"} {t("blogPage.readTimeUnit")}
              </span>
            </div>

            {/* Content paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-exo-extralight">
              {(post.content || post.excerpt || "")
                .split("\n\n")
                .map((block, idx) => {
                  const trimmed = block.trim();
                  if (trimmed.startsWith("## ")) {
                    return (
                      <h2
                        key={idx}
                        className="font-exo-medium text-lg sm:text-xl font-bold text-[#27003B] dark:text-white pt-4"
                      >
                        {trimmed.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (trimmed.startsWith("### ")) {
                    return (
                      <h3
                        key={idx}
                        className="font-exo-medium text-base sm:text-lg font-bold text-violet-600 dark:text-violet-400 pt-2"
                      >
                        {trimmed.replace("### ", "")}
                      </h3>
                    );
                  }
                  return <p key={idx}>{trimmed}</p>;
                })}
            </div>

            {/* Bottom CTA inside article */}
            <div className="mt-10 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-exo-medium text-base sm:text-lg font-bold text-[#27003B] dark:text-white">
                  {t("blogPage.ctaBoxTitle")}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  {t("blogPage.ctaBoxDesc")}
                </p>
              </div>
              <Link
                href="/cost-calculator"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md hover:scale-[1.02] transition-all flex items-center gap-2 shrink-0"
              >
                <Calculator size={15} />
                {t("blogPage.ctaCalculatorBtn")}
              </Link>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
