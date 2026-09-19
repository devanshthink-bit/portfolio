"use client";
// Every sheet in V6. Sheets are solid grouped background, like the page — not glass (Apple look).
import Image from "next/image";
import { useState } from "react";
import { useNav } from "../nav";
import { STAGE_LABEL, useStore, type Stage } from "../store";
import { ActionSheet, Avatar, Button, Card, Icon, Note, Sheet, Tag, TextButton, WheelDate } from "../ui";

/** One tappable option in a sheet: a row with a tick when it's chosen. */
function Option({ label, sub, on, onClick }: { label: string; sub?: string; on?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        minHeight: 52,
        background: "#fff",
        borderRadius: "var(--sd-r-md)",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        textAlign: "left",
        boxShadow: on ? "inset 0 0 0 2px var(--sd-link)" : "none",
      }}
    >
      <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        <span className="t-label">{label}</span>
        {sub && <span className="t-label-sm muted">{sub}</span>}
      </span>
      {on && <Icon name="checkmark" size={18} style={{ color: "var(--sd-link)" }} />}
    </button>
  );
}

function SheetPerson({ name, role, tag }: { name: string; role: string; tag?: React.ReactNode }) {
  return (
    <Card style={{ padding: 12, marginBottom: 16 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Avatar name={name} size={40} />
        <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <span className="t-h-xs">{name}</span>
          <span className="t-label-sm muted">{role}</span>
        </span>
        {tag}
      </div>
    </Card>
  );
}

/* ── Not moving forward ─────────────────────────────────────────────────── */
export function NotMovingSheet({ id, name, role, match, leaving }: { id: string; name: string; role: string; match: string; leaving?: boolean }) {
  const nav = useNav();
  const { dispatch } = useStore();
  const [reason, setReason] = useState<string | null>(null);
  const first = name.split(" ")[0];
  const reasons = ["Experience doesn’t match", "Skills don’t match", "Role is closed", "Can’t refer for this team"];
  return (
    <Sheet title={`Not moving forward with ${first}?`} onClose={nav.closeSheet} leaving={leaving}>
      <SheetPerson name={name} role={role} tag={<Tag style="primary">{match}</Tag>} />
      <p className="t-label-sm muted" style={{ marginBottom: 12 }}>
        A reason helps {first} ask better next time. It’s optional.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {reasons.map((r) => (
          <Option key={r} label={r} on={reason === r} onClick={() => setReason(reason === r ? null : r)} />
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Note>{first} sees it straight away.</Note>
        <Button
          onClick={() => {
            dispatch({ t: "handle", id, stage: "notmoving", reason: reason ?? undefined });
            nav.closeSheet();
          }}
        >
          Not moving forward
        </Button>
        <Button type="secondary" onClick={nav.closeSheet}>
          Cancel
        </Button>
      </div>
    </Sheet>
  );
}

/* ── Seen it move ───────────────────────────────────────────────────────── */
export function SeenItMoveSheet({
  name,
  role,
  since,
  onPick,
  leaving,
}: {
  name: string;
  role: string;
  since: string;
  onPick?: (s: Stage) => void;
  leaving?: boolean;
}) {
  const nav = useNav();
  const { dispatch } = useStore();
  const failed = false;
  const first = name.split(" ")[0];
  const stages: Stage[] = ["submitted", "interviews", "onhold", "selected", "notselected"];
  return (
    <Sheet title="Seen it move?" onClose={nav.closeSheet} leaving={leaving}>
      <SheetPerson name={name} role={role} tag={<Tag>{since}</Tag>} />
      <p className="t-label-sm muted" style={{ marginBottom: 12 }}>
        Where is it on Flipkart’s portal now? One tap.
      </p>
      {failed && (
        <div style={{ marginBottom: 12 }}>
          <Note style="failure" icon="xmark.circle.fill">
            Couldn’t update. Nothing changed — try again.
          </Note>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {stages.map((s) => (
          <Option
            key={s}
            label={STAGE_LABEL[s]}
            sub={s === "submitted" ? since.replace("Submitted ", "") : undefined}
            on={s === "submitted"}
            onClick={() => {
              onPick?.(s);
              // the candidate's timeline moves from here, not from a separate screen
              if (name === "Abhinav Saxena") dispatch({ t: "handle", id: "abhinav", stage: s });
              dispatch({ t: "toast", v: `${first} has been told` });
              window.setTimeout(() => dispatch({ t: "toast", v: null }), 1800);
              nav.closeSheet();
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Note>{first} sees it straight away.</Note>
        <Button type="secondary" onClick={nav.closeSheet}>
          No change yet
        </Button>
      </div>
    </Sheet>
  );
}

/* ── Share your link ────────────────────────────────────────────────────── */
export function ShareLinkSheet({ leaving }: { leaving?: boolean }) {
  const nav = useNav();
  const { dispatch } = useStore();
  const [copied, setCopied] = useState(false);
  const apps = [
    { name: "WhatsApp", img: "whatsapp" },
    { name: "Gmail", img: "gmail" },
    { name: "Drive", img: "gdrive" },
    { name: "Telegram", img: "telegram" },
  ];
  return (
    <Sheet title="Share your link" onClose={nav.closeSheet} leaving={leaving}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Button
          onClick={() => {
            setCopied(true);
            dispatch({ t: "toast", v: "Link copied" });
            window.setTimeout(() => dispatch({ t: "toast", v: null }), 1600);
          }}
          icon={<Icon name={copied ? "checkmark" : "link"} size={18} />}
        >
          {copied ? "Copied" : "Copy link"}
        </Button>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="quote.bubble.fill" size={16} style={{ color: "var(--sd-icon-2)" }} />
            <span className="t-h-xs" style={{ flex: 1 }}>
              Message that goes with it
            </span>
            <TextButton>Edit</TextButton>
          </div>
          <Card>
            <p className="t-body muted">
              Happy to look at a referral for Interaction Designer. Send your details here, it has everything our portal
              needs: sidedoor.app/r/nithin-agarwal
            </p>
          </Card>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="arrow.up.right.square" size={16} style={{ color: "var(--sd-icon-2)" }} />
            <span className="t-h-xs">Quick share</span>
          </div>
          <div style={{ display: "flex", gap: 16, justifyContent: "space-between", paddingTop: 4 }}>
            {apps.map((a) => (
              <button key={a.name} onClick={nav.closeSheet} style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
                <span style={{ width: 52, height: 52, borderRadius: 14, background: "#fff", display: "grid", placeItems: "center", boxShadow: "var(--sd-e1)" }}>
                  <Image src={`/images/sidedoor/${a.img}.png`} alt="" width={30} height={30} style={{ width: 30, height: "auto" }} />
                </span>
                <span className="t-label-sm muted">{a.name}</span>
              </button>
            ))}
            <button onClick={nav.closeSheet} style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
              <span style={{ width: 52, height: 52, borderRadius: 14, background: "var(--sd-fill-3)", display: "grid", placeItems: "center" }}>
                <Icon name="square.grid.2x2" size={22} style={{ color: "var(--sd-icon-2)" }} />
              </span>
              <span className="t-label-sm muted">More</span>
            </button>
          </div>
        </div>

        {/* the link is a web page, so you can look at what the other person gets */}
        <Button
          type="secondary"
          onClick={() => {
            nav.closeSheet();
            nav.present("linkPage");
          }}
        >
          See the page they get
        </Button>
        <Button type="secondary" onClick={nav.closeSheet}>
          Cancel
        </Button>
      </div>
    </Sheet>
  );
}

/* ── Date of birth ──────────────────────────────────────────────────────── */
export function DobSheet({ leaving }: { leaving?: boolean }) {
  const nav = useNav();
  const { dispatch } = useStore();
  const [value, setValue] = useState("14 March 1997");
  return (
    <Sheet title="Date of birth" onClose={nav.closeSheet} leaving={leaving}>
      <WheelDate onPick={setValue} />
      <div style={{ height: 16 }} />
      <Button
        onClick={() => {
          dispatch({ t: "detail", k: "dob", v: value });
          nav.closeSheet();
        }}
      >
        Done
      </Button>
    </Sheet>
  );
}

/* ── Add resume to ask (skipped-resume route) ───────────────────────────── */
export function AddResumeSheet({ leaving }: { leaving?: boolean }) {
  const nav = useNav();
  const { dispatch } = useStore();
  return (
    <Sheet title="Add your resume to ask" onClose={nav.closeSheet} leaving={leaving}>
      <p className="t-body muted" style={{ marginBottom: 16 }}>
        Referrers need it before they can act. It takes one upload, and we fill in the rest.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Button
          onClick={() => {
            dispatch({ t: "resume", v: "Abhinav_Saxena_Resume.pdf" });
            nav.closeSheet();
            nav.push("uploadResume");
          }}
        >
          Add resume
        </Button>
        <Button type="secondary" onClick={nav.closeSheet}>
          Not now
        </Button>
      </div>
    </Sheet>
  );
}

/* ── Log out ────────────────────────────────────────────────────────────── */
export function LogoutSheet() {
  const nav = useNav();
  const { dispatch } = useStore();
  return (
    <ActionSheet
      message="You’ll need to sign in again. Your requests stay where they are."
      options={[
        {
          label: "Log out",
          destructive: true,
          onClick: () => {
            nav.closeSheet();
            dispatch({ t: "reset" });
            nav.reset("login");
          },
        },
      ]}
      onCancel={nav.closeSheet}
    />
  );
}
