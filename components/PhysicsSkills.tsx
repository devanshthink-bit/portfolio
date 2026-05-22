"use client";
import { useEffect, useRef, useState } from "react";

type Cat = "design" | "engineering";

const CAT_COLOR: Record<Cat, string> = {
  design:      "#6B9FE4",
  engineering: "#5FB896",
};

const CAT_LABEL: Record<Cat, string> = {
  design:      "Design",
  engineering: "Engineering",
};

const ALL_ITEMS: { id: string; label: string; cat: Cat; src?: string }[] = [
  // Design — tools, craft skills, and design-oriented AI
  { id: "figma",      label: "Figma",                      cat: "design",      src: "/icons/figma.svg" },
  { id: "figjam",     label: "FigJam",                     cat: "design",      src: "/icons/figjam.svg" },
  { id: "framer",     label: "Framer",                     cat: "design",      src: "/icons/framer.svg" },
  { id: "notion",     label: "Notion",                     cat: "design",      src: "/icons/notion.svg" },
  { id: "ga",         label: "Google Analytics",           cat: "design",      src: "/icons/googleanalytics.svg" },
  { id: "figmamake",  label: "Figma Make",                 cat: "design",      src: "/icons/figmamake.svg" },
  { id: "visual",     label: "Visual Design",              cat: "design" },
  { id: "access",     label: "Accessibility",              cat: "design" },
  { id: "ia",         label: "Information Architecture",   cat: "design" },
  { id: "ds",         label: "Design Systems",             cat: "design" },
  { id: "st",         label: "Systems Thinking",           cat: "design" },
  { id: "ux",         label: "UX Research",                cat: "design" },
  { id: "proto",      label: "Rapid Prototyping",          cat: "design" },
  { id: "ix",         label: "Interaction Design",         cat: "design" },
  { id: "pt",         label: "Product Thinking",           cat: "design" },
  { id: "context",    label: "Context Design",             cat: "design" },
  { id: "workflow",   label: "Design Workflow Automation", cat: "design" },
  { id: "d2c",        label: "Design-to-Code Workflows",   cat: "design" },
  { id: "airesearch", label: "AI Research & Synthesis",    cat: "design" },
  // Engineering — dev stack and AI coding tools
  { id: "claudecode", label: "Claude Code",                cat: "engineering", src: "/icons/claudecode.svg" },
  { id: "cursor",     label: "Cursor",                     cat: "engineering", src: "/icons/cursor.svg" },
  { id: "codex",      label: "Codex",                      cat: "engineering", src: "/icons/codex.svg" },
  { id: "antigrav",   label: "Antigravity",                cat: "engineering", src: "/icons/antigravity.svg" },
  { id: "react",      label: "React.js",                   cat: "engineering", src: "/icons/react.svg" },
  { id: "next",       label: "Next.js",                    cat: "engineering", src: "/icons/nextdotjs.svg" },
  { id: "ts",         label: "TypeScript",                 cat: "engineering", src: "/icons/typescript.svg" },
  { id: "tailwind",   label: "Tailwind",                   cat: "engineering", src: "/icons/tailwindcss.svg" },
  { id: "git",        label: "Git",                        cat: "engineering", src: "/icons/git.svg" },
  { id: "flutter",    label: "Flutter",                    cat: "engineering", src: "/icons/flutter.svg" },
  { id: "storybook",  label: "Storybook",                  cat: "engineering", src: "/icons/storybook.svg" },
  { id: "pwa",        label: "PWAs",                       cat: "engineering", src: "/icons/pwa.svg" },
  { id: "rn",         label: "React Native",               cat: "engineering", src: "/icons/react.svg" },
  { id: "agents",     label: "Agent Orchestration",        cat: "engineering" },
  { id: "llm",        label: "LLM Integration",            cat: "engineering" },
  { id: "prompt",     label: "Prompt Systems",             cat: "engineering" },
];

const TAG_H  = 40;
const PAD_X  = 16;
const ICON_W = 17;

