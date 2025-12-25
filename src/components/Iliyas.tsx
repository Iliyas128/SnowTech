import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import UnicornScene from 'unicornstudio-react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Iliyas = () => {
  const [dimensions, setDimensions] = useState({ width: 1440, height: 900 });

  useEffect(() => {
    const updateDimensions = () => {
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight - 80; // Subtract header height
      const aspectRatio = 1440 / 900;
      const isMobile = containerWidth < 768; // Mobile breakpoint
      
      // On mobile: crop from sides (make width smaller to allow cropping)
      // On desktop: use full width
      let width = isMobile ? containerWidth * 1.55 : containerWidth; // 85% width on mobile for cropping
      let height = width / aspectRatio;
      
      // If height exceeds container, scale based on height instead
      if (height > containerHeight) {
        height = containerHeight;
        width = height * aspectRatio;
      }
      
      // No max width/height limit - allow scaling on large screens
      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

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

  return (
    <div className="relative w-full h-full flex flex-col md:block overflow-hidden">
      {/* Mobile Layout: Content on top, Photo on bottom */}
      <div className="flex flex-col md:hidden w-full h-full">
        {/* Top Section - Content */}
        <div className="flex-1 flex flex-col justify-start pt-4 px-4 pb-2 space-y-4">
          {/* Title and Stats Row */}
          <div className="flex justify-between items-start">
            {/* Left - Title */}
            <div>
              <div className="text-white text-[10px] font-medium uppercase tracking-wider mb-1">
                FULL STACK DEVELOPER
              </div>
              <h1 className="text-2xl font-bold leading-tight">
                <span className="text-white">ИЛЬЯС</span>
                <br />
                <span className="text-red-500">КЕЛЕС</span>
              </h1>
              <div className="w-20 h-0.5 bg-red-500 mt-1"></div>
            </div>

            {/* Right - Stats */}
            <div className="flex flex-col gap-2">
              <div className="border border-red-500 p-2 bg-black/50 backdrop-blur-sm">
                <div className="text-red-500 text-2xl font-bold">2+</div>
                <div className="text-white text-[8px] uppercase mt-0.5">ГОДА ОПЫТА</div>
              </div>
              <div className="border border-red-500 p-2 bg-black/50 backdrop-blur-sm">
                <div className="text-red-500 text-2xl font-bold">9+</div>
                <div className="text-white text-[8px] uppercase mt-0.5">ТЕХНОЛОГИЙ</div>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <div className="text-red-500 text-[10px] font-mono mb-2">// TECH STACK</div>
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

        {/* Button - Above photo */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex-shrink-0 px-4 pb-2 pointer-events-auto">
          <Link
            to="/about/nurtore"
            className="inline-flex items-center justify-center w-full h-10 bg-black/90 backdrop-blur-sm border border-red-500 hover:bg-red-700/90 hover:border-red-400 text-white text-xs px-3 py-2 rounded-lg transition-all duration-300"
          >
            <span className="whitespace-nowrap text-xs">Следующий сотрудник SnowTEch</span>
            <ArrowRight className="w-3 h-3 ml-2" />
          </Link>
        </div>

        {/* Bottom Section - Photo */}
        <div className="relative z-10 flex-shrink-0 flex items-center justify-center relative">
          <div className="relative w-full flex items-center justify-center">
            <UnicornScene 
              projectId="dt5CSkWrk8JFLTT8R2Dh" 
              width={dimensions.width} 
              height={dimensions.height} 
            />
          </div>
        </div>
      </div>

      {/* Desktop Layout: Absolute positioning */}
      <div className="hidden md:block relative w-full h-full">
        {/* Unicorn Studio Scene - Center */}
        <div className="relative z-0 flex items-center justify-center w-full h-full">
          <UnicornScene 
            projectId="dt5CSkWrk8JFLTT8R2Dh" 
            width={dimensions.width} 
            height={dimensions.height} 
          />
        </div>

        {/* Text Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Top Left - Title */}
          <div className="absolute top-4 left-4 md:top-8 md:left-8 lg:top-12 lg:left-12">
            <div className="text-white text-[10px] md:text-xs lg:text-sm font-medium uppercase tracking-wider mb-1 md:mb-2">
              FULL STACK DEVELOPER
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              <span className="text-white">ИЛЬЯС</span>
              <br />
              <span className="text-red-500">КЕЛЕС</span>
            </h1>
            <div className="w-16 md:w-24 lg:w-32 h-0.5 bg-red-500 mt-1 md:mt-2"></div>
          </div>

          {/* Top Right - Stats */}
          <div className="absolute top-4 right-4 md:top-8 md:right-8 lg:top-12 lg:right-12 flex flex-col gap-2 md:gap-4">
            <div className="border border-red-500 p-2 md:p-4 lg:p-6 bg-black/50 backdrop-blur-sm">
              <div className="text-red-500 text-2xl md:text-4xl lg:text-5xl font-bold">2+</div>
              <div className="text-white text-[10px] md:text-xs lg:text-sm uppercase mt-1">ГОДА ОПЫТА</div>
            </div>
            <div className="border border-red-500 p-2 md:p-4 lg:p-6 bg-black/50 backdrop-blur-sm">
              <div className="text-red-500 text-2xl md:text-4xl lg:text-5xl font-bold">9+</div>
              <div className="text-white text-[10px] md:text-xs lg:text-sm uppercase mt-1">ТЕХНОЛОГИЙ</div>
            </div>
          </div>

          {/* Bottom Left - Tech Stack */}
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 lg:bottom-12 lg:left-12">
            <div className="text-red-500 text-[10px] md:text-xs lg:text-sm font-mono mb-2 md:mb-3">// TECH STACK</div>
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

          {/* Bottom Right - Quote (Desktop only) */}
          <div className="hidden md:block absolute bottom-4 right-4 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12 max-w-[180px] md:max-w-xs lg:max-w-md">
            <p className="text-white text-[10px] md:text-xs lg:text-sm xl:text-base leading-relaxed mb-1 md:mb-2">
              "С большой силой приходит большая ответственность"
            </p>
            <p className="text-red-500 text-[9px] md:text-[10px] lg:text-xs xl:text-sm font-medium">- ПИТЕР ПАРКЕР</p>
          </div>
        </div>

        {/* Bottom Center - Next Employee Link */}
        <div className="absolute bottom-3 md:bottom-6 lg:bottom-7 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
          <Link
            to="/about/nurtore"
            className="inline-flex items-center justify-center bg-black/90 backdrop-blur-sm border border-red-500 hover:bg-red-700/90 hover:border-red-400 text-white text-xs md:text-sm lg:text-base px-3 md:px-4 lg:px-6 py-2.5 md:py-3 lg:py-4 rounded-lg transition-all duration-300"
          >
            <span className="whitespace-nowrap text-xs md:text-sm lg:text-base">Следующий сотрудник SnowTEch</span>
            <ArrowRight className="w-3 sm:w-3 md:w-4 md:h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Iliyas;
