import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  textKey: string;
};

const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Айдар Нурланов',
    role: 'CEO',
    company: 'Retail Pro',
    avatar: 'AN',
    rating: 5,
    textKey: 'testimonials.t1',
  },
  {
    id: 't2',
    name: 'Мария Сергеева',
    role: 'Marketing Director',
    company: 'AutoDrive',
    avatar: 'МС',
    rating: 5,
    textKey: 'testimonials.t2',
  },
  {
    id: 't3',
    name: 'Данияр Алимов',
    role: 'Founder',
    company: 'EstateOne',
    avatar: 'ДА',
    rating: 5,
    textKey: 'testimonials.t3',
  },
  {
    id: 't4',
    name: 'Алия Бекова',
    role: 'Product Manager',
    company: 'LogiFlow',
    avatar: 'АБ',
    rating: 5,
    textKey: 'testimonials.t4',
  },
  {
    id: 't5',
    name: 'Ерлан Жумабаев',
    role: 'COO',
    company: 'SmartFactory',
    avatar: 'ЕЖ',
    rating: 5,
    textKey: 'testimonials.t5',
  },
  {
    id: 't6',
    name: 'Камила Искакова',
    role: 'CTO',
    company: 'PlayZone',
    avatar: 'КИ',
    rating: 5,
    textKey: 'testimonials.t6',
  },
];

const gradients = [
  'linear-gradient(135deg, #a9bbcf 0%, #5b6f8a 100%)',
  'linear-gradient(135deg, #c3d3e4 0%, #7a8ea8 100%)',
  'linear-gradient(135deg, #8ea6bd 0%, #4a5d75 100%)',
  'linear-gradient(135deg, #b7c5d4 0%, #6d8399 100%)',
  'linear-gradient(135deg, #dfe8f3 0%, #8ea6bd 100%)',
  'linear-gradient(135deg, #9fb3c8 0%, #536478 100%)',
];

const TestimonialsSection = () => {
  const { t } = useLanguage();
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.2 });

  const prevBtnId = 'testimonials-prev';
  const nextBtnId = 'testimonials-next';

  return (
    <section id="testimonials" className="py-[clamp(3.5rem,8vw,6rem)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ opacity: 0 }}
          className="text-center mb-[clamp(2rem,5vw,4rem)] transform-gpu"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-primary font-medium mb-4">
            {t('testimonials.badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t('testimonials.title')}{' '}
            <span className="gradient-text">{t('testimonials.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-[clamp(0.9rem,1.4vw,1.05rem)]">
            {t('testimonials.description')}
          </p>
        </motion.div>

        <div className="relative testimonials-swiper-wrapper">
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 120,
              modifier: 2.5,
              slideShadows: false,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: '.testimonials-pagination',
              bulletClass: 'testimonials-bullet',
              bulletActiveClass: 'testimonials-bullet-active',
            }}
            navigation={{
              prevEl: `#${prevBtnId}`,
              nextEl: `#${nextBtnId}`,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1.1,
                spaceBetween: 16,
                coverflowEffect: { depth: 60, modifier: 1.2, rotate: 0, stretch: 0, slideShadows: false },
              },
              640: {
                slidesPerView: 1.4,
                spaceBetween: 20,
              },
              900: {
                slidesPerView: 2.2,
                spaceBetween: 24,
              },
              1200: {
                slidesPerView: 2.8,
                spaceBetween: 28,
              },
            }}
            className="testimonials-swiper"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={item.id} className="!h-auto !flex">
                <article className="testimonial-card group w-full flex flex-col">
                  <Quote
                    className="w-8 h-8 md:w-10 md:h-10 mb-3 md:mb-4 text-primary/70"
                    aria-hidden="true"
                  />

                  <p className="text-foreground/90 leading-relaxed text-[clamp(0.9rem,1.3vw,1.05rem)] flex-1">
                    {t(item.textKey)}
                  </p>

                  <div className="mt-5 md:mt-6 flex items-center gap-3 md:gap-4">
                    <div
                      className="testimonial-avatar"
                      style={{ background: gradients[index % gradients.length] }}
                      aria-hidden="true"
                    >
                      {item.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-foreground font-semibold text-sm md:text-base truncate">
                        {item.name}
                      </div>
                      <div className="text-muted-foreground text-xs md:text-sm truncate">
                        {item.role} · {item.company}
                      </div>
                    </div>
                    <div className="flex gap-0.5 flex-shrink-0" aria-label={`${item.rating} out of 5`}>
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 md:w-4 md:h-4 fill-primary text-primary"
                        />
                      ))}
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="testimonials-controls">
            <button
              id={prevBtnId}
              type="button"
              className="testimonial-nav-btn"
              aria-label={t('testimonials.prev')}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="testimonials-pagination" />
            <button
              id={nextBtnId}
              type="button"
              className="testimonial-nav-btn"
              aria-label={t('testimonials.next')}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