function Bucket({ cat }: { cat: Cat }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = ALL_ITEMS.filter((i) => i.cat === cat);
  const color = CAT_COLOR[cat];
  const [bucketH, setBucketH] = useState(420);

  useEffect(() => {
    const update = () => setBucketH(window.innerWidth < 768 ? 360 : 420);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    let cancelled = false;
    let animId: number;
    let rafRetry: number;
    let MatterLib: typeof import("matter-js");
    let runner: import("matter-js").Runner;
    let engine: import("matter-js").Engine;
    const tagEls: HTMLDivElement[] = [];

    // Prevent browser native drag ghost on the whole container
    container.addEventListener("dragstart", (e) => e.preventDefault());

    const init = async () => {
      // Import once; subsequent retries skip the await
      if (!MatterLib) MatterLib = await import("matter-js");
      if (cancelled) return;

      const { Engine, Runner, Bodies, Body, Composite, Mouse, MouseConstraint, Sleeping } = MatterLib;

      // Wait for container to have real dimensions (page transitions can delay layout)
      const W = container.offsetWidth  || container.getBoundingClientRect().width;
      const H = container.offsetHeight || container.getBoundingClientRect().height;
      if (W < 10 || H < 10) {
        rafRetry = requestAnimationFrame(() => { if (!cancelled) init(); });

        return;
      }

      // Use smaller tag dimensions on narrow (mobile) containers
      const isMobileW = W < 640;
      const tagH  = isMobileW ? 30 : TAG_H;
      const padX  = isMobileW ? 11 : PAD_X;
      const iconW = isMobileW ? 13 : ICON_W;
      const fontSize = isMobileW ? "11px" : "14px";

      // enableSleeping stops jitter once bodies come to rest
      engine = Engine.create({
        gravity: { x: 0, y: 1.2 },
        enableSleeping: true,
        positionIterations: 10,
        velocityIterations: 10,
        constraintIterations: 4,
      });

      const tagData: { body: import("matter-js").Body; el: HTMLDivElement; w: number }[] = [];

      // Pass 1: create tag elements
      items.forEach((item) => {
        const el = document.createElement("div");
        el.style.cssText = `
          position: absolute;
          top: 0; left: 0;
          width: max-content;
          height: ${tagH}px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0 ${padX}px;
          background: var(--tag-bg);
          border: 1.5px solid ${color}40;
          border-radius: 10px;
          box-shadow: var(--tag-shadow);
          font-size: ${fontSize};
          font-family: inherit;
          letter-spacing: -0.01em;
          color: var(--text-secondary);
          white-space: nowrap;
          visibility: hidden;
          pointer-events: none;
          user-select: none;
          will-change: transform;
          cursor: grab;
        `;

        if (item.src) {
          const img = document.createElement("img");
          img.src = item.src;
          img.draggable = false;
          img.style.cssText = `width:${iconW}px;height:${iconW}px;object-fit:contain;flex-shrink:0;-webkit-user-drag:none;filter:var(--icon-filter);`;
          img.onerror = () => { img.style.display = "none"; };
          el.appendChild(img);
        }

        el.draggable = false;
        el.addEventListener("dragstart", (e) => e.preventDefault());

        const span = document.createElement("span");
        span.textContent = item.label;
        el.appendChild(span);
        container.appendChild(el);
        tagEls.push(el);
      });

      const BPAD = 10;
      const WT   = 60;

      // Pass 2: read actual rendered widths
      items.forEach((_item, i) => {
        const el = tagEls[i];
        const w  = Math.max(el.offsetWidth, 60);

        // Spread evenly across full width so tags don't pile up on load
        const cols     = Math.max(1, Math.floor((W - BPAD * 2) / (w + 8)));
        const colWidth = (W - BPAD * 2) / cols;
        const col      = i % cols;
        const row      = Math.floor(i / cols);
        const x        = BPAD + col * colWidth + colWidth / 2;
        const y        = BPAD + row * (tagH + 10) + tagH / 2;

        const body = Bodies.rectangle(
          Math.min(Math.max(x, BPAD + w / 2), W - BPAD - w / 2),
          Math.min(y, H * 0.45),
          w, tagH,
          {
            restitution: 0.05,
            friction: 0.4,
            frictionAir: 0.018,  // low so angular momentum builds when grabbed at an end
            frictionStatic: 0.2, // low so rotation can initiate from edge grabs
            sleepThreshold: 60,
          }
        );

        Body.setVelocity(body, { x: (Math.random() - 0.5) * 0.3, y: Math.random() * 0.2 });
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.04);
        tagData.push({ body, el, w });
      });

      // Walls inset by BPAD so tags stay away from the visible edges
      const wallOpts = { isStatic: true, friction: 1, restitution: 0, frictionStatic: 1 };
      const floor     = Bodies.rectangle(W / 2,             H - BPAD + WT / 2,     W * 2, WT, wallOpts);
      const ceiling   = Bodies.rectangle(W / 2,             BPAD - WT / 2,         W * 2, WT, wallOpts);
      const wallLeft  = Bodies.rectangle(BPAD - WT / 2,     H / 2,                 WT, H * 2, wallOpts);
      const wallRight = Bodies.rectangle(W - BPAD + WT / 2, H / 2,                 WT, H * 2, wallOpts);

      Composite.add(engine.world, [...tagData.map((t) => t.body), floor, ceiling, wallLeft, wallRight]);

      // Mouse drag
      // Patch addEventListener before Mouse.create so Matter.js never captures wheel events
      const origAddEventListener = container.addEventListener.bind(container);
      (container as any).addEventListener = (type: string, ...args: any[]) =>
        type === "wheel" ? undefined : (origAddEventListener as any)(type, ...args);
      const mouse = Mouse.create(container);
      (container as any).addEventListener = origAddEventListener;

      const mc    = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.3, damping: 0.08, render: { visible: false } } as never,
      });
      Composite.add(engine.world, mc);

      let audioCtx: AudioContext | null = null;
      let interacted = false;
      const getAudio = () => {
        if (!audioCtx) audioCtx = new AudioContext();
        // iOS Safari suspends AudioContext until resumed inside a user gesture
        if (audioCtx.state === "suspended") audioCtx.resume();
        return audioCtx;
      };
      // Prime on first touch/click so subsequent sounds play immediately
      const primeAudio = () => { interacted = true; getAudio(); container.removeEventListener("pointerdown", primeAudio); };
      container.addEventListener("pointerdown", primeAudio);

      // Shaped noise buffer — exponential decay envelope baked in
      const noiseBuffer = (ctx: AudioContext, dur: number, exp: number) => {
        const buf = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * dur), ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, exp);
        return buf;
      };

      // Rubber lift — soft "tock": resonant sine at ~350Hz + tiny noise transient
      const playPickup = () => {
        try {
          const ctx = getAudio(); const t = ctx.currentTime;
          const osc = ctx.createOscillator(); const g = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(380, t);
          osc.frequency.exponentialRampToValueAtTime(220, t + 0.07);
          g.gain.setValueAtTime(0.18, t);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
          osc.connect(g); g.connect(ctx.destination);
          osc.start(); osc.stop(t + 0.09);

          const src = ctx.createBufferSource(); src.buffer = noiseBuffer(ctx, 0.03, 12);
          const f = ctx.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = 900; f.Q.value = 1.5;
          const ng = ctx.createGain(); ng.gain.setValueAtTime(0.14, t);
          src.connect(f); f.connect(ng); ng.connect(ctx.destination); src.start();
        } catch { /* blocked */ }
      };

      // Rubber drop — heavy satisfying thud: low sine body (110→65Hz) + low noise layer
      const playDrop = () => {
        try {
          const ctx = getAudio(); const t = ctx.currentTime;
          // body resonance — this is what gives the "solid" feeling
          const osc = ctx.createOscillator(); const g = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(115, t);
          osc.frequency.exponentialRampToValueAtTime(62, t + 0.18);
          g.gain.setValueAtTime(0.45, t);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
          osc.connect(g); g.connect(ctx.destination);
          osc.start(); osc.stop(t + 0.22);
          // surface impact noise
          const src = ctx.createBufferSource(); src.buffer = noiseBuffer(ctx, 0.1, 4);
          const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 260; f.Q.value = 1.8;
          const ng = ctx.createGain(); ng.gain.setValueAtTime(0.5, t); ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
          src.connect(f); f.connect(ng); ng.connect(ctx.destination); src.start();
        } catch { /* blocked */ }
      };

      // Rubber bump — tags colliding: soft mid "thump" at ~260Hz
      let lastCollisionSound = 0;
      const playTick = () => {
        if (!interacted) return;
        const now = Date.now(); if (now - lastCollisionSound < 90) return; lastCollisionSound = now;
        try {
          const ctx = getAudio(); const t = ctx.currentTime;
          const osc = ctx.createOscillator(); const g = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(280, t);
          osc.frequency.exponentialRampToValueAtTime(140, t + 0.06);
          g.gain.setValueAtTime(0.1, t);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
          osc.connect(g); g.connect(ctx.destination);
          osc.start(); osc.stop(t + 0.07);
        } catch { /* blocked */ }
      };

      // z-index counter — dragged tag always stays on top of peers
      let zTop = items.length + 10;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      MatterLib.Events.on(mc, "startdrag", (e: any) => {
        const t = tagData.find((d) => d.body === e.body);
        if (t) {
          Sleeping.set(e.body, false);
          t.el.style.zIndex = (++zTop).toString();
          container.classList.add("is-grabbing");
          document.documentElement.classList.add("physics-grabbing");
          playPickup();
          if (navigator.vibrate) navigator.vibrate(6);
        }
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      MatterLib.Events.on(mc, "enddrag", (e: any) => {
        const t = tagData.find((d) => d.body === e.body);
        if (t) {
          container.classList.remove("is-grabbing");
          document.documentElement.classList.remove("physics-grabbing");
          playDrop();
          if (navigator.vibrate) navigator.vibrate(28);
        }
      });

      // Play tick only when bodies are actually moving — ignores resting micro-contacts
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      MatterLib.Events.on(engine, "collisionStart", (e: any) => {
        for (const pair of e.pairs) {
          const speed = Math.max(pair.bodyA.speed, pair.bodyB.speed);
          if (speed > 1.2) { playTick(); break; }
        }
      });

      runner = Runner.create();
      Runner.run(runner, engine);

      const sync = () => {
        // Sort by y — tags lower on screen render in front, no ties
        const sorted = [...tagData].sort((a, b) => a.body.position.y - b.body.position.y);
        sorted.forEach(({ body, el, w }, rank) => {
          const { x, y } = body.position;
          el.style.transform = `translate(${x - w / 2}px, ${y - tagH / 2}px) rotate(${body.angle}rad)`;
          if (el.style.cursor !== "grabbing") el.style.zIndex = (rank + 1).toString();
          el.style.visibility = "visible";
          el.style.pointerEvents = "auto";
        });
        animId = requestAnimationFrame(sync);
      };
      sync();
    };

    init();

    return () => {
      cancelled = true;
      cancelAnimationFrame(animId);
      cancelAnimationFrame(rafRetry);
      if (runner && MatterLib) MatterLib.Runner.stop(runner);
      if (engine && MatterLib) MatterLib.Engine.clear(engine);
      tagEls.forEach((el) => el.remove());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, flex: 1 }}>
      <div
        ref={containerRef}
        onMouseEnter={() => window.dispatchEvent(new Event("cursor:hide"))}
        onMouseLeave={() => window.dispatchEvent(new Event("cursor:show"))}
        className="physics-cursor-zone"
        style={{
          position: "relative",
          width: "100%",
          height: bucketH,
          background: "var(--card-bg)",
          borderRadius: 12,
          overflow: "hidden",
          border: `1px solid ${color}22`,
        }}
      >
        {/* Label pinned inside top-center, behind tags */}
        <div style={{
          position: "absolute",
          top: 16, left: 0, right: 0,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 0,
        }}>
          <span style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color,
            opacity: 0.7,
          }}>
            {CAT_LABEL[cat]}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PhysicsSkills() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <Bucket cat="design" />
      <Bucket cat="engineering" />
    </div>
  );
}
