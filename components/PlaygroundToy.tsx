"use client";
import { useEffect, useRef } from "react";

// The Claude Code crab riding the ChatGPT logo like a tyre, playing ball with the Cursor logo,
// on the baseline of the "Side projects" label. On its own it chases the Cursor cube and kicks
// it; on hover it rolls after the cursor (and can still kick the cube). Its eyes watch the
// cube, dart around, squint happily after a kick and follow the cursor. Click to make it hop.
// All motion is one rAF loop that writes transforms straight to the DOM.

// OpenAI blossom (the ChatGPT logo) and the Cursor cube, from @lobehub/icons.
const OPENAI =
  "M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z";
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

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const rand = (a: number, b: number) => a + Math.random() * (b - a);

export default function PlaygroundToy() {
  const stage = useRef<HTMLDivElement>(null);
  const rig = useRef<HTMLDivElement>(null);
  const tyre = useRef<SVGSVGElement>(null);
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
    let tilt = 0, tiltV = 0, hopY = 0, hopV = 0, squash = 1, squashV = 0, phase = 0;
    let target = x, hovering = false, chasing = false, chaseFor = 0, rest = 1.2;
    // Cursor cube
    let cx = x + 120, cv = 0, turn = Math.PI / 6, cy = 0, cyV = 0;
    // Eyes
    let lookX = 0, lookY = 0, blinkIn = 2.5, blink = 0, happy = 0, wide = 0;
    let glance = 0, glanceIn = 1.5, gx = 0, gy = 0;
    let ptr: { x: number; y: number } | null = null, ptrAge = 99;
    let raf = 0, last = 0, visible = true;

    const draw = (time: number) => {
      const moving = clamp(Math.abs(v) / 90, 0, 1);
      const bob = hopY === 0 ? -Math.abs(Math.sin(phase)) * 1.2 * moving : 0;
      rig.current!.style.transform = `translateX(${x}px)`;
      tyre.current!.style.transform = `rotate(${(spin * 180) / Math.PI}deg)`;
      crab.current!.style.transform =
        `translateY(${hopY + bob}px) rotate(${tilt}deg) scale(${2 - squash}, ${squash})`;
      shadow.current!.style.transform = `translateX(${x}px) scaleX(${1 - Math.min(0.3, -hopY / 80)})`;

      // The hexagon rests on a flat side and rises onto a corner as it tips over.
      const phi = ((((turn - Math.PI / 6) % (Math.PI / 3)) + Math.PI / 3) % (Math.PI / 3)) - Math.PI / 6;
      const lift = HEX * Math.cos(phi);
      cube.current!.style.transform =
        `translate(${cx}px, ${-lift + cy}px) rotate(${(turn * 180) / Math.PI}deg)`;
      cubeShadow.current!.style.transform = `translateX(${cx}px) scaleX(${1 - Math.min(0.4, -cy / 60)})`;

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

      // Eyes: blink, squint happily (a thin raised line), or go wide when the cube hits back.
      const h = blink > 0 ? 0.3 : happy > 0 ? 0.9 : wide > 0 ? 3.6 : EYE.h;
      const w = wide > 0 ? 1.9 : EYE.w;
      const up = happy > 0 ? -0.9 : 0;
      eyes.current.forEach((eye, i) => {
        if (!eye) return;
        eye.setAttribute("x", String(EYE.xs[i] + (EYE.w - w) / 2 + lookX));
        eye.setAttribute("y", String(EYE.y + (EYE.h - h) / 2 + lookY + up));
        eye.setAttribute("width", String(w));
        eye.setAttribute("height", String(h));
      });
    };

    const step = (time: number) => {
      const dt = Math.min(0.033, last ? (time - last) / 1000 : 0.016);
      last = time;
      const w = el.clientWidth;
      const lo = start + R, hi = w - R - 4;
      const cLo = start + HEX, cHi = w - HEX - 4;

      // On its own: rest, then roll at the cube from whichever side it is on and kick it.
      if (!hovering) {
        if (chasing) {
          const d = Math.sign(cx - x) || 1;
          target = cx + d * 40;
          chaseFor += dt;
          if (chaseFor > 5) { chasing = false; target = x; rest = rand(1, 2); }
        } else if (Math.abs(v) < 10) {
          rest -= dt;
          if (rest <= 0) { chasing = true; chaseFor = 0; }
        }
      }
      target = clamp(target, lo, hi);

      // Spring towards the target, capped speed: it speeds up, cruises, and brakes.
      const k = hovering ? 20 : 7;
      const vmax = hovering ? 480 : 240;
      v += clamp(k * (target - x) - 2 * Math.sqrt(k) * 0.9 * v, -1300, 1300) * dt;
      v = clamp(v, -vmax, vmax);
      x = clamp(x + v * dt, lo, hi);

      // The cube rolls corner over corner, slows down, and settles on a flat side.
      cv *= Math.exp(-1.1 * dt);
      cv += -260 * Math.sin(6 * (turn - Math.PI / 6)) * dt;
      cx += cv * dt;
      turn += (cv * dt) / (HEX * 0.93);
      if (cx < cLo) { cx = cLo; cv = Math.abs(cv) * 0.45; }
      if (cx > cHi) { cx = cHi; cv = -Math.abs(cv) * 0.45; }
      if (cy < 0 || cyV < 0) {
        cyV += 1400 * dt;
        cy += cyV * dt;
        if (cy >= 0) { cy = 0; cyV = cyV > 120 ? -cyV * 0.3 : 0; }
      }

      // Bump: a heavy tyre and a light cube, a little bounce.
      const gap = cx - x;
      if (Math.abs(gap) < MIN_D) {
        const d = Math.sign(gap) || 1;
        const closing = (v - cv) * d;
        if (closing > 0) {
          const M = 3, e = 0.55;
          const nv = (M * v + cv - e * (v - cv)) / (M + 1);
          const ncv = (M * v + cv + M * e * (v - cv)) / (M + 1);
          v = nv; cv = ncv;
          if (closing > 70) {
            cyV = -Math.min(260, closing * 0.7);
            cy = Math.min(cy, -0.1);
            if (!hovering) { chasing = false; target = x; rest = rand(1.2, 3); }
            happy = 0.7; wide = 0;
          }
        } else if (closing < -70) {
          wide = 0.45; // the cube came back at it
        }
        cx = x + d * MIN_D;
        if (cx < cLo || cx > cHi) { cx = clamp(cx, cLo, cHi); x = cx - d * MIN_D; }
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
        if (hopY >= 0) { hopY = 0; hopV = 0; squash = 0.78; }
      }
      squashV += (260 * (1 - squash) - 14 * squashV) * dt;
      squash += squashV * dt;

      // Where the eyes go: the cursor while you're near, a quick glance around now and then,
      // otherwise the cube it's playing with.
      ptrAge += dt;
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
      else if (glance > 0) { dx = gx * 100; dy = gy * 100; }
      else { dx = cx - x; dy = H - HEX - EYE_Y; }
      const dist = Math.max(1, Math.hypot(dx, dy));
      const reach = Math.min(1, dist / 30);
      lookX += ((dx / dist) * 1.5 * reach - lookX) * Math.min(1, dt * 18);
      lookY += ((dy / dist) * 1.0 * reach - lookY) * Math.min(1, dt * 18);

      blinkIn -= dt;
      if (blink > 0) blink -= dt;
      if (happy > 0) happy -= dt;
      if (wide > 0) wide -= dt;
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
    const leave = () => { hovering = false; rest = 0.8; target = x; };
    const down = (e: PointerEvent) => {
      if (hopY === 0) { hopV = -330; squash = 0.85; }
      if (e.pointerType !== "mouse") { chasing = false; rest = 2; follow(e); }
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
          <path d={OPENAI} fill="currentColor" fillRule="evenodd" />
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
