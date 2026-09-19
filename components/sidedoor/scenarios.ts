// Every V6 state, and where the app has to be for you to see it. These are the same code paths
// the app takes on its own — the switcher only puts the app in the position to take them.
export type Scenario = {
  id: string;
  label: string;
  group: string;
  role: "candidate" | "referrer";
  /** the value screens read out of the store; null means the ordinary path */
  force?: string;
  /** which tab to land on */
  tab?: string;
  /** screens pushed on top, in order */
  push?: { key: string; props?: Record<string, unknown> }[];
  /** a sheet opened on arrival */
  sheet?: { key: string; props?: Record<string, unknown> };
};

export const SCENARIOS: Scenario[] = [
  /* ── the two happy paths ─────────────────────────────────────────────── */
  { id: "start", label: "Start at the login screen", group: "Happy path", role: "candidate" },
  { id: "cand.jobs", label: "Candidate · Jobs", group: "Happy path", role: "candidate", tab: "jobs" },
  { id: "cand.job", label: "Candidate · Job details", group: "Happy path", role: "candidate", tab: "jobs", push: [{ key: "job", props: { id: "flipkart" } }] },
  { id: "cand.check", label: "Candidate · Check your request", group: "Happy path", role: "candidate", tab: "jobs", push: [{ key: "job", props: { id: "flipkart" } }, { key: "checkRequest" }] },
  { id: "cand.track", label: "Candidate · Track a request", group: "Happy path", role: "candidate", tab: "requests", push: [{ key: "trackDetails", props: { id: "flipkart" } }] },
  { id: "ref.reqs", label: "Referrer · Referral requests", group: "Happy path", role: "referrer", tab: "requests" },
  { id: "ref.req", label: "Referrer · One request", group: "Happy path", role: "referrer", tab: "requests", push: [{ key: "referralRequest", props: { id: "abhinav" } }] },
  { id: "ref.refs", label: "Referrer · Your referrals", group: "Happy path", role: "referrer", tab: "referrals" },
  { id: "ref.posts", label: "Referrer · Manage your posts", group: "Happy path", role: "referrer", tab: "posts" },
  { id: "link.page", label: "The no-install link page", group: "Happy path", role: "referrer", tab: "requests", push: [{ key: "linkPage" }] },

  /* ── nothing yet ─────────────────────────────────────────────────────── */
  { id: "jobs.empty", label: "Jobs · nothing to show", group: "Nothing yet", role: "candidate", force: "jobs.empty", tab: "jobs" },
  { id: "requests.empty", label: "Your requests · empty", group: "Nothing yet", role: "candidate", force: "requests.empty", tab: "requests" },
  { id: "messages.empty", label: "Messages · empty", group: "Nothing yet", role: "candidate", force: "messages.empty", tab: "messages" },
  { id: "reqs.empty", label: "Referral requests · none yet", group: "Nothing yet", role: "referrer", force: "reqs.empty", tab: "requests" },
  { id: "reqs.handled", label: "Referral requests · all handled", group: "Nothing yet", role: "referrer", force: "reqs.handled", tab: "requests" },
  { id: "referrals.empty", label: "Your referrals · empty", group: "Nothing yet", role: "referrer", force: "referrals.empty", tab: "referrals" },
  { id: "posts.empty", label: "Manage your posts · empty", group: "Nothing yet", role: "referrer", force: "posts.empty", tab: "posts" },

  /* ── waiting ─────────────────────────────────────────────────────────── */
  { id: "jobs.loading", label: "Jobs · loading", group: "Waiting", role: "candidate", force: "jobs.loading", tab: "jobs" },
  { id: "track.loading", label: "Track details · loading", group: "Waiting", role: "candidate", force: "track.loading", tab: "requests", push: [{ key: "trackDetails", props: { id: "flipkart" } }] },
  { id: "reqs.loading", label: "Referral requests · loading", group: "Waiting", role: "referrer", force: "reqs.loading", tab: "requests" },

  /* ── it went wrong ───────────────────────────────────────────────────── */
  { id: "jobs.error", label: "Jobs · couldn’t load", group: "Went wrong", role: "candidate", force: "jobs.error", tab: "jobs" },
  { id: "track.error", label: "Track details · couldn’t load", group: "Went wrong", role: "candidate", force: "track.error", tab: "requests", push: [{ key: "trackDetails", props: { id: "flipkart" } }] },
  { id: "send.error", label: "Send · couldn’t send", group: "Went wrong", role: "candidate", force: "send.error", tab: "jobs", push: [{ key: "job", props: { id: "flipkart" } }, { key: "checkRequest" }] },
  { id: "resume.unreadable", label: "Resume · couldn’t read this file", group: "Went wrong", role: "candidate", force: "resume.unreadable", tab: "jobs", push: [{ key: "uploadResume" }] },
  { id: "reqs.error", label: "Referral requests · couldn’t load", group: "Went wrong", role: "referrer", force: "reqs.error", tab: "requests" },
  { id: "job.unreadable", label: "Add a job · couldn’t read the link", group: "Went wrong", role: "referrer", force: "job.unreadable", tab: "posts", push: [{ key: "addJob" }] },
  { id: "verify.personal", label: "Work email · that’s a personal one", group: "Went wrong", role: "referrer", force: "verify.personal", tab: "posts", push: [{ key: "verifyEmail" }] },
  { id: "verify.wrong-code", label: "Work email · wrong code", group: "Went wrong", role: "referrer", force: "verify.wrong-code", tab: "posts", push: [{ key: "verifyEmail" }] },

  /* ── rules and limits ────────────────────────────────────────────────── */
  { id: "send.none-left", label: "Send · no requests left this week", group: "Rules and limits", role: "candidate", force: "send.none-left", tab: "jobs", push: [{ key: "job", props: { id: "flipkart" } }, { key: "checkRequest" }] },
  { id: "reqs.paused", label: "Referral requests · post is paused", group: "Rules and limits", role: "referrer", force: "reqs.paused", tab: "requests" },

  /* ── an answer reaches the candidate ─────────────────────────────────── */
  { id: "track.noanswer", label: "No answer after 7 days", group: "The answer", role: "candidate", tab: "requests", push: [{ key: "trackDetails", props: { id: "flipkart", stage: "noanswer" } }] },
  { id: "track.notmoving", label: "Not moving forward", group: "The answer", role: "candidate", tab: "requests", push: [{ key: "trackDetails", props: { id: "phonepe" } }] },
  { id: "track.onhold", label: "On hold", group: "The answer", role: "candidate", tab: "requests", push: [{ key: "trackDetails", props: { id: "flipkart", stage: "onhold" } }] },
  { id: "track.closed", label: "Role closed", group: "The answer", role: "candidate", tab: "requests", push: [{ key: "trackDetails", props: { id: "flipkart", stage: "closed" } }] },
  { id: "track.selected", label: "Selected", group: "The answer", role: "candidate", tab: "requests", push: [{ key: "trackDetails", props: { id: "swiggy" } }] },

  /* ── sheets ──────────────────────────────────────────────────────────── */
  {
    id: "sheet.notmoving",
    label: "Not moving forward sheet",
    group: "Sheets",
    role: "referrer",
    tab: "requests",
    push: [{ key: "referralRequest", props: { id: "abhinav" } }],
    sheet: { key: "notMoving", props: { id: "abhinav", name: "Abhinav Saxena", role: "Product Designer, Blinkit", match: "4 of 7 skills" } },
  },
  {
    id: "sheet.seen",
    label: "Seen it move sheet",
    group: "Sheets",
    role: "referrer",
    tab: "referrals",
    sheet: { key: "seenItMove", props: { name: "Aviral Dixit", role: "UX Designer, Razorpay", since: "Submitted 12 days ago" } },
  },
  { id: "sheet.share", label: "Share your link sheet", group: "Sheets", role: "referrer", tab: "requests", sheet: { key: "shareLink" } },
  { id: "sheet.dob", label: "Date of birth picker", group: "Sheets", role: "candidate", tab: "jobs", push: [{ key: "job", props: { id: "flipkart" } }, { key: "checkRequest" }], sheet: { key: "dob" } },
  { id: "sheet.logout", label: "Log out action sheet", group: "Sheets", role: "candidate", tab: "profile", sheet: { key: "logout" } },
];

export const GROUPS = ["Happy path", "The answer", "Nothing yet", "Waiting", "Went wrong", "Rules and limits", "Sheets"];
