# Sidedoor · iterations

For the case study. Each version keeps the one before it untouched in Figma (V2 file, "UI Screens": V2 on top, then
V3, V4, V5 and V6 below). Full reasoning for every change is in LOG.md, dated.

---

## V2 · the original design

Built mostly with AI, before real research. Swipe cards on both sides, a "9.4 Strong Fit" score, four-step profile and
job forms, a six-stage manual status update, "Referral Accepted" as the finish, and Premium: "Referrers want to connect
with you. Subscribe."

**What was wrong with it (found in the redo):**
- It was built for volume (swipe), while the research said the problem is incomplete requests, not too few
- The score looked precise and wasn't
- The finish line was wrong: an accepted request isn't a referral until it's on the company portal
- Premium sold access to referrers, the scarce side
- The research behind it was mostly AI-generated. Only 2 people were real (Samarth, Riya)

---

## V3 · rebuilt from real research

**Problem statement (RESEARCH.md):** an employee asked for a referral by a stranger has to do the candidate's work
before they can say yes. So most don't, and the candidate never finds out.

| Change | V2 | V3 | Why |
|---|---|---|---|
| Asking | Swipe, Request Referral | Jobs list → Job → **Check your referral request** with every detail the portal needs, Send off until complete | Referrers drop requests because details are missing (Samarth n59 n60; Riya n70 n76) |
| Fit | "9.4 Strong Fit" | "4 of 7 skills match", each skill linked to the resume line; "Not enough to judge" when thin | A number nobody can check isn't trusted (AX Spec) |
| Referrer's inbox | Swipe through candidates | Requests ordered by match, **Lower match collapsed**, still referable | Samarth has a match rule (n50) but refers borderline people (n53) |
| Referring | Accept → message → share resume | **Refer → portal-ready details with copy → Mark as submitted** | The portal is where the referral really happens |
| Status | 6 stages, referrer updates each | 5 stages in portal words; **"Seen it move?"**, one tap, weekly; candidate can mark from the company email | Referrers have no reason to come back to update (Devansh's critique) |
| Profile and job | 4 manual steps each | Upload → one review screen | The model fills, the person checks (AX Spec) |
| Strangers | No path | **Link page**: complete request, no app | Samarth asked for exactly this (n66); the cold-start loop |
| Premium | Pay to see referrers | Cut | Selling access to the scarce side breaks the marketplace (BUSINESS.md) |

**V3, second pass · made it look like one app.** The first V3 screens used the same colours and fonts as V2 but
different layout habits (left titles, headings inside cards, flat coloured boxes, a pencil on every row). Devansh
noticed they didn't feel part of the app. Measured V2's patterns, wrote them into DESIGN_LANGUAGE.md, rebuilt every
new screen. *Learned: match patterns, not just tokens.*

---

## V4 · onboarding, activation and retention

**Question:** V3 solves the problem on paper. Will people get to the value, and come back? Referrers are the scarce
side, so the curve that decides product-market fit is referrer retention. Review: PRODUCT_REVIEW.md.

| # | Change | V3 | V4 | Why | Metric |
|---|---|---|---|---|---|
| 1 | Login | "Right swipe to your next job", SIGN UP / Login | "Get referred by insiders"; Continue with Google / email | The first screen sold the product we cut | signup_completed by method |
| 2 | Candidate onboarding | 6 screens before Jobs | Role → Upload resume (**Skip for now**, Fill in myself) → Check details → Jobs | Value was at screen 7; every screen before value loses people | activation funnel, skip vs no-skip |
| 3 | Personal details | Date of birth etc. at sign-up, then asked again | Asked once, on the first request: "Flipkart's portal also asks for" | Sensitive details need a reason; the portal is the reason | % requests arriving complete |
| 4 | Skipped resume | — | Jobs show "Add resume to see match" | Skip only works if skippers still get value | % skippers who add a resume in 7 days |
| 5 | Referrer onboarding | Upload JD → uploaded → review → empty list | **Verify work email** → paste job link → review → **Your job is live** + share | The tick verified nothing; referrers rarely have a JD file; the moment after posting is when they'll share | referrer activation funnel |
| 6 | The link | Only on the empty list | Share icon on requests, share sheet with a ready message, in Profile | The acquisition loop can't disappear once it starts working | link_shared → link_request_sent |
| 7 | Tabs | 5, with Referrals vs Track, Explore, Updates | Candidate: Jobs · Requests · Messages · Profile. Referrer: Requests · Referrals · Posts · Profile | Names say what's inside; status in one tap | status views without a push |
| 8 | Saved lists | Saved Candidates / Referrals | Cut; "Your links to share" instead | No growth loop; lets people postpone deciding | — |
| 9 | No answer | "You can withdraw" (no way to) | After 7 days: request back, "Ask someone else at Zepto" | Silence is where candidates quit | % requests closed with an answer |
| 10 | Volume | Unlimited | "Up to 10 requests a week"; candidates see "full this week" | Protects referrers, the guardrail | referrers turning off requests |
| 11 | Thanks | Candidate thanks, referrer never sees it | "Himani thanked you" on Your referrals | Bonuses aren't why they refer (n62, n87) | 30-day referrer re-referral |

**Also:** ticks removed from candidate names (only verified referrers have one).

**Not changed on purpose:** no paywall, no points or streaks, no swipe, no sign-up before the link page sends.

**Honest limit:** nobody has used V3 or V4. Every V4 change is reasoned from the research and the business model, and
each comes with the metric that would prove or disprove it (PRODUCT_REVIEW.md, section 7).

---

## V5 · one borrowed idea, and a full design audit

**Question:** could features from Cutshort, Instahyre, LinkedIn, Naukri or Indeed make Sidedoor better? Test for a
must-have: the research shows the pain, V4 doesn't already solve it, and it serves the problem.

| Idea (borrowed from) | Evidence in our research | Decision |
|---|---|---|
| **Shared background: "Both ex-MakeMyTrip", "Same college"** (LinkedIn, people you know at a company) | Strong: n03, n16, n02 (candidate goes to their circle first); n69 (referrer: "for known people, I always take that pain"); cluster C1 | **Built** on Jobs, Referral requests and Referral request |
| "Usually answers in 2 days" (Indeed) | Some: n37, n30 | Later: needs reply data |
| "Opened" status (Naukri) | Some: n35 | Not now: V4 handles silence; "opened, then nothing" can hurt |
| Follow a company (LinkedIn, Naukri alerts) | None | Later |
| Open the company's referral portal (one-tap apply) | Weak | Skipped |
| Profile strength meter, reviews and salaries, skill tests, paid boosts | Against the strategy or out of scope | Rejected |

*Competitor features are from memory; verify on the live products before quoting.*

**Login with LinkedIn.** Added "Continue with LinkedIn" first, above Google and email (V5 login only). Checked
LinkedIn's developer docs first: sign-in gives name, photo and email only, no work history or profile link, and LinkedIn
says it doesn't verify identity. So it's there for familiarity (candidates and referrers already ask and check on
LinkedIn, n04 n29 n56), not for data. Resume upload and work-email verification stay. Verified on LinkedIn can't be used
to rank candidates, so it's noted as a possible extra trust signal for referrers only.

**Profile on the referral request, corrected.** Devansh noticed V3 had made the candidate profile plain and asked for
only what's correct, not what was designed before. Judged each V2 piece against what referrers check (n50 n53 n56 n59). Brought
back experience (with logos and dates), projects (titles and skill chips, details collapsed), quick facts and links,
because they are the evidence a referrer reads. Left out the green tagline card, About and the full skills list,
because they are pitch or repetition, not evidence. *Learned: V3 over-corrected. Cutting a volume pattern (swipe) is
not a reason to cut the content inside it.*

**Design audit.** Every V5 screen checked by script and by eye against DESIGN_LANGUAGE.md. Fixed 8 things: placeholder
icons on info notes, a share icon that read as "open website", one screen laying out details differently from the rest,
capitalisation, a squeezed "Still needed" note, and editing a job post still using V2's 3 steps while posting was one
screen. Re-check: 41 screens clean.

---

## V6 · bringing back good earlier designs

**Question:** in fixing V2's wrong ideas, did the redo also throw away right ones? Every V2 element (V0 is the same) was
checked against the job of the person on that screen and the research. Restored, moved or kept out, each with a reason.

| Restored | From V2 | Why it's right |
|---|---|---|
| Referrer "Fill in myself" | Create manually | Some referrers only have a job ID, no JD file or link (n70) |
| Referrer's name, role, location | Manual job step 1, Edit profile | Candidates see "Design Manager, Flipkart" on every screen, and pick who to ask by role (n29); V4 had removed the only place to give it |
| Tips for candidates, Save as draft | Job steps 3–4 | Tips show on the Job screen and get referrers better requests; drafts cover the missing job ID (n70), and "Draft" already existed in Manage posts |
| Experience, projects, links on the candidate's own review | Profile steps 2–4 | Referrers read these (n50 n56), so candidates must be able to check them (AX Spec) |
| Salary and city on job cards | Explore cards | With 5 asks a week, candidates need to choose which jobs are worth one |
| Saved jobs | Bookmark on job card | The weekly cap makes "save now, ask Monday" legitimate |
| Message after Refer | Referrer Match screen | Messaging had no entry point once its tab went |
| Status tabs (All · Waiting · In progress · Closed) | Track tabs | Candidates' requests pile up; n45 asks for one place to see them |
| Congratulations + Thank as the main button | Selected screen | Best moment in the product; the thank-you is what brings referrers back |
| Job preferences (Edit only) | Profile step 4 | Useful for ordering jobs later, not needed to send a request |

**Kept out, with reasons:** tagline, About and full skills list on the referrer's view (pitch, not evidence); 9.4 score
and swipe (unverifiable, volume); referrer's Saved candidates (the request list is already their queue); "Referral
Accepted" screens (the finish line is Submitted); messaging before Refer (chasing is the referrer's pain); six-stage
update; referrer list tabs (waiting-first is action-first); 4-step onboarding; Premium; swipe login copy; header counts.

*Learned: a cut needs a reason as much as an addition does.*

**Suggested candidates (added to V6).** Devansh asked why referrers only wait for requests. The business plan
already promised referrers curated candidates; I had narrowed it to sorting requests. Now each job's request list has
"Suggested for this job": the top matches among candidates who turned on "Let referrers find me" (V2's own Profile
Status switch, reused). "Invite" sends the candidate the job with "Nithin suggests you for this job", and one tap sends
a complete request that doesn't count against their 5 a week.

| Shaped by | What it changed |
|---|---|
| Referrers asked for matching (n65) and refer strangers who meet criteria (n64) | Suggestions are matches, not a feed |
| Bonus isn't the main reason to refer (n62, n87) | The screen offers better matches, not more bonuses |
| Referrers' pain is work after yes (n60, n76) | An invite becomes a complete request; the referrer fills nothing |
| Candidates never agreed to be browsed | Only people who turned the switch on show up |
| Effort from the candidate earns goodwill (n77) | People who asked stay above suggestions |

*Test: are invites referred as often as requests candidates send? If not, the idea is wrong.*

**The green banner on the referrer's Referral request (six rounds, 17–19 Sep).** Devansh wanted V2's green card back,
so the candidate view would match the Job card. Candidates see a job as a banner in the company's colour (Flipkart
blue), and referrers should see a person the same way in Sidedoor's green. What went on the green changed six times:

