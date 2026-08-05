# Devansh Somvanshi — Portfolio

**AI-first product designer who ships his own code.**

I spent 3+ years as a software engineer before moving into product design, so I don't hand off
Figma files and hope for the best — I design the thing, then build it. This repo is the portfolio
site itself: designed in Figma, written in Next.js, deployed as one person's end-to-end output.

🔗 **Live site:** _add your deployed URL here_
📄 **Resume:** [Google Drive](https://drive.google.com/file/d/1iIkDZW26ryQ-rZq2ZDsd5e6rqMfPyctX/view?usp=drive_link)
💼 [LinkedIn](https://www.linkedin.com/in/devansh-somvanshi) · 🐙 [GitHub](https://github.com/devanshthink-bit) · 🐦 [X](https://X.com/devanshmusings)

---

## What I've done

| | |
|---|---|
| **3+ yrs** | Engineering experience (SDE) |
| **4** | Products shipped |
| **2M+** | Users reached |
| **0→1 & at scale** | Startups and large orgs |

**Where:** GoodWorker (workforce enablement) · Stanza Living (hospitality) · Devic Earth (greentech)

**Design:** Figma, FigJam, Framer, design systems, UX research, interaction design
**Engineering:** React, Next.js, TypeScript, React Native, Flutter, Tailwind
**AI in the loop:** Claude Code, Cursor, Codex, Figma Make — used daily, not as a demo

---

## Featured work in this repo

**[Sidedoor — a job referral platform](app/work/sidedoor/page.tsx)** (`/work/sidedoor`)
Solo product designer · 10 weeks · 0→1 concept · Mobile/iOS

A full case study, written out and shipped as a page rather than a PDF. It covers the lived
problem, 10 user interviews, 11 competitors analysed, AS-IS/TO-BE journey maps, a north-star
metric ("accepted referral requests per active user"), four design decisions shown as
*wrong version → final version*, five design principles, and an honest reflection on what I'd
redo. If you only read one thing here, read this.

Two more case studies are in progress.

---

## Why the site is built this way

The site is deliberately hand-built. Most of what a component library or animation framework
would give me, I wrote instead — because the details are the point.

- **No component library.** No shadcn, no Radix. Every element is authored.
- **No animation library.** No Framer Motion, no GSAP. Transitions are CSS or hand-rolled
  `requestAnimationFrame` loops — the typewriter navbar, count-up stats via `IntersectionObserver`,
  the page-transition fade, the custom cursor.
- **One CSS file.** All design tokens, component classes, and responsive rules live in
  [app/globals.css](app/globals.css). Tailwind is used only for its reset layer; no utility
  classes in JSX. Light and dark are both first-class (`html.nerd-mode`).
- **A physics playground.** The About page runs a real `matter-js` simulation — skill tags you
  can grab, drag, and throw, with velocity carried through the release
  ([components/PhysicsSkills.tsx](components/PhysicsSkills.tsx)).
- **An AI assistant that knows me.** A small chat panel backed by an OpenAI route
  ([app/api/chat/route.ts](app/api/chat/route.ts)) — ask it what I've worked on. It degrades
  gracefully: no key, no widget.
- **Motion that respects the reader.** Lenis smooth scrolling, a fixed bottom dock instead of a
  sidebar, sticky per-case-study tables of contents.

---

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4
Runtime deps: `lenis`, `matter-js`, `openai`. That's the whole list.

```
app/
  page.tsx                 home — hero, stats, recent work
  about/page.tsx           story, skills tickers, physics sandbox, testimonials
  work/sidedoor/page.tsx   the Sidedoor case study
  api/chat/route.ts        AI assistant endpoint
  globals.css              every style in the project
components/                hand-built UI — nav, cursor, transitions, physics, TOCs
```

---

## Running it locally

```bash
npm install
cp .env.example .env.local   # OPENAI_API_KEY + NEXT_PUBLIC_WHATSAPP_NUMBER (both optional)
npm run dev                  # http://localhost:3000
```

`npm run build` for a production build, `npm run lint` to lint.

---

## Say hi

WhatsApp **+91 6396483499** · [LinkedIn](https://www.linkedin.com/in/devansh-somvanshi) ·
or open the site and ask the assistant.
