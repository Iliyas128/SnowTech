import SEO from '@/components/SEO';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { generateBreadcrumbSchema } from '@/utils/seo';
import ImageSlider from '@/components/ImageSlider';
import eCommerceImage from '@/assets/supratrade.jpg';
import automationImage from '@/assets/automate.jpg';
import cars from '@/assets/cars.jpg';
import hongkong from '@/assets/hongGong.jpg';
import transport from '@/assets/samalet.jpg';
import supratrade from '@/assets/supratradePhoto.jpg';
import carsphoto from '@/assets/carsPhoto.jpg';
import hongkongphoto from '@/assets/hongkongPhoto.jpg';
import calculator from '@/assets/photo_2026-01-02_21-15-43.jpg';
import trongonephoto from '@/assets/tron.jpg';
import automatePhoto from '@/assets/automatationphoto.jpg';
import trongone from '@/assets/trongoi.webp';

const CasesSlider = () => {
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
    { name: 'Кейсы', url: '/cases-slider' },
  ]);

  // Prepare slides data for WebGL slider
  const slides = [
    {
      title: t('cases.ecommerce.title'),
      description: t('cases.ecommerce.client'),
      number: '∅1',
      paragraphLines: [
        t('cases.ecommerce.description'),
        `${t('cases.ecommerce.result1')} • ${t('cases.ecommerce.result2')} • ${t('cases.ecommerce.result3')}`,
      ],
      image: eCommerceImage,
      featuredImage: supratrade,
    },
    {
      title: t('cases.rag.title'),
      description: t('cases.rag.client'),
      number: '∅2',
      paragraphLines: [
        t('cases.rag.description'),
        `${t('cases.rag.result1')} • ${t('cases.rag.result2')} • ${t('cases.rag.result3')}`,
      ],
      image: cars,
      featuredImage: carsphoto,
    },
    {
      title: t('cases.cv.title'),
      description: t('cases.cv.client'),
      number: '∅3',
      paragraphLines: [
        t('cases.cv.description'),
        `${t('cases.cv.result1')} • ${t('cases.cv.result2')} • ${t('cases.cv.result3')}`,
      ],
      image: hongkong,  
      featuredImage: hongkongphoto,
    },
    {
      title: t('cases.transport.title'),
      description: t('cases.transport.client'),
      number: '∅4',
      paragraphLines: [
        t('cases.transport.description'),
        `${t('cases.transport.result1')} • ${t('cases.transport.result2')} • ${t('cases.transport.result3')}`,
      ],
      image: transport,
      featuredImage: calculator,
    },
    {
      title: t('cases.automation.title'),
      description: t('cases.automation.client'),
      number: '∅5',
      paragraphLines: [
        t('cases.automation.description'),
        `${t('cases.automation.result1')} • ${t('cases.automation.result2')} • ${t('cases.automation.result3')}`,
      ],
      image: automationImage,
      featuredImage: automatePhoto,
    },
    {
      title: t('cases.calculator.title'),
      description: t('cases.calculator.client'),
      number: '∅6',
      paragraphLines: [
        t('cases.calculator.description'),
        `${t('cases.calculator.result1')} • ${t('cases.calculator.result2')} • ${t('cases.calculator.result3')}`,
      ],
      image: trongone,
      featuredImage: trongonephoto,
    }
  ];

  return (
    <>
      <SEO
        title={currentSeo.title}
        description={currentSeo.description}
        keywords={currentSeo.keywords}
        canonical="/cases-slider"
        alternateLanguages={[
          { lang: 'ru', url: '/cases-slider' },
          { lang: 'en', url: '/cases-slider' },
          { lang: 'kk', url: '/cases-slider' },
        ]}
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-black overflow-hidden">
        <ImageSlider slides={slides} />
        <Footer />
      </div>
    </>
  );
};

export default CasesSlider;

