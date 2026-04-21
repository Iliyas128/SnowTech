import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import SEO from '@/components/SEO';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { generateBreadcrumbSchema } from '@/utils/seo';
import CaseModal from '@/components/CaseModal';
import { cases, type CaseItem } from '@/data/casesData';

const Cases = () => {
  const { t, language } = useLanguage();
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const [activeCase, setActiveCase] = useState<CaseItem | null>(null);

  const seoData = {
    ru: {
      title: 'Наши проекты | SnowTech — Кейсы и портфолио',
      description:
        'Реальные кейсы с измеримыми результатами. Смотрите, как мы помогаем бизнесу расти с помощью IT-решений.',
      keywords:
        'кейсы SnowTech, портфолио IT-компании, примеры работ, проекты разработки сайтов, успешные кейсы',
    },
    en: {
      title: 'Our Projects | SnowTech — Cases and Portfolio',
      description:
        'Real cases with measurable results. See how we help businesses grow with IT solutions.',
      keywords:
        'SnowTech cases, IT company portfolio, work examples, website development projects, success cases',
    },
    kz: {
      title: 'Біздің жобалар | SnowTech — Кейстер және портфолио',
      description:
        'Өлшенетін нәтижелері бар нақты кейстер. Бизнестің өсуіне қалай көмектесетінімізді қараңыз.',
      keywords:
        'SnowTech кейстері, IT компания портфолиосы, жұмыс мысалдары, сайт әзірлеу жобалары, табысты кейстер',
    },
  };

  const currentSeo = seoData[language] || seoData.ru;

  const structuredData = generateBreadcrumbSchema([
    { name: 'Главная', url: '/' },
    { name: 'Кейсы', url: '/cases' },
  ]);

  return (
    <>
      <SEO
        title={currentSeo.title}
        description={currentSeo.description}
        keywords={currentSeo.keywords}
        canonical="/cases"
        alternateLanguages={[
          { lang: 'ru', url: '/cases' },
          { lang: 'en', url: '/cases' },
          { lang: 'kk', url: '/cases' },
        ]}
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-32 pb-24">
          <div className="container mx-auto px-4">
            <motion.div
              ref={headerRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 rounded-full glass text-sm text-primary font-medium mb-4">
                {t('cases.badge')}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                {t('cases.title')} <span className="gradient-text">{t('cases.titleHighlight')}</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('cases.description')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cases.map((caseItem, index) => (
                <CaseCard
                  key={caseItem.id}
                  caseItem={caseItem}
                  index={index}
                  t={t}
                  onOpen={() => setActiveCase(caseItem)}
                />
              ))}
            </div>
          </div>
        </main>

        <Footer />

        <CaseModal
          caseItem={activeCase}
          open={activeCase !== null}
          onClose={() => setActiveCase(null)}
        />
      </div>
    </>
  );
};

interface CaseCardProps {
  caseItem: CaseItem;
  index: number;
  t: (key: string) => string;
  onOpen: () => void;
}

const CaseCard = ({ caseItem, index, t, onOpen }: CaseCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer transform-gpu"
      onClick={onOpen}
      onKeyDown={handleKey}
      role="button"
      tabIndex={0}
    >
      <div className="glass rounded-3xl overflow-hidden hover:border-primary/30 transition-[border-color,box-shadow,background-color] duration-500 h-full flex flex-col">
        <div className="relative h-56 overflow-hidden">
          <img
            src={caseItem.cover}
            alt={t(caseItem.titleKey)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-sm text-primary font-medium">{t(caseItem.clientKey)}</span>
            <h3 className="text-xl font-bold text-foreground">{t(caseItem.titleKey)}</h3>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <p className="text-muted-foreground mb-5 flex-1">{t(caseItem.descriptionKey)}</p>

          <div className="grid grid-cols-3 gap-3 mb-5">
            {caseItem.results.map((result, i) => {
              const Icon = result.icon ?? TrendingUp;
              return (
                <div key={i} className="text-center p-3 rounded-xl bg-secondary/50">
                  <Icon className="w-4 h-4 text-primary mx-auto mb-1" />
                  <span className="text-xs text-muted-foreground">{t(result.labelKey)}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2">
            {caseItem.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-primary/10 text-xs text-primary font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cases;
