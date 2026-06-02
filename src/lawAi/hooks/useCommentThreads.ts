import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "law-assistant-comment-threads";

export interface ThreadReply {
  id: string;
  text: string;
  createdAt: string;
}

export interface CommentThread {
  id: string;
  text: string;
  createdAt: string;
  replies: ThreadReply[];
}

const LEGACY_FEEDBACK_KEY = "law-assistant-feedback";

function loadThreads(): CommentThread[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as CommentThread[];
      if (Array.isArray(parsed)) return parsed;
    }

    const legacyRaw = localStorage.getItem(LEGACY_FEEDBACK_KEY);
    if (!legacyRaw) return [];

    const legacy = JSON.parse(legacyRaw) as { id?: string; text?: string; createdAt?: string }[];
    if (!Array.isArray(legacy)) return [];

    const migrated: CommentThread[] = legacy
      .filter((item) => typeof item.text === "string" && item.text.trim())
      .map((item) => ({
        id: item.id ?? crypto.randomUUID(),
        text: item.text!.trim(),
        createdAt: item.createdAt ?? new Date().toISOString(),
        replies: [],
      }));

    if (migrated.length > 0) {
      saveThreads(migrated);
      localStorage.removeItem(LEGACY_FEEDBACK_KEY);
    }
    return migrated;
  } catch {
    return [];
  }
}

function saveThreads(threads: CommentThread[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
}

export function useCommentThreads() {
  const [threads, setThreads] = useState<CommentThread[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setThreads(loadThreads());
    setReady(true);
  }, []);

  const addThread = useCallback(
    (text: string) => {
      const thread: CommentThread = {
        id: crypto.randomUUID(),
        text: text.trim(),
        createdAt: new Date().toISOString(),
        replies: [],
      };
      setThreads((prev) => {
        const next = [thread, ...prev];
        saveThreads(next);
        return next;
      });
      return thread;
    },
    []
  );

  const addReply = useCallback((threadId: string, text: string) => {
    const reply: ThreadReply = {
      id: crypto.randomUUID(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };
    setThreads((prev) => {
      const next = prev.map((t) =>
        t.id === threadId ? { ...t, replies: [...t.replies, reply] } : t
      );
      saveThreads(next);
      return next;
    });
    return reply;
  }, []);

  return { threads, ready, addThread, addReply };
}
