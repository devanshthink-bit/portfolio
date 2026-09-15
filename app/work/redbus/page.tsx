// Written against the RedBus design as of RedBus repo commit 33258c3 (13 Sep 2026).
// What changed since then, and which sections it touches: RedBus/CASESTUDY.md.
import type { Metadata } from "next";
import RubberBackButton from "../../../components/RubberBackButton";
import RedbusTOCClient from "../../../components/RedbusTOCClient";
import AskDevansh from "../../../components/AskDevansh";
import ProtoEmbed from "../../../components/ProtoEmbed";
import { RED, T, SectionLabel, LabelText, Beat, Figure, Chip, Numbered, Pill, MetaStrip } from "../../../components/caseStudy";
import { PhoneRow } from "../../../components/IPhone";
import PhoneShot from "../../../components/PhoneShot";


export const metadata: Metadata = {
  title: "RedBus · Winning the return ticket at checkout · Devansh Somvanshi",
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
          <p style={{ ...T.body, fontSize: 15, color: "var(--text-primary)" }}>{r.v}</p>
        </div>
      ))}
    </div>
  );
}

// ── Visuals built in code ────────────────────────────────────────────────────
// Each kind of evidence gets its own form, taken from the thing it describes: tickets for trips,
// one dot per surveyed traveller, fine print for rules, stamps for verdicts, tracked changes for
// rewrites. Styles live in globals.css under "Evidence".

// A drawn route line between two places, instead of a typed arrow.
function Route({ from, to }: { from: string; to: string }) {
  return (
    <p className="cs-ticket-route">
      <span>{from}</span>
      <svg className="cs-route-line" viewBox="0 0 40 12" aria-hidden><path d="M1 6h34" /><path d="m31 2 4 4-4 4" /></svg>
      <span>{to}</span>
    </p>
  );
}

function TripStrip() {
  return (
    <div className="cs-tickets">
      <div className="cs-ticket">
        <div className="cs-ticket-body">
          <p className="cs-ticket-k">The way out</p>
          <Route from="Delhi" to="Nainital" />
          <p className="cs-ticket-meta">Thu, 10 Sep · 23:55 · Seat U4</p>
        </div>
        <div className="cs-ticket-stub"><span className="cs-stamp cs-stamp-green">Booked</span></div>
      </div>
      <div className="cs-ticket is-ghost">
        <div className="cs-ticket-body">
          <p className="cs-ticket-k">The way home</p>
          <Route from="Nainital" to="Delhi" />
          <p className="cs-ticket-meta">Some day next week. Maybe.</p>
        </div>
        <div className="cs-ticket-stub"><span className="cs-stamp cs-stamp-grey">Not booked</span></div>
      </div>
    </div>
  );
}

