"use client";
// The app. One stack, one registry, and the gesture that makes it feel native: drag from the left
// edge to go back, with the screen underneath sliding out from behind it.
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
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
  HelpArticle,
  ContactSupport,
  ResumePreview,
  ProfileLink,
  Messages,
  Notifications,
  Profile,
  SavedJobs,
  Settings,
} from "./screens/shared";
import { AddResumeSheet, DobSheet, InviteAlert, LogoutSheet, NotMovingSheet, SeenItMoveSheet, ShareLinkSheet, SwitchRoleAlert, WithdrawAlert } from "./screens/sheets";
import { SCENARIOS } from "./scenarios";

/**
 * Figma keeps the tab bar on 57 of its 80 screens — it stays put when you push into a job, a
 * request or a track detail, and only disappears on login and onboarding, the two chat screens,
 * the three edit screens and the link page. So the bar lives above the stack rather than inside
 * the tab root, and these are the screens that hide it.
 */
const SCREENS_WITHOUT_TABS = new Set([
  "login", "role", "uploadResume", "checkProfile", "verifyEmail", "addJob", "checkPost",
  "jobLive", "chat", "editDetails", "editProfileReferrer", "editPost", "linkPage",
]);

/**
 * Which tab is showing. The stack owns it, because the bar is drawn above the stack and because
 * a screen on its way out renders a second copy of the tab root — anything kept in the root
 * itself gets clobbered by that copy when it unmounts.
 */
/** How dark the screen underneath goes during a push. iOS dims it, it does not fade it out. */
const UNDER_DIM = 0.08;

const TabCtx = createContext<{ tab: string; pick: (k: string) => void }>({ tab: "", pick: () => {} });

/* ── the tabs, per role ─────────────────────────────────────────────────── */
const CANDIDATE_TABS = [
  // Figma's TabBar (V6): Jobs is the grid, Requests the paper plane (the requests you sent)
  { key: "jobs", label: "Jobs", icon: "square.grid.2x2" as const, iconOn: "square.grid.2x2.fill" as const },
  { key: "requests", label: "Requests", icon: "paperplane" as const, iconOn: "paperplane.fill" as const },
  { key: "messages", label: "Messages", icon: "bubble.left" as const, iconOn: "bubble.left.fill" as const },
  { key: "profile", label: "Profile", icon: "person" as const, iconOn: "person.fill" as const },
];

const REFERRER_TABS = [
  { key: "requests", label: "Requests", icon: "tray" as const, iconOn: "tray.fill" as const },
  { key: "referrals", label: "Referrals", icon: "person.2" as const, iconOn: "person.2.fill" as const },
  // Figma: Posts is the briefcase (job posts); Requests stays the tray (an inbox)
  { key: "posts", label: "Posts", icon: "briefcase" as const, iconOn: "briefcase.fill" as const },
  { key: "profile", label: "Profile", icon: "person" as const, iconOn: "person.fill" as const },
];

/** The four tab roots. Anything deeper is pushed onto the same stack, as iOS does. */
function Tabs({ tab: initial, justSent }: { tab?: string; justSent?: boolean | string }) {
  const { role } = useStore();
  const tabs = role === "referrer" ? REFERRER_TABS : CANDIDATE_TABS;
  const { tab: picked, pick } = useContext(TabCtx);
  // switching role changes which tabs exist, so fall back to the first one it has
  const tab = tabs.some((t) => t.key === picked) ? picked : tabs[0].key;
  // land on the tab the scenario asked for, once
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    pick(initial && tabs.some((t) => t.key === initial) ? initial : tabs[0].key);
  }, [initial, tabs, pick]);

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

  return <>{body()}</>;
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
  checkPost: (p) => <CheckPost title={p.title} />,
  jobLive: (p) => <JobLive title={p.title} />,
  tabs: (p) => <Tabs {...p} />,
  job: (p) => <JobDetails id={p.id} />,
  checkRequest: (p) => <CheckRequest id={p.id} />,
  trackDetails: (p) => <TrackDetails id={p.id} stage={p.stage} updated={p.updated} />,
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
  helpArticle: (p) => <HelpArticle id={p.id} />,
  contactSupport: () => <ContactSupport />,
  resume: (p) => <ResumePreview file={p.file} id={p.id} />,
  profileLink: (p) => <ProfileLink site={p.site} name={p.name} />,
};

