// Written against the redBus design as of RedBus repo commit 33258c3 (13 Sep 2026).
// What changed since then, and which sections it touches: RedBus/CASESTUDY.md.
import type { Metadata } from "next";
import Image from "next/image";
import { Caveat } from "next/font/google";
import RubberBackButton from "../../../components/RubberBackButton";
import RedbusTOCClient from "../../../components/RedbusTOCClient";
import ProtoEmbed from "../../../components/ProtoEmbed";

const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "redBus · Booking the trip home · Devansh Somvanshi",
  description: "A concept for redBus: letting travellers book the bus home before they know the date.",
};

const RED = "#E81E38";
const REPO_URL = "https://github.com/devanshthink-bit/redbus-return-capture";
// The full viewer, with its screen list. The embed (ProtoEmbed) uses the same URL with ?test.
const PROTO_FULL = "https://devanshthink-bit.github.io/redbus-return-capture/?fidelity=hifi";

// ── Type scale, shared with the other case studies ───────────────────────────
const T = {
  h1:      { fontFamily: "var(--font-manrope)", fontSize: 40, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.04em", lineHeight: 1.12, margin: "0 0 16px 0" } as React.CSSProperties,
  lede:    { fontFamily: "var(--font-manrope)", fontSize: 20, fontWeight: 500, color: "var(--text-secondary)", letterSpacing: "-0.025em", lineHeight: 1.45, margin: "0 0 32px 0" } as React.CSSProperties,
  h2:      { fontFamily: "var(--font-manrope)", fontSize: 26, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.04em", lineHeight: 1.3, margin: "0 0 12px 0" } as React.CSSProperties,
  sub:     { fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.65, letterSpacing: "-0.015em", margin: 0, maxWidth: 680 } as React.CSSProperties,
  small:   { fontSize: 13, color: "var(--text-muted)", lineHeight: 1.55, letterSpacing: "-0.01em", margin: 0 } as React.CSSProperties,
  eyebrow: { fontFamily: "var(--font-geist-mono)", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", margin: 0 } as React.CSSProperties,
  cardH:   { fontFamily: "var(--font-manrope)", fontSize: 16, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.4, margin: 0 } as React.CSSProperties,
  body:    { fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, letterSpacing: "-0.01em", margin: 0 } as React.CSSProperties,
  quote:   { fontFamily: "var(--font-caveat)", fontSize: 24, fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.3, margin: 0 } as React.CSSProperties,
};

// ── Building blocks ──────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 14px 0" }}>
      {children}
    </p>
  );
}

// One heading, one line under it, one visual. The mentor's rule, and the whole page follows it.
function Beat({ id, label, title, sub, children, caption }: {
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

function Figure({ src, alt, w = 2400, h = 1500, priority }: { src: string; alt: string; w?: number; h?: number; priority?: boolean }) {
  return (
    <Image
      src={`/images/redbus/${src}`}
      alt={alt}
      width={w}
      height={h}
      priority={priority}
      sizes="(max-width: 980px) 100vw, 868px"
      style={{ width: "100%", height: "auto", borderRadius: 10, display: "block" }}
    />
  );
}

function Card({ children, accent, style }: { children: React.ReactNode; accent?: string; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "var(--cs-callout-bg)", borderRadius: 10, padding: "18px 20px", borderLeft: accent ? `3px solid ${accent}` : undefined, ...style }}>
      {children}
    </div>
  );
}

function Chip({ children, tone }: { children: React.ReactNode; tone: "red" | "amber" | "grey" | "green" }) {
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

// ── Native visuals (data reads better as type than as a picture of type) ─────
function TripStrip() {
  return (
    <div className="cs-grid-2">
      <Card>
        <p style={T.eyebrow}>The way out</p>
        <p style={{ ...T.cardH, fontSize: 20, margin: "8px 0 2px" }}>Delhi → Nainital</p>
        <p style={{ ...T.body, marginBottom: 14 }}>Thu, 10 Sep · 23:55 · Seat U4</p>
        <Chip tone="green">Booked</Chip>
      </Card>
      <div style={{ borderRadius: 10, padding: "18px 20px", border: "1.5px dashed var(--cs-stat-gap)" }}>
        <p style={T.eyebrow}>The way home</p>
        <p style={{ ...T.cardH, fontSize: 20, margin: "8px 0 2px" }}>Nainital → Delhi</p>
        <p style={{ ...T.body, marginBottom: 14 }}>Some day next week. Maybe.</p>
        <Chip tone="grey">Not booked</Chip>
      </div>
    </div>
  );
}

function Stats() {
  const stats = [
    { n: "73.9%", l: "booked the way out first and the way home later" },
    { n: "65.2%", l: "weren't sure of their return date" },
    { n: "0%",    l: "said they forgot to book it" },
    { n: "39.1%", l: "came back to find their seat gone" },
  ];
  return (
    <div className="cs-stats">
      {stats.map((s) => (
        <div key={s.n} style={{ background: "var(--bg)", padding: "20px 22px" }}>
          <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 28, fontWeight: 600, color: s.n === "0%" ? RED : "var(--text-primary)", letterSpacing: "-0.03em", marginBottom: 4 }}>{s.n}</div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}

function ProblemCard() {
  return (
    <Card accent={RED} style={{ padding: "24px 26px" }}>
      <p style={{ fontFamily: "var(--font-manrope)", fontSize: 20, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.45, letterSpacing: "-0.02em", margin: "0 0 12px" }}>
        A traveller who doesn&apos;t know their return date has no usable way to keep a return on redBus.
      </p>
      <p style={T.body}>
        What they want is simpler than a feature: to be wrong about the date without it costing them much.
      </p>
      <div style={{ borderTop: "1px solid var(--cs-stat-gap)", margin: "18px 0 14px" }} />
      <p style={{ ...T.eyebrow, marginBottom: 8 }}>The limits I worked inside</p>
      <p style={T.body}>
        redBus is a marketplace. It doesn&apos;t own the buses, set the fares or hold seats for days. So I could only
        change what the app asks and what it shows, inside the booking, on the iOS app.
      </p>
    </Card>
  );
}

function Ideas() {
  const ideas = [
    { i: "Remind them in two days",           v: "Nobody forgot. 0% in the survey." },
    { i: "Book both, save 10%",               v: "Some buses already offer it. People still wait." },
    { i: "A bigger “Free date change” badge", v: "It's already on the list, twice." },
    { i: "A slider for how sure you are",     v: "Asks people to rate their certainty at the worst moment." },
    { i: "Save the return, unbooked",         v: "Holds no seat and no fare, and those are what people lose." },
    { i: "Propose the return to the group",   v: "Needs other people to act first." },
    { i: "Catch the moment plans settle",     v: "My strongest parked idea. It happens after checkout, outside my scope." },
    { i: "Book the deadline, not the date",   v: "The one I picked.", pick: true },
  ];
  return (
    <div className="cs-grid-2">
      {ideas.map((d) => (
        <Card key={d.i} accent={d.pick ? RED : undefined} style={{ padding: "14px 16px" }}>
          <p style={{ ...T.cardH, fontSize: 15, textDecoration: d.pick ? "none" : "line-through", textDecorationColor: "var(--text-muted)" }}>{d.i}</p>
          <p style={{ ...T.body, fontSize: 13, marginTop: 4, color: d.pick ? "#C8102E" : "var(--text-muted)" }}>{d.v}</p>
        </Card>
      ))}
    </div>
  );
}

function Metrics() {
  return (
    <>
      <div className="cs-grid-2">
        <Card>
          <p style={T.eyebrow}>The number to move</p>
          <p style={{ ...T.cardH, fontSize: 18, margin: "8px 0 6px" }}>Return attach rate</p>
          <p style={T.body}>Share of one-way bookings that add a return before paying.</p>
        </Card>
        <Card>
          <p style={T.eyebrow}>The number not to break</p>
          <p style={{ ...T.cardH, fontSize: 18, margin: "8px 0 6px" }}>Outbound bookings ≥ 95%</p>
          <p style={T.body}>Of today&apos;s level. A new step in checkout could cost bookings, and this caps the cost.</p>
        </Card>
      </div>
      <p style={{ ...T.small, marginTop: 12 }}>
        Both are targets I set. A concept has no live data. The bigger picture is journeys booked per traveller per year,
        which is my guess at redBus&apos;s North Star since they don&apos;t publish one. This wins a bigger share of trips
        people already take. It doesn&apos;t create new trips.
      </p>
    </>
  );
}

function MarkList({ items, mark }: { items: string[]; mark: string }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: "10px 0 0", display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((t) => (
        <li key={t} style={{ ...T.body, display: "flex", gap: 10 }}>
          <span style={{ fontFamily: "var(--font-geist-mono)", color: "var(--text-muted)" }}>{mark}</span>{t}
        </li>
      ))}
    </ul>
  );
}

function TradeOff() {
  const gets = ["A seat and a fare held today", "One date change, to any day", "Every rule shown before paying"];
  const costs = ["The fare difference, if the new day costs more", "No refund if it costs less", "No cancelling at all after a change"];
  return (
    <div className="cs-grid-2">
      <Card><p style={T.eyebrow}>What the traveller gets</p><MarkList items={gets} mark="+" /></Card>
      <Card accent="#A45729"><p style={T.eyebrow}>What it costs them</p><MarkList items={costs} mark="−" /></Card>
    </div>
  );
}

function MentorQA() {
  const qa = [
    { q: "Users get free cancellation with FlexiTicket but not with yours.",
      a: "Not quite. FlexiTicket refunds at least 50%. The full refund is a separate paid add-on." },
    { q: "You should charge for this flexibility, like they charge for FlexiTicket.",
      a: "FlexiTicket is free. redBus's own page says “at no extra rate”." },
    { q: "This construct IS a flexi-ticket. Why build it separately?",
      a: "Fair, it is FlexiTicket. What changes is that you don't need a date to use it." },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {qa.map((x) => (
        <Card key={x.q} style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: 8 }}>
          <p style={T.quote}>“{x.q}”</p>
          <p style={T.body}><span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, color: "var(--text-muted)", marginRight: 8 }}>WHAT I SHOULD HAVE SAID</span>{x.a}</p>
        </Card>
      ))}
    </div>
  );
}

