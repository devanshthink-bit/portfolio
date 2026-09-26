"use client";
import { useEffect, useRef } from "react";

// The Claude Code crab riding the Codex logo like a tyre, playing ball with the Cursor logo,
// on the baseline of the "Side projects" label. It plays on its own: chases the Cursor cube and
// kicks it, and when the cube is stuck at an end it flicks it back over its head. While the
// cursor moves over it, it rolls after the cursor instead (and can still kick the cube). Its eyes
// watch the cube, dart around and follow the cursor. Click to hop.
// All motion is one rAF loop that writes transforms straight to the DOM.

// The Codex logo and the Cursor cube, from @lobehub/icons.
const CODEX =
  "M8.086.457a6.105 6.105 0 013.046-.415c1.333.153 2.521.72 3.564 1.7a.117.117 0 00.107.029c1.408-.346 2.762-.224 4.061.366l.063.03.154.076c1.357.703 2.33 1.77 2.918 3.198.278.679.418 1.388.421 2.126a5.655 5.655 0 01-.18 1.631.167.167 0 00.04.155 5.982 5.982 0 011.578 2.891c.385 1.901-.01 3.615-1.183 5.14l-.182.22a6.063 6.063 0 01-2.934 1.851.162.162 0 00-.108.102c-.255.736-.511 1.364-.987 1.992-1.199 1.582-2.962 2.462-4.948 2.451-1.583-.008-2.986-.587-4.21-1.736a.145.145 0 00-.14-.032c-.518.167-1.04.191-1.604.185a5.924 5.924 0 01-2.595-.622 6.058 6.058 0 01-2.146-1.781c-.203-.269-.404-.522-.551-.821a7.74 7.74 0 01-.495-1.283 6.11 6.11 0 01-.017-3.064.166.166 0 00.008-.074.115.115 0 00-.037-.064 5.958 5.958 0 01-1.38-2.202 5.196 5.196 0 01-.333-1.589 6.915 6.915 0 01.188-2.132c.45-1.484 1.309-2.648 2.577-3.493.282-.188.55-.334.802-.438.286-.12.573-.22.861-.304a.129.129 0 00.087-.087A6.016 6.016 0 015.635 2.31C6.315 1.464 7.132.846 8.086.457zm-.804 7.85a.848.848 0 00-1.473.842l1.694 2.965-1.688 2.848a.849.849 0 001.46.864l1.94-3.272a.849.849 0 00.007-.854l-1.94-3.393zm5.446 6.24a.849.849 0 000 1.695h4.848a.849.849 0 000-1.696h-4.848z";
