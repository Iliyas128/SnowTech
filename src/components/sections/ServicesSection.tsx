import { motion, useInView } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { BreakableCard } from '@/components/ui/kinetic-shatter-box-section';
import { useToast } from '@/hooks/use-toast';

type CouponDef = {
  code: string;
  discount: string;
  /** translation key for what the discount applies to */
  targetKey: 'services.coupon.targetWeb' | 'services.coupon.targetAll';
  /** weighted probability — higher = more likely */
  weight: number;
};

const COUPON_POOL: CouponDef[] = [
  { code: '500793', discount: '40%', targetKey: 'services.coupon.targetWeb', weight: 1 },
  { code: '040702', discount: '20%', targetKey: 'services.coupon.targetAll', weight: 3 },
  { code: '741011', discount: '15%', targetKey: 'services.coupon.targetWeb', weight: 6 },
];

const TOTAL_CARDS = 7;
const STORAGE_KEY = 'snowtech-coupon-lottery-v2';
const WHATSAPP_PHONE = '77067007052';
const PRODUCT_TOAST_SESSION_KEY = 'snowtech-law-product-toast-shown-v1';

type LotteryState = {
  winningIndex: number;
  coupon: { code: string; discount: string; targetKey: CouponDef['targetKey'] };
  brokenIndices: number[];
};

function pickWeightedCoupon(): LotteryState['coupon'] {
  const total = COUPON_POOL.reduce((s, c) => s + c.weight, 0);
  let r = Math.random() * total;
  for (const c of COUPON_POOL) {
    if (r < c.weight) {
      return { code: c.code, discount: c.discount, targetKey: c.targetKey };
    }
    r -= c.weight;
  }
  const fallback = COUPON_POOL[COUPON_POOL.length - 1];
  return {
    code: fallback.code,
    discount: fallback.discount,
    targetKey: fallback.targetKey,
  };
}

function generateLottery(): LotteryState {
  return {
    winningIndex: Math.floor(Math.random() * TOTAL_CARDS),
    coupon: pickWeightedCoupon(),
    brokenIndices: [],
  };
}

