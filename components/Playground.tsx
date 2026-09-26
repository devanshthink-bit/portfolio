"use client";
import { useState } from "react";
import "./playground.css";
import PlaygroundToy from "./PlaygroundToy";

// Things Devansh designs and builds with AI. To add one, add an entry here and drop a
// 1600px-wide screenshot in public/images/playground/. Newest first.
type Build = { name: string; line: string; href: string; image: string; site: string; tags: string[] };

const BUILDS: Build[] = [
  {
    name: "Kompass",
    line: "Answer real situations and see which political traditions, thinkers and parties think like you.",
    href: "https://devanshthink-bit.github.io/kompass/",
    image: "/images/playground/kompass.webp",
    site: "kompass",
    tags: ["Claude Code", "Next.js", "Quiz"],
  },
  {
    name: "Markdown Reader",
    line: "Drop in a messy .md file and read it as a typeset document, with an outline that follows you.",
    href: "https://devanshthink-bit.github.io/markdown-reader/",
    image: "/images/playground/markdown-reader.webp",
    site: "markdown-reader",
    tags: ["Claude Code", "JavaScript", "Reading tool"],
  },
];

function BuildCard({ b }: { b: Build }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  return (
    <a
      className="pg-card"
      href={b.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={(e) => { if (window.matchMedia("(hover: hover)").matches) setPos({ x: e.clientX, y: e.clientY }); }}
      onMouseLeave={() => setPos(null)}
    >
      <div className="pg-frame">
        <div className="pg-bar" aria-hidden><span /><span /><span /><em>{b.site}</em></div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={b.image} alt={`${b.name}, the live app`} loading="lazy" width={1600} height={1000} />
      </div>
      <div className="pg-meta">
        <p className="pg-name">{b.name}</p>
        <p className="pg-line">{b.line}</p>
        <p className="pg-chips">
          <span className="pg-chip is-live"><i aria-hidden />Live</span>
          {b.tags.map((t) => <span key={t} className="pg-chip">{t}</span>)}
        </p>
      </div>
      {pos && (
        <span className="pg-tip" style={{ left: pos.x + 18, top: pos.y + 18 }}>
          Try it
          {/* Lucide arrow-up-right, the same drawn arrow as the hero link */}
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ display: "inline-block", marginLeft: 4, verticalAlign: "-1px" }}>
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </span>
      )}
    </a>
  );
}

export default function Playground() {
  return (
    <section id="playground" className="section pg">
      <PlaygroundToy />
      <h3 className="section-title">Side projects</h3>
      <div className="pg-head">
        <h2>When not working, <span>I love <em className="pg-script">tinkering</em> with AI.</span></h2>
        <p>Tools I wanted and couldn&apos;t find, so I made them. All of them are live. Go and poke at them.</p>
      </div>
      <div className="pg-grid">
        {BUILDS.map((b) => <BuildCard key={b.name} b={b} />)}
      </div>
    </section>
  );
}
