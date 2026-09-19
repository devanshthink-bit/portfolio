"use client";
// The referrer's side: a request that arrives complete, a fit you can check line by line, portal
// fields ready to copy, and saying no in one tap.
import Image from "next/image";
import { useEffect, useState } from "react";
import { useNav } from "../nav";
import { STAGE_LABEL, stageTag, useStore, type Stage } from "../store";
import {
  Actions,
  Avatar,
  Box,
  Button,
  Card,
  Empty,
  Field,
  Icon,
  MatchRow,
  Note,
  Screen,
  Section,
  SkeletonCard,
  SmallButton,
  Switch,
  Tag,
  TextButton,
} from "../ui";
import { BellButton } from "./candidate";
import { CompanyRow, Project } from "./onboarding";

type Req = {
  id: string;
  name: string;
  role: string;
  match: string;
  when: string;
  common?: { logo?: string; icon?: "building.2.fill"; text: string };
  lower?: boolean;
};

const REQUESTS: Req[] = [
  { id: "abhinav", name: "Abhinav Saxena", role: "Product Designer, Blinkit", match: "4 of 7 skills · 3 yrs", when: "Today", common: { logo: "makemytrip", text: "Both worked at MakeMyTrip" } },
  { id: "arpita", name: "Arpita Singh", role: "Product Designer, Myntra", match: "4 of 7 skills · 3 yrs", when: "Yesterday", common: { icon: "building.2.fill", text: "Both studied at NID" } },
  { id: "aviral", name: "Aviral Dixit", role: "UX Designer, Razorpay", match: "3 of 7 skills · 4 yrs", when: "Tuesday" },
  { id: "rahul", name: "Rahul Nair", role: "Visual Designer, Dunzo", match: "2 of 7 skills · 1 yr", when: "Monday", lower: true },
  { id: "nisha", name: "Nisha Rao", role: "UI Designer, Urban Company", match: "2 of 7 skills · 2 yrs", when: "12 Sep", lower: true },
];

const SUGGESTED: Req[] = [
  { id: "shreya", name: "Shreya Verma", role: "UX Designer, CRED", match: "5 of 7 skills · 4 yrs", when: "", common: { icon: "building.2.fill", text: "Both studied at NID" } },
  { id: "advika", name: "Advika Singh", role: "Product Designer, Meesho", match: "4 of 7 skills · 3 yrs", when: "" },
];

/* ── Referral requests ──────────────────────────────────────────────────── */
export function ReferralRequests() {
  const nav = useNav();
  const { handled, invited, unread, jobId, dispatch } = useStore();
  const [phase, setPhase] = useState<"loading" | "ok">("loading");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setPhase("ok"), 900);
    return () => clearTimeout(t);
  }, []);

  const outstanding = REQUESTS.filter((r) => !r.lower && !handled[r.id]);
  const lower = REQUESTS.filter((r) => r.lower && !handled[r.id]);
  const allHandled = phase === "ok" && outstanding.length === 0 && lower.length === 0;

  return (
    <Screen largeTitle="Referral requests" right={<BellButton unread={unread} />}>
      <div style={{ paddingTop: 8, display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="briefcase.fill" size={16} style={{ color: "var(--sd-icon-2)" }} />
          <span className="t-h-xs" style={{ flex: 1 }}>
            Interaction Designer · Flipkart
          </span>
          <Tag>Job ID {jobId || "184223"}</Tag>
        </div>

        {phase === "loading" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : allHandled ? (
          <Empty
            icon="checkmark.seal.fill"
            title="All handled"
            body="Nothing waiting on you. New requests land here."
            action={<Button type="secondary" onClick={() => nav.push("yourReferrals")}>See your referrals</Button>}
          />
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {outstanding.map((r) => (
                <RequestCard key={r.id} r={r} onClick={() => nav.push("referralRequest", { id: r.id })} />
              ))}
            </div>

            {lower.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <button onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", gap: 6, minHeight: 44 }}>
                  <span className="t-h-xs">Lower match ({lower.length})</span>
                  <Icon
                    name="chevron.down"
                    size={14}
                    style={{ color: "var(--sd-icon-2)", transform: open ? "rotate(180deg)" : "none", transition: "transform 200ms" }}
                  />
                </button>
                {open &&
                  lower.map((r) => (
                    <RequestCard key={r.id} r={r} onClick={() => nav.push("referralRequest", { id: r.id })} />
                  ))}
              </div>
            )}
          </>
        )}

        {phase === "ok" && (
          <Section label="Suggested for this job" icon="lightbulb.fill">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <p className="t-label-sm muted">They match this job and chose to be found.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {SUGGESTED.map((r) => (
                  <RequestCard
                    key={r.id}
                    r={r}
                    end={
                      invited.includes(r.name) ? (
                        <Tag>Invited</Tag>
                      ) : (
                        <SmallButton onClick={() => dispatch({ t: "invite", v: r.name })}>Invite</SmallButton>
                      )
                    }
                  />
                ))}
              </div>
            </div>
          </Section>
        )}
      </div>
    </Screen>
  );
}

