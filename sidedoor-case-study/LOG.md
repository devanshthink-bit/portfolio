# Devansh Somvanshi — Build Log

**Project:** Sidedoor, a product for job referrals in Indian tech hiring. Being re-done properly so the case study holds up in interviews.
**Started:** original work before this log existed (dates not recorded). This log started 17 Sep 2026.

## Where things stand

Bet:        employees drop strangers' referral requests because the request makes them do the candidate's work, not because they won't help (SCOPE v2, draft)
Evidence:   thin. 4 real interviews with 2 people (each as candidate and as referrer), 1 remembered follow-up, desk research without source links
Files:      SCOPE.md [x] v2 draft, v1 kept, landscape · BUSINESS.md [x] draft · BRIEF.md [x] AX Spec, plan draft · RESEARCH.md [x] notes, sort, five clusters, jobs, insights, three candidate problem statements · BRIEF.md [ ] · DESIGN_LANGUAGE.md [ ] · build [ ] Figma V2 exists, not a coded build · live [ ]
Rounds:     1. Mentor's critique (the product and referrer incentive). No change has come from it yet
Open:       business lens with sources, source links for desk research,
            live case study still shows AI-sourced quotes and screens that aren't in Figma
Next:       molades-language

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

CRITIQUE · 17 Sep 2026 · molades-scope · Source: self
Finding:             Devansh reports a follow-up conversation with one interviewee, and the mentor's view that there is no
                     new reward for referrers. Proposed: the referrer's incentive is better candidates picked by an AI
                     engine, so they can refer for more roles and earn more bonuses; candidates get request limits and
                     skill-matched referral search.
Severity:            major
Layer:               the bet
Action:              saved as Idea 1–4 in SCOPE.md for molades-ai. Not evidence until the conversation is written down
                     (who, and what they said). Checked against the notes: the AI match is backed as a wish (n65, n23);
                     "more bonuses" is in tension with n87; request limits can't rest on spam (n19, n61).

DECISION · 17 Sep 2026 · molades-scope
Decided:             BUSINESS.md, built with the mentor's Product Anatomy slides (PAM04 L01–L04, PAM05 L03). Business
                     model: two-sided marketplace, referrers are the scarce side. Free for both sides first; companies pay
                     later; candidates may pay only for tools that help themselves. Strategy: quality-as-identity, every
                     request reaching a referrer is complete and a real fit. NSM: referrals submitted per active referrer
                     per month. Input metric: request-to-referral rate. Guardrail: referrers turning off requests or
                     leaving must not rise. Four loops: two acquisition, one engagement, one monetisation.
Rejected:            Candidates paying to see or reach referrers (V2 Premium; sells access to the scarce side, the
                     pay-to-play bias FigJam criticised). Referrers paying (kills supply). Ads (rewards time spent, the
                     opposite of a referral done in minutes). NSM candidates: sign-ups, requests sent, swipes or matches,
                     profile completion, messages sent (all vanity by the L02 checklist).
Because:             Devansh asked for the business side to be decided and included (17 Sep 2026). Applied the slides'
                     tools: the marketplace row of the model → pressure → design table, the four-question NSM checklist,
                     input vs output categories, the causal chain, and loop type with touchpoint and metric.
How sure:            worked it out (model, strategy, metrics) · guessing (that companies pay, and that the loops run)

CRITIQUE · 17 Sep 2026 · molades-scope · Source: AI
Finding:             Checked Figma V2 against the strategy (L04 "advance, neutral or contradict"). Contradicts: swipe cards
                     (built for volume), Premium paywall (sells access to referrers), referrer updating five stages by hand
                     (adds work to the scarce side). Advances: resume auto-fill, referrer JD upload, candidate tracking.
                     Neutral with risk: messaging.
Severity:            major
Layer:               the bet
Action:              deferred to molades-brief, flow by flow

LEARNED · 17 Sep 2026 · molades-research
Believed:            The 4 real transcripts were 4 different people: Candidate 1, Candidate 2, Referrer 1, Referrer 2.
Found:               They are 2 people. The Infosys employee is Candidate 1 and Referrer 1; the Accenture employee is
                     Candidate 2 and Referrer 2. Each was interviewed once as a candidate and once as a referrer.
                     (Devansh, 17 Sep 2026)
Changed:             Every file now names them by company and role ("Infosys (as candidate)"). The data check, bias line
                     and every "four people", "both candidates", "both referrers" corrected to two people. The
                     follow-up conversation (with the Infosys employee) added as n92, marked remembered.
What this made worthless: any claim that a pattern came from four people. The strongest patterns are now "both people".
                     Worth keeping: both have been on both sides of a referral.

CHANGE · 17 Sep 2026 · molades-research
Changed:             Participants named: Samarth (the Infosys employee, Candidate 1 and Referrer 1) and Riya (the Accenture
                     employee, Candidate 2 and Referrer 2). Labels in RESEARCH, SCOPE, BUSINESS and the raw transcript
                     headers now read "Samarth (as candidate)", "Riya (as referrer)". Earlier LOG entries keep the old labels.
Caused by:           Devansh, 17 Sep 2026: "You can mention the real name. Samarth is the candidate one and refer one. And
                     Riya is candidate 2 and refer 2."
Result:              Notes use real first names, as the rules ask. Not the same Samarth as in the RedBus research.

DECISION · 17 Sep 2026 · molades-scope
Decided:             Premium: candidates pay only for tools that help themselves (fit check before asking, profile
                     feedback). Never to reach, see or jump ahead of referrers. V2's Premium screen becomes a candidate tool.
Rejected:            Candidates paying to see who wants to refer them (V2 as designed); no candidate payment at all.
Because:             Devansh: "Whatever is correct and has proper reasoning behind it, so that I can explain and justify
                     it properly in interviews". AI's reasons: referrers are the scarce side and selling their attention
                     breaks the quality promise; paying doesn't change a referrer's rule (n50, n76, n77); candidate tools
                     raise request quality, which moves the North Star (n23, C5); companies already pay for referrals (n62, n87).
How sure:            worked it out · guessing (that candidates or companies will pay)

DECISION · 17 Sep 2026 · molades-landscape
Decided:             Landscape of LinkedIn, GetMeReferred, EasyRefer, Instahyre and no-product, from Devansh's screenshots
                     at full size plus GetMeReferred's pricing page. Convention: the ask is free text plus a resume; fit is
                     shown to candidates, and sold to them; nobody shows what happened to a referral. Sidedoor pursues
                     three gaps: the complete request, status passed on by the referrer, fit shown to the referrer.
