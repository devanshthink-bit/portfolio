"use client";
// One store for both sides. You are one person: start as a candidate and you are Abhinav, start as
// a referrer and you are Nithin. "Switch role" in Profile changes what you're doing, never who you
// are (Devansh, 24 Sep), so each side reads your name, company and post from `me`.
import { createContext, useCallback, useContext, useMemo, useReducer, type ReactNode } from "react";
import { fieldError, type FieldKind } from "./rules";
import { ABHINAV_PROFILE, NITHIN_PROFILE, PEOPLE_ME, firstName, jobById, type Me, type Profile } from "./data";

export type Stage = "sent" | "referred" | "submitted" | "interviews" | "onhold" | "selected" | "notselected" | "notmoving" | "noanswer" | "closed" | "withdrawn";

export const STAGE_LABEL: Record<Stage, string> = {
  sent: "Sent",
  referred: "Referred",
  submitted: "Submitted",
  interviews: "In interviews",
  onhold: "On hold",
  selected: "Selected",
  notselected: "Not selected",
  notmoving: "Not moving forward",
  noanswer: "No answer",
  // Figma's Role closed screen labels both the tag and the timeline "Not moving forward"
  closed: "Not moving forward",
  withdrawn: "Withdrawn",
};

/** Tag colour by meaning, not by mood (DESIGN_LANGUAGE: waiting is neither good nor bad). */
export function stageTag(s: Stage): "neutral" | "success" | "buffer" {
  if (s === "submitted" || s === "interviews" || s === "selected" || s === "referred") return "success";
  if (s === "onhold" || s === "noanswer") return "buffer";
  return "neutral";
}

export type Request = {
  id: string;
  /** who the candidate asked */
  referrer: string;
  referrerRole: string;
  company: string;
  logo: string;
  job: string;
  jobId: string;
  stage: Stage;
  updated: string;
  /** the referrer's reason, if they gave one */
  reason?: string;
  /** when the referral itself happened, where Figma names a date rather than the last update */
  since?: string;
  /** shown on the referrer's list */
  candidate?: string;
  candidateRole?: string;
  match?: string;
  /** days since it was submitted, for "Waiting on an update" */
  waitingDays?: number;
  /** only the live one the prototype drives */
  live?: boolean;
};

export type Details = { dob: string; gaps: string; locations: string; notice: string };
/** The rule each portal detail follows. Gaps are stored as years ("0" = none), notice as days. */
export const DETAIL_KINDS: Record<keyof Details, FieldKind> = { dob: "text", gaps: "years", locations: "cities", notice: "days" };

/** Flipkart's request is the live one both sides share; a request for any other job is new. */
export const requestIdFor = (job: string) => (job === "flipkart" ? "flipkart" : `ask-${job}`);

type State = {
  role: "candidate" | "referrer" | null;
  /** who you are, set by the first side you choose and kept when you switch */
  me: Me["id"] | null;
  /** candidate side */
  resume: string | null;
  skippedResume: boolean;
  details: Details;
  note: string;
  requestsLeft: number;
  requests: Request[];
  /** jobs asked about in this session, so each job says "You asked" once it's sent */
  sentJobs: string[];
  /** the candidate's own details: every edit screen and the referrer's view read these */
  profile: Profile;
  saved: string[];
  findable: boolean;
  /** referrer side */
  verified: boolean;
  jobId: string;
  posted: boolean;
  tips: string;
  /** the referrer picks the numbers: fewest years of experience (0 = any) and requests a week */
  rules: { minYears: number; weekly: number };
  /** ids of requests the referrer has dealt with, and how */
  handled: Record<string, { stage: Stage; reason?: string }>;
  invited: string[];
  /** job posts the referrer has paused, and drafts they have posted */
  pausedPosts: string[];
  postedDrafts: string[];
  removedSkills: string[];
  /** transient */
  toast: string | null;
  /**
   * A decision the candidate hasn't been told about yet. The referrer's side changes at once;
   * the candidate's only when the 5 seconds run out, so Undo takes it back for both.
   */
  pending: { msg: string; undo: () => void; commit: () => void } | null;
  /** the phone has no connection (the browser's own offline event, or the Offline state) */
  offline: boolean;
  unread: number;
  /**
   * A state the prototype has been put into on purpose, so the V6 state screens are reachable
   * without waiting for a backend to misbehave. Screens read it; nothing else does.
   */
  force: string | null;
};

