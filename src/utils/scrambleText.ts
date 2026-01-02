// Simple scramble text animation replacement
export function animateScrambleText(
  element: HTMLElement,
  targetText: string,
  chars: string,
  duration: number,
  revealDelay: number,
  speed: number
) {
  const originalText = element.textContent || '';
  const length = targetText.length;
  let currentIndex = 0;
  const startTime = Date.now();
  
  const interval = setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    const progress = Math.min(elapsed / duration, 1);
    
    if (progress >= 1) {
      element.textContent = targetText;
      clearInterval(interval);
      return;
    }
    
    let scrambled = '';
    for (let i = 0; i < length; i++) {
      if (i < currentIndex) {
        scrambled += targetText[i];
      } else {
        const randomChar = chars[Math.floor(Math.random() * chars.length)];
        scrambled += randomChar;
      }
    }
    
    element.textContent = scrambled;
    
    if (elapsed > revealDelay) {
      const revealProgress = (elapsed - revealDelay) / (duration - revealDelay);
      currentIndex = Math.floor(revealProgress * length);
    }
  }, 1000 / (60 * speed));
  
  return () => clearInterval(interval);
}

