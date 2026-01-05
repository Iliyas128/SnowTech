import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Don't scroll on pages where scroll is disabled (About pages)
    const noScrollPages = ['/about', '/about/nurtore'];
    if (noScrollPages.some(page => pathname.startsWith(page))) {
      return;
    }
    
    // Only scroll if page is actually scrollable
    if (document.body.style.overflow !== 'hidden') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;


