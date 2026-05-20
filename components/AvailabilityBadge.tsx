"use client";
import { useEffect, useState } from "react";

export default function AvailabilityBadge() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
      {/* Available badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8, flexShrink: 0 }}>
          <span style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "#22c55e", animation: "ping 1.6s cubic-bezier(0,0,0.2,1) infinite", opacity: 0.5,
          }} />
          <span style={{ position: "relative", width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
        </span>
        <span style={{
          fontFamily: "var(--font-geist-mono)", fontSize: 11, fontWeight: 500,
          color: "#22c55e", letterSpacing: "0.04em",
        }}>
          Available for new roles
        </span>
      </div>

      {/* Live IST clock */}
      {time && (
        <span style={{
          fontFamily: "var(--font-geist-mono)", fontSize: 11,
          color: "var(--text-muted)", letterSpacing: "0.04em",
        }}>
          {time} IST · Bengaluru
        </span>
      )}
    </div>
  );
}