const ABHINAV = { candidate: "Abhinav Saxena", candidateRole: "Product Designer, Blinkit", match: "4 of 7 skills · 3 yrs" };

const initial: State = {
  role: null,
  me: null,
  resume: null,
  skippedResume: false,
  details: { dob: "", gaps: "", locations: "", notice: "" },
  note: "",
  // Figma draws "2 of 5"; testers start with all 5 so they can send to several jobs (Devansh, 23 Sep). The state list still opens on Figma's 2.
  requestsLeft: 5,
  // The list on "Your referral requests", exactly as the V6 screen shows it. The Flipkart one is
  // the live request the prototype drives; the rest are history so the list is not a single row.
  requests: [
    { id: "flipkart", referrer: "Nithin Agarwal", referrerRole: "Design Manager, Flipkart", company: "Flipkart", logo: "flipkart", job: "Interaction Designer", jobId: "184223", stage: "sent", updated: "Today", live: true, ...ABHINAV },
    { id: "swiggy", referrer: "Joy Sehgal", referrerRole: "Design Manager, Swiggy", company: "Swiggy", logo: "swiggy", job: "Product Designer-I", jobId: "170884", stage: "selected", updated: "11:11 AM", since: "2 Aug" },
    { id: "google", referrer: "Advika Singh", referrerRole: "Product Designer-II, Google", company: "Google", logo: "google", job: "Interaction Designer", jobId: "G-4471", stage: "referred", updated: "Yesterday" },
    { id: "cred", referrer: "Abhay Verma", referrerRole: "Product Designer-I, CRED", company: "CRED", logo: "cred", job: "Product Designer-II", jobId: "CR-220", stage: "notselected", updated: "Thursday" },
    { id: "razorpay", referrer: "Aviral Dixit", referrerRole: "UX Designer, Razorpay", company: "Razorpay", logo: "razorpay", job: "Design Lead", jobId: "RZP-91", stage: "interviews", updated: "Tuesday" },
    { id: "zepto", referrer: "Shivangi Joshi", referrerRole: "SWE-I, Zepto", company: "Zepto", logo: "zepto", job: "Software Engineer-I", jobId: "ZP-338", stage: "sent", updated: "Monday" },
    { id: "meta", referrer: "Abhishek Tyagi", referrerRole: "Data Scientist, Meta", company: "Meta", logo: "meta", job: "Data Scientist", jobId: "MT-7712", stage: "submitted", updated: "12 Sep", since: "10 Sep" },
    { id: "amazon", referrer: "Rohit Menon", referrerRole: "SDM, Amazon", company: "Amazon", logo: "amazon", job: "Product Manager", jobId: "AMZ-5510", stage: "notselected", updated: "12 Sep" },
    { id: "phonepe", referrer: "Avinash Banerjee", referrerRole: "Design Lead, PhonePe", company: "PhonePe", logo: "phonepe", job: "Sr. Product Designer", jobId: "PP-1183", stage: "notmoving", updated: "5 Sep", reason: "Experience doesn’t match" },
    { id: "groww", referrer: "Kritika Rao", referrerRole: "PM, Groww", company: "Groww", logo: "groww", job: "Associate PM", jobId: "GRW-64", stage: "notselected", updated: "5 Sep" },
  ],
  sentJobs: [],
  profile: ABHINAV_PROFILE,
  saved: [],
  findable: true,
  verified: false,
  jobId: "",
  posted: false,
  tips: "",
  rules: { minYears: 3, weekly: 10 },
  handled: {},
  invited: ["Advika Singh"],
  pausedPosts: ["Software Engineer-I"],
  postedDrafts: [],
  removedSkills: [],
  toast: null,
  pending: null,
  offline: false,
  unread: 2,
  force: null,
};

