"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { playDockClick } from "@/lib/dockSound";
import { smoothScrollTo } from "@/lib/smoothScroll";

/* Dock icons: Solar Linear by 480 Design (CC BY 4.0), exact shapes from @iconify-json/solar.
   Drawn at a stroke of 2 with round caps and joins, as Devansh picked on 14 Sep 2026. Dock only. */
function Solar({ body }: { body: string }) {
  return <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden dangerouslySetInnerHTML={{ __html: body }} />;
}
// The home mark: a lowercase "ds." in Instrument Serif Italic, sized to sit with the 22px icons.
function HomeIcon() {
  return (
    <span aria-hidden style={{ fontFamily: "var(--font-instrument), Georgia, serif", fontStyle: "italic", fontSize: 26, lineHeight: 1, letterSpacing: "0.01em", display: "block", marginTop: -2 }}>
      ds.
    </span>
  );
}
function WorkIcon() { return <Solar body={"<g fill=\"none\" stroke=\"currentColor\"><path d=\"M14 6H10C8.64413 6 7.53199 6 6.60915 6.05445C4.96519 6.15144 3.92193 6.42122 3.17157 7.17157C2 8.34315 2 10.2288 2 14C2 17.7712 2 19.6569 3.17157 20.8284C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.8284C22 19.6569 22 17.7712 22 14C22 10.2288 22 8.34315 20.8284 7.17157C20.0781 6.42122 19.0348 6.15144 17.3909 6.05445C16.468 6 15.3559 6 14 6Z\"/><path d=\"M6.60938 6.05445C7.43282 6.03358 8.15925 5.45491 8.43944 4.68032C8.44806 4.65649 8.4569 4.62999 8.47457 4.57697L8.50023 4.5C8.54241 4.37344 8.56351 4.31014 8.58608 4.254C8.87427 3.53712 9.54961 3.05037 10.3208 3.00366C10.3812 3 10.4479 3 10.5814 3H13.4191C13.5525 3 13.6192 3 13.6796 3.00366C14.4508 3.05037 15.1262 3.53712 15.4144 4.254C15.4369 4.31014 15.458 4.37343 15.5002 4.5L15.5259 4.57697C15.5435 4.62992 15.5524 4.65651 15.561 4.68032C15.8412 5.45491 16.5676 6.03358 17.3911 6.05445\"/><path stroke-linecap=\"round\" d=\"M21.6618 8.71973C18.6519 10.6761 17.147 11.6543 15.5605 12.1472C13.2416 12.8677 10.7586 12.8677 8.43963 12.1472C6.85313 11.6543 5.34822 10.6761 2.33838 8.71973\"/><path stroke-linecap=\"round\" d=\"M8 11V13\"/><path stroke-linecap=\"round\" d=\"M16 11V13\"/></g>"} />; }
function AboutIcon() { return <Solar body={"<g fill=\"none\" stroke=\"currentColor\"><circle cx=\"12\" cy=\"6\" r=\"4\"/><ellipse cx=\"12\" cy=\"17\" rx=\"7\" ry=\"4\"/></g>"} />; }
// Shared with the download button on /resume.
export const RESUME_ICON = "<g fill=\"none\" stroke=\"currentColor\"><path d=\"M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z\"/><path stroke-linecap=\"round\" d=\"M8 12H16\"/><path stroke-linecap=\"round\" d=\"M8 8H16\"/><path stroke-linecap=\"round\" d=\"M8 16H13\"/></g>";
function ResumeIcon() { return <Solar body={RESUME_ICON} />; }
function SunIcon() { return <Solar body={"<g fill=\"none\" stroke=\"currentColor\"><circle cx=\"12\" cy=\"12\" r=\"5\"/><path stroke-linecap=\"round\" d=\"M12 2V4\"/><path stroke-linecap=\"round\" d=\"M12 20V22\"/><path stroke-linecap=\"round\" d=\"M4 12L2 12\"/><path stroke-linecap=\"round\" d=\"M22 12L20 12\"/><path stroke-linecap=\"round\" d=\"M19.7778 4.22266L17.5558 6.25424\"/><path stroke-linecap=\"round\" d=\"M4.22217 4.22266L6.44418 6.25424\"/><path stroke-linecap=\"round\" d=\"M6.44434 17.5557L4.22211 19.7779\"/><path stroke-linecap=\"round\" d=\"M19.7778 19.7773L17.5558 17.5551\"/></g>"} />; }
// Solar moon-fog-linear, without its two sparkles (as Devansh picked it, 15 Sep 2026).
function MoonIcon() { return <Solar body={"<g fill=\"none\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M8 22H16\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M5 19H19\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M2 16H22\"/><path stroke-linejoin=\"round\" d=\"M21.1679 16C21.7031 14.7751 22 13.4222 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 13.4222 2.2969 14.7751 2.83209 16\"/></g>"} />; }

/* The dock's outline: a 24px radius at Figma's 100% corner smoothing, straight edges.
   Same maths as figma-squircle (MIT), drawn to the dock's measured size. */
