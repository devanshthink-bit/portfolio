# BUSINESS

**Project:** Sidedoor · **Written:** 17 Sep 2026 · **Status:** draft

The business side of Sidedoor, built with the mentor's Product Anatomy slides (PAM04 L01 North Star Metric, L02 The NSM
Trap, L03 Input vs Output Metrics, L04 Business Model → Strategy → Design, PAM05 L03 Growth Loops), in the shape the
RedBus artefacts page uses: the business lens up front, the chain and the loops after the brief.

**Honest order:** RedBus wrote its business lens before research. Sidedoor's is written after, from the problem
statement. The case study says so.

**How sure:** nearly everything here is **worked it out** or **guessing**. There is no live product and no market data
yet. Any number that goes on the page needs a source link first (see *Figures to source*).

---

## 1 · Business model

*"How does this company make money, and who pays?"* (L04)

### What kind of business this is

**A two-sided marketplace.** Candidates on one side, employees who refer on the other. The slides' table (L04, p11):
marketplace → primary design pressure is **both sides' success** → good design means **trust, transparency, mutual
value visibility**.

For Sidedoor the scarce side is the **referrer**. There are far more people asking for referrals than employees
willing to give them (C1: most strangers never reply; C4: referrers have little reason to help). A marketplace is
limited by its scarce side, so every business decision protects referrers first. **worked it out**

### Who pays · decided, draft

| Phase | Who pays | For what |
|---|---|---|
| **1 · Build both sides** | Nobody. Free for candidates and referrers | Liquidity first. A paywall on an empty marketplace blocks the people it needs |
| **2 · Companies** | Employers | A steady pipeline of complete, well-matched referrals, and referral data they don't have today (which roles get referrals, how many reach interview). Companies already pay for referrals through their own bonus schemes (n62, n87) |
| **Candidates, optional** | Candidates | Tools that help *them*: seeing how well they fit a role before asking, profile feedback. **Never** access to referrers, priority in a referrer's list, or more requests |

