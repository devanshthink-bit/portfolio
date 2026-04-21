"use client";
import { useState, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SunIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

function MoonIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        position: "absolute", bottom: "2px", left: isActive ? "0" : "-100%", height: "1px",
        background: "var(--text-muted)", width: "100%", transition: "none",
      }} />
    </Link>
  );
}

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  const bar: React.CSSProperties = {
    position: "absolute", display: "block",
    height: 2, width: "100%",
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

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const pathname = usePathname();

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

  // Close menu on route change
  useLayoutEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

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

  const nameRef = useRef<HTMLSpanElement>(null);
  const hoverRef = useRef<HTMLSpanElement>(null);

  const overlayLinkStyle: React.CSSProperties = {
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: "22px", fontWeight: 600, letterSpacing: "-0.02em",
    textTransform: "uppercase", color: "var(--text-muted)",
    position: "relative", overflow: "hidden", display: "inline-block",
  };

  return (
    <>
      <header className="site-header">
        <Link href="/" className="header-left"
          style={{ lineHeight: "1", display: "flex", alignItems: "center", position: "relative", zIndex: 1001 }}
          onMouseEnter={() => { if (pathname === "/" && nameRef.current) nameRef.current.style.opacity = "0"; if (pathname === "/" && hoverRef.current) hoverRef.current.style.opacity = "1"; }}
          onMouseLeave={() => { if (pathname === "/" && nameRef.current) nameRef.current.style.opacity = "1"; if (pathname === "/" && hoverRef.current) hoverRef.current.style.opacity = "0"; }}
        >
          <span ref={nameRef} style={{ transition: "opacity 0.15s" }}>Devansh Somvanshi</span>
          {pathname === "/" && <span ref={hoverRef} style={{ position: "absolute", left: 0, opacity: 0, transition: "opacity 0.15s", whiteSpace: "nowrap" }}>Hey there!</span>}
        </Link>

        {/* isMobile=null means not yet measured — render nothing to avoid flash */}
        {isMobile === false && (
          <nav className="nav-links">
            <NavLink href="/#recent-work" onClick={scrollToWork}>Work</NavLink>
            <NavLink href="/about" isActive={pathname === "/about"}>About</NavLink>
            <NavLink href="https://drive.google.com/file/d/1xA0DnODA92bD-NuVYvKs31syY_7wmwWc/view?usp=sharing" target="_blank" rel="noopener noreferrer">Resume</NavLink>
            <button onClick={toggleTheme} aria-label="Toggle theme"
              style={{ background: "none", border: "none", padding: 0, paddingBottom: "6px", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "color 0.2s", lineHeight: "1" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
            >
              {isDark ? <MoonIcon /> : <SunIcon />}
            </button>
          </nav>
        )}

        {isMobile === true && (
          <button onClick={() => setIsMenuOpen(p => !p)} aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            style={{ background: "none", border: "none", padding: "4px", cursor: "pointer", display: "flex", alignItems: "center", position: "relative", zIndex: 1001 }}
          >
            <HamburgerIcon isOpen={isMenuOpen} />
          </button>
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
          <a href="https://drive.google.com/file/d/1xA0DnODA92bD-NuVYvKs31syY_7wmwWc/view?usp=sharing"
            style={overlayLinkStyle} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>Resume</a>
          <button onClick={toggleTheme} aria-label="Toggle theme"
            style={{ ...overlayLinkStyle, background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            {isDark ? <MoonIcon size={22} /> : <SunIcon size={22} />}
          </button>
        </div>
      )}
    </>
  );
}
