# SCOPE

**Student:** Devansh Somvanshi · **Date:** 17 Sep 2026 · **Version:** v2 (v1 kept below)
**Type:** new concept, its own product

**Draft.** Written from the chosen problem statement in RESEARCH.md. The lines marked guessing are the ones most likely
to be wrong.

## The bet

| | |
|---|---|
| **Product** | Sidedoor, a referral app of its own |
| **The moment** | A candidate asking an employee they don't know for a referral to one specific job, until the candidate hears what happened to it |
| **Who** | Someone a few years into their career (engineering, design, PMO) who has found a job at a company where they know nobody, and is about to message its employees on LinkedIn. And the employee who gets that message, and has to put the candidate into their company's referral portal |
| **The guess** | Employees drop strangers' referral requests mainly because the request makes them do the candidate's work (find the job ID, chase the city, date of birth and gaps, judge fit from a resume), not because they won't help a stranger. A request that arrives complete gets referred more often, and the outcome can reach the candidate at almost no cost, because the referrer already sees it. **worked it out** for the cause, **guessing** for "referred more often" |
| **The number** | Referral rate on requests to people the candidate doesn't know: % of those requests the employee submits to their company's portal. **guessing** |
| **Guardrail** | Employees who stop accepting referral requests must not rise. A product that makes asking easier can flood the people it depends on. **guessing** |

## Why its own product, and not a feature inside LinkedIn

**Chose:** Sidedoor as its own product. **Devansh's call, 17 Sep 2026**, after the mentor suggested a LinkedIn feature.

**Rejected:** a feature inside LinkedIn.

**Why it lost, and how sure:**
- **The work sits between two systems nobody owns.** The request starts on LinkedIn and ends in the company's referral
  portal (Workday and others). The retyping, the chasing for the city and date of birth, and the status that never
  comes back all happen in the gap between them (n57, n59, n60, n71, n47, n58). LinkedIn can't see inside that portal
  any more than a new product can (n46). Being inside LinkedIn doesn't close the gap. **worked it out**
- **The referrer gets value before anyone else joins.** The referrer's biggest pain is data entry, and Samarth (as referrer) asked
  for exactly this: "a link is sent to the candidate to fill out their own personal details, which would cut the
  referrer's effort by 50%" (n66). A referrer can use that with candidates who have never heard of Sidedoor. So the
  supply side has a reason to come that doesn't depend on the network already existing. **worked it out**
- **All four, as candidates, asked for a dedicated place.** Samarth (as candidate): a place "where you know the other person is open to
  doing it" (n24). Riya (as candidate): one place where "I can just see in this company, I asked this person referral for" (n45).
  Akash (n113) and Atishya (n147): a place where employees say they are open to referring.
  **saw it**, as wishes, which are the weakest kind of evidence

**The risk, stated before anyone asks:**
- All four ask and get asked on LinkedIn today (n04, n07, n09, n29, n49, n68, n69, n116, n138). Sidedoor has to pull that
  moment out of LinkedIn, or start from a link shared inside it
- Riya (as candidate) says the referral communities on Fishbowl are so quiet a message might be seen "next week" (n28). A
  separate place for referrals can die empty. Sidedoor has to answer why it won't
- This is the mentor's critique. It is answered with reasoning, not tested. **guessing** that referrers will adopt it

## How it gets its first users · the cold-start bet

**guessing, the most important guess on this card after the main one.**
1. Referrers start by using the link for people who already message them (n66). They get value alone
2. Every candidate who fills in a link lands on Sidedoor with a complete profile they can reuse for the next ask (n66,
   "universal candidate profile")
3. Once referrers are on it, candidates can find referrers who are open to referring (n24), instead of messaging
   strangers who never read it (C1)

**What could kill it:** referrers won't send a link to a stranger, because sending it is already a yes.

## Business lens

**Not verified. Nothing here goes on the page without a sourced figure.** RedBus's case study starts with how the
business makes money. Sidedoor needs the same, with real data. To research and source:
- **Who pays, and for what.** V2 designs a Premium that candidates pay for. Riya (as candidate)'s own framing is that referrers
  are the ones with no reward (n32, n42). Who should pay is open
