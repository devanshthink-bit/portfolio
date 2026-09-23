"use client";
// The candidate's side: find a job, send a request a stranger can act on, then see what happened.
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  logoSrc,
  allValid,
  showDays,
  showYears,
  ListCard,
} from "../ui";
import { CompanyRow, Project, ResumeDetails } from "./onboarding";

/* ── Jobs ───────────────────────────────────────────────────────────────── */
type Job = {
  id: string;
  title: string;
  company: string;
  logo: string;
  city: string;
  pay: string;
  refers: string;
  /** Figma's job card leads with the referrer's photo, not the company logo. */
  person: string;
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
    person: "Nithin Agarwal",
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
    person: "Avinash Banerjee",
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
    person: "Vanya Kapoor",
    when: "12 Sep",
    tag: { text: "5 of 7 skills · 4+ yrs", style: "primary" },
  },
];

export function Jobs() {
  const nav = useNav();
  const { skippedResume, unread, force, dispatch } = useStore();
  const [phase, setPhase] = useState<"loading" | "ok">("loading");
  useEffect(() => {
    if (force === "jobs.loading") return;
    const t = window.setTimeout(() => setPhase("ok"), 900);
    return () => clearTimeout(t);
  }, [force]);
  const empty = force === "jobs.empty";
  const failed = force === "jobs.error" && phase === "ok";
  const showList = phase !== "loading" && !failed && !empty;
  const [sort, setSort] = useState<Sort>("Newest first");
  const jobs = sort === "Newest first" ? JOBS : [...JOBS].sort((x, y) => skillsOf(y) - skillsOf(x));
  const prompt = skippedResume ? (
          // Figma's "Add Resume Prompt": a white r12 card padded 12/16 with the two lines on the
          // left and the link at the right — not a buffer note tucked under the section label.
          <div
            style={{
              background: "var(--sd-n0)",
              borderRadius: "var(--sd-r-lg)",
              outline: "var(--sd-edge)", outlineOffset: -1,
              padding: "12px 16px",
              display: "flex",
              gap: 12,
              alignItems: "center",
            }}
          >
            <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
              <span className="t-h-xs">See how well you match</span>
              <span className="t-label-sm muted">Add your resume and every job shows your match.</span>
            </span>
            <TextButton onClick={() => nav.openSheet("addResume")}>Add resume</TextButton>
          </div>
        
  ) : null;
  // Figma drops the section label and the sort row while loading, when empty and on the error
  const sortRow = (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Icon name="briefcase.fill" size={16} color="tone" />
      <span className="t-h-xs" style={{ flex: 1 }}>
        Jobs with someone who refers
      </span>
      <SortMenu value={sort} onChange={setSort} />
    </div>
  );
  return (
    <Screen
      largeTitle="Jobs"
      right={<BellButton unread={unread} />}
      // the title, the resume prompt and the sort row stay put; only the jobs scroll (Devansh, 23 Sep)
      pinned={
        showList ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: -8 }}>
            {prompt}
            {sortRow}
          </div>
        ) : (
          prompt
        )
      }
    >
      <div style={{ paddingTop: prompt ? 0 : 8, display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Figma drops the section label and the sort row while loading, when empty and on the
            error — the state is the only thing on the page */}
        {phase === "loading" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : failed ? (
          <Empty
            error
            title="Couldn’t load jobs"
            body="Check your connection and try again."
            action={<Button type="secondary" onClick={() => dispatch({ t: "force", v: null })}>Try again</Button>}
          />
        ) : empty ? (
          <Empty
            icon="briefcase.fill"
            title="No jobs for you yet"
            body="No one refers for jobs like yours here yet. Tell us the roles you want and we’ll show them as referrers join."
            action={<Button onClick={() => nav.push("editDetails")}>Set job preferences</Button>}
          />
        ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {
            jobs.map((j) => (

              <ListCard
                key={j.id}
                onClick={() => (skippedResume ? nav.openSheet("addResume") : nav.push("job", { id: j.id }))}
                lead={<Avatar name={j.person} size={44} />}
                title={j.title}
                when={j.when}
                lines={[`${j.company} · ${j.city}`, `${j.pay} · ${j.refers}`]}
                chips={
                  <>
                    {j.tag &&
                      (skippedResume && j.tag.style === "primary" ? (
                        <Tag>Add resume to see match</Tag>
                      ) : (
                        <Tag style={j.tag.style}>{j.tag.text}</Tag>
                      ))}
                    {j.common && (
                      <span className="sd-tag plain">
                        {j.common.logo && (
                          <Image src={logoSrc(j.common.logo)} alt="" width={12} height={12} style={{ width: 12, height: "auto" }} unoptimized />
                        )}
                        <span>{j.common.text}</span>
                      </span>
                    )}
                  </>
                }
              />
            ))
          }
        </div>
        </div>
        )}
      </div>
    </Screen>
  );
}

