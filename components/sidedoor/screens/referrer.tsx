"use client";
// The referrer's side: a request that arrives complete, a fit you can check line by line, portal
// fields ready to copy, and saying no in one tap.
import Image from "next/image";
import { useEffect, useState } from "react";
import { useNav } from "../nav";
import { STAGE_LABEL, stageTag, useDecide, useStore, type Stage } from "../store";
import {
  Actions,
  Avatar,
  Box,
  Button,
  Card,
  DetailField,
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
  Toast,
  TextButton,
  logoSrc,
  allValid,
  showDays,
  showYears,
  ListCard,
} from "../ui";
import { BellButton } from "./candidate";
import { CompanyRow, FileBox, JdDetails, Projects, RulesSection } from "./onboarding";

type Req = {
  id: string;
  name: string;
  role: string;
  match: string;
  when: string;
  common?: { logo?: string; icon?: "building.2.fill"; text: string };
  lower?: boolean;
  /** V6 draws one lower-match request whose resume says too little to judge fit. */
  thin?: { city: string; years: string; notice: string; work: string[]; role: string; company: string; when: string; resume: string };
};

const REQUESTS: Req[] = [
  { id: "abhinav", name: "Abhinav Saxena", role: "Product Designer, Blinkit", match: "4 of 7 skills · 3 yrs", when: "Today", common: { logo: "makemytrip", text: "Both worked at MakeMyTrip" } },
  { id: "arpita", name: "Arpita Singh", role: "Product Designer, Myntra", match: "4 of 7 skills · 3 yrs", when: "Yesterday", common: { icon: "building.2.fill", text: "Both studied at NID" } },
  { id: "aviral", name: "Aviral Dixit", role: "UX Designer, Razorpay", match: "3 of 7 skills · 4 yrs", when: "Tuesday" },
  {
    id: "amit",
    name: "Amit Patel",
    role: "Visual Designer",
    match: "Not enough to judge",
    when: "2 days ago",
    lower: true,
    thin: {
      city: "Pune, MH", years: "2 years", notice: "60 days", work: ["Full time", "Remote"],
      role: "Visual Designer", company: "Freelance", when: "2023–Present", resume: "Amit_Patel_Resume.pdf",
    },
  },
  { id: "nisha", name: "Nisha Rao", role: "UI Designer, Urban Company", match: "2 of 7 skills · 2 yrs", when: "12 Sep", lower: true },
];

const SUGGESTED: Req[] = [
  { id: "shreya", name: "Shreya Verma", role: "UX Designer, CRED", match: "5 of 7 skills · 4 yrs", when: "", common: { icon: "building.2.fill", text: "Both studied at NID" } },
  { id: "advika", name: "Advika Singh", role: "Product Designer, Meesho", match: "4 of 7 skills · 3 yrs", when: "" },
];

