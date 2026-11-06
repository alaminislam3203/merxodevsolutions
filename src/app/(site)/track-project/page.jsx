'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '@/components/i18n';
import {
  Search,
  CheckCircle2,
  Clock,
  ExternalLink,
  Download,
  ShieldCheck,
  MessageSquare,
  ChevronRight,
  Layers,
  CreditCard,
  Sparkles,
} from 'lucide-react';
import { downloadOfficialInvoice } from '@/lib/invoiceGenerator';

const STAGES_ORDER = ['Discovery', 'Design', 'Development', 'Testing', 'Completed'];

export default function TrackProjectPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [projects, setProjects] = useState([]);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setProjects([]);

    try {
      const res = await fetch(`/api/track-project?q=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      if (!res.ok || !data.projects || data.projects.length === 0) {
        setError(t('trackProjectPage.errorNotFound'));
      } else {
        setProjects(data.projects);
      }
    } catch (err) {
      setError(t('trackProjectPage.errorNotFound'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-24 overflow-hidden pt-4 sm:pt-6 mt-8">
      {/* Ambient decorative glows matching other pages */}
      <div
        className="pointer-events-none fixed top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.07] dark:opacity-[0.12] blur-[130px] z-0"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }}
      />
      <div
        className="pointer-events-none fixed bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.06] dark:opacity-[0.10] blur-[110px] z-0"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1150px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="pt-12 flex items-center gap-2 text-xs font-exo-extralight text-zinc-400 dark:text-zinc-600">
          <Link href="/" className="hover:text-violet-500 transition-colors">
            {t('trackProjectPage.breadcrumbHome', { defaultValue: 'Home' })}
          </Link>
          <ChevronRight size={12} />
          <span className="text-zinc-600 dark:text-zinc-400">
            {t('trackProjectPage.breadcrumbCurrent', { defaultValue: 'Track Project' })}
          </span>
        </div>

        {/* Hero Header */}
        <div className="pt-8 pb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-exo-extralight tracking-widest uppercase border border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400 mb-5">
            <ShieldCheck size={13} />
            {t('trackProjectPage.badge')}
          </div>

          <h1 className="font-exo-medium text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#27003B] dark:text-white mb-4 uppercase tracking-tight leading-tight">
            {t('trackProjectPage.titlePrefix')}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              {t('trackProjectPage.titleHighlight')}
            </span>
          </h1>

          <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base font-exo-extralight leading-relaxed">
            {t('trackProjectPage.subtitle')}
          </p>
        </div>

        {/* Search Box */}
        <form
          onSubmit={handleTrack}
          className="max-w-2xl mx-auto bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row gap-3 mb-10"
        >
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('trackProjectPage.inputPlaceholder')}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-sm shadow-md hover:scale-[1.02] transition-all disabled:opacity-60 shrink-0"
          >
            {loading ? t('trackProjectPage.searchingBtn') : t('trackProjectPage.searchBtn')}
          </button>
        </form>

        {error && (
          <div className="max-w-xl mx-auto p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-center text-sm mb-8">
            {error}
          </div>
        )}

        {/* Project Cards */}
        <div className="space-y-8">
          {projects.map((proj) => {
            const currentStageIdx = Math.max(0, STAGES_ORDER.indexOf(proj.stage));
            return (
              <div
                key={proj.id}
                className="bg-white/85 dark:bg-zinc-900/75 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-md space-y-6"
              >
                {/* Top Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-1">
                      <Sparkles size={13} />
                      {t('trackProjectPage.projectIdLabel')}: #{proj.shortId}
                    </div>
                    <h2 className="font-exo-medium text-xl sm:text-2xl font-bold text-[#27003B] dark:text-white">
                      {proj.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      {t('trackProjectPage.clientLabel')}: <strong>{proj.client}</strong> •{' '}
                      {t('trackProjectPage.deadlineLabel')}:{' '}
                      <strong>{proj.deadline || t('trackProjectPage.tbd')}</strong>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {proj.livePreviewUrl && (
                      <a
                        href={proj.livePreviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:scale-[1.02] transition-all"
                      >
                        <ExternalLink size={14} />
                        {t('trackProjectPage.livePreviewBtn')}
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => downloadOfficialInvoice(proj)}
                      className="px-4 py-2.5 rounded-xl border border-violet-500/40 bg-violet-500/10 text-violet-700 dark:text-violet-300 hover:bg-violet-500/20 text-xs font-bold flex items-center gap-1.5 transition-all"
                    >
                      <Download size={14} />
                      {t('trackProjectPage.downloadInvoiceBtn')}
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-center text-xs sm:text-sm font-semibold mb-2">
                    <span className="text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                      <Layers size={15} className="text-violet-500" />
                      {t('trackProjectPage.overallProgress')}
                    </span>
                    <span className="text-violet-600 dark:text-violet-400 font-bold">
                      {proj.progress}%
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 transition-all duration-500"
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                </div>

                {/* Milestone Stepper */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
                  {STAGES_ORDER.map((stageKey, idx) => {
                    const done = idx <= currentStageIdx;
                    return (
                      <div
                        key={stageKey}
                        className={`p-3.5 rounded-xl border text-center transition-all ${
                          done
                            ? 'border-violet-500/40 bg-violet-500/10 text-[#27003B] dark:text-white'
                            : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 text-zinc-400'
                        }`}
                      >
                        <div className="flex justify-center mb-1.5">
                          {done ? (
                            <CheckCircle2 size={18} className="text-violet-600 dark:text-violet-400" />
                          ) : (
                            <Clock size={18} className="text-zinc-400" />
                          )}
                        </div>
                        <div className="text-xs font-bold">
                          {t(`trackProjectPage.stages.${stageKey}`, { defaultValue: stageKey })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Financial Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                      <CreditCard size={13} />
                      {t('trackProjectPage.totalBudget')}
                    </div>
                    <div className="text-lg font-extrabold text-[#27003B] dark:text-white mt-1">
                      ৳{proj.budget.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
                    <div className="text-xs text-emerald-600 dark:text-emerald-400">
                      {t('trackProjectPage.paidAmount')}
                    </div>
                    <div className="text-lg font-extrabold text-emerald-700 dark:text-emerald-300 mt-1">
                      ৳{proj.paidAmount.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25">
                    <div className="text-xs text-amber-600 dark:text-amber-400">
                      {t('trackProjectPage.dueBalance')}
                    </div>
                    <div className="text-lg font-extrabold text-amber-700 dark:text-amber-300 mt-1">
                      ৳{proj.dueAmount.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Support Footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
                  <span>{t('trackProjectPage.needHelpText')}</span>
                  <a
                    href={`https://wa.me/8801313334279?text=${encodeURIComponent(
                      `Hello MerxoDev Team! Checking status on Project #${proj.shortId} (${proj.title}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                  >
                    <MessageSquare size={14} />
                    {t('trackProjectPage.whatsappSupportBtn')}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
