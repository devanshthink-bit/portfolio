"use client";
import { useState, useRef } from "react";

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("nerd-mode");
    } else {
      document.documentElement.classList.remove("nerd-mode");
    }
  };

  const scrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("recent-work")?.scrollIntoView({ behavior: "smooth" });
  };

  const linkStyle: React.CSSProperties = {
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: "14px",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    textTransform: "uppercase",
    color: "var(--text-muted)",
    transition: "color 0.2s",
  };

  const nameRef = useRef<HTMLSpanElement>(null);
  const hoverRef = useRef<HTMLSpanElement>(null);

  return (
    <header className="site-header">
      <a
        href="/"
        className="header-left"
        onMouseEnter={() => {
          if (nameRef.current) nameRef.current.style.opacity = "0";
          if (hoverRef.current) hoverRef.current.style.opacity = "1";
        }}
        onMouseLeave={() => {
          if (nameRef.current) nameRef.current.style.opacity = "1";
          if (hoverRef.current) hoverRef.current.style.opacity = "0";
        }}
      >
        <span className="header-shimmer" aria-hidden="true" />
        <span ref={nameRef} style={{ transition: "opacity 0.15s" }}>Devansh Somvanshi</span>
        <span ref={hoverRef} style={{ position: "absolute", left: 0, opacity: 0, transition: "opacity 0.15s", whiteSpace: "nowrap" }}>Hey there!</span>
      </a>

      <nav className="nav-links">
        <a href="#recent-work" style={linkStyle} onClick={scrollToWork}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}>Work</a>
        <a href="/about" style={linkStyle}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}>About</a>
        <a
          href="https://drive.google.com/file/d/1xA0DnODA92bD-NuVYvKs31syY_7wmwWc/view?usp=sharing"
          style={linkStyle}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}

          target="_blank"
          rel="noopener noreferrer"
        >
          Resume
        </a>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          style={{ background: "none", border: "none", padding: 0, color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", transition: "color 0.2s" }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted))")}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </nav>
    </header>
  );
}
