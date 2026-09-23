"use client";
// Screens both roles use, plus the web link page — which is a web page, so it keeps the SideDoor
// logo bar and has no tab bar.
import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import { useNav } from "../nav";
import { STAGE_LABEL, stageTag, useStore } from "../store";
import {
  logoSrc,
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
  allValid,
  showDays,
  showYears,
  useEditable,
  useFilePick,
} from "../ui";
import { BellButton, ReferralBar } from "./candidate";
import { DEMO, JOBS, candidateById, firstName } from "../data";
import { DocUpload, ExperienceBlock, FileBox, ProjectsBlock, ReadingBox, ResumeDetails } from "./onboarding";

/* ── Messages ───────────────────────────────────────────────────────────── */
type Chat = { name: string; last: string; when: string; unread?: number };

const CANDIDATE_CHATS: Chat[] = [
  { name: "Nithin Agarwal", last: "Yeah, you will get notification of every update.", when: "3:31 PM", unread: 1 },
  { name: "Vanya Kapoor", last: "Can you send your detailed CV?", when: "11:24 AM", unread: 3 },
  { name: "Avinash Banerjee", last: "We can discuss over call.", when: "Yesterday" },
  { name: "Abhishek Tyagi", last: "Sent your profile to the hiring team.", when: "Monday" },
];

const REFERRER_CHATS: Chat[] = [
  { name: "Abhinav Saxena", last: "Sure, can we get on a quick call?", when: "2:30 PM", unread: 2 },
  { name: "Aarush Gupta", last: "Thanks, Nithin.", when: "10:17 AM", unread: 3 },
  { name: "Ayesha Sharma", last: "It was great, will let you know updates.", when: "Yesterday", unread: 1 },
  { name: "Himani Kaushik", last: "Okay, I will ping her.", when: "Tuesday" },
];

const isReferrerRole = (r: string | null) => r === "referrer";

