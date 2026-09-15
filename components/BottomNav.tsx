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
// Solar case-linear (Devansh picked it, 15 Sep 2026).
function WorkIcon() { return <Solar body={"<g fill=\"none\" stroke=\"currentColor\"><path d=\"M3 12C3 15.7712 3 19.6569 4.31802 20.8284C5.63604 22 7.75736 22 12 22C16.2426 22 18.364 22 19.682 20.8284C21 19.6569 21 15.7712 21 12\"/><path d=\"M14.6603 14.2019L20.6676 12.3997C21.2631 12.2211 21.5609 12.1317 21.7498 11.9176C21.7866 11.8759 21.8199 11.8312 21.8492 11.784C22 11.5415 22 11.2307 22 10.6089C22 8.15877 22 6.9337 21.327 6.10659C21.1977 5.94763 21.0524 5.80233 20.8934 5.67298C20.0663 5 18.8412 5 16.3911 5H7.60893C5.15877 5 3.9337 5 3.10659 5.67298C2.94763 5.80233 2.80233 5.94763 2.67298 6.10659C2 6.9337 2 8.15877 2 10.6089C2 11.2307 2 11.5415 2.15078 11.784C2.18015 11.8312 2.21341 11.8759 2.25021 11.9176C2.43915 12.1317 2.7369 12.2211 3.3324 12.3997L9.33968 14.2019\"/><path d=\"M6.5 5C7.32344 4.97913 8.15925 4.45491 8.43944 3.68032C8.44806 3.65649 8.4569 3.62999 8.47457 3.57697L8.50023 3.5C8.54241 3.37344 8.56351 3.31014 8.58608 3.254C8.87427 2.53712 9.54961 2.05037 10.3208 2.00366C10.3812 2 10.4479 2 10.5814 2H13.4191C13.5525 2 13.6192 2 13.6796 2.00366C14.4508 2.05037 15.1262 2.53712 15.4144 3.254C15.4369 3.31014 15.458 3.37343 15.5002 3.5L15.5259 3.57697C15.5435 3.62968 15.5524 3.65656 15.561 3.68032C15.8412 4.45491 16.6766 4.97913 17.5 5\"/><path stroke-linecap=\"round\" d=\"M14 12.5H10C9.72386 12.5 9.5 12.7239 9.5 13V15.1615C9.5 15.3659 9.62448 15.5498 9.8143 15.6257L10.5144 15.9058C11.4681 16.2872 12.5319 16.2872 13.4856 15.9058L14.1857 15.6257C14.3755 15.5498 14.5 15.3659 14.5 15.1615V13C14.5 12.7239 14.2761 12.5 14 12.5Z\"/></g>"} />; }
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
