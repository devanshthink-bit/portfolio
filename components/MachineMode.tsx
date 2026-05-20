"use client";
import { useState } from "react";

function playRubber() {
  try {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "triangle";
    osc.frequency.setValueAtTime(260, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.07);
    osc.onended = () => ctx.close();
  } catch (_) {}
}

const mono = "var(--font-geist-mono)";

const C = {
  bg:     "#0c0c0c",
  text:   "#e2e0db",
  dim:    "#2a2a2a",
  muted:  "#555",
  faint:  "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.07)",
  green:  "#10B981",
};

function Rule() {
  return <div style={{ borderTop: `1px solid ${C.border}`, margin: "32px 0" }} />;
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: C.muted, textTransform: "uppercase", margin: "0 0 18px 0" }}>
      {children}
    </p>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", gap: 20, alignItems: "baseline" }}>
      <span style={{ fontFamily: mono, fontSize: 10, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase", width: 88, flexShrink: 0 }}>{k}</span>
      <span style={{ fontFamily: mono, fontSize: 13, color: C.text, lineHeight: 1.6 }}>{v}</span>
    </div>
  );
}

function MachineContent() {
  return (
    <div style={{ position: "fixed", inset: 0, background: C.bg, overflowY: "auto", zIndex: 9990, fontFamily: mono }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "40px 56px 120px" }}>

        {/* Header */}
        <p style={{ fontFamily: mono, fontSize: 10, color: C.muted, letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 10px 0" }}>
          portfolio · machine-readable view
        </p>
        <h1 style={{ fontFamily: mono, fontSize: 24, fontWeight: 700, color: C.text, letterSpacing: "-0.02em", margin: "0 0 6px 0" }}>
          Devansh Somvanshi
        </h1>
        <p style={{ fontFamily: mono, fontSize: 13, color: C.muted, letterSpacing: "0.02em", margin: 0 }}>
          Product Designer · Design-Engineer Hybrid · AI-first
        </p>

        <Rule />

        {/* Status */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Row k="status"    v="Open to opportunities" />
          <Row k="whatsapp"  v="+91 6396483499" />
          <Row k="email"     v="devansh.think@gmail.com" />
          <Row k="location"  v="India" />
        </div>

        <Rule />

        {/* Profile */}
        <SectionLabel>Profile</SectionLabel>
        <p style={{ fontFamily: mono, fontSize: 13, color: C.text, lineHeight: 1.8, margin: "0 0 12px 0" }}>
          AI-first product designer who also ships code. 3+ years as a Software Development Engineer before moving fully into design. Works at the intersection of product, design, and engineering — with agentic AI integrated into the day-to-day workflow.
        </p>
        <p style={{ fontFamily: mono, fontSize: 13, color: C.muted, lineHeight: 1.8, margin: 0 }}>
          Previously shipped flagship products across workforce enablement (GoodWorker), hospitality (Stanza Living), and greentech (Devic Earth) — products serving 2M+ users total.
        </p>

        <Rule />

        {/* Metrics */}
        <SectionLabel>Metrics</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 40px" }}>
          {[
            ["3+ years",    "engineering experience"],
            ["4 products",  "shipped"],
            ["2M+ users",   "reached"],
            ["0→1 & scale", "both ends"],
          ].map(([num, label]) => (
            <div key={num} style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
              <span style={{ fontFamily: mono, fontSize: 16, fontWeight: 700, color: C.green }}>{num}</span>
              <span style={{ fontFamily: mono, fontSize: 11, color: C.muted }}>{label}</span>
            </div>
          ))}
        </div>

        <Rule />

        {/* Work */}
        <SectionLabel>Work</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>

          {/* 01 Sidedoor */}
          <div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontFamily: mono, fontSize: 10, color: C.muted }}>01</span>
              <span style={{ fontFamily: mono, fontSize: 14, fontWeight: 700, color: C.text }}>Sidedoor — Job Referral Platform</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 14px", marginBottom: 14, paddingLeft: 26 }}>
              {["0→1 Concept", "Mobile / iOS", "10 weeks", "Solo Product Designer", "Figma + FigJam"].map(t => (
                <span key={t} style={{ fontFamily: mono, fontSize: 11, color: C.muted }}>{t}</span>
              ))}
            </div>
            <div style={{ paddingLeft: 26, display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontFamily: mono, fontSize: 13, color: C.text, lineHeight: 1.75, margin: 0 }}>
                Problem: Referrals are 5-10× more effective than job portals, but the experience is broken — candidates send 40 cold DMs and hear back from 3. Referrers get spammed. Nobody tracks anything.
              </p>
              <p style={{ fontFamily: mono, fontSize: 13, color: C.text, lineHeight: 1.75, margin: 0 }}>
                Solution: 5-screen mobile flow.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, borderLeft: `2px solid ${C.dim}`, paddingLeft: 16 }}>
                {[
                  ["01", "Referrer Discovery",   "Ranked list by match %, alumni signals, response rate"],
                  ["02", "Structured Request",   "Guided form, fit points pre-suggested, JD auto-attached, preview before send"],
                  ["03", "Referrer Evaluation",  "Match breakdown, strengths/concerns, graded options (Decline / Review / Refer / Strongly Recommend)"],
                  ["04", "Shared Pipeline",      "Both sides see same status timeline, no ATS dependency"],
                  ["05", "Quality Over Volume",  "Request limits, ranked inbox, intentional friction filters low-intent senders"],
                ].map(([n, title, desc]) => (
                  <div key={n} style={{ display: "flex", gap: 10 }}>
                    <span style={{ fontFamily: mono, fontSize: 10, color: C.muted, width: 16, flexShrink: 0, marginTop: 2 }}>{n}</span>
                    <p style={{ fontFamily: mono, fontSize: 12, color: C.text, lineHeight: 1.65, margin: 0 }}>
                      <span style={{ fontWeight: 700 }}>{title}</span> — {desc}
                    </p>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: mono, fontSize: 11, color: C.muted, margin: 0 }}>
                North Star metric: Accepted referral requests per active user
              </p>
              <p style={{ fontFamily: mono, fontSize: 11, color: C.muted, margin: 0 }}>
                Research: 10 interviews · 11 competitors analyzed · AS-IS / TO-BE journey maps
              </p>
            </div>
          </div>

          {/* 02 Anthropic */}
          <div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontFamily: mono, fontSize: 10, color: C.muted }}>02</span>
              <span style={{ fontFamily: mono, fontSize: 14, fontWeight: 700, color: C.text }}>Anthropic Console — Design System</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 14px", marginBottom: 14, paddingLeft: 26 }}>
              {["Design System", "12+ surfaces", "Product Designer"].map(t => (
                <span key={t} style={{ fontFamily: mono, fontSize: 11, color: C.muted }}>{t}</span>
              ))}
            </div>
            <div style={{ paddingLeft: 26 }}>
              <p style={{ fontFamily: mono, fontSize: 13, color: C.text, lineHeight: 1.75, margin: 0 }}>
                Component system powering Claude's interface across the Anthropic console, API playground, documentation, and internal tooling — consistent at 12+ product surfaces.
              </p>
            </div>
          </div>

          {/* 03 Meta Reels */}
          <div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontFamily: mono, fontSize: 10, color: C.muted }}>03</span>
              <span style={{ fontFamily: mono, fontSize: 14, fontWeight: 700, color: C.text }}>Meta Reels — End-to-end Product</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 14px", marginBottom: 14, paddingLeft: 26 }}>
              {["End-to-end Product", "3B+ users", "Mobile", "Product Designer / SDE"].map(t => (
                <span key={t} style={{ fontFamily: mono, fontSize: 11, color: C.muted }}>{t}</span>
              ))}
            </div>
            <div style={{ paddingLeft: 26 }}>
              <p style={{ fontFamily: mono, fontSize: 13, color: C.text, lineHeight: 1.75, margin: 0 }}>
                End-to-end product design and creator tooling for Meta Reels at 3B+ user scale.
              </p>
            </div>
          </div>
        </div>

        <Rule />

        {/* Experience */}
        <SectionLabel>Experience</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[
            { company: "GoodWorker",    role: "SDE → Product Designer", domain: "Workforce enablement", note: "Flagship product · 1M+ users" },
            { company: "Stanza Living", role: "SDE",                    domain: "Hospitality tech",     note: "Mobile-first products" },
            { company: "Devic Earth",   role: "SDE",                    domain: "Greentech",            note: "Product + engineering" },
          ].map((item, i, arr) => (
            <div key={item.company} style={{ display: "flex", gap: 16, padding: "12px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.dim}` : "none" }}>
              <span style={{ fontFamily: mono, fontSize: 13, fontWeight: 700, color: C.text, width: 130, flexShrink: 0 }}>{item.company}</span>
              <div>
                <span style={{ fontFamily: mono, fontSize: 12, color: C.text }}>{item.role}</span>
                <span style={{ fontFamily: mono, fontSize: 11, color: C.muted, marginLeft: 14 }}>{item.domain} · {item.note}</span>
              </div>
            </div>
          ))}
        </div>

        <Rule />

        {/* Skills */}
        <SectionLabel>Skills & Tools</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { cat: "Design", items: ["Figma", "FigJam", "Framer", "Notion", "Google Analytics", "Design Systems", "UX Research", "Interaction Design", "Information Architecture", "Visual Design", "Accessibility", "Rapid Prototyping", "Systems Thinking", "Product Thinking"] },
            { cat: "Dev",    items: ["React", "Next.js", "TypeScript", "React Native", "Flutter", "Storybook", "Tailwind", "Git", "PWAs"] },
            { cat: "AI",     items: ["Claude Code", "Cursor", "Codex", "Figma Make", "Antigravity", "Agent Orchestration", "Design-to-Code Workflows", "Prompt Systems", "LLM Integration", "Design Workflow Automation", "AI Research & Synthesis"] },
          ].map(({ cat, items }) => (
            <div key={cat} style={{ display: "flex", gap: 16 }}>
              <span style={{ fontFamily: mono, fontSize: 10, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase", width: 52, flexShrink: 0, paddingTop: 2 }}>{cat}</span>
              <p style={{ fontFamily: mono, fontSize: 12, color: C.text, lineHeight: 1.9, margin: 0 }}>
                {items.join("  ·  ")}
              </p>
            </div>
          ))}
        </div>

        <Rule />

        {/* Design Principles */}
        <SectionLabel>Design Principles</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {[
            { n: "01", title: "Complexity is a design failure",           body: "Every extra tap, every unexplained label is a debt. Simplicity is earned, not given." },
            { n: "02", title: "Design for the system, not the screen",    body: "The experience lives in transitions, not the happy path. Think in flows before components." },
            { n: "03", title: "Shipping code changes how I design",       body: "I ask different questions because I've shipped production features — what's expensive to change, what's cheap to animate." },
            { n: "04", title: "AI should reduce friction, not add features", body: "Does this make the user faster, or just more dependent? AI that helps you think better is good design." },
            { n: "05", title: "Ship early, then learn",                   body: "Real insight comes from usage, not debates in Figma. The feedback from shipping is the research you couldn't plan for." },
          ].map(p => (
            <div key={p.n} style={{ display: "flex", gap: 16 }}>
              <span style={{ fontFamily: mono, fontSize: 10, color: C.muted, width: 20, flexShrink: 0, paddingTop: 3 }}>{p.n}</span>
              <div>
                <p style={{ fontFamily: mono, fontSize: 13, fontWeight: 700, color: C.text, margin: "0 0 4px 0" }}>{p.title}</p>
                <p style={{ fontFamily: mono, fontSize: 12, color: C.muted, lineHeight: 1.65, margin: 0 }}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>

        <Rule />

        {/* Contact */}
        <SectionLabel>Contact</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Row k="whatsapp" v="+91 6396483499" />
          <Row k="email"    v="devansh.think@gmail.com" />
          <Row k="resume"   v="Available on request" />
        </div>

        {/* Footer */}
        <div style={{ marginTop: 52, paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
          <p style={{ fontFamily: mono, fontSize: 10, color: C.muted, letterSpacing: "0.06em", margin: 0 }}>
            MACHINE-READABLE VIEW · DEVANSH SOMVANSHI PORTFOLIO
          </p>
        </div>

      </div>
    </div>
  );
}

export default function MachineMode({ children }: { children: React.ReactNode }) {
  const [machine, setMachine] = useState(false);

  return (
    <>
      {machine ? <MachineContent /> : children}

      {/* Floating segmented toggle */}
      <div
        style={{
          position: "fixed",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          display: "flex",
          background: "#161616",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 8,
          padding: 3,
          boxShadow: "0 6px 28px rgba(0,0,0,0.38)",
        }}
      >
        <button
          onClick={() => { playRubber(); setMachine(false); }}
          style={{
            background: !machine ? "rgba(255,255,255,0.13)" : "transparent",
            border: "none",
            cursor: "pointer",
            padding: "6px 12px",
            borderRadius: 5,
            fontFamily: mono,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
            color: !machine ? "#fff" : "rgba(255,255,255,0.35)",
            transition: "all 0.18s ease",
            whiteSpace: "nowrap",
          }}
        >
          Human
        </button>
        <button
          onClick={() => { playRubber(); setMachine(true); }}
          style={{
            background: machine ? "rgba(16,185,129,0.18)" : "transparent",
            border: "none",
            cursor: "pointer",
            padding: "6px 12px",
            borderRadius: 5,
            fontFamily: mono,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
            color: machine ? C.green : "rgba(255,255,255,0.35)",
            transition: "all 0.18s ease",
            whiteSpace: "nowrap",
          }}
        >
          Machine
        </button>
      </div>
    </>
  );
}
