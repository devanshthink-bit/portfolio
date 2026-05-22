"use client";
import { useEffect, useRef } from "react";

const SIZE = 20;
const HALF = SIZE / 2;
const STIFFNESS = 0.2;

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const cur = useRef({ x: -200, y: -200 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave  = () => { if (ref.current) ref.current.style.opacity = "0"; };
    const onEnter  = () => { if (ref.current) ref.current.style.opacity = "1"; };
    const onHide   = () => { if (ref.current) ref.current.style.opacity = "0"; };
    const onShow   = () => { if (ref.current) ref.current.style.opacity = "1"; };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("cursor:hide", onHide);
    window.addEventListener("cursor:show", onShow);

    const tick = () => {
      cur.current.x += (pos.current.x - cur.current.x) * STIFFNESS;
      cur.current.y += (pos.current.y - cur.current.y) * STIFFNESS;
      if (ref.current) {
        ref.current.style.transform = `translate(${cur.current.x - HALF}px, ${cur.current.y - HALF}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("cursor:hide", onHide);
      window.removeEventListener("cursor:show", onShow);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: SIZE,
        height: SIZE,
        borderRadius: "50%",
        background: "#fff",
        mixBlendMode: "difference",
        pointerEvents: "none",
        zIndex: 999999,
        willChange: "transform",
        transition: "opacity 0.3s ease",
      }}
    />
  );
}