| Round | On the green | Why it changed |
|---|---|---|
| 1 | Photo, name, role, links, status tag | Looked foreign. V2 never puts text or tags on a coloured block (Devansh, then the audit) |
| 2 | Photo only, like Flipkart's logo | A photo alone doesn't say who it is |
| 3 | Photo, then name under it | Devansh: side by side, white name |
| 4 | Photo left, white name right | Devansh didn't like the image and name inside it |
| 5 | Cover photo tried, then dropped | Adds no evidence and can invite bias (looks, lifestyle) on the screen where the referrer decides |
| 6 | **"4 of 7 skills match"** | Final. The biggest spot answers the referrer's first question |

**Why the match is on the green (final):** Samarth's rule for referring is "at least a 50% to 70% skill match" (n50),
and Riya drops people who don't match the job (n73, n82). So the skill ratio is the first thing a referrer judges, and
it gets the biggest spot. It also mirrors the Job card: that banner says who is hiring, this one says how well this
person fits. "Not enough to judge" uses a grey banner, because green would read as a good match. The photo and name
moved to a row under the banner. Tags repeating the banner were hidden.

**Taste calls, said plainly:** keeping bright brand green with white text was Devansh's call ("I don't want to change
brand green"). White on #10B981 is about 2.5:1 and fails contrast. That's logged as a known risk for the attack phase.
The same number also appears in dark text lower on the screen, so no information lives only in the banner. A bar,
a logo line and a deeper green were tried and removed as clutter or rejected.

