# BRIEF

**Project:** Sidedoor · **Updated:** 17 Sep 2026

The shape, screens and states come next, in molades-brief. This file starts with the AX Spec from molades-ai, because
Sidedoor has a model inside it (Idea 1, the AI matching Devansh and Samarth discussed, n92).

**Idea labels continue from SCOPE.md.** Idea 1–4 are there. Ideas in this file start at Idea 5.

---

# AX SPEC · draft 1

**Draft by AI, for Devansh to change.** Every material fact is a guess, labelled. Nothing here has been tested.

## Step 1 · Where the intelligence belongs, and where it adds nothing

The three final jobs (RESEARCH.md): **J1** asking where it will be read, **J2** knowing what happened, **J3** referring
a stranger in minutes.

| What a model can do | Where in Sidedoor | Does it add anything? |
|---|---|---|
| **Pull out / convert** | Read the candidate's resume into the fields a referrer's portal needs; read the referrer's job description into job ID, location, experience range, skills | **Yes, the most.** Samarth types skills from the resume into the portal by hand (n60) and chases details (n59). V2 already designs this upload (Onboarding) |
| **Sort** | Order a referrer's requests by how well each fits the job, using the referrer's own rule | **Yes.** Samarth checks fit by hand against a rule (n50) and asked for "an automated matching score" (n65). Nobody shows fit to referrers (Landscape, gap 3) |
| **Shorten** | A one-line reason a candidate fits, on the request card | **A little, with a risk.** A written summary can state things the resume doesn't. Showing the matched items themselves does the same job without inventing anything |
| **Generate** | Write the candidate's request message | **Nothing. Harmful.** Riya acts on the job ID, not the prose (n76 n77). A generated pitch makes every request read the same, and it is the free-text box the landscape says not to inherit |
| **Guess ahead** | Tell a candidate their chance of being referred or hired | **Nothing yet.** A concept has no outcome data to predict from. Instahyre shows "chances are high" with no visible basis; not copied |
| **Talk** | A chat assistant | **Nothing.** Both sides have one short task, not a question to ask |
| **Act** | Send requests to several referrers automatically, or decline low fits for the referrer | **Harmful.** Auto-sending is the volume the strategy is against. Auto-declining puts a referrer's name on a decision they didn't make, and Samarth sometimes refers a borderline match on purpose (n53) |
| — | **Passing status back** to the candidate | **Nothing.** The model can't see the company's portal (n46). The referrer can (n58 n83). It is one tap, not intelligence |
| — | **Request limits** | **Nothing.** A rule, not a model |

**So the model does two jobs: turning documents into fields (both sides), and ordering requests by fit with the reasons
shown (referrer side).** Everything else is plain product. The same fit check can be shown to candidates as the Premium
tool (BUSINESS.md), but LinkedIn already does that (Landscape), so it is secondary.

## Step 2 · How much it does on its own

### The fit ordering, referrer side

| Level | What it would mean | Verdict |
|---|---|---|
| **The person does it** | The referrer reads every request and resume and applies their own rule (today, n50 n56) | Benchmark. The model earns its place only if it saves that reading |
| **The model suggests** | Every request shown in arrival order, each with a fit breakdown | Rejected. The referrer still has to scan the whole list to find the strong ones |
| **The model does it, the person checks** | Requests ordered by fit; strong matches first; lower matches collected under "Lower match", **still visible and still referable**; the referrer decides every one | **Chosen** |
| **The model just does it** | Only matched candidates ever reach the referrer; low fits are declined or hidden automatically | Rejected. A hidden request is silence for the candidate, which is C3. A declined request carries the referrer's name without their decision. And Samarth refers borderline matches on purpose (n53) |

**Note on Devansh's idea (n92, "only showing curated candidates"):** kept as ordering, not hiding. **Confirmed by Devansh, 17 Sep 2026: "visible but collapsed".** The referrer sees the
curated candidates first, and nothing is thrown away where they can't see it.

### Turning documents into fields, both sides

