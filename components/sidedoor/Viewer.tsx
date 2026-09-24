"use client";
// The prototype presentation, laid out like the RedBus one: a calm panel on the left, the phone on
// its glow on the right, nothing that scrolls the page. Two flows show their main screens; every
// other state sits in one drawer that starts closed.
import { useEffect, useRef, useState } from "react";
import { IPhone } from "../IPhone";
import SidedoorApp from "./App";
import { GROUPS, SCENARIOS } from "./scenarios";

type Role = "referrer" | "candidate";

const FLOWS: Record<Role, { who: string; steps: { id: string; t: string }[] }> = {
  referrer: {
    who: "You are Nithin, a design manager at Flipkart.",
    steps: [
      { id: "ref.posts", t: "Your job posts" },
      { id: "ref.live", t: "Job posted, link to share" },
      { id: "ref.reqs", t: "Referral requests, best fit first" },
      { id: "ref.req", t: "One request, with proof" },
      { id: "refer.undo", t: "Refer, then mark as submitted" },
      { id: "ref.refs", t: "Your referrals" },
      { id: "link.page", t: "What your link opens" },
    ],
  },
  candidate: {
    who: "You are Abhinav, a product designer at Blinkit.",
    steps: [
      { id: "start", t: "Sign in" },
      { id: "cand.done", t: "Check your details" },
      { id: "cand.jobs", t: "Jobs with someone who refers" },
      { id: "cand.job", t: "Job details and your match" },
      { id: "cand.check", t: "Check your request" },
      { id: "requests.justsent", t: "Sent" },
      { id: "cand.track", t: "Track the request" },
    ],
  },
};

const IN_FLOW = new Set(Object.values(FLOWS).flatMap((f) => f.steps.map((s) => s.id)));
// "Candidate · Jobs" reads as "Jobs" once the list is already one side's.
const short = (l: string) => l.replace(/^(Candidate|Referrer) · /, "");

export default function Viewer() {
  const [role, setRole] = useState<Role>("referrer");
  const [jump, setJump] = useState<{ id: string; n: number }>({ id: FLOWS.referrer.steps[0].id, n: 1 });
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState<string | null>(null);
  const page = useRef<HTMLDivElement>(null);
  const go = (id: string) => setJump((j) => ({ id, n: j.n + 1 }));

  const pick = (r: Role) => {
    if (r === role) return;
    setRole(r);
    setGroup(null);
    go(FLOWS[r].steps[0].id);
  };

  // The glow is a circle centred on the phone, its radius 0.94 of the phone's height, as on the
  // RedBus presentation and the case study's stage. Measured, because the phone's size and place
  // follow the window.
  useEffect(() => {
    const el = page.current;
    const phone = el?.querySelector(".iphone");
    if (!el || !phone) return;
    const fit = () => {
      const r = phone.getBoundingClientRect();
      el.style.setProperty("--gx", `${r.left + r.width / 2}px`);
      el.style.setProperty("--gy", `${r.top + r.height / 2}px`);
      el.style.setProperty("--gr", `${Math.round(r.height * 0.94)}px`);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(phone);
    window.addEventListener("resize", fit);
    return () => { ro.disconnect(); window.removeEventListener("resize", fit); };
  }, []);

  const flow = FLOWS[role];
  const extra = SCENARIOS.filter((s) => s.role === role && !IN_FLOW.has(s.id));
  const groups = GROUPS.map((g) => ({
    g: g === "Happy path" ? "More screens" : g,
    items: extra.filter((s) => s.group === g),
  })).filter((x) => x.items.length);
  const shown = groups.find((x) => x.g === group);

  return (
    <div className="pv" ref={page}>
      <aside className="pv-panel">
        <header className="pv-head">
          <h1 className="pv-brand">
            <img className="pv-logo" src="/images/sidedoor/sidedoor-logo.png" alt="" />
            <img className="pv-word" src="/images/sidedoor/sidedoor-word.svg" alt="SideDoor" width={132} height={24} />
          </h1>
          <p className="pv-eyebrow">Working prototype</p>
          <p className="pv-lede">
            A candidate asks for a referral with everything the referrer needs. The referrer decides
            from proof and refers in a few taps. Everything on the phone works.
          </p>
        </header>

        <div className="pv-seg" role="tablist" data-role={role}>
          <i aria-hidden />
          {(["referrer", "candidate"] as Role[]).map((r) => (
            <button key={r} role="tab" aria-selected={role === r} onClick={() => pick(r)}>
              {r === "referrer" ? "Referrer" : "Candidate"}
            </button>
          ))}
        </div>
        <p className="pv-who">{flow.who}</p>

        <ol className="pv-steps">
          {flow.steps.map((s, i) => (
            <li key={s.id}>
              <button className={jump.id === s.id ? "is-on" : undefined} onClick={() => go(s.id)}>
                <span className="pv-n">{i + 1}</span>
                {s.t}
              </button>
            </li>
          ))}
        </ol>

        <div className={`pv-more${open ? " is-open" : ""}`}>
          <button className="pv-more-h" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <span>Every other state</span>
            <span className="pv-count">{extra.length}</span>
            <svg viewBox="0 0 16 16" aria-hidden><path d="M4 6l4 4 4-4" /></svg>
          </button>
          {open && (
            <div className="pv-more-b">
              <div className="pv-groups">
                {groups.map((x) => (
                  <button
                    key={x.g}
                    className={group === x.g ? "is-on" : undefined}
                    aria-expanded={group === x.g}
                    onClick={() => setGroup((g) => (g === x.g ? null : x.g))}
                  >
                    {x.g} <span>{x.items.length}</span>
                  </button>
                ))}
              </div>
              {shown && (
                <div className="pv-states">
                  {shown.items.map((s) => (
                    <button key={s.id} className={jump.id === s.id ? "is-on" : undefined} onClick={() => go(s.id)}>
                      {short(s.label)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <p className="pv-foot">
          Tap a blank spot and the next thing to tap blinks blue. Tap an empty field and it fills itself.
          Swipe from the left edge to go back.
        </p>
      </aside>

      <div className="proto-stage pv-stage">
        {/* no n here: the page CSS sets --n from the window height so the phone always fits */}
        <IPhone>
          <SidedoorApp jump={jump} />
        </IPhone>
      </div>
    </div>
  );
}
