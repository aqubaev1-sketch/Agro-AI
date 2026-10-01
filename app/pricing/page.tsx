'use client';

import React, { useState } from 'react';
import { PLANS } from '@/lib/plans';
import { PricingCard } from '@/components/PricingCard';
import { useAuth } from '@/context/auth-context';
import { useLanguage } from '@/context/language-context';
import { ChevronDown, Check } from 'lucide-react';

export default function PricingPage() {
  const { user, updatePlan } = useAuth();
  const { t, locale } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: locale === 'kk' ? 'Айына диагностика лимиті қалай есептеледі?' : 'Как считается лимит диагностик в месяц?',
      a: locale === 'kk'
        ? 'Лимит әр күнтізбелік айдың 1-і күні жаңартылады. Free тарифінде 5 тегін тексеру бар. Лимит таусылса, 1 басу арқылы Basic тарифіне өте аласыз.'
        : 'Лимит обновляется 1-го числа каждого календарного месяца. На тарифе Free доступно 5 бесплатных проверок. Если лимит исчерпан, вы можете перейти на тариф Basic в 1 клик.',
    },
    {
      q: locale === 'kk' ? 'Төлем сынағы қалай жұмыс істейді?' : 'Как работает заглушка оплаты?',
      a: locale === 'kk'
        ? 'Стартаптың қазіргі нұсқасында нақты банк карталарын өңдеу өшірулі. Түймені басқан кезде жеке кабинетте тарифті бірден ауыстыратын `/api/subscription` бағытына тесттік сұраныс жіберіледі.'
        : 'В текущей версии стартапа реальная обработка банковских карт отключена. При нажатии на кнопку отправляется тестовый запрос на серверный Route Handler `/api/subscription`, который мгновенно переключает ваш план в личном кабинете.',
    },
    {
      q: locale === 'kk' ? 'PDF есебіне не кіреді?' : 'Что входит в экспорт отчета в PDF?',
      a: locale === 'kk'
        ? 'PDF-қорытындысында жапырақ суреті, ЖИ сенімділік пайызы, қоздырғыштың латынша атауы, белгілер тізімі, препарат мөлшерлері және карантин ережелері көрсетіледі.'
        : 'PDF-заключение содержит фотографию листа, процент уверенности ИИ, латинское название патогена, список внешних симптомов, дозировки препаратов и правила карантина. Готово к печати или отправке в агролабораторию.',
    },
    {
      q: locale === 'kk' ? 'Өз жылыжайым немесе қолданбам үшін API-ді қалай қосуға болады?' : 'Как подключить API для своего приложения или теплицы?',
      a: locale === 'kk'
        ? 'Pro тарифінде сіз жеке кабинеттен жеке REST API кілтін аласыз. Сіз фотосуреттерді HTTP POST сұранысымен жіберіп, ЖИ қорытындысын тікелей жүйеңізге ала аласыз.'
        : 'На тарифе Pro вы получаете персональный REST API ключ в личном кабинете. Вы сможете отправлять фотографии через HTTP POST запрос и получать JSON-ответ с диагнозом прямо в вашу систему управления микроклиматом или ERP.',
    },
  ];

  const handlePlanSelected = (planId: 'free' | 'basic' | 'pro') => {
    updatePlan(planId);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Title */}
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-xs font-bold uppercase tracking-wider text-green-700">
          {t('pricingBadge')}
        </h1>
        <p className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl text-balance">
          {t('pricingTitle')}
        </p>
        <p className="mt-4 text-base text-neutral-600">
          {t('pricingSubtitle')}
        </p>

        {user && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 px-4 py-1.5 text-xs text-green-800">
            <span>{t('pricingCurrentAccount')}: <strong>{user.fullName}</strong></span>
            <span>·</span>
            <span>{t('pricingActivePlan')}: <strong className="uppercase">{user.planId}</strong></span>
          </div>
        )}
      </div>

      {/* Pricing Cards Grid */}
      <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8 items-stretch">
        {PLANS.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            isCurrent={user?.planId === plan.id}
            onPlanSelected={handlePlanSelected}
          />
        ))}
      </div>

      {/* Feature Comparison Table */}
      <div className="mt-20 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        <div className="p-6 sm:p-8 border-b border-neutral-200 bg-neutral-50/50">
          <h2 className="text-xl font-bold text-neutral-900">
            {t('pricingCompareTitle')}
          </h2>
          <p className="mt-1 text-xs text-neutral-500">
            {t('pricingCompareSubtitle')}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/30 text-xs font-semibold uppercase text-neutral-500">
                <th className="py-4 px-6">{t('pricingFeatureName')}</th>
                <th className="py-4 px-6 text-center">Free</th>
                <th className="py-4 px-6 text-center text-green-700 bg-green-50/30">Basic</th>
                <th className="py-4 px-6 text-center">Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              <tr>
                <td className="py-4 px-6 font-medium text-neutral-900">
                  {locale === 'kk' ? 'Айына диагностика саны' : 'Диагностик в месяц'}
                </td>
                <td className="py-4 px-6 text-center tabular-nums">5</td>
                <td className="py-4 px-6 text-center tabular-nums font-semibold text-green-700 bg-green-50/30">100</td>
                <td className="py-4 px-6 text-center font-semibold">{locale === 'kk' ? 'Шектеусіз' : 'Безлимитно'}</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-neutral-900">
                  {locale === 'kk' ? 'Қоздырғышты және дәлдік % анықтау' : 'Определение возбудителя и уверенность %'}
                </td>
                <td className="py-4 px-6 text-center"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
                <td className="py-4 px-6 text-center bg-green-50/30"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
                <td className="py-4 px-6 text-center"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-neutral-900">
                  {locale === 'kk' ? 'Емдеу сызбасы (био және фунгицидтер)' : 'Схемы лечения (органика и фунгициды)'}
                </td>
                <td className="py-4 px-6 text-center"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
                <td className="py-4 px-6 text-center bg-green-50/30"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
                <td className="py-4 px-6 text-center"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-neutral-900">
                  {locale === 'kk' ? 'Тексерулер тарихы' : 'История сканирований'}
                </td>
                <td className="py-4 px-6 text-center text-xs text-neutral-500">{locale === 'kk' ? 'Соңғы 3' : 'Последние 3'}</td>
                <td className="py-4 px-6 text-center bg-green-50/30 text-xs font-semibold text-green-700">{locale === 'kk' ? 'Шектеусіз' : 'Без ограничений'}</td>
                <td className="py-4 px-6 text-center text-xs font-semibold">{locale === 'kk' ? 'Шектеусіз' : 'Без ограничений'}</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-neutral-900">
                  {locale === 'kk' ? 'PDF есебіне экспорт' : 'Экспорт в PDF'}
                </td>
                <td className="py-4 px-6 text-center text-neutral-300">—</td>
                <td className="py-4 px-6 text-center bg-green-50/30"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
                <td className="py-4 px-6 text-center"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-neutral-900">
                  {locale === 'kk' ? 'API қолжетімділігі' : 'Доступ к API'}
                </td>
                <td className="py-4 px-6 text-center text-neutral-300">—</td>
                <td className="py-4 px-6 text-center bg-green-50/30 text-neutral-300">—</td>
                <td className="py-4 px-6 text-center"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="mt-20 mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold text-center text-neutral-900">
          {t('pricingFaqTitle')}
        </h2>

        <div className="mt-8 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-neutral-400 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-neutral-100 bg-neutral-50/50 p-5 text-xs text-neutral-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