function squirclePath(w: number, h: number, radius = 24, smoothing = 1) {
  const budget = Math.min(w, h) / 2;
  const R = Math.min(radius, budget);
  const rad = (deg: number) => (deg * Math.PI) / 180;
  let p = (1 + smoothing) * R;
  const arcMeasure = 90 * (1 - smoothing);
  const arc = Math.sin(rad(arcMeasure / 2)) * R * Math.SQRT2;
  const alpha = (90 - arcMeasure) / 2;
  const p3ToP4 = R * Math.tan(rad(alpha / 2));
  const beta = 45 * smoothing;
  const c = p3ToP4 * Math.cos(rad(beta));
  const d = c * Math.tan(rad(beta));
  let b = (p - arc - c - d) / 3;
  let a = 2 * b;
  if (p > budget) {
    const room = budget - d - arc - c;
    b = Math.min(b, room - room / 6);
    a = room - b;
    p = budget;
  }
  const ab = a + b, abc = a + b + c, bc = b + c;
  return [
    `M${w - p},0`,
    `c${a},0 ${ab},0 ${abc},${d}`, `a${R},${R} 0 0 1 ${arc},${arc}`, `c${d},${c} ${d},${bc} ${d},${abc}`,
    `L${w},${h - p}`,
    `c0,${a} 0,${ab} ${-d},${abc}`, `a${R},${R} 0 0 1 ${-arc},${arc}`, `c${-c},${d} ${-bc},${d} ${-abc},${d}`,
    `L${p},${h}`,
    `c${-a},0 ${-ab},0 ${-abc},${-d}`, `a${R},${R} 0 0 1 ${-arc},${-arc}`, `c${-d},${-c} ${-d},${-bc} ${-d},${-abc}`,
    `L0,${p}`,
    `c0,${-a} 0,${-ab} ${d},${-abc}`, `a${R},${R} 0 0 1 ${arc},${-arc}`, `c${c},${-d} ${bc},${-d} ${abc},${-d}`,
    "Z",
  ].join(" ");
}

/* The dock has a fixed size, so both outlines ship in the HTML and CSS picks one:
   no measuring, so no flash of plain corners on load. Keep in step with the padding,
   gap and 40px items here and the narrow-phone rule in globals.css. */
const dockSize = (padX: number, padY: number, gap: number) => ({ w: 5 * 40 + 4 * gap + 2 * padX, h: 40 + 2 * padY });
const DOCK_SHAPES = [
  { cls: "dock-bg-wide", ...dockSize(24, 18, 16) },
  { cls: "dock-bg-narrow", ...dockSize(16, 12, 14) },
];

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
        background: "#0f1108", color: "#fff", fontSize: 13.5, fontWeight: 500,
        lineHeight: 1, padding: "8px 11px", borderRadius: 9, whiteSpace: "nowrap",
        pointerEvents: "none", opacity: hovered ? 1 : 0,
        transition: "opacity 0.25s var(--ease-out), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
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
          transition: "opacity 0.3s var(--ease-out)",
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
      if (el) smoothScrollTo(el.getBoundingClientRect().top + window.scrollY - 40);
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
        padding: "18px 24px", borderRadius: 24,
      }}
    >
      {DOCK_SHAPES.map(({ cls, w, h }) => (
        <svg key={cls} className={`dock-bg ${cls}`} aria-hidden width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
          <path d={squirclePath(w, h)} style={{ fill: "var(--dock-bg)" }} />
        </svg>
      ))}
      <Link href="/" aria-label="Home" style={{ display: "inline-flex" }}>
        <DockItem label="Home" pitch={1} hovered={hovered === "home"} onHover={v => setHovered(v ? "home" : null)}><HomeIcon /></DockItem>
      </Link>
      <Link href="/#recent-work" aria-label="Work" onClick={scrollToWork} style={{ display: "inline-flex" }}>
        <DockItem label="Work" pitch={1.06} hovered={hovered === "work"} onHover={v => setHovered(v ? "work" : null)}><WorkIcon /></DockItem>
      </Link>
      <Link href="/about" aria-label="About" style={{ display: "inline-flex" }}>
        <DockItem label="About" pitch={1.12} hovered={hovered === "about"} onHover={v => setHovered(v ? "about" : null)}><AboutIcon /></DockItem>
      </Link>
      <Link href="/resume" aria-label="Resume" style={{ display: "inline-flex" }}>
        <DockItem label="Resume" pitch={1.19} hovered={hovered === "resume"} onHover={v => setHovered(v ? "resume" : null)}><ResumeIcon /></DockItem>
      </Link>
      <span role="button" tabIndex={0} aria-label="Theme" onClick={toggleTheme}
        onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleTheme(); } }}
        style={{ display: "inline-flex" }}>
        <DockItem label="Theme" pitch={1.26} hovered={hovered === "theme"} onHover={v => setHovered(v ? "theme" : null)}>
          {isDark ? <MoonIcon /> : <SunIcon />}
        </DockItem>
      </span>
    </nav>
  );
}
