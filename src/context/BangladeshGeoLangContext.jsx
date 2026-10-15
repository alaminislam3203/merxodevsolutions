'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const BangladeshGeoLangContext = createContext({
  lang: 'en',
  setLang: () => {},
  toggleLang: () => {},
  t: (en, bn) => en,
});

export function BangladeshGeoLangProvider({ children }) {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bd_geo_lang');
      if (saved === 'bn' || saved === 'en') {
        setLang(saved);
      }
    } catch (e) {
      // ignore localStorage restrictions
    }
  }, []);

  const changeLang = (newLang) => {
    setLang(newLang);
    try {
      localStorage.setItem('bd_geo_lang', newLang);
    } catch (e) {}
  };

  const toggleLang = () => {
    changeLang(lang === 'en' ? 'bn' : 'en');
  };

  const t = (en, bn) => (lang === 'bn' ? bn || en : en);

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
