# Devansh Somvanshi — Build Log

**Project:** Sidedoor, a product for job referrals in Indian tech hiring. Being re-done properly so the case study holds up in interviews.
**Started:** original work before this log existed (dates not recorded). This log started 17 Sep 2026.

## Where things stand

Bet:        employees drop strangers' referral requests because the request makes them do the candidate's work, not because they won't help (SCOPE v2, draft)
Evidence:   thin. 4 real interviews (2 candidates, 2 referrers) and desk research without source links
Files:      SCOPE.md [x] v2 draft, v1 kept · RESEARCH.md [x] notes, sort, five clusters, jobs, insights, three candidate problem statements · BRIEF.md [ ] · DESIGN_LANGUAGE.md [ ] · build [ ] Figma V2 exists, not a coded build · live [ ]
Rounds:     1. Mentor's critique (the product and referrer incentive). No change has come from it yet
Open:       business lens with sources, first names for the four participants, source links for desk research,
            live case study still shows AI-sourced quotes and screens that aren't in Figma
Next:       molades-landscape, what GetMeReferred, EasyRefer, Jumbl, Instahyre, LinkedIn and others already do, from the FigJam screenshots

## Entries

<!-- newest at the bottom -->

CRITIQUE · undated, before this log · molades-attack · Source: facilitator
Finding:             Mentor: this would make more sense as a feature inside LinkedIn. Referrers have little reason to
                     join a brand-new app, so the product can't get its supply side.
Severity:            blocker
Layer:               the bet
Action:              rejected (17 Sep 2026), Devansh's call: Sidedoor stays its own product. Answered with reasoning in SCOPE.md v2, not tested

LEARNED · 17 Sep 2026 · molades-research
Believed:            The research base was 10 interviews: 2 recruiters, 4 referrers, 4 candidates.
Found:               Only 4 are real: Candidate 1, Candidate 2, Referrer 1 (Infosys), Referrer 2 (Accenture). The other
                     6 transcripts in FigJam were generated with AI.
Changed:             Only the 4 real transcripts are research now. Copied verbatim into raw/.
What this made worthless: every recruiter claim; the "40–50 DMs a day" PM; "I messaged 40 people, 9 replied, 3
                     submitted"; "system gets flooded when the bonus goes up"; the claim of 10 interviews on the live
                     case study; the affinity notes in FigJam, which can't be told apart by source.

DECISION · 17 Sep 2026 · molades-research
Decided:             Go ahead with the 4 real interviews and the desk research. No new interviews or survey.
Rejected:            Collecting more interviews (Devansh has no time); keeping the 6 generated transcripts as
                     "illustrative" (they would be invented evidence).
Because:             Thin data proceeds with its gaps named. Recruiters and referrers who ignore requests have no real
                     data, so anything about them is marked guessing.
How sure:            saw it

CRITIQUE · 17 Sep 2026 · molades-research · Source: AI
Finding:             The live case study's five solution screens (ranked referrer list, structured request form, four-level
                     recommendation, shared pipeline, request limits and ranked inbox) are not in Figma V2. V2 is a
                     swipe-to-match app: referrers post jobs, both sides swipe, a match opens chat, the referrer updates
                     stages by hand, and candidates can pay for Premium.
Severity:            blocker
Layer:               the bet
Action:              open. Settled in molades-brief, once the problem statement exists

CRITIQUE · 17 Sep 2026 · molades-research · Source: AI
Finding:             Two claims on the live case study walked back. "One PM got 40–50 DMs a day" traces to a generated
                     transcript. "Referrers aren't unwilling, they're uncertain" is contradicted by both real referrers
                     (n50, n55, n76, n77).
Severity:            major
Layer:               the bet
Action:              deferred to molades-case

CRITIQUE · 17 Sep 2026 · molades-research · Source: AI
Finding:             Desk research was done by Devansh with Perplexity, but no original source links were kept. Every
                     figure on the live page (5–10×, 29 days, 46% vs 33%, 15–25%, 191, 92%) will be asked "where is that
                     from?". The live page's "~20% cold DM reply rate" doesn't match the desk research (15–25%).
