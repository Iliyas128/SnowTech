import SEO from '@/components/SEO';
import { useEffect, useRef } from 'react';
import Header from '@/components/layout/Header';
import Nurtore from '@/components/Nurtore';
import { useLanguage } from '@/contexts/LanguageContext';
import backgroundCity from '@/assets/backgroundCity.jpg';
import { generateBreadcrumbSchema } from '@/utils/seo';

const AboutNurtore = () => {
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

        {/* Main Content - Nurtore Component */}
        <main className="relative z-10 h-[calc(100vh-2.5rem)] md:h-screen flex md:items-center justify-center pt-20 md:pb-0">
          <Nurtore />
        </main>
      </div>
    </>
  );
};

export default AboutNurtore;

