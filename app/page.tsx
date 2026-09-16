"use client";
import Hero from "../components/Hero";
import FooterLinks from "../components/FooterLinks";
import Link from "next/link";
import { IPhone } from "../components/IPhone";
import Playground from "../components/Playground";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const STATS = [
  { value: "3+",    unit: "yrs", label: "in engineering", countTo: 3, suffix: "+",  startFrom: 1 },
  { value: "3",     unit: "",    label: "products shipped",  countTo: 3, suffix: "" },
  { value: "2M+",   unit: "",    label: "users reached",     countTo: 2, suffix: "M+", startFrom: 1 },
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
    title: "Winning the return ticket at checkout",
    desc: "View project",
    tag: "Product Design · Concept",
    gradient: "linear-gradient(180deg, #fbf7f7 0%, #f4ebec 100%)",
    tooltipBg: "#1d1d1d",
    slug: "redbus",
    phones: ["hifi_06a", "hifi_05a", "hifi_16"],
    // Jahanvi's card anatomy: brand, what I did, tags, image, title + year, one line, impact.
    brand: "RedBus",
    brandColor: "var(--brand-red)",
    did: "Redesigned RedBus checkout to capture the return trip, even without a date",
    tags: ["Travel", "B2C", "iOS app", "Concept"],
    blurb: "~74% of travellers leave the return for later, and a quarter book it elsewhere. A self-initiated RedBus concept that turns one booking into two, in the same checkout.",
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
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span className="stat-value" style={{
          fontFamily: "var(--font-manrope)", fontSize: "var(--fs-28)", fontWeight: 700,
          color: "var(--text-primary)", letterSpacing: "-0.03em",
          opacity: active ? 1 : 0, transform: active ? "none" : "translateY(8px)",
          transition: "opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out)",
        }}>
          {displayValue}
        </span>
        {unit && (
          <span style={{
            fontFamily: "var(--font-manrope)", fontSize: "var(--fs-16)", fontWeight: 600,
            color: "var(--text-muted)", letterSpacing: "-0.011em",
          }}>
            {unit}
          </span>
        )}
      </div>
      <span className="stat-label" style={{
        fontFamily: "var(--font-inter)", fontSize: "var(--fs-14)", fontWeight: 400,
        letterSpacing: "-0.011em", color: "var(--text-muted)",
      }}>
        {label}
      </span>
    </div>
  );
}

type Work = {
  title: string; desc: string; tag: string; gradient: string; tooltipBg: string; slug: string | null; image?: string;
  phones?: string[]; brand?: string; brandColor?: string; did?: string; tags?: string[]; year?: string; blurb?: string; impact?: string;
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
      onMouseEnter={() => { if (!window.matchMedia("(hover: hover)").matches) return; setHovered(true); window.dispatchEvent(new Event("cursor:hide")); }}
      onMouseLeave={() => { setHovered(false); setPos(null); window.dispatchEvent(new Event("cursor:show")); }}
      onMouseMove={handleMouseMove}
      style={{ textDecoration: "none" }}
    >
      {item.did ? (
        <>
          <div className="work-card-panel" style={{ background: item.gradient }}>
            <div className="work-card-panel-text is-brand-only">
              <p className="work-card-brand" style={{ color: item.brandColor, display: "flex", alignItems: "center", gap: 10 }}>
                {/* RedBus logo, the same unaltered path the prototype uses, in brand red */}
                {item.slug === "redbus" && <img src="/images/redbus/logo.svg" alt="" aria-hidden width={45} height={30} style={{ height: "1.15em", width: "auto", display: "block" }} />}
                {item.brand}
              </p>
            </div>
            {item.phones && (
              <div className="work-card-phones">
                {item.phones.map((f) => <IPhone key={f} src={`/images/redbus/screens/${f}.webp`} />)}
              </div>
            )}
          </div>
          <div className="work-card-meta">
            <p className="work-card-title work-card-title-lg">
              {item.did}
              {item.year && <span className="work-card-year">{item.year}</span>}
            </p>
            {item.blurb && <p className="work-card-blurb">{item.blurb}</p>}
            {item.impact && <p className="work-card-impact">{item.impact}</p>}
            {item.tags && <p className="work-card-tags">{item.tags.map((t) => <span key={t}>{t}</span>)}</p>}
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
          borderRadius: "var(--r-sm)",
          padding: "7px 12px",
          fontSize: "var(--fs-12)",
          fontFamily: "var(--font-manrope)",
          fontWeight: 700,
          letterSpacing: "-0.011em",
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

// Second case study, still being written. Not a link. Phone outlines with placeholder bars,
// as if the screens are still being drawn. Names no project on purpose.
function InProgressCard() {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const bars = (rows: number[]) => rows.map((w, i) => <span key={i} className="wip-bar" style={{ width: `${w}%` }} />);
  return (
    <div
      className="work-card wip-card"
      aria-label="Next case study, in progress"
      onMouseEnter={() => { if (!window.matchMedia("(hover: hover)").matches) return; setHovered(true); window.dispatchEvent(new Event("cursor:hide")); }}
      onMouseLeave={() => { setHovered(false); setPos(null); window.dispatchEvent(new Event("cursor:show")); }}
      onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
    >
      <div className="work-card-panel wip-panel">
        <div className="work-card-panel-text">
          <p className="wip-status"><span className="wip-dot" aria-hidden />In progress</p>
        </div>
        <div className="wip-phones" aria-hidden>
          <div className="wip-phone">{bars([60, 90, 75, 40, 85, 55])}</div>
          <div className="wip-phone">
            <span className="wip-block" />
            {bars([70, 45, 90, 60, 80])}
          </div>
          <div className="wip-phone">{bars([50, 85, 65, 90, 40, 70])}</div>
        </div>
      </div>
      <div className="work-card-meta">
        <p className="work-card-title work-card-title-lg">The next case study is on the drawing board</p>
        <p className="work-card-blurb">This one is in progress. Please check back soon.</p>
        <p className="work-card-tags"><span>Research</span><span>Sketching</span><span>Writing it up</span></p>
      </div>
      {hovered && pos && (
        <div style={{
          position: "fixed", left: pos.x + 18, top: pos.y + 18, background: "#3b4a6b", borderRadius: "var(--r-sm)",
          padding: "7px 12px", fontSize: "var(--fs-12)", fontFamily: "var(--font-manrope)", fontWeight: 700,
          letterSpacing: "-0.011em", color: "#ffffff", pointerEvents: "none", zIndex: 9999, whiteSpace: "nowrap",
        }}>
          In progress
        </div>
      )}
    </div>
  );
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
            {/* Phones: the numbers as one line, with faint fading separators (Devansh picked mock C2, 15 Sep).
                The web keeps the four counting numbers above (Devansh: "in the web, revert"). */}
            <p className="stats-line">
              <span><b>3+ yrs</b>in engineering</span><i aria-hidden="true" />
              <span><b>3</b>products</span><i aria-hidden="true" />
              <span><b>2M+</b>reach</span>
            </p>
          </div>
        </section>

        {/* Recent Work — one panel rises up and overlays the hero; all case studies live inside it */}
        <div className="stack-overlay">
          <div className="stack-overlay-inner">
            <section id="recent-work" className="section">
              <h3 className="section-title">Recent work</h3>
              <div className="work-list">
                {recentWork.map(item => <WorkCard key={item.title} item={item} />)}
                <InProgressCard />
              </div>
            </section>
            <Playground />
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
