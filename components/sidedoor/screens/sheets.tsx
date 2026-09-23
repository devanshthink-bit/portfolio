"use client";
// Every sheet in V6. Sheets are solid grouped background, like the page — not glass (Apple look).
import Image from "next/image";
import { useState } from "react";
import { useNav } from "../nav";
import { STAGE_LABEL, useDecide, useStore, type Stage } from "../store";
import { ActionSheet, Avatar, Button, Card, Field, Icon, Note, RadioList, RadioOption, Sheet, Tag, TextButton, WheelDate } from "../ui";

function SheetPerson({ name, role, tag }: { name: string; role: string; tag?: React.ReactNode }) {
  return (
    // Figma: 24 from the person card to what follows, in both sheets that carry one
    <Card style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <Avatar name={name} size={44} />
        <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
          <span className="t-h-sm sd-1line">{name}</span>
          <span className="t-label muted sd-1line">{role}</span>
          {tag && <span>{tag}</span>}
        </span>
      </div>
    </Card>
  );
}

/* ── Not moving forward ─────────────────────────────────────────────────── */
export function NotMovingSheet({ id, name, role, match, leaving }: { id: string; name: string; role: string; match: string; leaving?: boolean }) {
  const nav = useNav();
  const { dispatch } = useStore();
  const decide = useDecide();
  const [reason, setReason] = useState<string | null>(null);
  const first = name.split(" ")[0];
  const reasons = ["Experience doesn’t match", "Skills don’t match", "Role is closed", "Can’t refer for this team"];
  return (
    <Sheet title={`Not moving forward with ${first}?`} onClose={nav.closeSheet} leaving={leaving}>
      {/* Figma: "4 of 7 skills match" — the skills half of the card's match line */}
      <SheetPerson name={name} role={role} tag={<Tag style="primary">{`${match.split(" · ")[0]} match`}</Tag>} />
      <p className="t-label muted" style={{ marginBottom: 12 }}>
        A reason helps {first} ask better next time. It’s optional.
      </p>
      <div style={{ marginBottom: 24 }}>
        <RadioList>
          {reasons.map((r) => (
            <RadioOption key={r} title={r} on={reason === r} onClick={() => setReason(reason === r ? null : r)} />
          ))}
        </RadioList>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Note>{first} is told in 5 seconds. You can undo.</Note>
        <Button
          onClick={() => {
            dispatch({ t: "handle", id, stage: "notmoving", reason: reason ?? undefined });
            decide(
              `Not moving forward. ${first} is told in 5 seconds.`,
              () => {
                dispatch({ t: "unhandle", id });
                nav.push("referralRequest", { id });
              },
              () => dispatch({ t: "tell", stage: "notmoving", reason: reason ?? undefined })
            );
            // Figma: the sheet goes back to the list, where this request is no longer waiting
            nav.closeSheet();
            nav.pop();
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
  onUndo,
  leaving,
}: {
  name: string;
  role: string;
  since: string;
  onPick?: (s: Stage) => void;
  onUndo?: () => void;
  leaving?: boolean;
}) {
  const nav = useNav();
  const { dispatch, handled } = useStore();
  const decide = useDecide();
  const { force } = useStore();
  const failed = force === "sheet.seen.error";
  const first = name.split(" ")[0];
  const stages: Stage[] = ["submitted", "interviews", "onhold", "selected", "notselected"];
  return (
    <Sheet title="Seen it move?" onClose={nav.closeSheet} leaving={leaving}>
      <SheetPerson name={name} role={role} tag={<Tag>{since}</Tag>} />
      <p className="t-label muted" style={{ marginBottom: 12 }}>
        Where is it on Flipkart’s portal now? One tap.
      </p>
      <div style={{ marginBottom: 24 }}>
        <RadioList>
        {stages.map((s) => (
          <RadioOption
            key={s}
            title={STAGE_LABEL[s]}
            sub={s === "submitted" ? since.replace("Submitted ", "") : undefined}
            on={s === "submitted"}
            onClick={() => {
              // the failed state stays failed: the tap didn't go through
              if (failed) return;
              onPick?.(s);
              // the candidate's timeline moves from here, not from a separate screen
              const live = name === "Abhinav Saxena";
              const before = handled.abhinav;
              if (live) dispatch({ t: "handle", id: "abhinav", stage: s });
              decide(
                `${STAGE_LABEL[s]}. ${first} is told in 5 seconds.`,
                () => {
                  onUndo?.();
                  if (live && before) dispatch({ t: "handle", id: "abhinav", stage: before.stage, reason: before.reason });
                },
                () => {
                  if (live) dispatch({ t: "tell", stage: s });
                }
              );
              nav.closeSheet();
            }}
          />
        ))}
        </RadioList>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Figma's error swaps the reassuring line for a red one; nothing else changes */}
        {failed ? (
          <Note style="failure" icon="info.circle.fill">Couldn’t update. Try again.</Note>
        ) : (
          <Note>{first} is told in 5 seconds. You can undo.</Note>
        )}
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
  const LINK = "sidedoor.app/r/nithin-agarwal";
  const [msg, setMsg] = useState(
    `Happy to look at a referral for Interaction Designer. Send your details here, it has everything our portal needs: ${LINK}`
  );
  const [editing, setEditing] = useState(false);
  // the message is what goes out with the link, so the link can't be edited out of it
  const msgError = !msg.trim() ? "Required." : !msg.includes(LINK) ? "Keep your link in the message." : null;
  const apps = [
    { name: "WhatsApp", img: "whatsapp", w: 40, h: 40 },
    { name: "Gmail", img: "gmail", w: 34, h: 25 },
    { name: "Drive", img: "gdrive", w: 32, h: 28.6 },
    { name: "Telegram", img: "telegram", w: 33, h: 33 },
  ];
  return (
    <Sheet title="Share your link" onClose={nav.closeSheet} leaving={leaving}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Figma: the icon and label sit at the left padding (32), not centred; a 24 link glyph */}
        <Button
          onClick={() => {
            setCopied(true);
            dispatch({ t: "toast", v: "Link copied" });
            window.setTimeout(() => dispatch({ t: "toast", v: null }), 1600);
          }}
          icon={<Icon name={copied ? "checkmark" : "link"} size={24} />}
          style={{ justifyContent: "flex-start" }}
        >
          {copied ? "Copied" : "Copy link"}
        </Button>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="quote.bubble.fill" size={16} color="tone" />
            <span className="t-h-xs" style={{ flex: 1 }}>
              Message that goes with it
            </span>
            <TextButton onClick={() => setEditing((e) => !e)} disabled={editing && !!msgError}>
              {editing ? "Done" : "Edit"}
            </TextButton>
          </div>
          {editing ? (
            <Field value={msg} onChange={setMsg} multiline kind="tips" required error={msgError ?? undefined} />
          ) : (
            // Figma "Box": r8, padded 12/16, Regular 14/20 in the body colour
            <div style={{ background: "var(--sd-n0)", borderRadius: 8, padding: "12px 16px", outline: "var(--sd-edge)", outlineOffset: -1 }}>
              <p className="t-body">{msg}</p>
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="arrow.up.right.square" size={16} color="tone" />
            <span className="t-h-xs">Quick share</span>
          </div>
          {/* Figma: five 60x60 white tiles (r8, 8 padding, no shadow) spread edge to edge, the
              name 8 below in 14/20. "More" holds three grey dots. */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {[...apps, { name: "More", img: "", w: 0, h: 0 }].map((a) => (
              <button key={a.name} onClick={nav.closeSheet} style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                <span style={{ width: 60, height: 60, borderRadius: 8, background: "var(--sd-n0)", outline: "var(--sd-edge)", outlineOffset: -1, display: "grid", placeItems: "center" }}>
                  {a.img ? (
                    <Image src={`/images/sidedoor/${a.img}.svg`} alt="" width={a.w} height={a.h} style={{ width: a.w, height: a.h }} unoptimized />
                  ) : (
                    <span style={{ display: "flex", gap: 7.6 }}>
                      {[0, 1, 2].map((i) => (
                        <span key={i} style={{ width: 7.9, height: 7.9, borderRadius: "50%", background: "var(--sd-border)", margin: 0.8 }} />
                      ))}
                    </span>
                  )}
                </span>
                <span className="t-label muted">{a.name}</span>
              </button>
            ))}
          </div>
        </div>

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
