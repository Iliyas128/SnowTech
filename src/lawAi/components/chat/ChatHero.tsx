"use client";

import { motion } from "framer-motion";
import { DotGlobeHero } from "@/lawAi/components/ui/globe-hero";
import { HeroActions } from "@/lawAi/components/chat/HeroActions";
import { HeroFeatures } from "@/lawAi/components/chat/HeroFeatures";
import type { ReactNode } from "react";

interface ChatHeroProps {
  compact?: boolean;
  children?: ReactNode;
  showActions?: boolean;
}

export function ChatHero({ compact = false, children, showActions = false }: ChatHeroProps) {
  return (
    <DotGlobeHero
      rotationSpeed={0.004}
        className={
        compact
          ? "!min-h-0 h-auto bg-gradient-to-br from-background via-background/95 to-muted/10"
          : "bg-gradient-to-br from-background via-background/95 to-muted/10"
      }
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-background/30" />
      <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl animate-pulse max-sm:h-48 max-sm:w-48" />
      <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-primary/5 blur-3xl animate-pulse max-sm:h-32 max-sm:w-32" />

      <div
        className={`relative z-10 mx-auto w-full max-w-5xl space-y-8 px-4 text-center ${
          compact ? "py-8 sm:py-10" : "px-6 py-12"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative inline-flex items-center gap-3 rounded-full border border-primary/30 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 px-5 py-2.5 backdrop-blur-xl shadow-2xl sm:gap-3 sm:px-6 sm:py-3"
          >
            <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
            <div className="relative z-10 h-2 w-2 shrink-0 rounded-full bg-primary animate-ping" />
            <span className="relative z-10 text-xs font-bold uppercase tracking-wider text-primary sm:text-sm">
              Законы Казахстана
            </span>
            <div className="relative z-10 h-2 w-2 shrink-0 rounded-full bg-primary animate-ping [animation-delay:500ms]" />
          </motion.div>

          <div className="space-y-4 sm:space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="select-none text-4xl font-black leading-[0.9] tracking-tighter sm:text-6xl md:text-7xl"
            >
              <span className="mb-2 block text-2xl font-light text-foreground/70 sm:mb-3 sm:text-4xl md:text-5xl">
                Знай
              </span>
              <span className="relative block">
                <span className="relative z-10 bg-gradient-to-br from-primary via-primary to-primary/60 bg-clip-text font-black text-transparent">
                  свои права
                </span>
                <span
                  className="absolute inset-0 scale-105 bg-gradient-to-br from-primary via-primary to-primary/60 bg-clip-text font-black text-transparent opacity-50 blur-2xl"
                  aria-hidden
                >
                  свои права
                </span>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                  className="absolute -bottom-3 left-0 h-2 rounded-full bg-gradient-to-r from-primary via-primary/80 to-transparent shadow-lg shadow-primary/50 sm:-bottom-6 sm:h-3"
                />
              </span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mx-auto max-w-2xl space-y-3"
          >
            <p className="text-base font-medium leading-relaxed text-muted-foreground sm:text-xl">
              AI-помощник для{" "}
              <span className="rounded-md bg-gradient-to-r from-primary/20 to-primary/10 px-2 py-1 font-semibold text-foreground">
                взаимодействия с законами РК
              </span>
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground/80 sm:text-lg">
              Задайте вопрос в чате — ответы на основе актуального законодательства Республики Казахстан.
            </p>
          </motion.div>
        </motion.div>

        {showActions ? (
          <div className="flex w-full flex-col items-center">
            <HeroActions />
            <HeroFeatures />
          </div>
        ) : null}

        {children ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: showActions ? 1.1 : 1 }}
            className="w-full"
          >
            {children}
          </motion.div>
        ) : null}
      </div>
    </DotGlobeHero>
  );
}
