# BRIEF

**Project:** Sidedoor · **Updated:** 17 Sep 2026

The shape, screens and states come next, in molades-brief. This file starts with the AX Spec from molades-ai, because
Sidedoor has a model inside it (Idea 1, the AI matching Devansh and Samarth discussed, n92).

**Idea labels continue from SCOPE.md.** Idea 1–4 are there. Ideas in this file start at Idea 5.

## Design Brief · the one-page version, for the HTML

The same four parts as RedBus's artefacts page (section 10). Everything below this section is the working detail
behind it, like RedBus's own 42KB BRIEF.md.

| | |
|---|---|
| **Domain + user segment** | Job referrals in Indian tech hiring · a candidate asking an employee they don't know for a referral to one job, and the employee being asked. Two people interviewed, each from both sides |
| **JTBD** | When someone I don't know asks me for a referral, I want everything my company's portal needs already there, so referring takes minutes and they find out what happened without me doing more |
| **Problem statement** | How might we let a candidate send a referral request a stranger can act on in minutes, and let the answer reach the candidate without asking the referrer for more work? |
| **Success metric** | Referral rate on requests to strangers: % the referrer submits. Guardrail: referrers turning off referral requests must not rise. Concept targets; no live baseline. North Star: referrals submitted per active referrer per month (BUSINESS.md) |

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

---

# THE PLAN · molades-brief, draft 1, 17 Sep 2026

**Draft by AI, parts of it wrong.** Figma V2 is treated as wireframes already drawn: its screens are read and mapped,
not redrawn. Where V2 already does the job, it's kept.

## The shape

The idea being shaped: **a request that arrives complete, status the referrer passes back, and match shown to the
referrer** (SCOPE.md v2, Landscape gaps 1–3; AX Spec above).

| Shape | What it is | Steps it adds | What has to be dropped | Who might never see it |
|---|---|---|---|---|
| **Its own screens** | A mobile app for both sides (Figma V2) | Candidates: sign up, build a profile once, then 3 taps per request. Referrers: sign up, post a job | Nothing; it holds everything | Every stranger who messages a referrer on LinkedIn and never installs anything |
| **A sheet over what's already there** | A web page the referrer's link opens, over the LinkedIn or WhatsApp chat the candidate is already in | Candidates: open link, fill once, send. No install | Tracking many requests, the job list, messaging: a one-off page can't hold them | Candidates who want to ask several people over weeks; nobody comes back to a link |
| **A change to a screen that already exists** | A referral step inside LinkedIn | Fewest | Sidedoor as a product | Nobody; but it isn't Sidedoor's to build, and Devansh rejected it (SCOPE.md v2) |

**Chosen: its own screens, with the sheet as the way in.** The app holds the full journey on both sides; the link page
is how a candidate who isn't on Sidedoor yet sends their first complete request (Acquisition loop 1, BUSINESS.md).

**Why the other two lost:**
- **The sheet alone** can't hold what C3 needs: somewhere the candidate comes back to see every request's status (n44
  n45). It's kept as the entry point, not the product
- **A change to LinkedIn** was decided against on 17 Sep (SCOPE.md v2)

**What it costs:** two surfaces to design and keep consistent, and the app's install is a real drop-off the link page
has to survive.

## Words we're using

