"use client";
// The app. One stack, one registry, and the gesture that makes it feel native: drag from the left
// edge to go back, with the screen underneath sliding out from behind it.
import { useCallback, useRef, useState, type ReactNode } from "react";
import "./app.css";
import { NavProvider, useNav, useNavStack } from "./nav";
import { StoreProvider, useStore } from "./store";
import { HomeIndicator, TabBar, Toast } from "./ui";
import { AddJob, CheckPost, CheckProfile, JobLive, Login, RoleSelection, UploadResume, VerifyEmail } from "./screens/onboarding";
import { CheckRequest, JobDetails, Jobs, RequestList, TrackDetails } from "./screens/candidate";
import { EditPost, ManagePosts, ReferralRequest, ReferralRequests, YourReferrals } from "./screens/referrer";
import {
  ChatScreen,
  EditDetails,
  EditProfileReferrer,
  Help,
  LinkPage,
  Messages,
  Notifications,
  Profile,
  SavedJobs,
  Settings,
} from "./screens/shared";
import { AddResumeSheet, DobSheet, LogoutSheet, NotMovingSheet, SeenItMoveSheet, ShareLinkSheet } from "./screens/sheets";

/* ── the tabs, per role ─────────────────────────────────────────────────── */
const CANDIDATE_TABS = [
  { key: "jobs", label: "Jobs", icon: "briefcase" as const, iconOn: "briefcase.fill" as const },
  { key: "requests", label: "Requests", icon: "tray" as const, iconOn: "tray.fill" as const },
  { key: "messages", label: "Messages", icon: "bubble.left" as const, iconOn: "bubble.left.fill" as const },
  { key: "profile", label: "Profile", icon: "person" as const, iconOn: "person.fill" as const },
];

const REFERRER_TABS = [
  { key: "requests", label: "Requests", icon: "tray" as const, iconOn: "tray.fill" as const },
  { key: "referrals", label: "Referrals", icon: "person.2" as const, iconOn: "person.2.fill" as const },
  { key: "posts", label: "Posts", icon: "square.grid.2x2" as const, iconOn: "square.grid.2x2.fill" as const },
  { key: "profile", label: "Profile", icon: "person" as const, iconOn: "person.fill" as const },
];

/** The four tab roots. Anything deeper is pushed onto the same stack, as iOS does. */
function Tabs({ tab: initial, justSent }: { tab?: string; justSent?: boolean }) {
  const { role, unread } = useStore();
  const tabs = role === "referrer" ? REFERRER_TABS : CANDIDATE_TABS;
  const [picked, setTab] = useState(initial ?? tabs[0].key);
  // switching role changes which tabs exist, so fall back to the first one it has
  const tab = tabs.some((t) => t.key === picked) ? picked : tabs[0].key;

  const body = () => {
    if (role === "referrer") {
      if (tab === "requests") return <ReferralRequests />;
      if (tab === "referrals") return <YourReferrals />;
      if (tab === "posts") return <ManagePosts />;
      return <Profile />;
    }
    if (tab === "jobs") return <Jobs />;
    if (tab === "requests") return <RequestList justSent={justSent} />;
    if (tab === "messages") return <Messages />;
    return <Profile />;
  };

  const withBadge = tabs.map((t) =>
    t.key === "messages" && unread ? { ...t, badge: unread } : t
  );

  return (
    <>
      {body()}
      <TabBar tabs={withBadge} active={tab} onPick={setTab} />
    </>
  );
}

/* ── the registry ───────────────────────────────────────────────────────── */
/* eslint-disable @typescript-eslint/no-explicit-any */
const SCREENS: Record<string, (p: any) => ReactNode> = {
  login: () => <Login />,
  role: () => <RoleSelection />,
  uploadResume: () => <UploadResume />,
  checkProfile: () => <CheckProfile />,
  verifyEmail: () => <VerifyEmail />,
  addJob: () => <AddJob />,
  checkPost: () => <CheckPost />,
  jobLive: () => <JobLive />,
  tabs: (p) => <Tabs {...p} />,
  job: () => <JobDetails />,
  checkRequest: () => <CheckRequest />,
  trackDetails: (p) => <TrackDetails id={p.id} />,
  referralRequest: (p) => <ReferralRequest id={p.id} />,
  yourReferrals: () => <YourReferrals />,
  managePosts: () => <ManagePosts />,
  editPost: (p) => <EditPost title={p.title} />,
  messages: () => <Messages />,
  chat: (p) => <ChatScreen who={p.who} />,
  notifications: () => <Notifications />,
  editDetails: () => <EditDetails />,
  editProfileReferrer: () => <EditProfileReferrer />,
  saved: () => <SavedJobs />,
  settings: () => <Settings />,
  help: () => <Help />,
  linkPage: () => <LinkPage />,
};