*Learned: a colour block should carry one idea. Each round that added more to the green made it worse.*

**Checked against V2's candidate card.** Everything V2 showed is either in V6, replaced by something checkable, or left
out with a logged reason. One thing was missing and came back: the "Full time" and "Remote or hybrid" chips, so the
referrer can see the person's way of working lines up with the job, like the Job screen shows for the job.

**Design-language pass (V6).** Devansh said a few screens didn't feel part of the app. An audit of every V6 flow found
three: the green header had text, a tag and icons on colour (V2 never does that), status screens used a big header for
a small action, and login had three equal buttons. The candidate view now copies the Job card's structure (grey page,
white card, colour banner, then details on white). Login leads with one LinkedIn button, then Google and Email side by
side, as apps like Mimo, Meetup and Todoist do (Mobbin, 17 Sep). V2's "Already have an account? Log in" came back,
because removing the old caption left returning users no sign of where to go. A terms line was added, as nearly
every login on Mobbin has one. The legal need was not checked.

*Learned: copy the structure of the matching screen, not just its colour.*

**Sanity pass (19 Sep).** Before the attack phase, all 40 V6 screens were checked by script and by eye. Four slips
were fixed: a green "live" dot on the PAUSED tag, a leftover unread badge on the referrer's Posts tab, mismatched
button heights, and "Sidedoor" spelled against the brand.