/* ── Referral requests ──────────────────────────────────────────────────── */
export function ReferralRequests() {
  const nav = useNav();
  const { handled, invited, unread, jobId, force, rules, dispatch } = useStore();
  const [phase, setPhase] = useState<"loading" | "ok">("loading");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (force === "reqs.loading") return;
    const t = window.setTimeout(() => setPhase("ok"), 900);
    return () => clearTimeout(t);
  }, [force]);

  const cleared = force === "reqs.handled" || force === "reqs.empty";
  const paused = force === "reqs.paused";
  const failed = force === "reqs.error" && phase === "ok";
  // Lower match follows the referrer's own rule: fewer years than they asked for, or a resume
  // too thin to judge
  const isLower = (r: Req) => !!r.thin || Number(r.match.match(/(\d+) yrs?$/)?.[1] ?? 99) < rules.minYears;
  const outstanding = cleared ? [] : REQUESTS.filter((r) => !isLower(r) && !handled[r.id]);
  const lower = cleared ? [] : REQUESTS.filter((r) => isLower(r) && !handled[r.id]);
  const allHandled = phase === "ok" && outstanding.length === 0 && lower.length === 0;

  return (
    <Screen largeTitle="Referral requests" right={<BellButton unread={unread} />}>
      {/* Figma's Card Section on this screen has a gap of 8, not 24: the job line, the request
          list and the suggested block sit close together. */}
      <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="briefcase.fill" size={16} color="tone" />
          <span className="t-h-xs" style={{ flex: 1 }}>
            Interaction Designer · Flipkart
          </span>
          <Tag>Job ID {jobId || "184223"}</Tag>
        </div>

        {paused && (
          // Figma: the orange note, then its own line under it, then the list 8 below
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Note style="buffer" icon="info.circle.fill">
              This post is paused
            </Note>
            <p className="t-label muted">Requests that already came in are still here.</p>
          </div>
        )}
        {/* Figma "Fit checked again": a plain note over the list */}
        {force === "reqs.fit" && phase === "ok" && <Note>You changed this job. Fit was checked again.</Note>}
        {phase === "loading" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : failed ? (
          // Figma: a red note and one line, 24 under the job row, and no suggested people
          <div style={{ paddingTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
            <Note style="failure" icon="info.circle.fill">
              Couldn’t load requests
            </Note>
            <p className="t-label muted" onClick={() => dispatch({ t: "force", v: null })}>
              Pull down to try again.
            </p>
          </div>
        ) : force === "reqs.empty" ? (
          // Figma's empty screen is not the generic Empty block: it is the line, the referrer's
          // link in a 44-tall box, and a Copy link button — and it shows no suggested people.
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <p className="t-label muted">
              No referral requests yet. Share your link when someone messages you about this job.
            </p>
            <Section label="Your link" icon="link">
              <div
                style={{
                  background: "var(--sd-n0)",
                  borderRadius: "var(--sd-r-md)",
                  outline: "var(--sd-edge)", outlineOffset: -1,
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span className="t-label" style={{ flex: 1 }}>sidedoor.app/r/nithin-agarwal</span>
                <Icon name="doc.on.doc.fill" size={20} color="tone" />
              </div>
            </Section>
            <Actions>
              <Note>Paste it in the LinkedIn or WhatsApp chat</Note>
              <Button onClick={() => nav.openSheet("shareLink")}>Copy link</Button>
            </Actions>
          </div>
        ) : allHandled ? (
          // Figma "All handled": the line sits under the job row, then the link box and Copy link
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <p className="t-label muted">You’re through every request for this job. Share your link to get more.</p>
            <Section label="Your link" icon="link">
              <div
                style={{
                  background: "var(--sd-n0)",
                  borderRadius: "var(--sd-r-md)",
                  outline: "var(--sd-edge)", outlineOffset: -1,
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span className="t-label" style={{ flex: 1 }}>sidedoor.app/r/nithin-agarwal</span>
                <Icon name="doc.on.doc.fill" size={20} color="tone" />
              </div>
            </Section>
            <Actions>
              <Note>Paste it in the LinkedIn or WhatsApp chat</Note>
              <Button onClick={() => nav.openSheet("shareLink")}>Copy link</Button>
            </Actions>
          </div>
        ) : (
          // Figma's Request List is one 16-gap column: the cards and the "Lower match" row are
          // siblings inside it, which is what puts that row at y618 and ends the list at 650.
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {outstanding.map((r) => (
              <RequestCard key={r.id} r={r} onClick={() => nav.push("referralRequest", { id: r.id })} />
            ))}
            {lower.length > 0 && (
              <>
                {/* The row runs the full width with 4 of padding top and bottom, a Medium 14/20
                    link and a 24 chevron pushed to the right edge. */}
                <button
                  onClick={() => setOpen(!open)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, width: "100%", padding: "4px 0" }}
                >
                  <span className="t-label link">Lower match ({lower.length})</span>
                  <Icon
                    name="chevron.down"
                    size={24}
                    style={{ color: "var(--sd-icon-2)", transform: open ? "rotate(180deg)" : "none", transition: "transform 200ms" }}
                  />
                </button>
                {open &&
                  lower.map((r) => (
                    <RequestCard key={r.id} r={r} onClick={() => nav.push("referralRequest", { id: r.id })} />
                  ))}
              </>
            )}
          </div>
        )}

        {/* Figma's "Suggested For This Job" frame carries 16 of top padding, and the empty
            screen does not show it at all. */}
        {phase === "ok" && !failed && !allHandled && force !== "reqs.empty" && (
          <Section label="Suggested for this job" icon="lightbulb.fill" style={{ paddingTop: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <p className="t-label muted">They match this job and chose to be found.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {SUGGESTED.map((r) => (
                  <RequestCard
                    key={r.id}
                    r={r}
                    end={
                      // one small outlined button in both states, so Invite and Invited match (Devansh, 23 Sep)
                      invited.includes(r.name) ? (
                        <SmallButton done>Invited</SmallButton>
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
    <ListCard
      onClick={onClick}
      lead={<Avatar name={r.name} />}
      title={r.name}
      when={r.when}
      end={end}
      lines={[r.role]}
      chips={
        <>
          <Tag style="primary">{r.match}</Tag>
          {r.common && (
            <span className="sd-tag plain">
              {r.common.logo && (
                <Image src={logoSrc(r.common.logo)} alt="" width={12} height={12} style={{ width: 12, height: "auto" }} unoptimized />
              )}
              {r.common.icon && <Icon name={r.common.icon} size={12} color="tone" />}
              <span>{r.common.text}</span>
            </span>
          )}
        </>
      }
    />
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
  const { handled, removedSkills, jobId, force, dispatch } = useStore();
  const decide = useDecide();
  const r = REQUESTS.find((x) => x.id === id) ?? REQUESTS[0];
  const refer = () => {
    dispatch({ t: "handle", id: r.id, stage: "referred" });
    decide(
      `Referred. ${r.name.split(" ")[0]} is told in 5 seconds.`,
      () => {
        dispatch({ t: "unhandle", id: r.id });
        nav.pop();
      },
      () => dispatch({ t: "tell", stage: "referred" })
    );
  };
  // the two states the switcher jumps straight into
  const state = force === "refer.undo" ? { stage: "referred" as Stage } : handled[r.id];
  const removed = removedSkills;
  // Figma "Skill removed" keeps the row and turns it into an undo, so nothing disappears
  const skills = SKILLS;
  // the tag counts skills only — the experience row is a separate fact, as in V6
  const skillRows = skills.filter((s) => !s.isExperience);
  // a removed skill stops counting, which is what drops the tag to "3 of 7"
  const matched = skillRows.filter((s) => s.ok && !removed.includes(s.name)).length;

  if (state?.stage === "referred") return <AfterRefer id={r.id} />;
  if (state?.stage === "submitted") return <MarkedSubmitted id={r.id} />;
  if (state?.stage === "notmoving")
    return (
      <Screen title="Referral request" back actions={<Button onClick={() => nav.pop()}>Back to referral requests</Button>}>
        <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
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

  if (r.thin)
    return (
      <Screen title="Referral request" back>
        <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
          <PersonHead name={r.name} role={r.role} tag={<Tag>Sent {r.when}</Tag>} />
          {/* Figma's "Not Enough To Judge": the same Window, but with no shared history, no fit
              rows and no projects — just the facts, one line saying why, and the decision. */}
          <div className="sd-card" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
              <Fact icon="mappin.and.ellipse">{r.thin.city}</Fact>
              <Fact icon="calendar">{r.thin.years}</Fact>
              <Fact icon="hourglass">{r.thin.notice}</Fact>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {r.thin.work.map((w) => (
                <Tag key={w}>{w}</Tag>
              ))}
            </div>
            <Section label="How they match" icon="lightbulb.fill" end={<Tag>Not enough to judge</Tag>}>
              <p className="t-body muted">
                Not enough in their resume to judge fit for this job. Read it before you decide.
              </p>
            </Section>
            <Section label="Experience" icon="briefcase.fill">
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {/* Figma uses a grey r8 placeholder tile with a briefcase where a logo would go */}
                <span
                  style={{
                    width: 40, height: 40, flex: "0 0 auto", borderRadius: "var(--sd-r-md)",
                    background: "var(--sd-n100)", display: "grid", placeItems: "center",
                  }}
                >
                  <Icon name="briefcase.fill" size={20} color="tone" />
                </span>
                <span style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0 }}>
                  <span className="t-h-sm">{r.thin.role}</span>
                  <span className="t-label-sm muted">{r.thin.company}</span>
                </span>
                <span className="t-label-sm muted" style={{ flex: "0 0 auto" }}>{r.thin.when}</span>
              </div>
            </Section>
            <Section label="Resume" icon="paperclip">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="t-label" style={{ flex: 1 }}>{r.thin.resume}</span>
                <button className="sd-hit44" aria-label="Open resume" style={{ display: "flex" }} onClick={() => nav.push("resume", { file: r.thin?.resume })}>
                  <Icon name="arrow.up.right.square" size={20} color="tone" />
                </button>
              </div>
            </Section>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Button onClick={refer}>Refer</Button>
              <Button
                type="secondary"
                onClick={() => nav.openSheet("notMoving", { id: r.id, name: r.name, role: r.role, match: r.match })}
              >
                Not moving forward
              </Button>
            </div>
          </div>
        </div>
      </Screen>
    );

  return (
    <Screen title="Referral request" back>
      <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
        <PersonHead name={r.name} role={r.role} tag={<Tag>Sent {r.when.toLowerCase()}</Tag>} />

        {/* Figma holds this whole screen in one white "Window" card, padded 16 with a 24 gap —
            every block below is a plain frame inside it, not a card of its own, and the two
            decision buttons are the card's last block rather than a bar pinned to the screen. */}
        <div className="sd-card" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {r.common && (
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                {r.common.logo && (
                  <Image src={logoSrc(r.common.logo)} alt="" width={16} height={16} style={{ width: 16, height: 16 }} unoptimized />
                )}
                {r.common.icon && <Icon name={r.common.icon} size={16} color="tone" />}
                <span className="t-label muted">{r.common.text}</span>
              </div>
              {/* Figma keeps an empty 16 "Icon space" in front of this line so it lines up
                  under the words above, not under the mark. */}
              <p className="t-label-sm muted" style={{ paddingLeft: 20 }}>
                You 2021–22 · {r.name.split(" ")[0]} 2022–23
              </p>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <Fact icon="mappin.and.ellipse">Bengaluru, KA</Fact>
            <Fact icon="calendar">3+ years</Fact>
            <Fact icon="hourglass">30 days</Fact>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Tag>Full time</Tag>
            <Tag>Remote or hybrid</Tag>
          </div>

        {/* Figma "Profile updated": a plain note above the match block */}
        {force === "req.updated" && <Note>Profile updated since the 12 Sep fit check</Note>}

        <Section
          label="How they match"
          icon="lightbulb.fill"
          end={<Tag style="primary">{matched} of {skillRows.length} skills · 3 yrs</Tag>}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {/* Figma: the fit rows sit 20 apart, each 38 tall, and the 44pt target overlaps the
                row rather than stretching it. */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {skills.map((s) =>
                s.ok && !s.isExperience ? (
                  <button
                    key={s.name}
                    className="sd-hit44"
                    onClick={() => dispatch({ t: "removeSkill", v: s.name })}
                    aria-label={`${s.name} isn’t really there`}
                    style={{ display: "block", width: "100%", textAlign: "left" }}
                  >
                    <MatchRow ok={!removed.includes(s.name)} source={removed.includes(s.name) ? "You removed this. Tap to undo" : s.source}>
                      {s.name}
                    </MatchRow>
                  </button>
                ) : (
                  <MatchRow key={s.name} ok={s.ok} source={s.source}>
                    {s.name}
                  </MatchRow>
                )
              )}
            </div>
            {/* Figma draws this hint plain at 12/16, not as a filled chip. */}
            <Note>{removed.length > 0 ? "Count updated for you only" : "Tap a skill that isn’t really there"}</Note>
          </div>
        </Section>

        <Section label="Experience" icon="briefcase.fill">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <CompanyRow logo="blinkit" role="Product Designer" company="Blinkit" when="Sep 2023–Present" />
            <CompanyRow logo="makemytrip" role="Associate Product Designer" company="MakeMyTrip" when="Jun 2022–Aug 2023" />
          </div>
        </Section>

        <Section label="Projects" icon="folder.fill">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Projects />
          </div>
        </Section>

        <Section label="Resume and links" icon="paperclip">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="t-label" style={{ flex: 1 }}>
                Abhinav_Saxena_Resume.pdf
              </span>
              <button className="sd-hit44" aria-label="Open resume" style={{ display: "flex" }} onClick={() => nav.push("resume", { file: "Abhinav_Saxena_Resume.pdf" })}>
                <Icon name="arrow.up.right.square" size={20} color="tone" />
              </button>
            </div>
            {/* Figma's LinkBlock is three 20 marks, 8 apart. */}
            <div style={{ display: "flex", gap: 8 }}>
              {["linkedin", "dribbble", "behance"].map((l) => (
                <Image key={l} src={`/images/sidedoor/${l}.svg`} alt={l} width={20} height={20} style={{ width: 20, height: 20 }} unoptimized />
              ))}
            </div>
          </div>
        </Section>

        <Section label="Their note" icon="quote.bubble.fill">
          <p className="t-body muted">I led the merchant app redesign at Blinkit. Happy to share more.</p>
        </Section>

          {/* Figma's Decision frame is the Window's last block: two full-width buttons 12 apart. */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Button onClick={refer}>Refer</Button>
            <Button
              type="secondary"
              onClick={() => nav.openSheet("notMoving", { id: r.id, name: r.name, role: r.role, match: r.match })}
            >
              Not moving forward
            </Button>
          </div>
        </div>
      </div>
    </Screen>
  );
}

function PersonHead({ name, role, tag }: { name: string; role: string; tag: React.ReactNode }) {
  // Figma's Person row is 50 tall: a 44 avatar centred, a Semi Bold 16/24 name, and the tag
  // pushed to the right edge of the row rather than packed against the role.
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar name={name} size={44} />
      <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 }}>
        <span className="t-h-sm sd-1line">{name}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="sd-person-sub sd-2line" style={{ flex: 1 }}>{role}</span>
          {tag}
        </span>
      </div>
    </div>
  );
}

function Fact({ icon, children }: { icon: Parameters<typeof Icon>[0]["name"]; children: React.ReactNode }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <Icon name={icon} size={18} color="tone" />
      {/* Figma's Quick Facts labels are Medium 14/20 in --sd-text-2. */}
      <span className="t-label muted">{children}</span>
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
    { name: "Notice period", value: showDays(d.notice || "30") },
    { name: "Career gaps", value: showYears(d.gaps || "0") },
    { name: "Date of birth", value: d.dob || "12 Mar 1999" },
    { name: "Preferred locations", value: d.locations || "Bengaluru, Remote" },
    { name: "Resume", value: "Abhinav_Saxena_Resume.pdf", download: true },
  ];
}

function AfterRefer({ id }: { id: string }) {
  const nav = useNav();
  const { jobId, details, force, dispatch } = useStore();
  const r = REQUESTS.find((x) => x.id === id) ?? REQUESTS[0];
  const [copied, setCopied] = useState<string[]>([]);
  const decide = useDecide();
  // Figma "Undo": the app's undo toast does this after a real Refer; the switcher's frozen
  // Undo state draws the same toast here so it stays on screen
  const undo = force === "refer.undo";
  const fields = portalFields(details);
  const first = r.name.split(" ")[0];

  return (
    <Screen
      title="Referral request"
      back
      actions={
        <Actions>
          <p className="t-label-sm muted">Tap once it’s in the portal. {first} will be told.</p>
          <Button
            onClick={() => {
              dispatch({ t: "handle", id: r.id, stage: "submitted" });
              decide(
                `Marked as submitted. ${first} is told in 5 seconds.`,
                () => dispatch({ t: "handle", id: r.id, stage: "referred" }),
                () => dispatch({ t: "tell", stage: "submitted" })
              );
            }}
          >
            Mark as submitted
          </Button>
          <Button type="secondary" onClick={() => nav.push("chat", { who: r.name })}>
            Message {first}
          </Button>
        </Actions>
      }
    >
      {undo && (
        <Toast action={<button className="t-label link sd-hit44" onClick={() => { dispatch({ t: "unhandle", id: r.id }); nav.pop(); }}>Undo</button>}>
          Referred. {first} is told in 5 seconds.
        </Toast>
      )}
      <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
        <PersonHead name={r.name} role={r.role} tag={<Tag style="success">Referred</Tag>} />

        <Section label="Add to Flipkart’s portal" icon="arrow.up.right.square" end={<Tag>Job ID {jobId || "184223"}</Tag>}>
          {/* Figma's Portal Details frame: the box, then the hint 8 under it and outside the box. */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Box>
              {fields.map((f) => (
                // Figma stacks the name above the value with 2 between them and puts the copy
                // mark at the right edge of the row. The code laid them out as two columns.
                <div key={f.name} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                    <span className="t-label-sm muted">{f.name}</span>
                    <span className="t-label">{f.value}</span>
                  </span>
                  <button
                    className="sd-hit44"
                    aria-label={f.download ? `Download ${f.name}` : `Copy ${f.name}`}
                    style={{ display: "flex", flex: "0 0 auto" }}
                    onClick={() => {
                      setCopied((c) => (c.includes(f.name) ? c : [...c, f.name]));
                      dispatch({ t: "toast", v: f.download ? "Resume downloaded" : `${f.name} copied` });
                      window.setTimeout(() => dispatch({ t: "toast", v: null }), 1400);
                    }}
                  >
                    <Icon
                      name={copied.includes(f.name) ? "checkmark" : f.download ? "square.and.arrow.down" : "doc.on.doc.fill"}
                      size={18}
                      style={{ color: copied.includes(f.name) ? "var(--sd-text-success)" : "var(--sd-icon-accent)" }}
                    />
                  </button>
                </div>
              ))}
            </Box>
            <Note>Copy each detail in the order the portal asks</Note>
          </div>
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
      <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
        <PersonHead name={r.name} role={r.role} tag={<Tag style="success">Submitted</Tag>} />
        {/* Figma's "Done" frame: a white r12 card padded 24, its 40 mark, heading and line 12
            apart and centred — not loose text on the grey page with a 44 circle. */}
        <div
          style={{
            background: "var(--sd-n0)",
            borderRadius: "var(--sd-r-lg)",
            outline: "var(--sd-edge)", outlineOffset: -1,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Icon name="checkmark.circle.fill" size={40} style={{ color: "var(--sd-link)" }} />
          <h2 className="t-h-sm">Marked as submitted</h2>
          <p className="t-label muted">{first} will see it. Once a week we’ll ask if you’ve seen it move.</p>
        </div>
      </div>
    </Screen>
  );
}

/* ── Your referrals ─────────────────────────────────────────────────────── */
type Referral = { name: string; role: string; stage: Stage; when: string; days?: number };

const REFERRALS: Referral[] = [
  { name: "Aviral Dixit", role: "UX Designer, Razorpay", stage: "submitted", when: "12 days", days: 12 },
  { name: "Aarush Gupta", role: "Product Designer, Swiggy", stage: "submitted", when: "9 days", days: 9 },
  { name: "Arpita Singh", role: "Product Designer, Myntra", stage: "interviews", when: "Tuesday" },
  { name: "Ayesha Sharma", role: "UX Designer, Groww", stage: "onhold", when: "Friday" },
  { name: "Himani Kaushik", role: "Product Designer, Zepto", stage: "selected", when: "Yesterday" },
  { name: "Shreya Verma", role: "UX Designer, CRED", stage: "notselected", when: "12 Sep" },
  { name: "Amit Patel", role: "UI Designer, PhonePe", stage: "notselected", when: "5 Sep" },
];

export function YourReferrals() {
  const nav = useNav();
  const { handled, unread, force, pending } = useStore();
  // who was just moved on; Figma "Updated" shows its note once the 5 seconds to undo are over
  const [lastMoved, setLastMoved] = useState<string | null>(null);
  // Figma "Updated": Aviral has just been moved on, so he leaves the waiting list
  const { force: f0 } = useStore();
  const [moved, setMoved] = useState<Record<string, Stage>>(
    f0 === "referrals.updated" ? { "Aviral Dixit": "interviews" } : {}
  );
  const abhinav = handled.abhinav;
  const none = force === "referrals.empty";
  const loadingRefs = force === "referrals.loading";
  const stageOf = (r: Referral) => moved[r.name] ?? r.stage;
  const waiting = none ? [] : REFERRALS.filter((r) => r.days && stageOf(r) === "submitted");
  const all: Referral[] = none
    ? []
    : [
    // Figma draws this screen after Nithin has referred Abhinav and marked it submitted
    ...(abhinav?.stage === "submitted" || force === "referrals.abhinav"
      ? [{ name: "Abhinav Saxena", role: "Product Designer, Blinkit", stage: "submitted" as Stage, when: "Today" }]
      : []),
    ...REFERRALS.filter((r) => !r.days),
      ];

  // Same list-card rhythm as jobs and requests: name and time, role, then the stage chip with
  // Update at the far end of the chip row.
  const bar = (r: Referral, withUpdate: boolean) => (
    <ListCard
      key={r.name}
      lead={<Avatar name={r.name} />}
      title={r.name}
      when={r.when}
      lines={[r.role]}
      chips={
        <>
          <Tag style={stageTag(stageOf(r))}>{STAGE_LABEL[stageOf(r)]}</Tag>
          {withUpdate && (
            <span className="sd-lc-end">
              <SmallButton
                onClick={() =>
                  nav.openSheet("seenItMove", {
                    name: r.name,
                    role: r.role,
                    since: r.days ? `Submitted ${r.days} days ago` : `Submitted ${r.when}`,
                    onPick: (s: Stage) => {
                      setMoved((m) => ({ ...m, [r.name]: s }));
                      setLastMoved(r.name);
                    },
                    onUndo: () => {
                      setLastMoved(null);
                      setMoved((m) => {
                        const rest = { ...m };
                        delete rest[r.name];
                        return rest;
                      });
                    },
                  })
                }
              >
                Update
              </SmallButton>
            </span>
          )}
        </>
      }
    />
  );

  return (
    <Screen largeTitle="Your referrals" right={<BellButton unread={unread} />}>
      <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Figma's empty and loading screens carry nothing else: no section labels */}
        {loadingRefs ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : none ? (
          <p className="t-label muted">No referrals yet. When you refer someone, you’ll pass on their stage here.</p>
        ) : (<>
        {!none && (
        <Section label="What your referrals reached" icon="flag.fill">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Tag style="success">1 selected</Tag>
              <Tag style="success">1 in interviews</Tag>
              <Tag style="buffer">1 on hold</Tag>
            </div>
            {/* Figma "Thank You": padded 12/16, 12 gap, everything centred; the quote is 12/16 */}
            <Card style={{ padding: "12px 16px" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <Avatar name="Himani Kaushik" size={36} />
                <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                  <span className="t-h-xs">Himani thanked you</span>
                  <span className="t-label-sm muted">“You made the referral easy. I start next month!”</span>
                </span>
                <Icon name="quote.bubble.fill" size={18} color="tone" />
              </div>
            </Card>
          </div>
        </Section>
        )}

        {/* Figma "Updated": the green note sits between the record block and the waiting list */}
        {(force === "referrals.updated" || (lastMoved && !pending)) && (
          <Note style="success" icon="info.circle.fill">
            Updated. {(lastMoved ?? "Aviral Dixit").split(" ")[0]} can see it.
          </Note>
        )}
        {waiting.length > 0 && (
          <Section label={`Waiting on an update (${waiting.length})`} icon="clock.fill">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <p className="t-label-sm muted">Submitted over a week ago. Seen them move?</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>{waiting.map((r) => bar(r, true))}</div>
            </div>
          </Section>
        )}

        <Section label="All referrals · Interaction Designer" icon="briefcase.fill">
          {all.length === 0 ? (
            <p className="t-label muted">No referrals yet. When you refer someone, you’ll pass on their stage here.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Figma: no Update on an ending, nor on one submitted today (nothing to report yet) */}
              {all.map((r) => bar(r, !["selected", "notselected", "submitted"].includes(stageOf(r))))}
            </div>
          )}
        </Section>
        </>)}
      </div>
    </Screen>
  );
}

/* ── Manage your posts ──────────────────────────────────────────────────── */
type Post = { title: string; jobId: string; state: "Live" | "Paused" | "Draft"; news?: string; activity: string };

const POSTS: Post[] = [
  { title: "Interaction Designer", jobId: "184223", state: "Live", news: "5 new", activity: " · 8 referred" },
  { title: "Product Manager", jobId: "188410", state: "Live", activity: "No new requests · 2 referred" },
  { title: "Software Engineer-I", jobId: "190552", state: "Paused", news: "1 still open", activity: " · 3 referred" },
  { title: "Product Designer-II", jobId: "", state: "Draft", activity: "" },
];

export function ManagePosts() {
  const nav = useNav();
  const { unread, force } = useStore();
  const [paused, setPaused] = useState<string[]>(["Software Engineer-I"]);
  const none = force === "posts.empty";
  return (
    <Screen
      largeTitle="Manage your posts"
      right={
        <>
          <button className="sd-barbtn" onClick={() => nav.push("addJob")} aria-label="Add a job">
            <Icon name="plus" size={24} />
          </button>
          <BellButton unread={unread} />
        </>
      }
    >
      <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
        {none ? (
          // Figma: one line and a blue button, no illustrated block
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p className="t-label muted">No posts yet. Post the job you can refer for, then share its link.</p>
            <Button onClick={() => nav.push("addJob")}>Post a job</Button>
          </div>
        ) : (
        <Section label="Flipkart · 4 posts" icon="briefcase.fill">
          {/* Figma: post cards 8 apart */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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
                  {/* list-card rhythm: 14/20 Regular detail line tight under the title */}
                  <p className="sd-lc-line">
                    {state === "Draft" ? "Draft · Add the job ID to post" : `${state} · Job ID ${p.jobId}`}
                  </p>
                  <div style={{ height: 12 }} />
                  {/* Figma PostCard activity row: Inter Medium 14/20, 20 tall */}
                  {/* Figma: what is new reads blue, the rest #6b7280; a quiet post is all #636a75.
                      A draft has no activity, just "Finish" at the left. */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {p.state !== "Draft" && (
                      <span className="t-label" style={{ flex: 1, color: p.news ? "var(--sd-icon-2)" : "var(--sd-text-2)" }}>
                        {p.news && <span style={{ color: "var(--sd-link)" }}>{p.news}</span>}
                        {p.activity}
                      </span>
                    )}
                    <TextButton onClick={() => nav.push(p.state === "Draft" ? "checkPost" : "editPost", { title: p.title })}>
                      {p.state === "Draft" ? "Finish" : "Edit"}
                    </TextButton>
                  </div>
                </Card>
              );
            })}
          </div>
        </Section>
        )}
      </div>
    </Screen>
  );
}

export function EditPost({ title }: { title?: string }) {
  const nav = useNav();
  const { jobId, tips, rules, dispatch } = useStore();
  // its own copy, so clearing the box leaves it empty instead of snapping back to 184223
  const [editId, setEditId] = useState(jobId || "184223");
  // Figma "Edit your job post" is "Check your job post" with the post already live: the same
  // five blocks in the same order, a different intro, and Save changes / Pause post.
  return (
    <Screen
      title="Edit your job post"
      back
      actions={
        <Actions>
          <Button disabled={!allValid([["jobId", editId, true], ["tips", tips]])} onClick={() => nav.pop()}>
            Save changes
          </Button>
          <Button type="secondary" onClick={() => nav.pop()}>
            Pause post
          </Button>
        </Actions>
      }
    >
      <div style={{ paddingTop: 32, display: "flex", flexDirection: "column", gap: 24 }}>
        <p className="t-label muted">Saving checks the match again for current requests.</p>

        <Section label="Job ID" icon="doc.on.doc.fill" required>
          <Field
            icon="doc.on.doc.fill"
            value={editId}
            onChange={(v) => {
              setEditId(v);
              dispatch({ t: "jobId", v });
            }}
            kind="jobId"
            required
          />
        </Section>

        <JdDetails title={title ?? "Interaction Designer"} />

        <RulesSection />

        <Field
          label="Tips for candidates (optional)"
          icon="lightbulb.fill"
          value={tips}
          onChange={(v) => dispatch({ t: "tips", v })}
          placeholder="e.g. Link a portfolio with end-to-end case studies. Shown on the job."
          multiline
        />

        <FileBox label="Job description" name="Flipkart_IxDesigner_JD.docx" what="file" />
      </div>
    </Screen>
  );
}

export { Note, Box };