const SHEETS: Record<string, (p: any) => ReactNode> = {
  notMoving: (p) => <NotMovingSheet {...p} />,
  seenItMove: (p) => <SeenItMoveSheet {...p} />,
  shareLink: (p) => <ShareLinkSheet {...p} />,
  dob: (p) => <DobSheet {...p} />,
  addResume: (p) => <AddResumeSheet {...p} />,
  logout: () => <LogoutSheet />,
  invite: (p) => <InviteAlert {...p} />,
  switchRole: (p) => <SwitchRoleAlert {...p} />,
  withdraw: (p) => <WithdrawAlert {...p} />,
};
/* eslint-enable @typescript-eslint/no-explicit-any */

/* ── usability-test hint ────────────────────────────────────────────────── */
/** Anything a tap is meant for. A tap on none of these is a tap on nothing. */
const TAPPABLE =
  'button:not(:disabled), a[href], input:not([readonly]), textarea:not([readonly]), select, label, [role="button"], [role="menuitemradio"], .sd-input, .sd-scrim, .sd-edge, .sd-composer';

/**
 * Where to tap next on the screen in front: empty required fields first (the button waits on
 * them), then the main button, then the first card that opens something, then any other action.
 */
function nextTargets(root: HTMLElement): HTMLElement[] {
  const scope =
    root.querySelector<HTMLElement>(".sd-alert, .sd-actionsheet, .sd-sheet:not(.is-out)") ??
    [...root.querySelectorAll<HTMLElement>(".sd-screen")].filter((el) => el.getAttribute("aria-hidden") !== "true").pop() ??
    root;
  const seen = (el: HTMLElement) => el.offsetParent !== null || el.getClientRects().length > 0;
  const empty = [...scope.querySelectorAll<HTMLElement>(".sd-input[data-required]")].filter(
    (box) => !(box.querySelector("input, textarea") as HTMLInputElement | null)?.value
  );
  if (empty.length) return empty;
  const pick = (sel: string) => [...scope.querySelectorAll<HTMLElement>(sel)].filter(seen)[0];
  const one =
    pick(".sd-btn.primary:not(:disabled), .sd-alert-btn.is-default, .sd-as-btn") ??
    pick('.sd-card[role="button"], .sd-row.is-tap, .sd-chatrow') ??
    pick(".sd-btn:not(:disabled)") ??
    // Edit and Done are optional, so they are never the thing to tap next
    [...scope.querySelectorAll<HTMLElement>(".sd-textbtn:not(:disabled)")].filter(
      (el) => seen(el) && !/^(Edit|Done)$/.test(el.textContent?.trim() ?? "")
    )[0];
  return one ? [one] : [];
}

function useHint(ref: React.RefObject<HTMLDivElement | null>) {
  const down = useRef<{ x: number; y: number } | null>(null);
  const timer = useRef(0);
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    down.current = { x: e.clientX, y: e.clientY };
  }, []);
  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      const d = down.current;
      down.current = null;
      // a scroll or a swipe is not a tap
      if (!d || Math.hypot(e.clientX - d.x, e.clientY - d.y) > 8) return;
      if ((e.target as HTMLElement).closest(TAPPABLE)) return;
      const root = ref.current;
      if (!root) return;
      root.querySelectorAll(".sd-hint").forEach((el) => el.classList.remove("sd-hint"));
      const els = nextTargets(root);
      if (!els.length) return;
      // restart the animation even if the same thing is ringed twice in a row
      void root.offsetWidth;
      els.forEach((el) => el.classList.add("sd-hint"));
      els[0].scrollIntoView({ block: "nearest", behavior: "smooth" });
      clearTimeout(timer.current);
      timer.current = window.setTimeout(() => els.forEach((el) => el.classList.remove("sd-hint")), 2800);
    },
    [ref]
  );
  return { onPointerDownCapture: onPointerDown, onPointerUpCapture: onPointerUp };
}