type Sort = "Newest first" | "Best match";
const skillsOf = (j: (typeof JOBS)[number]) => Number(j.tag?.text.match(/^(\d+) of/)?.[1] ?? -1);

/** The sort button opens an iOS pull-down menu under it; a tap outside closes it. */
function SortMenu({ value, onChange }: { value: Sort; onChange: (v: Sort) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="sd-hit44" style={{ position: "relative" }}>
      <button
        style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--sd-link)" }}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="t-label">{value}</span>
        <Icon name="chevron.up.chevron.down" size={14} />
      </button>
      {open && (
        <>
          <span className="sd-menu-scrim" onClick={() => setOpen(false)} />
          <span className="sd-menu" role="menu">
            {(["Newest first", "Best match"] as Sort[]).map((o) => (
              <button
                key={o}
                role="menuitemradio"
                aria-checked={o === value}
                onClick={() => {
                  onChange(o);
                  setOpen(false);
                }}
              >
                <span className="t-body">{o}</span>
                {o === value && <Icon name="checkmark" size={18} style={{ color: "var(--sd-link)" }} />}
              </button>
            ))}
          </span>
        </>
      )}
    </span>
  );
}

export function BellButton({ unread }: { unread: number }) {
  const nav = useNav();
  return (
    <button className="sd-barbtn" onClick={() => nav.push("notifications")} aria-label="Notifications" style={{ position: "relative" }}>
      <Icon name="bell" size={24} />
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
  const { saved, dispatch, live, force, skippedResume } = useStore();
  const suggested = force === "job.suggested";
  const asked = force === "job.asked" || live.stage !== "sent" || live.updated === "Just now";
  const noResume = skippedResume || force === "job.skipped";
  const on = saved.includes("flipkart");
  return (
    <Screen
      title="Job details"
      back
      // The ask stays on the bottom edge from the start (Devansh, 23 Sep), so it can be tapped
      // without reading to the end; the job scrolls under it.
      fixedActions
      actions={
        asked ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Figma: a plain 12/16 line above the button, and the button stays blue */}
            <p className="t-label-sm muted">You asked Nithin today. One request per job, per referrer.</p>
            <Button onClick={() => nav.push("trackDetails", { id: "flipkart" })}>View your request</Button>
          </div>
        ) : (
          <Button onClick={() => nav.push("checkRequest")}>Ask Nithin for a referral</Button>
        )
      }
    >
      <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
        {suggested && (
          // Figma's Headline block, shown when a referrer has put you forward: the line and its
          // explanation 4 apart, 24 above the card.
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span className="t-h-sm">Nithin suggests you for this job</span>
            <span className="t-label muted">
              Your details are ready. Sending won’t use one of your 5 requests this week.
            </span>
          </div>
        )}
        {/* Figma's Job card fills its 370 Window and is padded 16; the column's own gap is a
            uniform 16 between every block. */}
        <div className="sd-card" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* CompanyRow is 56 tall: a 40 row, 16 of padding under it, and a 1px rule on the bottom. */}
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              paddingBottom: 16,
              boxShadow: "inset 0 -1px 0 var(--sd-border)",
            }}
          >
            <div style={{ display: "flex", gap: 8, flex: 1, alignItems: "center" }}>
              <Avatar name="Nithin Agarwal" size={36} />
              <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }} className="t-h-xs">
                  Nithin Agarwal
                  <Icon name="checkmark.seal.fill" size={14} style={{ color: "var(--sd-text-success)" }} />
                </span>
                <span className="t-label-sm muted">Design Manager, Flipkart</span>
              </span>
            </div>
            <span className="sd-lc-when">Thursday</span>
          </div>

          {/* Figma Frame 200: a 175-tall #2563eb panel, r16, padded 24/48, with the company
              wordmark filling the 242 it leaves. The code drew a small logo on white. */}
          <div
            style={{
              background: "var(--sd-action-bg)",
              borderRadius: 16,
              height: 175,
              padding: "24px 48px",
              display: "grid",
              placeItems: "center",
            }}
          >
            {/* Figma's banner instance overrides the wordmark to white; the default logo (blue
                wordmark) is the one on white tiles, so the banner gets its own file. */}
            <Image
              src="/images/sidedoor/flipkart-white.svg"
              alt="Flipkart"
              width={242}
              height={64}
              style={{ width: 242, height: 64 }}
              unoptimized
            />
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <h1 className="t-h-md" style={{ flex: 1 }}>
              Interaction Designer
            </h1>
            <button className="sd-hit44" onClick={() => dispatch({ t: "save", v: "flipkart" })} aria-label="Save job" style={{ display: "flex" }}>
              <Icon name={on ? "bookmark.fill" : "bookmark"} size={26} color="tone" />
            </button>
          </div>

          {/* Figma Frame 174: the pay tag and the three rating marks, 8 apart. */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Tag icon="info.circle.fill">₹28–40 LPA</Tag>
            <Image src="/images/sidedoor/rating-sources.svg" alt="" width={37} height={16} style={{ width: 37, height: 16 }} unoptimized />
          </div>

          {/* Figma Frame 175 spreads the three across the full width. */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: 24 }}>
            <Meta icon="mappin.and.ellipse">Bengaluru, KA</Meta>
            <Meta icon="calendar">3+ years</Meta>
            <Meta icon="briefcase.fill">Full time</Meta>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {/* Figma "Skipped resume": the match tag turns into a plain prompt */}
            {noResume ? (
              <Tag>Add resume to see match</Tag>
            ) : (
              <Tag style="primary" icon="checkmark.circle.fill">4 of 7 skills match</Tag>
            )}
            <Tag>Remote or hybrid</Tag>
            <Tag>Joining within 30 days</Tag>
          </div>

          <Block icon="info.circle.fill" title="About the role">
            Design and deliver intuitive checkout and post-purchase experiences used by millions of users. Work closely
            with product and engineering to simplify complex flows and improve conversion, trust, and usability.
            Contribute across the full design lifecycle, from interaction modeling to high-fidelity execution and
            validation.
          </Block>

          {/* Figma Frame 156 is the one block with a gap of 8 rather than 2. */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Icon name="briefcase.fill" size={16} color="tone" />
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

          <Block
            icon="info.circle.fill"
            title="About the employer"
            end={<Image src="/images/sidedoor/rating-sources.svg" alt="" width={30} height={13} style={{ width: 30.06, height: 13 }} unoptimized />}
          >
            Flipkart is one of India’s leading e-commerce platforms, serving millions of customers across categories. The
            company focuses on building scalable, customer-first experiences through technology, design, and innovation.
          </Block>

        </div>
      </div>
    </Screen>
  );
}

