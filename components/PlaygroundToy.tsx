"use client";
import { useEffect, useRef } from "react";

// The Claude Code crab riding the Codex logo like a tyre, playing with the Cursor logo, on the
// baseline of the "Side projects" label. On its own it picks a game at random: a tap, a power
// kick with a run-up, dribbling, keepy-uppies on its head, carrying the cube on its head, or
// flicking it over its head (also what it does when the cube is stuck at an end). After a good
// one it celebrates: hops, a little dance, a wave at you, or (rarely) a flip. Bring the cursor
// near and it plays with you instead: waves hello, follows the cursor, and jumps to boop it when
// it hovers above its head. Its eyes watch the cube, glance around and follow the cursor, and
// turn into ^ ^ when it's happy. Click to hop. Nothing stretches.
// All motion is one rAF loop that writes transforms straight to the DOM.

// The Codex logo and the Cursor cube, from @lobehub/icons.
const CODEX =
  "M8.086.457a6.105 6.105 0 013.046-.415c1.333.153 2.521.72 3.564 1.7a.117.117 0 00.107.029c1.408-.346 2.762-.224 4.061.366l.063.03.154.076c1.357.703 2.33 1.77 2.918 3.198.278.679.418 1.388.421 2.126a5.655 5.655 0 01-.18 1.631.167.167 0 00.04.155 5.982 5.982 0 011.578 2.891c.385 1.901-.01 3.615-1.183 5.14l-.182.22a6.063 6.063 0 01-2.934 1.851.162.162 0 00-.108.102c-.255.736-.511 1.364-.987 1.992-1.199 1.582-2.962 2.462-4.948 2.451-1.583-.008-2.986-.587-4.21-1.736a.145.145 0 00-.14-.032c-.518.167-1.04.191-1.604.185a5.924 5.924 0 01-2.595-.622 6.058 6.058 0 01-2.146-1.781c-.203-.269-.404-.522-.551-.821a7.74 7.74 0 01-.495-1.283 6.11 6.11 0 01-.017-3.064.166.166 0 00.008-.074.115.115 0 00-.037-.064 5.958 5.958 0 01-1.38-2.202 5.196 5.196 0 01-.333-1.589 6.915 6.915 0 01.188-2.132c.45-1.484 1.309-2.648 2.577-3.493.282-.188.55-.334.802-.438.286-.12.573-.22.861-.304a.129.129 0 00.087-.087A6.016 6.016 0 015.635 2.31C6.315 1.464 7.132.846 8.086.457zm-.804 7.85a.848.848 0 00-1.473.842l1.694 2.965-1.688 2.848a.849.849 0 001.46.864l1.94-3.272a.849.849 0 00.007-.854l-1.94-3.393zm5.446 6.24a.849.849 0 000 1.695h4.848a.849.849 0 000-1.696h-4.848z";
const CURSOR =
  "M22.106 5.68L12.5.135a.998.998 0 00-.998 0L1.893 5.68a.84.84 0 00-.419.726v11.186c0 .3.16.577.42.727l9.607 5.547a.999.999 0 00.998 0l9.608-5.547a.84.84 0 00.42-.727V6.407a.84.84 0 00-.42-.726zm-.603 1.176L12.228 22.92c-.063.108-.228.064-.228-.061V12.34a.59.59 0 00-.295-.51l-9.11-5.26c-.107-.062-.063-.228.062-.228h18.55c.264 0 .428.286.296.514z";

