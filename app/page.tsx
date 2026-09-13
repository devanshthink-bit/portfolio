"use client";
import Hero from "../components/Hero";
import FooterLinks from "../components/FooterLinks";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const STATS = [
  { value: "3+",    unit: "yrs", label: "Engg. experience", countTo: 3, suffix: "+",  startFrom: 1 },
  { value: "3",     unit: "",    label: "Products shipped",  countTo: 3, suffix: "" },
  { value: "2M+",   unit: "",    label: "Users reached",     countTo: 2, suffix: "M+", startFrom: 1 },
  { value: "0 → 1", unit: "",    label: "& at scale",        countTo: null },
];

const recentWork = [
  // Hidden for now at Devansh's request (13 Sep 2026). Kept, not deleted: uncomment to bring back.
  // {
  //   title: "Sidedoor — Job referral platform",
  //   desc: "0→1 referral platform — research & concept design.",
  //   tag: "Product Design · 0→1",
  //   gradient: "linear-gradient(135deg, #d4e2ff 0%, #7aa5fb 45%, #b0caff 100%)",
  //   tooltipBg: "#3d6bc4",
  //   slug: "sidedoor",
  // },
  {
    title: "Booking the trip home",
    desc: "View project",
    tag: "Product Design · Concept",
    gradient: "linear-gradient(135deg, #fdf4f5 0%, #f8e6e8 60%, #f4dde0 100%)",
    tooltipBg: "#1d1d1d",
    slug: "redbus",
    image: "/images/redbus/cover.webp",
    // Jahanvi's card anatomy: brand, what I did, tags, image, title + year, one line, impact.
    brand: "redBus",
    brandColor: "#E81E38",
    did: "Designed a way to book the bus home before you know the date",
    tags: ["Travel", "B2C", "iOS App", "Concept"],
    year: "2026",
    blurb: "A self-initiated concept for redBus. Hold a return seat and fare without naming a day, then move it once when plans settle.",
    impact: "Tested with 3 travellers. The two ways it failed shaped the final design.",
  },
  // Hidden for now at Devansh's request (13 Sep 2026). Kept, not deleted: uncomment to bring back.
  // {
  //   title: "Case Study 3",
  //   desc: "Case Study 3",
  //   tag: "Case Study",
  //   gradient: "linear-gradient(135deg, #d9f7e6 0%, #7ad9a8 45%, #bdeed2 100%)",
  //   tooltipBg: "#1a7a45",
  //   slug: null,
  // },
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
    <div className="stat-item" style={{
      display: "flex", flexDirection: "column", gap: 6,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
        <span className="stat-value" style={{
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
      <span className="stat-label" style={{
        fontFamily: "var(--font-geist-mono)", fontSize: 10, fontWeight: 500,
        letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--text-muted)",
      }}>
        {label}
      </span>
    </div>
  );
}

type Work = {
  title: string; desc: string; tag: string; gradient: string; tooltipBg: string; slug: string | null; image?: string;
  brand?: string; brandColor?: string; did?: string; tags?: string[]; year?: string; blurb?: string; impact?: string;
};

function WorkCard({ item }: { item: Work }) {
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
      {item.did ? (
        <>
          <div className="work-card-panel" style={{ background: item.gradient }}>
            <div className="work-card-panel-text">
              <p className="work-card-brand" style={{ color: item.brandColor }}>{item.brand}</p>
              <p className="work-card-did">{item.did}</p>
              {item.tags && <p className="work-card-tags">{item.tags.join("  •  ")}</p>}
            </div>
            {item.image && <img src={item.image} alt="" />}
          </div>
          <div className="work-card-meta">
            <p className="work-card-title work-card-title-lg">
              {item.title}
              {item.year && <span className="work-card-year">{item.year}</span>}
            </p>
            {item.blurb && <p className="work-card-blurb">{item.blurb}</p>}
            {item.impact && <p className="work-card-impact">{item.impact}</p>}
          </div>
        </>
      ) : (
        <>
          <div className="work-card-media" style={{ background: item.gradient }}>
            {item.image && <img src={item.image} alt="" />}
          </div>
          <p className="work-card-title" style={{ margin: 0 }}>{item.title}</p>
        </>
      )}
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

  // Home page base background is gray (like the hero) so only the overlay panel is white
  useEffect(() => {
    document.body.classList.add("home-page");
    return () => document.body.classList.remove("home-page");
  }, []);

  return (
    <>
      <div className="home-stack">
        {/* Hero + stats — the only thing visible on landing */}
        <section className="stack-hero">
          <div className="stack-hero-inner">
            <Hero />
            <div ref={statsRef} className="stats-strip" style={{
              display: "flex", justifyContent: "space-between", flexWrap: "wrap", rowGap: 24,
              marginTop: -8,
            }}>
              {STATS.map((s) => (
                <StatCounter key={s.label} {...s} active={statsVisible} />
              ))}
            </div>
          </div>
        </section>

        {/* Recent Work — one panel rises up and overlays the hero; all case studies live inside it */}
        <div className="stack-overlay">
          <div className="stack-overlay-inner">
            <section id="recent-work" className="section">
              <h3 className="section-title">Recent Work</h3>
              <div className="work-list">
                {recentWork.map(item => <WorkCard key={item.title} item={item} />)}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer — sits on the gray home-page background */}
      <footer className="site-footer" style={{ position: "relative", zIndex: 3, paddingTop: 40 }}>
        <FooterLinks />
      </footer>
    </>
  );
}
