// Written against the Sidedoor design as of commit 18d4738 on the sidedoor branch (24 Sep 2026):
// Figma V6 on UI Screens, and the coded prototype at /work/sidedoor/prototype.
// What changed since then, and which sections it touches: sidedoor-case-study/CASE_STUDY_VERSION.md.
// Told as one story, in the order of Ishita Sharma's EDGE case study: hook, a persona through the
// screens, the turns behind them, the grind, what's next. Parts: components/story.tsx.
import type { Metadata } from "next";
import RubberBackButton from "../../../components/RubberBackButton";
import SidedoorTOCClient from "../../../components/SidedoorTOCClient";
import SidedoorEmbed from "../../../components/SidedoorEmbed";
import { T, SectionLabel, Pill, MoSCoW, Closing } from "../../../components/caseStudy";
import { Hook, P, H2, H3, List, Dots, Ask, Outcome, Voice, Fig } from "../../../components/story";
import { PhoneRow } from "../../../components/IPhone";
import PhoneShot from "../../../components/PhoneShot";

export const metadata: Metadata = {
  title: "SideDoor - A referral request a stranger can say yes to | Devansh Somvanshi",
  description: "A concept for job referrals in Indian tech: the request arrives complete, fit comes with proof, and the answer travels back.",
};

// Every screen is a V6 frame exported from Figma (UI Screens), cropped to one phone screen.
const scr = (f: string) => `/images/sidedoor/screens/${f}.webp`;
const PROTO_FULL = "/work/sidedoor/prototype";

