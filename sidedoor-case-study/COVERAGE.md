# COVERAGE · does V6 answer the problem statement?

**Checked:** 19 Sep 2026, against BRIEF.md (problem statement, screens, main path, other routes, states, AX Spec) and
RESEARCH.md (jobs J1–J3, clusters C1–C5), by reading every V6 screen in Figma (76). **saw it** for what is on screen.
**Not checked:** whether any of this works for real people. No usability test has been run (next: molades-test).

**Problem statement:** How might we let a candidate send a referral request a stranger can act on in minutes, and let
the answer reach the candidate without asking the referrer for more work?

## The three jobs

| Job | What the design has to do | Where V6 does it | Verdict |
|---|---|---|---|
| **J3 · referring a stranger in minutes** (C2 + C4) | Request arrives complete; fit visible; portal fields ready to copy; saying no costs one tap | Check your referral request ("Flipkart's portal also asks for · Still needed · 4"), Referral requests (ordered by match, Lower match collapsed), Referral request ("How they match", item by item), After refer (every portal field with copy), Not moving forward sheet (optional reason chips), Your rules | **Covered** |
| **J2 · knowing what happened** (C3) | The answer reaches the candidate at one tap's cost to the referrer; silence becomes a state | Mark as submitted (last tap of Refer), "Seen it move?" weekly sheet, candidate timelines (Sent → Selected / Not selected), "Heard from Google? Mark it", No answer after 7 days (request given back, ask someone else) | **Covered** (gaps 1–2 built) |
| **J1 · asking where it will be read** (C1 + C5) | Only people willing to refer; fit shown before asking; limits so referrers aren't flooded | Jobs ("Jobs with someone who refers"), match on every card, "Avinash is full this week", "2 of 5 referral requests left this week", Suggested for this job + "Let referrers find me" | **Covered** |

## The main path (BRIEF.md, 7 steps)

All 7 steps have a screen: Jobs → Job → Check your referral request → Your referral requests (Just sent) → Referral
requests → Referral request → After refer (copy) → Mark as submitted → Track details 3 ("Submitted on Meta's portal").

## AX Spec failure states

Wrong (Skill removed), Not sure (Not enough to judge), Slow (Reading), Won't · rule (Add the job ID to post; Add the 4
details above), Won't · fault (Couldn't read this file / link), Half done (Still needed · 4, moved to the first request
on purpose, LOG V4 Fix 3), Out of date (Profile updated, Fit checked again). **All 7 built.**

## Guardrail

Referrers turning off requests must not rise: Pause post, "Up to 10 requests a week", candidate weekly limit. **Built.**

## Gaps found · all 4 built on 19 Sep 2026 (see LOG.md)

1. **The candidate never sees a "Not moving forward".** The list shows the tag (Paytm), but there is no Referral
   request (candidate) state for it, with the reason if the referrer gave one. BRIEF.md: "the candidate sees it at once,
   with the reason if given." This is J2's core: a no instead of silence. **Most important gap.** It also covers
   "Job closed → candidate told automatically" (reason: Role is closed), which has no in-app screen either.
2. **"On hold" never reaches the candidate.** The referrer can set it ("Seen it move?"), the referrer's record counts it,
   but no candidate timeline or tag shows it.
3. **No notification surface.** Steps 4 and 7 of the main path start with a notification, and the bell sits on every
   tab, but nothing shows what a notification says or where the bell goes.
4. **No chat conversation.** Messages lists chats, and "Message Abhinav" / "Message Advika" exist, but no chat screen
   was carried into V6. Not core to the problem statement; it is a dead end in the prototype.

## Open decisions, not gaps

S5 (skipped resume taps Ask) and S9 (asking the same person twice from the app) were decided and built on 19 Sep 2026.


From ATTACK.md and BRIEF.md: a referrer undoing a wrong stage; duplicate referral at the same company. Menu items with no screen (Saved jobs,
Settings, Help, Your links to share) are outside the problem statement.

## What "correct" means here

Every screen traces to a job, a cluster and a logged decision. That makes it the right design **for the research we
had**: 2 people, interviewed as both candidate and referrer. Whether a complete request actually gets referred more
(kill condition 1) and whether referrers send their link (kill condition 2) is untested.
