import { useEffect } from 'react';

interface PreloaderProps {
  onComplete?: () => void;
  timeout?: number;
}

const Preloader = ({ onComplete, timeout }: PreloaderProps) => {
  useEffect(() => {
    if (!onComplete || !timeout) return;
    const id = window.setTimeout(onComplete, timeout);
    return () => window.clearTimeout(id);
  }, [onComplete, timeout]);

  return (
    <div className="preloader-overlay" role="status" aria-live="polite" aria-label="Loading">
      <div className="preloader-spinner">
        <span className="preloader-ring preloader-ring--outer" />
        <span className="preloader-ring preloader-ring--inner" />
        <span className="preloader-dot" />
      </div>
    </div>
  );
};

export default Preloader;
