import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

const PHONE = '77067007052';

const FloatingWhatsApp = () => {
  const { language } = useLanguage();

  const presetMessages: Record<string, string> = {
    ru: 'Здравствуйте! Хочу обсудить проект со SnowTech.',
    en: 'Hello! I would like to discuss a project with SnowTech.',
    kz: 'Сәлеметсіз бе! SnowTech-пен жоба талқылағым келеді.',
  };
  const labels: Record<string, string> = {
    ru: 'Написать в WhatsApp',
    en: 'Chat on WhatsApp',
    kz: 'WhatsApp-та жазу',
  };

  const message = encodeURIComponent(presetMessages[language] ?? presetMessages.ru);
  const label = labels[language] ?? labels.ru;
  const href = `https://wa.me/${PHONE}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label={label}
      title={label}
    >
      <span className="floating-whatsapp-pulse" aria-hidden="true" />
      <FaWhatsapp className="floating-whatsapp-icon" aria-hidden="true" />
    </a>
  );
};

export default FloatingWhatsApp;
