import { Helmet } from 'react-helmet-async';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import CasesSection from '@/components/sections/CasesSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SnowTEch — сделать сайт и настроить таргетированную рекламу в Казахстане</title>
        <meta 
          name="description" 
          content="SnowTEch — IT-компания в Казахстане. Делаем сайты под ключ, настраиваем таргетированную рекламу в Instagram и TikTok, запускаем SEO и AI-решения для бизнеса." 
        />
        <meta name="keywords" content="SnowTEch, сделать сайт, разработка сайта Казахстан, создать сайт для бизнеса, заказать таргет, таргетированная реклама Instagram, реклама TikTok, чат-боты, AI-решения" />
        <link rel="canonical" href="https://snowtech.kz" />
        <meta property="og:title" content="SnowTEch — IT-решения для бизнеса" />
        <meta property="og:description" content="Разработка сайтов, AI-ботов и ML-систем. Превращаем идеи в цифровые продукты." />
        <meta property="og:type" content="website" />
      </Helmet>

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
