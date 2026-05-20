# Portfolio — Full Codebase Context

Owner: **Devansh Somvanshi** — AI-first product designer + engineer
Stack: Next.js 16.2.4 · React 19 · TypeScript · Tailwind CSS v4 · `app/` router
Dev server: `npm run dev`

---

## File Map

```
app/
  globals.css              — all styles (CSS vars, component classes, responsive)
  layout.tsx               — root layout: Navbar + PageTransition + CursorGlow + Assistant
  page.tsx                 — home page
  about/page.tsx           — about page
  work/sidedoor/page.tsx   — Sidedoor case study (only live case study)
  work/[slug]/page.tsx     — generic fallback for other work slugs
  api/chat/route.ts        — OpenAI chat endpoint for the Assistant
  api/check-chat/route.ts  — checks if Assistant is available
  icon.svg                 — site favicon

components/
  Hero.tsx                 — avatar, two h1 headings, three body paragraphs, WhatsApp CTA
  Navbar.tsx               — typewriter name, dark mode toggle, mobile hamburger
  PageTransition.tsx       — wraps children in .content-wrapper, keyed by pathname
  CursorGlow.tsx           — currently returns null (all cursor effects removed)
  Assistant.tsx            — floating AI chat panel (bottom-right, OpenAI-powered)
  WeatherLocation.tsx      — live weather + city shown in footer
  FooterLinks.tsx          — footer nav links
  PhysicsSkills.tsx        — matter-js physics simulation (used on About page)
  CaseStudyTOC.tsx         — sticky table of contents (used in Sidedoor case study)
  AvailabilityBadge.tsx
  HeroBackground.tsx
  TypewriterHeadline.tsx
```

---

## CSS Design Tokens (`app/globals.css`)

```
--bg: #fafafa
--text-primary: #1d1d1d
--text-secondary: #4a4948
--text-muted: #918e89
--border: #f1ede5
--card-bg: #f2f2f0
--cs-callout-bg: rgba(0,0,0,0.028)   (case study callout boxes)
--cs-stat-gap: #e8e4df               (grid gaps in case study stat blocks)
```

Dark mode: `html.nerd-mode` class toggled by Navbar. All vars have dark overrides.

Fonts (Next.js Google Fonts, loaded in layout.tsx):
- `--font-inter` — body text (default)
- `--font-manrope` — headings, bold/display text
- `--font-geist-mono` — labels, tags, monospace UI elements

Key layout classes:
- `.page-wrapper` — max-width 980px, centered, padding 40px 56px, flex col, gap 40px
- `.content-wrapper` — flex col, gap 56px, page-enter fade-in animation
- `.intro` — flex col, gap 40px (avatar → headings → body)
- `.section` — flex col, gap 6px, scroll-margin-top 48px
- `.section-title` — Geist Mono, 14px, uppercase, muted color
- `.work-card` — flex col, gap 10px, hover bg rgba(120,113,108,0.08), padding 12px, margin-inline -12px
- `.work-card-media` — aspect-ratio 1.75/1, border-radius 6px
- `.testimonial-card` — used in About page
- Mobile breakpoint: ≤640px | Tablet: 641–1024px

**Style rule:** Do NOT add Tailwind utility classes to JSX. Tailwind is only used for the reset/base layer. All custom styles go in `globals.css` or as inline `style={{}}` props.

---

## Home Page (`app/page.tsx`)

### Layout
Hero → Stats strip → Recent Work section → Footer

### Stats strip
Four animated counters: "3+ yrs Engg. experience", "4 Products shipped", "2M+ Users reached", "0→1 & at scale". Count-up triggers on IntersectionObserver.
Stats div has `marginTop: -20` to tighten gap with hero (content-wrapper gap is 56px).

### Recent Work cards (`recentWork[]`)
Three cards. Each has:
- `title`, `desc` (one-line tooltip), `tag` (mono label top-right)
- `gradient` — CSS gradient for card media area background
- `tooltipBg` + `tooltipColor` — colors for the cursor-following tooltip
- `slug` — links to `/work/[slug]` if set, non-clickable if null

