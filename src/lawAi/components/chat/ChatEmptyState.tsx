import { TRAINING_SOURCES } from "@/lawAi/lib/trainingSources";

export function ChatEmptyState() {
  return (
    <div className="safe-px mx-auto flex min-h-[min(420px,calc(100dvh-11rem))] w-full max-w-3xl flex-col justify-center px-4 pb-8 pt-6 sm:min-h-0 sm:pt-10">
      <div className="text-center">
        <div className="relative inline-flex items-center gap-3 rounded-full border border-primary/30 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 px-5 py-2.5 backdrop-blur-xl shadow-lg">
          <div className="h-2 w-2 shrink-0 rounded-full bg-primary animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-primary sm:text-sm">
            Законы Казахстана
          </span>
          <div className="h-2 w-2 shrink-0 rounded-full bg-primary animate-ping [animation-delay:500ms]" />
        </div>

        <h2 className="mt-6 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Чем могу помочь?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          Бот обучен на основе{" "}
          <span className="font-medium text-foreground/90">
            {TRAINING_SOURCES.map((source, i) => (
              <span key={source}>
                {i > 0 ? (i === TRAINING_SOURCES.length - 1 ? " и " : ", ") : ""}
                «{source}»
              </span>
            ))}
          </span>
        </p>

        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground/80">
          Напишите вопрос в поле внизу — ответ появится здесь.
        </p>
      </div>
    </div>
  );
}
