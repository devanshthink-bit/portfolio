# Case study: the questions you'll get

Written 2026-09-24 with the case study. Each claim on the page, the question it will get in an
interview, and how well the files let you answer it. Say the answers out loud before an interview.

Ratings: **answerable** (the files back it), **partly** (reasoning, not evidence), **not answerable**
(cut it or call it an assumption).

## The problem

| Claim | Question | Answer | Rating |
|---|---|---|---|
| Referrers skip strangers because of the admin | Which referrer, and what did they say? | Riya (n76): no job ID "irritates me a lot... I will not take the pain". Samarth (n59, n60): chasing date of birth, gaps, last employer, copying into the portal by hand | answerable |
| "80% of the time they don't reply" | Out of how many? | It's Riya's own estimate as a candidate (n30), not a count. Say so | partly |
| Four people | Isn't that too few? | Yes, it's thin. Each was seen from both sides, so it's eight conversations. One-person claims are marked | answerable |

## The design

| Claim | Question | Answer | Rating |
|---|---|---|---|
| Fit as a count, not a score | What did you give up? | A single number is faster to scan. A count is slower but can be checked, and a referrer said they read the resume against the skills (n50) | answerable |
| A skill counts only when found in linked work or the resume | Can't people still fake it? | Yes. It raises the cost of faking; the interview is still the last check. The reading rule is my call, not research | partly |
| Lower matches folded, not hidden | Why not hide them? | Hiding is silence for the candidate, and Samarth refers borderline people on purpose (n53) | answerable |
| Portal details asked once, just in time | Why not at sign-up? | Sensitive details before any trust cause drop-off; on the request the reason is concrete: this portal needs them (n59, n60) | partly (drop-off is reasoning) |
| Email to me / Copy all | Do referrers fill the portal on a laptop? | Assumed, not asked. Put it in the next test | not answerable yet |
| Mark as submitted inside Refer | Will referrers do it? | It's one tap while the portal is open; if not, the candidate can mark it from the company email (n72). Untested | partly |
| 14 requests a week | Why 14? | My number, after 5 felt too few. The point is that each request is chosen; spam wasn't in the research (n19, n61) | partly |
| The referrer's question asks about a skill | Evidence? | None from research. The referrer can't know who applies, so a product question shuts most people out | partly |
| The link page | Why would a referrer send it? | Samarth suggested it (n66). Sending it is already a yes, which is the risk | partly |

## Behind the scenes

| Claim | Question | Answer | Rating |
|---|---|---|---|
| Not a LinkedIn feature | Your mentor had a point. Why were they wrong? | The work sits between LinkedIn and the company portal, which neither owns (n46, n57 to n60, n71); the link gives value before a network exists (n66). Honest risk: both ask on LinkedIn today. Not tested | partly |
| My mistake: asking referrers to come back | What did it cost? | The status loop depended on unpaid work from the scarce side. Fixed by making it the last tap of Refer | answerable |
| Seven rounds on the green banner | Why so many? | I kept fixing how it looked instead of asking whether it should exist. White on #10B981 is 2.54:1 | answerable |
| 1 of 13 predicted breaks | Measured how? | The molades-attack pass on 19 Sep: predictions written first, then 13 cases run on two screens | answerable |
| 2 blockers, 18 majors | Where? | The whole-app pass on 19 Sep; the blockers were a personal email and a wrong code on the work-email check | answerable |

## What you can't claim

- Any result or improvement: nobody has used it.
- Any market number (hire rates, days to hire): the sources weren't kept. Wait for the links.
- That referrers will adopt it, or that companies will pay: guesses, and the page says so.

## The bar (molades-case)

| Check | Result |
|---|---|
| Numbers | Pass. Every number on the page traces to a file or LOG entry |
| Decisions | Pass. Each design beat names what it replaced or rejected |
| Cost | Partly. Fit-as-count and the proof rule name their cost; add one for Email to me after testing |
| Rounds | Pass. Mentor (LinkedIn feature), Devansh (referrers won't update), the attack passes, the question critique |
| How sure | Pass. Research-backed, reasoning and "my call" are said apart on the page |
| States | Pass. 73 states, switchable in the prototype |
| Real humans | **Fails.** Nobody has used it. The page says so; the tests with Samarth and Riya fix it |
| It opens | Pass. The prototype runs in the page and on its own page |
| Traceability | Pass. Problem statement back to n70, n76, n59, n60 and others |
