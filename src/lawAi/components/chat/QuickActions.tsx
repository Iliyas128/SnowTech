import { Car, FileText, Search, Building2, Wine } from "lucide-react";

const actions = [
  { label: "ДПС", fullLabel: "Меня остановили ДПС", message: "Меня остановили сотрудники ДПС. Какие у меня права?", icon: Car },
  {
    label: "Документы",
    fullLabel: "Требуют документы",
    message: "Полицейский требует показать документы. Обязан ли я?",
    icon: FileText,
  },
  {
    label: "Досмотр",
    fullLabel: "Хотят досмотр",
    message: "Сотрудник полиции хочет провести досмотр моего автомобиля. Что делать?",
    icon: Search,
  },
  {
    label: "РУВД",
    fullLabel: "Зовут в РУВД",
    message: "Меня хотят забрать в отделение полиции. Какие у меня права?",
    icon: Building2,
  },
  {
    label: "Алкоголь",
    fullLabel: "Подозрение на алкоголь",
    message: "Меня подозревают в вождении в нетрезвом виде. Что делать?",
    icon: Wine,
  },
];

interface QuickActionsProps {
  onSelect: (message: string) => void;
  disabled?: boolean;
  variant?: "inline" | "landing";
}

export function QuickActions({ onSelect, disabled, variant = "inline" }: QuickActionsProps) {
  const isLanding = variant === "landing";

  return (
    <div className={isLanding ? "" : "-mx-1"}>
      <div
        className={
          isLanding
            ? "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center"
            : `flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none]
               sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden`
        }
        style={isLanding ? undefined : { WebkitOverflowScrolling: "touch" }}
      >
        {actions.map((action) => (
          <button
            key={action.fullLabel}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(action.message)}
            className={
              isLanding
                ? `group flex w-full items-center gap-4 rounded-2xl border border-border/90 bg-card/90 px-4 py-3.5 text-left
                   shadow-sm ring-1 ring-black/[0.03] transition-all active:scale-[0.99]
                   hover:border-primary/25 hover:bg-card hover:shadow-md hover:ring-primary/10
                   disabled:cursor-not-allowed disabled:opacity-50 dark:ring-white/[0.06] sm:w-[min(100%,240px)] sm:flex-col sm:items-start sm:py-4`
                : `flex shrink-0 snap-start items-center gap-2 rounded-2xl border border-border/80 bg-card/90 px-3.5 py-2.5
                   text-sm font-medium text-foreground shadow-sm ring-1 ring-black/[0.02] transition-all
                   active:scale-[0.98] hover:border-primary/30 hover:bg-card hover:shadow
                   disabled:cursor-not-allowed disabled:opacity-50 dark:ring-white/[0.05] sm:px-3 sm:py-2`
            }
          >
            <span
              className={
                isLanding
                  ? "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary transition-colors group-hover:bg-primary/18 dark:bg-primary/20"
                  : "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary sm:h-8 sm:w-8"
              }
            >
              <action.icon className={isLanding ? "h-5 w-5" : "h-4 w-4"} strokeWidth={2} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold leading-snug sm:hidden">{action.label}</span>
              <span className="hidden leading-snug sm:block">{action.fullLabel}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
