"use client";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote: "Played a key role in building Goodworker's flagship product, contributing to critical projects with structured problem-solving, strong technical skills, and clear communication across teams.",
    name: "Priyam Shaw",
    role: "EM @ Goodworker, Ex-Myntra",
    avatar: "/images/testimonial-priyam.jpg",
  },
  {
    quote: "Delivered high-quality mobile features across iOS and Android, owning end-to-end development with strong React expertise, maintainable solutions, and dependable collaboration under tight timelines.",
    name: "Kunal Sagar",
    role: "STPM @ LinkedIn, Ex-Nineleaps",
    avatar: "/images/testimonial-kunal.jpg",
  },
  {
    quote: "Demonstrates expertise in React, TypeScript, and design patterns, enabling frontend development while collaborating with attention to detail and bringing enthusiasm to team dynamics.",
    name: "Swaraj Kausik",
    role: "SE-2 @ Pinelabs, Ex-Goodworker",
    avatar: "/images/testimonial-swaraj.jpg",
  },
  {
    quote: "Consistently goes above and beyond to support team goals, showing reliability with ownership, proactive initiative, eagerness to improve, and strong work ethic in collaborative environments.",
    name: "Ashish Shetty",
    role: "SSE @ EPAM, Ex-Goodworker",
    avatar: "/images/testimonial-ashish.jpg",
  },
];

export default function About() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const mql = window.matchMedia("(max-width: 640px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 56, marginTop: 24 }}>
      <div className="section">
        <h3 className="section-title">About Me</h3>
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: 10, overflow: "hidden" }}>
          <Image
            src="/images/about.jpg"
            alt="Devansh at the beach"
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 32 }}>
          <h2 style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: "26px", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.4, color: "var(--text-primary)", margin: 0 }}>Designing with craft, building with code.</h2>
          <p className="section-body" style={{ margin: 0 }}>
            I didn&apos;t grow up calling it design, but I was always curious about how things worked.
          </p>
          <p className="section-body" style={{ margin: 0 }}>
            My first exposure to it was on my mom&apos;s Samsung Galaxy R — I&apos;d spend hours exploring apps, downloading random ones, almost in awe of how they worked. I didn&apos;t have the word for it back then, but I was already falling in love with <strong>product design</strong>.
          </p>
          <p className="section-body" style={{ margin: 0 }}>
            Before screens took over, I was obsessed with cars. That instinct for how things feel and function stayed — it just shifted from physical objects to digital products.
          </p>
          <p className="section-body" style={{ margin: 0 }}>
            Today, I see myself as a <strong>design–engineer </strong>hybrid working at the intersection of design, engineering, and product. I don&apos;t just design — I build and ship product features, integrating agentic AI into my workflows.
          </p>
          <p className="section-body" style={{ margin: 0 }}>
            With tools like Claude Code, Cursor, and Codex, I accelerate development and move ideas from concept to shipped features. As a Software Development Engineer previously, I&apos;ve worked on shipping flagship products across workforce enablement, hospitality, and greentech at <strong>GoodWorker</strong>, <strong>Stanza Living</strong>, and <strong>Devic Earth</strong>, with products serving over a <strong>million</strong> users.
          </p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="section">
        <h3 className="section-title">In Their Words</h3>
        <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 16 }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ background: "var(--card-bg)", borderRadius: 10, padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 28, lineHeight: 1, display: "block", marginBottom: -8, color: "var(--text-muted)", fontFamily: "Georgia, serif", userSelect: "none" }}>&ldquo;</span>
                <p style={{ fontSize: 12, fontWeight: 400, lineHeight: 1.55, letterSpacing: "-0.01em", color: "var(--text-secondary)", margin: 0 }}>{t.quote}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <img src={t.avatar} alt={t.name} style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: "-0.01em", color: "var(--text-primary)", margin: 0 }}>{t.name}</p>
                  <p style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "-0.01em", margin: "2px 0 0" }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