**Rejected:**
- **Candidates pay to see or reach referrers** (V2's Premium screen: "Referrers want to connect with you… Subscribe").
  It sells access to the scarce side. Candidates with money jump the queue, referrers get worse candidates, and trust in
  the list drops. Devansh's own FigJam called this "pay-to-play bias" when criticising GetMeReferred. **worked it out**
- **Referrers pay.** They are the side with the least reason to take part (C4). Charging them kills supply. **worked it out**
- **Ads.** Ad models push for time spent in the app (L04, p11). Sidedoor's value is the opposite: a referral done in
  minutes. **worked it out**

### Premium · decided 17 Sep 2026

> **Update, 17 Sep 2026 · Devansh: drop Premium for now.** No paid candidate tool in V3. The rule below still holds:
> if candidates ever pay, it is only for tools that help themselves, never access to referrers. Revenue for now is
> Phase 2, companies. Reason for dropping: the free app already shows the match on every job, so a paid tool would
> need to be something new (e.g. match on any job link, or fix tips). Not worth designing before the core works.

**Candidates can pay only for tools that help themselves. Never to reach, see or jump ahead of referrers.**
Devansh asked for the decision with its reasoning; this is it.

**Why, in order of weight:**
1. **A marketplace is only as good as its scarce side.** Referrers are scarce. If candidates can pay to reach them, the
   thing being sold is referrers' attention, and referrers get more requests from people who paid instead of people who
   fit. The quality promise breaks, referrers leave, and there is nothing left to sell. **worked it out**
2. **Paying doesn't change a referrer's rule.** Samarth refers on skills and experience match (n50); Riya on whether the
   job ID was shared (n76, n77). A paid badge moves neither. So a paying candidate still gets dropped, and has now paid
   to hear silence. That costs trust, not just a refund. **worked it out**
3. **Tools for the candidate raise request quality, which is what the North Star needs.** A fit check before asking
   (C5; Samarth asked for a match percentage, n23) and profile feedback help the candidate send better requests. Better
   requests mean more referrals submitted. The paid feature pushes the same way as the strategy instead of against it.
   **worked it out**
4. **The people who gain most from better referrals already pay for referrals: companies** (bonuses, n62, n87). They are
   the natural payer once both sides are on the platform. **guessing** that they would pay a platform

**What it costs:** less candidate revenue early, and a longer road to revenue overall. Candidate tools are a smaller
product to sell than access. Accepted, because selling access would sell the one thing the marketplace can't replace.

**What changes in Figma V2:** the Premium screen ("Referrers want to connect with you… See who's referring you.
Subscribe") becomes a candidate tool, for example seeing how well you fit a role before you ask. Settled in molades-brief.

### Say it in an interview

> "Referrers are the scarce side of the marketplace, so I never sell access to them. If candidates could pay to reach
> referrers, referrers would get requests from people who paid rather than people who fit, and they'd leave. Paying
> doesn't change a referrer's rule anyway: they refer on skills match or a shared job ID. So candidates pay only for
> tools that help them send a better request, like checking their fit before asking. That pushes the same number the
> product is built on. The natural payer long term is the company, which already pays referral bonuses."

**The follow-ups you'll get, and the answer:**

| Question | Answer |
|---|---|
| "If it's free, won't candidates spam referrers?" | Spam is controlled by request limits (Idea 3) and complete-request rules, not by price. A price filters for money, not fit |
| "Why would a candidate pay for a fit check?" | Samarth asked for exactly that (n23). Whether enough people pay is unproven, and I'd say so. It's the first thing to test |
| "Isn't revenue too late if companies pay only in phase 2?" | Yes, it's later. A two-sided marketplace has to have both sides before anyone pays for it. Charging early would block the side it can least afford to lose |
| "GetMeReferred charges candidates. Why not you?" | Their model is the pay-to-play bias I noted in my competitor analysis. I chose to protect the referrer's queue instead. Before saying this in a room, check GetMeReferred's current pricing page |

**Why companies:** they are the ones that already value referrals enough to pay bonuses for them, and the thing Sidedoor
improves (complete, matched referrals) is what they want more of. **guessing** that companies would pay a platform;
needs sourced evidence of what companies spend on referral programmes.

---

## 2 · Product strategy

*"What does this company believe about how to win?"* (L04). Not the roadmap, the directional choice.

### The bet: **quality-as-identity**

**Every request that reaches a referrer is complete and a real fit.** A referrer can open any request on Sidedoor and
submit it in minutes, without chasing a single detail. That is the promise, the way ten-minute delivery is Zepto's.

**Why this bet:** it is the problem statement turned into a promise. Referrers drop requests because the request hands
them the candidate's work (C2, n76), and they help when a candidate has done that work (n77). If every request on
Sidedoor arrives done, the referrer's reason to ignore strangers shrinks. **worked it out**

**What it costs:** candidates do more work before they can ask, and they can ask fewer people. Some will find that slower
than a LinkedIn DM. Accepted, because a DM that nobody reads is slower still (C1).

### What the strategy says to the design · decisions that follow

1. A request **can't be sent incomplete**. The job ID and everything the referrer's portal needs are filled from the
   candidate's profile before sending (C2, n57 n59 n60 n67 n71 n73 n75)
2. Referrers see **only candidates who match their roles** (Idea 1, AI curation), not a feed of everyone (n65)
3. Candidates get **a limited number of requests** (Idea 3). Protects the scarce side, keeps the promise believable
4. **The outcome travels back** to the candidate from what the referrer already sees, at almost no extra work (C3, n58 n83)

### Design that would contradict the strategy · checked against Figma V2

The slides' test (L04, p6–p8): a well-made screen that works against the strategy is worse than a plain one that serves it.

| V2 design | Advances, neutral, or contradicts? | Why |
|---|---|---|
| Resume upload that fills the profile (Onboarding) | **Advances** | Makes complete requests cheap for the candidate |
| Referrer uploads the job description (Onboarding, Manage posts) | **Advances** | The job ID and role details are there before any request |
| Swipe cards: Request Referral / Skip, Refer Candidate / Skip (Explore) | **Contradicts, likely** | Swiping is built for volume. Quality-as-identity wants fewer, better requests |
| Premium: pay to see referrers who want to refer you | **Contradicts** | Sells access to the scarce side (see Business model, rejected) |
| Referrer updates five status stages by hand (Update flow) | **Contradicts** | Adds work to the side whose work is the problem (C2, C4) |
| In-app messaging (Messages) | **Neutral, with a risk** | Useful, but it can bring back the chasing for details that the request is meant to remove |
| Candidate tracking timeline (Tracking) | **Advances** | The outcome travels back (C3) |

These go to molades-brief, flow by flow. Contradicting doesn't mean delete; it means change it or defend it.

---

## 3 · North Star Metric

*"The number that proves value was delivered."* (L01) Not revenue, not activity: the value exchange.

### The value exchange

A candidate who fits gets referred by an employee they didn't know, and the employee didn't have to chase anything to
do it.

### NSM · draft

**Referrals submitted per active referrer per month.**

A referral counts when **either side** confirms it was submitted to the company's portal: the referrer marks it, or the
candidate marks the company's confirmation email. Changed 17 Sep 2026: counting only the referrer's mark would undercount,
because referrers have little reason to come back and mark it (Devansh's critique; BRIEF.md main path). An active referrer is one
who opened at least one request that month.

### The North Star checklist (L02, p12)

| Question | Answer | Result |
|---|---|---|
| Can it go up while users are unhappy? | Partly. Referrers could submit poor fits. Curation (Idea 1) and the guardrail below watch for it | Proceed, with a guardrail |
| Can marketing spend inflate it without the product improving? | No. It's per active referrer. More sign-ups don't raise it; only referrers finding requests worth submitting do | Proceed |
| Does it measure value delivered, not activity? | Yes. A submission is the moment both sides get what they came for | Proceed |
| Would a fall predict a business problem? | Yes. Fewer referrals per referrer means fewer hires for companies to pay for, and referrers drifting away | Proceed |

### Why per referrer, not total

The scarce side is the referrer. Depth among referrers who stay (L01, Zerodha: trades per active user) says whether the
product is worth their time. A total count could rise from sign-ups alone.

### Vanity metrics, rejected (L02)

| Looks like a North Star | Why it isn't |
|---|---|
| Downloads, sign-ups | Top of the funnel. Can rise from a campaign while nobody gets referred |
| **Requests sent** | Can rise because candidates spam. That is the problem Sidedoor exists to fix |
| Swipes or matches (V2) | Activity. A match that never becomes a submission delivered nothing |
| Profile completion (V2's four-step onboarding) | Can be forced by onboarding. The slides' own example (L02, p5) |
| Messages sent | Can rise because details are still being chased, which means the product failed |

---

## 4 · Input and output metrics

*"Own the input. Understand the output. Trace the chain."* (L03)

### Input metrics · what the design owns

| Category (L03, p7) | Input metric | Side |
|---|---|---|
| **Activation** | % of new candidates who send a first **complete** request within 7 days | Candidate |
| **Activation** | % of new referrers who submit a first referral within 14 days of receiving a request | Referrer |
| **Engagement** | **Request-to-referral rate:** % of requests the referrer submits (the number on SCOPE.md v2) | Both |
| **Engagement** | % of requests that arrive with every field the referrer's portal needs | Candidate |
| **Retention** | % of referrers who submit again within 30 days | Referrer |
| **Retention** | % of candidates who open their request status without a notification | Candidate |

### Output metrics · influenced, not owned

- Referral-to-interview rate (as referrers report it)
- Time from request to submission
- Referrer 3-month retention
- Company revenue (phase 2)

### Guardrail

**Referrers who turn off requests or leave must not rise.** A product that makes asking easier can flood the people it
depends on. Paired with a second watch: **% of requests left unanswered after 7 days must not rise** (C1, silence).

### The causal chain · draft, confirmed in the brief

Design decision → input metric → output metric → NSM (L03, p4 and p12).

| Design decision | Input metric | Output metric | NSM |
|---|---|---|---|
| A request can't be sent without the job ID and the portal's fields, filled from the profile | % of requests arriving complete | Request-to-referral rate, time to submission | Referrals submitted per active referrer per month |
| Referrers see only candidates matched to their roles (Idea 1) | % of shown candidates a referrer opens | Request-to-referral rate | Same |
| The referrer's portal status reaches the candidate in one tap | % of requests closed with an answer | Candidates re-asking the same referrer; referrer retention | Same |
| A link referrers send to strangers who DM them (cold start) | % of link visitors who complete a profile | New candidates who arrive already complete | Same |

**The trap to avoid (L03, p10):** an input that rises without moving the NSM is noise. More complete requests only
matter if referrers submit more of them.

---

## 5 · Growth loops

*"Which loop does this feature belong to? If none, reconsider its priority."* (PAM05 L03)

### Loop 1 · Acquisition, candidates arrive through referrers

A referrer gets a LinkedIn DM from a stranger → sends their Sidedoor link instead of replying with questions → the
candidate (not a user yet) opens it and fills in their details once → the referrer gets a complete request → the
candidate now has a Sidedoor profile they reuse for their next ask (n66, "universal candidate profile") → they ask the
next referrer through Sidedoor.

- **Where design has the most leverage:** the screen the candidate sees when they open the link. Like PhonePe's payment
  link (slide p5), it's seen by someone who has never used the product. If it asks too much, the loop breaks
- **Loop metric:** link-to-completed-request rate
- **Backed by:** n66 (Samarth (as referrer) asked for this link). **guessing** that referrers will send it

### Loop 2 · Acquisition, referrers arrive through candidates

A candidate asks an employee who isn't on Sidedoor → the employee gets a complete request as a link → submits it without
chasing anything → sees the next request is just as complete, and joins.

- **Where design has the most leverage:** the referrer's first request screen, before they've signed up
- **Loop metric:** % of invited referrers who submit and then join
- **guessing**

### Loop 3 · Engagement, the outcome brings both sides back

A referrer submits → the status they already see reaches the candidate → the candidate returns to check, without a
notification, and sends their next request to a matched referrer → the referrer's record ("3 of your referrals reached
interview") gives them a reason to open the next request.

- **Where design has the most leverage:** the output surfaces, the candidate's status screen and the referrer's record
  (slide p7: the analytics are the loop, not the input form)
- **Loop metric:** return visits to status without a notification
- **Backed by:** C3 (n25 n34 n35 n41), n58 n83. **worked it out**

### Loop 4 · Monetisation, later

Submitted referrals and their reported outcomes → better matching (Idea 1 learns which fits reach interview) → referrers
get better candidates → more referrals per referrer → companies pay for that pipeline and its data → more referrals.

- **Where design has the most leverage:** the company-facing offer, and whether matching visibly improves for referrers
- **Loop metric:** offer-to-conversion for companies
- **guessing**, phase 2

### Features outside any loop

To check in the brief. From V2, candidates for "reconsider priority": the Saved lists, Switch role, and Premium as
designed.

---

## Figures to source before anything goes on the page

- What companies spend on employee referral bonuses and programmes (India, tech)
- Share of hires that come from referrals, and time-to-hire and retention for referral hires. The desk research has
  figures (5–10×, 29 days, 46%) with no source links
- How many referral platforms exist and what they charge (GetMeReferred, EasyRefer, Jumbl, Instahyre, Cutshort), from
  their own pages
- Whether companies already pay any platform for referrals

## Where each part goes in the Sidedoor HTML, like RedBus

| RedBus artefacts section | Sidedoor |
|---|---|
| 01 · The Business Lens | §1 Business model, §2 Strategy, §3 North Star with the checklist |
| 10 · Design Brief (success metric, guardrail) | §4 input metric and guardrail |
| 11 · The Chain and the Loop | §4 causal chain, §5 loops |
| New for Sidedoor | §2 "V2 designs against the strategy" table, §3 vanity metrics rejected |
