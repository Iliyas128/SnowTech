import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 128) + "px";
    }
  }, [value]);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="safe-pb shrink-0 border-t border-border/80 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 dark:border-border/60">
      <div className="safe-px mx-auto grid max-w-3xl grid-cols-[minmax(0,1fr)_auto] items-end gap-2 pb-3 pt-3 sm:gap-2.5 sm:pb-4 sm:pt-4">
        <label className="sr-only" htmlFor="chat-message-input">
          Сообщение
        </label>
        <textarea
          id="chat-message-input"
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Задай вопрос…"
          rows={1}
          enterKeyHint="send"
          inputMode="text"
          className="chat-message-input min-h-[3rem] min-w-0 w-full resize-none rounded-2xl border border-input bg-card/90 px-3.5 py-3 text-[16px] leading-snug text-foreground shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 touch-manipulation sm:min-h-[2.75rem] sm:px-4"
        />
        <Button
          type="button"
          size="icon"
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className="h-11 w-11 shrink-0 rounded-2xl shadow-md shadow-primary/20 transition-transform active:scale-95 sm:h-11 sm:w-11 sm:rounded-xl"
          aria-label="Отправить"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
