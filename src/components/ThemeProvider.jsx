'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function syncThemeColor(currentTheme) {
  if (typeof document === 'undefined') return;
  const isDark = currentTheme
    ? currentTheme === 'dark'
    : document.documentElement.classList.contains('dark');
  const isAdmin =
    typeof window !== 'undefined' && window.location.pathname.startsWith('/709832');

  // On client side: Light mode matches navbar (violet-700: #6d28d9), dark mode matches #060b19
  // On admin panel: Light mode is clean #ffffff, dark mode is #080c18
  const darkColor = isAdmin ? '#080c18' : '#060b19';
  const lightColor = isAdmin ? '#ffffff' : '#6d28d9';
  const color = isDark ? darkColor : lightColor;

  // 1. Standard meta name="theme-color" (Android Chrome, Edge, etc.)
  let metaTheme = document.querySelector('meta[name="theme-color"]:not([media])');
  if (!metaTheme) {
    metaTheme = document.createElement('meta');
    metaTheme.name = 'theme-color';
    document.head.appendChild(metaTheme);
  }
  metaTheme.setAttribute('content', color);

  // 2. Also update media-based theme-color tags so they stay in sync
  const mediaMetas = document.querySelectorAll('meta[name="theme-color"][media]');
  mediaMetas.forEach((m) => {
    m.setAttribute('content', color);
  });

  // 3. Apple Safari iOS status bar style
  let appleMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
  if (!appleMeta) {
    appleMeta = document.createElement('meta');
    appleMeta.name = 'apple-mobile-web-app-status-bar-style';
    document.head.appendChild(appleMeta);
  }
  appleMeta.setAttribute('content', isDark ? 'black-translucent' : 'default');

  // 4. Microsoft Edge / Windows Phone omnibox
  let msMeta = document.querySelector('meta[name="msapplication-navbutton-color"]');
  if (!msMeta) {
    msMeta = document.createElement('meta');
    msMeta.name = 'msapplication-navbutton-color';
    document.head.appendChild(msMeta);
  }
  msMeta.setAttribute('content', color);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    // Default to 'light' for any new visitor; only use 'dark' if explicitly chosen and saved in localStorage
    const initial = saved === 'dark' ? 'dark' : 'light';
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
    syncThemeColor(initial);

    // Watch for class changes on <html> to ensure the omnibox color always stays in sync
    const observer = new MutationObserver(() => {
      const isDarkNow = document.documentElement.classList.contains('dark');
      syncThemeColor(isDarkNow ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    syncThemeColor(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme:
        typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
          ? 'dark'
          : 'light',
      toggleTheme: () => {
        if (typeof window !== 'undefined') {
          const isDark = document.documentElement.classList.contains('dark');
          const next = isDark ? 'light' : 'dark';
          localStorage.setItem('theme', next);
          document.documentElement.classList.toggle('dark', next === 'dark');
          syncThemeColor(next);
        }
      },
    };
  }
  return context;
}
