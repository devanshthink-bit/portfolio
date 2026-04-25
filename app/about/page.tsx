"use client";
import Image from "next/image";
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";

const CAT_COLORS = { design: "#6B9FE4", ai: "#A07FD8", dev: "#5FB896" } as const;
type Cat = keyof typeof CAT_COLORS;

type StripItem =
  | { kind: "label"; text: string; cat: Cat }
  | { kind: "skill"; name: string; cat: Cat }
  | { kind: "tool"; name: string; cat: Cat; slug?: string; src?: string };

const DESIGN_STRIP: StripItem[] = [
  { kind: "tool",   name: "Notion",            cat: "design", src: "/icons/notion.svg" },
  { kind: "tool",   name: "Google Analytics", cat: "design", src: "/icons/googleanalytics.svg" },
  { kind: "tool",   name: "FigJam",           cat: "design", src: "/icons/figjam.svg" },
  { kind: "tool",   name: "Framer",           cat: "design", src: "/icons/framer.svg" },
  { kind: "tool",   name: "Figma",            cat: "design", src: "/icons/figma.svg" },
  { kind: "skill",  name: "Accessibility",       cat: "design" },
  { kind: "skill",  name: "Visual Design",       cat: "design" },
  { kind: "skill",  name: "Information Architecture",       cat: "design" },
  { kind: "skill",  name: "Design Systems",      cat: "design" },
  { kind: "skill",  name: "Systems Thinking",    cat: "design" },
  { kind: "skill",  name: "UX Research",       cat: "design" },
  { kind: "skill",  name: "Rapid Prototyping",  cat: "design" },
  { kind: "skill",  name: "Interaction Design", cat: "design" },
  { kind: "skill",  name: "Product Thinking",   cat: "design" },
  { kind: "label",  text: "Design",          cat: "design" },
];

const AI_DEV_STRIP: StripItem[] = [
  { kind: "label", text: "Dev", cat: "dev" },
  { kind: "tool",  name: "React.js",     cat: "dev", src: "/icons/react.svg" },
  { kind: "tool",  name: "Next.js",      cat: "dev", src: "/icons/nextdotjs.svg" },
  { kind: "tool",  name: "TypeScript",   cat: "dev", src: "/icons/typescript.svg" },
  { kind: "tool",  name: "React Native", cat: "dev", src: "/icons/react.svg" },
  { kind: "tool",  name: "PWAs",         cat: "dev", src: "/icons/pwa.svg" },
  { kind: "tool",  name: "Flutter", cat: "dev", src: "/icons/flutter.svg" },
  { kind: "tool",  name: "Storybook", cat: "dev", src: "/icons/storybook.svg" },
  { kind: "tool",  name: "Tailwind",     cat: "dev", src: "/icons/tailwindcss.svg" },
  { kind: "tool",  name: "Git",          cat: "dev", src: "/icons/git.svg" },
  { kind: "label", text: "AI",  cat: "ai" },
  { kind: "skill", name: "Agent Orchestration", cat: "ai" },
  { kind: "skill", name: "Design Workflow Automation",  cat: "ai" },
  { kind: "skill", name: "Design-to-Code Workflows",  cat: "ai" },
  { kind: "skill", name: "Prompt Systems", cat: "ai" },
  { kind: "skill", name: "Context Design", cat: "ai" },
  { kind: "skill", name: "LLM Integration", cat: "ai" },
  { kind: "skill", name: "AI Research & Synthesis", cat: "ai" },
  { kind: "tool",  name: "Claude Code",        cat: "ai", src: "/icons/claudecode.svg" },
  { kind: "tool",  name: "Cursor",             cat: "ai", src: "/icons/cursor.svg" },
  { kind: "tool",  name: "Codex",              cat: "ai", src: "/icons/codex.svg" },
  { kind: "tool",  name: "Antigravity",        cat: "ai", src: "/icons/antigravity.svg" },
  { kind: "tool",  name: "Figma Make",         cat: "ai", src: "/icons/figmamake.svg" },
];

const INITIAL_COLORS = ["#e07b54","#5b8de0","#9b6dd6","#4aad7a","#d4a03a","#d45480","#3abfbf","#7aad4a","#d46b3a","#5b6dd6"];
function nameColor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return INITIAL_COLORS[Math.abs(h) % INITIAL_COLORS.length];
}

function ToolCircle({ src, name }: { slug?: string; src?: string; name: string; accent: string }) {
  const [failed, setFailed] = useState(false);
  const showImg = src && !failed;
  return (
    <span style={{
      width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      background: showImg ? "rgba(255,255,255,0.92)" : nameColor(name),
      overflow: "hidden", padding: 4,
      boxSizing: "border-box",
    }}>
      {showImg ? (
        <img src={src} alt=""
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          onError={() => setFailed(true)}
        />
      ) : (
        <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", lineHeight: 1 }}>
          {name[0].toUpperCase()}
        </span>
      )}
    </span>
  );
}

function LabelPill({ text }: { text: string; cat: Cat }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 72, padding: "5px 0", borderRadius: 24,
      background: "var(--text-secondary)",
      color: "var(--bg)",
      fontSize: 10, fontWeight: 700, letterSpacing: "0.09em",
      textTransform: "uppercase", whiteSpace: "nowrap",
      flexShrink: 0, userSelect: "none",
      boxShadow: "0 2px 6px rgba(0,0,0,0.22)",
    }}>
      {text}
    </span>
  );
}

