import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Scale, User, Bot } from "lucide-react";
import type { Message } from "@/lawAi/hooks/useChatHistory";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const [open, setOpen] = useState(false);
  const sources = message.sources?.filter((s) => s.text && s.text.trim().length > 0) ?? [];

  return (
    <div
      className={`group flex gap-2.5 px-1 py-2.5 sm:gap-3 sm:px-2 sm:py-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08] sm:h-8 sm:w-8 sm:rounded-xl ${
          isUser
            ? "bg-gradient-to-br from-primary to-primary/85 text-primary-foreground"
            : "bg-muted/90 text-foreground dark:bg-muted/50"
        }`}
      >
        {isUser ? <User className="h-4 w-4 sm:h-3.5 sm:w-3.5" strokeWidth={2} /> : <Bot className="h-4 w-4 sm:h-3.5 sm:w-3.5" strokeWidth={2} />}
      </div>

      <div
        className={`min-w-0 max-w-[min(100%,22rem)] space-y-2 sm:max-w-[min(85%,32rem)] ${isUser ? "items-end text-right" : "items-start text-left"} flex flex-col`}
      >
        <div
          className={`inline-block text-left text-[15px] leading-[1.55] tracking-[-0.01em] sm:text-sm sm:leading-relaxed ${
            isUser
              ? `rounded-[1.15rem] rounded-tr-md bg-gradient-to-br from-primary to-primary/90 px-4 py-3 text-primary-foreground
                 shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.55)] ring-1 ring-primary/20`
              : `rounded-[1.15rem] rounded-tl-md border border-border/70 bg-card/95 px-4 py-3 text-card-foreground shadow-[0_4px_20px_-6px_hsl(0_0%_0%/0.12)]
                 ring-1 ring-black/[0.03] backdrop-blur-sm dark:border-border/50 dark:bg-card/90 dark:shadow-[0_8px_28px_-10px_hsl(0_0%_0%/0.45)]
                 dark:ring-white/[0.05]`
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            <div className="prose prose-neutral max-w-none dark:prose-invert prose-p:my-2 prose-headings:my-3 prose-li:my-0.5 prose-ul:my-2 prose-ol:my-2 prose-sm sm:prose-sm">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>

        {!isUser && message.law && message.law !== "—" && (
          <div className="inline-block max-w-full rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.07] to-transparent px-3.5 py-2.5 text-left backdrop-blur-sm dark:from-primary/10">
            <div className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary sm:text-xs sm:normal-case sm:tracking-normal">
              <Scale className="h-3.5 w-3.5 shrink-0" />
              Основание закона
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
              <span className="font-medium text-foreground">{message.law}</span>
              {message.article && <>, ст. {message.article}</>}
            </p>
          </div>
        )}

        {!isUser && sources.length > 0 && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                size="sm"
                className="h-auto min-h-10 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 sm:min-h-9 sm:text-sm"
              >
                Тексты источников ({sources.length})
              </Button>
            </DialogTrigger>
            <DialogContent className="!flex max-h-[min(92dvh,900px)] min-h-0 w-[calc(100vw-1rem)] max-w-[min(calc(100vw-2rem),42rem)] flex-col gap-0 overflow-hidden rounded-2xl p-0 sm:max-h-[85vh] sm:max-w-2xl">
              <DialogHeader className="shrink-0 space-y-2 px-5 pb-3 pr-12 pt-5 text-left sm:px-6 sm:pb-4 sm:pt-6">
                <DialogTitle className="text-left text-lg leading-snug">Фрагменты норм, использованные в ответе</DialogTitle>
                <p className="text-sm font-normal leading-relaxed text-muted-foreground">
                  Прокрутите список, чтобы прочитать полный текст каждого фрагмента.
                </p>
              </DialogHeader>
              <div
                className="chat-scroll min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-y-contain px-5 pb-[max(1rem,env(safe-area-inset-bottom,0px))] sm:px-6 sm:pb-6 [-webkit-overflow-scrolling:touch]"
              >
                <div className="space-y-4 pb-1 sm:space-y-6">
                  {sources.map((s, i) => (
                    <article
                      key={`${s.law}-${s.article}-${i}`}
                      className="rounded-xl border border-border bg-muted/25 p-4 text-left dark:bg-muted/15"
                    >
                      <h3 className="mb-2 text-sm font-semibold leading-snug text-foreground">
                        {s.law}
                        {s.article ? <span className="text-muted-foreground">, ст. {s.article}</span> : null}
                        <span className="ml-2 text-xs font-normal text-muted-foreground">({s.lang})</span>
                      </h3>
                      <pre className="whitespace-pre-wrap break-words font-sans text-[13px] leading-relaxed text-foreground sm:text-xs">
                        {s.text}
                      </pre>
                    </article>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
