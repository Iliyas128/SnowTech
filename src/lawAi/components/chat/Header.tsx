import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, Shield, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LAW_AI_BASE_PATH } from "@/lib/lawAi";

interface HeaderProps {
  onClearHistory?: () => void;
}

export function Header({ onClearHistory }: HeaderProps) {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState<"RU" | "KZ">("RU");

  useEffect(() => {
    const root = document.querySelector(".law-ai-root");
    root?.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="safe-pt sticky top-0 z-50 border-b border-border/80 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 dark:border-border/60 dark:bg-background/70">
      <div className="safe-px mx-auto flex min-h-[3.25rem] max-w-3xl items-center justify-between gap-2 py-2 sm:h-14 sm:py-0">
        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="-ml-1 h-11 w-11 shrink-0 rounded-xl sm:h-9 sm:w-9"
            onClick={() => navigate(LAW_AI_BASE_PATH)}
            title="К разделу ассистента"
          >
            <ArrowLeft className="h-5 w-5 sm:h-4 sm:w-4" />
          </Button>
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/15 dark:bg-primary/20">
              <Shield className="h-5 w-5 text-primary" strokeWidth={2} />
            </div>
            <div className="min-w-0 text-left leading-tight">
              <span className="truncate text-base font-semibold tracking-tight text-foreground sm:text-lg">
                Знай свои права
              </span>
              <p className="hidden text-[11px] text-muted-foreground sm:block sm:text-xs">Юридический ассистент</p>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          {onClearHistory && (
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 rounded-xl sm:h-9 sm:w-9"
              onClick={onClearHistory}
              title="Очистить чат"
            >
              <Trash2 className="h-5 w-5 sm:h-4 sm:w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-11 min-w-[2.75rem] rounded-xl px-3 text-xs font-semibold tracking-wide sm:h-9"
            onClick={() => setLang(lang === "RU" ? "KZ" : "RU")}
          >
            {lang}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 rounded-xl sm:h-9 sm:w-9"
            onClick={() => setDark(!dark)}
          >
            {dark ? <Sun className="h-5 w-5 sm:h-4 sm:w-4" /> : <Moon className="h-5 w-5 sm:h-4 sm:w-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