function TickerPill({ name, cat, slug, src }: { name: string; cat: Cat; slug?: string; src?: string }) {
  const accent = CAT_COLORS[cat];
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "7px 14px", borderRadius: 24,
        background: "var(--card-bg)",
        fontSize: 13, fontWeight: 500, letterSpacing: "-0.01em",
        color: "var(--text-secondary)", whiteSpace: "nowrap",
        userSelect: "none", cursor: "default", flexShrink: 0,
        transition: "background 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.background = "rgba(128,128,128,0.2)";
        el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.background = "var(--card-bg)";
        el.style.boxShadow = "none";
      }}
    >
      {(slug || src) && <ToolCircle slug={slug} src={src} name={name} accent={accent} />}
      {name}
    </span>
  );
}

function TickerStrip({ items, copies, duration, direction, startOffset = 0 }: {
  items: StripItem[];
  copies: number;
  duration: number;
  direction: "left" | "right";
  startOffset?: number;
}) {
  return (
    <div style={{
      overflow: "hidden",
      padding: "16px 0", margin: "-16px 0",
      WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
    }}>
      <div
        style={{
          display: "inline-flex", gap: 10,
          animation: `${direction === "left" ? "ticker-left" : "ticker-right"} ${duration}s linear infinite`,
          animationDelay: startOffset ? `${-duration * startOffset}s` : undefined,
          animationFillMode: "both",
          willChange: "transform",
        }}
        onMouseEnter={e => { e.currentTarget.style.animationPlayState = "paused"; }}
        onMouseLeave={e => { e.currentTarget.style.animationPlayState = "running"; }}
      >
        {Array.from({ length: copies }).flatMap((_, ci) =>
          items.map((item, ii) => {
            const key = `${ci}-${ii}`;
            if (item.kind === "label") return <LabelPill key={key} text={item.text} cat={item.cat} />;
            if (item.kind === "skill") return <TickerPill key={key} name={item.name} cat={item.cat} />;
            return <TickerPill key={key} name={item.name} cat={item.cat} slug={item.slug} src={item.src} />;
          })
        )}
      </div>
    </div>
  );
}

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

const N = testimonials.length;

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
const ModernQuote = ({ size = 42 }: { size?: number }) => (
  <span style={{
    fontFamily: "Georgia, serif",
    fontSize: size,
    lineHeight: 1,
    color: "var(--text-muted)",
    display: "block",
    userSelect: "none",
    opacity: 0.6,
  }}>&ldquo;</span>
);

export default function About() {
  const [isMobile, setIsMobile] = useState(false);

  const [trackPos, setTrackPos] = useState(0);
  const [mobileAnimating, setMobileAnimating] = useState(false);

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

  const desktopCardWidth = desktopWidth > 0 ? Math.floor((desktopWidth - 2 * CARD_GAP) / 3) : 0;

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

      {/* About Me */}
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

      {/* Skills & Tools */}
      <div className="section">
        <h3 className="section-title">Skills & Tools</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8 }}>
          <TickerStrip items={DESIGN_STRIP} copies={2} duration={40} direction="right" />
          <TickerStrip items={AI_DEV_STRIP} copies={2} duration={62} direction="left" startOffset={0.18} />
        </div>
      </div>

      {/* Testimonials */}
      <div className="section">
        <h3 className="section-title">In Their Words</h3>

        {isMobile ? (
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
                    <div style={{ marginBottom: -14 }}><ModernQuote size={34} /></div>
                    <p style={{ fontSize: 16, fontWeight: 400, lineHeight: 1.55, letterSpacing: "-0.01em", color: "var(--text-secondary)", margin: 0 }}>{tc.quote}</p>
                  </div>
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
          <div ref={desktopRef} style={{ position: "relative" }}>
            <div style={{ overflow: "hidden" }}>
              <div style={{ display: "flex", gap: CARD_GAP, transform: `translateX(-${desktopOffset * (desktopCardWidth + CARD_GAP)}px)`, transition: TRANSITION }}>
                {testimonials.map((tc, i) => (
                  <div key={i} style={{ flex: `0 0 ${desktopCardWidth}px`, aspectRatio: "1", background: "var(--card-bg)", borderRadius: 10, padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 16 }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ marginBottom: -18 }}><ModernQuote size={38} /></div>
                      <p style={{ fontSize: 16, fontWeight: 400, lineHeight: 1.55, letterSpacing: "-0.01em", color: "var(--text-secondary)", margin: 0 }}>{tc.quote}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                      <img src={tc.avatar} alt={tc.name} style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: "-0.01em", color: "var(--text-primary)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tc.name}</p>
                        <p style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "-0.01em", margin: "2px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tc.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setDesktopOffset(desktopOffset === 0 ? 1 : 0)}
              style={{ position: "absolute", right: -16, top: "50%", transform: "translateY(-50%)", width: 32, height: 32, borderRadius: "50%", background: "var(--bg)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 1px 6px rgba(0,0,0,0.07)", zIndex: 1 }}
            >
              {desktopOffset === 0 ? <ArrowRight /> : <ArrowLeft />}
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
