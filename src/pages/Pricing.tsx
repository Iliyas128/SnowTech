import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { Check, Zap, ArrowRight, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { generateBreadcrumbSchema, generateServiceSchema } from '@/utils/seo';

type PricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
};

type AdditionalService = {
  name: string;
  price: string;
  description: string;
};

interface PricingCardProps {
  plan: PricingPlan;
  index: number;
  onOrderClick: () => void;
}

const PricingCard = ({ plan, index, onOrderClick }: PricingCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative glass-card ${plan.popular ? 'border-primary/50 shadow-[0_0_40px_hsl(var(--primary)/0.2)]' : ''}`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-medium">
          Популярный выбор
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
        <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
        <div className="text-3xl font-bold gradient-text">{plan.price}</div>
      </div>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-muted-foreground text-sm">
            <Check className="w-5 h-5 text-primary flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <Button 
        variant={plan.popular ? 'hero' : 'glass'} 
        className="w-full"
        onClick={onOrderClick}
      >
        Заказать
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  );
};

const Pricing = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const { language, t } = useLanguage();
  const [showMessengerChoice, setShowMessengerChoice] = useState(false);

  const pricingPlans: PricingPlan[] = useMemo(() => {
    if (language === 'en') {
      return [
        {
          name: 'Landing Page',
          price: 'from 30 000 ₸',
          description: 'One-page website to capture leads',
          features: [
            'Responsive design',
            'Basic SEO setup',
            'Lead capture form',
            'Timeline: 5–7 days',
          ],
          popular: false,
        },
        {
          name: 'Corporate Website',
          price: 'from 120 000 ₸',
          description: 'Multi-page website for your business',
          features: [
            'Up to 10 pages',
            'CMS for content management',
            'Blog and news section',
            'CRM integration',
            '1 month of support',
            'Timeline: 2–4 weeks',
          ],
          popular: true,
        },
        {
          name: 'Online Store',
          price: 'from 300 000 ₸',
          description: 'Full-featured e-commerce platform',
          features: [
            'Product catalog',
            'Cart and online payments',
            'Customer account area',
            'Kaspi/1C integration',
            '3 months of support',
            'Timeline: 1–2 months',
          ],
          popular: false,
        },
      ];
    }

    if (language === 'kz') {
      return [
        {
          name: 'Лендинг',
          price: '30 000 ₸ бастап',
          description: 'Клиенттерді тартуға арналған бір беттік сайт',
          features: [
            'Адаптивті дизайн',
            'Негізгі SEO баптауы',
            'Өтініш формасы',
            'Мерзім: 5–7 күн',
          ],
          popular: false,
        },
        {
          name: 'Корпоративтік сайт',
          price: '120 000 ₸ бастап',
          description: 'Бизнеске арналған көп беттік сайт',
          features: [
            '10 бетке дейін',
            'Мазмұнды басқару үшін CMS',
            'Блог және жаңалықтар',
            'CRM интеграциясы',
            '1 айлық қолдау',
            'Мерзім: 2–4 апта',
          ],
          popular: true,
        },
        {
          name: 'Интернет-дүкен',
          price: '300 000 ₸ бастап',
          description: 'Толыққанды e-commerce платформа',
          features: [
            'Тауарлар каталогы',
            'Себет және онлайн төлемдер',
            'Жеке кабинет',
            'Kaspi/1C интеграциясы',
            '3 айлық қолдау',
            'Мерзім: 1–2 ай',
          ],
          popular: false,
        },
      ];
    }

    // ru (default)
    return [
      {
        name: 'Лендинг',
        price: 'от 30 000 ₸',
        description: 'Одностраничный сайт для привлечения клиентов',
        features: [
          'Адаптивный дизайн',
          'Базовая SEO-оптимизация',
          'Форма заявки',
          'Срок: 5–7 дней',
        ],
        popular: false,
      },
      {
        name: 'Корпоративный сайт',
        price: 'от 120 000 ₸',
        description: 'Многостраничный сайт для бизнеса',
        features: [
          'До 10 страниц',
          'CMS для управления',
          'Блог и новости',
          'Интеграция с CRM',
          'Техподдержка 1 месяц',
          'Срок: 2–4 недели',
        ],
        popular: true,
      },
      {
        name: 'Интернет-магазин',
        price: 'от 300 000 ₸',
        description: 'Полноценная e-commerce платформа',
        features: [
          'Каталог товаров',
          'Корзина и оплата',
          'Личный кабинет',
          'Интеграция с Kaspi/1C',
          'Техподдержка 3 месяца',
          'Срок: 1–2 месяца',
        ],
        popular: false,
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
      title: 'Цены на IT-услуги | SnowTEch — Разработка сайтов, приложений, AI-решений',
      description: 'Прозрачные цены на разработку сайтов, мобильных приложений, AI-ботов и таргетированную рекламу в Казахстане. От лендингов до сложных платформ.',
      keywords: 'цены на разработку сайта, стоимость сайта, цена мобильного приложения, стоимость AI-бота, таргетированная реклама цена, разработка сайта Казахстан',
    },
    en: {
      title: 'Pricing for IT services | SnowTEch — Websites, apps, AI solutions',
      description: 'Transparent pricing for website development, mobile apps, AI bots and targeted advertising in Kazakhstan. From landing pages to complex platforms.',
      keywords: 'website development price, website cost, mobile app price, AI bot cost, targeted advertising price, Kazakhstan website development',
    },
    kz: {
      title: 'IT-қызметтер бағалары | SnowTEch — Сайттар, қосымшалар, AI-шешімдер',
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

            {/* Main pricing cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {pricingPlans.map((plan, index) => (
                <PricingCard
                  key={plan.name}
                  plan={plan}
                  index={index}
                  onOrderClick={() => setShowMessengerChoice(true)}
                />
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

export default Pricing;
