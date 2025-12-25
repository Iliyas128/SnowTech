import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import UnicornScene from 'unicornstudio-react';

const Nurtore = () => {
  const [dimensions, setDimensions] = useState({ width: 1440, height: 900 });

  useEffect(() => {
    const updateDimensions = () => {
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight - 80; // Subtract header height
      const maxWidth = 1440;
      const maxHeight = 900;
      const aspectRatio = 1440 / 900;
      
      let width = containerWidth;
      let height = containerWidth / aspectRatio;
      
      if (height > containerHeight) {
        height = containerHeight;
        width = height * aspectRatio;
      }
      
      if (width > maxWidth) {
        width = maxWidth;
        height = maxHeight;
      }
      
      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Unicorn Studio Scene - Center */}
      <div className="relative z-0 flex items-center justify-center">
        <UnicornScene 
          projectId="dt5CSkWrk8JFLTT8R2Dh" 
          width={dimensions.width} 
          height={dimensions.height} 
        />
      </div>
    </div>
  );
};

export default Nurtore;

