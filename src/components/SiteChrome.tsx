import { useLocation } from 'react-router-dom';
import ParticlesBackground from '@/components/ParticlesBackground';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const LAW_AI_PREFIX = '/lawAi';

export function SiteChrome() {
  const { pathname } = useLocation();
  const isLawAi = pathname === LAW_AI_PREFIX || pathname.startsWith(`${LAW_AI_PREFIX}/`);

  if (isLawAi) {
    return null;
  }

  return (
    <>
      <ParticlesBackground />
      <FloatingWhatsApp />
    </>
  );
}
