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

const shimmerStyle: React.CSSProperties = {
  position: "absolute", top: 0, left: "-60%", width: "50%", height: "100%",
  background: "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.2) 20%, rgba(255,255,255,0.5), rgba(255,255,255,0))",
  pointerEvents: "none", transition: "none",
};

function NavShimmerLink({ href, children, onClick, target, rel }: {
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  target?: string;
  rel?: string;
}) {
  const shimmerRef = useRef<HTMLSpanElement>(null);
  const linkStyle: React.CSSProperties = {
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: "14px", fontWeight: 600, letterSpacing: "-0.01em",
    textTransform: "uppercase", color: "var(--text-muted)",
    lineHeight: "1", position: "relative", overflow: "hidden",
    display: "inline-block",
  };
  return (
    <Link href={href} style={linkStyle} onClick={onClick} target={target} rel={rel}
      onMouseEnter={() => {
        if (shimmerRef.current) {
          shimmerRef.current.style.transition = "none";
          shimmerRef.current.style.left = "-60%";
          void shimmerRef.current.offsetWidth;
          shimmerRef.current.style.transition = "left 0.6s ease-out";
          shimmerRef.current.style.left = "110%";
        }
      }}
      onMouseLeave={() => {
        if (shimmerRef.current) {
          shimmerRef.current.style.transition = "none";
          shimmerRef.current.style.left = "-60%";
        }
      }}
    >
      <span ref={shimmerRef} aria-hidden="true" style={shimmerStyle} />
      {children}
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
      document.getElementById("recent-work")?.scrollIntoView({ behavior: "smooth" });
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
          onMouseEnter={() => { if (nameRef.current) nameRef.current.style.opacity = "0"; if (hoverRef.current) hoverRef.current.style.opacity = "1"; }}
          onMouseLeave={() => { if (nameRef.current) nameRef.current.style.opacity = "1"; if (hoverRef.current) hoverRef.current.style.opacity = "0"; }}
        >
          <span className="header-shimmer" aria-hidden="true" />
          <span ref={nameRef} style={{ transition: "opacity 0.15s" }}>Devansh Somvanshi</span>
          <span ref={hoverRef} style={{ position: "absolute", left: 0, opacity: 0, transition: "opacity 0.15s", whiteSpace: "nowrap" }}>Hey there!</span>
        </Link>

        {/* isMobile=null means not yet measured — render nothing to avoid flash */}
        {isMobile === false && (
          <nav className="nav-links">
            <NavShimmerLink href="/#recent-work" onClick={scrollToWork}>Work</NavShimmerLink>
            <NavShimmerLink href="/about">About</NavShimmerLink>
            <NavShimmerLink href="https://drive.google.com/file/d/1xA0DnODA92bD-NuVYvKs31syY_7wmwWc/view?usp=sharing" target="_blank" rel="noopener noreferrer">Resume</NavShimmerLink>
            <button onClick={toggleTheme} aria-label="Toggle theme"
              style={{ background: "none", border: "none", padding: 0, color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", transition: "color 0.2s" }}
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
