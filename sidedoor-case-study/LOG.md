# Devansh Somvanshi — Build Log

**Project:** Sidedoor, a product for job referrals in Indian tech hiring. Being re-done properly so the case study holds up in interviews.
**Started:** original work before this log existed (dates not recorded). This log started 17 Sep 2026.

## Where things stand

Updated 2026-09-24.

Bet:        employees drop strangers' referral requests because the request makes them do the candidate's work, not because they won't help (SCOPE v2)
Evidence:   thin. 4 real interviews with 2 people (Samarth, Riya; each as candidate and as referrer), 1 remembered follow-up (n92), desk research without source links. No usability test run yet
Built:      Figma V6 (UI Screens, V6 flows + States grid) and a coded prototype of every V6 screen and state (/work/sidedoor/prototype, branch sidedoor). Figma and code change together
Done:       scope, landscape, research, synthesis, AI spec, brief, business, design language, build V3 → V6, attack (19 and 23 Sep), numbered kill conditions for the next test
Open:       molades-test (prototype is ready for testers; no test run yet), case study rewrite (molades-case), source links for desk research, merge to main only when Devansh says it's final
Next:       molades-test, then molades-case

## Key decisions

The decisions an interviewer will ask about, newest thinking only. Each line: what, why, evidence (note numbers are in RESEARCH.md), what was turned down. "Mine" means a design call with no research behind it. The full entry is further down, by date.

**Problem and bet**
| Decision | Why | Evidence | Turned down |
|---|---|---|---|
| The problem: a stranger's request makes the referrer do the candidate's work, so most don't, and the candidate never hears back | Both referrers have simple rules and no fear for their reputation; what stops them is the work a request hands them | n50 n55 n57 n59 n60 n70 n71 n76 n87 | Old "trust gap" bet (contradicted by n50 n55 n76); candidate-only or referrer-only problem statements |
| Use only the 4 real interviews | The other 6 transcripts in FigJam were AI-generated | LEARNED 2026-09-17 | Keeping them as "illustrative" |
| Sidedoor is its own product, not a LinkedIn feature | The work sits between LinkedIn and the company portal, which neither owns; the link helps referrers before any network exists | n46 n47 n57–n60 n66 n71; candidates asked for a dedicated place n24 n45 | Mentor's "feature inside LinkedIn". Risk kept: both people ask on LinkedIn today (n04 n29) |
| Reason to exist: a complete request, status passed back, fit shown to the referrer | LinkedIn and GetMeReferred already do discovery and candidate-side fit | Landscape (screens, pricing page) | Competing on finding referrers |
| Kill conditions for the next test: under 1 in 5 complete requests submitted, or under 3 of 8 referrers sharing their link in 2 weeks | The research ran without one, so nothing could prove the bet wrong | n30 ("80% don't reply") sets the bar | Back-dating a kill condition to old data |

**Business**
| Decision | Why | Evidence | Turned down |
|---|---|---|---|
| Two-sided marketplace; referrers are the scarce side; free for both at first, companies pay later | Selling referrers' attention breaks the quality promise | n62 n87 (companies already pay bonuses) | Candidates paying to reach referrers (V2 Premium), ads, referrers paying |
| North Star: referrals submitted per active referrer per month; guardrail: referrers turning off requests | Counts the value, not activity | BUSINESS.md, mentor's NSM checklist | Sign-ups, requests sent, swipes, messages (vanity) |

**The request (candidate side)**
| Decision | Why | Evidence | Turned down |
|---|---|---|---|
| Resume fills the profile; portal-only details (DOB, gaps, notice, locations) asked just in time, on the first request, saved after | Referrers chase these details today; asking at sign-up has no reason attached | n59 n60 n71 | Asking at sign-up (V3); asking twice |
| Job ID and all portal details travel with every request | The missing job ID is the top irritation | n76 n77 n78 | Free-text DM with a resume |
| 14 requests a week; a no, a closed role, a withdrawal or 7 days of silence gives it back; being referred earns one | Keeps each request worth answering. Not about spam | Neither person described spam (n19 n61). 14 is Devansh's number | 5 a week (too few to bother); no limit |
| "Referred or applied here in 6 months?" asked per company; the line always names its source | Portals refuse a second referral within 6 months, and people forget when | n74 | Claiming "no referral" from Sidedoor's own data alone |
| Shared background shown ("Both ex-MakeMyTrip") but not used for ranking | Asking through people you know is what works | n02 n03 n16 n69 | Ranking by it (would bury fit) |

**Fit and proof (referrer side)**
| Decision | Why | Evidence | Turned down |
|---|---|---|---|
| Fit shown as counts ("4 of 7"), never a single score; lower matches collapsed, not hidden | Referrers want a match check; one referrer refers borderline people on purpose | n50 n53 n65 | A 9.4 score; hiding or auto-declining low fits |
| A skill counts only when Sidedoor finds it in linked work or the resume; the referrer taps to see the line it read | Skills typed on your own projects can still be gamed | n50 (reads the resume to check); the reading rule is mine | Self-tagged skills counting; peer vouching |
| "Related" skills shown, not counted | Transferable skills matter to candidates, but the referrer decides | Candidate side (Samarth); "not from a different domain" (n50) | Counting them in the number |
| The referrer's one question asks about a skill, not a product | The referrer can't know who will apply | Mine | "Tell us about a checkout trade-off" |
| Work-email check on both sides; track record from referrers' own updates | A tick has to mean something | Mine | A green tick on everyone (V2) |
| Referrers can see suggested candidates who opted in, and invite them | Waiting only leaves referrers nothing to do; one referrer would refer a stranger who fits | n64 n65 n89 | Browsing everyone (no consent); selling "more bonuses" (n62 n87) |

**Status and after refer**
| Decision | Why | Evidence | Turned down |
|---|---|---|---|
| "Mark as submitted" is the last tap of Refer, not a later chore | Referrers won't come back to update a stranger | Devansh's critique; C4 | A separate update step |
| Portal details ready to copy, plus "Email to me" (work inbox, resume attached) and "Copy all" | Copying into the portal by hand is the pain both referrers named | n60 n71 | Autofill extension (big build, every portal differs); laptop link (the email covers it) |
| Thank-yous reach the referrer | The bonus isn't the reason people refer | n62 n87 | Points, badges, leaderboards |
| No answer after 7 days gives the request back and offers the next referrer | Silence is the first candidate pain | n30 n35 n37 | Auto-sending to someone else |

**AI in the product**
| Decision | Why | Evidence | Turned down |
|---|---|---|---|
| AI reads documents and links into fields (resume, job description, project links); the person checks | Removes typing without making decisions for anyone | AX Spec in BRIEF.md | The model deciding |
| AI suggests the referrer's question from the job description, one per skill | Stops product-specific questions before they happen | Mine | Writing the candidate's answer (kills the signal); AI deciding who to refer (the referrer's name is on it) |
| No "AI" in the marketing copy | "AI-curated" promises a black box; the proof rule is the point | Mine | "AI-matched" taglines |

**How we work**
| Decision | Why |
|---|---|
| Figma and the coded prototype change together, every time | Devansh shows the prototype in code; Figma is the design deliverable |
| V2–V5 are history; V6 is edited in place | The versions show the case study's iterations |
| Check on localhost, not the Vercel preview | The preview needs a login |

## Entries

<!-- newest at the bottom -->

CRITIQUE · undated, before this log · molades-attack · Source: facilitator
Finding:             Mentor: this would make more sense as a feature inside LinkedIn. Referrers have little reason to
                     join a brand-new app, so the product can't get its supply side.
Severity:            blocker
Layer:               the bet
Action:              rejected (17 Sep 2026), Devansh's call: Sidedoor stays its own product. Answered with reasoning in SCOPE.md v2, not tested

LEARNED · 2026-09-17 · molades-research
Believed:            The research base was 10 interviews: 2 recruiters, 4 referrers, 4 candidates.
Found:               Only 4 are real: Candidate 1, Candidate 2, Referrer 1 (Infosys), Referrer 2 (Accenture). The other
                     6 transcripts in FigJam were generated with AI.
Changed:             Only the 4 real transcripts are research now. Copied verbatim into raw/.
What this made worthless: every recruiter claim; the "40–50 DMs a day" PM; "I messaged 40 people, 9 replied, 3
                     submitted"; "system gets flooded when the bonus goes up"; the claim of 10 interviews on the live
                     case study; the affinity notes in FigJam, which can't be told apart by source.

DECISION · 2026-09-17 · molades-research
Decided:             Go ahead with the 4 real interviews and the desk research. No new interviews or survey.
Rejected:            Collecting more interviews (Devansh has no time); keeping the 6 generated transcripts as
                     "illustrative" (they would be invented evidence).
Because:             Thin data proceeds with its gaps named. Recruiters and referrers who ignore requests have no real
                     data, so anything about them is marked guessing.
How sure:            saw it

CRITIQUE · 2026-09-17 · molades-research · Source: AI
Finding:             The live case study's five solution screens (ranked referrer list, structured request form, four-level
                     recommendation, shared pipeline, request limits and ranked inbox) are not in Figma V2. V2 is a
                     swipe-to-match app: referrers post jobs, both sides swipe, a match opens chat, the referrer updates
                     stages by hand, and candidates can pay for Premium.
Severity:            blocker
Layer:               the bet
Action:              open. Settled in molades-brief, once the problem statement exists

CRITIQUE · 2026-09-17 · molades-research · Source: AI
Finding:             Two claims on the live case study walked back. "One PM got 40–50 DMs a day" traces to a generated
                     transcript. "Referrers aren't unwilling, they're uncertain" is contradicted by both real referrers
                     (n50, n55, n76, n77).
Severity:            major
Layer:               the bet
Action:              deferred to molades-case

CRITIQUE · 2026-09-17 · molades-research · Source: AI
Finding:             Desk research was done by Devansh with Perplexity, but no original source links were kept. Every
                     figure on the live page (5–10×, 29 days, 46% vs 33%, 15–25%, 191, 92%) will be asked "where is that
                     from?". The live page's "~20% cold DM reply rate" doesn't match the desk research (15–25%).
Severity:            major
Layer:               the bet
Action:              open. Devansh to add the original link for each figure in raw/desk-research.md

DECISION · 2026-09-17 · molades-synthesise
Decided:             91 numbered notes, one observation each, in the person's own words, with question numbers.
                     Every quoted phrase checked word for word against its transcript by script (75 phrases, 0 missing
                     after one fix). Participants referred to as "they" because the transcripts don't state gender.
Rejected:            Reusing the FigJam affinity stickies (no link to a person, and mixed with generated transcripts).
Because:             A numbered note in someone's own words is the only thing a problem statement can be walked back to.
How sure:            saw it

DECISION · 2026-09-17 · molades-scope
Decided:             SCOPE.md v1 written by copying Devansh's FigJam scope, hypotheses and North Star, labelled as
                     reconstructed. Notes sorted against its span: from asking an employee for a referral to knowing
                     what happened, up to the interview stage.
Rejected:            Writing a fresh v1 now (it would be a scope card made after the research, pretending to be before it).
Because:             Sorting needs a moment, and v2 has to be written against what the original bet actually said.
How sure:            saw it (copied from FigJam)

DECISION · 2026-09-17 · molades-synthesise
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

CHANGE · 2026-09-17 · molades-synthesise
Changed:             "Proving fit" split back out of C2. Referrer-side fit checks (n50 n51 n53 n56 n63 n65 n82) stay in C2;
                     candidate-side notes (n11 n22 n23 n29) become C5, "Candidate can't tell how strong a fit they are
                     before they spend a request", marked THIN.
Caused by:           Devansh, 17 Sep 2026: "checking fit is mostly pain point of referrer, but candidates wud also like
                     to have it so that they can see the potential of them getting selected acc to fit".
Result:              Five clusters. Devansh also said many candidates tailor resumes to the job description because ATS
                     software filters on match. Not in the four transcripts or the desk research, so recorded in C5 as
                     guessing, not used as evidence.

DECISION · 2026-09-17 · molades-synthesise
Decided:             Draft jobs: C2 + C4 combine into J3 (referring a stranger for minutes), C1 + C5 into J1 (asking where
                     it will be read), C3 stays as J2 (knowing what happened). One insight statement each. Three
                     candidate problem statements: A referrer side, B candidate side, C both sides.
Rejected:            Keeping five separate jobs (two pairs are one job seen twice); combining jobs across the two sides
                     (a job has one "I").
Because:             Draft by AI, following the RedBus artefacts page (combine, then one insight per final job).
                     The choice between A, B and C is Devansh's.
How sure:            worked it out

DECISION · 2026-09-17 · molades-synthesise
Decided:             Problem statement: an employee asked for a referral by someone they don't know has to do the
                     candidate's work before they can say yes, so most don't, and the candidate never finds out.
                     Primary: the request makes the referrer do the candidate's work. Secondary: the answer never travels back.
Rejected:            A (referrer side only): ignores the candidate who never learns what happened. B (candidate side
                     only): describes symptoms, and rebuilds old Sidedoor.
Because:             Devansh: "A, B, C all are true". C holds A and B as its two sides. Devansh asked AI to choose; AI
                     gave its view and reason, Devansh agreed.
How sure:            saw it (what happens) · worked it out (why) · guessing (that a complete request gets referred more)
Traces to:           n70 n76 n77 n57 n59 n60 n71 n73 n75 n87 n62 n69 n01 n25 n34 n35 n36 n58 n83 n47 n64

LEARNED · 2026-09-17 · molades-scope
Believed:            Referrals break because of a trust gap: referrers can't judge strangers and fear for their reputation,
                     so they need match scores, graded recommendations and spam limits (old Sidedoor, FigJam problem statement).
Found:               The two real referrers already have simple rules and don't fear for their reputation (n50, n55, n76).
                     What stops them is the work a request hands them (n57, n59, n60, n70, n71, n76), for a low reward (n87).
The part that was wrong: "referrers cannot confidently evaluate unknown candidates"
This made worthless: the four-level recommendation screen, request limits, the ranked inbox, the "trust layer" as
                     the core bet, and swipe matching (no note supports it). The live case study's screens 03 and 05.
So now I believe:    Employees drop strangers' requests because the request makes them do the candidate's work.

DECISION · 2026-09-17 · molades-scope
Decided:             SCOPE.md v2 (draft): a feature inside LinkedIn. Moment: a candidate asking an employee they don't know
                     for a referral to one job, until they hear what happened. Number: % of those requests the employee
                     submits. Guardrail: employees turning off referral requests must not rise.
Rejected:            A new standalone app (both sides must join; referrers have little reason; Fishbowl's referral
                     communities are quiet, n28). A referrer-shared link as the home of the product (only helps after a
                     referrer agrees; kept as an idea).
Because:             All four already ask and get asked on LinkedIn (n04 n07 n09 n29 n49 n68 n69). Answers the mentor's
                     critique with the notes.
How sure:            saw it (where they ask) · guessing (the number and guardrail, no baseline)

CHANGE · 2026-09-17 · molades-scope
Changed:             SCOPE.md v2 rewritten: Sidedoor is its own product, not a feature inside LinkedIn. Added the
                     cold-start bet (referrers first use a link candidates fill in, n66) and a second kill condition.
Caused by:           Devansh, 17 Sep 2026: "I don't want it to be just a feature... Let's be confident that it can be a
                     new product... Through the business lens and product thinking lens, we will justify why this
                     product will work with proper reasoning, data, and research."
Result:              The mentor's critique is rejected, and the rejection has to be defended. AI said the risk once:
                     all four people ask on LinkedIn today, and Fishbowl's referral communities are quiet (n28).

