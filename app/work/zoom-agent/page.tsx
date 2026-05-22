import { Space_Grotesk } from "next/font/google";
import RubberBackButton from "../../../components/RubberBackButton";
import ZoomAgentTOCClient from "../../../components/ZoomAgentTOCClient";

const spaceGrotesk = Space_Grotesk({ weight: ["600", "700"], subsets: ["latin"] });

// ── Zoom brand color palette ──────────────────────────────────────────────────
const Z = {
  primary: "#0E71EB",
  dark:    "#003374",
  mid:     "#0056D6",
  teal:    "#0098DB",
  light:   "#6DB8FF",
  bg:      "#EBF3FF",
  darkBg:  "#E5EEF9",
  midBg:   "#EBF0FF",
  tealBg:  "#E5F5FD",
  lightBg: "#F0F7FF",
};

// ── Utility ───────────────────────────────────────────────────────────────────

function E({ children }: { children: string }) {
  return (
    <span style={{ fontFamily: '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif', fontStyle: "normal", fontWeight: "normal", marginRight: 8, display: "inline-block" }}>
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 16px 0" }}>
      {children}
    </p>
  );
}

function StageBadge({ label, color }: { label: string; color: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", background: color, color: "#fff", borderRadius: 4, padding: "1px 8px", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", marginRight: 10, verticalAlign: "2px", lineHeight: 1.6 }}>
      {label}
    </span>
  );
}

// Dotted divider — Zoom-specific
function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "60px 0" }}>
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: Z.primary, opacity: 0.35 }} />
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
    </div>
  );
}

// Left-bordered blockquote moment — Zoom-specific
function Moment({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ margin: "44px 0", paddingLeft: 22, borderLeft: `3px solid ${Z.primary}` }}>
      <p style={{ fontFamily: "var(--font-manrope)", fontSize: 18, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.55, margin: 0, letterSpacing: "-0.025em" }}>
        {children}
      </p>
    </div>
  );
}

// Top-bordered story block — DIFFERENT from SideDoor's left-border version
function StoryBlock({ children, color, bg }: { children: React.ReactNode; color?: string; bg?: string }) {
  return (
    <div style={{ background: bg || "var(--bg)", borderTop: color ? `3px solid ${color}` : "1px solid var(--border)", border: `1px solid var(--border)`, borderTopWidth: color ? 3 : 1, borderTopColor: color || "var(--border)", borderRadius: 8, padding: "24px 28px", margin: "28px 0" }}>
      {children}
    </div>
  );
}

function Callout({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <div style={{ background: accent ? `${accent}0d` : "var(--cs-callout-bg)", borderRadius: 8, padding: "20px 24px", margin: "28px 0", border: accent ? `1px solid ${accent}30` : "none" }}>
      {children}
    </div>
  );
}

function ImagePlaceholder({ label: _label, aspect = "16/9" }: { label: string; aspect?: string }) {
  return (
    <div style={{ width: "100%", aspectRatio: aspect, background: `linear-gradient(135deg, ${Z.bg} 0%, ${Z.light}55 45%, ${Z.bg} 100%)`, borderRadius: 10, margin: "28px 0" }} />
  );
}

