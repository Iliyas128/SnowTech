import { useState, useEffect } from 'react';

interface UseTypeAnimationOptions {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export const useTypeAnimation = ({ 
  text, 
  speed = 50, 
  delay = 0,
  onComplete 
}: UseTypeAnimationOptions) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (text.length === 0) {
      setDisplayedText('');
      setIsComplete(false);
      return;
    }

    setDisplayedText('');
    setIsComplete(false);

    let typeInterval: NodeJS.Timeout | null = null;
    const timeoutId = setTimeout(() => {
      let currentIndex = 0;

      typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          if (typeInterval) {
            clearInterval(typeInterval);
            typeInterval = null;
          }
          setIsComplete(true);
          if (onComplete) {
            onComplete();
          }
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (typeInterval) {
        clearInterval(typeInterval);
      }
    };
  }, [text, speed, delay, onComplete]);

  return { displayedText, isComplete };
};

