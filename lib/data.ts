import {
  Building2,
  Clock,
  Dumbbell,
  Heart,
  Swords,
  Target,
  Trophy,
  Users,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const club = {
  name: "Импульс",
  tagline: "Спортивный клуб",
  hero: {
    badge: "Спортивный клуб «Импульс»",
    title: "Тренируйся на полную",
    subtitle:
      "Современные залы, опытные тренеры и удобное расписание — всё для твоего прогресса.",
    primaryCta: "Выбрать направление",
    secondaryCta: "Преимущества клуба",
  },
};

export type Stat = {
  value: string;
  label: string;
};

export const stats: Stat[] = [
  { value: "3", label: "клуба в городе" },
  { value: "40+", label: "тренеров" },
  { value: "120+", label: "занятий в неделю" },
  { value: "15 лет", label: "в фитнес-индустрии" },
];

export type Advantage = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export const advantages: Advantage[] = [
  {
    icon: Clock,
    title: "Удобное расписание",
    text: "Занятия с раннего утра до позднего вечера каждый день недели.",
  },
  {
    icon: Users,
    title: "Опытные тренеры",
    text: "Сертифицированные специалисты помогают достигать любых целей.",
  },
  {
    icon: Building2,
    title: "Современные залы",
    text: "Новое оборудование и комфортные зоны для силовых и кардио.",
  },
  {
    icon: Wallet,
    title: "Гибкие абонементы",
    text: "Тарифы под любой формат — от разовых занятий до годового абонемента.",
  },
];

export type Direction = {
  icon: LucideIcon;
  title: string;
  text: string;
  slug: string;
};

export const directions: Direction[] = [
  {
    icon: Dumbbell,
    title: "Фитнес",
    text: "Силовые и кардиотренировки для тела и выносливости.",
    slug: "fitnes",
  },
  {
    icon: Swords,
    title: "Единоборства",
    text: "Бокс, борьба и ММА для силы духа и тела.",
    slug: "edinoborstva",
  },
  {
    icon: Zap,
    title: "Кроссфит",
    text: "Интенсивные функциональные тренировки для всех уровней.",
    slug: "crossfit",
  },
  {
    icon: Heart,
    title: "Пилатес и йога",
    text: "Гибкость, баланс и восстановление после нагрузок.",
    slug: "pilates-yoga",
  },
  {
    icon: Target,
    title: "Персональные тренировки",
    text: "Индивидуальные программы под ваши цели и график.",
    slug: "personal",
  },
  {
    icon: Trophy,
    title: "Групповые классы",
    text: "Аэробика, танцы и командные занятия в кругу единомышленников.",
    slug: "group",
  },
];

export type Trainer = {
  id: string;
  name: string;
  photo: string;
  specialization: string;
  experience: string;
  description: string;
  directionSlugs: string[];
};

export const trainers: Trainer[] = [
  {
    id: "anna-smirnova",
    name: "Анна Смирнова",
    photo: "/assets/trainers/anna-smirnova.svg",
    specialization: "Фитнес и персональные тренировки",
    experience: "8 лет опыта",
    description:
      "Специалист по силовым тренировкам и коррекции фигуры. Помогает новичкам безопасно начать путь в фитнесе.",
    directionSlugs: ["fitnes", "personal"],
  },
  {
    id: "igor-volkov",
    name: "Игорь Волков",
    photo: "/assets/trainers/igor-volkov.svg",
    specialization: "Силовой фитнес и функциональный тренинг",
    experience: "10 лет опыта",
    description:
      "Мастер силовых программ и работы со свободными весами. Учит технике и помогает прогрессировать на каждом этапе.",
    directionSlugs: ["fitnes", "crossfit"],
  },
  {
    id: "mariya-kovalyova",
    name: "Мария Ковалёва",
    photo: "/assets/trainers/mariya-kovalyova.svg",
    specialization: "Кардио и фитнес",
    experience: "6 лет опыта",
    description:
      "Эксперт по кардиотренировкам и выносливости. Составляет программы для тонуса, энергии и хорошего настроения.",
    directionSlugs: ["fitnes"],
  },
  {
    id: "dmitriy-sokolov",
    name: "Дмитрий Соколов",
    photo: "/assets/trainers/dmitriy-sokolov.svg",
    specialization: "Бокс",
    experience: "12 лет опыта",
    description:
      "Тренер по боксу для любителей и тех, кто хочет освоить ударную технику, реакцию и уверенность в себе.",
    directionSlugs: ["edinoborstva"],
  },
  {
    id: "sergey-orlov",
    name: "Сергей Орлов",
    photo: "/assets/trainers/sergey-orlov.svg",
    specialization: "Борьба и ММА",
    experience: "15 лет опыта",
    description:
      "Наставник по борьбе и смешанным единоборствам. Готовит спортсменов к соревнованиям любого уровня.",
    directionSlugs: ["edinoborstva"],
  },
  {
    id: "artyom-lebedev",
    name: "Артём Лебедев",
    photo: "/assets/trainers/artyom-lebedev.svg",
    specialization: "ММА и кроссфит-кондиция",
    experience: "9 лет опыта",
    description:
      "Тренер по ММА с фокусом на функциональную подготовку бойца: взрывная сила, скорость и выносливость.",
    directionSlugs: ["edinoborstva", "crossfit"],
  },
  {
    id: "olga-nikitina",
    name: "Ольга Никитина",
    photo: "/assets/trainers/olga-nikitina.svg",
    specialization: "Кроссфит и групповые классы",
    experience: "7 лет опыта",
    description:
      "Заряжает энергией на кроссфите и групповых занятиях. Любит видеть прогресс каждого участника команды.",
    directionSlugs: ["crossfit", "group"],
  },
  {
    id: "pavel-eryomin",
    name: "Павел Ерёмин",
    photo: "/assets/trainers/pavel-eryomin.svg",
    specialization: "Кроссфит",
    experience: "5 лет опыта",
    description:
      "Молодой и амбициозный тренер по функциональным тренировкам. Адаптирует нагрузку под любой уровень подготовки.",
    directionSlugs: ["crossfit"],
  },
  {
    id: "ekaterina-morozova",
    name: "Екатерина Морозова",
    photo: "/assets/trainers/ekaterina-morozova.svg",
    specialization: "Функциональный тренинг",
    experience: "6 лет опыта",
    description:
      "Специалист по функциональным тренировкам и восстановлению после нагрузок. Ведёт к целям через баланс и технику.",
    directionSlugs: ["crossfit"],
  },
  {
    id: "yuliya-vinogradova",
    name: "Юлия Виноградова",
    photo: "/assets/trainers/yuliya-vinogradova.svg",
    specialization: "Йога и пилатес",
    experience: "11 лет опыта",
    description:
      "Сертифицированный инструктор по йоге и пилатесу. Помогает улучшить гибкость, осанку и внутренний баланс.",
    directionSlugs: ["pilates-yoga"],
  },
  {
    id: "anastasiya-belova",
    name: "Анастасия Белова",
    photo: "/assets/trainers/anastasiya-belova.svg",
    specialization: "Пилатес",
    experience: "5 лет опыта",
    description:
      "Тренер по пилатесу для укрепления мышц кора и профилактики травм. Внимательна к технике каждого движения.",
    directionSlugs: ["pilates-yoga"],
  },
  {
    id: "andrey-krylov",
    name: "Андрей Крылов",
    photo: "/assets/trainers/andrey-krylov.svg",
    specialization: "Персональные тренировки",
    experience: "14 лет опыта",
    description:
      "Один из ведущих персональных тренеров клуба. Разрабатывает индивидуальные программы под цели и образ жизни.",
    directionSlugs: ["personal", "fitnes"],
  },
  {
    id: "irina-solovyova",
    name: "Ирина Соловьёва",
    photo: "/assets/trainers/irina-solovyova.svg",
    specialization: "Персональные тренировки и фитнес",
    experience: "8 лет опыта",
    description:
      "Персональный тренер для женщин: комфортный формат тренировок, контроль питания и устойчивый результат.",
    directionSlugs: ["personal", "fitnes"],
  },
  {
    id: "natalya-zaytseva",
    name: "Наталья Зайцева",
    photo: "/assets/trainers/natalya-zaytseva.svg",
    specialization: "Групповые классы и аэробика",
    experience: "9 лет опыта",
    description:
      "Харизматичный тренер групповых программ. Делает тренировки яркими, музыкальными и очень результативными.",
    directionSlugs: ["group", "fitnes"],
  },
];

export type Club = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  workHours: {
    weekdays: string;
    weekends: string;
  };
};

