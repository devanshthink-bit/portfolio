"use client";
import Link from "next/link";
import { useEffect, useState } from "react";


function playRubber() {
  try {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "triangle";
    osc.frequency.setValueAtTime(260, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.07);
    osc.onended = () => ctx.close();
  } catch (_) {}
}

// `plain` (the default): sentence case in the heading face. `plain={false}` brings back the old mono BACK.
export default function RubberBackButton({ plain = true }: { plain?: boolean } = {}) {
  const [pos, setPos] = useState<{ top?: number; bottom?: number; left: number } | null>(null);

  useEffect(() => {
    // Plain pages already have two buttons at the bottom on phones (contents, Ask), so Back goes top-left.
    const calc = () => window.innerWidth <= 640
      ? (plain ? { top: 14, left: 14 } : { bottom: 24, left: 16 })
      : { top: 30,   left: 20 };
    const t = setTimeout(() => {
      setPos(calc());
      const onResize = () => setPos(calc());
      window.addEventListener("resize", onResize);
    }, 350);
    return () => clearTimeout(t);
  }, [plain]);

  if (!pos) return null;
  // On a phone the plain Back floats over the page, so it gets a solid pill to stay readable.
  const pill = plain && pos.top === 14;

  return (
    <Link
      href="/"
      onClick={playRubber}
      style={{
        position: "fixed",
        top: pos.top ?? "auto",
        bottom: pos.bottom ?? "auto",
        left: pos.left,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: pill ? "8px 14px 8px 11px" : "6px 4px",
        ...(pill ? { background: "var(--bg)", borderRadius: 100, boxShadow: "0 1px 2px rgba(0,0,0,0.06), 0 6px 18px -6px rgba(0,0,0,0.16)" } : {}),
        fontFamily: plain ? "var(--font-inter), sans-serif" : "var(--font-geist-mono), monospace",
        fontSize: plain ? 15 : 14,
        fontWeight: 600,
        color: "var(--text-primary)",
        letterSpacing: plain ? "-0.02em" : "-0.01em",
        textTransform: plain ? "none" : "uppercase",
      }}
    >
      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
      Back
    </Link>
  );
}
