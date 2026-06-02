"use client";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import { LAW_AI_CHAT_PATH, LAW_AI_COMMENTS_PATH } from "@/lib/lawAi";

export function HeroActions() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="flex w-full max-w-md flex-col items-stretch justify-center gap-3 pt-2 sm:max-w-none sm:flex-row sm:items-center sm:gap-4 sm:pt-4"
    >
      <motion.button
        type="button"
        whileHover={{
          scale: 1.03,
          boxShadow: "0 20px 40px rgba(0,0,0,0.2), 0 0 25px hsl(var(--primary) / 0.3)",
          y: -2,
        }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate(LAW_AI_CHAT_PATH)}
        className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-r from-primary via-primary to-primary/90 px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-xl transition-all duration-500 hover:shadow-primary/30 sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="relative z-10 tracking-wide">Начать чат</span>
        <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      </motion.button>

      <motion.button
        type="button"
        whileHover={{
          scale: 1.03,
          backgroundColor: "hsl(var(--accent))",
          borderColor: "hsl(var(--primary))",
          boxShadow: "0 15px 30px rgba(0,0,0,0.1), 0 0 15px hsl(var(--primary) / 0.1)",
          y: -2,
        }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate(LAW_AI_COMMENTS_PATH)}
        className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl border-2 border-border/40 bg-background/60 px-6 py-3.5 text-base font-semibold shadow-lg backdrop-blur-xl transition-all duration-500 hover:border-primary/40 hover:bg-background/90 sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <MessageSquare className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
        <span className="relative z-10 tracking-wide">Комментарий</span>
      </motion.button>
    </motion.div>
  );
}
