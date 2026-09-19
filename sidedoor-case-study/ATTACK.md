# ATTACK · Sidedoor V6

**Date:** 19 Sep 2026 · **Screens:** Candidate · Check your referral request; Referrer · Referral request
**Method:** Figma V6, static. The "too much" cases were run on temporary copies with real long strings and
screenshotted. Contrast was computed from the hex values. Anything that needs a running build is marked
"can't tell".

---

## Stress pass

**The jobs:**
- Candidate: send Nithin a complete request, with every detail his portal needs, in one go.
- Referrer: decide in under a minute whether to refer this person, and do it.

**Devansh predicted:** 1 of 13 ("something too long or too many"). **Missed:** every nothing, wrong and waiting case.

| # | Kind | Throw | What should happen | What did happen | How bad |
|---|---|---|---|---|---|
| S1 | Too much | Referrer name `Krishnamurthy Venkataraghavan Subramanian`, role `Senior Principal Product Design Manager, Flipkart Internet Private Limited` (candidate screen) | Name wraps or ends in "…"; Job ID stays visible | Name cut mid-word ("…Subra"), **Job ID tag pushed off the screen** | Major: the job ID is the one thing a referrer needs (n70) |
| S2 | Too much | Same long name on the referrer's screen | Name wraps; status tag stays | Name cut mid-word; "Sent today" pushed off | Minor |
| S3 | Too much | Skill `Human-centred service design and end-to-end journey blueprinting`, source `From resume · Grofers India Private Limited (now Blinkit)` | Skill wraps; it's the evidence | Cut to "Human-centred service design ar" | Major: the referrer decides on a skill they can't read |
| S4 | Too much | A 300-character "Their note" | Wraps, card grows | Wraps, card grows | Passes |
| S5 | Nothing | Candidate skipped the resume, then taps "Ask Nithin for a referral" | Sent to upload with a reason | No screen designed for it | Major: the path exists (Skip for now) but ends nowhere |
| S6 | Nothing | Candidate wrote no note; no LinkedIn or portfolio | Those sections disappear on the referrer's screen | Not designed; can't tell if an empty "Their note" box shows | Minor |
| S7 | Nothing | Resume matches 0 of 7 skills | "0 of 7" or a clear "doesn't match" | Not designed; only "Not enough to judge" exists | Minor |
| S8 | Wrong | Date of birth typed `31/02/1999` | Field error under the field, Send stays off | No field error designed on this screen | Major: a wrong date reaches the portal, which is the problem the product exists to fix |
| S9 | Wrong | Candidate asks Nithin again for the same job from the app | "You've already asked for this job" | Only the link page has this state | Major |
| S10 | Wrong | Referrer taps Refer by mistake | A few seconds to undo before the candidate is told | Status flips to Referred with no undo | Major: the candidate is told something false |
| S11 | Wrong | The job is closed while the candidate is filling the form | "This job is closed" before sending | Only handled after sending (auto "Role is closed") | Minor |
| S12 | Waiting | Send tapped twice on a slow network | Button shows "Sending…" and turns off | No in-flight state; can't tell if it sends twice | Major |
| S13 | Waiting | Opened offline | Cached request, or an offline message | Can't tell from a static file | Can't tell |

**Fixing (5):** S1, S3, S8, S10, S12. S1 and S3 hide the facts each person decides on. S8 and S10 let wrong
information reach the other side, which undoes the product's promise. S12 can create a duplicate request.

**Deliberately not fixing now:**
- S5 needs a flow decision (ask without a resume or not), which is a molades-brief question.
- S9 and S11 are rarer than the five above.
- S6 and S7 are empty states on secondary sections.

**Couldn't test statically:** S13 (offline), S12 (whether a duplicate actually sends), and real network timing.

---

## Craft pass

**Rulers (from DESIGN_LANGUAGE.md, declared 17 Sep, tokens since 19 Sep):**
- Spacing: 2 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64
- Type: 12 · 14 · 16 · 20. Display 32 and 24 are for the banner and headings only.
- Weights: 400 body · 500 labels · 600 headings
- Emphasis: one primary action per view
- Alignment: screen edge 16, content inside boxes indented once

### Visual checks

| Check | Candidate · Check your request | Referrer · Referral request |
|---|---|---|
| Scale adherence | PASS: every gap and padding is bound to a spacing token | PASS: same |
| Type count | PASS: 12, 14, 16 | PASS at the limit: 12, 14, 16, 32. The 32 is the banner, added 19 Sep; it's outside DESIGN_LANGUAGE.md's four sizes but is a named style |
| Emphasis | PASS: one primary (Send; off until complete) | PASS: one primary (Refer) |
| Alignment | PASS, with nesting: 16 screen edge, 32/40 inside boxes, 72 text beside photos | PASS, with nesting: 16, 40 inside the white card, text beside icons and photos |
| Rhythm | PASS: label 8 above its box, blocks 20–28 apart | PASS: same |