export function Messages() {
  const nav = useNav();
  const { role, unread, force, you, dispatch } = useStore();
  const [q, setQ] = useState(force === "messages.search" ? "Rahul" : "");
  // you never have a chat with yourself, and people thank you by your own name
  const base = (role === "referrer" ? REFERRER_CHATS : CANDIDATE_CHATS)
    .filter((c) => c.name !== you.name)
    .map((c) => ({ ...c, last: c.last.replace("Nithin", firstName(you.name)) }));
  const all = force === "messages.empty" ? [] : base;
  const loading = force === "messages.loading";
  const failed = force === "messages.error";
  const shown = all.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));
  // For the candidate this is a tab root with the big title. The referrer reaches it from their
  // profile, and Figma draws that one as a pushed screen: a small centred title and a back
  // chevron, with no bell.
  const asTab = !isReferrerRole(role);
  // Figma drops the search while loading, when empty and on the error; it is kept while a
  // search finds nothing, so it can be cleared.
  const search = !loading && !failed && all.length > 0 && (
    <div className="sd-search">
      <Icon name="magnifyingglass" size={22} style={{ color: "var(--sd-placeholder)" }} />
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or job…" />
    </div>
  );
  return (
    <Screen
      {...(asTab ? { largeTitle: "Messages", right: <BellButton unread={unread} /> } : { title: "Messages", back: true })}
      // the title and the search stay put; only the chats scroll (Devansh, 23 Sep)
      pinned={search || null}
    >
      <div style={{ paddingTop: search ? 0 : 8, display: "flex", flexDirection: "column", gap: 16 }}>
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
          <Empty
            error
            title="Couldn’t load messages"
            body="Check your connection and try again."
            action={<Button type="secondary" onClick={() => dispatch({ t: "force", v: null })}>Try again</Button>}
          />
        ) : shown.length === 0 ? (
          q ? (
            <Empty icon="magnifyingglass" title={`No results for “${q}”`} body="Check the spelling or try a new search." />
          ) : (
            <Empty
              icon="bubble.left.fill"
              title="No messages yet"
              body={asTab ? "A chat opens when a referrer refers you." : "A chat opens when you refer someone."}
              action={
                <Button onClick={() => nav.reset("tabs", { tab: "requests" })}>
                  {asTab ? "See your requests" : "See referral requests"}
                </Button>
              }
            />
          )
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
                  <span style={{ display: "flex", alignItems: "center", gap: 2, minWidth: 0 }} className="t-h-sm">
                    <span className="sd-1line">{c.name}</span>
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
                  <span className="sd-lc-when">{c.when}</span>
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

/** Where each chat starts: the V6 threads for Nithin and Abhinav, and a short one for the rest
 *  that ends on the line the Messages list shows. */
function seed(who: string, isReferrer: boolean): Msg[] {
  if (!isReferrer && who === "Nithin Agarwal")
    return [
      { me: true, text: "Thanks for referring me, Nithin!", at: "3:10 PM" },
      { me: false, text: "Happy to help. I’ve submitted it on our portal.", at: "3:20 PM" },
      { me: true, text: "Will I know when it moves?", at: "3:28 PM" },
      { me: false, text: "Yeah, you will get notification of every update.", at: "3:31 PM" },
    ];
  if (isReferrer && who === "Abhinav Saxena")
    return [
      { me: false, text: "Thanks for the referral! Anything I should prepare?", at: "2:10 PM" },
      { me: true, text: "Brush up the checkout case study. They ask about it.", at: "2:18 PM" },
      { me: false, text: "Sure, can we get on a quick call?", at: "2:30 PM" },
    ];
  const chat = (isReferrer ? REFERRER_CHATS : CANDIDATE_CHATS).find((c) => c.name === who);
  if (!chat) return [];
  return [
    { me: isReferrer, text: isReferrer ? `Hi ${firstName(who)}, I’ve referred you. Let me know if you hear back.` : `Hi ${firstName(who)}, thanks for looking at my request!`, at: "9:40 AM" },
    { me: !isReferrer, text: chat.last, at: /AM|PM/.test(chat.when) ? chat.when : "10:02 AM" },
  ];
}

/** What a tap on the empty composer types, and what the other person says back. */
const REPLY_DRAFT = { candidate: "Thanks! I’ll keep an eye on the app for updates.", referrer: "Sure. Does 5 PM today work for a quick call?" };
const THEIR_REPLY = {
  candidate: ["Sounds good. I’ll update it here as soon as I hear.", "Great, all the best!", "Will do. Ping me if you have questions."],
  referrer: ["Yes, 5 PM works. Thank you!", "Perfect, talk then.", "Thanks so much, really appreciate it."],
};

export function ChatScreen({ who = "Nithin Agarwal" }: { who?: string }) {
  const { role, live, requests } = useStore();
  const isReferrer = role === "referrer";
  const [msgs, setMsgs] = useState<Msg[]>(() => seed(who, isReferrer));
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const replies = useRef(0);
  // the request this chat is about: the candidate's request to this person, or Abhinav's
  const req = isReferrer ? (who === live.candidate ? live : null) : requests.find((r) => r.referrer === who) ?? null;

  const now = () => new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const send = () => {
    if (!draft.trim()) return;
    setMsgs((m) => [...m, { me: true, text: draft.trim(), at: now() }]);
    setDraft("");
    // the other side answers a moment later, as a real chat would
    const pool = THEIR_REPLY[isReferrer ? "referrer" : "candidate"];
    const text = pool[replies.current++ % pool.length];
    window.setTimeout(() => setTyping(true), 700);
    window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { me: false, text, at: now() }]);
    }, 2200);
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
      <div className="sd-body" data-lenis-prevent>
        <div className="sd-pad" style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* the request this chat is about, drawn with the same ReferralBar as the list. Nithin says
              he has submitted it, so the card can't still read Sent or Referred. */}
          {req && <ReferralBar r={req.live && (req.stage === "sent" || req.stage === "referred") ? { ...req, stage: "submitted" } : req} />}
          {msgs.length === 0 && (
            <p className="t-label muted" style={{ textAlign: "center", paddingTop: 24 }}>
              Say hello to {firstName(who)}. Keep it about the job.
            </p>
          )}
          {msgs.map((m, i) => {
            // iOS Messages: no time under each bubble. A small centred time opens the chat and any
            // run of messages that starts 15+ minutes after the last one.
            const prev = msgs[i - 1];
            const head = !prev || mins(m.at) - mins(prev.at) >= 15;
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.me ? "flex-end" : "flex-start", gap: 8 }}>
                {head && <span className="sd-chat-time">Today {m.at}</span>}
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
              </div>
            );
          })}
          {typing && (
            <span className="t-label-sm muted" style={{ paddingLeft: 4 }}>
              {firstName(who)} is typing…
            </span>
          )}
        </div>
        <div style={{ height: 16 }} />
      </div>
      {/* ChatComposer, as iMessage: a white bar with a hairline on top, a grey capsule field, and a
          30 blue circle with an up arrow inside its right end. The arrow is grey until there is text. */}
      <div
        style={{
          flex: "0 0 auto",
          padding: "8px 16px 40px",
          background: "var(--sd-n0)",
          boxShadow: "inset 0 1px 0 var(--sd-border-subtle)",
        }}
      >
        <div className="sd-composer">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            // a tap on the empty box writes a reply, so testers don't have to type
            onFocus={() => !draft && setDraft(REPLY_DRAFT[isReferrer ? "referrer" : "candidate"])}
            placeholder="Message"
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <button onClick={send} aria-label="Send" disabled={!draft.trim()} className="sd-send">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M7 12V2M2.5 6.5L7 2l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

