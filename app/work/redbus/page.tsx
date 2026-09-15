// Written against the RedBus design as of RedBus repo commit 33258c3 (13 Sep 2026).
// What changed since then, and which sections it touches: RedBus/CASESTUDY.md.
import type { Metadata } from "next";
import RubberBackButton from "../../../components/RubberBackButton";
import RedbusTOCClient from "../../../components/RedbusTOCClient";
import AskDevansh from "../../../components/AskDevansh";
import ProtoEmbed from "../../../components/ProtoEmbed";
import { RED, T, SectionLabel, LabelText, Beat, Figure, Card, Chip, Numbered, Pill, MetaStrip } from "../../../components/caseStudy";
import { PhoneRow } from "../../../components/IPhone";
import PhoneShot from "../../../components/PhoneShot";


export const metadata: Metadata = {
  title: "RedBus - Winning the return ticket at checkout | Devansh Somvanshi",
  description: "A concept for RedBus: book the return in the same checkout, before you know the date.",
};

// The full viewer, with its screen list. The embed (ProtoEmbed) uses the same URL with ?test.
const PROTO_FULL = "https://devanshthink-bit.github.io/redbus-return-capture/?fidelity=hifi";
// A walkthrough video. Empty until Devansh records one; the link only shows when it is set.
const VIDEO_URL = "";
const BOARD_URL = "https://devanshthink-bit.github.io/redbus-return-capture/artefacts.html";
// Full-screen renders of the real builds and the live app, one phone screen each.
const scr = (f: string) => `/images/redbus/screens/${f}.webp`;

// ── Story furniture ──────────────────────────────────────────────────────────
function Act({ id, n, title, sub }: { id?: string; n: string; title: string; sub: string }) {
  return (
    <header id={id} className="cs-act">
      <p className="cs-act-kicker"><LabelText text={n} /></p>
      <h2 className="cs-act-title">{title}</h2>
      <p className="cs-act-sub">{sub}</p>
    </header>
  );
}

