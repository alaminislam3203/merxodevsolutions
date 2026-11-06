"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import "@/components/i18n";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Share2,
  Check,
  Sparkles,
  Calculator,
  ChevronRight,
  Eye,
  Tag,
  MessageCircle,
  ExternalLink,
  Shield,
  Layers,
} from "lucide-react";

export default function BlogPostDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    Promise.all([
      fetch(`/api/blog?slug=${encodeURIComponent(slug)}`).then((res) =>
        res.json()
      ),
      fetch("/api/blog")
        .then((res) => res.json())
        .catch(() => ({ posts: [] })),
    ])
      .then(([detailData, allData]) => {
        const current = detailData?.post || null;
        setPost(current);

        const others = (allData?.posts || []).filter(
          (p) => p.slug !== slug && p.id !== current?.id
        );
        setRelatedPosts(others.slice(0, 3));
      })
      .catch((err) => console.error("Error fetching blog post:", err))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleCopyLink = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSocialShare = (platform) => {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post?.title || "MerxoDev Engineering Blog");

    let shareUrl = "";
    if (platform === "whatsapp") {
      shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
    } else if (platform === "linkedin") {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    } else if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  const parseTags = (tagStr) => {
    if (!tagStr) return [];
    if (Array.isArray(tagStr)) return tagStr;
    return tagStr
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
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

      {/* Main container matching the exact 1440px width of other pages */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Navigation */}
        <div className="pt-16 flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-exo-extralight text-zinc-400 dark:text-zinc-600">
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
            <span className="text-zinc-600 dark:text-zinc-400 truncate max-w-[220px] sm:max-w-[400px]">
              {post?.title || slug}
            </span>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold font-exo-extralight text-violet-600 dark:text-violet-400 hover:underline px-3.5 py-1.5 rounded-xl border border-violet-500/20 bg-violet-500/5 hover:bg-violet-500/10 transition-all"
          >
            <ArrowLeft size={14} />
            {t("blogPage.backToBlog", { defaultValue: "Back to All Articles" })}
          </Link>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="h-64 rounded-3xl bg-white/60 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 animate-pulse" />
              <div className="h-96 rounded-3xl bg-white/60 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 animate-pulse" />
            </div>
            <div className="lg:col-span-4 space-y-6">
              <div className="h-48 rounded-3xl bg-white/60 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 animate-pulse" />
              <div className="h-64 rounded-3xl bg-white/60 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 animate-pulse" />
            </div>
          </div>
        ) : !post ? (
          /* Not Found State */
          <div className="p-16 text-center bg-white/85 dark:bg-zinc-900/75 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl text-zinc-500 max-w-2xl mx-auto my-12 shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-violet-500/10 text-violet-600 flex items-center justify-center">
              <Sparkles size={28} />
            </div>
            <h2 className="font-exo-medium text-2xl font-bold text-[#27003B] dark:text-white mb-2">
              {t("blogPage.noPostsFound", {
                defaultValue: "Article not found",
              })}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-exo-extralight mb-6">
              The engineering article you are looking for does not exist or may have been updated.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 transition-all"
            >
              <ArrowLeft size={16} />
              {t("blogPage.backToBlog", { defaultValue: "Browse All Articles" })}
            </Link>
          </div>
        ) : (
          /* Loaded 2-Column Responsive Layout at 1440px */
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Full-featured Article (Span 8) */}
              <article className="lg:col-span-8 bg-white/85 dark:bg-zinc-900/75 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-lg">
                {/* Branded Cover Banner or Image */}
                {post.coverImage ? (
                  <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-8 border border-zinc-200/80 dark:border-zinc-800/80 shadow-inner">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                      priority
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="h-44 sm:h-52 bg-gradient-to-br from-violet-600/20 via-fuchsia-500/15 to-cyan-500/20 border border-violet-500/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between mb-8 relative overflow-hidden">
                    <div className="flex items-center justify-between gap-3 relative z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 dark:bg-zinc-900/90 text-violet-600 dark:text-violet-400 shadow-sm">
                        <Sparkles size={12} />
                        {post.category}
                      </span>
                      {post.views ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/80 dark:bg-zinc-900/80 text-zinc-500 dark:text-zinc-400">
                          <Eye size={12} />
                          {post.views} views
                        </span>
                      ) : null}
                    </div>

                    <div className="font-exo-medium text-lg sm:text-xl font-extrabold text-[#27003B] dark:text-white line-clamp-2">
                      {post.title}
                    </div>
                  </div>
                )}

                {/* Article Header & Category */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                    <Sparkles size={12} />
                    {post.category}
                  </span>

                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all bg-zinc-50/50 dark:bg-zinc-800/40"
                  >
                    {copied ? (
                      <Check size={14} className="text-emerald-500" />
                    ) : (
                      <Share2 size={14} />
                    )}
                    {copied
                      ? t("blogPage.copiedLink", { defaultValue: "Link Copied!" })
                      : t("blogPage.shareArticle", { defaultValue: "Share Article" })}
                  </button>
                </div>

                {/* Title */}
                <h1 className="font-exo-medium text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#27003B] dark:text-white leading-tight mb-6">
                  {post.title}
                </h1>

                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                      M
                    </div>
                    <div>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 block">
                        {post.authorName || post.author || "MerxoDev Engineering"}
                      </span>
                      <span className="text-[10px] text-zinc-400">
                        {post.authorRole || "Lead Architect & Engineering Team"}
                      </span>
                    </div>
                  </div>

                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-violet-500" />
                    {new Date(
                      post.publishedAt || post.createdAt || Date.now()
                    ).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Clock size={13} className="text-cyan-500" />
                    {post.readTime || "5"}{" "}
                    {t("blogPage.readTimeUnit", { defaultValue: "min read" })}
                  </span>

                  {post.views ? (
                    <span className="flex items-center gap-1.5">
                      <Eye size={13} className="text-amber-500" />
                      {post.views} views
                    </span>
                  ) : null}
                </div>

                {/* Content paragraphs */}
                <div className="space-y-5 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-exo-extralight">
                  {(post.content || post.excerpt || "")
                    .split("\n\n")
                    .map((block, idx) => {
                      const trimmed = block.trim();
                      if (trimmed.startsWith("## ")) {
                        return (
                          <h2
                            key={idx}
                            className="font-exo-medium text-xl sm:text-2xl font-bold text-[#27003B] dark:text-white pt-6 pb-1 border-b border-zinc-100 dark:border-zinc-800/60"
                          >
                            {trimmed.replace("## ", "")}
                          </h2>
                        );
                      }
                      if (trimmed.startsWith("### ")) {
                        return (
                          <h3
                            key={idx}
                            className="font-exo-medium text-lg sm:text-xl font-bold text-violet-600 dark:text-violet-400 pt-4"
                          >
                            {trimmed.replace("### ", "")}
                          </h3>
                        );
                      }
                      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                        const items = trimmed
                          .split("\n")
                          .map((line) => line.replace(/^[-*]\s*/, "").trim())
                          .filter(Boolean);
                        return (
                          <ul key={idx} className="space-y-2 pl-4 my-3">
                            {items.map((item, itemIdx) => (
                              <li
                                key={itemIdx}
                                className="flex items-start gap-2.5 text-zinc-700 dark:text-zinc-300"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      if (trimmed.startsWith("> ")) {
                        return (
                          <blockquote
                            key={idx}
                            className="border-l-4 border-violet-500 pl-4 py-2 italic text-zinc-600 dark:text-zinc-300 bg-violet-50/50 dark:bg-violet-950/20 rounded-r-xl my-4"
                          >
                            {trimmed.replace("> ", "")}
                          </blockquote>
                        );
                      }
                      return (
                        <p key={idx} className="leading-relaxed">
                          {trimmed}
                        </p>
                      );
                    })}
                </div>

                {/* Tags */}
                {post.tags && parseTags(post.tags).length > 0 && (
                  <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center flex-wrap gap-2">
                    <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5 mr-1">
                      <Tag size={13} />
                      Tags:
                    </span>
                    {parseTags(post.tags).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Bottom In-Article CTA */}
                <div className="mt-10 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-5 bg-gradient-to-r from-violet-50/60 to-cyan-50/40 dark:from-violet-950/30 dark:to-cyan-950/20 p-6 sm:p-8 rounded-2xl border border-violet-500/10">
                  <div>
                    <h3 className="font-exo-medium text-base sm:text-lg font-bold text-[#27003B] dark:text-white">
                      {t("blogPage.ctaBoxTitle", {
                        defaultValue: "Ready to Build Your Next Digital Product?",
                      })}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-exo-extralight max-w-md">
                      {t("blogPage.ctaBoxDesc", {
                        defaultValue:
                          "Use our interactive cost calculator or talk directly with our full-stack engineering team to launch your project.",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Link
                      href="/cost-calculator"
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shrink-0"
                    >
                      <Calculator size={15} />
                      {t("blogPage.ctaCalculatorBtn", {
                        defaultValue: "Calculate Cost",
                      })}
                    </Link>
                  </div>
                </div>
              </article>

              {/* Right Column: Sticky Sidebar (Span 4) */}
              <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                {/* Author & Publication Info Card */}
                <div className="bg-white/85 dark:bg-zinc-900/75 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-violet-500/20">
                      M
                    </div>
                    <div>
                      <h4 className="font-exo-medium text-sm font-bold text-[#27003B] dark:text-white">
                        {post.authorName || "MerxoDev Engineering"}
                      </h4>
                      <p className="text-xs text-violet-600 dark:text-violet-400 font-medium">
                        {post.authorRole || "Official Publication"}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-exo-extralight mb-5">
                    MerxoDev Solutions delivers high-performance Next.js web applications, custom SaaS platforms, payment gateways, and cloud architectures for ambitious global teams.
                  </p>
                  <div className="flex items-center gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                    <Link
                      href="/contact"
                      className="flex-1 py-2 rounded-xl text-center font-bold bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-300 border border-violet-200/80 dark:border-violet-800/80 hover:bg-violet-100 transition-colors"
                    >
                      Contact Team
                    </Link>
                    <a
                      href="https://wa.me/8801313334279"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors flex items-center gap-1.5"
                    >
                      <MessageCircle size={14} />
                      WhatsApp
                    </a>
                  </div>
                </div>

                {/* Social Share Card */}
                <div className="bg-white/85 dark:bg-zinc-900/75 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm">
                  <h4 className="font-exo-medium text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
                    {t("blogPage.shareArticle", { defaultValue: "Share Article" })}
                  </h4>
                  <div className="grid grid-cols-2 gap-2.5 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => handleSocialShare("whatsapp")}
                      className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all bg-zinc-50/50 dark:bg-zinc-800/30"
                    >
                      <MessageCircle size={14} className="text-emerald-500" />
                      WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSocialShare("linkedin")}
                      className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all bg-zinc-50/50 dark:bg-zinc-800/30"
                    >
                      <ExternalLink size={14} className="text-blue-500" />
                      LinkedIn
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSocialShare("twitter")}
                      className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition-all bg-zinc-50/50 dark:bg-zinc-800/30"
                    >
                      <ExternalLink size={14} className="text-sky-500" />
                      Twitter / X
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-all bg-zinc-50/50 dark:bg-zinc-800/30"
                    >
                      {copied ? (
                        <Check size={14} className="text-emerald-500" />
                      ) : (
                        <Share2 size={14} className="text-violet-500" />
                      )}
                      {copied ? "Copied" : "Copy URL"}
                    </button>
                  </div>
                </div>

                {/* Instant Cost Calculator Card */}
                <div className="bg-gradient-to-br from-violet-600/10 via-purple-600/5 to-cyan-500/10 border border-violet-500/30 rounded-3xl p-6 shadow-sm relative overflow-hidden">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-600 text-white mb-3">
                    <Sparkles size={11} />
                    Instant Estimate
                  </div>
                  <h4 className="font-exo-medium text-base font-bold text-[#27003B] dark:text-white mb-2">
                    How Much Will Your Website or App Cost?
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight mb-5">
                    Get an instant transparent estimate tailored to your exact tech requirements and features in under 60 seconds.
                  </p>
                  <Link
                    href="/cost-calculator"
                    className="block w-full py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md hover:scale-105 transition-all"
                  >
                    Launch Cost Calculator
                  </Link>
                </div>
              </aside>
            </div>

            {/* Bottom Section: Related Articles Across Full 1440px Width */}
            {relatedPosts.length > 0 && (
              <section className="pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="text-[11px] font-bold tracking-[0.2em] text-violet-600 dark:text-violet-400 uppercase font-exo-extralight block mb-1">
                      More Reading
                    </span>
                    <h2 className="font-exo-medium text-2xl sm:text-3xl font-extrabold text-[#27003B] dark:text-white">
                      Related Technical Articles
                    </h2>
                  </div>
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline"
                  >
                    <span>View All Articles</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((rPost) => (
                    <Link
                      key={rPost.id || rPost.slug}
                      href={`/blog/${rPost.slug}`}
                      className="group bg-white/85 dark:bg-zinc-900/75 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 hover:border-violet-500/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Branded Cover Banner */}
                        <div className="h-40 bg-gradient-to-br from-violet-600/20 via-fuchsia-500/15 to-cyan-500/20 border-b border-zinc-200/60 dark:border-zinc-800/60 p-5 flex flex-col justify-between relative overflow-hidden">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 dark:bg-zinc-900/90 text-violet-600 dark:text-violet-400 self-start shadow-sm">
                            <Sparkles size={10} />
                            {rPost.category}
                          </span>
                          <div className="font-exo-medium text-xs sm:text-sm font-extrabold text-[#27003B] dark:text-white line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                            {rPost.title}
                          </div>
                        </div>

                        <div className="p-5">
                          <div className="flex items-center gap-3 text-[11px] text-zinc-400 dark:text-zinc-500 mb-2">
                            <span className="flex items-center gap-1">
                              <Calendar size={11} />
                              {new Date(
                                rPost.publishedAt || rPost.createdAt || Date.now()
                              ).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={11} />
                              {rPost.readTime || "5 min read"}
                            </span>
                          </div>

                          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-exo-extralight line-clamp-2 leading-relaxed">
                            {rPost.excerpt || rPost.title}
                          </p>
                        </div>
                      </div>

                      <div className="px-5 pb-5 pt-1 flex items-center justify-between text-xs font-bold text-violet-600 dark:text-violet-400">
                        <span>Read Article</span>
                        <ArrowRight
                          size={14}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Bottom Project CTA Banner */}
            <div className="rounded-3xl border border-violet-500/30 bg-gradient-to-r from-violet-50/70 via-white to-cyan-50/70 dark:from-violet-950/40 dark:via-zinc-900/80 dark:to-cyan-950/30 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
              <div className="text-center sm:text-left space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-violet-600/10 text-violet-600 dark:text-violet-400 mb-1">
                  <Shield size={12} />
                  Enterprise Engineering Standards
                </div>
                <h3 className="font-exo-medium text-xl sm:text-2xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-wide">
                  Have a Project in Mind?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-exo-extralight max-w-xl">
                  Let’s collaborate to architect, design, and deploy your custom website, web application, or e-commerce platform with zero compromises.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg hover:scale-105 transition-all text-center"
                >
                  Start a Project
                </Link>
                <Link
                  href="/our-projects"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 text-zinc-800 dark:text-zinc-200 text-xs sm:text-sm font-bold uppercase tracking-wider hover:border-violet-500 transition-all text-center"
                >
                  View Case Studies
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
