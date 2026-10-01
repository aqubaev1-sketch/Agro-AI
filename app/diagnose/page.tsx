'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useLanguage } from '@/context/language-context';
import { DiagnosisResult } from '@/lib/mock-predict';
import { DiagnosisCard } from '@/components/DiagnosisCard';
import {
  UploadCloud,
  Sparkles,
  Loader2,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Camera,
} from 'lucide-react';

const PRESET_SAMPLES = [
  {
    labelRu: 'Томат (Альтернариоз)',
    labelKk: 'Қызанақ (Альтернариоз)',
    path: '/images/sample_tomato.jpg',
    hint: 'Томат помидор альтернариоз',
  },
  {
    labelRu: 'Монстера (Хлороз)',
    labelKk: 'Монстера (Хлороз)',
    path: '/images/sample_monstera.jpg',
    hint: 'Монстера хлороз пожелтение',
  },
  {
    labelRu: 'Яблоня (Парша)',
    labelKk: 'Алма ағашы (Қотыр/Парша)',
    path: '/images/sample_apple.jpg',
    hint: 'Яблоня парша пятна',
  },
];

export default function DiagnosePage() {
  const { user, addDiagnosisToHistory, getRemainingScans } = useAuth();
  const { t, locale } = useLanguage();

  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [seedHint, setSeedHint] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const remainingScans = getRemainingScans();
  const isLimitReached = remainingScans !== 'unlimited' && remainingScans <= 0;

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Пожалуйста, загрузите изображение (JPEG, PNG, WebP).');
      return;
    }
    setError(null);
    setSelectedFile(file);
    setSeedHint(file.name);
    setResult(null);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  }, [processFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const selectPreset = (sample: (typeof PRESET_SAMPLES)[0]) => {
    setError(null);
    setSelectedFile(null);
    setPreviewUrl(sample.path);
    setSeedHint(sample.hint);
    setResult(null);
  };

  const triggerDiagnosis = async () => {
    if (!previewUrl && !selectedFile) {
      setError(locale === 'kk' ? 'Алдымен жапырақ суретін таңдаңыз' : 'Сначала выберите или перетащите фотографию листа');
      return;
    }

    if (isLimitReached) {
      setError(t('diagLimitReachedTitle'));
      return;
    }

    setError(null);
    setLoading(true);
    setScanStep(t('diagScanning1'));

    try {
      const timer1 = setTimeout(() => setScanStep(t('diagScanning2')), 250);
      const timer2 = setTimeout(() => setScanStep(t('diagScanning3')), 500);

      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hint: seedHint,
          imageUrl: previewUrl,
        }),
      });

      clearTimeout(timer1);
      clearTimeout(timer2);

      if (!response.ok) {
        throw new Error('Prediction API error');
      }

      const data: DiagnosisResult = await response.json();
      setResult(data);
      addDiagnosisToHistory(data);
    } catch (err: unknown) {
      console.error(err);
      setError(locale === 'kk' ? 'Диагностиканы орындау мүмкін болмады' : 'Не удалось выполнить диагностику. Проверьте соединение с сетью.');
    } finally {
      setLoading(false);
      setScanStep('');
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    setSeedHint('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          {t('diagTitle')}
        </h1>
        <p className="mt-2 text-sm text-neutral-600 max-w-xl mx-auto">
          {t('diagSubtitle')}
        </p>

        {/* Scan quota notice */}
        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-1 text-xs text-neutral-600 shadow-xs">
          <span>{t('diagPlan')}: <strong className="text-neutral-900 uppercase font-semibold">{user?.planId || 'Free'}</strong></span>
          <span>·</span>
          <span>{t('diagRemaining')}: <strong className="text-green-700 font-bold">{remainingScans}</strong></span>
          {remainingScans !== 'unlimited' && remainingScans <= 2 && (
            <Link href="/pricing" className="text-green-600 hover:underline font-semibold ml-1">
              {t('diagUpgradeLimit')}
            </Link>
          )}
        </div>
      </div>

      {/* Main Flow: Upload or Diagnosis Result */}
      {!result ? (
        <div className="space-y-8">
          {/* Limit Reached Banner */}
          {isLimitReached && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                <span>{t('diagLimitReachedTitle')}</span>
              </div>
              <Link
                href="/pricing"
                className="shrink-0 rounded-xl bg-amber-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 transition"
              >
                {t('diagLimitUpgradeBtn')}
              </Link>
            </div>
          )}

          {/* Upload Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
              dragActive
                ? 'border-green-600 bg-green-50/50 scale-[0.99]'
                : previewUrl
                ? 'border-neutral-300 bg-white shadow-sm'
                : 'border-neutral-300 bg-neutral-50/60 hover:border-green-500 hover:bg-green-50/20'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />

            {previewUrl ? (
              <div className="flex flex-col items-center gap-4">
                <div className="relative aspect-4/3 w-64 max-w-full overflow-hidden rounded-xl border border-neutral-200 shadow-sm bg-neutral-100">
                  <Image
                    src={previewUrl}
                    alt={t('diagTitle')}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-xs text-neutral-500">
                  {selectedFile ? selectedFile.name : t('diagSelectedSample')}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition"
                >
                  {t('diagPickAnother')}
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center max-w-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-neutral-200 text-green-600 shadow-xs mb-4">
                  <UploadCloud className="h-7 w-7" />
                </div>
                <p className="text-base font-semibold text-neutral-900">
                  {t('diagDropTitle')}
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  {t('diagDropHint')}
                </p>
                <div className="mt-4 flex items-center gap-2 rounded-full bg-white border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600">
                  <Camera className="h-3.5 w-3.5 text-neutral-400" />
                  <span>{t('diagLightingTip')}</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Presets for 1-Click Testing */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                {t('diagPresetHeading')}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PRESET_SAMPLES.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectPreset(sample)}
                  className={`flex items-center gap-3 rounded-xl border p-2.5 text-left transition-all ${
                    previewUrl === sample.path
                      ? 'border-green-600 bg-green-50/60 ring-2 ring-green-600/10'
                      : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-neutral-200">
                    <Image
                      src={sample.path}
                      alt={locale === 'kk' ? sample.labelKk : sample.labelRu}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-neutral-900 truncate">
                      {locale === 'kk' ? sample.labelKk : sample.labelRu}
                    </p>
                    <span className="text-[11px] text-green-700 font-medium">
                      {t('diagPresetClick')}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Error notice */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-800 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Trigger Button */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            {previewUrl && (
              <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                className="w-full sm:w-auto rounded-xl border border-neutral-200 bg-white px-5 py-3 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition"
              >
                {t('diagResetBtn')}
              </button>
            )}

            <button
              type="button"
              onClick={triggerDiagnosis}
              disabled={loading || !previewUrl || isLimitReached}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold transition-all ${
                loading || !previewUrl || isLimitReached
                  ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700 shadow-md shadow-green-600/20 active:scale-[0.99]'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{scanStep || t('diagRunBtn')}</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>{t('diagRunBtn')}</span>
                </>
              )}
            </button>
          </div>

          {/* Helpful Tips Section */}
          <div className="mt-12 rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
            <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-900">
              <HelpCircle className="h-4 w-4 text-green-600" />
              {t('diagTipsTitle')}
            </h3>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-neutral-600">
              <div className="flex items-start gap-2">
                <span className="font-bold text-green-700">1.</span>
                <span>{t('diagTip1')}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-green-700">2.</span>
                <span>{t('diagTip2')}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-green-700">3.</span>
                <span>{t('diagTip3')}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Results Section */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
              {t('diagCompletedBadge')}
            </span>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>{t('diagNewScanBtn')}</span>
            </button>
          </div>

          <DiagnosisCard
            diagnosis={result}
            onReset={handleReset}
            isSaved={true}
          />
        </div>
      )}
    </div>
  );
}
