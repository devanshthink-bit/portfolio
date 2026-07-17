"use client";
import Hero from "../components/Hero";
import WeatherLocation from "../components/WeatherLocation";
import FooterLinks from "../components/FooterLinks";
import Link from "next/link";
import MachineMode from "../components/MachineMode";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const STATS = [
  { value: "3+",    unit: "yrs", label: "Engg. experience", countTo: 3, suffix: "+",  startFrom: 1 },
  { value: "3",     unit: "",    label: "Products shipped",  countTo: 3, suffix: "" },
  { value: "2M+",   unit: "",    label: "Users reached",     countTo: 2, suffix: "M+", startFrom: 1 },
  { value: "0 → 1", unit: "",    label: "& at scale",        countTo: null },
];

const recentWork = [
  {
    title: "Sidedoor — Job referral platform",
    desc: "0→1 referral platform — research & concept design.",
    tag: "Product Design · 0→1",
    gradient: "linear-gradient(135deg, #d4e2ff 0%, #7aa5fb 45%, #b0caff 100%)",
    tooltipBg: "#3d6bc4",
    slug: "sidedoor",
  },
  {
    title: "Case Study 2",
    desc: "Case Study 2",
    tag: "Case Study",
    gradient: "linear-gradient(135deg, #ffecd4 0%, #fbc27a 45%, #ffe0b0 100%)",
    tooltipBg: "#c4691a",
    slug: null,
  },
  {
    title: "Case Study 3",
    desc: "Case Study 3",
    tag: "Case Study",
    gradient: "linear-gradient(135deg, #d9f7e6 0%, #7ad9a8 45%, #bdeed2 100%)",
    tooltipBg: "#1a7a45",
    slug: null,
  },
];

function StatCounter({ value, unit, label, active, countTo, suffix, startFrom }: {
  value: string; unit: string; label: string; active: boolean;
  countTo?: number | null; suffix?: string; startFrom?: number;
}) {
  const from = startFrom ?? 0;
  const [counted, setCounted] = useState(from);

  useEffect(() => {
    if (!active || countTo == null) return;
    setCounted(from);
    const duration = 700;
    const steps = 20;
    const range = countTo - from;
    let step = 0;
    const id = setInterval(() => {
      step++;
      setCounted(Math.min(Math.round(from + (range / steps) * step), countTo));
      if (step >= steps) clearInterval(id);
    }, duration / steps);
    return () => clearInterval(id);
  }, [active, countTo, from]);

  const displayValue = countTo != null ? `${counted}${suffix ?? ""}` : value;

  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 6,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
        <span style={{
          fontFamily: "var(--font-manrope)", fontSize: 28, fontWeight: 700,
          color: "var(--text-primary)", letterSpacing: "-0.03em",
          opacity: active ? 1 : 0, transform: active ? "none" : "translateY(8px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}>
          {displayValue}
        </span>
        {unit && (
          <span style={{
            fontFamily: "var(--font-geist-mono)", fontSize: 12,
            color: "var(--text-muted)", letterSpacing: "0",
          }}>
            {unit}
          </span>
        )}
      </div>
      <span style={{
        fontFamily: "var(--font-geist-mono)", fontSize: 10, fontWeight: 500,
        letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--text-muted)",
      }}>
        {label}
      </span>
    </div>
  );
}

function WorkCard({ item }: { item: typeof recentWork[0] }) {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [left, setLeft] = useState<number | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  };

  useLayoutEffect(() => {
    if (!hovered || !pos) { setLeft(null); return; }
    const width = tooltipRef.current?.offsetWidth ?? 0;
    const maxLeft = window.innerWidth - width - 12;
    setLeft(Math.max(12, Math.min(pos.x + 18, maxLeft)));
  }, [hovered, pos]);

  const inner = (
    <div
      className="work-card"
      onMouseEnter={() => { setHovered(true); window.dispatchEvent(new Event("cursor:hide")); }}
      onMouseLeave={() => { setHovered(false); setPos(null); window.dispatchEvent(new Event("cursor:show")); }}
      onMouseMove={handleMouseMove}
      style={{ textDecoration: "none" }}
    >
      <div className="work-card-media" style={{ background: item.gradient }} />
      <p className="work-card-title" style={{ margin: 0 }}>{item.title}</p>
      {hovered && pos && (
        <div ref={tooltipRef} style={{
          position: "fixed",
          left: left ?? pos.x + 18,
          top: pos.y + 18,
          background: item.tooltipBg,
          borderRadius: 6,
          padding: "7px 12px",
          fontSize: 12,
          fontFamily: "var(--font-manrope)",
          fontWeight: 700,
          letterSpacing: "-0.01em",
          color: "#ffffff",
          pointerEvents: "none",
          zIndex: 9999,
          whiteSpace: "nowrap",
        }}>
          {item.desc}
        </div>
      )}
    </div>
  );

  return item.slug
    ? <Link href={`/work/${item.slug}`} style={{ textDecoration: "none" }}>{inner}</Link>
    : inner;
}

export default function Home() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <MachineMode>
      <Hero />

      {/* Stats strip */}
      <div ref={statsRef} style={{
        display: "flex", justifyContent: "space-between", flexWrap: "wrap", rowGap: 24,
        marginTop: -8,
      }}>
        {STATS.map((s) => (
          <StatCounter key={s.label} {...s} active={statsVisible} />
        ))}
      </div>

      {/* Recent Work */}
      <section id="recent-work" className="section">
        <h3 className="section-title">Recent Work</h3>
        <div className="work-list">
          {recentWork.map(item => <WorkCard key={item.title} item={item} />)}
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer" style={{ paddingTop: 16, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <WeatherLocation />
        <FooterLinks />
      </footer>
    </MachineMode>
  );
}
