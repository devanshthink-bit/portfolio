"use client";
// Screens both roles use, plus the web link page — which is a web page, so it keeps the SideDoor
// logo bar and has no tab bar.
import Image from "next/image";
import { useState, type ReactNode } from "react";
import { useNav } from "../nav";
import { STAGE_LABEL, stageTag, useStore } from "../store";
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
  ListGroup,
  Note,
  LogoTile,
  Row,
  Screen,
  Section,
  SectionLabel,
  SkeletonCard,
  StatusBar,
  Switch,
  Tag,
  TextButton,
} from "../ui";
import { BellButton, ReferralBar } from "./candidate";
import { CompanyRow, DocUpload, Project } from "./onboarding";

/* ── Messages ───────────────────────────────────────────────────────────── */
type Chat = { name: string; last: string; when: string; unread?: number };

const CANDIDATE_CHATS: Chat[] = [
  { name: "Nithin Agarwal", last: "Yeah, you will get notification of every update.", when: "3:31 pm", unread: 1 },
  { name: "Vanya Kapoor", last: "Can you send your detailed CV?", when: "11:24 am", unread: 3 },
  { name: "Avinash Banerjee", last: "We can discuss over call.", when: "Yesterday" },
  { name: "Abhishek Tyagi", last: "Sent your profile to the hiring team.", when: "Monday" },
];

const REFERRER_CHATS: Chat[] = [
  { name: "Abhinav Saxena", last: "Sure, can we get on a quick call?", when: "2:30 pm", unread: 2 },
  { name: "Aarush Gupta", last: "Thanks, Nithin.", when: "10:17 am", unread: 3 },
  { name: "Ayesha Sharma", last: "It was great, will let you know updates.", when: "Yesterday", unread: 1 },
  { name: "Himani Kaushik", last: "Okay, I will ping her.", when: "Tuesday" },
];

const isReferrerRole = (r: string | null) => r === "referrer";

export function Messages() {
  const nav = useNav();
  const { role, unread, force } = useStore();
  const [q, setQ] = useState("");
  const base = role === "referrer" ? REFERRER_CHATS : CANDIDATE_CHATS;
  const all = force === "messages.empty" ? [] : base;
  const loading = force === "messages.loading";
  const failed = force === "messages.error";
  const shown = all.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));
  // For the candidate this is a tab root with the big title. The referrer reaches it from their
  // profile, and Figma draws that one as a pushed screen: a small centred title and a back
  // chevron, with no bell.
  const asTab = !isReferrerRole(role);
  return (
    <Screen {...(asTab ? { largeTitle: "Messages", right: <BellButton unread={unread} /> } : { title: "Messages", back: true })}>
      <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Figma drops the search while loading, when empty and on the error */}
        {!loading && !failed && shown.length > 0 && (
          <div className="sd-search">
            <Icon name="magnifyingglass" size={22} style={{ color: "var(--sd-placeholder)" }} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or job…" />
          </div>
        )}
        {loading ? (
          // Figma: one white group holding three skeleton rows, padded 16 left and right
          <div className="sd-list" style={{ padding: "0 16px" }}>
            {[0, 1, 2].map((i) => (
              // Figma's skeleton row is 97 tall: 16 of padding over a 64-tall block
              <div key={i} className="sd-row sd-chatrow" style={{ padding: "16px 0", gap: 12 }}>
                <span className="sd-skel" style={{ width: 56, height: 56, borderRadius: 9999, flex: "0 0 auto" }} />
                <span style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span className="sd-skel" style={{ width: 140, height: 16, borderRadius: 4 }} />
                  <span className="sd-skel" style={{ width: 180, height: 12, borderRadius: 4 }} />
                  <span className="sd-skel" style={{ width: 110, height: 20, borderRadius: 4 }} />
                </span>
              </div>
            ))}
          </div>
        ) : failed ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Note style="failure" icon="info.circle.fill">
              Couldn’t load messages
            </Note>
            <p className="t-label muted">Pull down to try again.</p>
          </div>
        ) : shown.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p className="t-label muted">
              {q ? "Nothing matches that." : "No messages yet. A chat opens when a referrer refers you."}
            </p>
            {!q && <Button onClick={() => nav.reset("tabs", { tab: "requests" })}>See your requests</Button>}
          </div>
        ) : (
          <ListGroup>
            {shown.map((c) => (
              <div
                key={c.name}
                className="sd-row is-tap sd-chatrow"
                onClick={() => nav.push("chat", { who: c.name })}
                role="button"
              >
                <Avatar name={c.name} />
                <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 2 }} className="t-h-sm">
                    {c.name}
                    <Icon name="checkmark.seal.fill" size={16} style={{ color: "var(--sd-text-success)" }} />
                  </span>
                  {/* Figma paints an unread preview in the dark text colour and a read one grey */}
                  <span
                    className={`t-label${c.unread ? "" : " muted"}`}
                    style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    {c.last}
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flex: "0 0 auto" }}>
                  <span className="t-label-sm muted">{c.when}</span>
                  {c.unread && (
                    <span
                      style={{
                        minWidth: 20,
                        height: 20,
                        padding: "0 6px",
                        borderRadius: 10,
                        background: "var(--sd-link)",
                        color: "#fff",
                        fontWeight: 500,
                        fontSize: 12,
                        lineHeight: "20px",
                        textAlign: "center",
                      }}
                    >
                      {c.unread}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </ListGroup>
        )}
      </div>
    </Screen>
  );
}

