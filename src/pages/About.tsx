import SEO from '@/components/SEO';
import { useEffect, useRef } from 'react';
import Header from '@/components/layout/Header';
import Iliyas from '@/components/Iliyas';
import { useLanguage } from '@/contexts/LanguageContext';
import backgroundCity from '@/assets/backgroundCity.jpg';
import { generateBreadcrumbSchema } from '@/utils/seo';

const About = () => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable vertical scroll on body
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    
    // Prevent accidental scroll to top
    window.scrollTo(0, 0);
    
    // Prevent scroll events
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };
    
    // Allow horizontal scroll/touch for mobile browsers (Instagram/Telegram)
    let touchStartX = 0;
    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      // Allow horizontal scrolling
      const touch = e.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      
      // If touching a scrollable element, allow it
      if (element && (element.scrollWidth > element.clientWidth || 
          element.closest('.overflow-x-auto') || 
          element.closest('.overflow-x-scroll'))) {
        return;
      }
      
      // Prevent vertical scroll but allow horizontal
      const deltaX = Math.abs(touch.clientX - touchStartX);
      const deltaY = Math.abs(touch.clientY - touchStartY);
      
      if (deltaY > deltaX) {
        e.preventDefault();
      }
    };
    
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('scroll', preventScroll, { passive: false });
    
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.body.style.height = 'unset';
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('scroll', preventScroll);
    };
  }, []);

  const seoData = {
    ru: {
      title: 'О нас | SnowTech — IT-компания в Казахстане',
      description: 'Узнайте о SnowTech — команде IT-профессионалов, создающих цифровые продукты, сайты, AI-решения и маркетинговые кампании в Казахстане.',
      keywords: 'SnowTech команда, IT-компания Казахстан, разработчики сайтов, AI-разработка, команда программистов',
    },
    en: {
      title: 'About Us | SnowTech — IT Solutions Company',
      description: 'Learn about SnowTech — a team of IT professionals creating digital products, websites, AI solutions, and marketing campaigns in Kazakhstan.',
      keywords: 'SnowTech team, IT company Kazakhstan, website developers, AI development, programming team',
    },
    kz: {
      title: 'Біз туралы | SnowTech — IT-шешімдер компаниясы',
      description: 'SnowTech туралы біліңіз — Қазақстанда цифрлық өнімдер, сайттар, AI-шешімдер және маркетинг науқандарын жасайтын IT мамандары командасы.',
      keywords: 'SnowTech командасы, IT компания Қазақстан, сайт әзірлеушілер, AI әзірлеу, бағдарламалау командасы',
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
        ref={containerRef}
        className="fixed inset-0 w-full h-screen overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundCity})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          touchAction: 'pan-x pan-y', // Allow horizontal and vertical panning for mobile browsers
          WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
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
