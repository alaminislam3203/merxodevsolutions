"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiBookOpen,
  FiClock,
  FiEye,
  FiArrowRight,
  FiSliders,
  FiTag,
} from "react-icons/fi";

export default function BlogIndexPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((d) => setPosts(d.posts || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean))),
  ];

  const filtered =
    selectedCategory === "All"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#060914] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 mb-4">
            <FiBookOpen /> MerxoDev Engineering Insights &amp; Guides
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Web Engineering, SEO &amp;{" "}
            <span className="bg-gradient-to-r from-orange-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Digital Growth Blog
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Practical guides on Next.js 16 architecture, Bangladeshi payment gateways (bKash/SSLCommerz), website pricing, and scaling SaaS products.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-orange-500 to-purple-600 text-white"
                  : "bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400 text-sm">
            Loading articles...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {filtered.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-3xl bg-slate-900/75 border border-white/10 hover:border-purple-500/50 p-6 flex flex-col justify-between transition-all hover:-translate-y-1 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 text-[11px] font-bold">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <FiClock /> {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg font-extrabold text-white group-hover:text-orange-400 transition-colors mb-3 leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-5">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs">
                  <span className="text-slate-400 font-medium">
                    By {post.authorName}
                  </span>
                  <span className="inline-flex items-center gap-1 font-bold text-orange-400 group-hover:translate-x-1 transition-transform">
                    Read Article <FiArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-14 rounded-3xl bg-slate-900/80 border border-white/15 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-extrabold text-white mb-1">
              Planning a New Website or E-Commerce Project?
            </h3>
            <p className="text-sm text-slate-400">
              Use our interactive calculator to get an instant cost &amp; delivery estimate in 30 seconds.
            </p>
          </div>
          <Link
            href="/cost-calculator"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 text-white text-xs font-bold inline-flex items-center gap-2 shrink-0"
          >
            <FiSliders /> Open Cost Calculator
          </Link>
        </div>
      </div>
    </main>
  );
}

