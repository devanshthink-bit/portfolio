"use client";
// The page around the phone: the phone itself, and a list of every V6 state with a way into it.
import { useState } from "react";
import { IPhone } from "../IPhone";
import SidedoorApp from "./App";
import { GROUPS, SCENARIOS } from "./scenarios";

export default function Viewer() {
  const [jump, setJump] = useState<{ id: string; n: number }>();
  const go = (id: string) => setJump((j) => ({ id, n: (j?.n ?? 0) + 1 }));

  return (
    <div className="proto-layout">
      <aside className="proto-states">
        <h2>Every screen and state</h2>
        <p className="proto-sub">
          The app runs its own code either way — these only put it where a state shows. Everything
          is reachable by tapping too.
        </p>
        <div className="proto-scroll" data-lenis-prevent>
        <div className="proto-groups">
        {GROUPS.map((g) => {
          const items = SCENARIOS.filter((s) => s.group === g);
          if (!items.length) return null;
          return (
            <section key={g} className="proto-state-group">
              <h3>{g}</h3>
              <ul>
                {items.map((s) => (
                  <li key={s.id}>
                    <button
                      className={`proto-state${jump?.id === s.id ? " is-on" : ""}`}
                      onClick={() => go(s.id)}
                    >
                      <span className={`proto-role is-${s.role}`}>{s.role === "referrer" ? "R" : "C"}</span>
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        </div>
        </div>
      </aside>

      <div className="proto-stage">
        {/* no n here: the page CSS sets --n from the window height so the phone always fits */}
        <IPhone>
          <SidedoorApp jump={jump} />
        </IPhone>
      </div>
    </div>
  );
}
