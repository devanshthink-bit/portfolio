"use client";
import { useEffect, useRef } from "react";

const LIFETIME = 650;

interface Point { x: number; y: number; t: number; }

export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(pointer: coarse)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const points: Point[] = [];
    let frameId: number;

    const onMove = (e: MouseEvent) => {
      points.push({ x: e.clientX, y: e.clientY, t: Date.now() });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();

      while (points.length > 0 && now - points[0].t > LIFETIME) points.shift();

      // Need at least 3 points to form a bezier segment
      if (points.length >= 3) {
        for (let i = 1; i < points.length - 1; i++) {
          const prev = points[i - 1];
          const curr = points[i];
          const next = points[i + 1];

          // Midpoints — the bezier starts and ends here so segments join seamlessly
          const startX = (prev.x + curr.x) / 2;
          const startY = (prev.y + curr.y) / 2;
          const endX   = (curr.x + next.x) / 2;
          const endY   = (curr.y + next.y) / 2;

          const t = Math.max(0, 1 - (now - curr.t) / LIFETIME);

          ctx.beginPath();
          ctx.moveTo(startX, startY);
          // curr is the control point — this produces a smooth G1-continuous curve
          ctx.quadraticCurveTo(curr.x, curr.y, endX, endY);
          ctx.strokeStyle = `rgba(55, 53, 50, ${t * 0.72})`;
          ctx.lineWidth = 1.8;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
        }
      }

      frameId = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden style={{
      position: "fixed", top: 0, left: 0,
      pointerEvents: "none", zIndex: 9989,
    }} />
  );
}
