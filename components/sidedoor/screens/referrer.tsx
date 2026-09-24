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
  WelcomeCard,
} from "../ui";
import { BellButton } from "./candidate";
import { CompanyRow, FileBox, JdDetails, Projects, RulesSection } from "./onboarding";
import { CANDIDATES, DEMO, POST_SKILLS, SUGGESTED, candidateById, firstName, matchLine, roleLine, type Candidate } from "../data";

type Req = Candidate;

/* ── Referral requests ──────────────────────────────────────────────────── */
export function ReferralRequests() {
  const nav = useNav();
  const { handled, invited, unread, jobId, force, rules, live, you, welcome, awaiting, dispatch } = useStore();
  const [phase, setPhase] = useState<"loading" | "ok">("loading");
  const [open, setOpen] = useState(false);
  // a request the candidate withdrew leaves the referrer's list, and you never see a request from yourself
  const REQUESTS = CANDIDATES.filter((c) => !(c.id === "abhinav" && live.stage === "withdrawn") && c.name !== you.name);
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
  const isLower = (r: Req) => !!r.thin || r.years < rules.minYears;
  const outstanding = cleared ? [] : REQUESTS.filter((r) => !isLower(r) && !handled[r.id]);
  const lower = cleared ? [] : REQUESTS.filter((r) => isLower(r) && !handled[r.id]);
  const allHandled = phase === "ok" && outstanding.length === 0 && lower.length === 0;
  // A job posted a moment ago has no requests yet (Devansh, 24 Sep): the list starts empty with
  // your link, and the requests come in 5 seconds after you land here.
  const [arrived, setArrived] = useState(false);
  useEffect(() => {
    if (!awaiting || phase !== "ok") return;
    const t = window.setTimeout(() => {
      dispatch({ t: "arrive" });
      setArrived(true);
      dispatch({ t: "toast", v: `${outstanding.length + lower.length} referral requests came in` });
      window.setTimeout(() => dispatch({ t: "toast", v: null }), 2600);
    }, 4100); // plus the 0.9 s load: 5 s from landing
    return () => clearTimeout(t);
  }, [awaiting, phase, dispatch, outstanding.length, lower.length]);
  const empty = force === "reqs.empty" || (awaiting && phase === "ok");

  return (
    <Screen largeTitle="Referral requests" right={<BellButton unread={unread} />}>
      {/* Figma's Card Section on this screen has a gap of 8, not 24: the job line, the request
          list and the suggested block sit close together. */}
      <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="briefcase.fill" size={16} color="tone" />
          <span className="t-h-xs" style={{ flex: 1 }}>
            {you.post.title} · {you.company}
          </span>
          <Tag>Job ID {jobId || you.post.jobId}</Tag>
        </div>

        {welcome && phase === "ok" && (
          <WelcomeCard
            title={`Your job is live, ${firstName(you.name)}`}
            body={`Requests for ${you.post.title} land here, best match first. Your link is in Profile any time.`}
            onClose={() => dispatch({ t: "welcome", v: false })}
          />
        )}

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
          <Empty
            error
            title="Couldn’t load requests"
            body="Check your connection and try again."
            action={<Button type="secondary" onClick={() => dispatch({ t: "force", v: null })}>Try again</Button>}
          />
        ) : empty ? (
          // Figma's empty screen is not the generic Empty block: it is the line, the referrer's
          // link in a 44-tall box, and a Copy link button — and it shows no suggested people.
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <Empty icon="tray.fill" title="No requests yet" body="Share your link when someone messages you about this job." />
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
                <span className="t-label" style={{ flex: 1 }}>sidedoor.app/r/{you.slug}</span>
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
            <Empty icon="checkmark.circle.fill" title="You’re through every request" body="Share your link to get more for this job." />
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
                <span className="t-label" style={{ flex: 1 }}>sidedoor.app/r/{you.slug}</span>
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
          <div className={arrived ? "sd-arrive" : undefined} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {outstanding.map((r) => (
              <RequestCard key={r.id} r={r} onClick={() => { dispatch({ t: "welcome", v: false }); nav.push("referralRequest", { id: r.id }); }} />
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
                    <RequestCard key={r.id} r={r} onClick={() => { dispatch({ t: "welcome", v: false }); nav.push("referralRequest", { id: r.id }); }} />
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
                        <SmallButton onClick={() => nav.openSheet("invite", { name: r.name })}>Invite</SmallButton>
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
      lines={[roleLine(r)]}
      chips={
        <>
          <Tag style={r.thin ? "neutral" : "primary"}>{matchLine(r)}</Tag>
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
/** The post's skills against what this person's resume shows: matches first, then their years
 *  against the referrer's own rule, then related skills (shown near, not counted), then what's missing. */
function fitRows(c: Candidate, minYears: number) {
  const near = c.near ?? {};
  const ok = POST_SKILLS.filter((k) => c.has[k]).map((k) => ({ name: k, ok: true, source: c.has[k] }));
  const rel = POST_SKILLS.filter((k) => !c.has[k] && near[k]).map((k) => ({ name: k, ok: "near", source: near[k] }));
  const no = POST_SKILLS.filter((k) => !c.has[k] && !near[k]).map((k) => ({ name: k, ok: false, source: "Not in their resume" }));
  const exp = { name: `${c.years} ${c.years === 1 ? "yr" : "yrs"} experience`, ok: c.years >= minYears, source: `You need ${minYears}+`, isExperience: true };
  return [...ok, exp, ...rel, ...no] as { name: string; ok: boolean | "near"; source: string; isExperience?: boolean }[];
}

const resumeOf = (name: string) => `${name.replace(/ /g, "_")}_Resume.pdf`;
const yearsFact = (n: number) => (n === 1 ? "1 year" : `${n}+ years`);

export function ReferralRequest({ id }: { id: string }) {
  const nav = useNav();
  const { handled, removedSkills, profile, note, rules, force, dispatch } = useStore();
  const decide = useDecide();
  const c = candidateById(id);
  // a request from you would carry what you typed and edited (you never see your own, but the rule holds)
  const r: Candidate = c.name === profile.name ? { ...c, name: profile.name, jobs: profile.jobs, projects: profile.projects, note: note || c.note } : c;
  const first = firstName(r.name);
  const refer = () => {
    dispatch({ t: "handle", id: r.id, stage: "referred" });
    decide(
      `Referred. ${first} is told in 5 seconds.`,
      () => {
        dispatch({ t: "unhandle", id: r.id });
        nav.pop();
      },
      () => {
        if (r.id === "abhinav") dispatch({ t: "tell", stage: "referred" });
      }
    );
  };
  const notMoving = () => nav.openSheet("notMoving", { id: r.id, name: r.name, role: roleLine(r), match: matchLine(r) });
  // the two states the switcher jumps straight into
  const state = force === "refer.undo" ? { stage: "referred" as Stage } : handled[r.id];
  const key = (skill: string) => `${r.id}|${skill}`;
  const removed = (skill: string) => removedSkills.includes(key(skill));
  // Figma "Skill removed" keeps the row and turns it into an undo, so nothing disappears
  const skills = fitRows(r, rules.minYears);
  // the tag counts skills only — the experience row is a separate fact, as in V6
  const skillRows = skills.filter((s) => !s.isExperience);
  // a removed skill stops counting, which is what drops the tag to "3 of 7"
  const matched = skillRows.filter((s) => s.ok === true && !removed(s.name)).length;
  const anyRemoved = skillRows.some((s) => removed(s.name));
  const resume = resumeOf(r.name);

  if (state?.stage === "referred") return <AfterRefer id={r.id} />;
  if (state?.stage && state.stage !== "notmoving") return <MarkedSubmitted id={r.id} />;
  if (state?.stage === "notmoving")
    return (
      <Screen title="Referral request" back actions={<Button onClick={() => nav.pop()}>Back to referral requests</Button>}>
        <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
          <PersonHead name={r.name} role={roleLine(r)} tag={<Tag>Not moving forward</Tag>} />
          <Card>
            <p className="t-h-xs">{first} has been told</p>
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
          <PersonHead name={r.name} role={roleLine(r)} when={`Sent ${r.when.toLowerCase()}`} />
          {/* Figma's "Not Enough To Judge": the same Window, but with no shared history, no fit
              rows and no projects — just the facts, one line saying why, and the decision. */}
          <div className="sd-card" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
              <Fact icon="mappin.and.ellipse">{r.city}</Fact>
              <Fact icon="calendar">{r.years} years</Fact>
              <Fact icon="hourglass">{r.notice}</Fact>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {r.work.map((w) => (
                <Tag key={w}>{w}</Tag>
              ))}
            </div>
            <Section label="How they match" icon="lightbulb.fill" end={<Tag>Not enough to judge</Tag>}>
              <p className="t-body muted">
                Not enough in their resume to judge fit for this job. Read it before you decide.
              </p>
            </Section>
            <Section label="Experience" icon="briefcase.fill">
              {r.jobs.map((j) => (
                <CompanyRow key={j.role + j.company} logo={j.logo} role={j.role} company={j.company} when={j.when} />
              ))}
            </Section>
            <Section label="Resume" icon="paperclip">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="t-label" style={{ flex: 1 }}>{resume}</span>
                <button className="sd-hit44" aria-label="Open resume" style={{ display: "flex" }} onClick={() => nav.push("resume", { file: resume, id: r.id })}>
                  <Icon name="arrow.up.right.square" size={20} color="tone" />
                </button>
              </div>
            </Section>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Button onClick={refer}>Refer</Button>
              <Button type="secondary" onClick={notMoving}>
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
        <PersonHead name={r.name} role={roleLine(r)} when={`Sent ${r.when.toLowerCase()}`} />

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
              {r.common.years && (
                <p className="t-label-sm muted" style={{ paddingLeft: 20 }}>
                  {r.common.years}
                </p>
              )}
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <Fact icon="mappin.and.ellipse">{r.city}</Fact>
            <Fact icon="calendar">{yearsFact(r.years)}</Fact>
            <Fact icon="hourglass">{r.notice}</Fact>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {r.work.map((w) => (
              <Tag key={w}>{w}</Tag>
            ))}
          </div>

        {/* Figma "Profile updated": a plain note above the match block */}
        {force === "req.updated" && <Note>Profile updated since the 12 Sep fit check</Note>}

        <Section
          label="How they match"
          icon="lightbulb.fill"
          end={<Tag style="primary">{matched} of {skillRows.length} skills · {r.years} {r.years === 1 ? "yr" : "yrs"}</Tag>}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {/* Figma: the fit rows sit 20 apart, each 38 tall, and the 44pt target overlaps the
                row rather than stretching it. */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {skills.map((s) =>
                s.ok === true && !s.isExperience ? (
                  <button
                    key={s.name}
                    className="sd-hit44"
                    onClick={() => dispatch({ t: "removeSkill", v: key(s.name) })}
                    aria-label={`${s.name} isn’t really there`}
                    style={{ display: "block", width: "100%", textAlign: "left" }}
                  >
                    <MatchRow ok={!removed(s.name)} source={removed(s.name) ? "You removed this. Tap to undo" : s.source}>
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
            <Note>{anyRemoved ? "Count updated for you only" : "Tap a skill that isn’t really there"}</Note>
          </div>
        </Section>

        <Section label="Experience" icon="briefcase.fill">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {r.jobs.map((j, i) => (
              <CompanyRow key={i} logo={j.logo} role={j.role} company={j.company} when={j.when} />
            ))}
          </div>
        </Section>

        {r.projects.length > 0 && (
          <Section label="Projects" icon="folder.fill">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Projects list={r.projects} />
            </div>
          </Section>
        )}

        <Section label="Resume and links" icon="paperclip">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="t-label" style={{ flex: 1 }}>
                {resume}
              </span>
              <button className="sd-hit44" aria-label="Open resume" style={{ display: "flex" }} onClick={() => nav.push("resume", { file: resume, id: r.id })}>
                <Icon name="arrow.up.right.square" size={20} color="tone" />
              </button>
            </div>
            {/* Figma's LinkBlock is three 20 marks, 8 apart. Each opens that profile. */}
            <div style={{ display: "flex", gap: 8 }}>
              {[
                ["linkedin", "LinkedIn"],
                ["dribbble", "Dribbble"],
                ["behance", "Behance"],
              ].map(([l, label]) => (
                <button
                  key={l}
                  className="sd-hit44"
                  aria-label={`Open ${first}’s ${label}`}
                  style={{ display: "flex" }}
                  onClick={() => nav.push("profileLink", { site: label, name: r.name })}
                >
                  <Image src={`/images/sidedoor/${l}.svg`} alt="" width={20} height={20} style={{ width: 20, height: 20 }} unoptimized />
                </button>
              ))}
            </div>
          </div>
        </Section>

        {r.note && (
          <Section label="Their note" icon="quote.bubble.fill">
            <p className="t-body muted">{r.note}</p>
          </Section>
        )}

          {/* Figma's Decision frame is the Window's last block: two full-width buttons 12 apart. */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Button onClick={refer}>Refer</Button>
            <Button type="secondary" onClick={notMoving}>
              Not moving forward
            </Button>
          </div>
        </div>
      </div>
    </Screen>
  );
}

function PersonHead({ name, role, when, tag }: { name: string; role: string; when?: string; tag?: React.ReactNode }) {
  // Figma's Person row is 50 tall: a 44 avatar centred, a Semi Bold 16/24 name, the role under it.
  // A time sits on the name line in plain grey, as on the list cards; a status (Referred, Not moving
  // forward) stays a tag at the end of the role line.
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar name={name} size={44} />
      <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="t-h-sm sd-1line" style={{ flex: 1 }}>{name}</span>
          {when && <span className="sd-lc-when">{when}</span>}
        </span>
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
 * For Abhinav these are the same four answers he typed on "Check your request" — that is the
 * point of asking once. The rest come from the resume.
 */
function portalFields(c: Candidate, d: { dob: string; gaps: string; locations: string; notice: string }, p: { name: string; email: string; phone: string; city: string }) {
  // only your own request carries what you typed; everyone else's comes from their resume
  const me = c.name === p.name;
  const phone = me ? p.phone.replace(/^(\+91 ?\d{2})\d{3} ?\d{3}(\d{2})$/, "$1XXX XXX$2") : c.phone;
  return [
    { name: "Full name", value: me ? p.name : c.name },
    { name: "Email", value: me ? p.email : c.email },
    { name: "Phone", value: phone },
    { name: "Current city", value: (me ? p.city : c.city).replace(/, [A-Z]{2}$/, "") },
    { name: "Total experience", value: `${c.years} ${c.years === 1 ? "yr" : "yrs"}` },
    { name: "Relevant experience", value: `${c.years} ${c.years === 1 ? "yr" : "yrs"}` },
    { name: "Notice period", value: me ? showDays(d.notice || "30") : c.notice },
    { name: "Career gaps", value: showYears(me ? d.gaps || "0" : c.gaps) },
    { name: "Date of birth", value: me ? d.dob || c.dob : c.dob },
    { name: "Preferred locations", value: me ? d.locations || c.locations : c.locations },
    { name: "Resume", value: resumeOf(me ? p.name : c.name), download: true },
  ];
}

function AfterRefer({ id }: { id: string }) {
  const nav = useNav();
  const { jobId, details, profile, force, you, dispatch } = useStore();
  const r = candidateById(id);
  const [copied, setCopied] = useState<string[]>([]);
  const decide = useDecide();
  // Figma "Undo": the app's undo toast does this after a real Refer; the switcher's frozen
  // Undo state draws the same toast here so it stays on screen
  const undo = force === "refer.undo";
  const fields = portalFields(r, details, profile);
  const name = r.name;
  const first = firstName(name);

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
                () => {
                  if (r.id === "abhinav") dispatch({ t: "tell", stage: "submitted" });
                }
              );
            }}
          >
            Mark as submitted
          </Button>
          <Button type="secondary" onClick={() => nav.push("chat", { who: name })}>
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
        <PersonHead name={name} role={roleLine(r)} tag={<Tag style="success">Referred</Tag>} />

        <Section label={`Add to ${you.company}’s portal`} icon="arrow.up.right.square" end={<Tag>Job ID {jobId || you.post.jobId}</Tag>}>
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
                      try {
                        if (!f.download) void navigator.clipboard?.writeText(String(f.value));
                      } catch {
                        // no clipboard in this browser: the tick still shows it was taken
                      }
                      dispatch({ t: "toast", v: f.download ? "Resume downloaded" : `${f.name} copied` });
                      window.setTimeout(() => dispatch({ t: "toast", v: null }), 1400);
                    }}
                  >
                    <Icon
                      name={copied.includes(f.name) ? "checkmark" : f.download ? "square.and.arrow.down" : "doc.on.doc.fill"}
                      size={18}
                      style={{ color: "var(--sd-icon-accent)" }}
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
  const r = candidateById(id);
  const name = r.name;
  const first = firstName(name);
  return (
    <Screen
      title="Referral request"
      back
      actions={
        <Actions>
          <Button onClick={() => nav.pop()}>Back to referral requests</Button>
          <Button type="secondary" onClick={() => nav.push("chat", { who: name })}>
            Message {first}
          </Button>
        </Actions>
      }
    >
      <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
        <PersonHead name={name} role={roleLine(r)} tag={<Tag style="success">Submitted</Tag>} />
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
type Referral = { name: string; role: string; stage: Stage; when: string; days?: number; id?: string };

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
  const { handled, unread, force, pending, you } = useStore();
  // who was just moved on; Figma "Updated" shows its note once the 5 seconds to undo are over
  const [lastMoved, setLastMoved] = useState<string | null>(null);
  // Figma "Updated": Aviral has just been moved on, so he leaves the waiting list
  const { force: f0 } = useStore();
  const [moved, setMoved] = useState<Record<string, Stage>>(
    f0 === "referrals.updated" ? { "Aviral Dixit": "interviews" } : {}
  );
  const none = force === "referrals.empty";
  const loadingRefs = force === "referrals.loading";
  const stageOf = (r: Referral) => moved[r.name] ?? r.stage;
  const waiting = none ? [] : REFERRALS.filter((r) => r.days && stageOf(r) === "submitted");
  const all: Referral[] = none
    ? []
    : [
    // Figma draws this screen after Nithin has referred Abhinav and marked it submitted; anyone
    // referred in this session joins the top, and a tap opens their request
    ...(force === "referrals.abhinav" && !handled.abhinav
      ? [{ name: "Abhinav Saxena", role: "Product Designer, Blinkit", stage: "submitted" as Stage, when: "Today", id: "abhinav" }]
      : []),
    ...Object.entries(handled)
      .filter(([, h]) => h.stage !== "notmoving")
      .map(([id, h]) => {
        const c = candidateById(id);
        return { name: c.name, role: roleLine(c), stage: h.stage, when: "Today", id };
      }),
    ...REFERRALS.filter((r) => !r.days),
      ];

  // Same list-card rhythm as jobs and requests: name and time, then the stage chip with Update
  // at the far end of the chip row.
  const bar = (r: Referral, withUpdate: boolean) => (
    <ListCard
      key={r.name}
      onClick={r.id ? () => nav.push("referralRequest", { id: r.id }) : undefined}
      lead={<Avatar name={r.name} />}
      title={r.name}
      when={r.when}
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
          <Empty icon="person.2.fill" title="No referrals yet" body="When you refer someone, you’ll pass on their stage here." />
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

        <Section label={`All referrals · ${you.post.title}`} icon="briefcase.fill">
          {all.length === 0 ? (
            <p className="t-label muted">No referrals yet. When you refer someone, you’ll pass on their stage here.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Figma: no Update on an ending, nor on one submitted today (nothing to report yet) */}
              {all.map((r) => bar(r, !r.id && !["selected", "notselected", "submitted"].includes(stageOf(r))))}
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

const POSTS_BASE: Post[] = [
  { title: "Interaction Designer", jobId: "184223", state: "Live", news: "5 new", activity: " · 8 referred" },
  { title: "Product Manager", jobId: "188410", state: "Live", activity: "No new requests · 2 referred" },
  { title: "Software Engineer-I", jobId: "190552", state: "Paused", news: "1 still open", activity: " · 3 referred" },
  { title: "Product Designer-II", jobId: "", state: "Draft", activity: "" },
];

export function ManagePosts() {
  const nav = useNav();
  const { unread, force, pausedPosts: paused, postedDrafts, you, dispatch } = useStore();
  // your first post is the one requests come in for; the other three are the same at any company
  const POSTS: Post[] = [{ ...POSTS_BASE[0], title: you.post.title, jobId: you.post.jobId }, ...POSTS_BASE.slice(1)];
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
          <Empty
            icon="briefcase.fill"
            title="No posts yet"
            body="Post the job you can refer for, then share its link."
            action={<Button onClick={() => nav.push("addJob")}>Post a job</Button>}
          />
        ) : (
        <Section label={`${you.company} · 4 posts`} icon="briefcase.fill">
          {/* Figma: post cards 8 apart */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {POSTS.map((p) => {
              const off = paused.includes(p.title);
              const draft = p.state === "Draft" && !postedDrafts.includes(p.title);
              const state = draft ? "Draft" : off ? "Paused" : "Live";
              return (
                <Card key={p.title}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span className="t-h-sm" style={{ flex: 1 }}>
                      {p.title}
                    </span>
                    {!draft && <Switch on={!off} onChange={(v) => dispatch({ t: "pausePost", v: p.title, on: v })} />}
                  </div>
                  {/* list-card rhythm: 14/20 Regular detail line tight under the title */}
                  <p className="sd-lc-line">
                    {draft ? "Draft · Add the job ID to post" : `${state} · Job ID ${p.jobId || "191207"}`}
                  </p>
                  <div style={{ height: 12 }} />
                  {/* Figma PostCard activity row: Inter Medium 14/20, 20 tall */}
                  {/* Figma: what is new reads blue, the rest #6b7280; a quiet post is all #636a75.
                      A draft has no activity, just "Finish" at the left. */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {!draft && (
                      <span className="t-label" style={{ flex: 1, color: p.news ? "var(--sd-icon-2)" : "var(--sd-text-2)" }}>
                        {p.news && <span style={{ color: "var(--sd-link)" }}>{p.news}</span>}
                        {p.activity || "No requests yet"}
                      </span>
                    )}
                    <TextButton onClick={() => nav.push(draft ? "checkPost" : "editPost", { title: p.title })}>
                      {draft ? "Finish" : "Edit"}
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
  const { jobId, tips, pausedPosts, you, dispatch } = useStore();
  const name = title ?? you.post.title;
  const paused = pausedPosts.includes(name);
  const done = (msg: string) => {
    dispatch({ t: "toast", v: msg });
    window.setTimeout(() => dispatch({ t: "toast", v: null }), 1800);
    nav.pop();
  };
  // its own copy, so clearing the box leaves it empty instead of snapping back to 184223
  const [editId, setEditId] = useState(jobId || you.post.jobId);
  // Figma "Edit your job post" is "Check your job post" with the post already live: the same
  // five blocks in the same order, a different intro, and Save changes / Pause post.
  return (
    <Screen
      title="Edit your job post"
      back
      actions={
        <Actions>
          <Button disabled={!allValid([["jobId", editId, true], ["tips", tips]])} onClick={() => done("Changes saved. Fit checked again.")}>
            Save changes
          </Button>
          <Button
            type="secondary"
            onClick={() => {
              dispatch({ t: "pausePost", v: name, on: paused });
              done(paused ? "Post is live again" : "Post paused. No new requests come in.");
            }}
          >
            {paused ? "Resume post" : "Pause post"}
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

        <JdDetails title={title ?? you.post.title} />

        <RulesSection />

        <Field
          label="Tips for candidates (optional)"
          icon="lightbulb.fill"
          value={tips}
          onChange={(v) => dispatch({ t: "tips", v })}
          placeholder="e.g. Link a portfolio with end-to-end case studies. Shown on the job."
          multiline
          kind="tips"
          demo={DEMO.tips}
        />

        <FileBox label="Job description" name={you.post.jd} what="file" />
      </div>
    </Screen>
  );
}

export { Note, Box };
