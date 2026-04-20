import { motion } from 'framer-motion';
import UnicornScene from 'unicornstudio-react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TypeText } from './TypeText';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSceneDimensions, useSceneLoading } from '@/hooks/use-scene';
import Preloader from './Preloader';

const PROJECT_ID = '05qMo32sG7HvbTv8s2Ev';

const techStack = [
  'JavaScript',
  'TypeScript',
  'React',
  'Vue',
  'Express',
  'Next.js',
  'Python',
  'TensorFlow',
  'PyTorch',
];

const Iliyas = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const dimensions = useSceneDimensions(isMobile);
  const { containerRef: sceneRef, isLoading } = useSceneLoading(PROJECT_ID);

  if (isMobile) {
    return (
      <div className="relative w-full h-full flex flex-col">
        <div className="flex-1 flex flex-col justify-start pt-4 px-4 pb-2 space-y-4 min-h-0">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-white text-[10px] font-medium uppercase tracking-wider mb-1">
                {t('employee.iliyas.role')}
              </div>
              <h1 className="text-2xl font-bold leading-tight">
                <span className="text-white">{t('employee.iliyas.firstName')}</span>
                <br />
                <span className="text-red-500">{t('employee.iliyas.lastName')}</span>
              </h1>
              <div className="w-20 h-0.5 bg-red-500 mt-1"></div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="border border-red-500 p-2 bg-black/50 backdrop-blur-sm">
                <div className="text-red-500 text-2xl font-bold">2+</div>
                <div className="text-white text-[8px] uppercase mt-0.5">{t('employee.iliyas.experience')}</div>
              </div>
              <div className="border border-red-500 p-2 bg-black/50 backdrop-blur-sm">
                <div className="text-red-500 text-2xl font-bold">9+</div>
                <div className="text-white text-[8px] uppercase mt-0.5">{t('employee.iliyas.technologies')}</div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-red-500 text-[10px] font-mono mb-2">// {t('employee.iliyas.techStack')}</div>
            <div className="flex flex-wrap gap-1.5">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-red-500 px-2 py-1 bg-black/50 backdrop-blur-sm"
                >
                  <span className="text-white text-[10px]">{tech}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex-shrink-0 px-4 pb-2 pointer-events-auto">
          <Link
            to="/about/nurtore"
            className="inline-flex items-center justify-center w-full h-10 bg-black/90 backdrop-blur-sm border border-red-500 hover:bg-red-700/90 hover:border-red-400 text-white text-xs px-3 py-2 rounded-lg transition-all duration-300"
          >
            <span className="whitespace-nowrap text-xs">{t('employee.iliyas.nextEmployee')}</span>
            <ArrowRight className="w-3 h-3 ml-2" />
          </Link>
        </div>

        <div className="relative z-10 flex-shrink-0 flex items-center justify-center">
          <div ref={sceneRef} className="relative w-full flex items-center justify-center">
            {isLoading && <Preloader />}
            <UnicornScene projectId={PROJECT_ID} width={dimensions.width} height={dimensions.height} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div ref={sceneRef} className="relative z-0 flex items-center justify-center w-full h-full">
        {isLoading && <Preloader />}
        <UnicornScene projectId={PROJECT_ID} width={dimensions.width} height={dimensions.height} />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-4 left-4 md:top-8 md:left-8 lg:top-12 lg:left-12">
          <div className="text-white text-[10px] md:text-xs lg:text-sm font-medium uppercase tracking-wider mb-1 md:mb-2">
            {t('employee.iliyas.role')}
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
            <span className="text-white">{t('employee.iliyas.firstName')}</span>
            <br />
            <span className="text-red-500">{t('employee.iliyas.lastName')}</span>
          </h1>
          <div className="w-16 md:w-24 lg:w-32 h-0.5 bg-red-500 mt-1 md:mt-2"></div>
        </div>

        <div className="absolute top-4 right-4 md:top-8 md:right-8 lg:top-12 lg:right-12 flex flex-col gap-2 md:gap-4">
          <div className="border border-red-500 p-2 md:p-4 lg:p-6 bg-black/50 backdrop-blur-sm">
            <div className="text-red-500 text-2xl md:text-4xl lg:text-5xl font-bold">2+</div>
            <div className="text-white text-[10px] md:text-xs lg:text-sm uppercase mt-1">{t('employee.iliyas.experience')}</div>
          </div>
          <div className="border border-red-500 p-2 md:p-4 lg:p-6 bg-black/50 backdrop-blur-sm">
            <div className="text-red-500 text-2xl md:text-4xl lg:text-5xl font-bold">9+</div>
            <div className="text-white text-[10px] md:text-xs lg:text-sm uppercase mt-1">{t('employee.iliyas.technologies')}</div>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 lg:bottom-12 lg:left-12">
          <div className="text-red-500 text-[10px] md:text-xs lg:text-sm font-mono mb-2 md:mb-3">// {t('employee.iliyas.techStack')}</div>
          <div className="flex flex-wrap gap-1.5 md:gap-2 max-w-[200px] md:max-w-xs lg:max-w-md">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-red-500 px-2 py-1 md:px-3 md:py-1.5 bg-black/50 backdrop-blur-sm"
              >
                <span className="text-white text-[10px] md:text-xs lg:text-sm">{tech}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12 max-w-[180px] md:max-w-xs lg:max-w-md">
          <div className="text-white text-[10px] md:text-xs lg:text-sm xl:text-base leading-relaxed mb-1 md:mb-2 min-h-[1.5em]">
            <TypeText text={t('employee.iliyas.quote')} speed={50} delay={0} />
          </div>
          <div className="text-red-500 text-[9px] md:text-[10px] lg:text-xs xl:text-sm font-medium min-h-[1.2em]">
            <TypeText text={t('employee.iliyas.quoteAuthor')} speed={50} delay={2000} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 md:bottom-6 lg:bottom-7 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
        <Link
          to="/about/nurtore"
          className="inline-flex items-center justify-center bg-black/90 backdrop-blur-sm border border-red-500 hover:bg-red-700/90 hover:border-red-400 text-white text-xs md:text-sm lg:text-base px-3 md:px-4 lg:px-6 py-2.5 md:py-3 lg:py-4 rounded-lg transition-all duration-300"
        >
          <span className="whitespace-nowrap text-xs md:text-sm lg:text-base">{t('employee.iliyas.nextEmployee')}</span>
          <ArrowRight className="w-3 sm:w-3 md:w-4 md:h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Iliyas;
