# SCOPE

**Student:** Devansh Somvanshi · **Date:** 17 Sep 2026 · **Version:** v2 (v1 kept below)
**Type:** feature added to an existing product

**Draft.** Written from the chosen problem statement in RESEARCH.md. The lines marked guessing are the ones most likely
to be wrong.

## The bet

| | |
|---|---|
| **Product** | LinkedIn |
| **The moment** | A candidate asking an employee they don't know for a referral to one specific job, until the candidate hears what happened to it |
| **Who** | Someone a few years into their career (engineering, design, PMO) who has found a job at a company where they know nobody, and is about to message its employees on LinkedIn. And the employee who gets that message, and has to put the candidate into their company's referral portal |
| **The guess** | Employees drop strangers' referral requests mainly because the request makes them do the candidate's work (find the job ID, chase the city, date of birth and gaps, judge fit from a resume), not because they won't help a stranger. A request that arrives complete gets referred more often. And the outcome can reach the candidate at almost no cost, because the referrer already sees it. **worked it out** for the cause, **guessing** for "referred more often" |
| **The number** | Referral rate on requests to people the candidate doesn't know: % of those requests the employee submits to their company's portal. **guessing** |
| **Guardrail** | Employees who turn off referral requests must not rise. A feature that makes asking easier can flood the people it depends on. **guessing** |

## Why LinkedIn, and not its own app

**Chose:** a feature inside LinkedIn.
**Rejected:**
- **A new app of its own** (old Sidedoor). It needs both sides to sign up, and C4 shows referrers have little reason to
  help strangers at all, let alone install something new. This is the mentor's critique, and the notes back it.
  Candidate 2 found the referral communities on Fishbowl so quiet a message might be seen "next week" (n28), which is what a
  separate place for referrals looks like. **worked it out**
- **A link the referrer shares, where candidates fill in their own details** (Referrer 1's idea, n66). It only helps
  once a referrer has already agreed, so it does nothing for the candidate whose message is never read (C1). Kept as an
  idea for molades-ideate, not as the place the product lives. **worked it out**

**Because:** all four people already do this on LinkedIn. Candidates find the job there and message employees there
(n04, n07, n09, n29). Referrers get strangers' requests there (n49, n68, n69). A feature meets both sides where they
already are, and needs nobody to join anything. **saw it**

**What this costs:** LinkedIn can't see inside a company's referral portal either (n46), so the status still has to come
from the referrer. And a portfolio concept for LinkedIn can't use LinkedIn's real data. **worked it out**

## Business lens

**Not verified, guessing throughout.** RedBus's case study starts with how the company makes money. For LinkedIn this
needs publicly reported figures with a source link before any of it goes on the page. What to find out:
- how LinkedIn makes money from hiring, and whether better referrals help that or compete with it
- whether LinkedIn already has anything for referrals, from real screenshots (the FigJam competitor section has LinkedIn
  screenshots to read first)

## What could prove this wrong

If employees who receive a complete request, with the job ID, the portal's fields and the fit shown, still don't refer
strangers, then the cause is motivation (C4), not the work, and the guess is dead. **This cannot be tested now: no more
interviews or tests are planned.** It goes into the case study as the thing a real test would check first.

## Not in this project

1. The company's referral bonus, how much and when it's paid (n87, n62). No product controls it
2. Connecting to company referral portals like Workday. LinkedIn has no access (n46)
3. Interviews and HR decisions after the referral, including HR not telling rejected candidates (n86, n88)
4. Candidates who take a referral and don't join (n89, n90)
5. Recruiters. No real data

## Open

- The moment covers sending the request and hearing the outcome. If it has to be one thing, the upstream half, sending
  the request, wins, and the outcome goes on the not-in-this-project list
- The number and guardrail need a baseline nobody has. Concept targets, labelled so
- Business lens to research, with sources
- Landscape: what LinkedIn and others already do for referrals, from screenshots, not memory

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
