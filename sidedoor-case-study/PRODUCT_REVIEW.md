# Sidedoor V3 · product and growth review

17 Sep 2026. A senior PM + product design pass over the V3 screens, stage by stage: acquisition, activation,
retention, referral (virality), revenue. Then what to measure, and what to add, change and cut in V4.

> **How sure.** Nobody has used V3. Every finding here is **worked it out** (from the screens, RESEARCH.md,
> BUSINESS.md) or **guessing**. None is **saw it**. The only way to know is to ship it with the events in section 7 and
> read the funnels. No numbers below are targets from data; they're what to watch.

---

## 1 · What product-market fit means for Sidedoor

Sidedoor is a two-sided marketplace. **Referrers are the scarce side** (BUSINESS.md). So PMF shows up first in one curve:

**Referrer retention curve:** of referrers who got their first request in week 0, what % still open a request in week
1, 2, 3 … 12. If it keeps falling towards zero, no amount of candidate growth helps. If it **flattens**, there is
something to grow.

The candidate curve matters second: % of candidates who send another request, or check status without a notification.

Everything below is judged by one question: **does it get a referrer to a first complete request faster, and bring them
back for the next one, without flooding them?**

---

## 2 · The journeys today, counted

**Candidate, from install to first request sent:**
Login → Choose your role → Create your profile (upload or fill in myself) → Upload resume → Resume uploaded → Check your
details (8 filled, **4 still needed**) → Jobs → Job → Check your referral request (**1 still needed**) → Send.
**9 screens and ~5 decisions before any value.** Jobs, the first valuable screen, is the 7th.

**Referrer, from install to first request:**
Login → Choose your role → Post your first job → Upload job description → Uploaded → Check your job post (job ID) → Post
→ Referral requests **(0)** → copy link → wait.
**7 screens, then an empty list.** Value only comes when someone else acts.

**Candidate via a referrer's link (web):** Open link → upload resume → check → Send → Sent. **3 screens, no install.**
This is the best flow in the product.

---

## 3 · Stage by stage

### Acquisition

| # | Finding | Why it matters | Fix |
|---|---|---|---|
| A1 | Login still says **"Right swipe to your next job"** and **"SIGN UP"** | Sells the swipe we cut; all-caps is on the do-not-inherit list. First screen promises the wrong product | New line per value: "Get referred. Referrers get complete requests." One button: Continue with Google. Email as a small link |
| A2 | The referrer's link (Loop 1, the main acquisition loop) only appears on the **empty** request list | Once one request arrives, the link disappears. The loop stops the moment it starts working | Link lives in the request list header (share icon), on "Your job is live", and in Profile |
| A3 | No **share** step, only copy | Copying then switching apps then pasting loses people | Share sheet with a ready message: "Send your details here, it's everything my portal needs: [link]" |
| A4 | A candidate can only ask referrers **already on Sidedoor** (Loop 2 has no screen) | On day one there are almost no referrers. Candidates hit an empty Jobs list and leave | "Ask someone who isn't on Sidedoor": candidate enters job ID + the employee's LinkedIn/WhatsApp, gets a link to send. The employee opens a web page with the complete request. **P2, needs its own design** |

### Activation

**Candidate aha:** "Here are jobs where someone will refer me, and how well I match." **Referrer aha:** "This request
has everything my portal needs. I submitted it in two minutes."

