import { useState } from "react";
import type { SourceDetail } from "@/lawAi/lib/mockApi";

export interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  law?: string;
  article?: string;
  sources?: SourceDetail[];
  needs_clarification?: boolean;
  timestamp: number;
}

export function useChatHistory(_scope = "default") {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (msg: Omit<Message, "id" | "timestamp">) => {
    const newMsg: Message = {
      ...msg,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMsg]);
    return newMsg;
  };

  const clearHistory = () => setMessages([]);

  return { messages, addMessage, clearHistory };
}
