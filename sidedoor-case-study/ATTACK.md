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
1. **Status and match tag colours** (Success, Buffer, Neutral, Primary). Every status in the app is read through these. Use DESIGN_LANGUAGE.md's own values: `#047857 on #ECFDF5 = 5.2:1`, `#B45309 on #FFFBEB = 4.8:1`, `#4B5563 on #F0F1F2 = 6.7:1`, `#1D4ED8 on #E9EFFD = 5.8:1`.
2. **Tap targets.** Give the back, bell, pencil and external-link icons 44×44 hit areas. Give skill rows 44 height.
3. **Input edges.** A 1px `#8E939B` line (3.1:1) on fields, or a darker fill.
4. **Placeholder text** to `#6B7280` (4.8:1).
5. **Long text** (S1, S3). Names and skills wrap to two lines, then end in "…". Tags never get pushed off.

**Not fixed, on purpose:**
- **White "4 of 7" on brand green (2.54:1).** Devansh chose to keep brand green with white text (19 Sep). The same count appears in dark text in "How they match", so no information lives only in the banner. Logged as rejected, with the reason.
- **The 32px banner size outside the four-size scale.** It's a named style used once; the banner is the screen's headline.

**Couldn't check statically:** keyboard and focus order, screen-reader output, reflow at 200%, motion, real
network behaviour.

This file doesn't claim the screens are accessible. It checked seven things on two static screens.
