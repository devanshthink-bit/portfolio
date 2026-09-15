// Shared building blocks for case study pages. Server-safe: no "use client", no hooks.
// Two faces only: Manrope for headings and figures, Inter for everything else. Sentence case,
// no mono labels, no handwriting (Devansh, 14 Sep 2026: "I dont want anything which looks ai generated").
import Image from "next/image";

export const RED = "#E81E38";

const MANROPE = "var(--font-manrope)";
const INTER = "var(--font-inter)";

// One small type scale for the whole case study (Devansh, 15 Sep: "Keep the number of variations
// minimal"). Sizes 12 / 14 / 16 / 18 / 20 / 28, weights 400 / 500 / 700 / 800, four letter-spacings.
export const T = {
  h1:      { fontFamily: MANROPE, fontSize: 28, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.15, margin: "0 0 12px 0" } as React.CSSProperties,
  lede:    { fontFamily: INTER, fontSize: 18, fontWeight: 400, color: "var(--text-secondary)", letterSpacing: "-0.011em", lineHeight: 1.6, margin: "0 0 28px 0", maxWidth: 640 } as React.CSSProperties,
  h2:      { fontFamily: MANROPE, fontSize: 20, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.3, margin: "0 0 12px 0" } as React.CSSProperties,
  sub:     { fontFamily: INTER, fontSize: 16, fontWeight: 400, color: "var(--text-secondary)", letterSpacing: "-0.011em", lineHeight: 1.65, margin: 0, maxWidth: 640 } as React.CSSProperties,
  small:   { fontFamily: INTER, fontSize: 14, fontWeight: 400, color: "var(--text-muted)", letterSpacing: "-0.011em", lineHeight: 1.5, margin: 0 } as React.CSSProperties,
  // A quiet label inside a card: the same as small.
  eyebrow: { fontFamily: INTER, fontSize: 14, fontWeight: 400, color: "var(--text-muted)", letterSpacing: "-0.011em", lineHeight: 1.5, margin: 0 } as React.CSSProperties,
  cardH:   { fontFamily: MANROPE, fontSize: 16, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.4, margin: 0 } as React.CSSProperties,
  body:    { fontFamily: INTER, fontSize: 16, fontWeight: 400, color: "var(--text-secondary)", letterSpacing: "-0.011em", lineHeight: 1.65, margin: 0 } as React.CSSProperties,
  quote:   { fontFamily: MANROPE, fontSize: 16, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.4, margin: 0 } as React.CSSProperties,
  figure:  { fontFamily: MANROPE, fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, color: "var(--text-primary)", fontVariantNumeric: "tabular-nums" } as React.CSSProperties,
};

// "Scene 4 · A week later" in the source shows as "SCENE 4 | A WEEK LATER": a thin rule, not a dot.
export function LabelText({ text }: { text: string }) {
  const i = text.indexOf(" · ");
  if (i < 0) return <>{text}</>;
  return <><span className="cs-label-lead">{text.slice(0, i)}</span><span className="cs-label-rest">{text.slice(i + 3)}</span></>;
}

export function SectionLabel({ children }: { children: string }) {
  return <p className="cs-label"><LabelText text={children} /></p>;
}

// One heading, one or two lines under it, one visual.
export function Beat({ id, label, title, sub, children, caption }: {
  id?: string; label: string; title: string; sub: React.ReactNode; children?: React.ReactNode; caption?: React.ReactNode;
}) {
  return (
    <section id={id} className="cs-beat">
      <SectionLabel>{label}</SectionLabel>
      <h2 style={T.h2}>{title}</h2>
      <p style={T.sub}>{sub}</p>
      {children && <div style={{ marginTop: 32 }}>{children}</div>}
      {caption && <p style={{ ...T.small, marginTop: 14 }}>{caption}</p>}
    </section>
  );
}

export function Figure({ src, alt, w = 2400, h = 1500, priority }: { src: string; alt: string; w?: number; h?: number; priority?: boolean }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={w}
      height={h}
      priority={priority}
      sizes="(max-width: 980px) 100vw, 868px"
      style={{ width: "100%", height: "auto", borderRadius: 10, display: "block" }}
    />
  );
}

// `warn` marks something the traveller gives up: an amber panel (.cs-callout-warn).
export function Card({ children, warn, style }: { children: React.ReactNode; warn?: boolean; style?: React.CSSProperties }) {
  return (
    <div className={warn ? "cs-callout-warn" : undefined} style={{ background: warn ? undefined : "var(--cs-callout-bg)", boxShadow: warn ? undefined : "var(--shadow-md)", borderRadius: 12, padding: "20px 22px", ...style }}>
      {children}
    </div>
  );
}

// A status: a coloured dot and a plain word.
export function Chip({ children, tone }: { children: React.ReactNode; tone: "red" | "amber" | "grey" | "green" }) {
  return <span className={`cs-status cs-status-${tone}`}>{children}</span>;
}

export function Numbered({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className="cs-numbered">
      {items.map((t, i) => (
        <li key={i}>
          <span className="cs-numbered-n">{i + 1}</span>
          <span style={T.body}>{t}</span>
        </li>
      ))}
    </ol>
  );
}

/* Lucide icons (MIT), drawn inline so every arrow has the same stroke. */
const ICONS = {
  external: <path d="M7 17 17 7M8 7h9v9" />,
  down: <><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></>,
  play: <path d="M7 4.5v15l12-7.5z" />,
};

export function Pill({ href, children, primary, external, icon }: {
  href: string; children: React.ReactNode; primary?: boolean; external?: boolean; icon?: keyof typeof ICONS;
}) {
  const ic = icon ?? (external ? "external" : undefined);
  return (
    <a href={href} className={`cs-pill${primary ? " is-primary" : ""}`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
      {ic && (
        <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          {ICONS[ic]}
        </svg>
      )}
    </a>
  );
}

export function MetaStrip({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="cs-meta-strip" style={{ padding: "28px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", marginBottom: 28 }}>
      {items.map((item) => (
        <div key={item.label}>
          <p style={{ ...T.eyebrow, margin: "0 0 4px 0" }}>{item.label}</p>
          <p style={{ ...T.body, color: "var(--text-primary)" }}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}
