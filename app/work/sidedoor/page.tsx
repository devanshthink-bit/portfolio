// Written against the Sidedoor design as of commit 18d4738 on the sidedoor branch (24 Sep 2026):
// Figma V6 on UI Screens, and the coded prototype at /work/sidedoor/prototype.
// What changed since then, and which sections it touches: sidedoor-case-study/CASE_STUDY_VERSION.md.
import type { Metadata } from "next";
import RubberBackButton from "../../../components/RubberBackButton";
import SidedoorTOCClient from "../../../components/SidedoorTOCClient";
import AskDevansh from "../../../components/AskDevansh";
import SidedoorEmbed from "../../../components/SidedoorEmbed";
import { T, SectionLabel, Beat, Card, Chip, Numbered, Pill, MetaStrip, Act, InShort, BeforeAfter, Rows, MoSCoW, Closing, NextCase } from "../../../components/caseStudy";
import { PhoneRow } from "../../../components/IPhone";
import PhoneShot from "../../../components/PhoneShot";

export const metadata: Metadata = {
  title: "SideDoor - A referral request built to be answered | Devansh Somvanshi",
  description: "A concept for job referrals in Indian tech: the request arrives complete, fit comes with proof, and the answer travels back.",
};

// Every screen is a V6 frame exported from Figma (UI Screens), cropped to one phone screen.
const scr = (f: string) => `/images/sidedoor/screens/${f}.webp`;
const PROTO_FULL = "/work/sidedoor/prototype";
// Every research, business and design artefact, in the order it was made (like RedBus's board).
const BOARD_URL = "/sidedoor-process.html";

// ── Visuals built in code ────────────────────────────────────────────────────
function Quotes({ items }: { items: { q: string; who: string }[] }) {
  return (
    <div className="cs-grid-2">
      {items.map((x) => (
        <Card key={x.q}>
          <p style={T.quote}>&quot;{x.q}&quot;</p>
          <p style={{ ...T.small, marginTop: 8 }}>{x.who}</p>
        </Card>
      ))}
    </div>
  );
}

function Limits() {
  const rows = [
    "Nobody outside a company can read its referral portal. Not LinkedIn, not me.",
    "Signing in with LinkedIn gives a name, an email and a photo. No work history.",
    "Four people, each seen from both sides. Anything only one of them said is marked as one.",
  ];
  return (
    <Card>
      <p style={{ ...T.eyebrow, marginBottom: 10 }}>What I had to work around</p>
      <ul className="cs-list">{rows.map((r) => <li key={r}>{r}</li>)}</ul>
    </Card>
  );
}

function Link() {
  return (
    <div className="cs-grid-2">
      <Card>
        <p style={T.quote}>&quot;a link is sent to the candidate to fill out their own personal details, which would cut the referrer&apos;s effort by 50%&quot;</p>
        <p style={{ ...T.small, marginTop: 8 }}>Samarth, as a referrer. The link page is their idea.</p>
      </Card>
      <Card warn>
        <p style={{ ...T.cardH, color: "#A45729" }}>The risk I kept</p>
        <p style={{ ...T.body, marginTop: 4 }}>Both of them ask for referrals on LinkedIn today. If referrers won&apos;t send the link there, this whole bet fails.</p>
      </Card>
    </div>
  );
}