function RequestCard({ r, onClick, end }: { r: Req; onClick?: () => void; end?: React.ReactNode }) {
  return (
    <Card onClick={onClick}>
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
        <div style={{ display: "flex", gap: 12, flex: 1, minWidth: 0 }}>
          <Avatar name={r.name} />
          <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
            <span className="t-h-sm">{r.name}</span>
            <span className="t-label-sm muted">{r.role}</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
              <Tag style="primary">{r.match}</Tag>
              {r.common && (
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {r.common.logo && (
                    <Image src={`/images/sidedoor/${r.common.logo}.png`} alt="" width={16} height={16} style={{ width: 16, height: "auto" }} />
                  )}
                  {r.common.icon && <Icon name={r.common.icon} size={14} style={{ color: "var(--sd-icon-2)" }} />}
                  <span className="t-label-sm muted">{r.common.text}</span>
                </span>
              )}
            </div>
          </div>
        </div>
        {end ?? (
          <span style={{ display: "flex", alignItems: "center", gap: 4, flex: "0 0 auto", whiteSpace: "nowrap" }}>
            <Icon name="clock" size={13} style={{ color: "var(--sd-icon-2)" }} />
            <span className="t-label-sm muted">{r.when}</span>
          </span>
        )}
      </div>
    </Card>
  );
}

/* ── One referral request ───────────────────────────────────────────────── */
const SKILLS: { name: string; ok: boolean; source: string; isExperience?: boolean }[] = [
  { name: "Interaction design", ok: true, source: "From resume · MakeMyTrip" },
  { name: "Figma", ok: true, source: "From resume · Blinkit" },
  { name: "User research", ok: true, source: "From resume · Blinkit" },
  { name: "Prototyping", ok: true, source: "From resume · Blinkit" },
  { name: "3 yrs experience", ok: true, source: "You need 3+", isExperience: true },
  { name: "AI-assisted design", ok: false, source: "Not in their resume" },
  { name: "Design system", ok: false, source: "Not in their resume" },
  { name: "A/B testing", ok: false, source: "Not in their resume" },
];

