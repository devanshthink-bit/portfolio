"use client";
import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  const hidden = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    const onHide = () => { hidden.current = true; if (ref.current) ref.current.style.opacity = "0"; };
    const onShow = () => { hidden.current = false; if (ref.current) ref.current.style.opacity = "1"; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("cursorglow:hide", onHide);
    window.addEventListener("cursorglow:show", onShow);

    const SIZE = 20;
    const HALF = SIZE / 2;
    // spring constants — lower = more lag (heavier feel)
    const STIFFNESS = 0.12;

    const tick = () => {
      current.current.x += (pos.current.x - current.current.x) * STIFFNESS;
      current.current.y += (pos.current.y - current.current.y) * STIFFNESS;

      if (ref.current) {
        ref.current.style.transform = `translate(${current.current.x - HALF}px, ${current.current.y - HALF}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("cursorglow:hide", onHide);
      window.removeEventListener("cursorglow:show", onShow);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return null;
}