Severity:            major
Layer:               the bet
Action:              open. Devansh to add the original link for each figure in raw/desk-research.md

DECISION · 17 Sep 2026 · molades-synthesise
Decided:             91 numbered notes, one observation each, in the person's own words, with question numbers.
                     Every quoted phrase checked word for word against its transcript by script (75 phrases, 0 missing
                     after one fix). Participants referred to as "they" because the transcripts don't state gender.
Rejected:            Reusing the FigJam affinity stickies (no link to a person, and mixed with generated transcripts).
Because:             A numbered note in someone's own words is the only thing a problem statement can be walked back to.
How sure:            saw it

DECISION · 17 Sep 2026 · molades-scope
Decided:             SCOPE.md v1 written by copying Devansh's FigJam scope, hypotheses and North Star, labelled as
                     reconstructed. Notes sorted against its span: from asking an employee for a referral to knowing
                     what happened, up to the interview stage.
Rejected:            Writing a fresh v1 now (it would be a scope card made after the research, pretending to be before it).
Because:             Sorting needs a moment, and v2 has to be written against what the original bet actually said.
How sure:            saw it (copied from FigJam)

DECISION · 17 Sep 2026 · molades-synthesise
Decided:             Sort: 75 in scope, 3 out of scope (n39 n86 n88), 13 not a problem. Draft clusters: C1 strangers
                     don't see the request; C2 referrer drops or chases incomplete requests; C3 candidate can't tell
                     what happened; C4 referrer has little reason to refer a stranger. n91 parked. Each cluster has a
                     tension, what they did, a So what?, groups, two plain lines and a job to be done, as on the RedBus
                     artefacts page.
Rejected:            Six clusters, with "silence instead of a no" and "proving fit" on their own; both merged (see
                     RESEARCH.md, What was merged). Labels starting with "User", replaced by "Candidate" or "Referrer"
                     because Sidedoor has two kinds of user.
Because:             Draft by AI, not yet reviewed by Devansh.
How sure:            worked it out

CHANGE · 17 Sep 2026 · molades-synthesise
Changed:             "Proving fit" split back out of C2. Referrer-side fit checks (n50 n51 n53 n56 n63 n65 n82) stay in C2;
                     candidate-side notes (n11 n22 n23 n29) become C5, "Candidate can't tell how strong a fit they are
                     before they spend a request", marked THIN.
Caused by:           Devansh, 17 Sep 2026: "checking fit is mostly pain point of referrer, but candidates wud also like
                     to have it so that they can see the potential of them getting selected acc to fit".
Result:              Five clusters. Devansh also said many candidates tailor resumes to the job description because ATS
                     software filters on match. Not in the four transcripts or the desk research, so recorded in C5 as
                     guessing, not used as evidence.

DECISION · 17 Sep 2026 · molades-synthesise
Decided:             Draft jobs: C2 + C4 combine into J3 (referring a stranger for minutes), C1 + C5 into J1 (asking where
                     it will be read), C3 stays as J2 (knowing what happened). One insight statement each. Three
                     candidate problem statements: A referrer side, B candidate side, C both sides.
Rejected:            Keeping five separate jobs (two pairs are one job seen twice); combining jobs across the two sides
                     (a job has one "I").
Because:             Draft by AI, following the RedBus artefacts page (combine, then one insight per final job).
                     The choice between A, B and C is Devansh's.
How sure:            worked it out

DECISION · 17 Sep 2026 · molades-synthesise
Decided:             Problem statement: an employee asked for a referral by someone they don't know has to do the
                     candidate's work before they can say yes, so most don't, and the candidate never finds out.
                     Primary: the request makes the referrer do the candidate's work. Secondary: the answer never travels back.
Rejected:            A (referrer side only): ignores the candidate who never learns what happened. B (candidate side
                     only): describes symptoms, and rebuilds old Sidedoor.
