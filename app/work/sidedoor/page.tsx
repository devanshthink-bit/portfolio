// Built on the shared case study kit (components/caseStudy.tsx + the cs-* classes), the same as
// RedBus, so type, colour, corners, shadows and spacing match the rest of the portfolio.
import { Poppins, Caveat } from "next/font/google";
import RubberBackButton from "../../../components/RubberBackButton";
import SidedoorTOCClient from "../../../components/SidedoorTOCClient";
import { T, SectionLabel, Card, MetaStrip } from "../../../components/caseStudy";

const poppins = Poppins({ weight: "700", subsets: ["latin"] });
// The handwritten face for the story lines between screens.
const caveat = Caveat({ subsets: ["latin"] });

// Sidedoor's brand colours, as tokens in globals.css: referrers blue, candidates green.
const BLUE = "var(--sd-blue)";
const GREEN = "var(--sd-green)";

// Prevents font transforms from skewing emoji characters
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
        background: "var(--card-bg)",
        borderRadius: "var(--r-lg)",
        boxShadow: "var(--shadow-lg)",
        margin: "32px 0",
      }}
    />
  );
}

// A top-level section: the same rule, kicker, title and line as a RedBus act.
function Act({ id, kicker, title, sub, note }: { id: string; kicker: string; title?: string; sub?: string; note?: string }) {
  return (
    <header id={id} className="cs-act">
      <p className="cs-act-kicker">{kicker}</p>
      {title && <h2 className="cs-act-title">{title}</h2>}
      {sub && <p className="cs-act-sub">{sub}</p>}
      {note && <p style={{ ...T.small, marginTop: 12 }}>{note}</p>}
    </header>
  );
}

