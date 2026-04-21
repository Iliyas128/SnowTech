import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import CaseModal from '@/components/CaseModal';
import { featuredCases, type CaseItem } from '@/data/casesData';

const CasesSection = () => {
  const { t } = useLanguage();
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const [activeCase, setActiveCase] = useState<CaseItem | null>(null);

  return (
    <section id="cases" className="py-24 relative">
      <div className="container mx-auto px-4 relative z-10">
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
          {featuredCases.map((caseItem, index) => (
            <CaseCard
              key={caseItem.id}
              caseItem={caseItem}
              index={index}
              t={t}
              onOpen={() => setActiveCase(caseItem)}
            />
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

      <CaseModal
        caseItem={activeCase}
        open={activeCase !== null}
        onClose={() => setActiveCase(null)}
      />
    </section>
  );
};

type CaseCardProps = {
  caseItem: CaseItem;
  index: number;
  t: (key: string) => string;
  onOpen: () => void;
};

const CaseCard = ({ caseItem, index, t, onOpen }: CaseCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (!ref.current || hasAnimatedRef.current) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let isAnimating = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !hasAnimatedRef.current &&
            !isAnimating &&
            entry.intersectionRatio >= 0.2
          ) {
            clearTimeout(timeoutId);
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
            clearTimeout(timeoutId);
            isAnimating = false;
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px' },
    );

    observer.observe(ref.current);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group cursor-pointer transform-gpu h-full"
      onClick={onOpen}
      onKeyDown={handleKey}
      role="button"
      tabIndex={0}
    >
      <div className="glass rounded-3xl overflow-hidden hover:border-primary/30 transition-[border-color,box-shadow,background-color] duration-500 h-full flex flex-col">
        <div className="relative h-56 overflow-hidden flex-shrink-0">
          <img
            src={caseItem.cover}
            alt={t(caseItem.titleKey)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-sm text-primary font-medium">{t(caseItem.clientKey)}</span>
            <h3 className="text-xl font-bold text-foreground">{t(caseItem.titleKey)}</h3>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <p className="text-muted-foreground text-sm mb-5 flex-1">{t(caseItem.descriptionKey)}</p>

          <div className="grid grid-cols-3 gap-3 mb-5">
            {caseItem.results.map((result, i) => {
              const Icon = result.icon ?? TrendingUp;
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