/* ── Chat ───────────────────────────────────────────────────────────────── */
type Msg = { me: boolean; text: string; at: string };

export function ChatScreen({ who = "Nithin Agarwal" }: { who?: string }) {
  const { role, live } = useStore();
  const isReferrer = role === "referrer";
  const [msgs, setMsgs] = useState<Msg[]>(
    isReferrer
      ? [
          { me: false, text: "Thanks for the referral! Anything I should prepare?", at: "2:10 pm" },
          { me: true, text: "Brush up the checkout case study. They ask about it.", at: "2:18 pm" },
          { me: false, text: "Sure, can we get on a quick call?", at: "2:30 pm" },
        ]
      : [
          { me: true, text: "Thanks for referring me, Nithin!", at: "3:10 pm" },
          { me: false, text: "Happy to help. I’ve submitted it on our portal.", at: "3:20 pm" },
          { me: true, text: "Will I know when it moves?", at: "3:28 pm" },
          { me: false, text: "Yeah, you will get notification of every update.", at: "3:31 pm" },
        ]
  );
  const [draft, setDraft] = useState("");

  const send = () => {
    if (!draft.trim()) return;
    setMsgs((m) => [...m, { me: true, text: draft.trim(), at: "now" }]);
    setDraft("");
  };

  return (
    <>
      <StatusBar />
      <div className="sd-nav-wrap is-scrolled">
        <div className="sd-nav">
          <span className="sd-nav-lead">
            <BackChevron />
          </span>
          <span className="sd-nav-title">{who}</span>
          <span className="sd-nav-trail" />
        </div>
      </div>
      <div className="sd-body">
        <div className="sd-pad" style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* the request this chat is about, drawn with the same ReferralBar as the list */}
          <ReferralBar r={live} />
          {msgs.map((m, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.me ? "flex-end" : "flex-start", gap: 4 }}>
              {/* Figma ChatMessage: padding 8/12, 16px corners with a 4px tail on the side
                  the bubble comes from, Inter Regular 14/20, 280 max. */}
              <span
                style={{
                  maxWidth: 280,
                  padding: "8px 12px",
                  borderRadius: m.me ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background: m.me ? "var(--sd-link)" : "var(--sd-n0)",
                  color: m.me ? "#fff" : "var(--sd-text)",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: "20px",
                }}
              >
                {m.text}
              </span>
              <span className="t-label-sm muted">{m.at}</span>
            </div>
          ))}
        </div>
        <div style={{ height: 16 }} />
      </div>
      {/* Figma ChatComposer: white, a 1px #f0f1f2 rule on top, padding 8/16/40, gap 8,
          a standard 52px field and a 48px round blue send button with a 24px arrow. */}
      <div
        style={{
          flex: "0 0 auto",
          padding: "8px 16px 40px",
          display: "flex",
          gap: 8,
          alignItems: "center",
          background: "var(--sd-n0)",
          boxShadow: "inset 0 1px 0 var(--sd-border-subtle)",
        }}
      >
        <div className="sd-input">
          <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Message" onKeyDown={(e) => e.key === "Enter" && send()} />
        </div>
        <button
          onClick={send}
          aria-label="Send"
          style={{
            width: 48,
            height: 48,
            borderRadius: "var(--sd-r-full)",
            background: draft.trim() ? "var(--sd-link)" : "var(--sd-action-bg-dis)",
            display: "grid",
            placeItems: "center",
            flex: "0 0 auto",
          }}
        >
          <Icon name="arrow.right" size={24} style={{ color: draft.trim() ? "#fff" : "var(--sd-action-fg-dis)" }} />
        </button>
      </div>
    </>
  );
}