export default function SidedoorCaseStudy() {
  return (
    <main className="cs-page is-sidedoor" style={{ padding: "40px 0 96px" }}>
      <SidedoorTOCClient />
      <RubberBackButton plain />

      <div id="toc-intro" style={{ marginBottom: 88 }}>
        <PhoneRow className="hero bare" phones={[
          { src: scr("check"), alt: "Check your request: Flipkart's portal also asks for four details, still needed.", priority: true },
          { src: scr("request"), alt: "The referrer's view of a request: blockers, then fit skill by skill with where each was found.", priority: true },
          { src: scr("emailed"), alt: "After Refer: the portal details, emailed to the referrer's work inbox, with Copy all.", priority: true },
        ]} />
      </div>

      <SectionLabel>Case study · Product design, 0 to 1</SectionLabel>
      <h1 style={T.h1}>
        {/* The exact logo and wordmark from the app's login screen */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/sidedoor/sidedoor-logo.png" alt="" aria-hidden width={24} height={31} style={{ height: "1.05em", width: "auto", display: "inline-block", verticalAlign: "-0.2em", marginRight: 10 }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/sidedoor/sidedoor-word.svg" alt="SideDoor" width={132} height={24} style={{ height: "0.74em", width: "auto", display: "inline-block", verticalAlign: "-0.02em" }} />: a referral request a stranger can say yes to
      </h1>
      <p className="story-byline">Devansh Somvanshi · Solo and self-initiated · iOS app and a web page · Figma, FigJam, Claude Code · Sep 2026</p>

      {/* ── The hook ── */}
      <Hook>Ever asked a stranger at a company for a referral and heard nothing back?</Hook>
      <P>The two people I interviewed have been on both sides of it. As candidates they send a resume and a polite note, and hear nothing. As referrers they get the same notes, and most of the time they leave them.</P>
      <P>I designed SideDoor, an app that changes what the referrer receives.</P>
      <P><strong>How does it do that?</strong></P>
      <List items={[
        "The request arrives with everything the company's referral portal asks for, so the referrer has nothing to chase.",
        "Fit is shown skill by skill, with the line in the candidate's work that proves it.",
        "The referrer passes the status back in one tap, so the candidate isn't left guessing.",
      ]} />
      <P>Referrers are the scarce side of this marketplace. The number I&apos;d judge SideDoor by is how many referrals each active referrer submits in a month.</P>

      <H2 id="toc-try">Short on time? Try it first.</H2>
      <P>This is the working prototype, built in code from the Figma file. Pick a side on the first screen. Tap any empty field and it fills itself, so you never have to type.</P>
      <Fig wide caption={<>Every screen and state has its own shortcut on <a className="inline-link" href={PROTO_FULL} target="_blank" rel="noopener noreferrer">the full prototype page</a>.</>}>
        <SidedoorEmbed />
      </Fig>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Pill href={PROTO_FULL} external>Open every screen and state</Pill>
      </div>

      {/* ── The story ── */}
      <H2 id="toc-story">A little story, for context</H2>
      <P>Meet Abhinav. He&apos;s a product designer at Blinkit, and he wants the Interaction Designer job at Flipkart. Nithin is a design manager at Flipkart who refers people for it. Both are sample people. Every screen below is from the Figma file.</P>

      <Dots />
      <P>Abhinav has sent referral requests on LinkedIn before. Most were never read. This time he opens SideDoor.</P>
      <Ask>How does a candidate know which ask is worth making?</Ask>
      <P>Every job on SideDoor has someone who refers for it. Each card says who that is, how many of the job&apos;s skills Abhinav has, and whether the referrer is full this week.</P>
      <Outcome>Before asking anyone, he sees he has 4 of the 7 skills on the Flipkart card.</Outcome>
      <Fig><PhoneRow className="bare" phones={[{ src: scr("jobs"), alt: "Jobs: three jobs, each with the person who refers, a skills match and a shared background tag." }]} /></Fig>

      <Dots />
      <P>He opens the job. He gets 14 requests a week, so he wants to know whether this one is worth spending.</P>
      <Ask>How can a candidate tell a good fit from a hopeful one?</Ask>
      <P>How you match splits his skills three ways: found in his work, related, and listed only. A skill counts only when his work or his resume shows it.</P>
      <Outcome>He can see where he stands, and that asking uses 1 of his 14 this week.</Outcome>
      <Fig><PhoneRow className="bare" phones={[{ src: scr("job"), alt: "Job details: How you match, with skills found in his work, related skills and one listed only." }]} /></Fig>

      <Dots />
      <P>He taps to ask. Flipkart&apos;s portal wants four things his resume doesn&apos;t have: his date of birth, career gaps, preferred interview locations and notice period.</P>
      <Ask>How does a request arrive complete?</Ask>
      <P>It won&apos;t send until it is. He fills in the four once, and SideDoor saves them for his next request. He also says whether he was referred to Flipkart in the last six months, because most portals refuse a second referral.</P>
      <Outcome>The request goes to Nithin with nothing missing.</Outcome>
      <Fig><PhoneRow className="bare" phones={[{ src: scr("check"), alt: "Check your request: the four details Flipkart's portal asks for, then the six month question." }]} /></Fig>

      <Dots />
      <P>Nithin looks at his requests on a work break.</P>
      <Ask>How does a referrer decide in the few minutes he has?</Ask>
      <P>Requests are ordered by fit, and each card gives the reason. Weaker matches are folded away, one tap from view, because Samarth, one of the people I interviewed, refers borderline candidates on purpose.</P>
      <Outcome>Nithin opens the best fit first.</Outcome>
      <Fig><PhoneRow className="bare" phones={[{ src: scr("requests"), alt: "Referral requests for one job, ordered by fit, with Lower match folded and Suggested for this job below." }]} /></Fig>

      <Dots />
      <P>The request opens with whatever could stop it: Abhinav&apos;s city, years and notice period, and whether he was referred to Flipkart recently. Below that is every skill the job asks for, with where it was found.</P>
      <Ask>Why should Nithin trust a skill tag?</Ask>
      <P>He doesn&apos;t have to. He taps Interaction design and reads the line SideDoor found on Abhinav&apos;s project page, with a link to the page itself.</P>
      <Outcome>Nithin checks the proof and taps Refer.</Outcome>
      <Fig><PhoneRow className="bare" phones={[
        { src: scr("request"), label: "The request", caption: "What could stop it, then the fit", alt: "The request: city, years, notice and the six month line, then fit grouped by where each skill was found." },
        { src: scr("proof"), label: "One skill", caption: "The line, and where it came from", alt: "A sheet over the request: Interaction design, found on his project page, with the line quoted and a link to it." },
      ]} /></Fig>

      <Dots />
      <P>Next comes the part both referrers I spoke to complained about: typing everything into the company&apos;s portal.</P>
      <Ask>How does the data get into the portal without chasing anyone?</Ask>
      <P>Every detail is laid out in the order the portal asks for it, with a copy button on each. Nithin can copy everything at once, or email it all to his work inbox with the resume attached and fill the portal in from his laptop.</P>
      <Outcome>He has nothing to ask Abhinav for.</Outcome>
      <Fig><PhoneRow className="bare" phones={[{ src: scr("emailed"), alt: "After Refer: Emailed and Copy all, then every detail in the portal's order." }]} /></Fig>

      <Dots />
      <P>The last step of referring is Mark as submitted, while the portal is still open in front of him.</P>
      <Ask>How does the candidate find out what happened?</Ask>
      <P>The stage passes back to the candidate, along with what usually happens next.</P>
      <Outcome>Abhinav sees Submitted, and that interviews usually start in 2 to 3 weeks.</Outcome>
      <Fig caption="The candidate's screen is one of Abhinav's other requests, at Meta.">
        <PhoneRow className="bare" phones={[
          { src: scr("marked"), label: "Nithin", caption: "Marked as submitted", alt: "Marked as submitted: Abhinav will see it." },
          { src: scr("track"), label: "Abhinav", caption: "Submitted on the portal", alt: "Track details: submitted on Meta's portal." },
        ]} />
      </Fig>

      <Dots />
      <P>Nithin still gets referral DMs on LinkedIn from people who have never heard of SideDoor. He replies with his link.</P>
      <Ask>How can a stranger ask without installing anything?</Ask>
      <P>The link opens a web page. The stranger drops a resume, checks the details, and sends a complete request.</P>
      <Outcome>Nithin gets every detail Flipkart&apos;s portal asks for, from someone who never installed the app.</Outcome>
      <Fig><PhoneRow className="bare" phones={[
        { src: scr("link_before"), label: "The link", caption: "Drop your resume", alt: "The link page: ask Nithin for a referral, drop your resume." },
        { src: scr("link_sent"), label: "Sent", caption: "A complete request", alt: "Sent to Nithin, with an option to get the app." },
      ]} /></Fig>

      <Dots />
      <P>Not every request goes this smoothly.</P>
      <Ask>What does the app say when something goes wrong?</Ask>
      <P>It says what&apos;s still safe. If nobody answers in 7 days, the request comes back and others at the company are suggested. If a send fails, the details are saved. Offline, it shows what was saved. The prototype has 65 states like these, and you can open every one.</P>
      <Fig wide><PhoneRow className="bare" phones={[
        { src: scr("st_noanswer"), label: "No answer", caption: "The request comes back", alt: "No answer after 7 days, with Ask someone else at Zepto." },
        { src: scr("st_cantsend"), label: "Error", caption: "\"Couldn't send. Your details are saved.\"", alt: "Couldn't send, with Try again." },
        { src: scr("st_offline"), label: "Offline", caption: "Shows what was saved", alt: "Jobs while offline, with a note at the top." },
      ]} /></Fig>

      {/* ── The turns behind it ── */}
      <H2 id="toc-behind">Reaching this point wasn&apos;t easy</H2>
      <P>SideDoor is on its sixth version, after a lot of back and forth. I won&apos;t walk you through all of it. These are the turns that changed the design most.</P>

      <H3>How I found out referrers weren&apos;t worried about strangers</H3>
      <P>The first SideDoor was built on trust. I assumed referrers ignored strangers because they couldn&apos;t judge them, so I gave them a match score, graded recommendations and spam limits.</P>
      <P>Then I talked to Samarth, who refers at Infosys, and Riya, who refers at Accenture. Neither was worried about a stranger turning out badly. Samarth said a bad hire after interviews &quot;should not fall on the referrer&quot;. What they both described was admin.</P>
      <Voice q="they don't share the job ID, which irritates me a lot... I will not take the pain and go and check for it" who="Riya, as a referrer" />
      <Voice q="having to constantly ask candidates for additional details, as many assume that just sending a resume and phone number is enough" who="Samarth, as a referrer" />
      <P>The referral bonus doesn&apos;t make up for it. Riya called it &quot;very low&quot;. That made my score screen, the ranked inbox and the swipe cards worthless.</P>
      <P>Version 2 was a swipe app with a 9.4 Strong Fit badge. A decimal looks precise, and nobody can check it. In version 6, fit is a count, and every skill says where it came from.</P>
      <Fig><PhoneRow phones={[
        { src: scr("v2_swipe"), label: "Version 2", caption: "Swipe, and a 9.4 you can't check", alt: "Version 2: a swipe card with a green quote banner and a 9.4 Strong Fit tag." },
        { src: scr("request"), label: "Version 6", caption: "A count, and where each skill was found", alt: "Version 6: the request with fit grouped by where each skill was found." },
      ]} /></Fig>

      <H3>How I stopped asking referrers to come back later</H3>
      <P>My first plan had the referrer return to mark each referral as submitted. Version 2 even had six stages to update by hand, for people they&apos;d never met.</P>
      <P>Then I asked myself why they&apos;d bother. The whole status loop depended on unpaid work from the side that&apos;s hardest to get. So Mark as submitted became the last tap of referring, done while the portal is still open. If the referrer never taps it, the candidate can mark it from the company&apos;s email.</P>
      <Fig><PhoneRow phones={[
        { src: scr("v2_update"), label: "Version 2", caption: "A list of people to update, stage by stage", alt: "Version 2: Update Referrals, a list with an Update button on each person." },
        { src: scr("marked"), label: "Version 6", caption: "One tap, while the portal is still open", alt: "Version 6: Marked as submitted." },
      ]} /></Fig>

      <H3>How I made a skill tag something you can check</H3>
      <P>A candidate could tag any skill on their own project and push their match up. So SideDoor reads the linked work and the resume, and a skill counts only when it&apos;s found there. Everything else is still shown, sorted by how sure it is:</P>
      <List items={[
        <><strong>Found in their work</strong> counts towards the match.</>,
        <><strong>Related</strong> is a nearby skill, and the referrer decides.</>,
        <><strong>Listed only</strong> is shown, never counted.</>,
        <><strong>Missing</strong> means it isn&apos;t in their work or resume.</>,
      ]} />
      <P>This makes faking harder, though it can&apos;t stop it. The interview is still the last check. The reading rule is my own call. What the interviews told me is that referrers check the resume against the skills.</P>
      <Fig>
        <PhoneShot src={scr("proof")} alt="A sheet over the request: Interaction design, found on his project page, with the line quoted and a link to it."
          notes={[{ box: [3.5, 76, 93, 16], title: "The line, and where it came from", sub: "open the page to check" }]} />
      </Fig>

      <H3>How one question shut out most of the people who&apos;d apply</H3>
      <P>A referrer can ask every candidate one question. The one I wrote for Nithin asked about a checkout trade-off. But Nithin can&apos;t know who will apply, and most designers have never worked on checkout.</P>
      <P>So the question now asks about a skill, and SideDoor suggests one question per skill from the job description. Nithin taps one, or writes his own.</P>
      <Fig>
        <PhoneShot src={scr("post")} alt="Check your job post: one question for candidates, with three suggested from the job description."
          notes={[
            { box: [3.5, 29.5, 93, 15], title: "Ask about a skill, not a product", sub: "every candidate can answer" },
            { box: [3.5, 50, 93, 33.5], title: "Suggested from the job description", sub: "one per skill, tap to use" },
          ]} />
      </Fig>

      <H3>How I spent seven rounds on a green banner, then deleted it</H3>
      <P>The request used to open on a brand green card. Over four rounds I tried a photo, a name and a role on it. In round five I added a cover photo, and dropped it because it invites bias. In round six I put &quot;4 of 7 skills match&quot; on it in white, which is 2.54 to 1 on that green, well under the 4.5 that text needs.</P>
      <P>Every round pushed the evidence further down the screen. In round seven I removed the banner, and the evidence moved up by its height. When a pattern needs seven rounds to look right, I now ask whether it should be there at all.</P>

      <H3>How I answered my mentor&apos;s &quot;make it a LinkedIn feature&quot;</H3>
      <P>My mentor&apos;s argument was fair: why would a referrer join a new app? I kept SideDoor separate because the work sits between LinkedIn and the company&apos;s portal, and neither of them owns it. A referrer also gets something on day one, from a link they send to a stranger. That link was Samarth&apos;s idea.</P>
      <Voice q="a link is sent to the candidate to fill out their own personal details, which would cut the referrer's effort by 50%" who="Samarth, as a referrer" />
      <P>This is reasoning, and it hasn&apos;t been tested. Both people I interviewed ask for referrals on LinkedIn today. If referrers won&apos;t send the link there, the whole bet fails.</P>

      {/* ── The grind ── */}
      <H2 id="toc-grind">The grind behind it</H2>
      <P>Here&apos;s the part that doesn&apos;t show in the screens.</P>

      <H3>Talking to both sides</H3>
      <P>I interviewed two people, Samarth and Riya, each twice: once as a candidate and once as a referrer. Two people is a thin sample, so when only one of them said something, I say so.</P>
      <P>As candidates, they described the other end of the same silence. For a role at Razorpay, Samarth messaged two or three people on LinkedIn with a formal note and a resume.</P>
      <Voice q="My message was not even read." who="Samarth, as a candidate" />
      <Voice q="You can say 80% of the time they don't reply." who="Riya, as a candidate" />
      <P>Riya also said she would never know whether anyone had actually applied for her. That line is why the status goes back to the candidate.</P>
      {/* WHY IT MATTERS: the market numbers (referral hire rates, time to hire) go here once Devansh
          sends the original sources. Until then no unsourced figure is on this page.
          See CASE_STUDY_VERSION.md, "Pending". */}

      <H3>What I had to work around</H3>
      <List items={[
        "Nobody outside a company can read its referral portal. Not LinkedIn, and not me. So the status has to come from the referrer.",
        "Signing in with LinkedIn gives a name, an email and a photo, with no work history. So fit has to come from the resume and linked work.",
      ]} />

      <H3>Trying to break my own screens</H3>
      <P>I threw empty lists, long names, bad input and slow networks at the first two screens, and wrote down what I expected to break before I looked. I guessed <strong>1 of 13</strong>. The ones I missed were empty screens, wrong input and waiting.</P>
      <P>Across the whole app I found <strong>2 blockers</strong>, both on the work-email check, and <strong>18 major</strong> breaks. On the last pass, three quick taps on Send took Abhinav&apos;s requests left from 2 to 0. That&apos;s fixed now. The prototype has <strong>65 states</strong>, and every one of them can be opened.</P>

      <H3>Deciding what to leave out</H3>
      <P>With two sides and one designer, most of my arguments were about what to cut. I sorted everything into must, should, could and won&apos;t. The won&apos;t column is where the old SideDoor went.</P>
      <Fig wide>
        <MoSCoW cols={[
          { h: "Must", tone: "red", items: ["No send until the request is complete", "Fit with proof", "Mark as submitted inside Refer", "Every state, including the broken ones"] },
          { h: "Should", tone: "green", items: ["Email to me and Copy all", "Suggested candidates", "The six month check"] },
          { h: "Could", tone: "amber", items: ["A browser extension that fills the portal", "\"Usually answers in 2 days\""] },
          { h: "Won't", tone: "grey", items: ["Charging candidates to reach referrers", "Points and badges", "Swipe", "Reading the company's portal"] },
        ]} />
      </Fig>

      {/* ── What's next ── */}
      <H2 id="toc-next">What&apos;s next</H2>
      <P>Nobody has used SideDoor yet, so there are no results to show. Samarth and Riya try it next, in two sessions of ten tasks each, first as a candidate and then as a referrer. I&apos;ll change the design, and this page, based on what breaks.</P>
      <P>After that, these are the numbers I&apos;d watch:</P>
      <List items={[
        <><strong>Referrals submitted per active referrer, each month.</strong> This is the one it should move.</>,
        <><strong>Referrers who turn requests off.</strong> This must not go up.</>,
        <><strong>Requests with no answer after 7 days.</strong> Silence is the problem, so I&apos;d watch it closely.</>,
      ]} />
      <P>I also wrote down what would prove me wrong. The next real test is eight referrers in tech using their link for two weeks. The idea is dead if fewer than 1 in 5 complete requests from strangers get submitted, or if fewer than 3 of the 8 referrers send their link at all. The 1 in 5 comes from Riya&apos;s &quot;80% of the time they don&apos;t reply&quot;. A complete request has to beat that.</P>
      <P>Referrers are the scarce side, so they never pay and are never sold to candidates. Both sides are free at first. Companies already pay referral bonuses, so they&apos;re the likely payer later.</P>

      <H3>What I&apos;m taking to the next project</H3>
      <List items={[
        "A cut needs a reason, just as much as an addition does.",
        "If a pattern takes seven rounds to look right, ask whether it should be there.",
        "Write down what will break before testing. I guessed 1 of 13.",
      ]} />

      <Closing />
    </main>
  );
}