function Meta({ icon, children }: { icon: Parameters<typeof Icon>[0]["name"]; children: React.ReactNode }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <Icon name={icon} size={18} color="tone" />
      {/* Figma's Frame 175 labels are Medium 14/20 in --sd-text-2, not the dark text colour. */}
      <span className="t-label muted">{children}</span>
    </span>
  );
}

function Block({ icon, title, children, end }: { icon: Parameters<typeof Icon>[0]["name"]; title: string; children: React.ReactNode; end?: React.ReactNode }) {
  // Figma's blocks are plain 2-gap frames; the 16 between them is the card column's own gap.
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Icon name={icon} size={16} color="tone" />
        {/* Figma fills the title across the row, except where a mark follows it — there the
            title hugs so the mark sits right after the words. */}
        <span className="t-h-xs" style={{ flex: end ? "0 0 auto" : 1 }}>{title}</span>
        {end}
      </span>
      {typeof children === "string" ? <p className="t-body muted">{children}</p> : children}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  // Figma draws these as a single text node: the bullet sits inline, a wrapped line runs back
  // to the left edge, and there is no gap between items. A <ul> with a gap made each block
  // 4 taller per item and gave the wrapped lines a hanging indent.
  return (
    <p className="t-body muted" style={{ whiteSpace: "pre-line" }}>
      {items.map((i) => `\u2022 ${i}`).join("\n")}
    </p>
  );
}