/** "3:10 PM" → minutes since midnight */
function mins(t: string) {
  const [, h, m, ap] = /(\d+):(\d+) (AM|PM)/.exec(t) ?? [, "0", "0", "AM"];
  return ((Number(h) % 12) + (ap === "PM" ? 12 : 0)) * 60 + Number(m);
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
  { who: "Joy Sehgal", text: "You’re selected at Swiggy. Joy referred you on 2 Aug.", at: "11:11 AM", go: "swiggy", unread: true },
  { who: "Nithin Agarwal", text: "Submitted on Flipkart’s portal. Nithin marked it.", at: "10:02 AM", go: "flipkart", unread: true },
  { who: "Advika Singh", text: "Advika referred you for Interaction Designer at Google.", at: "Yesterday", go: "google" },
  { who: "Avinash Banerjee", text: "Avinash isn’t moving forward with your PhonePe request.", at: "5 Sep", go: "phonepe" },
];

const REFERRER_NOTIF: Notif[] = [
  { who: "Abhinav Saxena", text: "Abhinav Saxena sent a referral request for Interaction Designer. 4 of 7 skills · 3 yrs.", at: "10:40 AM", go: "abhinav", unread: true },
  { who: "Aviral Dixit", text: "Seen it move? You submitted Aviral Dixit 12 days ago.", at: "9:00 AM", go: "aviral", unread: true },
  { who: "Arpita Singh", text: "Arpita Singh sent a referral request for Interaction Designer. 4 of 7 skills · 3 yrs.", at: "Yesterday", go: "arpita" },
  { who: "Himani Kaushik", text: "Himani thanked you: “You made the referral easy. I start next month!”", at: "Tuesday", go: "abhinav" },
];