function buildWhatsAppHref(messageTemplate: string, coupon: LotteryState['coupon'], target: string) {
  const message = messageTemplate
    .replace('{code}', coupon.code)
    .replace('{discount}', coupon.discount)
    .replace('{target}', target);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

const ServicesSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const [lottery, setLottery] = useState<LotteryState | null>(null);
  /** Mirrors lottery.brokenIndices for synchronous reads inside callbacks */
  const lotteryRef = useRef<LotteryState | null>(null);
  /** Set after the first localStorage read so initiallyBroken is correct on mount */
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setHydrated(true);
      return;
    }
    let initial: LotteryState;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<LotteryState>;
        if (
          typeof parsed.winningIndex === 'number' &&
          parsed.coupon &&
          typeof parsed.coupon.code === 'string' &&
          Array.isArray(parsed.brokenIndices)
        ) {
          initial = {
            winningIndex: parsed.winningIndex,
            coupon: parsed.coupon as LotteryState['coupon'],
            brokenIndices: parsed.brokenIndices.filter(
              (i): i is number => typeof i === 'number'
            ),
          };
          lotteryRef.current = initial;
          setLottery(initial);
          setHydrated(true);
          return;
        }
      }
    } catch {
      /* ignore corrupted storage */
    }
    initial = generateLottery();
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    } catch {
      /* storage unavailable — still serve in-memory */
    }
    lotteryRef.current = initial;
    setLottery(initial);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') return;
    const alreadyShown = window.sessionStorage.getItem(PRODUCT_TOAST_SESSION_KEY);
    if (alreadyShown) return;

    toast({
      title: t('services.productToastTitle'),
      description: (
        <a
          href="https://law-front1.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 font-medium"
        >
          {t('services.productToastDescription')}
        </a>
      ),
    });

    window.sessionStorage.setItem(PRODUCT_TOAST_SESSION_KEY, '1');
  }, [hydrated, t, toast]);

  const markBroken = useCallback((index: number) => {
    const current = lotteryRef.current;
    if (!current) return;
    if (current.brokenIndices.includes(index)) return;
    const next: LotteryState = {
      ...current,
      brokenIndices: [...current.brokenIndices, index],
    };
    lotteryRef.current = next;
    setLottery(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const services = useMemo(
    () => [
      { titleKey: 'services.web.title', descriptionKey: 'services.web.description', price: 'от 60 000 ₸' },
      { titleKey: 'services.mobile.title', descriptionKey: 'services.mobile.description', price: 'от 1 000 000 ₸' },
      { titleKey: 'services.ads.title', descriptionKey: 'services.ads.description', price: 'от 100 000 ₸/мес' },
      { titleKey: 'services.chatbot.title', descriptionKey: 'services.chatbot.description', price: 'от 60 000 ₸' },
      { titleKey: 'services.rag.title', descriptionKey: 'services.rag.description', price: 'от 70 000 ₸' },
      { titleKey: 'services.ml.title', descriptionKey: 'services.ml.description', price: 'от 900 000 ₸' },
      { titleKey: 'services.cv.title', descriptionKey: 'services.cv.description', price: 'от 1 050 000 ₸' },
    ],
    []
  );

  return (
    <section id="services" className="pb-24 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ opacity: 0 }}
          className="text-center mb-8 md:mb-16 transform-gpu"
        >
          <h2 className="hidden md:block text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t('services.title')}{' '}
            <span className="gradient-text">{t('services.titleHighlight')}</span>
          </h2>
          <p className="hidden md:block text-muted-foreground max-w-2xl mx-auto">
            {t('services.description')}
          </p>
          <p className="mt-4 text-xl md:text-2xl font-mono uppercase tracking-widest text-muted-foreground/70">
            {t('services.shatterHint')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const isWinner = lottery?.winningIndex === index;
            const isAlreadyBroken = hydrated && !!lottery?.brokenIndices.includes(index);

            const reveal =
              isWinner && lottery ? (
                <CouponReveal
                  code={lottery.coupon.code}
                  discount={lottery.coupon.discount}
                  target={t(lottery.coupon.targetKey)}
                  congratsLabel={t('services.coupon.congrats')}
                  discountLabel={t('services.coupon.discountLabel')}
                  codeLabel={t('services.coupon.codeLabel')}
                  ctaLabel={t('services.coupon.cta')}
                  href={buildWhatsAppHref(
                    t('services.coupon.waMessage'),
                    lottery.coupon,
                    t(lottery.coupon.targetKey)
                  )}
                />
              ) : (
                <EmptyReveal
                  title={t('services.coupon.emptyTitle')}
                  subtitle={t('services.coupon.emptySubtitle')}
                />
              );

            return (
              <motion.div
                key={service.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                style={{ opacity: 0 }}
                className="h-64 md:h-72 transform-gpu"
              >
                {hydrated ? (
                  <BreakableCard
                    title={t(service.titleKey)}
                    description={t(service.descriptionKey)}
                    price={service.price}
                    disableRespawn
                    initiallyBroken={isAlreadyBroken}
                    revealContent={reveal}
                    onBreak={() => markBroken(index)}
                  />
                ) : (
                  <div className="absolute inset-0" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ---------- Reveal sub-components (rendered behind the breakable card) ---------- */

const EmptyReveal = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="absolute inset-0 bg-zinc-900 border-4 border-dashed border-zinc-700 flex flex-col items-center justify-center text-center px-4">
    <span className="text-zinc-300 font-black text-2xl md:text-3xl uppercase tracking-widest mb-2">
      {title}
    </span>
    <span className="text-zinc-500 text-xs md:text-sm font-mono uppercase tracking-wider">
      {subtitle}
    </span>
  </div>
);

const CouponReveal = ({
  code,
  discount,
  target,
  congratsLabel,
  discountLabel,
  codeLabel,
  ctaLabel,
  href,
}: {
  code: string;
  discount: string;
  target: string;
  congratsLabel: string;
  discountLabel: string;
  codeLabel: string;
  ctaLabel: string;
  href: string;
}) => (
  <div
    className="absolute inset-0 border-4 border-black p-4 md:p-5 flex flex-col justify-between text-black overflow-hidden shadow-neo"
    style={{
      backgroundImage:
        'linear-gradient(135deg, #fff8d6 0%, #ffe69a 45%, #f5c14a 100%)',
    }}
  >
    {/* Decorative ticket-style notches */}
    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background border-4 border-black" />
    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background border-4 border-black" />

    <div className="flex justify-between items-start gap-2">
      <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest font-bold">
        {congratsLabel}
      </span>
      <span className="inline-block w-2.5 h-2.5 rounded-full bg-black" />
    </div>

    <div className="text-center -mt-1">
      <div className="font-black text-4xl md:text-5xl lg:text-6xl leading-none tracking-tighter">
        {discount}
      </div>
      <div className="text-[11px] md:text-sm font-bold uppercase tracking-tight mt-1">
        {discountLabel} {target}
      </div>
    </div>

    <div className="flex items-center justify-between gap-2 border-t-2 border-dashed border-black/60 pt-2">
      <div className="min-w-0">
        <div className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest opacity-70 leading-none">
          {codeLabel}
        </div>
        <div className="font-mono font-black text-base md:text-lg tracking-widest leading-tight">
          №{code}
        </div>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 inline-flex items-center justify-center bg-black text-white font-black uppercase text-[10px] md:text-xs tracking-widest px-3 py-2 md:px-4 md:py-2.5 hover:bg-zinc-800 active:translate-y-px transition-colors"
      >
        {ctaLabel}
      </a>
    </div>
  </div>
);

export default ServicesSection;
