# Sidedoor · iterations

For the case study. Each version keeps the one before it untouched in Figma (V2 file, "UI Screens": V2 on top, then
V3, V4 and V5 below). Full reasoning for every change is in LOG.md, dated.

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

**Design audit.** Every V5 screen checked by script and by eye against DESIGN_LANGUAGE.md. Fixed 8 things: placeholder
icons on info notes, a share icon that read as "open website", one screen laying out details differently from the rest,
capitalisation, a squeezed "Still needed" note, and editing a job post still using V2's 3 steps while posting was one
screen. Re-check: 41 screens clean.

---

## Say it in an interview

> "V2 was built for volume and on research I couldn't stand behind. V3 rebuilt it from two real interviews around one
> problem: referrers doing the candidate's work. Then I asked whether people would actually reach that value and come
> back. V4 moves value to the front: jobs before a full profile, details asked when a portal needs them, a referrer's
> link at the moment they're most motivated, and a tick that means something. Every change has a metric attached, so
> the next iteration comes from data, not taste."