// A quiet interlude between screens: one line of story and a sketch.
function Interlude({ text, img }: { text: string; img: string }) {
  return (
    <div style={{ margin: "0 0 96px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      <span style={{ fontSize: "var(--fs-20)" }}>🍿</span>
      <p className={caveat.className} style={{ fontSize: 22, fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.55, textAlign: "center", maxWidth: 520, margin: 0 }}>{text}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img} alt="" style={{ width: 180, objectFit: "contain", marginTop: 8 }} />
    </div>
  );
}

// Figures in the same 1px-gap grid as RedBus's numbers.
function StatGrid({ stats }: { stats: { number: string; label: string; source: string }[] }) {
  return (
    <div className="cs-stats" style={{ margin: "32px 0" }}>
      {stats.map((stat) => (
        <div key={stat.number} style={{ background: "var(--bg)", padding: "20px 22px" }}>
          <div style={{ ...T.figure, marginBottom: 2 }}>{stat.number}</div>
          <div style={T.small}>{stat.label}</div>
          <div style={{ ...T.small, fontSize: "var(--fs-12)", marginTop: 6 }}>via {stat.source}</div>
        </div>
      ))}
    </div>
  );
}

// A numbered row list: number, heading, one line.
function NumberedRows({ items }: { items: { n: string; title: string; desc: string }[] }) {
  return (
    <div className="cs-stats" style={{ gridTemplateColumns: "1fr" }}>
      {items.map((p) => (
        <div key={p.n} style={{ background: "var(--bg)", padding: "16px 20px", display: "grid", gridTemplateColumns: "28px minmax(0, 1fr)", gap: 12, alignItems: "baseline" }}>
          <span style={T.eyebrow}>{p.n}</span>
          <div>
            <p style={{ ...T.cardH, marginBottom: 4 }}>{p.title}</p>
            <p style={T.body}>{p.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// A card tinted for one side: candidates green, referrers blue (.sd-tint in globals.css).
function ToneCard({ tone, children, style }: { tone: "candidate" | "referrer"; children: React.ReactNode; style?: React.CSSProperties }) {
  return <div className={`sd-${tone} sd-tint`} style={{ borderRadius: "var(--r-md)", padding: "20px 22px", ...style }}>{children}</div>;
}

function PeopleCards({ items }: { items: { label: string; sub?: string; desc: string; tone?: "candidate" | "referrer" }[] }) {
  return (
    <div className="cs-swatches">
      {items.map((u) => {
        const inner = (
          <>
            <p style={T.cardH}>{u.label}</p>
            {u.sub && <p style={{ ...T.small, marginTop: 2 }}>{u.sub}</p>}
            <p style={{ ...T.body, marginTop: 8 }}>{u.desc}</p>
          </>
        );
        return u.tone ? <ToneCard key={u.label} tone={u.tone}>{inner}</ToneCard> : <Card key={u.label}>{inner}</Card>;
      })}
    </div>
  );
}

const body = { ...T.body, marginBottom: 16 } as React.CSSProperties;
const bodyLast = T.body;
const beatH = T.h2;
const beatHGap = { ...T.h2, margin: "72px 0 12px 0" } as React.CSSProperties;
const icon = (d: React.ReactNode) => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);

export default function SideDoorCaseStudy() {
  return (
    <main className="cs-page" style={{ padding: "40px 0 96px" }}>
      <SidedoorTOCClient />
      <RubberBackButton plain />

      {/* Cover */}
      <div style={{ width: "100%", aspectRatio: "16/9", background: "var(--card-bg)", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-lg)", marginBottom: 88 }} />

      {/* Title */}
      <SectionLabel>Case Study · Product Design</SectionLabel>
      <h1 className={`sd-logo ${poppins.className}`} style={{ fontSize: 44, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 14px 0" }}>
        <span style={{ color: BLUE }}>Side</span><span style={{ color: GREEN }}>Door</span>
      </h1>
      <p style={T.lede}>
        From scattered DMs to a referral platform built on trust, structure, and visibility.
      </p>

      <MetaStrip items={[
        { label: "Role", value: "Solo Product Designer" },
        { label: "Timeline", value: "10 weeks" },
        { label: "Tools", value: "Figma, FigJam" },
        { label: "Platform", value: "Mobile / iOS" },
        { label: "Type", value: "0 → 1 Concept" },
      ]} />

      {/* Hook */}
      <section style={{ marginTop: 72 }}>
        <p style={T.h2}>
          <E>💭</E>Have you ever sent 40 LinkedIn messages asking for a referral , and heard back from 3?
        </p>
        <p style={T.sub}>
          That&apos;s not a you problem. That&apos;s a systems problem. The referral process runs on cold outreach, hope, and WhatsApp. It&apos;s broken for everyone: candidates get ghosted, referrers get spammed, recruiters can&apos;t trust the quality. SideDoor is my attempt to fix it.
        </p>

        {/* 3 bullets */}
        <ol className="cs-numbered" style={{ margin: "32px 0 20px" }}>
          {[
            "Candidates find relevant referrers ranked by role match, alumni signals, and response rate , not a random list of strangers.",
            "Referrers evaluate candidates with structured summaries and graded confidence levels , not a blank DM and a gut feeling.",
            "Both sides track every stage after the referral is submitted , no black box, no repeated follow-ups.",
          ].map((point, i) => (
            <li key={i}>
              <span className="cs-numbered-n" style={{ color: "var(--text-muted)" }}>0{i + 1}</span>
              <span style={T.body}>{point}</span>
            </li>
          ))}
        </ol>

        <p style={T.small}>
          <E>👉</E>Short on time? Here&apos;s the <a href="#" className="inline-link">Figma prototype</a>.
        </p>
      </section>

      {/* ── The problem, lived ─────────────────────────────────────── */}
      <Act id="toc-problem" kicker="The problem, lived" />
      <ToneCard tone="candidate">
        <p style={{ ...T.h2, margin: 0, lineHeight: 1.5 }}>
          Meet Ishaan. 2 years into his career as a product designer. He finds a role he&apos;s genuinely
          excited about: Product Designer at CRED. He opens LinkedIn, searches for CRED employees,
          and starts messaging.
        </p>
      </ToneCard>
      <div style={{ display: "flex", justifyContent: "center", margin: "32px 0 48px 0" }}>
        <div style={{ width: 200, height: 168, overflow: "hidden", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
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
      <ToneCard tone="candidate" style={{ margin: "32px 0" }}>
        <p style={T.quote}>
          &quot;I don&apos;t even know if they submitted it. I have no way to track it.&quot;
        </p>
        <p className="sd-tone-text" style={{ ...T.small, color: undefined, fontWeight: 500, marginTop: 8 }}>— Candidate, interview</p>
      </ToneCard>
      <p style={bodyLast}>
        Ishaan&apos;s not an edge case. He&apos;s every candidate. The employees he&apos;s messaging? They&apos;re getting
        10–50 requests like his every week. One PM I interviewed got 40–50 DMs a day whenever their
        company posted a public listing. They&apos;d turned off LinkedIn notifications just to work.
      </p>

      {/* ── Why this matters ──────────────────────────────────────── */}
      <Act id="toc-why" kicker="Why this matters" />
      <p style={T.sub}>
        Referrals are the highest-converting hiring channel that exists.
      </p>
      <StatGrid stats={[
        { number: "5–10×", label: "more likely to get hired via referral vs portals", source: "Jobera" },
        { number: "29 days", label: "avg time-to-hire vs 44–55 days through portals", source: "salesso.com" },
        { number: "46%", label: "1-year retention vs 33% through job boards", source: "Sci-Tech Today" },
        { number: "~20%", label: "cold LinkedIn DM reply rate (on a good day)", source: "LinkedIn" },
      ]} />
      <p style={bodyLast}>
        The channel works. The experience around it doesn&apos;t. That&apos;s the gap SideDoor fills.
      </p>

      {/* Who this was built for */}
      <div style={{ margin: "48px 0 16px" }}><SectionLabel>Who I was designing for</SectionLabel></div>
      <PeopleCards items={[
        { tone: "candidate", label: "Candidates", sub: "0–5 yrs exp", desc: "They know referrals work. They've tried cold applying. They just can't reach the right people." },
        { tone: "referrer", label: "Referrers", sub: "Mid-level, tech", desc: "Every referral puts their reputation on the line. The ask feels social. The risk is professional." },
        { label: "Recruiters", sub: "Secondary", desc: "They value referrals in theory, but bonus gaming has made them skeptical. Trust needs rebuilding." },
      ]} />

      {/* ── Five screens. One system. ──────────────────────────────── */}
      <Act id="toc-solution" kicker="The solution, in five screens" title="Now Ishaan opens SideDoor." sub="Here's what changes." />
      <p style={{ ...T.body, marginBottom: 72 }}>
        These five problems aren&apos;t isolated: they&apos;re a system. Fix one without the others and you just move the problem somewhere else. Every solution had to work as part of the whole.
      </p>

      {/* 01 */}
      <section className="cs-beat sd-candidate" style={{ marginBottom: 72 }}>
        <SectionLabel>01 · Referrer Discovery</SectionLabel>
        <h2 style={beatH}><E>➡️</E>How can a candidate find the right person to approach, not just any random employee?</h2>
        <ToneCard tone="candidate" style={{ marginTop: 24 }}>
          <p style={{ ...T.cardH, marginBottom: 8 }}>
            Ishaan clicks &quot;Get Referral&quot; on the Product Designer role at CRED. Instead of a search bar,
            he sees a curated, ranked list of CRED employees.
          </p>
          <p style={T.body}>
            Diya Sharma is at the top: 92% match, Same College, responds in ~8 hrs, has referred 12
            people before. That&apos;s not a stranger anymore.
          </p>
        </ToneCard>
        <Card style={{ marginTop: 12 }}>
          <p style={T.cardH}>
            <E>🎯</E>Ishaan isn&apos;t messaging into the void. He&apos;s reaching out to the most relevant person for
            this exact role, with clear evidence they&apos;ll actually respond.
          </p>
        </Card>
        <ImagePlaceholder label="Screen 1 · Referrer Discovery · Ranked referrers with match %, alumni badges, response rate, activity signals" />
        <p style={bodyLast}>
          Referrers carry real professional risk when they put their name behind someone. A bad referral doesn&apos;t just waste their time — it reflects on their judgment with their recruiter, their manager, their team. Ranked signals — role overlap, shared alumni, past referral activity — do two things at once: they help candidates find the most relevant person to reach out to, and they help referrers recognise which requests are worth taking seriously. Trust has to flow both ways before either side commits.
        </p>
      </section>

      <Interlude img="/images/ishaan-3.PNG" text="Ishaan had been playing a numbers game. Then he saw the ranked list: Diya Sharma, 92% match, same university. For the first time, a name felt like a real lead. 🎯" />

      {/* 02 */}
      <section className="cs-beat sd-candidate" style={{ marginBottom: 72 }}>
        <SectionLabel>02 · Structured Request</SectionLabel>
        <h2 style={beatH}><E>➡️</E>How can a candidate send a request a stranger actually wants to respond to?</h2>
        <ToneCard tone="candidate" style={{ marginTop: 24 }}>
          <p style={{ ...T.cardH, marginBottom: 8 }}>
            Ishaan doesn&apos;t write a DM. He fills a guided form: role is pre-filled, fit points are
            suggested from the JD, he writes a short pitch. Preview screen. Send.
          </p>
          <p style={T.body}>
            Diya receives Ishaan&apos;s request and understands the fit in under 30 seconds. No back-and-forth.
            No chasing for details.
          </p>
        </ToneCard>
        <Card style={{ marginTop: 12 }}>
          <p style={T.cardH}>
            <E>🎯</E>Every request is structured the same way: clear, scannable, easy to evaluate. No more &quot;refer me anywhere&quot; messages.
          </p>
        </Card>
        <ImagePlaceholder label="Screen 2 · Create Request · Details → Preview → Send · Fit points as chips, JD auto-attached, short pitch" />
        <p style={bodyLast}>
          JD auto-attached, fit points pre-suggested from the JD, preview screen before sending. Less effort for the candidate, higher quality for the referrer.
        </p>
      </section>

      <Interlude img="/images/diya-2.PNG" text="Diya opened it on her lunch break. No wall of text, just a clean card: 85% match, three fit points, a short pitch. She read it in under 30 seconds. 👀" />

      {/* 03 */}
      <section className="cs-beat sd-referrer" style={{ marginBottom: 72 }}>
        <SectionLabel>03 · Referrer Evaluation</SectionLabel>
        <h2 style={beatH}><E>➡️</E>How can a referrer decide confidently without risking their own reputation?</h2>
        <ToneCard tone="referrer" style={{ marginTop: 24 }}>
          <p style={{ ...T.cardH, marginBottom: 8 }}>
            Diya opens Ishaan&apos;s request. She doesn&apos;t see a resume dump. She sees a structured evaluation:
            85% overall match with breakdown, key strengths (green), potential concerns (orange), and
            Ishaan&apos;s own pitch.
          </p>
          <p style={T.body}>
            Instead of &quot;Refer or Don&apos;t Refer,&quot; she has four options: Decline / Review Later / Refer /
            Strongly Recommend. She clicks Strongly Recommend. Adds a private note for the recruiter.
          </p>
        </ToneCard>
        <Card style={{ marginTop: 12 }}>
          <p style={T.cardH}>
            <E>🎯</E>Diya didn&apos;t guess. She made a confident, informed decision in under 2 minutes.
          </p>
        </Card>
        <ImagePlaceholder label="Screen 3 · Referrer Evaluation · Match % breakdown, Strengths & Concerns, Graded recommendation levels (Decline / Review Later / Refer / Strongly Recommend)" />
        <p style={bodyLast}>
          Referrers aren&apos;t unwilling: they&apos;re uncertain. Building an evaluation assistant instead of just a profile view reduces that. The private note adds context for the recruiter without the candidate ever seeing it.
        </p>
      </section>

      <Interlude img="/images/diya-4.PNG" text={"Diya clicked \"Strongly Recommend.\" Ishaan's phone buzzed a minute later. Request accepted. For the first time, the silence didn't feel like being ignored. 🥹"} />

      {/* 04 */}
      <section className="cs-beat sd-candidate" style={{ marginBottom: 72 }}>
        <SectionLabel>04 · Shared Pipeline</SectionLabel>
        <h2 style={beatH}><E>➡️</E>How can both sides know what&apos;s happening after the referral is submitted?</h2>
        <ToneCard tone="candidate" style={{ marginTop: 24 }}>
          <p style={{ ...T.cardH, marginBottom: 8 }}>
            Ishaan gets a notification. He opens SideDoor and sees a shared timeline: Request Accepted →
            Referral Submitted → Application Under Review → Screening → Interview → Outcome.
          </p>
          <p style={T.body}>
            At each stage, he can see who owns the next action: &quot;Recruiter reviewing your application.&quot;
            No ambiguity. No need to follow up.
          </p>
        </ToneCard>
        <Card style={{ marginTop: 12 }}>
          <p style={T.cardH}>
            <E>🎯</E>Ishaan doesn&apos;t check his email 20 times a day anymore. He knows exactly where things stand, and so does Diya.
          </p>
        </Card>
        <ImagePlaceholder label="Screen 4 · Shared Referral Pipeline · Both sides, timeline with timestamps, ownership indicators, stage progression" />
        <p style={bodyLast}>
          Both sides see the same timeline. People tolerate slow hiring. What they can&apos;t tolerate is uncertainty. This fixes that, without ATS dependency.
        </p>
      </section>

      <Interlude img="/images/ishaan-5.PNG" text="Ishaan tapped it expecting another follow-up to chase. Instead: a timeline. Request Accepted. Referral Submitted. Under Review. He put his phone down. Not once did he pick it back up. 😌" />

      {/* 05 */}
      <section className="cs-beat sd-referrer" style={{ marginBottom: 72 }}>
        <SectionLabel>05 · Quality Over Volume</SectionLabel>
        <h2 style={beatH}><E>➡️</E>How do we stop spam without making it harder for serious candidates?</h2>
        <p style={{ ...T.sub, marginBottom: 24 }}>
          Candidates mass-message because response rates are low. Response rates are low because messages
          are generic. It&apos;s a vicious loop. SideDoor breaks it at three points.
        </p>
        <div className="cs-swatches">
          {[
            { label: "Structured requests", desc: "Filling fit points and a short pitch takes effort, which filters out people who aren't serious. Low-intent senders drop off naturally." },
            { label: "Ranked referrer matching", desc: "Candidates see a curated list, not every employee. This nudges targeted outreach over shotgun behavior." },
            { label: "Request limits & inbox prioritization", desc: "The referrer's inbox is ranked by fit score and quality signals, not chronology. Referrer attention is treated as a limited resource and protected." },
          ].map((item) => (
            <Card key={item.label}>
              <p style={{ ...T.cardH, marginBottom: 4 }}>{item.label}</p>
              <p style={T.body}>{item.desc}</p>
            </Card>
          ))}
        </div>
        <ImagePlaceholder label="Screen 5 · Referrer Inbox · Quality-prioritized requests, fit labels (High/Medium/Low), smart ranking banner" />
      </section>

      <Interlude img="/images/ishaan-4.PNG" text="Ishaan sent one request. Got one referral. Watched it move through screening without a single follow-up. Diya saw the same thing. No one was left guessing. 🤝" />

      {/* Who gains what */}
      <div style={{ margin: "0 0 16px" }}><SectionLabel>Who gains what</SectionLabel></div>
      <PeopleCards items={[
        { tone: "candidate", label: "Candidates", desc: "Higher conversion from outreach to referral. Less time wasted messaging people who won't reply." },
        { tone: "referrer", label: "Referrers", desc: "Less effort, less risk to their reputation. Participating feels normal, not like a personal favour." },
        { label: "Recruiters", desc: "Better-quality signals. Less time screening bad referrals, more confidence in the ones that come through." },
      ]} />

      {/* ── How I got here ────────────────────────────────────────── */}
      <Act id="toc-process" kicker="The design process, unfiltered" title="That's the product. Now here's how I got there." sub="None of this was obvious at the start. A lot of it was wrong before it was right." />

      {/* Process steps overview */}
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px 0", marginBottom: 72 }}>
        {[
          { n: "01", label: "Assumptions",   href: "#process-assumptions" },
          { n: "02", label: "10 Conversations", href: "#process-research" },
          { n: "03", label: "The Data",      href: "#process-desk" },
          { n: "04", label: "Journey Maps",  href: "#process-journey" },
          { n: "05", label: "Competitive",   href: "#process-competitive" },
          { n: "06", label: "Scoping",       href: "#process-scoping" },
        ].map((step, i, arr) => (
          <div key={step.n} style={{ display: "flex", alignItems: "center" }}>
            <a href={step.href} className="process-step">
              <span style={T.small}>{step.n}</span>
              <span style={{ fontFamily: "var(--font-manrope)", fontSize: "var(--fs-14)", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.011em" }}>{step.label}</span>
            </a>
            {i < arr.length - 1 && (
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.5 }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            )}
          </div>
        ))}
      </div>

      <h3 id="process-assumptions" style={{ ...beatH, scrollMarginTop: 80 }}>Starting with assumptions, not answers</h3>
      <p style={T.sub}>
        Before talking to anyone, I wrote down 14 assumptions: candidates don&apos;t know who to ask, referrers ignore cold DMs, nothing gets tracked, it all feels transactional. Then I went out to validate or kill each one.
      </p>
      <ImagePlaceholder label="FigJam · Assumptions board · Problem Hypotheses · Scope Definition · Constraints" />

      <div style={{ margin: "0 0 16px" }}><SectionLabel>Constraints I worked within</SectionLabel></div>
      <div className="cs-grid-2">
        {[
          {
            icon: icon(<><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>),
            title: "No ATS access",
            desc: "Couldn't depend on Workday or Greenhouse for anything — had to design fully independent of company systems.",
          },
          {
            icon: icon(<><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3"/></>),
            title: "Mobile-first, India",
            desc: "WhatsApp-heavy users with low tolerance for friction or long flows. Every tap had to earn its place.",
          },
          {
            icon: icon(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></>),
            title: "Zero usage data",
            desc: "0→1 with no existing product. Every scope call had to be made on research and judgment, not behaviour.",
          },
          {
            icon: icon(<><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></>),
            title: "Work alongside existing tools",
            desc: "LinkedIn and WhatsApp weren't going away. SideDoor had to fit into existing workflows, not replace them.",
          },
          {
            icon: icon(<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>),
            title: "MVP scope only",
            desc: "Incentive systems, AI matching, and recruiter tools were real — but they had to wait for v2.",
          },
        ].map((c, i, arr) => (
          <Card key={i} style={{ gridColumn: arr.length % 2 !== 0 && i === arr.length - 1 ? "1 / -1" : "auto" }}>
            <div style={{ color: BLUE, marginBottom: 10, display: "flex" }}>{c.icon}</div>
            <p style={{ ...T.cardH, marginBottom: 4 }}>{c.title}</p>
            <p style={T.body}>{c.desc}</p>
          </Card>
        ))}
      </div>

      <h3 id="process-research" style={{ ...beatHGap, scrollMarginTop: 80 }}>What 10 people told me</h3>
      <p style={{ ...T.sub, marginBottom: 32 }}>
        I interviewed 10 people: 2 recruiters, 4 referrers, 4 candidates. All in India&apos;s tech ecosystem. The same things kept coming up.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { quote: "Whenever a higher referral bonus is announced, suddenly the system gets flooded with random resumes.", who: "Recruiter", tone: undefined },
          { quote: "If I'm doing a favor for somebody, why would I go through all this back and forth for someone I don't even know?", who: "Referrer", tone: "referrer" as const },
          { quote: "I messaged 40 people. 9 replied. 3 actually submitted. I have no idea what happened after.", who: "Candidate", tone: "candidate" as const },
        ].map((item) => {
          const inner = (
            <>
              <p style={T.quote}>&quot;{item.quote}&quot;</p>
              <p className={item.tone ? "sd-tone-text" : undefined} style={{ ...T.small, color: item.tone ? undefined : T.small.color, fontWeight: 500, marginTop: 8 }}>— {item.who}</p>
            </>
          );
          return item.tone ? <ToneCard key={item.who} tone={item.tone}>{inner}</ToneCard> : <Card key={item.who}>{inner}</Card>;
        })}
      </div>
      <ImagePlaceholder label="FigJam · Interview transcripts · Affinity map · Research synthesis · Pain points · Key insights" />

      <h3 id="process-desk" style={{ ...beatHGap, scrollMarginTop: 80 }}>What the numbers confirmed</h3>
      <p style={T.sub}>
        The numbers confirmed what people were telling me.
      </p>
      <StatGrid stats={[
        { number: "191", label: "avg applicants per tech hire. Most résumés never get opened.", source: "gem.com" },
        { number: "15–25%", label: "cold LinkedIn DM reply rate vs 40–50% for warm outreach. Context changes everything.", source: "LinkedIn" },
        { number: "<10%", label: "generic outreach reply rate. Copy-paste messages get copy-paste results.", source: "LinkedIn" },
        { number: "92%", label: "application drop-off rate. The funnel leaks everywhere before a referral even enters it.", source: "shrm.org" },
      ]} />

      <h3 id="process-journey" style={{ ...beatHGap, scrollMarginTop: 80 }}>Mapping the current experience</h3>
      <p style={T.sub}>
        I mapped the AS-IS journey for both sides, step by step. Every stage was broken in a different way.
      </p>
      <ImagePlaceholder label="FigJam · AS-IS User Journey Map · Candidate journey + Referrer journey · Feelings, pain points, opportunities at each stage" />
      <p style={bodyLast}>
        Discovery was manual and random. Outreach was anxiety-inducing. Evaluation was guesswork.
        Post-referral was a black box for both sides. Then I mapped where each problem should become
        a design solution, the TO-BE.
      </p>
      <ImagePlaceholder label="FigJam · TO-BE Future Journey Map · Key transformations at each stage" />

      <h3 id="process-competitive" style={{ ...beatHGap, scrollMarginTop: 80 }}>What competitors got right, and what none of them solved</h3>
      <p style={T.sub}>
        I analyzed 11 platforms: LinkedIn, GetMeReferred, Instahyre, Jumbl, EasyRefer, Cutshort,
        Wellfound, TalentPool, Naukri, ReferMe, and Reddit/Discord communities, across 6 dimensions:
        discovery, referral flow, tracking, trust signals, spam control, and end-to-end coverage.
      </p>
      <ImagePlaceholder label="Competitive Benchmarking Table · 11 platforms across 6 dimensions" />
      <div className="cs-grid-2">
        {[
          {
            icon: icon(<polyline points="20 6 9 17 4 12"/>),
            insight: "Discovery is largely solved",
            detail: "LinkedIn and AI matching are strong. The problem isn't finding jobs, it's everything that happens after.",
            tone: "cs-status-green",
          },
          {
            icon: icon(<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>),
            insight: "Tracking is universally broken",
            detail: "Zero post-referral visibility on every platform. Not one solved this, not even referral-specific ones.",
            tone: "cs-status-red",
          },
          {
            icon: icon(<><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="3"/></>),
            insight: "Trust exists but is shallow",
            detail: "Profiles and ratings exist, but no platform helped referrers actually decide whether to refer.",
            tone: "cs-status-amber",
          },
          {
            icon: icon(<><rect x="2" y="3" width="6" height="6" rx="1"/><rect x="16" y="3" width="6" height="6" rx="1"/><rect x="9" y="15" width="6" height="6" rx="1"/><path d="M5 9v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9"/><line x1="12" y1="13" x2="12" y2="15"/></>),
            insight: "No one owns the full journey",
            detail: "Discovery → LinkedIn. Communication → WhatsApp. Submission → ATS. Tracking → nowhere.",
            tone: "cs-status-grey",
          },
        ].map((item) => (
          <Card key={item.insight}>
            <div className={item.tone} style={{ marginBottom: 10, display: "flex" }}>{item.icon}</div>
            <p style={{ ...T.cardH, marginBottom: 4 }}>{item.insight}</p>
            <p style={T.body}>{item.detail}</p>
          </Card>
        ))}
      </div>
      <Card style={{ marginTop: 12 }}>
        <p style={T.body}>
          <strong style={{ color: "var(--text-primary)" }}>The core insight:</strong> no one owned the end-to-end experience. Every platform solved a piece. None solved the whole. That became the strategic bet for SideDoor.
        </p>
      </Card>

      <h3 id="process-scoping" style={{ ...beatHGap, scrollMarginTop: 80 }}>What I built, what I cut, and why</h3>
      <p style={{ ...T.sub, marginBottom: 32 }}>
        One filter for v1: does this solve the core trust and workflow problem, or does it add complexity? If the latter, it waited.
      </p>
      <PeopleCards items={[
        { label: "P0 · Built", desc: "Trust layer (structured profile, context signals), decision framework for referrers, unified referral flow, shared pipeline visibility" },
        { label: "P1 · Next", desc: "Auto-fill referral submission, in-app messaging, notification system, status updates" },
        { label: "Cut", desc: "Deep ATS integration (too much company dependency), AI-heavy matching (black-box trust problem), complex incentive/payout system (a separate product problem entirely)" },
      ]} />

      {/* ── The rules that guided everything ──────────────────────── */}
      <Act id="toc-principles" kicker="Design principles, behind every screen" title="What every screen had to answer to" />
      <NumberedRows items={[
        { n: "01", title: "Make trust visible before interaction", desc: "Surface strong signals: fit, context, alumni, intent, before any message is sent." },
        { n: "02", title: "Enable fast, low-risk referral decisions", desc: "Give referrers structured information and safe action options. Remove uncertainty, not choice." },
        { n: "03", title: "Replace unstructured outreach with guided requests", desc: "Every request should be clear, relevant, and easy to evaluate. Blank messages don't belong here." },
        { n: "04", title: "Design for end-to-end, low-friction flow", desc: "Discovery → request → referral → tracking in one system. No tool switching." },
        { n: "05", title: "Ensure transparency across the entire journey", desc: "Status, ownership, and outcomes visible to both sides. No black boxes." },
      ]} />

      {/* North Star */}
      <Card style={{ marginTop: 32 }}>
        <p style={{ ...T.eyebrow, marginBottom: 8 }}>North Star</p>
        <p style={T.h2}>
          &quot;Enable high-quality referral matches through trust, relevance, and clarity.&quot;
        </p>
      </Card>

      {/* ── Where I got it wrong first ────────────────────────────── */}
      <Act id="toc-decisions" kicker="Key decisions that shaped the final design" title="I got several things wrong. Here's what broke and how I fixed it." sub="Every decision below had a wrong version before it. I'll show what that was and why it failed." />

      <section className="cs-beat" style={{ marginBottom: 72 }}>
        <h3 style={beatH}><E>👉</E>Ranked discovery instead of open search</h3>
        <p style={T.sub}>
          My first version was an open search: type a company, find any employee, message them. Peer
          review killed it fast. It recreated the exact problem I was trying to solve: candidates would
          mass-message everyone. Referrers would get spammed. We&apos;d be back to LinkedIn.
        </p>
        <ImagePlaceholder label="Wireframe iterations · Open search v1 vs Ranked discovery v2 (final)" />
        <p style={body}>
          People trust things they can see: shared college, response rate, how many people they&apos;ve referred before. That&apos;s what gets surfaced upfront.
        </p>
        <Card style={{ marginTop: 24 }}>
          <p style={T.body}>
            <strong style={{ color: "var(--text-primary)" }}>Trade-off accepted:</strong> Candidates see fewer referrers, meaning lower discovery freedom.
            But quality interactions matter more than volume in referral systems. That was a conscious choice.
          </p>
        </Card>
      </section>

      <section className="cs-beat" style={{ marginBottom: 72 }}>
        <h3 style={beatH}><E>👉</E>Structured request form instead of free-form messaging</h3>
        <p style={T.sub}>
          Every referrer I talked to said the worst requests were vague. &quot;Refer me anywhere.&quot; No role,
          no context, no reason. My early versions had a free-form text box. It felt flexible, but it
          was wrong. Free-form preserved the exact behavior I was trying to eliminate.
        </p>
        <ImagePlaceholder label="Request flow iterations · Free-form DM v1 · Guided form v2 · Fit points + JD auto-attach v3 (final)" />
        <p style={body}>
          Structured input wasn&apos;t about removing freedom. It was about making it easy to send something good. Pre-suggested fit points and a preview screen before sending helped with both.
        </p>
        <Card style={{ marginTop: 24 }}>
          <p style={T.body}>
            <strong style={{ color: "var(--text-primary)" }}>Intentional friction is a feature, not a bug.</strong> A small amount of effort acts
            as a commitment filter that discourages low-intent behavior without blocking serious candidates.
          </p>
        </Card>
      </section>

      <section className="cs-beat" style={{ marginBottom: 72 }}>
        <h3 style={beatH}><E>👉</E>Graded recommendations instead of binary Refer / Don&apos;t Refer</h3>
        <p style={T.sub}>
          My first evaluation screen had two buttons: Refer or Don&apos;t Refer. Simple, clean. Wrong.
          Testing revealed the real issue: referrers who thought a candidate was &quot;probably good but
          not 100% sure&quot; had no place to land. They&apos;d either over-commit (risky for their reputation) or
          bail entirely. We were losing all the middle cases.
        </p>
        <ImagePlaceholder label="Evaluation screen iterations · Binary v1 vs Graded actions v2 (Decline / Review Later / Refer / Strongly Recommend)" />
        <p style={bodyLast}>
          Human confidence isn&apos;t binary. A spectrum (Decline / Review Later / Refer / Strongly Recommend) gives referrers room to be honest about their confidence. Less pressure, more participation. The private note lets them share context with the recruiter that the candidate never sees.
        </p>
      </section>

      <section className="cs-beat" style={{ marginBottom: 0 }}>
        <h3 style={beatH}><E>👉</E>Lightweight shared pipeline instead of ATS integration</h3>
        <p style={T.sub}>
          Early on, I explored full ATS integration: connecting SideDoor to Workday and Greenhouse so
          tracking would be automatic and real-time. I dropped it fast. ATS integration requires company
          cooperation, IT approvals, and months of enterprise sales work. Completely unrealistic for MVP.
        </p>
        <ImagePlaceholder label="Pipeline iterations · Full ATS sync concept vs lightweight shared stages (final)" />
        <p style={body}>
          Users don&apos;t need real-time ATS data: they need enough visibility to stop the anxiety. Lightweight stages (Submitted → Screening → Interview → Offer) solve the emotional problem without the technical dependency.
        </p>
        <Card style={{ marginTop: 24 }}>
          <p style={T.cardH}>
            <strong style={{ fontWeight: 700 }}>Perceived clarity matters more than perfect automation.</strong>
          </p>
        </Card>
      </section>

      {/* ── When the happy path breaks ────────────────────────────── */}
      <Act id="toc-usecases" kicker="Designing for the edge cases" title="SideDoor doesn't just handle the good days." sub="Every referral flow has a moment where something slips. The referrer gets busy. The ATS drops the submission. A company goes quiet for three weeks. Here's what the design does when that happens." />
      <ul className="cs-idea-rows">
        {[
          { case: "Referrer accepts, never submits", response: "Nudge after 48 hrs. If still no action, candidate can re-route to another referrer." },
          { case: "ATS submission fails", response: "Mark as 'Pending confirmation.' Referrer can manually confirm." },
          { case: "Company goes silent for weeks", response: "Show 'No update yet, this is normal at this stage.' Sets expectations before anxiety spikes." },
          { case: "Candidate hits request limit", response: "Show cooldown. Prompt to improve request quality, not just wait it out." },
        ].map((e) => (
          <li key={e.case}>
            <span className="cs-idea-why">{e.case}</span>
            <span className="cs-idea-names" style={{ fontSize: "var(--fs-16)", color: "var(--text-secondary)" }}>{e.response}</span>
          </li>
        ))}
      </ul>

      {/* ── How we'd know it worked ───────────────────────────────── */}
      <Act id="toc-metrics" kicker="Target metrics that tell the real story" title="If this ships, here's what moves."
        sub="Ishaan's story is what good looks like. But design doesn't ship on stories. It ships on metrics. Here's what every decision was tied to."
        note="These are design-time targets — what success looks like if this ships, not measured outcomes." />

      {/* North Star Metric */}
      <Card style={{ marginBottom: 12 }}>
        <p style={{ ...T.eyebrow, marginBottom: 8 }}>North Star Metric</p>
        <p style={{ ...T.h2, margin: "0 0 8px 0" }}>
          Accepted referral requests per active user
        </p>
        <p style={T.body}>
          The goal was never more requests. <em>Better</em> ones. When acceptance rates go up, trust is working and both sides are getting real value.
        </p>
      </Card>

      {/* Metrics: flat list */}
      <div className="cs-stats">
        {[
          { dir: "↑", label: "Request acceptance rate",  story: "Diya said yes to Ishaan's request" },
          { dir: "↑", label: "Referral submission rate", story: "Diya followed through and submitted it" },
          { dir: "↓", label: "Spam rate",                story: "Diya got 1 good request, not 40 random ones" },
          { dir: "↓", label: "Time to first response",   story: "Diya responded on her lunch break" },
        ].map((m) => (
          <div key={m.label} style={{ background: "var(--bg)", padding: "16px 20px", display: "grid", gridTemplateColumns: "20px minmax(0, 1fr)", gap: 10, alignItems: "baseline" }}>
            <span style={{ ...T.cardH, color: BLUE }}>{m.dir}</span>
            <div>
              <p style={{ ...T.cardH, marginBottom: 2 }}>{m.label}</p>
              <p style={T.small}>{m.story}</p>
            </div>
          </div>
        ))}
      </div>

      <div id="toc-funnel" style={{ scrollMarginTop: 48, marginTop: 72 }} />
      {/* Before / After funnel */}
      <SectionLabel>Referral funnel — Before Vs SideDoor</SectionLabel>

      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", margin: "16px 0 32px" }}>
        {[
          { label: "Old way", swatch: "var(--cs-stat-gap)", color: "var(--text-muted)" },
          { label: "Referrer side", swatch: BLUE, color: BLUE },
          { label: "Candidate side", swatch: GREEN, color: GREEN },
        ].map((l) => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: l.swatch }} />
            <span style={{ ...T.small, fontWeight: 500, color: l.color }}>{l.label}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {[
          { stage: "Requests sent",       note: "Candidate sends referral requests",                    before: 100, beforeNote: "baseline",              after: null, delta: null, color: null },
          { stage: "Request accepted",    note: "Ranked discovery + structured form replace cold DMs",  before: 20,  beforeNote: "cold DM reply rate",    after: 60,   delta: "3×", color: BLUE },
          { stage: "Referral submitted",  note: "Graded recommendations reduce referrer drop-off",      before: 7,   beforeNote: "of requests sent",      after: 45,   delta: "6×", color: BLUE },
          { stage: "Hire (per 100 sent)", note: "Quality filtering compounds across every stage",       before: 1,   beforeNote: "cold apply baseline",   after: 8,    delta: "8×", color: GREEN },
        ].map((row, i, arr) => {
          const barText = { fontFamily: "var(--font-manrope)", fontSize: "var(--fs-14)", fontWeight: 700, letterSpacing: "-0.011em", whiteSpace: "nowrap" } as React.CSSProperties;
          const side = { ...T.small, fontSize: "var(--fs-12)", width: 120, flexShrink: 0, textAlign: "right" } as React.CSSProperties;
          const track = { flex: 1, height: 36, borderRadius: "var(--r-sm)", overflow: "hidden", background: "var(--cs-callout-bg)", boxShadow: "inset 0 0 0 1px var(--cs-stat-gap)" } as React.CSSProperties;
          return (
            <div key={row.stage}>
              {/* Stage header */}
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                <p style={{ margin: 0 }}>
                  <span style={T.cardH}>{row.stage}</span>
                  <span style={{ ...T.small, marginLeft: 10 }}>{row.note}</span>
                </p>
                {row.delta && (
                  <span style={{ ...barText, fontSize: "var(--fs-12)", color: "#fff", background: row.color!, borderRadius: "var(--r-sm)", padding: "2px 8px", flexShrink: 0 }}>↑{row.delta}</span>
                )}
              </div>

              {row.after === null ? (
                /* Baseline row */
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ flex: 1, height: 36, background: GREEN, borderRadius: "var(--r-sm)", display: "flex", alignItems: "center", paddingLeft: 12 }}>
                    <span style={{ ...barText, color: "#fff" }}>100 requests sent</span>
                  </div>
                  <span style={side}>{row.beforeNote}</span>
                </div>
              ) : (
                <>
                  {/* Old way bar */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                    <div style={track}>
                      <div style={{ width: `${Math.max(row.before, 2)}%`, height: "100%", background: "var(--cs-stat-gap)", display: "flex", alignItems: "center", paddingLeft: 12 }}>
                        <span style={{ ...barText, color: "var(--text-primary)" }}>~{row.before}%</span>
                      </div>
                    </div>
                    <span style={side}>{row.beforeNote}</span>
                  </div>

                  {/* SideDoor bar */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={track}>
                      <div style={{ width: `${row.after}%`, height: "100%", background: row.color!, display: "flex", alignItems: "center", paddingLeft: 12 }}>
                        <span style={{ ...barText, color: "#fff" }}>~{row.after}%</span>
                      </div>
                    </div>
                    <span style={{ ...side, color: row.color! }}>design target</span>
                  </div>
                </>
              )}

              {/* Stage connector */}
              {i < arr.length - 1 && <div style={{ height: 24 }} />}
            </div>
          );
        })}
      </div>

      <div id="toc-business" style={{ scrollMarginTop: 48, marginTop: 72 }} />
      {/* Business outcome metrics */}
      <div style={{ margin: "0 0 16px" }}><SectionLabel>Target Business Outcomes</SectionLabel></div>
      <div className="cs-swatches">
        {[
          { number: "8–10%", label: "Referral-to-hire rate", story: "One good request. One hire.", before: { pct: 11, label: "~1% cold apply" }, after: { pct: 90, label: "SideDoor target" }, color: GREEN },
          { number: "≤29 days", label: "Time to hire", story: "Ishaan didn't wait 6 weeks.", before: { pct: 92, label: "44–55 days portals" }, after: { pct: 48, label: "SideDoor target" }, color: BLUE },
          { number: "46%", label: "1-year retention", story: "Better matches stay longer.", before: { pct: 55, label: "33% job boards" }, after: { pct: 77, label: "SideDoor target" }, color: GREEN },
        ].map((m) => (
          <Card key={m.label}>
            <div style={{ ...T.figure, color: m.color, marginBottom: 6 }}>{m.number}</div>
            <p style={T.cardH}>{m.label}</p>
            <p style={{ ...T.small, margin: "2px 0 20px" }}>{m.story}</p>
            {/* Before bar */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ height: 4, background: "var(--cs-stat-gap)", borderRadius: 2, overflow: "hidden", marginBottom: 4 }}>
                <div style={{ width: `${m.before.pct}%`, height: "100%", background: "var(--text-muted)", borderRadius: 2 }} />
              </div>
              <p style={{ ...T.small, fontSize: "var(--fs-12)" }}>{m.before.label}</p>
            </div>
            {/* After bar */}
            <div>
              <div style={{ height: 4, background: "var(--cs-stat-gap)", borderRadius: 2, overflow: "hidden", marginBottom: 4 }}>
                <div style={{ width: `${m.after.pct}%`, height: "100%", background: m.color, borderRadius: 2 }} />
              </div>
              <p style={{ ...T.small, fontSize: "var(--fs-12)", fontWeight: 500, color: m.color }}>{m.after.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* ── What's next ───────────────────────────────────────────── */}
      <Act id="toc-next" kicker="What's next" title="There's still a lot on the table." />
      <NumberedRows items={[
        { n: "01", title: "Recruiter-side analytics", desc: "Companies have zero visibility into their referral funnel. A B2B dashboard with conversion rates, referrer quality scores, and time-to-hire is real, underserved, and where the business model lives." },
        { n: "02", title: "Better incentive design", desc: "Referral bonuses are delayed, unclear, and tied to hires only. A platform-level system rewarding quality referrals, not just conversions, could change participation entirely." },
        { n: "03", title: "Unhappy paths and edge cases", desc: "This covers the happy flow. Real edge cases (referrer drops, ATS fails, company goes silent) are documented but not designed yet. That's next." },
      ]} />

      {/* ── Honest reflection ─────────────────────────────────────── */}
      <Act id="toc-reflection" kicker="Honest reflection" title="If I started over, here's what I'd do differently." />
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

      {/* Closing */}
      <section style={{ marginTop: 112, paddingTop: 56, borderTop: "1px solid var(--border)" }}>
        <p className="cs-act-title">
          Ishaan didn&apos;t need to message 40 people. He needed one good match, one structured ask, and the ability to see what happened next.
        </p>
        <p style={body}>
          That&apos;s what SideDoor was built around: not making referrals faster, but making them work the way they were supposed to. The channel works. The experience doesn&apos;t. This was my attempt to close that gap, for Ishaan, for Diya, and for everyone doing this the hard way.
        </p>
        <p style={bodyLast}>
          If you made it this far, thank you. Always happy to talk. ❤️
        </p>
      </section>
    </main>
  );
}