| We call it | Not | Because |
|---|---|---|
| **referral request** | request referral, ask, match | Samarth says "referral requests" (n60 n61). "Match" is V2's word for an accepted request and it sounds like a dating app |
| **job ID** | job code, requisition | Riya's word, every time (n70 n76), and Riya (as candidate) sends "the job ID" (n38) |
| **portal** | ATS, system, Workday | Both say "portal" (n56 n71 n83). Nobody in the interviews said ATS |
| **match** | fit score, strong fit, 9.4 | Samarth: "skill match" (n50), "matching score" (n65). Shown as "4 of 6 skills match", never a decimal |
| **Submitted · In interviews · On hold · Selected · Not selected** | Referral submitted, Under review, Interview scheduled, Interview in progress, Final decision | The words on their portals: Riya's "Application submitted", "round one, round two", "selected or not selected"; Samarth's "on hold" (n58 n84; raw transcripts). Five stages instead of V2's six, and none a referrer can't see on their portal ("Under review" isn't shown to them, n84) |
| **Not moving forward** | Rejected, Declined | For a referrer's decision before the portal. Samarth tells candidates "we are not moving forward" (n54); it names the decision without blame |

**One thing, one word, everywhere.** A stage is "In interviews" on the candidate's timeline, the referrer's update sheet,
and every notification.

## Screens

**Both sides**
- **Welcome** · the place where someone signs in
- **Choose your side** · the place where someone says whether they're asking or referring
- **Messages** · the place where a candidate and referrer talk after a referral request is accepted

**Candidate**
- **Your profile from your resume** · the place where a resume becomes the details a referrer's portal needs
- **Jobs** · the place where you find jobs someone at the company will refer for
- **Job** · the place where you decide whether to ask for this one
- **Check your referral request** · the place where you see exactly what the referrer will get, before it's sent
- **Your referral requests** · the place where every request's status lives
- **Referral request** · the place where one request's timeline lives

**Referrer**
- **Post a job from its description** · the place where a job ID and role become a job post
- **Your job posts** · the place where you pause, edit or close posts
- **Referral requests for this job** · the place where requests wait, ordered by match
- **Referral request (referrer)** · the place where you decide: refer, or not moving forward
- **Your referrals** · the place where you pass on each referral's stage

**Link page (web, no install)**
- **Ask [referrer] for a referral** · the place where someone who messaged a referrer sends a complete referral request

**Cut from V2, with reasons**
- **Swipe cards, both sides (Explore)** → the candidate's cards become the **Jobs** list; the referrer's candidate cards
  become **Referral requests for this job**. Swiping is built for volume (BUSINESS.md, Landscape do-not-inherit). The
  card designs are reused, not thrown away
- **"Referral Accepted" full-screen match (Match)** → folded into the request's timeline. A referral isn't a match; the
  job isn't done until it's submitted
- **Premium "Referrers want to connect with you"** → **cut** (17 Sep: Devansh dropped Premium for now; BUSINESS.md, Premium)
- **Referrer browsing candidates who didn't ask** → not in this project. It needs candidate consent the research never
  touched, and it's the open-inbox problem the other way round
- **Four-step manual profile and job creation** → one review screen each, filled from the document (AX Spec)

## Where they hang off the existing product

Not applicable: Sidedoor is its own product. What it touches outside itself:
- **LinkedIn and WhatsApp chats:** the referrer pastes their link page there when a stranger messages them
- **The referrer's company portal:** the referrer leaves Sidedoor to submit there, with the portal-ready fields copied

**Not adding:** anything that reads or writes the company's portal (no access, n46).

## What's on each screen

The screens that carry the problem statement get the full breakdown. Screens kept from V2 unchanged are listed at the
end with one line.

### Check your referral request · candidate
**This screen is for:** seeing exactly what the referrer will get, before it's sent.

Information, in priority order
1. **What's still missing**, and why the referrer needs it ("Preferred interview locations. Their portal asks for it.") · component · has states: nothing missing, some missing
2. **The job and its job ID**, taken from the post · static
3. **The details going to the referrer**: name, contact, current city, total and relevant experience, notice period, career gaps, date of birth, preferred locations, resume · component · repeats · each editable
4. **How you match**: "4 of 6 skills match · 3 yrs (they need 2–5)" · component · has states: not enough to judge
5. **A short note, optional**, one line · component
6. **Requests left this week**: "2 of 5 left" · component · has states: none left
7. **Send** · component · off until nothing required is missing

Not here
- A long message box → the landscape's do-not-inherit (n76)
- Other jobs → on Jobs
- The referrer's profile → on Job

### Referral requests for this job · referrer
**This screen is for:** seeing which requests to open first.

Information, in priority order
1. **Requests that match**, ordered by match · component · repeats
2. On each: **name, current role, "4 of 6 skills match", experience against the range, sent when** · component
3. **"Lower match"**, collapsed, with its count · component · has states: none
4. **The job and its job ID** · static
5. **Your rule**, if set ("Experience must match") · component

Not here
- The candidate's full details → on Referral request (referrer)
- Other jobs' requests → one job at a time, from Your job posts
- A match score out of 10 → never (AX Spec)

### Referral request (referrer) · referrer
**This screen is for:** deciding whether to refer this person for this job.

Information, in priority order
1. **How they match**, item by item, each linked to where it came from · component · has states: not enough to judge, out of date
2. **Refer** and **Not moving forward** · component
3. **Portal-ready details**, each with copy, in the order a portal usually asks · component · appears after Refer
4. **Resume** · component
5. **Their note**, if any · static
6. **"Mark as submitted"** · component · the last tap of the Refer task, right after copying; clears the request from their waiting list

Not here
- Messaging → opens only after Refer
- A reason field that's required → reasons are optional chips, so saying no costs one tap

### Your referrals · referrer
**This screen is for:** passing on each referral's stage.

Information, in priority order
1. **Referrals waiting on an update**, oldest first ("Submitted 9 days ago. Seen it move?") · component · repeats
2. **Update**, one tap to the current stage · component · a sheet with the five stages, current one marked
3. **What your referrals reached**: "3 in interviews, 1 selected" · component · the referrer's record (Engagement loop)
4. **All referrals**, by job · component · repeats

Not here
- Six manual stages → five, and only the one they see now needs a tap (V2's Update Bottom Sheet, simplified)

### Referral request · candidate
**This screen is for:** knowing where one request stands.

Information, in priority order
1. **Where it is now, in words**: "Submitted on Infosys's portal on 12 Sep" · component · has states for every stage and for not moving forward
1a. **"Heard from the company?"** after Referred, if the referrer hasn't marked it: "Got an email saying your application was submitted? Mark it." · component · the candidate's own confirmation
2. **What happens next, and a typical wait**: "Interviews usually start within 2–3 weeks" · component · guessing until there is data; Riya's 2–3 weeks (raw, Q22)
3. **The timeline**: Sent · Referred · Submitted · In interviews · Selected / Not selected · component
4. **The referrer**: name, role, company · static
5. **Message** · component · only after Refer

Not here
- "Thank Referrer" as the main button → a small action after Selected (V2 kept, demoted)

### Your profile from your resume · candidate
**This screen is for:** turning a resume into the details a referrer's portal needs.

Information, in priority order
1. **Filled from your resume**, marked to check · component · has states: slow, half done, won't
2. **Still needed, not usually on a resume**: date of birth, career gaps, preferred interview locations, notice period · component
3. **Resume file** · component
4. **Save** · component

Not here
- Projects and a tagline → not needed by any portal the research saw; optional, later (V2 step 3 and 4 fields)

### Ask [referrer] for a referral · link page
**This screen is for:** a stranger sending a complete referral request without installing anything.

Information, in priority order
1. **Who you're asking, and for which job ID** · static · from the referrer's link
2. **Upload your resume** · component · fills the details
3. **The details the referrer needs** · component · same as Check your referral request
4. **Send** · component
5. **"Save these details and track this request"** → install the app · component · after sending

Not here
- Browsing jobs → in the app

### Kept from V2, unchanged in job
- **Welcome** (Login), **Choose your side** (Role Selection), **Post a job from its description** (JD upload, reduced to one review screen), **Your job posts** (Manage Posts), **Messages**, **Profile**, **Edit profile**. Their states: open, to check in molades-attack

## The main path

**A candidate asks a referrer they don't know, and learns it was submitted · 7 steps, 2 people**

Before it: the candidate's profile is built once from their resume.

1. **Candidate** · Jobs → taps a job → **Job**
2. Taps "Ask for a referral" → **Check your referral request**, details filled, job ID from the post
3. Adds anything still missing, taps Send → **Your referral requests**, status Sent
4. **Referrer** · notification → **Referral requests for this job**, the request near the top if it matches
5. Opens it → **Referral request (referrer)**, how they match
6. Taps Refer → portal-ready details appear; copies them into their company portal (**leaves Sidedoor**) and, as the
   last tap of the same task, "Mark as submitted" → the request leaves their waiting list
7. **Candidate** · notification → **Referral request**: "Submitted on [company]'s portal" · **job finished**

**If the referrer never marks it:** the candidate can. "Got an email from [company] saying your application was
submitted? Mark it." (Riya: "I and the applicant both receive an automated email", n72.)

**Changed 17 Sep 2026, after Devansh:** the old step 7 ("comes back and taps I've submitted it") is gone as its own
step. Devansh: "i think most referrers wont do this. why wud they care to update this for candidate"

**Cut from this path:** writing a message (optional one line), messaging before a decision, a "match" celebration
screen, choosing among six stages.

**Asked of Devansh:** which step could somebody skip the second time? Answered: the referrer's separate "I've submitted
it" step, because referrers have no reason to come back for it. Step 3 also mostly disappears on a repeat request,
since missing details are saved the first time.

## Other routes

- **Not moving forward:** referrer taps it, optionally a reason chip ("Experience doesn't match", "Skills don't match",
  "Role is closed", "Can't refer for this team") → the candidate sees it at once, with the reason if given
- **No reply in 7 days:** the candidate's request shows "No answer yet. You can withdraw it and ask someone else." A
  withdrawn request gives the request back
- **The link page:** a stranger messages a referrer on LinkedIn → the referrer pastes their link → the stranger sends a
  complete request from the web → it lands in Referral requests for this job like any other
- **Later stages:** once a week, a submitted referral asks the referrer "Seen it move?" (LinkedIn's "Did you hear back?")
  → one tap to In interviews, On hold, Selected, Not selected
- **Requests left: none:** Send is off with "You've used this week's 5. They come back on Monday."
- **Job closed:** open requests for it move to Not moving forward, reason "Role is closed", automatically, and the
  candidate is told

## When it's not perfect

### Check your referral request
- **Empty:** not applicable; it always opens from a job with a profile behind it
- **Loading:** the match is worked out when the request is sent (AX Spec), so nothing waits here. The profile filling is on Your profile from your resume
- **Error:** sending fails → "Couldn't send. Your details are saved. Try again." and a retry
- **Done:** lands on Your referral requests with this one at the top, "Sent to [referrer] · [job]"
- **Too much:** a long job title or company name wraps to two lines; the details list is long by design, grouped
- **Not allowed:** a required detail missing → Send off, the missing item named. No requests left → Send off, when they come back

### Referral requests for this job
- **Empty, new post:** "No referral requests yet. Share your link when someone messages you about this job."
- **Empty, all handled:** "You're through every request for this job."
- **Loading:** the list's shape before the data
- **Error:** "Couldn't load requests. Pull to try again."
- **Done:** not applicable; it's a list
- **Too much:** 40 requests on one job → the ones that match stay first; "Lower match" stays collapsed with its count. **Open:** whether to cap requests per job, not only per candidate
- **Not allowed:** a paused post → "This post is paused. Requests that already came in are still here."

### Referral request (referrer)
- **Empty:** not applicable
- **Loading:** not applicable; the match is stored
- **Error:** the copy button fails → the field stays selectable to copy by hand
- **Done:** after "Mark as submitted": "Marked as submitted. [Name] has been told."
- **Too much:** a resume with twenty skills → the match shows the job's skills only, not the resume's full list
- **Not allowed:** already referred by another referrer at the same company → **open**, the research doesn't say how portals handle a duplicate referral (Riya's six-month rule, n74, suggests the portal refuses it)

### Your referrals
- **Empty:** "No referrals yet. When you refer someone, you'll pass on their stage here."
- **Loading:** the list's shape before the data
- **Error:** an update fails → the stage goes back, "Couldn't update. Try again."
- **Done:** "Updated. [Name] can see it."
- **Too much:** a referrer with dozens of referrals → waiting-on-update first, the rest by job
- **Not allowed:** moving a stage backwards → **open**; LinkedIn refuses it ("You can't move this job to an earlier stage"), but a referrer's mistaken tap needs a way back

### Referral request · candidate
- **Empty:** not applicable
- **Loading:** the timeline's shape before the data
- **Error:** "Couldn't load this request. Pull to try again."
- **Done:** Selected → "Selected at [company]." and a small "Thank [referrer]"
- **Too much:** not applicable
- **Not allowed:** messaging before Refer → the Message button isn't there, and no disabled button is shown

### Your profile from your resume
- **States:** as the AX Spec: slow, half done, won't (a rule and a fault), wrong
- **Empty:** first time, no resume yet → "Start with your resume. We'll fill in what we can." and "Fill in myself"
- **Done:** "Your details are ready. Every referral request will use them."
- **Too much:** a very long work history → only what portals ask for is kept on this screen

### Link page
- **Error:** the referrer's link is old or the post is closed → "This job isn't open for referrals any more." and nothing to fill
- **Not allowed:** the same person sending twice to the same referrer for the same job → "You've already asked for this job."
- **Other states:** **open**

### Kept V2 screens
**Open**, to check in molades-attack.

## Not in this project

- **Anything a company or recruiter uses** (phase 2, BUSINESS.md)
- **Reading or writing a company's portal** (no access, n46)
- **Referrer rewards, like credits for accepting requests** (Landscape, open question 4)
- **Referrers browsing candidates who didn't ask**
- **Predicting a candidate's chance of being selected** (AX Spec)
- **Interview preparation and resume writing**

## What changes from Figma V2

Not "what breaks if this ships", since there's no product to break. Instead, what the V2 file has to change.

| V2 flow | Keep, change or cut | Why |
|---|---|---|
| Login | **Keep** | Does its job |
| Onboarding · role selection | **Keep** | Does its job |
| Onboarding · resume or JD upload, then four manual steps | **Change** to upload, then one review screen with "Still needed" fields | Portal fields a resume lacks were missing; four steps repeat what the document already filled (AX Spec) |
| Explore · candidate job cards (swipe) | **Change** to the Jobs list and Job screen | No swiping; add the job ID and "Ask for a referral" |
| Explore · referrer candidate cards (swipe) | **Change** to Referral requests for this job | Requests, ordered by match, "Lower match" collapsed; reuse the card design |
| Match · "Referral Accepted" screens | **Cut**, fold into the timeline | Not the finish; Submitted is |
| Match · Share Resume sheet | **Change** to the portal-ready details with copy | Carries what the portal needs, not just the resume |
| Messaging | **Keep**, open only after Refer | Stops chasing before a decision |
| Tracking · list and details | **Keep**, rename stages | Five stages in portal words |
| Update · list and five-stage sheet | **Change** to one tap for the current stage, weekly "Seen it move?" | Less work for the scarce side (BUSINESS.md) |
| Profile · Live / Paused | **Keep** | Lets a candidate stop receiving job suggestions |
| Manage posts, Edit | **Keep** | Does its job |
| Edit profile | **Change** to match the new profile fields | Same as onboarding |
| Premium | **Cut** for now | Sold access to referrers; replacement tool dropped for now (BUSINESS.md, Premium) |
| **New** | **Check your referral request**, **Your referrals' record**, **Link page** | The problem statement has nowhere to live in V2 without them |