function BackChevron() {
  const nav = useNav();
  return (
    <button className="sd-barbtn is-back" onClick={nav.pop} aria-label="Back">
      <Icon name="chevron.left" size={24} />
    </button>
  );
}

/* ── Notifications ──────────────────────────────────────────────────────── */
type Notif = { who: string; text: string; at: string; go: string; unread?: boolean };

const CANDIDATE_NOTIF: Notif[] = [
  { who: "Joy Sehgal", text: "You’re selected at Swiggy. Joy referred you on 2 Aug.", at: "11:11 am", go: "swiggy", unread: true },
  { who: "Nithin Agarwal", text: "Submitted on Flipkart’s portal. Nithin marked it.", at: "10:02 am", go: "flipkart", unread: true },
  { who: "Advika Singh", text: "Advika referred you for Interaction Designer at Google.", at: "Yesterday", go: "google" },
  { who: "Avinash Banerjee", text: "Avinash isn’t moving forward with your PhonePe request.", at: "5 Sep", go: "phonepe" },
];

const REFERRER_NOTIF: Notif[] = [
  { who: "Abhinav Saxena", text: "Abhinav Saxena sent a referral request for Interaction Designer. 4 of 7 skills · 3 yrs.", at: "10:40 am", go: "abhinav", unread: true },
  { who: "Aviral Dixit", text: "Seen it move? You submitted Aviral Dixit 12 days ago.", at: "9:00 am", go: "aviral", unread: true },
  { who: "Arpita Singh", text: "Arpita Singh sent a referral request for Interaction Designer. 4 of 7 skills · 3 yrs.", at: "Yesterday", go: "arpita" },
  { who: "Himani Kaushik", text: "Himani thanked you: “You made the referral easy. I start next month!”", at: "Tuesday", go: "abhinav" },
];

export function Notifications() {
  const nav = useNav();
  const { role, dispatch } = useStore();
  const list = role === "referrer" ? REFERRER_NOTIF : CANDIDATE_NOTIF;
  return (
    <Screen title="Notifications" back onBack={() => { dispatch({ t: "readAll" }); nav.pop(); }}>
      <div style={{ paddingTop: 24 }}>
        <ListGroup>
          {list.map((n) => (
            <div
              key={n.text}
              className="sd-row is-tap sd-notifrow"
              role="button"
              onClick={() => {
                dispatch({ t: "readAll" });
                if (role === "referrer") nav.push("referralRequest", { id: n.go });
                else nav.push("trackDetails", { id: n.go });
              }}
            >
              <Avatar name={n.who} />
              <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
                <span className="t-body">{n.text}</span>
                <span className="t-label-sm muted">{n.at}</span>
              </span>
              {/* Figma marks an unread row with an 8px blue dot level with the first line */}
              {n.unread && (
                <i style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--sd-link)", flex: "0 0 auto" }} />
              )}
            </div>
          ))}
        </ListGroup>
      </div>
    </Screen>
  );
}

