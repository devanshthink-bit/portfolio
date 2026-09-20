"use client";
// Screens both roles use, plus the web link page — which is a web page, so it keeps the SideDoor
// logo bar and has no tab bar.
import Image from "next/image";
import { useState } from "react";
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
  LogoTile,
  Row,
  Screen,
  Section,
  SkeletonCard,
  StatusBar,
  Switch,
  Tag,
  TextButton,
} from "../ui";
import { BellButton } from "./candidate";

/* ── Messages ───────────────────────────────────────────────────────────── */
type Chat = { name: string; last: string; when: string; unread?: number };

const CANDIDATE_CHATS: Chat[] = [
  { name: "Nithin Agarwal", last: "Yeah, you will get notification of every update.", when: "3:31 pm", unread: 1 },
  { name: "Vanya Kapoor", last: "Can you send your detailed CV?", when: "11:24 am", unread: 3 },
  { name: "Avinash Banerjee", last: "We can discuss over call.", when: "Yesterday" },
  { name: "Abhishek Tyagi", last: "Sent your profile to the hiring team.", when: "Monday" },
];

const REFERRER_CHATS: Chat[] = [
  { name: "Abhinav Saxena", last: "Thanks for referring me, Nithin!", when: "3:28 pm", unread: 1 },
  { name: "Arpita Singh", last: "I have 3 yrs at Myntra, happy to share more.", when: "Yesterday" },
  { name: "Himani Kaushik", last: "You made the referral easy. I start next month!", when: "Monday" },
];

export function Messages() {
  const nav = useNav();
  const { role, unread, force } = useStore();
  const [q, setQ] = useState("");
  const base = role === "referrer" ? REFERRER_CHATS : CANDIDATE_CHATS;
  const all = force === "messages.empty" ? [] : base;
  const shown = all.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <Screen largeTitle="Messages" right={<BellButton unread={unread} />}>
      <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="sd-search">
          <Icon name="magnifyingglass" size={17} style={{ color: "var(--sd-placeholder)" }} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or job…" />
        </div>
        {shown.length === 0 ? (
          <Empty
            icon="bubble.left"
            title="No messages"
            body={q ? "Nothing matches that." : "Chats start once a referrer replies to a request."}
          />
        ) : (
          <ListGroup>
            {shown.map((c) => (
              <div
                key={c.name}
                className="sd-row is-tap"
                style={{ alignItems: "flex-start", padding: "12px 16px" }}
                onClick={() => nav.push("chat", { who: c.name })}
                role="button"
              >
                <Avatar name={c.name} />
                <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }} className="t-h-sm">
                    {c.name}
                    <Icon name="checkmark.seal.fill" size={14} style={{ color: "var(--sd-link)" }} />
                  </span>
                  <span
                    className="t-body muted"
                    style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    {c.last}
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flex: "0 0 auto" }}>
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
                        fontWeight: 600,
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
          { me: false, text: "Thanks for referring me, Nithin!", at: "3:10 pm" },
          { me: true, text: "Happy to help. I’ve submitted it on our portal.", at: "3:20 pm" },
          { me: false, text: "Will I know when it moves?", at: "3:28 pm" },
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
        <div className="sd-pad" style={{ paddingTop: 12, display: "flex", flexDirection: "column", gap: 12 }}>
          {/* the request this chat is about, so nobody has to remember which one it is */}
          <Card style={{ padding: 12 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <LogoTile logo={live.logo} alt={live.company} size={44} />
              <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }} className="t-h-xs">
                  {live.company}
                  <Icon name="checkmark.seal.fill" size={14} style={{ color: "var(--sd-link)" }} />
                </span>
                <span>
                  <Tag style={stageTag(live.stage)}>{STAGE_LABEL[live.stage]}</Tag>
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Icon name="clock" size={13} style={{ color: "var(--sd-icon-2)" }} />
                <span className="t-label-sm muted">{live.updated}</span>
              </span>
            </div>
          </Card>
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
      <Icon name="chevron.left" size={22} style={{ color: "var(--sd-link)" }} />
    </button>
  );
}

/* ── Notifications ──────────────────────────────────────────────────────── */
const CANDIDATE_NOTIF = [
  { who: "Joy Sengupta", text: "You’re selected at Swiggy. Joy referred you on 2 Aug.", at: "11:11 am", go: "swiggy" },
  { who: "Nithin Agarwal", text: "Submitted on Flipkart’s portal. Nithin marked it.", at: "10:02 am", go: "flipkart" },
  { who: "Advika Singh", text: "Advika referred you for Interaction Designer at Google.", at: "Yesterday", go: "google" },
  { who: "Avinash Banerjee", text: "Avinash isn’t moving forward with your PhonePe request.", at: "5 Sep", go: "phonepe" },
];