const SHEETS: Record<string, (p: any) => ReactNode> = {
  notMoving: (p) => <NotMovingSheet {...p} />,
  seenItMove: (p) => <SeenItMoveSheet {...p} />,
  shareLink: (p) => <ShareLinkSheet {...p} />,
  dob: (p) => <DobSheet {...p} />,
  addResume: (p) => <AddResumeSheet {...p} />,
  logout: () => <LogoutSheet />,
};
/* eslint-enable @typescript-eslint/no-explicit-any */

/* ── the stack, with the edge-swipe back gesture ────────────────────────── */
function Stack() {
  const nav = useNav();
  const { toast } = useStore();
  const [drag, setDrag] = useState<number | null>(null);
  const [settling, setSettling] = useState(false);
  const startX = useRef(0);

  const canSwipe = nav.canGoBack && nav.top.anim === "push";

  const onDown = useCallback(
    (e: React.PointerEvent) => {
      if (!canSwipe) return;
      startX.current = e.clientX;
      setSettling(false);
      setDrag(0);
    },
    [canSwipe]
  );
  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (drag === null) return;
      setDrag(Math.max(0, e.clientX - startX.current));
    },
    [drag]
  );
  const onUp = useCallback(() => {
    if (drag === null) return;
    const far = drag > 120;
    setDrag(null);
    if (far) nav.pop();
    else {
      // let it spring back rather than snapping
      setSettling(true);
      window.setTimeout(() => setSettling(false), 320);
    }
  }, [drag, nav]);

  const count = nav.stack.length;

  return (
    <div className="sd-stack">
      {nav.stack.map((s, i) => {
        const isTop = i === count - 1;
        const under = i === count - 2;
        // the screen you are leaving behind slides and dims; the top one moves with your finger
        let anim: string | undefined;
        if (isTop && s.anim === "push" && drag === null && !settling) anim = "push-in";
        else if (isTop && s.anim === "modal") anim = "modal-in";
        else if (isTop && s.anim === "fade") anim = "fade-in";
        else if (under && nav.top.anim === "push" && drag === null && !settling) anim = "under-in";

        const style: React.CSSProperties = {};
        if (isTop && drag !== null) style.transform = `translateX(${drag}px)`;
        if (under && drag !== null) {
          const p = Math.min(1, drag / 402);
          style.transform = `translateX(${-100 + 100 * p}px)`;
          style.filter = `brightness(${0.92 + 0.08 * p})`;
        }
        if (under && drag === null && !settling && nav.top.anim === "push" && !anim) {
          style.transform = "translateX(-100px)";
          style.filter = "brightness(0.92)";
        }

        const cls = [
          "sd-screen",
          drag !== null ? "is-dragging" : settling ? "is-settling" : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div key={s.id} className={cls} data-anim={anim} style={style} aria-hidden={!isTop}>
            {SCREENS[s.key]?.(s.props ?? {}) ?? null}
          </div>
        );
      })}

      {/* the screen on its way out, so pop animates instead of vanishing */}
      {nav.leaving && (
        <div
          key={`leaving-${nav.leaving.id}`}
          className="sd-screen"
          data-anim={nav.leaving.anim === "modal" ? "modal-out" : nav.leaving.anim === "fade" ? "fade-out" : "push-out"}
          aria-hidden="true"
        >
          {SCREENS[nav.leaving.key]?.(nav.leaving.props ?? {}) ?? null}
        </div>
      )}

      {canSwipe && <div className="sd-edge" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} />}

      {nav.sheet && SHEETS[nav.sheet.key]?.({ ...(nav.sheet.props ?? {}), leaving: nav.sheetLeaving })}

      {toast && <Toast>{toast}</Toast>}
      <HomeIndicator />
    </div>
  );
}

function Inner() {
  const nav = useNavStack("login");
  return (
    <NavProvider value={nav}>
      <Stack />
    </NavProvider>
  );
}

/** The whole app at iPhone 17 size (402 x 874pt). Drop it inside the IPhone mock. */
export default function SidedoorApp() {
  return (
    <div className="sd">
      <StoreProvider>
        <Inner />
      </StoreProvider>
    </div>
  );
}
