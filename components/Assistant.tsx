"use client";
import { useState, useRef, useEffect, KeyboardEvent } from "react";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What has Devansh worked on?",
  "What are his design skills?",
  "What tech does he build with?",
];

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/check-chat").then(r => r.json()).then(data => setAvailable(data.available)).catch(() => setAvailable(false));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  if (!available) return null;

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    const userMsg: Message = { role: "user", content };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") send();
  }

  const isEmpty = messages.length === 0;

  return (
    <>
      {/* Panel */}
      <div
        style={{
          position: "fixed", bottom: 72, right: 20, zIndex: 999,
          width: 320,
          background: "var(--bg)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
          display: "flex", flexDirection: "column",
          overflow: "hidden",
          maxHeight: open ? 480 : 0,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "max-height 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "14px 16px 10px",
          borderBottom: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>Ask about Devansh</p>
          <button
            onClick={() => setOpen(false)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--text-muted)", lineHeight: 1 }}
          >
            <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>
          {isEmpty && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
              <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0, letterSpacing: "-0.01em" }}>Suggestions</p>
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  style={{
                    textAlign: "left", padding: "8px 12px", borderRadius: 10,
                    background: "var(--card-bg)", border: "none", cursor: "pointer",
                    fontSize: 12, color: "var(--text-primary)", fontWeight: 500,
                    letterSpacing: "-0.01em", lineHeight: 1.4,
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(128,128,128,0.15)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "var(--card-bg)")}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              <div style={{
                maxWidth: "82%", padding: "8px 12px", borderRadius: m.role === "user" ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
                background: m.role === "user" ? "var(--text-primary)" : "var(--card-bg)",
                color: m.role === "user" ? "var(--bg)" : "var(--text-primary)",
                fontSize: 12.5, lineHeight: 1.5, letterSpacing: "-0.01em",
              }}>
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div style={{ padding: "10px 14px", borderRadius: "12px 12px 12px 3px", background: "var(--card-bg)", display: "flex", gap: 4, alignItems: "center" }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: "var(--text-muted)",
                    display: "inline-block",
                    animation: `dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{
          borderTop: "1px solid var(--border)",
          padding: "10px 12px",
          display: "flex", gap: 8, alignItems: "center",
        }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Ask anything..."
            style={{
              flex: 1, background: "none", border: "none", outline: "none",
              fontSize: 12.5, color: "var(--text-primary)", letterSpacing: "-0.01em",
              fontFamily: "inherit",
            }}
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || loading}
            style={{
              width: 28, height: 28, borderRadius: "50%", border: "none",
              background: input.trim() && !loading ? "var(--text-primary)" : "var(--card-bg)",
              cursor: input.trim() && !loading ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, transition: "background 0.15s",
            }}
          >
            <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
              <path d="M6 10V2M2 6l4-4 4 4" stroke={input.trim() && !loading ? "var(--bg)" : "var(--text-muted)"} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: "fixed", bottom: 20, right: 20, zIndex: 1000,
          width: 44, height: 44, borderRadius: "50%",
          background: "var(--text-primary)",
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "scale(1.06)";
          e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.22)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.18)";
        }}
      >
        {open ? (
          <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2L2 14" stroke="var(--bg)" strokeWidth={1.8} strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
            <path d="M9 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.3 6L14 16.5l-3.5-1.1A7 7 0 1 1 9 2z" fill="var(--bg)" opacity="0.9"/>
            <path d="M5.5 7.5h7M5.5 10.5h4.5" stroke="var(--text-primary)" strokeWidth={1.3} strokeLinecap="round"/>
          </svg>
        )}
      </button>

      <style>{`
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
