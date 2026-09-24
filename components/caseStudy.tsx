// Shared building blocks for case study pages. Server-safe: no "use client", no hooks.
// Two faces only: Manrope for headings and figures, Inter for everything else. Sentence case,
// no mono labels, no handwriting (Devansh, 14 Sep 2026: "I dont want anything which looks ai generated").
import Image from "next/image";

export const RED = "#E81E38";

const MANROPE = "var(--font-manrope)";
const INTER = "var(--font-inter)";

// One small type scale for the whole case study (Devansh, 15 Sep: "Keep the number of variations
// minimal"). Sizes 12 / 14 / 16 / 18 / 20 / 28, weights 400 / 500 / 700, three letter-spacings
// (Inter -0.011em; Manrope -0.02em up to 20px, -0.03em at 28px). Body 1.6, headings 1.2 to 1.4.
export const T = {
  h1:      { fontFamily: MANROPE, fontSize: "var(--fs-28)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.2, margin: "0 0 12px 0" } as React.CSSProperties,
  lede:    { fontFamily: INTER, fontSize: "var(--fs-18)", fontWeight: 400, color: "var(--text-secondary)", letterSpacing: "-0.011em", lineHeight: 1.6, margin: "0 0 28px 0", maxWidth: 640 } as React.CSSProperties,
  h2:      { fontFamily: MANROPE, fontSize: "var(--fs-20)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.3, margin: "0 0 12px 0" } as React.CSSProperties,
  sub:     { fontFamily: INTER, fontSize: "var(--fs-16)", fontWeight: 400, color: "var(--text-secondary)", letterSpacing: "-0.011em", lineHeight: 1.6, margin: 0, maxWidth: 640 } as React.CSSProperties,
  small:   { fontFamily: INTER, fontSize: "var(--fs-14)", fontWeight: 400, color: "var(--text-muted)", letterSpacing: "-0.011em", lineHeight: 1.6, margin: 0 } as React.CSSProperties,
  // A quiet label inside a card: the same as small.
  eyebrow: { fontFamily: INTER, fontSize: "var(--fs-14)", fontWeight: 400, color: "var(--text-muted)", letterSpacing: "-0.011em", lineHeight: 1.6, margin: 0 } as React.CSSProperties,
  cardH:   { fontFamily: MANROPE, fontSize: "var(--fs-16)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.4, margin: 0 } as React.CSSProperties,
  body:    { fontFamily: INTER, fontSize: "var(--fs-16)", fontWeight: 400, color: "var(--text-secondary)", letterSpacing: "-0.011em", lineHeight: 1.6, margin: 0 } as React.CSSProperties,
  quote:   { fontFamily: MANROPE, fontSize: "var(--fs-16)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.4, margin: 0 } as React.CSSProperties,
  figure:  { fontFamily: MANROPE, fontSize: "var(--fs-28)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.2, color: "var(--text-primary)", fontVariantNumeric: "tabular-nums" } as React.CSSProperties,
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
      style={{ width: "100%", height: "auto", borderRadius: "var(--r-lg)", display: "block" }}
    />
  );
}

// `warn` marks something the traveller gives up: an amber panel (.cs-callout-warn).
export function Card({ children, warn, style }: { children: React.ReactNode; warn?: boolean; style?: React.CSSProperties }) {
  return (
    <div className={warn ? "cs-callout-warn" : undefined} style={{ background: warn ? undefined : "var(--cs-callout-bg)", boxShadow: warn ? undefined : "var(--shadow-md)", borderRadius: "var(--r-md)", padding: "20px 22px", ...style }}>
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

// ── Story furniture shared by the case studies ───────────────────────────────
// An act opens a part of the story: a small kicker, a title, one line under it.
export function Act({ id, n, title, sub }: { id?: string; n: string; title: string; sub: string }) {
  return (
    <header id={id} className="cs-act">
      <p className="cs-act-kicker"><LabelText text={n} /></p>
      <h2 className="cs-act-title">{title}</h2>
      <p className="cs-act-sub">{sub}</p>
    </header>
  );
}

// The quick summary under the title: three short columns.
export function InShort({ rows }: { rows: { k: string; v: React.ReactNode }[] }) {
  return (
    <div className="cs-inshort">
      {rows.map((r) => (
        <div key={r.k}>
          <p style={{ ...T.eyebrow, marginBottom: 8 }}>{r.k}</p>
          <p style={T.body}>{r.v}</p>
        </div>
      ))}
    </div>
  );
}

export function BeforeAfter({ before, after, beforeLabel = "Before", afterLabel = "After" }: { before: string; after: string; beforeLabel?: string; afterLabel?: string }) {
  return (
    <div className="cs-grid-2">
      <Card warn>
        <p style={{ ...T.eyebrow, marginBottom: 8 }}>{beforeLabel}</p>
        <p style={{ ...T.cardH, textDecoration: "line-through", textDecorationColor: "var(--text-muted)" }}>{before}</p>
      </Card>
      <Card>
        <p style={{ ...T.eyebrow, marginBottom: 8 }}>{afterLabel}</p>
        <p style={T.cardH}>{after}</p>
      </Card>
    </div>
  );
}

export type Row = { s: string; tone: "red" | "amber" | "grey" | "green"; rule: string };

// A status and a line, one per row.
export function Rows({ rows }: { rows: Row[] }) {
  return (
    <div className="cs-stats" style={{ gridTemplateColumns: "1fr" }}>
      {rows.map((r) => (
        <div key={r.rule} className="cs-kill cs-rows" style={{ background: "var(--bg)", padding: "16px 20px" }}>
          <div><Chip tone={r.tone}>{r.s}</Chip></div>
          <p style={T.cardH}>{r.rule}</p>
        </div>
      ))}
    </div>
  );
}

export function MoSCoW({ cols }: { cols: { h: string; tone: "red" | "amber" | "grey" | "green"; items: string[] }[] }) {
  return (
    <div className="cs-moscow">
      {cols.map((c) => (
        <Card key={c.h}>
          <div style={{ marginBottom: 10 }}><Chip tone={c.tone}>{c.h}</Chip></div>
          {c.items.map((t) => <p key={t} className="cs-moscow-item" style={{ ...T.body, marginBottom: 8 }}>{t}</p>)}
        </Card>
      ))}
    </div>
  );
}

export function Closing() {
  return (
    <section id="toc-credits" className="cs-credits">
      <h2 className="cs-act-title">Thanks for reading.</h2>
      <p className="cs-act-sub" style={{ margin: "0 auto 20px" }}>Got a question, or a better idea? I&apos;d love to hear it.</p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <Pill href="https://mail.google.com/mail/?view=cm&fs=1&to=devansh.think@gmail.com" primary external>Email me</Pill>
        <Pill href="https://www.linkedin.com/in/devansh-somvanshi" external>LinkedIn</Pill>
      </div>
    </section>
  );
}