/* ── Profile ────────────────────────────────────────────────────────────── */
export function Profile() {
  const nav = useNav();
  const { role, findable, unread, dispatch } = useStore();
  const isReferrer = role === "referrer";
  return (
    <Screen largeTitle="Profile" right={<BellButton unread={unread} />}>
      {/* Figma: the person sits on the grey page (108 tall, 20 above and below), then the
          groups 24 apart, then Log out 24 under the last one */}
      <div style={{ paddingTop: 24, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "20px 0" }}>
          <Avatar name={isReferrer ? "Nithin Agarwal" : "Abhinav Saxena"} size={68} />
          <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }} className="t-h-md">
              {isReferrer ? "Nithin Agarwal" : "Abhinav Saxena"}
              {isReferrer && <Icon name="checkmark.seal.fill" size={20} style={{ color: "var(--sd-text-success)" }} />}
            </span>
            <span className="t-label muted">{isReferrer ? "Design Manager, Flipkart" : "Product Designer, Blinkit"}</span>
          </span>
          <TextButton onClick={() => nav.push(isReferrer ? "editProfileReferrer" : "editDetails")}>Edit</TextButton>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {!isReferrer && (
          // Figma: a 74-tall card, the state tag first, then the label, the switch at the right
          <div className="sd-card" style={{ padding: "12px 16px", minHeight: 74, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
              <Tag style={findable ? "success" : "buffer"} icon="indicator.fill">
                {findable ? "Live" : "Paused"}
              </Tag>
              <span className="t-label" style={{ color: "var(--sd-text)" }}>Let referrers find me</span>
            </span>
            <Switch on={findable} onChange={(v) => dispatch({ t: "findable", v })} />
          </div>
        )}

        <ListGroup>
          {isReferrer ? (
            <>
              <Row icon="square.and.arrow.up.fill" chevron onClick={() => nav.openSheet("shareLink")}>
                Your links to share
              </Row>
              <Row icon="bubble.left.fill" chevron onClick={() => nav.push("messages")}>
                Messages
              </Row>
            </>
          ) : (
            <Row icon="bookmark.fill" chevron onClick={() => nav.push("saved")}>
              Saved jobs
            </Row>
          )}
          <Row
            icon="arrow.left.arrow.right.square.fill"
            chevron
            onClick={() => {
              // switching sides is how you see both happy paths meet
              dispatch({ t: "role", v: isReferrer ? "candidate" : "referrer" });
              nav.reset("tabs");
            }}
          >
            Switch role
          </Row>
          <Row icon="gearshape.fill" chevron onClick={() => nav.push("settings")}>
            Settings
          </Row>
          <Row icon="headphones" chevron onClick={() => nav.push("help")}>
            Help
          </Row>
        </ListGroup>
        </div>

        <div style={{ paddingTop: 24 }}>
          <Button type="destructive" onClick={() => nav.openSheet("logout")}>
            Log out
          </Button>
        </div>
      </div>
    </Screen>
  );
}

