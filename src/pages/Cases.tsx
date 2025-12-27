import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { Folder, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { generateBreadcrumbSchema } from '@/utils/seo';

const Cases = () => {
  const { t, language } = useLanguage();

  const seoData = {
    ru: {
      title: 'Наши проекты | SnowTEch — Кейсы и портфолио',
      description: 'Реальные кейсы с измеримыми результатами. Смотрите, как мы помогаем бизнесу расти с помощью IT-решений.',
      keywords: 'кейсы SnowTEch, портфолио IT-компании, примеры работ, проекты разработки сайтов, успешные кейсы',
    },
    en: {
      title: 'Our Projects | SnowTEch — Cases and Portfolio',
      description: 'Real cases with measurable results. See how we help businesses grow with IT solutions.',
      keywords: 'SnowTEch cases, IT company portfolio, work examples, website development projects, success cases',
    },
    kz: {
      title: 'Біздің жобалар | SnowTEch — Кейстер және портфолио',
      description: 'Өлшенетін нәтижелері бар нақты кейстер. Бизнестің өсуіне қалай көмектесетінімізді қараңыз.',
      keywords: 'SnowTEch кейстері, IT компания портфолиосы, жұмыс мысалдары, сайт әзірлеу жобалары, табысты кейстер',
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 rounded-full glass text-sm text-primary font-medium mb-4">
                {t('cases.badge')}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                {t('casesPage.title')}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('casesPage.subtitle')}
              </p>
            </motion.div>

            {/* Empty state - user will add cases later */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass rounded-3xl p-12 md:p-20 text-center max-w-2xl mx-auto"
            >
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Folder className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t('casesPage.empty')}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t('casesPage.emptyDesc')}
              </p>
              <a href="/#contacts">
                <Button variant="hero" size="lg" className="group">
                  {t('nav.discuss')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Cases;
