import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-2.5 px-1 py-2 sm:gap-3 sm:px-2">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-muted/90 shadow-sm ring-1 ring-black/[0.04] dark:bg-muted/50 dark:ring-white/[0.08] sm:h-8 sm:w-8 sm:rounded-xl">
        <Bot className="h-4 w-4 text-foreground sm:h-3.5 sm:w-3.5" strokeWidth={2} />
      </div>
      <div
        className="inline-flex items-center gap-1.5 rounded-[1.15rem] rounded-tl-md border border-border/70 bg-card/95 px-4 py-3 shadow-[0_4px_20px_-6px_hsl(0_0%_0%/0.12)] ring-1 ring-black/[0.03]
          dark:border-border/50 dark:bg-card/90 dark:shadow-[0_8px_28px_-10px_hsl(0_0%_0%/0.45)] dark:ring-white/[0.05]"
      >
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary/70 [animation-delay:0ms] dark:bg-primary/80" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary/60 [animation-delay:150ms] dark:bg-primary/70" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary/50 [animation-delay:300ms] dark:bg-primary/60" />
      </div>
    </div>
  );
}
