"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IPhone, PhoneNote, type Mark, type PhoneProps } from "./IPhone";

type Note = { title: string; sub?: string; box?: Mark["box"] };
type Line = { n: number; d: string; a: [number, number]; b: [number, number] };

// One phone in the middle, its notes on either side, and a thin curve from each note to the dashed
// box around the part of the screen it describes. A note sits on the side its box leans to (wide
// boxes alternate), and each side runs top to bottom, so no two lines cross. The lines are measured
// from the page as laid out, so they stay attached at any width. Phones stack the notes under the
// screen, where lines would cut across it, so they are left out there.
export default function PhoneShot({ notes = [], ...phone }: Omit<PhoneProps, "marks" | "children"> & { notes?: Note[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Line[]>([]);

  // Numbered in the order the boxes appear on the screen, top to bottom, so each side reads in order.
  let alt = 0;
  const placed = notes
    .map((x) => {
      const c = x.box ? x.box[0] + x.box[2] / 2 : 50;
      const side = c > 60 ? "right" : c < 40 ? "left" : alt++ % 2 === 0 ? "left" : "right";
      return { ...x, side };
    })
    .sort((a, b) => (a.box?.[1] ?? 0) - (b.box?.[1] ?? 0))
    .map((x, i) => ({ ...x, n: i + 1 }));
  const byTop = (a: { box?: Mark["box"] }, b: { box?: Mark["box"] }) => (a.box?.[1] ?? 0) - (b.box?.[1] ?? 0);
  const left = placed.filter((x) => x.side === "left").sort(byTop);
  const right = placed.filter((x) => x.side === "right").sort(byTop);
  const marks = placed.filter((x) => x.box).map((x) => ({ n: x.n, box: x.box! }));

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const draw = () => {
      if (window.innerWidth <= 640) { setLines([]); return; }
      const R = el.getBoundingClientRect();
      const phoneEl = el.querySelector(".iphone");
      if (!phoneEl) return;
      const P = phoneEl.getBoundingClientRect();
      const out: Line[] = [];
      const seen = { left: 0, right: 0 };
      const count = {
        left: el.querySelectorAll(".is-left [data-note]").length,
        right: el.querySelectorAll(".is-right [data-note]").length,
      };
      el.querySelectorAll<HTMLElement>("[data-note]").forEach((noteEl) => {
        const n = noteEl.dataset.note;
        const badge = noteEl.querySelector(".phone-note-n");
        const mark = el.querySelector(`[data-mark="${n}"]`);
        if (!badge || !mark) return;
        const isLeft = noteEl.closest(".is-left") !== null;
        const t = badge.getBoundingClientRect();
        const m = mark.getBoundingClientRect();
        const ax = (isLeft ? t.right + 8 : t.left - 8) - R.left;
        const ay = t.top + t.height / 2 - R.top;
        const bx = (isLeft ? m.left : m.right) - R.left;
        const by = m.top + m.height / 2 - R.top;
        // Straight runs with rounded corners: across from the note, up or down, then across into the box.
        // The up-or-down run sits in the gap between the notes and the phone, clear of the frame, and
        // lines on the same side are staggered 8px so their runs never sit on top of each other.
        const side = isLeft ? "left" : "right";
        const k = seen[side]++ - (count[side] - 1) / 2;
        const gapMid = isLeft ? (ax + (P.left - R.left)) / 2 : (ax + (P.right - R.left)) / 2;
        const mx = gapMid + k * 8 * (isLeft ? 1 : -1);
        const dx = Math.sign(bx - ax) || 1;
        const dy = Math.sign(by - ay);
        const r = Math.min(10, Math.abs(by - ay) / 2, Math.abs(mx - ax));
        const d = dy === 0 || r < 1
          ? `M${ax},${ay} H${mx} V${by} H${bx}`
          : `M${ax},${ay} H${mx - dx * r} Q${mx},${ay} ${mx},${ay + dy * r} V${by - dy * r} Q${mx},${by} ${mx + dx * r},${by} H${bx}`;
        out.push({ n: Number(n), d, a: [ax, ay], b: [bx, by] });
      });
      setLines(out);
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(el);
    document.fonts?.ready.then(draw);
    window.addEventListener("resize", draw);
    return () => { ro.disconnect(); window.removeEventListener("resize", draw); };
  }, [notes]);

  // Motion (Devansh, 26 Sep 2026): the first time the phone comes into view, each note plays in its
  // number order. Its dashed box lights up, the line draws out from the box to the note, the number
  // pops in and the note writes itself in word by word (globals.css, .ann-*). --d staggers the notes.
  // Set up only once JS runs and only without reduced motion, so the notes are never stuck hidden.
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.querySelectorAll<HTMLElement>("[data-note], [data-mark]").forEach((x) => {
      x.style.setProperty("--d", `${(Number(x.dataset.note ?? x.dataset.mark) - 1) * 0.5}s`);
    });
    el.classList.add("ann-ready");
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      el.classList.add("ann-in");
      io.disconnect();
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="phone-shot" ref={root}>
      <div className="phone-notes is-left">
        {left.map((x) => <div key={x.n} data-note={x.n} style={{ order: x.n }}><PhoneNote n={x.n} title={x.title} sub={x.sub} /></div>)}
      </div>
      <IPhone {...phone} marks={marks} />
      <div className="phone-notes is-right">
        {right.map((x) => <div key={x.n} data-note={x.n} style={{ order: x.n }}><PhoneNote n={x.n} title={x.title} sub={x.sub} /></div>)}
      </div>
      <svg className="phone-lines" aria-hidden="true">
        {lines.map((l, i) => (
          <g key={i} style={{ "--d": `${(l.n - 1) * 0.5}s` } as React.CSSProperties}>
            <path d={l.d} pathLength={1} />
            <circle cx={l.a[0]} cy={l.a[1]} r={3.5} className="end-note" />
            <circle cx={l.b[0]} cy={l.b[1]} r={3} className="end-box" />
          </g>
        ))}
      </svg>
    </div>
  );
}
