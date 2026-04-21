import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Zap, Users, Award } from 'lucide-react';
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

  const advantages = [
    {
      icon: Shield,
      titleKey: 'whyUs.expertise.title',
      descriptionKey: 'whyUs.expertise.description',
    },
    {
      icon: Zap,
      titleKey: 'whyUs.approach.title',
      descriptionKey: 'whyUs.approach.description',
    },
    {
      icon: Users,
      titleKey: 'whyUs.deadlines.title',
      descriptionKey: 'whyUs.deadlines.description',
    },
    {
      icon: Award,
      titleKey: 'whyUs.support.title',
      descriptionKey: 'whyUs.support.description',
    },
  ];

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
          className="text-center mb-16 transform-gpu"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-primary font-medium mb-4">
            {t('whyUs.badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t('whyUs.title')} <span className="gradient-text">{t('whyUs.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('whyUs.description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {advantages.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ opacity: 0 }}
                className="glass-card group hover:border-primary/30 transition-[border-color,box-shadow,background-color] duration-300 transform-gpu"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{t(item.titleKey)}</h3>
                <p className="text-sm text-muted-foreground">{t(item.descriptionKey)}</p>
              </motion.div>
            );
          })}
        </div>

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