/* ── Candidate: edit your details ───────────────────────────────────────── */
export function EditDetails() {
  const nav = useNav();
  const { details, dispatch } = useStore();
  const [linkedin, setLinkedin] = useState("linkedin.com/in/abhinav-saxena");
  const [portfolio, setPortfolio] = useState("dribbble.com/abhinavsaxena");
  const [roles, setRoles] = useState("Product Designer, Interaction Designer");
  const [how, setHow] = useState("Full time · Remote or hybrid");
  // Figma: "Check your details" once it's all filled in — the same resume, experience and
  // projects blocks, then links, what you want, the details portals ask for, and the resume.
  // Portal details show Figma's values until you change them.
  return (
    <Screen title="Edit your details" back actions={<Button onClick={() => nav.pop()}>Save changes</Button>}>
      <div style={{ paddingTop: 32, display: "flex", flexDirection: "column", gap: 24 }}>
        <p className="t-label muted">Every new referral request sends these.</p>

        <Section label="From your resume" icon="person.fill" end={<TextButton>Edit</TextButton>}>
          <Box>
            <DetailField name="Full name" value="Abhinav Saxena" />
            <DetailField name="Email" value="abhinav.saxena@email.com" />
            <DetailField name="Phone" value="+91 98XXX XXX21" />
            <DetailField name="Current city" value="Bengaluru, KA" />
            <DetailField name="Experience" value="3 yrs total · 3 yrs relevant" />
            <DetailField name="Skills" value="Product strategy, Systems thinking, User research, Interaction design, Figma" />
          </Box>
        </Section>

        <Section label="Experience" icon="briefcase.fill" end={<TextButton>Edit</TextButton>}>
          <Box>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <CompanyRow logo="blinkit" role="Product Designer" company="Blinkit" when="Sep 2023–Present" />
              <CompanyRow logo="makemytrip" role="Associate Product Designer" company="MakeMyTrip" when="Jun 2022–Aug 2023" />
            </div>
          </Box>
        </Section>

        <Section label="Projects" icon="folder.fill" end={<TextButton>Edit</TextButton>}>
          <Box>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Project title="Blinkit Merchant App UX Revamp" skills={["Product strategy", "Systems design", "Prototyping", "User research", "Figma"]} />
              <Project title="MakeMyTrip Booking Experience Redesign" skills={["User research", "Interaction design", "Usability testing", "Figma"]} />
            </div>
            <TextButton>Show project details</TextButton>
          </Box>
        </Section>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Field
            label="LinkedIn profile (optional)"
            iconNode={<Image src="/images/sidedoor/linkedin.svg" alt="" width={16} height={16} style={{ width: 16, height: 16 }} unoptimized />}
            value={linkedin}
            onChange={setLinkedin}
          />
          <Field label="Portfolio (optional)" icon="link" value={portfolio} onChange={setPortfolio} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Field label="Roles you want (optional)" icon="briefcase.fill" value={roles} onChange={setRoles} />
          <Field label="How you want to work (optional)" icon="laptopcomputer" value={how} onChange={setHow} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <SectionLabel icon="info.circle.fill">Details portals ask for</SectionLabel>
            <p className="t-label-sm muted">Not usually on a resume, but referrers’ portals ask for them.</p>
          </div>
          <Field label="Date of birth" icon="calendar" value={details.dob || "12 Mar 1999"} readOnly onClick={() => nav.openSheet("dob")} />
          <Field label="Career gaps" icon="briefcase.fill" value={details.gaps || "None"} onChange={(v) => dispatch({ t: "detail", k: "gaps", v })} />
          <Field
            label="Preferred interview locations"
            icon="mappin.and.ellipse"
            value={details.locations || "Bengaluru, Remote"}
            onChange={(v) => dispatch({ t: "detail", k: "locations", v })}
          />
          <Field label="Notice period" icon="hourglass" value={details.notice || "30 days"} onChange={(v) => dispatch({ t: "detail", k: "notice", v })} />
        </div>

        <Section label="Resume" icon="paperclip">
          <Box>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="t-label" style={{ flex: 1 }}>
                Abhinav_Saxena_Resume.pdf
              </span>
              <TextButton>Replace</TextButton>
            </div>
          </Box>
        </Section>
      </div>
    </Screen>
  );
}