export function ReferralRequest({ id }: { id: string }) {
  const nav = useNav();
  const { handled, removedSkills, jobId, dispatch } = useStore();
  const r = REQUESTS.find((x) => x.id === id) ?? REQUESTS[0];
  const state = handled[r.id];
  const skills = SKILLS.filter((s) => !removedSkills.includes(s.name));
  // the tag counts skills only — the experience row is a separate fact, as in V6
  const skillRows = skills.filter((s) => !s.isExperience);
  const matched = skillRows.filter((s) => s.ok).length;

  if (state?.stage === "referred") return <AfterRefer id={r.id} />;
  if (state?.stage === "submitted") return <MarkedSubmitted id={r.id} />;
  if (state?.stage === "notmoving")
    return (
      <Screen title="Referral request" back actions={<Button onClick={() => nav.pop()}>Back to referral requests</Button>}>
        <div style={{ paddingTop: 8, display: "flex", flexDirection: "column", gap: 24 }}>
          <PersonHead name={r.name} role={r.role} tag={<Tag>Not moving forward</Tag>} />
          <Card>
            <p className="t-h-xs">{r.name.split(" ")[0]} has been told</p>
            <div style={{ height: 4 }} />
            <p className="t-label-sm muted">
              {state.reason ? `Reason given: ${state.reason}.` : "No reason given."} It doesn’t count against their week.
            </p>
          </Card>
        </div>
      </Screen>
    );

  return (
    <Screen
      title="Referral request"
      back
      actions={
        <Actions>
          <Button onClick={() => dispatch({ t: "handle", id: r.id, stage: "referred" })}>Refer</Button>
          <Button type="secondary" onClick={() => nav.openSheet("notMoving", { id: r.id, name: r.name })}>
            Not moving forward
          </Button>
        </Actions>
      }
    >
      <div style={{ paddingTop: 8, display: "flex", flexDirection: "column", gap: 24 }}>
        <PersonHead name={r.name} role={r.role} tag={<Tag>Sent {r.when.toLowerCase()}</Tag>} />

        <Card>
          {r.common && (
            <>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {r.common.logo && (
                  <Image src={`/images/sidedoor/${r.common.logo}.png`} alt="" width={20} height={20} style={{ width: 20, height: "auto" }} />
                )}
                {r.common.icon && <Icon name={r.common.icon} size={18} style={{ color: "var(--sd-icon-2)" }} />}
                <span className="t-h-xs">{r.common.text}</span>
              </div>
              <div style={{ height: 2 }} />
              <p className="t-label-sm muted" style={{ paddingLeft: 28 }}>
                You 2021–22 · {r.name.split(" ")[0]} 2022–23
              </p>
              <div style={{ height: 16 }} />
            </>
          )}
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <Fact icon="mappin.and.ellipse">Bengaluru, KA</Fact>
            <Fact icon="calendar">3+ years</Fact>
            <Fact icon="hourglass">30 days</Fact>
          </div>
          <div style={{ height: 12 }} />
          <div style={{ display: "flex", gap: 8 }}>
            <Tag>Full time</Tag>
            <Tag>Remote or hybrid</Tag>
          </div>
        </Card>

        <Section
          label="How they match"
          icon="lightbulb.fill"
          end={<Tag style="primary">{matched} of {skillRows.length} skills · 3 yrs</Tag>}
        >
          <Card>
            {skills.map((s) =>
              s.ok && !s.isExperience ? (
                <button
                  key={s.name}
                  onClick={() => dispatch({ t: "removeSkill", v: s.name })}
                  aria-label={`${s.name} isn’t really there`}
                  style={{ display: "block", width: "100%", textAlign: "left", minHeight: 44 }}
                >
                  <MatchRow ok source={s.source}>
                    {s.name}
                  </MatchRow>
                </button>
              ) : (
                <MatchRow key={s.name} ok={s.ok} source={s.source}>
                  {s.name}
                </MatchRow>
              )
            )}
            <div style={{ height: 8 }} />
            <Tag>Tap a skill that isn’t really there</Tag>
          </Card>
        </Section>

        <Section label="Experience" icon="briefcase.fill">
          <Card>
            <CompanyRow logo="blinkit" role="Product Designer" company="Blinkit" when="Sep 2023–Present" />
            <div style={{ height: 16 }} />
            <CompanyRow logo="makemytrip" role="Associate Product Designer" company="MakeMyTrip" when="Jun 2022–Aug 2023" />
          </Card>
        </Section>

        <Section label="Projects" icon="folder.fill">
          <Card>
            <Project title="Blinkit Merchant App UX Revamp" skills={["Product strategy", "Systems design", "Prototyping", "User research", "Figma"]} />
            <div style={{ height: 16 }} />
            <Project title="MakeMyTrip Booking Experience Redesign" skills={["User research", "Interaction design", "Usability testing", "Figma"]} />
            <div style={{ height: 8 }} />
            <TextButton>Show project details</TextButton>
          </Card>
        </Section>

        <Section label="Resume and links" icon="paperclip">
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="t-label" style={{ flex: 1 }}>
                Abhinav_Saxena_Resume.pdf
              </span>
              <button className="sd-hit44" aria-label="Open resume">
                <Icon name="arrow.up.right.square" size={20} style={{ color: "var(--sd-link)" }} />
              </button>
            </div>
            <div style={{ height: 12 }} />
            <div style={{ display: "flex", gap: 12 }}>
              {["linkedin", "dribbble", "behance"].map((l) => (
                <Image key={l} src={`/images/sidedoor/${l}.png`} alt={l} width={24} height={24} style={{ width: 24, height: "auto" }} />
              ))}
            </div>
          </Card>
        </Section>

        <Section label="Their note" icon="quote.bubble.fill">
          <Card>
            <p className="t-body muted">I led the merchant app redesign at Blinkit. Happy to share more.</p>
          </Card>
        </Section>

        <p className="t-label-sm muted">Job ID {jobId || "184223"} goes with every request.</p>
      </div>
    </Screen>
  );
}

