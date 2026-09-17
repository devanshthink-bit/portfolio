import { Poppins, Caveat } from "next/font/google";
import { notFound } from "next/navigation";
import RubberBackButton from "../../../components/RubberBackButton";
import CaseStudyTOC from "../../../components/CaseStudyTOCClient";

const poppins = Poppins({ weight: "700", subsets: ["latin"] });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

// Prevents italic/serif font transforms from skewing emoji characters
function E({ children }: { children: string }) {
  return (
    <span style={{ fontFamily: '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif', fontStyle: "normal", fontWeight: "normal", marginRight: 8, display: "inline-block" }}>
      {children}
    </span>
  );
}

function ImagePlaceholder({ label: _label, aspect = "16/9" }: { label: string; aspect?: string }) {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: aspect,
        background: "linear-gradient(135deg, #dce8ff 0%, #b8ccff 45%, #d4e3ff 100%)",
        borderRadius: 10,
        margin: "28px 0",
      }}
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-geist-mono)",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        margin: "0 0 16px 0",
      }}
    >
      {children}
    </p>
  );
}

// Pill badge used inside SectionLabel for numbered solution screens
function ScreenBadge({ n, color }: { n: string; color: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: color,
        color: "#fff",
        borderRadius: 4,
        padding: "1px 7px",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.05em",
        marginRight: 10,
        verticalAlign: "2px",
        textTransform: "none",
        lineHeight: 1.5,
      }}
    >
      {n}
    </span>
  );
}

function Divider() {
  return (
    <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "60px 0" }} />
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "var(--cs-callout-bg)",
        borderRadius: 8,
        padding: "20px 24px",
        margin: "28px 0",
      }}
    >
      {children}
    </div>
  );
}

function StoryBlock({ children, color, bg }: { children: React.ReactNode; color?: string; bg?: string }) {
  return (
    <div
      style={{
        background: bg || "var(--bg)",
        borderTop: "1px solid var(--border)",
        borderRight: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        borderLeft: color ? `3px solid ${color}` : "1px solid var(--border)",
        borderRadius: 8,
        padding: "24px 28px",
        margin: "28px 0",
      }}
    >
      {children}
    </div>
  );
}

function StatBlock() {
  const stats = [
    { number: "5–10×", label: "more likely to get hired via referral vs portals", source: "Jobera" },
    { number: "29 days", label: "avg time-to-hire vs 44–55 days through portals", source: "salesso.com" },
    { number: "46%", label: "1-year retention vs 33% through job boards", source: "Sci-Tech Today" },
    { number: "~20%", label: "cold LinkedIn DM reply rate (on a good day)", source: "LinkedIn" },
  ];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 1,
        background: "var(--cs-stat-gap)",
        borderRadius: 10,
        overflow: "hidden",
        margin: "28px 0",
      }}
    >
      {stats.map((stat) => (
        <div key={stat.number} style={{ background: "var(--bg)", padding: "20px 24px" }}>
          <div
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 26,
              fontWeight: 600,
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
              marginBottom: 4,
            }}
          >
            {stat.number}
          </div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, letterSpacing: "-0.01em" }}>
            {stat.label}
          </div>
          {stat.source && (
            <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 6, letterSpacing: "0.02em", fontStyle: "italic", opacity: 0.7 }}>
              via {stat.source}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Shared type scale ─────────────────────────────────────────────────────────
