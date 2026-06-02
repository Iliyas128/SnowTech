export interface SourceDetail {
  law: string;
  article: string;
  lang: string;
  text?: string;
}

export interface ChatResponse {
  answer: string;
  law: string;
  article: string;
  sources: SourceDetail[];
  needs_clarification?: boolean;
}

const DEFAULT_API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:8787/api"
    : "https://law-back1.vercel.app/api";

const API_BASE_RAW = (import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE).replace(/\/+$/, "");
const API_BASE = API_BASE_RAW.endsWith("/api") ? API_BASE_RAW : `${API_BASE_RAW}/api`;
const DEFAULT_LANG = import.meta.env.VITE_DEFAULT_LANG ?? "ru";

async function sendChatRequest(message: string): Promise<Response> {
  return fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      lang: DEFAULT_LANG.toLowerCase(),
    }),
  });
}

export async function sendMessage(message: string): Promise<ChatResponse> {
  const res = await sendChatRequest(message);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Ошибка запроса: ${res.status}`);
  }

  const data = (await res.json()) as {
    answer: string;
    law: string;
    article: string;
    sources?: SourceDetail[];
    needs_clarification?: boolean;
  };
  return {
    answer: data.answer,
    law: data.law,
    article: data.article,
    sources: Array.isArray(data.sources) ? data.sources : [],
    needs_clarification: data.needs_clarification,
  };
}
