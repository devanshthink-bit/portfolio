// Written against the redBus design as of RedBus repo commit 33258c3 (13 Sep 2026).
// What changed since then, and which sections it touches: RedBus/CASESTUDY.md.
import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import RubberBackButton from "../../../components/RubberBackButton";
import RedbusTOCClient from "../../../components/RedbusTOCClient";
import ProtoEmbed from "../../../components/ProtoEmbed";
import { RED, T, SectionLabel, Beat, Figure, Card, Chip, Numbered, Pill, MetaStrip } from "../../../components/caseStudy";

const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "redBus · Booking the trip home · Devansh Somvanshi",
  description: "A concept for redBus: booking the bus home before you know the date.",
};

// The full viewer, with its screen list. The embed (ProtoEmbed) uses the same URL with ?test.
const PROTO_FULL = "https://devanshthink-bit.github.io/redbus-return-capture/?fidelity=hifi";
const img = (f: string) => `/images/redbus/${f}`;

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
      a: "FlexiTicket is free. redBus's own page says \"at no extra rate\"." },
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

// The bottom of the day list when the picked bus can't change its date (hi-fi 06b).
function FixedDateBar() {
  return (
    <Card style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 14, maxWidth: 420 }}>
      <div><Chip tone="amber">Cannot change this date</Chip></div>
      <p className="cs-warn" style={{ ...T.body, color: undefined }}>This bus cannot change its date. You said you were not sure yet.</p>
      <div style={{ background: RED, color: "#fff", borderRadius: 100, padding: "12px 20px", textAlign: "center", fontFamily: "var(--font-manrope)", fontWeight: 700, fontSize: 15 }}>
        Book a fixed date
      </div>
    </Card>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function RedbusCaseStudy() {
  return (
    <main className={caveat.variable} style={{ padding: "40px 0 96px" }}>
      <RedbusTOCClient />
      <RubberBackButton />

      <div style={{ marginBottom: 40 }}>
        <Figure src={img("cover.webp")} w={2400} h={1371} priority alt="Three screens from the redBus hi-fi prototype: the day list, the return calendar asking 'When can you travel back?', and the date-changed screen." />
      </div>

      <SectionLabel>Case Study · Product Design · Concept</SectionLabel>
      <h1 style={T.h1}>
        <span style={{ color: RED }}>redBus</span> · Booking the trip home
      </h1>
      <p style={T.lede}>
        A concept for booking the ride home before you know which day it is. Never shipped. I tested it with three travellers.
      </p>

      <MetaStrip items={[
        { label: "Role", value: "Product designer, solo, self-initiated" },
        { label: "Timeline", value: "6 weeks" },
        { label: "Platform", value: "redBus iOS app" },
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
      <Beat label="03 · What redBus has" title="The fix already exists. It's a badge on a bus."
        sub="FlexiTicket lets you change your date for free. You meet it as a banner and a badge, never at the moment you decide about the return, and 39.1% of my survey had heard of neither it nor the cancellation add-on."
        caption="The live redBus app. Some buses even take 10% off the return, and people still book it later.">
        <Figure src={img("today.webp")} alt="The live redBus bus list, annotated: FlexiTicket as a banner, a Free date change badge on one bus, and a 10% return deal." />
      </Beat>

      <Beat label="04 · The limits" title="I couldn't hold a seat, set a fare or change a rule."
        sub="redBus sells other companies' buses, so the only thing I could change was what the app asks and when. The rules came as they are, and one of them makes a promise hard to keep."
        caption="My own limit on top: adding a step must keep at least 95% of people finishing the booking they came for. That number is my target, not redBus's.">
        <Rules />
      </Beat>

      {/* Plot turn 1 */}
      <Beat id="toc-idea" label="05 · The idea" title="So I stopped asking for the date."
        sub="Four of my eight interviewees described their return as a limit, like having to be back for Monday office. People know their limit even when they don't know their day, so I booked that day and let them move it once."
        caption="Version 1, 3 Aug. Of 16 ideas, this one scored 2 out of 10 on how predictable it was. The obvious ones scored 8 or 9.">
        <Figure src={img("v1.webp")} alt="Version 1: a Last day screen with a field reading 'The last day I can travel is'." />
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
        caption="v1 on 3 Aug, v2 and v3 on 11 Aug, v4 on 4 Sep. The real bus list for one day was 14 cards and 4,957 pixels long.">
        <Figure src={img("versions.webp")} w={2400} h={1185} alt="The return screen in all four versions side by side: v1 asks for the last day, v2 for a range, v3 shows one calendar, v4 asks first, then shows the calendar." />
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
        caption="So I made the risk hard to miss instead. Sai still said he'd use this over today's flow, and wouldn't tap Skip. He had struggled the most.">
        <FixedDateBar />
      </Beat>

      {/* Resolution */}
      <Beat label="13 · The fix" title="So now the calendar asks first."
        sub={<>Two answers, &quot;I know my date&quot; and &quot;I&apos;m not sure yet&quot;, with the calendar right under them. My mentor had spotted the problem three weeks earlier. It took three testers for me to see it.</>}
        caption="Every rule on the screen is now a heading, because headings were the only thing anyone read.">
        <Figure src={img("fix.webp")} alt="Before and after: v3's calendar with 'Tap two days instead', and v4 asking 'I know my date' or 'I'm not sure yet' first." />
      </Beat>

      <Beat id="toc-design" label="14 · Say" title="First, say how sure you are."
        sub={<>It opens on &quot;I&apos;m not sure yet&quot;, the answer 65.2% of my survey gave. People who know their date lose one tap.</>}>
        <Figure src={img("f1.webp")} alt="Hi-fi return calendar with 'I'm not sure yet' selected and a fare under every day." />
      </Beat>

      <Beat label="15 · Pick" title="Then pick one day from your window."
        sub="The days stay a fixed list with the cheapest fare on each. Your bus opens under the day you pick, with any that beat it on price or rating.">
        <Figure src={img("f2.webp")} alt="Hi-fi day list with Thu 17 Sep picked and the recommended bus open under it." />
      </Beat>

      <Beat label="16 · Check" title="See every rule before you pay."
        sub="One change, to any date. The one line in warning colour is the one that costs you: no cancelling after a change.">
        <Figure src={img("f3.webp")} alt="Hi-fi review screen with the Free date change card: one change, and 'You cannot cancel it after that' in red." />
      </Beat>

      <Beat label="17 · Move" title="Move it once, when plans settle."
        sub="The calendar shows what each move would cost. You can only move to a bus from the same operator, which I checked by booking a real ticket.">
        <Figure src={img("f4.webp")} alt="Hi-fi Change day screen: the booking, the note that a changed ticket can't be cancelled, and a calendar with the cost of each day." />
      </Beat>

      <Beat label="18 · Done" title="It tells you what changed, and what you gave up."
        sub="I kept celebration out of the payment step on purpose. The good news goes here, where the worry ends, next to the ₹30 you don't get back.">
        <Figure src={img("f5.webp")} alt="Hi-fi Date changed screen: return moved to Tue 15 Sep, ₹30 cheaper and not refunded, and a note that this was the one change." />
      </Beat>

      <Beat label="19 · States" title="When it can't keep a promise, it says what still holds."
        sub="There are 13 of these states, from a seat sold while you were booking to a day where no bus can change date. Each says what went wrong, then what still works.">
        <Figure src={img("state.webp")} alt="Hi-fi error state: 'Your return seat is gone', then 'Your onward trip is fine', with Pick another return." />
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
          "Without redBus's fare data, I can't say how often moving a date costs more.",
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
