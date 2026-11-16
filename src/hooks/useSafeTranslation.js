'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '@/components/i18n';

/**
 * useSafeTranslation:
 * Prevents Next.js SSR hydration mismatches when react-i18next has loaded a non-default
 * language (e.g. 'bn', 'ar', 'zh') from localStorage or browser preferences on the client,
 * while the server rendered the initial HTML in default English ('en').
 *
 * During SSR and initial client hydration (before mount), it returns the default fallback string.
 * Once mounted on the client, it seamlessly switches to the user's localized translation.
 */
export function useSafeTranslation() {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const safeT = (key, fallbackOrOptions, options) => {
    if (!mounted) {
      if (typeof fallbackOrOptions === 'string') {
        return fallbackOrOptions;
      }
      if (fallbackOrOptions && typeof fallbackOrOptions === 'object') {
        if (fallbackOrOptions.defaultValue) return fallbackOrOptions.defaultValue;
      }
      if (options && typeof options === 'object' && options.defaultValue) {
        return options.defaultValue;
      }
      return typeof key === 'string' ? key : '';
    }
    return t(key, fallbackOrOptions, options);
  };

  return { t: safeT, rawT: t, i18n, mounted };
}

export default useSafeTranslation;
