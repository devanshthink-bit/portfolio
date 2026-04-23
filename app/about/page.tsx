"use client";
import Image from "next/image";
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";

type TickerItem = { text: string; label?: boolean };

const PILL_STYLE: React.CSSProperties = {
  flexShrink: 0,
  fontFamily: "var(--font-geist-mono), monospace",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.02em",
  textTransform: "uppercase",
  color: "var(--text-muted)",
  border: "1px solid var(--border)",
  borderRadius: 999,
  padding: "5px 13px",
  background: "var(--card-bg)",
  whiteSpace: "nowrap",
};

const LABEL_STYLE: React.CSSProperties = {
  flexShrink: 0,
  fontFamily: "var(--font-geist-mono), monospace",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.02em",
  textTransform: "uppercase",
  color: "var(--bg)",
  background: "var(--text-muted)",
  borderRadius: 999,
  padding: "5px 13px",
  whiteSpace: "nowrap",
};

const row1: TickerItem[] = [
  { text: "Design", label: true },
  { text: "Figma" }, { text: "FigJam" }, { text: "Framer" },
  { text: "Protopie" }, { text: "After Effects" }, { text: "Illustrator" },
  { text: "Maze" }, { text: "Lottie" }, { text: "Principle" },
];

const row2: TickerItem[] = [
  { text: "Dev", label: true },
  { text: "React" }, { text: "Next.js" }, { text: "TypeScript" },
  { text: "React Native" }, { text: "Node.js" }, { text: "Tailwind" }, { text: "Expo" },
  { text: "AI", label: true },
  { text: "Claude" }, { text: "Cursor" }, { text: "Codex" }, { text: "MCP" },
];

const testimonials = [
  {
    quote: "Played a key role in building Goodworker's flagship product, contributing to critical projects with structured problem-solving, strong technical skills, and clear communication across teams.",
    name: "Priyam Shaw",
    role: "EM @ Goodworker, Ex-Myntra",
    avatar: "/images/testimonial-priyam.jpg",
  },
  {
    quote: "Delivered high-quality mobile features across iOS and Android, owning end-to-end development with strong React expertise, maintainable solutions, and dependable collaboration under tight timelines.",
    name: "Kunal Sagar",
    role: "STPM @ LinkedIn, Ex-Nineleaps",
    avatar: "/images/testimonial-kunal.jpg",
  },
  {
    quote: "Demonstrates expertise in React, TypeScript, and design patterns, enabling frontend development while collaborating with attention to detail and bringing enthusiasm to team dynamics.",
    name: "Swaraj Kausik",
    role: "SE-2 @ Pinelabs, Ex-Goodworker",
    avatar: "/images/testimonial-swaraj.jpg",
  },
  {
    quote: "Consistently goes above and beyond to support team goals, showing reliability with ownership, proactive initiative, eagerness to improve, and strong work ethic in collaborative environments.",
    name: "Ashish Shetty",
    role: "SSE @ EPAM, Ex-Goodworker",
    avatar: "/images/testimonial-ashish.jpg",
  },
];

const N = testimonials.length; // 4

const TRANSITION = "transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)";
const CARD_GAP = 16;

const ArrowLeft = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <path d="M10 12L6 8l4-4" stroke="var(--text-primary)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ArrowRight = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <path d="M6 4l4 4-4 4" stroke="var(--text-primary)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const arrowBtn: React.CSSProperties = {
  position: "absolute", top: "50%", transform: "translateY(-50%)", zIndex: 10,
  width: 40, height: 40, borderRadius: "50%", background: "var(--bg)",
  border: "1px solid var(--border)", display: "flex", alignItems: "center",
  justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
};

