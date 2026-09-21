"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";

interface Message {
  role: "USER" | "ASSISTANT";
  content: string;
}

const SUGGESTIONS = [
  "What tests are available?",
  "Do I need fasting?",
  "How do I book a test?",
  "Can I request home collection?",
  "Where is 4M Diagnostics?",
  "How can I download my report?",
];

function getSessionId(): string {
  if (typeof window === "undefined") return "server";
  const key = "4m_ai_session_id";
  let id = window.localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(key, id);
  }
  return id;
}

export function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ASSISTANT",
      content:
        "Hi, I'm 4M AI Assistant. Ask me about tests, packages, bookings, home collection, or reports.",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    setMessages((prev) => [...prev, { role: "USER", content: trimmed }]);
    setInput("");
    setSending(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: getSessionId(), message: trimmed }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "ASSISTANT", content: data.reply ?? "Sorry, something went wrong." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ASSISTANT", content: "Network error — please try again." },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex h-[70vh] flex-col rounded-2xl border border-border bg-surface">
      <div className="flex-1 space-y-3 overflow-y-auto p-5">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "USER" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                m.role === "USER"
                  ? "bg-brand-primary text-white"
                  : "border border-border bg-background text-foreground"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {sending ? <p className="text-xs text-muted">4M AI is typing…</p> : null}
        <div ref={endRef} />
      </div>

      <div className="border-t border-border p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted hover:border-brand-primary hover:text-brand-primary"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask 4M AI…"
            className="flex-1 rounded-full border border-border px-4 py-2 text-sm outline-none focus:border-brand-primary"
          />
          <Button type="submit" disabled={sending}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