DECISION · 2026-09-17 · molades-scope
Decided:             Sidedoor as its own product.
Rejected:            A feature inside LinkedIn (mentor's suggestion, and the earlier draft of v2).
Because:             Devansh's call. Supporting reasons: the work sits between LinkedIn and the company portal, which
                     neither owns (n46 n47 n57 n58 n59 n60 n71); referrers get value from the link before the network
                     exists (n66); both candidates asked for a dedicated place (n24 n45).
How sure:            worked it out (the reasons) · guessing (that referrers adopt it)

CRITIQUE · 2026-09-17 · molades-scope · Source: self
Finding:             Devansh reports a follow-up conversation with one interviewee, and the mentor's view that there is no
                     new reward for referrers. Proposed: the referrer's incentive is better candidates picked by an AI
                     engine, so they can refer for more roles and earn more bonuses; candidates get request limits and
                     skill-matched referral search.
Severity:            major
Layer:               the bet
Action:              saved as Idea 1–4 in SCOPE.md for molades-ai. Not evidence until the conversation is written down
                     (who, and what they said). Checked against the notes: the AI match is backed as a wish (n65, n23);
                     "more bonuses" is in tension with n87; request limits can't rest on spam (n19, n61).

DECISION · 2026-09-17 · molades-scope
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

CRITIQUE · 2026-09-17 · molades-scope · Source: AI
Finding:             Checked Figma V2 against the strategy (L04 "advance, neutral or contradict"). Contradicts: swipe cards
                     (built for volume), Premium paywall (sells access to referrers), referrer updating five stages by hand
                     (adds work to the scarce side). Advances: resume auto-fill, referrer JD upload, candidate tracking.
                     Neutral with risk: messaging.
Severity:            major
Layer:               the bet
Action:              deferred to molades-brief, flow by flow

LEARNED · 2026-09-17 · molades-research
Believed:            The 4 real transcripts were 4 different people: Candidate 1, Candidate 2, Referrer 1, Referrer 2.
Found:               They are 2 people. The Infosys employee is Candidate 1 and Referrer 1; the Accenture employee is
                     Candidate 2 and Referrer 2. Each was interviewed once as a candidate and once as a referrer.
                     (Devansh, 17 Sep 2026)
Changed:             Every file now names them by company and role ("Infosys (as candidate)"). The data check, bias line
                     and every "four people", "both candidates", "both referrers" corrected to two people. The
                     follow-up conversation (with the Infosys employee) added as n92, marked remembered.
What this made worthless: any claim that a pattern came from four people. The strongest patterns are now "both people".
                     Worth keeping: both have been on both sides of a referral.

CHANGE · 2026-09-17 · molades-research
Changed:             Participants named: Samarth (the Infosys employee, Candidate 1 and Referrer 1) and Riya (the Accenture
                     employee, Candidate 2 and Referrer 2). Labels in RESEARCH, SCOPE, BUSINESS and the raw transcript
                     headers now read "Samarth (as candidate)", "Riya (as referrer)". Earlier LOG entries keep the old labels.
Caused by:           Devansh, 17 Sep 2026: "You can mention the real name. Samarth is the candidate one and refer one. And
                     Riya is candidate 2 and refer 2."
Result:              Notes use real first names, as the rules ask. Not the same Samarth as in the RedBus research.

DECISION · 2026-09-17 · molades-scope
Decided:             Premium: candidates pay only for tools that help themselves (fit check before asking, profile
                     feedback). Never to reach, see or jump ahead of referrers. V2's Premium screen becomes a candidate tool.
Rejected:            Candidates paying to see who wants to refer them (V2 as designed); no candidate payment at all.
Because:             Devansh: "Whatever is correct and has proper reasoning behind it, so that I can explain and justify
                     it properly in interviews". AI's reasons: referrers are the scarce side and selling their attention
                     breaks the quality promise; paying doesn't change a referrer's rule (n50, n76, n77); candidate tools
                     raise request quality, which moves the North Star (n23, C5); companies already pay for referrals (n62, n87).
How sure:            worked it out · guessing (that candidates or companies will pay)

DECISION · 2026-09-17 · molades-landscape
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

LEARNED · 2026-09-17 · molades-landscape
Believed:            Sidedoor could win on discovery (ranked referrers) and on showing candidates their fit.
Found:               LinkedIn already puts "People you can reach out to" and "Show match details" on every job, and
                     GetMeReferred already lists willing, verified referrers.
The part that was wrong: "candidates find relevant referrers"
This made worthless: the old case study's Screen 01 as a differentiator; Idea 4 as a reason to exist.
So now I believe:    Sidedoor's reason to exist is what nobody does: a request that arrives complete, status the referrer
                     passes on, and fit shown to the referrer.

DECISION · 2026-09-17 · molades-ai
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

DECISION · 2026-09-17 · molades-ai · Source: self
Decided:             Lower-match requests stay visible to the referrer, collapsed under "Lower match", and can still be referred.
Rejected:            Hiding them completely (Devansh's earlier "only showing curated candidates").
Because:             Devansh: "visible but collapsed". Reasons given: a hidden request is silence for the candidate (C3),
                     and Samarth refers borderline matches on purpose (n53).
How sure:            worked it out

DECISION · 2026-09-17 · molades-brief
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

CRITIQUE · 2026-09-17 · molades-brief · Source: self
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

LEARNED · 2026-09-17 · V5 · What LinkedIn sign-in actually gives (checked LinkedIn's developer docs)
Sources:  learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin-v2 (last updated 02/05/2025); learn.microsoft.com/en-us/linkedin/consumer/integrations/verified-on-linkedin/overview; developer.linkedin.com/product-catalog. Read 17 Sep 2026.
Found:
  1 Sign In with LinkedIn (OpenID Connect) returns name, first and last name, profile picture, locale, and email (email optional, may be missing). No work history, no college, no current company, no public profile link.
  2 The docs say it "does not verify user identities and should not be marketed as such."
  3 A separate product, Verified on LinkedIn, gives verification signals. Lite tier (free, application review): only whether identity or workplace is verified, not which company. Plus tier (business approval, paid): adds current experience and recent education.
  4 Verified on LinkedIn must not be used for "hiring or employment decisions… Do not use to rank or approve candidates."
Before:   I said standard sign-in gives name, email and photo only (right), and suggested a "View LinkedIn profile" link on requests from sign-in (wrong: sign-in has no profile link; the candidate would have to paste it).

DECISION · 2026-09-17 · V5 · "Continue with LinkedIn" on the login screen
Changed:   V5 login (edited in place, one screen; Devansh asked not to make V6): "Continue with LinkedIn" added as the first option, above Google and email. Uses the file's own LinkedIn logo component.
Rejected:  Claiming LinkedIn sign-in fills the profile or verifies the person; replacing resume upload or work-email verification with it; using Verified on LinkedIn to rank or filter candidates (its terms forbid it); Plus tier for shared background (needs a paid partnership, not a first-version dependency).
Because:   The asking already happens on LinkedIn (n04, n29) and referrers check LinkedIn before submitting (n56), so it's the most familiar, trusted one-tap option for this audience. It only speeds up sign-in; everything else stays as designed.
Metric:    signup_completed(method: linkedin / google / email) and onboarding completion by method.
How sure:  saw it (docs); worked it out (that it lifts sign-up).
Later, not built: (a) an optional "LinkedIn profile link" field the candidate pastes, shown to referrers as "View LinkedIn profile" (backed by n56); (b) Verified on LinkedIn Lite as a second trust signal for referrers, never for ranking candidates.

CRITIQUE · 2026-09-17 · V5 · Source: self
Said:     "The candidate profile was designed very beautifully by me, but right now you made everything plain. Any reason?" Then: "I wanted to do the correct things only. Don't do it just because I have done it."
Checked:  Every piece of V2's candidate card against one test: does it help the referrer decide whether to put their name on this person? Evidence: skill match 50–70% and experience "non-negotiable", reads the resume to check experience shows the skills (n50); scans LinkedIn profile and resume (n56); refers borderline people sometimes (n53); portal fields (n59).
Found:    V3–V5 had over-corrected. The request screen was detailed about the match but thin about the person: the evidence referrers read (experience, projects) was reduced to a PDF link.

DECISION · 2026-09-17 · V5 · Referral request shows the evidence, not the pitch
Changed:   V5 Referral request (edited in place). Order: person + In common → quick facts (location, years, notice period) → How they match → Experience (V2's experience block: company logos, roles, dates) → Projects (V2's project block: titles + skill chips; bullet details collapsed behind "Show project details") → Resume and links (resume + LinkedIn, Dribbble, Behance icons) → Their note → Not moving forward / Refer. Not enough to judge version: quick facts + a one-line experience, no projects (shows what a thin resume looks like).
Kept out:  Green tagline quote card (puts the candidate's pitch above the evidence in the loudest style; referrers' irritation is about missing basics like the job ID, n76, not missing pitch). About paragraph (self-description, not evidence; no referrer mentioned it). Full skills list (repeats the match section, adds skills the job doesn't need). 9.4 Strong Fit, Skip / Refer Candidate, bookmark (cut since V3).
Because:   Experience is the non-negotiable check and projects are where a skill is proven (n50); LinkedIn is part of the referrer's routine (n56); collapsed details serve borderline calls (n53) without burying the decision. Reused V2's own blocks, so it looks like the app.
How sure:  worked it out from saw-it evidence. Portfolio links are reasoned for design roles, not from research. Project skill chips run off the right edge, as in V2 (horizontal chip row).

CRITIQUE · 2026-09-17 · V6 carry-over review · Source: self
Said:     "Do this exercise for all the screens… you might have ignored a lot of good designs in my earlier versions… Don't outrightly reject things… log it along with proper reasoning."
Method:   Pulled the text and structure of every V2 screen (V0 checked too: same content as V2, so V2 covers both). For each V2 element missing or changed in V5, one test: does it help the person on that screen do their job (candidate: find a job worth one of 5 weekly asks, send a complete request, know where it stands; referrer: decide, refer, pass on stage), backed by research or the business model? Restore it, move it, or leave it out, with a reason. Built in V6 (copy of V5) because it touches many screens.

DECISION · 2026-09-17 · V6 · Carry-over from V2, screen by screen

RESTORE
R1  Referrer "Create manually" (V2 job creation choice) → "Fill in myself" link on Add the job.
    Because: a referrer may have only a job ID and title, no JD file or link (the portal is where the job lives, n56 n70). Without it, those referrers can't post. Candidate side already has it; one rule for both sides.
R2  Referrer's own details (V2 Manual Job step 1, Edit Profile: name, company, role, location) → name and company filled from sign-in and work email; role and location asked on Confirm where you work.
    Because: every candidate screen shows "Nithin Agarwal · Design Manager, Flipkart". V4 removed the only place a referrer gave that. A referrer's role is also how candidates judge who to ask (n29: "HRs, managers or people in similar roles").
R3  "Add tips (optional)" and "Save as Draft" (V2 job steps 3–4, Edit step 3) → both on Check your job post and Edit your job post.
    Because: Tips show on the candidate's Job screen ("Tips from the referrer", kept since V2) and are the referrer's cheap way to get better requests, which is the whole point for them (n92). Draft: the job ID is the thing referrers must fetch from their portal (n70); if it isn't at hand, they should be able to come back, and Manage posts already shows a "Draft" status that nothing created.
R4  Candidate work experience and projects (V2 profile steps 2–3, Edit steps 2–3) → Experience and Projects sections on Check your details and Edit your details, using V2's own blocks, plus optional Links (LinkedIn, portfolio).
    Because: V5 shows these to referrers as the evidence they read (n50 n56). If the candidate can't see or fix them, a misread resume goes straight to the referrer (AX Spec: the model fills, the person checks).
R5  Salary and location on job cards (V2 Explore cards: "28-40 LPA*", "Bengaluru, KA") → back on the Jobs list.
    Because: with 5 requests a week, a candidate has to choose which jobs are worth an ask. Pay and city are the first two filters anyone uses. Worked out, not from our interviews.
R6  Saved jobs (V2 bookmark on the job card, kept on the Job screen) → "Saved jobs" in candidate Profile.
    Because: V4 cut "Saved Referrals" as a way to postpone deciding. With a weekly cap (Fix 10) postponing is legitimate: save now, ask on Monday. Reverses part of Fix 8 for candidates; referrers' "Saved candidates" stays cut (see L3).
R7  "Message Abhinav" (V2 referrer Match screen) → secondary action on After Refer and Marked as submitted; "Messages" row in referrer Profile.
    Because: V4 removed the referrer's Messages tab saying messages open from a request, but no request screen had a way to open one. Messaging after Refer is when it's useful (portal questions, n59).
R8  Status tabs on the candidate's list (V2: All · Interviews · Awaiting Response · Closed) → All · Waiting · In progress · Closed.
    Because: requests pile up over weeks; filtering by where they stand is what n45 describes ("one place like Naukri's applied list"). V3 removed them only to rename stages. Renamed to plan words instead of cutting.
R9  "Congratulations! You've landed the job" and a primary Thank button (V2 Selected screen) → "Congratulations, you're selected at Swiggy!" and "Thank Joy" as the primary button.
    Because: V3 demoted both to plain. Selected is the best moment in the product, and since Fix 11 the thank-you is what reaches the referrer and brings them back. It should be the main action.
R10 Job preferences (V2 profile step 4: preferred roles, employment type, work mode) → optional section in Edit your details only, not onboarding.
    Because: useful to order Jobs by relevance later, but not needed to send a first request, so it stays out of onboarding (Fix 2).

KEEP AS V5 (V2 element considered, not restored)
L1  Candidate tagline, About, full skills list on the referrer view: pitch or repetition, not evidence (logged 17 Sep).
L2  "9.4 Strong Fit", swipe Skip / Refer Candidate / Request Referral: unverifiable score and volume pattern (V3, AX Spec).
L3  Referrer "Saved Candidates": the request list is already the referrer's queue, ordered by match with Lower match kept; a second saved list splits it. No weekly-cap reason like candidates have.
L4  "Referral Accepted" full-screen (both sides): the finish line is Submitted, not accepted (V3). Its useful parts live on After Refer (details, message) and in the Referred status.
L5  "Message Referrer" before the referrer decides: chasing is the referrer's pain (C2). Messaging opens after Refer.
L6  Six-stage update sheet with Submit: one-tap stages (V3, Devansh's critique).
L7  Referrer's list tabs (All · Awaiting Action · Interviews · Closed): "Waiting on an update" first is action-first for the referrer; tabs would hide it behind a tap. Different from R8 because the referrer acts on the list, the candidate reads it.
L8  4-step onboarding with step dots, "Resume/JD uploaded successfully" screens: one review screen (Fix 2, Fix 5).
L9  Premium: dropped for now (17 Sep).
L10 "Right swipe to your next job", SIGN UP: V4 Fix 1.
L11 Header counts "Explore top referrals (82)" / "top profiles (147)": a count of everything isn't a decision aid; the referrer's list shows its own job and Lower match count.
How sure: R1 R2 R3 R4 R7 R8 R9 worked out from research or from a gap in V5; R5 R6 R10 worked out without research. Nothing here is "saw it" in use.

CHANGE · 2026-09-17 · V6 · Carry-over built (see DECISION "Carry-over from V2, screen by screen")
Changed:
  R1  Add the job: "Fill in myself" link under Next.
  R2  Confirm where you work: Your name (from sign-in), Your role, Where you work from; subtitle "Candidates see your name, role and company. The verified tick shows after we check your work email."
  R3  Check your job post: "Tips for candidates (optional)" field; "Save as draft" next to Post job. Edit your job post: same tips field; "Pause post" next to Save changes (a live post can't go back to draft; pausing mirrors the Live/Paused toggle in Manage posts).
  R4  Check your details and Edit your details: Experience and Projects sections (V2 blocks, each with one edit icon), optional LinkedIn profile and Portfolio fields. "Current role" row removed from the resume box because Experience now shows it.
  R5  Jobs and Jobs (skipped): company · city, then salary · referrer ("Flipkart · Bengaluru", "₹28–40 LPA · Nithin refers"), from V2's job data.
  R6  Candidate profiles: "Saved jobs" row.
  R7  After Refer and Marked as submitted: "Message Abhinav". Referrer profile: "Messages" row.
  R8  Your referral requests: tabs All · Waiting · In progress · Closed (V2 TabBar).
  R9  Selected: "Congratulations, you're selected at Swiggy!", "Thank Joy" primary.
  R10 Edit your details: optional "Roles you want" and "How you want to work".
Checked:   41 V6 screens by script: fonts, text styles, colour tokens, no collapsed or clipped text (V2 skill-chip rows excepted), no stacked screens, no overlaps. Five flow frames (V5 and V6) were grown so taller screens sit inside them.

LEARNED · 2026-09-17 · V6
Tried:              Judging V2's designs mostly by what to cut (volume patterns, scores, Premium).
Expected:           Cutting the wrong patterns keeps the good parts.
Actually happened:  Cuts took good parts with them: the referrer's own details, drafts, tips, experience and projects for the candidate to check, salary on job cards, saved jobs under a weekly cap, messaging after Refer, status tabs, the Selected celebration. Devansh saw it on one screen and asked for the whole app.
Cost:               a full carry-over pass
Now know:           When replacing a design, list everything the old one did and decide each item on evidence, both what to cut and what to keep. A cut needs a reason as much as an addition does.

CRITIQUE · 2026-09-17 · Referrers only wait for requests · Source: Devansh
Said:     "Why restrict referrers from seeing any candidate and waiting for a candidate? They would have no incentive. They should have the freedom to pick from the curated, high-quality candidates whose skills and other things match."
Checked:  BUSINESS.md strategy decision 2 already says "Referrers see only candidates who match their roles (Idea 1, AI curation)". BRIEF narrowed that to ordering requests that were already sent, and put "Referrers browsing candidates who didn't ask" in Not in this project. That narrowing was mine, not the research's.

DECISION · 2026-09-17 · V6 (in place, Devansh asked: "build in v6 only") · Suggested candidates for each job post
Decided:  Referrers see "Suggested for this job" on the requests list: the top matches (not a feed) among candidates who turned on "Let referrers find me". "Invite to request" sends the candidate a notice; one tap sends a complete request, which lands in the same list and flow. Reverses the BRIEF cut "Referrers browsing candidates who didn't ask".
Because:
  - The business strategy already promised curated candidates to referrers (BUSINESS.md, decision 2). Only waiting leaves the referrer nothing to do between requests. (worked it out)
  - Samarth asked for "an automated matching score or feedback on whether a candidate matches a job profile" (n65) and would refer a complete stranger who meets the criteria (n64). (saw it)
  - Riya wants to refer people who actually join (n89). Picking lets them choose on that. (worked it out)
Shaped by what pushes back:
  - Bonus is not a strong pull: "not my primary objective" (n62), "very low" (n87). "Earn more bonuses" is n92, Devansh's note, not a referrer's words. So the screen sells better matches, not more bonuses. (saw it)
  - No referrer said they want to go looking. Their pain is work after saying yes (n60 n70 n76). So picking is one tap, and the candidate fills nothing: the invite becomes a complete request from their saved details. (saw it)
  - Consent: a referrer only sees candidates who turned the switch on, and it starts off. The research never covered this; it is a guard, not a finding. (worked it out)
  - Top matches only (5 or fewer shown), not everyone: n65 asked for matching, and an endless list is the open-inbox problem again. (worked it out)
  - Riya feels "obligated" when a candidate took pain, like sharing the job ID (n77). An invite skips that signal; the complete details and job ID on the request stand in for it. (worked it out)
  - An invite does not use one of the candidate's 5 weekly requests: the referrer asked, so the cap's job (protecting referrers) isn't needed. (worked it out)
Screens:  Edit your details (switch) · Referral requests for this job (Suggested section, one card shows Invited) · new candidate screen "Nithin suggests you for this job".
Test:     `candidate_invited`, `invite_accepted`, then referred rate for invites vs requests candidates sent. If invites are referred less often, the idea is wrong. Guardrail: candidates turning the switch off. (guessing until measured)

CHANGE · 2026-09-17 · V6 (in place) · Suggested candidates built (see DECISION "Suggested candidates for each job post")
Changed:
  - Referral requests (referrer): new "Suggested for this job" section below Lower match, with the lightbulb icon and the subtitle "They match this job and chose to be found." Two cards reuse the request card: Shreya Verma with a blue "Invite" link where the time sits, and Advika Singh with a neutral "Invited" tag. Requests from people who asked stay on top: they already did the work (n77).
  - Candidate Profile, both states: V2's "Profile Status" switch renamed "Let referrers find me" (LIVE / PAUSED tags kept).
  - New candidate screen "Job Screen/Suggested By Referrer": a copy of the Job screen with the title "Nithin suggests you for this job", the subtitle "Your details are ready. Sending won't use one of your 5 requests this week." and the button "Send my request to Nithin".
Moved from the decision:
  - The switch went on Profile, not Edit your details. V2 already had a "Profile Status" switch on Profile, and in V2 it meant "show my profile to referrers in Explore". That is this feature, so reusing the row is a carry-over, not a new pattern. (saw it in V2)
Design language: only existing parts were used (request card, Section Label, Tag, the blue text link from "Lower match", the Job card, the Headline block from Edit your details, the Switch row). No new colours or styles.
Checked: every new text has a text style; screens fit their flow frame; no overlaps; the Explore section was grown by 264 px to fit the taller Job copy.

DECISION · 2026-09-17 · V6 (in place, Devansh: "v6") · Green candidate header on the referrer's Referral request
Asked:    Devansh wants V2's green quote card back on the candidate view, because job cards show the company in its brand colour (Flipkart blue) and green is Sidedoor's colour, so candidates get the same kind of header.
Decided:  Bring back the green card as the header of Referral request (referrer) and its states (After Refer, Not enough to judge, Marked as submitted). Inside: photo, name large with verified tick, role, and the link row (resume, LinkedIn, Dribbble, Behance, email). The "Sent today" tag stays on the screen.
Because:
  - Parallel structure: the candidate reads a job as "brand card, then details"; the referrer now reads a person the same way. One pattern for both sides. (worked it out)
  - The link row is evidence referrers use: they scan LinkedIn and the resume (n56). (saw it)
  - Green is the product's own colour, so it looks part of Sidedoor, not a new style. (saw it in V2)
Left out of the card, with reasons:
  - The quote/tagline: self-description, not evidence (L1).
  - "9.4 Strong Fit": unverifiable score (L2); "4 of 7 skills · 3 yrs" with reasons stays below.
  - The bookmark: referrers have no saved list (L3).
Rule:     text on the green stays dark, as in V2. White on that green (#10B981, color/surface/brand/secondary) is about 2.5:1, below 4.5:1; dark text is about 6:1. (worked it out)
Not here: the list cards stay white, like the Jobs list cards.

CHANGE · 2026-09-17 · V6 (in place) · Green candidate header built (see DECISION "Green candidate header on the referrer's Referral request")
Changed (Referral request, After Refer, Not enough to judge, Marked as submitted):
  - New "Candidate Header" card: fill bound to color/surface/brand/secondary (the same token as V2's card), radius 16, padding 24, like V2.
  - Inside: photo 64, name in text/heading/md, role in text/label/md, both text/primary. Role was text/secondary; grey on green fails contrast, so it went dark.
  - Bottom row: V2's link block (LinkedIn, Dribbble, Behance) on the left; the status tag (Sent today / Referred / Sent 2 days ago / Submitted) on the right.
  - The "Resume and links" section below is now "Resume": the links moved into the header, so they aren't shown twice.
Tried first:  the status tag beside the name, as before. The name got cut off ("Abhinav Saxe"). Moved the tag to the link row.
Checked: text styles on every new text; screens inside the Explore flow; no overlaps.

CRITIQUE · 2026-09-17 · V6 candidate view vs V2 candidate card · Source: Devansh
Said:     The Job screen stayed close to V2 but the candidate screen changed a lot; check nothing good from V2's candidate card is still missing. "We should have only what is correct."
Method:   Every V2 card element checked against V6 Referral request (referrer).
Result:   Kept or replaced on purpose: green card, name/role/photo, location · years · notice, experience, projects, Skip/Refer (now Not moving forward/Refer), skills (now How they match), 9.4 Strong Fit (now "4 of 7 skills · 3 yrs" with reasons). Kept out: quote and About (L1), verified tick (candidates aren't verified; LinkedIn sign-in "does not verify user identities"), bookmark (L3), email in the card (contact opens after Refer, L5), header count (L11). Missing: the work chips "Remote • Hybrid", "Full Time".

DECISION · 2026-09-17 · V6 (in place, Devansh: "yes") · Work chips back on the candidate view
Decided:  Neutral chips for how the candidate wants to work ("Full time", "Remote or hybrid") under the quick facts, on Referral request and Not enough to judge (the two states that show facts). Hidden when the candidate left "How you want to work" empty.
Because:
  - The Job screen shows these chips for the job; the candidate view now shows them for the person, so the referrer can see if they line up. Same pattern both sides. (saw it in V2 and V6)
  - Riya drops people who ask without checking the city or job details (n73, n82). Work mode and type are the same kind of mismatch. (worked it out)
  - The data already exists: "How you want to work" in Edit your details (R10). (saw it)

CHANGE · 2026-09-17 · V6 (in place) · Work chips built (see DECISION "Work chips back on the candidate view")
Changed:
  - Referral request (Abhinav): neutral Tag chips "Full time", "Remote or hybrid" under location · years · notice. Same text as his Edit your details.
  - Not enough to judge (Amit): "Full time", "Remote".
  - Not enough to judge was a fixed 844 screen; the green header plus chips pushed Refer under the bottom nav, so the screen now grows with its content (888).
Checked: fits the Explore flow; no overlaps; chips reuse the Tag component.

CRITIQUE · 2026-09-17 · V6 screens that don't feel part of the app · Source: Devansh
Said:     Some built screens don't feel like a natural part of the app. The three stacked login buttons look ugly ("no app has three login tabs like this"). The green cards with tags and three link icons inside look ugly and off-language.
Audit (all V6 flows screenshotted and compared with V2 patterns: Job screen, lists, tracking, sheets, profile, edit):
  - Matches V2: Jobs lists, Job and invite screens, Check your referral request, tracking (company logo + Tag + timeline), Your referrals and Seen it move sheet, sheets, profiles, manage and edit posts, messages, link pages, onboarding.
  - Off-language 1 · Referral request (referrer) and Not enough to judge: text, a tag and link icons sit on the green; name and role are squeezed into it. V2 never puts text or tags on a coloured block: the Job card's coloured banner holds only the logo, and the title, bookmark, chips sit on white below. These screens also skip V2's page frame for a detail view (grey page, centred title, white card), which the Job screen uses.
  - Off-language 2 · After Refer and Marked as submitted: a big green header for a small status screen; V2 status screens use the compact person row.
  - Off-language 3 · Login: three equal white buttons. V2 buttons are one primary and secondary actions; three equal rows give no main path.
  - Minor, left as is: "Your job is live" has empty space below; "Share later" is grey text like "Skip for now". Both are V2-consistent.

DECISION · 2026-09-17 · V6 (in place) · Candidate view mirrors the Job card exactly
Decided:  Referral request and Not enough to judge use the Job screen's frame: grey page, centred title "Referral request", white card (radius 25, same shadow). Inside, in the Job card's order: green banner (radius 16, 175 tall) holding only the photo, like Flipkart's banner holds only the logo; then the name (heading/md) with the status tag where the bookmark sits; role below; then facts, chips and sections on white. Links go back to "Resume and links". After Refer and Marked as submitted go back to the compact person row (avatar 44, name, role, tag), no green.
Because:
  - The candidate's view and the job view are now the same shape; only the colour and the picture change. That's what Devansh asked the green for. (saw it in V2's Job card)
  - Nothing sits on the green, so there's no contrast problem and no clutter. (worked it out)
  - Status screens are about the action, not the person; V2 uses the small person row there (sheets, Seen it move). (saw it)

DECISION · 2026-09-17 · V6 (in place) · Login: one main button, two small options
Decided:  "Continue with LinkedIn" as the one primary button, an "or" divider, then Google and email as two half-width secondary buttons side by side. Caption "New or returning, it's the same button." removed.
Because:
  - Mobbin (17 Sep): apps with several sign-in methods lead with one main button and shrink the rest: Mimo (email button, then "Or continue with" and round icon buttons), Skip (icon buttons in one row), Todoist and foodpanda (two buttons, then "more options"), Meetup ("or" divider before email). None shows three identical rows as the only option. (saw it)
  - LinkedIn goes first because it fills name and role for both sides (V5 LinkedIn decision). (worked it out)
  - Uses V2's own Button component (Primary and Secondary); nothing new. The caption was explaining a problem the layout no longer has: "Continue" already means both. (worked it out)

CHANGE · 2026-09-17 · V6 (in place) · Design-language fixes built (see the three decisions above)
Changed:
  - Referral request and Not enough to judge: grey page, centred "Referral request" title, white card (radius 25, the Job screen's shadow). Green banner 175 tall, radius 16, photo 96 only. Name (text/heading/md) with the status tag on the right; role (text/label/md, text/secondary) below. LinkedIn, Dribbble, Behance back under "Resume and links".
  - Inside the narrower card: "Both worked at MakeMyTrip" → "Both ex-MakeMyTrip" (same as the list card), the hint tag → "Tap a skill that isn't really there" (it was clipped), Refer and Not moving forward stacked full width, Refer first ("Not moving forward" didn't fit half width).
  - After Refer and Marked as submitted: green header removed; compact person row back (avatar 44, heading/sm name, grey role, tag).
  - Login: "Continue with LinkedIn" is the primary button (white LinkedIn logo, blue "in"); "or" divider in the border colour; Google and Email as two half-width secondary buttons. Email's extra border removed so both match. Caption removed. Spacing above tightened so the buttons fit the screen.
  - Explore section grown by 473 to fit the taller screens.
Checked: every V6 flow for screens outside frames and overlaps (none); text styles on all texts in the five changed screens (all set).
Tried first: primary LinkedIn button with the logo as is; the button's white icon colour turned it into a plain white square. Recoloured the "in" to the primary blue.

LEARNED · 2026-09-17 · V6 design language
Tried:              Bringing V2's green card back by putting the name, role, tag and links on it.
Expected:           Colour alone would make the candidate view match the Job card.
Actually happened:  It looked foreign. V2's coloured blocks carry only a picture; text and tags always sit on white.
Cost:               one rebuild of four screens
Now know:           Copy the structure of the matching V2 screen (page, card, banner, title row), not just its colour.

CHANGE · 2026-09-17 · V6 login fix · Source: Devansh ("its broken")
Seen:     Devansh's view showed Google and Email still labelled "Continue with…", overlapping, and Email taller than Google.
Found:    In the file the labels were already "Google" and "Email", but both buttons were set to fill the row's height (56) while LinkedIn is 44.
Changed:  Both buttons fixed at 44 like LinkedIn, labels set again, 12 side padding, row hugs its buttons. Screenshot checked: one row, no overlap.

CHANGE · 2026-09-17 · V6 login fix, second try · Source: Devansh ("Is still broken", "Text is getting cut in half")
Seen:     In Devansh's Figma the half-width buttons still said "Continue with…", cut off.
Why my first fix failed: I trusted the API and my own screenshot, which both said "Google"/"Email". The old instances carried text overrides from V5, so Devansh's editor kept showing the long label. I should have rebuilt the buttons instead of setting the label again.
Changed:  Removed both old instances. Placed two fresh Secondary Button instances from the component: labels "Google" and "Email", same icons, right icon hidden, 44 tall, LinkedIn's radius and shadow.
Checked:  screenshot of the whole login screen.

DECISION · 2026-09-17 · V6 (in place, Devansh: "yes") · Login: returning-user line and terms line
Asked:    Devansh compared with V2's login (Continue with Google, SIGN UP, "Already have an account? Login").
Decided:  Add V2's "Already have an account? Log in" (blue link) under the buttons, and a small grey "By continuing, you agree to our Terms and Privacy Policy" line at the bottom. Keep out V2's separate SIGN UP button.
Because:
  - Removing "New or returning, it's the same button" left returning users with no sign of where to go. Me+ ("Already have an account? Log in!") and Meetup ("Log in with email") keep this line with the same layout (Mobbin, 17 Sep). (saw it)
  - Log in shows the same three options (LinkedIn and Google sign-in are the same step for new and returning people), so no new flow. (worked it out)
  - Terms line: nearly every Mobbin login in the search had one (Todoist, Mimo, GO Club, Replika). LinkedIn and Google sign-in share name and email with us; this is where people agree to it. (saw it; the legal need is not checked)
  - No SIGN UP button: with "Continue with…" buttons, a second sign-up button splits one action in two; uppercase doesn't match V6 buttons. (worked it out)

CHANGE · 2026-09-17 · V6 login: returning-user and terms lines built
Changed:
  - "Already have an account? Log in" under Google and Email: V2's own text node copied (body text, blue semibold underlined link), "Login" → "Log in".
  - Grey caption at the bottom: "By continuing, you agree to our Terms and Privacy". The full "…Privacy Policy" wrapped with "Policy" alone on a second line, so it was shortened to fit one line.
  - Spacing above the buttons tightened (gap 40 → 28, top 40 → 24) so everything fits above the home bar.
Not built: a separate "Welcome back" screen. Log in shows the same options; no new screen was needed to show that.
Checked: screenshot of the whole screen.

CHANGE · 2026-09-17 · V6 status tags cut off · Source: Devansh ("Why is this tag cut?")
Seen:     On After Refer, the "Referred" tag showed as "Re" in Devansh's Figma.
Found:    The file data said the tag was 74 wide with its text fully inside, and my screenshot showed it whole. Same pattern as the login buttons: these tag instances had been moved and resized several times (person row → green card → link row → person row), and Devansh's editor kept an old size.
Changed:  Replaced the status tag with a fresh Tag instance (same style and label, hug width) on Referral request, Not enough to judge, After Refer and Marked as submitted.
LEARNED:  After moving and resizing an instance many times, place a fresh instance instead. The API and screenshots can look right while the designer's editor shows an old layout.

CHANGE · 2026-09-17 · V6 status tags still cut · Source: Devansh ("They are still cut.")
Found:    The fresh tag didn't help, so the tag wasn't the problem. In Devansh's screenshot the row ends about 48 px early, at 302 wide: the green card's inner width. The Person row frame had been moved into the green card and back out; Devansh's editor kept its old width, so the tag was squeezed.
Changed:  On After Refer and Marked as submitted, built new Person rows (new frame, new name-and-role column) and moved the avatar, texts and tag into them; old frames deleted.
LEARNED:  Moving an auto-layout frame between parents of different widths can leave a stale width in other editors. Build new frames when moving layout between containers.

DECISION · 2026-09-17 · V6 (in place) · Green banner: photo, then name
Asked:    Devansh: in the green banner, show only the photo and the name, photo first, name in a fitting size.
Decided:  Banner holds the photo (88) with the name under it (text/heading/md, dark). Below the banner, one row: role on the left, status tag on the right. Nothing else on the green.
Because:
  - The Flipkart banner shows the company's logo, which is its name. For a person, the photo alone doesn't say who it is; photo plus name is the person's equivalent of a logo. (worked it out)
  - Still no tags, links or small text on colour, which is what looked foreign before. One dark heading on #10B981 is about 6:1. (worked it out)
Built as new frames and fresh instances, not moved ones (LEARNED earlier today: moved frames showed stale sizes in Devansh's editor).

CHANGE · 2026-09-17 · V6 green banner: photo then name, built fresh
Changed (Referral request, Not enough to judge):
  - New banner frame: fresh avatar instance (88, same photo and shadow) with the name under it (text/heading/md, text/primary, centred), 12 apart, banner still 175 tall.
  - New row under the banner: role (text/label/md, text/secondary) left, fresh status Tag right.
  - Old banner and title frames deleted.
Checked: screenshot; Explore flow fit and overlaps.

CHANGE · 2026-09-17 · V6 green banner: side by side, white name · Source: Devansh
Asked:    "Not top-down. Image on the left, name after that. The whole thing should look centred. Keep the name text in white."
Changed (Referral request, Not enough to judge): banner is now a centred row: photo 72 on the left, name on the right 16 apart, banner still 175 tall. Name uses color/text/onBrand (the file's own white-on-brand token).
Risk, told to Devansh: white on #10B981 is about 2.5:1. At 20 px semibold that is under the 3:1 minimum for large text, so the name may be hard to read in sunlight or for low-vision users. Options if it's a problem: a darker brand green behind the name, or 24 px bold (still under 3:1 on this green). (worked it out)

CHANGE · 2026-09-19 · V6 sanity pass before attack · Source: Devansh asked for a quick check of all screens
Checked: all 40 V6 screens. Scripted checks for clipped text, text outside the screen, missing styles and placeholder text, then a screenshot of every flow.
Fixed:
  - Candidate Profile (paused): the PAUSED tag had a green "live" dot. Now orange, same as the Paused tag on Manage posts. (saw it)
  - Referrer Messages: an unread badge "3" sat on the Posts tab. It was left over from V2, where that slot was Messages. Hidden. (saw it)
  - Edit job post and Check your job post: the two side-by-side buttons were 52 and 56 tall. Both are 52 now, like V2. (saw it)
  - Link page Sent screen: "Get the Sidedoor app" changed to "SideDoor", the brand spelling. (saw it)
  - The second Candidate Profile screen was renamed "Candidate/Profile Screen/Paused" so the two names differ.
Not changed (checked, fine):
  - Chips cut at the right edge are sideways-scroll rows, same as V2.
  - Lists cut at the bottom sit in scroll areas.
  - The "9:41" status bar font is missing on this machine, same as V2.
Left open:
  - The empty Referral requests screen has a bell and a link icon in the header. The full list has only the link icon.
  - The Edit job post subtitle leaves "in." alone on the second line.
  - White name on green still fails contrast (logged 2026-09-17).

DECISION · 2026-09-19 · V6 (in place) · Cover photo replaces the green banner · Source: Devansh
Asked:    "Can we give an option to add a cover photo instead of green, and move name and image somewhere else, better than LinkedIn?" (LinkedIn profile screenshot as reference)
Decided:  The candidate can add a cover photo. The cover is 104 tall. The photo (72, white ring) overlaps the cover's bottom-left edge. The name sits to the right of the photo, under the cover. The role and status row stays below. No cover means brand green in the same spot.
Because:
  - LinkedIn's photo overlaps the cover, then leaves empty space beside it, and the name starts under the photo. Putting the name next to the photo uses that space, so the header is about 35 px shorter. The match evidence moves up the screen. (worked it out)
  - The name is now dark text on white, not white on green. That fixes the 2.5:1 contrast problem logged on 2026-09-17. (worked it out)
  - The green fallback keeps the SideDoor look and still sits next to brand-coloured job cards. (worked it out)
Pushback, logged:
  - A cover photo gives the referrer no evidence about fit, and it can show looks, religion or lifestyle. That invites bias on the very screen where they decide. Possible guards: covers are optional, and any flagged cover falls back to green. Not tested. (guessing)
  - It weakens the one-to-one match with the job card's brand banner, where the company logo sits on colour. (worked it out)

CHANGE · 2026-09-19 · V6 cover photo built
Changed:
  - Referral request (Abhinav): the green banner was replaced by a Profile Header with a sample cover. The cover is an abstract gradient standing in for a photo he uploaded, because the file has no real cover image. There is also a fresh photo ring and the name in text/primary.
  - Not enough to judge (Amit): same header, cover left brand green, to show the "no cover added" state.
  - Candidate Edit your details: new "Cover photo (optional)" section after Links. It shows a thumbnail, "Shown on your requests" and Replace.
  - Edit Profile section grown by 220 so the flow stays inside it.
Checked: screenshots, flow fit, section overlaps.

DECISION · 2026-09-19 · V6 (in place) · Green banner shows the match, not the person · Source: Devansh
Asked:    "What better can we use the green section for if not a cover image? I don't like image and name inside it." Then: "do whatever is the best."
Decided:  The green banner holds the match summary: "4 of 7 skills match" (text/heading/lg, dark) and "Both ex-MakeMyTrip" (text/label/md) under it. The photo, name, status and role move to one row below the banner. The cover photo idea is undone.
Because:
  - The referrer's first question on this screen is "does this person fit my job?" The biggest spot on the screen should answer it. (worked it out)
  - It mirrors the Job card: that banner says who is hiring, this banner says how well this person fits. (worked it out)
  - Dark text on #10B981 is about 6:1, so the contrast problem is gone. (worked it out)
  - Two lines only, no tags or links on colour. That keeps clear of what Devansh called ugly before.
  - "Not enough to judge" uses a grey banner (surface/tertiary), not green. Green reads as a good match, which would be wrong here. V2's "Not enough to judge" tag was neutral grey too. (worked it out)
Removed as repeats (hidden, not deleted): the "4 of 7 skills · 3 yrs" tag on How they match, the "Both ex-MakeMyTrip" tag on In common, and the "Not enough to judge" tag on Amit's How they match.

CHANGE · 2026-09-19 · V6 match banner built
Changed:
  - Referral request (Abhinav) and Not enough to judge (Amit): Profile Header replaced by Match Banner (175 tall, radius 16) and a Person row (photo 48, name text/heading/sm with a status tag on the right, role text/label/md secondary). The old Role And Status rows were removed.
  - The cover photo field was removed from Candidate Edit your details. The Edit Profile section is back to 5343 tall.
Checked: screenshots, Explore flow fit and overlaps.

CHANGE · 2026-09-19 · V6 match banner polish · Source: Devansh ("looking pretty generic")
Changed (Referral request and Not enough to judge):
  - Type hierarchy. The big number "4 of 7" is text/display/lg (32), with "skills match this job" in text/heading/sm under it. Before, it was one flat 24 px line.
  - New 7-part match bar: 4 dark parts, 3 faded. It mirrors the 7-row checklist under "How they match", so the referrer sees the ratio before reading.
  - "Both ex-MakeMyTrip" now has the MakeMyTrip logo (18 px) in front of it. It reuses the logo already in the Experience block.
  - Text colour on green changed from grey to a deep brand green. New tokens: color/palette/brand/green/950 #022C22 and color/text/onBrandSecondary, which aliases it in Light and Dark.
  - Grey "Not enough" banner has the same layout: "Not enough" / "to judge fit for this job", all 7 parts empty, and "Resume too thin to match skills".
  - Tried and removed: a big faded lightbulb in the corner. Cropped, it looked like a random blob.
Correction: on 2026-09-19 I wrote that dark text on #10B981 is "about 6:1". text/primary is #3B3F46, which is about 4.1:1. The new deep green #022C22 is about 5.9:1, which passes 4.5:1 for small text. (worked it out)
Checked: screenshots of both banners. Banner height is unchanged at 175, so the flow layout is unchanged.

CHANGE · 2026-09-19 · V6 match banner cut to two lines, white on brand green · Source: Devansh
Asked:    "Looks really ugly and too cluttered. This font colour is not looking good on this background." Then, when shown a deeper green: "I don't want to change brand green colour."
Changed (Referral request and Not enough to judge):
  - Green banner: only "4 of 7" (text/display/lg) and "skills match" (text/heading/sm), both white (color/text/onBrand).
  - Removed the 7-part bar and the "Both ex-MakeMyTrip" logo line. The checklist and In common below already say both.
  - Grey banner: only "Not enough" / "to judge fit for this job". Removed "Resume too thin…", because the How they match box says it.
  - Deleted the deep-green ink tokens added earlier today (green/950, text/onBrandSecondary), now unused.
Kept brand green #10B981 as Devansh asked.
Risk, told to Devansh: white on #10B981 is about 2.5:1. That fails even the 3:1 minimum for large text. The same number and wording also appear in text on white lower on the screen (the How they match checklist), so no information lives only in the banner. Goes into molades-attack as a known finding. (worked it out)
Checked: screenshots of both banners and the Not enough to judge screen.

CRITIQUE · 2026-09-19 · Is every V6 decision backed? · Source: Devansh
Said:     Make sure every iteration's reasoning is logged, and that V6 comes from the process and research, not at random, so every decision can be defended in interviews.
Method:   Checked every research note cited in LOG.md and ITERATIONS.md (27 notes) against RESEARCH.md. Checked every V6 decision for a written reason and an evidence type.
Found:
  - All 27 cited notes exist and say what we claim. (saw it)
  - n92 is Devansh's memory of a follow-up talk with Samarth, not a recording. R3 (tips) cited it without saying so. Now marked. (saw it)
  - ITERATIONS.md V6 was out of date. It still described the green header with photo, name and links and "text stays dark", and it missed the login lines, the six banner rounds and the sanity pass. Rewritten. (saw it)
  - Two 17 Sep entries say dark text on green is "about 6:1". That was wrong: text/primary #3B3F46 is about 4.1:1. Corrected in the 19 Sep polish entry. The old entries are left as written, because the log is a record. (worked it out)
  - The final match banner had a stronger reason than first logged: Samarth's rule "at least a 50% to 70% skill match" (n50) makes the skill ratio the referrer's first check. Added to ITERATIONS. (saw it)
  - Some V6 choices rest on reasoning or taste, not research: salary on cards, saved jobs, job preferences in Edit only, and brand green with white text (Devansh's call, fails contrast). Now labelled as such, not dressed up as research.
Added:    "What backs each V6 decision" table in ITERATIONS.md: decision, evidence, type (Quote, Business, V2, Benchmark, Reasoning, Taste) and strength, plus the weak spots to own in an interview.

DECISION · 2026-09-19 · molades-research · Kill conditions with numbers · Source: Devansh
Decided:  Added two numbered kill conditions to SCOPE.md for the next real test: (1) under 1 in 5 complete requests from strangers submitted to the portal → main guess dead; (2) under 3 of 8 referrers sending their link in 2 weeks → cold-start bet dead. The test is 8 referrers in tech using their link for 2 weeks.
Rejected: Writing a research plan or kill condition backdated to the interviews, and judging the old data against it. molades-research says a plan written after collecting is fiction.
Because:  The research went ahead without a kill condition, so nothing could have proved the guess wrong. The next test should have one. "1 in 5" comes from n30 ("80% of the time they don't reply"), so a complete request has to beat today's best case.
How sure: guessing (the numbers are a line in the sand, not measured)

CHANGE · 2026-09-19 · molades-build · V6 missing states built · Source: Devansh ("build the missing states strictly according to the same design language … and prototype")
Why:      molades-build builds every screen state before molades-attack. BRIEF.md ("When it's not perfect" and the AX Spec failure table) planned about 20 states that V6 didn't have.
Where:    New section "V6 · States Flow" on UI Screens, right of Message Flow. Row 1 candidate, row 2 referrer, row 3 link page. Each screen is a copy of its V6 parent with only the state's change. Existing screens untouched.
Built (19), each from its BRIEF line:
  Candidate
  - Upload Your Resume/Couldn't Read File: "Couldn't read this file" + "Try a PDF with text you can select, or fill in the details yourself." (AX Spec: Won't, a fault). The auto-fill list is hidden so the error sits above Next.
  - Your Profile From Your Resume/Reading: "Reading your resume. You can fill the rest while it works." Experience and Projects show loading bars, See jobs stays on (AX Spec: Slow).
  - Check Your Referral Request/Couldn't Send: "Couldn't send. Your details are saved." + Try again (BRIEF: Error).
  - Check Your Referral Request/No Requests Left: "No requests left this week. More on Monday." Send stays off (BRIEF: Not allowed). Shortened from the BRIEF line, which ran past the screen edge.
  - Your Referral Requests/Just Sent: "Sent to Nithin · Interaction Designer, Flipkart" at the top, the new request first as Sent, "Just now" (BRIEF: Done).
  - Track Details/Loading and /Couldn't Load: "Couldn't load this request" + "Pull down to try again." (BRIEF).
  Referrer
  - Referral Requests/Loading, /Couldn't Load, /All Handled ("You're through every request for this job. Share your link to get more."), /Paused Post ("This post is paused" + "Requests that already came in are still here.", Suggested hidden because a paused post shouldn't invite), /Fit Checked Again ("You changed this job. Fit was checked again.") (BRIEF + AX Spec: Out of date).
  - Referral Request/Skill Removed: Prototyping struck through, "You removed this. Tap to undo", banner 3 of 7, "Count updated for you only" (AX Spec: Wrong).
  - Referral Request/Profile Updated: "Profile updated since the 12 Sep fit check" above How they match (AX Spec: Out of date).
  - Your Referrals/Empty ("No referrals yet. When you refer someone, you'll pass on their stage here.") and /Updated ("Updated. Aviral can see it.", Aviral leaves the waiting list, count 2 → 1) (BRIEF).
  - Seen It Move/Couldn't Update: "Couldn't update. Try again." (BRIEF: Error).
  Link page
  - Job Closed ("This job is closed", nothing to fill) and Already Asked ("One request per job, per referrer.") (BRIEF).
Design language, kept to DESIGN_LANGUAGE.md:
  - Messages are the V2 info note: a Tag with the info icon, not a coloured box. Neutral for info, Success for done, Failure only for real errors, Buffer (amber) for paused, the same amber as "On hold".
  - Longer explanations are the Empty screen's own paragraph text, copied, under the tag.
  - Loading uses grey bars in the Neutral tag's fill (Surface raised, the palette role for empty states) inside white cards with elevation-1. The only new pattern; it uses existing tokens only.
Not built, with reasons:
  - Half done ("Filled 9 of 12"): V4 Fix 3 moved portal details to the first request. That state already exists as "Still needed · 4" on Check your referral request.
  - Copy fails on After Refer: the fix is text that stays selectable, which has no visual state.
  - Duplicate referral at the same company and moving a stage backwards: still open in BRIEF, so there's nothing decided to draw.
  - "Too much" states (40 requests, 20 skills): left for molades-attack, which is built to test them.
Known issue carried to attack: the Failure tag uses V2's red text #EF4444, which DESIGN_LANGUAGE.md says not to inherit (about 3.5:1). Kept so the states match the rest of V6.
Checked: screenshots of all 19; section sized to fit, no overlaps.

CHANGE · 2026-09-19 · molades-build · V6 clickable prototype
Why:      molades-build ends with a link somebody else can open, and molades-test needs one. V6 had 3 links and no starting point.
Found:    Figma only links top-level frames. V6 screens sit inside section frames, so every link was refused.
Changed:  New page "🔗 V6 Prototype" with top-level copies of 61 V6 screens (the main flows plus the new states). UI Screens is untouched. 265 links: login → role → both onboardings; Jobs → Job → Check your request → Just sent → tracking; Post job → Live → Referral requests → Referral request → Refer → Mark as submitted; Update sheet, Not moving forward and Share sheets as overlays; every bottom tab; every back arrow; profile switch LIVE ↔ PAUSED; link page upload → details → sent.
Starting points: 1 Sidedoor app (from Login), 2 Link page, 3 Referrer requests, 4 Candidate jobs.
Limits:   The copies are a snapshot. If a V6 screen changes, recopy it. Sheets open centred, because the API can't set overlay position; set "Bottom" on the three sheets in Figma's Prototype panel. Error and loading states are on the page but not on the happy path.

CRITIQUE · 2026-09-19 · V6 Manage your posts · Source: Devansh asked for a senior review
Found:
  - The screen was built around editing, the rarest action. Nothing showed which post has new requests, the reason a referrer opens this tab. (worked it out)
  - Four filled blue Edit buttons. DESIGN_LANGUAGE.md: blue means "the one thing to tap". (saw it)
  - The Flipkart logo repeated on every card. A referrer posts for one company, so it told them nothing and took a quarter of each card. (saw it)
  - The Live/Paused tag and the switch said the same thing. (saw it)
  - The Draft card didn't say why it was a draft. Drafts exist for a missing job ID (V6 R3, n70). (saw it)
  - "2:36 pm" didn't say what happened at that time. The job ID, which referrers use on their portal, was missing (n70). (saw it)

DECISION · 2026-09-19 · V6 (in place, Devansh: "yes") · Manage your posts shows activity first
Decided:  Each card shows the title with the switch, then status in words plus the job ID ("Live · Job ID 184223"), then activity ("5 new · 8 referred"), with "5 new" in blue as the one thing to tap and a small pencil for Edit. The logo shows once, as "Flipkart · 4 posts" above the list. Order: new requests first, then live, paused, draft. Draft reads "Draft · Add the job ID to post" with a blue "Finish". Paused reads "1 still open", because pausing keeps requests that already came in (BRIEF).
Because:
  - The referrer's job here is "which post needs me?" Activity answers it. Editing is rare. (worked it out)
  - One blue action per card, per DESIGN_LANGUAGE.md. (saw it)
  - Job ID is how referrers match a post to their portal (n70). (saw it)
  - Status stays in words ("Live", "Paused"), not the switch colour alone ("Clear": status in words, not colour). (saw it)
Not built: "6 of 10 this week" per post (the weekly limit). Useful, but it adds clutter; left out unless Devansh wants it.
Test: taps from Posts into Referral requests versus into Edit. If Edit is still used most, the order is wrong. (guessing until measured)

CHANGE · 2026-09-19 · V6 Manage your posts rebuilt
Changed: four new Post Card frames built fresh (white, radius 10, elevation-1, padding 16): title text/heading/sm with a Switch (Status On/Off), status and job ID text/label/sm secondary, activity text/label/md with the blue link colour on the tappable part, and V2's edit-2-fill pencil. Section label "Flipkart · 4 posts" copied from the Referral requests label. Cards 16 apart. The + button, removed by mistake with the old list, was restored from V5 and set 8 above the bottom of the list.
Prototype: the copy on "🔗 V6 Prototype" was replaced and 21 incoming links repointed. Cards open Referral requests (paused post → the paused state), Finish → Check your job post, pencils → Edit your job post, + → Add the job. The Product Manager card isn't linked, because there's no requests screen for that job.
Checked: screenshots; nothing clipped.

CRITIQUE · 2026-09-19 · Full audit of V6 and its states · Source: Devansh ("audit every screen + states … strictly without deviating from design language")
Method:   All 61 V6 screens (42 flow screens + 19 states). A script checked every visible text, header icon and primary button, and flagged blue text that isn't tappable. Then screenshots of every flow, read against DESIGN_LANGUAGE.md and the research.
Checked and kept, with reasons:
  - Blue on done timeline stages, matched skills, match tags and the active tab: DESIGN_LANGUAGE.md's V2 patterns set these, and matched skills are tappable ("Tap a skill…").
  - Back arrow on tab screens: DESIGN_LANGUAGE.md top bar pattern, kept from V2.
  - "Not moving forward" as the sheet's blue button: the sheet exists to confirm that one action.
  - Skill chips cut at the right edge: V2's sideways-scroll rows.

DECISION · 2026-09-19 · V6 audit fixes (in place)
  1 · Main action colour. DESIGN_LANGUAGE.md: blue is "the one thing to tap".
      - Log out: primary → secondary on all 3 profiles. Leaving the app isn't the screen's main job.
      - Your referrals: Update buttons under "All referrals" → secondary. Blue stays only on the two under "Waiting on an update", which are the ones due, so blue now means "act here". Also on the Updated state.
      - Track details, Referred and Submitted: "Message Referrer" primary → secondary, renamed "Message Advika" / "Message Abhishek", like "Thank Joy". After Submitted there's nothing for the candidate to do, and a big message button invites chasing, which is the referrer's pain (C2, n60, kept-out L5). Still one tap away.
  2 · Blue text that isn't a link. Unread message previews were blue. Now ink (text/primary). The blue count badge still marks unread, and read ones stay grey. (DESIGN_LANGUAGE.md: blue only for tappable things.)
  3 · Headers.
      - Link page (5 screens): bell and back arrow hidden. It's a web page for people without the app, so there are no notifications to open and the browser has its own back.
      - Referral requests Empty, Loading, Couldn't load, All handled: bell → share-link icon, the same header as the full list (V4 Fix 6: share icon on requests).
  4 · Words, sentence case like the rest of the app:
      - Refer someone / Get referred, Switch role, Quick share, Edit profile.
      - "Full time", "Remote or hybrid" on the Job and invite screens, the same words as the candidate's chips.
      - "Logout" → "Log out" (the verb).
  5 · Referrer Edit profile, which was V2's screen left as it was:
      - A pencil in every field is on DESIGN_LANGUAGE.md's "never" list, so it was hidden. The fields are editable already.
      - Labels now match Confirm where you work: Your name, Company, Your role, Where you work from.
      - "Save Profile" → "Save changes", like the other edit screens.
  6 · Edit your job post subtitle: "…for requests already in." left "in." alone on a line. Now "Saving checks the match again for current requests."
Prototype: the same fixes applied to the copies on "🔗 V6 Prototype", so their links stay. The share icon on Referral requests and its states now opens the Share sheet.
Not changed, flagged for molades-attack: status and error tag text colours are V2's (#22C55E, #EF4444, #F59E0B), which DESIGN_LANGUAGE.md says not to inherit. Changing them means editing the shared Tag component, which touches V2–V5 too, so that's a decision for Devansh, not a quiet fix. The white "4 of 7" on brand green is the same kind of issue.
How sure: worked it out, from DESIGN_LANGUAGE.md rules and the research. None tested with users.

CRITIQUE · 2026-09-19 · Design-system audit of the whole Figma file · Source: Devansh ("all screens using real components … proper tokens, styles … nothing orphan … industry standard")
Found (by script, then by eye):
  - Tokens: 149 variables could be picked for any property (ALL_SCOPES). Palette colours showed up in every picker, so a designer could use a raw hex-level colour instead of a semantic token.
  - Library: 3 icon colours hard-coded, 2 upload-button texts at an off-scale 13 px with no style, 6 components named "Component 1/2/3/9", "Circle", "Slot", and no component had a description. Radius and spacing inside components weren't linked to tokens.
  - V6 screens: repeated patterns were plain frames, not components. Section label ×87, detail field ×68, match row ×24, headline ×18, radio option ×14, person row ×14, request card ×15, profile menu row ×11, list top bar ×21, sheet person card ×3, post card ×4, match banner ×4, loading card ×3. Radius (217) and spacing (1,995 values) were typed in by hand, including off-grid values (3, 6, 7.27, 10, 14, 26 …). 12 stray white fills, 14 avatars with hand-made shadows, 1 text only partly styled.
  - Doc pages: Colors, Typography and Spacing were drawn by hand. Swatches weren't linked to the variables, the "Aa" samples didn't use the text styles, 498 doc texts had no style, 9 semantic colours and the new radius/spacing tokens weren't documented, and 15 stray layers sat loose on the Colors page.
  - Logos: file-dump names ("imageigi 1", "vecteezy_infosys-…").

DECISION · 2026-09-19 · Make the file work like a real design system
Decided and done:
  1 · Token scopes. Palette colours hidden from pickers (used only through semantic tokens). Semantic colours scoped by job: text → text fill, surface → fills, border → strokes, icon → shapes. Spacing → gap and size, radius → corner radius, type tokens → font size, line height, weight, family. color/primary and color/secondary are brand bases, hidden and described.
  2 · New tokens, only for values V6 really uses: spacing/2 (spacing/2xs), spacing/64 (spacing/5xl), radius/24 (radius/2xl, radius/component/window), radius/40 (radius/component/device for phone corners).
  3 · Library fixes. Icon colours linked to color/icon/secondary. Upload button text on text/button/sm (13 → 14 px; this shows in V2–V5 too, a 1 px change). Clear names: Icon/Team, Icon/Posts, Icon/Bookmark, Progress/Step, Indicator/Circle, .Slot. Every component has a description saying when to use it. 44 radii and 52 gaps inside components linked to tokens (gaps of 2–3 → spacing/2xs, 5 → 4).
  4 · New components (section "Patterns (V6)" on the Components page), each with text, boolean and swap properties and a description:
      - SectionLabel, DetailField (Copy Off/On), MatchRow (Matched/Missing/Removed), Headline, RadioOption (Default/Selected), PersonRow.
      - PostCard (Live/Paused/Draft), MatchBanner (Match/Not enough), SkeletonCard, RequestCard, MenuRow, SheetPersonCard.
      - AppHeader now has Type=Logo (the old component; its 40 instances stay linked) and Type=Title (title text, right icon swap, show/hide).
  5 · V6 screens and the prototype page: every repeated frame above swapped for an instance with the same content. 775 component instances on V6 now. Prototype links carried over to the new instances (281 links, up from 265).
  6 · V6 radius and spacing linked to tokens. Off-grid values rounded down to the nearest step so nothing grows and clips (3→2, 6→4, 10→8, 14→12, 26→24 …). Cards that were radius 10 → radius/component/card (12, per DESIGN_LANGUAGE.md). Phone frames → radius/component/device (40). 25 → 24 (window).
  7 · Stray white fills removed. Avatar shadows → effect/elevation-1. The login line's spaces are styled.
  8 · Doc pages linked to the real tokens:
      - Colors: 27 palette swatches and every semantic row linked to its variable, with Dark shown via the Dark mode and hex labels refreshed from the variables. 9 missing tokens added. 15 stray layers moved to the Trash page.
      - Typography: the 12 "Aa" samples use their real styles.
      - Spacing: radius samples linked, new tokens documented, elevation samples use the effect styles.
      - Doc chrome uses new doc/* text styles (marked "documentation only").
  9 · Logos and illustrations renamed to Logo/… and Illustration/… (38).
Final test (script, V6 UI screens): 0 hard-coded colours, 0 unstyled texts (besides the iOS status bar), 0 raw shadows, 0 unlinked radius, 0 unlinked spacing. Library: 209 components, all described, 0 hard-coded colours, 0 unstyled texts, 0 raw shadows. Screenshots of every changed screen checked.
Mistakes caught and fixed during the pass:
  - Rounding radius 40 hit phone frames; the device token was added.
  - Radius 10 (a tie) rounded to 8; cards were moved to 12.
  - The new Title header came out 430 tall; fixed to 390×120.
  - PersonRow read a tag's text as the role on 4 screens; fixed. Its role wrapped; the tag moved beside the name.
  - A page-wide text search restyled two spaces on V2's login line; reverted.
Not changed, on purpose:
  - V2–V5 screens stay as they were (project rule: earlier versions are the record of the redo). Only shared components they use were fixed.
  - The iOS status bar keeps the system font (SF Pro). It's missing on this machine, so it can't take a style.
  - "Card Section", "Box", "Window" and "Scroll Section" stay plain frames: they're layout containers, not repeated designs.
  - The Job Card component has one 52 px gap. Rounding it to 48 would shift V2–V5 job cards; left for Devansh.
  - Tag text colours (#22C55E, #EF4444, #F59E0B) still fail contrast. They need a decision, because the change shows in every version.

DECISION · 2026-09-19 · molades-attack · Scope and prediction
Decided:  Attack the two screens the product rests on: Check your referral request (candidate) and Referral request (referrer). Full tables in ATTACK.md.
Prediction: Devansh predicted 1 of 13 stress findings ("something too long or too many"). Missed every nothing, wrong and waiting case.

CRITIQUE · 2026-09-19 · molades-attack · Source: self · S1
Finding:   A long referrer name ("Krishnamurthy Venkataraghavan Subramanian") cuts mid-word and pushes the Job ID tag off the candidate's screen.
Severity:  major · Layer: looks
Action:
CRITIQUE · 2026-09-19 · molades-attack · Source: self · S3
Finding:   A long skill name is cut to "Human-centred service design ar" in How they match, so the referrer decides on evidence they can't read.
Severity:  major · Layer: looks
Action:
CRITIQUE · 2026-09-19 · molades-attack · Source: self · S5
Finding:   A candidate who skipped the resume can tap "Ask Nithin for a referral", and nothing is designed after that tap.
Severity:  major · Layer: steps
Action:    deferred: needs a molades-brief decision (can you ask without a resume?)
CRITIQUE · 2026-09-19 · molades-attack · Source: self · S8
Finding:   A wrongly formatted date of birth (31/02/1999) has no field error on Check your referral request.
Severity:  major · Layer: moments
Action:
CRITIQUE · 2026-09-19 · molades-attack · Source: self · S9
Finding:   Asking the same referrer for the same job again from the app has no "already asked" state (only the link page has one).
Severity:  major · Layer: moments
Action:    deferred: rarer than the five being fixed
CRITIQUE · 2026-09-19 · molades-attack · Source: self · S10
Finding:   Tapping Refer by mistake can't be undone, and the candidate is told at once.
Severity:  major · Layer: moments
Action:
CRITIQUE · 2026-09-19 · molades-attack · Source: self · S12
Finding:   No "Sending…" state on Send; a double tap on a slow network may send twice (can't confirm statically).
Severity:  major · Layer: moments
Action:
CRITIQUE · 2026-09-19 · molades-attack · Source: self · minor stress findings
Finding:   S2 long name hides "Sent today"; S6 empty note and links not designed; S7 "0 of 7" not designed; S11 job closed mid-form only handled after sending.
Severity:  minor
Action:    deferred
CRITIQUE · 2026-09-19 · molades-attack · Source: self · C1
Finding:   Tag text contrast fails: Success #22C55E/#ECFDF5 2.16:1, Buffer #F59E0B/#FFFBEB 2.07:1, Neutral #6B7280/#F0F1F2 4.27:1, Primary #2563EB/#E9EFFD 4.49:1 (needs 4.5:1). DESIGN_LANGUAGE.md already said not to inherit these.
Severity:  major · Layer: looks
Action:    waiting on Devansh: the fix is in the shared Tag component and changes V2–V5 too
CRITIQUE · 2026-09-19 · molades-attack · Source: self · C2
Finding:   Tap targets under 44×44: back 24, bell 24, edit pencil 18, external link 20, "Show project details" 20 tall, skill rows 38 tall, "Mark it".
Severity:  major · Layer: looks
Action:
CRITIQUE · 2026-09-19 · molades-attack · Source: self · C3
Finding:   Input fields have no visible edge: #FAFAFA on #FFFFFF with a soft shadow, about 1.04:1 (needs 3:1).
Severity:  major · Layer: looks
Action:
CRITIQUE · 2026-09-19 · molades-attack · Source: self · C4
Finding:   Placeholder text #9CA3AF on white = 2.54:1.
Severity:  minor · Layer: looks
Action:
CRITIQUE · 2026-09-19 · molades-attack · Source: self · C5
Finding:   White "4 of 7" / "skills match" on brand green #10B981 = 2.54:1 (32px needs 3:1, 16px needs 4.5:1).
Severity:  major · Layer: looks
Action:    rejected by Devansh (keep brand green with white, 19 Sep). The count repeats in dark text in "How they match".

DECISION · 2026-09-19 · molades-attack · C1 tag colours kept · Source: Devansh ("don't fix them, they are fine at present")
Decided:  Keep the V2 tag text colours in every version, after seeing before and after side by side.
Rejected: Darker text (#047857, #B45309, #4B5563, #1D4ED8, #B91C1C; 4.8–6.7:1).
Because:  Devansh's call. What limits the risk: every tag carries a word, so no status is shown by colour alone.
Risk kept: 2.07–4.49:1 against a 4.5:1 minimum, hardest to read for low-vision users and in sunlight. Stays in ATTACK.md as a known failure; the fix is one change to the Tag component.

DECISION · 2026-09-19 · V6 (in place) · Green match banner removed · Source: Devansh ("this doesn't look good, maybe I shouldn't have forced you to use this green card … design it how the best you feel … the green card is optional")
Decided:  No banner on the referrer's Referral request (and its Not enough, Skill removed and Profile updated states). The card opens with the person row. The match shows as the tag beside "How they match" ("4 of 7 skills · 3 yrs", or "Not enough to judge"). Shared background shows as the tag beside "In common" ("Both ex-MakeMyTrip").
Because:
  - Same summary, same tags, as the request list card the referrer just tapped, so there's nothing new to read. (worked it out)
  - The evidence moves up by a whole banner's height. (saw it)
  - Nothing sits on colour, so attack finding C5 (2.54:1) is gone. (worked it out)
  - Six rounds of the banner never landed. That's a sign the pattern didn't belong. (worked it out)
Done: MatchBanner instances removed on both pages. The component was moved to the Trash page with a note, and has 0 instances.

CHANGE · 2026-09-19 · molades-build (round 2) · Attack fixes built
  S1/S2: PersonRow restructured. Name on its own line (max 220, one line, "…"), then role (two lines, "…") with the tag beside it. Tested at 310 and 358 wide with "Krishnamurthy Venkataraghavan Subramanian". The tag never clips.
  S3: MatchRow skill text fills the width and wraps in full; the source ends in "…".
  S8: InputField gets State=Error (Small, Medium, Large) with an "Error message" property; built from the Empty variants so the heading, icon and swaps stay. New state "Check Your Referral Request Screen/Date Error".
  S10: new Toast component and three tokens (color/surface/inverse, color/text/onInverse, color/text/linkOnInverse). New state "After Refer/Undo".
  S12: Button gets Type=Primary, State=Loading. New state "Check Your Referral Request Screen/Sending".
  C2: invisible "Hit area 44" frames on header back and bell (Header, AppHeader Title), the section edit pencil (shown with Show edit), skill rows, external-link icons (4), "Show project details" (6), "Mark it".
  Prototype: 3 new states copied. Send → Sending → Just sent (1.2 s); tapping the date field → Date Error; Refer → Undo toast → After Refer (5 s), and Undo goes back. 288 links.
Caught while building: variants copied inside a set lost their property links (Button Loading showed "Label" and icons; the error field lost its heading and icon). Re-linked from the source variants.
Fills in the Action lines of attack findings S1, S3, S8, S10, S12 and C2: fixed.

DECISION · 2026-09-19 · molades-attack · C3 and C4 kept · Source: Devansh ("don't change 6, 7")
Decided:  Keep field edges as a soft shadow (1.04:1) and placeholders at #9CA3AF (2.54:1), after seeing before and after.
Because:  Devansh's call. They keep V2's look ("shadow, no borders"). Risk kept: low-vision users may not find fields, and placeholders are faint. Listed as known exceptions in BRIEF.md Constraints.

CRITIQUE · 2026-09-19 · molades-attack · Whole-app stress pass · Source: Devansh ("do it for all the cases… every kind of attack")
Finding:  The first attack covered all four kinds on 2 screens only. It's now run on every V6 flow. "Too much" was tested for real on copies of 8 more screens. Result: 2 blockers, 18 majors, 19 minors, 18 already handled, 1 can't tell. Full tables in ATTACK.md, "Whole-app stress pass".
Blockers: referrer email verification has no personal-email or wrong-code state.
Majors, grouped:
  - Long text collides with the time or tag in ReferralBar, the Messages row, the Job card header, the Track details header and RequestCard.
  - First-run empty screens (Jobs, Your referral requests, Messages, Manage posts).
  - Loading and failure for Jobs, Messages and Your referrals.
  - An unreadable job link on the referrer side.
  - Link page upload progress, offline.
Next 5 to fix: listed in ATTACK.md.
Action:

CHANGE · 2026-09-19 · molades-build (round 3) · Whole-app attack fixes · Source: Devansh ("yes", after the before and after)
Built: the five fixes listed in ATTACK.md, "Whole-app fixes built". 12 new state screens. Components changed: ReferralBar, Card (Job and Candidate), RequestCard, SheetPersonCard (names get a max width and "…"); Tag (labels max 240 with "…"; normal labels look the same in every version).
Why these five: the two blockers (verification) stopped referrers from getting in at all. The other four were the majors that hit the most screens, or hit new users first.
Checked:
  - The long-string test was re-run on 5 screens: no collisions.
  - Normal data looks the same.
  - Section resized, no overlaps.
  - 0 unstyled texts and 0 unlinked spacing values on the new screens.
Caught: new Primary buttons showed the component's placeholder icons (hidden now), and "Your referrals/Loading" still showed real numbers (hidden).
Still open (ATTACK.md): offline everywhere, a cancelled login, link page upload progress, S5 and S9, and all minors.

DECISION · 2026-09-19 · Platform: iOS back chevron · Source: Devansh ("use ios chevron… change v2-v5 also")
Decided:  The back icon is now an iOS chevron (‹) in every version, V2 to V6. The one icon component (605:3762) was redrawn as a mirror of the library's chevron-right and renamed chevron-left, so all 295 uses changed at once and colour overrides were kept.
Rejected: A new icon swapped in per screen. More work, same result, and it would leave an unused long arrow in the library.
Because:  The app is presented as iOS (390 wide, SF Pro status bar, centred titles, 44px taps). The long arrow (←) is Android's back icon, so it was the one mismatch. saw it (Figma).
Checked:  V6 "Your referral requests" and V2 "Track Referrals" top bars render the chevron.

DECISION · 2026-09-19 · Font: tried SF Pro, kept Inter · Source: Devansh ("can we use sf pro…", then "use previous font only that looked better")
Tried:    The 12 text/* styles switched to SF Pro with Apple's tracking table (HIG, e.g. 16pt −0.31, 20pt −0.45).
Decided:  Back to Inter, as it was (0% tracking, same weights and line heights). Devansh preferred how Inter looked.
Because:  Devansh's call on looks. Inter is platform-neutral, so the app still reads as iOS. If asked in an interview: SF Pro was tried and reverted by choice, not missed.

CRITIQUE · 2026-09-19 · Consistency audit · Source: Devansh ("same type of things shud look exactly same… if they are different there shud be proper reasoning")
Method: scripts compared every component copy in V6 (size, padding, radius, shadow, text style, colour), then every text by role (names, times, job titles, subtitles, text links), then screen edges and list gaps. saw it.
Found:
  - Salary tag on the Job card: Semibold and ink colour; every other tag is 14/500 grey.
  - Messages list: names 20px and times 14px with 68 avatars; every other list is 16px names, 12px times, 44 avatars. Messages rows were raw frames, which is why they drifted.
  - Person cards: 68 avatar in ReferralBar (Your referrals) and the sheet person card; 44 in RequestCard for the same job.
  - Edit profile photo 94; Profile photo 68.
  - Login buttons 44 tall; all others 52.
  - Small in-card buttons ("Update") radius 4, which is the tag radius; all buttons are 8.
  - Text actions in two weights (500 and 600) and two blue tokens.
  - Draft post meta line 12/400; all meta lines 12/500.
  - Screen edges 16, 18, 20 or 24 depending on the screen (a "Card Section" padding and a 2px "Scroll Section").
  - My miss from round 3: the 240 tag cap cut off 18 full-sentence info notes ("We never contact your company or…"). Not caught in round 3 because the too-much retest looked at cards, not notes.
Action: fixed, see CHANGE below.

CHANGE · 2026-09-19 · Consistency fixes · Source: Devansh ("yes all these things shud be consistent in whole app")
Fixed all of the above to the rules in DESIGN_LANGUAGE.md "Consistency rules". Differences left each have a written reason there.
  - ReferralBar is now a set: Leading=Logo (68) and Leading=Person (44). First try set the slot to 44 for both and shrank company logos; caught on screenshot, fixed with the variant.
  - Tag label cap 240 → 322. All 18 notes show in full; checked.
  - Screen edge 16 (spacing/lg) on every V6 screen except Login.
  - Also applied on the V6 Prototype page copies.
Knock-on to V2–V5: the component-level fixes (Job card salary tag, ReferralBar, Tag cap, small button radius) also show in V2–V5 because they share those components. Raw V2–V5 frames were not touched.
Checked: re-ran the component audit; the only differences left are the reasoned ones. Screenshots of Messages, Your referrals, Your referral requests, Referral requests, Edit profile, Login, Verify email, Track details, Manage posts, Role selection.

CRITIQUE · 2026-09-19 · Referral request detail, tags, login · Source: Devansh (screenshots: "why is it getting cut at the bottom edge", "too much gap on both sides", "different kind of tag", "different font sizes for tags")
Found (saw it, Figma values):
  - Boxes looked cut: white boxes inside a white card, and their parent frames clipped content, so only the bottom shadow showed. 57 boxes in V6 used two styles ("Match Card" white r16 p24; "Box" white r8 with 16/12 or 12/16 padding).
  - Side gap: rows sat 64px from the screen edge (16 screen + 24 card + 24 box). Card padding 24 broke the 16 card rule.
  - Project tags cut off at the right: the SkillBlock row did not wrap.
  - Outline tag was the only unfilled tag, used for "in common" facts and for "Mark it", which is an action, not a label.
  - Tag text sizes: all 236 tags are 14/500. The difference in the screenshots was zoom level. No change needed.
Action: fixed, see CHANGE below.

CHANGE · 2026-09-19 · Boxes, tags, login · Source: Devansh
  - One content box everywhere: #FAFAFA, radius 8, padding 12/16, elevation-1, parents no longer clip. Outer card (Window) padding 24 → 16. Rows now 48 from the edge (was 64).
  - .Payload/SkillBlock wraps (8 gap), so project tags go to a second line instead of cutting off.
  - In-common tags: Outline → Primary (blue tint) with the person icon from the "In common" label. Why Primary: it is a fit signal, like "4 of 7 skills", which is already Primary. Icon tinted with the link token to match the text.
  - "Mark it": Outline tag → small secondary button, the same as "Update" in cards.
  - Login (V6 and prototype): removed "or" divider, Email button and the Terms line (Devansh). Google is full width and 52 tall like LinkedIn, relabelled "Continue with Google" so the two read the same. "Already have an account? Log in" sits below; "Log in" follows the text-link rule (14/500, link blue, no underline).
Risk kept: removing the Terms line means there is no consent notice on sign-up. Fine for a concept; a real build needs it somewhere in the flow.
Knock-on to V2–V5: SkillBlock wrap, Tag icon colour and the ReferralBar button come from shared components.
Checked: screenshots of Referral request, Referral requests card, Track details 2, Login, and the Projects block.

CRITIQUE · 2026-09-19 · UI bug sweep · Source: Devansh ("why are you not able to catch these small and obvious UI bugs")
Why I missed them: my earlier checks compared properties across copies (same style, same size) and looked at screenshots at about half size. That does not catch position bugs (a badge off its icon), clipping (a button cut by its frame) or layout drift (a whole screen pushed down). New checks added and run on all 76 V6 screens: anything clipped by a frame, anything outside the screen, text overlapping text, leftover placeholder words, colours stored wrong, floating (absolute) pieces, and a proofread of every visible string.
Found and fixed:
  - Login: screen centred its content, so the status bar sat 44px down. Now starts at the top; buttons sit near the bottom (24 top, 40 bottom padding).
  - Messages badge 12px off the icon: V6's bottom bar has 4 tabs, V2's had 5, and the badge kept V2's position. Pinned to the icon's top right on 5 screens.
  - Job card: title row 26 tall for 28px text, meta row 18 for 20px, and chip rows that did not wrap, so text was cut. Rows now hug and wrap; both Job screens grew so the "Ask Nithin" button stays visible.
  - 34 colours bound to the right token but stored as black, from my own edits today (the in-common tag rendered black). Re-applied with real values.
  - Copy (154 texts): straight vs curly apostrophes; "28-40 LPA*" vs "₹28–40 LPA"; the same skill in two cases ("User Research" / "User research", now sentence case); two resume file names; "..." vs "…" and "Search by names or jobs"; "Cred" vs "CRED"; "What are we looking for"; all-caps "LIVE"/"PAUSED" (banned in the design language); "2d ago"/"1w ago" next to "Yesterday"/"Monday" (now weekday or date); trailing spaces; typo "Seach".
Left on purpose: toast overlapping content (it floats by design); list content running under the bottom bar (scrolling).

CHANGE · 2026-09-19 · Login and in-common · Source: Devansh
  - Google button label "Sign in with Google" (Devansh). Note: LinkedIn still says "Continue with LinkedIn".
  - In-common facts ("Both ex-MakeMyTrip", "Same college") are no longer a chip: person icon + ink text, a new Tag Style=Plain. Why: the blue chip mixed with the skill-match chip (Devansh). Plain icon + text matches the app's other meta lines ("⟳ Today") and LinkedIn's mutual-connection line.

CHANGE · 2026-09-19 · Full-size visual pass, all 76 V6 screens · Source: Devansh ("I wanted to catch all such UI bugs and fix them")
Method: every V6 screen looked at at full size, plus the script checks (cut-offs, off-screen, overlaps, wrong stored colours, copy). Re-ran the cut-off and colour checks at the end: 0 and 0.
Fixed:
  - Back chevron on tab screens (Jobs, Requests, Messages, Profile, Referral requests, Your referrals, Posts and their states): iOS tab roots have nothing to go back to. New AppHeader property "Show back" (Title type), off on 28 UI and 19 prototype screens.
  - Typed values showed in placeholder-like grey (Verify email, Edit details, Edit job post). InputField Filled now shows values in ink (component change). Pre-filled share message too.
  - Buttons crowded by content on 4 form screens: the container was "space between" while hugging, so the 32 gap collapsed to 0. Now normal stacking.
  - "Not selected" timeline end was red; design language says neutral (not an error). Now grey ✕, grey text.
  - Selected timeline turned every step green; now done steps are blue like every other timeline, and only the final "Selected" is green.
  - Pending last step read "Selected" in some timelines, "Selected or not" in others. Now "Selected or not".
  - Job ID tag blue on 5 screens, grey on others. Blue is for fit signals; Job ID is a fact. Now grey everywhere.
  - Tag icons were grey on red and green tags. Icons now match their tag's text colour. The amber style got an icon slot, so "This post is paused" has the info icon like other notes.
  - Messages empty, loading and failed showed an unread "2" badge. Hidden.
  - Loading skeletons were swapped: Your referrals loaded as rows but shows cards; Messages loaded as a card but shows rows. Skeleton card now uses the card radius; Messages skeletons are plain rows.
  - Link page "Job closed" and "Already asked" were 390 tall. Now full 844.
  - Profile menu icons mixed outline and filled. Now filled (message bubble from the bottom bar, filled bookmark). Kept: the link icon, because the icon set (Remix) has no filled link.
  - "Quick share" was the only section label without an icon. Now a SectionLabel.
  - Role selection cards 48 apart; now 16, the list gap.
  - Copy: Title Case autofill lists ("Role & Level") to sentence case; "PDF, DOCX, TXT • Max 10MB" → "PDF, DOCX or TXT · up to 10 MB"; bullets → middots; "Copy your link" → "Copy link" (same action, one label); underlined file names → plain link text.
Not changed, on purpose:
  - "Still needed" under the Job ID field on Check your job post, not on its label row. The InputField component has no slot on its label row; adding one changes every form. Offered to Devansh.
  - "Update" is blue in "Waiting on an update" and white in "All referrals" on the same screen: the waiting ones ask for action, the rest are optional.
  - Quick share icon is an outline "external-link": no filled share icon in the set.
Knock-on to V2–V5 (shared components): InputField filled colour, Tag icon colours, AutofillInfo copy, SkeletonCard radius. A timeline script also touched V2–V5 timelines by mistake; caught and reverted (16 icons).

CHANGE · 2026-09-19 · "In common" rewritten the way real apps do it · Source: Devansh ("why do these two use the same icon… no app would write this heading 'in common'")
Before: a section headed "In common" with a person icon, a person-icon tag "Both ex-MakeMyTrip" on the same row, and a sentence "From your profile and their resume. You were there 2021–22, they were there 2022–23." Same icon twice, and a heading real apps don't use.
Now: no section. One meta line under the person, the way LinkedIn shows shared history: [MakeMyTrip logo] "Both worked at MakeMyTrip", and under it "You 2021–22 · Abhinav 2022–23". List cards use the same line.
Why these choices:
  - Company logo instead of a person icon: it says which company at a glance and removes the duplicate icon. College has no logo in the set, so it uses the building icon.
  - "Both worked at", not "worked together": the dates don't overlap, so "together" would be false. The dates line keeps the source visible (trust rule).
  - 12/500, the meta-line size (like "⟳ Today"). At 12px, "You both worked at MakeMyTrip" still didn't fit the Jobs card (190px). "Both worked at MakeMyTrip" fits every card, so one label everywhere.
  - "Both studied at NID Ahmedabad" was cut on Referral requests; now "Both studied at NID" (how people say it). College name is mock data, like the names.
Checked: detail screen, Referral requests cards, Jobs card; nothing cut (script). Logos keep their own colours (an old icon tint was reset).

CRITIQUE · 2026-09-19 · Spacing and text-by-role audit · Source: Devansh (screenshots of four lines under buttons: "why don't these things have consistent spacing and consistent font sizing… it's a grave blunder")
Why I missed it: my audits compared copies of the same component. The lines under buttons are loose text, not a component, so nothing compared them. Fix to the method: audit by role (what the element does), across all screens, whatever it is built from.
Found (saw it, script on all 76 V6 screens):
  - Text actions under buttons: gap 12, 16 or 24; half blue, half grey; Upload resume had two actions left/right, everywhere else centred.
  - Hint under side-by-side buttons 32 away ("Add the job ID to post."), others 12.
  - Stacked buttons 8, 12, 16 or 20 apart.
  - Section label → content 4, 8, 12, 16 or 20. Section → section 0, 12, 16, 20 or 24. Content → buttons 8 to 32.
  - Bottom: "Resend code" 1px from the screen edge on two states; Track details button touching the bottom bar (0 and 14px); link-page screens 682 and 776 tall.
  - Two more "space between + hug" containers that collapsed a 16 gap to 0.
Action: fixed, see CHANGE below.

CHANGE · 2026-09-19 · Spacing by role · Source: Devansh
Applied the "Spacing by role" table (DESIGN_LANGUAGE.md) to every V6 screen and the prototype copies. Text actions blue and centred, each button + its text wrapped in one "Actions" block. 90 section groups set to 24, 45 label groups to 8. Tight screens grown or padded; every screen ≥ 844.
Re-ran the role audit after: one value per role, except the two page-top values kept on purpose (lists 24, forms 32, from V2).
Slips caught: a findOne picked the V3 copy of "Marked as submitted"; reverted, applied to V6.

CHANGE · 2026-09-19 · Button pairs arranged one way · Source: Devansh (screenshot of "Save as draft | Post job": "you again missed this")
Miss: my role audit measured the gap between buttons (12 here too) but not their arrangement. Post a job and Edit your job post put the pair side by side; every other pair in V6 stacks full width, primary on top ("Refer / Not moving forward", "Mark as submitted / Message Abhinav").
Fix: both screens now stack, primary first ("Post job", then "Save as draft"; "Save changes", then "Pause post"), 52 tall, 12 apart, hint 12 below. Screens grown to keep 40 at the bottom. UI and prototype.
Caught while fixing: the old one-row container kept its height, which clipped the stack and squashed the buttons; set to hug and buttons back to 52. Checked on screenshots.
Rule added to "Spacing by role": two or more buttons always stack full width, primary first.

CHANGE · 2026-09-19 · Layouts that jumped when selected · Source: Devansh ("when I am selecting elements they are changing positions, aren't they responsive?… check for all the screens, this should never happen")
Cause (saw it, script on every V6 screen, UI and prototype):
  - 119 "Fill inside Hug" conflicts: a child set to fill a parent that sizes itself to its children. Figma resolves these differently each time it recalculates, so things move when selected.
  - Saved positions older than the layout settings, left by scripted edits that never re-ran the layout.
  - 118 hidden leftover layers in the state screens (the original content, hidden when the states were made). Figma does not re-lay hidden layers, so they kept stale positions.
Fix:
  - Conflicts resolved (28 parents set to fill, 124 children to hug/fixed). Checked every visible text before and after: the only visible change was Messages rows growing 51px each; the rows were set to fill the list's height. Rows now hug; Messages looks as before.
  - Forced a re-layout of all 4,049 auto-layout frames in V6 (token bindings kept). One visible shift: prototype Role selection card moved 8px to match the UI page, which it now matches exactly.
  - Deleted the 118 hidden leftovers. Each state screen now holds only what it shows.
Re-check: 0 conflicts, 0 out-of-date layouts. The one flag left ("About the employer" logos) is a measurement quirk from the logo group's negative gap (-5.5); the render is correct.

CRITIQUE + CHANGE · 2026-09-19 · Final audit of all V6 screens · Source: Devansh ("Do a final audit of all V6 screens")
Ran every check on all 76 V6 screens and the 64 prototype copies (140 frames): tokens and styles, component consistency, spacing and type by role, cut-offs, overlaps, layout stability, hidden layers, screen frame rules, copy, prototype-vs-UI match; then looked at every screen.
Found and fixed:
  - 10 screens (plus prototype twins) centred their content vertically, so after height changes the status bar and header sat 7–227px down (Verify email, link pages) or were cut at the top (Post a job, Edit job post, −22/−24). All screens now stack from the top. New check added: first element at y = 0.
  - My earlier spacing pass had set a 24 gap on the screen frame itself on 11 Jobs / Referral requests screens, adding 24 under the top bar and above the bottom bar. Screens now 0; bottom sheets 24 (section rule).
  - Prototype copies still had the old 20/24 screen edges (the 16-edge fix had only run on the UI page): 24 screens were 2–8px off their UI twins. Fixed; all 64 twins now match text, positions and heights exactly.
  - Bell icon on some inner screens (Referral request, Track details, Job, Edit profile) but not others. Now on tab screens only (iOS pattern: pushed screens show back + title).
  - Candidate Profile had a pencil badge on the photo and a pencil by the name (two edit actions); referrer Profile had one. Badge removed from Profile views; kept on Edit profile.
  - 3 form screens had 32 between content and the button (rule 24). Fixed.
  - Track details: 0 gap between content and the Message button; row time 14px (rows use 12px). Fixed.
  - Job card sections 16 apart (other detail cards 24). Fixed in the component.
  - Referral requests "Couldn't load": 24 between the red note and its help line (others 8). Fixed.
  - Paused post: bottom bar 46px above the screen bottom. Content area now fills.
  - 19 spacing values and 1 radius not bound to tokens. Bound.
Final re-check (140 frames): 0 on every check: unbound colours, unstyled text, raw shadows, unbound spacing/radius, fill-in-hug, stale layouts, cut-offs, off-screen, hidden layers, first element not at top, bar not at bottom, screens under 844, tight bottoms, wrong stored colours, prototype mismatches.
Open (not bugs): 12 newer state screens have no prototype copy yet; "Still needed" under the Job ID field (needs an InputField slot); link icon outline (no filled version).

CHANGE · 2026-09-19 · Generic page titles removed · Source: Devansh ("does the single title job make sense?")
No. "Job" above the job card, and "Referral request" above the request card, repeat what the card already says (its heading is the job title or the person). Job apps like LinkedIn show no generic title above a job. The referrer's After refer state already had none, so these were also inconsistent with it.
Removed on Job and on Referral request plus its 3 states (UI and prototype, 10 frames). Card now starts 24 under the top bar (details rule). Kept "Nithin suggests you for this job" on the suggested Job screen: it is a message, not a label.

CHANGE · 2026-09-19 · The 4 coverage gaps built · Source: Devansh ("yes build all 4 gaps and make sure ui follows all the rules")
Built from existing V6 screens and components, so tokens, styles and layout rules carry over. All on the UI page and the prototype.
  1. Candidate sees "Not moving forward" (J2: a no instead of silence). New Track details state, PhonePe / Avinash Banerjee (both already in the app: PhonePe is Avinash's job on Jobs). "Avinash isn't moving forward with this one." + "Reason: Experience doesn't match." Timeline: Sent → Not moving forward (neutral ✕, not an error). Find more jobs. The candidate list's Paytm row became PhonePe so list and detail agree.
     Plus "Role closed" state: "PhonePe closed this job." + "Reason: Role is closed. Requests for it close too." (BRIEF: job closed → the candidate is told automatically).
  2. Candidate sees "On hold" (the referrer could set it; no candidate screen showed it). Meta / Abhishek, a later state of the Submitted request: Sent, Referred, Submitted done; On hold current (amber, the same waiting style as "Sent, no answer yet"); In interviews, Selected or not pending. "On hold at Meta. Abhishek marked it on 16 Sep. Nothing for you to do yet."
  3. Notifications, candidate and referrer. Opened from the bell on every tab screen (a pushed screen: back, title, no bell). New component NotificationRow: the Messages row pattern (44 avatar, 16 vertical padding, divider), message 14/400 up to 2 lines, time 12/500, blue unread dot. Each notification is an event the design already has (Selected, Submitted, Referred, Not moving forward; new request with match, "Seen it move?", thanks) and opens its screen.
  4. Chat, candidate (with Nithin) and referrer (with Abhinav). Opened from the Messages rows. The request sits at the top as a context card (the existing ReferralBar, "Flipkart · Submitted"), so a chat is always about one referral (chat opens only after Refer, BRIEF). New components ChatMessage (Incoming grey surface/tertiary, Outgoing blue action/bg/default, 16 corners with a 4 tail, time under) and ChatComposer (the Messages search field + 48 round primary Send). Tab bar hidden in chat, as iOS chat apps do. The last messages match the Messages list previews.
Checked: full audit on all 83 V6 screens: 0 on every check (tokens, styles, spacing/radius binding, fill-in-hug, stale, cut-offs, overlaps, hidden layers, top, bottom bar, screen size). The composer sits flush at the bottom like the tab bar (40 padding inside for the home indicator).
Slips caught: text-based lookups miss a fresh clone's instance text; notification text first stopped at 1 line; the send button first fell under the field; the outgoing bubble was cut. All fixed on screenshots.
Prototype: 7 screens copied; bottom-bar links, back, bell → Notifications (12 tab screens), message rows → Chat, PhonePe row → Not moving forward, notification rows → their screens.

CHANGE · 2026-09-19 · "Still needed" on the Job ID label row · Source: Devansh ("yes")
InputField got a "Show tag" switch (off by default) with a Buffer "Still needed" tag at the end of the label row, in all 9 variants. Same placement as SectionLabel's tag, so "Check your job post" now matches "Check your referral request". Every other form is unchanged (tag off).
Job ID (UI and prototype): tag on; the old tag under the field removed; the note stays under the field, 8 below it (same gap as the field's own error line).
Also fixed in InputField: the heading icon in the Medium and Large Error variants wasn't wired to "Show Heading Icon" / "Heading Icon".

FIX · 2026-09-19 · Cut icons · Source: Devansh (screenshot: download icon cut on "Save these details")
Cause: 62 icon components (the 3089/3090 icon family) kept their drawing at a fixed size when shrunk. At 16–18px the 20×18 drawing spilled out of the box and was cut. Now they scale with the box, like the older icons.
On V6 this fixed 8 icons: download (3), external-link, bar-chart (2), clock (2). Prototype: 0 left.
Missed before because the cut-off check looked for layers clipped by a frame, not a drawing spilling out of its own icon box. New check added: vector inside its icon box.

CHANGE · 2026-09-19 · Full V6 sanity pass · Source: Devansh ("do a full sanity on all screens of v6 … any issue/inconsistencies still there")
Scripted checks on all 82 UI screens and 70 prototype copies, then every screen looked at. New checks added this time: a layer bigger than its parent, a drawing spilling out of its icon box, action blocks centred in leftover space, cards with empty space, card-list gaps.
Fixed (UI and prototype):
  - Boxes inside cards (Devansh: "why are we having cards/blocks under cards?"). The 4 Referral request screens had grey shadowed boxes inside the white card. Flattened to the V2 pattern: the Job card already worked this way. Rule updated: a content box sits on the screen, never inside a card.
  - Job card stretched to the screen height and left ~80px empty at the bottom (Devansh: "why this empty space"). Card now hugs its content, as on the suggested Job screen.
  - Action blocks centred in leftover space, so the gap above the button changed with content length: Track details (7 screens, 24 to 108), Profile ×3 (Log out), Add the job, Upload your resume (+ their error states), Edit profile (120). All now 24 under the content. Login keeps its bottom buttons by choice.
  - Card lists used 8, 16 and 24 between cards. Now 16 everywhere (Jobs, Referral requests suggested list, Your referrals, loading skeletons). Your referrals also had its "All referrals" heading 8 under the card above; sections now 24 apart, label → content 8.
  - Experience rows: dates took the right side and squeezed titles into 2–3 lines ("Product / Designer"). New Company Row variant Layout=Stacked (title, company, dates on their own lines, like LinkedIn); V6 uses it, V2–V5 keep Side. The Freelance row on "Not enough to judge" was hand-built; now the same component with a new AvatarPlaceholder Type=No Logo (grey tile + briefcase), since an empty grey square read as a broken image.
  - ProjectRow skill tags laid out 360 wide inside a 294–326 row (stale width, hidden by clipping). Refitted on 10 copies.
  - "You both" dates line was 20px wider than the card and 2px off the label above. Now fills the card and lines up exactly (14 icon slot + spacing/xs, same as the tag).
  - Referrer home (Referral requests + 6 states) had a link icon where every other tab screen has the bell, so referrers couldn't reach Notifications from home. Now the bell; the link stays in Profile → Your links to share.
  - Referrer Notifications highlighted the Referrals tab; now Requests (home), like the candidate side (Jobs).
  - Candidate Profile had no Settings row (referrer did). Added.
  - Edit profile: "Your role" used the person icon like "Your name" (briefcase on Confirm where you work); "Where you work from" had a search icon and ✕ the same field doesn't have elsewhere; field gap 12 vs 20 on the other form. All matched.
  - Couldn't send, No requests left, Sending: the details box lacked the 4 portal details, but sending needs them. Added (same order as the link page).
  - Login (UI copy) had lost its bottom-anchored buttons in an earlier pass; restored to match the prototype.
Kept on purpose: the Undo toast covers the line under the buttons for 5 seconds (iOS toast over content); dashed upload areas keep a fixed height across states; the "2" badge on the Messages tab.
Final: 0 on every check, both pages; all 70 prototype copies match their UI twins.

CHANGE · 2026-09-19 · Experience dates back on the right; "Both worked at" matches the details row · Source: Devansh ("didn't we have duration on the right?", "Both worked at … looks alien … and smaller")
Dates: I had moved them under the company because titles broke into 2–3 lines inside the old inner boxes. With the card flat, the row is 32px wider, so the dates go back on the right (V2 layout). "Associate Product Designer" wraps to 2 lines, as in V2. The Stacked variant is removed (unused).
"Both worked at MakeMyTrip" on Referral request (3 screens + prototype): was the Plain tag (12/500, 14px logo) right above the details row (Bengaluru · 3+ years · 30 days: 14/500, 18px icons, 4 gap). Now uses that exact row style. The years line stays 12/500 (same as the company and date lines in experience rows), lined up under the text.
Kept: on Jobs cards the Plain tag stays 12, matching the card's other small line ("₹28–40 LPA · Nithin refers").
Rule: a meta line takes the style of the lines next to it. 14 + 18px icon in detail headers, 12 + 14px icon in list cards.

FIX · 2026-09-19 · Inline logo size on "Both worked at" · Source: Devansh ("some alignment issue with the icon and text")
Both rows were centred the same way (icon y=1 in a 20 line). The problem was optical: the pin is a thin glyph inside its 18 box, the logo is a solid 18 tile, so it looked bigger and sat above the letters. Logo now 16, which lines up with the letters; the years line still starts under the text.
Why not 40 like the experience logos: those are the row's picture (same role as the 40–44 person photos). An inline logo is an icon next to text, so it follows the text size: 14 next to 12 text on Jobs cards, 16 next to 14 text here.

CHANGE · 2026-09-19 · Buttons pinned to the bottom · Source: Devansh ("empty space between buttons and content is better with buttons fixed at the bottom at a position")
Replaces my earlier rule "action block 24 under the content". Now:
  - Short screens: the action block sits at a fixed spot, 40 above the screen bottom (no tab bar) or 24 above the tab bar. Spare space goes between content and buttons, at least 24. 15 screens: Add the job, Upload your resume (+ both error states), Your job is live, Edit profile, Link page Sent and Before upload, Marked as submitted, Track details 3/4/5, Not moving forward, On hold, Role closed.
  - Long (scrolling) screens: buttons follow the content and the page ends 40 below them (was 32 or 64). 9 screens: Verify (+2 states), Post a job, Check your details (+Reading), Edit job post, Edit your details, Link page Details filled.
  - Not moved, on purpose: empty-state buttons stay with their message (the button is the answer to the message); Log out stays at the end of the Profile list (iOS settings pattern); buttons inside the Job and Referral request cards stay in the card.
UI and prototype.

CHANGE · 2026-09-19 · Filled link icon · Source: Devansh ("make the link icon filled in referrer profile")
New icon link-fill (Icons frame, next to link): two chain links, 20 in a 24 box, color/icon/secondary, scales with its box. "Your links to share" now uses it, so all five Profile rows use filled icons.

DECISION · 2026-09-19 · S5: a candidate with no resume taps Ask · Source: Devansh ("design what is the best what a sr product designer would do")
Decided:  Ask with no resume opens a sheet, "Add your resume to ask Nithin": "Flipkart's portal asks for it. We fill in your details from it, and you check them before anything is sent." The same upload block as onboarding (Upload file / Paste link), "Saved for your next requests too", and "Not now". After upload the candidate lands on Check your referral request with details filled.
Rejected: (a) letting them send without a resume: the referrer's portal needs the file, so the request would arrive incomplete, which breaks J3 (a request a stranger can act on in minutes). (b) Sending them back to onboarding: loses the job they chose and feels like a punishment. (c) Hiding Ask until a resume exists: they can't tell why they can't ask.
Because:  asking at the moment of intent, in context, costs one step and keeps their place; the "Skip for now" path now ends somewhere.
Also:     the Job screen in this state shows "Add resume to see match" (neutral), the same as the Jobs list.
Built:    Candidate/Job Screen/Skipped Resume and Candidate/Add Resume To Ask Sheet (States flow + prototype: Jobs/Skipped → Job → Ask → sheet; Upload file → Check your referral request; Not now closes).
How sure: worked it out.

DECISION · 2026-09-19 · S9: asking the same person twice from the app · Source: Devansh ("S9 - OK")
Built: Candidate/Job Screen/Already Asked. The Ask button becomes "View your request" (goes to Your referral requests), with the hint "You asked Nithin today. One request per job." 12 under it. Same rule as the link page's "Already asked".
Component: the Job card got a hidden "Hint" line under its buttons (Show hint off by default), in a vertical group so the Skip/Request row keeps its layout. The row's gap is now bound to spacing/component/gap/md (12, same as the Candidate card). I had bound it to spacing/md while adding the hint; the sibling variant uses 12 too, so the value most likely didn't change.

FIX · 2026-09-19 · Prototype: referrer home bell opened the share sheet
When the header icon on referrer home became the bell, its old tap action (open "Share your link") stayed. All 10 bell/header hotspots on the 5 referrer-home prototype screens now go to Notifications. Profile → "Your links to share" now opens the share sheet.
Also: Not enough to judge fell to 834 tall after flattening its card; back to 844.
Final: 0 on every check; all 74 prototype frames match their UI twins.

FIX · 2026-09-19 · Hints under the wrong button · Source: Devansh ("why are we writing 'Add job ID' here at the bottom")
"Add the job ID to post." explains why Post job is off, but sat under Save as draft, so it read as if it belonged to the draft button. Same on After refer (+ Undo): "Tap once it's in the portal. Abhinav will be told." explains Mark as submitted but sat under Message Abhinav. Both moved above their button pair, 12 above the primary (note-above-a-button rule). Single-button hints ("Add the 4 details above to send.") stay below. Rule written in DESIGN_LANGUAGE.md.
Knock-on: on After refer/Undo the toast then covered half of Message Abhinav. Added a 48 "Toast space" slot at the end of the content (the toast's height), card section bottom 16, toast 16 above the tab bar. Buttons now end 24 above the toast.
UI and prototype.

FIX · 2026-09-19 · "Fill in myself" and "Skip for now" looked the same · Source: Devansh ("is this the correct way to represent these two things?")
No. They are different kinds of action: "Fill in myself" is another way to finish the step (a real choice); "Skip for now" leaves the step (least important). Now three levels: Next (primary) → Fill in myself (secondary button, 12 under, stacked pair rule) → Skip for now (blue text link, 16 under). Same on Add the job, where "Fill in myself" was also a bare link.
Screens: Upload your resume (+ Couldn't read file), Add the job (+ Couldn't read link). UI and prototype.
Rule: another way to finish a step is a secondary button; leaving or postponing it is a text link.

CHANGE · 2026-09-19 · Consistency sweep by element type · Source: Devansh ("check anything that is in multiple screens … I don't want the same thing to look different"; "no consistency in these message positions … Can't you check everything screen by screen?")
Method this time: inventory every instance of each repeated element on all 85 V6 screens (and the 73 prototype copies), set one rule per element, fix every break, then look at every screen.
Messages (notes, info tags, errors, hints), 94 found:
  - Rule: left-aligned to the content edge; above the buttons they explain, 12 apart. Only text links (Skip, Not now, Share later, Resend code, Log in, Keep waiting) stay centred under buttons.
  - Fixed: 9 centred messages ("2 of 5 requests left", "Add the 4 details…", "Couldn't send", "No requests left", "Sent to Nithin", "Updated. Aviral can see it.", "Add the job ID to post.", "Tap once it's in the portal…", Job card hint); 5 below their button ("Add the 4 details…", "Fix the date…", "Paste it in the LinkedIn or WhatsApp chat" ×2, Job card hint); Verify's "We never contact your company or HR" moved from the end of the form to 12 above Verify; sheet note → button 8 → 12; "This post is paused" → its line 4 → 8; empty-state message → button 16 → 12; empty-state and paused-post text centred → left; resume sheet body centred → left (other sheets: title centred, body left); Your referrals top padding 8 removed so sections are 24 apart.
  - Checked, kept: link page URL chip is centred as part of the centred page title; "Couldn't load" uses the same Tag component everywhere (two layer names only).
Same thing, different look:
  - "4 of 7 skills match" grey in the Not moving forward sheet, blue elsewhere → blue.
  - "Submitted" grey on Your referrals, green elsewhere → green.
  - "Update" primary in Waiting, secondary in All referrals (two primaries on one screen) → secondary everywhere.
  - "Not now" a button in the resume sheet, a text link on the link page → text link.
  - Marked as submitted had two secondary buttons, no primary → "Back to referral requests" primary first, "Message Abhinav" secondary.
  - Edit profile used a title bar and no page title; the other two edit screens use the logo bar + page title → "Edit your profile" / "Candidates see your name, role and company." (A bell also appeared on it; header replaced with the Edit job post one.)
  - Page title → content 32 on 7 screens, 24 on 17 → 24.
  - Placeholders: 21 used color/border/default (#D1D3D8, ~1.4:1, a border token on text), the note field used color/text/disabled (#9CA3AF) → all text/disabled, in InputField and ChatComposer. Visible on V2–V5 too (slightly darker placeholders).
  - Job card hint: "One request per job." vs link page "One request per job, per referrer." → both say "per referrer" (the rule is per referrer).
  - Checked, same: timeline "done" blue and How-they-match blue use two token names with the same value (#2563EB); no visible difference.
Slip caught during the pass: my text-link fix also changed the label layout inside 9 buttons whose label read "Fill in myself" / "Not now"; restored to the component's own settings.
Final: 0 on every check, 0 messages below a button, all 73 prototype frames match their UI twins.

CHANGE · 2026-09-19 · Apple guidelines pass (HIG + App Store rules; accessibility out of scope) · Source: Devansh ("check if all the UI screens follow proper Apple guidelines" → "fix all of them properly; for the second use the page name in bold instead of SideDoor")
V2–V5 keep their look: every shared component got a new variant; only V6 was switched.
  1. Sign in with Apple (App Store 4.8: third-party login needs an equivalent privacy login). New Button Type=Apple (black, white Apple logo), Logo/Apple, tokens color/social/apple/bg + fg (black/white, flipped in Dark), primitive color/palette/black. First on Login, same size as the others. Labels now all "Sign in with …" (LinkedIn said "Continue with").
  2+3. Top bar: new AppHeader Type=Nav, 44pt (iOS standard; was 76), bold page name centred, back chevron, 60pt slots both sides so the title stays centred, optional "+" (Show add). All V6 screens use it except the link pages, which are web pages for people without the app, so they keep the SideDoor logo. Page names: Choose your role, Where you work, Add a job, Check your job post, Your resume, Check your details, Job posted, Job details, Check your request, Referral request, Edit your job post/details/profile; tab screens keep theirs. Where the old in-page title repeated the page name it was removed; its subtitle stays as the first line (left). "Nithin suggests you for this job" stays (a message, not a title).
  4. Selected tab: label now blue with the icon (color/primary). Referrer Messages (opened from Profile) had no tab selected; Profile now is.
  5. Switch: new Size=iOS variants, 51×31 (was 36×20). Also fixed inside PostCard, where the old size was held by the card.
  6. All / Waiting / In progress / Closed: new SegmentedControl (grey track, white selected segment with elevation-1, equal widths, 32pt), 16 above the list.
  7. Messages search: search icon on (was off); placeholder kept, it says what you can search.
  8. Manage posts: floating round "+" (Android pattern) removed; "+" in the top bar next to the bell; prototype link moved with it.
  9. Date of birth: field reads "Select date" and opens a new iOS wheel picker sheet (Candidate/Date Of Birth Sheet, Done). The typed-date error state ("February has no 31st") can't happen any more and was removed (UI and prototype).
  10. Log out: red label (color/text/error) and a new iOS action sheet (Profile/Log Out Sheet): "Log out of SideDoor? …", red Log out, separate Cancel. Prototype: Log out → sheet; Cancel closes; Log out → Login.
Knock-on fixes: two Track details screens had a fixed height, so the shorter bar left a 32 gap under the tab bar; they now hug.
Not changed (listed as minor): badge colour, status bar 44 vs 47, tab bar 88 vs 83, Undo toast, Inter/Remix instead of SF Pro/SF Symbols (chosen), 14pt body (accessibility).
Final: 0 on every check, all prototype frames match their UI twins.

FIX · 2026-09-19 · Text styles in the new pieces · Source: Devansh ("you have started using different fonts in new additions")
All Inter, but the new pieces picked styles that don't match their role elsewhere:
  - Log out sheet: "Log out" used text/body/lg (its only use in the app) and "Cancel" text/heading/sm. Tappable actions everywhere use text/button/md → both button/md (red / blue).
  - Date picker: rows 14 Regular with the selected row 16 SemiBold (two sizes in one column) → all text/label/md; the selected row is shown by colour and the band.
  - Segmented control: text/heading/xs → text/label/md (same as other chip-like controls, tags).
  - Resume sheet body: text/body/md → text/label/md (other sheet bodies).
Checked by role across all V6 screens (sheet titles, sheet body, sheet actions, top bar titles, page intro lines, headline subtitles): one style per role now. Kept: the Log out sheet's message is text/label/sm grey (the hint style), matching how iOS shows an action sheet message.
Prototype matches, styles included.

CHANGE · 2026-09-19 · More Apple: Liquid Glass, SF Symbols, large titles, smooth corners, grouped look · Source: Devansh ("do 1, 2 (SF Symbols) and the first four rows of 3 together")
V6 only; V2–V5 keep their look (new components and variants; shared components changed only where the change is invisible on white, noted below).
Sources: Apple's own "iOS and iPadOS 26" Figma kit (already linked to the file) showed how Apple builds Liquid Glass (Figma's GLASS effect: refraction 1, depth 16, light 315°/0.8, splay 0.06, over a 65% white fill and a 40 blur 12% shadow) and SF Symbols (SF Pro private-use glyphs). SF Pro is installed, so symbols were rendered, checked by eye against a labelled glyph sheet, and turned into vectors.
  2. SF Symbols: 50 new icon components (SF/…, SF Pro Medium at one optical size, color/icon/secondary), in "SF Symbols (V6)" on the components page. 984 icons on V6 swapped, keeping each icon's colour. Tabs use outline when not selected and fill when selected. Kept as they were: timeline steps and radio dots (progress indicators, already iOS-like). No filled "link" exists in SF Symbols, so "Your links to share" uses square.and.arrow.up.fill.
  1. Liquid Glass on the navigation layer only (Apple's rule): new effect style effect/glass. New TabBar (V6) component (Role × Selected): floating glass capsule inset 16, selected tab on a soft pill, SF icons, label/sm; replaced the old bar on 105 screens, tab links moved over; the Messages badge now sits on the new icon and is red (color/feedback/error/fg). Top bar: back, bell and "+" are 44pt glass circles; bar has no background or shadow, it takes the page colour. Sheets (7) and the Log out action sheet groups are glass (80% white so text stays readable) with 32 corners (new radius/component/sheet). The Undo toast is a glass pill with dark text.
  3a. Large titles: new AppHeader Type=Large (glass buttons row, then the page name in text/display/lg, left). All 28 tab screens (and prototype copies) use it; inner screens keep the bold centred title.
  3b. Smooth corners: 60% corner smoothing on 3,134 rounded shapes on V6 and on the new components.
  3c. Fewer shadows: grouped screens use a new page colour color/background/grouped (#F2F2F7, iOS grouped background) with plain white cards, boxes and inputs, no shadows (1,482 shadows removed incl. leftovers inside components). Plain lists (Messages, Notifications, Chat) and Login stay white, like iOS. Neutral tags and the segmented control track now use new color/fill/tertiary (Apple's translucent tertiary fill), so they show on both grey and white; on white it looks the same as before (this one is in the shared Tag component).
  3d. Grouped lists: Profile rows are one white rounded group with hairline dividers (rows 74 → ~50pt); candidate's "Let referrers find me" switch has its own group; Log out is its own row-style group (no border, 12 corners).
Prototype: rebuilding the bar buttons dropped their links; re-linked 43 back, 19 bell, 1 "+".
Kept on purpose: list content scrolls under the glass tab bar (Jobs, Skipped resume), as in iOS 26.
Final: 0 on every check; only raw effects left are the Login illustration blurs; all prototype frames match their UI twins.

FIX · 2026-09-19 · One background, uncut shadows · Source: Devansh ("bg colors are not same … shadows on icons are getting cut")
Causes:
  - Screens were bound to color/background/grouped but the colour stored behind the token was white, and Figma sometimes draws the stored colour. So some screens showed grey and others white.
  - Plain-list screens (Login, Messages, Notifications, Chat) were white on purpose.
  - The top bar (AppHeader Nav/Large) had its own grey (surface/tertiary, #F1F1F1), different from the page (#F2F2F7), which drew a band.
  - The bar's "Header" frame clipped its contents, so the glass buttons' shadows were cut.
Fixes (V6 only, UI page and prototype):
  - All 80 V6 screens (68 prototype) use color/background/grouped (#F2F2F7), stored colour included. Chosen because it is the iOS grouped background and white cards stand out on it without shadows.
  - Top bar has no fill (takes the page colour); Header, Leading, Trailing and Large Title no longer clip. Component variants Nav/Large are V6-only.
  - Messages and Notifications lists are one white rounded group (radius/lg, 16 inside, hairline dividers, none under the last row), like Profile. Messages loading skeletons too. Search → list gap 16 (card→card). Notifications content starts 24 below the bar.
  - Chat: incoming bubbles white (ChatMessage is V6-only).
  - Illustrations with a white image background (Login, Role, doc icon) blend into the page (multiply), so no white box shows.
Checked: every token-bound colour on the UI page, prototype and components page stores its token's value (0 mismatches); prototype matches UI (68/68).

FIX · 2026-09-19 · Sheets match the page · Source: Devansh ("bg is still different in diff screens")
Cause: sheets were glass with a see-through fill (stored at 20%; the Log out groups at 10%). On the dark canvas they drew muddy grey (measured 95,98,105) next to screens at 242,242,247.
Fix (UI page and prototype, 7 sheets each): sheets are solid color/background/grouped (#F2F2F7) with no glass or shadow, like iOS form sheets. Log out action groups are solid white. Glass stays only on the tab bar, top-bar buttons and toast, which always sit over the page.
Checked by pixel: sheet, Referral requests empty and Not enough to judge all read 242,242,247.

FIX · 2026-09-19 · No shadows in sheets either · Source: Devansh ("some cards have shadow some dont which is correct?")
Answer: no shadow (Apple look rule: white cards on the grey page, no shadows). The earlier shadow removal skipped sheets.
Removed 25 leftover shadows on each page (UI and prototype), all inside the 6 sheets: person cards, reason options, buttons, quick-share tiles, doc upload box. Kept on purpose: the small shadow under the selected segment of the segmented control (iOS draws it) and glass pieces (tab bar, bar buttons, toast).
Checked: 0 non-glass shadows left on V6 except the selected segment.

AUDIT · 2026-09-19 · Full V6 sweep after the Apple look · Source: Devansh ("check all screens again for any other inconsistencies or mistakes or any improvements")
Ran: scripted checks on 87 UI frames (text cut off or overlapping, placeholder words, text without a style, radius without a token, hidden layers, raw colours, first child at y=0); an element-by-element list of every white card (radius, padding, border); and a look at every screen at 0.5×.
Clean: no cut or overlapping text (except list rows scrolling under the glass tab bar, kept on purpose), no placeholders, every text uses a style, every radius uses a token, no hidden leftovers. Raw colours are only brand logo drawings.
Fixed (UI page and prototype, parity 75/75):
  - Cards used three corner sizes (12, 16, 24) for the same thing. All white cards now use radius/component/card (12): Window ×8, Frame 327 timeline ×9, DocUpload, OnboardingCard, Job card, Options, Done, Live.
  - Job details card had 24 padding while the Referral request card had 16 → 16 (instance override, shared Job card component untouched).
  - Track details: the referrer row sat loose on the grey with a leftover divider → white card, 16 padding, no divider (9 screens).
  - Track details: company logo sat on a square white box → rounded tile, same radius as cards (9 screens).
  - Track details loading: skeleton was light grey on the grey page, almost invisible → timeline and referrer placeholders are white cards; bars on the page use color/fill/tertiary.
Open, needs a decision (asked): page-subject header in a card on some screens and flat on others; Link Page "Already asked" / "Job closed" end with no action.

DECISION · 2026-09-20 · Page header sits on the grey, not in a card · Source: Devansh ("whichever you feel is the best")
Decided: the person or company a detail screen is about sits loose on the grey page at the top; white cards hold the content below. Same as Apple's Profile/Contacts header and our Profile tab, and already how After refer, Marked as submitted, Track details and Check your request worked.
Changed: Referral request, Not enough to judge, Skill removed, Profile updated: Person row moved out of the card, 24 above it (UI and prototype).
Not changed: Job details. Its subject is the job; the poster row belongs to the job card, same as on the Jobs list.

CHANGE · 2026-09-20 · Link page dead ends get a next step · Source: Devansh (chose "Add Get the SideDoor app")
"You've already asked" and "This job is closed" ended with no action. Both now end with "Get the SideDoor app", pinned 40 above the bottom like Link Page/Sent (track the request / find other jobs). No prototype link, same as the Sent button (the store is outside the prototype).
Parity: all 6 changed screens match their prototype copies.

FIX · 2026-09-20 · Track details header, loading gaps, referrals icon · Source: Devansh ("do them", "why use network icon")
  - Track details (9 screens): the status tag sat right of the job title and squeezed it ("Sr. Product Designer" wrapped beside "Not moving forward"). The tag now sits under the title, the same as on the Your referral requests list cards.
  - Track details loading: gaps were 12; now 20 inside the top block and 24 before the referrer card, the same as the loaded screen.
  - "What your referrals reached" used chart.bar.fill, which reads as phone signal bars. New SF/flag.fill (SF Pro glyph 0x2ca, built like the other SF components) — a flag for milestones reached. Swapped on Your referrals and Your referrals/Updated.
UI page and prototype; all 14 changed screens match.

AUDIT · 2026-09-20 · Final audit: Apple guidelines, consistency, problem statement · Source: Devansh ("do a final audit …")
Apple (HIG) checks, 87 UI frames:
  - Pass: no text under 11pt; every screen has a status bar; tab roots use large titles with no back (28), inner screens a 44pt bar with back (46); bar buttons 44×44; sheets have a drag handle; one primary action per view; SF Symbols only; tab bar hidden only on onboarding, forms, chat, sheets and web pages.
  - Contrast FAIL, caused by the grey page (my 19 Sep change): secondary text #6b7280 on #f2f2f7 = 4.33, on tags #f0f0f5 = 4.26. Old status colours also failed: green #22c55e on #ecfdf5 = 2.16, amber #f59e0b on #fffbeb = 2.07, blue on its tint 4.49, red #ef4444 on white 3.76.
    Fix (V6 only, V2–V5 keep their tokens): new color/palette/neutral/700 #636a75 and semantic color/text/secondaryAA (4.80 on tags), successAA → success/700 (4.76), warningAA → warning/800 (4.84), errorAA → error/700 (6.47), infoAA → brand/blue/700 on tinted tags (6.55). Dark mode keeps the old values. Rebound 841 text and status colours on UI, 815 on prototype. Switch tracks kept iOS green (not text, knob shows state).
  - Accepted, not changed: placeholders #9ca3af (2.54, Apple's placeholder is lighter too); disabled buttons (exempt); faded date-wheel rows (iOS); 28pt "Update" / "Mark it" buttons (Apple's small control size; hit area in code must be 44).
Consistency fixes (UI and prototype):
  - Page top gap: Job details (Suggested) 32 → 24 like the other Job screens; Job posted 32 → 24 (not a form); Profile 4 → 24 like other tab screens. Forms keep 32 (DESIGN_LANGUAGE).
  - Job card: button now 24 below content (was 32; Referral request uses 24) and the card ends 16 below the button (was 36); "You asked Nithin today" hint 28 → 12 above its button. First try set 16 on screens without the hint; caught and fixed in the same pass.
  - Share your link sheet: message box was grey on the grey sheet → white like every other box.
Checked after: contrast 0 failures outside the accepted list; spacing by role; 75/75 prototype frames match UI incl. colours; looked at every screen.
Problem statement: COVERAGE.md re-checked against today's screens; J1, J2, J3, the 7-step main path and all 7 AX failure states still have screens. Unchanged honest limit: research was 2 people; the kill conditions in SCOPE.md are untested.

FIX · 2026-09-20 · The accepted contrast and tap-size cases, fixed too · Source: Devansh ("do these also", "this also")
  - Placeholders: #9ca3af on white (2.54) → new color/text/placeholderAA = neutral/600 #6b7280 (4.83). Typed values stay text/primary #3b3f46, so the two still look different. 22 UI / 21 prototype.
  - Disabled buttons: #9ca3af on #d1d3d8 (1.70) → new color/action/bg/disabledAA (neutral/150 #e6e7eb) and color/action/fg/disabledAA (neutral/650 #5f6671) = 4.69. Still reads as off: flat grey, no brand colour. 8 UI / 7 prototype.
  - Date picker: faded wheel rows #9ca3af on #f2f2f7 (2.28) → color/text/secondaryAA (about 5.0). The selected row keeps its band and dark text.
  - "Update" and "Mark it": 28pt → 44pt tall (Apple's minimum tap size), padding only. 8 on each page.
Checked: contrast 0 failures (only the badge numbers flag, a false alarm: the check misses the dot behind them; real 5.17 blue / 6.47 red); no button under 44pt; 75/75 prototype frames match UI incl. colours and button sizes.
Dark mode for all new AA tokens keeps the old dark values.

AUDIT · 2026-09-20 · Final sanity and polish · Source: Devansh ("do a final sanity & polish")
Scripted, 87 UI frames: no placeholder words, double spaces or straight quotes; every text has a style and a colour token; no old failing text colours left; every SF icon scales with its box; shadows only on glass pieces (back, bell, +, tab bar) and the selected segment; empty frames are only the named 44pt hit areas and spacers. Flagged but fine: list rows past the screen bottom (scroll), overlapping salary-source logos (clipped on purpose), PhonePe logo art.
Polish fixed (UI and prototype):
  - Time stamps ("Today", "Thursday", "12 days") used arrow.clockwise, which reads as "reload" in iOS, and the Job card used clock.fill for the same thing. New SF/clock (glyph 0x42b); 65 swapped on each page. clock.fill stays for status (timeline "Sent/On hold", "Waiting on an update").
  - Verified tick size now equals the name's text size everywhere (14 / 16 / 20). Messages had 19 and Track details referrer card 18 next to 16pt names (22 fixed on each page).
  - "Drop your" + "resume" were two texts with a trailing space plus a 4 gap (double gap); trailing space removed (7 UI / 6 prototype).
Checked: label → icon inventory (one icon per meaning), looked at the changed screens, 75/75 prototype frames match UI incl. icon names and sizes.

FIX · 2026-09-20 · Small buttons: compact look, 44pt tap area · Source: Devansh ("you changed these buttons, but in a lot of places, these are not updated … doesn't look symmetric and consistent")
What was wrong:
  - Making "Update" and "Mark it" 44pt tall (earlier today) made them boxy and pushed "Update" below its row's rhythm. That was the wrong fix: Apple keeps small controls small and makes the tap area 44pt.
  - The small 28pt buttons still seen are V3, V4 and V5 (Update Flow, Tracking Flow on the UI page). Those are history and are never changed (rule). Every V6 copy had been changed.
Fix (V6, UI and prototype):
  - New Button variant Type=Secondary Small (V2–V5 untouched): same border, radius and text style as Secondary, 4/12 padding (28pt with the label, Apple's small size), no shadow, and an invisible "Hit area 44" frame (the same pattern the file already uses for rows).
  - 8 buttons swapped on each page ("Update" ×7, "Mark it" ×1); the prototype link on "Update" kept.
  - Your referrals rows: the time now lines up with the name and "Update" is centred on the status tag (it sat 5–14 lower before).
Checked: all three affected screens match between UI and prototype; looked at them.

FIX · 2026-09-20 · Section counts go in the title · Source: Devansh ("1 hanging alone at right? is it correct everywhere")
Inventory of every count on V6: section and group counts sit in the title ("Skills (7)", "Lower match (2)", "Flipkart · 4 posts"); unread counts are blue dots at the row's right (iOS). "Waiting on an update" was the only one with a lone amber tag at the far right.
Fix: "Waiting on an update (2)" / "(1)" in the label, the tag turned off (Section Label's Show tag). The line under it already says why it needs attention. Your referrals and Your referrals / Updated, UI page and prototype.
Rule added to DESIGN_LANGUAGE: section counts in brackets in the title.

AUDIT · 2026-09-20 · Patterns iOS users don't know · Source: Devansh ("check all the screens for such things … which is weird and not normally done in iOS apps … I don't want to deviate from the UI which users already know")
Changed to the iOS pattern (V6, UI page and prototype, 75/75 match):
  1. Single choice used radio circles (Android/web). RadioOption (V6-only component) is now an iOS list row: label left, blue SF checkmark right when chosen, 44pt+, hairline divider, none under the last row; label stays dark. Not moving forward reasons, Seen it move stages (3 sheets).
  2. Sort was a grey tag "Newest first". Now an iOS pull-down button: "Newest first" in link blue + SF chevron.up.chevron.down, 44pt hit area (Jobs, Jobs / Skipped resume).
  3. Help text sat in grey pills with an ⓘ (34). iOS writes it as a plain footnote. Neutral notes: no pill, no icon, text/label/sm like the other hint lines. Error / success / paused messages: no pill, icon kept so meaning is not colour alone. Salary chip untouched (it is a tag, not help).
  4. Pencil icons for edit. iOS uses the word "Edit" in link blue. Section Label (V6-only) now shows "Edit" (text/label/md, like "Replace"); Profile name row "Edit", centred. Kept: the pencil badge on the Edit profile photo (iOS marks photos to edit too).
New SF components: checkmark (0x185), chevron.up.chevron.down (0x18f).
Kept, because iOS apps commonly do them: icons before section titles (Apple Health, Weather), coloured status tags, progress timeline, trailing copy buttons, undo bar (Mail), wheel date picker with Done, stacked buttons at the bottom of confirm sheets (action sheets).
Open, asked Devansh: the unlabelled overlapping logos next to the salary on Job details.
DECISION · 2026-09-20 · Salary source logos on Job details kept as they are · Source: Devansh (chose "Keep as is").
FIX CHECK · 2026-09-20 · Devansh saw the old grey "Newest first" tag drawn under the new sort button (Jobs, Jobs / Skipped resume). Checked: no second "Newest first" layer exists on UI or prototype; the section title's tag is off; Figma's renderer draws both screens clean (UI and prototype). Could not reproduce, so the cause is not confirmed; possibly a view that had not refreshed.

DECISION · 2026-09-20 · Login button order
Decided:   Sign-in order is LinkedIn, Google, Apple (Apple last). "Already have an account? Log in" sits 12 under the last button (was 16). Applied to the UI login screen (5247:18389) and its prototype copy (5291:24151); both checked by screenshot.
Because:   Devansh asked for Apple at the bottom and the line closer to the buttons. LinkedIn is the main path (profile data for matching). Apple's rule is that Sign in with Apple is offered and is as easy to see as the others; the same size and style still meets that.
Note:      The 12 gap is only for this line on the login screen. "Text action below a button" (Skip, Not now) stays 16. V2–V5 login copies are left unchanged on purpose.

DECISION · 2026-09-20 · Login button gap
Decided:   Gap between the three sign-in buttons 12 → 8, on the UI login screen and its prototype copy (checked by screenshot). Stack is 172 tall (was 180). "Log in" line stays 12 below, so it still reads as separate from the buttons.
Because:   Devansh: the buttons felt chunky and took too much space. Three sign-in choices are one group, and 8 keeps them together. Button height (52) is unchanged so it matches every other full-width button in V6.
Note:      This is a login-only exception to "Button → button 12". V2–V5 copies unchanged on purpose.

FIX · 2026-09-20 · Logo tiles padding
Found:     The white 68×68 company logo box in the Track details header had 0 padding; wordmarks (Zepto, Google, Meta…) touched both sides. Devansh caught it.
Checked by type: every Logo/* inside a filled box on V6. 9 Track details headers had 0 padding. Share sheet app tiles already had 10–14. List cards (ReferralBar) have no box of their own, so nothing touches an edge there.
Fixed:     All 9 tiles get 10 padding on every side; logo 48 wide, height kept to its shape. UI page and 9 prototype copies. Checked by screenshot (Zepto, Google, Meta).
Not done:  ReferralBar logos left at 68 wide. Tried padding one and it only made the logo look small on a white card. That variant is also used by V3–V5, so it was not edited.

FIX · 2026-09-20 · Logo box matches the text beside it
Found:     Track details header: logo box 68 tall, text block beside it (name, role, tag) 74 tall. Devansh: it should be the same height.
Fixed:     All 9 boxes 74×74, still 10 padding, logo 54 wide with its shape kept. UI page and 9 prototype copies. Row stays 74; text column 278 → 272, every line still on one line. Checked by screenshot (Meta, PhonePe).

FIX · 2026-09-20 · Warning icons too dark
Found:     On hold timeline circle and line looked brown. They used color/text/warningAA (#B45309), the colour picked so small text passes 4.5:1. Icons and lines only need 3:1. Devansh: "isnt it too dark".
Fixed:     New tokens color/palette/warning/600 #D97706 and color/icon/warning (light → 600, dark → 500; scopes shape fill and stroke). #D97706 on white = 3.2:1, passes 3:1 for shapes. #F59E0B was not used: 2.1:1 fails. Rebound every non-text use of warningAA in V6: 3 clock icons, 3 timeline lines, 1 tag dot, 1 note icon. 8 on the UI page, 8 in the prototype. Checked by screenshot (On hold).
Kept:      "On hold" text stays #B45309 (4.5:1 needed for text).

FIX · 2026-09-20 · One warning colour for text and icons
Found:     After the last fix, the On hold icon (#D97706) and its text (#B45309) were two different oranges. Devansh: "text and icons of diff colors?" Same thing must look the same.
Fixed:     One colour for both: #C93400, Apple's own high-contrast orange. Contrast: white 5.3, tag bg 5.1, grey page 4.7, so it passes 4.5:1 for text everywhere. New color/palette/warning/700; color/text/warningAA and color/icon/warning (light) both point to it; dark mode unchanged. Refreshed the stored colour on 23 paints on the UI page and 23 in the prototype (15 text, 5 icons, 3 lines). Removed color/palette/warning/600, now unused. Checked by screenshot (On hold).
Watch:     #C93400 sits closer to red than the old amber. It is still clearly apart from error #B91C1C; worth a look next to a "Not selected" screen.

FIX · 2026-09-20 · Last pencils replaced by "Edit"
Found:     Manage your posts cards still had a pencil icon, though section headers already use "Edit" text (iOS patterns pass). Devansh caught it. A sweep of V6 found one more: a pencil badge on the Edit profile photo.
Fixed:     PostCard (V6-only component, Live and Paused variants): pencil → "Edit", text/label/md, color/text/link, right end of the activity row. Edit profile: pencil badge removed; "Edit" under the photo, 8 below, centred, same style (as in iOS Contacts). UI page and prototype; screenshots match. 0 pencil icons left in V6.
Note:      The cloned "Edit" text got stuck outside the row (Figma layout would not update); rebuilt as a new text node.

DECISION · 2026-09-20 · Underline "Log in"
Decided:   "Log in" in "Already have an account? Log in" is underlined, on the UI login screen and its prototype copy. Checked by screenshot.
Because:   Devansh asked. It is a link inside a sentence, so the underline also means it no longer relies on colour alone.
Checked:   Swept V6 for other link-coloured words inside a sentence: only "5 new" and "1 still open" on Manage posts, which are blue counts, not links, so left as is.

---

## 2026-09-20 · the V6 screens as a working app

**DECISION · Build the prototype in code, not in Figma's prototype mode**
Decided: every V6 screen rebuilt as a React app at iPhone 17 size (402 × 874pt), at
`/work/sidedoor/prototype`. Rejected: Figma's own prototype links, and a click-through of
exported images.
Because: the thing V6 has to prove is that an answer reaches the candidate without extra work
from the referrer. A click-through can only show that as two unrelated screens. In code both
sides read one store, so the request the candidate sends **is** the object the referrer acts on.
How sure: saw it — sent as Abhinav, referred and marked submitted as Nithin, switched back and
watched the same request read Submitted with the timeline moved.

**DECISION · One shared store, and "Switch role" as the way between the sides**
Decided: Profile → Switch role flips candidate/referrer on the same data.
Rejected: two separate prototypes.
Because: the handover is the product. Splitting it hides the only part worth testing.

**DECISION · Tokens read out of Figma, not retyped**
Decided: the colours, type styles, radii and shadows in `components/sidedoor/app.css` are exported
from the file's variables; all 49 SF Symbols are the library's own vectors; logos and
illustrations are exported PNGs.
Because: "same type of thing looks exactly the same" only holds if there is one source.

**FIX · Every text style was silently not applying**
Found: the type classes were written `font: 500 12px/16px inherit`. `inherit` is not a valid
family token, so the whole shorthand was dropped and every string rendered at the browser default
(16/400). Card text was wrapping and nothing matched the screens.
Fixed: longhand `font-weight` / `font-size` / `line-height` in all 38 places.
How sure: saw it — measured the computed style before and after.

**FIX · The back gesture never finished**
Found: dragging from the left edge moved the screen but releasing did nothing, because the
release handler read the drag distance from a closure React had not re-rendered yet.
Fixed: the distance lives in a ref; the pointer is captured on the edge strip so the click that
ends the gesture cannot land on a row underneath.
How sure: saw it — a long swipe pops, a short one springs back.

**FIX · The match list did not match V6**
Found: the tag counted 8 rows ("5 of 8 skills") because it included the experience row, and
missing skills used a red cross.
Fixed: the tag counts skills only ("4 of 7 skills · 3 yrs"), matched rows use the filled blue
step and missing ones the empty circle, as in the Figma components. Red stays for errors.

**FIX · The company logo in a 44 list tile was invisible**
Found: the V6 logos are wordmarks; forced to a fixed width in a 44 box they rendered ~8px tall.
Fixed: the tile fits the logo inside its padding instead, and the job list uses the square brand
mark where the library has one.

**DECISION · A state switcher beside the phone, not inside the app**
Decided: the page lists all 38 states (`components/sidedoor/scenarios.ts`) and puts the app into
each one. Rejected: a debug menu inside the app.
Because: the app must stay the app. The switcher only sets the store the way the app itself would
and navigates; every state is the screen's own code path, and all of them are reachable by
tapping as well.

**Not built, said plainly:** the prototype is one candidate (Abhinav) and one referrer (Nithin) on
one job. Other people in the lists are fixed data. Nothing is stored between reloads, and nothing
here has been in front of a real user yet — that is still `molades-test`.

FIX · 2026-09-20 · prototype · Login did not match V6
Found:  `.sd button { font: inherit }` in app.css. Specificity (0,1,1) beat every
        `.sd-btn` rule (0,1,0), so every button in the app lost its font-weight and
        line-height to the inherited body values. Buttons rendered 400 weight at
        1.6 line-height and 53.6px tall instead of 500 at 24px and 52px tall.
        This was app-wide, not just Login.
Fixed:  the reset is now `:where(.sd) button`, specificity zero, so a class always wins.

FIX · 2026-09-20 · prototype · Login assets and background
- Screen fill was #fff. Figma's Login is #f2f2f7. Corrected.
- Wordmark was a 132x24 PNG. In Figma it is a vector, so the prototype now uses the
  same SVG Figma draws.
- Mark PNG was exported at 64x83 (1x, and the wrong aspect against Figma's 54x69).
  Re-exported at 4x, 216x276.
- Splash PNG was 320x360; re-exported at 4x, 908x1024.
- Icons inside buttons are now given explicit sizes rather than letting the file's
  aspect decide.

DECISION · 2026-09-20 · prototype · content column left at 306, not 294
Decided:  keep the 48px side gutters from V6.
Because:  V6 Login is drawn at 390x844 (iPhone 14). The prototype phone is an
          iPhone 17 at 402x874. Holding the gutters gives a 306 column instead of
          Figma's 294. iOS grows the content, not the margins, so this is the
          right way round — but it is a real 12px difference and it is not a bug.
How sure: saw it (measured both).

DECISION · 2026-09-20 · prototype · iPhone 17, and the design flexes to it
Decided:  keep the prototype at 402x874 with the real 54pt iOS status bar.
Rejected: shrinking the app to 390x844 so it would overlay the Figma frames exactly.
Because:  Devansh: "Designs in figma shud be responsive right? how does it matter
          what phone we have?" He is right. V6 happens to be drawn on a 390x844
          artboard, but the layout is auto-layout with FILL children, so the correct
          behaviour on a larger phone is a wider content column, not a scaled copy
          of the artboard. The measured differences are content growing, not
          drifting: side gutters still 48, column 306 instead of 294, everything
          10px lower because the real status bar is 54 not 44.
So:       "pixel perfect" here means every colour, type style, radius, asset and
          component size matches the Figma node values exactly. It does not mean
          the screen overlays a 390-wide artboard.
How sure: saw it (measured every element on Login against its Figma node).

DECISION · 2026-09-20 · prototype page · one fixed screen, list left, phone right
Decided:  the prototype page fills the window and never scrolls. The state list sits
          on the left in as many columns as fit (CSS `columns: 230px`), the phone on
          the right, and the site's floating dock is hidden on this page.
Because:  Devansh: "make the prtottype page fixed not scrollable... nothing shud
          overflow page". A tool you are driving should not move under you, and the
          dock was sitting on top of the phone.
How:      - html/body get `overflow: hidden` only on this page, via `:has(.proto-page)`.
          - The phone size steps by window height in media queries. The `n` prop was
            removed from the Viewer: an inline style beat every stylesheet rule, so
            the phone stayed 430 wide whatever the window did.
          - The "How to walk it" notes are gone; the one line that mattered (the
            482013 code) moved into the header.
          - Below 760px wide it goes back to an ordinary scrolling page, stacked.
Checked:  1440x900 and 1280x720 — all 38 states on screen, no page scroll, no panel
          scroll, phone fully inside the window.

FIX · 2026-09-20 · dev server served stale CSS
Symptom:  edits to app/globals.css did not reach the browser. The CSS chunk kept the
          same hash across restarts, so the page kept the old layout and I nearly
          chased a bug that was not there.
Cause:    a next-server process survived the preview stop and held port 3000, and
          .next/static was never invalidated.
Fix:      kill whatever holds the port, `rm -rf .next`, restart. Worth knowing before
          trusting what the browser shows.

DECISION · 2026-09-20 · prototype page layout
Decided:   The state list is a fixed slab on the left (clamp(520px, 48vw, 700px)) with exactly
           three columns, so the seven groups balance downward and fill the height. The phone
           takes the remaining width and centres in it, sized to leave ~24px above and below.
Rejected:  Auto-fitting columns (`columns: 230px`) at full height — on a wide window it made
           five columns, spread every group across one shallow row and left the bottom half
           of the page empty.
Because:   Devansh asked for the last two groups to drop into the empty space and the phone to
           sit in the middle of what is left, as large as the height allows.
How sure:  saw it — 1600x1101, 1440x900 and 1280x720, no page or panel scroll at any of them.

FIX · 2026-09-20 · three columns hid two groups on short windows
Found:     At 1280x720 "Rules and limits" and "Sheets" vanished. A multi-column box that cannot
           fit its content in the given column count overflows in the INLINE direction, and
           `overflow-y: auto` cannot reach that — the groups were there, just off the side.
Fix:       Below 880px window height the list goes back to auto-fitting as many columns as fit
           (`columns: 185px`, then 170px below 840px), and the phone returns to the right edge.

FIX · 2026-09-20 · the whole app carried letter-spacing that Figma does not have
Found:     Every text node in all 11 V6 flows has letter-spacing 0 (censused: 1,802 nodes, the
           only exception being the SF Pro status-bar clock at -4%). The prototype rendered
           every string at -0.32px, inherited from the portfolio's `body { letter-spacing:
           -0.02em }`, plus invented -0.4/-0.3/-0.2px on the three heading classes.
Fix:       `.sd` resets letter-spacing to normal and the heading rules no longer set it. The
           clock is now -0.68px (Figma's -4% of 17px), not -0.4px.
Note:      `body { line-height: 1.6 }` was leaking in the same way; `.sd` now sets 14/20,
           which is Figma's text/body/md.

FIX · 2026-09-20 · 44pt tap areas were stretching the rows they sat in
Found:     Figma draws a "Hit area 44" as an overlapping frame, so a 20px row stays 20px. In
           code `.sd-hit44` used min-height:44px, so the Jobs header row was 44 and every
           card below it sat 24px too low.
Fix:       The target is now an ::after overlay. Jobs card 1 lands at y188, 358 wide, 152
           tall — the Figma numbers exactly.

FIX · 2026-09-20 · shared components did not match their Figma instances
Censused every Button and Tag instance across the V6 flows rather than trusting the library:
  · BottomNav capsule is solid #ffffff with effect/glass (blur 7, shadow 0 8 40 #000/0.12)
    and a #f0f1f2 pill behind the selected tab. Code had a translucent bar, a sheen gradient
    and no pill. Inactive tabs are #3b3f46, not #5f6671. Icons are 24, not 25.
  · Capsule sits 26px above the screen bottom, not 22.
  · Tag label line-height is 20, not 18; the Neutral tag's label is #636a75, not #3b3f46.
    Added the Plain variant (no fill, padding 2/0, 12/16) — it is 22 tall, and rendering it
    as a bare 16px span made every card holding one 6px short.
  · Secondary, disabled and small buttons carry a 0.5px #d1d3d8 inside stroke, not 1px.
    Small button labels are #3b3f46, not blue. The destructive button is r12, no stroke,
    #b91c1c — code had r8, a border and iOS red #ff3b30.
Note:      The Figma *style library* is stale — it still holds #22c55e/#ef4444/#f59e0b and
           text/secondary #6b7280. The screens themselves use the AA values the code already
           had (#15803d, #b91c1c, #c93400, #636a75), so the screens are the source of truth.

FIX · 2026-09-20 · the four most-used components were built wrong
Censused every instance across the V6 flows (counts are real usage, not library entries):
  · DetailField (97) — Figma stacks the label ABOVE the value, 2px apart: label Medium 12/16
    #636a75, value Medium 14/20 #3b3f46, field 38 tall, no padding. Code had them side by
    side with a fixed 104px label column and 8px vertical padding. Rewritten. Copy=On adds
    an 18px copy mark 8px to the right.
  · The card holding them is white, r8, padding 12/16, fields 12 apart, NO shadow and NO
    stroke (97 of 97). `.sd-box` was #fafafa with elevation-1.
  · MatchRow (24) — 24px mark, 12px gap, lines 2px apart, rows 20 apart inside the card.
    Matched turns its title #2563eb. Code drew an 18px hand-rolled circle at 8px gap with
    6px padding and an ink title. The marks are now Figma's own circle-check/circle paths.
  · RadioOption (14) — the options stack FLUSH inside one white r12 card, divided by a 0.5px
    #f0f1f2 hairline, title Semi Bold 14/20, and the selected one shows a 20px blue
    checkmark on the right. There is no radio circle in the design at all. Code gave each
    option its own r8 white card 8px apart with a 2px blue ring. Rewritten as RadioList +
    RadioOption and adopted in both sheets that use it.

FIX · 2026-09-20 · second component pass, all from as-used instance counts
  · InputField (44) — the box is 52 tall, padding 12/16, white, r8 and carries NO shadow;
    code had 48, 13/14 padding and elevation-1. Error state is a 1px #b91c1c stroke, not 1.5px.
  · AppHeader (79) — the header row is padded 16, not 8. The back and bell sit in a white
    44px circle with effect/glass; code drew them bare.
  · MenuRow (13) — 50 tall, 8px gap, a 1px #f0f1f2 rule under every row but the last (code
    had 44, gap 12 and a translucent rule inset 16px), chevron #6b7280 not #9ca3af.
  · SegmentedControl (3) — r8 track and segments, labels Medium 14/20 in ink on BOTH states,
    selected white with elevation-1. Code had r9/r7, 13/16 and a bold selected label.
  · Switch (9) — on #22c55e, off #9ca3af. Code used iOS green #34c759 and a translucent grey.
  · Toast (1) — a solid white pill (r9999), padding 12/16, gap 12, effect/glass. Code had
    r16, 72% white, a 24px blur and an inset highlight.
  · SkeletonCard (12) — 56px round block, then bars 140x16, 180x12, 110x20 eight apart.
    Code had a 44px block and two bars plus a stray third.
  · ChatMessage (7) — padding 8/12, radius 16 with a 4px tail corner, Regular 14/20, time 4
    below. Code had 10/14, a uniform 18px radius, 15px type and a 2px gap.

FIX · 2026-09-20 · third component pass
  · Empty states — Figma has NO icon disc and NO heading. Every "Empty" frame in V6 (4 of 4,
    plus the inline ones) is a left-aligned line of Inter Medium 14/20 #636a75 with a
    full-width primary button 12 below. Code drew a 64px grey circle, a centred 16/24 title
    and centred body text with 48px of top padding. All invented. Rewritten.
  · Timeline — the marks are 24px (filled circle-check in #2563eb when done, active-radio for
    the current step, the empty circle in #d1d3d8 ahead), 8 clear of a Semi Bold 14/20 label,
    steps 32 apart, connector 2px: solid #2563eb behind a done step, dashed 5/5 #d1d3d8
    otherwise. Code used hand-drawn 18px circles, a 12px gap, 20px spacing and a solid grey
    line throughout. The current step's label is #3b3f46, not blue — code coloured it blue.
  · ChatComposer — white with a 1px #f0f1f2 rule on top, padding 8/16/40, a standard 52px
    field and a 48px round send button with a 24px arrow. Code had a 44px pill field, a 44px
    button and a 20px arrow on the page background.
  · Company Row — 40px logo (code had 28), role Semi Bold 16/24 (code had 14/20), centred.
  · ProjectRow title is Semi Bold 16/24, not 14/20.
  · SheetPersonCard — padding 16 and a 44px avatar with the tag under the role; code had
    padding 12, a 40px avatar and the tag floated right.
  · PersonRow — the avatar is centred against the 50px row, and the verified mark sits 2 from
    the name, not 3.
  · PostCard activity line is Medium 14/20, not 12/16.
  · TextButton had the same min-height:44 bug as .sd-hit44 and stretched every row it sat in.

FIX · 2026-09-20 · every screen body started 16px too high
Censused all 87 V6 screen frames: the body section pads 24 at the top on tab and detail
screens and 32 on the onboarding and edit forms, with 16 at the sides and a 24 gap between
sections. Not one screen pads 8. The code used `paddingTop: 8` on 28 screen bodies, and
FormScreen wrote `paddingTop: 32 - 24` on the assumption Screen already added 24 — it
doesn't, so those forms were 24px short. All 28 corrected to their per-screen value and
FormScreen set to 32. Verified: Referral requests now starts its section label at y160, the
Figma number.
Also: the RequestCard shared-history line ("Both worked at MakeMyTrip") had the same Plain
tag bug as the job cards — a 16px span where Figma has a 22px tag, making every request card
126 tall instead of 132.

FIX · 2026-09-20 · sheets, action sheet, date wheel and the link page
  · Sheet grab handle is 68x6 in #d1d3d8 sitting 12 from the top with 24 clear beneath; code
    had 36x5 in translucent grey with an 8px gap. Sheet titles are centred. Sheets end 32
    below the last control, not 40.
  · Log Out action sheet — solid white groups at r32 (code had r14 and a 78% blur), message
    Medium 12/16 (code 400 13/18), rows 57 tall in Medium 16/24 (code 400 20/25), #f0f1f2
    dividers (code translucent), destructive #b91c1c (code iOS red #ff3b30).
  · Date wheel — five 36px rows, 180 tall, every row Inter Medium 14/20 with only the colour
    changing. Code had 216 tall, 21px type and a bolder selected row.
  · Link page — the header is Figma's AppHeader Type=Logo: 48 tall, padding 12/16, with the
    wordmark CENTRED between two 24px slots. Code had a 56px bar with the mark and wordmark
    left-aligned and the page URL pinned right. In Figma the URL is a centred tag at the top
    of the body, so it moved there. The wordmark now uses the SVG, not the PNG.

FIX · 2026-09-20 · DocUpload and the link page "Sent" card
  · DocUpload — Figma nests a second r12 box with a 1px #d1d3d8 stroke and its own 16 of
    padding inside the white card; the code had no inner box at all. Buttons are 44 tall,
    not 48. After upload the box keeps the same shape and shows the file name in blue with
    its type and size beneath, instead of the horizontal row with a Replace button.
  · Link page "Sent" — Figma wraps it in a white r12 card padded 24 with a 40px filled check,
    a Semi Bold 16/24 title and centred Medium 14/20 body. Code drew a hand-made 56px blue
    disc with a 20/28 title and 16/24 body on the bare page background, and pushed the body
    40 from the top instead of 24.

DECISION · 2026-09-20 · V6 Figma frames moved to iPhone 17
Decided:   All 87 V6 screen frames resized from 390 to 402 wide. Full screens went 844 -> 874;
           sheets kept their own height; every long screen now HUGS its content so it ends
           exactly where the content ends rather than at a pinned height.
Because:   Devansh wants the Figma screens and the coded prototype to be the same device, so
           the one gap I could not close in code — content 370 wide instead of 358 — closes
           from the Figma side instead.
How sure:  saw it — all 87 frames report 402 wide, none left at 390, no child overflows its
           frame. Jobs card 1 is now 16/188/370/152 in Figma, which is exactly what the code
           measures.
Note:      Safe because every V6 screen frame is a VERTICAL auto-layout and 227 of its 235
           direct children are FILL. The only fixed-width child that needed repair was the
           Toast on "Referral Request/After Refer/Undo" (358 -> 370).
Note:      Some long screens got slightly shorter (Check your details 1464 -> 1440, Referral
           request 1794 -> 1770, Share your link 548 -> 528) because wider lines wrap less.
           That is the content's true height on this device, not a loss.
RESOLVED:  Devansh chose to fork. "StatusBar (V6)" (402x54) and "AppHeader (V6)" (Nav 98,
           Logo/Title 130, Large 146) now live beside the originals, and all 79 V6 headers
           plus the Login screen's standalone bar were swapped onto them. V3, V4, V5 and the
           original flows still point at the untouched originals — checked instance by
           instance. The clock stays at y16 and the indicators at y18, which is exactly where
           the coded status bar puts them.

FIX · 2026-09-20 · two traps in the header swap
  · Type=Nav headers carried a FIXED 88 height override, so swapping in the 98pt component
    left them at 88. Set 51 header instances to HUG so they take the component's height.
  · Doing that broke the five Link Page headers the other way: Type=Logo positions its parts
    absolutely with 14pt insets, so hugging collapsed it from 130 to 102. Those five are back
    on a fixed 130.
  · "Candidate/Job Screen" was pinned at 1843 and would have clipped once its header grew;
    it now hugs, at 1853.
Verified:  87 screens, all 402 wide, 80 status bars at 54, no child overflowing its frame,
           and the Jobs card lands at 16/198/370/152 in Figma — the exact numbers the running
           prototype measures.

FIX · 2026-09-20 · the coded status bar now sits where Figma's does
Read the exact boxes off StatusBar (V6) at 402x54 and matched them: clock box starts x48/y16
(code had x34), and the indicator group runs 291 -> 375 with 8px gaps (code ended at 372 with
6px gaps). Indicator sizes corrected to Figma's: signal 20x14, wifi 20x12, battery 28x14.
Measured in the running prototype: right group 291/18/84/14, signal 291/18/20/14, wifi
319/19/20/12, battery 347/18/28/14 — identical to Figma.
Caveat:    The clock's text box measures 31.6 wide against Figma's 35 because "SF Pro Text"
           is not installed; Figma keeps the original metrics but renders a fallback too (it
           refuses to load that family). Both sides show a substitute, not the same one.

FIX · 2026-09-20 · Icon colours and sizes, caught by eye not by my own check
Found:     Devansh spotted the back chevron: blue in the prototype, dark in Figma. I had
           reported "matches exactly" after measuring only the status bar, cards and tab bar.
           The claim was wider than the check.
Method:    Censused all 1156 SF icon instances across 269 V6 screen frames, recording each
           one's resolved vector fill, rendered size and ancestor chain. Instances, not the
           style library - the library is stale (see sidedoor-figma-source-of-truth).
Evidence:  chevron.left in Back  #3b3f46 x92 - zero blue
           bell in Bell          #3b3f46 x56
           plus in Add           #3b3f46 x4
           checkmark.seal.fill   #15803d x116 - zero blue, sizes only 14/16/20
           arrow.up.right.square #6b7280 - never blue
           doc.on.doc.fill       #6b7280 - never blue
           bookmark/.fill        #6b7280 at 26px, both states
Fixed:     .sd-barbtn colour link -> text; dropped .sd-barbtn.is-back's extra width so the
           back button is the plain 44x44 circle Figma draws; all bar-button icons 22 -> 24;
           10 verified badges link -> success, and their sizes/gaps matched per context
           (profile card 20px gap4; name-and-tag rows 16px gap2, which also corrected two
           name rows from 20/28 to Figma's 16/24); three more icons link -> icon-2.
Verified:  Browser measurement - back button 44.0x44.0 design px, icon 24, rgb(59,63,70);
           badge 16x16 rgb(21,128,61) in a gap-2 row of 16/24 600. Localhost, not Vercel.
Not fixed: The Icon.tsx paths are rounded to 1 decimal. Measured error on chevron.left is
           <=0.08px against Figma's exact vector - below one pixel, so left as is rather
           than pulling ~220KB of exact path data for all 53 icons. Say so, don't hide it.
Open:      Figma has no saved-state job card, so the bookmark "on" appearance has no source
           to copy. Left filled in the same grey. Needs a decision, not a guess.

FIX · 2026-09-20 · Status bar clipping and alignment, and the tab badge
Found:     Devansh: the wifi icon is cut off, and the clock and indicators are not vertically
           centred with the Dynamic Island. Separately, the Figma tab badge does not match.
Wifi:      The arc peaked at y -0.93 inside a viewBox starting at 0, so its top was clipped.
           Rebuilt all three status icons from Figma's own vectors at Figma's offsets
           (SIM 20x14, WiFi 20x12, Battery 28x14). Measured bboxes now sit inside their
           viewBoxes, and the wifi group is 15.68x10.97 at (2.2, 0.5) against Figma's 15.7x11.
           Status icons were also #1a1a1a in code where Figma has #3b3f46.
Alignment: The island is 36 tall at y11, so its middle is y29. Clock sat at 27, indicators at
           25 - not centred on the island, and not even on each other. Figma's own StatusBar
           had the same problem (26 and 25) because it draws no island, so I moved BOTH sides:
           clock box to y19 and the indicator row to y22, giving mid 29 on each. Figma
           StatusBar (V6) Mode=Dark and Mode=Light both updated; V3-V5 untouched.
           Clock line-height 22 -> 20 to match Figma's 20-tall text box.
Badge:     Figma builds it as a SIBLING of the nav, floating clear above the capsule, not
           inside a tab: circle 17x17 #b91c1c with a 1px WHITE ring drawn outside, label
           Medium 12/16. Code had it inside the tab at 16x16, #ff3b30, 600 10px, no ring.
           Rebuilt: lands at 244.3,761.5 17x17, identical to Figma.
Verified:  Browser measurement - island/clock/all three icons all mid 29; badge exact to the
           decimal. Localhost, not Vercel. tsc clean, build passes.

FIX · 2026-09-20 · The tab badge was floating off the tab, in Figma too
Finding:   On Candidate/Messages Screen the unread badge was a loose frame parked at
           (242.8, 760) — 26px clear above the nav capsule, touching nothing. It read as a
           stray dot, not as a count on the Messages tab. Figma was the source of the
           problem; the code had been matched to it, so both were wrong together.
Method:    Censused every V6 screen for a node filled #b91c1c under 24px. One hit: frame
           "Circle" (5247:19304), a sibling of BottomNav, not a child of any tab.
Fixed:     Moved it onto the top-right corner of the Messages icon, the placement iOS uses.
           The icon is 24x24 at (234.3, 796); the badge centre now sits on its corner at
           (255.3, 799), so the visible 17x17 circle starts at (246.82, 790.52). Figma and
           app.css both changed. .sd-tab-badge is now top 0.5px, margin-left 9.05px.
Verified:  Browser measurement, converted out of the preview's 0.577 scale: badge offset
           from the tab is 45.78 across and 0.50 down, against Figma's 45.82 and 0.52.
           Residual is the render scale, not a position error.
Not done:  Only this one screen carries a badge in Figma, so there was nothing else to move.
Caveat:    Checked on localhost. The Vercel preview needs a login I will not do.

AUDIT · 2026-09-20 · Screen 1 of 103 · Candidate/Upload Your Resume Screen (5247:18502)
Method:    New rule after Devansh caught more misses: no more spot-checks. Dump every node of
           the Figma screen with resolved geometry, fills, strokes, dash patterns, radii,
           layout and type; measure every matching DOM element; diff the numbers. A screen is
           done when every diff reads 0.
Found:     9 mismatches on one screen.
           1. Drop zone border was solid. Figma: 1px #d1d3d8 dashed 7 on / 7 off, inside, r12.
           2. "resume" was blue. Figma paints both words #3b3f46 Semi Bold 14/20, 4 apart.
           3. That label was 16/24. Figma is 14/20.
           4. "Upload file" was a white secondary button. Figma: #2563eb, white label and icon.
           5. Its icon was SF square.and.arrow.down at 18. Figma: upload-2-line at 20.
           6. "Paste link" icon was 18 and the wrong shape. Figma: its own link vector at 20,
              #6b7280.
           7. Both buttons used the 52-tall 16/24 action style. Figma: 44 tall, 14/20.
           8. Auto-fill marks were a bare 16 checkmark. Figma: a 24 outline circle-check
              (Component 9, Type=Outline Style=Success) with a 20 vector in #15803d.
           9. Auto-fill labels were --sd-text. Figma: --sd-text-2. The right column's rows also
              hug their content against the right edge; a plain 1fr 1fr grid put them 54 left.
           Plus two structural ones: Frame 214 is a fixed 218 tall with its content centred,
           not a hugging box, which is what puts the doc icon at y211.45 rather than y206; and
           a trailing text button sits in a frame with 4 of top padding, so it is 16 below the
           button above it, not 12.
Fixed:     All of them. Three Figma vectors were pulled exactly and baked into Icon.tsx's
           24-unit space: checkmark.circle, upload-2-line, link.line.
Verified:  Every measured box now differs from Figma by 0.0: card, drop zone, doc icon, both
           buttons, both button icons, the format line's centre, Next, Fill in myself and the
           Skip frame. The two words measure within 0.3 of Figma, which is glyph rasterising.
Open:      The uploaded state was rebuilt from the DocUpload component rather than a screen,
           because no V6 screen shows it. Its library colour is #22c55e; I used the AA #15803d
           the screens use everywhere else. Worth a look.
Caveat:    Checked on localhost. The Vercel preview needs a login I will not do.

---

## AUDIT · 2026-09-21 · Screens 2–5 of 80 · full-file sweep begun

Devansh: "audit and fix all screens properly, U must not miss any screen." The V6
page holds 80 full screens across 11 flows. Working them in flow order with the
per-screen node diff: dump every Figma node's resolved values, measure every DOM
element out of the preview scale, diff numerically.

**Screen 2 · Role Selection (5247:18409)** — "You can change this later" was
centred; Figma runs it full width from the left. The cards hugged; Figma fixes
each at 310 so the pair fills 636. Second illustration was 114x103, Figma
109x98.48.

**Screen 3 · Login (5247:18389)** — carousel line was #3b3f46, Figma #636a75.
Three boxes hugged where Figma runs them full width.

**Screen 4 · Verify Work Email (5247:18418)** — fields 12 apart, Figma 20.

**Screen 5 · Add a job (5247:18430)** — format line hugged; doc mark took its
intrinsic height instead of 51.1.

**Screen 6 · Check your job post (5247:18441)** — rule rows r12/16-padding/4-gap
(88 tall) where Figma has r8/12-16/2 (78); switch top-aligned, Figma centres it;
rule rows 12 apart, Figma 8.

### Shared fixes these exposed, which move many screens at once

- **Input boxes were 48 tall.** Figma's InputField box is a fixed 52. The Field
  component was overriding the stylesheet inline.
- **Multiline boxes were 96.** Figma's is a fixed 100, and the textarea was 4
  rows rather than 2.
- **Sections sat 48 apart.** The stylesheet added a 24 margin between sections
  and the screens already set 24 as the column gap. Figma's is 24. Margin removed.
- **Notes were a grey chip with an info icon at 14/20.** Censused all 220 Tag
  instances in V6: no note anywhere has a fill. Notes are plain — no fill, no
  padding, a 12/16 label in a 22-tall row — and only the error and warning ones
  carry an icon. A note also hugs its text at the left of an Actions frame.
- **#6b7280 vs #636a75.** 25 uses against 650. All but three are input
  placeholders, where #6b7280 is the real role colour and the code already agreed.
  The login footer was the outlier; changed the Figma node to #636a75 so both
  sides agree and the line stays above 4.5:1. Two "Activity" rows still to check.

### Open

- The Verify screen carries a "the code is 482013" help line Figma has no node
  for. It is the only way past the screen in the prototype, and it pushes the last
  two fields 24 down. Left in, flagged.

Verified on localhost, not the Vercel preview — the preview redirects to a Vercel
login I will not sign into on Devansh's behalf.

## AUDIT · 2026-09-21 · Screens 7–13 · Onboarding done, Explore under way

**Screen 7 · Check your details (5247:18517)** — Experience and Projects rows were
separated by spacer divs, so each gap was the box's 12 plus the spacer plus another
12. Figma wraps those rows in their own 16-gap frame. The LinkedIn field carried the
generic link symbol; Figma uses the LinkedIn logo.

**Screen 8 · Job posted (5247:18561)** — the white card was missing entirely: mark,
heading and line were loose on the grey page, 8 apart, with a hand-built 44 blue
circle instead of Figma's 40 filled check-circle. The copy mark was in the section
label at 18; Figma puts it inside the box at 20. The link read blue where Figma
paints it #3b3f46.

**Screen 9 · Jobs (5247:18584)** — see the avatars note below. Everything else
already matched.

**Screen 10 · Referral requests (5247:18631)** — card role line 12/16 where Figma is
14/20 (card 128 vs 132); column gap 24 where Figma is 8; "Lower match (2)" a dark
heading where Figma has a link with a 24 chevron at the right edge, and it belongs
inside the 16-gap list; "Suggested" missing its 16 top padding; "Invite" a bordered
pill where Figma has a plain link.

**Screen 11 · Job details (5247:18687)** — Figma has a 326x175 #2563eb panel with the
company wordmark centred in it. The code drew a small logo on white. The three rating
marks were missing in both places. Content column was 338 at x32; Figma 326 at x38.
Ad-hoc 8/16/24 spacers where Figma has a uniform 16. No rule under the CompanyRow.
Location row left-packed with dark labels. The action button was pinned to the screen;
Figma has it inside the card at 322.

**Screen 12 · Check your request (5247:18695)** — fields 12 apart where Figma has 24,
which put everything below 48 too high. Short-note box was the 100-tall multiline
input; Figma's is 44. "2 of 5 referral requests left" a filled chip where Figma draws
it plain.

**Screen 13 · Referral request (5247:18762)** — five separate cards where Figma has
one 370x1464 Window holding everything, including the two decision buttons.

### Shared fixes from this run

- **Avatars.** Figma leads every card with a round 44 photo of the person. The code
  showed a white tile with the company logo. Censused V6: 16 people across 96 card
  instances — job cards, request cards, chat rows, notifications, profile headers.
  Exported all 16 portraits at 88x88 and taught Avatar to resolve a photo from the
  name, so every list picks up the right face.
- **Tag marks were 16.** Figma's are 14, everywhere.
- **Bullet lists.** Figma draws one text node with the bullet inline and no gap. The
  code used a <ul> with a 4 gap and a hanging indent, so every long section ran tall.
- **Notes hug their text** wherever they sit.

### Open, needs Devansh

- Some exported portraits are AI stock images with a "stablediffusionweb.com"
  watermark burned in — Nithin Agarwal's is one. At 44px it is faint but visible on
  the bottom edge, and they now sit in a public repo. They want replacing with
  licensed photos before this goes to main.
- The Verify screen still carries the "the code is 482013" help line Figma has no
  node for. It is the only way past that screen in the prototype.

Two temporary clones were made in Figma to export the job banner assets; both were
deleted and the page has no leftovers.

Verified on localhost, not the Vercel preview.

## AUDIT · 2026-09-21 · Screens 14–31 · Explore, Messaging and Tracking done

Five flows now match Figma: Login, Onboarding, Explore, Messaging, Tracking.

### The two biggest shared findings

**The tab bar.** Censused all 80 screens: 57 carry the BottomNav. The 23 that do
not are exactly login and onboarding, the two chats, the three edit screens and the
link page. The code only drew it on the four tab roots, so every pushed screen was
missing the bottom 88 of the design and anything anchored to the bottom sat 72 too
low. The bar now lives above the stack.

**Avatars.** Figma leads every card with a round 44 photo. 16 people across 96 card
instances were showing a company logo or initials instead. All 16 portraits
exported; Avatar resolves one from the person's name.

### Screens that did not exist at all

- "Not enough to judge" (5247:19007) — a lower-match request whose resume says too
  little. The code's two lower-match people were invented names.
- "A referrer suggested you" (5248:29038) — the job page with a Headline block,
  where the referrer's Invite button was meant to land.
- "Heard from the company" card on Track details 2 — without it the candidate had
  no way to say the company had been in touch.
- Three of the seven track endings had no button; Figma offers "Find more jobs".

### Blocks the code had that Figma does not

- "Who you asked" and "What they got" on Track details — checked all nine track
  screens, neither appears on any.
- An "Undo refer" button under the person header on After refer; Figma has it as a
  toast at the bottom of a separate state.
- Suggested people on the empty Referral requests screen.

### Content that differed

Both referrer lists (messages and notifications) carried invented people and copy.
All seven track status lines and their second lines. The referrer's chat had the
candidate's conversation in it. Joy Sehgal and Abhay Verma were named wrongly,
which also stopped their photos resolving.

### A regression I caused and fixed

Moving the tab bar above the stack broke tab switching for about six commits: a
screen animating out renders a second copy of the tab root, and that copy
overwrote the setter the bar called. The stack now owns the tab state.

### Still open for Devansh

- Watermarked AI portraits ("stablediffusionweb.com") in the exported avatars.
- The "code is 482013" help line on Verify, which Figma has no node for.
- Figma dates the on-hold and submitted screens differently for the same Meta
  request; the prototype carries one date per request.

Verified on localhost, not the Vercel preview.

---

DECISION · 2026-09-21 · Verify screen: the prototype-only help line is gone
Decided:   Removed "For this prototype the code is 482013" from the Code field on
           Where you work. Any 6 digits now pass. The wrong-code error is driven by
           the seeded value 482010 from the `verify.wrong-code` scenario, so that
           state still demos, and editing any digit clears it.
Rejected:  Keeping the line (Figma has no text node for it); pre-filling 482013
           (still a value Figma does not show).
Because:   Devansh's bar is an exact match with Figma. The line only existed so a
           first-time user could get past the screen; letting any code through
           solves that without adding a node Figma doesn't have.
How sure:  Verified on localhost, not the Vercel preview.

DECISION · 2026-09-21 · Prototype page: the phone is bigger and centred on the page
Decided:   .proto-layout now uses display:contents so the list and the phone land
           straight in the .proto-page grid. The phone spans both rows, so it
           centres against the whole page height — the space above it equals the
           space below at every window size. The --n ladder was recomputed against
           (window height - 40): at 1024x768 the frame went 248 -> 317, at 1440x900
           -> 393, at 1512x1100 -> 460.
Also:      The state list now scrolls on a new .proto-scroll wrapper instead of on
           the multi-column box. A multicol box with a fixed height pushes overflow
           into EXTRA columns sideways, not downward, so three groups were sitting
           behind the phone unreachable. That bug predated this change; the wider
           phone only made it visible.
Also:      Dropped "The work email code is 482013" from the page intro — stale
           since the Verify screen takes any 6 digits.
Because:   Devansh asked for the top gap to match the bottom gap. Centring the
           phone on the page is what makes that true at any height, not a one-off
           number.
How sure:  Measured at 1024x768, 1280x700, 1440x900, 1512x1100 and 375x812 on
           localhost, not the Vercel preview. Top and bottom gaps read equal at
           every desktop size; nothing spills off-screen; the page never scrolls.

## AUDIT · 2026-09-21 · Tracking re-check (9 screens)

Correction: I told Devansh 5 of 9 Tracking screens were done. The log already listed all
9 as done; my "5" was bad arithmetic. He asked to redo all 9, node by node.

Fixed:
- Timeline rebuilt to Figma's six step kinds (done blue check, next blue ring, waiting
  orange clock, pending grey ring, failed grey x #6b7280, success green check) using
  Figma's exported glyph paths. Title was 2px high; connector now 37 long from +22
  (+21 when waiting), dashed 5/5 via gradient so the dashes fall where Figma's do.
- "Mark it" on Track 2 is a small secondary button (71x28), not a text link.
- "Find more jobs" and "Thank Joy" are primary (blue), not secondary.
- No answer: "3 others" card moved below the person card, padded 12/16 gap 4 (64 tall).
- Data: Swiggy job Product Designer-I, CRED job Product Designer-II, Meta updated 12 Sep
  with "submitted on 10 Sep", On hold shows 16 Sep.

Verified node by node on localhost: list, Track 1, 2, 3, 4, 5.
NOT yet verified after the fix: No answer, Not moving forward, On hold (weekly limit).

Open for Devansh:
- Figma uses Inter 3 (variable); the site loads Inter 4 from Google Fonts. Digit widths
  differ ("11:11 am" 47 in Figma, 44.2 in the browser), which causes every 1-3px
  text-width offset. Fix = load Inter 3 for the app; touches every screen.
- No V6 screen draws the Messages "2" badge or the bell dot; the prototype shows them
  because its data has 2 unread. Removing them changes every tab screen.
- Flipkart shows "Sent" on the list (Figma: Submitted) because the live happy path
  starts there.

## AUDIT · 2026-09-22 · Tracking re-check finished (9 of 9)

- No answer: re-measured, matches.
- Not moving forward: reason line was missing its full stop.
- On hold: the date override (16 Sep) was never passed through App.tsx, so it read
  12 Sep. Button sat 24 under the person card; Figma's Frame 329 gives 48.
- Known 1px: Figma's waiting line on On hold is 38 long, No answer's is 37. Both end
  under the next ring's stroke, so it can't be seen. Left as one value (37).

Screen count, recounted from Figma: 84 screens. Login 1, Onboarding 7, Explore 13,
Messaging 6, Tracking 9, Update 2, Profile 3, Manage/Edit 2, Edit Profile 2, Link 3,
States 36. The old "80" missed the four notification/chat screens added later.
Screens 1–31 in the earlier entries don't cover all 36 of the first five flows, so
Explore and Messaging need a re-diff too.

Devansh: finish one flow at a time and ask before starting the next.

Verified on localhost, not the Vercel preview.

## AUDIT · 2026-09-22 · Update flow done (2 of 2)

**Your referrals (5247:19701)**
- Referral card rebuilt to Figma's ReferralBar: 100 tall, padded 16 (was 74, padded 12).
  Name over tag 8 apart, top-aligned; date at top right; Update button under it
  (4 top, 9 between), right-aligned. Clock 13 (was 14). Cards 16 apart (was 12).
- "Himani thanked you" card: padded 12/16 with everything centred (was 16, top-aligned);
  quote 12/16 Medium (was 14/20 Regular); icon #6b7280 (was #9ca3af). 8 under the tags (was 12).
- Abhinav Saxena was missing: Figma draws this screen after Nithin has referred him.
  The "Referrer · Your referrals" state now shows him. No Update button on a referral
  submitted today, as in Figma.

**Seen it move sheet (5247:19744)**, and the shared sheet it exposed
- Every Figma sheet puts the title 24 under the handle in a 22-tall box, 12 above the
  content. The shared Sheet had 32 and a 16 gap, so every sheet sat 8–14 too low. Fixed
  once in Sheet.
- Person card to the next block: 24 (was 16). Question text 14/20 (was 12/16). 24 above
  the note (was 16).
- Option rows: Figma's 0.5 separator adds to the row (62.5 / 44.5). Was an inset shadow
  that added nothing.

**Knock-on fixes to two Explore sheets** (they share the code above):
- Not moving forward: now 641.5 tall, as in Figma (was 615.5). Tag reads
  "4 of 7 skills match" (was "4 of 7 skills").
- Share your link: now 528, as in Figma (was 586). Copy link icon 24, left-aligned at
  the padding. Message box r8, padded 12/16, text in the body colour. App tiles 60x60 r8,
  no shadow, logos at Figma's sizes, names 14/20. "More" is three grey dots. Removed
  "See the page they get": Figma's sheet has only Cancel. The link page is still in the
  state list.

Left: text widths 1–2px off (Inter 3 vs 4, waiting on Devansh).

Verified on localhost, not the Vercel preview.

## AUDIT · 2026-09-22 · Profile flow done (3 of 3)

Referrer profile (5247:19792), Candidate profile (5247:19840), Paused (5247:19884).

- Person header sits on the grey page, 108 tall (20 above and below). Was a white card.
- Groups follow the header with no gap, 24 between groups, Log out 24 under the last.
- List rows (shared Row): icon 26 (was 22), label Medium 14/20 (was Regular 16/24),
  chevron 24 in #6b7280 (was 16 in #9ca3af), divider 0.5 (was 1). Settings and Help
  use the same Row, so they changed too; Figma has no screen for them.
- Referrer menu: removed "Manage your posts". Figma has five rows; Posts is its own tab.
- "Let referrers find me": a 74-tall card with the tag first ("Live" green, or "Paused"
  orange, each with a 14 filled dot), then the label, the switch at the right. The code
  hid the tag when paused and used a 7px dot.

Verified on localhost, not the Vercel preview.

Correction to the 2026-09-22 Tracking entry: Devansh confirms Explore and Messaging are
done, so no re-diff.

## AUDIT · 2026-09-22 · Manage/Edit flow done (2 of 2)

**Manage your posts (5247:19933)**
- Post cards 8 apart (were 16).
- Activity line: what is new reads blue ("5 new", "1 still open"), the rest #6b7280;
  a quiet post ("No new requests · 2 referred") is all #636a75. Was all #636a75.
- Draft card: just "Finish", at the left. Was right-aligned.

**Edit your job post (5247:20045)**: rebuilt. Figma's screen is "Check your job post"
with the post already live: Job ID field (with its mark), "From the job description"
box with all six fields stacked label-over-value, the two rule boxes with their
second lines, Tips with its mark, and the Job description file row. The code had
four side-by-side fields, the Job ID below them, rules without their explanations,
no JD row, and a different intro. Now uses the same parts as Check your job post.
- Intro: "Saving checks the match again for current requests."
- Second button: "Pause post" (secondary). Was "Delete this post" (red); Figma has no delete.

**A state-switcher bug, found here and fixed:** every state opened on the tab of the
state before it (e.g. "Manage your posts" showed Referral requests). The copy of the
old screen that fades out mounts fresh and re-picked its own tab after the new screen
had picked. The fading copy can no longer pick a tab.

Also fixed a type error from the Share link change (it would have failed the Vercel build).

Verified on localhost, not the Vercel preview.

## AUDIT · 2026-09-22 · Edit Profile flow done (2 of 2)

**Referrer · Edit your profile (5247:20107)**: rebuilt.
- Title "Edit your profile" (was "Edit profile"). Intro "Candidates see your name, role
  and company." was missing.
- Photo 68 (was 88), "Edit" under it (was "Edit photo").
- Four fields 20 apart: Your name, Company (with the Flipkart logo inside the box),
  Your role, Where you work from. The code had no Company field, wrapped the rest in a
  "Where you work" section 12 apart, and added a Work email block Figma doesn't have.
- Field gained a `lead` slot for the logo.

**Candidate · Edit your details (5247:20129)**: rebuilt. Figma's screen is "Check your
details" filled in, plus Roles you want / How you want to work, the four portal
details (with their "Not usually on a resume…" line), and the resume row. The code had
an 88 photo, an "About you" group of four editable fields, and "What portals also ask
for" in a different order. Now uses the Check-your-details parts. Portal details show
Figma's values (12 Mar 1999, None, Bengaluru Remote, 30 days) until changed; Date of
birth still opens the picker.

Verified on localhost, not the Vercel preview.

## AUDIT · 2026-09-22 · Link Page flow done (3 of 3)

Before upload (5247:20271), Details filled (5247:20189), Sent (5247:20246). Rebuilt.

- Header: Figma's web header is 130 tall with no fill — 14 above the status bar, the 48
  logo bar, 14 below. The code had a white bar flush under the status bar, so the page
  sat 28 high. The in-app "close preview" button is gone: Figma's right slot is empty.
- Headline: Semi Bold 16/24, centred (was 20/28, left). Before upload it reads "Send a
  complete request. No app needed."; after, "Check your details, then send."
- Person: photo centred against the two lines; job ID tag at the right edge.
- Resume: the onboarding DocUpload (dashed box, Upload file / Paste link), not a card
  with one button. "We fill in the details…" line under it, 8 below, before upload only.
  Uploaded state: file name box 18 tall, separator "·" (was "•").
- Your details: the "Filled from your resume" tag sits in the label row.
- Short note: only after upload, one-line 52 box (was a 100 multiline, always shown).
- The button sits 40 off the bottom (pinned before upload; after the note once filled).
- Sent: added the person row and "Save these details and track this request" block.
  Buttons "Get the SideDoor app" / "Not now" (were "Get the app to follow it" / "Send another").

Verified on localhost, not the Vercel preview.

## AUDIT · 2026-09-22 · States 1/36 · Upload your resume / Couldn't read file (5287:22270)

- The drop box showed an uploaded file. Figma shows it empty: the file that failed was
  never read. Next is disabled with it.
- The error sat above the drop box as one red note. Figma puts it under the box, 32 below,
  as a red note ("Couldn't read this file", info mark) with the line "Try a PDF with text
  you can select, or fill in the details yourself." 8 under it, 14/20 muted.
- "What we'll auto fill" is not in this state; the error block takes its place.

Verified on localhost, not the Vercel preview.

## AUDIT · 2026-09-22 · States 2/36 · Check your details / Reading (5287:22385)

Did not exist; built it. New state "Check your details · reading" under Waiting.
- Intro reads "Reading your resume. You can fill the rest while it works."
- Experience and Projects hold Figma's three grey bars (220x16, 300x12, 160x12, 12 apart)
  instead of their content. Everything else on the screen is already filled in.

Verified on localhost, not the Vercel preview.

## AUDIT · 2026-09-22 · States 3–7 of 36

**3 · Check your request / Couldn't send (5287:24479)**, **4 · No requests left
(5287:24696)**, **5 · Sending (5309:40184)** — all three draw a request that is already
complete, which the code did not:
- "Flipkart's portal also asks for" is gone once every answer is in, and those four
  answers move into "Your details" (10 fields, before the resume).
- Couldn't send: a red note "Couldn't send. Your details are saved." and a blue
  "Try again". Was "Couldn't send. Nothing was lost — try again." over a dead button.
- No requests left: a plain grey note "No requests left this week. More on Monday."
  (was an orange one with different words) and the weekly count line is gone.
- Sending: the button alone, reading "Sending…". Built as a state ("Send · sending").

**6 · Your referral requests / Just sent (5287:25176)** — built. The green note now reads
"Sent to Nithin · Interaction Designer, Flipkart" with the info mark (was a tick and
"You'll be told the moment it moves"), and Flipkart sits at "Sent · Just now".

**7 · Your referral requests / Empty (5311:39180)** — Figma has one muted line and a blue
"See jobs", not an illustrated empty block. Copy now "No requests yet. Find a job with
someone who refers, and ask in one go."

Verified on localhost, not the Vercel preview.

## AUDIT · 2026-09-22 · States 8–13 of 36

**8 · Track details / Loading (5287:25632)** — Figma's own shapes: a 56x32 block with two
bars beside it, one 300x12 line, a blank 370x300 card, then the person card (76 tall,
44 round block and two bars). Was two generic skeleton cards. Blocks use the 12% grey fill.

**9 · Track details / Couldn't load (5287:25777)** — a red note "Couldn't load this
request" and "Pull down to try again." under it. Was an illustrated block with a button.

**10 · Track details / Role closed (5349:36663)** — the tag and the timeline now read
"Not moving forward", which is what Figma writes on this screen. Was "Role closed".
(This was one of the open questions; Figma is the bar, so it now follows Figma.)

**11 · Jobs / Empty (5311:38739)**, **12 · Loading (5311:38885)**, **13 · Couldn't load
(5311:39037)** — all three drop the "Jobs with someone who refers" label and the sort
row; the state is the only thing on the page.
- Empty: "No one refers for jobs like yours here yet…" and a blue "Set job preferences".
  Was a different line with no button.
- Loading: three skeleton cards starting at 170.
- Couldn't load: red note "Couldn't load jobs" and "Pull down to try again.", no button.

Verified on localhost, not the Vercel preview.

## AUDIT · 2026-09-22 · States 14–18 of 36

**14 · Job / Already asked (5368:37870)** — built as a state ("Job · already asked").
A plain 12/16 line "You asked Nithin today. One request per job, per referrer." over a
blue "View your request". The code had a grey note and a white "See your request".

**15 · Job / Skipped resume (5368:38185)** — built as a state ("Job · resume skipped").
The match tag becomes a plain "Add resume to see match". Figma wraps it onto its own row
and the code keeps it beside "Remote or hybrid": the tag is 188 wide in Inter 3 and 186.6
in Inter 4, and 326 is the width that decides it. Another one the font decision settles.

**16 · Messages / Empty (5311:39626)**, **17 · Loading (5311:39775)**, **18 · Couldn't
load (5311:39932)** — all three drop the search box.
- Empty: "No messages yet. A chat opens when a referrer refers you." and a blue
  "See your requests". The code had an illustrated block and no button.
- Loading: one white group with three skeleton rows. Built; the group is 288 tall against
  Figma's 290, which is the row dividers.
- Couldn't load: red note and "Pull down to try again.". Built.

Note for later runs: with the browser pane hidden, CSS animations freeze, so a screen
measured mid-fade reads ~3% large and offset. Measuring now disables animations first.

Verified on localhost, not the Vercel preview.

## AUDIT · 2026-09-22 · States 19–22 of 36

**19 · Referral requests / Loading (5288:23110)** — already matched (job row, then three
skeleton cards at 200 / 312 / 424).

**20 · Couldn't load (5288:23219)** — a red note "Couldn't load requests" and "Pull down
to try again.". Was an illustrated block with a Try again button, and the suggested
people were still showing under it; Figma shows neither.

**21 · All handled (5288:23320)** — "You're through every request for this job. Share
your link to get more.", then the "Your link" box and a blue "Copy link". Was an
illustrated block and a white "See your referrals", with suggested people under it.

**22 · Paused post (5288:23411)** — an orange note "This post is paused" with its own
line "Requests that already came in are still here." under it. Was one long orange note.

Verified on localhost, not the Vercel preview.

## AUDIT · 2026-09-22 · States 23–26 of 36

**23 · Referral requests / Fit checked again (5288:23613)** — built. A plain note
"You changed this job. Fit was checked again." over the list.

**24 · Referral request / Skill removed (5288:26427)** — built. A removed skill keeps its
row: the mark goes grey, the title goes dark, the line under it reads "You removed this.
Tap to undo", the tag drops to "3 of 7 skills · 3 yrs", and the hint becomes "Count
updated for you only". The code deleted the row outright.

**25 · Referral request / Profile updated (5288:27189)** — built. A note "Profile updated
since the 12 Sep fit check" above "How they match".

**26 · After refer / Undo (5309:40416)** — built. A white pill 104 off the bottom holding
"Referred. Abhinav is told in 5 seconds." with an Undo link at the right, for five
seconds after referring. Undo puts the request back. Toast is now 48 tall (14 of padding),
as Figma draws it.

Verified on localhost, not the Vercel preview.

## AUDIT · 2026-09-22 · States 27–31 of 36

**27 · Your referrals / Empty (5288:28325)** — one line, no section labels: "No referrals
yet. When you refer someone, you'll pass on their stage here."
**28 · Your referrals / Updated (5288:28673)** — built. A green note "Updated. Aviral can
see it." between the summary block and the waiting list; Aviral leaves the waiting list,
so it reads (1).
**29 · Your referrals / Loading (5311:38349)** — built: three skeleton cards, nothing else.
**30 · Manage posts / Empty (5311:38215)** — "No posts yet. Post the job you can refer
for, then share its link." over a blue "Post a job". Was an illustrated block with
different words.
**31 · Seen it move / Couldn't update (5288:29029)** — built. The reassuring line turns
into a red "Couldn't update. Try again."; nothing else moves.

Verified on localhost, not the Vercel preview.

## AUDIT · 2026-09-22 · States 32–36 of 36 · States flow finished

**32 · Verify work email / Personal email (5311:37248)** — the error now reads "Use your
work email. We check it's a company address."
**33 · Verify work email / Wrong code (5311:37391)** — the seeded code is "482 910", as in
Figma, and the error reads "That code didn't work. Check it or resend."
**34 · Add the job / Couldn't read link (5311:37525)** — the drop box goes back to empty
and the error takes the auto-fill list's place: a red note "Couldn't read this link" with
"Upload the description, or fill it in yourself." under it. Was one red note up top.
**35 · Link page / Job closed (5289:29101)** and **36 · Already asked (5289:29210)** —
both built. The same page with nothing to fill: the headline and its line, the person,
one note ("Nothing to fill. Your details were not saved." / "One request per job, per
referrer.") and "Get the SideDoor app" pinned 40 off the bottom.

All 36 States screens now match, so all 84 V6 screens have been diffed node by node.

Still open, and all of it waits on Devansh:
- Inter 3 vs Inter 4. Every remaining difference is a text width of 1–2px. One of them
  changes a layout: on Job / Skipped resume the "Add resume to see match" tag is 188 wide
  in Figma and 186.6 here, so Figma wraps it to its own row and the browser does not.
- The Messages loading group is 288 tall against Figma's 290 (row dividers).
- The unread "2" badge and the bell dot, which no V6 screen draws.
- Flipkart reads "Sent" on the requests list where Figma has "Submitted".
- The watermarked AI portraits.

Verified on localhost, not the Vercel preview.

## 2026-09-23 — four things Devansh caught in the prototype

**The unread "2" was italic.** The badge was an `<i>` element, so the browser slanted the
number. It is a `<span>` now.

**The site's circle cursor floated over the app.** The black circle sat on top of whatever
you were pointing at inside the phone. Inside `.proto-stage` the app now shows real
cursors — arrow, hand on anything tappable, a beam in a field — and CustomCursor keeps its
circle out. The rules live in `@layer base`, because an `!important` in an earlier layer
beats the same `!important` in a later one, and the blanket `cursor: none` is in base.

**Nothing scrolled inside the phone.** Lenis calls preventDefault on every wheel event on
the page, so a nested scroller only gets the wheel when it carries `data-lenis-prevent`.
Added to `.sd-body`, `.sd-sheet-body`, the date wheels and the state list. A real mouse
wheel over the phone now moves `.sd-body` (0 → 500 of 1851 on Job details).

**The logos had backgrounds baked in.** Figma's export renders a node *in context*, so
every PNG carried the canvas behind it: an opaque `#f5f5f8` box from the "Logo" frame on
all of them, and an opaque `#1e1e1e` one on the job banner and the rating marks. In Figma
every `Logo/*` component's own fill is hidden, so the logo is transparent.
Re-exported each as SVG and dropped exactly the two background rects Figma adds. 18 logos
are vectors now, so they are also sharp at any size — the banner was a 666px PNG shown at
222. Swiggy and Groww are placed images in Figma, not vectors, so they keep their original
transparent uploads as PNG. `logoSrc()` in `ui.tsx` picks the extension in one place.
Two details read off the nodes: the banner instance overrides the wordmark fill to white
(the component's own is `#107BD4`, which is right on a white tile), so the banner gets its
own `flipkart-white.svg`; and Figma's rating marks are a green circle, a blue hexagon and
a grey circle, which is what they draw now.

**The AI portraits.** Three of the sixteen were Stable Diffusion renders, which the source
sizes give away — 1024×1024 where every real photo is an odd rectangle: Nithin Agarwal
(the one with the `stablediffusionweb.com` watermark across the bottom), Abhinav Saxena
and Advika Singh. All three are replaced with real photographs of South Asian
professionals from Pexels, whose licence allows commercial use with no attribution:
Nithin `pexels-photo-33261949`, Abhinav `pexels-photo-11357069`, Advika
`pexels-photo-7688183`. Each is cropped to the face and written at 264×264, three times
the 88×88 the old ones were, so the 68px profile photo is no longer soft.
The other thirteen were already real photographs and are untouched.

Verified on localhost, not the Vercel preview. `npx next build` passes.

**Half a screen of dead space at the bottom of every tab screen.** Two mechanisms were
both adding the same gap. `Screen` rendered a trailing spacer with an inline
`height: 108`, and `.sd-screen.has-tabs .sd-body` also carried `padding-bottom: 112px`,
so a screen with no action block ended on 220 instead of Figma's 112 (an 88 tab bar plus
24). On Job details that was 1851 of scroll where 1743 is right. The spacer is now the one
place the bottom gap is set — 112 under a tab bar, 40 without one — and the body's
padding-bottom and its `:has(> .sd-actionblock)` override are gone. Screens that do have
an action block are untouched: `.sd-actionblock` carries its own 112.

Verified on localhost, not the Vercel preview.

**Going back looked like two screens splitting apart.** A stack entry's `anim` records how that
screen *entered*, and App.tsx was re-reading it every time the screen became the top again. So a
pop replayed the revealed screen's entrance — for a tab root that is `fade-in`, a cross-fade with
a `scale(1.03)` — at the same time as the screen above it slid off to the right. Two unrelated
motions at once, which is exactly what reads as splitting. Nav now records **why** the top
changed (`dir`, plus `poppedAnim`), and a pop plays `under-out` on the revealed screen: the exact
reverse of the slide-and-dim it did on the way in, in step with the one sliding away.

Four more things in the same pass, all of them about the motion being iOS-like rather than merely
present:
- **One duration.** `--sd-nav: 350ms` (UIKit's own push) drives both layers of a push and of a
  pop. They were 420 in and 380 out, so the two screens drifted apart mid-move.
- **The dim is a black sheet, not a filter.** `filter: brightness(0.92)` re-rasterises the whole
  subtree every frame, which is what made the push stutter, and it cannot be driven from a style
  prop during an edge-drag. It is now a `::after` over the under screen whose opacity is
  `var(--sd-dim)`, registered with `@property` so it also transitions when a drag settles. It has
  to inherit, or the value set on `.sd-screen` never reaches that screen's own `::after`.
- **Percentages, not pixels.** The under screen travels `-30%` (iOS parallax) instead of a
  hard-coded `-100px`, and the pushes use `100%` rather than `402px`/`874px`.
- **The outgoing copy kept its shape and its place.** It mounts fresh, so it had no `has-tabs`
  class and was scrolled back to the top: you would scroll down a job, tap back, and watch the
  *top* of that screen slide away. The stack now remembers each screen's scroll position, keyed
  by route name — not by the stack id, which counts up on the server and the client separately
  and put a different number in the HTML on each side.

Also dropped the `scale(1.03)` from the root cross-fade; it read as a pop, not a hand-off.

Verified on localhost, not the Vercel preview: a push is `under-in` + `push-in`, a pop is
`under-out` + `push-out`, and the leaving copy comes back with `has-tabs` and scrollTop 520 where
it was left. `npx next build` passes.

CRITIQUE · 2026-09-23 · molades-attack (final V6) · Source: self
Finding:   Run on the final 84 Figma screens and the prototype, tested in the prototype on localhost. Full tables in ATTACK.md, "Final V6 attack".
Prediction: Devansh predicted all four kinds. Wrong and waiting broke; too much held everywhere.
Majors:
  - Send stays tappable while "Sending…": 3 taps used 2 requests (tested).
  - Undo after Refer doesn't reach the candidate; they already see "Referred" (tested).
  - No undo on Not moving forward, Seen-it-move stages, Mark as submitted.
  - Offline not designed.
  - Tap targets under 44 in the prototype, worst: 11 Copy icons at 18×18 on After refer.
Minors: long names wrap in code but end in "…" in Figma; green note 4.49:1; off-scale paddings copied from Figma; Resend code does nothing in code; referrer empty messages/notifications; LinkedIn cancelled; link upload progress.
Fixed since 19 Sep: tag contrast (AA colours), all long-text collisions.
Action:    fixed 23 Sep, all five and the minors (Devansh: "yes fix all"). See CHANGE below and ATTACK.md "Final attack fixes built".

DECISION · 2026-09-23 · Rule: Figma and prototype change together · Source: Devansh ("if you fix something in figma make sure u also fix it in the prototype. make it a rule always")
Decided:  Every V6 Figma fix also goes into the coded prototype in the same piece of work, and the other way round.
Because:  The prototype was matched node by node; one-sided fixes make them drift.

CHANGE · 2026-09-23 · molades-build · Final attack fixes, Figma and code together · Source: Devansh ("yes fix all")
Built in both, per the new rule. Detail in ATTACK.md, "Final attack fixes built".
  - Send once (ref guard). Undo that reaches the candidate. One undo toast for all four decisions that tell the candidate. 44pt targets. Offline.
  - Minors: one-line names in code, successOnPage token (#166534), resend countdown, empty referrer messages and notifications, search no-match, LinkedIn cancelled, link page reading.
  - Figma: 11 new V6 states in the States grid, 3 Undo copies wired on the prototype page (5 s timeout to the done screen), 2 new variables, hit areas on DetailField and link copy.
  - Code follows Figma on Not moving forward: back to the list, not a done screen.
Found while fixing: the wrapper-based 44pt overlays on "Update" and "Mark it" never clicked the button; the Messages search box vanished on no match.
Not done, with reasons: Figma bookmark hit area (shared V2–V5 Job card), off-scale paddings (shared Card component), wiring non-Undo states on the Figma prototype page (a click-through can't trigger them).
Checked on localhost, not the Vercel preview (needs a login): send 3 taps → 1 request; Refer/NMF/Submitted/Seen-it-move undo on both sides; tap probe; long names; offline; every new switcher state. next build passes.

DECISION · 2026-09-23 · Shared components may change V2–V5 · Source: Devansh ("its ok v2-v5 can change along with v6. fix these")
Decided:  Fixing a shared component is fine even though V2–V5 instances change with it. V2–V5 screen frames are still not edited directly.

CHANGE · 2026-09-23 · Bookmark hit area and spacing on the scale · Source: Devansh
  - Job card component: invisible Hit area 44 over the bookmark (shows in every version, changes nothing visible).
  - Figma + code: Job details card fills its frame (16), banner 24/48 with a 242×64 wordmark, logo tiles padded 12 with 50 logos, referral row gap 8, login 32/16, link page header 16/16 (component 134 tall).
  - Code only (Figma already on scale): button fixed 52 instead of 14 padding, toast 12, timeline gap 32.
Checked on localhost: rescan finds no off-scale spacing except icon drawing in the share sheet's "More" dots; timeline pitch unchanged (56/74); build passes.

CRITIQUE · 2026-09-23 · Devansh clicking through the prototype · Source: Devansh
Finding:   Many things looked tappable but weren't, or lost the cursor: Newest first, Show project details, 16 Edit/Replace links, 3 Help rows, Open resume (no action at all); every 44pt tap area hid the cursor; the date wheel hid the chosen row; the link page and chat didn't scroll with a mouse wheel; no field checked its input; the warning colour read as orange-red; two icons pointed at missing files; Invite and Update looked different.
Severity:  major (the prototype is what recruiters click)
Action:    fixed 23 Sep, see CHANGE below.

DECISION · 2026-09-23 · How a real app would behave · Source: Devansh ("like a real app")
Decided:
  - Tab bar and segmented control: one pill that slides and swells on the way (iOS 26), not a jump.
  - Tab roots with a filter or search (Jobs, Your referral requests, Messages): title and control stay put, only the list scrolls.
  - Job details: the ask button sits on the bottom edge from the start.
  - Scrolled header glass reaches 8 below the bar so back/bell don't sit on the hairline.
  - Login lines rotate every 3 s in a loop; the dot slides.
  - Fields: required get a red *, optional keep "(optional)"; typing drops what can't belong; leaving a field shows one line with an icon; the main button waits until every field passes. Career gaps is a number of years (0 = none), notice a number of days.
  - Edit = iOS edit in place (lines become fields, link becomes Done, off while invalid). Replace = file picker, PDF/DOC/DOCX up to 5 MB.
  - Warning colour #C93400 → #8A6100 (dark gold): 5.5:1 on white, 5.0:1 on the page.
  - Invite = the same small outlined button as Update. Invited stays a grey tag because it is a status, not an action.
Rejected: a separate edit screen per block (more screens, same job); keeping free-text career gaps (Devansh wants years only).

CHANGE · 2026-09-23 · Real-app behaviour, Figma and code · Source: Devansh
Code: all of the above, plus a sort pull-down (Newest first / Best match), Help articles, Contact support, a resume preview, and one shared block per repeated section.
Figma:
  - InputField got a "Required" switch (red * bound to color/text/error). Switched on for 28 required fields on UI Screens and 18 on the prototype page. Career gaps/Notice labels, placeholders and values changed to years/days.
  - color/palette/warning/700 → #8A6100 (every warning use was bound to it).
  - RequestCard: Invite is now a Secondary Small button (was blue text).
  - Job Screen (4 V6 screens): the button moved out of the card into a bottom "Fixed Actions" bar above the tab bar. Prototype copies: bar and tab bar pinned to the viewport bottom.
  - Prototype page: Jobs, Requests (and Just Sent) and both Messages lists scroll inside a fixed frame.
  - New state "Candidate/Jobs Screen/Sort Menu" (States grid r3 c5) and a prototype copy wired from Newest first.
Code only, not in Figma yet: sliding pill, carousel, header glass (motion or scroll-only); field error and edit-in-place states; Help articles, Contact support, resume preview; projects details open.
Waiting on Devansh: photos for Kritika Rao, Nisha Rao, Rohit Menon (code-only people, no photo anywhere; needs a download).
Checked on localhost, not the Vercel preview (needs a login).

CHANGE · 2026-09-23 · Photos for the last three people, share icons · Source: Devansh ("ok")
  - Kritika Rao, Nisha Rao, Rohit Menon had initials only. Added free-licence Unsplash portraits by photographers in India (Vishal Bhutani, Arnab De, Abhishek Rai), face-cropped to 88×88 like the other 16. Code-only people, so nothing to change in Figma.
  - Share sheet: WhatsApp, Gmail, Drive and Telegram pointed at PNGs that don't exist; now the SVGs.
Checked on localhost: all 65 prototype states opened one by one; no image fails to load and no avatar is left without a photo.

DECISION · 2026-09-23 · Referrer rules are numbers they pick, not switches · Source: Devansh ("why give them a hard limit of 3 years and 10 requests?")
Decided:  Each rule gets an iOS stepper. Experience 0–15 yrs (0 = "Any experience"), requests 1–50 a week. The title and line under it say the number.
          The experience rule now drives the list: requests under it move to Lower match (at 4 yrs, Abhinav and Arpita move).
Rejected: switch + fixed numbers (the referrer can't say what "enough" is for their team); a free number field (a stepper can't be typed wrong).

CHANGE · 2026-09-23 · Stepper rules, Tap to undo · Source: Devansh
  - Figma: new Stepper component (Components & Icons, color/fill/tertiary); the 4 rule switches on UI Screens and 4 on the prototype page replaced; "Experience must match" → "At least 3 yrs of experience".
  - Code: Stepper, rules in the store as numbers, Lower match computed from the rule.
  - "Tap to undo" on a removed skill added it again instead of taking it off; in the "skill removed" state the list was fixed. Now a second tap undoes it and the count goes back.
Checked on localhost: steppers stop at their ends, text follows the number, 4 yrs moves 2 requests to Lower match, undo restores 4 of 7.

CHANGE · 2026-09-23 · Figma catches up with code-only states · Source: rule (Figma and prototype change together)
Figma, States grid:
  - r3 c6 Check request / Field Error (notice "400", "Enter days, 0 to 180.", Still needed · 2)
  - r3 c7 Your profile from your resume / Editing (six Filled fields with *, Edit → Done)
  - r3 c8 Your profile from your resume / Project Details (a line per project, "Hide project details")
  - r3 c9 Referrer / Resume Preview Screen; r4 c7–9 Help, Help / How Referrals Work, Help / Contact Support (new: V6 had no Help screens)
  - InputField Error variants: the error line now leads with info.circle.fill, as in code.
Code follows Figma: a field inside a white box uses surface/secondary (#fafafa), Figma's Filled fill.
Still code-only, on purpose: the sliding tab pill, the login carousel and the header glass are motion or scroll behaviour; the V6 prototype page swaps whole frames, so they would only crossfade.
Caveat noted: #fafafa fields on white and white fields on #f2f2f7 both have faint edges (under 3:1). Figma draws them this way; not changed.

## 2026-09-23 · Waiting is yellow; rules show the number, not changing words

- **Timeline "waiting" mark** (Sent, On hold): now a yellow clock (#FACC15) with dark hands (#713F12, 5.7:1 on the yellow), a yellow line, and a plain title. Before it was dark gold (#8A6100) for mark, line and title. Devansh: it didn't read as "waiting". The hands carry the contrast; the word "Sent" carries the meaning, so the disc doesn't need 3:1 on white.
  - Figma: new variables `color/palette/yellow/400`, `color/palette/yellow/900`, `color/icon/waiting`, `color/icon/waitingInk`. The 3 waiting marks on UI Screens and 3 on the V6 Prototype page are now a "Waiting mark" frame (dark disc behind a yellow clock.fill).
  - Tags that say "On hold" / "Still needed" keep the dark gold text. Not changed.
- **Your rules**: the words no longer change with the number. The number sits inside the stepper (− 3 yrs +, "Any" at 0; − 10 +). Both rules are one white card with a hairline between, title and stepper on one line, the explanation full width under them. Devansh: the changing titles looked cluttered.
  - Copy: "Minimum experience" / "Requests with fewer years go to Lower match. You can still refer them." and "Requests a week" / "When you're full, candidates are asked to try again on Monday."
  - Figma: Stepper component now has a `Value` text property, no divider, r16, 36-wide buttons, hugs its width. Rule boxes merged into "Rules card" on the 2 UI screens and 2 prototype screens.
- Verified on localhost only (Vercel preview needs a login).
- **Same day, revised:** Devansh found the yellow too yellow. Waiting is now amber #F59E0B with white hands, the way iOS draws a filled status glyph (the existing `color/palette/warning/500`). `color/icon/waiting` points to it and `color/icon/waitingInk` points to `neutral/0`; the two yellow palette variables are deleted. Trade-off: white hands on amber are 2.1:1. The word "Sent" / "On hold" beside the mark carries the meaning, so the mark doesn't have to. Verified on localhost only.
- **Amber everywhere the dark gold was (Devansh: "change everywhere it was used"):** waiting tags ("On hold", "1 on hold", "Still needed", "Avinash is full this week", "No answer", "Paused") now sit on pale amber #FEF3C7 with dark text (#3B3F46, about 10:1). Warning icons (offline notes, tag marks) are amber #F59E0B. Amber is never used for text, because amber text on white is only 2.1:1.
  - Code: `--sd-text-warning` removed; `--sd-warning-50` → `--sd-warning-100`; `--sd-icon-warning` is #F59E0B.
  - Figma: `color/feedback/warning/bg` → new `color/palette/warning/100`; `color/icon/warning` → `warning/500`; the Tag Buffer variant's label is now `color/text/primary`; 17 V6 tag labels on UI Screens and 15 on the prototype page are rebound from warningAA to text/primary. Because the component and variables are shared, V2–V5 tags change too (allowed); their V2–V5 frames themselves were not edited.
  - Verified on localhost only.
- **Revised again:** Devansh: the dark text on the amber tag looked wrong. Waiting text is now dark amber #92400E (6.4:1 on the #FEF3C7 tag, 6.3:1 on the page), the usual badge pairing. Offline notes use it too.
  - Code: `--sd-text-warning: #92400e`, used by `.sd-tag.buffer` and `.sd-tag.note.buffer`.
  - Figma: new `color/palette/warning/900` #92400E; `color/text/warningAA` points to it; the Tag Buffer label and the same 17 + 15 V6 labels are bound to warningAA again.
  - The timeline titles ("Sent", "On hold") stay plain; only their mark is amber.
  - Verified on localhost only.

## 2026-09-23 · Colors page caught up with the variables

- Devansh asked where the screen background (#F2F2F7) sits in the palette. It was the variable `neutral/75`, but the 🎨 Colors page never showed it.
- Added 8 missing swatches, each bound to its variable: neutral/75, 150, 650, 700, black, success/800, warning/100, warning/900. The neutral and status rows now wrap.
- Deleted `warning/700` (#8A6100): no variable or node used it after the amber change.
- Code: `--sd-page` now points to the existing `--sd-n75` instead of repeating the hex.
- Naming oddity, not changed: neutral/650 (#5F6671) is darker than neutral/700 (#636A75).

## 2026-09-23 · Screens sit on a light brand blue, not grey

- Devansh: the grey #F2F2F7 made the UI feel muted. The screen background is now `brand/blue/25` #EFF3FC, a very light tint of the brand blue. White cards stand out on it about as much as on the grey (similar lightness), so the layout is unchanged.
- Contrast holds: secondary text #636A75 on the new page is 5.0:1; dark amber #92400E is 6.3:1.
- Code: new `--sd-blue-25`; `--sd-page` points to it. The header glass and the fixed-button fade used the grey in rgba, now the blue. The login screen uses `--sd-page`.
- The login illustration (splash.png) had a grey box baked into it. It's now transparent (background and enclosed pockets cleared), in code and in the Figma Illustration/Splash component.
- Figma: new `color/palette/brand/blue/25`; `color/background/grouped` points to it, so all 165 V6 screens follow. The 8 "Fixed Actions" fades were recoloured by hand (gradients can't take variables). Swatch added to the 🎨 Colors page.
- Verified on localhost only.

## 2026-09-23 · Near-white page; cards lift with a soft shadow

- Devansh: the light blue still looked dark; they want the UI bright. Page is now `brand/blue/25` = #F7F9FE (near white, a hint of brand blue).
- On near-white, white cards lose their edge, so every white card, list, box and field gets a soft iOS-style lift: a 0.5px hairline (6% ink), a 1px/2px shadow (4%), and a 4/14 shadow tinted brand blue (7%). Nested boxes and fields inside a card stay flat. Focus and error rings keep the lift.
  - Code: `--sd-e-card` on .sd-card, .sd-list, .sd-radiolist, .sd-box, .sd-input, .sd-search, .sd-logotile and the inline white cards (14).
  - Figma: new effect style `effect/card`, same three shadows. Applied to the card components (PostCard ×3, SkeletonCard, RequestCard, MenuRow, SheetPersonCard, OnboardingCard, DocUpload ×2), the 9 InputField boxes, and the loose white cards on V6 screens (129 on UI Screens, 109 on the prototype page). Those had `effect/elevation-1` or nothing before, so the code and Figma didn't match; now they do.
  - Not lifted: buttons, switches, the tab bar (glass), chat bubbles, action sheets.
- This also fixes the earlier caveat: field edges were under 3:1 against the page. The hairline plus shadow now marks each field.
- Verified on localhost only.
- **Revised:** Devansh: #F7F9FE still read bluish. Page is now neutral/50 #FAFAFA (already in the palette); the card shadow's blue tint is now neutral ink. `brand/blue/25` and its swatch deleted. Fixed Actions fades updated in Figma (4 + 4 frames). Verified on localhost only.

## 2026-09-23 · Fields: white with a 1px grey edge

- Devansh: white fields on the near-white page had no contrast. Looked at Mobbin sign-up forms: on white or near-white pages, apps either draw a white field with a thin grey border (Blue Apron, Superpower, Skip, Stake) or a tinted field with no border (Quizlet, Snoonu). None use a shadowed white box. Chose the bordered field: the crispest edge, and it keeps the page bright.
- Fields and search: white, 1px `border/default` #D1D3D8 inside, no shadow. Focus: 2px blue. Error: 1px red. Same inside a card or box (the grey Filled fill inside boxes is gone).
- Cards, lists and boxes keep `effect/card`.
- Figma: all 9 InputField variants now white + 1px border/default, no effect (error variants keep their red stroke). Loose "Input" frames on V6 screens (4 + 6) lose effect/card and get the border. The Messages search uses InputField, so it follows.
- Trade-off: #D1D3D8 is about 1.5:1 against the page, under the 3:1 guideline for input edges. The label above every field names it, so the field is still identifiable.
- Verified on localhost only.

## 2026-09-23 · Pure white page, filled grey fields (Postmates-style)

- Devansh pointed to Postmates (Mobbin): pure white page, fields filled light grey, no borders, no shadows. Adopted it; replaces the bordered-field step above.
- Page: `background/grouped` → neutral/0 #FFFFFF (code `--sd-page: var(--sd-n0)`). Header glass and bottom fades are white.
- Fields and search: `surface/tertiary` #F0F1F2 fill, no border, no shadow. Focus keeps a 2px blue ring; error keeps a 1px red ring (states need a visible change).
- Placeholder moved to `text/secondaryAA` #636A75: 4.9:1 on the grey fill. The old #6B7280 would be 4.2:1.
- Cards, lists and boxes keep `effect/card`, so white cards still lift off the white page.
- Figma: InputField variants (9), field instances in V6 screens (62 UI Screens + 34 prototype), loose Input frames (6 + 4) and the Fixed Actions fades (4 + 4) updated.
- Verified on localhost only.
- **Field fill is #F3F3F3** (Devansh). `neutral/75` changed from #F2F2F7 (unused since the page went white) to #F3F3F3; new semantic `color/surface/field` points to it and every field binds to it (9 variants, 96 V6 instances, 10 loose inputs). Code: `--sd-n75: #f3f3f3` on .sd-input and .sd-search. Placeholder #636A75 on it is 5.0:1. Colors page swatch updated. Verified on localhost only.
- **Logo mark had the old grey baked in** (Devansh). sidedoor-mark.png carried a #F2F2F7 box that showed on the white page. Made its background transparent (edges and enclosed pockets), in code and in the Figma Logo/SideDoor Mark component. Renamed to sidedoor-logo.png and splash-illustration.png so browsers drop their cached grey copies. Checked the other PNGs: doc-icon and the two role pictures have white or near-white corners but sit on white cards, so they don't show; google-icon.png and sidedoor-word.png aren't used (the app uses the SVGs). Verified on localhost only.

## 2026-09-23 · Cards: a 1px edge, not a shadow

- Devansh: some cards blended into the white page and some had shadows. Cause: they all had the same soft shadow, but its 6% hairline vanished on large cards (role cards, the upload box), while the small Jobs cards showed it. In Figma, 115 card instances (RequestCard, MenuRow, OnboardingCard, DocUpload, SkeletonCard, SheetPersonCard, PostCard) still carried their old elevation-1 shadow as a local override, so Figma and code didn't match either.
- Mobbin on pure white pages: either flat rows with dividers (Glassdoor, LinkedIn, Handshake) or white cards with a thin light-grey border and no shadow (Redfin, Coursera). Chose the border: keeps our card layout, reads the same at every size.
- Code: `--sd-e-card` is now `0 0 0 1px var(--sd-n150)` (#E6E7EB), so every card, list, box and radio group gets the same edge. Fields stay filled #F3F3F3 with no edge.
- Figma: `effect/card` is now one 1px spread shadow bound to neutral/150 (acts as an outside border). The 115 overriding instances were reset to the style.
- Verified on localhost only.

## 2026-09-23 · Warm off-white page

- Devansh: pure white looks cheap; premium apps use a barely-warm off-white. Page is now `stone/25` #FBFAF8 (new palette colour, swatch on the Colors page). White cards keep their 1px edge and now also sit a hair brighter than the page. Fields stay #F3F3F3.
- Code: `--sd-stone-25`, `--sd-page` points to it; header glass and bottom fade use it. Figma: `background/grouped` → stone/25; Fixed Actions fades (4 + 4) recoloured.
- Verified on localhost only.
- **Edge broke at the sides of the reason list** (Devansh). The 1px edge was drawn outside the card; the sheet's scroll area (code) and the clipping "Stages" frame (Figma) cut off anything outside their bounds. Now drawn inside: code uses `outline: var(--sd-edge); outline-offset: -1px` (`--sd-edge: 1px solid neutral/150`) on every card, list, box and radio group; Figma's `effect/card` is a 1px inner shadow bound to neutral/150. Checked the Not moving forward sheet and role cards in both. Verified on localhost only.
- **Green tags blended into the page** (Devansh). Fill moved from success/50 #ECFDF5 to new success/100 #DCFCE7, matching the amber tag's step (warning/100). Text #15803D on it is 4.6:1. Code `--sd-success-100`; Figma `feedback/success/bg` → success/100 (no screen had its own override). Verified on localhost only.
- **Invite and Invited didn't match** (Devansh): Invite was a small outlined button, Invited a grey tag (different height, radius, fill). Now both are the same small outlined button; Invited is its done state: grey label (#636A75), a 14px check, disabled. Code: `SmallButton done` + `.sd-btn.small.is-done`. Figma: new Button variant `Type=Secondary Small, State=Done`; RequestCard's Invited is that button (cloned from Invite so it keeps the 28 height), still driven by `Show invited`. Checked both states in code and on the prototype page. Verified on localhost only.

## 2026-09-23 · Brand-blue icons

- Devansh: use brand blue for icons, and say first where it shouldn't go.
- Rule: blue (#2563EB, new `--sd-icon-accent` / Figma `color/icon/accent` → brand/blue/500) for icons beside a heading or field label (section labels, field labels, "Your rules", "Tips", "Job description"…), menu-row icons, and icons that are actions (open resume, bookmark, copy, the date field's calendar).
- Left as they were, pending Devansh:
  - Icons beside grey supporting text: the clocks by timestamps, the shared-history icons in cards, the location/years/type facts on Job details. A blue icon next to grey text reads as a link and outshouts the text.
  - Chevrons: iOS keeps disclosure chevrons grey.
  - Status marks (error red, waiting amber, success green, the timeline) — colour carries meaning.
  - Icons inside buttons follow the button's label (white on blue, dark on white, grey when disabled).
  - Tab bar: the selected tab is already blue; unselected stay grey so the current tab is findable.
  - Brand logos (LinkedIn, Google, Apple, companies, share apps) keep their own colours.
- Code: 23 icons switched. Figma: SectionLabel and MenuRow components, plus label icons on V6 screens (173 UI Screens, 138 prototype page). Verified on localhost only.

## 2026-09-23 · Liquid Glass tab bar

- Devansh: make the dock iOS Liquid Glass (Mobbin: Luma, Flighty, Crouton). The bar was solid white, so its blur never showed.
- Code: capsule is white at 52% with `backdrop-filter: blur(22px) saturate(180%)`, a bright top rim and soft bottom rim (inset highlights), a 0.5px ink hairline, a 10/30 float shadow, and a top-half specular sheen (::before). The selected lens is rgba(118,118,128,.14) with its own highlight.
- Found and fixed a real bug: the CSS build merged each `backdrop-filter` + `-webkit-backdrop-filter` pair into the -webkit- one alone, which Chrome ignores, so no glass in the app (tab bar, header, bar buttons, toast) ever blurred in Chrome. Now only the standard property is written; the build adds the Safari prefix itself. Checked: computed backdrop-filter is blur(22px) saturate(1.8) and content blurs under the bar.
- Figma: TabBar (V6) capsules (8 variants) fill surface/primary at 52% over the existing Glass effect, 0.5px hairline; the selected pill is the same grey glass. 52 + 68 screen instances had the solid fill as an override; reset.
- Verified on localhost only.

## 2026-09-23 · Icons coloured by meaning; card edges fixed in Figma

- Devansh: not one blue for every icon — each takes a colour that fits it; and metadata icons were still grey. Replaced the brand-blue rule with tones (iOS Settings-style), all 3:1+ on white:
  - red #EF4444: location pin, flag · orange #EA580C: calendar, clock, hourglass · brown #B45309: briefcase · amber #D97706: lightbulb · green #16A34A: message bubbles · indigo #4F46E5: building, laptop · blue #2563EB: person, mail, link, document, folder, info, open, bookmark · grey #6B7280: settings, lock, paperclip.
  - Now includes the clocks by timestamps, the Job details facts and the shared-history icons.
  - Still not toned: chevrons, status marks, icons inside buttons and tags, tab bar, brand logos.
  - Code: `TONE` map in Icon.tsx, `color="tone"`; `--sd-tone-*`. Figma: palette orange/600, amber/600, success/600, indigo/600; semantic `color/icon/tone/*`; icons recoloured by component name (prototype page + 326 on UI Screens). `color/icon/accent` marked deprecated.
- **Some Figma cards showed no edge** (Devansh: "From your resume", Projects). The inner-shadow edge only draws on frames that clip content; those Box frames didn't. Turned clipping on for every effect/card frame (47 UI Screens, 34 prototype page). Code already had the edge on these boxes.
- Verified on localhost only.
- **Revised: every decorative icon is brand blue** (Devansh, after seeing the per-meaning tones and four options side by side: grey, blue, soft tones, tinted tiles). Blue #2563EB now covers label and heading icons, facts, timestamps and actions. Unchanged: chevrons, status marks, icons inside buttons and tags, the tab bar, brand logos. Code: Icon `color="tone"` → `--sd-icon-accent`; the TONE map and `--sd-tone-*` are gone. Figma: `color/icon/accent` and all `color/icon/tone/*` now alias brand/blue/500, so every recoloured icon follows. Verified on localhost only.
- **Login illustration synced from Figma** (Devansh updated it in the Illustration/Splash component). Pulled the component's source image (1183×1330, transparent) into the prototype as login-illustration.png (new name so browsers don't show the cached old one); the old splash-illustration.png is removed. Verified on localhost only.

## 2026-09-23 · Share sheet: 2026 app marks

- Devansh approved downloading. From Wikimedia Commons: `Gmail icon (2026).svg` and `Google Drive icon (2026).svg` (Google's May 2026 gradient icons), `WhatsApp Logo green.svg` (the flat green mark), `Telegram logo.svg` (no 2026 change found). Scanned: plain SVG, no scripts or external links. Trademarks of their owners; used only as share targets in a concept prototype.
- Code: share sheet uses whatsapp-2026, gmail-2026, gdrive-2026, telegram-2026 (.svg), sized 36/34×27/32×29.6/36.
- Figma: the four Logo/* components now hold the new marks, resized to the size their instances use (40, 34×25, 32×29, 33). Drive's SVG mask didn't import into Figma (the artwork vanished), so Drive is a 256px PNG rendered from the same SVG. Checked the share row in both.
- Verified on localhost only.
- **Share row fixes** (Devansh): Drive was clipped at its bottom corners and WhatsApp looked larger. The Commons Drive SVG's mask box was a hair narrower than its rounded triangle; widened the mask and added a small viewBox margin (renamed google-drive-2026.svg to drop the cached copy). WhatsApp mark 36 → 32. Figma: Drive PNG re-rendered from the fixed SVG; WhatsApp mark 32.
- **Order is now LinkedIn, Gmail, Drive, WhatsApp, More; Telegram removed** (Devansh). LinkedIn uses our own logo file with colours swapped for the app-icon look (#0A66C2 square, white "in"), as linkedin-app.svg. Figma: new Logo/LinkedIn component; the two V6 share rows (prototype page, UI Screens V6) reordered with the Telegram tile turned into LinkedIn. The V2/V4/V5 rows were left as history; Logo/Telegram stays for them.
- **Verified tick vs "Selected" tag** (Devansh asked): same colour, `text/successAA` #15803D, in code and Figma.
- Verified on localhost only.
- **Amber tag quieter** (Devansh: "too poppy, make it as subtle as the green and blue tags"). warning/100 #FEF3C7 → #FDF4DE, in code and Figma (variable + swatch). Text #92400E on it is about 7:1. Checked next to the green tags on Your referrals. Verified on localhost only.
- **Glassdoor circle green didn't match** (Devansh). The V6 Figma screens had it at text/successAA #15803D (the verified tick and success-tag green, darkened in the audit for 3:1), while the CompanyLogos component and the code SVG were still success/500 #22C55E. Now #15803D everywhere; the "g" mark is white (as in Glassdoor's own logo), since the dark mark on the darker green was under 2:1. Code: rating-sources.svg (renamed from rating-logos.svg to drop cached copies). Figma: component + 26 UI Screens + 8 prototype-page instances. Checked the rendered pixel is #15803D. Verified on localhost only.

## 2026-09-23 · List cards: one type rhythm

- Devansh: card text looked cluttered (many sizes, uneven gaps). Measured the job card: sizes went 16 → 14 → 12 → 14 → 12 (the tag jumped back up), every gap was 4px so nothing grouped, and supporting lines mixed Medium weights and two greys.
- New rule for every list card (`ListCard` in ui.tsx, `.sd-lc` in app.css) — jobs, requests, suggested people, your referrals, the chat's referral bar:
  - Text block with no internal gaps: title 16/24 SemiBold · detail lines 14/20 Regular #636A75. The time is 13/24 Regular grey, level with the title, no clock icon.
  - One 12px gap, then a single row of chips that runs the full card width (so two chips fit on one line). Actions like Update sit at the far end of that row.
  - Shared-history lines ("Both worked at MakeMyTrip") are now a quiet grey chip (#F3F3F3), so the bottom row is chips only.
- Every tag in the app is now the same chip: 24 tall, 12/16 Medium, r6, 12px mark (was 22 tall, 14/20, r4). Notes are unchanged.
- Post cards: the "Live · Job ID" line is 14/20 Regular like other detail lines.
- The clock icon is gone from timestamps on Job details and Track details too, for one timestamp style.
- Verified on localhost only.
- **Figma synced for the list-card rhythm.**
  - Tag component: every style 24 tall, 12/16 Medium (bound to label/sm), padding 4/8, `radius/component/tag` 4 → 6; the Plain style is now the grey #F3F3F3 chip.
  - RequestCard and ReferralBar (both variants) rebuilt: top row (lead 44 · head with title and time · detail lines, no gaps) → 12 → full-width chip row; Update sits at the end of the chip row. Screen overrides (names, logos, tags) carried over.
  - Loose job cards on V6 Jobs screens rebuilt the same way (9 prototype page, 12 UI Screens); the shared-history tag switched to the Plain chip.
  - Timestamps: clock icon removed and time set to 13/24 Regular grey (13 + 13 places).
  - PostCard: detail line 14/20 Regular, tight under the title, 12 before the activity row.
- Chip gap is 6 in both (was 8 in code): Figma draws text a few px wider than the browser, so at 8 the first job card's two chips wrapped in Figma but not in code.
- Code: removed the role line I had added to "Your referrals" cards; Figma never had it, and the ask was to change layout, not content.
- Verified on localhost only.

## 2026-09-23 · Invite asks first
- Devansh: inviting a candidate can't be undone, so ask first, the way an iOS app would.
- **Chose the iOS centred alert, not an action sheet.** It asks one yes/no question about something the person just tapped. The action sheet stays for Log out.
  - Title "Invite Shreya?". Message: "Shreya will be asked to send you a referral request for this job. You can't undo an invite."
  - Buttons: Cancel, then Invite (bold, on the right, as iOS does for the default action).
  - 270 wide, r16 (`radius/16`), white. 20/16 padding, title 16/24 SemiBold, message 14/20 grey, 44-tall buttons, subtle dividers. 40% scrim.
  - Tapping the scrim does nothing. You must pick a button, as on iOS.
- Code: new `Alert` in ui.tsx and an `invite` entry in the sheet registry. Invite opens it; only the Invite button in the alert marks the person invited.
- Figma (V6 page):
  - New "Referrer/Invite Alert" frame: a 390×844 scrim with the alert in the middle. It's a frame because the API can't set an overlay's dim background.
  - New "Referrer/Referral Requests Screen/Invited" frame: Shreya's button swapped to the Done variant.
  - Invite on the three screens that show it opens the alert as an overlay. Cancel closes it; Invite goes to the Invited screen.
- Verified on localhost only: Cancel leaves "Invite"; Invite turns it to "Invited".

## 2026-09-23 · Seen it move: pick, then Update
- Devansh: the tick colour was off, and the sheet should update only after they pick and press a button. No "No change yet"; close with an × or by tapping outside.
- **Tick:** a copied portal detail turned its icon into a green tick. It's now brand blue like every other icon. The sheet's selection tick was already blue. Figma has no "copied" frame, so this is code only.
- **Sheet (code + Figma):**
  - Tapping a stage only moves the tick.
  - New primary **Update** button at the bottom: disabled until they pick a stage other than the current one. Update does what a tap did before (5-second undo toast, then the candidate is told).
  - "No change yet" removed.
  - New iOS close at the top right: a 30 grey disc (rgba(118,118,128,.12)) with an × in icon/secondary, level with the title. The tap area is 44.
  - Tapping the dimmed area still closes it.
  - "One tap." cut from the question, since it is two taps now.
- The "couldn't update" state now opens with In interviews picked and Update live, since the error is what you see after pressing it.
- Figma:
  - RadioOption got a "Show Detail" boolean, so "12 days ago" stays under Submitted whichever row is selected. Before, the date lived only in the Selected variant.
  - New frame "Update Sheet/Seen It Move/Picked". Tapping In interviews on the sheet swaps to it; its Update closes the sheet and goes to "Your Referrals Screen/Updated".
- Verified on localhost only.

## 2026-09-23 · iOS consistency pass (11 fixes + 2 found on the way)
Devansh asked what still wasn't iOS-like or consistent, then said to fix all of it and keep "Let referrers find me" in Settings only.
1. **Closing a sheet:** every sheet now has the grey × at the top right. Not moving forward, Share your link, Date of birth and Add your resume lost their Cancel / Not now buttons. Titles get 40 on each side so the × never touches them. Tapping the dim still closes.
2. **Header time:** "Sent today" on the Referral request header was a grey tag. It's now plain grey text on the name line (13, text/secondaryAA), like the list cards. Figma PersonRow got a "Show time" + "Time" property. Status tags (Referred, Not moving forward) stay tags.
3. **Time placement:** in Notifications the time moved from under the text to the top right, with the unread dot under it, as in Messages. This is the NotificationRow component.
4. **Time style:** Messages list times now use the same 13 Regular grey as the cards (they were 12 Medium).
5. **"Let referrers find me"** is only in Settings. The Profile card with the Live tag is gone, in code and in both Figma Profile frames. "Profile Screen/Paused" now looks the same as "Profile Screen".
6. **Chat card:** in code it said Sent while Nithin writes "I've submitted it". It now shows at least Submitted. Figma already said Submitted.
7. **AM/PM:** "3:31 pm" → "3:31 PM" everywhere, in code and Figma.
8. **Errors and empty screens** now use one iOS ContentUnavailableView-style block, centred:
   - A 44 mark (icon/accent; errors use a red info mark), then 16, a title at 20/28, then 4, one line at 14/20 grey, then 24 to the action.
   - Errors say "Check your connection and try again." with a secondary **Try again** button instead of "Pull down to try again."
   - New titles were added; the old sentences became the body line.
   - Figma: a new EmptyState component (Patterns V6) and a new SF/checkmark.circle.fill, used in the 5 V6 frames that exist: Track couldn't load, Requests couldn't load, Requests empty, All handled, Your referrals empty. The other empty screens exist in code only; Figma has no frames for them.
9. **Chevrons:** list-row › is now 16 and light grey (neutral/400), as iOS draws it. It was 24 and dark. This covers the MenuRow component and the three Profile frames.
10. **Chat times:** no time under every bubble. A small centred "Today 3:10 PM" opens the chat and any run of messages 15+ minutes after the last. ChatMessage lost its Time property.
11. **Composer:** iMessage style. A grey capsule field with a 30 circle send button inside its right end and an up arrow. The button is grey until there is text, then blue. The ChatComposer component was rebuilt.
- **Found on the way (a):** the tab bar icons differed. Code had Jobs = briefcase, Requests = tray, Posts = grid; Figma has Jobs = grid, Requests = paper plane, Posts = briefcase. Code now follows Figma (Figma is the source of truth).
- **Found on the way (b):** the code's "Add your resume" sheet had drifted from Figma (different title, copy and button). The code now matches Figma: "Add your resume to ask Nithin", the portal line, the same upload box as onboarding, and the "Saved for your next requests too" tag. It's added to the prototype's Sheets list.
- **Slip, fixed:** removing "Not now" in Figma also deleted that tag, because they shared a frame. I rebuilt it.
- Verified on localhost only.

## 2026-09-23 · UI Screens page caught up
- Devansh: the Profile frames on UI Screens still showed the toggle. **I had edited only the 🔗 V6 Prototype page** and missed 9 changes across ~28 frames on UI Screens (the V6 sections). Component edits had reached both pages; frame-level edits had not.
- **New rule (Devansh): always change UI Screens.** He shows the prototype in code, not Figma, so UI Screens is the Figma deliverable and Figma click-through wiring isn't needed.
- Done on UI Screens:
  1. Profile ×2: the "Let referrers find me" card removed.
  2. Referral Request ×4: "Sent today" / "Sent 2 days ago" as a plain time on the name line.
  3. AM/PM in 11 texts.
  4. Messages list times ×8 at 13 Regular grey.
  5. Chat ×2: centred "Today 3:10 PM" / "Today 2:10 PM" over the first run.
  6. Sheets: × on Not moving forward, Share your link, Date of birth and Add your resume; Cancel / Not now removed. The "Saved…" tag got back its grey chip fill (the instance had none; code shows the chip).
  7. Seen it move ×2: ×, question without "One tap.", Update button (grey / blue), Submitted keeps its date.
  8. Empty/error ×7 now use the EmptyState component, including Jobs couldn't load and Messages couldn't load, which exist only on UI Screens.
  9. New States-grid frames (the 3 free cells): Referral Requests + Invite alert, Referral Requests / Invited, Seen It Move / Picked.
- A re-run of the audit finds nothing left. Remaining Cancels are intended: the Log out action sheet, the Invite alert, and the link page's "Not now".

DECISION · 2026-09-23 · Two-page check and Paused profile removed
- Checked all 82 V6 Prototype frames against UI Screens: text, shown/hidden items, components, colours, borders, radius, text styles. Nothing from this chat is missing on UI Screens. Size and spacing can't be compared (402 vs 390 wide).
- 3 small differences, all with UI Screens ahead: dark back chevron (code matches), AA grey on "12 days ago", text style on the "Saved…" tag.
- Deleted "Candidate/Profile Screen/Paused" on both pages. Once the "Let referrers find me" card left Profile, it was identical to "Candidate/Profile Screen". Its only Figma link went with it. The code had no matching scenario, so no code change.

DECISION · 2026-09-23 · Prototype made ready for usability tests
- 12 jobs (Flipkart, PhonePe, Google, Sarvam AI, Meta, Blinkit, CRED, Microsoft, Zepto, Zomato, Groww, Razorpay) and 14 candidates asking Nithin. All in `components/sidedoor/data.ts`. Figma's 3 jobs and 5 candidates keep their V6 content.
- Each job banner uses the company's brand colour with its logo in white. Flipkart moved from our action blue #2563EB to its brand blue #2874F0, in code and on UI Screens (4 Job Screen banners, instance overrides only; V2–V5 untouched).
- Logos: Zomato came from Figma's own Logo/Zomato. Microsoft's four squares are drawn in code. Sarvam AI's mark is a stand-in wordmark on a blue-to-orange gradient (their brand page describes that gradient); no official file downloaded.
- Any job can be asked, sent and tracked. Flipkart stays the one request both sides share.
- Tap an empty field and it fills with test data. Tap a blank spot and the next thing to tap blinks blue. Testing aids only, not product design, so not drawn in Figma.
- Edit now works everywhere: details save; Experience and Projects edit each item (name, skill tags with ×, one-tap skill ideas, description), add and remove. Edits reach the referrer's view of Abhinav's request.
- Also made real: posts pause/resume and drafts post; Save shows a toast; chats per person with a reply; LinkedIn/Dribbble/Behance open a preview; resume preview per candidate; saved jobs list all saved.
- Still to draw on UI Screens: the Projects "editing" state (not in Figma yet).
- Verified on localhost (preview needs a login).

DECISION · 2026-09-23 · Follow-ups Devansh approved
- Sarvam AI: its official white and black wordmarks (sarvam.ai/brand, 3 KB SVGs each) replace the stand-in. White sits on the blue-to-orange banner; black is the tile logo.
- Testers start with 5 of 5 requests, so they can send to several jobs. Figma draws "2 of 5", and the state list still opens on 2.
- New UI Screens frame: "Candidate/Your Profile From Your Resume Screen/Projects Editing" (5711:30311, V6 · States Flow). Each project shows Remove, name, skill tags with the library's xmark.circle.fill, one-tap skill ideas, and a 100-tall description; "+ Add a project" at the foot. Code now matches it: xmark.circle.fill on chips, Remove in text/error, 3-line description box.
- Verified on localhost (preview needs a login).

DECISION · 2026-09-23 · Test hint no longer points at Edit/Done
- On "Check your job post" a tap on a blank spot kept ringing Edit, then Done. The Job ID's "*" sits on its section title, not the field, so the hint missed the empty required box and fell back to Edit/Done.
- Required boxes now carry their own marker, so the hint finds them wherever the "*" is. Edit and Done are optional and are never ringed.
- Checked: blank tap rings the empty Job ID (also while editing), a tap fills 184223, the next blank tap rings Post job. Verified on localhost.

DECISION · 2026-09-24 · Tester feedback fixed, and three brief ideas built
- Copy link: it copied nothing and the sheet stayed open, so the hint kept pointing back at it. It now copies the message with the link, says so, and closes. Quick share tiles copy too.
- Blue hint: it drew outside the element, so scrolling lists and rounded groups cut it off. It now draws inside the box. On a blue button it is a dark edge with a white line.
- Request cards (Your referral requests, chat top): the tag sat under the logo, with a gap under the name. Now the logo is centred on the left, and the text column holds the company and time, "job · who you asked", and the tag. Code and UI Screens: new component "ReferralBar V6" (5717:830); the 22 V6 Logo cards swapped to it. The old ReferralBar still serves V2–V5 (112 instances), so those are untouched.
- Google banner: the real four-colour wordmark on white, not a white wordmark on blue. Code only; Figma has no Google job screen.
- Switch role: it swapped sides with no warning. It now asks first, says what the other side is for, and says who you become in this test (Abhinav ↔ Nithin).
- Built from BRIEF.md, Other routes, and n74:
  1. **Withdraw.** A Sent request has "Withdraw request". Withdrawing gives the request back and removes it from Nithin's list. New "Withdrawn" stage (grey).
  2. **The limit, before the ask.** Job details says "Uses 1 of your N requests left this week". At 0, Ask is off: "They come back on Monday." (Idea 3; before this it only showed on Check your request.)
  3. **Already referred at this company.** Riya: people can't reapply for 6 months and don't know when they can (n74). If you were referred there this month, the job says so and names March. If a request there is still waiting, it says you may be referred twice. A warning, not a block, because the rule differs by company.
- UI Screens: Track Details Screen/1 has the Withdraw button and the new line. The Job Screen and Skipped Resume state have the requests-left line. 4 new States frames: Track/Withdraw Alert, Track/Withdrawn, Profile/Switch Role Alert, Job Screen/Referred Before.
- Checked, already built, left as is: request limit on Send, "Heard from the company? Mark it", Not moving forward reasons, Seen it move?, Undo, No answer after 7 days, Lower match collapsed, referrer's rules, "full this week", Suggested for this job, link page, Himani's thank-you.
- Not built, on purpose: V1 "Share Sidedoor" after thanks (growth, not a pain from the research). T6 3-day nudge (a notification, not a screen).
- Photos: 19 people still show initials. Figma has no more portraits (all 17 are in use). Waiting on Devansh before downloading any.
- Verified on localhost (preview needs a login).

DECISION · 2026-09-24 · Photos for everyone
- Devansh chose stock photos (option B) over AI faces or initials.
- 19 portraits from Unsplash (free licence, no Unsplash+ images), 176×176, cropped to the face. 9 men, 10 women, matched loosely to each person's role and seniority. Photographers credited in `ui.tsx` beside the PEOPLE list.
- Aditya first got the same photo Rohit already uses (Abhishek Rai); swapped for a different one.
- Code only. These people are prototype data, not in Figma.
- Checked on localhost: every avatar on Jobs and on Referral requests shows a photo, none broken.

DECISION · 2026-09-24 · Switching role keeps the same person
- Devansh: "person won't change, only role will change", so the person who refers can ask for referrals and the other way round.
- Before, Switch role swapped people (Abhinav ↔ Nithin) so one tester could send a request and then refer it. That demo is gone on purpose: real people don't become someone else.
- Now the first side you pick decides who you are: candidate = Abhinav (Product Designer, Blinkit), referrer = Nithin (Design Manager, Flipkart). Switching keeps you.
- Each side follows you: name, photo, company, post (Abhinav posts "Product Designer · Blinkit", BLK-802), link (sidedoor.app/r/abhinav-saxena), share message, portal name, work email, resume, and the note that autofills. Nithin got his own candidate profile (Flipkart, MakeMyTrip, two projects).
- You never see yourself: no request from you in your referrer list, and no chat or notification with yourself. Jobs and requests at your own company are hidden, because you don't ask for a referral where you already work. (This also removed the Blinkit job from Abhinav's list, which was a bug.)
- The other side counts as set up when you switch: the resume is read, the work email checked, the post live.
- Figma: the Switch Role Alert frame now says "You'll see referral requests for jobs at Blinkit… Your requests stay as they are." No other frame changes. Figma draws the referrer as Nithin and the candidate as Abhinav, which is still what you get if you start on that side.
- Prototype page intro updated.
- Checked on localhost, both ways: Nithin → candidate (no Flipkart job or request, no self-chat, his profile); Abhinav → referrer (Blinkit post, no request from himself, his link in the share sheet).

DECISION · 2026-09-24 · Finishing onboarding feels like arriving
- Devansh: after "See jobs" the next screen came in abruptly, and on the referrer side sharing the link left you stuck on "Job posted" (only "Share later" took you in).
- New transition, used only for onboarding → app: the last onboarding screen fades, the app rises into place (560 ms), and the tab bar follows 260 ms later. Coming back from a pushed screen doesn't replay it. Reduced motion turns it off.
- New one-time card on your first tab, fading in once the screen lands:
  - Candidate, Jobs: "You're all set, Abhinav. Your details are ready, and every referral request uses them. Pick a job to ask."
  - Referrer, Referral requests: "Your job is live, Nithin. Requests for Interaction Designer land here, best match first. Your link is in Profile any time."
  - It goes away when you close it or open a job or request.
  - Not a separate "done" screen, which PRODUCT_REVIEW C3 cut as a tap with no value.
- Referrer: sharing from "Job posted" (Copy link or any share tile) now closes the sheet and takes you in. "Share later" does the same.
- Two new jumps in the state list: "Candidate · end of sign-up" and "Referrer · job posted".
- Figma, V6 · States Flow: new frames "Candidate/Jobs Screen/Welcome" and "Referrer/Referral Requests Screen/Welcome", with the card built from the "Heard From The Company" card style and the library's checkmark.circle.fill. The motion is code only.
- Checked on localhost: both paths show the app rising in, the old screen fading and the bar rising; the card appears; after Copy link the referrer lands on Referral requests.

DECISION · 2026-09-24 · Requests come in after the job is posted
- Devansh: the referrer has only just posted, so the requests shouldn't already be there.
- After "Post job", Referral requests starts empty ("No requests yet", your link, Copy link) with the "Your job is live" card. 5 s after landing (0.9 s load + 4.1 s), the requests come in: the cards fade up one after another, and a toast says "14 referral requests came in".
- Only after a fresh post. The "Referrer · job posted" jump counts as one. Every other way into the list shows it as before.
- Figma, V6 · States Flow: new "Referrer/Referral Requests Screen/Just Posted" (the Empty screen plus the welcome card). The Welcome frame is the moment after the requests come in.
- Known mismatch, not changed: 14 requests arrive although the post's rule says 10 a week. The list has always shown 14.
- Checked on localhost: the list is empty at 1.5 s, and the cards and toast appear at 5.1 s.

DECISION · 2026-09-24 · 14 requests a week, and a no gives it back
- Devansh: 5 a week felt too few for job seekers to bother with the app. Asked for 14.
- Why a limit at all: not spam (neither interviewee described it, n19 n61). It keeps a request worth answering, and the pitch is "your requests get answered", not "send more". Referrers are also protected by their own weekly cap, one request per job per referrer, and Lower match.
- Built:
  1. 14 a week (`WEEKLY_REQUESTS` in store.tsx). No daily cap.
  2. A request comes back when the referrer says "Not moving forward" or the role closes, as well as when it is withdrawn or gets no answer in 7 days. Track copy: "Reason: …. Your request is back."
  3. Being referred earns one extra that week, so the week can go to 15 of 15. Track copy on Referred: "You got one extra request this week."
  4. The reason sits next to the count on Job details: "Uses 1 of your N requests left this week. Referrers answer because each one is chosen."
  - Suggested requests still don't count (already built).
- The jumps in the state list now start with the full 14, not Figma's old "2 of 5".
- Figma, V6: 11 texts updated. 3 Job screens (the new line), 2 Check your request ("14 of 14"), Suggested ("one of your 14"), Track 2 (the extra), Not Moving Forward and Role Closed (the request comes back).
- Limitation: since switching role keeps the same person, nobody can refer or decline Abhinav during a session. So the "comes back" and "+1" rules are in the store and the copy, but a tester can't trigger them live.
- Checked on localhost: Job details "Uses 1 of your 14…", Check your request "14 of 14", none-left note, Not moving forward copy.

## 2026-09-24 · Related skills, on both sides

- Devansh asked what referrers check, in order, then said interviewees talked about transferable skills and matching. "Build whatever should be there."
- What the notes show: skill match is strong. Samarth as referrer needs "at least a 50% to 70% skill match", and experience is "non-negotiable" (n50); both wanted a match score (n23, n65). As a candidate, Samarth said past impact and outside projects should count too. "Transferable skills" is not in the notes, and the referrer said experience should not come "from a completely different domain". One referrer only, so this is a small base.
- Already in the app, so not rebuilt: LinkedIn next to the resume, results in projects, notice period and city, the 6-month note (n74).
- Built: a third group in the match, "Related". A skill the resume shows only in a nearby form (Design system ← systems design on the Blinkit merchant app; A/B testing ← the A/B test on MakeMyTrip checkout).
  1. Referrer, One request: related rows sit after experience, before missing. Outlined check, plain name, the reason under it. They don't count in "4 of 7": the referrer decides.
  2. Candidate, Job details: a "How you match" block under the tags. In your resume / Related / Missing, plus "Say where you used related skills in your note". Hidden when the resume was skipped.
- Rejected: counting related skills in the tag (it would inflate the number the referrer trusts); expected level and a "can vouch" person (not in the research); salary (too sensitive).
- Figma, V6: MatchRow gained Status=Related (5729:31903). 3 request screens updated (Explore, Skill Removed, Profile Updated). 4 Job screens got the block (Job Screen, Referred Before, Already Asked, Suggested By Referrer). The job Card is shared with V2–V5, so only the 4 V6 copies were detached; V2–V5 untouched.
- Checked on localhost: both screens show the three groups (Vercel preview needs a login).

## 2026-09-24 · Proof links in projects, the 6-month fact, the match icon

- Devansh: "the things we discussed like achievements, u skipped them?" I had. Results with numbers were already in project details, but outside work and proof weren't. Devansh chose: a link inside each project ("proof of work there itself") and the 6-month fact. Not building expected level or "can vouch" (not in the research).
- Devansh: the "How you match" icon was the lightbulb, the same as "Tips from the referrer", and it was grey in Figma. Now a blue check-in-circle, which matches the "4 of 7 skills match" tag. (Referrer's "How they match" keeps V6's lightbulb: there is no tips block on that screen.)
- Built:
  1. Every project can carry a link (case study, repo or live product), shown under the title in link blue. Tapping it opens the link page. Profile editing gained "Link to the work (optional)". Abhinav's and Nithin's projects have links, and so do most candidates (one GitHub repo for the open-source NeoPOP work).
  2. Referral request: under the city, years and notice line, "No Flipkart referral in the last 6 months" (from Sidedoor's own referrals, Riya n74). When there was one, a warning note replaces it: "Referred to Flipkart on 12 May. Most portals won't take another referral until 12 Nov." The state list has "One request · referred here in 6 months" (forced on Abhinav, so it matches the Figma frame).
- Figma, V6: a new ProjectRow V6 component (5733:31272, with Link and Has link properties). The old ProjectRow is shared with V5, so only the 12 V6 copies were swapped. Project Details got the link line, and Projects Editing got the link field. The 3 request screens got the 6-month line. New States frame "Referrer/Referral Request Screen/Referred Here Before" (5733:43591). The How you match icon was swapped on the 4 Job screens.
- Checked on localhost (Vercel preview needs a login): the links open the project page and sit left-aligned, both 6-month states render, and the icon is blue.

## 2026-09-24 · Fix: check icon and 6-month line in Figma

- Devansh caught two Figma bugs I had missed ("why are u not checking things properly"):
  1. The SF/checkmark.circle.fill component has a 1px black stroke, and on the Job screens I had given it a grey colour variable. It showed as a grey circle with a dark outline. The same broken icon was on the 3 "You're all set" welcome cards from earlier. All 10 now use Progress/Step Filled Primary, the blue check the match rows already use (no stroke).
  2. On the request screens, the "No Flipkart referral in the last 6 months" text was cloned with FILL width and centred, so it sat far from its icon. Now it hugs and is left-aligned, gap 4, like the other facts.
- Checked by numbers, not screenshots: all 10 icons are blue with 0 strokes, and the icon-to-text gaps match the code (8 block header, 4 fact, 12 welcome). Link rows, the Related icon and the warning note were checked the same way. Figma only; the code was already right.

## 2026-09-24 · 6-month answer, and the referral request rebuilt for trust

**6-month fact, made honest** (Devansh: "what does it mean and how will Sidedoor know it?")
- Sidedoor only sees its own referrals, so "No Flipkart referral in 6 months" could be wrong. There are now two sources, and the line always names its source.
- "Check your request" asks, per company and required: "Referred to or applied at Flipkart in the last 6 months? No / Yes / Not sure". It isn't in the portal block because that block says "saved for your next request", and this answer is per company.
- Referrer sees one of three things:
  - "Says no Flipkart referral in 6 months" (their answer);
  - Sidedoor's own record: "Referred to Flipkart on 12 May. Most portals won't take another referral until 12 Nov.";
  - for Yes or Not sure: "May have been referred to Flipkart recently. Check with them first."
- The portal fields gain "Referred in the last 6 months".

**Referral request rebuilt** (Devansh: "looks cluttered… show info in order of priority… filled and unfilled icons confusing… what does 'tap a skill' mean?"). The order is now the order a referrer decides in:
1. Who they are: a seal by the name when their work email is verified.
2. What would stop it: city, years, notice, the 6-month line.
3. Fit for the role: years against your minimum, then skills in plain groups instead of icons. The groups are "Shown in their work" (one line each, company on the right), "Related", "Claimed, no proof" and "Missing".
4. Your question, and their answer.
5. Projects: title, Vercel link, result. Skill tags removed.
6. Experience.
7. Résumé and links.
8. Trust: work email verified, Sidedoor track record, common ground (moved down from the top).
9. Their note.
10. Refer / Not moving forward.
- Removed: the work-type tags, and "Tap a skill that isn't really there" with its state. With claimed skills never counting, a referrer doesn't need to strike skills out.

**Built from the "stop gaming the match" list, options 1, 2, 5, 6**
1. Only skills a job or project shows count. A skill that is only listed is "Claimed, no proof", shown but never counted. Abhinav lists AI-assisted design and it doesn't count. His Job details and "Check your request" show the same groups, with "A claimed skill counts once a job or project shows it".
2. Candidates can verify their work email (Profile → Where you work: email, code, then "Verified at Blinkit"). Referrers see the seal and "Work email verified at Blinkit"; unverified is neutral ("Work email not verified").
5. The referrer sets one question on the post ("Check your job post" and "Edit post"; Nithin's: "Tell us about a trade-off you made in a checkout or payment flow."). Candidates answer it on "Check your request" (required when set), and the referrer reads it under Fit.
6. Track record: "Referred 2 times on Sidedoor · 1 reached interviews", from referrers' own status updates. New people see "No referrals on Sidedoor yet".
- Not from research: 2, 5 and 6 are my own design calls; the interviews don't cover them. Option 1 rests on n50/n65 and candidate 1's "impact and outside projects".

**Other**
- Project links moved from Behance/Dribbble to Vercel (Devansh: people build and host on Vercel now). The open-source NeoPOP link stays on GitHub.
- Multiline fields grow with their text (min 100), so a long answer is read whole.
- The thin "Not enough to judge" screen uses the same blockers group and "Fit for…" heading, and drops the tags.
- The typecheck had been silently stopping at a broken generated file in .next. It now runs against components and app only, so earlier "types pass" claims were not real checks until now.

**Figma, V6**
- Request screen rebuilt: 5247:18762. States rebuilt from it: Profile Updated (5742:31334) and Referred Here Before (5742:31491). Added May Have Been Referred (5742:31653). Deleted Skill Removed.
- Six "Check your request" screens: the 6-month question block, the skill groups, and Nithin's question. The count went 4→6 (5→6 on the base, 3→4 on Field Error).
- Four Job screens: skill groups and the claimed note.
- Two post screens: the question field.
- After refer ×2: the portal field.
- Thin screen: blockers, fit heading, no tags.
- MenuRow gained an optional Detail text. The Profile ×2 row reads "Where you work · Not verified".
- New screens: Candidate/Where You Work Screen (5747:41683) and /Code Sent (5747:41835).
- All V6 project links are now on Vercel.
- Checked by numbers: gaps 24/12/8/16, text heights on 16/20 line multiples, the seal bound to successAA (#15803d), like the code.
- Checked on localhost (Vercel preview needs a login): every state list entry opens without errors; the request order and groups; the question, verification and 6-month states.

## 2026-09-24 · Login lines 2 and 3

- Devansh: keep "Get referred by insiders"; make lines 2 and 3 say what the product stands for (quality, curated, no spam).
- Now: 1 "Get referred by insiders" (who you reach) · 2 "Matched on proof, not keywords" (fit comes from work shown, not skills typed in) · 3 "Fewer asks. Real answers." (the 14-a-week limit, and referrers answer because each ask is chosen).
- Replaced: "Refer someone in minutes" (referrer-side, off the candidate pitch) and "See where your request got to" (a feature, not the promise).
- Avoided "AI" in the copy: the matching is the proof rule, and "AI-curated" would promise a black box the product deliberately isn't.
- All three fit one line at 306 wide (checked on localhost). Figma's login frames show only line 1, so no Figma change.

## 2026-09-24 · Proof you can't type in, and one type rule on the request

- Devansh: tagging skills on your own projects is still a claim, so it can be gamed. Chosen: **Sidedoor reads the link**. A skill counts only when their linked project page or resume shows it; the referrer taps the skill and sees the line Sidedoor read, with the link to check it.
- Honest limit: this raises the cost of faking (you need real, specific work behind each skill), it doesn't make faking impossible. The interview is still the last check. The prototype's found lines are written by hand (`FOUND` in data.ts).
- Groups renamed: "Found in their work", "Related", "Listed only" (was "Claimed, no proof"), "Missing". Candidate side says "Found in your work" and "A listed skill counts once your linked work or resume shows it". The project link field says "Sidedoor reads it to check the skills you tagged."
- Fit section rebuilt as an iOS list inside the card: 12/500 grey uppercase group headers, 44-tall rows (skill 14/600, where 14/500 grey, chevron), hairlines, one grey footer line. Was: four different row styles and two-line rows.
- New sheet: the skill, "Found on their project page" or "Found in their resume", the project or job, the line in quotes, the link.
- Years below the ask moved to the blockers as an amber note. The years sentence is gone from Fit.
- "Trust" was an odd heading. Now "Checked by Sidedoor" (seal icon); the work-email row uses an envelope in the same blue as every other row icon.
- Type rule on the request: 16/600 for things (people, projects, jobs), 14/600 for section labels and skills, 14/500 grey for every secondary line, 14/400 dark for the candidate's own words (answer, note, project detail), 12/500 grey only for dates, group headers and footers. Fixes: question prompt 12 → 14/500; note and project detail grey → dark; company under a job 12 → 14/500 (the role table says subtitles are label/md).
- Login line 3 lost its full stop: "Fewer asks. Real answers".
- Referrer's question: set on Create post / Edit post ("One question for candidates"); the candidate answers it when sending. No change.
- Checked on localhost (Vercel preview needs a login): the list, both sheets (found and related), the link opening the project page, the lower sections, candidate "How you match" wording.
- Figma (UI Screens, V6): Fit rebuilt as the list on the request screen and its three state copies (Profile Updated, Referred Here Before, May Have Been Referred): uppercase label/sm headers, 44-tall rows, heading/xs skill, label/md grey source, 16 chevron in the MenuRow grey, 0.5 border/subtle hairlines, footer line. "Trust" → "Checked by Sidedoor" (seal), work-email row → envelope in tone blue. Question → label/md, gap 8. Note and project detail → text/primary (ProjectRow V6 main too). Company under a job → label/md on all 11 V6 Company Row instances (overrides, so V2–V5 are untouched).
- Candidate side: 4 job cards and 6 Check your request screens now read "Found in your work" / "Listed only"; the note tag reads "A listed skill counts once your linked work or resume shows it". Both project link fields on Projects Editing have the help line.
- New frame: Referrer/Skill Proof Sheet (5750:42504), cloned from the Add Resume sheet.

## 2026-09-24 · The referrer's question asks about a skill, not a product

- Devansh: the referrer writes the question before anyone applies, so "a trade-off in a checkout or payment flow" shuts out good people without checkout work (transferable skills).
- Now: "Tell us about a flow you made simpler. What did you cut, and what did it cost?" Same skill (trade-off judgement in a flow); a checkout designer still answers with checkout work, everyone else from theirs.
- Post field: the placeholder uses that example; help reads "Ask about a skill this role needs, not a specific product. Every candidate answers from their own work."
- Answers rewritten where they no longer fit: Amit (no longer apologises for having no checkout work) and Sneha (cut the upsell, not added it). The rest already describe a simplification and its cost.
- Figma: 14 texts on V6 (post screens ×2, Check your request ×6, request screen + 3 states) replaced in place; no text clipped.
- Checked on localhost (Vercel preview needs a login): the request screen and Check your request show the new question.

## 2026-09-24 · Fit group headers: no "· count"
- Devansh: no iOS app writes a section header as "RELATED · 2".
- Now the header is just the name, like an iOS grouped-list header: "FOUND IN THEIR WORK", "RELATED", "LISTED ONLY", "MISSING". The rows show how many; the "4 of 7" tag gives the total.
- Figma: 12 header texts on V6 (request screen + 3 states) edited in place.
- Checked on localhost (Vercel preview needs a login).

## 2026-09-24 · Portal details: Email to me and Copy all
- Devansh: moving the details from the app into the referral portal is the pain point everyone named. Evidence: both referrers said it — n60 (Samarth: chasing extra details, copying skills from the resume into the portal by hand) and n71 (Riya: needs the candidate on a call because the portal asks for details a resume doesn't have). Referrers fill the portal on a laptop (assumption, not asked in interviews).
- Options offered: email to work inbox, copy all, open on laptop (link/QR), autofill extension. Devansh chose the first two. Open on laptop overlaps with the email; autofill is a big build and every portal is different, so it's for "What's next".
- "Email to me" sends the list to the referrer's verified work email (where the portal is), in the portal's order, with the resume attached. The button becomes "Emailed" and a note says "Sent to nithin.agarwal@flipkart.com with the resume".
- "Copy all" puts every detail on the clipboard as "Name: value" lines and ticks every row. Per-field copy stays.
- The note was cut to one line (dropped "attached") so it doesn't wrap.
- Figma: button row added in place on After Refer (Explore) and After Refer/Undo (States); new state frame "After Refer/Emailed" in the States grid (row 7, col 2).
- Checked on localhost (Vercel preview needs a login).

## 2026-09-24 · AI suggests the referrer's question from the job description
- Devansh chose this from three AI ideas (portal format matching, question suggestions, vague-answer flag).
- Why: the referrer doesn't know who will apply, so a product question ("a checkout trade-off") shuts out most candidates. We fixed that question by hand; this stops the mistake before it happens.
- Built: under "One question for candidates" on Check your job post and Edit your job post, "Suggested from Flipkart_IxDesigner_JD.docx" with three questions, one per skill the job asks for (Interaction design, User research, A/B testing; Blinkit's post has its own three). Tap one and it fills the field; a tick marks the one in use. The field stays editable.
- Evidence: none from research; a design call (mine). The skills come from the job description Sidedoor already reads.
- Turned down: AI writing the candidate's answer (it would stop proving anything); a sparkle "AI" badge (the file has no such icon, and the copy avoids "AI", see Login lines).
- Figma: "Question Group" (field + suggestions) on the post screen (5760:31477) and the edit screen (5760:31582); list rows use the portal Box, label/sm skill, label/md question, blue tick on the first.
- Checked on localhost (Vercel preview needs a login): tapping the third fills the field and moves the tick.

## 2026-09-24 · Log cleaned up
- Devansh asked whether the log records every important decision with its reasoning. Mostly yes, but the status at the top was from 17 Sep, recent entries often lacked research note numbers and what was turned down, long Figma change lists buried the decisions, and dates used two formats.
- Fixed: "Where things stand" rewritten; new "Key decisions" tables at the top (decision, why, evidence, turned down; "mine" where no research backs it); every heading now uses YYYY-MM-DD; the portal entry cites n60 and n71.
