'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';
import {
  ArrowRight,
  Sparkles,
  Camera,
  Cpu,
  HeartHandshake,
  CheckCircle2,
  ChevronRight,
  Leaf,
} from 'lucide-react';
import { SAMPLE_DIAGNOSES } from '@/lib/mock-predict';
import { DiagnosisCard } from '@/components/DiagnosisCard';

export default function HomePage() {
  const { t } = useLanguage();
  const [selectedDemoIndex, setSelectedDemoIndex] = useState<number>(0);
  const currentDemo = SAMPLE_DIAGNOSES[selectedDemoIndex];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left Column: Headline and Value Proposition */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-green-200/80 bg-green-50/80 px-3.5 py-1 text-xs font-medium text-green-800">
                <Sparkles className="h-3.5 w-3.5 text-green-600" />
                <span>{t('heroBadge')}</span>
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl text-balance">
                {t('heroTitle')}
              </h1>

              <p className="mt-6 max-w-2xl text-lg text-neutral-600 leading-relaxed">
                {t('heroSubtitle')}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/diagnose"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-green-600/25 transition-all duration-200 hover:bg-green-700 hover:shadow-green-600/40 hover:-translate-y-0.5 active:scale-[0.99]"
                >
                  <Camera className="h-5 w-5" />
                  <span>{t('heroCtaFree')}</span>
                </Link>

                <Link
                  href="/pricing"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-neutral-300 bg-white px-6 py-3.5 text-base font-medium text-neutral-700 transition-all duration-200 hover:bg-neutral-50 hover:border-neutral-400 hover:-translate-y-0.5 hover:shadow-xs"
                >
                  <span>{t('heroCtaPricing')}</span>
                  <ArrowRight className="h-4 w-4 text-neutral-400 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              {/* Quantitative Proof Adjacency */}
              <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-6 border-t border-neutral-200 pt-8">
                <div className="group rounded-xl p-3 -m-3 transition-all duration-200 hover:bg-white hover:shadow-sm hover:border hover:border-neutral-200/80 cursor-default">
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 tabular-nums transition-colors group-hover:text-green-700">
                    96.8%
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">{t('heroMetricAccuracy')}</div>
                </div>
                <div className="group rounded-xl p-3 -m-3 transition-all duration-200 hover:bg-white hover:shadow-sm hover:border hover:border-neutral-200/80 cursor-default">
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 tabular-nums transition-colors group-hover:text-green-700">
                    &lt; 3 сек
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">{t('heroMetricTime')}</div>
                </div>
                <div className="group rounded-xl p-3 -m-3 transition-all duration-200 hover:bg-white hover:shadow-sm hover:border hover:border-neutral-200/80 cursor-default">
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 tabular-nums transition-colors group-hover:text-green-700">
                    500+
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">{t('heroMetricPathogens')}</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset with hover effect */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="group relative aspect-4/3 sm:aspect-16/10 overflow-hidden rounded-3xl border border-neutral-200 bg-white p-2 shadow-2xl shadow-neutral-900/5 transition-all duration-300 hover:shadow-2xl hover:shadow-green-900/10 hover:border-green-400 hover:-translate-y-1.5 cursor-pointer">
                  <div className="relative h-full w-full overflow-hidden rounded-2xl">
                    <Image
                      src="/images/hero_plant.jpg"
                      alt={t('heroTitle')}
                      fill
                      priority
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Minimalist AI Scan Overlay UI */}
                    <div className="absolute top-4 left-4 rounded-xl border border-white/40 bg-white/90 px-3 py-1.5 backdrop-blur-sm text-xs font-semibold text-neutral-800 shadow-sm flex items-center gap-1.5 transition-all duration-300 group-hover:bg-white group-hover:border-green-200 group-hover:shadow-md">
                      <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      <span>{t('heroScanActive')}</span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/60 bg-white/95 p-3.5 backdrop-blur-md shadow-lg transition-all duration-300 group-hover:bg-white group-hover:border-green-200 group-hover:shadow-xl group-hover:translate-y-[-2px]">
                      <div className="flex items-center justify-between text-xs font-medium text-neutral-500">
                        <span>{t('heroSamplePlant')}</span>
                        <span className="font-semibold text-green-700 transition-colors group-hover:text-green-800">
                          96% {t('heroMatch')}
                        </span>
                      </div>
                      <div className="mt-1 text-sm font-bold text-neutral-900">
                        {t('heroSampleDisease')}
                      </div>
                      <div className="mt-1 text-xs text-neutral-600">
                        {t('heroSampleRecommendation')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works (3 шага) */}
      <section className="border-y border-neutral-200/80 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-xs font-bold uppercase tracking-wider text-green-700">
              {t('stepsSubtitle')}
            </h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl text-balance">
              {t('stepsTitle')}
            </p>
            <p className="mt-4 text-base text-neutral-600">
              {t('stepsDesc')}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="group relative rounded-2xl border border-neutral-200 bg-neutral-50/50 p-8 transition-all duration-300 hover:bg-white hover:border-green-400 hover:shadow-xl hover:shadow-green-900/5 hover:-translate-y-1.5 cursor-default">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-800 font-bold text-base mb-6 transition-all duration-300 group-hover:bg-green-600 group-hover:text-white group-hover:scale-110">
                01
              </div>
              <h3 className="text-xl font-bold text-neutral-900 transition-colors group-hover:text-green-900">
                {t('step1Title')}
              </h3>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                {t('step1Desc')}
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-medium text-green-700 transition-transform group-hover:translate-x-1">
                <Camera className="h-4 w-4" />
                <span>{t('step1Meta')}</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative rounded-2xl border border-neutral-200 bg-neutral-50/50 p-8 transition-all duration-300 hover:bg-white hover:border-green-400 hover:shadow-xl hover:shadow-green-900/5 hover:-translate-y-1.5 cursor-default">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-800 font-bold text-base mb-6 transition-all duration-300 group-hover:bg-green-600 group-hover:text-white group-hover:scale-110">
                02
              </div>
              <h3 className="text-xl font-bold text-neutral-900 transition-colors group-hover:text-green-900">
                {t('step2Title')}
              </h3>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                {t('step2Desc')}
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-medium text-green-700 transition-transform group-hover:translate-x-1">
                <Cpu className="h-4 w-4" />
                <span>{t('step2Meta')}</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative rounded-2xl border border-neutral-200 bg-neutral-50/50 p-8 transition-all duration-300 hover:bg-white hover:border-green-400 hover:shadow-xl hover:shadow-green-900/5 hover:-translate-y-1.5 cursor-default">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-800 font-bold text-base mb-6 transition-all duration-300 group-hover:bg-green-600 group-hover:text-white group-hover:scale-110">
                03
              </div>
              <h3 className="text-xl font-bold text-neutral-900 transition-colors group-hover:text-green-900">
                {t('step3Title')}
              </h3>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                {t('step3Desc')}
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-medium text-green-700 transition-transform group-hover:translate-x-1">
                <HeartHandshake className="h-4 w-4" />
                <span>{t('step3Meta')}</span>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/diagnose"
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700 transition"
            >
              <span>{t('goToDiagnose')}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Demonstration Section */}
      <section className="py-20 bg-neutral-50/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-green-700">
                {t('demoBadge')}
              </h2>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900">
                {t('demoTitle')}
              </p>
            </div>

            {/* Sample Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {SAMPLE_DIAGNOSES.slice(0, 3).map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedDemoIndex(idx)}
                  className={`rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    selectedDemoIndex === idx
                      ? 'bg-neutral-900 text-white shadow-sm scale-[1.02]'
                      : 'border border-neutral-200 bg-white text-neutral-700 hover:border-green-500 hover:text-green-700 hover:bg-green-50/50 hover:shadow-xs hover:-translate-y-0.5'
                  }`}
                >
                  {item.plant}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Card Presentation */}
          <DiagnosisCard diagnosis={currentDemo} />
        </div>
      </section>

      {/* Advantages / Anti-slop Value */}
      <section className="py-20 bg-white border-t border-neutral-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-green-700">
                {t('advBadge')}
              </h2>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl text-balance">
                {t('advTitle')}
              </p>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                {t('advDesc')}
              </p>

              <div className="mt-8 space-y-4">
                <div className="group flex items-start gap-3 rounded-xl p-2 -m-2 transition-all duration-200 hover:bg-neutral-50">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-800 transition-colors group-hover:bg-green-600 group-hover:text-white">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 transition-colors group-hover:text-green-900">
                      {t('adv1Title')}
                    </h4>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      {t('adv1Desc')}
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-3 rounded-xl p-2 -m-2 transition-all duration-200 hover:bg-neutral-50">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-800 transition-colors group-hover:bg-green-600 group-hover:text-white">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 transition-colors group-hover:text-green-900">
                      {t('adv2Title')}
                    </h4>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      {t('adv2Desc')}
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-3 rounded-xl p-2 -m-2 transition-all duration-200 hover:bg-neutral-50">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-800 transition-colors group-hover:bg-green-600 group-hover:text-white">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 transition-colors group-hover:text-green-900">
                      {t('adv3Title')}
                    </h4>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      {t('adv3Desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative aspect-4/3 overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 transition-all duration-300 hover:shadow-xl hover:border-green-300">
              <Image
                src="/images/sample_apple.jpg"
                alt="Agro AI"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="bg-neutral-900 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 text-white mb-6">
            <Leaf className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-balance">
            {t('ctaTitle')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-neutral-400">
            {t('ctaSubtitle')}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/diagnose"
              className="rounded-xl bg-green-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-green-600/30 hover:bg-green-500 transition"
            >
              {t('ctaButton')}
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border border-neutral-700 bg-neutral-800/80 px-6 py-3.5 text-base font-medium text-neutral-200 hover:bg-neutral-800 transition"
            >
              {t('ctaCompare')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