| Title | Slug | Tooltip colors |
|---|---|---|
| Sidedoor — Job referral platform | `sidedoor` | Blue (#dce8ff / #2a4a8a) |
| Design system, Anthropic Console | null | Amber (#ffecd4 / #7a4a10) |
| End-to-end product, Meta Reels | null | Slate (#dde4ea / #2e3d4a) |

Hover: no overlay on the card media. A fixed-position tooltip (18px cursor offset, `font-geist-mono`, 12px, `whiteSpace: nowrap`) follows the cursor showing `item.desc`.

---

## Navbar (`components/Navbar.tsx`)

- **Left**: "Devansh Somvanshi" types character-by-character on mount with realistic per-character delays. On hover (home page only), rewinds and types "Hey there!" then reverts on mouse leave.
- **Right (desktop)**: Work · About · Resume (external Google Drive link) · Sun/moon dark mode toggle
- **Right (mobile)**: theme toggle + hamburger → fullscreen overlay menu
- Nav links have animated underline that slides in from left on hover.
- Dark mode: toggles `html.nerd-mode` class on `document.documentElement`.

---

## About Page (`app/about/page.tsx`)

Sections:
1. **About Me** — full-width 16:9 photo + biographical text. Story: started from Samsung Galaxy R as a kid → cars obsession → product design at GoodWorker, Stanza Living, Devic Earth → now design-engineer hybrid.
2. **Skills & Tools** — two animated ticker strips (pauses on hover) + PhysicsSkills matter-js component
   - Design strip: Figma, FigJam, Framer, Notion, Google Analytics + design skills
   - AI/Dev strip: React, Next.js, TypeScript, React Native, Flutter, Storybook, Tailwind, Claude Code, Cursor, Codex + AI skills
3. **In Their Words** — testimonial carousel (desktop: 3-up with scroll; mobile: swipe)
   - Priyam Shaw (EM @ Goodworker, Ex-Myntra)
   - Kunal Sagar (STPM @ LinkedIn, Ex-Nineleaps)
   - Swaraj Kausik (SE-2 @ Pinelabs, Ex-Goodworker)
   - Ashish Shetty (SSE @ EPAM, Ex-Goodworker)

---

## Sidedoor Case Study (`app/work/sidedoor/page.tsx`)

Only live case study. Route: `/work/sidedoor`.
Fonts: DM Serif Display (italic quotes) + Poppins 700 (hero title) + site fonts.
Uses `CaseStudyTOC` for sticky table of contents.
Image placeholders (`ImagePlaceholder` component) mark where Figma screens go.

**Case study structure (TOC anchors):**
1. `#toc-problem` — The problem, lived (Ishaan's story)
2. `#toc-why` — Why this matters (referral stats: 5-10× hire rate, 29 days avg, 46% retention)
3. `#toc-solution` — The solution: 5 screens
   - 01 Referrer Discovery (ranked list, match %, alumni signals, response rate)
   - 02 Structured Request (guided form, fit points, JD auto-attached, preview before send)
   - 03 Referrer Evaluation (match breakdown, strengths/concerns, graded recommendations: Decline/Review Later/Refer/Strongly Recommend)
   - 04 Shared Pipeline (both sides see same status timeline, no ATS dependency)
   - 05 Quality Over Volume (request limits, ranked inbox, intentional friction)
4. `#toc-metrics` — North star: "Accepted referral requests per active user"
5. `#toc-process` — Research: 10 interviews, 11 competitor analysis, AS-IS/TO-BE journey maps
6. `#toc-decisions` — 4 key design decisions (each has wrong version → final version)
7. `#toc-principles` — 5 design principles
8. `#toc-next` — What's next (recruiter analytics, incentive design, edge cases)
9. `#toc-reflection` — Honest reflection

**Case study metadata:** Solo Product Designer · 10 weeks · Figma, FigJam · Mobile/iOS · 0→1 Concept

---

## AI Assistant (`components/Assistant.tsx`)

Floating chat button (bottom-right, `z-index: 1000`). Panel opens above it.
Checks `/api/check-chat` on mount — if unavailable, renders nothing.
Sends messages to `/api/chat` (POST, OpenAI). Shows suggestion chips when empty:
- "What has Devansh worked on?"
- "What are his design skills?"
- "What tech does he build with?"

---

## Key Patterns

- All components using browser APIs/state must have `"use client"` at top.
- `CursorGlow` is imported in layout.tsx but currently returns null — it's safe to put cursor effects there.
- `PageTransition` wraps `{children}` in `.content-wrapper` keyed by pathname — handles page fade-in.
- No animation library (no GSAP, no Framer Motion). Use CSS transitions or rAF manually.
- No component library (no shadcn, no Radix).
- `matter-js` is the only non-trivial runtime dependency (used in PhysicsSkills).
- `openai` SDK used in API routes only.
- Public images: `/images/` (avatar.jpg, about.jpg, testimonial-*.jpg, ishaan-*.PNG, diya-*.PNG) and `/icons/` (tool SVGs for the ticker strip).

---

## Devansh's Background (for AI assistant / content accuracy)

- **Role:** AI-first product designer, design-engineer hybrid
- **Engineering background:** SDE for 3+ years — GoodWorker (workforce enablement), Stanza Living (hospitality), Devic Earth (greentech)
- **Products shipped:** 4 products, 2M+ users, 0→1 at both startups and scale
- **Current focus:** Product design + shipping features with agentic AI in workflow
- **Tech:** React, Next.js, TypeScript, React Native, Flutter, Tailwind
- **Design:** Figma, FigJam, Framer, design systems, UX research, interaction design
- **AI tools:** Claude Code, Cursor, Codex, Figma Make, Antigravity
- **Contact:** WhatsApp +91 6396483499
- **Resume:** Google Drive (linked in nav)
