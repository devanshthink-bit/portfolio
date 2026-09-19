"use client";
// One store for both sides. The request the candidate sends is the same object the referrer acts
// on, so "Switch role" in Profile lets you send as Abhinav, refer as Nithin, then switch back and
// watch the timeline move. That is what makes this a working prototype and not a click-through.
import { createContext, useCallback, useContext, useMemo, useReducer, type ReactNode } from "react";

export type Stage = "sent" | "referred" | "submitted" | "interviews" | "onhold" | "selected" | "notselected" | "notmoving" | "noanswer" | "closed";

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
  closed: "Role closed",
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

type State = {
  role: "candidate" | "referrer" | null;
  /** candidate side */
  resume: string | null;
  skippedResume: boolean;
  details: Details;
  note: string;
  requestsLeft: number;
  requests: Request[];
  saved: string[];
  findable: boolean;
  /** referrer side */
  verified: boolean;
  jobId: string;
  posted: boolean;
  tips: string;
  rules: { experience: boolean; weekly: boolean };
  /** ids of requests the referrer has dealt with, and how */
  handled: Record<string, { stage: Stage; reason?: string }>;
  invited: string[];
  removedSkills: string[];
  /** transient */
  toast: string | null;
  unread: number;
};

const ABHINAV = { candidate: "Abhinav Saxena", candidateRole: "Product Designer, Blinkit", match: "4 of 7 skills · 3 yrs" };

const initial: State = {
  role: null,
  resume: null,
  skippedResume: false,
  details: { dob: "", gaps: "", locations: "", notice: "" },
  note: "",
  requestsLeft: 2,
  // The list on "Your referral requests", exactly as the V6 screen shows it. The Flipkart one is
  // the live request the prototype drives; the rest are history so the list is not a single row.
  requests: [
    { id: "flipkart", referrer: "Nithin Agarwal", referrerRole: "Design Manager, Flipkart", company: "Flipkart", logo: "flipkart", job: "Interaction Designer", jobId: "184223", stage: "sent", updated: "Today", live: true, ...ABHINAV },
    { id: "swiggy", referrer: "Joy Sengupta", referrerRole: "SDE-3, Swiggy", company: "Swiggy", logo: "swiggy", job: "Software Engineer-II", jobId: "170884", stage: "selected", updated: "11:11 am" },
    { id: "google", referrer: "Advika Singh", referrerRole: "UX Designer, Google", company: "Google", logo: "google", job: "Interaction Designer", jobId: "G-4471", stage: "referred", updated: "Yesterday" },
    { id: "cred", referrer: "Shreya Verma", referrerRole: "UX Designer, CRED", company: "CRED", logo: "cred", job: "Product Designer", jobId: "CR-220", stage: "notselected", updated: "Thursday" },
    { id: "razorpay", referrer: "Aviral Dixit", referrerRole: "UX Designer, Razorpay", company: "Razorpay", logo: "razorpay", job: "Design Lead", jobId: "RZP-91", stage: "interviews", updated: "Tuesday" },
    { id: "zepto", referrer: "Shivangi Joshi", referrerRole: "SWE-I, Zepto", company: "Zepto", logo: "zepto", job: "Software Engineer-I", jobId: "ZP-338", stage: "sent", updated: "Monday" },
    { id: "meta", referrer: "Abhishek Tyagi", referrerRole: "Data Scientist, Meta", company: "Meta", logo: "meta", job: "Data Scientist", jobId: "MT-7712", stage: "submitted", updated: "12 Sep" },
    { id: "amazon", referrer: "Rohit Menon", referrerRole: "SDM, Amazon", company: "Amazon", logo: "amazon", job: "Product Manager", jobId: "AMZ-5510", stage: "notselected", updated: "12 Sep" },
    { id: "phonepe", referrer: "Avinash Banerjee", referrerRole: "Design Lead, PhonePe", company: "PhonePe", logo: "phonepe", job: "Sr. Product Designer", jobId: "PP-1183", stage: "notmoving", updated: "5 Sep", reason: "Experience doesn’t match" },
    { id: "groww", referrer: "Kritika Rao", referrerRole: "PM, Groww", company: "Groww", logo: "groww", job: "Associate PM", jobId: "GRW-64", stage: "notselected", updated: "5 Sep" },
  ],
  saved: [],
  findable: true,
  verified: false,
  jobId: "",
  posted: false,
  tips: "",
  rules: { experience: true, weekly: true },
  handled: {},
  invited: ["Advika Singh"],
  removedSkills: [],
  toast: null,
  unread: 2,
};

type Action =
  | { t: "role"; v: "candidate" | "referrer" }
  | { t: "resume"; v: string }
  | { t: "skipResume" }
  | { t: "detail"; k: keyof Details; v: string }
  | { t: "note"; v: string }
  | { t: "send" }
  | { t: "save"; v: string }
  | { t: "findable"; v: boolean }
  | { t: "verify" }
  | { t: "jobId"; v: string }
  | { t: "tips"; v: string }
  | { t: "rule"; k: "experience" | "weekly"; v: boolean }
  | { t: "post" }
  | { t: "handle"; id: string; stage: Stage; reason?: string }
  | { t: "invite"; v: string }
  | { t: "removeSkill"; v: string }
  | { t: "toast"; v: string | null }
  | { t: "readAll" }
  | { t: "reset" };

function reduce(s: State, a: Action): State {
  switch (a.t) {
    case "role":
      return { ...s, role: a.v };
    case "resume":
      return { ...s, resume: a.v, skippedResume: false };
    case "skipResume":
      return { ...s, skippedResume: true };
    case "detail":
      return { ...s, details: { ...s.details, [a.k]: a.v } };
    case "note":
      return { ...s, note: a.v };
    case "send":
      return {
        ...s,
        requestsLeft: Math.max(0, s.requestsLeft - 1),
        requests: s.requests.map((r) => (r.live ? { ...r, stage: "sent", updated: "Just now" } : r)),
        toast: "Request sent to Nithin",
      };
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
    case "handle":
      return {
        ...s,
        handled: { ...s.handled, [a.id]: { stage: a.stage, reason: a.reason } },
        // the same change reaches the candidate's timeline, which is the whole point of J2
        requests: s.requests.map((r) =>
          r.live ? { ...r, stage: a.stage, reason: a.reason, updated: "Just now", waitingDays: a.stage === "submitted" ? 0 : r.waitingDays } : r
        ),
      };
    case "invite":
      return { ...s, invited: [...s.invited, a.v] };
    case "removeSkill":
      return { ...s, removedSkills: [...s.removedSkills, a.v] };
    case "toast":
      return { ...s, toast: a.v };
    case "readAll":
      return { ...s, unread: 0 };
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
};

const Ctx = createContext<Api | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [s, dispatch] = useReducer(reduce, initial);
  const live = useMemo(() => s.requests.find((r) => r.live)!, [s.requests]);
  const stillNeeded = useMemo(
    () => (["dob", "gaps", "locations", "notice"] as const).filter((k) => !s.details[k].trim()).length,
    [s.details]
  );
  const value = useMemo(() => ({ ...s, dispatch, live, stillNeeded }), [s, live, stillNeeded]);
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