export function Notifications() {
  const nav = useNav();
  const { role, force, you, dispatch } = useStore();
  const list = (force === "notifs.empty" ? [] : role === "referrer" ? REFERRER_NOTIF : CANDIDATE_NOTIF)
    .filter((n) => n.who !== you.name)
    .map((n) => (role === "referrer" ? { ...n, text: n.text.replace("Interaction Designer", you.post.title) } : n));
  return (
    <Screen title="Notifications" back onBack={() => { dispatch({ t: "readAll" }); nav.pop(); }}>
      <div style={{ paddingTop: 24 }}>
        {list.length === 0 ? (
          <Empty
            icon="bell"
            title="No notifications yet"
            body={
              role === "referrer"
                ? "You’ll see new requests and weekly check-ins here."
                : "You’ll see every answer to your requests here."
            }
          />
        ) : (
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
              <span className="t-body" style={{ flex: 1, minWidth: 0 }}>{n.text}</span>
              {/* like Messages: the time top right, the unread mark (an 8px blue dot) under it */}
              <span style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                <span className="sd-lc-when" style={{ lineHeight: "20px" }}>{n.at}</span>
                {n.unread && <i style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--sd-link)" }} />}
              </span>
            </div>
          ))}
        </ListGroup>
        )}
      </div>
    </Screen>
  );
}

/* ── Profile ────────────────────────────────────────────────────────────── */
export function Profile() {
  const nav = useNav();
  const { role, unread, profile, you } = useStore();
  const isReferrer = role === "referrer";
  const me = profile.jobs[0];
  return (
    <Screen largeTitle="Profile" right={<BellButton unread={unread} />}>
      {/* Figma: the person sits on the grey page (108 tall, 20 above and below), then the
          groups 24 apart, then Log out 24 under the last one */}
      <div style={{ paddingTop: 24, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "20px 0" }}>
          {/* one person on both sides: the same name and photo whichever role you're in */}
          <Avatar name={you.name} size={68} />
          <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }} className="t-h-md">
              {isReferrer ? you.name : profile.name}
              {isReferrer && <Icon name="checkmark.seal.fill" size={20} style={{ color: "var(--sd-text-success)" }} />}
            </span>
            <span className="t-label muted">{isReferrer ? `${you.title}, ${you.company}` : me ? `${me.role}, ${me.company}` : "Looking for work"}</span>
          </span>
          <TextButton onClick={() => nav.push(isReferrer ? "editProfileReferrer" : "editDetails")}>Edit</TextButton>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
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
            // switching sides is how you see both happy paths meet; it asks first and says what changes
            onClick={() => nav.openSheet("switchRole")}
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
  const { details, profile, you, dispatch } = useStore();
  const [linkedin, setLinkedin] = useState(profile.linkedin || DEMO.linkedin);
  const [portfolio, setPortfolio] = useState(profile.portfolio || DEMO.portfolio);
  const [roles, setRoles] = useState("Product Designer, Interaction Designer");
  const [how, setHow] = useState("Full time · Remote or hybrid");
  // Portal details start from Figma's values when nothing is saved yet. Copies, so a box can be
  // cleared without snapping back; Save writes them to the store.
  const [gaps, setGaps] = useState(details.gaps || "0");
  const [locations, setLocations] = useState(details.locations || "Bengaluru, Remote");
  const [notice, setNotice] = useState(details.notice || "30");
  const ok = allValid([
    ["linkedin", linkedin],
    ["url", portfolio],
    ["roles", roles],
    ["text", how],
    ["years", gaps, true],
    ["cities", locations, true],
    ["days", notice, true],
  ]);
  const save = () => {
    dispatch({ t: "detail", k: "gaps", v: gaps });
    dispatch({ t: "detail", k: "locations", v: locations });
    dispatch({ t: "detail", k: "notice", v: notice });
    dispatch({ t: "profile", v: { linkedin, portfolio } });
    dispatch({ t: "toast", v: "Saved. New requests send these." });
    window.setTimeout(() => dispatch({ t: "toast", v: null }), 1800);
    nav.pop();
  };
  // Figma: "Check your details" once it's all filled in — the same resume, experience and
  // projects blocks, then links, what you want, the details portals ask for, and the resume.
  // Portal details show Figma's values until you change them.
  return (
    <Screen
      title="Edit your details"
      back
      actions={
        <Button disabled={!ok} onClick={save}>
          Save changes
        </Button>
      }
    >
      <div style={{ paddingTop: 32, display: "flex", flexDirection: "column", gap: 24 }}>
        <p className="t-label muted">Every new referral request sends these.</p>

        <ResumeDetails />
        <ExperienceBlock />
        <ProjectsBlock />

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Field
            label="LinkedIn profile (optional)"
            iconNode={<Image src="/images/sidedoor/linkedin.svg" alt="" width={16} height={16} style={{ width: 16, height: 16 }} unoptimized />}
            value={linkedin}
            onChange={setLinkedin}
            kind="linkedin"
            demo={DEMO.linkedin}
          />
          <Field label="Portfolio (optional)" icon="link" value={portfolio} onChange={setPortfolio} kind="url" demo={DEMO.portfolio} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Field label="Roles you want (optional)" icon="briefcase.fill" value={roles} onChange={setRoles} kind="roles" />
          <Field label="How you want to work (optional)" icon="laptopcomputer" value={how} onChange={setHow} kind="text" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <SectionLabel icon="info.circle.fill">Details portals ask for</SectionLabel>
            <p className="t-label-sm muted">Not usually on a resume, but referrers’ portals ask for them.</p>
          </div>
          <Field label="Date of birth" icon="calendar" value={details.dob || "12 Mar 1999"} readOnly required onClick={() => nav.openSheet("dob")} />
          <Field label="Career gaps, in years" icon="briefcase.fill" value={gaps} onChange={setGaps} kind="years" required placeholder="0 if none, e.g. 1.5" demo={DEMO.gaps} />
          <Field label="Preferred interview locations" icon="mappin.and.ellipse" value={locations} onChange={setLocations} kind="cities" required demo={DEMO.locations} />
          <Field label="Notice period, in days" icon="hourglass" value={notice} onChange={setNotice} kind="days" required placeholder="e.g. 30" demo={DEMO.notice} />
        </div>

        <FileBox label="Resume" name={you.resume} what="resume" />
      </div>
    </Screen>
  );
}