### Accessibility checks

| Check | Verdict | Detail |
|---|---|---|
| Text contrast | **FAIL** | Success tag `#22C55E on #ECFDF5 = 2.16:1`; Buffer tag "Still needed" `#F59E0B on #FFFBEB = 2.07:1`; Neutral tag `#6B7280 on #F0F1F2 = 4.27:1`; Primary tag "Job ID 184223" `#2563EB on #E9EFFD = 4.49:1`; banner "4 of 7" `#FFFFFF on #10B981 = 2.54:1` (32px semibold, needs 3:1) and "skills match" (16px, needs 4.5:1); placeholder `#9CA3AF on #FFFFFF = 2.54:1`. Needed 4.5:1 |
| Non-text contrast | **FAIL** | Input fields are `#FAFAFA` on `#FFFFFF` with only a soft shadow, about 1.04:1. Needs 3:1 for a field's edge |
| Target size | **FAIL** | Back arrow 24×24, bell 24×24, edit pencil 18×18, external link 20×20, "Show project details" 137×20, skill rows 262×38 (tappable to strike out). Needs 44×44. Also "Mark it" on Track details (known) |
| Labels | PASS | Every field has a visible label above it (section label). Placeholders are examples, not labels |
| Colour alone | PASS | Status tags carry words; matched skills have a tick as well as blue; the switch has LIVE/PAUSED in words |
| Structure | CAN'T TELL | Figma has no heading markup. Needs the built page |
| Text at 200% | CAN'T TELL | Needs a build. The long-string test (S1–S3) suggests single-line rows will clip |

**Fixing (5), in order:**
1. **Tap targets.** Give the back, bell, pencil and external-link icons 44×44 hit areas. Give skill rows 44 height.
2. **Input edges.** A 1px `#8E939B` line (3.1:1) on fields, or a darker fill.
3. **Placeholder text** to `#6B7280` (4.8:1).
4. **Long text** (S1, S3). Names and skills wrap to two lines, then end in "…". Tags never get pushed off.

**Not fixed, on purpose:**
- **Tag text colours (2.07–4.49:1).** Shown before and after (`#047857`, `#B45309`, `#4B5563`, `#1D4ED8`, `#B91C1C`, all 4.8–6.7:1). Devansh decided to keep the current colours for now (19 Sep). Every tag carries a word, so no status depends on colour alone. The fix is ready if the decision changes.
- **White "4 of 7" on brand green (2.54:1).** Devansh chose to keep brand green with white text (19 Sep). The same count appears in dark text in "How they match", so no information lives only in the banner. Logged as rejected, with the reason.
- **The 32px banner size outside the four-size scale.** It's a named style used once; the banner is the screen's headline.

**Couldn't check statically:** keyboard and focus order, screen-reader output, reflow at 200%, motion, real
network behaviour.

This file doesn't claim the screens are accessible. It checked seven things on two static screens.

---

## After the attack · 19 Sep

**Built (molades-build, round 2):**
- S1, S2 · PersonRow: the name gets its own line and ends in "…"; the role wraps to two lines, then "…"; the tag moved beside the role and never gets pushed off.
- S3 · MatchRow: the skill wraps in full; the source line ends in "…".
- S8 · New InputField State=Error (red edge, reason under the field). New screen "Check your referral request/Date Error".
- S10 · New Toast component (color/surface/inverse, text/onInverse, text/linkOnInverse tokens). New screen "After Refer/Undo": "Referred. Abhinav is told in 5 seconds." with Undo. Prototype: Refer → toast → After Refer after 5 s; Undo goes back.
- S12 · New Button State=Loading. New screen "Check your referral request/Sending". Prototype: Send → Sending… → Just sent after 1.2 s.
- C2 · Invisible 44×44 tap areas: header back and bell (Header, AppHeader), section edit pencil, skill rows, external-link icons, "Show project details", "Mark it".

**Rejected by Devansh (19 Sep), kept as known failures:** tag text colours (C1), field edges (C3), placeholder contrast (C4).

**Also changed during the attack:** the green match banner was removed from the referrer's Referral request (Devansh: "this green card is optional … whole UI design should be best"). C5 no longer applies.

---

# Whole-app stress pass · 19 Sep

