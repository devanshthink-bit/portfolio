"use client";
import { useEffect, useState } from "react";

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

export default function CaseStudyTOC({ sections = defaultSections }: { sections?: typeof defaultSections }) {
  const [active, setActive]     = useState("");
  const [isWide, setIsWide]     = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ready, setReady]       = useState(false);

  // Track screen width — delay render to avoid flash
  useEffect(() => {
    const check = () => setIsWide(window.innerWidth >= 1360);
    const t = setTimeout(() => {
      check();
      setReady(true);
      window.addEventListener("resize", check);
    }, 350);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", check);
    };
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
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }, 80);
  };

  const activeLabel = sections.find((s) => s.id === active)?.label ?? "Contents";

  if (!ready) return null;

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
                fontFamily: "var(--font-geist-mono)",
                fontSize: 10,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                fontWeight: isActive ? 600 : 400,
                opacity: 1,
                transition: "color 0.2s ease, opacity 0.2s ease",
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
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 48,
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* Bottom sheet */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 49,
          background: "var(--bg)",
          borderTop: "1px solid var(--border)",
          borderRadius: "16px 16px 0 0",
          padding: "12px 0 40px 0",
          transform: menuOpen ? "translateY(0)" : "translateY(110%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          maxHeight: "75vh",
          overflowY: "auto",
        }}
      >
        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: 16 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "var(--border)" }} />
        </div>

        {/* Title */}
        <p style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          margin: "0 0 12px 0",
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
                borderLeft: `3px solid ${isActive ? "var(--text-primary)" : "transparent"}`,
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

      {/* Floating pill button */}
      <button
        onClick={() => setMenuOpen((o) => !o)}
        style={{
          position: "fixed",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 18px",
          background: "var(--text-primary)",
          border: "none",
          borderRadius: 100,
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateX(-50%) scale(1.04)";
          e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.22)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateX(-50%) scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.18)";
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
              background: "var(--bg)",
              transition: "width 0.2s ease",
              transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(3px, 3px)" : i === 2 ? "rotate(-45deg) translate(3px, -3px)" : "none") : "none",
            }} />
          ))}
        </span>
        <span style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--bg)",
          whiteSpace: "nowrap",
          maxWidth: 140,
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {menuOpen ? "Close" : activeLabel}
        </span>
      </button>
    </>
  );
}
