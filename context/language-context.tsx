'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, DICTIONARY, TranslationKey } from '@/lib/i18n';

interface LanguageContextType {
  locale: Locale;
  setLocale: (lang: Locale) => void;
  t: (key: TranslationKey) => string;
}

const STORAGE_KEY_LOCALE = 'agroai_locale_v1';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'ru';
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LOCALE);
      if (saved === 'kk' || saved === 'ru') return saved;
    } catch {
      // fallback
    }
    return 'ru';
  });

  const setLocale = (lang: Locale) => {
    setLocaleState(lang);
    try {
      localStorage.setItem(STORAGE_KEY_LOCALE, lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    try {
      document.documentElement.lang = locale;
    } catch {
      // ignore
    }
  }, [locale]);

  const t = (key: TranslationKey): string => {
    return DICTIONARY[locale][key] || DICTIONARY['ru'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
