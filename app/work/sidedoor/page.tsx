import { Poppins, Caveat } from "next/font/google";
import CaseStudyTOC from "../../../components/CaseStudyTOC";
import RubberBackButton from "../../../components/RubberBackButton";

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
    { number: "5–10×", label: "more likely to get hired via referral vs portals" },
    { number: "29 days", label: "avg time-to-hire vs 44–55 days through portals" },
    { number: "46%", label: "1-year retention vs 33% through job boards" },
    { number: "~20%", label: "cold LinkedIn DM reply rate (on a good day)" },
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
      <Callout>
        <p style={T.quote}>
          &quot;I don&apos;t even know if they submitted it. I have no way to track it.&quot; <span style={{ fontFamily: "var(--font-geist-mono)", fontStyle: "normal", fontSize: 10, fontWeight: 500, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>— Candidate, interview</span>
        </p>
      </Callout>
      <p style={bodyLast}>
        Ishaan&apos;s not an edge case. He&apos;s every candidate. The employees he&apos;s messaging? They&apos;re getting
        10–50 requests like his every week. One PM I interviewed got 40–50 DMs a day whenever their
        company posted a public listing. They&apos;d turned off LinkedIn notifications just to work.
      </p>

      <Divider />

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

      <div id="toc-solution" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>The solution</SectionLabel>
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
        Referrers are ranked by role relevance, shared context (alumni, mutuals), response rate, and past referral activity. People trust what they can verify, not just what someone writes about themselves.
      </p>

      <div style={{ margin: "60px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        <span style={{ fontSize: 20 }}>🍿</span>
        <p style={{ ...T.calloutSub, textAlign: "center", margin: "-14px 0 0 0", maxWidth: 520 }}>
          Ishaan had treated referrals like a numbers game. Then he saw the ranked list. Diya Sharma: 92% match, same university, responds in under 8 hours. For the first time, a name on his screen felt like a real lead, not a lottery ticket.
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
        <p style={{ ...T.calloutSub, textAlign: "center", margin: "-14px 0 0 0", maxWidth: 520 }}>
          Diya got a notification on her lunch break. Instead of a wall of text begging for a referral, she saw a clean card: 85% role match, three fit points, a short pitch. She read it in under 30 seconds. For once, the request did the work for him.
        </p>
        <img src="/images/diya-2.PNG" alt="" style={{ width: 180, objectFit: "contain", marginTop: 8 }} />
      </div>

      {/* 03 */}
      <SectionLabel><ScreenBadge n="03" color="#2563EB" />Referrer Evaluation</SectionLabel>
      <h2 style={problemQ}><E>➡️</E>How can a referrer decide confidently without risking their own reputation?</h2>
      <StoryBlock color="#2563EB" bg="#E9EFFD">
        <p style={T.callout}>
          Diya opens Ishaan&apos;s request. He doesn&apos;t see a resume dump. He sees a structured evaluation:
          85% overall match with breakdown, key strengths (green), potential concerns (orange), and
          Ishaan&apos;s own pitch.
        </p>
        <p style={T.calloutSub}>
          Instead of &quot;Refer or Don&apos;t Refer,&quot; he has four options: Decline / Review Later / Refer /
          Strongly Recommend. He clicks Strongly Recommend. Adds a private note for the recruiter.
        </p>
      </StoryBlock>
      <Callout>
        <p style={{ ...T.callout, margin: 0 }}>
          <E>🎯</E>Diya didn&apos;t guess. He made a confident, informed decision in under 2 minutes.
        </p>
      </Callout>
      <ImagePlaceholder label="Screen 3 · Referrer Evaluation · Match % breakdown, Strengths & Concerns, Graded recommendation levels (Decline / Review Later / Refer / Strongly Recommend)" />
      <p style={bodyLast}>
        Referrers aren&apos;t unwilling: they&apos;re uncertain. Building an evaluation assistant instead of just a profile view reduces that. The private note adds context for the recruiter without the candidate ever seeing it.
      </p>

      <div style={{ margin: "60px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        <span style={{ fontSize: 20 }}>🍿</span>
        <p style={{ ...T.calloutSub, textAlign: "center", margin: "-14px 0 0 0", maxWidth: 520 }}>
          Diya clicked &quot;Strongly Recommend.&quot; Ishaan&apos;s phone buzzed a minute later. Request accepted. And for the first time in his job hunt, the silence that followed didn&apos;t feel like being ignored. He could see exactly what was happening next.
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
        <p style={{ ...T.calloutSub, textAlign: "center", margin: "-14px 0 0 0", maxWidth: 520 }}>
          Ishaan tapped the notification expecting another follow-up to send. Instead: a timeline. Request Accepted. Referral Submitted. Under Review. He put his phone down and didn&apos;t pick it back up to check his email. Not once.
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
        <p style={{ ...T.calloutSub, textAlign: "center", margin: "-14px 0 0 0", maxWidth: 520 }}>
          Ishaan sent one request. Got one referral. And watched it move through screening, without sending a single follow-up message. Diya saw the same thing from her end. No one was left guessing.
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

      <div id="toc-metrics" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>Success Metrics</SectionLabel>
      <h2 style={{ fontFamily: "var(--font-manrope)", fontSize: 26, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.04em", margin: "0 0 16px 0", lineHeight: 1.3 }}>
        If this ships, here&apos;s what moves.
      </h2>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.75, letterSpacing: "-0.01em", margin: "0 0 28px 0" }}>
        Ishaan&apos;s story is what good looks like. But design doesn&apos;t ship on stories. It ships on metrics. Here&apos;s what every decision was tied to.
      </p>

      {/* North Star */}
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
      <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--cs-stat-gap)", borderRadius: 10, overflow: "hidden", marginBottom: 24 }}>
        {[
          { dir: "↑", label: "Request acceptance rate",  story: "Diya said yes to Ishaan's request" },
          { dir: "↑", label: "Referral submission rate", story: "Diya followed through and submitted it" },
          { dir: "↓", label: "Spam rate",                story: "Diya got 1 good request, not 40 random ones" },
          { dir: "↓", label: "Time to first response",   story: "Diya responded on her lunch break" },
        ].map((m) => (
          <div key={m.label} style={{ background: "var(--bg)", padding: "13px 18px", display: "flex", alignItems: "flex-start", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, fontWeight: 700, color: "#4a9e6e", background: "rgba(74,158,110,0.1)", borderRadius: 4, padding: "2px 7px", letterSpacing: "0.02em", flexShrink: 0, marginTop: 2 }}>
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

      {/* Before / After funnel */}
      <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", margin: "28px 0 14px 0" }}>
        Referral funnel · before vs. SideDoor
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 1, background: "var(--cs-stat-gap)", borderRadius: "10px 10px 0 0", overflow: "hidden" }}>
        <div style={{ background: "var(--bg)", padding: "10px 16px" }} />
        <div style={{ background: "var(--bg)", padding: "10px 16px" }}>
          <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>Old way</p>
        </div>
        <div style={{ background: "#E7F8F2", padding: "10px 16px" }}>
          <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, fontWeight: 600, color: "#10B981", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>SideDoor</p>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--cs-stat-gap)", borderRadius: "0 0 10px 10px", overflow: "hidden", marginBottom: 28 }}>
        {[
          { stage: "Request accepted",    note: "Ranked discovery + structured form replace cold DMs",  before: "~20%", beforeNote: "cold DM reply rate",                        after: "~60%", delta: "3×" },
          { stage: "Referral submitted",  note: "Graded recommendations reduce referrer drop-off",      before: "~7%",  beforeNote: "of requests sent (40 msgs → 3 submitted)", after: "~45%", delta: "6×" },
          { stage: "Hire (per 100 sent)", note: "Quality filtering compounds across every stage",       before: "~1%",  beforeNote: "cold apply baseline",                     after: "~8%",  delta: "8×" },
        ].map((row) => (
          <div key={row.stage} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 1, background: "var(--cs-stat-gap)" }}>
            <div style={{ background: "var(--bg)", padding: "14px 16px" }}>
              <p style={{ fontFamily: "var(--font-manrope)", fontSize: 13, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 3px 0", letterSpacing: "-0.02em" }}>{row.stage}</p>
              <p style={{ fontSize: 11, color: "var(--text-muted)", margin: 0, lineHeight: 1.5, letterSpacing: "-0.01em" }}>{row.note}</p>
            </div>
            <div style={{ background: "var(--bg)", padding: "14px 16px" }}>
              <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 18, fontWeight: 700, color: "var(--text-muted)", margin: "0 0 3px 0", letterSpacing: "-0.02em" }}>{row.before}</p>
              <p style={{ fontSize: 11, color: "var(--text-muted)", margin: 0, lineHeight: 1.5, letterSpacing: "-0.01em" }}>{row.beforeNote}</p>
            </div>
            <div style={{ background: "#E7F8F2", padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 18, fontWeight: 700, color: "#10B981", margin: 0, letterSpacing: "-0.02em" }}>{row.after}</p>
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, fontWeight: 700, color: "#fff", background: "#10B981", borderRadius: 4, padding: "2px 6px", letterSpacing: "0.02em" }}>↑{row.delta}</span>
              </div>
              <p style={{ fontSize: 11, color: "#4a9e6e", margin: 0, lineHeight: 1.5, letterSpacing: "-0.01em" }}>design target</p>
            </div>
          </div>
        ))}
      </div>

      {/* Business outcome metrics */}
      <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", margin: "28px 0 14px 0" }}>
        Business outcomes
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 1, background: "var(--cs-stat-gap)", borderRadius: 10, overflow: "hidden" }}>
        {[
          { number: "8–10%",    label: "Referral-to-hire rate",      note: "vs ~1% cold apply" },
          { number: "≤29 days", label: "Time to hire",                note: "vs 44–55 days portals" },
          { number: ">70%",     label: "Recruiter signal quality",    note: "referrals rated strong fit" },
          { number: ">50%",     label: "Referrer activation",         note: "first eval within 7 days" },
          { number: ">35%",     label: "Referrer return rate",        note: "returns within 30 days" },
        ].map((m) => (
          <div key={m.label} style={{ background: "var(--bg)", padding: "16px 18px" }}>
            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 20, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.03em", marginBottom: 5 }}>
              {m.number}
            </div>
            <p style={{ fontFamily: "var(--font-manrope)", fontSize: 12, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 3px 0", letterSpacing: "-0.02em" }}>
              {m.label}
            </p>
            <p style={{ fontSize: 11, color: "var(--text-muted)", margin: 0, letterSpacing: "-0.01em" }}>
              {m.note}
            </p>
          </div>
        ))}
      </div>

      <Divider />

      <div id="toc-process" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>The process</SectionLabel>
      <h2 style={{ fontFamily: "var(--font-manrope)", fontSize: 26, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.04em", margin: "0 0 6px 0", lineHeight: 1.3 }}>
        That&apos;s the product. Now here&apos;s how I got there.
      </h2>
      <p style={{ fontSize: 15, color: "var(--text-muted)", fontStyle: "italic", letterSpacing: "-0.01em", margin: "0 0 36px 0" }}>
        None of this was obvious at the start. A lot of it was wrong before it was right.
      </p>

      <h3 style={h3Style}>Starting with assumptions, not answers</h3>
      <p style={body}>
        Before talking to anyone, I wrote down 14 assumptions: candidates don&apos;t know who to ask, referrers ignore cold DMs, nothing gets tracked, it all feels transactional. Then I went out to validate or kill each one.
      </p>
      <ImagePlaceholder label="FigJam · Assumptions board · Problem Hypotheses · Scope Definition · Constraints" />

      <div style={{ background: "var(--cs-callout-bg)", borderRadius: 8, padding: "18px 22px", margin: "0 0 8px 0" }}>
        <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 12px 0" }}>Constraints I worked within</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {[
            "No access to company ATS systems: couldn't depend on Workday or Greenhouse for anything",
            "Mobile-first, India market: WhatsApp-heavy users, low tolerance for friction or long flows",
            "0→1 with no existing product, so every scope call had to be made without real usage data",
            "Couldn't replace LinkedIn or WhatsApp, so had to design something that worked alongside them",
            "MVP scope: incentive systems, AI matching, and recruiter tools had to wait for v2",
          ].map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 10 }}>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--text-muted)", marginTop: 3, flexShrink: 0 }}>·</span>
              <p style={T.small}>{c}</p>
            </div>
          ))}
        </div>
      </div>

      <h3 style={h3Gap}>Primary research</h3>
      <p style={body}>
        I interviewed 10 people: 2 recruiters, 4 referrers, 4 candidates. All in India&apos;s tech ecosystem. The same things kept coming up.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "0 0 28px 0" }}>
        {[
          { quote: "Whenever a higher referral bonus is announced, suddenly the system gets flooded with random resumes.", who: "Recruiter" },
          { quote: "If I'm doing a favor for somebody, why would I go through all this back and forth for someone I don't even know?", who: "Referrer" },
          { quote: "I messaged 40 people. 9 replied. 3 actually submitted. I have no idea what happened after.", who: "Candidate" },
        ].map((item) => (
          <div key={item.who} style={{ background: "var(--cs-callout-bg)", borderRadius: 8, padding: "16px 20px" }}>
            <p style={{ ...T.quote, margin: "0 0 10px 0" }}>
              &quot;{item.quote}&quot;
            </p>
            <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
              — {item.who}
            </p>
          </div>
        ))}
      </div>
      <ImagePlaceholder label="FigJam · Interview transcripts · Affinity map · Research synthesis · Pain points · Key insights" />

      <h3 style={h3Gap}>Desk research</h3>
      <p style={{ ...body, marginBottom: 8 }}>
        The numbers confirmed what people were telling me.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--cs-stat-gap)", borderRadius: 10, overflow: "hidden", margin: "28px 0" }}>
        {[
          { number: "191", label: "avg applicants per tech hire. Most résumés never get opened." },
          { number: "15–25%", label: "cold LinkedIn DM reply rate vs 40–50% for warm outreach. Context changes everything." },
          { number: "<10%", label: "generic outreach reply rate. Copy-paste messages get copy-paste results." },
          { number: "92%", label: "application drop-off rate. The funnel leaks everywhere before a referral even enters it." },
        ].map((stat) => (
          <div key={stat.number} style={{ background: "var(--bg)", padding: "20px 24px" }}>
            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 26, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.03em", marginBottom: 4 }}>
              {stat.number}
            </div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, letterSpacing: "-0.01em" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <h3 style={h3Gap}>Mapping the current experience</h3>
      <p style={body}>
        I mapped the AS-IS journey for both sides, step by step. Every stage was broken in a different way.
      </p>
      <ImagePlaceholder label="FigJam · AS-IS User Journey Map · Candidate journey + Referrer journey · Feelings, pain points, opportunities at each stage" />
      <p style={bodyLast}>
        Discovery was manual and random. Outreach was anxiety-inducing. Evaluation was guesswork.
        Post-referral was a black box for both sides. Then I mapped where each problem should become
        a design solution, the TO-BE.
      </p>
      <ImagePlaceholder label="FigJam · TO-BE Future Journey Map · Key transformations at each stage" aspect="21/9" />

      <h3 style={h3Gap}>What competitors got right, and what none of them solved</h3>
      <p style={body}>
        I analyzed 11 platforms: LinkedIn, GetMeReferred, Instahyre, Jumbl, EasyRefer, Cutshort,
        Wellfound, TalentPool, Naukri, ReferMe, and Reddit/Discord communities, across 6 dimensions:
        discovery, referral flow, tracking, trust signals, spam control, and end-to-end coverage.
      </p>
      <ImagePlaceholder label="Competitive Benchmarking Table · 11 platforms across 6 dimensions" aspect="4/3" />
      <div style={{ display: "flex", flexDirection: "column", gap: 28, margin: "24px 0" }}>
        {[
          { n: "01", insight: "Discovery is largely solved", detail: "LinkedIn and AI matching are strong. The problem isn't finding jobs or companies. It's everything that happens after." },
          { n: "02", insight: "Tracking is universally broken", detail: "Zero post-referral visibility on every single platform. Not one solved this. Not even the referral-specific ones." },
          { n: "03", insight: "Trust exists but is shallow", detail: "Profiles and ratings exist, but no platform helped referrers actually decide." },
          { n: "04", insight: "No one owns the full journey", detail: "Discovery → LinkedIn. Communication → WhatsApp. Submission → ATS. Tracking → nowhere. All disconnected." },
        ].map((item) => (
          <div key={item.insight} style={{ display: "flex", gap: 14 }}>
            <span style={{ ...T.eyebrow, marginTop: 3, flexShrink: 0 }}>{item.n}</span>
            <div>
              <p style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 4px 0", letterSpacing: "-0.02em" }}>{item.insight}</p>
              <p style={T.calloutSub}>{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <Callout>
        <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.65, margin: 0, letterSpacing: "-0.01em" }}>
          <strong style={{ color: "var(--text-primary)" }}>The core insight:</strong> no one owned the end-to-end experience. Every platform solved a piece. None solved the whole. That became the strategic bet for SideDoor.
        </p>
      </Callout>

      <h3 style={h3Gap}>What I built, what I cut, and why</h3>
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

      <div id="toc-decisions" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>Key Design Decisions</SectionLabel>
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

      <h3 style={{ ...decisionH, marginTop: 36 }}>What happens when things go wrong</h3>
      <p style={{ ...body, marginBottom: 16 }}>
        The happy flow is never the whole story. Here are the failure modes I mapped.
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

      <div id="toc-principles" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>Design Principles</SectionLabel>
      <h2 style={{ fontFamily: "var(--font-manrope)", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.04em", margin: "0 0 20px 0" }}>
        What guided every decision
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
              <p style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 3px 0", letterSpacing: "-0.02em" }}>{p.title}</p>
              <p style={T.small}>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <Divider />

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

      <div id="toc-next" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>What&apos;s next</SectionLabel>
      <h2 style={{ fontFamily: "var(--font-manrope)", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.04em", margin: "0 0 24px 0" }}>
        There&apos;s still a lot on the table.
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {[
          { n: "01", title: "Recruiter-side analytics", body: "Companies have zero visibility into their referral funnel. A B2B dashboard with conversion rates, referrer quality scores, and time-to-hire is real, underserved, and where the business model lives." },
          { n: "02", title: "Better incentive design", body: "Referral bonuses are delayed, unclear, and tied to hires only. A platform-level system rewarding quality referrals, not just conversions, could change participation entirely." },
          { n: "03", title: "Unhappy paths and edge cases", body: "This covers the happy flow. Real edge cases (referrer drops, ATS fails, company goes silent) are documented but not designed yet. That's next." },
        ].map((item) => (
          <div key={item.n} style={{ display: "flex", gap: 16 }}>
            <span style={{ ...T.eyebrow, flexShrink: 0, marginTop: 3 }}>{item.n}</span>
            <div>
              <p style={{ fontFamily: "var(--font-manrope)", fontSize: 15, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 5px 0", letterSpacing: "-0.02em" }}>{item.title}</p>
              <p style={T.calloutSub}>{item.body}</p>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      <div id="toc-reflection" style={{ scrollMarginTop: 40 }} />
      <SectionLabel>Honest reflection</SectionLabel>
      <h2 style={{ fontFamily: "var(--font-manrope)", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.04em", margin: "0 0 16px 0" }}>
        If I started over, here&apos;s what I&apos;d do differently.
      </h2>
      <p style={body}>
        I spent too much early time on the candidate&apos;s side, they were easier to reach. But referrers were the harder design problem. The hesitation, the fear of referring someone bad, the pressure of a yes/no choice: I only really understood those after building and scrapping my first evaluation screen.
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
