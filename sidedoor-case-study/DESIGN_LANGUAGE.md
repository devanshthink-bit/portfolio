# DESIGN LANGUAGE

**Project:** Sidedoor · **Type:** concept (own product; V2 Figma is the reference)
**References:** Figma V2 variables (8Z12N0tXTI126hj7ZaXnbO) + three V2 screens: Track Referrals list (1198:8792), Track details (1247:5475), Add your experience form (1054:5510). V0 Colors frame checked for extra colours.
**Status:** Matched in 4 rounds, 6 of 6 passing. Adjective conflict still open (see below).
**Component sheet:** `language/test-screen.html`

> Sizes, colours, radius and shadows are read from Figma variables (saw it). Card padding, gaps and button height
> are estimated from proportion in the screens, not measured.

## The adjectives, in numbers
Draft. Devansh to confirm the words and which one wins.

| Adjective | What it means here | When it conflicts, what wins |
|---|---|---|
| Quick | Referrer sees 3+ requests in the fold. Fit shown as counts ("4 of 6 skills match"), one line. 12px gap between cards is the floor. | Wins on referrer lists (they decide fast, on a work break). |
| Clear | One accent (blue) and it only means "tap this". Status in words, not colour alone. 4 type sizes. | Wins everywhere a status is shown. |
| Trustworthy | No fake scores, no gradients, no urgency colours. Red only for real errors. | Wins over "quick" on the request and refer screens. |

## Type scale
| Name | Size | Weight | Used for |
|---|---|---|---|
| Display | 20/28 | 600 | Screen titles on forms ("Add your experience") |
| Heading | 16/24 | 600 (500 in the top bar) | Card titles, names, button text (500) |
| Body | 14/20 | 400 | Facts, helper lines, messages |
| Caption | 12/16 | 500 | Time, job meta line |

**Family:** Inter (free, same as V2). Merged: V2's heading/xs 14/600 and label/md 14/500 go into Body with weight 500 for labels and tags.

## Spacing
**Base:** 4 · **Steps in use:** 4, 8, 12, 16, 24, 32
16 = screen edge and card padding. 12 = gap inside a card. 16 = gap between cards. 32 = gap between blocks.

## Palette
| Role | Value | Job |
|---|---|---|
| Surface | #FFFFFF | page background, cards |
| Surface raised | #F0F1F2 | empty states, neutral tags, avatar fill |
| Ink | #3B3F46 | primary text |
| Ink muted | #6B7280 | facts, helper text, time |
| Accent | #2563EB | the one thing to tap: primary button, links, active tab |
| Signal | #B91C1C on #FEF2F2 | errors only |

**Status colours (not a seventh role, they carry stage meaning):**
- Sent: neutral (Surface raised + Ink). Waiting is not good or bad.
- Submitted, In interviews, Selected: #047857 on #ECFDF5.
- On hold: #B45309 on #FFFBEB.
- Not selected: neutral. Not red. It is not an error.

**Brand green #10B981:** logo and candidate-side theming only. Never text on white.

## Shape
**Radius:** card 12, button and input 8, tag 4, sheet 16, avatar round.
**Elevation:** shadow, no borders. Card and input = 0 1 4 #00000014 + 0 1 2 #0000000F. Sheets = 0 6 16 #0000001A + 0 2 6 #00000014.
**Button height:** 48. Primary = blue fill, white 16/500. Secondary = white with 1px #D1D3D8 inside line.
**Inputs:** 48 tall, #FAFAFA fill, card shadow, label above (14/500), helper below (12, muted).

## Density
Between. Lists are dense functional: 3 cards plus a field and buttons fit one phone screen (checked at 390px).
Forms and the no-install link page are spacious: one question block per view, 32 between blocks.

## Navigation
Top bar: back arrow left, title centred (or SideDoor logo on home), one action right (bell).
Bottom bar: 5 items with labels, active item blue. Kept from V2.
Tabs on lists: text tabs with a blue underline on the active one.
The no-install link page has no bottom bar.

## Interface tone
Plain, short, tells you the next step. Real strings kept from V2: "Message Referrer", "Share your work history and background", "Step 2 of 4".
New strings from the brief: "Add the job ID first. It's the first thing a referrer needs.", "Not moving forward", "4 of 6 skills match".

## Match report
| Dimension | Result | Note |
|---|---|---|
| Type scale | ✓ | Round 2: top bar title 600 → 500 to match V2. |
| Spacing rhythm | ✓ | All gaps on 4/8/12/16/24/32. |
| Density | ✓ | Round 2: fit line wrapped to 2 lines ("3 yrs (you need 2–5)"), cards 128 → 104 tall. Cut to one line; range moves to the detail screen. |
| Colour roles | ✓ | Round 4: "Sent" tag was blue, which made blue mean two things. Now neutral. Red and green text darkened for contrast. |
| Shape | ✓ | Round 2: input fill white → #FAFAFA to match V2. |
| Hierarchy | ✓ | Squint order same as V2: title → name → status tag → time. Round 3: coloured emoji bell pulled the eye first; swapped for an outline icon. |

## Inherited and non-negotiable
- Inter, the V2 type sizes, the V2 radius and shadow tokens.
- Blue #2563EB as the action colour, green #10B981 as the brand.
- Top bar and 5-item bottom bar pattern.

## Mine to decide
- Status colours by meaning (above) instead of V2's "green for everything in progress, blue for Under Review".
- Darker status and error text than V2's tokens (contrast).
- Blue used only for tappable things.

## Do NOT inherit
- **Second blue #007AFF** (V0 "Link Blue"). Two blues doing one job.
- **Green text #22C55E on #ECFDF5** (V2 success). Estimated about 2.3:1, under 4.5:1. Use #047857.
- **Red text #EF4444 on #FEF2F2** (V2 error). Estimated about 3.5:1. Use #B91C1C.
- **Amber text #F59E0B.** Estimated under 3:1. Use #B45309.
- **Brand green #10B981 as text on white.** Estimated about 2.5:1.
- **Decimal fit score "9.4 Strong Fit".** Looks precise, isn't. Counts instead (AX spec in BRIEF.md).
- **Swipe cards** for requests. Hides the facts a referrer needs to decide (Idea 10 rejected).
- **Gold gradient Premium button.** Premium is not access to referrers (BUSINESS.md); the button also breaks the one-accent rule.
- **All-caps "SIGN UP".** Only all-caps string in the app.
- **Grey placeholder avatars as the main card visual.** Fine as a fallback, not as the design.
- **Blue "Under Review" tag next to green progress tags.** Same meaning, two colours.

## How sure
**Saw it:** type sizes and weights, colours, radius, shadows (Figma variables); top bar, bottom bar, tabs, card layout, button style (screens).
**Worked it out:** card padding 16, button height 48, density "between", contrast ratios (estimated from colour values, not tested on device), status colour mapping.
**Guessing:** the adjectives until Devansh confirms them.

## Rules for anything generated from this
Use only the sizes, steps and palette roles above. Do not introduce a new
size, step or colour. If something seems to need one, that is a hierarchy
problem — solve it with the existing scale.
