'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '@/components/i18n';

const BangladeshGeoLangContext = createContext({
  lang: 'en',
  setLang: () => {},
  toggleLang: () => {},
  t: (en, bn) => en,
});

export function BangladeshGeoLangProvider({ children }) {
  const { t: i18nT, i18n } = useTranslation();

  const getNormalizedLang = (lng) => {
    const code = (lng || 'en').toLowerCase();
    return code.startsWith('bn') ? 'bn' : 'en';
  };

  const [lang, setLangState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lang') || localStorage.getItem('bd_geo_lang');
      if (saved) return getNormalizedLang(saved);
    }
    return getNormalizedLang(i18n?.language);
  });

  useEffect(() => {
    if (!i18n) return;

    // Initial check from localStorage or i18n
    const activeCode = i18n.language || (typeof window !== 'undefined' ? localStorage.getItem('lang') : 'en');
    setLangState(getNormalizedLang(activeCode));

    const handleLangChange = (newLng) => {
      const norm = getNormalizedLang(newLng);
      setLangState(norm);
      try {
        localStorage.setItem('lang', newLng);
        localStorage.setItem('bd_geo_lang', norm);
      } catch (e) {}
    };

    i18n.on('languageChanged', handleLangChange);
    return () => {
      i18n.off('languageChanged', handleLangChange);
    };
  }, [i18n]);

  const changeLang = (newLang) => {
    const norm = getNormalizedLang(newLang);
    setLangState(norm);
    if (i18n && typeof i18n.changeLanguage === 'function') {
      i18n.changeLanguage(newLang);
    }
    try {
      localStorage.setItem('lang', newLang);
      localStorage.setItem('bd_geo_lang', norm);
      document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLang;
    } catch (e) {}
  };

  const toggleLang = () => {
    changeLang(lang === 'bn' ? 'en' : 'bn');
  };

  const t = (en, bn) => {
    if (bn !== undefined) {
      return lang === 'bn' ? bn || en : en;
    }
    if (typeof en === 'string' && i18nT) {
      return i18nT(en);
    }
    return en;
  };

  return (
    <BangladeshGeoLangContext.Provider
      value={{ lang, setLang: changeLang, toggleLang, t }}
    >
      {children}
    </BangladeshGeoLangContext.Provider>
  );
}

export function useBangladeshGeoLang() {
  return useContext(BangladeshGeoLangContext);
}
