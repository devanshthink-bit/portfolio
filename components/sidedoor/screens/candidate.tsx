"use client";
// The candidate's side: find a job, send a request a stranger can act on, then see what happened.
import Image from "next/image";
import { useEffect, useState } from "react";
import { useNav } from "../nav";
import { STAGE_LABEL, stageTag, useStore, type Request, type Stage } from "../store";
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
  LogoTile,
  MatchRow,
  Note,
  Screen,
  Section,
  Segmented,
  SkeletonCard,
  Tag,
  TextButton,
  Timeline,
  type Step,
} from "../ui";
import { CompanyRow, Project } from "./onboarding";

/* ── Jobs ───────────────────────────────────────────────────────────────── */
type Job = {
  id: string;
  title: string;
  company: string;
  logo: string;
  city: string;
  pay: string;
  refers: string;
  when: string;
  tag?: { text: string; style: "primary" | "buffer" };
  common?: { logo?: string; text: string };
};

const JOBS: Job[] = [
  {
    id: "flipkart",
    title: "Interaction Designer",
    company: "Flipkart",
    logo: "flipkart-icon",
    city: "Bengaluru",
    pay: "₹28–40 LPA",
    refers: "Nithin refers",
    when: "Thursday",
    tag: { text: "4 of 7 skills · 3+ yrs", style: "primary" },
    common: { logo: "makemytrip", text: "Both worked at MakeMyTrip" },
  },
  {
    id: "phonepe",
    title: "Sr. Product Designer",
    company: "PhonePe",
    logo: "phonepe",
    city: "Pune",
    pay: "₹40–50 LPA",
    refers: "Avinash refers",
    when: "Wednesday",
    tag: { text: "Avinash is full this week", style: "buffer" },
  },
  {
    id: "zomato",
    title: "Member of Technical Staff-I",
    company: "Zomato",
    logo: "swiggy",
    city: "Noida",
    pay: "₹25–30 LPA",
    refers: "Vanya refers",
    when: "12 Sep",
    tag: { text: "5 of 7 skills · 4+ yrs", style: "primary" },
  },
];

