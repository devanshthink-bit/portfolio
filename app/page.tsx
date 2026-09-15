"use client";
import Hero from "../components/Hero";
import FooterLinks from "../components/FooterLinks";
import Link from "next/link";
import { IPhone } from "../components/IPhone";
import Playground from "../components/Playground";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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
            <div className="work-card-panel-text">
              <p className="work-card-brand" style={{ color: item.brandColor, display: "flex", alignItems: "center", gap: 10 }}>
                {/* RedBus logo, the same unaltered path the prototype uses, in brand red */}
                {item.slug === "redbus" && <img src="/images/redbus/logo.svg" alt="" aria-hidden width={45} height={30} style={{ height: "1.15em", width: "auto", display: "block" }} />}
                {item.brand}
              </p>
              <p className="work-card-did">{item.did}</p>
              {item.tags && <p className="work-card-tags">{item.tags.map((t) => <span key={t}>{t}</span>)}</p>}
            </div>
            {item.phones && (
              <div className="work-card-phones">
                {item.phones.map((f) => <IPhone key={f} src={`/images/redbus/screens/${f}.webp`} />)}
              </div>
            )}
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
          <p className="work-card-did">The next case study is on the drawing board</p>
          <p className="work-card-tags"><span>Research</span><span>Sketching</span><span>Writing it up</span></p>
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
        <p className="work-card-title work-card-title-lg">Coming soon</p>
        <p className="work-card-blurb">I&apos;m working on this one now. Check back soon.</p>
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
            {/* The numbers as one line split by thin rules, on the web and on phones (Devansh, 15 Sep).
                Phones drop "reached" and the fourth, so the line still fits a 375pt screen. */}
            <p className="stats-line">
              <span><b>3+ yrs</b>in engineering</span><i aria-hidden="true" />
              <span><b>3</b>products</span><i aria-hidden="true" />
              <span><b>2M+</b>users<span className="stats-web">&nbsp;reached</span></span>
              <i aria-hidden="true" className="stats-web" />
              <span className="stats-web">
                <b>0
                  {/* Lucide arrow-right, drawn rather than typed */}
                  <svg width="0.75em" height="0.75em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-label="to" style={{ display: "inline-block", margin: "0 2px", verticalAlign: "0.02em" }}>
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                1</b>&amp; at scale
              </span>
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
