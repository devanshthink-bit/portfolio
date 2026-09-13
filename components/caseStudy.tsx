// Shared building blocks for case study pages. Server-safe: no "use client", no hooks.
import Image from "next/image";

export const RED = "#E81E38";

// Type scale for case studies, in the site's own fonts and tokens.
export const T = {
  h1:      { fontFamily: "var(--font-manrope)", fontSize: 40, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.04em", lineHeight: 1.12, margin: "0 0 16px 0" } as React.CSSProperties,
  lede:    { fontFamily: "var(--font-manrope)", fontSize: 20, fontWeight: 500, color: "var(--text-secondary)", letterSpacing: "-0.025em", lineHeight: 1.45, margin: "0 0 32px 0" } as React.CSSProperties,
  h2:      { fontFamily: "var(--font-manrope)", fontSize: 26, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.04em", lineHeight: 1.3, margin: "0 0 12px 0" } as React.CSSProperties,
  sub:     { fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.65, letterSpacing: "-0.015em", margin: 0, maxWidth: 640 } as React.CSSProperties,
  small:   { fontSize: 13, color: "var(--text-muted)", lineHeight: 1.55, letterSpacing: "-0.01em", margin: 0 } as React.CSSProperties,
  eyebrow: { fontFamily: "var(--font-geist-mono)", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", margin: 0 } as React.CSSProperties,
  cardH:   { fontFamily: "var(--font-manrope)", fontSize: 16, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.4, margin: 0 } as React.CSSProperties,
  body:    { fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, letterSpacing: "-0.01em", margin: 0 } as React.CSSProperties,
  quote:   { fontFamily: "var(--font-caveat)", fontSize: 24, fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.3, margin: 0 } as React.CSSProperties,
};

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 14px 0" }}>
      {children}
    </p>
  );
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
      {children && <div style={{ marginTop: 28 }}>{children}</div>}
      {caption && <p style={{ ...T.small, marginTop: 12 }}>{caption}</p>}
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
    <div className={warn ? "cs-callout-warn" : undefined} style={{ background: warn ? undefined : "var(--cs-callout-bg)", borderRadius: 10, padding: "18px 20px", ...style }}>
      {children}
    </div>
  );
}

export function Chip({ children, tone }: { children: React.ReactNode; tone: "red" | "amber" | "grey" | "green" }) {
  const c = {
    red:   { bg: "rgba(232,30,56,0.12)", fg: "#C8102E" },
    amber: { bg: "rgba(164,87,41,0.14)", fg: "#A45729" },
    grey:  { bg: "rgba(120,113,108,0.14)", fg: "var(--text-muted)" },
    green: { bg: "rgba(69,132,66,0.14)", fg: "#2E7D32" },
  }[tone];
  return (
    <span style={{ display: "inline-block", fontFamily: "var(--font-geist-mono)", fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", background: c.bg, color: c.fg, borderRadius: 4, padding: "3px 7px", whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

export function Numbered({ items, color = RED }: { items: React.ReactNode[]; color?: string }) {
  return (
    <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((t, i) => (
        <li key={i}>
          <Card style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 12, color, fontWeight: 600 }}>0{i + 1}</span>
            <span style={T.body}>{t}</span>
          </Card>
        </li>
      ))}
    </ol>
  );
}

export function Pill({ href, children, primary, external }: { href: string; children: React.ReactNode; primary?: boolean; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 16px", borderRadius: 100,
        fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 700, letterSpacing: "-0.01em",
        background: primary ? "var(--text-primary)" : "transparent",
        color: primary ? "var(--bg)" : "var(--text-primary)",
        border: primary ? "none" : "1px solid var(--cs-stat-gap)",
      }}
    >
      {children}
    </a>
  );
}

export function MetaStrip({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="cs-meta-strip" style={{ padding: "20px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", marginBottom: 20 }}>
      {items.map((item) => (
        <div key={item.label}>
          <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px 0" }}>{item.label}</p>
          <p style={{ fontSize: 14, color: "var(--text-primary)", letterSpacing: "-0.02em", margin: 0 }}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}
