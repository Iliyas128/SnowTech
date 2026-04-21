import { TrendingUp, Clock, Users, type LucideIcon } from 'lucide-react';

const toSorted = (modules: Record<string, unknown>): string[] =>
  Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => (mod as { default: string }).default);

const supratradeImages = toSorted(
  import.meta.glob('@/assets/supratrade/*.{jpg,jpeg,png,webp}', { eager: true }),
);
const autoRentImages = toSorted(
  import.meta.glob('@/assets/autoRent/*.{jpg,jpeg,png,webp}', { eager: true }),
);
const blueberryImages = toSorted(
  import.meta.glob('@/assets/blueberry/*.{jpg,jpeg,png,webp}', { eager: true }),
);
const mosSeptikImages = toSorted(
  import.meta.glob('@/assets/mos-septik/*.{jpg,jpeg,png,webp}', { eager: true }),
);
const airGunImages = toSorted(
  import.meta.glob('@/assets/air-gun/*.{jpg,jpeg,png,webp}', { eager: true }),
);
const zapImportImages = toSorted(
  import.meta.glob('@/assets/zapimport/*.{jpg,jpeg,png,webp}', { eager: true }),
);

export type CaseResult = {
  icon: LucideIcon;
  labelKey: string;
};

export type CaseItem = {
  id: string;
  titleKey: string;
  clientKey: string;
  descriptionKey: string;
  longDescriptionKey: string;
  gallery: string[];
  cover: string;
  results: CaseResult[];
  tags: string[];
  liveUrl?: string;
};

export const cases: CaseItem[] = [
  {
    id: 'supratrade',
    titleKey: 'cases.supratrade.title',
    clientKey: 'cases.supratrade.client',
    descriptionKey: 'cases.supratrade.description',
    longDescriptionKey: 'cases.supratrade.long',
    gallery: supratradeImages,
    cover: supratradeImages[0],
    results: [
      { icon: TrendingUp, labelKey: 'cases.supratrade.result1' },
      { icon: Clock, labelKey: 'cases.supratrade.result2' },
      { icon: Users, labelKey: 'cases.supratrade.result3' },
    ],
    tags: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Tailwind'],
    liveUrl: 'https://supratrade.kz',
  },
  {
    id: 'autoRent',
    titleKey: 'cases.autoRent.title',
    clientKey: 'cases.autoRent.client',
    descriptionKey: 'cases.autoRent.description',
    longDescriptionKey: 'cases.autoRent.long',
    gallery: autoRentImages,
    cover: autoRentImages[0],
    results: [
      { icon: TrendingUp, labelKey: 'cases.autoRent.result1' },
      { icon: Clock, labelKey: 'cases.autoRent.result2' },
      { icon: Users, labelKey: 'cases.autoRent.result3' },
    ],
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Framer Motion'],
  },
  {
    id: 'mosSeptik',
    titleKey: 'cases.mosSeptik.title',
    clientKey: 'cases.mosSeptik.client',
    descriptionKey: 'cases.mosSeptik.description',
    longDescriptionKey: 'cases.mosSeptik.long',
    gallery: mosSeptikImages,
    cover: mosSeptikImages[0],
    results: [
      { icon: TrendingUp, labelKey: 'cases.mosSeptik.result1' },
      { icon: Clock, labelKey: 'cases.mosSeptik.result2' },
      { icon: Users, labelKey: 'cases.mosSeptik.result3' },
    ],
    tags: ['React', 'Next.js', 'SEO', 'Tailwind', 'CRM'],
    liveUrl: 'https://mos-septik23.ru/',
  },
  {
    id: 'blueberry',
    titleKey: 'cases.blueberry.title',
    clientKey: 'cases.blueberry.client',
    descriptionKey: 'cases.blueberry.description',
    longDescriptionKey: 'cases.blueberry.long',
    gallery: blueberryImages,
    cover: blueberryImages[0],
    results: [
      { icon: TrendingUp, labelKey: 'cases.blueberry.result1' },
      { icon: Clock, labelKey: 'cases.blueberry.result2' },
      { icon: Users, labelKey: 'cases.blueberry.result3' },
    ],
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Telegram Bot'],
    liveUrl: 'https://blueberrycoast.ru/',
  },
  {
    id: 'airGun',
    titleKey: 'cases.airGun.title',
    clientKey: 'cases.airGun.client',
    descriptionKey: 'cases.airGun.description',
    longDescriptionKey: 'cases.airGun.long',
    gallery: airGunImages,
    cover: airGunImages[0],
    results: [
      { icon: TrendingUp, labelKey: 'cases.airGun.result1' },
      { icon: Clock, labelKey: 'cases.airGun.result2' },
      { icon: Users, labelKey: 'cases.airGun.result3' },
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    liveUrl: 'https://www.air-gun.ru/',
  },
  {
    id: 'zapImport',
    titleKey: 'cases.zapImport.title',
    clientKey: 'cases.zapImport.client',
    descriptionKey: 'cases.zapImport.description',
    longDescriptionKey: 'cases.zapImport.long',
    gallery: zapImportImages,
    cover: zapImportImages[0],
    results: [
      { icon: TrendingUp, labelKey: 'cases.zapImport.result1' },
      { icon: Clock, labelKey: 'cases.zapImport.result2' },
      { icon: Users, labelKey: 'cases.zapImport.result3' },
    ],
    tags: ['React', 'Node.js', 'PostgreSQL', 'Parsing', 'REST API'],
  },
];

const featuredIds = ['mosSeptik', 'airGun', 'blueberry'] as const;

export const featuredCases: CaseItem[] = featuredIds
  .map((id) => cases.find((c) => c.id === id))
  .filter((c): c is CaseItem => Boolean(c));
