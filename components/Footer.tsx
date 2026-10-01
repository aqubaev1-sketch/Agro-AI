'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';
import { Sprout } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50/60 py-12 text-neutral-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-neutral-900">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white">
                <Sprout className="h-4 w-4" />
              </div>
              <span className="font-semibold tracking-tight text-base">Agro AI</span>
            </Link>
            <p className="mt-3 max-w-md text-sm text-neutral-500 leading-relaxed">
              {t('footerDesc')}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-neutral-400">
              <span>Next.js 15</span>
              <span>·</span>
              <span>Tailwind CSS</span>
              <span>·</span>
              <span>Supabase Auth</span>
              <span>·</span>
              <span>Deep Learning CV</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
              {t('footerNavHeading')}
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-green-700 transition">{t('navHome')}</Link>
              </li>
              <li>
                <Link href="/diagnose" className="hover:text-green-700 transition">{t('navDiagnose')}</Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-green-700 transition">{t('navPricing')}</Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-green-700 transition">{t('navProfile')}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
              {t('footerLegalHeading')}
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-neutral-500">
              <li>{t('footerPrivacy')}</li>
              <li>{t('footerTerms')}</li>
              <li>{t('footerDisclaimerTitle')}</li>
            </ul>
            <p className="mt-4 text-xs text-neutral-400 leading-normal">
              {t('footerDisclaimer')}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between border-t border-neutral-200/80 pt-6 text-xs text-neutral-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Agro AI. {t('footerRights')}</p>
          <p className="mt-2 sm:mt-0">{t('footerMadeWithCare')}</p>
        </div>
      </div>
    </footer>
  );
}
