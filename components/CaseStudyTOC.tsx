"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { smoothScrollTo } from "@/lib/smoothScroll";

const defaultSections = [
  { id: "toc-problem",    label: "The Problem" },
  { id: "toc-why",        label: "Why It Matters" },
  { id: "toc-solution",   label: "The Solution" },
  { id: "toc-process",    label: "The Process" },
  { id: "toc-principles", label: "Principles" },
  { id: "toc-decisions",  label: "Key Decisions" },
  { id: "toc-usecases",   label: "Edge Cases" },
  { id: "toc-metrics",    label: "Metrics" },
  { id: "toc-next",       label: "What's Next" },
  { id: "toc-reflection", label: "Reflection" },
];

function CaseStudyTOCInner({ sections = defaultSections, variant = "right", ask = false }: { sections?: typeof defaultSections; variant?: "right" | "left"; ask?: boolean }) {
  const [active, setActive]     = useState("");
  const [isWide, setIsWide]     = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ready, setReady]       = useState(false);
  const [askOn, setAskOn]       = useState(false);

  // Ask Devansh rides on the pill as an icon; ?ask shows it without the key, as in AskDevansh.
  useEffect(() => {
    const on = ask || new URLSearchParams(window.location.search).has("ask");
    setAskOn(on);
    document.documentElement.classList.toggle("ask-attached", on && !isWide);
    return () => document.documentElement.classList.remove("ask-attached");
  }, [ask, isWide]);

  // Track screen width. No delay: the list is rendered on <body>, so it no longer needs to wait
  // out the page's entrance, and it fades in with the page (.fixed-enter).
  useEffect(() => {
    const check = () => setIsWide(window.innerWidth >= 1240);
    check();
    setReady(true);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Track active section via scroll position
  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.scrollY + window.innerHeight * 0.25;
      let current = sections[0].id;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= threshold) {
          current = id;
        }
      }
      setActive(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // While the list is open the page holds still, so a swipe on the list can't scroll the page
  // (which closed the list before you could pick anything).
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    if (menuOpen) { lenis?.stop(); document.documentElement.style.overflow = "hidden"; }
    else { lenis?.start(); document.documentElement.style.overflow = ""; }
  }, [menuOpen]);

  // Close menu on scroll (mobile)
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      smoothScrollTo(Math.max(0, top));
    }, 80);
  };

  const activeLabel = sections.find((s) => s.id === active)?.label ?? "Contents";

  if (!ready) return null;

  // ── Desktop sidebar, left (Jahanvi's): under Back, plain words, a dot on the current one ──
  if (isWide && variant === "left") {
    return (
      <nav aria-label="Table of contents" className="cs-toc-left" style={{
        position: "fixed", left: 24, top: 150, zIndex: 50, transition: "opacity .3s var(--ease-out)",
        display: "flex", flexDirection: "column", gap: 2,
      }}>
        {sections.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <button key={id} onClick={() => scrollTo(id)} style={{
              position: "relative", background: "none", border: "none", cursor: "pointer",
              padding: "7px 0 7px 18px", textAlign: "left", whiteSpace: "nowrap",
              fontFamily: "var(--font-manrope)", fontSize: 14, letterSpacing: "-0.011em",
              fontWeight: isActive ? 500 : 400,
              color: isActive ? "var(--text-primary)" : "var(--text-muted)",
              transition: "color 0.3s var(--ease-out)",
            }}>
              {isActive && <span aria-hidden style={{
                position: "absolute", left: 3, top: "50%", width: 5, height: 5, marginTop: -2.5,
                borderRadius: "50%", background: "var(--text-primary)",
              }} />}
              {label}
            </button>
          );
        })}
      </nav>
    );
  }

  // ── Desktop sidebar ──────────────────────────────────────────────
  if (isWide) {
    return (
      <nav
        aria-label="Table of contents"
        style={{
          position: "fixed",
          right: 32,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          borderLeft: "1px solid var(--border)",
        }}
      >
        {sections.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: "none",
                border: "none",
                borderLeft: `2px solid ${isActive ? "var(--text-primary)" : "transparent"}`,
                marginLeft: -1,
                cursor: "pointer",
                padding: "5px 12px",
                textAlign: "left",
              }}
            >
              <span style={{
                fontFamily: "var(--font-inter)",
                fontSize: 14,
                letterSpacing: "-0.011em",
                color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                fontWeight: isActive ? 600 : 400,
                opacity: 1,
                transition: "color 0.3s var(--ease-out), opacity 0.3s var(--ease-out)",
                whiteSpace: "nowrap",
                display: "block",
              }}>
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    );
  }

  // ── Mobile bottom pill + slide-up sheet ──────────────────────────
  return (
    <>
      {/* Backdrop */}
      {/* Always rendered so it can fade, instead of popping in */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 48,
          background: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.5s var(--ease-out)",
        }}
      />

      {/* Bottom sheet */}
      <div
        data-lenis-prevent
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 49,
          background: "var(--raised)",
          borderTop: "1px solid var(--border)",
          borderRadius: "var(--r-lg) var(--r-lg) 0 0",
          padding: "12px 0 calc(96px + env(safe-area-inset-bottom)) 0",   // last rows clear the pill and Safari's toolbar
          transform: menuOpen ? "translateY(0)" : "translateY(110%)",
          transition: "transform 0.6s var(--ease-sheet)",
          maxHeight: "80dvh",
          overflowY: "auto",
          overscrollBehavior: "contain",
        }}
      >
        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: 16 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "var(--border)" }} />
        </div>

        {/* Title */}
        <p style={{
          fontFamily: "var(--font-manrope)",
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "-0.011em",
          color: "var(--text-muted)",
          margin: "0 0 8px 0",
          padding: "0 24px",
        }}>
          Contents
        </p>

        {/* Section links */}
        {sections.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "13px 24px",
                textAlign: "left",
              }}
            >
              <span style={{
                fontFamily: "var(--font-manrope)",
                fontSize: 16,
                fontWeight: isActive ? 700 : 400,
                color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                letterSpacing: "-0.02em",
              }}>
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Floating pill: the contents list, with Ask Devansh joined on as an icon (Devansh, 15 Sep) */}
      <div style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        height: 44,
        background: "var(--text-primary)",
        borderRadius: 100,
        boxShadow: "var(--shadow-float)",
      }}>
      <button
        onClick={() => setMenuOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          height: "100%",
          padding: askOn ? "0 14px 0 18px" : "0 18px",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        {/* Hamburger / close icon */}
        <span style={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: "block",
              width: menuOpen && i === 1 ? 0 : menuOpen ? 12 : [12, 8, 12][i],
              height: 1.5,
              borderRadius: 2,
              background: "var(--raised)",
              transition: "width 0.5s var(--ease-out)",
              transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(3px, 3px)" : i === 2 ? "rotate(-45deg) translate(3px, -3px)" : "none") : "none",
            }} />
          ))}
        </span>
        <span style={{
          fontFamily: "var(--font-manrope)",
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "-0.011em",
          color: "var(--bg)",
          whiteSpace: "nowrap",
          maxWidth: 140,
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {menuOpen ? "Close" : activeLabel}
        </span>
      </button>
      {askOn && (
        <>
          <span aria-hidden style={{ width: 1, height: 20, background: "var(--bg)", opacity: 0.2 }} />
          <button
            aria-label="Ask Devansh"
            onClick={() => { setMenuOpen(false); window.dispatchEvent(new Event("ask:open")); }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 50, height: "100%", paddingRight: 4,
              background: "none", border: "none", cursor: "pointer", color: "var(--bg)",
            }}
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z" />
            </svg>
          </button>
        </>
      )}
      </div>
    </>
  );
}

// Rendered on <body>: the page wrapper's enter animation leaves a transform, and a transformed
// ancestor makes "position: fixed" follow the content column instead of the screen.
export default function CaseStudyTOC(props: Parameters<typeof CaseStudyTOCInner>[0]) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? createPortal(<div className="fixed-enter"><CaseStudyTOCInner {...props} /></div>, document.body) : null;
}