export function EditProfileReferrer() {
  const nav = useNav();
  const [role, setRole] = useState("Design Manager");
  const [city, setCity] = useState("Bengaluru, KA");
  return (
    <Screen title="Edit your profile" back actions={<Button onClick={() => nav.pop()}>Save changes</Button>}>
      {/* Figma: intro, then the 68 photo with "Edit" 8 under it, centred, then four fields
          20 apart. The company field leads with the logo. */}
      <div style={{ paddingTop: 32, display: "flex", flexDirection: "column", gap: 24 }}>
        <p className="t-label muted">Candidates see your name, role and company.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          <Avatar name="Nithin Agarwal" size={68} />
          <TextButton>Edit</TextButton>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Field label="Your name" icon="person.fill" value="Nithin Agarwal" />
          <Field
            label="Company"
            icon="building.2.fill"
            value="Flipkart"
            lead={<Image src="/images/sidedoor/flipkart-icon.png" alt="" width={22} height={22} style={{ width: 22, height: 22 }} />}
          />
          <Field label="Your role" icon="briefcase.fill" value={role} onChange={setRole} />
          <Field label="Where you work from" icon="mappin.and.ellipse" value={city} onChange={setCity} />
        </div>
      </div>
    </Screen>
  );
}

/* ── small leaf screens ─────────────────────────────────────────────────── */
export function SavedJobs() {
  const nav = useNav();
  const { saved } = useStore();
  return (
    <Screen title="Saved jobs" back>
      <div style={{ paddingTop: 24 }}>
        {saved.length === 0 ? (
          <Empty icon="bookmark" title="Nothing saved" body="Tap the bookmark on a job to keep it here." />
        ) : (
          <Card onClick={() => nav.push("job", { id: "flipkart" })}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <LogoTile logo="flipkart" alt="Flipkart" size={52} />
              <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                <span className="t-h-sm">Interaction Designer</span>
                <span className="t-label-sm muted">Flipkart · Bengaluru</span>
              </span>
            </div>
          </Card>
        )}
      </div>
    </Screen>
  );
}

export function Settings() {
  const { findable, dispatch } = useStore();
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(false);
  return (
    <Screen title="Settings" back>
      <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
        <Section label="Notifications" icon="bell">
          <ListGroup>
            <Row end={<Switch on={push} onChange={setPush} />}>Push notifications</Row>
            <Row end={<Switch on={email} onChange={setEmail} />}>Email updates</Row>
          </ListGroup>
        </Section>
        <Section label="Who can find you" icon="person.2">
          <ListGroup>
            <Row end={<Switch on={findable} onChange={(v) => dispatch({ t: "findable", v })} />}>Let referrers find me</Row>
          </ListGroup>
        </Section>
        <p className="t-label-sm muted">Sidedoor never contacts your company or HR.</p>
      </div>
    </Screen>
  );
}

export function Help() {
  return (
    <Screen title="Help" back>
      <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
        <ListGroup>
          <Row icon="lightbulb.fill" chevron>
            How referrals work here
          </Row>
          <Row icon="lock.fill" chevron>
            What referrers can see
          </Row>
          <Row icon="envelope.fill" chevron>
            Contact support
          </Row>
        </ListGroup>
      </div>
    </Screen>
  );
}

