"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiCheckCircle,
  FiClock,
  FiExternalLink,
  FiPrinter,
  FiShield,
  FiLayers,
} from "react-icons/fi";
import { downloadOfficialInvoice } from "@/lib/invoiceGenerator";

export default function TrackProjectPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `/api/track-project?q=${encodeURIComponent(query.trim())}`
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not find matching project");
        setProjects([]);
      } else {
        setProjects(data.projects || []);
      }
    } catch {
      setError("Network error while looking up project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#060914] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-purple-500/15 text-purple-300 border border-purple-500/30 mb-4">
            <FiLayers /> Real-Time Client Project Tracker
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Track Your{" "}
            <span className="bg-gradient-to-r from-orange-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Live Project Progress
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Enter your Project Tracking ID (e.g. <code className="text-orange-400">MD-XXXX</code>) or your registered email address to inspect real-time development milestones and download official invoices.
          </p>
        </div>

        {/* Search Box */}
        <form
          onSubmit={handleTrack}
          className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-12"
        >
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <input
              type="text"
              required
              placeholder="Enter Project ID (MD-1234) or Client Email..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-4 rounded-2xl bg-slate-900/90 border border-white/15 text-sm text-white focus:border-orange-500 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 to-purple-600 hover:opacity-95 transition-all cursor-pointer"
          >
            {loading ? "Searching..." : "Track Now"}
          </button>
        </form>

        {error && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-center text-sm mb-8">
            {error}
          </div>
        )}

        {Array.isArray(projects) && projects.length === 0 && !error && (
          <div className="p-8 rounded-2xl bg-slate-900/60 border border-white/10 text-center">
            <p className="text-slate-300 font-semibold mb-2">
              No active project found matching &ldquo;{query}&rdquo;
            </p>
            <p className="text-xs text-slate-400 mb-4">
              Double-check your Tracking ID from your confirmation email or start a new project inquiry below.
            </p>
            <Link
              href="/cost-calculator"
              className="inline-block px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold"
            >
              Calculate New Project Cost
            </Link>
          </div>
        )}

        {Array.isArray(projects) && projects.length > 0 && (
          <div className="space-y-6">
            {projects.map((proj) => {
              const m = proj.milestones || {};
              const milestonesList = [
                { label: "UI/UX Architecture & Wireframing", val: Number(m.uiDesign ?? 0) },
                { label: "Frontend Next.js Development", val: Number(m.frontend ?? 0) },
                { label: "Backend API & PostgreSQL Database", val: Number(m.backend ?? 0) },
                { label: "QA Testing & Production Deployment", val: Number(m.deployment ?? 0) },
              ];

              return (
                <div
                  key={proj.id}
                  className="rounded-3xl bg-slate-900/80 border border-white/15 p-6 sm:p-8 shadow-xl"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-mono text-xs font-bold">
                          #{proj.id}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-bold uppercase">
                          {String(proj.status || "IN_PROGRESS").replace(/_/g, " ")}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                        {proj.projectTitle}
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Client: <strong>{proj.clientName}</strong> • Category: {proj.serviceType}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      {proj.liveDemoUrl && (
                        <a
                          href={proj.liveDemoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-bold"
                        >
                          <FiExternalLink /> Live Staging Demo
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => downloadOfficialInvoice(proj)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold cursor-pointer"
                      >
                        <FiPrinter /> Download Official Invoice (PDF)
                      </button>
                    </div>
                  </div>

                  {/* Overall Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-300 uppercase tracking-wider">
                        Overall Engineering Progress
                      </span>
                      <span className="text-orange-400 text-sm">
                        {proj.progress ?? 0}% Completed
                      </span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 via-purple-500 to-cyan-400 transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.max(0, Number(proj.progress || 0)))}%` }}
                      />
                    </div>
                  </div>

                  {/* 4 Milestones Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {milestonesList.map((item) => (
                      <div
                        key={item.label}
                        className="p-4 rounded-2xl bg-slate-950/70 border border-white/10"
                      >
                        <div className="flex items-center justify-between text-xs font-bold mb-2">
                          <span className="text-slate-200 flex items-center gap-1.5">
                            {item.val >= 100 ? (
                              <FiCheckCircle className="text-emerald-400" />
                            ) : (
                              <FiClock className="text-orange-400" />
                            )}
                            {item.label}
                          </span>
                          <span
                            className={
                              item.val >= 100 ? "text-emerald-400" : "text-orange-400"
                            }
                          >
                            {item.val}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              item.val >= 100 ? "bg-emerald-400" : "bg-orange-400"
                            }`}
                            style={{ width: `${item.val}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

