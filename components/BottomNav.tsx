"use client";
import { useEffect, useState } from "react";
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
    <span aria-hidden style={{ fontFamily: "var(--font-instrument), Georgia, serif", fontStyle: "italic", fontSize: 26, lineHeight: 1, letterSpacing: "0.01em", display: "block", transform: "translateY(0.55px)" /* measured: centres the ink, 10.2px above and below */ }}>
      ds.
    </span>
  );
}
// Solar case-round-minimalistic-linear (Devansh picked it, 15 Sep 2026).
function WorkIcon() { return <Solar body={"<g fill=\"none\" stroke=\"currentColor\"><path d=\"M2 14C2 10.2288 2 8.34315 3.17157 7.17157C4.34315 6 6.22876 6 10 6H14C17.7712 6 19.6569 6 20.8284 7.17157C22 8.34315 22 10.2288 22 14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14Z\"/><path stroke-linecap=\"round\" d=\"M21.6618 8.71973C18.6519 10.6761 17.147 11.6543 15.5605 12.1472C13.2416 12.8677 10.7586 12.8677 8.43963 12.1472C6.85313 11.6543 5.34822 10.6761 2.33838 8.71973\"/><path stroke-linecap=\"round\" d=\"M8 11V13\"/><path stroke-linecap=\"round\" d=\"M16 11V13\"/><path stroke-linecap=\"round\" d=\"M9.1709 4C9.58273 2.83481 10.694 2 12.0002 2C13.3064 2 14.4177 2.83481 14.8295 4\"/></g>"} />; }
// Solar user-linear (Devansh picked it, 15 Sep 2026).
function AboutIcon() { return <Solar body={"<g fill=\"none\" stroke=\"currentColor\"><circle cx=\"12\" cy=\"6\" r=\"4\"/><path d=\"M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z\"/></g>"} />; }
// Shared with the download button on /resume.
export const RESUME_ICON = "<g fill=\"none\" stroke=\"currentColor\"><path d=\"M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z\"/><path stroke-linecap=\"round\" d=\"M8 12H16\"/><path stroke-linecap=\"round\" d=\"M8 8H16\"/><path stroke-linecap=\"round\" d=\"M8 16H13\"/></g>";
function ResumeIcon() { return <Solar body={RESUME_ICON} />; }
// Solar sun-linear (Devansh picked it, 15 Sep 2026).
function SunIcon() { return <Solar body={"<g fill=\"none\" stroke=\"currentColor\"><circle cx=\"12\" cy=\"12\" r=\"6\"/><path stroke-linecap=\"round\" d=\"M12 2V3\"/><path stroke-linecap=\"round\" d=\"M12 21V22\"/><path stroke-linecap=\"round\" d=\"M22 12L21 12\"/><path stroke-linecap=\"round\" d=\"M3 12L2 12\"/><path stroke-linecap=\"round\" d=\"M19.0708 4.92969L18.678 5.32252\"/><path stroke-linecap=\"round\" d=\"M5.32178 18.6777L4.92894 19.0706\"/><path stroke-linecap=\"round\" d=\"M19.0708 19.0703L18.678 18.6775\"/><path stroke-linecap=\"round\" d=\"M5.32178 5.32227L4.92894 4.92943\"/></g>"} />; }
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
        background: "#0f1108", color: "#fff", fontSize: 14, fontWeight: 500,
        lineHeight: 1, padding: "8px 11px", borderRadius: "var(--r-sm)", whiteSpace: "nowrap",
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
  const [hidden, setHidden] = useState(false);

  // Phones: the dock sits at the top (globals.css) and slides away while you scroll down, back
  // when you scroll up, so it never covers what you are reading.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (window.innerWidth > 640 || y < 80) { setHidden(false); last = y; return; }
      if (Math.abs(y - last) < 8) return;
      setHidden(y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setHidden(false), [pathname]);

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
      className={`bottom-dock${hidden ? " is-hidden" : ""}`}
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
