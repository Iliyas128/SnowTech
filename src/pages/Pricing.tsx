import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { Zap, ArrowRight, MessageCircle, Send, Globe, BookOpen, Building2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FlippingCard } from '@/components/ui/flipping-card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { generateBreadcrumbSchema, generateServiceSchema } from '@/utils/seo';

type WebPlan = {
  id: string;
  name: string;
  price: string;
  short: string;
  back: string;
  popular?: boolean;
  Icon: typeof Globe;
};

type AdditionalService = {
  name: string;
  price: string;
  description: string;
};

const Pricing = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const { language, t } = useLanguage();
  const [showMessengerChoice, setShowMessengerChoice] = useState(false);

  const webPlans: WebPlan[] = useMemo(() => {
    if (language === 'en') {
      return [
        {
          id: 'landing',
          name: 'Landing page',
          price: 'from 60 000 ₸',
          short: 'One-page site to capture leads',
          back: 'Scope, design and timeline are tailored to your project. Let’s discuss the details one-on-one and put together a precise quote.',
          Icon: Globe,
        },
        {
          id: 'catalog',
          name: 'E-catalog',
          price: 'from 120 000 ₸',
          short: 'Product catalog without a cart',
          back: 'Built around your range of products and lead pipeline. Final price depends on number of items and integrations — we’ll align it personally.',
          Icon: BookOpen,
        },
        {
          id: 'corporate',
          name: 'Corporate website',
          price: 'from 120 000 ₸',
          short: 'Multi-page website for your business',
          back: 'Pages, CMS, integrations and support — assembled for your specific business. We confirm the final price after a short brief.',
          popular: true,
          Icon: Building2,
        },
        {
          id: 'shop',
          name: 'Online store',
          price: 'from 300 000 ₸',
          short: 'Full-featured e-commerce platform',
          back: 'Catalog, payments, accounts, Kaspi/1C, marketing tools — designed under your business model. Quote is set after a personal discussion.',
          Icon: ShoppingCart,
        },
      ];
    }

    if (language === 'kz') {
      return [
        {
          id: 'landing',
          name: 'Лендинг',
          price: '60 000 ₸ бастап',
          short: 'Клиенттерді тартуға арналған бір беттік сайт',
          back: 'Жоба көлемі, дизайны және мерзімі сіздің мақсатыңызға бейімделеді. Толық бағаны жеке талқылаудан кейін айтамыз.',
          Icon: Globe,
        },
        {
          id: 'catalog',
          name: 'Е-каталог',
          price: '120 000 ₸ бастап',
          short: 'Себетсіз тауар каталогы',
          back: 'Өнім ассортиментіңіз бен өтініштерді жинау процесіне бейімделген. Соңғы баға тауар саны мен интеграцияларға байланысты — оны жеке талқылаймыз.',
          Icon: BookOpen,
        },
        {
          id: 'corporate',
          name: 'Корпоративтік сайт',
          price: '120 000 ₸ бастап',
          short: 'Бизнеске арналған көп беттік сайт',
          back: 'Беттер, CMS, интеграциялар және қолдау — бизнесіңізге арнайы құрастырылады. Соңғы бағаны қысқа брифтен кейін бекітеміз.',
          popular: true,
          Icon: Building2,
        },
        {
          id: 'shop',
          name: 'Интернет-дүкен',
          price: '300 000 ₸ бастап',
          short: 'Толыққанды e-commerce платформа',
          back: 'Каталог, төлемдер, жеке кабинет, Kaspi/1C, маркетинг құралдары — бизнес-моделіңізге сай жасалады. Бағасы жеке талқылаудан кейін айтылады.',
          Icon: ShoppingCart,
        },
      ];
    }

    // ru (default)
    return [
      {
        id: 'landing',
        name: 'Лендинг',
        price: 'от 60 000 ₸',
        short: 'Одностраничный сайт для привлечения клиентов',
        back: 'Объём, дизайн и сроки подбираются под вашу задачу. Финальную стоимость согласуем лично — после короткого брифа.',
        Icon: Globe,
      },
      {
        id: 'catalog',
        name: 'Е-каталог',
        price: 'от 120 000 ₸',
        short: 'Каталог товаров без корзины',
        back: 'Делаем под ваш ассортимент и сценарий заявок. Итоговая цена зависит от количества позиций и интеграций — обсудим индивидуально.',
        Icon: BookOpen,
      },
      {
        id: 'corporate',
        name: 'Корпоративный сайт',
        price: 'от 120 000 ₸',
        short: 'Многостраничный сайт для бизнеса',
        back: 'Структура страниц, CMS, интеграции и поддержка — собираем под ваш бизнес. Итоговую стоимость закрепляем после короткого брифа.',
        popular: true,
        Icon: Building2,
      },
      {
        id: 'shop',
        name: 'Интернет-магазин',
        price: 'от 300 000 ₸',
        short: 'Полноценная e-commerce платформа',
        back: 'Каталог, оплата, личный кабинет, Kaspi/1C, маркетинг — собираем под вашу бизнес-модель. Итоговая цена обсуждается лично.',
        Icon: ShoppingCart,
      },
    ];
  }, [language]);

  const additionalServices: AdditionalService[] = useMemo(() => {
    if (language === 'en') {
      return [
        {
          name: 'Mobile App',
          price: 'from 1 000 000 ₸',
          description: 'iOS and Android app with a single codebase',
        },
        {
          name: 'Instagram Ads',
          price: 'from 100 000 ₸/month',
          description: 'Setup and management of Instagram ad campaigns',
        },
        {
          name: 'Chatbot',
          price: 'from 60 000 ₸',
          description: 'WhatsApp or Telegram bot with basic scenarios',
        },
        {
          name: 'RAG Chatbot',
          price: 'from 70 000 ₸',
          description: 'Smart LLM-based bot with knowledge base integration',
        },
        {
          name: 'ML Solution',
          price: 'from 900 000 ₸',
          description: 'Development and integration of ML model for your task',
        },
        {
          name: 'Computer Vision',
          price: 'from 1 050 000 ₸',
          description: 'Image or video recognition system',
        },
        {
          name: 'Support',
          price: 'from 90 000 ₸/month',
          description: 'Maintenance and development of your project',
        },
      ];
    }

    if (language === 'kz') {
      return [
        {
          name: 'Мобильді қосымша',
          price: '1 000 000 ₸ бастап',
          description: 'Бір кодтық база негізіндегі iOS және Android қосымшасы',
        },
        {
          name: 'Instagram таргет',
          price: '100 000 ₸/ай бастап',
          description: 'Instagram-та таргеттелген жарнаманы баптау және жүргізу',
        },
        {
          name: 'Чат-бот',
          price: '60 000 ₸ бастап',
          description: 'WhatsApp немесе Telegram үшін базалық сценарийлері бар бот',
        },
        {
          name: 'RAG-чат-бот',
          price: '70 000 ₸ бастап',
          description: 'Білім базасымен интеграцияланған LLM-негізіндегі ақылды бот',
        },
        {
          name: 'ML-шешім',
          price: '900 000 ₸ бастап',
          description: 'Сіздің тапсырмаңызға арналған ML-модельді әзірлеу және енгізу',
        },
        {
          name: 'Computer Vision',
          price: '1 050 000 ₸ бастап',
          description: 'Бейне немесе суреттерді тану жүйесі',
        },
        {
          name: 'Қолдау',
          price: '90 000 ₸/ай бастап',
          description: 'Жобаңызды қолдау және дамыту',
        },
      ];
    }

    // ru (default)
    return [
      {
        name: 'Мобильное приложение',
        price: 'от 1 000 000 ₸',
        description: 'iOS и Android приложение с единой кодовой базой',
      },
      {
        name: 'Таргет Instagram',
        price: 'от 100 000 ₸/мес',
        description: 'Настройка и ведение таргетированной рекламы в Instagram',
      },
      {
        name: 'Чат-бот',
        price: 'от 60 000 ₸',
        description: 'Бот для WhatsApp или Telegram с базовыми сценариями',
      },
      {
        name: 'RAG-чат-бот',
        price: 'от 70 000 ₸',
        description: 'Умный бот на основе LLM с интеграцией базы знаний',
      },
      {
        name: 'ML-решение',
        price: 'от 900 000 ₸',
        description: 'Разработка и внедрение ML-модели под задачу',
      },
      {
        name: 'Computer Vision',
        price: 'от 1 050 000 ₸',
        description: 'Система распознавания изображений или видео',
      },
      {
        name: 'Техподдержка',
        price: 'от 90 000 ₸/мес',
        description: 'Обслуживание и развитие существующего проекта',
      },
    ];
  }, [language]);

  const seoData = {
    ru: {
      title: 'Цены на IT-услуги | SnowTech — Разработка сайтов, приложений, AI-решений',
      description: 'Прозрачные цены на разработку сайтов, мобильных приложений, AI-ботов и таргетированную рекламу в Казахстане. От лендингов до сложных платформ.',
      keywords: 'цены на разработку сайта, стоимость сайта, цена мобильного приложения, стоимость AI-бота, таргетированная реклама цена, разработка сайта Казахстан',
    },
    en: {
      title: 'Pricing for IT services | SnowTech — Websites, apps, AI solutions',
      description: 'Transparent pricing for website development, mobile apps, AI bots and targeted advertising in Kazakhstan. From landing pages to complex platforms.',
      keywords: 'website development price, website cost, mobile app price, AI bot cost, targeted advertising price, Kazakhstan website development',
    },
    kz: {
      title: 'IT-қызметтер бағалары | SnowTech — Сайттар, қосымшалар, AI-шешімдер',
      description: 'Қазақстанда сайт әзірлеу, мобильді қосымшалар, AI-боттар және таргеттелген жарнама үшін мөлдір бағалар. Лендингтерден күрделі платформаларға дейін.',
      keywords: 'сайт әзірлеу бағасы, сайт құны, мобильді қосымша бағасы, AI-бот құны, таргеттелген жарнама бағасы, Қазақстанда сайт әзірлеу',
    },
  };

  const currentSeo = seoData[language] || seoData.ru;

  const structuredData = [
    generateBreadcrumbSchema([
      { name: 'Главная', url: '/' },
      { name: 'Цены', url: '/pricing' },
    ]),
    generateServiceSchema('IT Services', currentSeo.description),
  ];

  return (
    <>
      <SEO
        title={currentSeo.title}
        description={currentSeo.description}
        keywords={currentSeo.keywords}
        canonical="/pricing"
        alternateLanguages={[
          { lang: 'ru', url: '/pricing' },
          { lang: 'en', url: '/pricing' },
          { lang: 'kk', url: '/pricing' },
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
                <Zap className="w-4 h-4 inline mr-2" />
                {t('pricing.badge')}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                {language === 'en'
                  ? 'Pricing for our services'
                  : language === 'kz'
                  ? 'Қызметтеріміздің бағалары'
                  : 'Стоимость наших услуг'}
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('pricing.subtitle')}
              </p>
            </motion.div>

            {/* Web development plans — flipping cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20">
              {webPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
                  className="h-[340px] md:h-[360px] transform-gpu"
                >
                  <FlippingCard
                    className="w-full h-full"
                    frontContent={
                      <WebPlanFront plan={plan} discussLabel={t('pricing.flipHint')} />
                    }
                    backContent={
                      <WebPlanBack
                        plan={plan}
                        ctaLabel={t('pricing.discussCta')}
                        onContactClick={() => setShowMessengerChoice(true)}
                      />
                    }
                  />
                </motion.div>
              ))}
            </div>

            {/* Additional services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
                {t('pricing.additional')}
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {additionalServices.map((service, index) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="glass p-6 rounded-2xl hover:border-primary/30 transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-2">{service.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{service.description}</p>
                    <span className="text-xl font-bold gradient-text">{service.price}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card text-center max-w-3xl mx-auto"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t('pricing.custom')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('pricing.customDesc')}
              </p>
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => setShowMessengerChoice(true)}
              >
                {t('pricing.customBtn')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>

            {/* Messenger choice modal */}
            {showMessengerChoice && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                <div className="glass-card max-w-md w-full mx-4 p-6 relative">
                  <button
                    className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowMessengerChoice(false)}
                    aria-label="Close"
                  >
                    ✕
                  </button>
                  <h3 className="text-xl font-semibold text-foreground mb-2 text-center">
                    {language === 'en'
                      ? 'Choose a messenger'
                      : language === 'kz'
                      ? 'Мессенджерді таңдаңыз'
                      : 'Выберите мессенджер'}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 text-center">
                    {language === 'en'
                      ? 'We will receive your request in WhatsApp or Telegram.'
                      : language === 'kz'
                      ? 'Өтінішіңізді WhatsApp немесе Telegram арқылы қабылдаймыз.'
                      : 'Мы получим вашу заявку в WhatsApp или Telegram.'}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://wa.me/77067007052"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button
                        type="button"
                        variant="hero"
                        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-600/90"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </Button>
                    </a>
                    <a
                      href="https://t.me/+77067007052"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button
                        type="button"
                        variant="glass"
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Telegram
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

/* ---------- FlippingCard front/back content ---------- */

const WebPlanFront = ({
  plan,
  discussLabel,
}: {
  plan: WebPlan;
  discussLabel: string;
}) => {
  const { Icon } = plan;
  return (
    <div className="relative h-full w-full p-6 md:p-7 flex flex-col">
      {plan.popular && (
        <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-[10px] uppercase tracking-widest font-semibold">
          Top
        </span>
      )}
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-1.5 leading-tight">
        {plan.name}
      </h3>
      <p className="text-sm text-muted-foreground mb-auto line-clamp-3">
        {plan.short}
      </p>
      <div className="mt-6">
        <div className="text-2xl md:text-3xl font-bold gradient-text leading-none">
          {plan.price}
        </div>
        <p className="text-[11px] md:text-xs font-mono uppercase tracking-widest text-muted-foreground/70 mt-3">
          {discussLabel}
        </p>
      </div>
    </div>
  );
};

const WebPlanBack = ({
  plan,
  ctaLabel,
  onContactClick,
}: {
  plan: WebPlan;
  ctaLabel: string;
  onContactClick: () => void;
}) => (
  <div className="relative h-full w-full p-6 md:p-7 flex flex-col bg-gradient-to-br from-primary/[0.07] via-card to-accent/[0.05]">
    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">
      {plan.name}
    </h3>
    <p className="text-sm text-muted-foreground leading-relaxed mb-auto">
      {plan.back}
    </p>
    <div className="mt-6 flex items-center justify-between gap-3">
      <span className="text-base md:text-lg font-bold gradient-text whitespace-nowrap">
        {plan.price}
      </span>
      <Button
        variant="hero"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onContactClick();
        }}
        className="shrink-0"
      >
        {ctaLabel}
        <ArrowRight className="w-4 h-4 ml-1.5" />
      </Button>
    </div>
  </div>
);

export default Pricing;
