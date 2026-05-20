"use client";
import Link from "next/link";

function playRubber() {
  try {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
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

export default function RubberBackButton() {
  return (
    <Link
      href="/"
      onClick={playRubber}
      style={{
        position: "fixed",
        top: 30,
        left: 20,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 12px",
        borderRadius: 8,
        background: "var(--text-primary)",
        fontFamily: "var(--font-geist-mono)",
        fontSize: 11,
        fontWeight: 600,
        color: "var(--bg)",
        letterSpacing: "-0.01em",
        textTransform: "uppercase",
        boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
      }}
    >
      ← Back
    </Link>
  );
}