const CURSOR =
  "M22.106 5.68L12.5.135a.998.998 0 00-.998 0L1.893 5.68a.84.84 0 00-.419.726v11.186c0 .3.16.577.42.727l9.607 5.547a.999.999 0 00.998 0l9.608-5.547a.84.84 0 00.42-.727V6.407a.84.84 0 00-.42-.726zm-.603 1.176L12.228 22.92c-.063.108-.228.064-.228-.061V12.34a.59.59 0 00-.295-.51l-9.11-5.26c-.107-.062-.063-.228.062-.228h18.55c.264 0 .428.286.296.514z";

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
  const armL = useRef<SVGRectElement>(null);
  const armR = useRef<SVGRectElement>(null);

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
      start = range.getBoundingClientRect().right - el.getBoundingClientRect().left + 24;
    };
    measure();

    // Tyre and crab
    let x = start + R + 10, v = 0, prevV = 0, acc = 0, spin = 0;
    let tilt = 0, tiltV = 0, hopY = 0, hopV = 0, phase = 0;
    let target = x, hovering = false, steering = false, chasing = false, chaseFor = 0, rest = 1;
    // Cursor cube
    let cx = x + 120, cv = 0, turn = Math.PI / 6, cy = 0, cyV = 0, flying = false, airSpin = 0;
    // Eyes
    let lookX = 0, lookY = 0, blinkIn = 2.5, blink = 0, happy = 0;
    let glance = 0, glanceIn = 1.5, gx = 0, gy = 0;
    let ptr: { x: number; y: number } | null = null, ptrAge = 99;
    let raf = 0, last = 0, visible = true;

    const cubeLift = () => {
      // The hexagon rests on a flat side and rises onto a corner as it tips over.
      const phi = ((((turn - Math.PI / 6) % (Math.PI / 3)) + Math.PI / 3) % (Math.PI / 3)) - Math.PI / 6;
      return HEX * Math.cos(phi);
    };

    const draw = (time: number) => {
      const moving = clamp(Math.abs(v) / 90, 0, 1);
      const bob = hopY === 0 ? -Math.abs(Math.sin(phase)) * 1.2 * moving : 0;
      const sink = R - sample(below, spin); // the tyre dips when a hollow is at the bottom
      const ride = R - sample(above, spin); // and the crab drops into a hollow on top
      rig.current!.style.transform = `translate(${x}px, ${sink}px)`;
      tyre.current!.style.transform = `rotate(${(spin * 180) / Math.PI}deg)`;
      crab.current!.style.transform =
        `translateY(${ride + hopY + bob}px) rotate(${tilt}deg)`;
      shadow.current!.style.transform = `translateX(${x}px) scaleX(${1 - Math.min(0.3, -hopY / 80)})`;

      cube.current!.style.transform =
        `translate(${cx}px, ${-cubeLift() + cy}px) rotate(${(turn * 180) / Math.PI}deg)`;
      cubeShadow.current!.style.transform =
        `translateX(${cx}px) scaleX(${1 - Math.min(0.6, -cy / 90)})`;
      cubeShadow.current!.style.opacity = String(1 - Math.min(0.7, -cy / 110));

      // Walk: the tyre's top slides under the crab, so it steps against it, pairs alternating.
      legs.current.forEach((leg, i) => {
        const up = hopY < 0 ? 0.9 : Math.max(0, Math.sin(phase + (i % 2) * Math.PI)) * 1.5 * moving;
        leg?.setAttribute("transform", `translate(0 ${-up})`);
      });
      // Arms go up to balance, and right up after a good kick.
      const wave = Math.sin(time / 90) * 6 * moving;
      const base = 6 + moving * 14 + (hopY < 0 ? 22 : 0) + (happy > 0 ? 30 + Math.sin(time / 60) * 10 : 0);
      armL.current?.setAttribute("transform", `rotate(${base + Math.max(0, tilt) * 2.5 + wave} 3 12.5)`);
      armR.current?.setAttribute("transform", `rotate(${-(base + Math.max(0, -tilt) * 2.5 - wave)} 21 12.5)`);

      // Eyes keep their size and shape; they only move (and blink).
      const h = blink > 0 ? 0.3 : EYE.h;
      eyes.current.forEach((eye, i) => {
        if (!eye) return;
        eye.setAttribute("x", String(EYE.xs[i] + lookX));
        eye.setAttribute("y", String(EYE.y + (EYE.h - h) / 2 + lookY));
        eye.setAttribute("height", String(h));
      });
    };

    // Scoop the cube up and over its head (it passes behind the crab), back into open space.
    const flick = (d: number) => {
      flying = true;
      cyV = -rand(490, 520);
      cy = -0.5;
      cv = -d * rand(150, 200);
      airSpin = -d * rand(9, 14);
      tiltV -= d * 90;
      happy = 0;
      chasing = false; target = x; rest = rand(0.9, 1.4);
    };

    const step = (time: number) => {
      const dt = Math.min(0.033, last ? (time - last) / 1000 : 0.016);
      last = time;
      const w = el.clientWidth;
      const lo = start + R, hi = w - R - 4;
      const cLo = start + HEX, cHi = w - HEX - 4;

      // The cursor steers only while it moves. When it rests, the crab goes back to playing.
      ptrAge += dt;
      const nowSteering = hovering && ptrAge < 1.2;
      if (steering && !nowSteering) { rest = rand(0.3, 0.8); target = x; }
      steering = nowSteering;

      // On its own: a short rest, then roll at the cube from whichever side it is on and kick it.
      if (!steering) {
        if (chasing) {
          const d = Math.sign(cx - x) || 1;
          target = cx + d * 40;
          chaseFor += dt;
          if (chaseFor > 4) { chasing = false; target = x; rest = rand(0.3, 0.8); }
        } else if (Math.abs(v) < 20 && !flying) {
          rest -= dt;
          if (rest <= 0) { chasing = true; chaseFor = 0; }
        }
      }
      target = clamp(target, lo, hi);

      // Spring towards the target, capped speed: it speeds up, cruises, and brakes.
      const k = steering ? 20 : 7;
      const vmax = steering ? 480 : 240;
      v += clamp(k * (target - x) - 2 * Math.sqrt(k) * 0.9 * v, -1300, 1300) * dt;
      v = clamp(v, -vmax, vmax);
      x = clamp(x + v * dt, lo, hi);

      // The cube rolls corner over corner, slows down, and settles on a flat side. In the air it
      // just spins and falls.
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
        cyV += 1400 * dt;
        cy += cyV * dt;
        if (cy >= 0) {
          cy = 0;
          if (cyV > 140) { cyV = -cyV * 0.32; cv *= 0.8; } // bounce
          else { cyV = 0; if (flying) { flying = false; happy = 0.7; } }
        }
      }

      // Bump: a heavy tyre and a light cube, a little bounce. Nothing to bump while it flies.
      const gap = cx - x;
      if (!flying && cy > -20 && Math.abs(gap) < MIN_D) {
        const d = Math.sign(gap) || 1;
        const closing = (v - cv) * d;
        const stuck = (d > 0 ? cHi - cx : cx - cLo) < 10;
        if (stuck && closing > -20) {
          flick(d);
        } else if (closing > 0) {
          const M = 3, e = 0.55;
          const nv = (M * v + cv - e * (v - cv)) / (M + 1);
          const ncv = (M * v + cv + M * e * (v - cv)) / (M + 1);
          v = nv; cv = ncv;
          if (closing > 70) {
            cyV = -Math.min(260, closing * 0.7);
            cy = Math.min(cy, -0.1);
            if (!steering) { chasing = false; target = x; rest = rand(0.4, 1.4); }
            happy = 0.7;
          }
        }
        if (!flying) {
          cx = x + d * MIN_D;
          if (cx < cLo || cx > cHi) { cx = clamp(cx, cLo, cHi); x = cx - d * MIN_D; }
        }
      }

      spin += (v * dt) / R; // rolls without slipping
      phase += (Math.abs(v) * dt) / 7;
      acc += (((v - prevV) / Math.max(dt, 0.001)) - acc) * Math.min(1, dt * 10);
      prevV = v;

      // The crab lags when the tyre speeds up and pitches forward when it brakes, then wobbles back.
      const idle = Math.abs(v) < 10 ? Math.sin(time / 600) * 1.5 : 0;
      tiltV += (70 * (clamp(-acc * 0.014, -18, 18) + idle - tilt) - 6 * tiltV) * dt;
      tilt += tiltV * dt;

      if (hopY < 0 || hopV < 0) {
        hopV += 1300 * dt;
        hopY += hopV * dt;
        if (hopY >= 0) { hopY = 0; hopV = 0; }
      }

      // Where the eyes go: the cursor while it moves nearby, a quick glance around now and then,
      // otherwise the cube it's playing with (up in the air too).
      glanceIn -= dt;
      if (glance > 0) glance -= dt;
      if (glanceIn <= 0) {
        glance = rand(0.35, 0.8);
        glanceIn = rand(1.2, 3.2);
        gx = rand(-1, 1);
        gy = rand(-1, 0.4);
      }
      let dx: number, dy: number;
      const r = el.getBoundingClientRect();
      const px = ptr ? ptr.x - (r.left + x) : 0, py = ptr ? ptr.y - (r.top + EYE_Y) : 0;
      if (ptr && ptrAge < 1.5 && (hovering || Math.hypot(px, py) < 420)) { dx = px; dy = py; }
      else if (glance > 0 && !flying) { dx = gx * 100; dy = gy * 100; }
      else { dx = cx - x; dy = H - cubeLift() + cy - EYE_Y; }
      const dist = Math.max(1, Math.hypot(dx, dy));
      const reach = Math.min(1, dist / 30);
      lookX += ((dx / dist) * 1.5 * reach - lookX) * Math.min(1, dt * 18);
      lookY += ((dy / dist) * 1.0 * reach - lookY) * Math.min(1, dt * 18);

      blinkIn -= dt;
      if (blink > 0) blink -= dt;
      if (happy > 0) happy -= dt;
      if (blinkIn <= 0) {
        blink = 0.12;
        blinkIn = Math.random() < 0.2 ? 0.25 : rand(2, 5);
      }

      draw(time);
      if (visible) raf = requestAnimationFrame(step);
    };

    if (still) { draw(0); return; }

    const onMove = (e: PointerEvent) => { ptr = { x: e.clientX, y: e.clientY }; ptrAge = 0; };
    const follow = (e: PointerEvent) => { target = e.clientX - el.getBoundingClientRect().left; };
    const enter = (e: PointerEvent) => { if (e.pointerType === "mouse") { hovering = true; chasing = false; follow(e); } };
    const leave = () => { hovering = false; };
    const down = (e: PointerEvent) => {
      if (hopY === 0) hopV = -330;
      if (e.pointerType !== "mouse") { chasing = false; rest = 1.5; follow(e); }
    };
    const hoverMove = (e: PointerEvent) => { if (hovering) follow(e); };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", measure);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointermove", hoverMove);
    el.addEventListener("pointerleave", leave);
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
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointermove", hoverMove);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("pointerdown", down);
    };
  }, []);

  return (
    <div ref={stage} className="pg-toy" aria-hidden>
      <span ref={shadow} className="pg-toy-shadow" />
      <span ref={cubeShadow} className="pg-toy-shadow is-cube" />
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
        </svg>
      </div>
    </div>
  );
}
