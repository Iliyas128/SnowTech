import SEO from '@/components/SEO';
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Iliyas from '@/components/Iliyas';
import { useLanguage } from '@/contexts/LanguageContext';
import backgroundCity from '@/assets/backgroundCity.jpg';
import { generateBreadcrumbSchema } from '@/utils/seo';

const About = () => {
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
      title: 'О нас | SnowTEch — IT-компания в Казахстане',
      description: 'Узнайте о SnowTEch — команде IT-профессионалов, создающих цифровые продукты, сайты, AI-решения и маркетинговые кампании в Казахстане.',
      keywords: 'SnowTEch команда, IT-компания Казахстан, разработчики сайтов, AI-разработка, команда программистов',
    },
    en: {
      title: 'About Us | SnowTEch — IT Solutions Company',
      description: 'Learn about SnowTEch — a team of IT professionals creating digital products, websites, AI solutions, and marketing campaigns in Kazakhstan.',
      keywords: 'SnowTEch team, IT company Kazakhstan, website developers, AI development, programming team',
    },
    kz: {
      title: 'Біз туралы | SnowTEch — IT-шешімдер компаниясы',
      description: 'SnowTEch туралы біліңіз — Қазақстанда цифрлық өнімдер, сайттар, AI-шешімдер және маркетинг науқандарын жасайтын IT мамандары командасы.',
      keywords: 'SnowTEch командасы, IT компания Қазақстан, сайт әзірлеушілер, AI әзірлеу, бағдарламалау командасы',
    },
  };

  const currentSeo = seoData[language] || seoData.ru;

  const structuredData = generateBreadcrumbSchema([
    { name: 'Главная', url: '/' },
    { name: 'О нас', url: '/about' },
  ]);

  return (
    <>
      <SEO
        title={currentSeo.title}
        description={currentSeo.description}
        keywords={currentSeo.keywords}
        canonical="/about"
        alternateLanguages={[
          { lang: 'ru', url: '/about' },
          { lang: 'en', url: '/about' },
          { lang: 'kk', url: '/about' },
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

        {/* Main Content - Iliyas Component */}
        <main className="relative z-10 h-[calc(100vh-2.5rem)] md:h-screen flex md:items-center justify-center pt-20 md:pb-0">
          <Iliyas />
        </main>
      </div>
    </>
  );
};

export default About;
