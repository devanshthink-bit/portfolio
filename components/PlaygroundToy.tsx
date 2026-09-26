"use client";
import { useEffect, useRef } from "react";

// The Claude Code crab balancing on the ChatGPT logo, rolled like a tyre, in the empty space
// above the side projects heading. It wanders on its own; on hover it rolls after the cursor,
// and its eyes follow the cursor. Click to make it hop. All motion is one rAF loop that writes
// transforms straight to the DOM.

// OpenAI blossom (the ChatGPT logo), from @lobehub/icons.
const OPENAI =
  "M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z";

const R = 25; // tyre radius, px
const LEGS = [4.487, 7.488, 15, 18]; // x of each Claude Code leg, in logo units
const EYE = { y: 8.102, w: 1.488, h: 2.847, xs: [6, 16.51] };

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export default function PlaygroundToy() {
  const stage = useRef<HTMLDivElement>(null);
  const rig = useRef<HTMLDivElement>(null);
  const tyre = useRef<SVGSVGElement>(null);
  const crab = useRef<SVGSVGElement>(null);
  const shadow = useRef<HTMLSpanElement>(null);
  const legs = useRef<(SVGRectElement | null)[]>([]);
  const eyes = useRef<(SVGRectElement | null)[]>([]);
  const armL = useRef<SVGRectElement>(null);
  const armR = useRef<SVGRectElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let x = el.clientWidth * 0.18, v = 0, prevV = 0, acc = 0, spin = 0;
    let tilt = 0, tiltV = 0, hopY = 0, hopV = 0, squash = 1, squashV = 0, phase = 0;
    let target = x, hovering = false, rest = 1.2, blinkIn = 2.5, blink = 0;
    let lookX = 0, lookY = 0, ptr: { x: number; y: number } | null = null, ptrAge = 99;
    let raf = 0, last = 0, visible = true;

    const draw = (time: number) => {
      const moving = clamp(Math.abs(v) / 90, 0, 1);
      const bob = hopY === 0 ? -Math.abs(Math.sin(phase)) * 1.2 * moving : 0;
      rig.current!.style.transform = `translateX(${x}px)`;
      tyre.current!.style.transform = `rotate(${(spin * 180) / Math.PI}deg)`;
      crab.current!.style.transform =
        `translateY(${hopY + bob}px) rotate(${tilt}deg) scale(${2 - squash}, ${squash})`;
      shadow.current!.style.transform = `scaleX(${1 - Math.min(0.3, -hopY / 80)})`;

      // Walk: the tyre's top slides under the crab, so it steps against it, pairs alternating.
      legs.current.forEach((leg, i) => {
        const lift = hopY < 0 ? 0.9 : Math.max(0, Math.sin(phase + (i % 2) * Math.PI)) * 1.5 * moving;
        leg?.setAttribute("transform", `translate(0 ${-lift})`);
      });
      // Arms go up to balance: the side it leans away from goes higher.
      const wave = Math.sin(time / 90) * 6 * moving;
      const base = 6 + moving * 14 + (hopY < 0 ? 22 : 0);
      armL.current?.setAttribute("transform", `rotate(${base + Math.max(0, tilt) * 2.5 + wave} 3 12.5)`);
      armR.current?.setAttribute("transform", `rotate(${-(base + Math.max(0, -tilt) * 2.5 - wave)} 21 12.5)`);

      const open = blink > 0 ? 0.12 : 1;
      eyes.current.forEach((eye, i) => {
        if (!eye) return;
        eye.setAttribute("x", String(EYE.xs[i] + lookX));
        eye.setAttribute("y", String(EYE.y + lookY + (EYE.h * (1 - open)) / 2));
        eye.setAttribute("height", String(EYE.h * open));
      });
    };

    const step = (time: number) => {
      const dt = Math.min(0.033, last ? (time - last) / 1000 : 0.016);
      last = time;
      const w = el.clientWidth;
      const lo = R + 12, hi = w - R - 12;

      // On its own it rolls somewhere, stops, looks around, rolls again.
      if (!hovering && Math.abs(target - x) < 3 && Math.abs(v) < 10) {
        rest -= dt;
        if (rest <= 0) {
          const hop = (Math.random() < 0.5 ? -1 : 1) * (80 + Math.random() * 220);
          target = x + hop;
          if (target < lo || target > hi) target = x - hop;
          rest = 1.4 + Math.random() * 2.6;
        }
      }
      target = clamp(target, lo, hi);

      // Spring towards the target, capped speed: it speeds up, cruises, and brakes.
      const k = hovering ? 20 : 7;
      const vmax = hovering ? 480 : 230;
      v += clamp(k * (target - x) - 2 * Math.sqrt(k) * 0.9 * v, -1300, 1300) * dt;
      v = clamp(v, -vmax, vmax);
      x = clamp(x + v * dt, lo, hi);
      spin += (v * dt) / R; // rolls without slipping
      phase += (Math.abs(v) * dt) / 7;
      acc += (((v - prevV) / Math.max(dt, 0.001)) - acc) * Math.min(1, dt * 10);
      prevV = v;

      // The crab lags when the tyre speeds up and pitches forward when it brakes, then wobbles back.
      const idle = Math.abs(v) < 10 ? Math.sin(time / 600) * 1.5 : 0;
      const tiltTarget = clamp(-acc * 0.014, -18, 18) + idle;
      tiltV += (70 * (tiltTarget - tilt) - 6 * tiltV) * dt;
      tilt += tiltV * dt;

      if (hopY < 0 || hopV < 0) {
        hopV += 1300 * dt;
        hopY += hopV * dt;
        if (hopY >= 0) { hopY = 0; hopV = 0; squash = 0.78; }
      }
      squashV += (260 * (1 - squash) - 14 * squashV) * dt;
      squash += squashV * dt;

      // Eyes: at the cursor if it moved in the last 4 s, otherwise where it is rolling.
      ptrAge += dt;
      let lx = clamp(v / 160, -1, 1) * 0.8, ly = 0;
      if (ptr && ptrAge < 4) {
        const r = el.getBoundingClientRect();
        const dx = ptr.x - (r.left + x), dy = ptr.y - (r.top + 14);
        const d = Math.max(1, Math.hypot(dx, dy));
        lx = (dx / d) * 0.8 * Math.min(1, d / 40);
        ly = (dy / d) * 0.6 * Math.min(1, d / 40);
      }
      lookX += (lx - lookX) * Math.min(1, dt * 14);
      lookY += (ly - lookY) * Math.min(1, dt * 14);

      blinkIn -= dt;
      if (blink > 0) blink -= dt;
      if (blinkIn <= 0) {
        blink = 0.13;
        blinkIn = Math.random() < 0.2 ? 0.25 : 2 + Math.random() * 3.5;
      }

      draw(time);
      if (visible) raf = requestAnimationFrame(step);
    };

    if (still) { draw(0); return; }

    const onMove = (e: PointerEvent) => { ptr = { x: e.clientX, y: e.clientY }; ptrAge = 0; };
    const follow = (e: PointerEvent) => {
      target = e.clientX - el.getBoundingClientRect().left;
    };
    const enter = (e: PointerEvent) => { if (e.pointerType === "mouse") { hovering = true; follow(e); } };
    const leave = () => { hovering = false; rest = 0.8; target = x; };
    const down = (e: PointerEvent) => {
      if (hopY === 0) { hopV = -330; squash = 0.85; }
      if (e.pointerType !== "mouse") follow(e);
    };
    const hoverMove = (e: PointerEvent) => { if (hovering) follow(e); };

    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointermove", hoverMove);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("pointerdown", down);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) { last = 0; raf = requestAnimationFrame(step); }
    });
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointermove", hoverMove);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("pointerdown", down);
    };
  }, []);

  return (
    <div ref={stage} className="pg-toy" aria-hidden>
      <div ref={rig} className="pg-toy-rig">
        <span ref={shadow} className="pg-toy-shadow" />
        <svg ref={tyre} className="pg-toy-tyre" viewBox="0 0 24 24" width={R * 2} height={R * 2}>
          <path d={OPENAI} fill="currentColor" fillRule="evenodd" />
        </svg>
        {/* Claude Code logo, drawn in parts so the legs, arms and eyes can move. */}
        <svg ref={crab} className="pg-toy-crab" viewBox="0 5 24 15" width={40.8} height={25.5}>
          <g fill="#D97757">
            <rect ref={armL} x={0} y={10.95} width={3.2} height={3.1} />
            <rect ref={armR} x={20.8} y={10.95} width={3.2} height={3.1} />
            {LEGS.map((lx, i) => (
              <rect key={lx} ref={(n) => { legs.current[i] = n; }} x={lx} y={16.6} width={1.513} height={3.4} />
            ))}
            <rect x={3} y={5} width={18} height={12.08} />
          </g>
          {EYE.xs.map((ex, i) => (
            <rect key={ex} ref={(n) => { eyes.current[i] = n; }} x={ex} y={EYE.y} width={EYE.w} height={EYE.h} fill="#1d1d1d" />
          ))}
        </svg>
      </div>
    </div>
  );
}
