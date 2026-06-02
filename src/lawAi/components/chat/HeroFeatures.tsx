"use client";

import { motion } from "framer-motion";
import { Scale, MessageCircle, Lock, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const features: {
  icon: LucideIcon;
  title: string;
  desc: string;
  accent: string;
}[] = [
  {
    icon: Scale,
    title: "Законы РК",
    desc: "Ответы на основе актуального законодательства Казахстана",
    accent: "from-primary/20 via-primary/5 to-transparent",
  },
  {
    icon: MessageCircle,
    title: "Точные ссылки",
    desc: "Несколько фрагментов закона и отбор самого релевантного для ответа",
    accent: "from-sky-500/15 via-primary/5 to-transparent",
  },
  {
    icon: Lock,
    title: "Конфиденциальность",
    desc: "Вопросы и ответы нигде не сохраняются — бот не помнит историю чата",
    accent: "from-violet-500/15 via-primary/5 to-transparent",
  },
];

export function HeroFeatures() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 1.15 }}
      className="w-full max-w-4xl pt-6 sm:pt-10"
    >
      <div className="mb-4 flex items-center justify-center gap-2 text-muted-foreground sm:mb-6">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-xs font-medium uppercase tracking-widest sm:text-sm">
          Почему этот ассистент
        </span>
        <Sparkles className="h-4 w-4 text-primary" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {features.map((feature, index) => (
          <motion.article
            key={feature.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.25 + index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-4 text-left backdrop-blur-md transition-all duration-300 hover:border-primary/30 hover:bg-card/70 hover:shadow-[0_20px_40px_-24px_hsl(var(--primary)/0.45)] sm:p-5"
          >
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-80 transition-opacity group-hover:opacity-100`}
            />
            <div className="relative z-10">
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 shadow-inner transition-transform duration-300 group-hover:scale-105">
                <feature.icon className="h-5 w-5 text-primary" strokeWidth={2} />
              </div>
              <h3 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {feature.desc}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}
