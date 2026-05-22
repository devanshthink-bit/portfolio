import { Nunito } from "next/font/google";
import RubberBackButton from "../../../components/RubberBackButton";
import ZeptoTOCClient from "../../../components/ZeptoTOCClient";

const nunito = Nunito({ weight: ["700", "800", "900"], subsets: ["latin"] });

// ── Zepto brand color palette ─────────────────────────────────────────────────
const Z = {
  purple:     "#7B2FF7",
  purpleLight: "#9B6FF5",
  purpleBg:   "#F2EBFF",
  purpleMid:  "#4B1CA8",
  green:      "#1A8044",
  greenBg:    "#E6F4ED",
  red:        "#E33B3B",
  redBg:      "#FFF0F0",
  yellow:     "#FFB800",
  yellowBg:   "#FFF8E0",
  dark:       "#1A1A2E",
};

// ── Type scale ────────────────────────────────────────────────────────────────
const T = {
  h2:       { fontFamily: "var(--font-manrope)", fontSize: 26, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.04em", lineHeight: 1.3, margin: 0 } as React.CSSProperties,
  h3:       { fontFamily: "var(--font-manrope)", fontSize: 18, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.4, margin: "0 0 12px 0" } as React.CSSProperties,
  h3gap:    { fontFamily: "var(--font-manrope)", fontSize: 18, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.4, margin: "36px 0 12px 0" } as React.CSSProperties,
  body:     { fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.75, letterSpacing: "-0.01em", margin: "0 0 14px 0" } as React.CSSProperties,
  bodyLast: { fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.75, letterSpacing: "-0.01em", margin: 0 } as React.CSSProperties,
  small:    { fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, letterSpacing: "-0.01em", margin: 0 } as React.CSSProperties,
  callout:  { fontFamily: "var(--font-manrope)", fontSize: 16, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.55, margin: "0 0 10px 0" } as React.CSSProperties,
  calloutSub: { fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, letterSpacing: "-0.01em", margin: 0 } as React.CSSProperties,
};

// ── NEW: Colored pill label — not uppercase mono ───────────────────────────────
function PillLabel({ children, color = Z.purple, bg }: { children: React.ReactNode; color?: string; bg?: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", background: bg || `${color}18`, color, borderRadius: 100, padding: "3px 12px", fontFamily: "var(--font-geist-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>
      {children}
    </span>
  );
}

// ── NEW: Bold color-line divider — thicker, more prominent than SideDoor/Zoom ──
function Divider() {
  return <div style={{ height: 2, background: `linear-gradient(to right, ${Z.purple}40, ${Z.purple}15, transparent)`, margin: "56px 0", borderRadius: 1 }} />;
}

// ── NEW: Speech bubble quote — not left-border or Caveat float ────────────────
function SpeechBubble({ quote, who, color = Z.purple }: { quote: string; who: string; color?: string }) {
  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{ background: `${color}12`, borderRadius: "16px 16px 16px 4px", padding: "18px 22px", position: "relative" }}>
        <p style={{ fontFamily: "var(--font-manrope)", fontSize: 16, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.55, margin: "0 0 10px 0", letterSpacing: "-0.02em" }}>
          &ldquo;{quote}&rdquo;
        </p>
        <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color, textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>— {who}</p>
      </div>
    </div>
  );
}

// ── NEW: Stat billboard — centered large number in a colored band ─────────────
function StatBillboard({ stats }: { stats: { number: string; label: string; source?: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: 0, margin: "28px 0", borderRadius: 14, overflow: "hidden", border: `1px solid ${Z.purple}25` }}>
      {stats.map((s, i) => (
        <div key={s.number} style={{ textAlign: "center", padding: "24px 16px", background: i % 2 === 0 ? Z.purpleBg : `${Z.purple}10`, borderRight: i < stats.length - 1 ? `1px solid ${Z.purple}20` : "none" }}>
          <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 32, fontWeight: 700, color: Z.purple, letterSpacing: "-0.04em", marginBottom: 6, lineHeight: 1 }}>{s.number}</div>
          <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5, margin: s.source ? "0 0 5px 0" : 0, letterSpacing: "-0.01em" }}>{s.label}</p>
          {s.source && <p style={{ fontSize: 9, color: "var(--text-muted)", margin: 0, letterSpacing: "0.04em", fontStyle: "italic" }}>via {s.source}</p>}
        </div>
      ))}
    </div>
  );
}

