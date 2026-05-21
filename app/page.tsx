"use client";
import Hero from "../components/Hero";
import WeatherLocation from "../components/WeatherLocation";
import FooterLinks from "../components/FooterLinks";
import Link from "next/link";
import MachineMode from "../components/MachineMode";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: "3+",    unit: "yrs", label: "Engg. experience", countTo: 3, suffix: "+",  startFrom: 1 },
  { value: "4",     unit: "",    label: "Products shipped",  countTo: 4, suffix: "" },
  { value: "2M+",   unit: "",    label: "Users reached",     countTo: 2, suffix: "M+", startFrom: 1 },
  { value: "0 → 1", unit: "",    label: "& at scale",        countTo: null },
];

const recentWork = [
  {
    title: "Sidedoor — Job referral platform",
    desc: "0→1 referral platform — research, design & shipped MVP.",
    tag: "Product Design · 0→1",
    gradient: "linear-gradient(135deg, #dce8ff 0%, #c2d6ff 45%, #d8e6ff 100%)",
    tooltipBg: "#3d6bc4",
    slug: "sidedoor",
  },
  {
    title: "Design system, Anthropic Console",
    desc: "Component system powering Claude across 12+ surfaces.",
    tag: "Design Systems · FAANG",
    gradient: "linear-gradient(to right, #ffe8c8, #ffd49a, #ffe8c8)",
    tooltipBg: "#b86c10",
    slug: null,
  },
  {
    title: "End-to-end product, Meta Reels",
    desc: "Reels core experience — creator tooling for 3B+ users.",
    tag: "Product Design · Scale",
    gradient: "linear-gradient(#c9caD1, #bbc7d3, #b7c6d5)",
    tooltipBg: "#3d5a6e",
    slug: null,
  },
];

function StatCounter({ value, unit, label, active, countTo, suffix, startFrom, isLast }: {
  value: string; unit: string; label: string; active: boolean;
  countTo?: number | null; suffix?: string; startFrom?: number; isLast?: boolean;
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
      display: "flex", flexDirection: "column", gap: 6, flex: 1,
      paddingRight: isLast ? 0 : 32,
      borderRight: isLast ? "none" : "1px solid var(--border)",
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
            fontFamily: "var(--font-geist-mono)", fontSize: 13,
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

  const handleMouseMove = (e: React.MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  };

  const inner = (
    <div
      className="work-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPos(null); }}
      onMouseMove={handleMouseMove}
      style={{ textDecoration: "none" }}
    >
      <div className="work-card-media" style={{ background: item.gradient }} />
      <p className="work-card-title" style={{ margin: 0 }}>{item.title}</p>
      {hovered && pos && (
        <div style={{
          position: "fixed",
          left: pos.x + 18,
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
    ? <Link href={`/work/${item.slug}`} style={{ textDecoration: "none", cursor: "none" }}>{inner}</Link>
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
        display: "flex", gap: 32, flexWrap: "wrap",
        paddingTop: 16, paddingBottom: 16,
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        marginTop: -20,
      }}>
        {STATS.map((s, i) => (
          <StatCounter key={s.label} {...s} active={statsVisible} isLast={i === STATS.length - 1} />
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