type Action =
  | { t: "role"; v: "candidate" | "referrer" }
  | { t: "resume"; v: string }
  | { t: "skipResume" }
  | { t: "detail"; k: keyof Details; v: string }
  | { t: "note"; v: string }
  | { t: "send"; job: string }
  | { t: "withdraw"; id: string }
  | { t: "profile"; v: Partial<Profile> }
  | { t: "pausePost"; v: string; on: boolean }
  | { t: "postDraft"; v: string }
  | { t: "save"; v: string }
  | { t: "findable"; v: boolean }
  | { t: "verify" }
  | { t: "jobId"; v: string }
  | { t: "tips"; v: string }
  | { t: "rule"; k: "minYears" | "weekly"; v: number }
  | { t: "post" }
  | { t: "handle"; id: string; stage: Stage; reason?: string }
  | { t: "unhandle"; id: string }
  | { t: "tell"; stage: Stage; reason?: string }
  | { t: "pend"; v: State["pending"] }
  | { t: "offline"; v: boolean }
  | { t: "invite"; v: string }
  | { t: "removeSkill"; v: string }
  | { t: "toast"; v: string | null }
  | { t: "readAll" }
  | { t: "force"; v: string | null }
  | { t: "jump"; role: "candidate" | "referrer"; force: string | null }
  | { t: "reset" };

function reduce(s: State, a: Action): State {
  switch (a.t) {
    case "role": {
      // the first side you choose decides who you are; switching later keeps you
      // Switching into a side you haven't set up: the prototype treats it as done (your resume
      // read, your work email checked, your post live), so the switch lands somewhere useful.
      if (s.me)
        return a.v === "candidate"
          ? { ...s, role: a.v, resume: s.resume ?? PEOPLE_ME[s.me].resume }
          : { ...s, role: a.v, verified: true, posted: true };
      const me = a.v === "referrer" ? "nithin" : "abhinav";
      return { ...s, role: a.v, me, profile: me === "nithin" ? NITHIN_PROFILE : ABHINAV_PROFILE };
    }
    case "resume":
      return { ...s, resume: a.v, skippedResume: false };
    case "skipResume":
      return { ...s, skippedResume: true };
    case "detail":
      return { ...s, details: { ...s.details, [a.k]: a.v } };
    case "note":
      return { ...s, note: a.v };
    case "send": {
      // Flipkart is the live request both sides share; any other job starts a new one at the top
      const j = jobById(a.job);
      const id = requestIdFor(j.id);
      const has = s.requests.some((r) => r.id === id);
      const fresh: Request = {
        id, referrer: j.referrer.name, referrerRole: j.referrer.role, company: j.company, logo: j.logo,
        job: j.title, jobId: j.jobId, stage: "sent", updated: "Just now",
      };
      return {
        ...s,
        requestsLeft: Math.max(0, s.requestsLeft - 1),
        sentJobs: s.sentJobs.includes(j.id) ? s.sentJobs : [...s.sentJobs, j.id],
        requests: has
          ? s.requests.map((r) => (r.id === id ? { ...r, stage: "sent", updated: "Just now" } : r))
          : [fresh, ...s.requests],
        toast: `Request sent to ${firstName(j.referrer.name)}`,
      };
    }
    case "withdraw": {
      // BRIEF, Other routes: "A withdrawn request gives the request back"
      const r = s.requests.find((x) => x.id === a.id);
      const job = r && (r.live ? "flipkart" : r.id.replace(/^ask-/, ""));
      return {
        ...s,
        requestsLeft: Math.min(5, s.requestsLeft + 1),
        sentJobs: s.sentJobs.filter((x) => x !== job),
        requests: s.requests.map((x) => (x.id === a.id ? { ...x, stage: "withdrawn", updated: "Just now" } : x)),
      };
    }
    case "profile":
      return { ...s, profile: { ...s.profile, ...a.v } };
    case "pausePost":
      return { ...s, pausedPosts: a.on ? s.pausedPosts.filter((x) => x !== a.v) : [...s.pausedPosts.filter((x) => x !== a.v), a.v] };
    case "postDraft":
      return { ...s, postedDrafts: [...s.postedDrafts, a.v] };
    case "save":
      return { ...s, saved: s.saved.includes(a.v) ? s.saved.filter((x) => x !== a.v) : [...s.saved, a.v] };
    case "findable":
      return { ...s, findable: a.v };
    case "verify":
      return { ...s, verified: true };
    case "jobId":
      return { ...s, jobId: a.v };
    case "tips":
      return { ...s, tips: a.v };
    case "rule":
      return { ...s, rules: { ...s.rules, [a.k]: a.v } };
    case "post":
      return { ...s, posted: true };
    case "unhandle": {
      const rest = { ...s.handled };
      delete rest[a.id];
      return { ...s, handled: rest };
    }
    case "handle":
      // the referrer's side only; "tell" moves the candidate's timeline once undo has run out
      return { ...s, handled: { ...s.handled, [a.id]: { stage: a.stage, reason: a.reason } } };
    case "tell":
      // the same change reaches the candidate's timeline, which is the whole point of J2
      return {
        ...s,
        requests: s.requests.map((r) =>
          r.live ? { ...r, stage: a.stage, reason: a.reason, updated: "Just now", waitingDays: a.stage === "submitted" ? 0 : r.waitingDays } : r
        ),
      };
    case "pend":
      return { ...s, pending: a.v };
    case "offline":
      return { ...s, offline: a.v };
    case "invite":
      return { ...s, invited: [...s.invited, a.v] };
    // a second tap on a removed skill puts it back ("Tap to undo")
    case "removeSkill":
      return {
        ...s,
        removedSkills: s.removedSkills.includes(a.v) ? s.removedSkills.filter((x) => x !== a.v) : [...s.removedSkills, a.v],
      };
    case "toast":
      return { ...s, toast: a.v };
    case "readAll":
      return { ...s, unread: 0 };
    case "force":
      return { ...s, force: a.v };
    case "jump":
      // start from a clean slate so one state can't leak into the next
      return { ...initial, requestsLeft: 2, role: a.role, me: a.role === "referrer" ? "nithin" : "abhinav",
        profile: a.role === "referrer" ? NITHIN_PROFILE : ABHINAV_PROFILE, force: a.force, offline: a.force === "offline", resume: "Abhinav_Saxena_Resume.pdf", verified: true, jobId: "184223", posted: true,
        // "Skill removed" starts with Prototyping taken off, and can still be undone
        removedSkills: a.force === "req.skill" ? ["abhinav|Prototyping"] : [] };
    case "reset":
      return initial;
    default:
      return s;
  }
}