/* ── Check your request ─────────────────────────────────────────────────── */
export function CheckRequest() {
  const nav = useNav();
  const { details, note, stillNeeded, requestsLeft, force, offline, dispatch } = useStore();
  const [sending, setSending] = useState(force === "send.sending");
  const [failed, setFailed] = useState(force === "send.error");
  const noneLeft = requestsLeft === 0 || force === "send.none-left";
  // Figma draws the error, the weekly limit and "Sending…" on a request that is already
  // complete: the portal block is gone and its four answers sit in "Your details".
  const complete = ["send.error", "send.none-left", "send.sending", "offline"].includes(force ?? "");
  const d = complete
    ? { dob: "12 Mar 1999", gaps: "0", locations: "Bengaluru, Remote", notice: "30" }
    : details;
  const missing = complete ? 0 : stillNeeded;

  // Figma's Loading button keeps its colour, so it isn't disabled — a second tap just does
  // nothing. A ref, not the state: taps can land before React has re-rendered.
  const inFlight = useRef(false);
  const send = () => {
    if (inFlight.current) return;
    inFlight.current = true;
    setSending(true);
    setFailed(false);
    window.setTimeout(() => {
      setSending(false);
      inFlight.current = false;
      if (force === "send.error") {
        setFailed(true);
        return;
      }
      dispatch({ t: "send" });
      nav.reset("tabs", { tab: "requests", justSent: true });
      window.setTimeout(() => dispatch({ t: "toast", v: null }), 2400);
    }, 1400);
  };

  return (
    <Screen
      title="Check your request"
      back
      ownOffline
      actions={
        <Actions>
          {/* Figma: while sending there is nothing but the button; the error and the limit
              each replace the weekly line with their own note. */}
          {!sending && !failed && !noneLeft && !offline && (
            // Figma draws this as a plain 12/16 line, not a filled chip.
            <Note>{requestsLeft} of 5 referral requests left this week</Note>
          )}
          {/* Figma "Offline": the weekly line becomes the reason Send is off */}
          {offline && !noneLeft && <Note style="buffer" icon="info.circle.fill">You’re offline. Send when you’re back.</Note>}
          {failed && (
            <Note style="failure" icon="info.circle.fill">
              Couldn’t send. Your details are saved.
            </Note>
          )}
          {noneLeft && <Note>No requests left this week. More on Monday.</Note>}
          {!noneLeft && !sending && !failed && !offline && missing > 0 && (
            <p className="t-label-sm muted">Add the {missing} {missing === 1 ? "detail" : "details"} above to send.</p>
          )}
          <Button disabled={missing > 0 || noneLeft || offline} onClick={send}>
            {sending ? "Sending…" : failed ? "Try again" : "Send referral request"}
          </Button>
        </Actions>
      }
    >
      <div style={{ paddingTop: 32, display: "flex", flexDirection: "column", gap: 24 }}>
        <p className="t-label muted">This is exactly what Nithin will get.</p>

        {/* Figma's Person row is 50 tall with the 44 avatar centred in it. */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Avatar name="Nithin Agarwal" />
          <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
            <span className="sd-person-name">
              Nithin Agarwal
              <Icon name="checkmark.seal.fill" size={16} style={{ color: "var(--sd-text-success)" }} />
            </span>
            {/* Figma's "Role And Tag" row fills the width and pushes the tag to the right edge. */}
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="sd-person-sub" style={{ flex: 1 }}>Design Manager, Flipkart</span>
              <Tag>Job ID 184223</Tag>
            </span>
          </div>
        </div>

        {/* Figma drops this block once every answer is in. It stays while they are being typed:
            it used to vanish the moment the last box got its first character. */}
        {!complete && (
        <Section
          label="Flipkart’s portal also asks for"
          icon="info.circle.fill"
          end={stillNeeded > 0 ? <Tag style="buffer">Still needed · {stillNeeded}</Tag> : <Tag style="success">All in</Tag>}
        >
          {/* Figma's "Still Needed" frame puts 24 between the line and each field. */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <p className="t-label-sm muted">Not on your resume. Asked once, saved for your next request.</p>
            <Field
              label="Date of birth"
              icon="calendar"
              value={d.dob}
              placeholder="Select date"
              required
              readOnly
              onClick={() => nav.openSheet("dob")}
              end={<Icon name="calendar" size={18} color="tone" />}
            />
            <Field
              label="Career gaps, in years"
              icon="briefcase.fill"
              value={d.gaps}
              onChange={(v) => dispatch({ t: "detail", k: "gaps", v })}
              placeholder="0 if none, e.g. 1.5"
              kind="years"
              required
            />
            <Field
              label="Preferred interview locations"
              icon="mappin.and.ellipse"
              value={d.locations}
              onChange={(v) => dispatch({ t: "detail", k: "locations", v })}
              placeholder="e.g. Bengaluru, Remote"
              kind="cities"
              required
            />
            <Field
              label="Notice period, in days"
              icon="hourglass"
              value={d.notice}
              onChange={(v) => dispatch({ t: "detail", k: "notice", v })}
              placeholder="e.g. 30"
              kind="days"
              required
            />
          </div>
        </Section>
        )}

        {/* Figma: once the portal answers are in, they sit here, before the resume */}
        <ResumeDetails
          label="Your details"
          skills={false}
          city="Bengaluru"
          extra={[
            ...(complete
              ? [
                  { name: "Notice period", value: showDays(d.notice), fixed: true },
                  { name: "Career gaps", value: showYears(d.gaps), fixed: true },
                  { name: "Date of birth", value: d.dob, fixed: true },
                  { name: "Preferred interview locations", value: d.locations, fixed: true },
                ]
              : []),
            { name: "Resume", value: "Abhinav_Saxena_Resume.pdf", fixed: true },
          ]}
        />

        <Section label="How you match" icon="lightbulb.fill" end={<Tag style="primary">4 of 7 skills · 3 yrs</Tag>}>
          <Box>
            <p className="t-body muted">Not in your resume: AI-assisted design, Design system, A/B testing</p>
          </Box>
        </Section>

        <Section label="A short note (optional)" icon="quote.bubble.fill">
          {/* Figma's note box is a single 44-tall line, not the 100-tall multiline box. */}
          <Field
            value={note}
            onChange={(v) => dispatch({ t: "note", v })}
            placeholder="One line, e.g. what you worked on"
            boxHeight={44}
            kind="note"
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
  const { requests, unread, force } = useStore();
  const [filter, setFilter] = useState<string>("All");
  // Figma's "Just sent" is the list right after a send: a green note, and the live request
  // sitting at "Sent · Just now"
  const just = justSent || force === "requests.justsent";
  const all =
    force === "requests.empty"
      ? []
      : just
        ? requests.map((r) => (r.live ? { ...r, stage: "sent" as Stage, updated: "Just now" } : r))
        : requests;
  const shown = all.filter((r) => filter === "All" || bucket(r.stage) === filter);
  return (
    <Screen
      largeTitle="Your referral requests"
      right={<BellButton unread={unread} />}
      // the title and the filter stay put; only the list scrolls (Devansh, 23 Sep)
      pinned={<Segmented options={[...FILTERS]} value={filter} onChange={setFilter} />}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {just && (
          <Note style="success" icon="info.circle.fill">
            Sent to Nithin · Interaction Designer, Flipkart
          </Note>
        )}
        {shown.length === 0 ? (
          <Empty
            icon="paperplane.fill"
            title="No requests yet"
            body="Find a job with someone who refers, and ask in one go."
            action={<Button onClick={() => nav.reset("tabs", { tab: "jobs" })}>See jobs</Button>}
          />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {shown.map((r) => (
              <ReferralBar key={r.id} r={r} onClick={() => nav.push("trackDetails", { id: r.id })} />
            ))}
          </div>
        )}
      </div>
    </Screen>
  );
}

/**
 * Figma's ReferralBar, used on this list and at the top of a chat: a 100-tall white card padded
 * 16, the company logo in a 68 square, the name at 16/24 with its seal, the stage tag 8 under it,
 * and the time at the top right.
 */
export function ReferralBar({ r, onClick }: { r: { logo: string; company: string; stage: Stage; updated: string }; onClick?: () => void }) {
  return (
    <ListCard
      onClick={onClick}
      lead={
        <span style={{ width: 44, height: 44, flex: "0 0 auto", display: "grid", placeItems: "center" }}>
          <Image src={logoSrc(r.logo)} alt={r.company} width={44} height={12} style={{ width: 44, height: "auto" }} />
        </span>
      }
      title={r.company}
      titleMark={<Icon name="checkmark.seal.fill" size={16} style={{ color: "var(--sd-text-success)", flex: "0 0 auto" }} />}
      when={r.updated}
      chips={<Tag style={stageTag(r.stage)}>{STAGE_LABEL[r.stage]}</Tag>}
    />
  );
}

/* ── Track details ──────────────────────────────────────────────────────── */
/**
 * The timeline the candidate sees. "On hold" is a step of its own, not a colour, and the endings
 * that stop the flow (no answer, not moving forward, role closed) say so in the last step
 * rather than leaving every circle empty.
 */
function steps(stage: Stage): Step[] {
  const order: Stage[] = ["sent", "referred", "submitted", "interviews"];

  // Figma Track 1 and No Answer: the request sits with the referrer — "Sent" waits in
  // orange and nothing ahead of it is marked as next.
  if (stage === "sent" || stage === "noanswer")
    return [
      { title: "Sent", state: "waiting" },
      ...order.slice(1).map((s) => ({ title: STAGE_LABEL[s], state: "pending" as const })),
      { title: "Selected or not", state: "pending" },
    ];

  // Figma Not Moving Forward (and Role Closed in States): sent happened, then it ended.
  if (stage === "notmoving" || stage === "closed")
    return [
      { title: "Sent", state: "done" },
      { title: STAGE_LABEL[stage], state: "failed" },
    ];

  // Figma Track 4 and 5: every step reached, then the ending in grey or green.
  if (stage === "selected" || stage === "notselected")
    return [
      ...order.map((s) => ({ title: STAGE_LABEL[s], state: "done" as const })),
      { title: STAGE_LABEL[stage], state: stage === "selected" ? "success" : "failed" },
    ];

  // Figma On Hold: submitted, then "On hold" waits in orange ahead of interviews.
  if (stage === "onhold")
    return [
      ...order.slice(0, 3).map((s) => ({ title: STAGE_LABEL[s], state: "done" as const })),
      { title: "On hold", state: "waiting" },
      { title: STAGE_LABEL.interviews, state: "pending" },
      { title: "Selected or not", state: "pending" },
    ];

  // Figma Track 2 and 3: everything up to the stage is done, the step after it is next.
  const cur = order.indexOf(stage);
  const out: Step[] = order.map((s, i) => ({
    title: STAGE_LABEL[s],
    state: i <= cur ? "done" : i === cur + 1 ? "next" : "pending",
  }));
  out.push({ title: "Selected or not", state: cur === order.length - 1 ? "next" : "pending" });
  return out;
}

/** The endings that stop the flow: Figma offers "Find more jobs" on each of them. */
const ENDED: Stage[] = ["notselected", "notmoving", "closed"];

const NOW: Partial<Record<Stage, { line: string; sub: string }>> = {
  sent: { line: "Sent to {who} {when}. No answer yet.", sub: "No answer in 7 days? You can withdraw it and ask someone else." },
  referred: { line: "{who} referred you {when}.", sub: "Next, {who} adds you on {co}’s portal." },
  submitted: { line: "Submitted on {co}’s portal {on}.", sub: "Interviews usually start within 2–3 weeks." },
  interviews: { line: "In interviews at {co}.", sub: "{who} will tell you what they hear." },
  onhold: { line: "On hold at {co}.", sub: "{who} marked it {when}. Nothing for you to do yet." },
  selected: { line: "Congratulations, you’re selected at {co}!", sub: "{who} referred you on {since}." },
  notselected: { line: "Not selected at {co}.", sub: "{who} referred you and it reached interviews." },
  notmoving: { line: "{who} isn’t moving forward with this one.", sub: "Reason: {reason}." },
  noanswer: { line: "Sent to {who} 7 days ago. No answer.", sub: "Your request is back, so it doesn’t count against this week." },
  closed: { line: "{co} closed this job.", sub: "Reason: Role is closed. Requests for it close too." },
};

export function TrackDetails({ id, stage, updated }: { id: string; stage?: Stage; updated?: string }) {
  const nav = useNav();
  const { requests, force, dispatch } = useStore();
  const found = requests.find((x) => x.id === id) ?? requests[0];
  // a stage passed in shows a state the referrer cannot cause from here (no answer, role closed)
  // `updated` moves the date with it: Figma dates the Meta request 16 Sep once it is on hold
  const r = { ...found, ...(stage && { stage }), ...(updated && { updated }) };
  const [phase, setPhase] = useState<"loading" | "ok">("loading");
  useEffect(() => {
    if (force === "track.loading") return;
    const t = window.setTimeout(() => setPhase("ok"), 550);
    return () => clearTimeout(t);
  }, [id, force]);

  // "Couldn't load": the centred error block with Try again
  if (force === "track.error" && phase === "ok")
    return (
      <Screen title="Referral request" back>
        <Empty
          error
          title="Couldn’t load this request"
          body="Check your connection and try again."
          action={<Button type="secondary" onClick={() => dispatch({ t: "force", v: null })}>Try again</Button>}
        />
      </Screen>
    );

  // "on Just now" reads wrong: a weekday or date takes "on", a relative time does not
  const whenPhrase = /^(Just now|Today|Yesterday)$/.test(r.updated)
    ? r.updated.toLowerCase()
    : `on ${r.updated}`;
  const fill = (s: string) =>
    s
      .replace("{who}", r.referrer.split(" ")[0])
      .replace("{co}", r.company)
      .replace("{when}", whenPhrase)
      .replace("{on}", r.since ? `on ${r.since}` : whenPhrase)
      .replace("{reason}", r.reason ?? "none given")
      .replace("{since}", r.since ?? r.updated);
  const now = NOW[r.stage] ?? NOW.sent!;
  const canMessage = ["referred", "submitted", "interviews", "onhold", "selected"].includes(r.stage);

  // Figma "Loading": the company row, one line, the timeline card and the person card, all
  // as grey blocks — not two generic skeleton cards
  if (phase === "loading") {
    const bar = (w: number, h: number, round?: boolean) => (
      <span
        className="sd-skel"
        // Figma's loading blocks are the 12% grey fill, not the solid n100
        style={{ width: w, height: h, borderRadius: round ? 9999 : 4, display: "block", flex: "0 0 auto", background: "var(--sd-fill-3)" }}
      />
    );
    return (
      <Screen title="Referral request" back>
        <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              {bar(56, 32)}
              <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {bar(120, 14)}
                {bar(180, 12)}
              </span>
            </div>
            {bar(300, 12)}
            <span style={{ height: 300, borderRadius: "var(--sd-r-lg)", background: "var(--sd-n0)", outline: "var(--sd-edge)", outlineOffset: -1 }} />
          </div>
          <div className="sd-card" style={{ padding: 16, display: "flex", gap: 12, alignItems: "center" }}>
            {bar(44, 44, true)}
            <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {bar(140, 14)}
              {bar(100, 12)}
            </span>
          </div>
        </div>
      </Screen>
    );
  }

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
        ) : r.stage === "selected" ? (
          // Figma: the ending you want to celebrate offers thanks, not a generic message — as
          // the screen's one primary (blue) button
          <Button onClick={() => nav.push("chat", { who: r.referrer })}>
            Thank {r.referrer.split(" ")[0]}
          </Button>
        ) : ENDED.includes(r.stage) ? (
          // Figma: the three endings that stop the flow send you back to looking, in blue
          <Button onClick={() => nav.reset("tabs", { tab: "jobs" })}>
            Find more jobs
          </Button>
        ) : canMessage ? (
          // Figma: On hold's Frame 329 is 76 tall and bottom-aligned, so 48 sits above the button
          <div style={{ paddingTop: r.stage === "onhold" ? 24 : 0 }}>
            <Button type="secondary" onClick={() => nav.push("chat", { who: r.referrer })}>
              Message {r.referrer.split(" ")[0]}
            </Button>
          </div>
        ) : undefined
      }
    >
      {/* Figma: a 24-gap column holding a 20-gap block (the header, where it is now, and the
          timeline card) and then the person card. */}
      <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* the company the request is about sits on the grey page, never in a card (20 Sep rule) */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <LogoTile logo={r.logo} alt={r.company} />
          <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 2, minWidth: 0 }} className="t-h-sm">
              <span className="sd-1line">{r.company}</span>
              <Icon name="checkmark.seal.fill" size={16} style={{ color: "var(--sd-text-success)" }} />
            </span>
            <span className="t-label muted">{r.job}</span>
            <span>
              <Tag style={stageTag(r.stage)}>{STAGE_LABEL[r.stage]}</Tag>
            </span>
          </div>
        </div>

        {/* Figma keeps "where it is now" on the grey page and puts only the timeline in a card */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Icon name="info.circle.fill" size={16} color="tone" />
            <span className="t-h-xs">{fill(now.line)}</span>
          </span>
          <p className="t-label-sm muted">{fill(now.sub)}</p>
        </div>

        {/* Figma's "Heard From The Company" card sits between "where it is now" and the
            timeline: a 78-tall white card padded 12/16, two lines left, a small button right. */}
        {r.stage === "referred" && (
          <div
            style={{
              background: "var(--sd-n0)",
              borderRadius: "var(--sd-r-lg)",
              outline: "var(--sd-edge)", outlineOffset: -1,
              padding: "12px 16px",
              display: "flex",
              gap: 12,
              alignItems: "center",
            }}
          >
            <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
              <span className="t-h-xs">Heard from {r.company}?</span>
              <span className="t-label-sm muted">Got an email saying your application was submitted? Mark it.</span>
            </span>
            {/* Figma: a small secondary Button (71x28, 0.5 #d1d3d8 stroke, r8) with a 44 hit area */}
            <span className="sd-hit44" style={{ flex: "0 0 auto" }}>
              <Button small type="secondary" onClick={() => dispatch({ t: "tell", stage: "submitted" })}>
                Mark it
              </Button>
            </span>
          </div>
        )}

        <div className="sd-card" style={{ padding: 24 }}>
          <Timeline steps={steps(r.stage)} />
        </div>
        </div>

        {/* Figma has no section label over this card, and no "what they got" block at all */}
        <Card>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Avatar name={r.referrer} />
            <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
              <span className="sd-person-name">
                <span className="sd-1line">{r.referrer}</span>
                <Icon name="checkmark.seal.fill" size={16} style={{ color: "var(--sd-text-success)" }} />
              </span>
              <span className="sd-person-sub sd-1line">{r.referrerRole}</span>
            </span>
            <span className="sd-lc-when">{r.updated}</span>
          </div>
        </Card>

        {/* Figma "Others At Zepto": below the person card, a white r12 card padded 12/16 with
            4 between its two lines (64 tall) — not the 16-padded Card */}
        {r.stage === "noanswer" && (
          <div
            style={{
              background: "var(--sd-n0)",
              borderRadius: "var(--sd-r-lg)",
              outline: "var(--sd-edge)", outlineOffset: -1,
              padding: "12px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <p className="t-h-xs">3 others at {r.company} refer for this job</p>
            <p className="t-label-sm muted">Your details are ready. It takes one tap to ask.</p>
          </div>
        )}
      </div>
    </Screen>
  );
}

export { MatchRow, CompanyRow, Project };