**Chosen: the model does it, the person checks.** The resume or job description fills the fields; the candidate or
referrer reviews them before anything is sent or posted. "The model just does it" is rejected because a wrong field
would go straight into a referrer's portal under the referrer's name.

## Step 3 · What it looks like, without a chat box

Eight surfaces for fit on the referrer's side:

- **Idea 5** · A fit breakdown on each request card: "4 of 6 skills · 3 yrs (you need 2–5)"
- **Idea 6** · The request list ordered by fit, with "Lower match" collapsed at the bottom
- **Idea 7** · A portal-ready panel: every field the referrer's portal asks for, filled, each with a copy button
- **Idea 8** · Filter chips on the request list built from the referrer's own rule: "Meets your experience rule"
- **Idea 9** · The referrer's rule set once ("Experience must match", "At least half the skills"), applied to every request
- **Idea 10** · One request at a time, yes or no, like a swipe
- **Idea 11** · A nudge only when a strong match has waited two days, and nothing otherwise
- **Idea 12** · The job description and the resume side by side, matching lines highlighted

**Chosen:** **Idea 6** (the ordered list) with **Idea 5** on every card and **Idea 7** inside a request. **Idea 9** as a
light setting, because Samarth's rule is explicit (n50) and a fit breakdown that uses the referrer's own rule is easier
to trust than one that uses the model's.