const REFERRER_NOTIF = [
  { who: "Abhinav Saxena", text: "Abhinav Saxena asked you for a referral. Everything is filled in.", at: "10:04 am", go: "abhinav" },
  { who: "Arpita Singh", text: "Arpita Singh is in interviews at Flipkart.", at: "Yesterday", go: "arpita" },
  { who: "Aviral Dixit", text: "Aviral Dixit was submitted 12 days ago. Seen it move?", at: "Monday", go: "aviral" },
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
              className="sd-row is-tap"
              style={{ alignItems: "flex-start", padding: "12px 16px" }}
              role="button"
              onClick={() => {
                dispatch({ t: "readAll" });
                if (role === "referrer") nav.push("referralRequest", { id: n.go });
                else nav.push("trackDetails", { id: n.go });
              }}
            >
              <Avatar name={n.who} size={36} />
              <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                <span className="t-body">{n.text}</span>
                <span className="t-label-sm muted">{n.at}</span>
              </span>
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
      <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
        <Card>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Avatar name={isReferrer ? "Nithin Agarwal" : "Abhinav Saxena"} size={68} />
            <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }} className="t-h-md">
                {isReferrer ? "Nithin Agarwal" : "Abhinav Saxena"}
                {isReferrer && <Icon name="checkmark.seal.fill" size={18} style={{ color: "var(--sd-link)" }} />}
              </span>
              <span className="t-label muted">{isReferrer ? "Design Manager, Flipkart" : "Product Designer, Blinkit"}</span>
            </span>
            <TextButton onClick={() => nav.push(isReferrer ? "editProfileReferrer" : "editDetails")}>Edit</TextButton>
          </div>
        </Card>

        {!isReferrer && (
          <ListGroup>
            <Row
              end={
                <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {findable && (
                    <Tag style="success">
                      <i style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--sd-text-success)", display: "inline-block" }} />
                      Live
                    </Tag>
                  )}
                  <Switch on={findable} onChange={(v) => dispatch({ t: "findable", v })} />
                </span>
              }
            >
              Let referrers find me
            </Row>
          </ListGroup>
        )}

        <ListGroup>
          {isReferrer ? (
            <>
              <Row icon="square.and.arrow.up.fill" chevron onClick={() => nav.openSheet("shareLink")}>
                Your links to share
              </Row>
              <Row icon="square.grid.2x2.fill" chevron onClick={() => nav.push("managePosts")}>
                Manage your posts
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

        <Button type="destructive" onClick={() => nav.openSheet("logout")}>
          Log out
        </Button>
      </div>
    </Screen>
  );
}

