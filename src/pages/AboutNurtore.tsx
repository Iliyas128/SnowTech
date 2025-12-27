import SEO from '@/components/SEO';
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Nurtore from '@/components/Nurtore';
import { useLanguage } from '@/contexts/LanguageContext';
import backgroundCity from '@/assets/backgroundCity.jpg';
import { generateBreadcrumbSchema } from '@/utils/seo';

const AboutNurtore = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Disable scroll on body
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const seoData = {
    ru: {
      title: 'Нурторе Келесов | SnowTEch — Backend Developer',
      description: 'Нурторе Келесов — Backend Developer в команде SnowTEch. Опыт разработки мобильных приложений, backend-систем и AI-решений.',
      keywords: 'Нурторе Келесов, Backend Developer, мобильная разработка, Flutter, SnowTEch команда',
    },
    en: {
      title: 'Nurtore Kelesov | SnowTEch — Backend Developer',
      description: 'Nurtore Kelesov — Backend Developer at SnowTEch team. Experience in mobile app development, backend systems and AI solutions.',
      keywords: 'Nurtore Kelesov, Backend Developer, mobile development, Flutter, SnowTEch team',
    },
    kz: {
      title: 'Нурторе Келесов | SnowTEch — Backend Developer',
      description: 'Нурторе Келесов — SnowTEch командасындағы Backend Developer. Мобильді қосымшалар, backend жүйелері және AI-шешімдерді әзірлеу тәжірибесі.',
      keywords: 'Нурторе Келесов, Backend Developer, мобильді әзірлеу, Flutter, SnowTEch командасы',
    },
  };

  const currentSeo = seoData[language] || seoData.ru;

  const structuredData = generateBreadcrumbSchema([
    { name: 'Главная', url: '/' },
    { name: 'О нас', url: '/about' },
    { name: 'Нурторе Келесов', url: '/about/nurtore' },
  ]);

  return (
    <>
      <SEO
        title={currentSeo.title}
        description={currentSeo.description}
        keywords={currentSeo.keywords}
        canonical="/about/nurtore"
        alternateLanguages={[
          { lang: 'ru', url: '/about/nurtore' },
          { lang: 'en', url: '/about/nurtore' },
          { lang: 'kk', url: '/about/nurtore' },
        ]}
        structuredData={structuredData}
      />

      <div 
        className="fixed inset-0 w-screen h-screen overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundCity})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/30 z-0"></div>

        {/* Header */}
        <div className="relative z-20">
          <Header />
        </div>

        {/* Main Content - Nurtore Component */}
        <main className="relative z-10 h-[calc(100vh-2.5rem)] md:h-screen flex md:items-center justify-center pt-20 md:pb-0">
          <Nurtore />
        </main>
      </div>
    </>
  );
};

export default AboutNurtore;

