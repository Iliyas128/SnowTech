import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Zap, Users, Award, Clock, HeadphonesIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const techStack = [
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'FastAPI', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'TensorFlow', category: 'AI/ML' },
  { name: 'PyTorch', category: 'AI/ML' },
  { name: 'OpenAI', category: 'AI/ML' },
  { name: 'LangChain', category: 'AI/ML' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'AWS', category: 'Cloud' },
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
          style={{ opacity: 0, willChange: 'transform, opacity' }}
          className="text-center mb-16"
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
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ opacity: 0, willChange: 'transform, opacity' }}
                className="glass-card group hover:border-primary/30 transition-all duration-300"
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

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ opacity: 0, willChange: 'transform, opacity' }}
          className="glass-card"
        >
          <h3 className="text-2xl font-bold text-foreground mb-2 text-center">{t('whyUs.tech.title')}</h3>
          <p className="text-muted-foreground text-center mb-8">
            {t('whyUs.tech.description')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, index) => (
              <motion.span
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                style={{ opacity: 0, willChange: 'transform, opacity' }}
                className="px-4 py-2 rounded-xl bg-secondary hover:bg-primary/20 hover:text-primary transition-all duration-300 text-sm font-medium cursor-default"
              >
                {tech.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUsSection;
