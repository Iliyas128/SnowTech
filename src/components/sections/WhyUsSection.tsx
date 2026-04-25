import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiTensorflow,
  SiPytorch,
  SiOpenai,
  SiLangchain,
  SiDocker,
  SiTailwindcss,
  SiFigma,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';
import LogoLoop, { type LogoItem } from '@/components/LogoLoop';
import { Testimonial, type TestimonialItem } from '@/components/ui/design-testimonial';

const techLogos: LogoItem[] = [
  { name: 'React', icon: <SiReact /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'Tailwind', icon: <SiTailwindcss /> },
  { name: 'Node.js', icon: <SiNodedotjs /> },
  { name: 'Python', icon: <SiPython /> },
  { name: 'FastAPI', icon: <SiFastapi /> },
  { name: 'PostgreSQL', icon: <SiPostgresql /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
  { name: 'TensorFlow', icon: <SiTensorflow /> },
  { name: 'PyTorch', icon: <SiPytorch /> },
  { name: 'OpenAI', icon: <SiOpenai /> },
  { name: 'LangChain', icon: <SiLangchain /> },
  { name: 'Docker', icon: <SiDocker /> },
  { name: 'AWS', icon: <FaAws /> },
  { name: 'Figma', icon: <SiFigma /> },
];

const WhyUsSection = () => {
  const { t } = useLanguage();
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const advantageKeys = [
    { titleKey: 'whyUs.expertise.title', descriptionKey: 'whyUs.expertise.description' },
    { titleKey: 'whyUs.approach.title', descriptionKey: 'whyUs.approach.description' },
    { titleKey: 'whyUs.deadlines.title', descriptionKey: 'whyUs.deadlines.description' },
    { titleKey: 'whyUs.support.title', descriptionKey: 'whyUs.support.description' },
  ];

  const advantageItems: TestimonialItem[] = advantageKeys.map((item) => ({
    quote: t(item.descriptionKey),
    author: t(item.titleKey),
    company: 'SnowTech',
  }));

  return (
    <section id="why-us" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ opacity: 0 }}
          className="text-center transform-gpu"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-primary font-medium mb-4">
            {t('whyUs.badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t('whyUs.title')} <span className="gradient-text">{t('whyUs.titleHighlight')}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          style={{ opacity: 0 }}
          className="mb-20 mt-2 md:mb-28 transform-gpu"
        >
          <Testimonial items={advantageItems} label={t('whyUs.badge')} />
        </motion.div>

        {/* Tech Stack — infinite logo loop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          style={{ opacity: 0 }}
          className="glass-card transform-gpu"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
            {t('whyUs.tech.title')}
          </h3>
          <p className="text-muted-foreground text-center mb-6 md:mb-8 text-[clamp(0.85rem,1.2vw,1rem)]">
            {t('whyUs.tech.description')}
          </p>

          <LogoLoop logos={techLogos} speed={40} />
          <LogoLoop logos={techLogos} speed={55} reverse />
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUsSection;
