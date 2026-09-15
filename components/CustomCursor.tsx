"use client";
import { useEffect, useRef, useState } from "react";

const SIZE = 20;
const HALF = SIZE / 2;
const STIFFNESS = 0.2;

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const cur = useRef({ x: -200, y: -200 });
  const raf = useRef<number>(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave  = () => { if (ref.current) ref.current.style.opacity = "0"; };
    const onEnter  = () => { if (ref.current) ref.current.style.opacity = "1"; };
    const onHide   = () => { if (ref.current) ref.current.style.opacity = "0"; };
    const onShow   = () => { if (ref.current) ref.current.style.opacity = "1"; };
    // Over anything tappable the native hand cursor shows (globals.css), so the circle hides.
    const TAPPABLE = 'a, button, [role="button"], summary, label[for], select, input[type="checkbox"], input[type="radio"], input[type="submit"], input[type="button"]';
    // Work cards show their own label instead of any cursor, so the circle stays hidden anywhere inside.
    // Text fields show the typing cursor, so the circle hides there too.
    const HIDDEN = `${TAPPABLE}, img, .work-card, .pg-card, input, textarea, [contenteditable="true"], .ask-panel`;
    // Anything globals.css gives the hand cursor (the dock, footer links) counts as tappable too.
    const hidden = (el: EventTarget | null) =>
      el instanceof Element && (!!el.closest(HIDDEN) || getComputedStyle(el).cursor === "pointer");
    const onOverImg = (e: MouseEvent) => {
      if (hidden(e.target)) onHide();
    };
    // Only come back when the pointer really leaves every hidden zone, not when it moves within one.
    const onOutImg = (e: MouseEvent) => {
      if (hidden(e.target) && !hidden(e.relatedTarget)) onShow();
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("cursor:hide", onHide);
    window.addEventListener("cursor:show", onShow);
    document.addEventListener("mouseover", onOverImg);
    document.addEventListener("mouseout", onOutImg);

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
      document.removeEventListener("mouseover", onOverImg);
      document.removeEventListener("mouseout", onOutImg);
      cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  if (!enabled) return null;

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