type Api = State & {
  dispatch: (a: Action) => void;
  /** the live request, the one both sides are looking at */
  live: Request;
  /** the 4 details the portal also asks for; Send waits on these */
  stillNeeded: number;
  /** you: name, company, post and link, the same on both sides */
  you: Me;
};

const Ctx = createContext<Api | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [s, dispatch] = useReducer(reduce, initial);
  const live = useMemo(() => s.requests.find((r) => r.live)!, [s.requests]);
  const stillNeeded = useMemo(
    // a field only counts as in once it passes its rule: letters in the years box don't count
    () => (Object.entries(DETAIL_KINDS) as [keyof Details, FieldKind][]).filter(([k, kind]) => fieldError(kind, s.details[k], true)).length,
    [s.details]
  );
  const you = PEOPLE_ME[s.me ?? (s.role === "referrer" ? "nithin" : "abhinav")];
  const value = useMemo(() => ({ ...s, dispatch, live, stillNeeded, you }), [s, live, stillNeeded, you]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore outside StoreProvider");
  return v;
}

/** A toast that clears itself, so a screen can say "done" without owning a timer. */
export function useToast() {
  const { dispatch } = useStore();
  return useCallback(
    (msg: string) => {
      dispatch({ t: "toast", v: msg });
      window.setTimeout(() => dispatch({ t: "toast", v: null }), 2200);
    },
    [dispatch]
  );
}

/**
 * A decision that tells the candidate: the referrer's side has already changed, and `commit`
 * tells the candidate after 5 seconds unless Undo runs `undo` first. A second decision inside
 * the window commits the first one straight away, so nothing is lost.
 */
export function useDecide() {
  const { pending, dispatch } = useStore();
  return useCallback(
    (msg: string, undo: () => void, commit: () => void) => {
      pending?.commit();
      dispatch({ t: "pend", v: { msg, undo, commit } });
    },
    [pending, dispatch]
  );
}
