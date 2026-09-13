"use client";
import { useEffect, useRef, useState } from "react";

// The live redBus hi-fi prototype. `?test` hides the viewer's rails, so only the phone shows.
const PROTO_URL = "https://devanshthink-bit.github.io/redbus-return-capture/?test&fidelity=hifi";

// The prototype's own screen is 402 × 874. On a narrow page the viewer drops its phone mock
// and becomes the screen, so there we render it at that size and scale it to the column.
const SCREEN_W = 402;
const SCREEN_H = 874;

export default function ProtoEmbed() {
  const box = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const narrow = w > 0 && w < 640;
  const scale = narrow ? w / SCREEN_W : 1;

  return (
    <div
      ref={box}
      className="cs-proto"
      // The site draws its own cursor; inside the iframe the native one takes over.
      onMouseEnter={() => window.dispatchEvent(new Event("cursor:hide"))}
      onMouseLeave={() => window.dispatchEvent(new Event("cursor:show"))}
      style={{ height: narrow ? SCREEN_H * scale : 820 }}
    >
      {w > 0 && (
        <iframe
          src={PROTO_URL}
          title="redBus return capture, working hi-fi prototype"
          loading="lazy"
          allow="fullscreen"
          style={
            narrow
              ? { width: SCREEN_W, height: SCREEN_H, transform: `scale(${scale})`, transformOrigin: "0 0" }
              : { width: "100%", height: "100%" }
          }
        />
      )}
    </div>
  );
}