// ── NEW: Editorial stat row — horizontal strips, not boxes ────────────────────
function StatRows({ stats }: { stats: { number: string; label: string; source: string }[] }) {
  return (
    <div style={{ margin: "28px 0" }}>
      {stats.map((s, i, arr) => (
        <div key={s.number} style={{ display: "flex", alignItems: "flex-start", gap: 32, padding: "20px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
          <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 38, fontWeight: 700, color: Z.primary, letterSpacing: "-0.045em", minWidth: 120, flexShrink: 0, lineHeight: 1 }}>{s.number}</div>
          <div style={{ paddingTop: 6 }}>
            <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 5px 0", letterSpacing: "-0.01em" }}>{s.label}</p>
            <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--text-muted)", margin: 0, letterSpacing: "0.04em", fontStyle: "italic" }}>via {s.source}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── NEW: Capability matrix — rows, not icon cards ─────────────────────────────
function CapabilityMatrix({ items }: { items: { label: string; status: "solved" | "missing" | "shallow"; note: string }[] }) {
  const statusColor = { solved: Z.teal, missing: "#ef4444", shallow: Z.mid };
  const statusLabel = { solved: "Solved", missing: "Missing", shallow: "Partial" };
  return (
    <div style={{ margin: "28px 0", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
      {items.map((item, i, arr) => (
        <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", background: "var(--bg)", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, fontWeight: 700, color: "#fff", background: statusColor[item.status], borderRadius: 4, padding: "2px 8px", flexShrink: 0, letterSpacing: "0.04em" }}>
            {statusLabel[item.status]}
          </span>
          <p style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: 0, flex: 1, letterSpacing: "-0.02em" }}>{item.label}</p>
          <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0, flexShrink: 0, fontStyle: "italic" }}>{item.note}</p>
        </div>
      ))}
    </div>
  );
}

// ── NEW: Role description rows — editorial, not color cards ───────────────────
function RoleRows({ roles }: { roles: { label: string; sub: string; desc: string }[] }) {
  return (
    <div style={{ margin: "20px 0" }}>
      {roles.map((r, i, arr) => (
        <div key={r.label} style={{ display: "flex", gap: 0, paddingBottom: i < arr.length - 1 ? 20 : 0, marginBottom: i < arr.length - 1 ? 20 : 0, borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
          <div style={{ minWidth: 160, paddingRight: 28, borderRight: "1px solid var(--border)", flexShrink: 0 }}>
            <p style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 3px 0", letterSpacing: "-0.02em" }}>{r.label}</p>
            <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: Z.primary, textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>{r.sub}</p>
          </div>
          <div style={{ paddingLeft: 28 }}>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, margin: 0, letterSpacing: "-0.01em" }}>{r.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── NEW: Metric comparison rows — before→after, not arrow badges ──────────────
function MetricRows({ metrics }: { metrics: { label: string; before: string; after: string; story: string }[] }) {
  return (
    <div style={{ margin: "28px 0", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
      {metrics.map((m, i, arr) => (
        <div key={m.label} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 20, padding: "16px 20px", background: "var(--bg)", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none", alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: "0 0 3px 0", letterSpacing: "-0.02em" }}>{m.label}</p>
            <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0, fontStyle: "italic", letterSpacing: "-0.01em" }}>{m.story}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 12, color: "var(--text-muted)", letterSpacing: "-0.02em", textDecoration: "line-through" }}>{m.before}</span>
            <span style={{ fontSize: 10, color: "var(--text-muted)" }}>→</span>
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 13, fontWeight: 700, color: Z.primary, letterSpacing: "-0.02em" }}>{m.after}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Type scale ────────────────────────────────────────────────────────────────
const T = {
  h2:        { fontFamily: "var(--font-manrope)", fontSize: 26, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.04em", lineHeight: 1.3, margin: 0 } as React.CSSProperties,
  h3:        { fontFamily: "var(--font-manrope)", fontSize: 18, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.4, margin: "0 0 12px 0" } as React.CSSProperties,
  h3gap:     { fontFamily: "var(--font-manrope)", fontSize: 18, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.4, margin: "36px 0 12px 0" } as React.CSSProperties,
  body:      { fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, letterSpacing: "-0.01em", margin: "0 0 14px 0" } as React.CSSProperties,
  bodyLast:  { fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, letterSpacing: "-0.01em", margin: 0 } as React.CSSProperties,
  small:     { fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, letterSpacing: "-0.01em", margin: 0 } as React.CSSProperties,
  eyebrow:   { fontFamily: "var(--font-geist-mono)", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", margin: 0 } as React.CSSProperties,
  callout:   { fontFamily: "var(--font-manrope)", fontSize: 16, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.55, margin: "0 0 10px 0" } as React.CSSProperties,
  calloutSub:{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, letterSpacing: "-0.01em", margin: 0 } as React.CSSProperties,
};

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ZoomAgentCaseStudy() {
  return (
    <main style={{ padding: "40px 0 96px" }}>
      <ZoomAgentTOCClient />
      <RubberBackButton />

      {/* Cover */}
      <div style={{ width: "100%", aspectRatio: "16/9", background: `linear-gradient(135deg, ${Z.bg} 0%, ${Z.light} 40%, ${Z.primary} 70%, ${Z.dark} 100%)`, borderRadius: 10, marginBottom: 40 }} />

      {/* Title — Space Grotesk */}
      <SectionLabel>Case Study · AI Product Design</SectionLabel>
      <h1 className={spaceGrotesk.className} style={{ fontSize: 44, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.1, margin: "0 0 14px 0" }}>
        <span style={{ color: Z.primary }}>Zoom</span> AI Agent
      </h1>
      <p style={{ fontFamily: "var(--font-manrope)", fontSize: 20, fontWeight: 500, color: "var(--text-secondary)", letterSpacing: "-0.025em", lineHeight: 1.4, margin: "0 0 36px 0" }}>
        The AI that doesn&apos;t just sit in your meetings. It helps you actually finish them.
      </p>

      {/* Metadata */}
      <div className="cs-meta-strip" style={{ padding: "20px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", marginBottom: 52 }}>
        {[
          { label: "Role", value: "Senior Product Designer" },
          { label: "Timeline", value: "12 weeks" },
          { label: "Tools", value: "Figma, FigJam, Dovetail" },
          { label: "Platform", value: "Desktop · Web" },
          { label: "Type", value: "0→1 Feature" },
        ].map((item) => (
          <div key={item.label}>
            <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px 0" }}>{item.label}</p>
            <p style={{ fontSize: 14, color: "var(--text-primary)", letterSpacing: "-0.02em", margin: 0 }}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* ── Hook ─────────────────────────────────────────────────────── */}
      <p style={{ fontFamily: "var(--font-manrope)", fontSize: 28, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.35, margin: "0 0 24px 0", letterSpacing: "-0.04em" }}>
        It&apos;s 5:17 pm. Your product review just ended. Six decisions made. Twelve things someone said they&apos;d do. You left the call feeling like things finally moved.
      </p>
      <p style={T.body}>By Wednesday afternoon, your PM pings: <em>&quot;Wait, did we decide on March or April?&quot;</em> You check your notes — a wall of half-sentences and timestamps. You&apos;re not sure.</p>
      <p style={T.body}>By Thursday, the engineer who said he&apos;d &quot;look into it&quot; hasn&apos;t. Not because he forgot exactly. He thought you owned it. You thought he did.</p>
      <p style={T.body}>By Friday, there&apos;s a calendar invite in your inbox: <strong>Meeting follow-up.</strong></p>
      <p style={{ fontFamily: "var(--font-manrope)", fontSize: 20, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.4, margin: "20px 0 0 0" }}>
        You just scheduled a meeting about a meeting.
      </p>

      <Divider />

      {/* ── Broken pattern ────────────────────────────────────────────── */}
      <div id="toc-problem" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>The broken pattern</SectionLabel>
      <h2 style={T.h2}>This isn&apos;t a you problem. It&apos;s a systems problem.</h2>
      <p style={{ ...T.body, marginTop: 16 }}>Every team has a version of this story. The meeting felt productive. The week after it didn&apos;t.</p>

      {/* Editorial stat rows — not SideDoor's 2×2 grid */}
      <StatRows stats={[
        { number: "14.8 hrs", label: "the average professional spends in meetings every week — that's 37% of a 40-hour workweek.", source: "Asana State of Work 2024" },
        { number: "44%",      label: "of action items from meetings never get completed. Nearly half of everything decided just stops.", source: "meetingtoll.com" },
        { number: "70%",      label: "of decisions made in meetings are forgotten within 24 hours. Not misremembered. Gone.", source: "fellow.ai research" },
        { number: "3–4×",    label: "the number of times teams reschedule the same topic before it finally gets resolved.", source: "meeting analytics research" },
      ]} />

      <p style={T.body}>The tools that exist today — Otter, Fireflies, Copilot, Grain — are all solving a different problem. They record. They transcribe. They summarize. They are very good at telling you what happened in a meeting.</p>
      <p style={T.bodyLast}>None of them help you do anything about it.</p>

      <Divider />

      {/* ── Reframe ───────────────────────────────────────────────────── */}
      <div id="toc-reframe" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>What we were actually building</SectionLabel>
      <h2 style={T.h2}>Not better notes. Execution infrastructure.</h2>
      <p style={{ ...T.body, marginTop: 16 }}>Zoom AI Companion already had excellent transcription and summarization. That wasn&apos;t the gap. The gap was everything that should happen between a decision being made and a decision being acted on.</p>

      {/* Two-column "not vs yes" — different treatment */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden", margin: "28px 0" }}>
        <div style={{ padding: "22px 24px", borderRight: "1px solid var(--border)" }}>
          <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, fontWeight: 600, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 14px 0" }}>Not this</p>
          {["Better transcription", "Smarter summaries", "A meeting chatbot"].map((item) => (
            <p key={item} style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 6px 0", letterSpacing: "-0.01em", textDecoration: "line-through" }}>{item}</p>
          ))}
        </div>
        <div style={{ padding: "22px 24px", background: Z.bg }}>
          <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, fontWeight: 600, color: Z.primary, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 14px 0" }}>This instead</p>
          {["Captures decisions as they happen", "Assigns ownership with context", "Follows up so you don't have to"].map((item) => (
            <p key={item} style={{ fontSize: 13, color: "var(--text-primary)", margin: "0 0 6px 0", letterSpacing: "-0.01em", fontWeight: 500 }}>{item}</p>
          ))}
        </div>
      </div>

      <Callout accent={Z.primary}>
        <p style={{ ...T.callout, margin: 0 }}>
          The meeting is not the product. What happens after the meeting is the product. We were building the connective tissue between a decision and its outcome.
        </p>
      </Callout>

      <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", margin: "40px 0 16px 0" }}>Who I was designing for</p>

      {/* Editorial role descriptions — not color cards */}
      <RoleRows roles={[
        { label: "The team lead", sub: "PM · EM · Squad lead", desc: "Runs 8–12 meetings a week. Accountable for outcomes. Spends Monday morning piecing together what happened last Thursday." },
        { label: "The IC participant", sub: "Engineer · Designer", desc: "Gets assigned work verbally. Finds out Wednesday what they were supposed to start Monday. Ownership is always ambiguous." },
        { label: "The manager", sub: "Director · VP", desc: "Needs visibility into whether anything is actually moving. Finds out about blockers when it's already too late to unblock them." },
      ]} />

      <Divider />

      {/* ── Solution ──────────────────────────────────────────────────── */}
      <div id="toc-solution" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>The solution, across four moments</SectionLabel>
      <h2 style={T.h2}>A meeting has a before, a during, and an after. Most tools only cover the during.</h2>
      <p style={{ ...T.body, marginTop: 16 }}>The agent lives across all four moments. Each one hands off to the next. Nothing falls through the gap.</p>

      <Divider />

      {/* Screen 1 — Before */}
      <SectionLabel><StageBadge label="BEFORE" color={Z.dark} />Pre-Meeting Brief</SectionLabel>
      <h2 style={{ ...T.h3, fontSize: 18, margin: "0 0 16px 0" }}><E>➡️</E>How does a team walk into a meeting knowing exactly what&apos;s unfinished from last time?</h2>
      <StoryBlock color={Z.dark} bg={Z.darkBg}>
        <p style={T.callout}>Fifteen minutes before the standup, the agent sends a brief. Not a summary — a status report. Three things from last week that still aren&apos;t done. Two decisions that were made but never actioned. One recurring blocker that has now come up in four meetings.</p>
        <p style={T.calloutSub}>You walk into the meeting already knowing where the bodies are buried.</p>
      </StoryBlock>
      <Callout accent={Z.dark}>
        <p style={{ ...T.callout, margin: 0 }}><E>🎯</E>The meeting starts with shared context, not 10 minutes of &quot;wait, where did we land on that?&quot;</p>
      </Callout>
      <ImagePlaceholder label="Screen 1 · Pre-Meeting Brief · Unresolved items, pending owners, recurring blockers, agenda context" />
      <p style={T.bodyLast}>The brief is personalized to your role. The team lead sees ownership gaps. The IC sees only their open items. The manager sees team-level blockers. Same data, different lenses.</p>

      <Moment>You stopped walking into meetings blind. The agent told you what was broken before anyone had to say it out loud. 📋</Moment>

      <Divider />

      {/* Screen 2 — Live */}
      <SectionLabel><StageBadge label="LIVE" color={Z.primary} />In-Meeting Co-pilot</SectionLabel>
      <h2 style={{ ...T.h3, fontSize: 18, margin: "0 0 16px 0" }}><E>➡️</E>How does the AI capture what&apos;s decided without interrupting the conversation?</h2>
      <StoryBlock color={Z.primary} bg={Z.bg}>
        <p style={T.callout}>The agent runs silently in a sidebar. As the conversation moves, it detects decisions and action items in real time — not after the call, during it. You can confirm, correct, or reassign with a single tap while the meeting is still live.</p>
        <p style={T.calloutSub}>Nothing goes into the system without you seeing it first. The agent shows its work inline, so you know exactly why it flagged something.</p>
      </StoryBlock>
      <Callout accent={Z.primary}>
        <p style={{ ...T.callout, margin: 0 }}><E>🎯</E>By the time the meeting ends, the action items are already structured, owned, and ready. Not a wall of text — a list of commitments.</p>
      </Callout>
      <ImagePlaceholder label="Screen 2 · Live Co-pilot · Real-time decision detection, action item sidebar, inline confirm/edit, confidence indicators" />
      <p style={T.body}>The agent is intentionally light during the meeting. No popups. No audio. It surfaces things in a way that doesn&apos;t demand your attention — but is ready when you look.</p>
      <p style={T.bodyLast}>When someone says &quot;I&apos;ll take that&quot; — it assigns it. When someone says &quot;let&apos;s decide by EOD&quot; — it sets the deadline. When two people talk over each other about ownership — it flags the conflict for you to resolve.</p>

      <Moment>The engineer didn&apos;t take notes. He didn&apos;t need to. His two action items were already in his inbox when the call ended. ⚡</Moment>

      <Divider />

      {/* Screen 3 — After */}
      <SectionLabel><StageBadge label="AFTER" color={Z.teal} />Execution Handoff</SectionLabel>
      <h2 style={{ ...T.h3, fontSize: 18, margin: "0 0 16px 0" }}><E>➡️</E>How do you turn a 45-minute meeting into a clear plan in under 2 minutes?</h2>
      <StoryBlock color={Z.teal} bg={Z.tealBg}>
        <p style={T.callout}>Within minutes of the call ending, the agent generates a structured handoff. Not a transcript. Not a summary paragraph. A proper execution document: decisions made, open questions, owners, deadlines, and a draft follow-up message ready to send.</p>
        <p style={T.calloutSub}>You review it, make any edits, and approve. The agent sends it. Everyone who was in the meeting — and everyone who wasn&apos;t — gets the same version of what happened.</p>
      </StoryBlock>
      <Callout accent={Z.teal}>
        <p style={{ ...T.callout, margin: 0 }}><E>🎯</E>The &quot;can you send meeting notes?&quot; message stops existing. The handoff is already in everyone&apos;s inbox.</p>
      </Callout>
      <ImagePlaceholder label="Screen 3 · Execution Handoff · Decisions, owners, deadlines, open questions, draft follow-up ready for approval" />
      <p style={T.bodyLast}>The handoff is also where the agent nudges. If a deadline is set for Friday and it&apos;s now Thursday morning, it sends a quiet check-in. Not spam — a single, well-timed prompt.</p>

      <Moment>The PM didn&apos;t write the follow-up email. The agent drafted it. She changed two words and hit send. It took 40 seconds. 🤝</Moment>

      <Divider />

      {/* Screen 4 — Always */}
      <SectionLabel><StageBadge label="ALWAYS" color={Z.mid} />Approval &amp; Trust Controls</SectionLabel>
      <h2 style={{ ...T.h3, fontSize: 18, margin: "0 0 16px 0" }}><E>➡️</E>How do you give the AI room to act without losing control of what it does?</h2>
      <StoryBlock color={Z.mid} bg={Z.midBg}>
        <p style={T.callout}>The agent never sends, assigns, or acts on anything without your approval first. Every proposed action shows up as a card: what the AI wants to do, why it thinks that, and three options — approve, edit, or dismiss.</p>
        <p style={T.calloutSub}>Over time, if you keep approving certain types of actions without editing them, the agent learns that pattern and can do those things automatically. Trust is earned, not assumed.</p>
      </StoryBlock>
      <Callout accent={Z.mid}>
        <p style={{ ...T.callout, margin: 0 }}><E>🎯</E>You control how much the agent does on its own. It starts conservative. It gets more capable as you get more comfortable.</p>
      </Callout>
      <ImagePlaceholder label="Screen 4 · Approval Flow · Action cards with AI reasoning, approve/edit/dismiss, autonomy dial, trust settings" />
      <p style={T.body}>The trust controls live in a settings panel. You can set autonomy by action type: &quot;send follow-ups automatically&quot; but &quot;always ask before assigning to someone else.&quot; Granular, predictable, yours.</p>
      <p style={T.bodyLast}>Every automated action shows up in a log. Not buried in settings — visible in the main interface, always. You can undo anything within 2 hours.</p>

      <Moment>She didn&apos;t worry about the agent doing something weird. She could see exactly what it had done — and undo any of it. That&apos;s what made her comfortable letting it do more. 🔒</Moment>

      <Divider />

      {/* Screen 5 — Memory */}
      <SectionLabel><StageBadge label="MEMORY" color={Z.dark} />Cross-Meeting Memory</SectionLabel>
      <h2 style={{ ...T.h3, fontSize: 18, margin: "0 0 16px 0" }}><E>➡️</E>How do you stop relitigating things that were decided three meetings ago?</h2>
      <StoryBlock color={Z.dark} bg={Z.lightBg}>
        <p style={T.callout}>The agent keeps a running memory of your team&apos;s decisions, open questions, and recurring themes — across every meeting, going back months. Ask it anything: &quot;What did we decide about the API versioning approach?&quot; It tells you, with context, with the date, with who was in the room.</p>
        <p style={T.calloutSub}>The memory view surfaces patterns you wouldn&apos;t see otherwise: the topic that keeps getting raised and never resolved, the person whose items are always overdue, the decision revisited four times.</p>
      </StoryBlock>
      <Callout accent={Z.dark}>
        <p style={{ ...T.callout, margin: 0 }}><E>🎯</E>The team stopped asking &quot;didn&apos;t we discuss this before?&quot; They already knew the answer before anyone opened their mouth.</p>
      </Callout>
      <ImagePlaceholder label="Screen 5 · Cross-Meeting Memory · Decision history, recurring blockers, unresolved timeline, natural language search" />
      <p style={T.bodyLast}>This is the compound interest feature. Each meeting adds to the memory. The more you use it, the more useful it becomes. It turns a series of disconnected conversations into something that actually learns.</p>

      <Moment>The new engineer asked what the team had decided about auth. The agent answered in 8 seconds. Nobody had to find the right Slack thread. 🧠</Moment>

      <Divider />

      {/* ── Trust ─────────────────────────────────────────────────────── */}
      <div id="toc-trust" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>The hardest design problem</SectionLabel>
      <h2 style={T.h2}>People don&apos;t want an AI that acts. They want an AI that helps them act.</h2>
      <p style={{ ...T.body, marginTop: 16 }}>This distinction drove more decisions in this project than anything else.</p>
      <p style={T.body}>Every tool I analyzed had the same failure mode: it would do things on your behalf and then tell you about it. Users hated it. Not because the actions were wrong. Because they didn&apos;t feel in control. Autonomy without visibility breeds anxiety, not trust.</p>

      {/* Trust principles — stacked full-width cards with top accent, NOT SideDoor flat rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "28px 0" }}>
        {[
          { n: "01", title: "Show your work", desc: "Every AI action includes a one-line explanation: why it flagged this, why it assigned this person, why it set this deadline. Not buried in a tooltip — right there, visible. Users could agree, disagree, or correct it." },
          { n: "02", title: "Ask before acting", desc: "The agent proposes; the human decides. Every single time, until the user actively changes that setting. Trust is built by seeing the agent make good suggestions repeatedly — not by it acting before you're ready." },
          { n: "03", title: "Earn autonomy over time", desc: "The more consistently you approve a type of action without editing it, the more the agent infers you trust it for that specific thing. Autonomy is task-specific, not global." },
          { n: "04", title: "Undo anything", desc: "Every automated action is reversible for 2 hours. When you know you can undo it, you're much more willing to let it try. The undo log is visible, prominent, and always one tap away." },
        ].map((p) => (
          <div key={p.n} style={{ borderTop: `2px solid ${Z.primary}`, background: Z.bg, borderRadius: "0 0 8px 8px", padding: "20px 24px" }}>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, fontWeight: 700, color: Z.primary, letterSpacing: "0.08em", flexShrink: 0, marginTop: 3 }}>{p.n}</span>
              <div>
                <p style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 4px 0", letterSpacing: "-0.02em" }}>{p.title}</p>
                <p style={T.calloutSub}>{p.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Callout accent={Z.mid}>
        <p style={{ ...T.callout, margin: "0 0 8px 0" }}>The Autonomy Dial</p>
        <p style={T.calloutSub}>Instead of a binary AI on/off toggle, the system has a spectrum. Level 1: suggest only. Level 2: draft for review. Level 3: act on low-stakes items. Level 4: fully autonomous within defined limits. Users start at Level 1. Moving up requires deliberate action, not just time.</p>
      </Callout>

      <Divider />

      {/* ── Process ───────────────────────────────────────────────────── */}
      <div id="toc-process" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>The design process, start to finish</SectionLabel>
      <h2 style={T.h2}>Here&apos;s what I actually did for 12 weeks.</h2>
      <p style={{ ...T.body, marginTop: 16, fontStyle: "italic", color: "var(--text-muted)" }}>None of this was obvious. Several things I was sure about were wrong.</p>

      {/* Stage indicator bar — different from SideDoor's chip nav */}
      <div style={{ display: "flex", margin: "28px 0 40px 0", border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
        {[
          { n: "01", label: "Assumptions" },
          { n: "02", label: "8 Interviews" },
          { n: "03", label: "7 Competitors" },
          { n: "04", label: "Journey Maps" },
          { n: "05", label: "Scoping" },
        ].map((step, i, arr) => (
          <div key={step.n} style={{ flex: 1, padding: "12px 14px", borderRight: i < arr.length - 1 ? "1px solid var(--border)" : "none", background: "var(--bg)" }}>
            <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 9, color: Z.primary, letterSpacing: "0.08em", margin: "0 0 3px 0", textTransform: "uppercase" as const }}>{step.n}</p>
            <p style={{ fontFamily: "var(--font-manrope)", fontSize: 12, fontWeight: 600, color: "var(--text-primary)", margin: 0, letterSpacing: "-0.01em" }}>{step.label}</p>
          </div>
        ))}
      </div>

      <h3 id="pa" style={{ ...T.h3, scrollMarginTop: 80 }}>Starting with what I assumed — and what turned out to be wrong</h3>
      <p style={T.body}>Before any interviews, I listed my assumptions: people forget action items, ownership is unclear, post-meeting follow-up is manual and slow. All of those were true. But two things surprised me.</p>
      <p style={T.body}>First: people don&apos;t hate meetings as much as the internet says they do. They hate <em>unproductive</em> meetings — specifically, meetings that don&apos;t lead to anything. The meeting isn&apos;t the villain. The silence after it is.</p>
      <p style={T.bodyLast}>Second: the fear around AI wasn&apos;t about privacy or accuracy. It was about accountability. &quot;If the AI assigns something to someone, who&apos;s responsible if it gets it wrong?&quot; That became the central design question for the trust layer.</p>
      <ImagePlaceholder label="FigJam · Assumption board · 18 hypotheses across people, process, and tool problems" />

      <h3 id="pi" style={{ ...T.h3gap, scrollMarginTop: 80 }}>What 8 people taught me</h3>
      <p style={T.body}>I interviewed 8 people across roles: 3 PMs, 2 engineering managers, 2 ICs, and 1 director. All active Zoom users. All in at least 6 meetings a week.</p>

      {/* Interview quotes — clean left-striped treatment, blue palette only */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "0 0 28px 0" }}>
        {[
          { quote: "I spend Sunday evening looking at my calendar trying to remember what I agreed to in the meetings from last Thursday.", who: "PM, mid-size tech company", border: Z.primary, labelColor: Z.primary },
          { quote: "The worst part isn't the meeting. It's when someone messages me a week later saying 'did you do that thing?' and I have no idea what thing they mean.", who: "Senior Engineer", border: Z.dark, labelColor: Z.dark },
          { quote: "I've tried every note-taking tool. The problem isn't the notes. The problem is that nobody does anything with them.", who: "Engineering Manager", border: Z.teal, labelColor: Z.teal },
        ].map((item) => (
          <div key={item.who} style={{ padding: "16px 20px", borderLeft: `3px solid ${item.border}` }}>
            <p style={{ fontFamily: "var(--font-manrope)", fontSize: 17, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.55, margin: "0 0 8px 0", letterSpacing: "-0.02em" }}>&quot;{item.quote}&quot;</p>
            <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: item.labelColor, textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>— {item.who}</p>
          </div>
        ))}
      </div>
      <ImagePlaceholder label="Dovetail · Interview synthesis · Themes, pain points, mental models, trust signals" />

      <h3 id="pc" style={{ ...T.h3gap, scrollMarginTop: 80 }}>What 7 competitors all got wrong</h3>
      <p style={T.body}>I audited Otter.ai, Fireflies, Microsoft Copilot, Grain, Loom, Notion AI, and Fellow across five dimensions: capture quality, action extraction, follow-up support, cross-meeting memory, and trust controls.</p>
      <ImagePlaceholder label="Competitive audit · 7 tools × 5 dimensions · Capability heatmap" />

      {/* Capability matrix — rows, not icon cards */}
      <CapabilityMatrix items={[
        { label: "Transcription & capture",    status: "solved",  note: "All 7 tools do this well enough" },
        { label: "Meeting summaries",           status: "solved",  note: "Commoditized, not a differentiator" },
        { label: "Action item extraction",      status: "shallow", note: "Basic only, no ownership logic" },
        { label: "Post-meeting execution flow", status: "missing", note: "Zero tools cover this" },
        { label: "Cross-meeting memory",        status: "missing", note: "Every meeting treated as isolated" },
        { label: "Trust & approval controls",   status: "shallow", note: "Binary on/off only, no spectrum" },
      ]} />

      <Callout accent={Z.primary}>
        <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.65, margin: 0, letterSpacing: "-0.01em" }}>
          <strong style={{ color: "var(--text-primary)" }}>The strategic gap:</strong> every tool stops at the meeting. The actual value — moving from decision to execution — is completely unaddressed. That&apos;s where Zoom could win.
        </p>
      </Callout>

      <h3 id="pj" style={{ ...T.h3gap, scrollMarginTop: 80 }}>Mapping the full journey</h3>
      <p style={T.body}>I mapped the experience for both a meeting host and a participant across three stages: before, during, and after. The pattern was stark. Almost all the pain lived in the &quot;after.&quot;</p>
      <ImagePlaceholder label="FigJam · Journey map · Host + Participant · Before / During / After · Pain points, moments of frustration" />
      <p style={T.bodyLast}>The &quot;before&quot; was about walking in blind. The &quot;during&quot; was mostly fine, except for unclear ownership. The &quot;after&quot; was where everything broke: slow follow-up, forgotten tasks, no one tracking anything.</p>

      <h3 id="ps" style={{ ...T.h3gap, scrollMarginTop: 80 }}>What I built, what I cut</h3>
      <p style={{ ...T.body, marginBottom: 16 }}>One filter for v1: does this directly shorten the gap between decision and action?</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 28 }}>
        {[
          { label: "Built (v1)", items: "Pre-meeting brief, live co-pilot, execution handoff, approval flow, cross-meeting memory, autonomy dial" },
          { label: "Next (v2)", items: "Jira/Linear/Slack integrations, manager team-view dashboard, trust calibration learning, meeting health scoring" },
          { label: "Cut", items: "Real-time AI voice participation (needs its own trust framework), AI scheduling (scope creep), public meeting rooms (different use case)" },
        ].map((row) => (
          <div key={row.label} style={{ background: "#F0F1F2", padding: "16px 18px", borderRadius: 8 }}>
            <p style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 8px 0", letterSpacing: "-0.02em" }}>{row.label}</p>
            <p style={{ ...T.small, color: "var(--text-secondary)" }}>{row.items}</p>
          </div>
        ))}
      </div>

      <Divider />

      {/* ── Key decisions ─────────────────────────────────────────────── */}
      <div id="toc-decisions" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>Key decisions</SectionLabel>
      <h2 style={T.h2}>Four calls that defined the design.</h2>
      <p style={{ ...T.body, marginTop: 16, fontStyle: "italic", color: "var(--text-muted)" }}>Each one had a wrong version first.</p>

      {/* Decision format — summary strip at top, then body */}
      {[
        {
          n: "01", title: "Real-time capture vs. post-meeting processing",
          changed: "Post-meeting summary → Live sidebar capture",
          body1: "My first version processed everything after the call ended. Cleaner, simpler, no risk of disrupting the meeting. But user testing killed it. People came out of meetings with strong, fresh context. By the time the summary arrived 5 minutes later, they'd already mentally moved on. The moment had passed.",
          label: "Post-meeting v1 vs. real-time sidebar v2 (final)",
          body2: "Real-time capture lets you correct the AI while the context is still live. \"No, that's not a decision — that's still open.\" That correction improves every output downstream.",
          tradeoff: "The live sidebar adds a small cognitive load during meetings. We made it opt-in, kept it minimal — one-tap interactions only, no typing required during the call.",
        },
        {
          n: "02", title: "Full autonomy vs. human-in-the-loop",
          changed: "Fully autonomous agent → Approval-first with earned autonomy",
          body1: "The fully autonomous version was technically impressive and emotionally wrong. In testing, users consistently said: \"I don't mind if it does things — I just want to know it did them.\" That's not a request for autonomy. That's a request for transparency.",
          label: "Full autonomy v1 · Approval flow v2 · Autonomy dial v3 (final)",
          body2: "The approval flow isn't a limitation. It's the product. Users who spend two weeks approving the agent's suggestions end up more comfortable giving it autonomy than users who never had to engage with it at all.",
          tradeoff: null,
        },
        {
          n: "03", title: "One unified agent vs. specialized agents for each stage",
          changed: "Three separate agents → One agent, three modes",
          body1: "We debated whether to build separate agents for pre-meeting, live, and post-meeting — each optimized for its context. Technically cleaner. The problem: it felt like three different products. Three different UIs. Three different mental models.",
          label: "Multi-agent system v1 vs. unified agent with stage modes v2 (final)",
          body2: "One agent, three modes. The same entity in your pre-meeting brief sits in your sidebar during the call and generates your handoff afterwards. Continuity creates trust.",
          tradeoff: "A unified agent is harder to build. The engineering team pushed back. We held the line because the UX cost of a fragmented experience was higher than the technical cost of integration.",
        },
        {
          n: "04", title: "Active interruptions vs. ambient awareness during meetings",
          changed: "Interrupt-on-detect → Silent capture with on-demand review",
          body1: "Early versions had the agent interrupt the meeting to flag things: a pop-up, a sound, something that demanded attention. Every single test participant said some version of \"I wish it wouldn't do that.\" The meeting is the primary task. The agent is secondary.",
          label: "Interruptive notifications v1 vs. passive sidebar v2 (final)",
          body2: "The final model: the agent captures silently. You glance at it when you want. It never demands your attention mid-sentence. After the call, everything it flagged is waiting for you — organized, contextual, ready to act on.",
          tradeoff: null,
        },
      ].map((d) => (
        <div key={d.n} style={{ marginTop: 36 }}>
          {/* Decision summary strip */}
          <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, fontWeight: 700, color: Z.primary, letterSpacing: "0.06em", flexShrink: 0 }}>{d.n}</span>
            <h3 style={{ ...T.h3, margin: 0, flex: 1 }}>{d.title}</h3>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", background: Z.bg, borderRadius: 6, marginBottom: 16, width: "fit-content" }}>
            <span style={{ fontSize: 12, color: "var(--text-muted)", textDecoration: "line-through", letterSpacing: "-0.01em" }}>{d.changed.split("→")[0].trim()}</span>
            <span style={{ fontSize: 10, color: Z.primary }}>→</span>
            <span style={{ fontSize: 12, color: Z.primary, fontWeight: 600, letterSpacing: "-0.01em" }}>{d.changed.split("→")[1].trim()}</span>
          </div>
          <p style={T.body}>{d.body1}</p>
          <ImagePlaceholder label={d.label} />
          <p style={d.tradeoff ? T.body : T.bodyLast}>{d.body2}</p>
          {d.tradeoff && (
            <Callout accent={Z.mid}>
              <p style={T.calloutSub}><strong>Trade-off accepted:</strong> {d.tradeoff}</p>
            </Callout>
          )}
        </div>
      ))}

      <Divider />

      {/* ── Metrics ───────────────────────────────────────────────────── */}
      <div id="toc-metrics" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>Target metrics that tell the real story</SectionLabel>
      <h2 style={T.h2}>If this ships, here&apos;s what we&apos;d measure.</h2>
      <p style={{ ...T.body, marginTop: 16 }}>The north star was simple: does the agent reduce the gap between decision and action?</p>
      <p style={{ fontSize: 12, color: "var(--text-muted)", fontStyle: "italic", letterSpacing: "-0.01em", margin: "0 0 28px 0" }}>These are design-time targets — what success looks like if this ships, not measured outcomes.</p>

      {/* North star */}
      <div style={{ background: Z.bg, borderTop: `3px solid ${Z.primary}`, borderRadius: "0 0 8px 8px", padding: "20px 24px", marginBottom: 28 }}>
        <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: Z.primary, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 10px 0" }}>North Star Metric</p>
        <p style={{ fontFamily: "var(--font-manrope)", fontSize: 20, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.03em", margin: "0 0 8px 0", lineHeight: 1.3 }}>Action item completion rate per meeting</p>
        <p style={T.calloutSub}>If decisions made in meetings are getting acted on and tracked — everything else follows. This is the one number that proves the agent is doing its job.</p>
      </div>

      {/* Metric comparison rows — before→after, not badge rows */}
      <MetricRows metrics={[
        { label: "Action item completion rate",       before: "~44%",    after: ">80%",    story: "The core problem, solved" },
        { label: "Time-to-first-action after meeting", before: "24+ hrs",  after: "<2 hrs",  story: "While context is still fresh" },
        { label: "Meeting recurrence for same topic",  before: "3–4× avg", after: "−40%",    story: "Fewer follow-up-to-follow-up calls" },
        { label: "AI approval rate (trust proxy)",     before: "unknown",  after: ">70%",    story: "If users approve without editing, it's earning its place" },
      ]} />

      {/* Business outcomes — large number tiles with before/after bars */}
      <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", margin: "36px 0 20px 0" }}>Target Business Outcomes</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        {[
          { number: ">80%",  label: "Action item completion", story: "Up from the ~44% baseline.", before: { pct: 44, label: "~44% baseline" }, after: { pct: 80, label: "Target" }, color: Z.primary, bg: Z.bg, trackBg: `${Z.primary}20` },
          { number: "<2 hrs", label: "Time to first action",  story: "Most actions start same day.", before: { pct: 90, label: "24+ hrs (next day)" }, after: { pct: 20, label: "Target" }, color: Z.teal, bg: Z.tealBg, trackBg: `${Z.teal}22` },
          { number: "−40%",  label: "Repeat meetings, same topic", story: "Fewer follow-up calls.", before: { pct: 70, label: "Current recurrence" }, after: { pct: 42, label: "Target" }, color: Z.dark, bg: Z.darkBg, trackBg: `${Z.dark}22` },
        ].map((m) => (
          <div key={m.label} style={{ background: m.bg, borderTop: `3px solid ${m.color}`, borderRadius: "0 0 12px 12px", padding: "24px" }}>
            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 34, fontWeight: 700, color: m.color, letterSpacing: "-0.04em", marginBottom: 6 }}>{m.number}</div>
            <p style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 4px 0", letterSpacing: "-0.02em" }}>{m.label}</p>
            <p style={{ fontSize: 13, color: m.color, margin: "0 0 20px 0", opacity: 0.85, letterSpacing: "-0.01em" }}>{m.story}</p>
            <div style={{ marginBottom: 8 }}>
              <div style={{ height: 4, background: "rgba(0,0,0,0.08)", borderRadius: 2, overflow: "hidden", marginBottom: 4 }}>
                <div style={{ width: `${m.before.pct}%`, height: "100%", background: "#a8a4a0", borderRadius: 2 }} />
              </div>
              <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--text-muted)", margin: 0, letterSpacing: "0.02em" }}>{m.before.label}</p>
            </div>
            <div>
              <div style={{ height: 4, background: m.trackBg, borderRadius: 2, overflow: "hidden", marginBottom: 4 }}>
                <div style={{ width: `${m.after.pct}%`, height: "100%", background: m.color, borderRadius: 2 }} />
              </div>
              <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: m.color, margin: 0, letterSpacing: "0.02em", fontWeight: 600 }}>{m.after.label}</p>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ── What's next ───────────────────────────────────────────────── */}
      <div id="toc-next" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>What&apos;s next</SectionLabel>
      <h2 style={T.h2}>The foundation is laid. Here&apos;s what it enables.</h2>

      {/* Feature tiles with big number accent — not flat rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
        {[
          { n: "01", title: "Deep tool integrations", body: "Right now, the agent lives inside Zoom. The real power comes when it pushes action items to Jira, creates Linear tickets, sends Slack messages, and updates Notion docs. The execution handoff becomes truly automated — not just a draft you copy and paste.", color: Z.primary },
          { n: "02", title: "Manager team-view dashboard", body: "The IC sees their items. The team lead sees their team. But managers are still flying blind. A team-level view showing action item completion rates, recurring blockers, and meeting health across their entire org is the next big surface — and where the B2B business case lives.", color: Z.dark },
          { n: "03", title: "Trust calibration that evolves", body: "The autonomy dial is set manually today. The next version learns. If you keep approving a certain type of suggestion without editing it for 3 weeks, the agent suggests moving up an autonomy level — with your data as the evidence. Trust earned, measured, and surfaced.", color: Z.teal },
        ].map((item) => (
          <div key={item.n} style={{ display: "flex", gap: 0, border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ width: 56, background: item.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "0.04em", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>{item.n}</span>
            </div>
            <div style={{ padding: "18px 22px", background: "var(--bg)" }}>
              <p style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>{item.title}</p>
              <p style={T.calloutSub}>{item.body}</p>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ── Reflection ────────────────────────────────────────────────── */}
      <div id="toc-reflection" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>Honest reflection</SectionLabel>
      <h2 style={T.h2}>What I&apos;d do differently if I started today.</h2>
      <p style={{ ...T.body, marginTop: 16 }}>The hardest part of this project wasn&apos;t designing the AI features. It was designing for a world where users are still figuring out what they want from AI. Expectations are all over the place — some people want it to do everything, some want it to do nothing. Designing for that range without picking a lane is genuinely difficult.</p>
      <p style={T.body}>I underestimated how much the trust problem would dominate the process. I thought I&apos;d spend most of my time on information architecture — what to capture, how to display it. Instead, I spent the most time on the approval flow and the autonomy model. The features were the easy part. The relationship between the user and the agent was the hard part.</p>
      <p style={T.body}>If I started over, I&apos;d prototype the approval flow first — before any of the screens, before any of the capture logic. The trust layer is the foundation everything else sits on. Getting it wrong makes everything else feel wrong too.</p>
      <p style={T.bodyLast}>I&apos;d also interview more ICs earlier. I over-indexed on team leads because they were easier to reach. But the people whose experience changes most with this tool are the participants — the people who walk out of meetings not totally sure what they just agreed to. Designing for them earlier would have made the live co-pilot much better from the start.</p>

      <Divider />

      {/* Closing */}
      <p style={{ fontFamily: "var(--font-manrope)", fontSize: 22, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.5, margin: "0 0 16px 0" }}>
        Meetings aren&apos;t the problem. The silence after them is.
      </p>
      <p style={T.body}>SideDoor was about fixing a broken channel. This was about fixing a broken loop — the one between deciding something and actually doing it. Zoom already owns the meeting. This was about making what happens after it just as good.</p>
      <p style={T.body}>If you made it this far, thank you. Always happy to talk about this one. ❤️</p>
    </main>
  );
}