function PersonHead({ name, role, tag }: { name: string; role: string; tag: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <Avatar name={name} size={56} />
      <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        <span className="t-h-md">{name}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span className="sd-person-sub">{role}</span>
          {tag}
        </span>
      </div>
    </div>
  );
}

function Fact({ icon, children }: { icon: Parameters<typeof Icon>[0]["name"]; children: React.ReactNode }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <Icon name={icon} size={16} style={{ color: "var(--sd-icon-2)" }} />
      <span className="t-label">{children}</span>
    </span>
  );
}

/* ── After refer: the portal fields, ready to copy ───────────────────────── */
/**
 * These are the same four answers the candidate typed on "Check your request" — that is the
 * point of asking once. The rest come from the resume.
 */
function portalFields(d: { dob: string; gaps: string; locations: string; notice: string }) {
  return [
    { name: "Full name", value: "Abhinav Saxena" },
    { name: "Email", value: "abhinav.saxena@email.com" },
    { name: "Phone", value: "+91 98XXX XXX21" },
    { name: "Current city", value: "Bengaluru" },
    { name: "Total experience", value: "3 yrs" },
    { name: "Relevant experience", value: "3 yrs" },
    { name: "Notice period", value: d.notice || "30 days" },
    { name: "Career gaps", value: d.gaps || "None" },
    { name: "Date of birth", value: d.dob || "12 Mar 1999" },
    { name: "Preferred locations", value: d.locations || "Bengaluru, Remote" },
    { name: "Resume", value: "Abhinav_Saxena_Resume.pdf", download: true },
  ];
}