function InShort() {
  const rows = [
    { k: "The problem", v: "The only way to keep a return on RedBus is to buy it, and buying it needs a date. ~74% of travellers I surveyed left it for later." },
    { k: "What I designed", v: "A return you can book without a date. Say how sure you are, pick a day from your window, and move it once if plans change." },
    { k: "Why it matters", v: "Every return booked later is a second commission RedBus can lose. ~26% of the travellers who waited booked it on another app." },
  ];
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

// ── Visuals built in code ────────────────────────────────────────────────────
function TripStrip() {
  return (
    <div className="cs-grid-2">
      <Card>
        <p style={T.eyebrow}>The way out</p>
        <p style={{ ...T.cardH, margin: "8px 0 2px" }}>Delhi → Nainital</p>
        <p style={{ ...T.body, marginBottom: 14 }}>Thu, 10 Sep, 23:55, Seat U4</p>
        <Chip tone="green">Booked</Chip>
      </Card>
      <div style={{ borderRadius: "var(--r-md)", padding: "18px 20px", border: "1.5px dashed var(--cs-stat-gap)" }}>
        <p style={T.eyebrow}>The way home</p>
        <p style={{ ...T.cardH, margin: "8px 0 2px" }}>Nainital → Delhi</p>
        <p style={{ ...T.body, marginBottom: 14 }}>Some day next week. Maybe.</p>
        <Chip tone="grey">Not booked</Chip>
      </div>
    </div>
  );
}

function Stats() {
  const stats = [
    { n: "~74%", l: "booked the way back later" },
    { n: "0%",    l: "forgot" },
    { n: "~65%", l: "weren't sure of the date" },
    { n: "~26%", l: "ended up booking on another app" },
  ];
  return (
    <div className="cs-stats">
      {stats.map((s) => (
        <div key={s.n + s.l} style={{ background: "var(--bg)", padding: "20px 22px" }}>
          <div style={{ ...T.figure, color: s.n === "0%" ? RED : "var(--text-primary)", marginBottom: 2 }}>{s.n}</div>
          <div style={T.small}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}

// Two products, and the rule that ties them in a knot.
function Knot() {
  const cols = [
    { h: "FlexiTicket", sub: "free, on some buses", rules: ["Change the date once", "Pay the difference if it costs more", "Nothing back if it costs less", "Up to 8 hours before"] },
    { h: "Free Cancellation", sub: "₹60 per passenger", rules: ["Cancel for a full refund", "Up to 6 hours before"] },
  ];
  return (
    <div>
      <div className="cs-grid-2">
        {cols.map((c) => (
          <Card key={c.h}>
            <p style={T.cardH}>{c.h}</p>
            <p style={{ ...T.small, margin: "2px 0 12px" }}>{c.sub}</p>
            <ul className="cs-list">{c.rules.map((r) => <li key={r}>{r}</li>)}</ul>
          </Card>
        ))}
      </div>
      <Card warn style={{ marginTop: 12 }}>
        <p style={{ ...T.cardH, color: "#A45729" }}>Change the date, and the ticket can never be cancelled.</p>
        <p style={{ ...T.body, marginTop: 4 }}>The Free Cancellation you paid for is gone too. RedBus&apos;s own help page says so.</p>
      </Card>
    </div>
  );
}

function WhyRedBus() {
  const cards = [
    { n: "~26%", h: "booked it on another app", b: "For RedBus, waiting often means losing the return." },
    { n: "2×", h: "commissions, one booking", b: "A return added now costs nothing extra to win." },
    { n: "↓", h: "Free Cancellation sales", b: "The risk: a movable return might replace the add-on." },
  ];
  return (
    <div className="cs-swatches">
      {cards.map((c) => (
        <Card key={c.h}>
          <div style={{ ...T.figure, height: 34, display: "flex", alignItems: "center" }}>
            {c.n === "↓" ? (
              // A drawn "going down" line (Lucide trending-down), not a typed arrow.
              <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#A45729" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-label="Down">
                <path d="m22 17-8.5-8.5-5 5L2 7" /><path d="M16 17h6v-6" />
              </svg>
            ) : c.n}
          </div>
          <p style={{ ...T.cardH, margin: "6px 0 4px" }}>{c.h}</p>
          <p style={T.body}>{c.b}</p>
        </Card>
      ))}
    </div>
  );
}

function Rules() {
  const rules = [
    "One change, ever",
    "Pay the difference if the new day costs more",
    "Nothing back if it costs less",
    "No cancelling after a change",
    "Change up to 8 hours before",
  ];
  return (
    <Card warn style={{ padding: "20px 24px" }}>
      <p style={{ ...T.eyebrow, marginBottom: 10 }}>FlexiTicket&apos;s rules, as they are</p>
      <ul className="cs-list">{rules.map((r) => <li key={r}>{r}</li>)}</ul>
    </Card>
  );
}

function Ideas() {
  // The fifteen that didn't make it, grouped by why they died (BRIEF.md, "Thrown away, and why").
  const groups = [
    { why: "RedBus already does it", ideas: ["Add-your-return card", "Book both, save ₹X", "Badge flexible buses"] },
    { why: "Fixes forgetting, and nobody forgets", ideas: ["Remind in two days", "Ask when to remind"] },
    { why: "Holds neither the seat nor the fare", ideas: ["Save the return, unbooked", "Book a duration", "Operator now, date later"] },
    { why: "Still ends at a date picker", ideas: ["How-sure slider", "Teach it your rule"] },
    { why: "Out of my hands", ideas: ["Ask the group", "Guaranteed seat at today's fare"] },
    { why: "Folded into the pick", ideas: ["Show what waiting costs", "Let the app decide"] },
    { why: "Parked for next", ideas: ["Catch the moment plans settle"] },
  ];
  return (
    <div className="cs-idea-list">
      <div className="cs-idea-pick">
        <p style={{ ...T.eyebrow, color: RED }}>The one I picked</p>
        <p style={{ ...T.cardH, margin: "8px 0 6px" }}>Book the last day you can travel</p>
        <p style={T.body}>It keeps the seat and the fare without a date, and moves once when plans settle.</p>
        <p style={{ ...T.small, marginTop: 10 }}>Later I moved past it. The final design is the window: you mark the days you could come back, then pick one.</p>
      </div>
      <ul className="cs-idea-rows">
        {groups.map((g) => (
          <li key={g.why}>
            <span className="cs-idea-why">{g.why}</span>
            <span className="cs-idea-count">{g.ideas.length}</span>
            <span className="cs-idea-names">{g.ideas.join(", ")}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Merit() {
  const rows = [
    { id: "A",  name: "Book the best day in a window", score: 8, mine: false },
    { id: "16", name: "Book the last day",             score: 7, mine: true },
  ];
  return (
    <div className="cs-stats" style={{ gridTemplateColumns: "1fr" }}>
      {rows.map((r) => (
        <div key={r.id} className="cs-kill" style={{ background: "var(--bg)", padding: "16px 20px" }}>
          <div style={T.eyebrow}>Idea {r.id}</div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
            <p style={T.cardH}>{r.name} {r.mine && <Chip tone="red">Mine</Chip>}</p>
            <span style={T.figure}>{r.score}<span style={T.small}> / 10</span></span>
          </div>
        </div>
      ))}
    </div>
  );
}

function BeforeAfter({ before, after, beforeLabel = "Before", afterLabel = "After" }: { before: string; after: string; beforeLabel?: string; afterLabel?: string }) {
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

function MentorQA() {
  const qa = [
    { q: "Users get free cancellation with FlexiTicket but not with yours.",
      a: "FlexiTicket refunds at least 50%. The full refund is a separate paid add-on." },
    { q: "You should charge for this flexibility, like they charge for FlexiTicket.",
      a: "FlexiTicket is free. RedBus's own page says \"at no extra rate\"." },
    { q: "This construct IS a flexi-ticket. Why build it separately?",
      a: "It is FlexiTicket. What changes is that you don't need a date to use it." },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {qa.map((x) => (
        <Card key={x.q} style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: 8 }}>
          <p style={T.quote}>&quot;{x.q}&quot;</p>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 10, marginTop: 4 }}>
            <p style={{ ...T.eyebrow, marginBottom: 3 }}>My answer now</p>
            <p style={T.body}>{x.a}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}

type Row = { s: string; tone: "red" | "amber" | "grey" | "green"; rule: string };

// A status and a line, one per row: the kill list, and the options behind two decisions.
function Rows({ rows }: { rows: Row[] }) {
  return (
    <div className="cs-stats" style={{ gridTemplateColumns: "1fr" }}>
      {rows.map((r) => (
        <div key={r.rule} className="cs-kill" style={{ background: "var(--bg)", padding: "16px 20px" }}>
          <div><Chip tone={r.tone}>{r.s}</Chip></div>
          <p style={T.cardH}>{r.rule}</p>
        </div>
      ))}
    </div>
  );
}

function KillList() {
  const rows: Row[] = [
    { s: "Fired",   tone: "red",   rule: "Unsure people tap a single day" },
    { s: "Fired",   tone: "red",   rule: "They take the cheapest day and can't move it" },
    { s: "Almost",  tone: "amber", rule: "Nobody reads the rules" },
  ];
  return <Rows rows={rows} />;
}

// Why not just use FlexiTicket: the number and the voice behind the answer (DEFENCE.md, n73, n07).
function WhyNotFlexi() {
  return (
    <div className="cs-grid-2">
      <Card>
        <div style={T.figure}>39.1%</div>
        <p style={{ ...T.body, marginTop: 6 }}>of travellers who knew their return date still booked it separately</p>
      </Card>
      <Card>
        <p style={T.quote}>&quot;I know there is an option but I just prefer okay this option doesn&apos;t exist&quot;</p>
        <p style={{ ...T.small, marginTop: 8 }}>Anand, who knew FlexiTicket existed</p>
      </Card>
    </div>
  );
}

function Quotes() {
  const quotes = [
    { q: "\"Ok I am not sure\"", who: "Vivek, out loud. Then he tapped Skip." },
    { q: "A day, then the next day", who: "Soumya's two taps. No window." },
    { q: "Two days in a row", who: "How Sai read \"tap two days\"." },
    { q: "\"in this my seat is getting confirmed right?\"", who: "Vivek again. He thought every marked day held a seat." },
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

function MoSCoW() {
  const cols = [
    { h: "Must", tone: "red" as const, items: ["Book without a date", "One change, to any date", "Every rule as a heading", "Failure states"] },
    { h: "Should", tone: "green" as const, items: ["Better buses under your day", "The full cancel flow"] },
    { h: "Could", tone: "amber" as const, items: ["Move a whole group together", "Routes with one bus a day"] },
    { h: "Won't", tone: "grey" as const, items: ["Reminders (0% forgot)", "Hide buses that can't move", "Charge for flexibility", "Return seat and stop screens"] },
  ];
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

function Watch() {
  const rows = [
    { h: "Returns added before paying", b: "The number this should move", tone: "green" as const, t: "Goal" },
    { h: "Outbound bookings, at least 95%", b: "Must not drop", tone: "red" as const, t: "Limit" },
    { h: "Free Cancellation sales", b: "Might dip, so watch it", tone: "amber" as const, t: "Risk" },
  ];
  return (
    <div className="cs-swatches">
      {rows.map((r) => (
        <Card key={r.h}>
          <div style={{ marginBottom: 10 }}><Chip tone={r.tone}>{r.t}</Chip></div>
          <p style={T.cardH}>{r.h}</p>
          <p style={{ ...T.body, marginTop: 4 }}>{r.b}</p>
        </Card>
      ))}
    </div>
  );
}

function Closing() {
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

// ── Page ─────────────────────────────────────────────────────────────────────
export default function RedbusCaseStudy() {
  return (
    <main className="cs-page" style={{ padding: "40px 0 96px" }}>
      <RedbusTOCClient />
      <RubberBackButton plain />
      <AskDevansh />

      <div id="toc-intro" style={{ marginBottom: 88 }}>
        <PhoneRow className="hero bare" phones={[
          { src: scr("hifi_06a"), alt: "The day list with Thu 17 Sep picked and its bus open under it.", priority: true },
          { src: scr("hifi_05"), alt: "The return calendar asking 'When can you travel back?', on 'I'm not sure yet'.", priority: true },
          { src: scr("hifi_16"), alt: "The Date changed screen: return moved to Tue 15 Sep.", priority: true },
        ]} />
      </div>

      <SectionLabel>Case study · Product design, concept</SectionLabel>
      <h1 style={T.h1}>
        <span style={{ color: "var(--brand-red)" }}>
          {/* The same unaltered logo the home card uses */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/redbus/logo.svg" alt="" aria-hidden width={45} height={30} style={{ height: "1.05em", width: "auto", display: "inline-block", verticalAlign: "-0.2em", marginRight: 10 }} />
          RedBus
        </span> - Winning the return ticket at checkout
      </h1>
      <p style={T.lede}>Most travellers book the bus out and leave the way back for later. A quarter of them then book it on another app. I redesigned the moment RedBus asks about the return, so it can be booked in the same checkout, without a date.</p>

      <MetaStrip items={[
        { label: "Role", value: "Product designer, solo, self-initiated" },
        { label: "Timeline", value: "6 weeks" },
        { label: "Platform", value: "RedBus iOS app" },
        { label: "Tools", value: "Figma, Claude Code" },
      ]} />
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
        <Pill href="#toc-try" primary icon="down">Try the prototype</Pill>
        <Pill href={PROTO_FULL} external>Open it full screen</Pill>
        <Pill href={BOARD_URL} external>See the research board</Pill>
        {VIDEO_URL && <Pill href={VIDEO_URL} external icon="play">Watch the walkthrough</Pill>}
      </div>

      {/* The quick summary, as its own block under the buttons, so the title area stays light (Devansh, 15 Sep). */}
      <section className="cs-inshort-wrap">
        <InShort />
      </section>

      {/* ── ACT 1 ── */}
      <Act id="toc-problem" n="Act 1 · The problem" title="The return that never gets booked"
        sub="It starts with one traveller and a ticket she couldn't move." />

      <Beat label="Soumya" title="Soumya booked her return early once. Never again."
        sub={<>Her plans moved and the ticket couldn&apos;t. &quot;We regretted it,&quot; she told me. Now she books a day or two before and ends up at the back of the bus, where she gets motion sick.</>}>
        <TripStrip />
      </Beat>

      <Beat label="The pattern" title="Most people wait to book the return. Nobody forgets."
        sub="I interviewed 8 travellers and ran a survey with 61 responses, 23 of whom had taken a round trip by bus. Every late booking was a choice."
        caption="Survey figures are out of those 23.">
        <Stats />
      </Beat>

      <Beat label="What RedBus has" title="The fix already exists. It's a badge on a bus."
        sub="FlexiTicket lets you change your date for free. You meet it on a bus card, never when you decide about the return, and ~39% of my survey had never heard of it or the add-on."
        caption="The live RedBus app, August 2026.">
        <PhoneShot src={scr("real_4553")} alt="The live RedBus bus list: a FlexiTicket banner, a Free date change badge on one bus, and a 10% return deal."
          notes={[
            { box: [72.6, 25.5, 27.4, 12.4], title: "FlexiTicket: free date change", sub: "a banner and a filter, on the bus list" },
            { box: [7, 81, 37.5, 4.2], title: "The same promise, as a badge on one bus", sub: "a property of the bus, not a way to book" },
            { box: [7, 85.5, 86, 6], title: "10% off the return, on some buses", sub: "and people still book it later" },
          ]} />
      </Beat>

      <Beat label="Why not FlexiTicket" title="So why not just use FlexiTicket?"
        sub="It is FlexiTicket underneath. I didn't add anything it can't already do. But FlexiTicket only helps once you've decided to book, and to reach it you first have to enter a date. The people I was designing for didn't have one."
        caption={<>The app used to ask for a &quot;Date of journey&quot;. Now it asks &quot;When can you travel back?&quot;</>}>
        <WhyNotFlexi />
      </Beat>

      <Beat label="The knot" title="The rules made waiting the safe choice."
        sub="Staying flexible means juggling seven rules across two products. One of them cancels the other, so people keep their options open by booking nothing.">
        <Knot />
      </Beat>

      <Beat label="Why RedBus should care" title="A return booked later is often booked elsewhere."
        sub="Winning the return inside the first booking is cheap. Losing it is a whole second ticket gone.">
        <WhyRedBus />
      </Beat>

      <Beat label="The limits" title="I couldn't hold a seat, set a fare or change a rule."
        sub="Someone who doesn't know their return date has no way to hold a return on RedBus. Since RedBus sells other companies' buses, I could only change what the app asks and when."
        caption="My own limit: adding a step must keep at least 95% of people finishing the booking they came for.">
        <Rules />
      </Beat>

      {/* ── ACT 2 ── */}
      <Act id="toc-design" n="Act 2 · The design" title="The return, inside the checkout"
        sub="Here's Soumya's next booking with the new flow. Every scene is a screen from the working prototype." />

      <Beat label="Scene 1 · Booking the way out" title="She books her bus out. Before she pays, the app asks about the return."
        sub={<>How do you book a day you don&apos;t know? You say so. It opens on &quot;I&apos;m not sure yet&quot;, the answer ~65% of my survey gave.</>}>
        <PhoneShot src={scr("hifi_05")} alt="Hi-fi return calendar with 'I'm not sure yet' selected and a fare under every day."
          notes={[
            { box: [3.5, 28.3, 93, 6.6], title: "Opens on \"I'm not sure yet\"", sub: "people who know their date lose one tap" },
            { box: [7.5, 59, 85, 27], title: "Every day shows its cheapest fare", sub: "so price is visible before she commits" },
          ]} />
      </Beat>

      <Beat label="Scene 2 · Picking a day" title="She marks the days she could come back, then picks one."
        sub="How does she choose without comparing thirty buses? The days stay a short list, and her bus opens right under the day she picks.">
        <PhoneShot src={scr("hifi_06a")} alt="Hi-fi day list with Thu 17 Sep picked and the recommended bus open under it."
          notes={[
            { box: [3, 5.2, 94, 31.4], title: "The days stay a fixed list", sub: "whether a day has 2 buses or 30" },
            { box: [3.5, 37.8, 93, 46.6], title: "Her bus sits under her day", sub: "with the ones that beat it on price or rating" },
          ]} />
      </Beat>

      <Beat label="Scene 3 · Before paying" title="She sees the one catch before she pays."
        sub="One change, to any date. The only line in warning colour is the one that costs her: no cancelling after a change.">
        <PhoneShot src={scr("hifi_08")} alt="Hi-fi review screen with the Free date change card: one change, and 'You cannot cancel it after that' in red."
          notes={[
            { box: [7, 24.2, 86, 10.4], title: "One change, to any date", sub: "she pays only the difference" },
            { box: [7, 41.4, 86, 9.4], title: "The only warning on the page", sub: "no cancelling after a change" },
          ]} />
      </Beat>

      <Beat label="Scene 4 · A week later" title="Her plans move, so she moves the ticket."
        sub="What will it cost? Every day on the calendar says. The new bus stays with the same operator, as RedBus requires.">
        <PhoneShot src={scr("hifi_13")} alt="Hi-fi Change day screen: the booking, the note that a changed ticket can't be cancelled, and a calendar with the cost of each day."
          notes={[
            { box: [7, 29.6, 86, 11.6], title: "The rule, before the choice", sub: "once she changes, no cancelling" },
            { box: [55, 93.6, 37, 6.2], title: "Every day says what the move costs", sub: "+₹170, None, Full" },
          ]} />
      </Beat>

      <Beat label="Scene 5 · Done" title="The app tells her what changed, and what she gave up."
        sub="The new day is ₹30 cheaper and she doesn't get that back. I kept celebration out of payment, so the good news waits for this screen.">
        <PhoneShot src={scr("hifi_16")} alt="Hi-fi Date changed screen: return moved to Tue 15 Sep, ₹30 cheaper and not refunded, and a note that this was the one change."
          notes={[
            { box: [3, 49.8, 94, 12.8], title: "What moved, and what it cost", sub: "even when the answer is \"nothing back\"" },
            { box: [3, 63.3, 94, 9.3], title: "That was her one change", sub: "said plainly, where it happens" },
          ]} />
      </Beat>

      <Beat label="Scene 6 · When things break" title="When it can't keep a promise, it says what still holds."
        sub="There are 13 of these states. Here are three: still loading, nowhere to move to, and a seat someone else just took."
        caption="Success is scene 5.">
        <PhoneRow phones={[
          { src: scr("hifi_S6"), label: "Loading", caption: "The list's shape, before the data", alt: "Loading state: five skeleton day cards." },
          { src: scr("hifi_S9"), label: "Empty", caption: "\"Your booking is safe. Nothing was charged.\"", alt: "Empty state: no other days to pick, the booking is safe." },
          { src: scr("hifi_S3"), label: "Error", caption: "Which seat went, then what's still fine", alt: "Error state: your return seat is gone, your onward trip is fine." },
        ]} />
      </Beat>

      <Beat id="toc-try" label="Try it" title="Now try it yourself."
        sub="This is the working prototype: 38 screens and 13 states, built from the Figma file. Tap From, then To, then Search buses."
        caption={<>It loads from the live link, so give it a second, or <a className="inline-link" href={PROTO_FULL} target="_blank" rel="noopener noreferrer">open it full screen</a>.</>}>
        <ProtoEmbed />
      </Beat>

      {/* ── ACT 3 ── */}
      <Act id="toc-behind" n="Act 3 · Behind the scenes" title="Getting here wasn't this clean"
        sub="I won't walk you through every version. These are the moments that changed the design." />

      <Beat label="The mess" title="It started as 102 sticky notes."
        sub="Eight interviews and a survey, one observation per note, nothing deleted. Sorting them gave me six clusters and one problem to solve."
        caption={<>Part of the research board. <a className="inline-link" href={BOARD_URL} target="_blank" rel="noopener noreferrer">See the whole board</a>, with the jobs to be done and the brief.</>}>
        <div className="cs-artefact">
          <Figure src="/images/redbus/artefacts/board_notes.webp" w={1200} h={1060} alt="The research board: sticky notes from each interview, grouped by traveller." />
        </div>
      </Beat>

      <Beat label="Sixteen ideas" title="The obvious ideas died first."
        sub="Some already existed on RedBus. Some fixed a problem nobody had. Most still ended at a date picker. One kept the seat and the fare without asking for a date."
        caption="Idea 13 lost only on scope. It's what I'd build next.">
        <Ideas />
      </Beat>

      <Beat label="Where it goes" title="I gave the return its own step, knowing it was the riskiest place."
        sub="I had three places to put it. A sheet on the review screen would have picked the return's boarding and drop points for you, and people choose buses by those stops. Samarth nearly missed a bus over a stop 800m away. Tweaking RedBus's existing screens would only reach people after they had paid."
        caption="It was also the only option that could break my 95% limit. So Skip is as easy to see as Continue, and nothing on the step can block you, not even a confirmation dialog.">
        <Rows rows={[
          { s: "Rejected", tone: "grey", rule: "A sheet on review" },
          { s: "Rejected", tone: "grey", rule: "Changes to existing screens" },
          { s: "Picked", tone: "green", rule: "Its own step in checkout" },
        ]} />
      </Beat>

      <Beat label="Attacking it" title="Then I attacked my own idea, and it came second."
        sub="I wrote eight attacks on it. The worst: after a change you can't cancel, so the people least sure of their plans could end up with the least refundable ticket."
        caption="When I scored every idea on merit, the window idea beat mine. So I built that next.">
        <Merit />
      </Beat>

      <Beat label="My mistake" title="I also wrote something false into the product."
        sub="Version 1 told travellers the date could only move earlier. That limit was mine, a shortcut I had stopped questioning. FlexiTicket always allowed later."
        caption="I fixed it on the screens after payment first, and missed the one where people form the belief.">
        <BeforeAfter beforeLabel="Version 1 said" afterLabel="Now it says"
          before={"\"You cannot move it to a later day.\""}
          after={"\"Earlier days, in one tap. For a later day, use Change date in My Bookings.\""} />
      </Beat>

      <Beat label="The demo" title="Rajat asked three questions I couldn't answer."
        sub="Rajat reviewed my work. In the demo I argued how it differed from FlexiTicket before admitting it was the same, and lost the argument. Two of his questions rested on facts I had in screenshots and never wrote down. Now I start by agreeing: it is FlexiTicket underneath, and what changes is what the app asks for.">
        <MentorQA />
      </Beat>

      <Beat label="How I · 1" title="How I stopped booking the cheapest day."
        sub="Version 2 booked the cheapest day in a range, which pushed people to spend their only change. Version 3 booked the last day. Version 4 kept the days still, because a real route runs up to 30 buses a day."
        caption="The real bus list for one day was 14 cards and 4,957 pixels long.">
        <PhoneRow phones={[
          { src: scr("lofi_v1"), lofi: true, label: "Version 1", caption: "Ask for the last day", alt: "Version 1, Last day screen." },
          { src: scr("lofi_v2"), lofi: true, label: "Version 2", caption: "Ask for a range, book the cheapest", alt: "Version 2, Return window screen." },
          { src: scr("lofi_v3"), lofi: true, label: "Version 3", caption: "One calendar, one tap or two", alt: "Version 3, one calendar." },
          { src: scr("lofi_v4"), lofi: true, label: "Version 4", caption: "Ask first, then the calendar", alt: "Version 4, the question above the calendar." },
        ]} />
      </Beat>

      <Beat label="Pricing a day" title="I got the price on each day wrong twice."
        sub="First each day showed its default bus's fare, and the calendar and the day list disagreed by up to ₹230, one tap apart. Then each day showed its cheapest fare, but on 3 of 5 days that bus couldn't change its date. So the price that stood out belonged to a ticket that couldn't move, which is the one thing this flow is for."
        caption="The fix cost me a rule I liked: a night bus out used to mean a night bus back by default. Now that's a tag, one tap away.">
        <Rows rows={[
          { s: "Failed", tone: "red", rule: "Priced at the default bus" },
          { s: "Failed", tone: "red", rule: "Priced at the cheapest bus" },
          { s: "Now", tone: "green", rule: "Priced at the cheapest bus that keeps the date change" },
        ]} />
      </Beat>

      <Beat label="Checking it for real" title="So I booked a real ticket to check one rule."
        sub="My design needed a date change to stay with the same operator, and nothing I'd read said so. I booked a FlexiTicket bus and opened Change travel date. It was right there.">
        <PhoneShot src={scr("real_5199")} alt="The live RedBus Change travel date screen: 'You can select bus from same operator and same route as original ticket'."
          notes={[
            { box: [3, 70.1, 88, 8.6], title: "Same operator, same route", sub: "my biggest open risk, closed" },
            { box: [3, 42.6, 94, 7], title: "Change once, then no cancelling", sub: "the rule the whole design leans on" },
          ]} />
      </Beat>

      <Beat label="Pushing back" title="Then Rajat asked: isn't FlexiTicket better?"
        sub="It moves you to any date, and mine capped you at a week. I kept the week, because it's how you book without a date. I just stopped it from limiting the ticket."
        caption="Both paths now reach 29 days.">
        <BeforeAfter
          before="You can change within your week"
          after="The week picks your day. The change can go to any date." />
      </Beat>

      <Beat id="toc-testing" label="Testing" title="I tested it against my own rules. It failed."
        sub="Before testing I wrote down what would kill the design, so I couldn't move the goalposts later. Two of those conditions came true.">
        <KillList />
      </Beat>

      <Beat label="What they did" title="One line, read three wrong ways."
        sub={<>The calendar said &quot;Not sure? Tap two days instead.&quot; Nobody used the window it was asking for.</>}
        caption="Not one of them read a subheading, in any session.">
        <Quotes />
      </Beat>

      <Beat label="How I · 2" title="How I made the calendar ask first."
        sub={<>Two answers sit above the calendar: &quot;I know my date&quot; and &quot;I&apos;m not sure yet&quot;. I borrowed the shape from Swiggy&apos;s &quot;When?&quot; toggle and kept one line under it, because two words alone is how Sai misread &quot;tap two days&quot;.</>}
        caption="Rajat spotted this problem three weeks before testing. It took three testers for me to see it.">
        <PhoneRow phones={[
          { src: scr("lofi_v3"), lofi: true, label: "Before: v3", caption: "\"Tap two days\" read as two days in a row", alt: "Version 3 calendar with 'Tap two days instead'." },
          { src: scr("lofi_v4"), lofi: true, label: "After: v4", caption: "Ask first. The calendar stays right under it.", alt: "Version 4 asking 'I know my date' or 'I'm not sure yet'." },
        ]} />
      </Beat>

      <Beat label="How I · 3" title="Sai asked me to hide the risky buses. I didn't."
        sub="He took the cheapest day without seeing it couldn't change, and asked me to show only buses that can. That would hide the cheapest bus on the route, and price mattered to all three testers."
        caption="Sai still said he'd use this over today's flow, and wouldn't tap Skip. He had struggled the most.">
        <PhoneShot src={scr("hifi_06b")} alt="The day list with Mon 21 Sep picked: its bus cannot change date, and the button reads Book a fixed date."
          notes={[
            { box: [3, 25, 94, 13.6], title: "So I made the risk hard to miss", sub: "the day and its bus both say it can't change" },
            { box: [47.5, 90, 49.5, 7], title: "The button changes", sub: "\"Book a fixed date\", not \"Review trip\"" },
            { box: [3, 86.6, 90, 3.4], title: "It names her own answer back", sub: "\"You said you were not sure yet\"" },
          ]} />
      </Beat>

      <Beat id="toc-choices" label="What made the cut" title="Six weeks, one designer. Something had to go."
        sub="Looking back, this is what made the cut, sorted must, should, could and won't. Most of the arguments were about the last column.">
        <MoSCoW />
      </Beat>

      {/* ── ACT 4 ── */}
      <Act id="toc-next" n="Act 4 · What's next" title="What I'd do if this shipped"
        sub="Nothing here is live, so there are no results yet. Here's how I'd know." />

      <Beat label="What I'd watch" title="Three numbers, and when I'd pull it."
        sub="If returns rose 8% but outbound bookings fell 6%, I'd roll it back. That's trading trips for returns.">
        <Watch />
      </Beat>

      <Beat label="Keeping" title="What I'm taking to the next project."
        sub="Most of it I learned in a demo or a test session.">
        <Numbered items={[
          "A fact I haven't written down is a fact I don't have in the room.",
          "A rule that lives only in a subheading doesn't exist.",
          "Fix a wrong belief on the screen where people form it.",
        ]} />
      </Beat>


      <Closing />
    </main>
  );
}
