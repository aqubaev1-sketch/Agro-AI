'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { useLanguage } from '@/context/language-context';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Sprout, Menu, X, ArrowUpRight, User, Sparkles } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('navHome') },
    { href: '/diagnose', label: t('navDiagnose') },
    { href: '/pricing', label: t('navPricing') },
    { href: '/profile', label: t('navProfile') },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single element wordmark brand */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-lg font-semibold tracking-tight text-neutral-900 transition-colors hover:text-green-700"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600 text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            <Sprout className="h-5 w-5" />
          </div>
          <span className="font-semibold tracking-tight">Agro AI</span>
        </Link>

        {/* Zone 2: Clean 4-6 text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors relative py-1 ${
                  isActive
                    ? 'text-green-700 font-semibold'
                    : 'hover:text-neutral-900'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Language switcher + primary actions */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />

          {user ? (
            <div className="flex items-center gap-2.5">
              <Link
                href="/diagnose"
                className="flex items-center gap-2 rounded-xl bg-green-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-green-700"
              >
                <Sparkles className="h-4 w-4" />
                <span>{t('navDiagnose')}</span>
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-800 text-xs font-semibold">
                  {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="max-w-[110px] truncate">{user.fullName || t('navProfile')}</span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3.5 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition"
              >
                {t('navLogin')}
              </Link>
              <Link
                href="/diagnose"
                className="flex items-center gap-1.5 rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-green-700"
              >
                <span>{t('navTryFree')}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
            aria-label="Открыть меню"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-neutral-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-lg px-3 py-2 text-base font-medium transition ${
                    isActive
                      ? 'bg-green-50 text-green-700'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-2 border-t border-neutral-100 pt-3">
              {user ? (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/diagnose"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-2.5 text-center text-sm font-medium text-white"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>{t('navMakeDiagnosis')}</span>
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 py-2 text-center text-sm font-medium text-neutral-700"
                  >
                    <User className="h-4 w-4" />
                    <span>{t('navProfileAccount')} ({user.fullName})</span>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full rounded-xl border border-neutral-200 py-2 text-center text-sm font-medium text-neutral-700"
                  >
                    {t('navLogin')}
                  </Link>
                  <Link
                    href="/diagnose"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full rounded-xl bg-green-600 py-2.5 text-center text-sm font-medium text-white"
                  >
                    {t('navTryFree')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