| # | Finding | Why it matters | Fix |
|---|---|---|---|
| C1 | Jobs (the aha) is **behind 6 screens** of profile building | Every screen before value loses people. Long forced onboarding is the classic drop-off | **Show Jobs first.** After role: upload resume, with **Skip for now**. Skipped users see Jobs with "Add your resume to see your match" on each card |
| C2 | "Create your profile" choice screen: **Upload** and **Fill in myself** as equal cards | Manual fill is the slow path; equal weight invites it | Cut the choice screen. Upload is the screen; "Fill in myself" is a small link under it |
| C3 | **"Resume uploaded successfully!"** is a screen of its own with a Next button | A screen that only says "done" is a tap with no value | Cut. Go straight to Check your details while fields fill in |
| C4 | Onboarding asks the **4 still-needed fields** (date of birth, career gaps, locations, notice period), then the request screen asks again | Sensitive fields (date of birth) at sign-up, before any trust, and asked twice | Ask them **just in time**, on the first Check your referral request, only the ones that job's portal needs. Saved after that. Onboarding asks nothing beyond the resume |
| C5 | Two words for one thing in the tabs: **"Referrals"** (a heart = saved?) and **"Track"** | Unclear tabs = people can't find their status (C3 is the core pain) | Candidate tabs: **Jobs · Requests · Messages · Profile** (plan words) |
| R1 | Referrer must **upload a job description file** to post | Most referrers don't have the JD as a file on their phone. They have a job link | "Paste the job link" first, upload second. Required: job ID + role. Everything else optional |
| R2 | After posting, the referrer lands on **Referral requests (0)** | An empty screen right after effort feels like nothing happened | New **"Your job is live"** screen: share your link now, to people who already messaged you. "Share later" to skip |
| R3 | The **green verified shield** shows on every name, but **nothing verifies anyone** | The trust signal is fake. The first person who asks "what does the tick mean?" breaks the pitch; and companies (phase 2) need real employees | **Verify work email** (one code) in referrer onboarding. The shield means "works at [company], checked by email". Candidates: no shield |
| R4 | Referrer tabs: My Posts · Updates · Explore · Messages · Profile | "Explore" holds requests; "Updates" holds referrals. Names don't say what's inside | **Requests · Referrals · Posts · Profile.** Messages open from a request (they only start after Refer) |

### Retention

| # | Finding | Why it matters | Fix |
|---|---|---|---|
| T1 | Candidate retention depends on **status** (C3), but nothing says how status reaches them outside the app | If they must open the app to find out, most won't | Push + email on every stage change; one weekly email "Where your requests stand". Measure opens without a notification |
| T2 | **Sent, no answer** says "withdraw after 7 days" but offers no next step | A dead end at the most emotional moment. Candidate churns | After 7 days: "Ask someone else at Zepto" with other referrers for that company, request given back |
| T3 | Referrer's reason to return is the record strip, but **thank-yous go nowhere** | Referrers say bonuses aren't the main reason (n62, n87). Being thanked is | Thanks from candidates show in Your referrals: "Himani thanked you". A small, human reward loop |
| T4 | No way for a referrer to **limit volume** | The guardrail: referrers who turn off requests must not rise. Flooding is how it breaks | Per post: "Up to 10 requests a week" (default on). Candidates see "Nithin is taking requests" or "full this week" |
| T5 | **Saved Candidates / Saved Referrals** | Outside every loop (BUSINESS.md). Saving is a way to not decide | Cut |
| T6 | One reminder rule is missing for **requests waiting on the referrer** | Silence is C1 | One nudge when a matching request waits 3 days (Idea 11). Never more than one per request |

### Referral (word of mouth)

| # | Finding | Fix |
|---|---|---|
| V1 | Selected is the best moment and it ends with "Thank Joy" | After thanks: "Know someone looking? Share Sidedoor". Small, after the value, never before |
| V2 | Referrers have no shareable proof | Optional: "3 people I referred reached interviews" card to share on LinkedIn. **guessing** it helps; P2 |

### Revenue

| # | Finding | Fix |
|---|---|---|
| M1 | Premium dropped; revenue is companies, later | **No paywall in V4.** Nothing should slow activation |
| M2 | Companies will pay for data they don't have: which referrals reach interview | Make outcome capture cheap and honest now: the Seen it move? sheet and the candidate's "Mark it" are the revenue data. Already in V3; measure how often they're answered |
| M3 | Verified referrers (R3) are what a company can trust | Work-email verification now makes the phase-2 sale possible |

---

## 4 · Where people will drop, and what catches them

| Drop point | Who | What catches it in V4 |
|---|---|---|
| Login → role | Both | One-tap Google; value line on login |
| Role → first value | Candidate | Skip → Jobs first |
| Resume upload fails | Candidate | "We couldn't read this file" state + Fill in myself (AX Spec) |
| Still needed fields | Candidate | Asked just in time, only what that portal needs |
| Post a job | Referrer | Paste link, job ID + role required only |
| After posting | Referrer | "Your job is live" + share |
| First request waiting | Referrer | One nudge at 3 days |
| No answer | Candidate | "Ask someone else at [company]" after 7 days |
| Too many requests | Referrer | Weekly limit per post |

---

## 5 · Add, change, cut · V4

