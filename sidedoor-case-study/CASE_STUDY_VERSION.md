# Case study version marker

The live case study (`app/work/sidedoor/page.tsx`) and the home card (`app/page.tsx`, second card) were
written on **2026-09-24**, against:

- **Code:** branch `sidedoor`, commit `18d4738` (the prototype at `/work/sidedoor/prototype`)
- **Figma:** file `8Z12N0tXTI126hj7ZaXnbO`, page UI Screens, the V6 flows and V6 · States Flow, as they
  stood on 2026-09-24. Screens were exported at 2x and cropped to one phone screen (804 × 1748) into
  `public/images/sidedoor/screens/`.
- **Research and decisions:** LOG.md up to the entry "Usability test plan" (2026-09-24).

Anything that changes after this point has to be checked against the table below, and the beats it
touches updated.

## Pending (known, not yet in the case study)

1. **Usability tests with Samarth and Riya** (TEST_PLAN.md). Not run. When they are:
   - rewrite Act 4 "Next" and "Nobody has used this yet" with what happened;
   - add a testing beat in Act 3 (what broke, what changed, with quotes);
   - re-export any screen that changed and update the matching beats below.
2. **Desk research sources.** Devansh will send the original links. Until then no market figure is on the
   page. A comment in Act 1 ("WHY IT MATTERS") marks where the sourced figures go.
3. **Final design polish.** Planned after the case study. Re-export every changed frame (same crop) and
   check the annotation boxes still land on the right parts.

## Which beat uses which frame

Crops are `header / footer / scroll offset` in 1x points (see the ffmpeg crop in the 24 Sep LOG entry).

| Image | Figma frame (V6) | Crop | Used in |
|---|---|---|---|
| jobs.webp | Candidate/Jobs Screen 5247:18584 | full | Act 2 Scene 1 |
| job.webp | Candidate/Job Screen 5247:18687 | 98 / 232 / 300 | Scene 2, home card |
| check.webp | Candidate/Check Your Referral Request Screen 5247:18695 | 98 / 88 / 0 | Hero, Scene 3 |
| requests.webp | Referrer/Referral Requests Screen 5247:18631 | 146 / 88 / 0 | Scene 4 |
| request.webp | Referrer/Referral Request Screen 5247:18762 | 98 / 88 / 0 | Hero, Scene 5, Act 3 "Before and after", home card |
| proof.webp | Referrer/Skill Proof Sheet 5750:42504 over request.webp, dimmed 40% | composite | Scene 6 |
| emailed.webp | Referrer/Referral Request Screen/After Refer/Emailed 5757:31343 | 98 / 88 / 0 | Hero, Scene 7, home card |
| marked.webp | Referrer/Referral Request Screen/Marked As Submitted 5247:19055 | full | Scene 8, Act 3 "My mistake" |
| track.webp | Candidate/Track Details Screen/3 5247:19455 | 98 / 88 / 14 | Scene 8 |
| link_before.webp | Link Page/Before Upload 5247:20271 | full | Scene 9 |
| link_sent.webp | Link Page/Sent 5247:20246 | full | Scene 9 |
| st_noanswer.webp | Candidate/Track Details Screen/No Answer After 7 Days 5247:19634 | 98 / 88 / 114 | Scene 10 |
| st_cantsend.webp | Candidate/Check Your Referral Request Screen/Couldn't Send 5287:24479 | 98 / 88 / 752 | Scene 10 |
| st_offline.webp | Candidate/Jobs Screen/Offline 5618:28401 | full | Scene 10 |
| post.webp | Referrer/Post A Job From Its Description Screen 5247:18441 | 98 / 0 / 860 | Act 3 "The question" |
| v2_swipe.webp | V2 Referrer/Candidate Screen/1 882:6094 | full (780 × 1688) | Act 3 "Before and after" |
| v2_update.webp | V2 Referrer/Update Preview Screen/1 1210:6447 | full (780 × 1688) | Act 3 "My mistake" |
| st_loading, st_empty, st_thin | 5311:38885, 5247:18943, 5247:19007 | full | exported, not used yet |

## Facts on the page that depend on the design

If any of these change in the design, the sentence changes too.

- 14 requests a week (Scene 2), and one extra when referred (not on the page)
- Fit groups: Found in their work / Related / Listed only / Missing (Scenes 2, 5, Act 3 "Proof")
- Portal details: Email to me, Copy all (Scene 7)
- Mark as submitted as the last step of Refer (Scene 8, Act 3 "My mistake")
- The referrer's question and its suggestions (Act 3 "The question")
- 65 prototype states (Scene 10, Act 3 "Attacking it")
- Kill conditions: 1 in 5, 3 of 8 (Act 4)
