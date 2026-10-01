'use client';

import React, { useState } from 'react';
import { Plan } from '@/lib/plans';
import { useLanguage } from '@/context/language-context';
import { Check, Sparkles, Loader2 } from 'lucide-react';

interface PricingCardProps {
  plan: Plan;
  isCurrent?: boolean;
  onPlanSelected?: (planId: 'free' | 'basic' | 'pro') => void;
}

export function PricingCard({ plan, isCurrent = false, onPlanSelected }: PricingCardProps) {
  const { t, locale } = useLanguage();
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async () => {
    if (isCurrent) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: plan.id,
          planName: plan.name,
          price: plan.priceMonthly,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const msg =
          locale === 'kk'
            ? `✨ [Тест режимі] Тариф сәтті іске қосылды!\n\nТаңдалған тариф: ${plan.name} (${plan.priceMonthly === 0 ? 'Тегін' : `${plan.priceMonthly}$/ай`})`
            : `✨ [Тестовый режим] ${data.message || 'Подписка успешно оформлена!'}\n\nВыбран тариф: ${plan.name} (${plan.priceMonthly === 0 ? 'Бесплатно' : `${plan.priceMonthly}$/мес`})`;
        alert(msg);
        if (onPlanSelected) {
          onPlanSelected(plan.id);
        }
      } else {
        alert(data.error || 'Ошибка');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    } finally {
      setSubmitting(false);
    }
  };

  const getTranslatedTagline = (id: string) => {
    if (locale === 'kk') {
      if (id === 'free') return 'Үй өсімдіктері мен жаңадан бастаған бағбандар үшін';
      if (id === 'basic') return 'Белсенді саяжай иелері мен әуесқой өсімдік жинаушылар үшін';
      if (id === 'pro') return 'Агрономдар, жылыжайлар, питомниктер мен сервистік компаниялар үшін';
    }
    return plan.tagline;
  };

  const getTranslatedButtonText = (id: string) => {
    if (locale === 'kk') {
      if (id === 'free') return 'Тегін бастау';
      if (id === 'basic') return 'Basic таңдау';
      if (id === 'pro') return 'Pro рәсімдеу';
    }
    return plan.buttonText;
  };

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 ${
        plan.isPopular
          ? 'border-2 border-green-600 bg-white shadow-xl shadow-green-900/5 ring-4 ring-green-600/10 hover:shadow-2xl hover:shadow-green-900/15'
          : 'border border-neutral-200 bg-white hover:border-green-400 hover:shadow-xl hover:shadow-neutral-900/5 shadow-sm'
      }`}
    >
      {plan.isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="flex items-center gap-1.5 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-sm">
            <Sparkles className="h-3 w-3" />
            {locale === 'kk' ? 'Танымал таңдау' : plan.badge || 'Популярный'}
          </span>
        </div>
      )}

      <div>
        <div className="flex items-baseline justify-between">
          <h3 className="text-xl font-bold text-neutral-900">{plan.name}</h3>
          {isCurrent && (
            <span className="text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-md px-2 py-0.5">
              {t('pricingCurrentPlanTag')}
            </span>
          )}
        </div>

        <p className="mt-2 text-sm text-neutral-500 min-h-[40px]">{getTranslatedTagline(plan.id)}</p>

        <div className="mt-6 flex items-baseline gap-1">
          <span className="text-4xl font-extrabold tracking-tight text-neutral-900">
            {plan.priceMonthly === 0 ? '0' : plan.priceMonthly}
          </span>
          <span className="text-xl font-semibold text-neutral-900">{plan.currency}</span>
          <span className="text-sm font-medium text-neutral-500">/ {t('pricingMonth')}</span>
        </div>

        <div className="mt-2 text-xs font-medium text-neutral-600">
          {plan.diagnosesPerMonth === 'unlimited' ? (
            <span className="text-green-700 font-semibold">
              {locale === 'kk' ? 'Шектеусіз диагностика саны' : 'Неограниченное число диагностик'}
            </span>
          ) : (
            <span>
              {t('pricingLimit')}: <strong className="text-neutral-900">{plan.diagnosesPerMonth}</strong> {t('pricingPerMonth')}
            </span>
          )}
        </div>

        <div className="my-6 h-px bg-neutral-100" />

        <ul className="space-y-3 text-sm">
          {plan.features.map((feature, idx) => (
            <li
              key={idx}
              className={`flex items-start gap-3 ${
                feature.included ? 'text-neutral-700' : 'text-neutral-400 line-through opacity-60'
              }`}
            >
              <div
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                  feature.included
                    ? 'bg-green-100 text-green-700'
                    : 'bg-neutral-100 text-neutral-400'
                }`}
              >
                <Check className="h-3 w-3 stroke-[2.5]" />
              </div>
              <span className="leading-snug">{feature.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 pt-4 border-t border-neutral-100">
        <button
          onClick={handleSubscribe}
          disabled={submitting || isCurrent}
          className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold transition-all ${
            isCurrent
              ? 'bg-neutral-100 text-neutral-400 cursor-default'
              : plan.isPopular
              ? 'bg-green-600 text-white hover:bg-green-700 shadow-md shadow-green-600/20 active:scale-[0.99]'
              : 'border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50 hover:border-neutral-400'
          }`}
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{t('pricingProcessing')}</span>
            </>
          ) : isCurrent ? (
            t('pricingYourCurrentPlanBtn')
          ) : (
            getTranslatedButtonText(plan.id)
          )}
        </button>
      </div>
    </div>
  );
}
