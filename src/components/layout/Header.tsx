import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { label: t('nav.services'), href: '/#services' },
    { label: t('nav.whyUs'), href: '/#why-us' },
    { label: t('nav.cases'), href: '/#cases' },
    { label: t('nav.pricing'), href: '/pricing' },
    { label: t('nav.blog'), href: '/blog' },
    { label: t('nav.contacts'), href: '/#contacts' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const location = useLocation();

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      if (location.pathname === '/') {
        const element = document.querySelector(href.substring(1));
        element?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = href;
      }
    }
    setIsMobileMenuOpen(false);
  };

  const renderNavLink = (item: typeof navItems[0]) => {
    const isExternal = item.href.startsWith('/#');
    
    if (isExternal) {
      return (
        <a
          key={item.href}
          href={item.href}
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              handleNavClick(item.href);
            }
          }}
          className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium"
        >
          {item.label}
        </a>
      );
    }
    
    return (
      <Link
        key={item.href}
        to={item.href}
        className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium"
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-shadow duration-300">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">SnowTEch</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(renderNavLink)}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <a href="/#contacts">
            <Button variant="hero" size="lg">
              {t('nav.discuss')}
            </Button>
          </a>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
          <button
            className="text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass mt-2 mx-4 rounded-2xl overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map((item) => {
                const isExternal = item.href.startsWith('/#');
                
                if (isExternal) {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 py-3 px-4 rounded-xl hover:bg-secondary"
                      onClick={(e) => {
                        if (location.pathname === '/') {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }
                      }}
                    >
                      {item.label}
                    </a>
                  );
                }
                
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 py-3 px-4 rounded-xl hover:bg-secondary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <a href="/#contacts">
                <Button variant="hero" size="lg" className="mt-2 w-full">
                  {t('nav.discuss')}
                </Button>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
