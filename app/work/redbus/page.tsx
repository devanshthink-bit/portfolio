// Written against the RedBus design as of RedBus repo commit 33258c3 (13 Sep 2026).
// What changed since then, and which sections it touches: RedBus/CASESTUDY.md.
import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import RubberBackButton from "../../../components/RubberBackButton";
import RedbusTOCClient from "../../../components/RedbusTOCClient";
import ProtoEmbed from "../../../components/ProtoEmbed";
import { RED, T, SectionLabel, Beat, Card, Chip, Numbered, Pill, MetaStrip } from "../../../components/caseStudy";
import { PhoneShot, PhoneRow } from "../../../components/IPhone";

const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "RedBus · Booking the trip home · Devansh Somvanshi",
  description: "A concept for RedBus: booking the bus home before you know the date.",
};

// The full viewer, with its screen list. The embed (ProtoEmbed) uses the same URL with ?test.
const PROTO_FULL = "https://devanshthink-bit.github.io/redbus-return-capture/?fidelity=hifi";
// Full-screen renders of the real builds and the live app, one phone screen each.
const scr = (f: string) => `/images/redbus/screens/${f}.webp`;

// ── Visuals built in code ────────────────────────────────────────────────────
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
    { n: "73.9%", l: "booked the way back later" },
    { n: "0%",    l: "forgot" },
    { n: "65.2%", l: "weren't sure of the date" },
    { n: "26.1%", l: "ended up booking on another app" },
  ];
  return (
    <div className="cs-stats">
      {stats.map((s) => (
        <div key={s.n + s.l} style={{ background: "var(--bg)", padding: "20px 22px" }}>
          <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 28, fontWeight: 600, color: s.n === "0%" ? RED : "var(--text-primary)", letterSpacing: "-0.03em", marginBottom: 4 }}>{s.n}</div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>{s.l}</div>
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
    <Card accent="#A45729" style={{ padding: "20px 24px" }}>
      <p style={{ ...T.eyebrow, marginBottom: 10 }}>FlexiTicket&apos;s rules, as they are</p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        {rules.map((r) => (
          <li key={r} style={{ ...T.body, display: "flex", gap: 10 }}>
            <span style={{ fontFamily: "var(--font-geist-mono)", color: "var(--text-muted)" }}>·</span>{r}
          </li>
        ))}
      </ul>
    </Card>
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
          <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 13, fontWeight: 600, color: "var(--text-muted)" }}>Idea {r.id}</div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
            <p style={T.cardH}>{r.name} {r.mine && <Chip tone="red">Mine</Chip>}</p>
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 20, fontWeight: 600, color: "var(--text-primary)" }}>{r.score}<span style={{ fontSize: 12, color: "var(--text-muted)" }}> / 10</span></span>
          </div>
        </div>
      ))}
    </div>
  );
}

function BeforeAfter() {
  return (
    <div className="cs-grid-2">
      <Card accent="#A45729">
        <p style={{ ...T.eyebrow, marginBottom: 8 }}>Version 1 said</p>
        <p style={{ ...T.cardH, textDecoration: "line-through", textDecorationColor: "var(--text-muted)" }}>&quot;You cannot move it to a later day.&quot;</p>
      </Card>
      <Card>
        <p style={{ ...T.eyebrow, marginBottom: 8 }}>Now it says</p>
        <p style={T.cardH}>&quot;Earlier days, in one tap. For a later day, use Change date in My Bookings.&quot;</p>
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
          <p style={T.body}><span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, color: "var(--text-muted)", marginRight: 8 }}>MY ANSWER NOW</span>{x.a}</p>
        </Card>
      ))}
    </div>
  );
}

