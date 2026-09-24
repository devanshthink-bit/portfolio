# TEST PLAN · Sidedoor V6 prototype

Written 2026-09-24. Status: planned, not run.

## Who and how

- **People:** Samarth and Riya, the two people interviewed. Each did one interview as a candidate and one as a referrer.
- **Session:** about 45 minutes each, one person at a time. Candidate tasks first, then referrer tasks.
- **Where:** your laptop, in person or over screen share. localhost only runs on your laptop. The Vercel preview needs a login, so give them access if they use their own device.
- **Record:** ask first. Ask them to think aloud.

## Say at the start

> I'm testing the app, not you. I can't help while you try. There are no wrong answers. You can tap an empty field
> to fill it, so you don't have to type.

Don't mention the blue hint. If they find it, note it.

## Bias

Both people helped shape the app in their interviews, and they know you, so expect them to be kind. Trust what they
do more than what they say.

## Tasks

### Part 1 · Candidate (start on the candidate side)

| # | Say this | Success | Watch for | Tests which decision |
|---|---|---|---|---|
| 1 | "You want a design job. Sign up and get to the list of jobs." | Reaches Jobs | Do they understand the details came from the resume? | Resume fills the profile |
| 2 | "Find the Interaction Designer job at Flipkart. How well do you match it?" | Explains their match in their own words | Do "Found in your work", "Related" and "Listed only" make sense without help? | Proof rule, Related |
| 3 | "Ask for a referral to it." | Request sent | Where they slow down: portal details, the 6-month question, the referrer's question | Just-in-time details, 6-month question, one question |
| 4 | "It's been a few days. Where is your request now?" | Finds it from Requests in one tap | Wrong tab first? | Status passed back |
| 5 | You open the "No answer after 7 days" state. "Nobody replied. What would you do?" | Sees the request came back and asks someone else | Do they notice the request came back? | 7 days gives it back |

### Part 2 · Referrer (reload the page, start on the referrer side)

| # | Say this | Success | Watch for | Tests which decision |
|---|---|---|---|---|
| 6 | "Confirm where you work and post the job you refer for, from its link." | Job posted | Do they pick a suggested question or write their own? | Work-email check, AI question suggestions |
| 7 | "Someone just messaged you on LinkedIn asking for a referral. Reply to them." | Shares their link | Can they find the link? | Link as the way in |
| 8 | "Look at the requests. Pick one and decide: refer or not?" Then ask why. | Makes a decision and gives a reason | Do they tap a skill to see the proof? Do they trust it? | Fit as counts, proof sheet |
| 9 | "Add Abhinav to Flipkart's portal." | Gets every detail out | "Email to me", "Copy all" or copy per row? | Portal details |
| 10 | "You've submitted it on the portal. Let Abhinav know." | Taps "Mark as submitted" | Do they look for it elsewhere first? | Mark as submitted as the last tap |

## At the end (ask about their past, not their future)

- "Which part was hardest? Why?"
- "Think of the last referral request you got. How was this one different?"
- "Was there anything you didn't trust or didn't understand?"

Don't ask "Would you use this?" People almost always say yes, and it tells you nothing.

## What this can and can't show

- **Can show:** whether two people can finish the main flows, and where they get stuck.
- **Can't show:** whether referrers will actually submit more requests. The kill conditions in SCOPE.md need a real
  test with 8 referrers over 2 weeks.

## Notes sheet (one per person)

**Person:** ______ · **Date:** ______ · **Recorded:** yes / no

| # | Result (alone / with help / couldn't) | Time | Where they hesitated or went back | One quote |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |
| 6 | | | | |
| 7 | | | | |
| 8 | | | | |
| 9 | | | | |
| 10 | | | | |

**Hardest part, in their words:**

**Compared with the last real request they got:**

**Didn't trust or didn't understand:**

**Found the blue hint?** yes / no

## After both sessions

For each problem: what happened, how many of the 2 hit it, and how bad it is (blocker: couldn't finish · major:
finished wrongly or unsure it worked · minor: looked wrong, still finished). Fix at most five. Log each in LOG.md.
