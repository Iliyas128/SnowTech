import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Iliyas from '@/components/Iliyas';
import { useLanguage } from '@/contexts/LanguageContext';
import backgroundCity from '@/assets/backgroundCity.jpg';

const About = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Disable scroll on body
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {language === 'en'
            ? 'About Us | SnowTEch — IT Solutions Company'
            : language === 'kz'
            ? 'Біз туралы | SnowTEch — IT-шешімдер компаниясы'
            : 'О нас | SnowTEch — IT-компания'}
        </title>
        <meta
          name="description"
          content={
            language === 'en'
              ? 'Learn about SnowTEch — a team of IT professionals creating digital products, websites, AI solutions, and marketing campaigns in Kazakhstan.'
              : language === 'kz'
              ? 'SnowTEch туралы біліңіз — Қазақстанда цифрлық өнімдер, сайттар, AI-шешімдер және маркетинг науқандарын жасайтын IT мамандары командасы.'
              : 'Узнайте о SnowTEch — команде IT-профессионалов, создающих цифровые продукты, сайты, AI-решения и маркетинговые кампании в Казахстане.'
          }
        />
        <link rel="canonical" href="https://snowtech.kz/about" />
      </Helmet>

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