export default function About() {
  const [isMobile, setIsMobile] = useState(false);

  const [trackPos, setTrackPos] = useState(0);
  const [mobileAnimating, setMobileAnimating] = useState(false);

  // Desktop carousel
  const [desktopOffset, setDesktopOffset] = useState(0);
  const desktopRef = useRef<HTMLDivElement>(null);
  const [desktopWidth, setDesktopWidth] = useState(0);

  const touchStartX = useRef<number | null>(null);

  useLayoutEffect(() => {
    const mql = window.matchMedia("(max-width: 640px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const el = desktopRef.current;
    if (!el) return;
    const ro = new ResizeObserver(e => setDesktopWidth(e[0].contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const desktopCardWidth = desktopWidth > 0 ? (desktopWidth - 2 * CARD_GAP) / 3 : 0;

  const mobileGoNext = () => {
    if (mobileAnimating || trackPos >= N - 1) return;
    setMobileAnimating(true);
    setTrackPos(p => p + 1);
  };
  const mobileGoPrev = () => {
    if (mobileAnimating || trackPos <= 0) return;
    setMobileAnimating(true);
    setTrackPos(p => p - 1);
  };

  const handleTransitionEnd = () => setMobileAnimating(false);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (dx < -40) mobileGoNext();
    else if (dx > 40) mobileGoPrev();
  };

  const mobileTranslate = `translateX(-${trackPos * (100 / N)}%)`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 56, marginTop: 24 }}>
      <div className="section">
        <h3 className="section-title">About Me</h3>
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: 10, overflow: "hidden" }}>
          <Image src="/images/about.jpg" alt="Devansh at the beach" fill style={{ objectFit: "cover", objectPosition: "center top" }} priority />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 32 }}>
          <h2 style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: "26px", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.4, color: "var(--text-primary)", margin: 0 }}>Designing with craft, building with code.</h2>
          <p className="section-body" style={{ margin: 0 }}>I didn&apos;t grow up calling it design, but I was always curious about how things worked.</p>
          <p className="section-body" style={{ margin: 0 }}>My first exposure to it was on my mom&apos;s Samsung Galaxy R — I&apos;d spend hours exploring apps, downloading random ones, almost in awe of how they worked. I didn&apos;t have the word for it back then, but I was already falling in love with <strong>product design</strong>.</p>
          <p className="section-body" style={{ margin: 0 }}>Before screens took over, I was obsessed with cars. That instinct for how things feel and function stayed — it just shifted from physical objects to digital products.</p>
          <p className="section-body" style={{ margin: 0 }}>Today, I see myself as a <strong>design–engineer </strong>hybrid working at the intersection of design, engineering, and product. I don&apos;t just design — I build and ship product features, integrating agentic AI into my workflows.</p>
          <p className="section-body" style={{ margin: 0 }}>Previously, as a Software Development Engineer (SDE), I&apos;ve worked on shipping flagship products across workforce enablement, hospitality, and greentech at <strong>GoodWorker</strong>, <strong>Stanza Living</strong>, and <strong>Devic Earth</strong>, with products serving over a <strong>million</strong> users.</p>
        </div>
      </div>

      {/* Skills & Tools ticker */}
      <div className="section">
        <h3 className="section-title">Skills & Tools</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 6 }}>
          {([
            { items: row1, anim: "ticker-left 30s linear infinite" },
            { items: row2, anim: "ticker-right 24s linear infinite" },
          ] as const).map(({ items, anim }, rowIdx) => (
            <div key={rowIdx} style={{ position: "relative", overflow: "hidden" }}>
              {/* Left fade */}
              <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 72, zIndex: 2, background: "linear-gradient(to right, var(--bg), transparent)", pointerEvents: "none" }} />
              {/* Right fade */}
              <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 72, zIndex: 2, background: "linear-gradient(to left, var(--bg), transparent)", pointerEvents: "none" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 8, width: "max-content", padding: "2px 0", animation: anim }}>
                {[...items, ...items].map((item, i) => (
                  <span key={i} style={item.label ? LABEL_STYLE : PILL_STYLE}>{item.text}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="section">
        <h3 className="section-title">In Their Words</h3>

        {isMobile ? (
          /* Viewport — no extra margin, aligns with page content */
          <div style={{ overflow: "hidden", borderRadius: 12, width: "100%" }}>
            <div
              style={{ display: "flex", width: `${N * 100}%`, transform: mobileTranslate, transition: TRANSITION }}
              onTransitionEnd={handleTransitionEnd}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {testimonials.map((tc, i) => (
                <div
                  key={i}
                  style={{
                    flex: `0 0 ${100 / N}%`,
                    background: "var(--card-bg)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    padding: 20,
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 16,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: 28, lineHeight: 1, display: "block", marginBottom: -8, color: "var(--text-muted)", fontFamily: "Georgia, serif", userSelect: "none" }}>&ldquo;</span>
                    <p style={{ fontSize: 16, fontWeight: 400, lineHeight: 1.55, letterSpacing: "-0.01em", color: "var(--text-secondary)", margin: 0 }}>{tc.quote}</p>
                  </div>
                  {/* Footer: author on left, nav arrows on right */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <img src={tc.avatar} alt={tc.name} style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: "-0.01em", color: "var(--text-primary)", margin: 0 }}>{tc.name}</p>
                        <p style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "-0.01em", margin: "2px 0 0" }}>{tc.role}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                      {trackPos > 0 && (
                        <button onClick={mobileGoPrev} style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--bg)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}>
                          <ArrowLeft />
                        </button>
                      )}
                      {trackPos < N - 1 && (
                        <button onClick={mobileGoNext} style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--bg)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}>
                          <ArrowRight />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ position: "relative" }}>
            {desktopOffset === 1 && (
              <button onClick={() => setDesktopOffset(0)} style={{ ...arrowBtn, left: -20 }}><ArrowLeft /></button>
            )}
            <div ref={desktopRef} style={{ overflow: "hidden" }}>
              <div style={{ display: "flex", gap: CARD_GAP, transform: `translateX(-${desktopOffset * (desktopCardWidth + CARD_GAP)}px)`, transition: TRANSITION }}>
                {testimonials.map((tc, i) => (
                  <div key={i} style={{ flex: `0 0 ${desktopCardWidth}px`, aspectRatio: "1", background: "var(--card-bg)", borderRadius: 10, padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 16 }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontSize: 28, lineHeight: 1, display: "block", marginBottom: -8, color: "var(--text-muted)", fontFamily: "Georgia, serif", userSelect: "none" }}>&ldquo;</span>
                      <p style={{ fontSize: 16, fontWeight: 400, lineHeight: 1.55, letterSpacing: "-0.01em", color: "var(--text-secondary)", margin: 0 }}>{tc.quote}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <img src={tc.avatar} alt={tc.name} style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: "-0.01em", color: "var(--text-primary)", margin: 0 }}>{tc.name}</p>
                        <p style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "-0.01em", margin: "2px 0 0" }}>{tc.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {desktopOffset === 0 && (
              <button onClick={() => setDesktopOffset(1)} style={{ ...arrowBtn, right: -20 }}><ArrowRight /></button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
