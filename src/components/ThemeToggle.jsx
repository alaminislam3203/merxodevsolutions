'use client';

import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ iconOnly = false }) {
  const { theme, toggleTheme } = useTheme();

  if (iconOnly) {
    return (
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-amber-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-inner">
      <div className="pl-3 pr-2 text-amber-400">
        {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
      </div>
      <button
        onClick={() => theme !== 'light' && toggleTheme()}
        className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
          theme === 'light'
            ? 'bg-white text-violet-600 shadow-sm ring-1 ring-zinc-100'
            : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
        }`}
      >
        Light
      </button>
      <button
        onClick={() => theme !== 'dark' && toggleTheme()}
        className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
          theme === 'dark'
            ? 'bg-zinc-900 text-amber-400 shadow-sm ring-1 ring-zinc-700'
            : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
        }`}
      >
        Dark
      </button>
    </div>
  );
}
