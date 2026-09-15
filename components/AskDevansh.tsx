"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// "Ask Devansh": an AI twin that answers questions about the case study, after Jahanvi's "Ask Jahanvi".
// Hidden until GEMINI_API_KEY is set on Vercel. Add ?ask to the URL to see it anyway.

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Tell me more about you.",
  "Why not just use FlexiTicket?",
  "What surprised you during this project?",
];

const FONT = "var(--font-manrope), system-ui, sans-serif";

/* Lucide icons (MIT), inline like BottomNav's, so every icon shares one stroke. */
const ic = (size: number) => ({ width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true });
const Sparkle = () => <svg {...ic(16)}><path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z" /></svg>;
const Dots = () => <svg {...ic(18)}><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></svg>;
const Pencil = () => <svg {...ic(16)}><path d="M12 20h9" /><path d="M16.4 3.6a2 2 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>;
const XIcon = ({ s = 16 }: { s?: number }) => <svg {...ic(s)}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>;
const PanelClose = () => <svg {...ic(16)}><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M15 3v18" /><path d="m8 9 3 3-3 3" /></svg>;
const ArrowUp = () => <svg {...ic(16)}><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg>;

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
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      setOpen(false); setMenu(false); setConfirmEnd(false);
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [open]);

  // On wide screens the panel pushes the page aside instead of covering it.
  useEffect(() => {
    document.documentElement.classList.toggle("ask-open", open);
    return () => document.documentElement.classList.remove("ask-open");
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
    background: mine ? "var(--ink-surface)" : "var(--card-bg)", color: mine ? "#fff" : "var(--text-primary)",
    alignSelf: mine ? "flex-end" : "flex-start",
  });

  // Rendered on <body>, so "fixed" is fixed to the screen, not to an animated page wrapper.
  return createPortal(
    <>
      {!open && (
        <button className="ask-trigger" onClick={() => setOpen(true)}
          onMouseEnter={() => window.dispatchEvent(new Event("cursor:hide"))}
          onMouseLeave={() => window.dispatchEvent(new Event("cursor:show"))}>
          <Sparkle /> Ask Devansh
        </button>
      )}

      <aside className={`ask-panel${open ? " open" : ""}`} aria-label="Ask Devansh" aria-hidden={!open}
        onMouseEnter={() => window.dispatchEvent(new Event("cursor:hide"))}
        onMouseLeave={() => window.dispatchEvent(new Event("cursor:show"))}>
        {/* Header */}
        <div className="ask-head">
          <span style={{ fontWeight: 600, fontSize: 16, letterSpacing: "-0.02em", flex: 1 }}>Devansh Somvanshi</span>
          <button className="ask-icon" aria-label="Chat options" aria-expanded={menu} onClick={() => setMenu((m) => !m)}><Dots /></button>
          <button className="ask-icon" aria-label="Close" onClick={close}><XIcon s={18} /></button>
          {menu && (
            <div className="ask-menu">
              <button onClick={newChat}><Pencil /> Start a new chat</button>
              <button onClick={() => { setMenu(false); setConfirmEnd(true); }}><XIcon /> End chat</button>
              <button onClick={close}><PanelClose /> Close panel</button>
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
                  <button className="ask-icon" aria-label="Dismiss note" onClick={() => setNote(false)}><XIcon s={14} /></button>
                </div>
              )}
              <form className="ask-input" onSubmit={(e) => { e.preventDefault(); send(); }}>
                <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask me..." maxLength={1000} />
                <button type="submit" aria-label="Send" disabled={!input.trim() || loading}><ArrowUp /></button>
              </form>
              <p className="ask-esc">Press <kbd>ESC</kbd> to close</p>
            </div>
          </>
        )}
      </aside>

      <style>{`
        .ask-trigger { position: fixed; right: 28px; bottom: 28px; z-index: 1001; display: flex; align-items: center; gap: 10px;
          padding: 15px 24px; border: none; border-radius: 100px; background: var(--ink-surface); color: #fff; cursor: pointer;
          font-family: ${FONT}; font-size: 16px; font-weight: 600; letter-spacing: -0.01em;
          box-shadow: 0 8px 28px rgba(0,0,0,0.18); transition: transform .35s var(--ease-out); }
        .ask-trigger:hover { transform: translateY(-2px); }
        .ask-panel { position: fixed; top: 0; right: 0; bottom: 0; z-index: 1002; width: 420px; max-width: 100vw;
          display: flex; flex-direction: column; background: var(--raised); border-left: 1px solid var(--border);
          font-family: ${FONT}; color: var(--text-primary);
          transform: translateX(100%); transition: transform .6s var(--ease-sheet), box-shadow .6s var(--ease-sheet); }
        .ask-panel.open { transform: none; box-shadow: -12px 0 40px rgba(0,0,0,0.06); }
        html.nerd-mode .ask-panel.open { box-shadow: -16px 0 48px rgba(0,0,0,0.5); }
        .ask-head { position: relative; display: flex; align-items: center; gap: 6px; padding: 22px 20px 22px 24px; }
        .ask-icon { display: inline-flex; background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 4px; border-radius: 6px; }
        .ask-icon:hover { color: var(--text-primary); }
        .ask-menu { position: absolute; top: 58px; right: 20px; z-index: 2; display: flex; flex-direction: column; padding: 6px;
          background: var(--raised); border: 1px solid var(--border); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .ask-menu button { display: flex; align-items: center; gap: 10px; background: none; border: none; text-align: left; padding: 10px 14px; border-radius: 8px; cursor: pointer;
          font-family: ${FONT}; font-size: 15px; color: var(--text-primary); white-space: nowrap; }
        .ask-menu button:hover { background: var(--card-bg); }
        .ask-list { flex: 1; min-height: 0; overflow-y: auto; overscroll-behavior: contain; display: flex; flex-direction: column; gap: 10px; padding: 8px 24px 16px; }
        .ask-chip { border: 1px solid var(--border); background: var(--raised); color: var(--text-primary); border-radius: 100px;
          padding: 11px 18px; font-family: ${FONT}; font-size: 15px; font-weight: 500; cursor: pointer; transition: background .3s var(--ease-out); }
        .ask-chip:hover { background: var(--card-bg); }
        .ask-foot { padding: 0 20px 14px; display: flex; flex-direction: column; gap: 12px; }
        .ask-note { display: flex; gap: 10px; align-items: flex-start; background: var(--card-bg); border-radius: 12px; padding: 14px 16px;
          font-size: 14px; line-height: 1.5; color: var(--text-secondary); }
        .ask-note b { color: var(--text-primary); }
        .ask-input { display: flex; align-items: center; gap: 8px; border: 1px solid var(--border); border-radius: 18px; padding: 6px 6px 6px 18px; }
        .ask-input input { flex: 1; border: none; outline: none; background: none; font-family: ${FONT}; font-size: 16px; color: var(--text-primary); padding: 10px 0; }
        .ask-input button { width: 36px; height: 36px; flex: 0 0 36px; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; border: none; background: var(--ink-surface); color: #fff; cursor: pointer; }
        .ask-input button:disabled { background: var(--card-bg); color: var(--text-muted); cursor: default; }
        .ask-esc { margin: 0; text-align: center; font-size: 13px; color: var(--text-muted); }
        .ask-esc kbd { border: 1px solid var(--border); border-radius: 5px; padding: 1px 6px; font-family: inherit; font-size: 12px; }
        .ask-confirm { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0 32px 80px; text-align: center; }
        .ask-confirm button { width: 100%; max-width: 340px; margin-top: 10px; padding: 13px; border: 1px solid var(--border); border-radius: 10px;
          background: var(--raised); font-family: ${FONT}; font-size: 16px; font-weight: 600; color: var(--text-primary); cursor: pointer; }
        .ask-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--text-muted); opacity: .35; animation: ask-pulse 1.2s cubic-bezier(.16,1,.3,1) infinite; }
        @keyframes ask-pulse { 0%, 100% { opacity: .35; } 40% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .ask-dot { animation: none; opacity: .6; } }
        /* Below 1360 the contents list becomes a pill at bottom centre, so sit above it. */
        @media (max-width: 1359px) { .ask-trigger { bottom: 84px; } }
        /* Push the page aside; where the contents list is fixed on the left, leave room for it too,
           so the page sits centred between the list and the panel. */
        html.ask-open body { padding-right: 420px; }
        @media (min-width: 1360px) { html.ask-open body { padding-left: 170px; } }
        body { transition: padding .6s var(--ease-sheet); }
        @media (max-width: 1099px) { html.ask-open body { padding-right: 0; } }
        @media (max-width: 640px) {
          .ask-trigger { right: 16px; bottom: 76px; padding: 13px 20px; font-size: 15px; }
          .ask-panel { width: 100vw; border-left: none; }
          .ask-esc { display: none; }
        }
      `}</style>
    </>,
    document.body,
  );
}
