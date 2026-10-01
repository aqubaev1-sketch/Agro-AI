'use client';

import React from 'react';
import { useLanguage } from '@/context/language-context';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="inline-flex items-center rounded-xl border border-neutral-200 bg-neutral-50/80 p-0.5 text-xs font-medium">
      <button
        type="button"
        onClick={() => setLocale('ru')}
        className={`flex items-center gap-1 rounded-lg px-2.5 py-1 transition-all ${
          locale === 'ru'
            ? 'bg-white font-bold text-neutral-900 shadow-xs'
            : 'text-neutral-500 hover:text-neutral-900'
        }`}
        aria-label="Переключить на русский язык"
      >
        
        <span>RU</span>
      </button>

      <button
        type="button"
        onClick={() => setLocale('kk')}
        className={`flex items-center gap-1 rounded-lg px-2.5 py-1 transition-all ${
          locale === 'kk'
            ? 'bg-white font-bold text-green-800 shadow-xs'
            : 'text-neutral-500 hover:text-neutral-900'
        }`}
        aria-label="Қазақ тіліне ауыстыру"
      >
        
        <span>KZ</span>
      </button>
    </div>
  );
}