export const clubs: Club[] = [
  {
    id: "central",
    name: "Импульс Центр",
    address: "ул. Ленина, 12",
    phone: "+7 (495) 120-45-01",
    email: "central@impulse-fit.ru",
    workHours: {
      weekdays: "07:00 – 23:00",
      weekends: "09:00 – 22:00",
    },
  },
  {
    id: "north",
    name: "Импульс Северный",
    address: "пр. Мира, 78",
    phone: "+7 (495) 120-45-02",
    email: "north@impulse-fit.ru",
    workHours: {
      weekdays: "07:00 – 23:00",
      weekends: "09:00 – 21:00",
    },
  },
  {
    id: "south",
    name: "Импульс Южный",
    address: "ул. Гагарина, 5",
    phone: "+7 (495) 120-45-03",
    email: "south@impulse-fit.ru",
    workHours: {
      weekdays: "08:00 – 22:00",
      weekends: "10:00 – 20:00",
    },
  },
];

export type Tariff = {
  id: string;
  name: string;
  description: string;
  price: number;
  periodLabel: string;
  duration: string;
  features: string[];
  popular?: boolean;
};

export const tariffs: Tariff[] = [
  {
    id: "single-visit",
    name: "Разовый визит",
    description: "Пробная тренировка или разовое посещение без абонемента.",
    price: 500,
    periodLabel: "за визит",
    duration: "1 день",
    features: [
      "Тренажёрный зал и кардиозона",
      "Групповое занятие по расписанию",
      "Раздевалка и душевые",
      "Консультация тренера при первом визите",
    ],
  },
  {
    id: "gym-month",
    name: "Тренажёрный зал",
    description: "Безлимитный доступ к тренажёрному залу на целый месяц.",
    price: 2900,
    periodLabel: "в месяц",
    duration: "30 дней",
    features: [
      "Тренажёрный зал без ограничений",
      "Кардиозона и свободные веса",
      "Фитнес-тестирование при старте",
      "Раздевалка и душевые",
      "Пауза абонемента до 7 дней",
    ],
    popular: true,
  },
  {
    id: "all-directions-month",
    name: "Все направления",
    description: "Полный доступ к залу, групповым классам и единоборствам.",
    price: 4900,
    periodLabel: "в месяц",
    duration: "30 дней",
    features: [
      "Тренажёрный зал без ограничений",
      "Все групповые классы",
      "Единоборства и кроссфит",
      "Пауза абонемента до 14 дней",
      "Раздевалка и душевые",
    ],
  },
  {
    id: "impulse-max-year",
    name: "Импульс MAX",
    description: "Годовой абонемент с максимальными условиями для прогресса.",
    price: 39900,
    periodLabel: "в год",
    duration: "12 месяцев",
    features: [
      "Все направления во всех клубах сети",
      "Персональная программа тренировок",
      "Заморозка абонемента до 60 дней",
      "Приоритетная запись на занятия",
      "Гостевые визиты — 4 в год",
    ],
  },
];

