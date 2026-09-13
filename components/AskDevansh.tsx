"use client";
import { useEffect, useRef, useState } from "react";

// "Ask Devansh": an AI twin that answers questions about the case study, after Jahanvi's "Ask Jahanvi".
// Hidden until GEMINI_API_KEY is set on Vercel. Add ?ask to the URL to see it anyway.

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Tell me more about you.",
  "Why not just use FlexiTicket?",
  "What surprised you during this project?",
];

const FONT = "var(--font-manrope), system-ui, sans-serif";

export default function AskDevansh() {
  const [available, setAvailable] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [confirmEnd, setConfirmEnd] = useState(false);
  const [note, setNote] = useState(true);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).has("ask");
    fetch("/api/ask-devansh").then((r) => r.json())
      .then((d) => setAvailable(d.available || forced))
      .catch(() => setAvailable(forced));
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => inputRef.current?.focus(), 150);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!available) return null;

  function close() { setOpen(false); setMenu(false); setConfirmEnd(false); }
  function newChat() { setMessages([]); setInput(""); setMenu(false); setConfirmEnd(false); }
  function endChat() { newChat(); close(); }

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ask-devansh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((p) => [...p, { role: "assistant", content: data.content }]);
    } catch {
      setMessages((p) => [...p, { role: "assistant", content: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  const bubble = (mine: boolean): React.CSSProperties => ({
    maxWidth: "86%", padding: "11px 16px", borderRadius: 18, fontSize: 15, lineHeight: 1.55,
    letterSpacing: "-0.01em", whiteSpace: "pre-wrap",
    background: mine ? "#262626" : "var(--card-bg)", color: mine ? "#fff" : "var(--text-primary)",
    alignSelf: mine ? "flex-end" : "flex-start",
  });

  return (
    <>
      {!open && (
        <button className="ask-trigger" onClick={() => setOpen(true)}
          onMouseEnter={() => window.dispatchEvent(new Event("cursor:hide"))}
          onMouseLeave={() => window.dispatchEvent(new Event("cursor:show"))}>
          <span aria-hidden style={{ fontSize: 16, lineHeight: 1 }}>✦</span> Ask Devansh
        </button>
      )}

      <aside className={`ask-panel${open ? " open" : ""}`} aria-label="Ask Devansh" aria-hidden={!open}
        onMouseEnter={() => window.dispatchEvent(new Event("cursor:hide"))}
        onMouseLeave={() => window.dispatchEvent(new Event("cursor:show"))}>
        {/* Header */}
        <div className="ask-head">
          <span style={{ fontWeight: 800, fontSize: 24, letterSpacing: "-0.04em" }}>DS</span>
          <span style={{ fontWeight: 600, fontSize: 16, letterSpacing: "-0.02em", flex: 1 }}>Devansh Somvanshi</span>
          <button className="ask-icon" aria-label="Chat options" onClick={() => setMenu((m) => !m)}>•••</button>
          {menu && (
            <div className="ask-menu">
              <button onClick={newChat}>✎&nbsp; Start a new chat</button>
              <button onClick={() => { setMenu(false); setConfirmEnd(true); }}>✕&nbsp; End chat</button>
              <button onClick={close}>↘&nbsp; Close panel</button>
            </div>
          )}
        </div>

        {confirmEnd ? (
          <div className="ask-confirm">
            <p style={{ fontSize: 24, fontWeight: 700, margin: 0, color: "var(--text-muted)" }}>End chat</p>
            <p style={{ margin: "6px 0 22px", color: "var(--text-secondary)" }}>Do you want to end this chat?</p>
            <button onClick={endChat}>Yes, end chat</button>
            <button onClick={() => setConfirmEnd(false)}>Cancel</button>
          </div>
        ) : (
          <>
            <div ref={listRef} className="ask-list" data-lenis-prevent>
              <div style={bubble(false)}>Hi, I&apos;m Devansh.</div>
              <div style={bubble(false)}>What would you like to know about this project?</div>
              {messages.map((m, i) => <div key={i} style={bubble(m.role === "user")}>{m.content}</div>)}
              {loading && (
                <div style={{ ...bubble(false), display: "flex", gap: 5 }}>
                  {[0, 1, 2].map((i) => <span key={i} className="ask-dot" style={{ animationDelay: `${i * 0.2}s` }} />)}
                </div>
              )}
              {messages.length === 0 && (
                <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
                  {SUGGESTIONS.map((s) => <button key={s} className="ask-chip" onClick={() => send(s)}>{s}</button>)}
                </div>
              )}
            </div>

            <div className="ask-foot">
              {note && (
                <div className="ask-note">
                  <p style={{ margin: 0 }}><b>Friendly note:</b> You&apos;re chatting with my AI twin. It knows this case study well, but it can still get things wrong.</p>
                  <button className="ask-icon" aria-label="Dismiss note" onClick={() => setNote(false)}>✕</button>
                </div>
              )}
              <form className="ask-input" onSubmit={(e) => { e.preventDefault(); send(); }}>
                <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask me..." maxLength={1000} />
                <button type="submit" aria-label="Send" disabled={!input.trim() || loading}>↑</button>
              </form>
              <p className="ask-esc">Press <kbd>ESC</kbd> to close</p>
            </div>
          </>
        )}
      </aside>

      <style>{`
        .ask-trigger { position: fixed; right: 28px; bottom: 28px; z-index: 1001; display: flex; align-items: center; gap: 10px;
          padding: 15px 24px; border: none; border-radius: 100px; background: #262626; color: #fff; cursor: pointer;
          font-family: ${FONT}; font-size: 16px; font-weight: 600; letter-spacing: -0.01em;
          box-shadow: 0 8px 28px rgba(0,0,0,0.18); transition: transform .2s ease; }
        .ask-trigger:hover { transform: translateY(-2px); }
        .ask-panel { position: fixed; top: 0; right: 0; bottom: 0; z-index: 1002; width: 420px; max-width: 100vw;
          display: flex; flex-direction: column; background: var(--bg); border-left: 1px solid var(--border);
          font-family: ${FONT}; color: var(--text-primary);
          transform: translateX(100%); transition: transform .32s cubic-bezier(.4,0,.2,1), box-shadow .32s; }
        .ask-panel.open { transform: none; box-shadow: -12px 0 40px rgba(0,0,0,0.06); }
        .ask-head { position: relative; display: flex; align-items: center; gap: 12px; padding: 22px 24px; }
        .ask-icon { background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 14px; padding: 4px 6px; letter-spacing: 1px; }
        .ask-menu { position: absolute; top: 58px; right: 20px; z-index: 2; display: flex; flex-direction: column; padding: 6px;
          background: var(--bg); border: 1px solid var(--border); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .ask-menu button { background: none; border: none; text-align: left; padding: 10px 14px; border-radius: 8px; cursor: pointer;
          font-family: ${FONT}; font-size: 15px; color: var(--text-primary); white-space: nowrap; }
        .ask-menu button:hover { background: var(--card-bg); }
        .ask-list { flex: 1; min-height: 0; overflow-y: auto; overscroll-behavior: contain; display: flex; flex-direction: column; gap: 10px; padding: 8px 24px 16px; }
        .ask-chip { border: 1px solid var(--border); background: var(--bg); color: var(--text-primary); border-radius: 100px;
          padding: 11px 18px; font-family: ${FONT}; font-size: 15px; font-weight: 500; cursor: pointer; transition: background .15s; }
        .ask-chip:hover { background: var(--card-bg); }
        .ask-foot { padding: 0 20px 14px; display: flex; flex-direction: column; gap: 12px; }
        .ask-note { display: flex; gap: 10px; align-items: flex-start; background: var(--card-bg); border-radius: 12px; padding: 14px 16px;
          font-size: 14px; line-height: 1.5; color: var(--text-secondary); }
        .ask-note b { color: var(--text-primary); }
        .ask-input { display: flex; align-items: center; gap: 8px; border: 1px solid var(--border); border-radius: 18px; padding: 6px 6px 6px 18px; }
        .ask-input input { flex: 1; border: none; outline: none; background: none; font-family: ${FONT}; font-size: 16px; color: var(--text-primary); padding: 10px 0; }
        .ask-input button { width: 36px; height: 36px; border-radius: 50%; border: none; background: #262626; color: #fff; font-size: 16px; cursor: pointer; }
        .ask-input button:disabled { background: var(--card-bg); color: var(--text-muted); cursor: default; }
        .ask-esc { margin: 0; text-align: center; font-size: 13px; color: var(--text-muted); }
        .ask-esc kbd { border: 1px solid var(--border); border-radius: 5px; padding: 1px 6px; font-family: inherit; font-size: 12px; }
        .ask-confirm { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0 32px 80px; text-align: center; }
        .ask-confirm button { width: 100%; max-width: 340px; margin-top: 10px; padding: 13px; border: 1px solid var(--border); border-radius: 10px;
          background: var(--bg); font-family: ${FONT}; font-size: 16px; font-weight: 600; color: var(--text-primary); cursor: pointer; }
        .ask-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--text-muted); animation: ask-bounce 1.2s ease-in-out infinite; }
        @keyframes ask-bounce { 0%, 80%, 100% { transform: translateY(0); opacity: .4; } 40% { transform: translateY(-4px); opacity: 1; } }
        @media (max-width: 640px) {
          .ask-trigger { right: 16px; bottom: 20px; padding: 13px 20px; font-size: 15px; }
          .ask-panel { width: 100vw; border-left: none; }
          .ask-esc { display: none; }
        }
      `}</style>
    </>
  );
}