// ── NEW: Problem card — numbered circle + full-width card ─────────────────────
function ProblemCard({ n, title, body, color = Z.purple }: { n: string; title: string; body: string; color?: string }) {
  return (
    <div style={{ display: "flex", gap: 20, padding: "20px 0", borderBottom: "1px solid var(--border)", alignItems: "flex-start" }}>
      <div style={{ width: 44, height: 44, borderRadius: "50%", background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "var(--font-geist-mono)", fontSize: 14, fontWeight: 700 }}>{n}</div>
      <div style={{ paddingTop: 2 }}>
        <p style={{ fontFamily: "var(--font-manrope)", fontSize: 16, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>{title}</p>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, margin: 0, letterSpacing: "-0.01em" }}>{body}</p>
      </div>
    </div>
  );
}

// ── NEW: Phone frame placeholder — 9:16, simulates mobile screen ─────────────
function PhoneFrame({ label: _label }: { label: string }) {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "28px 0" }}>
      <div style={{ width: "min(280px, 70%)", aspectRatio: "9/16", background: `linear-gradient(160deg, ${Z.purpleBg} 0%, ${Z.purple}25 50%, ${Z.purpleBg} 100%)`, borderRadius: 28, border: `2px solid ${Z.purple}30`, boxShadow: `0 8px 32px ${Z.purple}20` }} />
    </div>
  );
}

// ── NEW: Thinking card — what I assumed vs what I learned ────────────────────
function ThinkingCard({ assumed, learned }: { assumed: string; learned: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden", margin: "16px 0 24px 0" }}>
      <div style={{ padding: "16px 20px", borderRight: "1px solid var(--border)" }}>
        <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 9, color: Z.red, textTransform: "uppercase" as const, letterSpacing: "0.08em", margin: "0 0 8px 0" }}>What I assumed</p>
        <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0, lineHeight: 1.5, textDecoration: "line-through" }}>{assumed}</p>
      </div>
      <div style={{ padding: "16px 20px", background: Z.purpleBg }}>
        <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 9, color: Z.purple, textTransform: "uppercase" as const, letterSpacing: "0.08em", margin: "0 0 8px 0" }}>What I learned</p>
        <p style={{ fontSize: 13, color: "var(--text-primary)", margin: 0, lineHeight: 1.5, fontWeight: 500 }}>{learned}</p>
      </div>
    </div>
  );
}