The first pass above covered all four kinds on two screens only. Devansh asked for every flow. Same rules apply.
"Too much" was run for real on temporary copies of 8 more screens with long strings:
- Name: `Krishnamurthy Venkataraghavan Subramanian`
- Company: `Tata Consultancy Services Digital`
- Job title: `Senior Staff Product Designer, Payments Platform & Merchant Experience`
- Message: a 150-character message

Nothing, wrong and waiting are checked against the screens and states that exist in V6. "Not designed" means there's no screen or state for it. It doesn't mean the build would crash, which can't be told from a static file.

**Devansh predicted:** too much only. **Missed:** nothing, wrong and waiting across every flow.

Severity is graded against each flow's job: **B** blocker, **M** major, **m** minor, **✓** handled, **?** can't tell.

### Login and role
| Kind | Throw | Expected | Actual | |
|---|---|---|---|---|
| Wrong | LinkedIn sign-in cancelled or denied | Back on Login, "Sign-in was cancelled. Try again or use Google or Email." | Not designed | M |
| Waiting | Sign-in slow | Button shows progress, can't be tapped twice | Not designed (Button Loading now exists) | m |
| Nothing | Returning user taps "Log in" | Same three options | Same screen (by design) | ✓ |

### Candidate onboarding (upload → check details)
| Kind | Throw | Expected | Actual | |
|---|---|---|---|---|
| Wrong | A scanned image PDF | "Couldn't read this file…" + fill in yourself | Built (Couldn't Read File) | ✓ |
| Waiting | Resume still reading | Fields fill in as they come | Built (Reading) | ✓ |
| Nothing | Resume has no projects or experience section | Those sections show "Add" rather than an empty box | Not designed | m |
| Too much | 12 jobs and 9 projects on the resume | Latest 3 shown, "Show all" | Not designed; list grows without limit | m |
| Wrong | Resume misreads the phone number | Field is editable (pencil) | Editable | ✓ |

### Referrer onboarding (verify email → add job → post → live)
| Kind | Throw | Expected | Actual | |
|---|---|---|---|---|
| Wrong | Personal email `nithin.agarwal@gmail.com` | "Use your work email. We check it's a company address." | Not designed | **B**: can't be verified, can't post |
| Wrong | Wrong or expired 6-digit code | "That code didn't work. Check it or resend." | Not designed | **B** |
| Waiting | Code email slow | "Resend code" with a 30 s countdown | Only a plain "Resend code" | m |
| Wrong | Pasted job link can't be read (login-only careers page) | "We couldn't read this link. Upload the description or fill it in yourself." | Not designed (candidate side has it) | M |
| Nothing | Job has no ID yet | Save as draft, "Add the job ID to post" | Built (Draft) | ✓ |
| Wrong | Same job ID posted twice | "You already have this job live." and a link to it | Not designed | m |

### Jobs and Job (candidate)
| Kind | Throw | Expected | Actual | |
|---|---|---|---|---|
| Nothing | New city, no referrers yet | "No one refers for jobs like yours here yet." + set job preferences or share | Not designed | M: first run shows a blank list |
| Too much | Long job title and company | Wraps, stays readable | Wraps | ✓ |
| Too much | Long shared-background tag | "…" at the end | Cut hard: "Both ex-Tata Consultancy Ser" | m |
| Too much | Long referrer name on the Job card | Name ends in "…", time stays | Name cut, runs into "2d ago" | M |
| Too much | Long job title on the Job card | Wraps under the bookmark | Runs under the bookmark icon | M |
| Waiting | Jobs list loading, or it fails | Loading cards; "Couldn't load jobs. Pull to try again." | Not designed | M |
| Wrong | Job closed while it's open on screen | "This job is closed" before asking | Not designed (attack S11) | m |

### Asking (Check your referral request)
Covered in the first pass (S1–S13): long names, date error, sending state and no-requests-left are built. **Open:** S5 (skipped resume taps Ask) and S9 (asking the same person twice from the app).

### Tracking (Your referral requests → Track details)
| Kind | Throw | Expected | Actual | |
|---|---|---|---|---|
| Nothing | First-time candidate, 0 requests | "No requests yet. Find a job with someone who refers." + Jobs | Not designed | M |
| Too much | Long company name in the list | Ends in "…", time stays | Runs into the time; the verified tick disappears | M |
| Too much | Long company or role in Track details | Wraps, tag stays | Runs into the "Sent" tag; role cut | M |
| Too much | 60 requests over months | Tabs filter; list scrolls | Tabs and scroll exist | ✓ |
| Wrong | Candidate taps "Mark it" (submitted), but the referrer never referred | Timeline shows it came from the candidate, "Your update" | Not designed | m |
| Waiting | Track details loading or failing | Loading shape; "Couldn't load this request" | Built | ✓ |

### Referrer's requests list
| Kind | Throw | Expected | Actual | |
|---|---|---|---|---|
| Nothing | New post, no requests | Share your link | Built (Empty) | ✓ |
| Nothing | Nobody opted in to be found | "Suggested for this job" doesn't show at all | Not designed; can't tell if an empty header shows | m |
| Too much | Long name, role and shared tag on a card | Name "…", role wraps, tag "…"; time stays | Name, role and tag cut hard; time pushed | M |
| Too much | 40 requests on one job | Matches first, Lower match collapsed | Built; cap per job still **open** | ✓ |
| Waiting | Loading or failing | Loading cards; "Couldn't load requests" | Built | ✓ |
| Wrong | Post paused / job edited | Paused note; "Fit was checked again" | Built | ✓ |

### Referring (Referral request → After Refer → Marked as submitted)
Covered in the first pass: long names and skills, Undo after Refer. **Open:** S6 (empty sections). Also:
| Kind | Throw | Expected | Actual | |
|---|---|---|---|---|
| Wrong | "Mark as submitted" tapped before really submitting | Undo, like Refer | Not designed | m |
| Waiting | Copy tapped, clipboard blocked | Field stays selectable | By design (BRIEF) | ✓ |

### Your referrals and the Update sheet
| Kind | Throw | Expected | Actual | |
|---|---|---|---|---|
| Nothing | 0 referrals | Empty text | Built | ✓ |
| Too much | Long candidate name | Ends in "…", time and Update stay | Runs into "12 days" | M |
| Wrong | Wrong stage tapped | "Couldn't update" exists; going back a stage is **open** | Partly built | m |
| Waiting | Loading the list | Loading cards | Not designed | m |

### Manage posts and Edit post
| Kind | Throw | Expected | Actual | |
|---|---|---|---|---|
| Nothing | Referrer has no posts | "Post your first job" + the + button | Not designed | M |
| Too much | Long job title | Wraps | Wraps | ✓ |
| Wrong | Pausing a post with open requests | "1 still open" shows | Built | ✓ |

### Messages
| Kind | Throw | Expected | Actual | |
|---|---|---|---|---|
| Nothing | No conversations yet | "Messages open after a referrer refers you." | Not designed | M |
| Nothing | Search finds nothing | "No one called 'Rahul' in your messages." | Not designed | m |
| Too much | Long name | Ends in "…", time stays | Runs into the time | M |
| Too much | Long message preview | Two lines, then "…" | Grows to 5 lines | m |
| Waiting | Loading or offline | Loading rows; offline note | Not designed | m |

### Profile and Edit profile
| Kind | Throw | Expected | Actual | |
|---|---|---|---|---|
| Wrong | Work email changes (new company) | Verified tick removed until re-checked | Not designed | m |
| Waiting | Saving changes | Button "Saving…" | Not designed (Loading now exists) | m |

### Link page (no app)
| Kind | Throw | Expected | Actual | |
|---|---|---|---|---|
| Wrong | Old link, closed job | "This job is closed" | Built | ✓ |
| Wrong | Asked twice | "One request per job, per referrer." | Built | ✓ |
| Waiting | Upload on a slow phone connection | Progress, then fields | Not designed | M |
| Nothing | Opened on desktop | Same page, centred | Can't tell | ? |

### Everywhere
| Kind | Throw | Expected | Actual | |
|---|---|---|---|---|
| Waiting | Offline | A banner: "You're offline. Changes send when you're back." | Not designed | M |
| Wrong | Session expired | Back to Log in, keeps where they were | Not designed | m |

**Count:** 2 blockers, 18 majors, 19 minors, 18 handled, 1 can't tell.

**Fixing next (5, whole app):**
1. **B · Verify work email:** personal email and wrong or expired code. Without these, a referrer can't get in.
2. **M · Text collisions in shared rows:** ReferralBar (Your referral requests, Your referrals), Messages row, Job card header, Track details header, RequestCard. Names end in "…", times and tags stay. One pattern fixes 6 screens.
3. **M · First-run empty screens:** Jobs, Your referral requests, Messages, Manage posts. New users see these first.
4. **M · Loading and "couldn't load"** for Jobs, Messages and Your referrals, matching the ones already built.
5. **M · Referrer's job link can't be read:** same pattern as the candidate's upload error.

**Deliberately not now:**
- Login cancelled and offline everywhere: need platform decisions.
- Link page upload progress: covered by the Reading pattern once built.
- S5 and S9: need product decisions.
- All minors.
