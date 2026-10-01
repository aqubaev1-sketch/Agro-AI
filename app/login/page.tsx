'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { useLanguage } from '@/context/language-context';
import { Sprout, Loader2, AlertCircle, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsDemo, isConfigured } = useAuth();
  const { t, locale } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError(locale === 'kk' ? 'Барлық өрістерді толтырыңыз' : 'Заполните адрес электронной почты и пароль');
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      const res = await login(email, password);
      if (res.error) {
        setError(res.error);
      } else {
        router.push('/profile');
      }
    } catch {
      setError(locale === 'kk' ? 'Жүйеге кіру кезінде қате орын алды' : 'Ошибка при входе в систему');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoLogin = () => {
    loginAsDemo();
    router.push('/profile');
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-14rem)] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-xs">
        <div className="text-center mb-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 text-white mb-4">
            <Sprout className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            {t('loginTitle')}
          </h1>
          <p className="mt-1 text-xs text-neutral-500">
            {isConfigured
              ? 'Supabase Auth'
              : (locale === 'kk' ? 'Демо-режим (5 тегін диагностика/ай)' : 'Демо-режим авторизации (Supabase не подключен)')}
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-800 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700">
              {t('loginEmail')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="agronomist@phytodoc.ai"
              required
              className="mt-1.5 w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/10"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-neutral-700">
                {t('loginPassword')}
              </label>
              <span className="text-xs text-neutral-400">{t('loginMinChars')}</span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="mt-1.5 w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/10"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700 transition active:scale-[0.99]"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{locale === 'kk' ? 'Тексерілуде...' : 'Проверка учетных данных...'}</span>
              </>
            ) : (
              <span>{t('loginSubmit')}</span>
            )}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="text-xs text-neutral-400">{locale === 'kk' ? 'немесе' : 'или'}</span>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>

        {/* 1-Click Fast Demo Login for instant testing */}
        <button
          onClick={handleDemoLogin}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition"
        >
          <Sparkles className="h-3.5 w-3.5 text-green-600" />
          <span>{t('loginDemoBtn')}</span>
        </button>

        <p className="mt-6 text-center text-xs text-neutral-500">
          {t('loginNoAccount')}{' '}
          <Link href="/signup" className="font-semibold text-green-700 hover:underline">
            {t('loginRegisterLink')}
          </Link>
        </p>
      </div>
    </div>
  );
}
