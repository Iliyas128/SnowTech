import SEO from '@/components/SEO';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import CasesSection from '@/components/sections/CasesSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/utils/seo';

const Index = () => {
  const { language } = useLanguage();

  const seoData = {
    ru: {
      title: 'SnowTech — разработка сайтов и таргетированная реклама в Казахстане',
      description: 'IT-компания SnowTech в Казахстане. Разработка сайтов под ключ, настройка таргетированной рекламы в Instagram и TikTok, создание AI-ботов и ML-решений для бизнеса.',
      keywords: 'разработка сайтов Казахстан, создать сайт, таргетированная реклама Instagram, реклама TikTok, AI-боты, чат-боты, разработка мобильных приложений, ML-решения, Computer Vision, RAG-боты',
    },
    en: {
      title: 'SnowTech — Website Development & Targeted Advertising in Kazakhstan',
      description: 'SnowTech IT company in Kazakhstan. Full-cycle website development, Instagram and TikTok targeted advertising setup, AI bots and ML solutions for business.',
      keywords: 'website development Kazakhstan, create website, Instagram advertising, TikTok ads, AI bots, chatbots, mobile app development, ML solutions, Computer Vision, RAG bots',
    },
    kz: {
      title: 'SnowTech — Қазақстанда сайт әзірлеу және таргеттелген жарнама',
      description: 'Қазақстандағы SnowTech IT компаниясы. Сайттарды толық циклде әзірлеу, Instagram және TikTok таргеттелген жарнамасын баптау, AI-боттар және бизнес үшін ML-шешімдер.',
      keywords: 'Қазақстанда сайт әзірлеу, сайт жасау, Instagram жарнамасы, TikTok жарнамасы, AI-боттар, чат-боттар, мобильді қосымша әзірлеу, ML-шешімдер, Computer Vision, RAG-боттар',
    },
  };

  const currentSeo = seoData[language] || seoData.ru;

  const structuredData = [
    generateOrganizationSchema(),
    generateWebSiteSchema(),
  ];

  return (
    <>
      <SEO
        title={currentSeo.title}
        description={currentSeo.description}
        keywords={currentSeo.keywords}
        canonical="/"
        alternateLanguages={[
          { lang: 'ru', url: '/' },
          { lang: 'en', url: '/' },
          { lang: 'kk', url: '/' },
        ]}
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <ServicesSection />
          <WhyUsSection />
          <CasesSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