Rejected:            Competing on discovery and candidate-side fit (LinkedIn already has "People you can reach out to" and
                     match details). "Nobody reads the company's status" as an opening (binding: no outside access, n46).
                     Free, unlimited reach as an opening (binding: open systems fill inboxes; GetMeReferred uses price).
                     Jumbl, left out (screens show an internship marketplace, not referrals).
Because:             The skill's question, "what do they know that we don't?", asked of every gap.
How sure:            saw it (screens) · worked it out (reasons, pricing page)

LEARNED · 17 Sep 2026 · molades-landscape
Believed:            Sidedoor could win on discovery (ranked referrers) and on showing candidates their fit.
Found:               LinkedIn already puts "People you can reach out to" and "Show match details" on every job, and
                     GetMeReferred already lists willing, verified referrers.
The part that was wrong: "candidates find relevant referrers"
This made worthless: the old case study's Screen 01 as a differentiator; Idea 4 as a reason to exist.
So now I believe:    Sidedoor's reason to exist is what nobody does: a request that arrives complete, status the referrer
                     passes on, and fit shown to the referrer.

DECISION · 17 Sep 2026 · molades-ai
Decided:             AX Spec draft 1 in BRIEF.md. The model does two jobs: resume and job description into fields (both
                     sides), and ordering a referrer's requests by fit with the reasons shown. Level: the model does it,
                     the person checks, for both. Surface: Idea 6 (list ordered by fit, "Lower match" collapsed but
                     referable) with Idea 5 (fit breakdown on each card) and Idea 7 (portal-ready panel), plus Idea 9
                     (the referrer's own rule). Controls: where did this come from, why did it do that, override. No
                     single fit score; counts instead.
Rejected:            The model just does it (hiding or auto-declining low fits: silence for candidates, a decision under
                     the referrer's name, and Samarth refers borderline matches on purpose, n53). Arrival order with
                     suggestions only. Idea 10, one-at-a-time swipe (volume). Idea 12 as the main surface (slow). A chat
                     box. Generating the candidate's message (n76 n77; the landscape's do-not-inherit). Predicting hire chance.
Because:             Draft by AI following the skill; Devansh's n92 idea kept as ordering, not hiding.
How sure:            worked it out · every material fact guessing

DECISION · 17 Sep 2026 · molades-ai · Source: self
Decided:             Lower-match requests stay visible to the referrer, collapsed under "Lower match", and can still be referred.
Rejected:            Hiding them completely (Devansh's earlier "only showing curated candidates").
Because:             Devansh: "visible but collapsed". Reasons given: a hidden request is silence for the candidate (C3),
                     and Samarth refers borderline matches on purpose (n53).
How sure:            worked it out

DECISION · 17 Sep 2026 · molades-brief
Decided:             Shape: its own app for both sides, with a no-install link page as the way in for strangers. Words from
                     the interviews: referral request, job ID, portal, match, and five stages (Submitted, In interviews,
                     On hold, Selected, Not selected) in their portals' words. 16 screens; main path 8 steps across two
                     people, ending when the candidate sees "Submitted". Every V2 flow marked keep, change or cut.
Rejected:            The link page alone (can't hold status over weeks, n44 n45). A LinkedIn change (Devansh, 17 Sep).
                     V2's swipe cards (volume), "Referral Accepted" match screens (not the finish), six manual stages
                     (work for the scarce side), four-step manual creation (the document already fills it), referrers
                     browsing candidates who didn't ask (consent the research never touched), a long message box (n76).
Because:             Tied to C2 (complete request), C3 (status back), C4 (referrer effort), and the landscape's gaps.
How sure:            worked it out

CRITIQUE · 17 Sep 2026 · molades-brief · Source: self
Finding:             Main path step 7, the referrer coming back to tap "I've submitted it on my portal". Devansh: "i think
                     most referrers wont do this. why wud they care to update this for candidate". The status loop
                     depended on the scarce side doing unpaid work (C4).
Severity:            major
Layer:               steps
Action:              fixed. "Mark as submitted" is now the last tap of the Refer task, and clears the referrer's own list.
                     The candidate can confirm it from the company's automated email (n72 n47). Main path 8 → 7 steps.
                     NSM now counts a referral confirmed by either side (BUSINESS.md).

---

DECISION · 2026-09-17 · molades-language
Decided:   Keep V2's language (Inter, 4 sizes, 12/8/4 radius, soft shadows, blue #2563EB action, green #10B981 brand). Density "between": lists dense (3 requests + actions in one screen), forms spacious. Blue only means "tap". Status colour by meaning: Sent neutral, progress green, On hold amber, Not selected neutral.
Rejected:  V2 success/error/amber text colours (low contrast), second blue #007AFF, decimal fit score, swipe, gold Premium button, all-caps SIGN UP, blue "Under Review" tag.
Because:   The referrer decides on a work break, so the list has to show enough requests at once. "Not selected" is an outcome, not an error, so it is not red. Two colours for one meaning, or one colour for two meanings, makes status unreadable.
How sure:  worked it out

LEARNED · 2026-09-17 · molades-language
Rounds run:      4
Biggest gap between round 1 and final:  density. The fit line "(you need 2–5)" wrapped and made each card about 25% taller than V2's. Second: blue was doing two jobs (button and status).
Did not close:   nothing on the 6 dimensions. The tone adjectives are a draft until Devansh confirms them.

DECISION · 2026-09-17 · molades-language
Decided:   Short on list screens, detailed on the single request screen.
Rejected:  One density everywhere.
Because:   On the list the referrer is scanning. On one request they are deciding whether to put their name on a stranger, so they need to see where each fact came from.
How sure:  worked it out (Source: self)

DECISION · 2026-09-17 · molades-build
Decided:   Existing V2 screens stay untouched. All screens are copied below them after a gap, and changes happen only in the copies.
Because:   V2 is kept as a backup and shown as an iteration in the case study.
How sure:  saw it (Source: self)

CHANGE · 2026-09-17 · molades-build
Changed:    All 11 V2 flows duplicated in Figma V2 file (page "UI Screens"), 14,218px below the originals, named "V3 · <flow>", with a "V3 — redo from research" label above. V2 frames not touched (checked: 11 originals, 11 copies).
Caused by:  Devansh, 17 Sep: keep V2 as a backup and as an iteration for the case study.
Result:     All V3 edits happen in the copies only.

DECISION · 2026-09-17 · molades-build
Decided:   Slice 1: "Referral requests for this job" (referrer), built in the V3 copy of Referrer/Candidate Screen/1 (Figma node 5195:8420). Reused V2 AppHeader, BottomNav, AvatarPlaceholder, text styles, elevation-1 and colour variables; no new values. Cards short: name, current role, "4 of 6 skills match · 3 yrs", sent when. "Lower match (2)" collapsed below.
Rejected:  Building it as a new frame from scratch (loses V2's components); showing the experience range on the card (moved to the request screen, per the density call).
Because:   The list is for choosing which request to open first; detail belongs on the request screen.
How sure:  worked it out. Names and companies on the cards are sample data, not research.

LEARNED · 2026-09-17 · molades-build
Tried:              Clearing the swipe screen's Card Section and dropping the new list in.
Expected:           List sits at the top, left-aligned.
Actually happened:  The section was centre-aligned both ways with a grey background, so the list floated in the middle and the new list frame got a default white fill.
Cost:               one extra pass
Now know:           V2's containers carry alignment and fills that don't show until content changes. Check container settings before reusing one.

CHANGE · 2026-09-17 · molades-build
Changed:    People's photos copied from Figma V0 into Figma V2: 105 avatars, 16 people, in both the original V2 screens and the V3 copies. Only the avatar image was set; nothing else on the V2 screens changed.
Caused by:  Devansh, 17 Sep: photos were in V0 but missing in V2. Asked where; answered "both".
Result:     Each avatar gets the photo of the person named on the same card (matched by name, V0 → V2). The 3 sample cards on the new Referral requests screen stay without photos, since those names aren't from V0.

LEARNED · 2026-09-17 · molades-build
Tried:              Using V0's image references directly in the V2 file.
Expected:           Would need to download and re-upload each photo.
Actually happened:  V2 already holds V0's images (V2 was built from V0), so they applied directly. One avatar (Candidate Match Screen) had no name next to it; V0 showed it was Abhinav Saxena.
Cost:               none
Now know:           Check the node in the older file when a match by name fails, instead of guessing.

CHANGE · 2026-09-17 · molades-build
Changed:    Request list now uses V2's own people: job at Flipkart (V2's referrer is Nithin Agarwal, Design Manager, Flipkart), cards for Abhinav Saxena, Arpita Singh, Aviral Dixit with their V0 photos. Replaced sample names Neha Kapoor, Arjun Mehta, Kabir Rao.
Caused by:  Devansh, 17 Sep: photos missing; V0 has photos for V2's people.
Result:     The list and the request screens show one consistent story. Roles for Arpita and Aviral, the job ID and skill counts are still sample data.

DECISION · 2026-09-17 · molades-build
Decided:   Slice 2: "Referral request (referrer)" in two V3 screens in Explore: (1) the decision view: who, "How they match" with each skill ticked or not and where it came from, checked date, "Something off?" line, their note, resume, Not moving forward / Refer; (2) the after-Refer view: "Now add them on Flipkart's portal", 11 portal-ready details each with copy, Mark as submitted with "Abhinav will be told".
Rejected:  V2's long profile card (bio, projects, "9.4 Strong Fit") as the decision view; a separate later "update status" step.
Because:   Detailed wins on this screen (language decision). The referrer needs the evidence behind the count, not a whole profile. Mark as submitted sits right after copying, so it's the last tap of the same task.
How sure:  worked it out. The note text comes from Abhinav's V2 project ("Blinkit Merchant App UX Revamp"); contact details, date of birth and skill sources are sample data.

CHANGE · 2026-09-17 · molades-build
Changed:    Deleted the V3 copy of the 2nd referrer swipe screen (Referrer/Candidate Screen/2, long version); the after-Refer view sits in its place. The V2 original is untouched.
Caused by:  BRIEF.md, cut list: swipe cards.
Result:     One swipe screen fewer in V3.

DECISION · 2026-09-17 · molades-build
Decided:   Slice 3, V3 Update flow. (1) "Your referrals": record strip "What your referrals reached: 1 selected · 1 in interviews · 1 on hold"; "Waiting on an update" first (submitted over a week ago, oldest first, with Update); then "All referrals · Product Designer". Stages in the five portal words. Update button only where a stage can still change. (2) "Seen it move?" sheet: one tap on In interviews / On hold / Selected / Not selected, "Aviral sees it straight away", "No change yet".
Rejected:  V2's tabs (All / Awaiting Action / Interviews / Closed) and the six-stage timeline with Submit Update.
Because:   Referrers are the scarce side and have little reason to update (Devansh's critique, 17 Sep). Two taps (Update, stage) instead of picking on a timeline and confirming. The record strip is the referrer's own reason to keep it current (Engagement loop, BUSINESS.md).
How sure:  worked it out. Who is at which stage and the day counts are sample data.

CHANGE · 2026-09-17 · molades-build
Changed:    Deleted V3 copies of Update Bottom Sheet/2–6 and Referrer/Update Preview Screen/2–4 (tab views). V2 originals untouched.
Caused by:  BRIEF.md, Update: "one tap for the current stage"; tabs replaced by the waiting / all grouping.
Result:     V3 Update flow is 2 frames: list and sheet.

LEARNED · 2026-09-17 · molades-build
Tried:              Removing the Submit Update button, then finding the Cancel button in the same saved list of buttons.
Expected:           Cancel found by its label.
Actually happened:  The script read the removed button's label, failed, and Figma rolled the whole change back.
Cost:               one retry
Now know:           Pick every node by ID before removing any of them.

Also noted for molades-attack: V2's Tag component uses the light success/error/amber text colours flagged in DESIGN_LANGUAGE.md. Not changed, because the component is shared with the V2 originals.

DECISION · 2026-09-17 · molades-build
Decided:   Slice 4: "Check your referral request" (candidate), new V3 screen in Explore, in place of the V3 copy of long Candidate/Job Screen/3. Order from BRIEF.md: to Nithin Agarwal with job and job ID; "Still needed · 1: Preferred interview locations. Flipkart's portal asks for this, and it isn't on your resume" with the field right there; "Your details, filled from your resume", each editable; "How you match" with what's missing; optional one-line note; "2 of 5 referral requests left this week"; Send off with "Add preferred interview locations to send."
Rejected:  V2's free-text message to the referrer; letting Send go with details missing.
Because:   The chosen problem: referrers do the candidate's work before they can say yes. This screen moves that work to the candidate, before sending. Built in the state that shows the point (one detail missing).
How sure:  worked it out. Detail values, the job ID and "2 of 5" are sample data.

CHANGE · 2026-09-17 · molades-build
Changed:    After Refer screen moved to its own spot (x 2364). It had been placed on top of the Referral Request screen in slice 2.
Caused by:  Found while placing this slice: two screens at the same position.
Result:     No overlapping screens in V3 Explore.

LEARNED · 2026-09-17 · molades-build
Tried:              Placing new screens by setting x and y inside V3 Explore.
Expected:           Each screen at its own spot.
Actually happened:  Explore is a grid frame. It ignores x and y, so Check your referral request, Referral request and After Refer all sat stacked in one cell. Devansh couldn't find the screen; his screenshot showed the stack. My earlier "overlap fixed" was wrong: I checked the numbers, not the picture.
Cost:               one round with Devansh
Now know:           In a grid frame, place screens by row and column. Check with a screenshot of the whole flow, not the x/y values.

CHANGE · 2026-09-17 · molades-build
Changed:    V3 Explore row 2 now reads: Job screens (2), Check your referral request, Referral request, After Refer, Ayesha's card (still to cut).
Caused by:  Devansh, 17 Sep: "where?" with screenshot.
Result:     All three new screens visible side by side (checked with a screenshot).

DECISION · 2026-09-17 · molades-build
Decided:   Slice 5, V3 Tracking (candidate). List renamed "Your referral requests", tabs removed, newest first (Flipkart, submitted today, matches the referrer story). Tags in plan words: Sent, Referred, Submitted, In interviews, Selected, Not selected, Not moving forward. Five detail screens, one per state, each with "where it is now" in a sentence and what happens next above the timeline: Sent (Zepto, no Message button before Refer, "No answer in 7 days? You can withdraw it"); Referred (Google, "Heard from Google? Got an email saying your application was submitted? Mark it."); Submitted (Meta, "Interviews usually start within 2–3 weeks", Riya's figure); Not selected (CRED, "Find more jobs"); Selected (Swiggy, "Thank Joy" demoted to a secondary button). Timeline: Sent · Referred · Submitted · In interviews · Selected (or not).
Rejected:  V2's tabs, "Waiting for Referrer / Under Review / Interview Scheduled / Interview in Progress / Final Decision", Message Referrer before a referral, green "Thank Referrer" as the main button.
Because:   C3: the candidate can't tell what happened. A sentence says it; the timeline shows it. Every stage word is one a referrer can see on their portal (BRIEF.md words).
How sure:  worked it out. Companies, dates and referrers are V2's sample data; "2–3 weeks" is from one interview (guessing as a norm).

CHANGE · 2026-09-17 · molades-build
Changed:    Deleted V3 copies of Candidate/Track Preview Screen/2–4 (tab views); moved detail screens left in the grid; removed V2's "Unfortunately…" and "Congratulations…" lines that overlapped buttons once the summary was added. V2 originals untouched.
Caused by:  BRIEF.md tracking changes; overlap seen in the flow screenshot.
Result:     V3 Tracking is 6 screens: list + 5 states.

LEARNED · 2026-09-17 · molades-build
Tried:              Adding the "Heard from Google?" card to a fixed 844px screen.
Expected:           Screen grows.
Actually happened:  V2's inner frames had fixed heights, so the Message Referrer button was pushed out of view and cut off.
Cost:               two small passes
Now know:           When adding content to a V2 screen, set the inner frames to hug first, then check the bottom of the screen.

For molades-attack: "Mark it" uses V2's small Tag as a button, likely under 44pt to tap.

CHANGE · 2026-09-17 · molades-build
Changed:    New V3 screens now match V2's own data. Nithin's Flipkart job is "Interaction Designer, 3+ yrs" (V2 JD and Explore card), not "Product Designer, 2–5". The 6 skills come from V2's JD (UX Research, Prototyping, A/B Testing, User Flows, Figma) plus Interaction Design. Abhinav's matched skills are sourced from his V2 projects; missing: User flows, A/B testing. Arpita shown at 3 yrs.
Caused by:  Self-check while reading V2 onboarding: my match screen said "Usability testing: not in their resume", but Abhinav's V2 MakeMyTrip project lists Usability Testing.
Result:     List, request, after-Refer, check, your referrals and job post screens tell one story that V2's data backs.

LEARNED · 2026-09-17 · molades-build
Tried:              Writing sample data for new screens from memory of the brief.
Expected:           Sample data is harmless.
Actually happened:  It contradicted the data already in V2 (job title, experience, a skill). An interviewer comparing screens would see it.
Cost:               one consistency pass
Now know:           Read the existing screens' data before inventing any. Sample data has to agree with itself.

DECISION · 2026-09-17 · molades-build
Decided:   Slice 6, V3 Onboarding. Candidate: "Check your details" replaces Manual Profile steps 1–4: filled from your resume (8 of 12, each editable), "Still needed · 4: date of birth, career gaps, preferred interview locations, notice period. These aren't usually on a resume, but referrers' portals ask for them", resume file, Save details. Referrer: "Check your job post" replaces Manual Job steps 1–4: "Still needed · 1: Job ID" first, filled from the description, "Experience must match" rule (Idea 9, on), JD file, Post job off until the job ID is in. Choice screens reworded ("Start with your resume. We'll fill in what we can.", "Fill in myself"; "Post your first job" instead of "Create your first referral").
Rejected:  Four manual steps each side; projects and tagline in onboarding; calling a job post a "referral".
Because:   AX Spec: the model fills, the person checks. The fields that matter are the ones portals ask for (C2), and the job ID is the thing referrers chase most (Riya n70 n76).
How sure:  worked it out. "8 of 12" and field values are sample data.

CHANGE · 2026-09-17 · molades-build
Changed:    Deleted V3 copies of Candidate/Manual Profile Creation Screen/2–4 and Referrer/Manual Job Creation Screen/2–4. V2 originals untouched. Checked the flow with a screenshot: no stacking.
Caused by:  BRIEF.md: "Four-step manual profile and job creation → one review screen each".
Result:     V3 Onboarding: 5 referrer screens, 4 candidate screens.

CHANGE · 2026-09-17 · molades-build
Changed:    Flipkart job counted as 7 skills everywhere (V2 candidate card: "Matching 4/7 skills"; chips UX Research, Interaction Design, Prototyping, AI-Assisted Design, Design System, Figma, plus A/B Testing from V2's JD). Abhinav 4 of 7; missing AI-assisted design, Design system, A/B testing. Location on the job post: "Bengaluru, KA · Remote or hybrid" (V2 card).
Caused by:  Self-check before building Jobs: V2's own card said 4/7, my screens said 4 of 6.
Result:     Numbers agree across Jobs, Job, Check, request list, request, job post.

Note: V2 itself disagrees on Flipkart's skills (JD upload lists UX Research, Prototyping, A/B Testing, User Flows, Figma; the card lists different chips). V3 follows the candidate card.

DECISION · 2026-09-17 · molades-build
Decided:   Slice 7, V3 Explore candidate side. "Jobs with someone who refers", newest first: each card shows the referrer's photo, job, company, location, experience, "4 of 7 skills match · Nithin refers", when posted. "Job" keeps V2's full job card, match reworded, Skip removed, one button "Ask Nithin for a referral". Explore laid out as two paths: candidate row (Jobs → Job → Check your referral request), referrer row (Referral requests → Referral request → After Refer).
Rejected:  Swipe cards with Skip / Request Referral (Idea 10 rejected; built for volume).
Because:   Ask with intent, not by volume (BUSINESS.md quality-as-identity; landscape do-not-inherit).
How sure:  worked it out. PhonePe and Zomato match counts are V2's.

CHANGE · 2026-09-17 · molades-build
Changed:    Deleted the 6 remaining V3 swipe copies in Explore (Vanya, Avinash, Aarush, Ayesha short and long). V2 originals untouched. Checked with a screenshot.
Caused by:  BRIEF.md cut list: swipe cards, both sides.
Result:     V3 Explore is 6 screens in two rows.

DECISION · 2026-09-17 · molades-build · Source: self
Decided:   Drop Premium for now. No paid candidate tool in V3.
Rejected:  Premium as "see who wants to refer you" (sells access to referrers); a paid Match check (the free app already shows match on every job, so it would need a new tool: match on any job link, or fix tips).
Because:   Devansh, 17 Sep: "drop premium for now". The access rule stays: if candidates ever pay, only for tools that help themselves.
How sure:  worked it out

CHANGE · 2026-09-17 · molades-build
Changed:    Deleted "V3 · Premium Flow" and "V3 · Matching Flow" (Referral Accepted screens and the Share Resume sheet). Removed the "SideDoor Premium" menu card from the 3 V3 profile screens. BUSINESS.md, BRIEF.md and PROGRESS.md updated. V2 originals untouched.
Caused by:  Premium dropped (above); BRIEF.md: "Referral Accepted" folds into the timeline, the share sheet becomes the portal-ready details (built in After Refer).
Result:     V3 has 9 flows. Nothing in V3 mentions Premium (checked by search).

CHANGE · 2026-09-17 · molades-build
Changed:    BUSINESS.md Premium update now carries the full reasoning (4 reasons with how-sure tags), when to revisit, and an interview line.
Caused by:  Devansh, 17 Sep: "Did you write the reasoning why premium was dropped?" The first note had one short reason only.
Result:     The call is Devansh's; the reasons are marked worked out / guessing for him to check.

DECISION · 2026-09-17 · molades-build
Decided:   Slice 8, new "V3 · Link Page Flow" (where V3 Matching was). A web page, no app: (1) sidedoor.app/r/nithin-agarwal, "Ask Nithin Agarwal for a referral", job and job ID from the link, "Send a complete request. No app needed.", upload resume, Send off; (2) resume read, the same details as Check your referral request (including preferred interview locations), optional note, Send on; (3) "Sent to Nithin. Nithin gets every detail Flipkart's portal asks for. We'll email you when there's news." then "Save these details and track this request" with "Get the Sidedoor app" / "Not now". Sample candidate: Arpita Singh, who already appears in Nithin's request list.
Rejected:  Making a stranger install the app before asking; app header back/bell and bottom nav on a web page.
Because:   Cold start (SCOPE.md, Acquisition loop 1, n66): referrers bring the candidates who already message them; the install ask comes after the candidate got value.
How sure:  worked it out. That referrers will share the link is guessing (BUSINESS.md).

LEARNED · 2026-09-17 · molades-build
Tried:              Hiding the back and bell icons inside a copied header by searching all its nested icons.
Expected:           Icons hidden.
Actually happened:  Figma lost track of a nested node mid-search and rolled the whole script back. Twice in this build, a failed script left nothing half-done, which made retries safe.
Cost:               one retry
Now know:           Reach nested parts of an instance by their direct path, not a broad search.

CHANGE · 2026-09-17 · molades-build
Changed:    V3 Link Page grid column gap 0 → 101, same as the other flows.
Caused by:  Devansh, 17 Sep: "Why are these screens stuck with each other?" The flow was copied from Messaging, whose grid had one column and no column gap.
Result:     Screens spaced like every other flow (checked with a screenshot).

DECISION · 2026-09-17 · molades-build
Decided:   Slice 9, referrer states in V3 Explore's referrer row. (1) Referral requests (0): "No referral requests yet. Share your link when someone messages you about this job.", the link, "Copy your link", "Paste it in the LinkedIn or WhatsApp chat". (2) Not moving forward sheet: optional reason chips (Experience doesn't match, Skills don't match, Role is closed, Can't refer for this team), "Abhinav sees it straight away", Not moving forward / Cancel. (3) Not enough to judge: no count, "Not enough in their resume to judge fit for this job. Read it before you decide.", resume, both buttons (sample: Amit Patel). (4) Marked as submitted: "Abhinav has been told. Once a week we'll ask if you've seen it move." Back to referral requests.
Rejected:  A required reason for saying no; showing a guessed score when the resume is thin.
Because:   Saying no should cost almost nothing, or referrers go silent (C2, C3). AX Spec: "Not sure" shows no number rather than a made-up one.
How sure:  worked it out. Strings from BRIEF.md "When it's not perfect" and AX Spec Step 5.

CHANGE · 2026-09-17 · molades-build
Changed:    V3 Explore grid 6 → 7 columns; flow frame and banner widened to 4536 so the grid sits inside. Checked: no stacked cells, no overlap with other flows.
Caused by:  Four new state screens in the referrer row.
Result:     Explore: candidate row 3 screens, referrer row 7.

DECISION · 2026-09-17 · molades-build
Decided:   Slice 10, V3 Edit Profile. Candidate edit is one screen, "Edit your details": the same fields as onboarding's "Check your details", all filled ("Details portals ask for: date of birth 12 Mar 1999, career gaps None, preferred interview locations Bengaluru, Remote, notice period 30 days"), resume, Save changes. Referrer edit profile kept from V2.
Rejected:  V2's 4-step candidate edit (tagline, projects, preferred roles, links).
Because:   BRIEF.md: edit profile matches the new profile fields. Values agree with Check your referral request and V2's notice period (30).
How sure:  worked it out

CHANGE · 2026-09-17 · molades-build
Changed:    Deleted V3 copies of Candidate/Edit Profile Screen/1–4. V2 originals untouched.
Caused by:  Slice 10.
Result:     First build pass complete. Next: molades-attack.

CRITIQUE · 2026-09-17 · molades-build · Source: self
Said:     "The new screens don't match the existing design language. They don't feel part of this app."
Checked:  Measured V2 (Track Referrals 1198:8792, Track details 1247:5475, Add your experience 1054:5510) against new V3 screens (Referral requests, Referral request, Check your referral request). Same tokens (Inter, colours, radius 12, elevation-1, padding 16), different patterns:
  1 Titles: V2 centred (in the top bar, or centred title + subtitle). New: left-aligned 20/600 titles in the body, with a caption line above.
  2 Section labels: V2 puts an icon + 14/600 label above a card ("Current Location", "About", "Work Experience ✎"). New: headings inside cards with a caption on the right.
  3 Callouts: V2 has none; it uses white cards with shadow, #FAFAFA inputs with shadow, or a small Tag. New: flat grey #F0F1F2 and amber #FFFBEB boxes with no shadow.
  4 Status: V2 shows a coloured Tag plus time with a refresh icon. New: plain text lines, time with no icon.
  5 Icons: V2 uses blue filled checks and outline circles for progress, a green verified shield after names, one small edit icon per section. New: green checks, grey x icons, no shield, a large grey pencil on every row.
  6 Detail rows: V2 lists are single 14/600 lines. New: two-line rows with a blue "From resume" line under each.
  7 Spacing: V2 content starts 24 below the header; new 16. People avatars V2 44, new 40 and 56.
Action:   Fix across V3 (pending Devansh's go-ahead). Add a "V2 patterns" section to DESIGN_LANGUAGE.md so new screens use them.

LEARNED · 2026-09-17 · molades-language
Tried:              Matching V2 with a generic test screen (header, cards, field, buttons, empty, error) and 6 token checks.
Expected:           Matching tokens would make new screens feel native.
Actually happened:  Tokens matched, but V2's patterns (centred titles, labels above cards, tags for status, no tinted boxes, blue progress checks) weren't in the test, so new screens used generic patterns. Devansh saw it before any check did.
Cost:               a fix pass over the V3 screens
Now know:           For a design that already exists, extract its patterns, not only its tokens, and compare real screens side by side.

CHANGE · 2026-09-17 · molades-build
Changed:    Rebuilt 3 V3 screens with V2 patterns (DESIGN_LANGUAGE.md, V2 patterns): Referral requests (title in the top bar, section label with job ID tag, person cards with 44 avatar, verified shield, label/md role, match Tag, refresh-icon time), Referral request (person row + tag, "How they match" label above a timeline-style card with blue checks and empty circles, info tag, note and resume in #FAFAFA boxes), Check your referral request (centred title + subtitle, person row, "Still needed" as a Buffer tag on the field label, details in one #FAFAFA box with one edit icon, no per-row pencils, requests-left as an info tag). Same content, same words.
Caused by:  CRITIQUE 17 Sep (Source: self): new screens didn't feel part of the app.
Result:     Side by side with V2 Track Referrals, Track details and Add your experience, the three read as one app. Remaining V3 screens to redo the same way after Devansh confirms.

CHANGE · 2026-09-17 · molades-build
Changed:    Every remaining new V3 screen rebuilt with V2 patterns (DESIGN_LANGUAGE.md, V2 patterns). Explore: Jobs, Referral requests empty, After Refer, Not enough to judge, Marked as submitted, Not moving forward sheet. Updates: Your referrals (record and groups as icon labels with tags), Seen it move sheet (options as a timeline-style card). Tracking: status sentences as icon labels, "Heard from Google?" in a #FAFAFA box with shadow. Onboarding: Check your details, Check your job post. Edit: Edit your details. Link page: all 3 screens. Same content and words; referrer role shown as "Design Manager, Flipkart" with the job in a tag.
Caused by:  CRITIQUE 17 Sep (Source: self); Devansh: "Do all the screens first."
Result:     Scan of all V3 flows: no flat tinted callout boxes left (only V2's own tags), no per-row pencils, no stacked, hidden or overlapping screens.

LEARNED · 2026-09-17 · molades-build
Tried:              Giving a rebuilt section a white fill bound to the surface colour.
Expected:           White background.
Actually happened:  Two screens rendered the section black, and the screens behind were V2's grey, not white like V2's list screens.
Cost:               two small passes
Now know:           Copy fills from a V2 screen that already looks right instead of rebuilding them.

CRITIQUE · 2026-09-17 · product review · Source: self (Devansh asked for a senior PM + designer pass)
Said:     Review V3 for onboarding, activation, retention, referral and revenue; find drop-offs; add analytics; improve. Changes go in a new version copied from V3.
Found:    PRODUCT_REVIEW.md. Biggest: candidates see value only at screen 7; referrers land on an empty list after posting; the verified shield verifies nothing; the referrer's link disappears once requests arrive; login still sells swiping; sensitive fields asked at sign-up and again per request.
Action:   P1 list (11 changes) to build in V4, pending Devansh's go-ahead. Event plan and 6 dashboards written.
How sure: worked it out. No user has seen V3.

CHANGE · 2026-09-17 · product review
Changed:    All 10 V3 flows and the V3 label duplicated 16,344px below V3 as "V4 · <flow>" with a "V4 — growth and activation fixes" label. V3 untouched (10 V3 flows still there, no overlaps).
Caused by:  Devansh, 17 Sep: "whatever changes you make, make it a new version after copying all UI screens from V3."
Result:     V4 fixes happen in the copies only.

DECISION · 2026-09-17 · V4 · Fix 1 · Login says what Sidedoor is (PRODUCT_REVIEW A1)
Changed:   V3 → V4. Carousel "Right swipe to your next job" → "Get referred by insiders" / "One complete request, not ten DMs" / "Referrers get what their portal needs". Buttons "Continue with Google" + "SIGN UP" + "Already have an account? Login" → "Continue with Google" + "Continue with email", with "New or returning, it's the same button."
Rejected:  Keeping V2's login (it sells the swipe we cut); separate sign-up and login paths.
Because:   The first screen should promise the product people will get. Swipe says volume; Sidedoor's bet is quality. Two entry points (sign up vs login) make people choose before they know which applies; one continue button covers both. All-caps SIGN UP was on the do-not-inherit list.
Metric:    signup_completed / login screen views, split by method.
How sure:  worked it out

DECISION · 2026-09-17 · V4 · Fix 2 · Candidate onboarding: 6 screens to 3, with Skip (PRODUCT_REVIEW C1 C2 C3)
Changed:   V3: Role → Create your profile (Upload or Fill in myself) → Upload resume → Resume uploaded → Check your details (8 filled + 4 still needed) → Jobs. V4: Role → Start with your resume (Upload; links "Fill in myself" and "Skip for now") → Check your details (resume fields only) → "See jobs". Cut: the choice screen and the "uploaded successfully" screen.
Rejected:  Forcing a full profile before any job is visible; making manual fill an equal choice.
Because:   Jobs, the first screen that shows value, was the 7th screen. Every screen before value loses people, and a screen that only says "done" is a tap with no value. Upload is the fast path, so it's the screen; manual fill is the fallback. Skip lets someone see what's there before investing.
Metric:    candidate activation funnel (signup → resume → jobs_viewed → request_sent), skip vs no-skip split; onboarding_skipped(step).
How sure:  worked it out. Risk: people who skip may never add a resume. Fix 4 and Fix 3 catch them at the moment they want to ask.

DECISION · 2026-09-17 · V4 · Fix 3 · Personal details asked just in time (PRODUCT_REVIEW C4)
Changed:   Date of birth, career gaps, preferred interview locations and notice period move out of onboarding into the first "Check your referral request": "Flipkart's portal also asks for · Still needed · 4. Not on your resume. Asked once, saved for your next request." Removed from the details box on that screen. Send helper: "Add the 4 details above to send."
Rejected:  Asking them at sign-up (V3), and asking them twice (V3 asked in onboarding and again on the request).
Because:   Sensitive details before any trust cause drop-off, and at sign-up there's no reason given. On the request, the reason is concrete: this company's portal needs them (Samarth n59 n60). Saved after, so repeat requests stay 3 taps.
Metric:    request_missing_field_shown / _filled (field); % requests arriving complete.
How sure:  worked it out

DECISION · 2026-09-17 · V4 · Fix 4 · Jobs for people who skipped (PRODUCT_REVIEW C1)
Changed:   New V4 screen "Jobs / Skipped Resume": match tags become "Add resume to see match"; a prompt at the top: "See how well you match. Add your resume and every job shows your match." with "Add resume".
Rejected:  Hiding jobs until a resume exists; a blocking pop-up.
Because:   Skipping only helps if the person who skipped still gets value and a clear reason to come back to the step. The match is that reason.
Metric:    % skipped candidates who add a resume within 7 days.
How sure:  worked it out

DECISION · 2026-09-17 · V4 · Fix 5 · Referrer onboarding: verify work email, add job by link, "Your job is live" (PRODUCT_REVIEW R1 R2 R3)
Changed:   V3: Role → Post your first job (Upload JD or Create manually) → Upload JD → JD uploaded → Check your job post → Referral requests (0). V4: Role → Confirm where you work (work email + 6-digit code, "We never contact your company or HR") → Add the job you'll refer for (paste its link or upload the description) → Check your job post → Your job is live (link, "Share your link", "Share later"). Cut: the choice screen and the "JD uploaded" screen.
Rejected:  No verification with a green tick on everyone (V3); requiring a JD file; landing on an empty list right after posting.
Because:   The tick promised something nothing checked. A referral is only worth something if the referrer really works there, for candidates now and for companies in phase 2 (BUSINESS.md). Most referrers have a job link, not a JD file. The moment after posting is when a referrer is most willing to share; an empty list wastes it and Loop 1 (link → complete requests) never starts.
Metric:    referrer activation funnel: signup → work_email_verified → job_posted → link_shared → first request opened → first submitted.
How sure:  worked it out. Verification adds a step; watch drop-off at work_email_verified. "We never contact your company or HR" is a product promise to keep, not a tested fact.

DECISION · 2026-09-17 · V4 · Fix 6 · The link is always one tap away, with a ready message (PRODUCT_REVIEW A2 A3)
Changed:   Referral requests top bar: bell → share icon. New "Share your link" sheet, reusing V2's Share sheet: Copy link, an editable ready message ("Happy to look at a referral for Interaction Designer. Send your details here, it has everything our portal needs: sidedoor.app/r/nithin-agarwal"), WhatsApp/Gmail/Telegram/More. Removed V2's "Save to files". Link also on "Your job is live".
Rejected:  Link only on the empty list (V3), which disappears as soon as Loop 1 starts working; copy-only.
Because:   Loop 1 is the main acquisition loop. Sharing has to be possible every time a stranger DMs the referrer, not only on day one. A ready message removes the "what do I write" pause.
Metric:    link_shared (channel); link_opened → link_request_sent.
How sure:  worked it out

CHANGE · 2026-09-17 · V4 · Fix 5 follow-through · The verified tick means something
Changed:   Removed the verified shield next to candidate names on all V4 screens (15 removed, 8 hidden inside components): request list and screens, sheets, messages, Your referrals, candidate profile. Referrers keep it.
Because:   After Fix 5 the tick means "works at this company, checked by work email". Candidates don't verify a workplace, so a tick on them would say something untrue.

DECISION · 2026-09-17 · V4 · Fix 7 · Four tabs each side, named with the plan's words (PRODUCT_REVIEW C5 R4)
Changed:   Candidate: Referrals · Track · Explore · Messages · Profile → Jobs · Requests · Messages · Profile. Referrer: My Posts · Updates · Explore · Messages · Profile → Requests · Referrals · Posts · Profile (referrer messages open from a request). Active tab set per screen. Done as overrides on V4 screens only; the shared BottomNav component (used by V2) is unchanged.
Rejected:  V2's five tabs: "Referrals" (a heart, reads as saved) next to "Track" was two names for one idea; "Explore" held a referrer's requests; "Updates" held referrals.
Because:   People must find status in one tap (C3, the core candidate pain). Tab names should say what's inside and match the words on every screen ("referral request", "referrals"). Referrer messages only start after Refer, so a whole tab for them is weight without use.
Metric:    request_status_viewed(source: organic); time from push to status view.
How sure:  worked it out

DECISION · 2026-09-17 · V4 · Fix 8 · Cut Saved lists; the link gets a home (PRODUCT_REVIEW T5 A2)
Changed:   Candidate profile: "Saved Referrals" removed. Referrer profile: "Saved Candidates" → "Your links to share".
Rejected:  Keeping Saved (V2).
Because:   Saving belongs to no growth loop (BUSINESS.md) and lets people postpone the decision the product exists to make quick. The link is the acquisition loop, so it needs a place a referrer can always find.
Metric:    link_shared from profile.
How sure:  worked it out

DECISION · 2026-09-17 · V4 · Fix 9 · No answer after 7 days has a next step (PRODUCT_REVIEW T2)
Changed:   New V4 tracking state "No answer after 7 days": tag "No answer", "Sent to Shivangi 7 days ago. No answer. Your request is back, so it doesn't count against this week.", "3 others at Zepto refer for this job. Your details are ready. It takes one tap to ask.", "Ask someone else at Zepto", "Keep waiting for Shivangi".
Rejected:  V3's "you can withdraw it and ask someone else" with no way to do it; auto-sending to someone else without asking.
Because:   Silence is C1, the first candidate pain. The moment a candidate realises nobody answered is when they give up on the product. Giving the request back and offering the next referrer turns a dead end into the next request.
Metric:    ask_someone_else_tapped; % requests closed with an answer; candidate 30-day return.
How sure:  worked it out. "3 others" is sample; the screen only shows when others exist.

DECISION · 2026-09-17 · V4 · Fix 10 · Referrers set a weekly request limit (PRODUCT_REVIEW T4)
Changed:   "Your rules" on Check your job post: "Up to 10 requests a week" (on), "When it's full, candidates see you're full this week and ask again on Monday." Jobs list: Avinash's card shows "Avinash is full this week".
Rejected:  Unlimited requests; hiding a full referrer.
Because:   The guardrail is that referrers turning off requests must not rise (BUSINESS.md). An easier way to ask can flood the scarce side. A cap the referrer controls protects them; showing "full this week" is honest with candidates instead of silent.
Metric:    request_limit_changed; guardrail: referrers turning off requests; % referrers who hit the cap.
How sure:  worked it out. 10 is a placeholder default, not from data.

DECISION · 2026-09-17 · V4 · Fix 11 · Thank-yous reach the referrer (PRODUCT_REVIEW T3)
Changed:   Your referrals record shows "Himani thanked you" with her message, under "What your referrals reached".
Rejected:  Points, badges or leaderboards for referrers.
Because:   Both referrers said the bonus isn't the main reason (Samarth n62; Riya n87 says it's too low to motivate). Knowing a referral helped someone is a reason to open the next request. Gamified points reward activity, not value.
Metric:    thanks_sent; % referrers who submit again within 30 days, with vs without a thank-you.
How sure:  guessing that thanks move retention; worked it out that bonuses don't.

CHANGE · 2026-09-17 · V4
Changed:   All 11 P1 fixes built in V4. Checked: 43 V4 screens, no stacked, hidden, out-of-frame or overlapping screens. V3 untouched.
Result:    ITERATIONS.md written: V2 → V3 → V4 with reasons, for the case study.

CHANGE · 2026-09-17 · V5
Changed:   All V4 flows and label duplicated 16,344px below V4 as "V5 · <flow>". V4 untouched.
Caused by: Devansh, 17 Sep: new version for the borrowed-idea change and a full design audit.

DECISION · 2026-09-17 · V5 · Shared background, borrowed from LinkedIn's "people you know at this company"
Changed:   Jobs (and Jobs for skippers): "Both ex-MakeMyTrip" tag on Nithin's job. Referral requests: "Both ex-MakeMyTrip" on Abhinav, "Same college" on Arpita. Referral request: "In common · Both worked at MakeMyTrip. From your profile and their resume. You were there 2021–22, they were there 2022–23."
Rejected:  Ranking requests by shared background (would push strangers down and hide fit); a separate "connections" screen.
Because:   The strongest pattern in the research that V4 didn't address. Samarth (as candidate): "The first instinct is to look within your circle if you have mutual connections… That works out very well." (n03); after being ghosted, thought they "should have tried harder to find mutual connections instead" (n16); last success came through a college junior (n02). Riya (as referrer): "For friends, for known people, I always take that pain." (n69). C1 is named "the only route that works is people they already know". Shared background makes a stranger's request less cold, using data already in resumes and profiles.
Metric:    request-to-referral rate for requests with vs without shared background; request_opened rate by the same split.
How sure:  saw it (research pattern); worked it out (that a tag moves behaviour). Nithin's MakeMyTrip years and Arpita's college are sample data. Needs referrers' past companies and colleges in their profile.

DECISION · 2026-09-17 · V5 · Borrowed ideas considered and not built
1 "Usually answers in 2 days" (Indeed's responsive employer): some evidence (candidates pursue whoever replies, n37; 80% don't reply, n30). Not now: needs reply data a new product doesn't have; can shame slow referrers. Revisit once there's 4+ weeks of reply data.
2 "Opened" status (Naukri's viewed by recruiter): some evidence (silence read as no, n35). Not now: V4 already shows stages and handles 7 days of silence; "opened, then nothing" can hurt more than silence.
3 Follow a company for alerts (LinkedIn/Naukri job alerts): no research evidence; a business idea for returning. Later, once enough companies have referrers.
4 Open the company's referral portal (one-tap apply): weak evidence; nobody complained about finding the portal, the pain was job ID and details (n59 n60 n70 n76). Skipped.
5 Profile strength meter (Naukri/LinkedIn): rejected, profile completion is a vanity metric (BUSINESS.md). Company reviews/salaries (Indeed/Naukri): out of scope. Skill tests (Indeed): extra work nobody asked for. Paid boosts (Naukri/LinkedIn Premium): same "pay for access" cut in V3.
Because:   Must-have test: the research shows the pain, V4 doesn't already solve it, and it's needed for the problem. Only shared background passed on evidence.
Note:      Competitor features are from memory, not checked on the live products on 17 Sep. Verify before quoting them in the case study.

CRITIQUE · 2026-09-17 · V5 design audit · Source: self ("no screen should look even a little bit alien")
Checked:   Every V5 screen (41) by script (Inter only, text styles, colour tokens, radius scale, shadow styles, avatar sizes, flat tinted boxes, stacked/outside/overlap) and by eye, flow by flow.
Found and fixed:
  1 Info notes showed V2's empty placeholder circle instead of the info icon (8 tags) → information icon
  2 Share icon was an external-link arrow (reads as "open website") → link icon, same as "Your link"
  3 Check your referral request listed details as label left / value right; every other screen stacks label over value → stacked
  4 Share sheet "Copy Link", "Whatsapp" → "Copy link", "WhatsApp" (sentence case, brand spelling)
  5 Check your job post: "Still needed" tag and its note sat squeezed side by side → stacked under the Job ID field
  6 "Drop your Resume" (capital R) → "Drop your resume"
  7 Login helper line had a hard-coded colour; Your referrals caption had no text style → tokens and label/sm
  8 Editing a job post was still V2's 3 steps ("Edit Referral", Step 1 of 3, Go Live) while posting is one review screen → one "Edit your job post" screen: job ID filled, same sections, "Saving checks the match again for requests already in.", Save changes. V5 copies of the 3 steps deleted.
Left as V2 on purpose: Job screen card radius 25, Manage posts status tags, referrer Edit Profile avatar 94 (V2's own components).
Result:    Re-run: 41 screens, no token, style, radius, font, layout or overlap issues.

LEARNED · 2026-09-17 · V5
Tried:              Switching the details rows from side-by-side to stacked in place.
Expected:           Same text, new layout.
Actually happened:  The value text collapsed to zero width and disappeared until each text was set to fill and wrap.
Cost:               one pass
Now know:           When changing a layout's direction, reset the children's sizing too, then look at the screenshot.