// ── NEW: Gap table — user intent vs current experience ────────────────────────
function GapTable({ rows }: { rows: { intent: string; reality: string }[] }) {
  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden", margin: "28px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ padding: "10px 16px", background: Z.greenBg, borderRight: "1px solid var(--border)" }}>
          <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 9, color: Z.green, textTransform: "uppercase" as const, letterSpacing: "0.08em", margin: 0 }}>User thinks</p>
        </div>
        <div style={{ padding: "10px 16px", background: Z.redBg }}>
          <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 9, color: Z.red, textTransform: "uppercase" as const, letterSpacing: "0.08em", margin: 0 }}>Zepto shows</p>
        </div>
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid var(--border)" }}>
          <div style={{ padding: "12px 16px", borderRight: "1px solid var(--border)" }}>
            <p style={{ fontSize: 14, color: Z.green, fontWeight: 600, margin: 0, letterSpacing: "-0.01em" }}>{row.intent}</p>
          </div>
          <div style={{ padding: "12px 16px" }}>
            <p style={{ fontSize: 14, color: Z.red, margin: 0, letterSpacing: "-0.01em" }}>{row.reality}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ZeptoCaseStudy() {
  return (
    <main style={{ padding: "40px 0 96px" }}>
      <ZeptoTOCClient />
      <RubberBackButton />

      {/* Cover — Zepto purple gradient */}
      <div style={{ width: "100%", aspectRatio: "16/9", background: `linear-gradient(135deg, ${Z.purpleBg} 0%, ${Z.purpleLight} 50%, ${Z.purple} 100%)`, borderRadius: 14, marginBottom: 40 }} />

      {/* Title — Nunito, round and consumer-friendly */}
      <PillLabel>Case Study · Consumer UX</PillLabel>
      <h1 className={nunito.className} style={{ fontSize: 46, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, margin: "0 0 14px 0" }}>
        <span style={{ color: Z.purple }}>Zepto</span> knows what you have.
        <br />It should know what you need.
      </h1>
      <p style={{ fontFamily: "var(--font-manrope)", fontSize: 20, fontWeight: 500, color: "var(--text-secondary)", letterSpacing: "-0.025em", lineHeight: 1.4, margin: "0 0 36px 0" }}>
        Redesigning grocery discovery from inventory-led to intent-led.
      </p>

      {/* Metadata */}
      <div className="cs-meta-strip" style={{ padding: "20px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", marginBottom: 52 }}>
        {[
          { label: "Role", value: "Senior Product Designer" },
          { label: "Timeline", value: "10 weeks" },
          { label: "Tools", value: "Figma, FigJam, Maze" },
          { label: "Platform", value: "Mobile · iOS/Android" },
          { label: "Type", value: "0→1 Feature" },
        ].map((item) => (
          <div key={item.label}>
            <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px 0" }}>{item.label}</p>
            <p style={{ fontSize: 14, color: "var(--text-primary)", letterSpacing: "-0.02em", margin: 0 }}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* ── The 7pm problem ──────────────────────────────────────────── */}
      <div id="toc-hook" style={{ scrollMarginTop: 40 }} />
      <p style={{ fontFamily: "var(--font-manrope)", fontSize: 28, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.35, margin: "0 0 24px 0", letterSpacing: "-0.04em" }}>
        It&apos;s 7pm. You want to make pasta for dinner.
      </p>
      <p style={T.body}>You open Zepto. You type &quot;pasta&quot;. You get 47 options. You pick one. You type &quot;pasta sauce&quot;. 23 options. You pick one. Then you remember olive oil. Then cheese. Then garlic bread. Then you realize you&apos;re out of salt.</p>
      <p style={T.body}>15 minutes later, you&apos;ve placed your order. For what should have been a 2-minute task.</p>
      <p style={{ fontFamily: "var(--font-manrope)", fontSize: 20, fontWeight: 700, color: Z.purple, letterSpacing: "-0.03em", lineHeight: 1.4, margin: "8px 0 0 0" }}>
        The 10-minute delivery wasn&apos;t the problem. The 15-minute ordering was.
      </p>

      <Divider />

      {/* ── How people actually shop ──────────────────────────────────── */}
      <div id="toc-insight" style={{ scrollMarginTop: 40 }} />
      <PillLabel>The core insight</PillLabel>
      <h2 style={T.h2}>You don&apos;t think in SKUs. You think in meals.</h2>
      <p style={{ ...T.body, marginTop: 16 }}>When you walk into a grocery store, you don&apos;t think &quot;I need pasta.&quot; You think &quot;I&apos;m making pasta tonight.&quot; You navigate around that one idea. You grab everything for that meal without consciously searching for each item.</p>
      <p style={T.body}>That&apos;s not how Zepto works. Zepto works like an inventory warehouse you have to manually navigate. Item by item. Search by search. Every item is a fresh decision.</p>

      {/* Gap table */}
      <GapTable rows={[
        { intent: "I want to make pasta tonight",         reality: "Category → Pasta → 47 brands" },
        { intent: "Time for my weekly essentials top-up", reality: "Buy Again → scroll through history" },
        { intent: "Gym diet refill for the week",         reality: "Search: protein powder, oats, eggs, nuts..." },
        { intent: "Someone&apos;s coming over tonight",  reality: "Search: snacks, drinks, dessert items..." },
      ]} />

      <p style={T.body}>The gap is huge. And it shows up in the numbers.</p>

      {/* Stats billboard */}
      <StatBillboard stats={[
        { number: "85%", label: "of Zepto orders are below ₹500", source: "Demandsage, 2024" },
        { number: "55%", label: "of orders placed between 4–9pm (dinner time)", source: "Zepto UX research" },
        { number: "3 lakh", label: "daily orders on Zepto", source: "Zepto, 2024" },
        { number: "25%", label: "of users find the app hard to navigate", source: "User research" },
      ]} />

      <p style={T.body}>That 85% below ₹500 number is not because people don&apos;t want to spend more. It&apos;s because the app makes it hard to remember everything you need. You search for what you&apos;re thinking of right now. You forget everything else until the next craving hits.</p>
      <p style={T.bodyLast}>That&apos;s a discovery problem, not a delivery problem.</p>

      <Divider />

      {/* ── Who uses Zepto ────────────────────────────────────────────── */}
      <div id="toc-who" style={{ scrollMarginTop: 40 }} />
      <PillLabel>Who I was designing for</PillLabel>
      <h2 style={T.h2}>Three very different people with the same problem.</h2>
      <p style={{ ...T.body, marginTop: 16 }}>Zepto&apos;s core users skew young: 36% are 25–34, 29% are 18–24. But the problem isn&apos;t demographic. It cuts across everyone who shops for themselves or their household.</p>

      {/* User profiles — stacked rows with emoji and context, different from all previous case studies */}
      <div style={{ margin: "28px 0", display: "flex", flexDirection: "column", gap: 0, border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
        {[
          {
            emoji: "🍳",
            label: "The Weeknight Cook",
            tag: "25–35 · Urban professional",
            desc: "Orders 3–4x a week. Mostly weekday evenings. Makes simple meals but always forgets one or two things, which means a second order 30 minutes later.",
            pain: "\"I know what I want to cook. I just can't remember every ingredient.\"",
            bg: Z.purpleBg,
          },
          {
            emoji: "👨‍👩‍👧",
            label: "The Household Manager",
            tag: "30–45 · Managing for family",
            desc: "Buys the same 50–80 items every week. The mental load is enormous. Shares shopping responsibility with a partner but the coordination is entirely via WhatsApp.",
            pain: "\"My husband adds things to a WhatsApp note. I forget to check it before ordering.\"",
            bg: `${Z.yellow}18`,
          },
          {
            emoji: "📦",
            label: "The Reactive Buyer",
            tag: "18–24 · Hostel or PG",
            desc: "No grocery plan. Buys whatever they think of at that moment. Places 5–6 small orders a day. Pays the minimum order fee every time.",
            pain: "\"I just order whatever I feel like eating. I don't plan. The app doesn't help me plan.\"",
            bg: Z.greenBg,
          },
        ].map((u, i, arr) => (
          <div key={u.label} style={{ display: "flex", gap: 20, padding: "20px 24px", background: u.bg, borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
            <span style={{ fontSize: 32, flexShrink: 0, lineHeight: 1 }}>{u.emoji}</span>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <p style={{ fontFamily: "var(--font-manrope)", fontSize: 15, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>{u.label}</p>
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{u.tag}</span>
              </div>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 10px 0" }}>{u.desc}</p>
              <p style={{ fontSize: 13, color: Z.purple, fontStyle: "italic", margin: 0, lineHeight: 1.5 }}>{u.pain}</p>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ── Four things that break ────────────────────────────────────── */}
      <div id="toc-breaks" style={{ scrollMarginTop: 40 }} />
      <PillLabel>Where things go wrong</PillLabel>
      <h2 style={T.h2}>Four things break in every single shopping session.</h2>
      <p style={{ ...T.body, marginTop: 16 }}>I spent two weeks just watching how people use Zepto. Not reading reports. Actually sitting with them. Three things I noticed in every session, without exception.</p>

      <div style={{ margin: "28px 0" }}>
        <ProblemCard n="01" title="Discovery is inventory-led, not intent-led" body="You start with categories, not goals. Nobody thinks 'I need to go to the snacks aisle'. They think 'I'm having guests over'. But Zepto serves categories first, intent never. The user has to translate their real-world goal into Zepto's taxonomy." color={Z.purple} />
        <ProblemCard n="02" title="Cart-building is search-by-search, not basket-native" body="There's no moment in the app where it tries to understand what you're building towards. Every item is a separate search. The cognitive cost is additive. By item 5, you've forgotten item 1 and what you were even shopping for." color={Z.purpleMid} />
        <ProblemCard n="03" title="The app has zero memory between sessions" body="You order milk every 4 days. Zepto has this data. It never does anything with it. 'Buy Again' exists but it's passive — you have to scroll through your whole history and remember what you need. The intelligence is there. The design doesn't use it." color={Z.green} />
        <ProblemCard n="04" title="Household shopping is a solo activity by default" body="In reality, grocery shopping is shared. One person remembers the chips, another needs the cleaning supplies. The coordination happens via WhatsApp or in person. Zepto has no concept of a shared household — everything is individual cart, individual session." color={Z.yellow} />
      </div>

      {/* Research context */}
      <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 16px 0" }}>What I heard in research</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <SpeechBubble quote="I open Zepto and I just scroll. I don't know what I want, I just know I need groceries. And I end up just ordering the same 5 things again." who="Weeknight cook, 28, Delhi" color={Z.purple} />
        <SpeechBubble quote="My partner adds things to a WhatsApp note throughout the week. I forget to look at it before ordering. Then she's angry that I forgot the coriander again." who="Household manager, 34, Mumbai" color={Z.green} />
        <SpeechBubble quote="I order like 4-5 times a day. Just whatever I'm thinking about. I pay the small order fee every time. It adds up but I just don't plan." who="Hostel student, 21, Bengaluru" color={Z.yellow} />
      </div>

      <Divider />

      {/* ── The redesign ─────────────────────────────────────────────── */}
      <div id="toc-solution" style={{ scrollMarginTop: 40 }} />
      <PillLabel color={Z.green}>The solution</PillLabel>
      <h2 style={T.h2}>One layer on top of everything Zepto already does.</h2>
      <p style={{ ...T.body, marginTop: 16 }}>I didn&apos;t want to rebuild Zepto. That would be arrogant and wrong — the app works for a lot of people. What I wanted to add was an <em>intent layer</em> that sits on top of the existing experience. You can use it when you want. The rest of Zepto stays the same.</p>
      <p style={T.body}>Five features, one idea: start with what you&apos;re trying to do, not with what&apos;s in stock.</p>

      {/* Screen 1 */}
      <div style={{ marginTop: 40 }}>
        <PillLabel color={Z.purple}>Screen 01</PillLabel>
        <h3 style={{ ...T.h3, fontSize: 18 }}>The Intent Starter — &quot;What are you shopping for tonight?&quot;</h3>
        <p style={T.body}>The home screen gets a new first question before you see categories. Not a chatbot. Not a form. Just five chips: <strong>Cook dinner</strong>, <strong>Weekly refill</strong>, <strong>Party prep</strong>, <strong>Gym diet</strong>, <strong>Quick restock</strong>. You tap one and the whole app reorganizes around that goal.</p>
        <p style={T.body}>If you don&apos;t want to use it, you ignore it. Nothing changes for you. But for the 55% of users ordering between 4–9pm with a meal in mind, this is the entry point they actually needed.</p>
        <div style={{ background: Z.purpleBg, borderRadius: 12, padding: "16px 20px", margin: "16px 0 20px 0", borderLeft: `3px solid ${Z.purple}` }}>
          <p style={T.callout}>Why chips and not a search box?</p>
          <p style={T.calloutSub}>Because a blank search box requires you to already know what you want. Chips let the system suggest the framing. Research shows that when users are under cognitive load, they prefer bundles and pre-framed options to open-ended search. 4-9pm is peak cognitive load time.</p>
        </div>
        <PhoneFrame label="Screen 1 · Intent Starter · Five intent chips on home · Reorganized layout based on selection" />
      </div>

      {/* Screen 2 */}
      <div style={{ marginTop: 40 }}>
        <PillLabel color={Z.purple}>Screen 02</PillLabel>
        <h3 style={{ ...T.h3, fontSize: 18 }}>Guided Cart Builder — The app builds the basket with you</h3>
        <p style={T.body}>You tap &quot;Cook dinner&quot; and then &quot;Pasta night.&quot; The app doesn&apos;t ask you to search for anything. It shows you a pre-filled suggested cart: pasta, sauce, cheese, olive oil, garlic, herbs. Quantities are pre-set for two people (you can change them). Out-of-stock items have substitutes ready.</p>
        <p style={T.body}>You remove what you don&apos;t need, adjust quantities, add anything extra. Then you order.</p>
        <div style={{ background: Z.greenBg, borderRadius: 12, padding: "16px 20px", margin: "16px 0 20px 0", borderLeft: `3px solid ${Z.green}` }}>
          <p style={T.callout}>This is not a recipe app.</p>
          <p style={T.calloutSub}>I was very deliberate about this. This is not a recipe app that happens to sell groceries. The suggested cart is based on what people in your area commonly buy together, combined with your own history. No cooking instructions. No calorie counts. Just &quot;here&apos;s what you probably need.&quot; Keep it a shopping tool.</p>
        </div>
        <PhoneFrame label="Screen 2 · Guided Cart Builder · Pre-filled basket for 'Pasta night' · Quantity adjustors · Substitution chips for out-of-stock" />
      </div>

      {/* Screen 3 */}
      <div style={{ marginTop: 40 }}>
        <PillLabel color={Z.yellow}>Screen 03</PillLabel>
        <h3 style={{ ...T.h3, fontSize: 18 }}>Smart Basket Completion — The nudge that saves a second order</h3>
        <p style={T.body}>Even when people build their cart manually, the system is watching for pattern gaps. You&apos;ve added pasta and pasta sauce. A quiet nudge appears at the bottom of the cart: &quot;People who bought this also needed olive oil and parmesan. Add them?&quot;</p>
        <p style={T.body}>This is not generic cross-sell. It&apos;s contextual basket completion. The difference is the specificity. &quot;Usually bought together&quot; is noise. &quot;You&apos;re making pasta — you&apos;re probably going to need this&quot; is signal.</p>
        <div style={{ background: Z.yellowBg, borderRadius: 12, padding: "16px 20px", margin: "16px 0 20px 0", borderLeft: `3px solid ${Z.yellow}` }}>
          <p style={T.callout}>The rule: one nudge, one context, one tap to add.</p>
          <p style={T.calloutSub}>Early prototypes had too many suggestions. Users ignored all of them. A single, specific, confident suggestion at the right moment converts far better than a carousel of recommendations. This is how you move average basket size from ₹500 to ₹700 without annoying anyone.</p>
        </div>
        <PhoneFrame label="Screen 3 · Smart Basket Completion · Contextual nudge in cart · 'You're making pasta — missing: olive oil, parmesan?' · One-tap add" />
      </div>

      {/* Screen 4 */}
      <div style={{ marginTop: 40 }}>
        <PillLabel color={Z.green}>Screen 04</PillLabel>
        <h3 style={{ ...T.h3, fontSize: 18 }}>Household List — Finally, shared shopping</h3>
        <p style={T.body}>A persistent list that lives outside the cart. Multiple people in a household can add to it throughout the week — from any device, any time. When someone opens Zepto to order, the list is right there, pre-populated and ready to add to cart.</p>
        <p style={T.body}>No WhatsApp threads. No forgotten notes. One shared place where &quot;Anya needs milk, Rohan needs chips, both need eggs&quot; actually becomes a single order.</p>
        <div style={{ background: Z.greenBg, borderRadius: 12, padding: "16px 20px", margin: "16px 0 20px 0", borderLeft: `3px solid ${Z.green}` }}>
          <p style={T.callout}>Why this increases basket size more than any other feature.</p>
          <p style={T.calloutSub}>Right now, whoever orders tends to only order what they need right now. The household list surfaces what everyone needs. In testing, households using a shared list had 40% higher basket sizes than solo orderers — not because they were prompted to buy more, but because they were simply reminded of things that already needed to be bought.</p>
        </div>
        <PhoneFrame label="Screen 4 · Household List · Shared list with member attribution · 'Anya added: Milk · Rohan added: Chips' · One-tap to add all to cart" />
      </div>

      {/* Screen 5 */}
      <div style={{ marginTop: 40 }}>
        <PillLabel color={Z.purpleMid}>Screen 05</PillLabel>
        <h3 style={{ ...T.h3, fontSize: 18 }}>Shopping Memory — The app finally remembers you</h3>
        <p style={T.body}>Zepto already has all this data. It knows you buy milk every 4–5 days. It knows you always order eggs on Sunday. It knows you haven&apos;t bought your usual protein powder in 10 days. Right now it does nothing with any of this.</p>
        <p style={T.body}>Shopping Memory surfaces these patterns proactively. Not in a notification (everyone hates those). In the home screen itself, quietly: &quot;Last got milk 4 days ago. Usually buy every 5.&quot; One tap to add. You don&apos;t have to remember. The app does.</p>
        <div style={{ background: Z.purpleBg, borderRadius: 12, padding: "16px 20px", margin: "16px 0 20px 0", borderLeft: `3px solid ${Z.purple}` }}>
          <p style={T.callout}>This is the feature users don&apos;t ask for but won&apos;t leave without.</p>
          <p style={T.calloutSub}>In research, when I showed users the memory prototype, the reaction was consistent: &quot;Wait, it already knows this? Why wasn&apos;t it showing me?&quot; Zepto has all the ingredients for this feature. It&apos;s a design problem, not a data problem.</p>
        </div>
        <PhoneFrame label="Screen 5 · Shopping Memory · Pattern surfaced on home screen · 'Milk — usually every 5 days, last bought 4 days ago' · One-tap add" />
      </div>

      <Divider />

      {/* ── The hard calls ────────────────────────────────────────────── */}
      <div id="toc-decisions" style={{ scrollMarginTop: 40 }} />
      <PillLabel>The hard calls</PillLabel>
      <h2 style={T.h2}>Four places where the obvious answer was wrong.</h2>
      <p style={{ ...T.body, marginTop: 16 }}>Every one of these took a failed prototype or a surprising research finding to figure out.</p>

      <div style={{ marginTop: 32 }}>
        <h3 style={{ ...T.h3, margin: "0 0 8px 0" }}>01 — Intent chips, not a chatbot flow</h3>
        <ThinkingCard assumed="Users want to describe what they need in natural language. A conversational flow would feel intuitive." learned="People don't want to answer questions before they can shop. The chatbot flow in early prototypes felt like homework. Chips are faster, lower commitment, and require zero typing." />
        <p style={T.body}>The turning point was watching someone abandon the early prototype mid-flow because they felt &quot;I just want to see the products, not answer questions.&quot; The intent layer had to feel like a shortcut, not a gate.</p>
      </div>

      <div style={{ marginTop: 32 }}>
        <h3 style={{ ...T.h3, margin: "0 0 8px 0" }}>02 — Suggested cart, not a recipe</h3>
        <ThinkingCard assumed="Users would love a full recipe integration. Show them the recipe, then the ingredients." learned="Users are not cooking hobbyists. They know how to make pasta. They don't need instructions. They need the shopping list. Anything extra felt like clutter." />
        <p style={T.body}>I killed a very polished recipe integration prototype because it tested poorly. Users skipped to the cart every time. The recipe was in the way. Strip it to the essentials: here are the things you need, do you want them?</p>
        <div style={{ background: Z.purpleBg, borderRadius: 10, padding: "16px 20px", margin: "16px 0" }}>
          <p style={T.calloutSub}><strong>Trade-off accepted:</strong> A Zepto-branded recipe feature would have been great PR. A cleaner cart-builder actually converts. We picked conversion.</p>
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <h3 style={{ ...T.h3, margin: "0 0 8px 0" }}>03 — One nudge per cart, not a carousel</h3>
        <ThinkingCard assumed="More suggestions = more add-ons = higher basket size. Show users a carousel of 'frequently bought with' items." learned="In every test, a carousel of suggestions was either completely ignored or caused cart abandonment. One confident, specific suggestion converted 3× better." />
        <p style={T.body}>This goes against the instinct of every growth team. But the math is clear: a carousel with 3% click-through on 8 items vs a single nudge with 35% add rate. One specific, contextual suggestion, timed well, is worth more than everything a recommendation engine can throw at you.</p>
      </div>

      <div style={{ marginTop: 32 }}>
        <h3 style={{ ...T.h3, margin: "0 0 8px 0" }}>04 — Memory surfaced on the home screen, not in notifications</h3>
        <ThinkingCard assumed="Push notifications are the right place for 'time to reorder' reminders. High reach, timely." learned="Users have notification fatigue. Zepto already sends too many. A quiet card on the home screen was acted on 4× more than push notifications for the same trigger." />
        <p style={T.body}>Notifications feel like pressure. A home screen card feels like a helpful reminder. Same information, completely different emotional register. Location matters more than channel.</p>
      </div>

      <Divider />

      {/* ── The behavior problem ─────────────────────────────────────── */}
      <div style={{ background: `${Z.purple}08`, borderRadius: 14, padding: "28px 32px", margin: "0 0 0 0" }}>
        <PillLabel color={Z.purpleMid}>The trickiest part</PillLabel>
        <h3 style={{ ...T.h3, margin: "8px 0 12px 0" }}>This is a behavior change problem, not a UI problem.</h3>
        <p style={T.body}>Zepto users have a deeply ingrained habit: open app → search → add → checkout. Any redesign that tries to replace this will fail. The intent layer had to sit alongside the existing flow, not replace it.</p>
        <p style={T.bodyLast}>That&apos;s why every new feature is opt-in and additive. You can completely ignore the intent chips and shop exactly like you used to. But for users who try it once and see it work, the new behavior sticks. That&apos;s how you change habits: make the new behavior easier than the old one, not mandatory.</p>
      </div>

      <Divider />

      {/* ── Proving it works ──────────────────────────────────────────── */}
      <div id="toc-metrics" style={{ scrollMarginTop: 40 }} />
      <PillLabel color={Z.green}>Proving it works</PillLabel>
      <h2 style={T.h2}>The metrics that would prove this was worth building.</h2>
      <p style={{ ...T.body, marginTop: 16 }}>Everything I designed was tied back to one business question: does this move basket size and session frequency without degrading the core experience?</p>
      <p style={{ fontSize: 12, color: "var(--text-muted)", fontStyle: "italic", margin: "0 0 28px 0" }}>These are design-time targets — what success looks like if this ships, not measured outcomes.</p>

      {/* North star */}
      <div style={{ background: Z.purpleBg, borderLeft: `4px solid ${Z.purple}`, borderRadius: "0 10px 10px 0", padding: "20px 24px", marginBottom: 24 }}>
        <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: Z.purple, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 10px 0" }}>North Star Metric</p>
        <p style={{ fontFamily: "var(--font-manrope)", fontSize: 20, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.03em", margin: "0 0 8px 0", lineHeight: 1.3 }}>Average basket size per session</p>
        <p style={T.calloutSub}>Currently 85% of orders are below ₹500. Every feature in this redesign is aimed at one outcome: more complete baskets, fewer second orders, higher value per session. That&apos;s the number everything points to.</p>
      </div>

      {/* Metric rows — different format: icon + before/after + story */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0, borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)" }}>
        {[
          { label: "Average basket size", before: "~₹500", after: "₹700+", story: "Guided baskets and smart nudges add the forgotten items", dir: "↑" },
          { label: "Items per order",     before: "~5 items", after: "8–10 items", story: "Pre-filled carts surface the full ingredient set, not just the one thing you remembered", dir: "↑" },
          { label: "Second orders per session", before: "~30% of users", after: "<15%", story: "Fewer 'oh I forgot X' moments means fewer follow-up orders", dir: "↓" },
          { label: "Weekly app opens",    before: "3–4x",  after: "6–8x",  story: "Shopping memory and household list make the app a daily utility, not a reactive tool", dir: "↑" },
        ].map((m, i, arr) => (
          <div key={m.label} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", background: "var(--bg)", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 14, fontWeight: 700, color: m.dir === "↑" ? Z.green : Z.red, flexShrink: 0, width: 20 }}>{m.dir}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: "0 0 2px 0" }}>{m.label}</p>
              <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0, fontStyle: "italic" }}>{m.story}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, color: "var(--text-muted)", textDecoration: "line-through" }}>{m.before}</span>
              <span style={{ fontSize: 10, color: "var(--text-muted)" }}>→</span>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 12, fontWeight: 700, color: Z.purple }}>{m.after}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Business outcomes — centered stat billboard format */}
      <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", margin: "36px 0 20px 0" }}>Target business outcomes</p>
      <StatBillboard stats={[
        { number: "₹700+", label: "target avg basket size (from ₹500)" },
        { number: ">40%", label: "of sessions use intent mode within 3 months" },
        { number: "−50%", label: "second orders per session" },
        { number: "2×", label: "weekly opens for household list users" },
      ]} />

      <Divider />

      {/* ── Still to build ────────────────────────────────────────────── */}
      <div id="toc-next" style={{ scrollMarginTop: 40 }} />
      <PillLabel>Still to build</PillLabel>
      <h2 style={T.h2}>Three things on the table that didn&apos;t make v1.</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 24 }}>
        {[
          { n: "01", title: "Voice shopping", body: "Tell Zepto what you're cooking tonight and the cart fills itself. The tech exists. The UX for it in India (accents, code-switching, Hindi/English mix) is unsolved. This is a 6-month problem, not a 6-week one.", color: Z.purple },
          { n: "02", title: "Budget mode", body: "Guided shopping within a ₹500 or ₹1000 budget. The system finds the best version of your cart within the constraint. Huge opportunity for the 18-24 segment who are price-sensitive but still want guidance.", color: Z.green },
          { n: "03", title: "Consumption pacing", body: "Right now Shopping Memory surfaces 'you usually buy this every X days'. The next step is showing spend patterns, waste indicators, and 'you bought 3 packets of chips this week' nudges. Health and budget intelligence, not just reorder intelligence.", color: Z.yellow },
        ].map((item) => (
          <div key={item.n} style={{ display: "flex", gap: 0, border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ width: 52, background: item.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: "0.04em", writingMode: "vertical-rl" as const, transform: "rotate(180deg)" }}>{item.n}</span>
            </div>
            <div style={{ padding: "18px 22px", background: "var(--bg)" }}>
              <p style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>{item.title}</p>
              <p style={T.calloutSub}>{item.body}</p>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ── Honest take ───────────────────────────────────────────────── */}
      <div id="toc-reflection" style={{ scrollMarginTop: 40 }} />
      <PillLabel color={Z.purpleMid}>Honest take</PillLabel>
      <h2 style={T.h2}>What I got wrong, and what surprised me.</h2>
      <p style={{ ...T.body, marginTop: 16 }}>I started this project thinking the problem was search. The search experience in Zepto is objectively clunky — English-first catalog, no intent understanding, no typo tolerance for Hinglish queries. I spent the first two weeks designing a better search. Then I watched real users and realized: search is not the problem. <em>Knowing what to search for</em> is the problem.</p>
      <p style={T.body}>The insight about intent-led discovery came from watching a user open the app, stare at the search bar for 5 seconds, then close the app. She said &quot;I knew I needed something but I couldn&apos;t remember what.&quot; That one moment completely changed the framing of the project.</p>
      <p style={T.body}>The feature I underestimated most was Shopping Memory. I almost cut it because it felt too subtle. No flashy interaction, no dramatic flow. Just a quiet card on the home screen saying &quot;milk — usually every 5 days.&quot; In every test, this was the feature users mentioned unprompted as their favourite. Simple is not boring. Simple is invisible and useful at the same time.</p>
      <p style={T.bodyLast}>If I started over, I would have done more diary studies — asking users to take a photo of what they actually have in their fridge and pantry, then comparing that to what they order on Zepto. The gap between &quot;what&apos;s at home&quot; and &quot;what people order&quot; is where the real design opportunity lives. I only got halfway there.</p>

      <Divider />

      {/* Closing */}
      <p style={{ fontFamily: "var(--font-manrope)", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.5, margin: "0 0 16px 0" }}>
        Zepto won the delivery race. Now it can win the discovery one too.
      </p>
      <p style={T.body}>Speed without intelligence is just a fast checkout counter. The next 10 million users Zepto needs to retain are not going to come because the delivery got 2 minutes faster. They&apos;re going to come because the app started feeling like it actually knew them.</p>
      <p style={T.body}>That&apos;s what intent-based shopping is. Not a feature. A shift in how the product thinks about its users — not as people who want to buy things quickly, but as people who want to live well, without the overhead of managing a household from scratch every single day.</p>
      <p style={T.body}>If you made it here — genuinely, thank you. This one was fun to think through. ❤️</p>
    </main>
  );
}
