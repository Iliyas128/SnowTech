import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MessageSquare, Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCommentThreads } from "@/lawAi/hooks/useCommentThreads";

function formatTime(iso: string) {
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true, locale: ru });
  } catch {
    return "";
  }
}

export default function CommentsPage() {
  const navigate = useNavigate();
  const { threads, ready, addThread, addReply } = useCommentThreads();
  const [newThread, setNewThread] = useState("");
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

  const handleNewThread = () => {
    const trimmed = newThread.trim();
    if (!trimmed) {
      toast.error("Напишите комментарий");
      return;
    }
    addThread(trimmed);
    setNewThread("");
    toast.success("Комментарий опубликован");
  };

  const handleReply = (threadId: string) => {
    const trimmed = (replyDrafts[threadId] ?? "").trim();
    if (!trimmed) {
      toast.error("Напишите ответ");
      return;
    }
    addReply(threadId, trimmed);
    setReplyDrafts((prev) => ({ ...prev, [threadId]: "" }));
    toast.success("Ответ добавлен");
  };

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="safe-pt sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-xl">
        <div className="safe-px mx-auto flex max-w-3xl items-center gap-2 py-3 sm:py-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 shrink-0 rounded-xl"
            onClick={() => navigate(-1)}
            aria-label="Назад"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-semibold sm:text-xl">Комментарии</h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Вопросы, непонятки и замечания по работе бота
            </p>
          </div>
          <MessageSquare className="hidden h-5 w-5 shrink-0 text-primary sm:block" />
        </div>
      </header>

      <main className="safe-px mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-5 sm:py-6">
        <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
          <h2 className="text-sm font-semibold text-foreground sm:text-base">Новый комментарий</h2>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Опишите проблему, вопрос или некорректный ответ бота
          </p>
          <Textarea
            value={newThread}
            onChange={(e) => setNewThread(e.target.value)}
            placeholder="Ваш комментарий…"
            rows={4}
            className="mt-3 min-h-[100px] resize-none text-[16px] sm:text-sm"
          />
          <Button type="button" className="mt-3 w-full sm:ml-auto sm:w-auto" onClick={handleNewThread}>
            Опубликовать
          </Button>
        </section>

        <section className="space-y-4 pb-8">
          <h2 className="text-sm font-semibold text-muted-foreground">
            Все обсуждения {ready ? `(${threads.length})` : ""}
          </h2>

          {!ready ? (
            <p className="text-sm text-muted-foreground">Загрузка…</p>
          ) : threads.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-4 py-10 text-center">
              <p className="text-sm text-muted-foreground">Пока нет комментариев. Будьте первым.</p>
            </div>
          ) : (
            threads.map((thread) => (
              <article
                key={thread.id}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
              >
                <div className="border-b border-border/60 bg-muted/20 px-4 py-4 sm:px-5">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground sm:text-base">
                    {thread.text}
                  </p>
                  <time className="mt-2 block text-xs text-muted-foreground">
                    {formatTime(thread.createdAt)}
                  </time>
                </div>

                {thread.replies.length > 0 ? (
                  <ul className="divide-y divide-border/60">
                    {thread.replies.map((reply) => (
                      <li key={reply.id} className="bg-background/50 px-4 py-3 pl-6 sm:px-5 sm:pl-8">
                        <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
                          Ответ
                        </div>
                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                          {reply.text}
                        </p>
                        <time className="mt-1.5 block text-xs text-muted-foreground">
                          {formatTime(reply.createdAt)}
                        </time>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="border-t border-border/60 bg-muted/10 p-3 sm:p-4">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-2">
                    <Textarea
                      value={replyDrafts[thread.id] ?? ""}
                      onChange={(e) =>
                        setReplyDrafts((prev) => ({ ...prev, [thread.id]: e.target.value }))
                      }
                      placeholder="Ответить в треде…"
                      rows={2}
                      className="min-h-[2.75rem] min-w-0 resize-none text-[16px] sm:min-h-[60px] sm:text-sm"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleReply(thread.id);
                        }
                      }}
                    />
                    <Button
                      type="button"
                      size="icon"
                      className="h-11 w-11 shrink-0 rounded-xl"
                      onClick={() => handleReply(thread.id)}
                      aria-label="Отправить ответ"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>
      </main>
    </div>
  );
}