function KillList() {
  const rows: { s: string; tone: "red" | "amber" | "grey"; rule: string; what: string }[] = [
    { s: "Fired",   tone: "red",   rule: "Unsure people tap a single day",
      what: "Nobody made a range. Vivek said “Ok I am not sure” out loud, then tapped Skip." },
    { s: "Fired",   tone: "red",   rule: "They take the cheapest day, then can't move it",
      what: "Sai picked the cheapest day and missed its “No date change” tag." },
    { s: "Close",   tone: "amber", rule: "Nobody reads the rules before paying",
      what: "Soumya read them, but only at the last screen. Vivek read the headings and nothing else." },
    { s: "Not run", tone: "grey",  rule: "The fixed-date traveller is slower",
      what: "Samarth's session never happened, so I can't score this one." },
  ];
  return (
    <div className="cs-stats" style={{ gridTemplateColumns: "1fr" }}>
      {rows.map((r) => (
        <div key={r.rule} className="cs-kill" style={{ background: "var(--bg)", padding: "16px 20px" }}>
          <div><Chip tone={r.tone}>{r.s}</Chip></div>
          <div>
            <p style={{ ...T.cardH, fontSize: 15 }}>{r.rule}</p>
            <p style={{ ...T.body, fontSize: 13, marginTop: 2, color: "var(--text-muted)" }}>{r.what}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Quotes() {
  const quotes = [
    { q: "“in this my seat is getting confirmed right?”", who: "Vivek, seeing four days marked. He thought a seat was held on each." },
    { q: "“later wonder when something goes wrong”", who: "Soumya, on how most people would treat the rules before paying." },
    { q: "“feels detached and floating outside”", who: "Vivek, on the change-day row sitting outside the ticket." },
    { q: "He'd use this over today's flow, and wouldn't tap Skip.", who: "Sai, unprompted, at the end. His reason: it cuts his booking time in half." },
  ];
  return (
    <div className="cs-grid-2">
      {quotes.map((x) => (
        <Card key={x.q}>
          <p style={T.quote}>{x.q}</p>
          <p style={{ ...T.small, marginTop: 8 }}>{x.who}</p>
        </Card>
      ))}
    </div>
  );
}

function Numbered({ items }: { items: string[] }) {
  return (
    <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((t, i) => (
        <li key={t}>
          <Card style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 12, color: RED, fontWeight: 600 }}>0{i + 1}</span>
            <span style={T.body}>{t}</span>
          </Card>
        </li>
      ))}
    </ol>
  );
}

function Pill({ href, children, primary, external }: { href: string; children: React.ReactNode; primary?: boolean; external?: boolean }) {
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

// ── Page ─────────────────────────────────────────────────────────────────────
export default function RedbusCaseStudy() {
  return (
    <main className={caveat.variable} style={{ padding: "40px 0 96px" }}>
      <RedbusTOCClient />
      <RubberBackButton />

      {/* Cover */}
      <div style={{ marginBottom: 40 }}>
        <Figure src="cover.webp" w={2400} h={1371} priority alt="Three screens from the redBus hi-fi prototype: the day list, the return calendar asking 'When can you travel back?', and the date-changed confirmation." />
      </div>

      {/* Title */}
      <SectionLabel>Case Study · Product Design · Concept</SectionLabel>
      <h1 style={T.h1}>
        <span style={{ color: RED }}>redBus</span> · Booking the trip home before you know the date
      </h1>
      <p style={T.lede}>
        Three in four bus travellers book their way home later. I designed a way to hold the return in the same
        booking, without asking for a date they don&apos;t have.
      </p>

      {/* Metadata strip */}
      <div className="cs-meta-strip" style={{ padding: "20px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", marginBottom: 20 }}>
        {[
          { label: "Role", value: "Solo product designer" },
          { label: "Timeline", value: "6 weeks · Aug to Sep 2026" },
          { label: "Platform", value: "iOS app" },
          { label: "Tools", value: "Figma, FigJam, Claude Code" },
          { label: "Status", value: "Concept, tested" },
        ].map((item) => (
          <div key={item.label}>
            <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px 0" }}>{item.label}</p>
            <p style={{ fontSize: 14, color: "var(--text-primary)", letterSpacing: "-0.02em", margin: 0 }}>{item.value}</p>
          </div>
        ))}
      </div>
      <p style={{ ...T.small, marginBottom: 20 }}>
        I don&apos;t work at redBus. The interviews, the survey and the usability tests are real. Nothing here has shipped.
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 88 }}>
        <Pill href="#toc-try" primary>Try the prototype ↓</Pill>
        <Pill href={PROTO_FULL} external>Open it full screen ↗</Pill>
      </div>

      {/* ── The problem ───────────────────────────────────────────────── */}
      <Beat
        id="toc-problem"
        label="01 · Soumya"
        title="Soumya booked her bus home early once. She never did it again."
        sub={<>Her plans moved and the ticket couldn&apos;t. &ldquo;We regretted it,&rdquo; she told me. Now she books a day or two before, and usually ends up at the back of the bus, where she gets motion sick.</>}
        caption="How most trips in my research looked: the way out booked, the way home left open."
      >
        <TripStrip />
      </Beat>

      <Beat
        label="02 · The pattern"
        title="She wasn't unusual. Three in four people book the way home later."
        sub="I interviewed 8 travellers and ran a survey with 61 responses. 23 of them had booked a round trip by bus in the last six months. Not one said they forgot. Every late booking was a choice."
        caption="Survey figures are out of the 23 who fit the brief."
      >
        <Stats />
      </Beat>

      <Beat
        label="03 · What redBus already has"
        title="redBus already sells the fix. It shows up in the wrong place."
        sub="FlexiTicket lets you change your date for free. But it appears as a badge on a bus, and never at the moment you decide about the return. 39.1% of my survey had heard of neither FlexiTicket nor the cancellation add-on."
        caption="The live redBus app, August 2026. Flexibility is a banner, a filter and a badge. Some buses even take 10% off the return, and people still book it later."
      >
        <Figure src="today.webp" alt="The real redBus bus list with three annotations: the FlexiTicket banner, the 'Free date change' badge on a bus card, and a 10% return trip deal." />
      </Beat>

      <Beat
        label="04 · The real problem"
        title="The app asks for the one thing they don't have: a date."
        sub="To book a return you have to pick a date of journey. If you don't know it, the safe move is to book nothing, then search again days later for a worse seat at a higher fare."
      >
        <ProblemCard />
      </Beat>

      {/* ── The idea ──────────────────────────────────────────────────── */}
      <Beat
        id="toc-idea"
        label="05 · Sixteen ideas"
        title="I had 16 ideas. The research killed most of them in a line."
        sub="A reminder? 0% forgot. A discount for booking both? Some buses already give one, and 73.9% still wait. What survived were the ideas that changed what the app asks."
        caption="I scored every idea on how predictable it was. The obvious ones scored 8 or 9 out of 10. The one I picked scored 2."
      >
        <Ideas />
      </Beat>

      <Beat
        label="06 · The bet"
        title="Don't ask when they're coming back. Ask for the last day they can."
        sub="Four of my eight interviewees described their return as a limit, like having to be back for Monday office. People know their limit even when they don't know their date. So book that day, and let them move it once with the free change redBus already has."
        caption="Version 1, 3 Aug. The field reads “The last day I can travel is”, in the traveller's own voice."
      >
        <Figure src="v1.webp" alt="Version 1 of the prototype: a Last day screen with one field, 'The last day I can travel is'." />
      </Beat>

      <Beat
        label="07 · How I'd know"
        title="One number to move, one number not to break."
        sub="Adding a step to checkout helps nobody if people drop off before paying for the trip they came for. So the goal came with a limit."
      >
        <Metrics />
      </Beat>

      <Beat
        label="08 · Attacking my own idea"
        title="Then I wrote eight attacks on my own idea. Some of them landed."
        sub="The date change is free, but the fare difference isn't. After one change you can't cancel at all. So the people least sure of their plans could end up with the least refundable ticket."
        caption="When I scored all 16 ideas on merit, mine came second. A version that books the cheapest day in a range scored higher, so that became version 2."
      >
        <TradeOff />
      </Beat>

      {/* ── Four versions ─────────────────────────────────────────────── */}
      <Beat
        id="toc-versions"
        label="09 · Four versions"
        title="It took four versions to get one question right."
        sub="Version 2 booked the cheapest day in a range, which pushed people to spend their only change. Version 3 put everything on one calendar: tap one day, or two for a range. Version 4 kept the days as a still list and put the bus right under the day you pick."
        caption="v1 on 3 Aug, v2 and v3 on the same day, 11 Aug, v4 on 4 Sep. All four still open in the prototype viewer."
      >
        <Figure src="versions.webp" w={2400} h={1185} alt="The return screen in all four versions, side by side: Last day, Return window, one calendar, and the calendar with a question above it." />
      </Beat>

      <Beat
        label="10 · The demo I lost"
        title="My mentor asked why this wasn't just FlexiTicket. I argued, and I lost."
        sub="It is FlexiTicket underneath, and I should have said so first. The terms that answered his other questions were in a screenshot folder I had never written up. Now I agree first, then explain what changes: the question the app asks."
        caption="The same demo found three real gaps. The biggest: he couldn't tell you could pick a range at all. In testing, nobody else could either."
      >
        <MentorQA />
      </Beat>

      {/* ── Testing ───────────────────────────────────────────────────── */}
      <Beat
        id="toc-testing"
        label="11 · Testing"
        title="Three people tested it. By my own rules, it failed."
        sub="Before the sessions I wrote down what would kill the design, so I couldn't move the goalposts later. Two of the three conditions I could check fired."
        caption="Three of five planned sessions, 6 Sep, on version 3. All three had been interviewed at the start."
      >
        <KillList />
      </Beat>

      <Beat
        label="12 · What they said"
        title="They got it wrong in three different ways, and one still wanted it."
        sub="Sai read “tap two days” as two days in a row. Vivek thought a seat was held on every day he marked. Nobody read a single subheading. But Sai said he'd use it over today's flow, and he had struggled the most."
      >
        <Quotes />
      </Beat>

      <Beat
        label="13 · The fix"
        title="Vivek said the answer out loud. The screen had nowhere to put it."
        sub="So the calendar now opens on a question: I know my date, or I'm not sure yet. And every rule became a heading, because headings were the only thing anyone read."
        caption="Also from this round: “We book one day, not all 4” became a heading, and picking a day that can't change turns the button into “Book a fixed date”."
      >
        <Figure src="fix.webp" alt="Before and after. Version 3 has a hint line, 'Not sure? Tap two days instead'. Version 4 asks 'I know my date' or 'I'm not sure yet' above the calendar." />
      </Beat>

      {/* ── The design ────────────────────────────────────────────────── */}
      <Beat
        id="toc-design"
        label="14 · The final flow"
        title="First, say what you know."
        sub="I know my date, or I'm not sure yet. If you're not sure, mark the first and last day you could travel, up to 7 days apart. Every day shows its cheapest fare."
      >
        <Figure src="f1.webp" alt="Hi-fi return screen: 'When can you travel back?' with 'I'm not sure yet' selected and a September calendar with fares." />
      </Beat>

      <Beat
        label="15 · …then"
        title="Then pick one of your days."
        sub="The days stay put as a list, each with its lowest fare and how many of its buses can change date. The bus you'd get sits under the day you pick, with the few that beat it on price or rating."
      >
        <Figure src="f2.webp" alt="Hi-fi day list with Thursday 17 September picked and the recommended bus shown under it." />
      </Beat>

      <Beat
        label="16 · …then"
        title="Before paying, the rules are right there."
        sub="One change, to any date. Pay the difference if the new day costs more. No cancelling after a change, and that's the only line in warning colour."
      >
        <Figure src="f3.webp" alt="Hi-fi review screen with the Free date change card: one change on your return date, and 'You cannot cancel it after that' in red." />
      </Beat>

      <Beat
        label="17 · …later"
        title="When plans settle, move the day from your ticket."
        sub="The calendar shows what each move would cost. You can only move to a bus from the same operator, which I checked by booking a real ticket."
      >
        <Figure src="f4.webp" alt="Hi-fi Change day screen: a note that you can't cancel after changing, how it works, and a calendar with the cost of each move." />
      </Beat>

      <Beat
        label="18 · …and after"
        title="It tells you what changed, and what you gave up."
        sub="What moved, what it cost, and that this was your one change. I kept celebration out of the payment step on purpose. The good news belongs here, where the worry ends."
      >
        <Figure src="f5.webp" alt="Hi-fi Date changed screen: return moved to Tuesday 15 September, the new day is 30 rupees cheaper with no refund, and this was your one change." />
      </Beat>

      <Beat
        label="19 · When it breaks"
        title="When something goes wrong, it starts with what's still true."
        sub="There are 13 of these states, from a seat sold while you were booking to a route where no bus can change date. Each says what still works before what went wrong."
      >
        <Figure src="state.webp" alt="Hi-fi error state: 'Your return seat is gone. Seat U5 is gone, someone just booked it. Your onward trip is fine.'" />
      </Beat>

      {/* ── Try it ────────────────────────────────────────────────────── */}
      <Beat
        id="toc-try"
        label="20 · Try it"
        title="Here's the real thing. Tap through it."
        sub="This is the working hi-fi prototype: 38 screens and 13 states, built from the Figma file. Tap From, then To, then Search buses."
        caption={<>It loads from the live link, so give it a second. Easier on a laptop, or <a className="inline-link" href={PROTO_FULL} target="_blank" rel="noopener noreferrer">open it full screen</a>.</>}
      >
        <ProtoEmbed />
      </Beat>

      {/* ── What's next ───────────────────────────────────────────────── */}
      <Beat
        id="toc-next"
        label="21 · Still open"
        title="What I still don't know."
        sub="Two of the five people I planned to test with never ran: the sceptic and the traveller with fixed plans. And without redBus's fare data, I can't say how often moving a date costs more."
      >
        <Numbered items={[
          "Run the last two sessions. If people with fixed plans skip the step, the wording is costing bookings in the biggest group.",
          "Ask for route fare data. If moving earlier usually costs more, the free change is mostly a way to pay more.",
          "Design for the moment plans settle, after checkout. It was my strongest idea, and it lost on scope, not on merit.",
        ]} />
      </Beat>

      <Beat
        label="22 · What I'm keeping"
        title="What I'm taking to the next project."
        sub="Most of it I learned the hard way, in a demo or a test session."
      >
        <Numbered items={[
          "Write down what would kill the idea before testing it. It stopped me explaining away a bad result.",
          "If a fact only lives in a screenshot folder, I don't have it in the room. I lost a demo that way.",
          "People read headings. If a rule changes what someone does, it goes in the heading.",
        ]} />
      </Beat>

      <p style={{ ...T.small, marginTop: 8 }}>
        Thanks for reading. The research, the decision log and all four versions are public on{" "}
        <a className="inline-link" href={REPO_URL} target="_blank" rel="noopener noreferrer">GitHub</a>.
      </p>
    </main>
  );
}