function Stats() {
  // k is how many of the 23 round-trip travellers each figure is: one dot per person.
  const stats = [
    { n: "~74%", l: "booked the way back later", k: 17 },
    { n: "0%",    l: "forgot", k: 0 },
    { n: "~65%", l: "weren't sure of the date", k: 15 },
    { n: "~26%", l: "ended up booking on another app", k: 6 },
  ];
  return (
    <div className="cs-dots">
      {stats.map((s) => (
        <div key={s.n + s.l} className={s.k === 0 ? "cs-dots-item is-zero" : "cs-dots-item"}>
          <div className="cs-dots-n">{s.n}</div>
          <div className="cs-dots-l">{s.l}</div>
          <div className="cs-dots-row" aria-hidden>
            {Array.from({ length: 23 }, (_, i) => <i key={i} className={i < s.k ? "on" : undefined} />)}
          </div>
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
    <div className="cs-knot">
      <div className="cs-knot-cols">
        {cols.map((c) => (
          <div key={c.h}>
            <p className="cs-knot-h">{c.h}</p>
            <p className="cs-knot-sub">{c.sub}</p>
            <ul className="cs-knot-rules">{c.rules.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
        ))}
      </div>
      <div className="cs-knot-tie">
        {/* the two products' threads, pulled into one knot */}
        <svg viewBox="0 0 100 44" preserveAspectRatio="none" aria-hidden>
          <path d="M25 0C25 30 50 14 50 44" vectorEffect="non-scaling-stroke" />
          <path d="M75 0C75 30 50 14 50 44" vectorEffect="non-scaling-stroke" />
        </svg>
        <p className="cs-knot-warn"><mark>Change the date, and the ticket can never be cancelled.</mark></p>
        <p className="cs-knot-note">The Free Cancellation you paid for is gone too. RedBus&apos;s own help page says so.</p>
      </div>
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
    <div className="cs-ledger">
      {cards.map((c) => (
        <div key={c.h} className="cs-ledger-row">
          <div className="cs-ledger-n">
            {c.n === "↓" ? (
              // A drawn "going down" line (Lucide trending-down), not a typed arrow.
              <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-label="Down">
                <path d="m22 17-8.5-8.5-5 5L2 7" /><path d="M16 17h6v-6" />
              </svg>
            ) : c.n}
          </div>
          <div>
            <p className="cs-ledger-h">{c.h}</p>
            <p className="cs-ledger-b">{c.b}</p>
          </div>
        </div>
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
    <div className="cs-fineprint">
      <p className="cs-fineprint-h">FlexiTicket&apos;s rules, as they are</p>
      <ol>{rules.map((r) => <li key={r}>{r}</li>)}</ol>
    </div>
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
  // Folded and parked ideas are still alive, so only the others are struck through.
  const alive = ["Folded into the pick", "Parked for next"];
  return (
    <div className="cs-ideas">
      <div className="cs-ideas-pick">
        <p className="cs-ideas-pick-k">The one I picked</p>
        <p className="cs-ideas-pick-h">Book the last day you can travel</p>
        <p style={T.body}>It keeps the seat and the fare without a date, and moves once when plans settle.</p>
      </div>
      <ul className="cs-ideas-rows">
        {groups.map((g) => (
          <li key={g.why} className={alive.includes(g.why) ? undefined : "is-dead"}>
            <span className="cs-ideas-why">{g.why}</span>
            <span className="cs-ideas-tally">
              {g.ideas.map((n) => <i key={n} aria-hidden />)}
              <b>{g.ideas.length}</b>
            </span>
            <span className="cs-ideas-names">{g.ideas.map((n) => <span key={n}>{n}</span>)}</span>
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
    <div className="cs-merit">
      {rows.map((r) => (
        <div key={r.id} className={r.mine ? "cs-merit-row is-mine" : "cs-merit-row"}>
          <span className="cs-merit-id">Idea {r.id}</span>
          <p className="cs-merit-name">{r.name} {r.mine && <Chip tone="red">Mine</Chip>}</p>
          <span className="cs-merit-bar" aria-hidden>
            {Array.from({ length: 10 }, (_, i) => <i key={i} className={i < r.score ? "on" : undefined} />)}
          </span>
          <span className="cs-merit-score">{r.score}<span> / 10</span></span>
        </div>
      ))}
    </div>
  );
}

// A tracked change: the old line struck out, the new one marked in.
function BeforeAfter({ before, after, beforeLabel = "Before", afterLabel = "After" }: { before: string; after: string; beforeLabel?: string; afterLabel?: string }) {
  return (
    <div className="cs-rev">
      <div className="cs-rev-line">
        <span className="cs-rev-k">{beforeLabel}</span>
        <p><del>{before}</del></p>
      </div>
      <div className="cs-rev-line">
        <span className="cs-rev-k">{afterLabel}</span>
        <p><ins>{after}</ins></p>
      </div>
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
    <ol className="cs-qa">
      {qa.map((x) => (
        <li key={x.q}>
          <p className="cs-qa-q">&quot;{x.q}&quot;</p>
          <div className="cs-qa-a">
            {/* Lucide corner-down-right: the reply */}
            <svg viewBox="0 0 24 24" aria-hidden><path d="m15 10 5 5-5 5" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>
            <p className="cs-qa-k">My answer now</p>
            <p style={T.body}>{x.a}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function KillList() {
  const rows: { s: string; tone: "red" | "amber" | "grey"; rule: string }[] = [
    { s: "Fired",   tone: "red",   rule: "Unsure people tap a single day" },
    { s: "Fired",   tone: "red",   rule: "They take the cheapest day and can't move it" },
    { s: "Almost",  tone: "amber", rule: "Nobody reads the rules" },
  ];
  return (
    <ul className="cs-verdicts">
      {rows.map((r) => (
        <li key={r.rule}>
          <p className="cs-verdicts-rule">{r.rule}</p>
          <span className={`cs-stamp cs-stamp-${r.tone}`}>{r.s}</span>
        </li>
      ))}
    </ul>
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
    <div className="cs-voices">
      {quotes.map((x) => (
        <figure key={x.q} className="cs-voice">
          <blockquote>{x.q}</blockquote>
          <figcaption>{x.who}</figcaption>
        </figure>
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
    <div className="cs-mscw">
      {cols.map((c) => (
        <div key={c.h} className={`cs-mscw-col is-${c.tone}`}>
          <p className="cs-mscw-h">{c.h}</p>
          <ul>{c.items.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}

// Lucide trending-up, arrow-up-from-line and trending-down: which way each number should go.
const WATCH_ICON = {
  Goal: <><path d="M22 7 13.5 15.5 8.5 10.5 2 17" /><path d="M16 7h6v6" /></>,
  Limit: <><path d="m18 9-6-6-6 6" /><path d="M12 3v14" /><path d="M5 21h14" /></>,
  Risk: <><path d="m22 17-8.5-8.5-5 5L2 7" /><path d="M16 17h6v-6" /></>,
};

function Watch() {
  const rows = [
    { h: "Returns added before paying", b: "The number this should move", tone: "green" as const, t: "Goal" as const },
    { h: "Outbound bookings, at least 95%", b: "Must not drop", tone: "red" as const, t: "Limit" as const },
    { h: "Free Cancellation sales", b: "Might dip, so watch it", tone: "amber" as const, t: "Risk" as const },
  ];
  return (
    <div className="cs-watch">
      {rows.map((r) => (
        <div key={r.h} className={`cs-watch-item is-${r.tone}`}>
          <svg viewBox="0 0 24 24" aria-hidden>{WATCH_ICON[r.t]}</svg>
          <p className="cs-watch-t">{r.t}</p>
          <p className="cs-watch-h">{r.h}</p>
          <p className="cs-watch-b">{r.b}</p>
        </div>
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

      <div id="toc-intro" style={{ marginBottom: 48 }}>
        <PhoneRow className="hero bare" phones={[
          { src: scr("hifi_06a"), alt: "The day list with Thu 17 Sep picked and its bus open under it.", priority: true },
          { src: scr("hifi_05"), alt: "The return calendar asking 'When can you travel back?', on 'I'm not sure yet'.", priority: true },
          { src: scr("hifi_16"), alt: "The Date changed screen: return moved to Tue 15 Sep.", priority: true },
        ]} />
      </div>

      <SectionLabel>Case study · Product design, concept</SectionLabel>
      <h1 style={T.h1}>
        <span style={{ color: RED }}>RedBus</span> · Winning the return ticket at checkout
      </h1>
      <p style={T.lede}>Most travellers book the bus out and leave the way back for later. A quarter of them then book it on another app. I redesigned the moment RedBus asks about the return, so it can be booked in the same checkout, without a date.</p>

      <InShort />
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

      <Beat label="The demo" title="My mentor asked three questions I couldn't answer."
        sub="Two of them rested on facts I had in screenshots and never wrote down. Now I start by agreeing: it is FlexiTicket underneath, and what changes is what the app asks for.">
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

      <Beat label="Checking it for real" title="So I booked a real ticket to check one rule."
        sub="My design needed a date change to stay with the same operator, and nothing I'd read said so. I booked a FlexiTicket bus and opened Change travel date. It was right there.">
        <PhoneShot src={scr("real_5199")} alt="The live RedBus Change travel date screen: 'You can select bus from same operator and same route as original ticket'."
          notes={[
            { box: [3, 70.1, 88, 8.6], title: "Same operator, same route", sub: "my biggest open risk, closed" },
            { box: [3, 42.6, 94, 7], title: "Change once, then no cancelling", sub: "the rule the whole design leans on" },
          ]} />
      </Beat>

      <Beat label="Pushing back" title="Then my mentor asked: isn't FlexiTicket better?"
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
        caption="My mentor spotted this problem three weeks before testing. It took three testers for me to see it.">
        <PhoneRow phones={[
          { src: scr("lofi_v3"), lofi: true, label: "Before · v3", caption: "\"Tap two days\" read as two days in a row", alt: "Version 3 calendar with 'Tap two days instead'." },
          { src: scr("lofi_v4"), lofi: true, label: "After · v4", caption: "Ask first. The calendar stays right under it.", alt: "Version 4 asking 'I know my date' or 'I'm not sure yet'." },
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
