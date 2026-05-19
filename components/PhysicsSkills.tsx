"use client";
import { useEffect, useRef } from "react";

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

const TAG_H  = 36;
const PAD_X  = 14;
const ICON_W = 15;

function Bucket({ cat }: { cat: Cat }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = ALL_ITEMS.filter((i) => i.cat === cat);
  const color = CAT_COLOR[cat];

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    let animId: number;
    let MatterLib: typeof import("matter-js");
    let runner: import("matter-js").Runner;
    let engine: import("matter-js").Engine;
    const tagEls: HTMLDivElement[] = [];

    // Prevent browser native drag ghost on the whole container
    container.addEventListener("dragstart", (e) => e.preventDefault());

    const init = async () => {
      MatterLib = await import("matter-js");
      const { Engine, Runner, Bodies, Body, Composite, Mouse, MouseConstraint } = MatterLib;

      const W = container.offsetWidth;
      const H = container.offsetHeight;

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
          height: ${TAG_H}px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0 ${PAD_X}px;
          background: var(--bg);
          border: 1.5px solid ${color}40;
          border-radius: 10px;
          box-shadow:
            0 1px 2px rgba(0,0,0,0.07),
            0 3px 7px rgba(0,0,0,0.09),
            0 8px 18px rgba(0,0,0,0.06),
            inset 0 1px 0 rgba(255,255,255,0.70),
            inset 0 -1px 0 rgba(0,0,0,0.05);
          font-size: 13px;
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
          img.style.cssText = `width:${ICON_W}px;height:${ICON_W}px;object-fit:contain;flex-shrink:0;-webkit-user-drag:none;`;
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
      items.forEach((item, i) => {
        const el = tagEls[i];
        const w  = Math.max(el.offsetWidth, 60);

        const cols = Math.max(1, Math.floor((W - BPAD * 2) / (w + 8)));
        const col  = i % cols;
        const row  = Math.floor(i / cols);
        const x    = BPAD + col * (w + 8) + w / 2;
        const y    = BPAD + row * (TAG_H + 8) + TAG_H / 2;

        const body = Bodies.rectangle(
          Math.min(x, W - BPAD - w / 2),
          Math.min(y, H * 0.5),
          w, TAG_H,
          {
            restitution: 0.05,
            friction: 0.8,
            frictionAir: 0.04,
            frictionStatic: 0.8,
            sleepThreshold: 40,
          }
        );

        Body.setVelocity(body, { x: (Math.random() - 0.5) * 0.4, y: Math.random() * 0.3 });
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.06);
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
      const mouse = Mouse.create(container);
      const mc    = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.3, damping: 0.08, render: { visible: false } } as never,
      });
      Composite.add(engine.world, mc);

      let audioCtx: AudioContext | null = null;
      const getAudio = () => { if (!audioCtx) audioCtx = new AudioContext(); return audioCtx; };
      // Prime AudioContext on first interaction so initial-drop sounds can play
      const primeAudio = () => { getAudio(); container.removeEventListener("pointerdown", primeAudio); };
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
          t.el.style.cursor = "grabbing";
          t.el.style.zIndex = (++zTop).toString();
          playPickup();
          if (navigator.vibrate) navigator.vibrate(6);
        }
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      MatterLib.Events.on(mc, "enddrag", (e: any) => {
        const t = tagData.find((d) => d.body === e.body);
        if (t) {
          t.el.style.cursor = "grab";
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
          el.style.transform = `translate(${x - w / 2}px, ${y - TAG_H / 2}px) rotate(${body.angle}rad)`;
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
      cancelAnimationFrame(animId);
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
        style={{
          position: "relative",
          width: "100%",
          height: 420,
          background: "var(--card-bg)",
          borderRadius: 12,
          overflow: "hidden",
          cursor: "default",
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
