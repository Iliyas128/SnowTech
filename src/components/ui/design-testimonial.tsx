"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export type TestimonialItem = {
  quote: string;
  author: string;
  role?: string;
  company: string;
};

interface TestimonialProps {
  items: TestimonialItem[];
  label?: string;
  autoPlayMs?: number;
  className?: string;
}

export function Testimonial({
  items,
  label = "Testimonials",
  autoPlayMs = 6000,
  className = "",
}: TestimonialProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const numberX = useTransform(x, [-200, 200], [-20, 20]);
  const numberY = useTransform(y, [-200, 200], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    }
  };

  const total = items.length;
  const goNext = () => setActiveIndex((prev) => (prev + 1) % total);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    if (total <= 1 || !autoPlayMs) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, autoPlayMs);
    return () => clearInterval(timer);
  }, [total, autoPlayMs]);

  if (total === 0) return null;

  const current = items[activeIndex];

  return (
    <div className={`flex items-center justify-center w-full overflow-hidden ${className}`}>
      <div
        ref={containerRef}
        className="relative w-full max-w-7xl 2xl:max-w-[1440px] [@media(min-width:1920px)]:max-w-[1600px] md:min-h-[38rem] lg:min-h-[40rem] 2xl:min-h-[44rem] [@media(min-width:1920px)]:min-h-[48rem] md:flex md:items-center transform-gpu"
        onMouseMove={handleMouseMove}
      >
        {/* Oversized index number */}
        <motion.div
          className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 text-[10rem] sm:text-[16rem] md:text-[16rem] lg:text-[22rem] 2xl:text-[26rem] [@media(min-width:1920px)]:text-[30rem] font-bold text-foreground/[0.04] select-none pointer-events-none leading-none tracking-tighter transform-gpu will-change-transform"
          style={{ x: numberX, y: numberY }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Main content */}
        <div className="relative flex flex-col md:flex-row">
          {/* Left column - vertical text (hidden on mobile) */}
          <div className="hidden md:flex flex-col items-center justify-center pr-12 lg:pr-16 border-r border-border">
            <motion.span
              className="text-xs font-mono text-muted-foreground tracking-widest uppercase"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {label}
            </motion.span>

            <div className="relative h-32 w-px bg-border mt-8">
              <motion.div
                className="absolute top-0 left-0 w-full bg-foreground origin-top"
                animate={{
                  height: `${((activeIndex + 1) / total) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* Mobile label row */}
          <div className="md:hidden flex items-center justify-between mb-6">
            <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
              {label}
            </span>
            <div className="relative h-px w-24 bg-border">
              <motion.div
                className="absolute top-0 left-0 h-full bg-foreground origin-left"
                animate={{ width: `${((activeIndex + 1) / total) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* Center - main content */}
          <div className="flex-1 md:pl-12 lg:pl-16 py-6 md:py-12 relative">
            {/* Company badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="mb-6 md:mb-8"
              >
                <span className="inline-flex items-center gap-2 text-[11px] md:text-xs font-mono text-muted-foreground border border-border rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {current.company}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Quote with character reveal */}
            <div className="relative mb-8 md:mb-12 min-h-[140px] md:min-h-[180px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={activeIndex}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-[3.5rem] [@media(min-width:1920px)]:text-[4rem] font-light text-foreground leading-[1.15] tracking-tight transform-gpu"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {current.quote.split(" ").map((word, i) => (
                    <motion.span
                      key={`${activeIndex}-${i}`}
                      className="inline-block mr-[0.3em]"
                      variants={{
                        hidden: { opacity: 0, y: 20, rotateX: 90 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          transition: {
                            duration: 0.5,
                            delay: i * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: -10,
                          transition: { duration: 0.2, delay: i * 0.02 },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Author row */}
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    className="w-8 h-px bg-foreground"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ originX: 0 }}
                  />
                  <div>
                    <p className="text-base font-medium text-foreground">
                      {current.author}
                    </p>
                    {current.role ? (
                      <p className="text-sm text-muted-foreground">
                        {current.role}
                      </p>
                    ) : null}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center gap-3 md:gap-4">
                <motion.button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous"
                  className="group relative w-11 h-11 md:w-12 md:h-12 rounded-full border border-border flex items-center justify-center overflow-hidden"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-foreground"
                    initial={{ x: "-100%" }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="relative z-10 text-foreground group-hover:text-foreground/30 transition-colors"
                  >
                    <path
                      d="M10 12L6 8L10 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={goNext}
                  aria-label="Next"
                  className="group relative w-11 h-11 md:w-12 md:h-12 rounded-full border border-border flex items-center justify-center overflow-hidden"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-foreground"
                    initial={{ x: "100%" }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="relative z-10 text-foreground group-hover:text-foreground/30 transition-colors"
                  >
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom ticker */}
        <div className="absolute -bottom-16 md:-bottom-20 left-0 right-0 overflow-hidden opacity-[0.08] pointer-events-none">
          <motion.div
            className="flex whitespace-nowrap text-4xl md:text-6xl font-bold tracking-tight transform-gpu will-change-transform"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="mx-8">
                {items.map((t) => t.company).join(" • ")} •
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
