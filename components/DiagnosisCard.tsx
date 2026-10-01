'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';
import { DiagnosisResult } from '@/lib/mock-predict';
import {
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Leaf,
  Droplets,
  Bookmark,
  Printer,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface DiagnosisCardProps {
  diagnosis: DiagnosisResult;
  onReset?: () => void;
  onSave?: (diag: DiagnosisResult) => void;
  isSaved?: boolean;
}

export function DiagnosisCard({
  diagnosis,
  onReset,
  onSave,
  isSaved = false,
}: DiagnosisCardProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'organic' | 'chemical'>('all');
  const [savedLocally, setSavedLocally] = useState(isSaved);

  const getSeverityBadge = (sev: DiagnosisResult['severity']) => {
    switch (sev) {
      case 'low':
        return {
          label: t('cardSeverityLow'),
          className: 'text-amber-800 bg-amber-50 border-amber-200',
        };
      case 'medium':
        return {
          label: t('cardSeverityMedium'),
          className: 'text-orange-800 bg-orange-50 border-orange-200',
        };
      case 'high':
      case 'critical':
        return {
          label: t('cardSeverityHigh'),
          className: 'text-rose-800 bg-rose-50 border-rose-200',
        };
      default:
        return {
          label: t('cardSeverityMedium'),
          className: 'text-neutral-700 bg-neutral-100 border-neutral-200',
        };
    }
  };

  const severityInfo = getSeverityBadge(diagnosis.severity);

  const handleSave = () => {
    setSavedLocally(true);
    if (onSave) onSave(diagnosis);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all">
      {/* Header section with plant and diagnosis title */}
      <div className="border-b border-neutral-100 bg-neutral-50/50 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
              <span>{diagnosis.plant}</span>
              {diagnosis.scientificName && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="italic">{diagnosis.scientificName}</span>
                </>
              )}
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              {diagnosis.disease}
            </h2>
            {diagnosis.diseaseLatin && (
              <p className="text-xs font-mono text-neutral-400 mt-0.5">
                {t('cardPathogen')}: {diagnosis.diseaseLatin}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Confidence metric */}
            <div className="flex items-center gap-2 rounded-xl bg-white border border-neutral-200 px-3.5 py-2 shadow-xs">
              <Sparkles className="h-4 w-4 text-green-600" />
              <div className="text-right">
                <div className="text-xs text-neutral-400 font-medium leading-none">{t('cardAiConfidence')}</div>
                <div className="text-lg font-bold tabular-nums text-green-700 leading-tight">
                  {diagnosis.confidence}%
                </div>
              </div>
            </div>

            {/* Severity tag */}
            <span
              className={`rounded-xl border px-3 py-2 text-xs font-medium ${severityInfo.className}`}
            >
              {severityInfo.label}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Photo preview + Detailed analysis */}
      <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-12">
        {/* Left column: Leaf image preview */}
        <div className="lg:col-span-4">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
            {diagnosis.imageUrl ? (
              <Image
                src={diagnosis.imageUrl}
                alt={diagnosis.plant}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
                sizes="(max-width: 768px) 100vw, 350px"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center p-4 text-neutral-400">
                <Leaf className="h-10 w-10 stroke-1 text-green-600" />
                <span className="mt-2 text-xs">{t('heroTitle')}</span>
              </div>
            )}
          </div>

          <div className="mt-4 rounded-xl border border-neutral-100 bg-neutral-50 p-4">
            <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-700">
              <Droplets className="h-3.5 w-3.5 text-green-600" />
              {t('cardFirstAid')}
            </h4>
            <p className="mt-1.5 text-xs text-neutral-600 leading-relaxed">
              {t('cardFirstAidDesc')}
            </p>
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex flex-col gap-2">
            <button
              onClick={handleSave}
              disabled={savedLocally}
              className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-medium transition ${
                savedLocally
                  ? 'bg-neutral-100 text-neutral-500 cursor-default'
                  : 'border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <Bookmark className={`h-4 w-4 ${savedLocally ? 'fill-neutral-500' : ''}`} />
              <span>{savedLocally ? t('cardSavedInHistory') : t('cardSaveToHistory')}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition"
            >
              <Printer className="h-4 w-4" />
              <span>{t('cardPrintPdf')}</span>
            </button>

            {onReset && (
              <button
                onClick={onReset}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 py-2.5 px-4 text-xs font-medium text-white hover:bg-neutral-800 transition"
              >
                <RotateCcw className="h-4 w-4" />
                <span>{t('cardUploadAnother')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Right column: Symptoms, Treatment & Prevention */}
        <div className="space-y-6 lg:col-span-8">
          {/* Symptoms section */}
          <div>
            <h3 className="flex items-center gap-2 text-base font-semibold text-neutral-900">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              {t('cardSymptomsTitle')}
            </h3>
            <ul className="mt-3 space-y-2">
              {diagnosis.symptoms.map((symptom, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-sm text-neutral-700"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  <span className="leading-relaxed">{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-px bg-neutral-100" />

          {/* Treatment plan */}
          <div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="flex items-center gap-2 text-base font-semibold text-neutral-900">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                {t('cardTreatmentTitle')}
              </h3>

              {/* Segmented control for treatment type */}
              <div className="flex items-center gap-1 rounded-lg bg-neutral-100 p-1">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                    activeTab === 'all'
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {t('cardTabAll')}
                </button>
                <button
                  onClick={() => setActiveTab('organic')}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                    activeTab === 'organic'
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {t('cardTabOrganic')}
                </button>
                <button
                  onClick={() => setActiveTab('chemical')}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                    activeTab === 'chemical'
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {t('cardTabChemical')}
                </button>
              </div>
            </div>

            {/* Treatment list based on tab */}
            <div className="mt-4 space-y-3">
              {activeTab === 'all' && (
                <ol className="space-y-2.5">
                  {diagnosis.treatment.map((step, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 rounded-xl border border-neutral-100 bg-neutral-50/60 p-3 text-sm text-neutral-700"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-800">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              )}

              {activeTab === 'organic' && (
                <div className="space-y-2">
                  <p className="text-xs text-neutral-500 mb-2">
                    {t('cardOrganicNote')}
                  </p>
                  {(diagnosis.organicTreatment || diagnosis.treatment.slice(0, 2)).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 rounded-xl border border-green-100 bg-green-50/40 p-3 text-sm text-neutral-800"
                    >
                      <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'chemical' && (
                <div className="space-y-2">
                  <p className="text-xs text-neutral-500 mb-2">
                    {t('cardChemicalNote')}
                  </p>
                  {(diagnosis.chemicalTreatment || diagnosis.treatment.slice(2)).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 rounded-xl border border-neutral-200 bg-white p-3 text-sm text-neutral-800"
                    >
                      <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="h-px bg-neutral-100" />

          {/* Prevention tips */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900">
              {t('cardPreventionTitle')}
            </h3>
            <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {diagnosis.prevention.map((tip, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-neutral-100 bg-neutral-50/40 p-3 text-xs text-neutral-600 leading-relaxed"
                >
                  ✓ {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
