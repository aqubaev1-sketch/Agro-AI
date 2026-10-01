'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { useLanguage } from '@/context/language-context';
import { PLANS } from '@/lib/plans';
import { DiagnosisResult } from '@/lib/mock-predict';
import { DiagnosisCard } from '@/components/DiagnosisCard';
import {
  User,
  Calendar,
  Trash2,
  Camera,
  Layers,
  LogOut,
  ArrowUpRight,
  Eye,
  ChevronRight,
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, history, clearHistory, getRemainingScans } = useAuth();
  const { t, locale } = useLanguage();
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<DiagnosisResult | null>(null);
  const [avatarError, setAvatarError] = useState(false);

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-600 mb-4">
          <User className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900">{t('profileNotAuthTitle')}</h1>
        <p className="mt-2 text-sm text-neutral-500">
          {t('profileNotAuthDesc')}
        </p>
        <div className="mt-6 flex flex-col gap-2">
          <Link
            href="/login"
            className="w-full rounded-xl bg-green-600 py-2.5 text-sm font-semibold text-white hover:bg-green-700 transition"
          >
            {t('profileLoginBtn')}
          </Link>
          <Link
            href="/signup"
            className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition"
          >
            {t('profileSignupBtn')}
          </Link>
        </div>
      </div>
    );
  }

  const currentPlan = PLANS.find((p) => p.id === user.planId) || PLANS[0];
  const remaining = getRemainingScans();
  const limit = currentPlan.diagnosesPerMonth;
  const usagePercent =
    limit === 'unlimited'
      ? 100
      : Math.min(100, Math.round((user.diagnosesUsedThisMonth / limit) * 100));

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Profile Overview Card */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-700 text-2xl font-bold text-white shadow-sm overflow-hidden">
              {user.avatarUrl && !avatarError ? (
                <Image
                  src={user.avatarUrl}
                  alt={user.fullName}
                  fill
                  unoptimized
                  onError={() => setAvatarError(true)}
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span>{user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}</span>
              )}
            </div>

            {/* Name and Meta */}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
                  {user.fullName || t('profileGardener')}
                </h1>
                <span className="rounded-md bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800 uppercase">
                  {currentPlan.name}
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">{user.email}</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-neutral-400">
                <Calendar className="h-3 w-3" />
                <span>
                  {t('profileMemberSince')} {new Date(user.createdAt).toLocaleDateString(locale === 'kk' ? 'kk-KZ' : 'ru-RU')}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/pricing"
              className="flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition"
            >
              <Layers className="h-3.5 w-3.5 text-green-600" />
              <span>{t('profileChangePlan')}</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>{t('profileLogout')}</span>
            </button>
          </div>
        </div>

        {/* Subscription & Usage Meter */}
        <div className="mt-8 grid grid-cols-1 gap-6 border-t border-neutral-100 pt-6 sm:grid-cols-3">
          <div className="rounded-xl border border-neutral-100 bg-neutral-50/60 p-4">
            <div className="text-xs text-neutral-500 font-medium">{t('profileCurrentPlanCard')}</div>
            <div className="mt-1 flex items-baseline justify-between">
              <div className="text-lg font-bold text-neutral-900">{currentPlan.name}</div>
              <span className="text-xs text-neutral-600">
                {currentPlan.priceMonthly === 0 ? t('profileFree') : `${currentPlan.priceMonthly}$/${t('pricingMonth')}`}
              </span>
            </div>
            <Link
              href="/pricing"
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-green-700 hover:text-green-800"
            >
              <span>{t('profilePlanDetails')}</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="rounded-xl border border-neutral-100 bg-neutral-50/60 p-4">
            <div className="text-xs text-neutral-500 font-medium">{t('profileScansThisMonth')}</div>
            <div className="mt-1 flex items-baseline justify-between">
              <div className="text-lg font-bold text-neutral-900 tabular-nums">
                {user.diagnosesUsedThisMonth}{' '}
                <span className="text-xs font-normal text-neutral-500">
                  / {limit === 'unlimited' ? '∞' : limit}
                </span>
              </div>
              <span className="text-xs text-green-700 font-semibold">
                {t('profileLeft')}: {remaining}
              </span>
            </div>
            {/* Progress bar */}
            <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full bg-green-600 transition-all duration-300"
                style={{ width: `${limit === 'unlimited' ? 10 : usagePercent}%` }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-neutral-100 bg-neutral-50/60 p-4">
            <div className="text-xs text-neutral-500 font-medium">{t('profileTotalScanned')}</div>
            <div className="mt-1 text-lg font-bold text-neutral-900 tabular-nums">
              {user.totalDiagnosesCount || history.length}{' '}
              <span className="text-xs font-normal text-neutral-500">{t('profilePlantsCount')}</span>
            </div>
            <Link
              href="/diagnose"
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-green-700 hover:text-green-800"
            >
              <Camera className="h-3 w-3" />
              <span>{t('profileMakeNewScan')}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">
              {t('profileHistoryTitle')}
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              {t('profileHistorySubtitle')}
            </p>
          </div>

          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-rose-600 transition"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>{t('profileClearHistory')}</span>
            </button>
          )}
        </div>

        {/* Selected Modal / Detail view */}
        {selectedHistoryItem && (
          <div className="mb-8 rounded-2xl border-2 border-green-600 bg-white p-4 sm:p-6 shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-green-700">
                {t('profileArchiveView')}
              </span>
              <button
                onClick={() => setSelectedHistoryItem(null)}
                className="text-xs font-semibold text-neutral-500 hover:text-neutral-900"
              >
                {t('profileClose')}
              </button>
            </div>
            <DiagnosisCard diagnosis={selectedHistoryItem} isSaved={true} />
          </div>
        )}

        {/* History List Cards */}
        {history.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-neutral-500 mb-3">
              <Camera className="h-6 w-6" />
            </div>
            <h3 className="text-base font-semibold text-neutral-900">
              {t('profileHistoryEmptyTitle')}
            </h3>
            <p className="mt-1 text-xs text-neutral-500 max-w-sm mx-auto">
              {t('profileHistoryEmptyDesc')}
            </p>
            <Link
              href="/diagnose"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-green-700 transition"
            >
              <span>{t('goToDiagnose')}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {history.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedHistoryItem(item)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 transition-all hover:border-green-600 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.plant}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-green-700 font-bold text-xs">
                        🌿
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                      <span>{new Date(item.timestamp).toLocaleDateString(locale === 'kk' ? 'kk-KZ' : 'ru-RU')}</span>
                      <span className="font-semibold text-green-700">{item.confidence}%</span>
                    </div>

                    <h3 className="mt-1 font-bold text-neutral-900 text-sm truncate">
                      {item.disease}
                    </h3>
                    <p className="text-xs text-neutral-500 truncate mt-0.5">
                      {item.plant}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3 text-xs">
                  <span className="text-neutral-500">
                    {item.symptoms.length} {locale === 'kk' ? 'белгі' : 'симптома'} · {item.treatment.length} {locale === 'kk' ? 'қадам' : 'шага'}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-green-700 group-hover:translate-x-0.5 transition-transform">
                    <span>{t('profileOpen')}</span>
                    <Eye className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