const T = {
  h2:        { fontFamily: "var(--font-manrope)", fontSize: 26,  fontWeight: 700, color: "var(--text-primary)",   letterSpacing: "-0.04em", lineHeight: 1.3,  margin: 0 } as React.CSSProperties,
  h3:        { fontFamily: "var(--font-manrope)", fontSize: 18,  fontWeight: 700, color: "var(--text-primary)",   letterSpacing: "-0.03em", lineHeight: 1.4,  margin: "0 0 12px 0" } as React.CSSProperties,
  h3gap:     { fontFamily: "var(--font-manrope)", fontSize: 18,  fontWeight: 700, color: "var(--text-primary)",   letterSpacing: "-0.03em", lineHeight: 1.4,  margin: "36px 0 12px 0" } as React.CSSProperties,
  body:      { fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7,  letterSpacing: "-0.01em", margin: "0 0 14px 0" } as React.CSSProperties,
  bodyLast:  { fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7,  letterSpacing: "-0.01em", margin: 0 } as React.CSSProperties,
  small:     { fontSize: 13, color: "var(--text-muted)",     lineHeight: 1.5,  letterSpacing: "-0.01em", margin: 0 } as React.CSSProperties,
  eyebrow:   { fontFamily: "var(--font-geist-mono)", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", margin: 0 } as React.CSSProperties,
  callout:   { fontFamily: "var(--font-manrope)", fontSize: 16, fontWeight: 600, color: "var(--text-primary)",   letterSpacing: "-0.02em", lineHeight: 1.55, margin: "0 0 10px 0" } as React.CSSProperties,
  calloutSub:{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, letterSpacing: "-0.01em", margin: 0 } as React.CSSProperties,
  quote:     { fontFamily: "var(--font-caveat)", fontStyle: "normal" as const, fontSize: 22, fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.55, margin: 0 } as React.CSSProperties,
};

// Legacy aliases
const body = T.body;
const bodyLast = T.bodyLast;
const h3Style = T.h3;
const h3Gap = T.h3gap;
const problemQ = { ...T.h3, fontSize: 18, margin: "0 0 16px 0" } as React.CSSProperties;
const decisionH = { ...T.h3, margin: "36px 0 12px 0" } as React.CSSProperties;
const decisionHFirst = { ...T.h3, margin: "0 0 12px 0" } as React.CSSProperties;

export default function SideDoorCaseStudy() {
  // Hidden on the live site until the new Sidedoor case study is finished (Devansh, 17 Sep 2026).
  // Vercel previews still show it. Remove this line when launching from the sidedoor branch.
  if (process.env.VERCEL_ENV === "production") notFound();
  return (
    <main className={caveat.variable} style={{ padding: "40px 0 96px" }}>
      <CaseStudyTOC />
      <RubberBackButton />

      {/* Cover */}
      <div style={{ width: "100%", aspectRatio: "16/9", background: "linear-gradient(135deg, #dce8ff 0%, #b8ccff 45%, #d4e3ff 100%)", borderRadius: 10, marginBottom: 40 }} />

      {/* Title */}
      <SectionLabel>Case Study · Product Design</SectionLabel>
      <h1 className={poppins.className} style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 14px 0" }}>
        <span style={{ color: "#2563EB" }}>Side</span><span style={{ color: "#10B981" }}>Door</span>
      </h1>
      <p style={{ fontFamily: "var(--font-manrope)", fontSize: 20, fontWeight: 500, color: "var(--text-secondary)", letterSpacing: "-0.025em", lineHeight: 1.4, margin: "0 0 36px 0" }}>
        From scattered DMs to a referral platform built on trust, structure, and visibility.
      </p>

      {/* Metadata strip */}
      <div className="cs-meta-strip" style={{ padding: "20px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", marginBottom: 52 }}>
        {[
          { label: "Role", value: "Solo Product Designer", align: "left" as const },
          { label: "Timeline", value: "10 weeks", align: "left" as const },
          { label: "Tools", value: "Figma, FigJam", align: "left" as const },
          { label: "Platform", value: "Mobile / iOS", align: "left" as const },
          { label: "Type", value: "0 → 1 Concept", align: "left" as const },
        ].map((item) => (
          <div key={item.label} style={{ textAlign: item.align }}>
            <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px 0" }}>
              {item.label}
            </p>
            <p style={{ fontSize: 14, color: "var(--text-primary)", letterSpacing: "-0.02em", margin: 0 }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Hook */}
      <p style={{ fontFamily: "var(--font-manrope)", fontSize: 28, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3, margin: "0 0 20px 0", letterSpacing: "-0.04em" }}>
        <E>💭</E>Have you ever sent 40 LinkedIn messages asking for a referral , and heard back from 3?
      </p>
      <p style={body}>
        That&apos;s not a you problem. That&apos;s a systems problem. The referral process runs on cold outreach, hope, and WhatsApp. It&apos;s broken for everyone: candidates get ghosted, referrers get spammed, recruiters can&apos;t trust the quality. SideDoor is my attempt to fix it.
      </p>

      {/* 3 bullets */}
      <div style={{ margin: "24px 0 28px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          "Candidates find relevant referrers ranked by role match, alumni signals, and response rate , not a random list of strangers.",
          "Referrers evaluate candidates with structured summaries and graded confidence levels , not a blank DM and a gut feeling.",
          "Both sides track every stage after the referral is submitted , no black box, no repeated follow-ups.",
        ].map((point, i) => (
          <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span style={{ ...T.eyebrow, marginTop: 4, flexShrink: 0 }}>
              0{i + 1}
            </span>
            <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.65, letterSpacing: "-0.01em", margin: 0 }}>{point}</p>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 13, color: "var(--text-muted)", letterSpacing: "-0.01em", margin: 0 }}>
        <E>👉</E>Short on time? Here&apos;s the <a href="#" style={{ borderBottom: "1px solid var(--border)" }}>Figma prototype</a>.
      </p>

      <Divider />

      {/* ── The problem, lived ─────────────────────────────────────── */}
      <div id="toc-problem" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>The problem, lived</SectionLabel>
      <StoryBlock color="#10B981">
        <p style={{ fontFamily: "var(--font-manrope)", fontSize: 20, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.55, margin: 0 }}>
          Meet Ishaan. 2 years into his career as a product designer. He finds a role he&apos;s genuinely
          excited about: Product Designer at CRED. He opens LinkedIn, searches for CRED employees,
          and starts messaging.
        </p>
      </StoryBlock>
      <div style={{ display: "flex", justifyContent: "center", margin: "36px 0 52px 0" }}>
        <div style={{ width: 200, height: 168, overflow: "hidden", position: "relative" }}>
          <img src="/images/ishaan-1.PNG" alt="" style={{ width: 200, position: "absolute", top: "-18px" }} />
        </div>
      </div>
      <p style={body}>
        He messages 15 people. 2 reply. 1 agrees to help. Then begins the back-and-forth: &quot;Which role
        exactly?&quot; &quot;Can you send the JD link?&quot; &quot;What&apos;s your notice period?&quot; &quot;Send me your resume as a PDF please.&quot;
      </p>
      <p style={body}>
        Three days later, his contact submits the referral. Then silence. For two weeks, Ishaan has no
        idea if anything actually happened. He checks his email obsessively. Sends a follow-up. Gets a
        &quot;will check&quot; reply. Nothing more.
      </p>
      <div style={{ background: "#E7F8F2", borderRadius: 8, padding: "16px 20px", margin: "28px 0", borderLeft: "3px solid #6fcba6" }}>
        <p style={{ ...T.quote, margin: "0 0 10px 0" }}>
          &quot;I don&apos;t even know if they submitted it. I have no way to track it.&quot;
        </p>
        <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "#10B981", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>— Candidate, interview</p>
      </div>
      <p style={bodyLast}>
        Ishaan&apos;s not an edge case. He&apos;s every candidate. The employees he&apos;s messaging? They&apos;re getting
        10–50 requests like his every week. One PM I interviewed got 40–50 DMs a day whenever their
        company posted a public listing. They&apos;d turned off LinkedIn notifications just to work.
      </p>

      <Divider />

      {/* ── Why this matters ──────────────────────────────────────── */}
      <div id="toc-why" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>Why this matters</SectionLabel>
      <p style={body}>
        Referrals are the highest-converting hiring channel that exists.
      </p>
      <StatBlock />
      <p style={{ ...bodyLast, marginBottom: 28 }}>
        The channel works. The experience around it doesn&apos;t. That&apos;s the gap SideDoor fills.
      </p>

      {/* Who this was built for */}
      <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 12px 0" }}>Who I was designing for</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        {[
          { label: "Candidates", sub: "0–5 yrs exp", desc: "They know referrals work. They've tried cold applying. They just can't reach the right people.", bg: "#E7F8F2", borderRadius: 8 },
          { label: "Referrers", sub: "Mid-level, tech", desc: "Every referral puts their reputation on the line. The ask feels social. The risk is professional.", bg: "#E9EFFD", borderRadius: 8 },
          { label: "Recruiters", sub: "Secondary", desc: "They value referrals in theory, but bonus gaming has made them skeptical. Trust needs rebuilding.", bg: "#F0F1F2", borderRadius: 8 },
        ].map((u) => (
          <div key={u.label} style={{ background: u.bg, padding: "16px 18px", borderRadius: u.borderRadius }}>
            <p style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 2px 0" }}>{u.label}</p>
            <p style={{ ...T.small, color: "var(--text-muted)", margin: "0 0 8px 0" }}>{u.sub}</p>
            <p style={{ ...T.small, color: "var(--text-secondary)" }}>{u.desc}</p>
          </div>
        ))}
      </div>

      <Divider />

      {/* ── Five screens. One system. ──────────────────────────────── */}
      <div id="toc-solution" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>The solution, in five screens</SectionLabel>
      <h2 style={{ fontFamily: "var(--font-manrope)", fontSize: 26, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.04em", margin: "0 0 6px 0", lineHeight: 1.3 }}>
        Now Ishaan opens SideDoor.
      </h2>
      <p style={{ fontSize: 15, color: "var(--text-muted)", fontStyle: "italic", letterSpacing: "-0.01em", margin: "0 0 20px 0" }}>
        Here&apos;s what changes.
      </p>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, letterSpacing: "-0.01em", margin: 0 }}>
        These five problems aren&apos;t isolated: they&apos;re a system. Fix one without the others and you just move the problem somewhere else. Every solution had to work as part of the whole.
      </p>

      <Divider />

      {/* 01 */}
      <SectionLabel><ScreenBadge n="01" color="#10B981" />Referrer Discovery</SectionLabel>
      <h2 style={problemQ}><E>➡️</E>How can a candidate find the right person to approach, not just any random employee?</h2>
      <StoryBlock color="#10B981" bg="#E7F8F2">
        <p style={T.callout}>
          Ishaan clicks &quot;Get Referral&quot; on the Product Designer role at CRED. Instead of a search bar,
          he sees a curated, ranked list of CRED employees.
        </p>
        <p style={T.calloutSub}>
          Diya Sharma is at the top: 92% match, Same College, responds in ~8 hrs, has referred 12
          people before. That&apos;s not a stranger anymore.
        </p>
      </StoryBlock>
      <Callout>
        <p style={{ ...T.callout, margin: 0 }}>
          <E>🎯</E>Ishaan isn&apos;t messaging into the void. He&apos;s reaching out to the most relevant person for
          this exact role, with clear evidence they&apos;ll actually respond.
        </p>
      </Callout>
      <ImagePlaceholder label="Screen 1 · Referrer Discovery · Ranked referrers with match %, alumni badges, response rate, activity signals" />
      <p style={bodyLast}>
        Referrers carry real professional risk when they put their name behind someone. A bad referral doesn&apos;t just waste their time — it reflects on their judgment with their recruiter, their manager, their team. Ranked signals — role overlap, shared alumni, past referral activity — do two things at once: they help candidates find the most relevant person to reach out to, and they help referrers recognise which requests are worth taking seriously. Trust has to flow both ways before either side commits.
      </p>

      <div style={{ margin: "60px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        <span style={{ fontSize: 20 }}>🍿</span>
        <p style={{ ...T.quote, textAlign: "center", margin: "-14px 0 0 0", maxWidth: 520 }}>
          Ishaan had been playing a numbers game. Then he saw the ranked list: Diya Sharma, 92% match, same university. For the first time, a name felt like a real lead. 🎯
        </p>
        <img src="/images/ishaan-3.PNG" alt="" style={{ width: 180, objectFit: "contain", marginTop: 8 }} />
      </div>

      <Divider />

      {/* 02 */}
      <SectionLabel><ScreenBadge n="02" color="#10B981" />Structured Request</SectionLabel>
      <h2 style={problemQ}><E>➡️</E>How can a candidate send a request a stranger actually wants to respond to?</h2>
      <StoryBlock color="#10B981" bg="#E7F8F2">
        <p style={T.callout}>
          Ishaan doesn&apos;t write a DM. He fills a guided form: role is pre-filled, fit points are
          suggested from the JD, he writes a short pitch. Preview screen. Send.
        </p>
        <p style={T.calloutSub}>
          Diya receives Ishaan&apos;s request and understands the fit in under 30 seconds. No back-and-forth.
          No chasing for details.
        </p>
      </StoryBlock>
      <Callout>
        <p style={{ ...T.callout, margin: 0 }}>
          <E>🎯</E>Every request is structured the same way: clear, scannable, easy to evaluate. No more &quot;refer me anywhere&quot; messages.
        </p>
      </Callout>
      <ImagePlaceholder label="Screen 2 · Create Request · Details → Preview → Send · Fit points as chips, JD auto-attached, short pitch" />
      <p style={bodyLast}>
        JD auto-attached, fit points pre-suggested from the JD, preview screen before sending. Less effort for the candidate, higher quality for the referrer.
      </p>

      <div style={{ margin: "60px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        <span style={{ fontSize: 20 }}>🍿</span>
        <p style={{ ...T.quote, textAlign: "center", margin: "-14px 0 0 0", maxWidth: 520 }}>
          Diya opened it on her lunch break. No wall of text, just a clean card: 85% match, three fit points, a short pitch. She read it in under 30 seconds. 👀
        </p>
        <img src="/images/diya-2.PNG" alt="" style={{ width: 180, objectFit: "contain", marginTop: 8 }} />
      </div>

      {/* 03 */}
      <SectionLabel><ScreenBadge n="03" color="#2563EB" />Referrer Evaluation</SectionLabel>
      <h2 style={problemQ}><E>➡️</E>How can a referrer decide confidently without risking their own reputation?</h2>
      <StoryBlock color="#2563EB" bg="#E9EFFD">
        <p style={T.callout}>
          Diya opens Ishaan&apos;s request. She doesn&apos;t see a resume dump. She sees a structured evaluation:
          85% overall match with breakdown, key strengths (green), potential concerns (orange), and
          Ishaan&apos;s own pitch.
        </p>
        <p style={T.calloutSub}>
          Instead of &quot;Refer or Don&apos;t Refer,&quot; she has four options: Decline / Review Later / Refer /
          Strongly Recommend. She clicks Strongly Recommend. Adds a private note for the recruiter.
        </p>
      </StoryBlock>
      <Callout>
        <p style={{ ...T.callout, margin: 0 }}>
          <E>🎯</E>Diya didn&apos;t guess. She made a confident, informed decision in under 2 minutes.
        </p>
      </Callout>
      <ImagePlaceholder label="Screen 3 · Referrer Evaluation · Match % breakdown, Strengths & Concerns, Graded recommendation levels (Decline / Review Later / Refer / Strongly Recommend)" />
      <p style={bodyLast}>
        Referrers aren&apos;t unwilling: they&apos;re uncertain. Building an evaluation assistant instead of just a profile view reduces that. The private note adds context for the recruiter without the candidate ever seeing it.
      </p>

      <div style={{ margin: "60px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        <span style={{ fontSize: 20 }}>🍿</span>
        <p style={{ ...T.quote, textAlign: "center", margin: "-14px 0 0 0", maxWidth: 520 }}>
          Diya clicked &quot;Strongly Recommend.&quot; Ishaan&apos;s phone buzzed a minute later. Request accepted. For the first time, the silence didn&apos;t feel like being ignored. 🥹
        </p>
        <img src="/images/diya-4.PNG" alt="" style={{ width: 180, objectFit: "contain", marginTop: 8 }} />
      </div>

      {/* 04 */}
      <SectionLabel><ScreenBadge n="04" color="#10B981" />Shared Pipeline</SectionLabel>
      <h2 style={problemQ}><E>➡️</E>How can both sides know what&apos;s happening after the referral is submitted?</h2>
      <StoryBlock color="#10B981" bg="#E7F8F2">
        <p style={T.callout}>
          Ishaan gets a notification. He opens SideDoor and sees a shared timeline: Request Accepted →
          Referral Submitted → Application Under Review → Screening → Interview → Outcome.
        </p>
        <p style={T.calloutSub}>
          At each stage, he can see who owns the next action: &quot;Recruiter reviewing your application.&quot;
          No ambiguity. No need to follow up.
        </p>
      </StoryBlock>
      <Callout>
        <p style={{ ...T.callout, margin: 0 }}>
          <E>🎯</E>Ishaan doesn&apos;t check his email 20 times a day anymore. He knows exactly where things stand, and so does Diya.
        </p>
      </Callout>
      <ImagePlaceholder label="Screen 4 · Shared Referral Pipeline · Both sides, timeline with timestamps, ownership indicators, stage progression" />
      <p style={bodyLast}>
        Both sides see the same timeline. People tolerate slow hiring. What they can&apos;t tolerate is uncertainty. This fixes that, without ATS dependency.
      </p>

      <div style={{ margin: "60px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        <span style={{ fontSize: 20 }}>🍿</span>
        <p style={{ ...T.quote, textAlign: "center", margin: "-14px 0 0 0", maxWidth: 520 }}>
          Ishaan tapped it expecting another follow-up to chase. Instead: a timeline. Request Accepted. Referral Submitted. Under Review. He put his phone down. Not once did he pick it back up. 😌
        </p>
        <img src="/images/ishaan-5.PNG" alt="" style={{ width: 180, objectFit: "contain", marginTop: 8 }} />
      </div>

      <Divider />

      {/* 05 */}
      <SectionLabel><ScreenBadge n="05" color="#2563EB" />Quality Over Volume</SectionLabel>
      <h2 style={problemQ}><E>➡️</E>How do we stop spam without making it harder for serious candidates?</h2>
      <p style={body}>
        Candidates mass-message because response rates are low. Response rates are low because messages
        are generic. It&apos;s a vicious loop. SideDoor breaks it at three points.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, margin: "0 0 24px 0" }}>
        {[
          { label: "Structured requests", desc: "Filling fit points and a short pitch takes effort, which filters out people who aren't serious. Low-intent senders drop off naturally." },
          { label: "Ranked referrer matching", desc: "Candidates see a curated list, not every employee. This nudges targeted outreach over shotgun behavior." },
          { label: "Request limits & inbox prioritization", desc: "The referrer's inbox is ranked by fit score and quality signals, not chronology. Referrer attention is treated as a limited resource and protected." },
        ].map((item) => (
          <div key={item.label} style={{ paddingLeft: 16, borderLeft: "2px solid var(--border)" }}>
            <p style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 4px 0", letterSpacing: "-0.02em" }}>{item.label}</p>
            <p style={T.calloutSub}>{item.desc}</p>
          </div>
        ))}
      </div>
      <ImagePlaceholder label="Screen 5 · Referrer Inbox · Quality-prioritized requests, fit labels (High/Medium/Low), smart ranking banner" />

      <div style={{ margin: "60px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        <span style={{ fontSize: 20 }}>🍿</span>
        <p style={{ ...T.quote, textAlign: "center", margin: "-14px 0 0 0", maxWidth: 520 }}>
          Ishaan sent one request. Got one referral. Watched it move through screening without a single follow-up. Diya saw the same thing. No one was left guessing. 🤝
        </p>
        <img src="/images/ishaan-4.PNG" alt="" style={{ width: 180, objectFit: "contain", marginTop: 8 }} />
      </div>

      {/* Who gains what */}
      <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 12px 0" }}>Who gains what</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 0 }}>
        {[
          { who: "Candidates", impact: "Higher conversion from outreach to referral. Less time wasted messaging people who won't reply.", bg: "#E7F8F2" },
          { who: "Referrers", impact: "Less effort, less risk to their reputation. Participating feels normal, not like a personal favour.", bg: "#E9EFFD" },
          { who: "Recruiters", impact: "Better-quality signals. Less time screening bad referrals, more confidence in the ones that come through.", bg: "#F0F1F2" },
        ].map((item) => (
          <div key={item.who} style={{ background: item.bg, padding: "16px 18px", borderRadius: 8 }}>
            <p style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 8px 0", letterSpacing: "-0.02em" }}>{item.who}</p>
            <p style={{ ...T.small, color: "var(--text-secondary)" }}>{item.impact}</p>
          </div>
        ))}
      </div>

      <Divider />

      {/* ── How I got here ────────────────────────────────────────── */}
      <div id="toc-process" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>The design process, unfiltered</SectionLabel>
      <h2 style={{ fontFamily: "var(--font-manrope)", fontSize: 26, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.04em", margin: "0 0 6px 0", lineHeight: 1.3 }}>
        That&apos;s the product. Now here&apos;s how I got there.
      </h2>
      <p style={{ fontSize: 15, color: "var(--text-muted)", fontStyle: "italic", letterSpacing: "-0.01em", margin: "0 0 28px 0" }}>
        None of this was obvious at the start. A lot of it was wrong before it was right.
      </p>

      {/* Process steps overview */}
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 0, marginBottom: 40 }}>
        {[
          { n: "01", label: "Assumptions",   href: "#process-assumptions" },
          { n: "02", label: "10 Conversations", href: "#process-research" },
          { n: "03", label: "The Data",      href: "#process-desk" },
          { n: "04", label: "Journey Maps",  href: "#process-journey" },
          { n: "05", label: "Competitive",   href: "#process-competitive" },
          { n: "06", label: "Scoping",       href: "#process-scoping" },
        ].map((step, i, arr) => (
          <div key={step.n} style={{ display: "flex", alignItems: "center" }}>
            <a href={step.href} className="process-step" style={{ textDecoration: "none", background: "var(--card-bg)", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.06em" }}>{step.n}</span>
              <span style={{ fontFamily: "var(--font-manrope)", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>{step.label}</span>
            </a>
            {i < arr.length - 1 && (
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            )}
          </div>
        ))}
      </div>

      <h3 id="process-assumptions" style={{ ...h3Style, scrollMarginTop: 80 }}>Starting with assumptions, not answers</h3>
      <p style={body}>
        Before talking to anyone, I wrote down 14 assumptions: candidates don&apos;t know who to ask, referrers ignore cold DMs, nothing gets tracked, it all feels transactional. Then I went out to validate or kill each one.
      </p>
      <ImagePlaceholder label="FigJam · Assumptions board · Problem Hypotheses · Scope Definition · Constraints" />

      <div style={{ margin: "0 0 8px 0" }}>
        <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 14px 0" }}>Constraints I worked within</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            {
              icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
              title: "No ATS access",
              desc: "Couldn't depend on Workday or Greenhouse for anything — had to design fully independent of company systems.",
            },
            {
              icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3"/></svg>,
              title: "Mobile-first, India",
              desc: "WhatsApp-heavy users with low tolerance for friction or long flows. Every tap had to earn its place.",
            },
            {
              icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></svg>,
              title: "Zero usage data",
              desc: "0→1 with no existing product. Every scope call had to be made on research and judgment, not behaviour.",
            },
            {
              icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
              title: "Work alongside existing tools",
              desc: "LinkedIn and WhatsApp weren't going away. SideDoor had to fit into existing workflows, not replace them.",
            },
            {
              icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
              title: "MVP scope only",
              desc: "Incentive systems, AI matching, and recruiter tools were real — but they had to wait for v2.",
            },
          ].map((c, i, arr) => (
            <div key={i} style={{
              gridColumn: arr.length % 2 !== 0 && i === arr.length - 1 ? "1 / -1" : "auto",
              background: "var(--cs-callout-bg)",
              borderRadius: 10,
              padding: "16px 18px",
              display: "flex",
              gap: 14,
              alignItems: "flex-start",
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "#E9EFFD", color: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {c.icon}
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-manrope)", fontSize: 13, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 4px 0", letterSpacing: "-0.02em" }}>{c.title}</p>
                <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0, letterSpacing: "-0.01em" }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3 id="process-research" style={{ ...h3Gap, scrollMarginTop: 80 }}>What 10 people told me</h3>
      <p style={body}>
        I interviewed 10 people: 2 recruiters, 4 referrers, 4 candidates. All in India&apos;s tech ecosystem. The same things kept coming up.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "0 0 28px 0" }}>
        {[
          { quote: "Whenever a higher referral bonus is announced, suddenly the system gets flooded with random resumes.", who: "Recruiter", bg: "#F0F1F2", border: "#d1d5db", labelColor: "#6b7280" },
          { quote: "If I'm doing a favor for somebody, why would I go through all this back and forth for someone I don't even know?", who: "Referrer", bg: "#E9EFFD", border: "#93afe8", labelColor: "#2563EB" },
          { quote: "I messaged 40 people. 9 replied. 3 actually submitted. I have no idea what happened after.", who: "Candidate", bg: "#E7F8F2", border: "#6fcba6", labelColor: "#10B981" },
        ].map((item) => (
          <div key={item.who} style={{ background: item.bg, borderRadius: 8, padding: "16px 20px", borderLeft: `3px solid ${item.border}` }}>
            <p style={{ ...T.quote, margin: "0 0 10px 0" }}>
              &quot;{item.quote}&quot;
            </p>
            <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: item.labelColor, textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
              — {item.who}
            </p>
          </div>
        ))}
      </div>
      <ImagePlaceholder label="FigJam · Interview transcripts · Affinity map · Research synthesis · Pain points · Key insights" />

      <h3 id="process-desk" style={{ ...h3Gap, scrollMarginTop: 80 }}>What the numbers confirmed</h3>
      <p style={{ ...body, marginBottom: 8 }}>
        The numbers confirmed what people were telling me.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--cs-stat-gap)", borderRadius: 10, overflow: "hidden", margin: "28px 0" }}>
        {[
          { number: "191", label: "avg applicants per tech hire. Most résumés never get opened.", source: "gem.com" },
          { number: "15–25%", label: "cold LinkedIn DM reply rate vs 40–50% for warm outreach. Context changes everything.", source: "LinkedIn" },
          { number: "<10%", label: "generic outreach reply rate. Copy-paste messages get copy-paste results.", source: "LinkedIn" },
          { number: "92%", label: "application drop-off rate. The funnel leaks everywhere before a referral even enters it.", source: "shrm.org" },
        ].map((stat) => (
          <div key={stat.number} style={{ background: "var(--bg)", padding: "20px 24px" }}>
            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 26, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.03em", marginBottom: 4 }}>
              {stat.number}
            </div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, letterSpacing: "-0.01em" }}>
              {stat.label}
            </div>
            {stat.source && (
              <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 6, letterSpacing: "0.02em", fontStyle: "italic", opacity: 0.7 }}>
                via {stat.source}
              </div>
            )}
          </div>
        ))}
      </div>

      <h3 id="process-journey" style={{ ...h3Gap, scrollMarginTop: 80 }}>Mapping the current experience</h3>
      <p style={body}>
        I mapped the AS-IS journey for both sides, step by step. Every stage was broken in a different way.
      </p>
      <ImagePlaceholder label="FigJam · AS-IS User Journey Map · Candidate journey + Referrer journey · Feelings, pain points, opportunities at each stage" />
      <p style={bodyLast}>
        Discovery was manual and random. Outreach was anxiety-inducing. Evaluation was guesswork.
        Post-referral was a black box for both sides. Then I mapped where each problem should become
        a design solution, the TO-BE.
      </p>
      <ImagePlaceholder label="FigJam · TO-BE Future Journey Map · Key transformations at each stage" />

      <h3 id="process-competitive" style={{ ...h3Gap, scrollMarginTop: 80 }}>What competitors got right, and what none of them solved</h3>
      <p style={body}>
        I analyzed 11 platforms: LinkedIn, GetMeReferred, Instahyre, Jumbl, EasyRefer, Cutshort,
        Wellfound, TalentPool, Naukri, ReferMe, and Reddit/Discord communities, across 6 dimensions:
        discovery, referral flow, tracking, trust signals, spam control, and end-to-end coverage.
      </p>
      <ImagePlaceholder label="Competitive Benchmarking Table · 11 platforms across 6 dimensions" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "24px 0" }}>
        {[
          {
            icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
            insight: "Discovery is largely solved",
            detail: "LinkedIn and AI matching are strong. The problem isn't finding jobs, it's everything that happens after.",
            color: "#10B981", iconBg: "rgba(16,185,129,0.15)", bg: "#E7F8F2",
          },
          {
            icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
            insight: "Tracking is universally broken",
            detail: "Zero post-referral visibility on every platform. Not one solved this, not even referral-specific ones.",
            color: "#ef4444", iconBg: "rgba(239,68,68,0.12)", bg: "#FEF2F2",
          },
          {
            icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="3"/></svg>,
            insight: "Trust exists but is shallow",
            detail: "Profiles and ratings exist, but no platform helped referrers actually decide whether to refer.",
            color: "#f59e0b", iconBg: "rgba(245,158,11,0.12)", bg: "#FFFBEB",
          },
          {
            icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="6" height="6" rx="1"/><rect x="16" y="3" width="6" height="6" rx="1"/><rect x="9" y="15" width="6" height="6" rx="1"/><path d="M5 9v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9"/><line x1="12" y1="13" x2="12" y2="15"/></svg>,
            insight: "No one owns the full journey",
            detail: "Discovery → LinkedIn. Communication → WhatsApp. Submission → ATS. Tracking → nowhere.",
            color: "#6366f1", iconBg: "rgba(99,102,241,0.12)", bg: "#EEF2FF",
          },
        ].map((item) => (
          <div key={item.insight} style={{ background: item.bg, borderRadius: 10, padding: "16px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: item.iconBg, color: item.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {item.icon}
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-manrope)", fontSize: 13, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 6px 0", letterSpacing: "-0.02em", lineHeight: 1.4 }}>{item.insight}</p>
              <p style={{ fontSize: 12, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6, letterSpacing: "-0.01em" }}>{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <Callout>
        <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.65, margin: 0, letterSpacing: "-0.01em" }}>
          <strong style={{ color: "var(--text-primary)" }}>The core insight:</strong> no one owned the end-to-end experience. Every platform solved a piece. None solved the whole. That became the strategic bet for SideDoor.
        </p>
      </Callout>

      <h3 id="process-scoping" style={{ ...h3Gap, scrollMarginTop: 80 }}>What I built, what I cut, and why</h3>
      <p style={{ ...body, marginBottom: 16 }}>
        One filter for v1: does this solve the core trust and workflow problem, or does it add complexity? If the latter, it waited.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 28 }}>
        {[
          { label: "P0 · Built", items: "Trust layer (structured profile, context signals), decision framework for referrers, unified referral flow, shared pipeline visibility" },
          { label: "P1 · Next", items: "Auto-fill referral submission, in-app messaging, notification system, status updates" },
          { label: "Cut", items: "Deep ATS integration (too much company dependency), AI-heavy matching (black-box trust problem), complex incentive/payout system (a separate product problem entirely)" },
        ].map((row) => (
          <div key={row.label} style={{ background: "#F0F1F2", padding: "16px 18px", borderRadius: 8 }}>
            <p style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 8px 0", letterSpacing: "-0.02em" }}>{row.label}</p>
            <p style={{ ...T.small, color: "var(--text-secondary)" }}>{row.items}</p>
          </div>
        ))}
      </div>

      <Divider />

      {/* ── The rules that guided everything ──────────────────────── */}
      <div id="toc-principles" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>Design principles, behind every screen</SectionLabel>
      <h2 style={{ fontFamily: "var(--font-manrope)", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.04em", margin: "0 0 20px 0" }}>
        What every screen had to answer to
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--cs-stat-gap)", borderRadius: 10, overflow: "hidden" }}>
        {[
          { n: "01", title: "Make trust visible before interaction", desc: "Surface strong signals: fit, context, alumni, intent, before any message is sent." },
          { n: "02", title: "Enable fast, low-risk referral decisions", desc: "Give referrers structured information and safe action options. Remove uncertainty, not choice." },
          { n: "03", title: "Replace unstructured outreach with guided requests", desc: "Every request should be clear, relevant, and easy to evaluate. Blank messages don't belong here." },
          { n: "04", title: "Design for end-to-end, low-friction flow", desc: "Discovery → request → referral → tracking in one system. No tool switching." },
          { n: "05", title: "Ensure transparency across the entire journey", desc: "Status, ownership, and outcomes visible to both sides. No black boxes." },
        ].map((p) => (
          <div key={p.n} style={{ background: "var(--bg)", padding: "16px 20px", display: "flex", gap: 16, alignItems: "flex-start" }}>
            <span style={{ ...T.eyebrow, flexShrink: 0, marginTop: 3 }}>{p.n}</span>
            <div>
              <p style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 4px 0", letterSpacing: "-0.02em" }}>{p.title}</p>
              <p style={T.calloutSub}>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* North Star */}
      <Callout>
        <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 10px 0" }}>
          North Star
        </p>
        <p style={{ fontFamily: "var(--font-manrope)", fontSize: 24, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.45, margin: 0 }}>
          &quot;Enable high-quality referral matches through trust, relevance, and clarity.&quot;
        </p>
      </Callout>

      <Divider />

      {/* ── Where I got it wrong first ────────────────────────────── */}
      <div id="toc-decisions" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>Key decisions that shaped the final design</SectionLabel>
      <h2 style={{ fontFamily: "var(--font-manrope)", fontSize: 26, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.04em", margin: "0 0 6px 0", lineHeight: 1.3 }}>
        I got several things wrong. Here&apos;s what broke and how I fixed it.
      </h2>
      <p style={{ fontSize: 15, color: "var(--text-muted)", fontStyle: "italic", letterSpacing: "-0.01em", margin: "0 0 36px 0" }}>
        Every decision below had a wrong version before it. I&apos;ll show what that was and why it failed.
      </p>

      <h3 style={decisionHFirst}><E>👉</E>Ranked discovery instead of open search</h3>
      <p style={body}>
        My first version was an open search: type a company, find any employee, message them. Peer
        review killed it fast. It recreated the exact problem I was trying to solve: candidates would
        mass-message everyone. Referrers would get spammed. We&apos;d be back to LinkedIn.
      </p>
      <ImagePlaceholder label="Wireframe iterations · Open search v1 vs Ranked discovery v2 (final)" />
      <p style={body}>
        People trust things they can see: shared college, response rate, how many people they've referred before. That's what gets surfaced upfront.
      </p>
      <Callout>
        <p style={T.calloutSub}>
          <strong>Trade-off accepted:</strong> Candidates see fewer referrers, meaning lower discovery freedom.
          But quality interactions matter more than volume in referral systems. That was a conscious choice.
        </p>
      </Callout>

      <h3 style={decisionH}><E>👉</E>Structured request form instead of free-form messaging</h3>
      <p style={body}>
        Every referrer I talked to said the worst requests were vague. &quot;Refer me anywhere.&quot; No role,
        no context, no reason. My early versions had a free-form text box. It felt flexible, but it
        was wrong. Free-form preserved the exact behavior I was trying to eliminate.
      </p>
      <ImagePlaceholder label="Request flow iterations · Free-form DM v1 · Guided form v2 · Fit points + JD auto-attach v3 (final)" />
      <p style={body}>
        Structured input wasn&apos;t about removing freedom. It was about making it easy to send something good. Pre-suggested fit points and a preview screen before sending helped with both.
      </p>
      <Callout>
        <p style={T.calloutSub}>
          <strong>Intentional friction is a feature, not a bug.</strong> A small amount of effort acts
          as a commitment filter that discourages low-intent behavior without blocking serious candidates.
        </p>
      </Callout>

      <h3 style={decisionH}><E>👉</E>Graded recommendations instead of binary Refer / Don&apos;t Refer</h3>
      <p style={body}>
        My first evaluation screen had two buttons: Refer or Don&apos;t Refer. Simple, clean. Wrong.
        Testing revealed the real issue: referrers who thought a candidate was &quot;probably good but
        not 100% sure&quot; had no place to land. They&apos;d either over-commit (risky for their reputation) or
        bail entirely. We were losing all the middle cases.
      </p>
      <ImagePlaceholder label="Evaluation screen iterations · Binary v1 vs Graded actions v2 (Decline / Review Later / Refer / Strongly Recommend)" />
      <p style={bodyLast}>
        Human confidence isn&apos;t binary. A spectrum (Decline / Review Later / Refer / Strongly Recommend) gives referrers room to be honest about their confidence. Less pressure, more participation. The private note lets them share context with the recruiter that the candidate never sees.
      </p>

      <h3 style={decisionH}><E>👉</E>Lightweight shared pipeline instead of ATS integration</h3>
      <p style={body}>
        Early on, I explored full ATS integration: connecting SideDoor to Workday and Greenhouse so
        tracking would be automatic and real-time. I dropped it fast. ATS integration requires company
        cooperation, IT approvals, and months of enterprise sales work. Completely unrealistic for MVP.
      </p>
      <ImagePlaceholder label="Pipeline iterations · Full ATS sync concept vs lightweight shared stages (final)" />
      <p style={body}>
        Users don&apos;t need real-time ATS data: they need enough visibility to stop the anxiety. Lightweight stages (Submitted → Screening → Interview → Offer) solve the emotional problem without the technical dependency.
      </p>
      <Callout>
        <p style={T.calloutSub}>
          <strong>Perceived clarity matters more than perfect automation.</strong>
        </p>
      </Callout>

      <Divider />

      {/* ── When the happy path breaks ────────────────────────────── */}
      <div id="toc-usecases" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>Designing for the edge cases</SectionLabel>
      <h2 style={{ fontFamily: "var(--font-manrope)", fontSize: 26, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.04em", margin: "0 0 16px 0", lineHeight: 1.3 }}>
        SideDoor doesn&apos;t just handle the good days.
      </h2>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.75, letterSpacing: "-0.01em", margin: "0 0 24px 0" }}>
        Every referral flow has a moment where something slips. The referrer gets busy. The ATS drops the submission. A company goes quiet for three weeks. Here&apos;s what the design does when that happens.
      </p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {[
          { case: "Referrer accepts, never submits", response: "Nudge after 48 hrs. If still no action, candidate can re-route to another referrer." },
          { case: "ATS submission fails", response: "Mark as 'Pending confirmation.' Referrer can manually confirm." },
          { case: "Company goes silent for weeks", response: "Show 'No update yet, this is normal at this stage.' Sets expectations before anxiety spikes." },
          { case: "Candidate hits request limit", response: "Show cooldown. Prompt to improve request quality, not just wait it out." },
        ].map((e, i, arr) => (
          <div key={e.case} style={{ display: "flex", gap: 16, padding: "12px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
            <p style={{ fontFamily: "var(--font-manrope)", fontSize: 13, fontWeight: 700, color: "var(--text-primary)", margin: 0, flexShrink: 0, width: 220 }}>{e.case}</p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>{e.response}</p>
          </div>
        ))}
      </div>

      <Divider />

      {/* ── How we'd know it worked ───────────────────────────────── */}
      <div id="toc-metrics" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>Target metrics that tell the real story</SectionLabel>
      <h2 style={{ fontFamily: "var(--font-manrope)", fontSize: 26, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.04em", margin: "0 0 16px 0", lineHeight: 1.3 }}>
        If this ships, here&apos;s what moves.
      </h2>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.75, letterSpacing: "-0.01em", margin: "0 0 16px 0" }}>
        Ishaan&apos;s story is what good looks like. But design doesn&apos;t ship on stories. It ships on metrics. Here&apos;s what every decision was tied to.
      </p>
      <p style={{ fontSize: 12, color: "var(--text-muted)", fontStyle: "italic", letterSpacing: "-0.01em", margin: "0 0 28px 0" }}>
        These are design-time targets — what success looks like if this ships, not measured outcomes.
      </p>

      {/* North Star Metric */}
      <div style={{ background: "var(--cs-callout-bg)", borderRadius: 8, padding: "20px 24px", marginBottom: 24 }}>
        <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 10px 0" }}>
          North Star Metric
        </p>
        <p style={{ fontFamily: "var(--font-manrope)", fontSize: 20, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.03em", margin: "0 0 8px 0", lineHeight: 1.3 }}>
          Accepted referral requests per active user
        </p>
        <p style={T.calloutSub}>
          The goal was never more requests. <em>Better</em> ones. When acceptance rates go up, trust is working and both sides are getting real value.
        </p>
      </div>

      {/* Metrics: flat list */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--cs-stat-gap)", borderRadius: 10, overflow: "hidden", marginBottom: 24 }}>
        {[
          { dir: "↑", label: "Request acceptance rate",  story: "Diya said yes to Ishaan's request" },
          { dir: "↑", label: "Referral submission rate", story: "Diya followed through and submitted it" },
          { dir: "↓", label: "Spam rate",                story: "Diya got 1 good request, not 40 random ones" },
          { dir: "↓", label: "Time to first response",   story: "Diya responded on her lunch break" },
        ].map((m) => (
          <div key={m.label} style={{ background: "var(--bg)", padding: "13px 18px", display: "flex", alignItems: "flex-start", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, fontWeight: 700, color: "#2563EB", background: "rgba(37,99,235,0.1)", borderRadius: 4, padding: "2px 7px", letterSpacing: "0.02em", flexShrink: 0, marginTop: 2 }}>
              {m.dir}
            </span>
            <div>
              <p style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: "0 0 2px 0", letterSpacing: "-0.02em" }}>
                {m.label}
              </p>
              <p style={{ fontSize: 11, color: "var(--text-muted)", fontStyle: "italic", margin: 0, letterSpacing: "-0.01em" }}>
                {m.story}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      <div id="toc-funnel" style={{ scrollMarginTop: 40 }} />
      {/* Before / After funnel */}
      <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 20px 0" }}>
        Referral funnel — Before Vs SideDoor
      </p>

      {/* Legend */}
      <div style={{ display: "flex", gap: 20, marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: "#a8a4a0" }} />
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.04em" }}>Old way</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: "#2563EB" }} />
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, color: "#2563EB", letterSpacing: "0.04em" }}>Referrer side</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: "#10B981" }} />
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, color: "#10B981", letterSpacing: "0.04em" }}>Candidate side</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 28 }}>
        {[
          { stage: "Requests sent",       note: "Candidate sends referral requests",                    before: 100, beforeNote: "baseline",              after: null, delta: null, color: null, bgColor: null, textColor: null },
          { stage: "Request accepted",    note: "Ranked discovery + structured form replace cold DMs",  before: 20,  beforeNote: "cold DM reply rate",    after: 60,   delta: "3×", color: "#2563EB", bgColor: "#E9EFFD", textColor: "#1d4bb5" },
          { stage: "Referral submitted",  note: "Graded recommendations reduce referrer drop-off",      before: 7,   beforeNote: "of requests sent",      after: 45,   delta: "6×", color: "#2563EB", bgColor: "#E9EFFD", textColor: "#1d4bb5" },
          { stage: "Hire (per 100 sent)", note: "Quality filtering compounds across every stage",       before: 1,   beforeNote: "cold apply baseline",   after: 8,    delta: "8×", color: "#10B981", bgColor: "#E7F8F2", textColor: "#4a9e6e" },
        ].map((row, i, arr) => (
          <div key={row.stage}>
            {/* Stage header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div>
                <span style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>{row.stage}</span>
                <span style={{ fontSize: 13, color: "var(--text-muted)", marginLeft: 10, letterSpacing: "-0.01em" }}>{row.note}</span>
              </div>
              {row.delta && (
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, fontWeight: 700, color: "#fff", background: row.color!, borderRadius: 4, padding: "2px 8px", letterSpacing: "0.04em", flexShrink: 0 }}>↑{row.delta}</span>
              )}
            </div>

            {row.after === null ? (
              /* Baseline row */
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ flex: 1, height: 36, background: "#10B981", borderRadius: 6, display: "flex", alignItems: "center", paddingLeft: 12 }}>
                  <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>100 requests sent</span>
                </div>
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--text-muted)", width: 110, flexShrink: 0, letterSpacing: "-0.01em", textAlign: "right" }}>{row.beforeNote}</span>
              </div>
            ) : (
              <>
                {/* Old way bar */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                  <div style={{ flex: 1, height: 36, background: "#ece9e4", borderRadius: 6, overflow: "hidden" }}>
                    <div style={{ width: `${Math.max(row.before, 2)}%`, height: "100%", background: "#a8a4a0", borderRadius: 6, display: "flex", alignItems: "center", paddingLeft: 12 }}>
                      <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 14, fontWeight: 700, color: "var(--bg)", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>~{row.before}%</span>
                    </div>
                  </div>
                  <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--text-muted)", width: 110, flexShrink: 0, letterSpacing: "-0.01em", textAlign: "right" }}>{row.beforeNote}</span>
                </div>

                {/* SideDoor bar */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ flex: 1, height: 36, background: row.bgColor!, borderRadius: 6, overflow: "hidden" }}>
                    <div style={{ width: `${row.after}%`, height: "100%", background: row.color!, borderRadius: 6, display: "flex", alignItems: "center", paddingLeft: 12 }}>
                      <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>~{row.after}%</span>
                    </div>
                  </div>
                  <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: row.textColor!, width: 110, flexShrink: 0, letterSpacing: "-0.01em", textAlign: "right" }}>design target</span>
                </div>
              </>
            )}

            {/* Stage connector */}
            {i < arr.length - 1 && (
              <div style={{ display: "flex", gap: 12, margin: "10px 0" }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", paddingLeft: `${row.before / 2}%` }}>
                  <div style={{ width: 1, height: 12, background: "var(--cs-stat-gap)" }} />
                </div>
                <div style={{ width: 110, flexShrink: 0 }} />
              </div>
            )}
          </div>
        ))}
      </div>

      <Divider />

      <div id="toc-business" style={{ scrollMarginTop: 40 }} />
      {/* Business outcome metrics */}
      <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 20px 0" }}>
        Target Business Outcomes
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        {[
          {
            number: "8–10%",
            label: "Referral-to-hire rate",
            story: "One good request. One hire.",
            before: { pct: 11, label: "~1% cold apply" },
            after:  { pct: 90, label: "SideDoor target" },
            color: "#10B981", bg: "#E7F8F2", trackBg: "rgba(16,185,129,0.15)",
          },
          {
            number: "≤29 days",
            label: "Time to hire",
            story: "Ishaan didn't wait 6 weeks.",
            before: { pct: 92, label: "44–55 days portals" },
            after:  { pct: 48, label: "SideDoor target" },
            color: "#2563EB", bg: "#E9EFFD", trackBg: "rgba(37,99,235,0.12)",
          },
          {
            number: "46%",
            label: "1-year retention",
            story: "Better matches stay longer.",
            before: { pct: 55, label: "33% job boards" },
            after:  { pct: 77, label: "SideDoor target" },
            color: "#10B981", bg: "#E7F8F2", trackBg: "rgba(16,185,129,0.15)",
          },
        ].map((m) => (
          <div key={m.label} style={{ background: m.bg, borderRadius: 12, padding: "24px" }}>
            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 34, fontWeight: 700, color: m.color, letterSpacing: "-0.04em", marginBottom: 6 }}>
              {m.number}
            </div>
            <p style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 4px 0", letterSpacing: "-0.02em" }}>
              {m.label}
            </p>
            <p style={{ fontFamily: "var(--font-caveat)", fontSize: 15, color: m.color, margin: "0 0 20px 0", opacity: 0.85 }}>
              {m.story}
            </p>
            {/* Before bar */}
            <div style={{ marginBottom: 8 }}>
              <div style={{ height: 4, background: "rgba(0,0,0,0.08)", borderRadius: 2, overflow: "hidden", marginBottom: 4 }}>
                <div style={{ width: `${m.before.pct}%`, height: "100%", background: "#a8a4a0", borderRadius: 2 }} />
              </div>
              <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--text-muted)", margin: 0, letterSpacing: "0.02em" }}>{m.before.label}</p>
            </div>
            {/* After bar */}
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

      {/* ── What's next ───────────────────────────────────────────── */}
      <div id="toc-next" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>What&apos;s next</SectionLabel>
      <h2 style={{ fontFamily: "var(--font-manrope)", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.04em", margin: "0 0 24px 0" }}>
        There&apos;s still a lot on the table.
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--cs-stat-gap)", borderRadius: 10, overflow: "hidden" }}>
        {[
          { n: "01", title: "Recruiter-side analytics", body: "Companies have zero visibility into their referral funnel. A B2B dashboard with conversion rates, referrer quality scores, and time-to-hire is real, underserved, and where the business model lives." },
          { n: "02", title: "Better incentive design", body: "Referral bonuses are delayed, unclear, and tied to hires only. A platform-level system rewarding quality referrals, not just conversions, could change participation entirely." },
          { n: "03", title: "Unhappy paths and edge cases", body: "This covers the happy flow. Real edge cases (referrer drops, ATS fails, company goes silent) are documented but not designed yet. That's next." },
        ].map((item) => (
          <div key={item.n} style={{ background: "var(--bg)", padding: "16px 20px", display: "flex", gap: 16, alignItems: "flex-start" }}>
            <span style={{ ...T.eyebrow, flexShrink: 0, marginTop: 3 }}>{item.n}</span>
            <div>
              <p style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 4px 0", letterSpacing: "-0.02em" }}>{item.title}</p>
              <p style={T.calloutSub}>{item.body}</p>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ── Honest reflection ─────────────────────────────────────── */}
      <div id="toc-reflection" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>Honest reflection</SectionLabel>
      <h2 style={{ fontFamily: "var(--font-manrope)", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.04em", margin: "0 0 16px 0" }}>
        If I started over, here&apos;s what I&apos;d do differently.
      </h2>
      <p style={body}>
        I spent too much early time on the candidate&apos;s side, they were easier to reach. But referrers were the harder design problem. The hesitation, the fear of referring someone bad, the pressure of a yes/no choice: I only really understood those after building and scrapping my first evaluation screen.
      </p>
      <p style={body}>
        The ATS constraint initially felt like a wall. It turned out to be a forcing function. Removing the dependency pushed me toward a simpler, lighter pipeline model that&apos;s more resilient — it works regardless of what ATS a company uses. I&apos;ve started thinking of constraints that way: not as blockers, but as the thing that stops you from overbuilding.
      </p>
      <p style={body}>
        My research sample was skewed. The four referrers I interviewed had all opted into the conversation, which means they were probably already more thoughtful about referrals than average. The real resistance — the employee who ignores every request — I never got to talk to. That&apos;s a gap. You should design for the skeptic, not just the willing.
      </p>
      <p style={bodyLast}>
        If I started over, I&apos;d prototype the referrer evaluation flow first and test it with real employees before anything else. Starting with the harder side would&apos;ve made everything else clearer.
      </p>

      <Divider />

      {/* Closing */}
      <p style={{ fontFamily: "var(--font-manrope)", fontSize: 22, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.5, margin: "0 0 16px 0" }}>
        Ishaan didn&apos;t need to message 40 people. He needed one good match, one structured ask, and the ability to see what happened next.
      </p>
      <p style={body}>
        That&apos;s what SideDoor was built around: not making referrals faster, but making them work the way they were supposed to. The channel works. The experience doesn&apos;t. This was my attempt to close that gap, for Ishaan, for Diya, and for everyone doing this the hard way.
      </p>
      <p style={body}>
        If you made it this far, thank you. Always happy to talk. ❤️
      </p>
    </main>
  );
}