function AfterRefer({ id }: { id: string }) {
  const nav = useNav();
  const { jobId, details, dispatch } = useStore();
  const r = REQUESTS.find((x) => x.id === id) ?? REQUESTS[0];
  const [copied, setCopied] = useState<string[]>([]);
  const fields = portalFields(details);
  const first = r.name.split(" ")[0];

  return (
    <Screen
      title="Referral request"
      back
      actions={
        <Actions>
          <p className="t-label-sm muted">Tap once it’s in the portal. {first} will be told.</p>
          <Button onClick={() => dispatch({ t: "handle", id: r.id, stage: "submitted" })}>Mark as submitted</Button>
          <Button type="secondary" onClick={() => nav.push("chat", { who: r.name })}>
            Message {first}
          </Button>
        </Actions>
      }
    >
      <div style={{ paddingTop: 8, display: "flex", flexDirection: "column", gap: 24 }}>
        <PersonHead name={r.name} role={r.role} tag={<Tag style="success">Referred</Tag>} />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <TextButton onClick={() => dispatch({ t: "handle", id: r.id, stage: "sent" })}>Undo refer</TextButton>
        </div>

        <Section label="Add to Flipkart’s portal" icon="arrow.up.right.square" end={<Tag>Job ID {jobId || "184223"}</Tag>}>
          <Card>
            {fields.map((f) => (
              <div key={f.name} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "8px 0" }}>
                <span className="t-label-sm muted" style={{ width: 104, flex: "0 0 auto" }}>
                  {f.name}
                </span>
                <span className="t-label" style={{ flex: 1 }}>
                  {f.value}
                </span>
                <button
                  className="sd-hit44"
                  style={{ minHeight: 24 }}
                  aria-label={f.download ? `Download ${f.name}` : `Copy ${f.name}`}
                  onClick={() => {
                    setCopied((c) => (c.includes(f.name) ? c : [...c, f.name]));
                    dispatch({ t: "toast", v: f.download ? "Resume downloaded" : `${f.name} copied` });
                    window.setTimeout(() => dispatch({ t: "toast", v: null }), 1400);
                  }}
                >
                  <Icon
                    name={copied.includes(f.name) ? "checkmark" : f.download ? "square.and.arrow.down" : "doc.on.doc.fill"}
                    size={18}
                    style={{ color: copied.includes(f.name) ? "var(--sd-text-success)" : "var(--sd-link)" }}
                  />
                </button>
              </div>
            ))}
            <div style={{ height: 8 }} />
            <Tag>Copy each detail in the order the portal asks</Tag>
          </Card>
        </Section>
      </div>
    </Screen>
  );
}

function MarkedSubmitted({ id }: { id: string }) {
  const nav = useNav();
  const r = REQUESTS.find((x) => x.id === id) ?? REQUESTS[0];
  const first = r.name.split(" ")[0];
  return (
    <Screen
      title="Referral request"
      back
      actions={
        <Actions>
          <Button onClick={() => nav.pop()}>Back to referral requests</Button>
          <Button type="secondary" onClick={() => nav.push("chat", { who: r.name })}>
            Message {first}
          </Button>
        </Actions>
      }
    >
      <div style={{ paddingTop: 8, display: "flex", flexDirection: "column", gap: 24 }}>
        <PersonHead name={r.name} role={r.role} tag={<Tag style="success">Submitted</Tag>} />
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center", textAlign: "center", paddingTop: 16 }}>
          <span style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--sd-link)", display: "grid", placeItems: "center" }}>
            <Icon name="checkmark" size={24} style={{ color: "#fff" }} />
          </span>
          <h2 className="t-h-sm">Marked as submitted</h2>
          <p className="t-label muted">{first} has been told. Once a week we’ll ask if you’ve seen it move.</p>
        </div>
      </div>
    </Screen>
  );
}

/* ── Your referrals ─────────────────────────────────────────────────────── */
type Referral = { name: string; stage: Stage; when: string; days?: number };

const REFERRALS: Referral[] = [
  { name: "Aviral Dixit", stage: "submitted", when: "12 days", days: 12 },
  { name: "Aarush Gupta", stage: "submitted", when: "9 days", days: 9 },
  { name: "Arpita Singh", stage: "interviews", when: "Tuesday" },
  { name: "Ayesha Sharma", stage: "onhold", when: "Friday" },
  { name: "Himani Kaushik", stage: "selected", when: "Yesterday" },
  { name: "Shreya Verma", stage: "notselected", when: "12 Sep" },
  { name: "Amit Patel", stage: "notselected", when: "5 Sep" },
];