export const weekDays = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
] as const;

export type ScheduleLesson = {
  id: string;
  directionSlug: string;
  clubId: string;
  dayIndex: number;
  time: string;
  duration: string;
  trainer: string;
  trainerId: string;
  gym: string;
};

export const scheduleLessons: ScheduleLesson[] = [
  {
    id: "fitnes-central-mon",
    directionSlug: "fitnes",
    clubId: "central",
    dayIndex: 0,
    time: "09:00",
    duration: "60 мин",
    trainer: "Анна Смирнова",
    trainerId: "anna-smirnova",
    gym: "Зал силовых тренировок",
  },
  {
    id: "fitnes-north-wed",
    directionSlug: "fitnes",
    clubId: "north",
    dayIndex: 2,
    time: "18:30",
    duration: "60 мин",
    trainer: "Игорь Волков",
    trainerId: "igor-volkov",
    gym: "Тренажёрный зал",
  },
  {
    id: "fitnes-south-fri",
    directionSlug: "fitnes",
    clubId: "south",
    dayIndex: 4,
    time: "19:00",
    duration: "60 мин",
    trainer: "Мария Ковалёва",
    trainerId: "mariya-kovalyova",
    gym: "Кардиозона",
  },
  {
    id: "edinoborstva-central-tue",
    directionSlug: "edinoborstva",
    clubId: "central",
    dayIndex: 1,
    time: "20:00",
    duration: "90 мин",
    trainer: "Дмитрий Соколов",
    trainerId: "dmitriy-sokolov",
    gym: "Боксёрский зал",
  },
  {
    id: "edinoborstva-south-thu",
    directionSlug: "edinoborstva",
    clubId: "south",
    dayIndex: 3,
    time: "19:30",
    duration: "90 мин",
    trainer: "Сергей Орлов",
    trainerId: "sergey-orlov",
    gym: "Зал борьбы",
  },
  {
    id: "edinoborstva-north-sat",
    directionSlug: "edinoborstva",
    clubId: "north",
    dayIndex: 5,
    time: "11:00",
    duration: "90 мин",
    trainer: "Артём Лебедев",
    trainerId: "artyom-lebedev",
    gym: "ММА-зал",
  },
  {
    id: "crossfit-north-mon",
    directionSlug: "crossfit",
    clubId: "north",
    dayIndex: 0,
    time: "19:00",
    duration: "60 мин",
    trainer: "Ольга Никитина",
    trainerId: "olga-nikitina",
    gym: "Кроссфит-зона",
  },
  {
    id: "crossfit-central-wed",
    directionSlug: "crossfit",
    clubId: "central",
    dayIndex: 2,
    time: "08:30",
    duration: "60 мин",
    trainer: "Павел Ерёмин",
    trainerId: "pavel-eryomin",
    gym: "Кроссфит-зона",
  },
  {
    id: "crossfit-south-sun",
    directionSlug: "crossfit",
    clubId: "south",
    dayIndex: 6,
    time: "10:00",
    duration: "60 мин",
    trainer: "Екатерина Морозова",
    trainerId: "ekaterina-morozova",
    gym: "Функциональный зал",
  },
  {
    id: "pilates-central-mon",
    directionSlug: "pilates-yoga",
    clubId: "central",
    dayIndex: 0,
    time: "12:00",
    duration: "60 мин",
    trainer: "Юлия Виноградова",
    trainerId: "yuliya-vinogradova",
    gym: "Студия йоги",
  },
  {
    id: "pilates-south-tue",
    directionSlug: "pilates-yoga",
    clubId: "south",
    dayIndex: 1,
    time: "18:00",
    duration: "60 мин",
    trainer: "Анастасия Белова",
    trainerId: "anastasiya-belova",
    gym: "Студия пилатеса",
  },
  {
    id: "pilates-north-thu",
    directionSlug: "pilates-yoga",
    clubId: "north",
    dayIndex: 3,
    time: "10:00",
    duration: "60 мин",
    trainer: "Юлия Виноградова",
    trainerId: "yuliya-vinogradova",
    gym: "Студия йоги",
  },
  {
    id: "personal-central-fri",
    directionSlug: "personal",
    clubId: "central",
    dayIndex: 4,
    time: "16:00",
    duration: "60 мин",
    trainer: "Андрей Крылов",
    trainerId: "andrey-krylov",
    gym: "Персональный зал",
  },
  {
    id: "personal-south-sat",
    directionSlug: "personal",
    clubId: "south",
    dayIndex: 5,
    time: "14:00",
    duration: "60 мин",
    trainer: "Ирина Соловьёва",
    trainerId: "irina-solovyova",
    gym: "Персональный зал",
  },
  {
    id: "personal-north-sun",
    directionSlug: "personal",
    clubId: "north",
    dayIndex: 6,
    time: "12:30",
    duration: "60 мин",
    trainer: "Андрей Крылов",
    trainerId: "andrey-krylov",
    gym: "Персональный зал",
  },
  {
    id: "group-central-tue",
    directionSlug: "group",
    clubId: "central",
    dayIndex: 1,
    time: "19:00",
    duration: "60 мин",
    trainer: "Наталья Зайцева",
    trainerId: "natalya-zaytseva",
    gym: "Аэробный зал",
  },
  {
    id: "group-north-fri",
    directionSlug: "group",
    clubId: "north",
    dayIndex: 4,
    time: "09:30",
    duration: "60 мин",
    trainer: "Ольга Никитина",
    trainerId: "olga-nikitina",
    gym: "Танцевальный зал",
  },
  {
    id: "group-south-sat",
    directionSlug: "group",
    clubId: "south",
    dayIndex: 5,
    time: "12:00",
    duration: "60 мин",
    trainer: "Наталья Зайцева",
    trainerId: "natalya-zaytseva",
    gym: "Аэробный зал",
  },
];

export type DemoProfile = {
  phone: string;
  birthDate: string;
  memberSince: string;
};

export const demoProfile: DemoProfile = {
  phone: "+7 (900) 123-45-67",
  birthDate: "1994-05-14",
  memberSince: "2025-03-10",
};

export type SubscriptionInfo = {
  tariffId: string;
  activatedOn: string;
  expiresOn: string;
};

export const demoSubscription: SubscriptionInfo = {
  tariffId: "all-directions-month",
  activatedOn: "2026-09-01",
  expiresOn: "2026-10-01",
};

export const demoBookingLessonIds: string[] = [
  "fitnes-central-mon",
  "edinoborstva-central-tue",
  "crossfit-north-mon",
  "pilates-south-tue",
];
