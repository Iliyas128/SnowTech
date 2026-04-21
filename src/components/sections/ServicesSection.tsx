import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Globe, Bot, Database, Brain, Eye, ArrowUpRight, Smartphone, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const ServicesSection = () => {
  const { t } = useLanguage();
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const services = [
    {
      icon: Globe,
      titleKey: 'services.web.title',
      descriptionKey: 'services.web.description',
      features: ['Landing', 'Corporate', 'E-commerce', 'Web Apps'],
      price: 'от 30 000 ₸',
    },
    {
      icon: Smartphone,
      titleKey: 'services.mobile.title',
      descriptionKey: 'services.mobile.description',
      features: ['iOS', 'Android', 'React Native', 'Flutter'],
      price: 'от 1 000 000 ₸',
    },
    {
      icon: Target,
      titleKey: 'services.ads.title',
      descriptionKey: 'services.ads.description',
      features: ['Instagram Ads', 'TikTok Ads', 'Retargeting', 'Analytics'],
      price: 'от 100 000 ₸/мес',
    },
    {
      icon: Bot,
      titleKey: 'services.chatbot.title',
      descriptionKey: 'services.chatbot.description',
      features: ['WhatsApp', 'Telegram', 'Web-widgets', 'CRM'],
      price: 'от 60 000 ₸',
    },
    {
      icon: Database,
      titleKey: 'services.rag.title',
      descriptionKey: 'services.rag.description',
      features: ['GPT/Claude', 'Knowledge Base', 'Documents', 'Smart Search'],
      price: 'от 70 000 ₸',
    },
    {
      icon: Brain,
      titleKey: 'services.ml.title',
      descriptionKey: 'services.ml.description',
      features: ['Prediction', 'Recommendations', 'Analytics', 'Automation'],
      price: 'от 900 000 ₸',
    },
    {
      icon: Eye,
      titleKey: 'services.cv.title',
      descriptionKey: 'services.cv.description',
      features: ['Detection', 'Face Recognition', 'OCR', 'Quality Control'],
      price: 'от 1 050 000 ₸',
    },
  ];

  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ opacity: 0 }}
          className="text-center mb-16 transform-gpu"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-primary font-medium mb-4">
            {t('services.badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t('services.title')} <span className="gradient-text">{t('services.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('services.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ServiceCard
                key={service.titleKey}
                icon={Icon}
                title={t(service.titleKey)}
                description={t(service.descriptionKey)}
                features={service.features}
                index={index}
                titleKey={service.titleKey}
                price={service.price}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  features,
  index,
  titleKey,
  price,
}: {
  icon: typeof Globe;
  title: string;
  description: string;
  features: string[];
  index: number;
  titleKey: string;
  price: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const hasAnimatedRef = useRef(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (!ref.current || hasAnimatedRef.current) return;

    let timeoutId: NodeJS.Timeout;
    let isAnimating = false;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Более строгая проверка для мобильных устройств
          if (
            entry.isIntersecting && 
            !hasAnimatedRef.current && 
            !isAnimating &&
            entry.intersectionRatio >= 0.2
          ) {
            // Очищаем предыдущий таймаут
            clearTimeout(timeoutId);
            
            // Увеличиваем debounce для мобильных
            isAnimating = true;
            timeoutId = setTimeout(() => {
              if (!hasAnimatedRef.current && ref.current) {
                hasAnimatedRef.current = true;
                setShouldAnimate(true);
                observer.disconnect();
              }
              isAnimating = false;
            }, 300);
          } else if (!entry.isIntersecting && isAnimating) {
            // Если элемент вышел из viewport во время debounce, отменяем
            clearTimeout(timeoutId);
            isAnimating = false;
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px' }
    );

    observer.observe(ref.current);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  const handleClick = () => {
    navigate('/pricing');
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ opacity: 0 }}
      className="group glass-card hover:border-primary/30 transition-[border-color,box-shadow,background-color] duration-500 relative overflow-hidden cursor-pointer transform-gpu"
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 md:p-6">
        <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-3 md:mb-5 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
        </div>

        <div className="flex items-start justify-between mb-2 md:mb-3">
          <h3 className="text-sm md:text-xl font-semibold text-foreground line-clamp-2">{title}</h3>
          <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0 ml-1" />
        </div>

        <p className="hidden md:block text-muted-foreground mb-3 md:mb-5 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-none">
          {description}
        </p>

        <div className="flex flex-wrap gap-1 md:gap-2 mb-[clamp(0.5rem,1.2vw,0.85rem)]">
          {features.slice(0, 2).map((feature, i) => (
            <span
              key={i}
              className="px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-secondary text-[10px] md:text-xs text-muted-foreground"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="pt-[clamp(0.5rem,1.2vw,0.85rem)] border-t border-[rgba(228,236,244,0.1)] flex items-center justify-between gap-2">
          <span className="gradient-text font-bold text-[clamp(0.85rem,1.6vw,1.15rem)] whitespace-nowrap">
            {price}
          </span>
          <span className="text-muted-foreground text-[clamp(0.6rem,0.8vw,0.7rem)] uppercase tracking-wider hidden md:inline">
            Цена
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ServicesSection;
