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
- **The referrer gets value before anyone else joins.** The referrer's biggest pain is data entry, and Referrer 1 asked
  for exactly this: "a link is sent to the candidate to fill out their own personal details, which would cut the
  referrer's effort by 50%" (n66). A referrer can use that with candidates who have never heard of Sidedoor. So the
  supply side has a reason to come that doesn't depend on the network already existing. **worked it out**
- **Both candidates asked for a dedicated place.** Candidate 1: a place "where you know the other person is open to
  doing it" (n24). Candidate 2: one place where "I can just see in this company, I asked this person referral for" (n45).
  **saw it**, as wishes, which are the weakest kind of evidence

**The risk, stated before anyone asks:**
- All four people ask and get asked on LinkedIn today (n04, n07, n09, n29, n49, n68, n69). Sidedoor has to pull that
  moment out of LinkedIn, or start from a link shared inside it
- Candidate 2 says the referral communities on Fishbowl are so quiet a message might be seen "next week" (n28). A
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
- **Who pays, and for what.** V2 designs a Premium that candidates pay for. Candidate 2's own framing is that referrers
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
- Landscape: what GetMeReferred, EasyRefer, Jumbl, Instahyre, LinkedIn and others already do, from the FigJam screenshots

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
