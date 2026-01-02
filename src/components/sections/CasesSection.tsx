import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, TrendingUp, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';
import eCommerceImage from '@/assets/e-commerce.jpg';

const CasesSection = () => {
  const { t } = useLanguage();
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const cases = [
    {
      titleKey: 'cases.ecommerce.title',
      clientKey: 'cases.ecommerce.client',
      descriptionKey: 'cases.ecommerce.description',
      image: eCommerceImage,
      results: [
        { icon: TrendingUp, labelKey: 'cases.ecommerce.result1' },
        { icon: Clock, labelKey: 'cases.ecommerce.result2' },
        { icon: Users, labelKey: 'cases.ecommerce.result3' },
      ],
      tags: ['React', 'Node.js', 'ML', 'PostgreSQL'],
    },
    {
      titleKey: 'cases.rag.title',
      clientKey: 'cases.rag.client',
      descriptionKey: 'cases.rag.description',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&auto=format&fit=crop&q=60',
      results: [
        { icon: TrendingUp, labelKey: 'cases.rag.result1' },
        { icon: Clock, labelKey: 'cases.rag.result2' },
        { icon: Users, labelKey: 'cases.rag.result3' },
      ],
      tags: ['Python', 'LangChain', 'OpenAI', 'Telegram'],
    },
    {
      titleKey: 'cases.cv.title',
      clientKey: 'cases.cv.client',
      descriptionKey: 'cases.cv.description',
      image: 'https://images.unsplash.com/photo-1565514020179-026b92b2d2b0?w=800&auto=format&fit=crop&q=60',
      results: [
        { icon: TrendingUp, labelKey: 'cases.cv.result1' },
        { icon: Clock, labelKey: 'cases.cv.result2' },
        { icon: Users, labelKey: 'cases.cv.result3' },
      ],
      tags: ['Python', 'PyTorch', 'OpenCV', 'YOLO'],
    },
  ];

  return (
    <section id="cases" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-primary font-medium mb-4">
            {t('cases.badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t('cases.title')} <span className="gradient-text">{t('cases.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('cases.description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((caseItem, index) => (
            <CaseCard key={caseItem.titleKey} caseItem={caseItem} index={index} t={t} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link to="/cases">
            <Button variant="glass" size="lg" className="group">
              {t('cases.viewAll')}
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const CaseCard = ({ 
  caseItem, 
  index, 
  t 
}: { 
  caseItem: {
    titleKey: string;
    clientKey: string;
    descriptionKey: string;
    image: string;
    results: { icon: typeof TrendingUp; labelKey: string }[];
    tags: string[];
  }; 
  index: number;
  t: (key: string) => string;
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
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group cursor-pointer"
      onClick={handleClick}
    >
      <div className="glass rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-500">
        <div className="relative h-56 overflow-hidden">
          <img
            src={caseItem.image}
            alt={t(caseItem.titleKey)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-sm text-primary font-medium">{t(caseItem.clientKey)}</span>
            <h3 className="text-xl font-bold text-foreground">{t(caseItem.titleKey)}</h3>
          </div>
        </div>

        <div className="p-6">
          <p className="text-muted-foreground text-sm mb-5">{t(caseItem.descriptionKey)}</p>

          <div className="grid grid-cols-3 gap-3 mb-5">
            {caseItem.results.map((result, i) => {
              const Icon = result.icon;
              return (
                <div key={i} className="text-center p-3 rounded-xl bg-secondary/50">
                  <Icon className="w-4 h-4 text-primary mx-auto mb-1" />
                  <span className="text-xs text-muted-foreground">{t(result.labelKey)}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2">
            {caseItem.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-primary/10 text-xs text-primary font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CasesSection;
