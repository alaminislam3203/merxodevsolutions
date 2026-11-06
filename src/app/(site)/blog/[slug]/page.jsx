"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiClock,
  FiUser,
  FiSliders,
  FiArrowRight,
} from "react-icons/fi";

export default function BlogArticlePage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams?.slug;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/blog?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((d) => setPost(d.post || null))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#060914] text-white pt-32 pb-24 px-4 text-center">
        <p className="text-slate-400 text-sm">Loading article...</p>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-[#060914] text-white pt-32 pb-24 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <Link href="/blog" className="text-orange-400 font-bold text-sm">
          ← Back to Blog
        </Link>
      </main>
    );
  }

  const paragraphs = String(post.content || "").split(/\n\n+/);

  return (
    <main className="min-h-screen bg-[#060914] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white mb-6"
        >
          <FiArrowLeft /> Back to All Articles
        </Link>

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-orange-500/15 text-orange-400 text-xs font-bold">
              {post.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <FiClock /> {post.readTime}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <FiUser /> {post.authorName} ({post.authorRole})
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <div className="rounded-3xl bg-slate-900/75 border border-white/10 p-6 sm:p-10 space-y-5 text-slate-200 leading-relaxed text-sm sm:text-base">
          {paragraphs.map((para, idx) => {
            if (para.startsWith("### ")) {
              return (
                <h2
                  key={idx}
                  className="text-lg sm:text-xl font-extrabold text-orange-400 pt-2"
                >
                  {para.replace("### ", "")}
                </h2>
              );
            }
            return (
              <p key={idx} className="whitespace-pre-line">
                {para}
              </p>
            );
          })}
        </div>

        <div className="mt-10 rounded-3xl bg-gradient-to-r from-orange-500/15 via-purple-600/15 to-cyan-500/15 border border-purple-500/30 p-7 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <h3 className="text-lg font-extrabold text-white mb-1">
              Ready to Build Your Next Digital Product?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Calculate your exact project budget in 30 seconds or schedule a free 15-minute Google Meet discovery call.
            </p>
          </div>
          <Link
            href="/cost-calculator"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 text-white text-xs font-bold inline-flex items-center gap-2 shrink-0"
          >
            <FiSliders /> Calculate Project Cost <FiArrowRight />
          </Link>
        </div>
      </article>
    </main>
  );
}