// The whole toy is drawn at 90% (Devansh, 26 Sep: "a little smaller"); .pg-toy scales it in CSS,
// so screen distances are divided by S to get back to the toy's own pixels.
const S = 0.9;
const H = 100; // stage height; its bottom edge is the label's baseline (the ground)
const R = 25; // tyre radius, px
const U = 2; // px per Claude Code logo unit
const CUBE = 30; // Cursor logo size, px
const HEX = 11.86 * (CUBE / 24); // hexagon corner radius, px
const MIN_D = R + HEX - 2; // centre distance at which the tyre touches the cube
const LEGS = [4.487, 7.488, 15, 18]; // x of each Claude Code leg, in logo units
const EYE = { y: 8.102, w: 1.488, h: 2.847, xs: [6, 16.51] };
const EYE_Y = H - 2 * R - 15 * U + (9.5 - 5) * U; // eye height in the stage, px
const STEPS = 180; // rotation samples for the Codex outline

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const rand = (a: number, b: number) => a + Math.random() * (b - a);

export default function PlaygroundToy() {
  const stage = useRef<HTMLDivElement>(null);
  const rig = useRef<HTMLDivElement>(null);
  const tyre = useRef<SVGSVGElement>(null);
  const tyrePath = useRef<SVGPathElement>(null);
  const crab = useRef<SVGSVGElement>(null);
  const shadow = useRef<HTMLSpanElement>(null);
  const cube = useRef<SVGSVGElement>(null);
  const cubeShadow = useRef<HTMLSpanElement>(null);
  const legs = useRef<(SVGRectElement | null)[]>([]);
  const eyes = useRef<(SVGRectElement | null)[]>([]);
  const joy = useRef<(SVGPathElement | null)[]>([]);
  const armL = useRef<SVGRectElement>(null);
  const armR = useRef<SVGRectElement>(null);
  const heart = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // The Codex logo is a bumpy cloud, not a circle. For each rotation, find how far its lowest
    // and highest points are from the centre, so it rises and dips on its bumps as it rolls and
    // the crab rides the bumps on top.
    const below = new Float32Array(STEPS).fill(R), above = new Float32Array(STEPS).fill(R);
    const path = tyrePath.current;
    if (path) {
      const len = path.getTotalLength(), s = (2 * R) / 24, pts: [number, number][] = [];
      for (let i = 0; i < 240; i++) {
        const p = path.getPointAtLength((i / 240) * len);
        pts.push([(p.x - 12) * s, (p.y - 12) * s]);
      }
      for (let k = 0; k < STEPS; k++) {
        const a = (k / STEPS) * Math.PI * 2, sin = Math.sin(a), cos = Math.cos(a);
        let lo = 0, hi = 0;
        for (const [px, py] of pts) {
          const y = px * sin + py * cos;
          if (y > lo) lo = y;
          if (-y > hi) hi = -y;
        }
        below[k] = lo; above[k] = hi;
      }
    }
    const sample = (t: Float32Array, a: number) => {
      const f = ((((a / (Math.PI * 2)) % 1) + 1) % 1) * STEPS, i = Math.floor(f) % STEPS;
      return t[i] + (t[(i + 1) % STEPS] - t[i]) * (f - Math.floor(f));
    };

    // Keep both toys right of the label text.
    let start = 0;
    const measure = () => {
      const label = el.parentElement?.querySelector(".section-title");
      if (!label) return;
      const range = document.createRange();
      range.selectNodeContents(label);
      start = (range.getBoundingClientRect().right - el.getBoundingClientRect().left) / S + 24;
    };
    measure();

    // Tyre
    let x = start + R + 10, v = 0, prevV = 0, acc = 0, spin = 0, sink = 0, ride = 0;
    let target = x, k = 7, vmax = 240;
    // Crab
    let tilt = 0, tiltV = 0, lean = 0, hopY = 0, hopV = 0, flip = 0, flipV = 0, phase = 0;
    let armL0 = 0, armR0 = 0, happy = 0;
    // Cursor cube
    let cx = x + 120, cv = 0, turn = Math.PI / 6, cy = 0, cyV = 0, flying = false, airSpin = 0, onHead = false;
    // Eyes
    let lookX = 0, lookY = 0, blinkIn = 2.5, blink = 0, atYou = 0;
    let glance = 0, glanceIn = 1.5, gx = 0, gy = 0;
    let ptr: { x: number; y: number } | null = null, ptrAge = 99;
    let hovering = false, steering = false, touchT = 0, clock = 0, lastFlip = -99;
    let greet = 0, reachIn = 0, heartT = 0, heartX = 0, heartY = 0;
    let raf = 0, last = 0, visible = true;

    // What it's playing right now. Each game runs in stages; a party is how it celebrates.
    type Mode = "rest" | "kick" | "power" | "dribble" | "juggle" | "carry" | "flick" | "watch" | "party";
    type Party = "hops" | "flip" | "wave" | "dance";
    let mode: Mode = "rest", party: Party = "hops", beat = 0, t = 0, restFor = 1, d = 1, n = 0, goal = 0, x0 = 0;
    let lastGame: Mode = "rest";

    const cubeLift = () => {
      // The hexagon rests on a flat side and rises onto a corner as it tips over.
      const phi = ((((turn - Math.PI / 6) % (Math.PI / 3)) + Math.PI / 3) % (Math.PI / 3)) - Math.PI / 6;
      return HEX * Math.cos(phi);
    };
    const headCy = () => 20 + sink + ride + hopY - H; // cube offset that puts it on the crab's head

    const setMode = (m: Mode) => { mode = m; beat = 0; t = 0; };
    const rest = (s: number) => { setMode("rest"); restFor = s; };
    // Flips are a rare treat: at most one every 25 s, and less likely than the rest.
    const celebrate = (p?: Party) => {
      const all: [Party, number][] = [["hops", 3], ["dance", 3], ["wave", 2], ["flip", clock - lastFlip > 25 ? 0.6 : 0]];
      let r = Math.random() * all.reduce((sum, [, w]) => sum + w, 0);
      party = p ?? "hops";
      if (!p) for (const [q, w] of all) { r -= w; if (r <= 0) { party = q; break; } }
      if (party === "flip") lastFlip = clock;
      setMode("party");
      x0 = x;
      happy = party === "wave" ? 0 : 1.2;
    };
    const nextGame = () => {
      const games: [Mode, number][] = [["kick", 3], ["power", 2], ["dribble", 2], ["juggle", 3], ["carry", 2], ["flick", 1.5]];
      const pool = games.filter(([g]) => g !== lastGame);
      let r = Math.random() * pool.reduce((s, [, w]) => s + w, 0);
      let pick: Mode = pool[0][0];
      for (const [g, w] of pool) { r -= w; if (r <= 0) { pick = g; break; } }
      lastGame = pick;
      setMode(pick);
      d = Math.sign(cx - x) || 1;
    };
    // Tap the cube straight up, a little back towards the crab so it drops onto its head.
    const pop = (up: number) => {
      flying = true; cyV = -up; cy = Math.min(cy, -0.5); cv = -d * 60; airSpin = rand(-6, 6);
    };
    // Scoop the cube up and over its head (it passes behind the crab), back into open space.
    const flick = (dir: number) => {
      flying = true; onHead = false;
      cyV = -rand(490, 520); cy = -0.5;
      cv = -dir * rand(150, 200);
      airSpin = -dir * rand(9, 14);
      tiltV -= dir * 90;
      setMode("watch");
    };

    const brain = (dt: number, lo: number, hi: number, cLo: number, cHi: number) => {
      t += dt;
      armL0 = 0; armR0 = 0; lean = 0;
      k = 7; vmax = 240;
      const near = Math.abs(cx - x) <= MIN_D + 3;
      switch (mode) {
        case "rest":
          target = x;
          if (t > restFor && !flying) nextGame();
          break;
        case "kick": // roll at it and give it a good tap
          target = cx + d * 40; vmax = 230;
          if (t > 4) rest(0.4);
          break;
        case "power": // back up, wind up, then charge
          if (beat === 0) {
            target = clamp(cx - d * (MIN_D + 90), lo, hi); k = 9; vmax = 260;
            if ((Math.abs(x - target) < 4 && Math.abs(v) < 15) || t > 2.5) { beat = 1; t = 0; }
          } else if (beat === 1) {
            target = x; lean = -d * 9; armL0 = armR0 = 25;
            if (t > 0.5) { beat = 2; t = 0; }
          } else {
            target = cx + d * 60; k = 30; vmax = 470;
            if (t > 3) rest(0.4);
          }
          break;
        case "dribble": // little taps, keeping the cube just ahead
          target = cx + d * 6; k = 10; vmax = 120;
          if (t > 3.2) celebrate("dance");
          break;
        case "flick": // walk up to it and flip it over its head
          target = cx - d * (MIN_D - 3); vmax = 150;
          if (t > 3) rest(0.4);
          break;
        case "juggle":
        case "carry":
          if (beat === 0) { // walk up gently, then pop it up
            target = cx - d * (MIN_D - 1); k = 9; vmax = 150;
            if ((near && Math.abs(v) < 70) || t > 3) {
              if (!near) { rest(0.4); break; }
              pop(mode === "juggle" ? 580 : 555); // the head is ~80px up
              beat = 1; t = 0; n = 0; goal = Math.floor(rand(3, 6));
            }
          } else if (beat === 1) { // keep under it; bounces are handled with the cube
            target = cx + cv * 0.12; k = 22; vmax = 320; armL0 = armR0 = 18;
            if (!flying && !onHead) { atYou = 0.9; rest(0.7); } // dropped it: look at you, try again
          } else { // carrying it on its head
            target = goal; k = 6; vmax = 150; armL0 = armR0 = 30;
            if (Math.abs(x - goal) < 6) goal = rand(lo, hi);
            if (t > 3.5) { // toss it off
              onHead = false; flying = true; cyV = -330; cv = (Math.sign(v) || d) * 190; airSpin = rand(8, 12) * (Math.sign(cv) || 1);
              setMode("watch");
            }
          }
          break;
        case "watch":
          target = x;
          if (!flying && t > 0.2) celebrate();
          break;
        case "party":
          if (party === "hops") {
            target = x; armL0 = armR0 = 35;
            if (beat === 0 && hopY === 0) { hopV = -260; beat = 1; }
            else if (beat === 1 && t > 0.45 && hopY === 0) { hopV = -300; beat = 2; }
            if (t > 1.2) rest(rand(0.3, 0.9));
          } else if (party === "flip") {
            target = x; armL0 = armR0 = 40;
            if (beat === 0 && hopY === 0) { hopV = -430; flipV = (Math.random() < 0.5 ? -1 : 1) * 360 / (860 / 1300); beat = 1; }
            if (beat === 1 && t > 0.2 && hopY === 0) rest(rand(0.4, 0.9));
          } else if (party === "wave") {
            target = x; atYou = 0.2;
            armR0 = 55 + Math.sin(t * 14) * 28;
            if (t > 1.4) rest(rand(0.2, 0.7));
          } else { // dance: rock the tyre back and forth, arms swinging
            target = x0 + Math.sin(t * 10) * 9; k = 40; vmax = 200;
            armL0 = 20 + Math.sin(t * 10) * 22; armR0 = 20 - Math.sin(t * 10) * 22;
            if (t > 1.7) rest(rand(0.3, 0.8));
          }
          break;
      }
      target = clamp(target, lo, hi);
      if (!flying && (cx <= cLo + 1 || cx >= cHi - 1) && mode === "dribble" && near) flick(Math.sign(cx - x) || d);
    };

    const draw = (time: number) => {
      const moving = clamp(Math.abs(v) / 90, 0, 1);
      const bob = hopY === 0 ? -Math.abs(Math.sin(phase)) * 1.2 * moving : 0;
      rig.current!.style.transform = `translate(${x}px, ${sink}px)`;
      tyre.current!.style.transform = `rotate(${(spin * 180) / Math.PI}deg)`;
      // Tilt pivots on its feet; the flip turns it round its middle.
      crab.current!.style.transform =
        `translateY(${ride + hopY + bob}px) rotate(${tilt}deg) translateY(-15px) rotate(${flip}deg) translateY(15px)`;
      shadow.current!.style.transform = `translateX(${x}px) scaleX(${1 - Math.min(0.3, -hopY / 80)})`;

      cube.current!.style.transform =
        `translate(${cx}px, ${-cubeLift() + cy}px) rotate(${(turn * 180) / Math.PI}deg)`;
      cubeShadow.current!.style.transform = `translateX(${cx}px) scaleX(${1 - Math.min(0.6, -cy / 90)})`;
      cubeShadow.current!.style.opacity = String(1 - Math.min(0.7, -cy / 110));

      // Walk: the tyre's top slides under the crab, so it steps against it, pairs alternating.
      legs.current.forEach((leg, i) => {
        const up = hopY < 0 ? 0.9 : Math.max(0, Math.sin(phase + (i % 2) * Math.PI)) * 1.5 * moving;
        leg?.setAttribute("transform", `translate(0 ${-up})`);
      });
      // Arms balance while it rolls, go up when it's happy, and do whatever the game asks.
      const wave = Math.sin(time / 90) * 6 * moving;
      const base = 6 + moving * 14 + (hopY < 0 ? 22 : 0) + (happy > 0 ? 26 + Math.sin(time / 60) * 10 : 0);
      armL.current?.setAttribute("transform", `rotate(${base + armL0 + Math.max(0, tilt) * 2.5 + wave} 3 12.5)`);
      armR.current?.setAttribute("transform", `rotate(${-(base + armR0 + Math.max(0, -tilt) * 2.5 - wave)} 21 12.5)`);

      // Eyes keep their size and shape; they only move and blink. When it's happy they turn
      // into little ^ ^.
      const glad = happy > 0 || mode === "party";
      heart.current!.style.opacity = String(Math.max(0, heartT));
      heart.current!.style.transform = `translate(${heartX - 7}px, ${heartY - 22 - (1 - heartT) * 26}px)`;
      const h = blink > 0 ? 0.3 : EYE.h;
      eyes.current.forEach((eye, i) => {
        if (!eye) return;
        eye.setAttribute("x", String(EYE.xs[i] + lookX));
        eye.setAttribute("y", String(EYE.y + (EYE.h - h) / 2 + lookY));
        eye.setAttribute("height", String(h));
        eye.setAttribute("opacity", glad ? "0" : "1");
      });
      joy.current.forEach((j) => {
        j?.setAttribute("transform", `translate(${lookX * 0.6} ${lookY * 0.5})`);
        j?.setAttribute("opacity", glad ? "1" : "0");
      });
    };

    const step = (time: number) => {
      const dt = Math.min(0.033, last ? (time - last) / 1000 : 0.016);
      last = time;
      const w = el.clientWidth;
      const lo = start + R, hi = w - R - 4;
      const cLo = start + HEX, cHi = w - HEX - 4;

      // Your cursor: while it's over the stage (and moved in the last 3 s) the crab plays with it
      // instead of the cube. It waves hello, follows it, and jumps to boop it when it hovers above
      // its head; a boop pops a heart. Leave the cursor still and it goes back to its own games.
      clock += dt;
      ptrAge += dt;
      if (touchT > 0) touchT -= dt;
      const r = el.getBoundingClientRect();
      // "Near" reaches 70px above the stage too, so there is room to hold the cursor over its head.
      if (ptr && !touchT) hovering = ptr.x > r.left && ptr.x < r.right && ptr.y > r.top - 70 && ptr.y < r.bottom;
      const nowSteering = (hovering || touchT > 0) && ptrAge < 3;
      if (nowSteering && !steering) {
        if (onHead) { onHead = false; flying = true; cyV = -200; cv = 0; }
        greet = 1.1; happy = 1.1;
      }
      if (steering && !nowSteering) rest(rand(0.3, 0.8));
      steering = nowSteering;
      if (steering && ptr) {
        if (mode !== "rest") rest(0.5);
        const pxs = (ptr.x - r.left) / S, pys = (ptr.y - r.top) / S;
        const top = 20 + sink + ride; // top of the crab's head, standing
        const under = Math.abs(pxs - x) < 26;
        target = under ? x + (pxs - x) * 0.4 : pxs;
        k = 14; vmax = 380; lean = 0;
        armL0 = 0; armR0 = 0;
        if (greet > 0) { greet -= dt; armR0 = 55 + Math.sin(clock * 14) * 28; }
        else if (under && pys < top - 6) armL0 = armR0 = 45; // reaching up for it
        reachIn -= dt;
        if (under && pys < top - 6 && pys > top - 110 && hopY === 0 && reachIn <= 0) {
          hopV = -Math.min(520, Math.sqrt(2 * 1300 * Math.max(10, top - pys)) + 30);
          reachIn = rand(0.6, 1.1);
        }
        // Boop: the top of its head touches the cursor.
        if (hopY < 0 && heartT <= 0 && Math.hypot(pxs - x, pys - (top + hopY)) < 16) {
          heartT = 1; heartX = pxs; heartY = pys; happy = 1.2;
        }
      } else brain(dt, lo, hi, cLo, cHi);
      if (heartT > 0) heartT -= dt * 1.1;
      target = clamp(target, lo, hi);

      // Spring towards the target, capped speed: it speeds up, cruises, and brakes.
      v += clamp(k * (target - x) - 2 * Math.sqrt(k) * 0.9 * v, -1600, 1600) * dt;
      v = clamp(v, -vmax, vmax);
      x = clamp(x + v * dt, lo, hi);
      spin += (v * dt) / R; // rolls without slipping
      sink = R - sample(below, spin); // the tyre dips when a hollow is at the bottom
      ride = R - sample(above, spin); // and the crab drops into a hollow on top
      phase += (Math.abs(v) * dt) / 7;
      acc += (((v - prevV) / Math.max(dt, 0.001)) - acc) * Math.min(1, dt * 10);
      prevV = v;

      // Crab hops (and flips while in the air).
      if (hopY < 0 || hopV < 0) {
        hopV += 1300 * dt;
        hopY += hopV * dt;
        flip += flipV * dt;
        if (hopY >= 0) { hopY = 0; hopV = 0; flip = 0; flipV = 0; }
      }

      // The cube: on its head, in the air, or rolling corner over corner until it settles flat.
      if (onHead) {
        cx = x + clamp(tilt, -15, 15) * 0.4;
        cy = headCy(); cyV = 0; cv = v;
        const flat = Math.PI / 6 + Math.round((turn - Math.PI / 6) / (Math.PI / 3)) * (Math.PI / 3);
        turn += (flat - turn) * Math.min(1, dt * 10);
      } else {
        if (flying) {
          turn += airSpin * dt;
          cv *= Math.exp(-0.2 * dt);
        } else {
          cv *= Math.exp(-1.1 * dt);
          cv += -260 * Math.sin(6 * (turn - Math.PI / 6)) * dt;
          turn += (cv * dt) / (HEX * 0.93);
        }
        cx += cv * dt;
        if (cx < cLo) { cx = cLo; cv = Math.abs(cv) * 0.45; }
        if (cx > cHi) { cx = cHi; cv = -Math.abs(cv) * 0.45; }
        if (cy < 0 || cyV < 0) {
          const before = cy;
          cyV += 1400 * dt;
          cy += cyV * dt;
          // Headers and catches: the cube comes down onto the crab's head.
          const head = headCy();
          if ((mode === "juggle" || mode === "carry") && beat === 1 && cyV > 0 && before <= head + 2 && cy >= head && Math.abs(cx - x) < 26) {
            cy = head;
            if (mode === "carry") { onHead = true; flying = false; beat = 2; t = 0; goal = rand(lo, hi); }
            else if (++n >= goal) { // last one: head it away and celebrate
              const away = Math.random() < 0.5 ? -1 : 1;
              cyV = -rand(360, 420); cv = away * rand(150, 210); airSpin = away * rand(8, 12);
              hopV = -160; happy = 0.8;
              setMode("watch");
            } else {
              cyV = -rand(330, 400); cv = (x - cx) * 2 + rand(-35, 35); airSpin = rand(-8, 8);
              hopV = -120;
            }
          }
          if (cy >= 0) {
            cy = 0;
            if (cyV > 140) { cyV = -cyV * 0.32; cv *= 0.8; } // bounce
            else { cyV = 0; flying = false; }
          }
        }
      }

      // Bump on the ground: a heavy tyre and a light cube, a little bounce.
      const gap = cx - x;
      if (!flying && !onHead && cy > -20 && Math.abs(gap) < MIN_D) {
        const dir = Math.sign(gap) || 1;
        const closing = (v - cv) * dir;
        const stuck = (dir > 0 ? cHi - cx : cx - cLo) < 10;
        if ((stuck && closing > -20 && !steering) || (mode === "flick" && closing > -20)) {
          flick(dir);
        } else if (closing > 0) {
          const M = 3, e = 0.55;
          const nv = (M * v + cv - e * (v - cv)) / (M + 1);
          const ncv = (M * v + cv + M * e * (v - cv)) / (M + 1);
          v = nv; cv = ncv;
          if (closing > 70 && mode !== "dribble") {
            cyV = -Math.min(260, closing * 0.7);
            cy = Math.min(cy, -0.1);
            if (mode === "kick" || mode === "power") celebrate();
            else happy = 0.7;
          }
        }
        if (!flying) {
          cx = x + dir * MIN_D;
          if (cx < cLo || cx > cHi) { cx = clamp(cx, cLo, cHi); x = cx - dir * MIN_D; }
        }
      }

      // The crab lags when the tyre speeds up and pitches forward when it brakes, then wobbles back.
      const idle = Math.abs(v) < 10 ? Math.sin(time / 600) * 1.5 : 0;
      tiltV += (70 * (clamp(-acc * 0.014, -18, 18) + idle + lean - tilt) - 6 * tiltV) * dt;
      tilt += tiltV * dt;
      if (happy > 0) happy -= dt;

      // Where the eyes go: the cursor while it moves nearby, at you when it wants to show off or
      // has just dropped the cube, a quick glance around now and then, otherwise the cube.
      glanceIn -= dt;
      if (glance > 0) glance -= dt;
      if (atYou > 0) atYou -= dt;
      if (glanceIn <= 0) {
        glance = rand(0.35, 0.8);
        glanceIn = rand(1.2, 3.2);
        gx = rand(-1, 1);
        gy = rand(-1, 0.4);
      }
      let dx: number, dy: number;
      const px = ptr ? (ptr.x - r.left) / S - x : 0, py = ptr ? (ptr.y - r.top) / S - EYE_Y : 0;
      if (ptr && (steering || (ptrAge < 1.5 && Math.hypot(px, py) < 420))) { dx = px; dy = py; }
      else if (atYou > 0) { dx = 0; dy = 0; }
      else if (glance > 0 && !flying && mode === "rest") { dx = gx * 100; dy = gy * 100; }
      else { dx = cx - x; dy = H - cubeLift() + cy - EYE_Y; }
      const dist = Math.max(1, Math.hypot(dx, dy));
      const reach = Math.min(1, dist / 30);
      lookX += ((dx / dist) * 1.5 * reach - lookX) * Math.min(1, dt * 18);
      lookY += ((dy / dist) * 1.0 * reach - lookY) * Math.min(1, dt * 18);

      blinkIn -= dt;
      if (blink > 0) blink -= dt;
      if (blinkIn <= 0) {
        blink = 0.12;
        blinkIn = Math.random() < 0.2 ? 0.25 : rand(2, 5);
      }

      draw(time);
      if (visible) raf = requestAnimationFrame(step);
    };

    if (still) { draw(0); return; }

    const onMove = (e: PointerEvent) => { ptr = { x: e.clientX, y: e.clientY }; ptrAge = 0; };
    const follow = (e: PointerEvent) => { target = (e.clientX - el.getBoundingClientRect().left) / S; };
    const down = (e: PointerEvent) => {
      if (hopY === 0) hopV = -330;
      if (e.pointerType !== "mouse") { touchT = 1.2; onMove(e); follow(e); } // a tap steers it there
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", measure);
    el.addEventListener("pointerdown", down);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) { measure(); last = 0; raf = requestAnimationFrame(step); }
    });
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", measure);
      el.removeEventListener("pointerdown", down);
    };
  }, []);

  return (
    <div ref={stage} className="pg-toy" aria-hidden>
      <span ref={shadow} className="pg-toy-shadow" />
      <span ref={cubeShadow} className="pg-toy-shadow is-cube" />
      {/* A pixel heart, in the Claude Code orange, when it boops your cursor */}
      <svg ref={heart} className="pg-toy-heart" viewBox="0 0 7 6" width={14} height={12}>
        <path d="M1 0h2v1h1V0h2v1h1v2h-1v1h-1v1h-1v1h-1v-1h-1v-1h-1v-1H0V1h1z" fill="#D97757" />
      </svg>
      <svg ref={cube} className="pg-toy-cube" viewBox="0 0 24 24" width={CUBE} height={CUBE}>
        <path d={CURSOR} fill="currentColor" fillRule="evenodd" />
      </svg>
      <div ref={rig} className="pg-toy-rig">
        <svg ref={tyre} className="pg-toy-tyre" viewBox="0 0 24 24" width={R * 2} height={R * 2}>
          {/* The Codex app icon's purple-to-blue gradient */}
          <defs>
            <linearGradient id="pg-codex" gradientUnits="userSpaceOnUse" x1="12" x2="12" y1="0" y2="24">
              <stop stopColor="#B1A7FF" />
              <stop offset=".5" stopColor="#7A9DFF" />
              <stop offset="1" stopColor="#3941FF" />
            </linearGradient>
          </defs>
          <path ref={tyrePath} d={CODEX} fill="url(#pg-codex)" fillRule="evenodd" clipRule="evenodd" />
        </svg>
        {/* Claude Code logo, drawn in parts so the legs, arms and eyes can move. */}
        <svg ref={crab} className="pg-toy-crab" viewBox="0 5 24 15" width={24 * U} height={15 * U}>
          <g fill="#D97757">
            <rect ref={armL} x={0} y={10.95} width={3.2} height={3.1} />
            <rect ref={armR} x={20.8} y={10.95} width={3.2} height={3.1} />
            {LEGS.map((lx, i) => (
              <rect key={lx} ref={(n) => { legs.current[i] = n; }} x={lx} y={16.6} width={1.513} height={3.4} />
            ))}
            <rect x={3} y={5} width={18} height={12.08} />
          </g>
          {EYE.xs.map((ex, i) => (
            <rect key={ex} ref={(n) => { eyes.current[i] = n; }} x={ex} y={EYE.y} width={EYE.w} height={EYE.h} rx={0.2} fill="#1d1d1d" />
          ))}
          {EYE.xs.map((ex, i) => (
            <path
              key={`joy${ex}`}
              ref={(n) => { joy.current[i] = n; }}
              d={`M${ex - 0.5} ${EYE.y + 2} L${ex + EYE.w / 2} ${EYE.y + 0.6} L${ex + EYE.w + 0.5} ${EYE.y + 2}`}
              fill="none" stroke="#1d1d1d" strokeWidth={0.8} strokeLinecap="round" strokeLinejoin="round" opacity={0}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
