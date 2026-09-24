// Parts for a case study told as one continuous story, in the order of Ishita Sharma's EDGE case
// study: a hook, a persona walking through the screens scene by scene, then the turns behind them.
// Styles are the .story-* rules in globals.css.
import type { ReactNode } from "react";

export function Hook({ children }: { children: ReactNode }) {
  return <p className="story-hook">{children}</p>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="story-p">{children}</p>;
}

export function H2({ id, children }: { id?: string; children: ReactNode }) {
  return <h2 id={id} className="story-h2">{children}</h2>;
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="story-h3">{children}</h3>;
}

export function List({ items }: { items: ReactNode[] }) {
  return <ul className="story-list">{items.map((t, i) => <li key={i}>{t}</li>)}</ul>;
}

// The pause between two scenes, like Medium's three dots.
export function Dots() {
  return <div className="story-dots" aria-hidden>• • •</div>;
}

// The question a scene answers.
export function Ask({ children }: { children: ReactNode }) {
  return (
    <p className="story-ask">
      <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden><path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <span>{children}</span>
    </p>
  );
}

// What the person got out of the scene.
export function Outcome({ children }: { children: ReactNode }) {
  return (
    <p className="story-outcome">
      <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden><circle cx="10" cy="10" r="9" fill="currentColor" /><path d="M6 10.2l2.6 2.6L14 7.4" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <span>{children}</span>
    </p>
  );
}

// Someone's own words, set apart.
export function Voice({ q, who }: { q: string; who: string }) {
  return (
    <blockquote className="story-voice">
      <p>&ldquo;{q}&rdquo;</p>
      <cite>{who}</cite>
    </blockquote>
  );
}

// Sits in the text column; wide ones (three phones, grids, the live prototype) use the full width.
export function Fig({ children, caption, wide }: { children: ReactNode; caption?: ReactNode; wide?: boolean }) {
  return (
    <figure className={`story-fig${wide ? " is-wide" : ""}`}>
      {children}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