export function Jobs() {
  const nav = useNav();
  const { skippedResume, unread } = useStore();
  const [phase, setPhase] = useState<"loading" | "ok">("loading");
  useEffect(() => {
    const t = window.setTimeout(() => setPhase("ok"), 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <Screen largeTitle="Jobs" right={<BellButton unread={unread} />}>
      <div style={{ paddingTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="briefcase.fill" size={16} style={{ color: "var(--sd-icon-2)" }} />
          <span className="t-h-xs" style={{ flex: 1 }}>
            Jobs with someone who refers
          </span>
          <span className="sd-hit44">
            <button style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--sd-link)" }}>
              <span className="t-label-sm">Newest first</span>
              <Icon name="chevron.up.chevron.down" size={13} />
            </button>
          </span>
        </div>
        {skippedResume && (
          <Note style="buffer" icon="info.circle.fill">
            Add your resume to ask. Referrers need it before they can act.
          </Note>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 8 }}>
          {phase === "loading" ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            JOBS.map((j) => (
              <Card
                key={j.id}
                onClick={() => (skippedResume ? nav.openSheet("addResume") : nav.push("job", { id: j.id }))}
              >
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <div style={{ display: "flex", gap: 12, flex: 1, minWidth: 0 }}>
                    <LogoTile logo={j.logo} alt={j.company} size={44} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 }}>
                      <span className="t-h-sm">{j.title}</span>
                      <span className="t-label muted">
                        {j.company} · {j.city}
                      </span>
                      <span className="t-label-sm muted">
                        {j.pay} · {j.refers}
                      </span>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
                        {j.tag && <Tag style={j.tag.style}>{j.tag.text}</Tag>}
                        {j.common && (
                          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            {j.common.logo && (
                              <Image src={`/images/sidedoor/${j.common.logo}.png`} alt="" width={16} height={16} style={{ width: 16, height: "auto" }} />
                            )}
                            <span className="t-label-sm muted">{j.common.text}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span style={{ display: "flex", alignItems: "center", gap: 4, flex: "0 0 auto", whiteSpace: "nowrap" }}>
                    <Icon name="clock" size={13} style={{ color: "var(--sd-icon-2)" }} />
                    <span className="t-label-sm muted">{j.when}</span>
                  </span>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </Screen>
  );
}

export function BellButton({ unread }: { unread: number }) {
  const nav = useNav();
  return (
    <button className="sd-barbtn" onClick={() => nav.push("notifications")} aria-label="Notifications" style={{ position: "relative" }}>
      <Icon name="bell" size={22} />
      {unread > 0 && (
        <i
          style={{ position: "absolute", top: 9, right: 10, width: 8, height: 8, borderRadius: "50%", background: "var(--sd-ios-red)" }}
        />
      )}
    </button>
  );
}

/* ── Job details ────────────────────────────────────────────────────────── */
export function JobDetails() {
  const nav = useNav();
  const { saved, dispatch, live } = useStore();
  const asked = live.stage !== "sent" || live.updated === "Just now";
  const on = saved.includes("flipkart");
  return (
    <Screen
      title="Job details"
      back
      actions={
        asked ? (
          <Actions>
            <Note>You already asked Nithin. It’s in Your referral requests.</Note>
            <Button type="secondary" onClick={() => nav.push("trackDetails", { id: "flipkart" })}>
              See your request
            </Button>
          </Actions>
        ) : (
          <Button onClick={() => nav.push("checkRequest")}>Ask Nithin for a referral</Button>
        )
      }
    >
      <div style={{ paddingTop: 8 }}>
        <Card>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <div style={{ display: "flex", gap: 8, flex: 1 }}>
              <Avatar name="Nithin Agarwal" size={36} />
              <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }} className="t-h-xs">
                  Nithin Agarwal
                  <Icon name="checkmark.seal.fill" size={14} style={{ color: "var(--sd-link)" }} />
                </span>
                <span className="t-label-sm muted">Design Manager, Flipkart</span>
              </span>
            </div>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Icon name="clock" size={14} style={{ color: "var(--sd-icon-2)" }} />
              <span className="t-label-sm muted">Thursday</span>
            </span>
          </div>

          <div style={{ height: 16 }} />
          <Image src="/images/sidedoor/flipkart.png" alt="Flipkart" width={110} height={30} style={{ width: 110, height: "auto" }} />

          <div style={{ height: 16 }} />
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <h1 className="t-h-md" style={{ flex: 1 }}>
              Interaction Designer
            </h1>
            <button className="sd-hit44" onClick={() => dispatch({ t: "save", v: "flipkart" })} aria-label="Save job">
              <Icon name={on ? "bookmark.fill" : "bookmark"} size={22} style={{ color: on ? "var(--sd-link)" : "var(--sd-icon-2)" }} />
            </button>
          </div>

          <div style={{ height: 8 }} />
          <Tag icon="info.circle.fill">₹28–40 LPA</Tag>

          <div style={{ height: 16 }} />
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <Meta icon="mappin.and.ellipse">Bengaluru, KA</Meta>
            <Meta icon="calendar">3+ years</Meta>
            <Meta icon="briefcase.fill">Full time</Meta>
          </div>

          <div style={{ height: 16 }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <Tag style="primary">4 of 7 skills match</Tag>
            <Tag>Remote or hybrid</Tag>
            <Tag>Joining within 30 days</Tag>
          </div>

          <Block icon="info.circle.fill" title="About the role">
            Design and deliver intuitive checkout and post-purchase experiences used by millions of users. Work closely
            with product and engineering to simplify complex flows and improve conversion, trust, and usability.
            Contribute across the full design lifecycle, from interaction modeling to high-fidelity execution and
            validation.
          </Block>

          <div style={{ height: 24 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Icon name="briefcase.fill" size={16} style={{ color: "var(--sd-icon-2)" }} />
              <span className="t-h-xs">What we’re looking for</span>
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["UX research", "Interaction design", "Prototyping", "AI-assisted design", "Design system", "Figma"].map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
            <Bullets
              items={[
                "3+ years of experience designing web or mobile products",
                "Strong skills in interaction design, user flows, and usability",
                "Experience creating wireframes, prototypes, and high-fidelity UI",
                "Ability to collaborate closely with product and engineering teams",
              ]}
            />
          </div>

          <Block icon="paperclip" title="Key responsibilities">
            <Bullets
              items={[
                "Own and design high-impact checkout and payment experiences",
                "Collaborate closely with product and engineering to solve complex user problems",
                "Create wireframes, interactive prototypes, and polished high-fidelity designs",
                "Lead and apply user research insights to continuously improve key flows",
              ]}
            />
          </Block>

          <Block icon="lightbulb.fill" title="Tips from the referrer">
            <Bullets
              items={[
                "Present a portfolio showcasing your strongest interaction design work, primarily created in Figma",
                "Clearly articulate your end-to-end design process, from research and exploration to wireframes and prototypes",
                "Demonstrate measurable impact through metrics such as conversion, engagement, or scale",
                "Showcase strong collaboration with product managers and engineers across projects",
              ]}
            />
          </Block>

          <Block icon="info.circle.fill" title="About the employer">
            Flipkart is one of India’s leading e-commerce platforms, serving millions of customers across categories. The
            company focuses on building scalable, customer-first experiences through technology, design, and innovation.
          </Block>
        </Card>
      </div>
    </Screen>
  );
}

function Meta({ icon, children }: { icon: Parameters<typeof Icon>[0]["name"]; children: React.ReactNode }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <Icon name={icon} size={18} style={{ color: "var(--sd-icon-2)" }} />
      <span className="t-label">{children}</span>
    </span>
  );
}

function Block({ icon, title, children }: { icon: Parameters<typeof Icon>[0]["name"]; title: string; children: React.ReactNode }) {
  return (
    <>
      <div style={{ height: 24 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Icon name={icon} size={16} style={{ color: "var(--sd-icon-2)" }} />
          <span className="t-h-xs">{title}</span>
        </span>
        {typeof children === "string" ? <p className="t-body muted">{children}</p> : children}
      </div>
    </>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {items.map((i) => (
        <li key={i} className="t-body muted" style={{ display: "flex", gap: 8 }}>
          <span aria-hidden="true">•</span>
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── Check your request ─────────────────────────────────────────────────── */
export function CheckRequest() {
  const nav = useNav();
  const { details, note, stillNeeded, requestsLeft, dispatch } = useStore();
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const noneLeft = requestsLeft === 0;

  const send = () => {
    setSending(true);
    setFailed(false);
    window.setTimeout(() => {
      setSending(false);
      dispatch({ t: "send" });
      nav.reset("tabs", { tab: "requests", justSent: true });
      window.setTimeout(() => dispatch({ t: "toast", v: null }), 2400);
    }, 1400);
  };

  return (
    <Screen
      title="Check your request"
      back
      actions={
        <Actions>
          <Tag>{requestsLeft} of 5 referral requests left this week</Tag>
          {failed && (
            <Note style="failure" icon="xmark.circle.fill">
              Couldn’t send. Nothing was lost — try again.
            </Note>
          )}
          {noneLeft && (
            <Note style="buffer">No requests left this week. You get 5 more on Monday.</Note>
          )}
          {!noneLeft && stillNeeded > 0 && (
            <p className="t-label-sm muted">Add the {stillNeeded} {stillNeeded === 1 ? "detail" : "details"} above to send.</p>
          )}
          <Button disabled={stillNeeded > 0 || sending || noneLeft} onClick={send}>
            {sending ? "Sending…" : "Send referral request"}
          </Button>
        </Actions>
      }
    >
      <div style={{ paddingTop: 8, display: "flex", flexDirection: "column", gap: 24 }}>
        <p className="t-label muted">This is exactly what Nithin will get.</p>

        <div style={{ display: "flex", gap: 12 }}>
          <Avatar name="Nithin Agarwal" />
          <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
            <span className="sd-person-name">
              Nithin Agarwal
              <Icon name="checkmark.seal.fill" size={16} style={{ color: "var(--sd-link)" }} />
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span className="sd-person-sub">Design Manager, Flipkart</span>
              <Tag>Job ID 184223</Tag>
            </span>
          </div>
        </div>

        <Section
          label="Flipkart’s portal also asks for"
          icon="info.circle.fill"
          end={stillNeeded > 0 ? <Tag style="buffer">Still needed · {stillNeeded}</Tag> : <Tag style="success">All in</Tag>}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p className="t-label-sm muted">Not on your resume. Asked once, saved for your next request.</p>
            <Field
              label="Date of birth"
              value={details.dob}
              placeholder="Select date"
              readOnly
              onClick={() => nav.openSheet("dob")}
              end={<Icon name="calendar" size={18} style={{ color: "var(--sd-icon-2)" }} />}
            />
            <Field
              label="Career gaps"
              value={details.gaps}
              onChange={(v) => dispatch({ t: "detail", k: "gaps", v })}
              placeholder="None, or when and why"
            />
            <Field
              label="Preferred interview locations"
              value={details.locations}
              onChange={(v) => dispatch({ t: "detail", k: "locations", v })}
              placeholder="e.g. Bengaluru, Remote"
            />
            <Field
              label="Notice period"
              value={details.notice}
              onChange={(v) => dispatch({ t: "detail", k: "notice", v })}
              placeholder="e.g. 30 days"
            />
          </div>
        </Section>

        <Section label="Your details" icon="person.fill" end={<TextButton>Edit</TextButton>}>
          <Box>
            <DetailField name="Full name" value="Abhinav Saxena" />
            <DetailField name="Email" value="abhinav.saxena@email.com" />
            <DetailField name="Phone" value="+91 98XXX XXX21" />
            <DetailField name="Current city" value="Bengaluru" />
            <DetailField name="Experience" value="3 yrs total · 3 yrs relevant" />
            <DetailField name="Resume" value="Abhinav_Saxena_Resume.pdf" />
          </Box>
        </Section>

        <Section label="How you match" icon="lightbulb.fill" end={<Tag style="primary">4 of 7 skills · 3 yrs</Tag>}>
          <Box>
            <p className="t-body muted">Not in your resume: AI-assisted design, Design system, A/B testing</p>
          </Box>
        </Section>

        <Section label="A short note (optional)" icon="quote.bubble.fill">
          <Field
            value={note}
            onChange={(v) => dispatch({ t: "note", v })}
            placeholder="One line, e.g. what you worked on"
            multiline
          />
        </Section>
      </div>
    </Screen>
  );
}

/* ── Your referral requests ─────────────────────────────────────────────── */
const FILTERS = ["All", "Waiting", "In progress", "Closed"] as const;

function bucket(s: Stage): (typeof FILTERS)[number] {
  if (s === "sent" || s === "noanswer") return "Waiting";
  if (s === "referred" || s === "submitted" || s === "interviews" || s === "onhold") return "In progress";
  return "Closed";
}

export function RequestList({ justSent }: { justSent?: boolean }) {
  const nav = useNav();
  const { requests, unread } = useStore();
  const [filter, setFilter] = useState<string>("All");
  const shown = requests.filter((r) => filter === "All" || bucket(r.stage) === filter);
  return (
    <Screen largeTitle="Your referral requests" right={<BellButton unread={unread} />}>
      <div style={{ paddingTop: 8, display: "flex", flexDirection: "column", gap: 16 }}>
        <Segmented options={[...FILTERS]} value={filter} onChange={setFilter} />
        {justSent && (
          <Note style="success" icon="checkmark">
            Sent to Nithin. You’ll be told the moment it moves.
          </Note>
        )}
        {shown.length === 0 ? (
          <Empty
            icon="tray"
            title="Nothing here yet"
            body="Requests you send show up here, with where each one got to."
            action={<Button onClick={() => nav.push("job", { id: "flipkart" })}>See jobs</Button>}
          />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {shown.map((r) => (
              <ReferralBar key={r.id} r={r} onClick={() => nav.push("trackDetails", { id: r.id })} />
            ))}
          </div>
        )}
      </div>
    </Screen>
  );
}

function ReferralBar({ r, onClick }: { r: Request; onClick: () => void }) {
  return (
    <Card onClick={onClick} style={{ padding: 12 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <LogoTile logo={r.logo} alt={r.company} size={52} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }} className="t-h-sm">
            {r.company}
            <Icon name="checkmark.seal.fill" size={15} style={{ color: "var(--sd-link)" }} />
          </span>
          <span>
            <Tag style={stageTag(r.stage)}>{STAGE_LABEL[r.stage]}</Tag>
          </span>
        </div>
        <span style={{ display: "flex", alignItems: "center", gap: 4, flex: "0 0 auto" }}>
          <Icon name="clock" size={14} style={{ color: "var(--sd-icon-2)" }} />
          <span className="t-label-sm muted">{r.updated}</span>
        </span>
      </div>
    </Card>
  );
}

/* ── Track details ──────────────────────────────────────────────────────── */
/** The timeline the candidate sees. "On hold" is a step of its own, not a colour. */
function steps(stage: Stage): Step[] {
  const order: Stage[] = ["sent", "referred", "submitted", "interviews"];
  const reached = (s: Stage) => {
    const i = order.indexOf(s);
    const cur = order.indexOf(stage);
    if (stage === "selected" || stage === "notselected") return true;
    if (stage === "onhold") return i <= 2;
    return i <= cur;
  };
  const out: Step[] = order.map((s) => ({
    title: STAGE_LABEL[s],
    state: stage === s ? "current" : reached(s) ? "done" : "pending",
  }));
  if (stage === "onhold") out.splice(3, 0, { title: "On hold", state: "current" });
  out.push({
    title: stage === "selected" ? "Selected" : stage === "notselected" ? "Not selected" : "Selected or not",
    state: stage === "selected" || stage === "notselected" ? "current" : "pending",
  });
  return out;
}

const NOW: Partial<Record<Stage, { line: string; sub: string }>> = {
  sent: { line: "Sent to {who} {when}. No answer yet.", sub: "No answer in 7 days? You can withdraw it and ask someone else." },
  referred: { line: "{who} referred you.", sub: "Next they add you to {co}’s portal." },
  submitted: { line: "Submitted on {co}’s portal.", sub: "Interviews usually start within 2–3 weeks." },
  interviews: { line: "In interviews at {co}.", sub: "{who} will tell you what they hear." },
  onhold: { line: "On hold at {co}.", sub: "{who} marked it. Nothing for you to do yet." },
  selected: { line: "You’re selected at {co}.", sub: "{who} referred you. Congratulations." },
  notselected: { line: "Not selected at {co}.", sub: "Your details are saved, so the next ask is one tap." },
  notmoving: { line: "{who} isn’t moving forward.", sub: "Reason given: {reason}" },
  noanswer: { line: "Sent to {who} 7 days ago. No answer.", sub: "Your request is back, so it doesn’t count against this week." },
  closed: { line: "The role is closed at {co}.", sub: "{co} closed it, so nobody can refer for it now." },
};

export function TrackDetails({ id }: { id: string }) {
  const nav = useNav();
  const { requests } = useStore();
  const r = requests.find((x) => x.id === id) ?? requests[0];
  const [phase, setPhase] = useState<"loading" | "ok">("loading");
  useEffect(() => {
    const t = window.setTimeout(() => setPhase("ok"), 550);
    return () => clearTimeout(t);
  }, [id]);

  // "on Just now" reads wrong: a weekday or date takes "on", a relative time does not
  const whenPhrase = /^(Just now|Today|Yesterday)$/.test(r.updated)
    ? r.updated.toLowerCase()
    : `on ${r.updated}`;
  const fill = (s: string) =>
    s
      .replace("{who}", r.referrer.split(" ")[0])
      .replace("{co}", r.company)
      .replace("{when}", whenPhrase)
      .replace("{reason}", r.reason ?? "none given");
  const now = NOW[r.stage] ?? NOW.sent!;
  const canMessage = ["referred", "submitted", "interviews", "onhold", "selected"].includes(r.stage);

  if (phase === "loading")
    return (
      <Screen title="Referral request" back>
        <div style={{ paddingTop: 8, display: "flex", flexDirection: "column", gap: 16 }}>
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </Screen>
    );

  return (
    <Screen
      title="Referral request"
      back
      actions={
        r.stage === "noanswer" ? (
          <Actions>
            <Button onClick={() => nav.pop()}>Ask someone else at {r.company}</Button>
            <TextButton onClick={() => nav.pop()}>Keep waiting for {r.referrer.split(" ")[0]}</TextButton>
          </Actions>
        ) : canMessage ? (
          <Button type="secondary" onClick={() => nav.push("chat", { who: r.referrer })}>
            Message {r.referrer.split(" ")[0]}
          </Button>
        ) : undefined
      }
    >
      <div style={{ paddingTop: 8, display: "flex", flexDirection: "column", gap: 24 }}>
        {/* the company the request is about sits on the grey page, never in a card (20 Sep rule) */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <LogoTile logo={r.logo} alt={r.company} />
          <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }} className="t-h-md">
              {r.company}
              <Icon name="checkmark.seal.fill" size={18} style={{ color: "var(--sd-link)" }} />
            </span>
            <span className="t-label muted">{r.job}</span>
            <span>
              <Tag style={stageTag(r.stage)}>{STAGE_LABEL[r.stage]}</Tag>
            </span>
          </div>
        </div>

        <Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <Icon name="info.circle.fill" size={16} style={{ color: "var(--sd-icon-2)", marginTop: 2 }} />
              <span className="t-h-xs">{fill(now.line)}</span>
            </span>
            <p className="t-label-sm muted">{fill(now.sub)}</p>
          </div>
          <div style={{ height: 20 }} />
          <Timeline steps={steps(r.stage)} />
        </Card>

        {r.stage === "noanswer" && (
          <Card>
            <p className="t-h-xs">3 others at {r.company} refer for this job</p>
            <div style={{ height: 4 }} />
            <p className="t-label-sm muted">Your details are ready. It takes one tap to ask.</p>
          </Card>
        )}

        <Section label="Who you asked" icon="person.fill">
          <Card>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Avatar name={r.referrer} />
              <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                <span className="sd-person-name">
                  {r.referrer}
                  <Icon name="checkmark.seal.fill" size={16} style={{ color: "var(--sd-link)" }} />
                </span>
                <span className="sd-person-sub">{r.referrerRole}</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Icon name="clock" size={14} style={{ color: "var(--sd-icon-2)" }} />
                <span className="t-label-sm muted">{r.updated}</span>
              </span>
            </div>
          </Card>
        </Section>

        <Section label="What they got" icon="paperclip">
          <Box>
            <DetailField name="Full name" value="Abhinav Saxena" />
            <DetailField name="Experience" value="3 yrs total · 3 yrs relevant" />
            <DetailField name="Notice period" value="30 days" />
            <DetailField name="Resume" value="Abhinav_Saxena_Resume.pdf" />
          </Box>
        </Section>
      </div>
    </Screen>
  );
}

export { MatchRow, CompanyRow, Project };