**Rejected:** **Idea 10**, one-at-a-time swipe (V2's Explore pattern): judging a person in one gesture is built for
volume, and the landscape lists it under do-not-inherit. **Idea 12**: useful but slow, better as a detail view than the
main surface. **Idea 8** duplicates Idea 9. **Idea 11** kept for later, it belongs to the engagement loop, not the fit.

**Why not a chat box:** the referrer has one decision per request and needs the evidence on the card, not a
conversation to extract it.

## Step 4 · The model as a material · all guesses

| Fact | Guess | What it does to the design |
|---|---|---|
| **Takes time** | Reading a resume or job description: a few seconds, sometimes longer. guessing | Upload shows fields filling in as they're found, and the rest of the form stays usable. Fit is worked out **when the request is sent**, not when the referrer opens it, so the referrer's list is instant |
| **Costs money per go** | Small per document, not free. guessing | Read each document once and store the fields. Work out fit once per request. Never re-run on scroll, open or refresh |
| **Forgets** | Doesn't matter here | Nothing depends on a conversation. The output is stored fields and a stored breakdown |
| **Not the same twice** | The same resume could produce a slightly different breakdown | Compute once and store it. Show "Fit checked on 12 Sep", so the referrer and the candidate see the same thing |
| **Sometimes confidently wrong** | It will misread a field or claim a skill match that isn't there. guessing, but certain to happen sometimes | Show the matched items and where they came from, never a bare score. Let people correct it (Step 5, Step 6) |

**Decided with it:** no single score like V2's "9.4 Strong Fit". Counts the referrer can check ("4 of 6 skills") instead.
A decimal looks precise and isn't, and nobody can argue with it.

## Step 5 · When it's wrong · draft copy

| State | Where | What they see | The words on screen | What they can do |
|---|---|---|---|---|
| **Wrong** | Referrer's request card | The breakdown lists each matched skill, each linked to the resume line it came from | "Something off? Tap a skill that isn't really there." | Tap the skill; it's struck through and the count updates for this referrer. The correction is logged |
| **Wrong** | Candidate's filled profile | Filled fields marked as filled from the resume | "Filled from your resume. Check these before you send anything." | Edit any field inline |
| **Not sure** | Referrer's request card | No count at all, in place of the breakdown | "Not enough in their resume to judge fit for this job. Read it before you decide." | Open the resume; decide as they do today |
| **Slow** | Candidate uploading a resume | Fields appear one by one; the form stays usable | "Reading your resume. You can fill the rest while it works." | Keep going; nothing waits on it |
| **Won't, a rule** | Candidate sending a request | Send stays off, with the missing field named | "Add the job ID first. It's the first thing a referrer needs." | Add it. Clearly a rule, not a fault |
| **Won't, a fault** | Candidate uploading a resume | The upload stops, with a way round | "We couldn't read this file. Try a PDF with text you can select, or fill in the details yourself." | Re-upload, or fill manually |
| **Half done** | Candidate's filled profile | The fields found, and the ones still empty, in their own group | "Filled 9 of 12. The last 3 aren't usually on a resume, but referrers' portals ask for them." | Fill the 3 by hand |
| **Out of date** | Referrer's request card | A note above the breakdown | "Checked on 12 Sep. They updated their profile since. See what changed." | Open the changes; the fit is re-checked once |
| **Out of date** | Referrer's request list, after editing the job | A banner above the list | "You changed this job. Fit for these requests has been checked again." | Nothing; the order has updated |

## Step 6 · How somebody stays in control

**The three that matter most here:**

| | How it works | Where it appears |
|---|---|---|
| **Where did this come from** | Every filled field and every matched skill links to the line of the resume or job description it came from | Candidate's review screen; referrer's request card |
| **Why did it do that** | The order is explained by the breakdown itself: matched skills, experience against the range, and the referrer's own rule if set (Idea 9). No hidden score | Referrer's request list and card |
| **Override** | The referrer can refer anyone, including "Lower match", and can strike out a wrong skill. The candidate can edit any filled field. The model never declines or sends anything | Request card; candidate's profile |

**Why the other five matter less here:**
- **How sure:** shown as the "Not enough to judge" state instead of a percentage, because a number would look more exact than the model is
- **Undo:** the model never takes an action that needs undoing; referring and declining are the referrer's own taps
- **Get a person:** both sides are already people talking to each other; there's no automated decision to appeal
- **What it remembers:** the only thing kept is the candidate's profile, which they can already see and edit
- **Teaching it:** corrections are logged (Step 8), but nothing promises the person that the model learns from them

## Step 7 · Who does what

| The model does → | The person decides → | What's left behind → |
|---|---|---|
| Reads the resume into fields | The candidate checks and fixes them | A complete candidate profile |
| Reads the job description into job fields | The referrer checks them, including the job ID | A live job post |
| Checks the request has every required field | The candidate chooses the job and sends (within their request limit) | A complete request |
| Works out fit against the job and the referrer's rule, once | Nothing | A stored fit breakdown on the request |
| Orders the referrer's requests by fit | The referrer opens, declines or refers each one | A decision. **A decline is sent to the candidate, never left as silence** |
| Fills the portal-ready panel | The referrer copies it into their company's portal and taps "Submitted" | A submitted referral; the candidate is told |
| Nothing | The referrer taps the stage when their portal shows it | The candidate's status updates |

**Where it stops and waits:** before any request is sent (the candidate), and before any request is referred or
declined (the referrer). Nothing moves without a person.
**What they can look at afterwards:** the candidate sees each request's decision and stage; the referrer sees their
decisions and what reached interview.

## Step 8 · Does it get better

**Signal picked up:**
- Which requests referrers refer or decline, against the fit shown. **Effort: none**, it's the decision they were making anyway
- Skills a referrer strikes out as wrong. **Effort: a little**
- Fields candidates change after the resume was read. **Effort: none**, they were checking anyway
- Stages referrers tap after submitting (reached interview or not). **Effort: a little**, and it's the same tap that tells the candidate

**Finding:** almost all of it comes free from decisions people already make. The weakest signal is the outcome, because
it depends on referrers passing status on (Landscape, gap 2).

## The riskiest thing I'm assuming

**That a resume and a job description hold enough to judge fit the way Samarth does.** If most requests land in "Not
enough to judge", the ordering helps no one.

**Cheapest way to find out:** give Samarth five real resumes for one of his open roles, once with the breakdown and
once without, and see whether his decisions match it and whether he decides faster. About an hour. **Not planned**
(no more research); it goes into the case study as the first test.