function KillList() {
  const rows: { s: string; tone: "red" | "amber" | "grey"; rule: string }[] = [
    { s: "Fired",   tone: "red",   rule: "Unsure people tap a single day" },
    { s: "Fired",   tone: "red",   rule: "They take the cheapest day and can't move it" },
    { s: "Almost",  tone: "amber", rule: "Nobody reads the rules" },
    { s: "Not run", tone: "grey",  rule: "The traveller with fixed plans is slower" },
  ];
  return (
    <div className="cs-stats" style={{ gridTemplateColumns: "1fr" }}>
      {rows.map((r) => (
        <div key={r.rule} className="cs-kill" style={{ background: "var(--bg)", padding: "16px 20px" }}>
          <div><Chip tone={r.tone}>{r.s}</Chip></div>
          <p style={{ ...T.cardH, fontSize: 15 }}>{r.rule}</p>
        </div>
      ))}
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

// ── Page ─────────────────────────────────────────────────────────────────────
export default function RedbusCaseStudy() {
  return (
    <main className={caveat.variable} style={{ padding: "40px 0 96px" }}>
      <RedbusTOCClient />
      <RubberBackButton />

      <div style={{ marginBottom: 48 }}>
        <PhoneRow className="hero bare" phones={[
          { src: scr("hifi_06a"), alt: "The day list with Thu 17 Sep picked and its bus open under it." },
          { src: scr("hifi_05"), alt: "The return calendar asking 'When can you travel back?', on 'I'm not sure yet'.", priority: true },
          { src: scr("hifi_16"), alt: "The Date changed screen: return moved to Tue 15 Sep." },
        ]} />
      </div>

      <SectionLabel>Case Study · Product Design · Concept</SectionLabel>
      <h1 style={T.h1}>
        <span style={{ color: RED }}>RedBus</span> · Booking the trip home
      </h1>
      <p style={T.lede}>
        A concept for booking the ride home before you know which day it is. Never shipped. I tested it with three travellers.
      </p>

      <MetaStrip items={[
        { label: "Role", value: "Product designer, solo, self-initiated" },
        { label: "Timeline", value: "6 weeks" },
        { label: "Platform", value: "RedBus iOS app" },
        { label: "Tools", value: "Figma, Claude Code" },
      ]} />
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 88 }}>
        <Pill href="#toc-try" primary>Try the prototype ↓</Pill>
        <Pill href={PROTO_FULL} external>Open it full screen ↗</Pill>
      </div>

      {/* Hook */}
      <Beat id="toc-problem" label="01 · Soumya" title="Soumya booked her bus home early once. Never again."
        sub={<>Her plans moved and the ticket couldn&apos;t. &quot;We regretted it,&quot; she told me. Now she books a day or two before, and ends up at the back of the bus, where she gets motion sick.</>}
        caption="How most trips in my research looked: the way out booked, the way home left open.">
        <TripStrip />
      </Beat>

      <Beat label="02 · The pattern" title="Most people wait to book the return. Nobody forgets."
        sub="I interviewed 8 travellers and ran a survey with 61 responses, 23 of whom had taken a round trip by bus. Not one said they forgot. Every late booking was a choice."
        caption="Survey figures are out of those 23.">
        <Stats />
      </Beat>

      {/* Pinch 1 */}
      <Beat label="03 · What RedBus has" title="The fix already exists. It's a badge on a bus."
        sub="FlexiTicket lets you change your date for free. You meet it as a banner and a badge, never at the moment you decide about the return, and 39.1% of my survey had heard of neither it nor the cancellation add-on."
        caption="The live RedBus app, August 2026.">
        <PhoneShot src={scr("real_4553")} alt="The live RedBus bus list: a FlexiTicket banner, a Free date change badge on one bus, and a 10% return deal."
          notes={[
            { title: "FlexiTicket: free date change", sub: "a banner and a filter, on the bus list" },
            { title: "The same promise, as a badge on one bus", sub: "a property of the bus, not a way to book" },
            { title: "10% off the return, on some buses", sub: "and people still book it later" },
          ]} />
      </Beat>

      <Beat label="04 · The limits" title="I couldn't hold a seat, set a fare or change a rule."
        sub="Someone who doesn't know their return date has no way to hold a return on RedBus. Since RedBus sells other companies' buses, I could only change what the app asks and when."
        caption="What I'd measure: how many bookings add a return before paying. What must not drop: at least 95% of people still finish the booking they came for. Both are my targets, not RedBus's.">
        <Rules />
      </Beat>

      {/* Plot turn 1 */}
      <Beat id="toc-idea" label="05 · The idea" title="So I stopped asking for the date."
        sub="Four of my eight interviewees described their return as a limit, like having to be back for Monday office. People know their limit even when they don't know their day, so I booked that day and let them move it once."
        caption="Version 1, 3 Aug. Of 16 ideas, this one scored 2 out of 10 on how predictable it was. The obvious ones scored 8 or 9.">
        <PhoneShot src={scr("lofi_v1")} lofi alt="Version 1: a Last day screen with a field reading 'The last day I can travel is'."
          notes={[
            { title: "\"The last day I can travel is\"", sub: "first person, so it reads as a limit you have, not a guess" },
            { title: "We book that day.", sub: "If you can leave earlier, one change, no fee" },
          ]} />
      </Beat>

      {/* Midpoint */}
      <Beat id="toc-doubts" label="06 · Attacking it" title="Then I attacked my own idea, and it came second."
        sub="I wrote eight attacks on it. The worst: after a change you can't cancel, so the people least sure of their plans could end up with the least refundable ticket."
        caption="When I scored every idea on merit, the window idea beat mine. So I built it next, as version 2.">
        <Merit />
      </Beat>

      <Beat label="07 · My mistake" title="I also wrote something false into the product."
        sub="Version 1 told travellers the date could only move earlier. That limit was mine, a shortcut I had stopped questioning. FlexiTicket always allowed later."
        caption="I found it rehearsing a stakeholder's questions. Then I fixed it on the screens after payment first, and missed the one where people form the belief.">
        <BeforeAfter />
      </Beat>

      <Beat label="08 · The demo" title="My mentor asked three questions I couldn't answer."
        sub="Two of them rested on facts I had collected in screenshots and never written down. Now I start by agreeing: it is FlexiTicket underneath, and what changes is what the app asks for."
        caption="The same demo found a real gap. He couldn't tell you could pick a range. I didn't add a toggle for it. I should have.">
        <MentorQA />
      </Beat>

      {/* Pinch 2 */}
      <Beat id="toc-versions" label="09 · Four versions" title="It took four versions to ask one question well."
        sub="Booking the cheapest day in a range pushed people to spend their only change, so version 3 booked the last day. Version 4 keeps the days as a still list, because a real route runs up to 30 buses a day."
        caption="The real bus list for one day was 14 cards and 4,957 pixels long.">
        <PhoneRow phones={[
          { src: scr("lofi_v1"), lofi: true, label: "v1 · 3 Aug", caption: "Ask for the last day", alt: "Version 1, Last day screen." },
          { src: scr("lofi_v2"), lofi: true, label: "v2 · 11 Aug", caption: "Ask for a range, book the cheapest", alt: "Version 2, Return window screen." },
          { src: scr("lofi_v3"), lofi: true, label: "v3 · 11 Aug", caption: "One calendar, one tap or two", alt: "Version 3, one calendar." },
          { src: scr("lofi_v4"), lofi: true, label: "v4 · 4 Sep", caption: "Ask first, then the calendar", alt: "Version 4, the question above the calendar." },
        ]} />
      </Beat>

      {/* Plot turn 2 */}
      <Beat id="toc-testing" label="10 · Testing" title="Three people tested it. By my own rules, it failed."
        sub="Before the sessions I wrote down what would kill the design, so I couldn't move the goalposts later. Two of the three conditions I could check came true."
        caption="Three of five planned sessions, 6 Sep, on version 3.">
        <KillList />
      </Beat>

      <Beat label="11 · What they did" title="One line, read three wrong ways."
        sub={<>The calendar said &quot;Not sure? Tap two days instead.&quot; Nobody used the window it was asking for.</>}
        caption="Not one of them read a subheading, in any session.">
        <Quotes />
      </Beat>

      <Beat label="12 · Saying no" title="Sai asked me to hide the risky buses. I didn't."
        sub="He took the cheapest day without seeing it couldn't change, and asked me to show only buses that can. That would hide the cheapest bus on the route, and price mattered to all three testers."
        caption="Sai still said he'd use this over today's flow, and wouldn't tap Skip. He had struggled the most.">
        <PhoneShot src={scr("hifi_06b")} alt="The day list with Mon 21 Sep picked: its bus cannot change date, and the button reads Book a fixed date."
          notes={[
            { title: "So I made the risk hard to miss", sub: "the day and its bus both say it can't change" },
            { title: "The button changes", sub: "\"Book a fixed date\", not \"Review trip\"" },
            { title: "It names your own answer back", sub: "\"You said you were not sure yet\"" },
          ]} />
      </Beat>

      {/* Resolution */}
      <Beat label="13 · The fix" title="So now the calendar asks first."
        sub={<>Two answers, &quot;I know my date&quot; and &quot;I&apos;m not sure yet&quot;, with the calendar right under them. My mentor had spotted the problem three weeks earlier. It took three testers for me to see it.</>}
        caption="Every rule on the screen is now a heading, because headings were the only thing anyone read.">
        <PhoneRow phones={[
          { src: scr("lofi_v3"), lofi: true, label: "Before · v3", caption: "\"Tap two days\" read as two days in a row", alt: "Version 3 calendar with 'Tap two days instead'." },
          { src: scr("lofi_v4"), lofi: true, label: "After · v4", caption: "Ask first. The calendar stays right under it.", alt: "Version 4 asking 'I know my date' or 'I'm not sure yet'." },
        ]} />
      </Beat>

      <Beat id="toc-design" label="14 · Say" title="First, say how sure you are."
        sub={<>It opens on &quot;I&apos;m not sure yet&quot;, the answer 65.2% of my survey gave. People who know their date lose one tap.</>}>
        <PhoneShot src={scr("hifi_05")} alt="Hi-fi return calendar with 'I'm not sure yet' selected and a fare under every day."
          notes={[
            { title: "Opens on \"I'm not sure yet\"", sub: "the answer 65.2% of my survey gave" },
            { title: "Every day shows its cheapest fare", sub: "so price is visible before you commit" },
          ]} />
      </Beat>

      <Beat label="15 · Pick" title="Then pick one day from your window."
        sub="The days stay a fixed list with the cheapest fare on each. Your bus opens under the day you pick, with any that beat it on price or rating.">
        <PhoneShot src={scr("hifi_06a")} alt="Hi-fi day list with Thu 17 Sep picked and the recommended bus open under it."
          notes={[
            { title: "The days stay a fixed list", sub: "whether a day has 2 buses or 30" },
            { title: "Your bus sits under your day", sub: "with the ones that beat it on price or rating" },
          ]} />
      </Beat>

      <Beat label="16 · Check" title="See every rule before you pay."
        sub="One change, to any date. The one line in warning colour is the one that costs you: no cancelling after a change.">
        <PhoneShot src={scr("hifi_08")} alt="Hi-fi review screen with the Free date change card: one change, and 'You cannot cancel it after that' in red."
          notes={[
            { title: "One change, to any date", sub: "you pay only the difference" },
            { title: "The only line in warning colour", sub: "you can't cancel after a change" },
          ]} />
      </Beat>

      <Beat label="17 · Move" title="Move it once, when plans settle."
        sub="The calendar shows what each move would cost. You can only move to a bus from the same operator, which I checked by booking a real ticket.">
        <PhoneShot src={scr("hifi_13")} alt="Hi-fi Change day screen: the booking, the note that a changed ticket can't be cancelled, and a calendar with the cost of each day."
          notes={[
            { title: "The rule, before the choice", sub: "once you change, no cancelling" },
            { title: "Every day says what the move costs", sub: "+₹170, None, Full" },
          ]} />
      </Beat>

      <Beat label="18 · Done" title="It tells you what changed, and what you gave up."
        sub="I kept celebration out of the payment step on purpose. The good news goes here, where the worry ends, next to the ₹30 you don't get back.">
        <PhoneShot src={scr("hifi_16")} alt="Hi-fi Date changed screen: return moved to Tue 15 Sep, ₹30 cheaper and not refunded, and a note that this was the one change."
          notes={[
            { title: "What moved, and what it cost", sub: "even when the answer is \"nothing back\"" },
            { title: "That was your one change", sub: "said plainly, on the screen where it happens" },
          ]} />
      </Beat>

      <Beat label="19 · States" title="When it can't keep a promise, it says what still holds."
        sub="There are 13 of these states, from a seat sold while you were booking to a day where no bus can change date. Each says what went wrong, then what still works.">
        <PhoneShot src={scr("hifi_S3")} alt="Hi-fi error state: 'Your return seat is gone', then 'Your onward trip is fine', with Pick another return."
          notes={[
            { title: "What went wrong, and which seat", sub: "\"Seat U5 is gone\"" },
            { title: "Then what's still true", sub: "\"Your onward trip is fine.\"" },
          ]} />
      </Beat>

      <Beat id="toc-try" label="20 · Try it" title="Here's the real thing. Tap through it."
        sub="This is the working prototype: 38 screens and 13 states, built from the Figma file. Tap From, then To, then Search buses."
        caption={<>It loads from the live link, so give it a second, or <a className="inline-link" href={PROTO_FULL} target="_blank" rel="noopener noreferrer">open it full screen</a>.</>}>
        <ProtoEmbed />
      </Beat>

      {/* New world */}
      <Beat id="toc-next" label="21 · Still open" title="What I still don't know."
        sub="Parts of this rest on guesses I haven't been able to check.">
        <Numbered items={[
          "Two of five planned sessions never ran: the sceptic and the traveller with fixed plans.",
          "The fixes from testing haven't been tested again.",
          "Without RedBus's fare data, I can't say how often moving a date costs more.",
          "Next, I'd design for the moment plans settle, the idea that lost only on scope.",
        ]} />
      </Beat>

      <Beat label="22 · Keeping" title="What I'm taking to the next project."
        sub="Most of it I learned in a demo or a test session.">
        <Numbered items={[
          "A fact I haven't written down is a fact I don't have in the room.",
          "A rule that lives only in a subheading doesn't exist.",
          "Fix a wrong belief on the screen where people form it.",
        ]} />
      </Beat>
    </main>
  );
}