/* ── the stack, with the edge-swipe back gesture ────────────────────────── */
function Stack() {
  const nav = useNav();
  const { toast, role, unread, pending, dispatch } = useStore();
  // a decision waits 5 seconds before the candidate is told; Undo in the toast takes it back
  useEffect(() => {
    if (!pending) return;
    const t = window.setTimeout(() => {
      pending.commit();
      dispatch({ t: "pend", v: null });
    }, 5000);
    return () => clearTimeout(t);
  }, [pending, dispatch]);
  // the phone's own connection: the browser says when it goes and comes back
  useEffect(() => {
    const on = () => dispatch({ t: "offline", v: false });
    const off = () => dispatch({ t: "offline", v: true });
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, [dispatch]);
  const [tab, setTab] = useState("");
  const tabCtx = useRef({ tab: "", pick: (k: string) => setTab(k) });
  // a plain object so the provider value never changes identity; the tab is read through it
  tabCtx.current = { tab, pick: (k: string) => setTab(k) };
  const [drag, setDrag] = useState<number | null>(null);
  const [settling, setSettling] = useState(false);
  const startX = useRef(0);
  // how far the finger has travelled, kept in a ref as well: pointerup can arrive before React
  // has re-rendered, and the decision to go back must not read a stale value
  const dragX = useRef<number | null>(null);

  const canSwipe = nav.canGoBack && nav.top.anim === "push";

  const onDown = useCallback(
    (e: React.PointerEvent) => {
      if (!canSwipe) return;
      // capture, so the rest of the gesture — and the click that ends it — stay on the edge
      // strip instead of landing on whatever is under the finger when it lifts
      try {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      } catch {
        // no active pointer (some synthetic events): the gesture still works without capture
      }
      startX.current = e.clientX;
      dragX.current = 0;
      setSettling(false);
      setDrag(0);
    },
    [canSwipe]
  );
  const onMove = useCallback((e: React.PointerEvent) => {
    if (dragX.current === null) return;
    const dx = Math.max(0, e.clientX - startX.current);
    dragX.current = dx;
    setDrag(dx);
  }, []);
  const onUp = useCallback(() => {
    if (dragX.current === null) return;
    const far = dragX.current > 120;
    dragX.current = null;
    setDrag(null);
    if (far) nav.pop();
    else {
      // let it spring back rather than snapping
      setSettling(true);
      window.setTimeout(() => setSettling(false), 320);
    }
  }, [nav]);

  // Where each screen was scrolled to, so the copy that slides away on a pop looks like the
  // screen you were just on rather than a fresh one scrolled to the top.
  // Keyed by route name, not by the stack id: the id counter runs on both the server and the
  // client and they disagree, which put a different number in the HTML on each side.
  const scrollAt = useRef<Record<string, number>>({});
  const rememberScroll = useCallback((e: React.UIEvent) => {
    const el = e.target as HTMLElement;
    if (!el.classList?.contains("sd-body")) return;
    const key = el.closest("[data-screen]")?.getAttribute("data-screen");
    if (key) scrollAt.current[key] = el.scrollTop;
  }, []);
  const restoreScroll = useCallback((el: HTMLDivElement | null, key: string) => {
    if (!el) return;
    const y = scrollAt.current[key];
    const body = el.querySelector(".sd-body");
    if (y && body) body.scrollTop = y;
  }, []);

  const count = nav.stack.length;
  const stackRef = useRef<HTMLDivElement>(null);
  const hint = useHint(stackRef);

  return (
    <TabCtx.Provider value={tabCtx.current}>
    <div className="sd-stack" onScrollCapture={rememberScroll} ref={stackRef} {...hint}>
      {nav.stack.map((s, i) => {
        const isTop = i === count - 1;
        const under = i === count - 2;
        // Going back is not an entrance. A screen's own `anim` says how it first arrived, so the
        // screen a pop reveals plays `under-out` — the exact reverse of the slide-and-dim it did
        // on the way in — in step with the one sliding off. Replaying its entrance here is what
        // made back look like two screens splitting apart.
        const popping = nav.dir === "pop";
        const free = drag === null && !settling;
        let anim: string | undefined;
        if (isTop) {
          if (popping) anim = nav.poppedAnim === "push" && free ? "under-out" : undefined;
          else if (s.anim === "push" && free) anim = "push-in";
          else if (s.anim === "modal") anim = "modal-in";
          else if (s.anim === "fade") anim = "fade-in";
          else if (s.anim === "welcome") anim = "welcome-in";
        } else if (under && !popping && nav.top.anim === "push" && free) {
          anim = "under-in";
        }

        // the dim is a custom property, which React's CSSProperties does not model
        const style: React.CSSProperties & Record<"--sd-dim", string | undefined> = {
          "--sd-dim": undefined,
        };
        if (isTop && drag !== null) style.transform = `translateX(${drag}px)`;
        if (under && drag !== null) {
          const p = Math.min(1, drag / 402);
          style.transform = `translateX(${-30 + 30 * p}%)`;
          style["--sd-dim"] = `${UNDER_DIM * (1 - p)}`;
        }
        if (under && free && nav.top.anim === "push" && !anim) {
          style.transform = "translateX(-30%)";
          style["--sd-dim"] = `${UNDER_DIM}`;
        }

        const cls = [
          "sd-screen",
          drag !== null ? "is-dragging" : settling ? "is-settling" : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div
            key={s.id}
            data-screen={s.key}
            className={cls + (SCREENS_WITHOUT_TABS.has(s.key) ? "" : " has-tabs")}
            data-anim={anim}
            style={style}
            aria-hidden={!isTop}
          >
            {SCREENS[s.key]?.(s.props ?? {}) ?? null}
          </div>
        );
      })}

      {/* the screen on its way out, so pop animates instead of vanishing */}
      {nav.leaving && (
        <div
          key={`leaving-${nav.leaving.id}`}
          // It mounts fresh, so without this it slid away as a different shape, scrolled back to
          // the top: no tab padding, and none of the scrolling you had done on it.
          ref={(el) => restoreScroll(el, nav.leaving!.key)}
          className={"sd-screen" + (SCREENS_WITHOUT_TABS.has(nav.leaving.key) ? "" : " has-tabs")}
          // stepping into the app from onboarding is forward, not back: the last onboarding screen fades
          data-anim={nav.dir === "replace" && nav.top.anim === "welcome" ? "fade-out" : nav.leaving.anim === "modal" ? "modal-out" : nav.leaving.anim === "fade" ? "fade-out" : "push-out"}
          aria-hidden="true"
        >
          {/* the copy on its way out mounts fresh, so it must not pick a tab: it would run after
              the new screen and put the bar back on the old tab */}
          <TabCtx.Provider value={{ tab: (nav.leaving.props?.tab as string) ?? tab, pick: () => {} }}>
            {SCREENS[nav.leaving.key]?.(nav.leaving.props ?? {}) ?? null}
          </TabCtx.Provider>
        </div>
      )}

      {canSwipe && (
        <div
          className="sd-edge"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onClick={(e) => e.stopPropagation()}
        />
      )}

      {nav.sheet && SHEETS[nav.sheet.key]?.({ ...(nav.sheet.props ?? {}), leaving: nav.sheetLeaving })}

      {/* the bar sits above the whole stack, so it stays put while a screen pushes over */}
      {!SCREENS_WITHOUT_TABS.has(nav.top.key) && (
        <TabBar
          // only on the way in from onboarding, not when coming back from a pushed screen
          arriving={nav.top.anim === "welcome" && nav.dir !== "pop"}
          tabs={(role === "referrer" ? REFERRER_TABS : CANDIDATE_TABS).map((t) =>
            t.key === "messages" && unread ? { ...t, badge: unread } : t
          )}
          active={tab}
          onPick={(k) => {
            // on a tab root, switch in place; deeper in, come back to the root on that tab
            if (nav.top.key === "tabs") setTab(k);
            else nav.reset("tabs", { tab: k });
          }}
        />
      )}

      {pending ? (
        <Toast
          action={
            <button
              className="t-label link sd-hit44"
              onClick={() => {
                pending.undo();
                dispatch({ t: "pend", v: null });
              }}
            >
              Undo
            </button>
          }
        >
          {pending.msg}
        </Toast>
      ) : (
        toast && <Toast>{toast}</Toast>
      )}
      <HomeIndicator />
    </div>
    </TabCtx.Provider>
  );
}

/**
 * Puts the app into one of the V6 states. Nothing here fakes a screen: it sets the store the way
 * the app would have set it, then navigates to where that state shows.
 */
function Jump({ spec }: { spec?: { id: string; n: number } }) {
  const nav = useNav();
  const { dispatch } = useStore();
  const last = useRef(0);
  useEffect(() => {
    if (!spec || spec.n === last.current) return;
    last.current = spec.n;
    const sc = SCENARIOS.find((s) => s.id === spec.id);
    if (!sc) return;
    if (sc.id === "start" || sc.id === "login.cancelled") {
      dispatch({ t: "reset" });
      if (sc.force) dispatch({ t: "force", v: sc.force });
      nav.reset("login");
      return;
    }
    dispatch({ t: "jump", role: sc.role, force: sc.force ?? null });
    nav.reset("tabs", { tab: sc.tab });
    sc.push?.forEach((p) => nav.push(p.key, p.props));
    if (sc.sheet) nav.openSheet(sc.sheet.key, sc.sheet.props);
  }, [spec, nav, dispatch]);
  return null;
}

function Inner({ jump }: { jump?: { id: string; n: number } }) {
  const nav = useNavStack("login");
  return (
    <NavProvider value={nav}>
      <Jump spec={jump} />
      <Stack />
    </NavProvider>
  );
}

/**
 * The whole app at iPhone 17 size (402 x 874pt). Drop it inside the IPhone mock.
 * `jump` puts it into a named state from scenarios.ts; bump `n` to re-run the same one.
 */
export default function SidedoorApp({ jump }: { jump?: { id: string; n: number } }) {
  return (
    <div className="sd">
      <StoreProvider>
        <Inner jump={jump} />
      </StoreProvider>
    </div>
  );
}
