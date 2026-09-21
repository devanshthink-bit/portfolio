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
  return (
    <Screen largeTitle="Jobs" right={<BellButton unread={unread} />}>
      <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
        {skippedResume && (
          // Figma's "Add Resume Prompt": a white r12 card padded 12/16 with the two lines on the
          // left and the link at the right — not a buffer note tucked under the section label.
          <div
            style={{
              background: "var(--sd-n0)",
              borderRadius: "var(--sd-r-lg)",
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
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="briefcase.fill" size={16} style={{ color: "var(--sd-icon-2)" }} />
          <span className="t-h-xs" style={{ flex: 1 }}>
            Jobs with someone who refers
          </span>
          <span className="sd-hit44">
            <button style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--sd-link)" }}>
              <span className="t-label">Newest first</span>
              <Icon name="chevron.up.chevron.down" size={14} />
            </button>
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {phase === "loading" ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : failed ? (
            <Empty
              icon="xmark.circle.fill"
              title="Couldn’t load jobs"
              body="Nothing is lost. Check your connection and try again."
              action={
                <Button
                  onClick={() => {
                    dispatch({ t: "force", v: null });
                    setPhase("loading");
                    window.setTimeout(() => setPhase("ok"), 900);
                  }}
                >
                  Try again
                </Button>
              }
            />
          ) : empty ? (
            <Empty
              icon="briefcase"
              title="No jobs with a referrer yet"
              body="We’ll tell you the moment someone at a company you follow posts one."
            />
          ) : (
            JOBS.map((j) => (
              <Card
                key={j.id}
                onClick={() => (skippedResume ? nav.openSheet("addResume") : nav.push("job", { id: j.id }))}
              >
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <div style={{ display: "flex", gap: 12, flex: 1, minWidth: 0 }}>
                    <Avatar name={j.person} size={44} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 }}>
                      <span className="t-h-sm">{j.title}</span>
                      <span className="t-label muted">
                        {j.company} · {j.city}
                      </span>
                      <span className="t-label-sm muted">
                        {j.pay} · {j.refers}
                      </span>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {j.tag &&
                          (skippedResume && j.tag.style === "primary" ? (
                            <Tag>Add resume to see match</Tag>
                          ) : (
                            <Tag style={j.tag.style}>{j.tag.text}</Tag>
                          ))}
                        {j.common && (
                          <span className="sd-tag plain">
                            {j.common.logo && (
                              <Image src={`/images/sidedoor/${j.common.logo}.png`} alt="" width={14} height={14} style={{ width: 14, height: "auto" }} />
                            )}
                            <span>{j.common.text}</span>
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
      </div>
    </Screen>
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
  const { saved, dispatch, live, force } = useStore();
  const suggested = force === "job.suggested";
  const asked = live.stage !== "sent" || live.updated === "Just now";
  const on = saved.includes("flipkart");
  return (
    <Screen title="Job details" back>
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
        {/* Figma nests a 358-wide Card inside a 370-wide Window, so the content column is 326
            starting at x38 — a 22 horizontal padding on one card gives the same thing. The
            column's own gap is a uniform 16 between every block. */}
        <div className="sd-card" style={{ padding: "16px 22px", display: "flex", flexDirection: "column", gap: 16 }}>
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
            <span style={{ display: "flex", alignItems: "center", gap: 4, flex: "0 0 auto" }}>
              <Icon name="clock" size={14} style={{ color: "var(--sd-icon-2)" }} />
              <span className="t-label-sm muted">Thursday</span>
            </span>
          </div>

          {/* Figma Frame 200: a 175-tall #2563eb panel, r16, padded 24/52, with the company
              wordmark centred in the 222x127 it leaves. The code drew a small logo on white. */}
          <div
            style={{
              background: "var(--sd-action-bg)",
              borderRadius: 16,
              height: 175,
              padding: "24px 52px",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Image
              src="/images/sidedoor/flipkart-banner-logo.png"
              alt="Flipkart"
              width={222}
              height={58.53}
              style={{ width: 222, height: 58.53 }}
            />
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <h1 className="t-h-md" style={{ flex: 1 }}>
              Interaction Designer
            </h1>
            <button onClick={() => dispatch({ t: "save", v: "flipkart" })} aria-label="Save job" style={{ display: "flex" }}>
              <Icon name={on ? "bookmark.fill" : "bookmark"} size={26} style={{ color: "var(--sd-icon-2)" }} />
            </button>
          </div>

          {/* Figma Frame 174: the pay tag and the three rating marks, 8 apart. */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Tag icon="info.circle.fill">₹28–40 LPA</Tag>
            <Image src="/images/sidedoor/rating-logos.png" alt="" width={37} height={16} style={{ width: 37, height: 16 }} />
          </div>

          {/* Figma Frame 175 spreads the three across the full width. */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: 24 }}>
            <Meta icon="mappin.and.ellipse">Bengaluru, KA</Meta>
            <Meta icon="calendar">3+ years</Meta>
            <Meta icon="briefcase.fill">Full time</Meta>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <Tag style="primary" icon="checkmark.circle.fill">4 of 7 skills match</Tag>
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

          <Block
            icon="info.circle.fill"
            title="About the employer"
            end={<Image src="/images/sidedoor/rating-logos.png" alt="" width={30} height={13} style={{ width: 30.06, height: 13 }} />}
          >
            Flipkart is one of India’s leading e-commerce platforms, serving millions of customers across categories. The
            company focuses on building scalable, customer-first experiences through technology, design, and innovation.
          </Block>

          {/* Figma's Actions frame is the last child of the card, not a block pinned to the
              screen: 8 of top padding, then a 322-wide button inset 2 from the column. */}
          <div style={{ paddingTop: 8, display: "flex", flexDirection: "column", gap: 12 }}>
            {asked ? (
              <>
                <Note>You already asked Nithin. It’s in Your referral requests.</Note>
                <div style={{ padding: "0 2px" }}>
                  <Button type="secondary" onClick={() => nav.push("trackDetails", { id: "flipkart" })}>
                    See your request
                  </Button>
                </div>
              </>
            ) : (
              <div style={{ padding: "0 2px" }}>
                <Button onClick={() => nav.push("checkRequest")}>Ask Nithin for a referral</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Screen>
  );
}

function Meta({ icon, children }: { icon: Parameters<typeof Icon>[0]["name"]; children: React.ReactNode }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <Icon name={icon} size={18} style={{ color: "var(--sd-icon-2)" }} />
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
        <Icon name={icon} size={16} style={{ color: "var(--sd-icon-2)" }} />
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
  const { details, note, stillNeeded, requestsLeft, force, dispatch } = useStore();
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(force === "send.error");
  const noneLeft = requestsLeft === 0 || force === "send.none-left";

  const send = () => {
    setSending(true);
    setFailed(false);
    window.setTimeout(() => {
      setSending(false);
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
      actions={
        <Actions>
          {/* Figma draws this as a plain 12/16 line, not a filled chip. */}
          <Note>{requestsLeft} of 5 referral requests left this week</Note>
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
              value={details.dob}
              placeholder="Select date"
              readOnly
              onClick={() => nav.openSheet("dob")}
              end={<Icon name="calendar" size={18} style={{ color: "var(--sd-icon-2)" }} />}
            />
            <Field
              label="Career gaps"
              icon="briefcase.fill"
              value={details.gaps}
              onChange={(v) => dispatch({ t: "detail", k: "gaps", v })}
              placeholder="None, or when and why"
            />
            <Field
              label="Preferred interview locations"
              icon="mappin.and.ellipse"
              value={details.locations}
              onChange={(v) => dispatch({ t: "detail", k: "locations", v })}
              placeholder="e.g. Bengaluru, Remote"
            />
            <Field
              label="Notice period"
              icon="hourglass"
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
          {/* Figma's note box is a single 44-tall line, not the 100-tall multiline box. */}
          <Field
            value={note}
            onChange={(v) => dispatch({ t: "note", v })}
            placeholder="One line, e.g. what you worked on"
            boxHeight={44}
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
  const all = force === "requests.empty" ? [] : requests;
  const shown = all.filter((r) => filter === "All" || bucket(r.stage) === filter);
  return (
    <Screen largeTitle="Your referral requests" right={<BellButton unread={unread} />}>
      <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
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
    <Card onClick={onClick}>
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
        <div style={{ display: "flex", gap: 12, flex: 1, minWidth: 0 }}>
          <span style={{ width: 68, height: 68, flex: "0 0 auto", display: "grid", placeItems: "center" }}>
            <Image
              src={`/images/sidedoor/${r.logo}.png`}
              alt={r.company}
              width={68}
              height={18}
              style={{ width: 68, height: "auto" }}
            />
          </span>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 2 }} className="t-h-sm">
              {r.company}
              <Icon name="checkmark.seal.fill" size={16} style={{ color: "var(--sd-text-success)" }} />
            </span>
            <span>
              <Tag style={stageTag(r.stage)}>{STAGE_LABEL[r.stage]}</Tag>
            </span>
          </div>
        </div>
        <span style={{ display: "flex", alignItems: "center", gap: 4, flex: "0 0 auto" }}>
          <Icon name="clock" size={13} style={{ color: "var(--sd-icon-2)" }} />
          <span className="t-label-sm muted">{r.updated}</span>
        </span>
      </div>
    </Card>
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
  notmoving: { line: "{who} isn’t moving forward with this one.", sub: "Reason: {reason}" },
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

  if (force === "track.error" && phase === "ok")
    return (
      <Screen title="Referral request" back>
        <Empty
          icon="xmark.circle.fill"
          title="Couldn’t load this request"
          body="Nothing has changed. Try again in a moment."
          action={<Button onClick={() => dispatch({ t: "force", v: null })}>Try again</Button>}
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

  if (phase === "loading")
    return (
      <Screen title="Referral request" back>
        <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
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
          <Button type="secondary" onClick={() => nav.push("chat", { who: r.referrer })}>
            Message {r.referrer.split(" ")[0]}
          </Button>
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
          <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 2 }} className="t-h-sm">
              {r.company}
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
            <Icon name="info.circle.fill" size={16} style={{ color: "var(--sd-icon-2)" }} />
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
              <Button small type="secondary" onClick={() => dispatch({ t: "handle", id: r.id, stage: "submitted" })}>
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
                {r.referrer}
                <Icon name="checkmark.seal.fill" size={16} style={{ color: "var(--sd-text-success)" }} />
              </span>
              <span className="sd-person-sub">{r.referrerRole}</span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 2, flex: "0 0 auto" }}>
              <Icon name="clock" size={14} style={{ color: "var(--sd-icon-2)" }} />
              <span className="t-label-sm muted">{r.updated}</span>
            </span>
          </div>
        </Card>

        {/* Figma "Others At Zepto": below the person card, a white r12 card padded 12/16 with
            4 between its two lines (64 tall) — not the 16-padded Card */}
        {r.stage === "noanswer" && (
          <div
            style={{
              background: "var(--sd-n0)",
              borderRadius: "var(--sd-r-lg)",
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
