import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { CaseItem } from '@/data/casesData';

type GalleryImageProps = {
  src: string;
  alt: string;
};

const GalleryImage = ({ src, alt }: GalleryImageProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  return (
    <figure className="case-modal-image-wrapper">
      <span
        className="case-modal-image-spinner"
        data-hidden={loaded ? 'true' : 'false'}
        aria-hidden="true"
      />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={loaded ? 'is-loaded' : ''}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </figure>
  );
};

type CaseModalProps = {
  caseItem: CaseItem | null;
  open: boolean;
  onClose: () => void;
};

const CaseModal = ({ caseItem, open, onClose }: CaseModalProps) => {
  const { t } = useLanguage();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && caseItem && (
        <motion.div
          key="case-modal"
          className="case-modal-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={contentRef}
            className="case-modal-content"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <header className="case-modal-header">
              <div className="case-modal-header-left">
                <h2 id="case-modal-title" className="case-modal-title">
                  {t(caseItem.titleKey)}
                </h2>
                {caseItem.liveUrl && (
                  <a
                    href={caseItem.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="case-modal-live"
                    aria-label={t('casemodal.viewLive')}
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    <span>{t('casemodal.viewLive')}</span>
                  </a>
                )}
                <span className="case-modal-client">{t(caseItem.clientKey)}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="case-modal-close"
                aria-label={t('casemodal.close')}
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </header>

            <div className="case-modal-body">
              <div className="case-modal-info">
                <section>
                  <h3 className="case-modal-section-title">
                    {t('casemodal.projectDescription')}
                  </h3>
                  <p className="case-modal-description">
                    {t(caseItem.longDescriptionKey)}
                  </p>
                </section>

                <section>
                  <h3 className="case-modal-section-title">
                    {t('casemodal.results')}
                  </h3>
                  <div className="case-modal-results">
                    {caseItem.results.map((result, i) => {
                      const Icon = result.icon;
                      return (
                        <div key={i} className="case-modal-result">
                          <Icon
                            className="w-4 h-4 text-primary"
                            aria-hidden="true"
                          />
                          <span>{t(result.labelKey)}</span>
                        </div>
                      );
                    })}
                  </div>
                </section>

                <section>
                  <h3 className="case-modal-section-title">
                    {t('casemodal.techStack')}
                  </h3>
                  <div className="case-modal-tags">
                    {caseItem.tags.map((tag) => (
                      <span key={tag} className="case-modal-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              <div className="case-modal-gallery">
                {caseItem.gallery.map((src, i) => (
                  <GalleryImage
                    key={src}
                    src={src}
                    alt={`${t(caseItem.titleKey)} — ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CaseModal;