export function EditProfileReferrer() {
  const nav = useNav();
  const { dispatch, you } = useStore();
  const [role, setRole] = useState(you.title);
  const [city, setCity] = useState("Bengaluru, KA");
  const [name, setName] = useState(you.name);
  const photo = useFilePick({ name: "", accept: ".jpg,.jpeg,.png,.heic,.webp", maxMB: 5, what: "photo" });
  const ok = allValid([
    ["name", name, true],
    ["role", role, true],
    ["city", city, true],
  ]);
  return (
    <Screen
      title="Edit your profile"
      back
      actions={
        <Button
          disabled={!ok}
          onClick={() => {
            dispatch({ t: "toast", v: "Profile saved" });
            window.setTimeout(() => dispatch({ t: "toast", v: null }), 1600);
            nav.pop();
          }}
        >
          Save changes
        </Button>
      }
    >
      {/* Figma: intro, then the 68 photo with "Edit" 8 under it, centred, then four fields
          20 apart. The company field leads with the logo. */}
      <div style={{ paddingTop: 32, display: "flex", flexDirection: "column", gap: 24 }}>
        <p className="t-label muted">Candidates see your name, role and company.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          <Avatar name={you.name} size={68} src={photo.url ?? undefined} />
          <TextButton onClick={photo.open}>Edit</TextButton>
          {photo.picker}
          {photo.errorLine}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Field label="Your name" icon="person.fill" value={name} onChange={setName} kind="name" required />
          {/* the company comes from the verified work email, so it can't be typed over */}
          <Field
            label="Company"
            readOnly
            icon="building.2.fill"
            value={you.company}
            lead={
              you.logo === "flipkart" ? (
                <Image src="/images/sidedoor/flipkart-icon.svg" alt="" width={22} height={22} style={{ width: 22, height: 22 }} unoptimized />
              ) : (
                <Image src={logoSrc(you.logo)} alt="" width={22} height={22} style={{ width: 22, height: 22 }} unoptimized />
              )
            }
          />
          <Field label="Your role" icon="briefcase.fill" value={role} onChange={setRole} kind="role" required />
          <Field label="Where you work from" icon="mappin.and.ellipse" value={city} onChange={setCity} kind="city" required />
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
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {JOBS.filter((j) => saved.includes(j.id)).map((j) => (
              <Card key={j.id} onClick={() => nav.push("job", { id: j.id })}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <LogoTile logo={j.logo} alt={j.company} size={52} />
                  <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                    <span className="t-h-sm">{j.title}</span>
                    <span className="t-label-sm muted">{j.company} · {j.cityShort}</span>
                  </span>
                </div>
              </Card>
            ))}
          </div>
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
  const nav = useNav();
  return (
    <Screen title="Help" back>
      <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
        <ListGroup>
          <Row icon="lightbulb.fill" chevron onClick={() => nav.push("helpArticle", { id: "how" })}>
            How referrals work here
          </Row>
          <Row icon="lock.fill" chevron onClick={() => nav.push("helpArticle", { id: "see" })}>
            What referrers can see
          </Row>
          <Row icon="envelope.fill" chevron onClick={() => nav.push("contactSupport")}>
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
  const { force, you } = useStore();
  const who = firstName(you.name);
  const [file, setFile] = useState<string | null>(force === "link.reading" ? "Arpita_Singh_Resume.pdf" : null);
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);
  // Figma "Link Page/Reading": a phone on a slow connection sees the resume being read before
  // the details appear, and Send waits for them
  const [reading, setReading] = useState(force === "link.reading");
  // Arpita's details as read from her resume; Edit lets her fix any line before sending
  const ed = useEditable([
    { name: "Full name", value: "Arpita Singh", kind: "name", required: true },
    { name: "Email", value: "arpita.singh@email.com", kind: "email", required: true },
    { name: "Phone", value: "+91 97654 32148", kind: "phone", required: true },
    { name: "Current city", value: "Bengaluru", kind: "city", required: true },
    { name: "Experience", value: "3 yrs total · 3 yrs relevant", kind: "text", required: true },
    { name: "Notice period, in days", value: "60", kind: "days", required: true },
    { name: "Career gaps, in years", value: "0", kind: "years", required: true },
    { name: "Date of birth", value: "4 Jul 1998", fixed: true },
    { name: "Preferred interview locations", value: "Bengaluru, Remote", kind: "cities", required: true },
  ]);
  const upload = () => {
    setFile("Arpita_Singh_Resume.pdf");
    setReading(true);
    window.setTimeout(() => setReading(false), 1600);
  };

  // Figma: the link page is a web page, so its header is 134 tall with no fill — 16 above
  // the status bar, the 48 logo bar, 16 below — and the one action sits 40 off the bottom.
  const page = (body: ReactNode, actions: ReactNode) => (
    <>
      <div style={{ height: 16, flex: "0 0 auto" }} />
      <StatusBar />
      <LogoBar />
      <div className="sd-body" data-lenis-prevent>
        <div className="sd-pad" style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Tag>sidedoor.app/r/{you.slug}</Tag>
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
      <Avatar name={you.name} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <span className="sd-person-name">
          {you.name}
          <Icon name="checkmark.seal.fill" size={16} style={{ color: "var(--sd-text-success)" }} />
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Figma: the role fills the row, so the job ID tag sits at the right edge */}
          <span className="sd-person-sub" style={{ flex: 1 }}>{you.title}, {you.company}</span>
          <Tag>Job ID {you.post.jobId}</Tag>
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
          <h2 className="t-h-sm">Sent to {who}</h2>
          <p className="t-label muted">
            {who} gets every detail {you.company}’s portal asks for. We’ll email you when there’s news.
          </p>
        </div>
        {person}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <SectionLabel icon="square.and.arrow.down">Save these details and track this request</SectionLabel>
          <p className="t-label-sm muted">
            See when {who} refers you and when it’s submitted. Your details stay filled for your next request.
          </p>
        </div>
      </>,
      <Actions>
        <Button onClick={() => nav.reset("login")}>Get the SideDoor app</Button>
        <TextButton onClick={() => setSent(false)}>Not now</TextButton>
      </Actions>
    );

  // Figma "Job closed" and "Already asked": the same page with nothing to fill — a headline,
  // the person, one note, and the app button pinned to the bottom
  const closed = force === "link.closed";
  const already = force === "link.asked";
  if (closed || already)
    return page(
      <>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, textAlign: "center" }}>
          <h1 className="t-h-sm">{closed ? "This job is closed" : "You’ve already asked for this job"}</h1>
          <p className="t-label muted">
            {closed
              ? `${who} isn’t taking referral requests for it any more.`
              : `${who} has your request. You can track it in the app.`}
          </p>
        </div>
        {person}
        <Note>{closed ? "Nothing to fill. Your details were not saved." : "One request per job, per referrer."}</Note>
      </>,
      <Button onClick={() => nav.reset("login")}>Get the SideDoor app</Button>
    );

  return page(
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, textAlign: "center" }}>
        <h1 className="t-h-sm">Ask {who} for a referral</h1>
        <p className="t-label muted">
          {reading
            ? "Reading your resume. It takes a few seconds."
            : file
              ? "Check your details, then send."
              : "Send a complete request. No app needed."}
        </p>
      </div>

      {person}

      <Section label="Your resume" icon="paperclip">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <DocUpload what="resume" file={file} onUpload={upload} />
          {!file && (
            <p className="t-label-sm muted">We fill in the details {you.company}’s portal needs. You check them before sending.</p>
          )}
        </div>
      </Section>

      {file && (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {/* Figma: the tag sits right after the label, Edit at the far right */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="person.fill" size={16} color="tone" />
              <span className="t-h-xs" style={{ width: 130 }}>Your details</span>
              <Tag>Filled from your resume</Tag>
              <span style={{ marginLeft: "auto" }}>{ed.button}</span>
            </div>
            {reading ? <ReadingBox /> : ed.body}
          </div>
          <Field
            label="A short note (optional)"
            icon="quote.bubble.fill"
            value={note}
            onChange={setNote}
            placeholder="One line, e.g. what you worked on"
            kind="note"
            demo="I led the Myntra design system. Happy to share more."
          />
        </>
      )}
    </>,
    <Button disabled={!file || reading || ed.editing} onClick={() => setSent(true)}>
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
    // between two empty 24px slots, and 16 below it.
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

/* ── Help articles and support ──────────────────────────────────────────── */
const ARTICLES: Record<string, { title: string; parts: { h: string; p: string }[] }> = {
  how: {
    title: "How referrals work here",
    parts: [
      { h: "You ask once", p: "Pick a job with someone who refers, check your details, and send. Your resume and the answers portals ask for go with it." },
      { h: "They decide", p: "The referrer sees how you match and refers you, or says they aren’t moving forward. Either way, you hear back." },
      { h: "You see it move", p: "Once you’re submitted on their portal, the referrer passes on each stage, so your request never goes quiet." },
      { h: "Five a week", p: "You can send five requests a week. It keeps each one worth a referrer’s time." },
    ],
  },
  see: {
    title: "What referrers can see",
    parts: [
      { h: "What you send", p: "Your name, contact details, experience, projects, resume and the portal answers on your request." },
      { h: "How you match", p: "Which of the job’s skills your resume shows, and your years of experience." },
      { h: "What they can’t see", p: "Your other requests, who else you asked, or anything you haven’t sent them." },
    ],
  },
};

export function HelpArticle({ id }: { id: string }) {
  const a = ARTICLES[id] ?? ARTICLES.how;
  return (
    <Screen title={a.title} back>
      <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
        {a.parts.map((x) => (
          <div key={x.h} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span className="t-h-sm">{x.h}</span>
            <p className="t-body muted">{x.p}</p>
          </div>
        ))}
      </div>
    </Screen>
  );
}

/** Contact support: a topic, a message and a reply-to address, all checked before Send. */
export function ContactSupport() {
  const nav = useNav();
  const { dispatch, role, profile, you } = useStore();
  const [email, setEmail] = useState(role === "referrer" ? you.workEmail : profile.email);
  const [msg, setMsg] = useState("");
  const ok = allValid([
    ["email", email, true],
    ["tips", msg, true],
  ]);
  return (
    <Screen
      title="Contact support"
      back
      actions={
        <Button
          disabled={!ok}
          onClick={() => {
            nav.pop();
            dispatch({ t: "toast", v: "Sent. We reply within a day." });
            window.setTimeout(() => dispatch({ t: "toast", v: null }), 2400);
          }}
        >
          Send
        </Button>
      }
    >
      <div style={{ paddingTop: 32, display: "flex", flexDirection: "column", gap: 20 }}>
        <p className="t-label muted">We read every message and reply by email within a day.</p>
        <Field label="Reply to" icon="envelope.fill" value={email} onChange={setEmail} kind="email" required />
        <Field label="What’s happening" icon="quote.bubble.fill" value={msg} onChange={setMsg} kind="tips" required multiline placeholder="e.g. My request to Flipkart still says Sent" demo={DEMO.support} />
      </div>
    </Screen>
  );
}

/** Opening a resume: a full-screen preview, the way iOS Quick Look shows a PDF. */
export function ResumePreview({ file = "Abhinav_Saxena_Resume.pdf", id = "abhinav" }: { file?: string; id?: string }) {
  const { profile } = useStore();
  const c = candidateById(id);
  const me = c.id === "abhinav";
  const jobs = me ? profile.jobs : c.jobs;
  const projects = me ? profile.projects : c.projects;
  return (
    <Screen title={file} back>
      <div style={{ paddingTop: 24 }}>
        <div className="sd-paper">
          <span className="t-h-md">{me ? profile.name : c.name}</span>
          <span className="t-label-sm muted">{c.title} · {c.city}</span>
          <span className="t-label-sm muted">{me ? profile.email : c.email}</span>
          <hr />
          <span className="t-h-xs">Experience</span>
          {jobs.map((j) => (
            <p key={j.role + j.company} className="t-label-sm">{j.role}, {j.company} · {j.when}</p>
          ))}
          {projects.length > 0 && <span className="t-h-xs">Projects</span>}
          {projects.map((p) => (
            <p key={p.title} className="t-label-sm muted">
              <b style={{ color: "var(--sd-text)", fontWeight: 600 }}>{p.title}.</b> {p.detail}
            </p>
          ))}
          <span className="t-h-xs">Skills</span>
          <p className="t-label-sm muted">{me ? profile.skills : Object.keys(c.has).join(", ") || "Visual design, Illustration"}</p>
          <span className="t-h-xs">Education</span>
          <p className="t-label-sm muted">B.Des, Interaction Design · NID Ahmedabad · {2025 - c.years - 1}</p>
        </div>
      </div>
    </Screen>
  );
}

/** A candidate's LinkedIn, Dribbble or Behance: in the real app this opens in the browser, so
 *  the prototype shows a small preview of that page instead of leaving. */
export function ProfileLink({ site = "LinkedIn", name = "Abhinav Saxena" }: { site?: string; name?: string }) {
  const slug = name.toLowerCase().replace(/ /g, site === "LinkedIn" ? "-" : "");
  const url = site === "LinkedIn" ? `linkedin.com/in/${slug}` : `${site.toLowerCase()}.${site === "Behance" ? "net" : "com"}/${slug}`;
  return (
    <Screen title={site} back>
      <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Tag icon="lock.fill">{url}</Tag>
        </div>
        <Card>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
            <Avatar name={name} size={68} />
            <span className="t-h-md">{name}</span>
            <span className="t-label muted">{site === "LinkedIn" ? "Designer · 500+ connections" : `${site} portfolio · 12 shots`}</span>
          </div>
        </Card>
        <p className="t-label-sm muted" style={{ textAlign: "center" }}>
          In the app this opens {site} in your browser.
        </p>
      </div>
    </Screen>
  );
}