**Missing states and the prototype (19 Sep).** BRIEF.md planned the loading, error, empty and "not allowed" states,
but V6 only had a few. 19 were built in "V6 · States Flow", each from its BRIEF line and in the V2 info-note style:
failed upload, still reading, couldn't send, no requests left, just sent, loading and error for lists and tracking,
all handled, paused post, fit checked again, skill removed, profile updated, referrals empty, updated, couldn't
update, closed link and already asked. Four were not built, with reasons (LOG, 19 Sep). A clickable prototype of 61
screens now lives on the "🔗 V6 Prototype" page.

### What backs each V6 decision

For interviews. Types of evidence: **Quote** (a research note, real person), **Business** (BUSINESS.md), **V2**
(the product's own pattern), **Benchmark** (other apps, seen on Mobbin or docs), **Reasoning** (worked out, not
tested), **Taste** (Devansh's visual call). Nobody has used V6. Every item is a reasoned bet with a way to test it.

| Decision | Backed by | Type | How strong |
|---|---|---|---|
| Referrer "Fill in myself" | Referrers can't find the job ID (n70) | Quote | Strong |
| Referrer's role on their profile | Candidates pick who to ask by role (n29) | Quote | Strong |
| Tips and Save as draft | Job ID often not at hand (n70); tips were Devansh's reported talk with Samarth (n92, not recorded) | Quote + reported | Medium |
| Experience and projects for the candidate to check | Referrers read them (n50, n56) | Quote | Strong |
| Salary and city on job cards | 5 asks a week means choosing | Reasoning | Weak, test it |
| Saved jobs | Weekly cap makes "ask Monday" real | Reasoning | Weak, test it |
| Message after Refer | Portal questions go back and forth (n59) | Quote | Medium |
| Status tabs | "One place like Naukri's applied list" (n45) | Quote | Strong |
| Thank as the main button | Bonus isn't why they refer (n62, n87) | Quote | Medium |
| Job preferences in Edit only | Not needed to send a request | Reasoning | Weak |
| Suggested candidates | n65, n64, BUSINESS.md decision 2 | Quote + Business | Medium, consent guard is reasoning |
| Work chips on the candidate | Mismatched city and job details waste time (n73, n82) | Quote | Medium |
| Match on the green banner | "50% to 70% skill match" rule (n50) | Quote | Strong |
| Grey for Not enough to judge | Green reads as good; V2's tag was grey | V2 + Reasoning | Medium |
| Brand green with white text | Devansh's brand call. Fails contrast | Taste | Known risk |
| Login: one main button | Mimo, Meetup, Todoist, foodpanda, Skip | Benchmark | Medium |
| LinkedIn first | Both sides already use LinkedIn (n04, n29, n56) | Quote | Medium |
| "Already have an account?" and terms | V2 had it; Me+, Meetup, Todoist | V2 + Benchmark | Medium |
| Status screens use the small person row | V2's sheets and Seen it move | V2 | Strong |

**Weak spots to own in an interview:** only 2 real people (Samarth, Riya), each interviewed twice, once as a candidate and once as a referrer. Neither is flooded with requests. n92
is Devansh's memory of a follow-up, not a recording. Competitor features are from memory. Salary on cards, saved jobs
and job preferences rest on reasoning alone. The brand-green contrast is a known accessibility failure.

---

## Say it in an interview

> "V2 was built for volume and on research I couldn't stand behind. V3 rebuilt it from two real interviews around one
> problem: referrers doing the candidate's work. Then I asked whether people would actually reach that value and come
> back. V4 moves value to the front: jobs before a full profile, details asked when a portal needs them, a referrer's
> link at the moment they're most motivated, and a tick that means something. Every change has a metric attached, so
> the next iteration comes from data, not taste."
