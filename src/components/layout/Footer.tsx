import { Zap, Github, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const links = {
    services: [
      { labelKey: 'services.web.title', href: '/#services' },
      { labelKey: 'services.mobile.title', href: '/#services' },
      { labelKey: 'services.chatbot.title', href: '/#services' },
      { labelKey: 'services.ml.title', href: '/#services' },
      { labelKey: 'services.cv.title', href: '/#services' },
    ],
    company: [
      { labelKey: 'footer.about', href: '/about' },
      { labelKey: 'nav.cases', href: '/cases' },
      { labelKey: 'nav.pricing', href: '/pricing' },
      { labelKey: 'nav.blog', href: '/blog' },
      { labelKey: 'nav.contacts', href: '/#contacts' },
    ],
  };

  const socials = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">SnowTEch</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2">
              {links.services.map((link) => (
                <li key={link.labelKey}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.labelKey}>
                  {link.href.startsWith('/') && !link.href.startsWith('/#') ? (
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {t(link.labelKey)}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {t(link.labelKey)}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.subscribe')}</h4>
            <p className="text-sm text-muted-foreground mb-4">
              {t('footer.description')}
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-4 py-2 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                {t('footer.subscribeBtn')}
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} SnowTEch. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
