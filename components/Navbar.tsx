"use client";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SunIcon({ size = 16, opacity = 1 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" style={{ opacity, transition: "opacity 0.3s ease", position: "absolute", color: "inherit" }}>
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="7.07" y2="7.07" />
      <line x1="19.07" y1="4.93" x2="16.93" y2="7.07" />
      <line x1="4.93" y1="19.07" x2="7.07" y2="16.93" />
      <line x1="19.07" y1="19.07" x2="16.93" y2="16.93" />
    </svg>
  );
}

function ArrowUpRight({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-flex", verticalAlign: "middle", marginLeft: 4, position: "relative", top: "-0.05em" }}>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function MoonIcon({ size = 16, opacity = 1 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" style={{ opacity, transition: "opacity 0.3s ease", position: "absolute", color: "inherit" }}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function NavLink({ href, children, onClick, target, rel, isActive }: {
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  target?: string;
  rel?: string;
  isActive?: boolean;
}) {
  const underlineRef = useRef<HTMLSpanElement>(null);
  const linkStyle: React.CSSProperties = {
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: "14px", fontWeight: 600, letterSpacing: "-0.01em",
    textTransform: "uppercase", color: isActive ? "var(--text-primary)" : "var(--text-muted)",
    lineHeight: "1", position: "relative",
    display: "inline-block", transition: "color 0.2s",
    paddingBottom: "6px", overflow: "hidden",
  };
  return (
    <Link href={href} style={linkStyle} onClick={onClick} target={target} rel={rel}
      onMouseEnter={() => {
        if (underlineRef.current) {
          underlineRef.current.style.left = "0";
          underlineRef.current.style.transition = "left 0.25s ease-out";
        }
      }}
      onMouseLeave={() => {
        if (underlineRef.current && !isActive) {
          underlineRef.current.style.transition = "none";
          underlineRef.current.style.left = "-100%";
        }
      }}
    >
      {children}
      <span ref={underlineRef} aria-hidden="true" style={{
        position: "absolute", bottom: "2px", left: isActive ? "0" : "-100%", height: "1.4px",
        background: isActive ? "var(--text-primary)" : "var(--text-muted)", width: "100%", transition: "none", borderRadius: "2px",
      }} />
    </Link>
  );
}

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  const bar: React.CSSProperties = {
    position: "absolute", display: "block",
    height: 1.7, width: "80%",
    background: "var(--text-muted)", borderRadius: 2,
  };
  return (
    <div style={{ width: 18, height: 12, position: "relative" }}>
      <span style={{ ...bar, top: isOpen ? "50%" : 0, transform: isOpen ? "translateY(-50%) rotate(45deg)" : "none", transition: "top 0.25s ease, transform 0.25s ease" }} />
      <span style={{ ...bar, top: "50%", transform: "translateY(-50%)", opacity: isOpen ? 0 : 1, transition: "opacity 0.15s ease" }} />
      <span style={{ ...bar, bottom: isOpen ? "50%" : 0, transform: isOpen ? "translateY(50%) rotate(-45deg)" : "none", transition: "bottom 0.25s ease, transform 0.25s ease" }} />
    </div>
  );
}

const FULL_NAME = "Devansh Somvanshi";
const HOVER_TEXT = "Hey there!";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isIconsHovered, setIsIconsHovered] = useState(false);
  const pathname = usePathname();

  const [displayedName, setDisplayedName] = useState("");
  const [displayedHover, setDisplayedHover] = useState("");
  const [nameCursor, setNameCursor] = useState(true);
  const [hoverCursor, setHoverCursor] = useState(false);
  const [nameVisible, setNameVisible] = useState(true);
  const [hoverVisible, setHoverVisible] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nameLenRef = useRef(0);
  const hoverLenRef = useRef(0);
  const hoveredOnHome = useRef(false);

  useLayoutEffect(() => {
    const mql = window.matchMedia("(max-width: 640px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      if (!e.matches) setIsMenuOpen(false);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useLayoutEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    setHoverVisible(false);
    setHoverCursor(false);
    setDisplayedHover("");
    hoverLenRef.current = 0;
  }, [pathname]);

  const clearTimer = () => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  };

  const charDelay = (char: string, prevChar: string): number => {
    const jitter = Math.random() * 50;
    if (prevChar === ' ') return 145 + jitter; // first char of new word — cognitive pause
    if (char === ' ') return 115 + jitter;     // space — slight hesitation
    if ('!.,?'.includes(char)) return 70 + jitter; // punctuation — quick muscle memory
    return 88 + jitter; // normal character
  };

  const animate = (
    full: string,
    fromLen: number,
    toLen: number,
    lenRef: React.MutableRefObject<number>,
    setState: (s: string) => void,
    onDone?: () => void
  ) => {
    clearTimer();
    let i = fromLen;

    const step = () => {
      i += 1;
      lenRef.current = i;
      setState(full.slice(0, i));
      if (i === toLen) { onDone?.(); return; }
      const nextChar = full[i];
      const prevChar = full[i - 1] ?? '';
      timerRef.current = setTimeout(step, charDelay(nextChar, prevChar));
    };

    timerRef.current = setTimeout(step, charDelay(full[fromLen] ?? '', ''));
  };

  // Type name on mount
  useEffect(() => {
    setNameCursor(true);
    animate(FULL_NAME, 0, FULL_NAME.length, nameLenRef, setDisplayedName, () => {
      setNameCursor(false);
    });
    return clearTimer;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseEnter = () => {
    if (pathname !== "/") { hoveredOnHome.current = false; return; }
    hoveredOnHome.current = true;
    setNameCursor(false);
    setNameVisible(false);
    setHoverVisible(true);
    setHoverCursor(true);
    hoverLenRef.current = 0;
    setDisplayedHover("");
    animate(HOVER_TEXT, 0, HOVER_TEXT.length, hoverLenRef, setDisplayedHover, () => {
      setHoverCursor(false);
    });
  };

  const handleMouseLeave = () => {
    if (!hoveredOnHome.current) return;
    hoveredOnHome.current = false;
    setHoverVisible(false);
    setHoverCursor(false);
    setNameVisible(true);
    nameLenRef.current = 0;
    setDisplayedName("");
    setNameCursor(true);
    animate(FULL_NAME, 0, FULL_NAME.length, nameLenRef, setDisplayedName, () => {
      setNameCursor(false);
    });
  };

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("nerd-mode", next);
  };

  const scrollToWork = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      setIsMenuOpen(false);
      const el = document.getElementById("recent-work");
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 48;
        window.scrollTo({ top, behavior: "smooth" });
      }
    } else {
      setIsMenuOpen(false);
    }
  };

  const overlayLinkStyle: React.CSSProperties = {
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: "28px", fontWeight: 600, letterSpacing: "-0.02em",
    textTransform: "uppercase", color: "var(--text-muted)",
    position: "relative", overflow: "hidden", display: "inline-block",
  };

  return (
    <>
      <header className="site-header">
        <Link href="/" className="header-left"
          style={{ lineHeight: "1", display: "inline-flex", alignItems: "center", position: "relative", zIndex: 1001, visibility: isMobile && isMenuOpen ? "hidden" : "visible" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Ghost span keeps link width constant */}
          <span aria-hidden style={{ opacity: 0, userSelect: "none", pointerEvents: "none" }}>{FULL_NAME}</span>
          {/* Animated name */}
          <span style={{ position: "absolute", left: 0, whiteSpace: "nowrap", opacity: nameVisible ? 1 : 0, transition: "opacity 0.18s ease" }}>
            {displayedName}
            {nameCursor && <span className="typing-cursor" />}
          </span>
          {/* Hover text */}
          {pathname === "/" && (
            <span style={{ position: "absolute", left: 0, whiteSpace: "nowrap", opacity: hoverVisible ? 1 : 0, transition: "opacity 0.18s ease" }}>
              {displayedHover}
              {hoverCursor && <span className="typing-cursor" />}
            </span>
          )}
        </Link>

        {isMobile === false && (
          <nav className="nav-links">
            <NavLink href="/#recent-work" onClick={scrollToWork}>Work</NavLink>
            <NavLink href="/about" isActive={pathname === "/about"}>About</NavLink>
            <NavLink href="https://drive.google.com/file/d/1xA0DnODA92bD-NuVYvKs31syY_7wmwWc/view?usp=sharing" target="_blank" rel="noopener noreferrer">Resume<ArrowUpRight size={13} /></NavLink>
            <button onClick={toggleTheme} aria-label="Toggle theme"
              style={{ background: "none", border: "none", padding: 0, paddingBottom: "6px", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: "1", position: "relative", width: 16, height: 16 }}
            >
              <SunIcon opacity={isDark ? 0 : 1} />
              <MoonIcon opacity={isDark ? 1 : 0} />
            </button>
          </nav>
        )}

        {isMobile === true && (
          <div style={{ display: "flex", alignItems: "center", gap: 16, zIndex: 1001, color: isIconsHovered ? "var(--text-primary)" : "var(--text-muted)", transition: "color 0.2s" }}
            onMouseEnter={() => setIsIconsHovered(true)}
            onMouseLeave={() => setIsIconsHovered(false)}
          >
            <button onClick={toggleTheme} aria-label="Toggle theme"
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", width: 16, height: 16, color: "var(--text-muted)" }}
            >
              <SunIcon opacity={isDark ? 0 : 1} />
              <MoonIcon opacity={isDark ? 1 : 0} />
            </button>
            <button onClick={() => setIsMenuOpen(p => !p)} aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              style={{ background: "none", border: "none", padding: "4px", cursor: "pointer", display: "flex", alignItems: "center", position: "relative", color: "inherit" }}
            >
              <HamburgerIcon isOpen={isMenuOpen} />
            </button>
          </div>
        )}
      </header>

      {isMobile === true && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "var(--bg)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 40,
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}>
          <Link href="/#recent-work" style={overlayLinkStyle} onClick={scrollToWork}>Work</Link>
          <Link href="/about" style={overlayLinkStyle}>About</Link>
          <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
            <a href="https://drive.google.com/file/d/1xA0DnODA92bD-NuVYvKs31syY_7wmwWc/view?usp=sharing"
              style={overlayLinkStyle} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>
              Resume
            </a>
            <span style={{ position: "absolute", left: "100%", marginLeft: 2, display: "flex", alignItems: "center", color: "var(--text-muted)" }}><ArrowUpRight size={22} /></span>
          </div>
        </div>
      )}
    </>
  );
}
