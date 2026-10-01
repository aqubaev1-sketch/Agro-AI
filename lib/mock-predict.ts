export interface DiagnosisResult {
  id: string;
  plant: string;
  scientificName?: string;
  disease: string;
  diseaseLatin?: string;
  confidence: number; // e.g. 96 for 96%
  severity: 'low' | 'medium' | 'high' | 'critical';
  symptoms: string[];
  treatment: string[];
  organicTreatment?: string[];
  chemicalTreatment?: string[];
  prevention: string[];
  timestamp: string;
  imageUrl?: string;
}

export const SAMPLE_DIAGNOSES: DiagnosisResult[] = [
  {
    id: 'diag-tomato-early-blight',
    plant: 'Томат (Помидор)',
    scientificName: 'Solanum lycopersicum',
    disease: 'Альтернариоз (Ранняя сухая пятнистость)',
    diseaseLatin: 'Alternaria solani',
    confidence: 96,
    severity: 'medium',
    imageUrl: '/images/sample_tomato.jpg',
    symptoms: [
      'Концентрические коричневые пятна в виде колец-мишеней на нижних листьях',
      'Хлороз (пожелтение) листовой пластины вокруг очагов поражения',
      'Постепенное увядание и опадание нижнего яруса листьев',
      'Темные вдавленные пятна на стебле у основания черешков',
    ],
    treatment: [
      'Удалите и уничтожьте сильно пораженные нижние листья секатором, дезинфицируя лезвие спиртом после каждого среза',
      'Прекратите дождевание: поливайте строго под корень в утренние часы',
      'Обработайте растение биологическим фунгицидом (Фитоспорин-М или Алирин-Б) каждые 7–10 дней',
      'При тяжелом течении примените медьсодержащий препарат (ХОМ, Оксихом или 1% бордоскую жидкость)',
    ],
    organicTreatment: [
      'Опрыскивание раствором биофунгицида Фитоспорин-М Реаниматор',
      'Мульчирование почвы соломой слоем 5–7 см для исключения контакта листьев с землей',
      'Настой золы с хозяйственным мылом для укрепления кутикулы листа',
    ],
    chemicalTreatment: [
      'ХОМ (хлорокись меди) 40 г на 10 л воды',
      'Скор или Ридомил Голд (строго до фазы созревания плодов)',
    ],
    prevention: [
      'Соблюдайте севооборот: не сажайте томаты после картофеля и баклажанов',
      'Обеспечьте циркуляцию воздуха в теплице через регулярное проветривание',
      'Поддерживайте расстояние между кустами не менее 50–60 см',
    ],
    timestamp: '2026-09-30T10:15:00Z',
  },
  {
    id: 'diag-monstera-chlorosis',
    plant: 'Монстера деликатесная',
    scientificName: 'Monstera deliciosa',
    disease: 'Краевой хлороз листьев (Нарушение режима полива и дефицит железа)',
    diseaseLatin: 'Chlorosis physiologica',
    confidence: 94,
    severity: 'low',
    imageUrl: '/images/sample_monstera.jpg',
    symptoms: [
      'Пожелтение краевой зоны листьев с сохранением зеленых прожилок',
      'Потеря тургора и легкое истончение молодых листьев',
      'Вялость черешков при влажном грунте в глубине горшка',
    ],
    treatment: [
      'Проверьте влажность кома на глубине 3–4 см деревянной шпажкой: дайте верхнему слою просохнуть',
      'Убедитесь в наличии дренажных отверстий и слейте застоявшуюся воду из кашпо',
      'Проведите внекорневую подкормку хелатом железа (Феровит) 1 раз в 14 дней',
      'Переставьте растение на 1–1.5 метра ближе к источнику мягкого рассеянного света',
    ],
    organicTreatment: [
      'Полив отстоянной фильтрованной водой комнатной температуры',
      'Опрыскивание янтарной кислотой (1 таблетка на 1 л воды) для антистресс-эффекта',
    ],
    chemicalTreatment: [
      'Хелат железа (Феровит или Микро-Фе) по листу',
    ],
    prevention: [
      'Используйте рыхлый субстрат с перлитом и кокосовыми чипсами',
      'Избегайте холодных сквозняков и контакта с кондиционером',
    ],
    timestamp: '2026-09-29T14:40:00Z',
  },
  {
    id: 'diag-apple-scab',
    plant: 'Яблоня домашняя',
    scientificName: 'Malus domestica',
    disease: 'Парша яблони',
    diseaseLatin: 'Venturia inaequalis',
    confidence: 97,
    severity: 'medium',
    imageUrl: '/images/sample_apple.jpg',
    symptoms: [
      'Округлые бархатистые оливково-бурые пятна с верхней стороны листьев',
      'Преждевременное пожелтение и ранний листопад пораженной листвы',
      'Растрескивание и опробковение кожицы завязей плодов',
    ],
    treatment: [
      'Соберите и сожгите или глубоко закопайте опавшую зараженную листву',
      'Проведите обработку фунгицидом Скор (2 мл на 10 л) или Хорус в фазу зеленого конуса',
      'Через 10–14 дней повторите опрыскивание биопрепаратом Фитолавин или Гамаир',
    ],
    organicTreatment: [
      'Осеннее и ранневесеннее опрыскивание кроны и приствольного круга 5% раствором мочевины',
      'Биопрепарат Бактофит по инструкции',
    ],
    chemicalTreatment: [
      'Фунгицид Хорус или Скор',
      '1% бордоская смесь после цветения',
    ],
    prevention: [
      'Санитарная весенняя обрезка для хорошей аэрации кроны',
      'Посадка сортов яблони с генетической устойчивостью к парше (Имант, Свежесть, Веньяминовское)',
    ],
    timestamp: '2026-09-28T09:20:00Z',
  },
  {
    id: 'diag-cucumber-mildew',
    plant: 'Огурец обыкновенный',
    scientificName: 'Cucumis sativus',
    disease: 'Мучнистая роса',
    diseaseLatin: 'Podosphaera xanthii',
    confidence: 98,
    severity: 'high',
    imageUrl: '/images/sample_tomato.jpg',
    symptoms: [
      'Белый мучнистый налет на верхней стороне листьев, напоминающий рассыпанную муку',
      'Постепенное побурение и засыхание листовой пластины',
      'Замедление роста плетей и сброс цветков',
    ],
    treatment: [
      'Срочно удалите нижние листья с плотным белым налетом',
      'Обработайте растения препаратом Топаз (2 мл на 10 л) или Тиовит Джет (коллоидная сера)',
      'Снизьте азотные подкормки, внесите калий и фосфор (монофосфат калия)',
    ],
    organicTreatment: [
      'Молочная сыворотка с йодом (1 л сыворотки + 9 л воды + 10 капель йода)',
      'Настой прелого сена с палочкой Bacillus subtilis',
    ],
    chemicalTreatment: [
      'Фунгицид Топаз (пенконазол)',
      'Тиовит Джет (при температуре воздуха выше 20°C)',
    ],
    prevention: [
      'Избегайте полива холодной водой',
      'Регулярное проветривание теплиц при высокой влажности',
    ],
    timestamp: '2026-09-27T16:10:00Z',
  },
];

