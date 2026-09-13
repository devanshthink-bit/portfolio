"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { IPhone, PhoneNote, type Mark, type PhoneProps } from "./IPhone";

type Note = { title: string; sub?: string; box?: Mark["box"] };
type Line = { d: string; a: [number, number]; b: [number, number] };

// One phone in the middle, its notes on either side, and a thin curve from each note to the dashed
// box around the part of the screen it describes. A note sits on the side its box leans to (wide
// boxes alternate), and each side runs top to bottom, so no two lines cross. The lines are measured
// from the page as laid out, so they stay attached at any width. Phones stack the notes under the
// screen, where lines would cut across it, so they are left out there.
export default function PhoneShot({ notes = [], ...phone }: Omit<PhoneProps, "marks" | "children"> & { notes?: Note[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Line[]>([]);

  let alt = 0;
  const placed = notes.map((x, i) => {
    const c = x.box ? x.box[0] + x.box[2] / 2 : 50;
    const side = c > 60 ? "right" : c < 40 ? "left" : alt++ % 2 === 0 ? "left" : "right";
    return { ...x, n: i + 1, side };
  });
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
      const out: Line[] = [];
      el.querySelectorAll<HTMLElement>("[data-note]").forEach((noteEl) => {
        const n = noteEl.dataset.note;
        const title = noteEl.querySelector(".phone-note-title");
        const mark = el.querySelector(`[data-mark="${n}"]`);
        if (!title || !mark) return;
        const isLeft = noteEl.closest(".is-left") !== null;
        const t = title.getBoundingClientRect();
        const m = mark.getBoundingClientRect();
        const ax = (isLeft ? t.right + 12 : t.left - 12) - R.left;
        const ay = t.top + 12 - R.top;
        const bx = (isLeft ? m.left : m.right) - R.left;
        const by = m.top + m.height / 2 - R.top;
        const mx = (ax + bx) / 2;
        out.push({ d: `M${ax},${ay} C${mx},${ay} ${mx},${by} ${bx},${by}`, a: [ax, ay], b: [bx, by] });
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

  return (
    <div className="phone-shot" ref={root}>
      <div className="phone-notes is-left">
        {left.map((x) => <div key={x.n} data-note={x.n}><PhoneNote title={x.title} sub={x.sub} /></div>)}
      </div>
      <IPhone {...phone} marks={marks} />
      <div className="phone-notes is-right">
        {right.map((x) => <div key={x.n} data-note={x.n}><PhoneNote title={x.title} sub={x.sub} /></div>)}
      </div>
      <svg className="phone-lines" aria-hidden="true">
        {lines.map((l, i) => (
          <g key={i}>
            <path d={l.d} />
            <circle cx={l.a[0]} cy={l.a[1]} r={3.5} className="end-note" />
            <circle cx={l.b[0]} cy={l.b[1]} r={3} className="end-box" />
          </g>
        ))}
      </svg>
    </div>
  );
}
