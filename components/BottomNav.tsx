"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { playDockClick } from "@/lib/dockSound";
import { House, Briefcase, User, FileText, Sun, Moon } from "@phosphor-icons/react";

/* Icons: Phosphor, Fill weight (MIT), the one icon set used across the site. */
const IC = { size: 22, weight: "fill" as const };
function HomeIcon() { return <House {...IC} />; }
function WorkIcon() { return <Briefcase {...IC} />; }
function AboutIcon() { return <User {...IC} />; }
function ResumeIcon() { return <FileText {...IC} />; }
function SunIcon() { return <Sun {...IC} />; }
function MoonIcon() { return <Moon {...IC} />; }

const RESUME_URL = "https://drive.google.com/file/d/1iIkDZW26ryQ-rZq2ZDsd5e6rqMfPyctX/view?usp=drive_link";

function DockItem({ label, hovered, pitch, onHover, children }: {
  label: string; hovered: boolean; pitch: number; onHover: (v: boolean) => void; children: React.ReactNode;
}) {
  return (
    <span
      style={{ position: "relative", display: "inline-flex" }}
      onPointerDown={() => playDockClick(pitch)}
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
        transition: "opacity 0.15s ease, transform 0.26s cubic-bezier(0.16, 1, 0.3, 1)",
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

  // Hidden on the RedBus case study at Devansh's request: the contents list and Ask Devansh sit there.
  if (pathname === "/work/redbus") return null;

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
        <DockItem label="Home" pitch={1} hovered={hovered === "home"} onHover={v => setHovered(v ? "home" : null)}><HomeIcon /></DockItem>
      </Link>
      <Link href="/#recent-work" aria-label="Work" onClick={scrollToWork} style={{ display: "inline-flex" }}>
        <DockItem label="Work" pitch={1.06} hovered={hovered === "work"} onHover={v => setHovered(v ? "work" : null)}><WorkIcon /></DockItem>
      </Link>
      <Link href="/about" aria-label="About" style={{ display: "inline-flex" }}>
        <DockItem label="About" pitch={1.12} hovered={hovered === "about"} onHover={v => setHovered(v ? "about" : null)}><AboutIcon /></DockItem>
      </Link>
      <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" aria-label="Resume" style={{ display: "inline-flex" }}>
        <DockItem label="Resume" pitch={1.19} hovered={hovered === "resume"} onHover={v => setHovered(v ? "resume" : null)}><ResumeIcon /></DockItem>
      </a>
      <span onClick={toggleTheme} style={{ display: "inline-flex" }}>
        <DockItem label="Theme" pitch={1.26} hovered={hovered === "theme"} onHover={v => setHovered(v ? "theme" : null)}>
          {isDark ? <MoonIcon /> : <SunIcon />}
        </DockItem>
      </span>
    </nav>
  );
}