/**
 * Generates a mock prediction result matching the requested JSON format:
 * { plant, disease, confidence, symptoms, treatment }
 * with extended rich metadata for realistic diagnostic cards.
 */
export function generateMockPrediction(seedHint?: string): DiagnosisResult {
  // If hint matches specific sample, return corresponding diagnosis
  if (seedHint) {
    const hintLower = seedHint.toLowerCase();
    if (hintLower.includes('tomat') || hintLower.includes('помидор') || hintLower.includes('tomato')) {
      return { ...SAMPLE_DIAGNOSES[0], id: `diag-${Date.now()}`, timestamp: new Date().toISOString() };
    }
    if (hintLower.includes('monstera') || hintLower.includes('монстер') || hintLower.includes('chlorosis')) {
      return { ...SAMPLE_DIAGNOSES[1], id: `diag-${Date.now()}`, timestamp: new Date().toISOString() };
    }
    if (hintLower.includes('apple') || hintLower.includes('ябло') || hintLower.includes('scab')) {
      return { ...SAMPLE_DIAGNOSES[2], id: `diag-${Date.now()}`, timestamp: new Date().toISOString() };
    }
    if (hintLower.includes('cucumber') || hintLower.includes('огур') || hintLower.includes('mildew')) {
      return { ...SAMPLE_DIAGNOSES[3], id: `diag-${Date.now()}`, timestamp: new Date().toISOString() };
    }
  }

  // Otherwise return random diagnosis from library
  const index = Math.floor(Math.random() * SAMPLE_DIAGNOSES.length);
  const base = SAMPLE_DIAGNOSES[index];
  return {
    ...base,
    id: `diag-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    confidence: Math.floor(92 + Math.random() * 7), // 92% to 98%
    timestamp: new Date().toISOString(),
  };
}