Because:             Devansh: "A, B, C all are true". C holds A and B as its two sides. Devansh asked AI to choose; AI
                     gave its view and reason, Devansh agreed.
How sure:            saw it (what happens) · worked it out (why) · guessing (that a complete request gets referred more)
Traces to:           n70 n76 n77 n57 n59 n60 n71 n73 n75 n87 n62 n69 n01 n25 n34 n35 n36 n58 n83 n47 n64

LEARNED · 17 Sep 2026 · molades-scope
Believed:            Referrals break because of a trust gap: referrers can't judge strangers and fear for their reputation,
                     so they need match scores, graded recommendations and spam limits (old Sidedoor, FigJam problem statement).
Found:               The two real referrers already have simple rules and don't fear for their reputation (n50, n55, n76).
                     What stops them is the work a request hands them (n57, n59, n60, n70, n71, n76), for a low reward (n87).
The part that was wrong: "referrers cannot confidently evaluate unknown candidates"
This made worthless: the four-level recommendation screen, request limits, the ranked inbox, the "trust layer" as
                     the core bet, and swipe matching (no note supports it). The live case study's screens 03 and 05.
So now I believe:    Employees drop strangers' requests because the request makes them do the candidate's work.

DECISION · 17 Sep 2026 · molades-scope
Decided:             SCOPE.md v2 (draft): a feature inside LinkedIn. Moment: a candidate asking an employee they don't know
                     for a referral to one job, until they hear what happened. Number: % of those requests the employee
                     submits. Guardrail: employees turning off referral requests must not rise.
Rejected:            A new standalone app (both sides must join; referrers have little reason; Fishbowl's referral
                     communities are quiet, n28). A referrer-shared link as the home of the product (only helps after a
                     referrer agrees; kept as an idea).
Because:             All four already ask and get asked on LinkedIn (n04 n07 n09 n29 n49 n68 n69). Answers the mentor's
                     critique with the notes.
How sure:            saw it (where they ask) · guessing (the number and guardrail, no baseline)

CHANGE · 17 Sep 2026 · molades-scope
Changed:             SCOPE.md v2 rewritten: Sidedoor is its own product, not a feature inside LinkedIn. Added the
                     cold-start bet (referrers first use a link candidates fill in, n66) and a second kill condition.
Caused by:           Devansh, 17 Sep 2026: "I don't want it to be just a feature... Let's be confident that it can be a
                     new product... Through the business lens and product thinking lens, we will justify why this
                     product will work with proper reasoning, data, and research."
Result:              The mentor's critique is rejected, and the rejection has to be defended. AI said the risk once:
                     all four people ask on LinkedIn today, and Fishbowl's referral communities are quiet (n28).

DECISION · 17 Sep 2026 · molades-scope
Decided:             Sidedoor as its own product.
Rejected:            A feature inside LinkedIn (mentor's suggestion, and the earlier draft of v2).
Because:             Devansh's call. Supporting reasons: the work sits between LinkedIn and the company portal, which
                     neither owns (n46 n47 n57 n58 n59 n60 n71); referrers get value from the link before the network
                     exists (n66); both candidates asked for a dedicated place (n24 n45).
How sure:            worked it out (the reasons) · guessing (that referrers adopt it)

CRITIQUE · 17 Sep 2026 · molades-scope · Source: user
Finding:             Devansh reports a follow-up conversation with one interviewee, and the mentor's view that there is no
                     new reward for referrers. Proposed: the referrer's incentive is better candidates picked by an AI
                     engine, so they can refer for more roles and earn more bonuses; candidates get request limits and
                     skill-matched referral search.
Severity:            major
Layer:               the bet
Action:              saved as Idea 1–4 in SCOPE.md for molades-ai. Not evidence until the conversation is written down
                     (who, and what they said). Checked against the notes: the AI match is backed as a wish (n65, n23);
                     "more bonuses" is in tension with n87; request limits can't rest on spam (n19, n61).
