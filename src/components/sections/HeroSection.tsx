import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const { t } = useLanguage();

  const stats = [
    { value: '20+', label: t('hero.stats.projects') },
    { value: '3+', label: t('hero.stats.years') },
    { value: '20+', label: t('hero.stats.clients') },
    { value: '99.9%', label: t('hero.stats.clients') },
  ];

  return (
    <section className="hero-section relative flex items-center justify-center overflow-hidden min-h-screen pt-[clamp(5rem,10vw,7rem)] pb-[clamp(3rem,7vw,5rem)]">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="hero-vignette" />
      </div>

      <div className="relative z-10 w-full px-[clamp(1rem,4vw,2rem)]">
        <div className="mx-auto text-center w-full max-w-[clamp(20rem,90vw,76rem)]">
          <div className="relative mx-auto w-full">
            <motion.img
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              style={{ opacity: 0, willChange: 'transform, opacity' }}
              src="/images/sneg.png"
              alt=""
              aria-hidden="true"
              className="hero-snowflake"
            />

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ opacity: 0, willChange: 'transform, opacity' }}
              className="hero-title relative z-20 font-extrabold leading-[1.02] tracking-tight text-[clamp(2.2rem,8.2vw,6.4rem)]"
            >
              <span>{t('hero.title1')}</span>{' '}
              <span className="hero-title-accent">{t('hero.title2')}</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ opacity: 0, willChange: 'transform, opacity' }}
            className="hero-description relative z-20 mx-auto text-balance text-[clamp(0.9rem,1.8vw,1.15rem)] max-w-[clamp(18rem,70vw,60rem)] mt-[clamp(1.25rem,3vw,2rem)] leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ opacity: 0, willChange: 'transform, opacity' }}
            className="relative z-20 mt-[clamp(1.5rem,3.5vw,2.25rem)] flex flex-col sm:flex-row items-center justify-center gap-[clamp(0.6rem,1.4vw,1rem)]"
          >
            <a href="/#contacts">
              <Button className="hero-cta-primary group">
                {t('hero.cta1')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <Link to="/cases">
              <Button className="hero-cta-secondary">
                {t('hero.cta2')}
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ opacity: 0, willChange: 'transform, opacity' }}
            className="relative z-20 mx-auto mt-[clamp(2rem,5vw,3.2rem)] grid grid-cols-2 md:grid-cols-4 gap-[clamp(0.75rem,2vw,1.5rem)] w-full max-w-[clamp(20rem,85vw,58rem)]"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="snowflake-stat"
              >
                <div className="snowflake-stat-inner">
                  <div className="hero-stat-value font-bold text-[clamp(1.25rem,2.8vw,1.9rem)] leading-none mb-[clamp(0.2rem,0.5vw,0.4rem)]">
                    {stat.value}
                  </div>
                  <div className="hero-stat-label text-[clamp(0.65rem,1.1vw,0.8rem)]">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ opacity: 0 }}
        className="absolute bottom-[clamp(1rem,3vw,2rem)] left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-[clamp(1.1rem,1.6vw,1.5rem)] h-[clamp(1.9rem,2.6vw,2.5rem)] rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-1 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
