'use client';

import { useState } from 'react';

export default function BrowserScrollCard({ image, title, slug, liveUrl, accent, label }) {
  const [isScrolled, setIsScrolled] = useState(false);

  if (!image) return null;

  const handleToggleScroll = () => {
    setIsScrolled(prev => !prev);
  };

  return (
    <div
      className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-500 shadow-xl flex flex-col bg-zinc-900/60 dark:bg-black/60 backdrop-blur-xl ${accent.border}`}
      style={{
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 25px rgba(99, 102, 241, 0.08)",
      }}
    >
      {/* Browser Window Header */}
      <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 bg-zinc-100 dark:bg-zinc-900/90 border-b border-zinc-200/80 dark:border-zinc-800 relative z-20">
        {/* Window controls */}
        <div className="flex items-center space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-sm" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shadow-sm" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-sm" />
        </div>

        {/* Address / Search Bar */}
        <div className="flex-1 mx-2 sm:mx-3 max-w-[220px] sm:max-w-xs">
          <div className="w-full h-6 rounded-md bg-zinc-200/70 dark:bg-zinc-800/80 border border-zinc-300/60 dark:border-zinc-700/60 flex items-center justify-center overflow-hidden px-2.5">
            <span className="text-[10px] text-zinc-600 dark:text-zinc-400 font-mono tracking-tight lowercase truncate">
              merxodevsolutions.pro.bd/{slug}{label ? ` · ${label}` : ""}
            </span>
          </div>
        </div>

        {/* External Link */}
        {liveUrl ? (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-zinc-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors cursor-pointer p-1"
            title="Open Live Preview"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        ) : (
          <div className="w-3.5 h-3.5" />
        )}
      </div>

      {/* Vertical Scrolling Image Container */}
      <div
        onClick={handleToggleScroll}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggleScroll();
          }
        }}
        className="relative h-[280px] sm:h-[350px] md:h-[420px] overflow-hidden group/img bg-zinc-950 cursor-pointer select-none"
      >
        {/* Subtle Loading Shimmer Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-pulse pointer-events-none z-10" />

        <img
          src={image}
          alt={title}
          className={`w-full h-auto absolute top-0 left-0 transition-transform duration-[6500ms] ease-in-out will-change-transform ${
            isScrolled
              ? 'translate-y-[calc(-100%+280px)] sm:translate-y-[calc(-100%+350px)] md:translate-y-[calc(-100%+420px)]'
              : 'translate-y-0 group-hover/img:translate-y-[calc(-100%+280px)] sm:group-hover/img:translate-y-[calc(-100%+350px)] md:group-hover/img:translate-y-[calc(-100%+420px)]'
          }`}
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
        />

        {/* Bottom indicator hint */}
        <div
          className={`absolute bottom-2.5 right-3 z-20 pointer-events-none transition-opacity duration-300 ${
            isScrolled ? 'opacity-90' : 'opacity-80 group-hover/img:opacity-0'
          }`}
        >
          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider bg-black/70 text-zinc-300 border border-white/10 backdrop-blur-md shadow-sm">
            {/* Desktop badge */}
            <span className="hidden md:inline">Hover to scroll</span>
            {/* Mobile responsive badge */}
            <span className="inline md:hidden">
              {isScrolled ? 'Click to top' : 'Click to scroll'}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