function AttackStats() {
  const stats = [
    { n: "1 of 13", l: "breaks I predicted on the first two screens" },
    { n: "2", l: "blockers across the app, both on work-email checks" },
    { n: "18", l: "major breaks across the whole app" },
    { n: "65", l: "states you can open in the prototype" },
  ];
  return (
    <div className="cs-stats">
      {stats.map((s) => (
        <div key={s.l} style={{ background: "var(--bg)", padding: "20px 22px" }}>
          <div style={{ ...T.figure, marginBottom: 2 }}>{s.n}</div>
          <div style={T.small}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}

function Watch() {
  const rows = [
    { h: "Referrals submitted per active referrer, each month", b: "The number this should move", tone: "green" as const, t: "Goal" },
    { h: "Referrers who turn requests off", b: "Must not go up", tone: "red" as const, t: "Limit" },
    { h: "Requests with no answer after 7 days", b: "Silence is the problem, so watch it", tone: "amber" as const, t: "Risk" },
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

// ── Page ─────────────────────────────────────────────────────────────────────
export default function SidedoorCaseStudy() {
  return (
    <main className="cs-page is-sidedoor" style={{ padding: "40px 0 96px" }}>
      <SidedoorTOCClient ask={!!process.env.GEMINI_API_KEY?.trim()} />
      <AskDevansh available={!!process.env.GEMINI_API_KEY?.trim()} study="sidedoor" />
      <RubberBackButton plain />

      <div id="toc-intro" style={{ marginBottom: 88 }}>
        <PhoneRow className="hero bare" phones={[
          { src: scr("job"), alt: "Job details: How you match, with skills found in his work, related skills and one listed only.", priority: true },
          { src: scr("login"), alt: "The login screen: the SideDoor logo, Get referred by insiders, and sign in with LinkedIn, Google or Apple.", priority: true },
          { src: scr("request"), alt: "The referrer's view of a request: blockers, then fit skill by skill with where each was found.", priority: true },
        ]} />
      </div>

      <SectionLabel>Case study · Product design, 0 to 1</SectionLabel>
      <h1 style={T.h1}>
        {/* The exact logo and wordmark from the app's login screen */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/sidedoor/sidedoor-logo.png" alt="" aria-hidden width={24} height={31} style={{ height: "1.4em", width: "auto", display: "inline-block", verticalAlign: "-0.34em", marginRight: 10 }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/sidedoor/sidedoor-word.svg" alt="SideDoor" width={132} height={24} style={{ height: "0.74em", width: "auto", display: "inline-block", verticalAlign: "-0.02em" }} />: A referral request built to be answered
      </h1>
      <p style={T.lede}>Referral DMs to strangers mostly go unanswered. The referrer has to chase the job ID and portal details, and the candidate never hears back. SideDoor, an iOS app for both sides, shows candidates their fit before they ask. Referrers get a request that&apos;s complete and proven, and candidates track each one until it&apos;s submitted.</p>

      <MetaStrip items={[
        { label: "Role", value: "Product designer, solo, self-initiated" },
        { label: "Timeline", value: "6 weeks" },
        { label: "Platform", value: "iOS app, plus a web page for strangers" },
        { label: "Tools", value: "Figma, FigJam, Claude Code" },
      ]} />
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
        <Pill href="#toc-try" primary icon="down">Try the prototype</Pill>
        <Pill href={PROTO_FULL} external>Open every screen and state</Pill>
        <Pill href={BOARD_URL} external>See the research board</Pill>
      </div>

      <section className="cs-inshort-wrap">
        <InShort rows={[
          { k: "The problem", v: "A referrer asked by a stranger has to chase the job ID, the date of birth and the career gaps before they can refer. Most don't bother, and the candidate never finds out." },
          { k: "What I designed", v: "A request that carries everything the company's portal asks for, fit shown skill by skill with the line that proves it, and a status the referrer passes back in one tap." },
          { k: "Why it matters", v: "Referrers are the scarce side of this marketplace. If each request takes them minutes, more get submitted, and that is the number I'd judge it by." },
        ]} />
      </section>

      {/* ── ACT 1 ── */}
      <Act id="toc-problem" n="Act 1 · The problem" title="Ever asked a stranger for a referral and heard nothing?"
        sub={'Samarth has. For a role at Razorpay they messaged two or three people on LinkedIn, with a formal note and a resume. "My message was not even read."'} />

      <Beat label="The other side" title="Referrers skip strangers because of the admin."
        sub="Riya refers people at Accenture, and Samarth at Infosys. Neither worried about a stranger turning out badly. What they described was chasing details: a job ID, a date of birth, the gaps in someone's career, then typing it all into the company portal by hand."
        caption={<>Eight interviews, 162 notes, five clusters. <a className="inline-link" href={BOARD_URL} target="_blank" rel="noopener noreferrer">See the whole research board</a>, from the business lens to the tests.</>}>
        <Quotes items={[
          { q: "they don't share the job ID, which irritates me a lot... I will not take the pain and go and check for it", who: "Riya, as a referrer" },
          { q: "having to constantly ask candidates for additional details, as many assume that just sending a resume and phone number is enough", who: "Samarth, as a referrer" },
        ]} />
      </Beat>

      <Beat label="The candidate" title="And the candidate reads silence as a no."
        sub="Nothing comes back, so they guess. The same people, asking for referrals themselves, described it from the other end.">
        <Quotes items={[
          { q: "You can say 80% of the time they don't reply.", who: "Riya, as a candidate" },
          { q: "I would never know what actually happened. If they ever applied in reality or not I'm not sure.", who: "Riya again" },
        ]} />
      </Beat>

      {/* WHY IT MATTERS: a beat with the market numbers (referral hire rates, time to hire) goes here
          once Devansh sends the original sources. Until then no unsourced figure is on this page.
          See CASE_STUDY_VERSION.md, "Pending". */}

      <Beat label="The limits" title="I can't see inside a company's portal, and neither can LinkedIn."
        sub="So the status has to come from the referrer, and the request has to carry what the portal will ask for before anyone opens it.">
        <Limits />
      </Beat>

      {/* ── ACT 2 ── */}
      <Act id="toc-design" n="Act 2 · The design" title="A request that arrives ready"
        sub="Abhinav, a product designer at Blinkit, wants a job at Flipkart. Nithin, a design manager there, refers for it. They're sample people. Every screen is from the Figma file." />

      <Beat label="Scene 1 · Finding a job" title="He only sees jobs where someone will refer him."
        sub="How does a candidate know which ask is worth making? Each card says who refers, how well he fits, and whether that person is full this week.">
        <PhoneShot src={scr("jobs")} alt="Jobs: three jobs, each with the person who refers, a skills match and a shared background tag."
          notes={[
            { box: [2, 18.5, 96, 4.5], title: "Jobs with someone who refers", sub: "no cold DMs to guess at" },
            { box: [7, 32.2, 84, 4.4], title: "4 of 7 skills, before he asks", sub: "and what he shares with Nithin" },
            { box: [7, 49, 40, 4.2], title: "Full this week", sub: "said up front, not left to silence" },
          ]} />
      </Beat>

      <Beat label="Scene 2 · Before asking" title="He sees how he matches, and what asking costs him."
        sub="Why spend a request on a bad fit? A skill counts only when his work or resume shows it. He gets 14 requests a week, so each one is a choice.">
        <PhoneShot src={scr("job")} alt="Job details: How you match, with skills found in his work, related skills and one listed only."
          notes={[
            { box: [6.5, 32, 88, 20.8], title: "How you match", sub: "found in your work, related, listed only" },
            { box: [2, 76, 96, 5.3], title: "Uses 1 of your 14 this week", sub: "referrers answer because each one is chosen" },
          ]} />
      </Beat>

      <Beat label="Scene 3 · Asking" title="Flipkart's portal needs four things his resume doesn't have. He adds them once."
        sub="How does the request arrive complete? It won't send until it is. The details the portal asks for are saved for his next request, and he says whether he was referred to Flipkart in the last six months.">
        <PhoneShot src={scr("check")} alt="Check your request: the four details Flipkart's portal asks for, then the six month question."
          notes={[
            { box: [2, 28, 96, 6.3], title: "Still needed · 4", sub: "asked once, saved after" },
            { box: [3, 83.5, 94, 6.5], title: "Referred here in 6 months?", sub: "most portals refuse a second one" },
          ]} />
      </Beat>

      <Beat label="Scene 4 · The referrer's list" title="Nithin sees the best fit first, with the reason on the card."
        sub="How does a referrer decide on a work break? Requests are ordered by fit. The weaker ones are folded away but still there, because Samarth refers borderline people on purpose.">
        <PhoneShot src={scr("requests")} alt="The end of Nithin's list of requests for one job, ordered by fit, with Lower match folded and Suggested for this job below."
          notes={[
            { box: [4, 31.2, 33, 2.9], title: "Fit on every card", sub: "the reason, before he opens it" },
            { box: [2, 52.2, 96, 2.8], title: "Lower match, folded", sub: "one tap away" },
            { box: [2, 58.6, 96, 4.8], title: "Suggested for this job", sub: "people who chose to be found" },
          ]} />
      </Beat>

      <Beat label="Scene 5 · One request" title="What would stop it comes first, then the fit."
        sub="What does a referrer check, in order? City, years and notice period, then whether he was referred to Flipkart recently. Then every skill the job asks for, with where it was found.">
        <PhoneShot src={scr("request")} alt="The request: city, years, notice and the six month line, then fit grouped by where each skill was found."
          notes={[
            { box: [3.5, 23, 93, 7.5], title: "The blockers", sub: "the six month line names its source" },
            { box: [3.5, 36.5, 93, 22.5], title: "Found in their work", sub: "each skill says where" },
            { box: [3.5, 74.2, 93, 8.2], title: "Listed only", sub: "shown, never counted" },
          ]} />
      </Beat>

      <Beat label="Scene 6 · Checking a skill" title="He taps a skill and reads the line SideDoor found."
        sub="Why should he trust a tag? He doesn't have to. The line comes from Abhinav's own project page, and the link is right there.">
        <PhoneShot src={scr("proof")} alt="A sheet over the request: Interaction design, found on his project page, with the line quoted and a link to it."
          notes={[
            { box: [3.5, 76, 93, 16], title: "The line, and where it came from", sub: "open the page to check" },
          ]} />
      </Beat>

      <Beat label="Scene 7 · Referring" title="He refers, and the portal form is already filled in."
        sub="How does the data get into the portal? Every detail is there in the portal's order, with a copy button each. Or he emails it all to his work inbox, resume attached, and fills the portal in from his laptop.">
        <PhoneShot src={scr("emailed")} alt="After Refer: Emailed and Copy all, then every detail in the portal's order."
          notes={[
            { box: [2, 25.8, 96, 9.2], title: "Email to me, or Copy all", sub: "resume attached" },
            { box: [3.5, 35.8, 93, 52], title: "In the order the portal asks", sub: "the answers Abhinav gave once" },
          ]} />
      </Beat>

      <Beat label="Scene 8 · Done" title="One more tap, and Abhinav knows it's in."
        sub="Marking it submitted is the last step of referring, while the portal is still open. The candidate sees the stage and what usually comes next."
        caption="The candidate's screen is one of Abhinav's other requests, at Meta.">
        <PhoneRow phones={[
          { src: scr("marked"), label: "Nithin", caption: "Marked as submitted", alt: "Marked as submitted: Abhinav will see it." },
          { src: scr("track"), label: "Abhinav", caption: "Submitted, and interviews usually start in 2 to 3 weeks", alt: "Track details: submitted on Meta's portal." },
        ]} />
      </Beat>

      <Beat label="Scene 9 · No app yet" title="Strangers don't need the app to ask."
        sub="Nithin pastes one link into a LinkedIn reply. A stranger drops a resume, checks the details, and sends a complete request without installing anything.">
        <PhoneRow phones={[
          { src: scr("link_before"), label: "The link", caption: "Drop your resume", alt: "The link page: ask Nithin for a referral, drop your resume." },
          { src: scr("link_sent"), label: "Sent", caption: "Nithin gets every detail Flipkart's portal asks for", alt: "Sent to Nithin, with an option to get the app." },
        ]} />
      </Beat>

      <Beat label="Scene 10 · When it breaks" title="When something goes wrong, it says what's still safe."
        sub="There are 65 states in the prototype. Three of them: nobody answered, the request didn't send, and the phone is offline.">
        <PhoneRow phones={[
          { src: scr("st_noanswer"), label: "No answer", caption: "The request comes back, and others at Zepto refer", alt: "No answer after 7 days, with Ask someone else at Zepto." },
          { src: scr("st_cantsend"), label: "Error", caption: "\"Couldn't send. Your details are saved.\"", alt: "Couldn't send, with Try again." },
          { src: scr("st_offline"), label: "Offline", caption: "Shows what was saved", alt: "Jobs while offline, with a note at the top." },
        ]} />
      </Beat>

      <Beat id="toc-try" label="Try it" title="Now try it yourself."
        sub="This is the working prototype, built in code from the Figma file. Pick a side on the first screen. Tap an empty field and it fills itself, so you never have to type."
        caption={<>Every screen and state has its own shortcut on <a className="inline-link" href={PROTO_FULL} target="_blank" rel="noopener noreferrer">the full prototype page</a>.</>}>
        <SidedoorEmbed />
      </Beat>

      {/* ── ACT 3 ── */}
      <Act id="toc-behind" n="Act 3 · Behind the scenes" title="The first version was built on the wrong idea"
        sub="These are the moments that changed the design, roughly in the order they hit me." />

      <Beat label="The bet that died" title="I thought referrers didn't trust strangers. They said the problem was work."
        sub={<>The old SideDoor was built on trust: a match score, graded recommendations, spam limits. Samarth said a bad hire after interviews &quot;should not fall on the referrer&quot;. Riya&apos;s rule is just the job ID. And the bonus doesn&apos;t make up for it. Riya called it &quot;very low&quot;.</>}
        caption="That made the score screen, the ranked inbox and the swipe cards worthless.">
        <BeforeAfter beforeLabel="What I believed" afterLabel="What they told me"
          before="Referrers can't judge strangers, so they need scores"
          after="The request makes them do the candidate's work" />
      </Beat>

      <Beat label="Before and after" title="Version 2 sold a score. Version 6 shows the evidence."
        sub="Version 2 was a swipe app with a 9.4 Strong Fit badge. A decimal looks precise, and nobody can check it. Now fit is a count, and every skill says where it came from.">
        <PhoneRow phones={[
          { src: scr("v2_swipe"), label: "Version 2", caption: "Swipe, and a 9.4 you can't check", alt: "Version 2: a swipe card with a green quote banner and a 9.4 Strong Fit tag." },
          { src: scr("request"), label: "Version 6", caption: "A count, and where each skill was found", alt: "Version 6: the request with fit grouped by where each skill was found." },
        ]} />
      </Beat>

      <Beat label="Pushing back" title="My mentor said to make it a LinkedIn feature. I didn't."
        sub="The argument was fair: why would a referrer join a new app? I kept SideDoor separate because the work sits between LinkedIn and the company's portal, and neither owns it. A referrer also gets something on day one, from a link they send to a stranger."
        caption="That's reasoning. It hasn't been tested.">
        <Link />
      </Beat>

      <Beat label="My mistake" title="I asked referrers to come back later and update a stranger."
        sub="My first plan had the referrer return to mark each referral as submitted. Then I asked why they'd bother. Version 2 even had six stages to update by hand. Now Mark as submitted is the last tap of referring, and the candidate can mark it from the company's email if the referrer never does.">
        <PhoneRow phones={[
          { src: scr("v2_update"), label: "Version 2", caption: "A list of people to update, stage by stage", alt: "Version 2: Update Referrals, a list with an Update button on each person." },
          { src: scr("marked"), label: "Version 6", caption: "One tap, while the portal is still open", alt: "Version 6: Marked as submitted." },
        ]} />
      </Beat>

      <Beat label="Proof" title="A skill you only typed doesn't count."
        sub="A candidate could tag any skill on their own project and push their match up. So SideDoor reads the linked work and the resume, and a skill counts only when it finds it there. That makes faking harder, though it can't stop it. The interview is still the last check."
        caption="The reading rule is my call. The interviews only tell me referrers check the resume against the skills.">
        <Rows rows={[
          { s: "Counts", tone: "green", rule: "Found in their work" },
          { s: "Shown", tone: "amber", rule: "Related: a nearby skill, the referrer decides" },
          { s: "Shown", tone: "grey", rule: "Listed only" },
          { s: "Missing", tone: "red", rule: "Not in their work or resume" },
        ]} />
      </Beat>

      <Beat label="The question" title="Nithin's one question shut out most people who'd apply."
        sub={<>A referrer can ask every candidate one question. Mine asked about a checkout trade-off, but Nithin can&apos;t know who will apply, and most designers have never worked on checkout. Now it asks about a skill. The field starts empty so the question is his own, and if he gets stuck SideDoor suggests one per skill from the job description.</>}>
        <PhoneShot src={scr("post")} alt="Check your job post: an empty field for the one question, and below it three questions SideDoor suggested from the job description, opened on request."
          notes={[
            { box: [3, 13.3, 94, 19.2], title: "His question, written first", sub: "ask about a skill, not a product" },
            { box: [3, 33.8, 94, 33.4], title: "Suggestions only when asked", sub: "one per skill, marked as AI" },
          ]} />
      </Beat>

      <Beat label="Seven rounds" title="I spent seven rounds on a green banner. Then I deleted it."
        sub="The request used to open on a brand green card. I tried a photo on it, a name, a cover image, a match line. White on that green is 2.54 to 1, well under the 4.5 text needs, and every round pushed the evidence further down."
        caption="Deleting it moved the evidence up by a banner's height. If a pattern needs seven rounds, I now ask whether it should exist.">
        <Rows rows={[
          { s: "Rounds 1 to 4", tone: "grey", rule: "Photo, name and role on green" },
          { s: "Round 5", tone: "grey", rule: "A cover photo, dropped because it invites bias" },
          { s: "Round 6", tone: "red", rule: "\"4 of 7 skills match\" in white, at 2.54 to 1" },
          { s: "Round 7", tone: "green", rule: "No banner at all" },
        ]} />
      </Beat>

      <Beat id="toc-testing" label="Attacking it" title="I tried to break my own screens. I guessed 1 break out of 13."
        sub="I threw empty lists, long names, bad input and slow networks at it, and wrote down what I expected first. The ones I missed were empty screens, wrong input and waiting. On the last pass, three quick taps on Send took his requests left from 2 to 0. That's fixed now."
        caption="No real user has broken it yet. That comes next.">
        <AttackStats />
      </Beat>

      <Beat id="toc-choices" label="What made the cut" title="Two sides, one designer. Most of the arguments were about what to leave out."
        sub="Sorted must, should, could and won't. The last column is where the old SideDoor went.">
        <MoSCoW cols={[
          { h: "Must", tone: "red", items: ["No send until the request is complete", "Fit with proof", "Mark as submitted inside Refer", "Every state, including the broken ones"] },
          { h: "Should", tone: "green", items: ["Email to me and Copy all", "Suggested candidates", "The six month check"] },
          { h: "Could", tone: "amber", items: ["A browser extension that fills the portal", "\"Usually answers in 2 days\""] },
          { h: "Won't", tone: "grey", items: ["Charging candidates to reach referrers", "Points and badges", "Swipe", "Reading the company's portal"] },
        ]} />
      </Beat>

      {/* ── ACT 4 ── */}
      <Act id="toc-next" n="Act 4 · What's next" title="Nobody has used this yet"
        sub="No real person has tested it, so there are no results. Here's what I'd watch, and what would prove me wrong." />

      <Beat label="What I'd watch" title="One number to move, one to protect."
        sub="Referrers are the scarce side, so they never pay and are never sold to candidates. Both sides are free at first. Companies already pay referral bonuses, so they're the likely payer later.">
        <Watch />
      </Beat>

      <Beat label="What kills it" title="I wrote down what would prove me wrong."
        sub="The next test is eight referrers in tech using their link for two weeks. If either of these happens, the idea is dead."
        caption={<>1 in 5 comes from Riya: &quot;80% of the time they don&apos;t reply.&quot; A complete request has to beat that.</>}>
        <Rows rows={[
          { s: "Dead if", tone: "red", rule: "Fewer than 1 in 5 complete requests from strangers get submitted" },
          { s: "Dead if", tone: "red", rule: "Fewer than 3 of 8 referrers send their link in two weeks" },
        ]} />
      </Beat>

      <Beat label="Next" title="Samarth and Riya try it next."
        sub="Two sessions, each of them as a candidate and then as a referrer, ten tasks. I'll change the design, and this page, based on what breaks." />

      <Beat label="Keeping" title="What I'm taking to the next project."
        sub="Most of it I learned by getting it wrong first.">
        <Numbered items={[
          "A cut needs a reason, as much as an addition does.",
          "If a pattern takes seven rounds to look right, ask whether it should be there.",
          "Write down what will break before testing. I guessed 1 of 13.",
        ]} />
      </Beat>

      <Closing />
      <NextCase
        href="/work/redbus"
        gradient="linear-gradient(135deg, #fcc3cb 0%, #fb7a8b 45%, #ffb0ba 100%)"
        logo="/images/redbus/logo.svg" wordmark="/images/redbus/wordmark.svg" brand="redBus"
        did="Redesigned RedBus checkout to capture the return trip, even without a date" />
    </main>
  );
}