- **How big the moment is.** How many referrals go through company portals; how much companies pay per referral hire.
  The desk research has referral figures but no source links yet
- **Who else does this.** GetMeReferred, EasyRefer, Jumbl, Instahyre and others are in the FigJam competitor section,
  with screenshots, to read in molades-landscape
- **Why a company would care.** Referral hires are reported as faster and better retained (desk research, source link
  missing)

## What could prove this wrong

1. If employees who receive a complete request (job ID, the portal's fields, fit shown) still don't refer strangers,
   the cause is motivation (C4), not the work, and the main guess is dead
2. If referrers won't use the link unless candidates are already on Sidedoor, the cold-start bet is dead

**Neither can be tested now: no more interviews or tests are planned.** Both go into the case study as the first thing
a real test would check.

### Kill conditions, with numbers · added 19 Sep 2026

Written after the research, so they were **not** used to judge it. Judging the old interviews against a line drawn
after reading them would be fiction (molades-research). They are for the next real test only.

**The test they need:** 8 referrers in tech who got at least one referral request from a stranger in the last month.
Each uses their Sidedoor link for 2 weeks with whoever messages them.

1. **Main guess.** If fewer than 1 in 5 complete requests from strangers gets submitted to the company portal, a
   complete request doesn't beat today's cold message, and the main guess is dead. Back to the scope card.
   Why 1 in 5: Samarth (as candidate) says strangers don't reply "80% of the time" (n30), so today's best case is about
   1 in 5 replies, before any referral.
2. **Cold start.** If fewer than 3 of the 8 referrers send their link to anyone in the 2 weeks, referrers won't
   start the loop alone, and the cold-start bet is dead.

Both numbers are Devansh's line in the sand, not industry figures. Change them before the test, never after.

## Not in this project

1. The company's referral bonus, how much and when it's paid (n87, n62). No product controls it
2. Connecting to company referral portals like Workday. No outside product has access (n46)
3. Interviews and HR decisions after the referral, including HR not telling rejected candidates (n86, n88)
4. Candidates who take a referral and don't join (n89, n90)
5. Recruiters. No real data

## Open

- The moment covers sending the request and hearing the outcome. If it has to be one thing, the upstream half, sending
  the request, wins
- The number and guardrail need a baseline nobody has. Concept targets, labelled so
- Business lens with sources

## Ideas raised before ideation · for molades-ai

Raised by Devansh on 17 Sep 2026, from a follow-up conversation with one of the interviewees and the mentor's view.
Not decided. They involve a model, so they go to **molades-ai** (instead of molades-ideate), which also works out what
happens when the AI is wrong.

- **Idea 1 · AI-curated candidates for referrers.** An engine behind the scenes shows each referrer only candidates
  whose skills match their open roles, not everyone. Supported as a wish: Samarth (as referrer) asked for "an automated matching
  score" (n65). **worked it out**
- **Idea 2 · Referrer incentive is quality, not a new reward.** Better-matched candidates let referrers refer for more
  roles and earn more company bonuses. Tension with the notes: Riya (as referrer) says the bonus is "very low. It doesn't
  encourage me to refer" (n87). Less effort per referral (C2) may be the stronger pitch. **guessing**
- **Idea 3 · Request limits for candidates.** A cap on how many referrals a candidate can ask for. Neither real
  candidate or referrer described spam (n19, n61), so the reason can't be spam. It can be the guardrail: protecting
  referrers from being flooded. **worked it out**
- **Idea 4 · Skill-matched referral search for candidates.** Searching a company shows the referral openings whose job
  descriptions best match the candidate's skills. Supported as a wish: Samarth (as candidate) asked for a match percentage (n23).
  **worked it out**

**Answered 17 Sep 2026:** the follow-up was with Samarth (the same person as the Infosys candidate and
referrer interviews). Recorded as n92, marked remembered: Devansh's summary, not a quote. Ideas 1 and 2 now rest on one
person's remembered view plus n65, and Idea 2 sits in tension with that person's own n62.

## Landscape

**Run 17 Sep 2026 with molades-landscape.** Screens are Devansh's own screenshots in FigJam (Competitive Analysis),
read at full size; they were taken before this date, and the products may have changed since. Pricing from
GetMeReferred's public page, fetched 17 Sep 2026. No store reviews were collected.

**The job:** a candidate gets an employee at a company to refer them for one job, and finds out what happened.

**Picked, and why:** LinkedIn (where all four people actually ask and get asked), GetMeReferred (the closest
product: candidates reach employees who say they are willing to refer), EasyRefer (the other model: employees post jobs
and candidates apply to them, the same model as Sidedoor V2), Instahyre (shows candidates a fit score, and puts a cost
on backing out). Plus what people do without any product.

**Left out:** Jumbl. FigJam's note calls it "AI matching → request → referral", but the screenshots show an internship
listing with Apply, a resume picker and an application tracker. No referral step is visible, so it isn't compared.
Cutshort, Wellfound, TalentPool, Naukri, ReferMe, Reddit/Discord: not read at full size this round.

### What each does

**LinkedIn** · saw it, from screenshots
- On a job: Easy Apply; "People you can reach out to" (a 2nd-degree school alum, with Connect); "Meet the hiring team"
  with Message
- "Use AI to assess how you fit" with "Show match details", "Tailor my resume", "Help me stand out", behind Premium
  ("Reactivate Premium: 50% Off")
- From a company page: People tab → your connections who work there → New message, a blank text box
- Easy Apply collects contact info, resume and screening questions (experience, current CTC, expected CTC, notice period)
- Job tracker: stages Saved, In progress, Applied, Interview, Archived. It asks the candidate "Did you hear back?" and
  "We will check back in 1 week". The candidate reports the status, not the company
- A job shows "Company review time is typically 1 week"
- No referral request anywhere in the screens

**GetMeReferred** · saw it, from screenshots; pricing worked it out, from their page
- "Connect with Employees who are willing to Refer & Guide you!" Cards of verified referrers: company, designation, role,
  years of experience, "114 employees are online now"
- Each referrer costs credits to request ("Requires 1 credit", "Requires 3 credits", else "Not enough credits")
- The request: job post link, a free-text "Referral Message" ("Write your well crafted personalized message in a
  detailed way to increase your response"), attach resume, Send
- Chat with tabs for Referrers and Recruiters; "Your connection request is pending approval from the receiver"
- Job pages have Apply and Get Referral: "Getting a referral is 5x more effective than applying directly" (no source shown)
- Upsells resume services
- **Pricing page:** ₹299 for 25 verified employees, ₹599 for 95, ₹899 for 220 senior professionals. "Earn credits by
  helping the community — accept referral requests, share insights, and stay active on the platform."

**EasyRefer** · saw it, from screenshots
- "Jobs are directly referred by professionals actively working at Top MNC's". Any user can post a job (Job Post button;
  listings "by" a username)
- Apply: name, email, phone, a message, resume. Some jobs add a long form: LinkedIn profile plus required answers,
  "Write down your answer in min 50 words"
- Candidate dashboard: Applied Jobs, Review, Views, Shortlisted counts, profile views chart
- Homepage stats (84%, 67%, 5x, 51%) with no source shown

**Instahyre** · saw it, from screenshots
- Recommended jobs with View and "Not interested"; filter by Undecided, Interested, Not interested
- On a job: "Your Instamatch score: HIGH. Your chances of being shortlisted for this job are high", and employee reviews
- "Avoid applying if you don't want to interview, as any interview backouts will be shown to other companies!"
- Activity: Viewed, Contacted, Not Shortlisted; "Go Premium"
- Companies and their sourcers reach the candidate. No employee referral visible

**No product · what the four people do** · saw it, from the interviews
- Ask friends and mutuals first, on WhatsApp; strangers on LinkedIn (n03 n04 n05 n49)
- Send the job link or job ID and a resume (n06 n07 n38)
- Referrer types it into Workday or the company portal and sees the status there (n57 n58 n71 n83)

### The convention · what all of them do

- **The ask is a free-text message plus a resume.** LinkedIn's blank message, GetMeReferred's "Referral Message",
  EasyRefer's message box, a WhatsApp text. **None of them collects what the referrer's company portal needs** (city,
  date of birth, gaps, preferred locations; n59 n67 n73 n75). saw it
- **Fit is shown to the candidate, not the referrer.** LinkedIn's match details, Instahyre's Instamatch score.
  saw it
- **Fit tools are what candidates pay for.** LinkedIn puts match details behind Premium; Instahyre sells Premium.
  saw it
- **Nobody shows what happened to a referral.** The best any of them does is status for an *application* (EasyRefer's
  counts, Instahyre's Viewed) or a status the candidate reports themselves (LinkedIn's "Did you hear back?"). saw it

→ Breaking these costs something. Sidedoor breaks the first and the last on purpose (the problem statement), and inherits
the third (Premium, BUSINESS.md).

### Where they disagree · each is a decision Sidedoor has to make

| Decision | Who does what |
|---|---|
| **Who starts** | The candidate picks the person (LinkedIn, GetMeReferred) · the employee posts a job and candidates apply (EasyRefer, Sidedoor V2) |
| **What limits asking** | Credits bought with money (GetMeReferred) · a connection first (LinkedIn's Connect) · a visible penalty for backing out (Instahyre) · nothing seen (EasyRefer) |
| **What a referrer gets** | Credits for accepting requests (GetMeReferred) · nothing on screen (LinkedIn, EasyRefer) |
| **Who reports status** | The candidate (LinkedIn's tracker) · the platform, for its own applications only (EasyRefer, Instahyre, Jumbl) · nobody, for referrals |

### What nobody does, and why not

1. **Nobody collects the referrer's portal fields before the ask.**
   *Why not:* every company's portal asks something different, so there is no one form. **A reason, and it partly
   applies.** Samarth's and Riya's portals overlap a lot (location or city, experience, gaps, contact details) but not
   fully (date of birth, interview locations, alternate email). A request can carry the common fields and leave a short
   company-specific part. worked it out. **First thing to test:** how much of a real portal form the common fields cover.
2. **Nobody shows the candidate what happened to a referral.**
   *Why not:* the status lives inside the company's system, which no outside product can read (Riya doubts companies
   would share it, n46). **A binding reason.** LinkedIn's workaround is to ask the candidate. **Sidedoor's version:** the
   referrer can already see it (n58 n83), so the referrer passes it on. That only works if passing it on costs a tap
   (V2's five-stage manual update does not). worked it out
3. **Nobody shows fit to the referrer.** Fit scores are sold to candidates.
   *Why not:* no reason found. Possibly because showing it to candidates earns money and showing it to referrers doesn't.
   guessing. **A real opening, and the first to test:** Samarth checks fit by hand (n50) and asked for exactly this (n65)
4. **Nobody makes reaching a willing referrer free and still controls volume.**
   *Why not:* open and free fills referrers' inboxes; GetMeReferred controls it with price. **A binding reason.**
   Sidedoor's answer is limits and complete-request rules instead of price (Idea 3, BUSINESS.md). worked it out

### Do not inherit

- **GetMeReferred's free-text request** asking for a message "in a detailed way". It makes the candidate write more
  without carrying the job ID's missing details, which is what Riya actually needs (n70 n73 n76)
- **GetMeReferred's pay per referrer** ("Requires 3 credits", "Not enough credits", ₹899 for 220 senior professionals).
  It sells access to the scarce side, and "aggressive job search" is the volume the strategy is against
- **EasyRefer's required 50-word answers per question.** Friction that doesn't carry the portal's fields either
- **Unsourced stats on the page** (GetMeReferred's "5x", EasyRefer's 84% / 67% / 5x / 51%). The same mistake the old
  Sidedoor case study made
- **Instahyre's Interested / Not interested and V2's swipe.** Judging a job or a person in one gesture pushes volume

### Worth taking

- **LinkedIn's "People you can reach out to"** on the job: shows the warm path first, the way Samarth looks for mutuals
  first (n03 n04)
- **LinkedIn's "Did you hear back?" with "We will check back in 1 week"**: status without the company's data, at the
  cost of one tap
- **LinkedIn's "Company review time is typically 1 week"**: sets the wait before it becomes silence (C3, n33 n85)
- **Instahyre's backout warning**: a visible cost for people who take a referral and don't show up, which is Riya's
  complaint (n89 n90)
- **GetMeReferred's credits for accepting requests**: a referrer reward that isn't the company bonus (C4). Needs care;
  paying referrers in credits only matters if credits are worth something to them

### What this changes on the scope card

- **Discovery and fit-for-the-candidate already exist on LinkedIn** ("People you can reach out to", match details).
  Sidedoor cannot win there, and Idea 4 (skill-matched search for candidates) competes with an incumbent. **The bet
  narrows to what nobody does: the complete request (gap 1), status passed on by the referrer (gap 2) and fit shown to
  the referrer (gap 3, Idea 1).** worked it out
- **The guess stays.** Nothing seen contradicts it
- **Premium as a candidate fit tool is the convention** (LinkedIn), which supports the decision in BUSINESS.md, and it
  also means Sidedoor's Premium competes with LinkedIn Premium on that one feature

### Questions a real test would answer

No more research is planned; these go into the case study as open questions.
1. How much of a real referral portal form do the common fields cover? (gap 1)
2. Will a referrer pass on status if it's one tap? (gap 2)
3. Does showing fit to the referrer raise how many requests they submit, or just how fast they decline? (gap 3)
4. Do credits for accepting requests change whether referrers take strangers' requests? (GetMeReferred's bet, C4)

### Reference screens for the design language

In FigJam `CPoRM8dMgCywFz0ZbAfA6A`, Competitive Analysis: LinkedIn 353:431, GetMeReferred 353:417, EasyRefer 353:418,
Instahyre 353:435.

---

## v1 · reconstructed from FigJam

**Student:** Devansh Somvanshi · **Version:** v1, reconstructed · **Type:** new concept

**Reconstructed, not written now.** Every line below is copied or condensed from Devansh's FigJam
(`CPoRM8dMgCywFz0ZbAfA6A`: Context, Scope Definition, Problem Hypotheses, Success Metrics), made before this redo.
Nothing new is added. Where the original had no line, it says so. v2 gets written after the notes are made sense of.

## The bet

| | |
|---|---|
| **Product** | A new referral platform for India tech hiring (0→1 concept, mobile first) |
| **The moment** | Not one moment. FigJam's in-scope list holds four: a candidate finding referrers, the referral request, the referrer's decision and submission, and shared tracking up to the interview stage |
| **Who** | Job seekers asking for referrals (0–5 years' experience) and employees willing to refer (mid-level, tech roles). Recruiters secondary. A demographic, not a person in a situation |
| **The guess** | Not written as one guess. FigJam lists 14 hypotheses, all "yet to validate", and a problem statement that names five problems at once (trust, decisions, a broken flow, no visibility, spam). guessing |
| **The number** | "Accepted referral requests / active user" (FigJam, North Star). guessing |
| **Guardrail** | None written |

## What could prove this wrong

Not written.

## Not in this project (from FigJam)

- Full ATS or recruiter tools
- Interview process design
- Resume building and job prep
- Company-side hiring workflows
- Payment or referral bonus system (deep integration)

## Used for sorting the notes

Because v1 has no single moment, the notes in `RESEARCH.md` are sorted against the span FigJam covers:
**from a candidate deciding to ask an employee for a referral, to knowing what happened to that referral, up to the
interview stage.** Anything about interviews, HR decisions or why people seek referrals at all is out of scope.

## Open

- One moment, not four. v2 must pick
- A falsifiable guess, a number that moves inside that moment, and a guardrail
- The business lens (how this makes money) is missing; RedBus's artefacts start with it
- The mentor's critique (LOG.md): referrers have little reason to join a new app. v2 must answer it