export function YourReferrals() {
  const nav = useNav();
  const { handled, unread } = useStore();
  const [moved, setMoved] = useState<Record<string, Stage>>({});
  const abhinav = handled.abhinav;
  const stageOf = (r: Referral) => moved[r.name] ?? r.stage;
  const waiting = REFERRALS.filter((r) => r.days && stageOf(r) === "submitted");
  const all: Referral[] = [
    ...(abhinav?.stage === "submitted" ? [{ name: "Abhinav Saxena", stage: "submitted" as Stage, when: "Today" }] : []),
    ...REFERRALS.filter((r) => !r.days),
  ];

  const bar = (r: Referral, withUpdate: boolean) => (
    <Card key={r.name} style={{ padding: 12 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Avatar name={r.name} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <span className="t-h-sm">{r.name}</span>
          <span>
            <Tag style={stageTag(stageOf(r))}>{STAGE_LABEL[stageOf(r)]}</Tag>
          </span>
        </div>
        <span style={{ display: "flex", alignItems: "center", gap: 8, flex: "0 0 auto" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Icon name="clock" size={14} style={{ color: "var(--sd-icon-2)" }} />
            <span className="t-label-sm muted">{r.when}</span>
          </span>
          {withUpdate && (
            <SmallButton
              onClick={() =>
                nav.openSheet("seenItMove", {
                  name: r.name,
                  since: r.days ? `Submitted ${r.days} days ago` : `Submitted ${r.when}`,
                  onPick: (s: Stage) => setMoved((m) => ({ ...m, [r.name]: s })),
                })
              }
            >
              Update
            </SmallButton>
          )}
        </span>
      </div>
    </Card>
  );

  return (
    <Screen largeTitle="Your referrals" right={<BellButton unread={unread} />}>
      <div style={{ paddingTop: 8, display: "flex", flexDirection: "column", gap: 24 }}>
        <Section label="What your referrals reached" icon="flag.fill">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Tag style="success">1 selected</Tag>
              <Tag style="success">1 in interviews</Tag>
              <Tag style="buffer">1 on hold</Tag>
            </div>
            <Card>
              <div style={{ display: "flex", gap: 12 }}>
                <Avatar name="Himani Kaushik" size={36} />
                <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                  <span className="t-h-xs">Himani thanked you</span>
                  <span className="t-body muted">“You made the referral easy. I start next month!”</span>
                </span>
                <Icon name="quote.bubble.fill" size={18} style={{ color: "var(--sd-n400)" }} />
              </div>
            </Card>
          </div>
        </Section>

        {waiting.length > 0 && (
          <Section label={`Waiting on an update (${waiting.length})`} icon="clock.fill">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <p className="t-label-sm muted">Submitted over a week ago. Seen them move?</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{waiting.map((r) => bar(r, true))}</div>
            </div>
          </Section>
        )}

        <Section label="All referrals · Interaction Designer" icon="briefcase.fill">
          {all.length === 0 ? (
            <Empty icon="tray" title="No referrals yet" body="People you refer show up here, with where each one got to." />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {all.map((r) => bar(r, !["selected", "notselected"].includes(stageOf(r))))}
            </div>
          )}
        </Section>
      </div>
    </Screen>
  );
}

/* ── Manage your posts ──────────────────────────────────────────────────── */
type Post = { title: string; jobId: string; state: "Live" | "Paused" | "Draft"; activity: string };

const POSTS: Post[] = [
  { title: "Interaction Designer", jobId: "184223", state: "Live", activity: "5 new · 8 referred" },
  { title: "Product Manager", jobId: "188410", state: "Live", activity: "No new requests · 2 referred" },
  { title: "Software Engineer-I", jobId: "190552", state: "Paused", activity: "1 still open · 3 referred" },
  { title: "Product Designer-II", jobId: "", state: "Draft", activity: "" },
];

export function ManagePosts() {
  const nav = useNav();
  const { unread } = useStore();
  const [paused, setPaused] = useState<string[]>(["Software Engineer-I"]);
  return (
    <Screen
      largeTitle="Manage your posts"
      right={
        <>
          <button className="sd-barbtn" onClick={() => nav.push("addJob")} aria-label="Add a job">
            <Icon name="plus" size={22} />
          </button>
          <BellButton unread={unread} />
        </>
      }
    >
      <div style={{ paddingTop: 8, display: "flex", flexDirection: "column", gap: 24 }}>
        <Section label="Flipkart · 4 posts" icon="briefcase.fill">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {POSTS.map((p) => {
              const off = paused.includes(p.title);
              const state = p.state === "Draft" ? "Draft" : off ? "Paused" : "Live";
              return (
                <Card key={p.title}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span className="t-h-sm" style={{ flex: 1 }}>
                      {p.title}
                    </span>
                    {p.state !== "Draft" && (
                      <Switch
                        on={!off}
                        onChange={(v) => setPaused((s) => (v ? s.filter((x) => x !== p.title) : [...s, p.title]))}
                      />
                    )}
                  </div>
                  <div style={{ height: 4 }} />
                  <p className="t-label-sm muted">
                    {state === "Draft" ? "Draft · Add the job ID to post" : `${state} · Job ID ${p.jobId}`}
                  </p>
                  <div style={{ height: 12 }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span className="t-label-sm muted" style={{ flex: 1 }}>
                      {p.activity}
                    </span>
                    <TextButton onClick={() => nav.push(p.state === "Draft" ? "checkPost" : "editPost", { title: p.title })}>
                      {p.state === "Draft" ? "Finish" : "Edit"}
                    </TextButton>
                  </div>
                </Card>
              );
            })}
          </div>
        </Section>
      </div>
    </Screen>
  );
}

export function EditPost({ title }: { title?: string }) {
  const nav = useNav();
  const { jobId, tips, rules, dispatch } = useStore();
  return (
    <Screen
      title="Edit your job post"
      back
      actions={
        <Actions>
          <Button onClick={() => nav.pop()}>Save changes</Button>
          <Button type="destructive" onClick={() => nav.pop()}>
            Delete this post
          </Button>
        </Actions>
      }
    >
      <div style={{ paddingTop: 8, display: "flex", flexDirection: "column", gap: 24 }}>
        <p className="t-label muted">Changes show on the job straight away.</p>
        <Section label="The job" icon="briefcase.fill">
          <Box>
            <DetailLine name="Company" value="Flipkart" />
            <DetailLine name="Job title" value={title ?? "Interaction Designer"} />
            <DetailLine name="Experience" value="3+ yrs" />
            <DetailLine name="Location" value="Bengaluru, KA · Remote or hybrid" />
          </Box>
        </Section>
        <Field label="Job ID" value={jobId || "184223"} onChange={(v) => dispatch({ t: "jobId", v })} />
        <Field
          label="Tips for candidates (optional)"
          value={tips}
          onChange={(v) => dispatch({ t: "tips", v })}
          placeholder="e.g. Link a portfolio with end-to-end case studies."
          multiline
        />
        <Section label="Your rules" icon="gearshape.fill">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Card>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span className="t-h-xs" style={{ flex: 1 }}>
                  Experience must match
                </span>
                <Switch on={rules.experience} onChange={(v) => dispatch({ t: "rule", k: "experience", v })} />
              </div>
            </Card>
            <Card>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span className="t-h-xs" style={{ flex: 1 }}>
                  Up to 10 requests a week
                </span>
                <Switch on={rules.weekly} onChange={(v) => dispatch({ t: "rule", k: "weekly", v })} />
              </div>
            </Card>
          </div>
        </Section>
      </div>
    </Screen>
  );
}

function DetailLine({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 12, padding: "8px 0" }}>
      <span className="t-label-sm muted" style={{ width: 104, flex: "0 0 auto" }}>
        {name}
      </span>
      <span className="t-label" style={{ flex: 1 }}>
        {value}
      </span>
    </div>
  );
}

export { Note, Box };
