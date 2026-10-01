'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { useLanguage } from '@/context/language-context';
import { Sprout, Loader2, AlertCircle, Sparkles } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { signup, loginAsDemo, isConfigured } = useAuth();
  const { t, locale } = useLanguage();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError(locale === 'kk' ? 'Барлық міндетті өрістерді толтырыңыз' : 'Заполните все обязательные поля');
      return;
    }

    if (password.length < 6) {
      setError(locale === 'kk' ? 'Құпия сөз кемінде 6 таңбадан тұруы керек' : 'Пароль должен содержать минимум 6 символов');
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      const res = await signup(email, password, fullName);
      if (res.error) {
        setError(res.error);
      } else {
        router.push('/profile');
      }
    } catch {
      setError(locale === 'kk' ? 'Тіркелу кезінде қате орын алды' : 'Ошибка при регистрации пользователя');
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
            {t('signupTitle')}
          </h1>
          <p className="mt-1 text-xs text-neutral-500">
            {isConfigured
              ? 'Supabase Auth'
              : (locale === 'kk' ? 'Демо-тіркелу режимі (5 тегін тексеру/ай)' : 'Демо-режим регистрации (5 бесплатных диагностик/мес)')}
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
              {t('signupName')}
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Елена Кузнецова / Айдос"
              className="mt-1.5 w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/10"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700">
              {t('loginEmail')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="gardener@example.com"
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
                <span>{locale === 'kk' ? 'Есептік жазба жасалуда...' : 'Создание учетной записи...'}</span>
              </>
            ) : (
              <span>{t('signupSubmit')}</span>
            )}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="text-xs text-neutral-400">{locale === 'kk' ? 'немесе' : 'или'}</span>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>

        <button
          onClick={handleDemoLogin}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition"
        >
          <Sparkles className="h-3.5 w-3.5 text-green-600" />
          <span>{locale === 'kk' ? 'Тіркелусіз жылдам сынап көру' : 'Быстрый тест без регистрации'}</span>
        </button>

        <p className="mt-6 text-center text-xs text-neutral-500">
          {t('signupHaveAccount')}{' '}
          <Link href="/login" className="font-semibold text-green-700 hover:underline">
            {t('signupLoginLink')}
          </Link>
        </p>
      </div>
    </div>
  );
}
