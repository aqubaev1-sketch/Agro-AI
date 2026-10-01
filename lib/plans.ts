export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface Plan {
  id: 'free' | 'basic' | 'pro';
  name: string;
  tagline: string;
  priceMonthly: number;
  currency: string;
  diagnosesPerMonth: number | 'unlimited';
  isPopular?: boolean;
  badge?: string;
  features: PlanFeature[];
  buttonText: string;
  ctaAction?: string;
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Для домашних растений и начинающих садоводов',
    priceMonthly: 0,
    currency: '$',
    diagnosesPerMonth: 5,
    features: [
      { text: '5 диагностик по фото в месяц', included: true },
      { text: 'Базовое определение болезни и уверенность %', included: true },
      { text: 'Рекомендации по симптомам и поливу', included: true },
      { text: 'История последних 3 проверок', included: true },
      { text: 'Экспорт отчета в PDF', included: false },
      { text: 'Доступ к API для разработчиков', included: false },
    ],
    buttonText: 'Начать бесплатно',
  },
  {
    id: 'basic',
    name: 'Basic',
    tagline: 'Для активных дачников и увлечённых коллекционеров',
    priceMonthly: 5,
    currency: '$',
    diagnosesPerMonth: 100,
    isPopular: true,
    badge: 'Популярный выбор',
    features: [
      { text: '100 диагностик по фото в месяц', included: true },
      { text: 'Высокоточный анализ нейросетью (>98%)', included: true },
      { text: 'Подробная схема лечения (органика + препараты)', included: true },
      { text: 'Неограниченная история в личном кабинете', included: true },
      { text: 'Экспорт отчетов в PDF', included: true },
      { text: 'Приоритетная обработка запросов', included: true },
      { text: 'Доступ к API для разработчиков', included: false },
    ],
    buttonText: 'Выбрать Basic',
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Для агрономов, теплиц, питомников и сервисных компаний',
    priceMonthly: 15,
    currency: '$',
    diagnosesPerMonth: 'unlimited',
    features: [
      { text: 'Неограниченное число диагностик', included: true },
      { text: 'Максимальная детализация патогенов и стадий', included: true },
      { text: 'Персональные протоколы защиты растений', included: true },
      { text: 'Экспорт профессиональных PDF-заключений', included: true },
      { text: 'REST API доступ (до 10 000 вызовов/мес)', included: true },
      { text: 'Пакетная загрузка фотографий', included: true },
      { text: 'Консультация агронома в чате поддержки', included: true },
    ],
    buttonText: 'Оформить Pro',
  },
];
