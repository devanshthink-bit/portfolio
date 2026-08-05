"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* Lucide icon set (MIT) — reproduced inline to avoid adding a dependency */
const ICON = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function HomeIcon() {
  return <svg {...ICON}>
    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>;
}
function WorkIcon() {
  return <svg {...ICON}>
    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    <rect width="20" height="14" x="2" y="6" rx="2" />
  </svg>;
}
function AboutIcon() {
  return <svg {...ICON}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>;
}
function ResumeIcon() {
  return <svg {...ICON}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </svg>;
}
function SunIcon() {
  return <svg {...ICON}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" /><path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" /><path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
  </svg>;
}
function MoonIcon() {
  return <svg {...ICON}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>;
}

const RESUME_URL = "https://drive.google.com/file/d/1iIkDZW26ryQ-rZq2ZDsd5e6rqMfPyctX/view?usp=drive_link";

function DockItem({ label, hovered, onHover, children }: {
  label: string; hovered: boolean; onHover: (v: boolean) => void; children: React.ReactNode;
}) {
  return (
    <span
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {/* Tooltip — fade + slide-up with a subtle spring pop, like the reference */}
      <span style={{
        position: "absolute", bottom: "calc(100% + 18px)", left: "50%",
        transformOrigin: "bottom center",
        transform: hovered
          ? "translateX(-50%) translateY(0) scale(1)"
          : "translateX(-50%) translateY(6px) scale(0.92)",
        background: "#0f1108", color: "#fff", fontSize: 12, fontWeight: 500,
        lineHeight: 1, padding: "6px 9px", borderRadius: 8, whiteSpace: "nowrap",
        pointerEvents: "none", opacity: hovered ? 1 : 0,
        transition: "opacity 0.15s ease, transform 0.24s cubic-bezier(0.34, 1.56, 0.64, 1)",
        userSelect: "none",
      }}>
        {label}
      </span>
      <span style={{
        position: "relative",
        width: 40, height: 40,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        color: "#fff",
      }}>
        <span style={{
          position: "absolute", inset: 0,
          borderRadius: 8,
          background: "rgb(23, 23, 23)",
          boxShadow: "0px 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 4px 12px 0px rgba(0, 0, 0, 0.03)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.15s ease",
        }} />
        <span style={{ position: "relative", display: "inline-flex" }}>
          {children}
        </span>
      </span>
    </span>
  );
}

export default function BottomNav() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("nerd-mode", next);
  };

  const scrollToWork = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("recent-work");
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 40, behavior: "smooth" });
    }
  };

  return (
    <nav
      className="bottom-dock"
      onMouseEnter={() => window.dispatchEvent(new Event("cursor:hide"))}
      onMouseLeave={() => { window.dispatchEvent(new Event("cursor:show")); setHovered(null); }}
      style={{
        position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
        zIndex: 1000, display: "flex", gap: 16, alignItems: "center",
        background: "#2e2e2e", padding: 12, borderRadius: 100,
      }}
    >
      <Link href="/" aria-label="Home" style={{ display: "inline-flex" }}>
        <DockItem label="Home" hovered={hovered === "home"} onHover={v => setHovered(v ? "home" : null)}><HomeIcon /></DockItem>
      </Link>
      <Link href="/#recent-work" aria-label="Work" onClick={scrollToWork} style={{ display: "inline-flex" }}>
        <DockItem label="Work" hovered={hovered === "work"} onHover={v => setHovered(v ? "work" : null)}><WorkIcon /></DockItem>
      </Link>
      <Link href="/about" aria-label="About" style={{ display: "inline-flex" }}>
        <DockItem label="About" hovered={hovered === "about"} onHover={v => setHovered(v ? "about" : null)}><AboutIcon /></DockItem>
      </Link>
      <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" aria-label="Resume" style={{ display: "inline-flex" }}>
        <DockItem label="Resume" hovered={hovered === "resume"} onHover={v => setHovered(v ? "resume" : null)}><ResumeIcon /></DockItem>
      </a>
      <span onClick={toggleTheme} style={{ display: "inline-flex" }}>
        <DockItem label="Theme" hovered={hovered === "theme"} onHover={v => setHovered(v ? "theme" : null)}>
          {isDark ? <MoonIcon /> : <SunIcon />}
        </DockItem>
      </span>
    </nav>
  );
}