**P1 · build in V4**
1. Login: new line, Google first, no "SIGN UP" (A1)
2. Candidate onboarding: role → upload (Skip for now) → check details → Jobs. Cut the choice screen and the "uploaded" screen (C1 C2 C3)
3. Still-needed fields moved out of onboarding into the first request (C4)
4. Jobs for skipped users: "Add your resume to see your match" (C1)
5. Referrer onboarding: role → verify work email → post job (paste link, job ID) → "Your job is live" with share (R1 R2 R3)
6. Link always reachable: share icon on Referral requests; share sheet with a ready message (A2 A3)
7. Tabs renamed with plan words, 4 each side (C5 R4)
8. Cut Saved Candidates / Saved Referrals (T5)
9. Sent, 7 days: "Ask someone else at Zepto" (T2)
10. Post setting: weekly request limit (T4)
11. Thank-yous shown in Your referrals (T3)

**P2 · later, needs more design or data**
- Ask someone who isn't on Sidedoor (A4, Loop 2)
- Weekly status email content (T1)
- Share-your-record card for referrers (V2)
- Company-facing offer (phase 2)

**Not doing:** paywall, gamified points or streaks (activity, not value), swipe, pushing sign-up before the link page sends.

---

## 6 · How each fix moves the business

| Fix | Input metric (BUSINESS.md) | NSM |
|---|---|---|
| Jobs first + skip | % new candidates who send a first complete request in 7 days | More complete requests reach referrers |
| Just-in-time fields | % requests arriving complete | Request-to-referral rate |
| Your job is live + share | Link-to-completed-request rate (Loop 1) | More requests per active referrer |
| Work-email verification | Referrers who submit a first referral (trust) | Referrals submitted |
| Weekly limit | Guardrail: referrers turning off requests | Protects the curve |
| Thanks + record | % referrers who submit again in 30 days | Referrer retention |
| Ask someone else | % requests closed with an answer | Candidate retention |

---

## 7 · What to measure · events

Named `object_action`. Each carries `user_role`, `user_id`, `session_id`, `platform` (app / web link).

**Candidate**
`signup_completed` (method) · `role_selected` · `resume_upload_started` / `_completed` / `_failed` (reason) ·
`onboarding_skipped` (step) · `profile_saved` (fields_filled) · `jobs_viewed` · `job_viewed` (match_count, has_resume) ·
`request_started` · `request_missing_field_shown` (field) · `request_missing_field_filled` (field) · `request_sent` ·
`request_stage_changed` (stage, set_by: referrer / candidate) · `request_status_viewed` (source: push / email / organic) ·
`request_withdrawn` · `ask_someone_else_tapped` · `thanks_sent`

**Referrer**
`work_email_verified` · `job_post_started` (source: link / file) · `job_posted` · `link_shared` (channel) ·
`request_received` · `request_opened` (match_bucket) · `lower_match_expanded` · `skill_flagged_wrong` ·
`refer_tapped` · `portal_field_copied` (field) · `marked_submitted` · `not_moving_forward` (reason or none) ·
`seen_it_move_shown` / `_answered` (stage) · `request_limit_changed`

**Link page (web)**
`link_opened` · `link_resume_uploaded` · `link_request_sent` · `app_install_tapped`

**Dashboards**
1. **Referrer retention curve** by weekly cohort (PMF signal)
2. **Candidate activation funnel:** signup → resume → jobs viewed → request sent (complete), with skip vs no-skip split
3. **Referrer activation funnel:** signup → verified → job posted → link shared → first request opened → first submitted
4. **Loop 1:** link_opened → link_request_sent → app_install_tapped
5. **Request health:** request-to-referral rate, % complete on arrival, % unanswered after 7 days (guardrail), time to submitted
6. **Outcome capture:** % submitted referrals with a later stage answered (the phase-2 data)

---

## 8 · Say it in an interview

> "Referrers are the scarce side, so the curve I care about is referrer retention. V3 made people build a full profile
> before seeing a single job, and put an empty list in front of a referrer right after they posted. In V4 candidates
> see jobs first and give sensitive details only when a specific portal needs them, and referrers share their link at
> the moment they're most motivated. I also made the verified tick real, because a trust signal nobody checks is a
> liability. And each change maps to an input metric I'd instrument, so I'd know within weeks whether it worked."