/* ── Candidate: edit your details ───────────────────────────────────────── */
export function EditDetails() {
  const nav = useNav();
  const { details, dispatch } = useStore();
  const [name, setName] = useState("Abhinav Saxena");
  const [email, setEmail] = useState("abhinav.saxena@email.com");
  const [phone, setPhone] = useState("+91 98XXX XXX21");
  const [city, setCity] = useState("Bengaluru, KA");
  return (
    <Screen title="Edit your details" back actions={<Button onClick={() => nav.pop()}>Save changes</Button>}>
      <div style={{ paddingTop: 32, display: "flex", flexDirection: "column", gap: 24 }}>
        {/* a photo, with "Edit photo" as text under it — no pencil badge (LOG, 20 Sep) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          <Avatar name={name} size={88} />
          <TextButton>Edit photo</TextButton>
        </div>
        <Section label="About you" icon="person.fill">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Field label="Full name" icon="person.fill" value={name} onChange={setName} />
            <Field label="Email" icon="envelope.fill" value={email} onChange={setEmail} />
            <Field label="Phone" value={phone} onChange={setPhone} />
            <Field label="Current city" icon="mappin.and.ellipse" value={city} onChange={setCity} />
          </div>
        </Section>
        <Section label="What portals also ask for" icon="info.circle.fill">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Field
              label="Date of birth"
              icon="calendar"
              value={details.dob}
              placeholder="Select date"
              readOnly
              onClick={() => nav.openSheet("dob")}
              end={<Icon name="calendar" size={18} style={{ color: "var(--sd-icon-2)" }} />}
            />
            <Field label="Notice period" icon="hourglass" value={details.notice} onChange={(v) => dispatch({ t: "detail", k: "notice", v })} placeholder="e.g. 30 days" />
            <Field label="Career gaps" icon="briefcase.fill" value={details.gaps} onChange={(v) => dispatch({ t: "detail", k: "gaps", v })} placeholder="None, or when and why" />
            <Field
              label="Preferred interview locations"
              icon="mappin.and.ellipse"
              value={details.locations}
              onChange={(v) => dispatch({ t: "detail", k: "locations", v })}
              placeholder="e.g. Bengaluru, Remote"
            />
          </div>
        </Section>
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
    <Screen title="Edit profile" back actions={<Button onClick={() => nav.pop()}>Save changes</Button>}>
      <div style={{ paddingTop: 32, display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          <Avatar name="Nithin Agarwal" size={88} />
          <TextButton>Edit photo</TextButton>
        </div>
        <Section label="Where you work" icon="briefcase.fill">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Field label="Your name" icon="person.fill" value="Nithin Agarwal" />
            <Field label="Your role" icon="briefcase.fill" value={role} onChange={setRole} />
            <Field label="Where you work from" icon="mappin.and.ellipse" value={city} onChange={setCity} />
          </div>
        </Section>
        <Section label="Work email" icon="envelope.fill">
          <Box>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="t-label" style={{ flex: 1 }}>
                nithin.agarwal@flipkart.com
              </span>
              <Tag style="success" icon="checkmark.seal.fill">
                Verified
              </Tag>
            </div>
          </Box>
        </Section>
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

  if (sent)
    return (
      <>
        <StatusBar />
        <LogoBar />
        <div className="sd-body">
          <div className="sd-pad" style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Tag>sidedoor.app/r/nithin-agarwal</Tag>
            </div>
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
            <Button onClick={() => nav.reset("login")}>Get the app to follow it</Button>
            <div style={{ textAlign: "center" }}>
              <TextButton onClick={() => setSent(false)}>Send another</TextButton>
            </div>
          </div>
        </div>
      </>
    );

  return (
    <>
      <StatusBar />
      <LogoBar />
      <div className="sd-body">
        <div className="sd-pad" style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Tag>sidedoor.app/r/nithin-agarwal</Tag>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <h1 className="t-h-md">Ask Nithin for a referral</h1>
            <p className="t-label muted">Check your details, then send.</p>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <Avatar name="Nithin Agarwal" />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
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

          <Section label="Your resume" icon="paperclip">
            {file ? (
              <Card>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <Image src="/images/sidedoor/doc-icon.png" alt="" width={32} height={37} style={{ width: 32, height: "auto" }} />
                  <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                    <span className="t-h-xs" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      Uploaded
                      <Icon name="checkmark" size={14} style={{ color: "var(--sd-text-success)" }} />
                    </span>
                    <span className="t-label-sm muted">{file} · PDF · 212 KB</span>
                  </span>
                  <TextButton onClick={() => setFile(null)}>Replace</TextButton>
                </div>
              </Card>
            ) : (
              <Card>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                  <Image src="/images/sidedoor/doc-icon.png" alt="" width={44} height={51} style={{ width: 44, height: "auto" }} />
                  <Button type="secondary" onClick={() => setFile("Arpita_Singh_Resume.pdf")}>
                    Upload your resume
                  </Button>
                  <p className="t-label-sm muted">PDF, DOCX or TXT · up to 10 MB</p>
                </div>
              </Card>
            )}
          </Section>

          {file && (
            <Section label="Your details" icon="person.fill" end={<TextButton>Edit</TextButton>}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Tag>Filled from your resume</Tag>
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
            </Section>
          )}

          <Section label="A short note (optional)" icon="quote.bubble.fill">
            <Field value={note} onChange={setNote} placeholder="One line, e.g. what you worked on" multiline />
          </Section>

          <Actions>
            <Button disabled={!file} onClick={() => setSent(true)}>
              Send referral request
            </Button>
          </Actions>
          <div style={{ height: 24 }} />
        </div>
      </div>
    </>
  );
}

/**
 * The link page keeps SideDoor's logo bar because it is a web page, not the app. When it is
 * opened from inside the app to preview it, the bar also carries a way back out.
 */
function LogoBar() {
  const nav = useNav();
  // when it was opened from inside the app there has to be a way back out of it
  const preview = nav.canGoBack;
  return (
    // Figma AppHeader Type=Logo: 48 tall, padding 12/16, the wordmark centred between two
    // 24px slots. The page URL is a centred tag in the body, not part of this bar.
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
      <span style={{ width: 24, flex: "0 0 auto", display: "flex", justifyContent: "flex-end" }}>
        {preview && (
          <button onClick={nav.pop} aria-label="Close preview" style={{ display: "grid", placeItems: "center" }}>
            <Icon name="xmark.circle.fill" size={24} style={{ color: "var(--sd-icon-2)" }} />
          </button>
        )}
      </span>
    </div>
  );
}

export { SkeletonCard };
