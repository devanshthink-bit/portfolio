"use client";
import { useEffect, useRef } from "react";

// Gradient colour stops left→right: purple → pink → coral → peach
const STOPS = [
  [192, 132, 252],  // purple
  [232, 121, 165],  // pink
  [251, 113, 133],  // coral/rose
  [251, 146,  60],  // peach/orange
];

function pickColor(t: number): string {
  // t = 0..1, map to STOPS
  const n = STOPS.length - 1;
  const scaled = t * n;
  const i = Math.min(Math.floor(scaled), n - 1);
  const f = scaled - i;
  const a = STOPS[i];
  const b = STOPS[i + 1];
  const r = Math.round(a[0] + (b[0] - a[0]) * f);
  const g = Math.round(a[1] + (b[1] - a[1]) * f);
  const bl = Math.round(a[2] + (b[2] - a[2]) * f);
  return `${r},${g},${bl}`;
}

interface Particle {
  ox: number; oy: number;
  x:  number; y:  number;
  vx: number; vy: number;
  angle: number;
  restAngle: number;
  color: string;
  alpha: number;
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COLS       = 28;
    const ROWS       = 14;
    const PW         = 1.5;   // particle width  — thin grain
    const PH         = 5;     // particle height — short dash
    const MAGNET_R   = 160;
    const REPEL_R    = 90;
    const REPEL_STR  = 600;
    const SPRING_K   = 0.055;
    const DAMPING    = 0.82;

    let animId: number;
    let mouseX = -9999;
    let mouseY = -9999;
    const dpr = window.devicePixelRatio || 1;
    const particles: Particle[] = [];

    const setSize = () => {
      const p = canvas.parentElement;
      if (!p) return;
      const w = p.offsetWidth;
      const h = p.offsetHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    const build = () => {
      particles.length = 0;
      const w = W(); const h = H();
      const cellW = w / COLS;
      const cellH = h / ROWS;
      for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS; r++) {
          const ox = (c + 0.5 + (Math.random() - 0.5) * 0.6) * cellW;
          const oy = (r + 0.5 + (Math.random() - 0.5) * 0.6) * cellH;
          const restAngle = (Math.random() - 0.5) * 0.05; // near-vertical grain
          particles.push({
            ox, oy, x: ox, y: oy, vx: 0, vy: 0,
            angle: restAngle, restAngle,
            color: pickColor(ox / w),  // colour based on x position
            alpha: 0.35 + Math.random() * 0.25,
          });
        }
      }
    };
    build();

    const onResize = () => { setSize(); build(); };
    window.addEventListener("resize", onResize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMouseMove);

    const lerpAngle = (a: number, b: number, t: number) => {
      let d = b - a;
      while (d >  Math.PI) d -= Math.PI * 2;
      while (d < -Math.PI) d += Math.PI * 2;
      return a + d * t;
    };

    const draw = () => {
      const w = W(); const h = H();
      ctx.clearRect(0, 0, w, h);

      particles.forEach(p => {
        p.vx += (p.ox - p.x) * SPRING_K;
        p.vy += (p.oy - p.y) * SPRING_K;

        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Slight position push
        if (dist < REPEL_R && dist > 1) {
          const f = REPEL_STR / (dist * dist);
          p.vx += (dx / dist) * f;
          p.vy += (dy / dist) * f;
        }

        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x  += p.vx;
        p.y  += p.vy;

        // Magnetic rotation → tangent of circle around cursor
        let targetAngle = p.restAngle;
        if (dist < MAGNET_R && dist > 1) {
          const tangential = Math.atan2(dy, dx) + Math.PI / 2;
          const strength = Math.pow(1 - dist / MAGNET_R, 1.8);
          targetAngle = p.restAngle + (tangential - p.restAngle) * strength;
        }
        p.angle = lerpAngle(p.angle, targetAngle, 0.1);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = `rgba(${p.color},${p.alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.roundRect(-PW / 2, -PH / 2, PW, PH, PW / 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
