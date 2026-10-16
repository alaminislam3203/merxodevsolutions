'use client';

import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '@/components/i18n';

const languages = [
  { code: 'en', label: 'EN', full: 'English', activeColor: 'text-violet-600' },
  { code: 'bn', label: 'বাং', full: 'বাংলা', activeColor: 'text-amber-500' },
  { code: 'ar', label: 'عر', full: 'العربية', activeColor: 'text-emerald-500' },
  { code: 'zh', label: '中文', full: '中文', activeColor: 'text-rose-500' },
];

const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-amber-400"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function LanguageSwitcher({ variant = 'default', className = '' }) {
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState('en');
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('lang') || 'en';
    i18n.changeLanguage(saved);
    setCurrent(saved);
    document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = saved;
  }, []);

  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = code => {
    i18n.changeLanguage(code);
    setCurrent(code);
    localStorage.setItem('lang', code);
    document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = code;
    setOpen(false);
  };

  const currentLang = languages.find(l => l.code === current);

  // Variant for profile dropdown / compact menu
  if (variant === 'menu') {
    return (
      <div className={`p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800/80 ${className}`}>
        <div className="flex items-center justify-between px-1 mb-1.5">
          <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-zinc-500 dark:text-zinc-400">
            <GlobeIcon />
            <span>{t('navProfile.language', 'Language')}</span>
          </span>
          <span className="text-[10px] font-mono font-bold text-violet-600 dark:text-cyan-400">
            {currentLang?.full}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {languages.map(({ code, label, full, activeColor }) => {
            const isActive = current === code;
            return (
              <button
                key={code}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  changeLanguage(code);
                }}
                title={full}
                className={`py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-center transition-all cursor-pointer ${
                  isActive
                    ? `bg-white dark:bg-zinc-800 shadow-xs ring-1 ring-zinc-200 dark:ring-zinc-700 font-extrabold ${activeColor}`
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-white/60 dark:hover:bg-zinc-800/40'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ─── Desktop: Dropdown ─── */}
      <div className="hidden md:block relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(prev => !prev)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          <GlobeIcon />
          <span
            className={`text-[11px] font-black uppercase tracking-widest ${currentLang?.activeColor}`}
          >
            {currentLang?.label}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`text-zinc-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {open && (
          <div className="absolute top-full mt-2 right-0 w-36 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-xl overflow-hidden z-[9999]">
            {languages.map(({ code, label, full, activeColor }) => (
              <button
                key={code}
                onClick={() => changeLanguage(code)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-black uppercase tracking-widest transition-colors ${
                  current === code
                    ? `bg-zinc-50 dark:bg-zinc-800 ${activeColor}`
                    : 'text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-600 dark:hover:text-zinc-300'
                }`}
              >
                {current === code && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      code === 'en'
                        ? 'bg-violet-600'
                        : code === 'bn'
                          ? 'bg-amber-500'
                          : code === 'ar'
                            ? 'bg-emerald-500'
                            : 'bg-rose-500'
                    }`}
                  />
                )}
                {!current === code && <span className="w-1.5" />}
                <span>{full}</span>
                <span className="ml-auto opacity-50">{label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ─── Mobile: Pill (original) ─── */}
      <div className="flex md:hidden items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-inner">
        <div className="pl-2 pr-1">
          <GlobeIcon />
        </div>
        {languages.map(({ code, label, activeColor }) => (
          <button
            key={code}
            onClick={() => changeLanguage(code)}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              current === code
                ? `bg-white dark:bg-zinc-900 ${activeColor} shadow-sm ring-1 ring-zinc-100 dark:ring-zinc-700`
                : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
}
