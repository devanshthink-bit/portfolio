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

// `plain`: sentence case in the text face, for pages that dropped the mono labels (RedBus).
export default function RubberBackButton({ plain }: { plain?: boolean } = {}) {
  const [pos, setPos] = useState<{ top?: number; bottom?: number; left: number } | null>(null);

  useEffect(() => {
    const calc = () => window.innerWidth <= 640
      ? { bottom: 24, left: 16 }
      : { top: 30,   left: 20 };
    const t = setTimeout(() => {
      setPos(calc());
      const onResize = () => setPos(calc());
      window.addEventListener("resize", onResize);
    }, 350);
    return () => clearTimeout(t);
  }, []);

  if (!pos) return null;

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
        padding: "6px 4px",
        fontFamily: plain ? "var(--font-manrope), sans-serif" : "var(--font-geist-mono), monospace",
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