/* ── The web link page. No app, no tab bar, keeps the logo bar. ─────────── */
export function LinkPage() {
  const nav = useNav();
  const [file, setFile] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  // Figma: the link page is a web page, so its header is 130 tall with no fill — 14 above
  // the status bar, the 48 logo bar, 14 below — and the one action sits 40 off the bottom.
  const page = (body: ReactNode, actions: ReactNode) => (
    <>
      <div style={{ height: 14, flex: "0 0 auto" }} />
      <StatusBar />
      <LogoBar />
      <div className="sd-body">
        <div className="sd-pad" style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Tag>sidedoor.app/r/nithin-agarwal</Tag>
          </div>
          {body}
        </div>
        <div className="sd-actionblock">{actions}</div>
      </div>
    </>
  );

  // Figma "Person": the 44 photo centred against the two lines, name 4 above role + job ID
  const person = (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar name="Nithin Agarwal" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <span className="sd-person-name">
          Nithin Agarwal
          <Icon name="checkmark.seal.fill" size={16} style={{ color: "var(--sd-text-success)" }} />
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Figma: the role fills the row, so the job ID tag sits at the right edge */}
          <span className="sd-person-sub" style={{ flex: 1 }}>Design Manager, Flipkart</span>
          <Tag>Job ID 184223</Tag>
        </span>
      </div>
    </div>
  );

  if (sent)
    return page(
      <>
        {/* Figma "Done": a white r12 card padded 24, its parts 12 apart, with a 40px
            filled check, a Semi Bold 16/24 title and centred 14/20 body copy. */}
        <div
          style={{
            background: "var(--sd-n0)",
            borderRadius: "var(--sd-r-lg)",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Icon name="checkmark.circle.fill" size={40} style={{ color: "var(--sd-link)" }} />
          <h2 className="t-h-sm">Sent to Nithin</h2>
          <p className="t-label muted">
            Nithin gets every detail Flipkart’s portal asks for. We’ll email you when there’s news.
          </p>
        </div>
        {person}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <SectionLabel icon="square.and.arrow.down">Save these details and track this request</SectionLabel>
          <p className="t-label-sm muted">
            See when Nithin refers you and when it’s submitted. Your details stay filled for your next request.
          </p>
        </div>
      </>,
      <Actions>
        <Button onClick={() => nav.reset("login")}>Get the SideDoor app</Button>
        <TextButton onClick={() => setSent(false)}>Not now</TextButton>
      </Actions>
    );

  return page(
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, textAlign: "center" }}>
        <h1 className="t-h-sm">Ask Nithin for a referral</h1>
        <p className="t-label muted">{file ? "Check your details, then send." : "Send a complete request. No app needed."}</p>
      </div>

      {person}

      <Section label="Your resume" icon="paperclip">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <DocUpload what="resume" file={file} onUpload={() => setFile("Arpita_Singh_Resume.pdf")} />
          {!file && (
            <p className="t-label-sm muted">We fill in the details Flipkart’s portal needs. You check them before sending.</p>
          )}
        </div>
      </Section>

      {file && (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {/* Figma: the tag sits right after the label, Edit at the far right */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="person.fill" size={16} style={{ color: "var(--sd-icon-2)" }} />
              <span className="t-h-xs" style={{ width: 130 }}>Your details</span>
              <Tag>Filled from your resume</Tag>
              <span style={{ marginLeft: "auto" }}>
                <TextButton>Edit</TextButton>
              </span>
            </div>
            <Box>
              <DetailField name="Full name" value="Arpita Singh" />
              <DetailField name="Email" value="arpita.singh@email.com" />
              <DetailField name="Phone" value="+91 97XXX XXX48" />
              <DetailField name="Current city" value="Bengaluru" />
              <DetailField name="Experience" value="3 yrs total · 3 yrs relevant" />
              <DetailField name="Notice period" value="60 days" />
              <DetailField name="Career gaps" value="None" />
              <DetailField name="Date of birth" value="4 Jul 1998" />
              <DetailField name="Preferred interview locations" value="Bengaluru, Remote" />
            </Box>
          </div>
          <Field
            label="A short note (optional)"
            icon="quote.bubble.fill"
            value={note}
            onChange={setNote}
            placeholder="One line, e.g. what you worked on"
          />
        </>
      )}
    </>,
    <Button disabled={!file} onClick={() => setSent(true)}>
      Send referral request
    </Button>
  );
}

/**
 * The link page keeps SideDoor's logo bar because it is a web page, not the app.
 */
function LogoBar() {
  return (
    // Figma AppHeader Type=Logo: 48 tall, padding 12/16, no fill, the wordmark centred
    // between two empty 24px slots, and 14 below it.
    <div className="sd-web-bar">
      <span style={{ width: 24, flex: "0 0 auto" }} />
      <Image
        src="/images/sidedoor/sidedoor-word.svg"
        alt="SideDoor"
        width={116}
        height={21}
        style={{ width: 116, height: 21 }}
        unoptimized
      />
      <span style={{ width: 24, flex: "0 0 auto" }} />
    </div>
  );
}

export { SkeletonCard };
