import { useRef, useEffect, useState } from "react";
import { Header } from "@/lawAi/components/chat/Header";
import { ChatMessage } from "@/lawAi/components/chat/ChatMessage";
import { ChatInput } from "@/lawAi/components/chat/ChatInput";
import { TypingIndicator } from "@/lawAi/components/chat/TypingIndicator";
import { useChatHistory } from "@/lawAi/hooks/useChatHistory";
import { sendMessage } from "@/lawAi/lib/mockApi";
import { ChatEmptyState } from "@/lawAi/components/chat/ChatEmptyState";

export default function ChatPage() {
  const { messages, addMessage, clearHistory } = useChatHistory();
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (text: string) => {
    addMessage({ role: "user", content: text });
    setLoading(true);
    try {
      const res = await sendMessage(text);
      addMessage({
        role: "ai",
        content: res.answer,
        law: res.law,
        article: res.article,
        sources: res.sources,
        needs_clarification: res.needs_clarification,
      });
    } catch {
      addMessage({ role: "ai", content: "Произошла ошибка. Попробуйте ещё раз." });
    } finally {
      setLoading(false);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="relative flex min-h-dvh h-dvh max-h-dvh flex-col overflow-hidden bg-background bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,hsl(var(--primary)/0.18),transparent_55%)] dark:bg-[radial-gradient(ellipse_100%_60%_at_50%_0%,hsl(var(--primary)/0.12),transparent_50%)]">
      {/* subtle mesh for depth */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.2]"
        style={{
          backgroundImage: `
            radial-gradient(at 90% 10%, hsl(var(--primary)/0.07) 0px, transparent 50%),
            radial-gradient(at 10% 80%, hsl(var(--primary)/0.05) 0px, transparent 45%)
          `,
        }}
        aria-hidden
      />

      <Header onClearHistory={messages.length > 0 ? clearHistory : undefined} />

      <div
        ref={scrollRef}
        className="chat-scroll relative flex-1 overflow-y-auto scroll-smooth"
      >
        {isEmpty ? (
          <ChatEmptyState />
        ) : (
          <div className="mx-auto w-full max-w-3xl px-3 pb-6 pt-2 sm:px-4">
            <div className="space-y-1 sm:space-y-0">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
            </div>
            {loading && <TypingIndicator />}
          </div>
        )}
      </div>

      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}
