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
  { id: "cand.job.suggested", label: "Candidate · Job a referrer suggested", group: "Happy path", role: "candidate", force: "job.suggested", tab: "jobs", push: [{ key: "job", props: { id: "flipkart" } }] },
  { id: "cand.check", label: "Candidate · Check your request", group: "Happy path", role: "candidate", tab: "jobs", push: [{ key: "job", props: { id: "flipkart" } }, { key: "checkRequest" }] },
  { id: "cand.done", label: "Candidate · end of sign-up", group: "Happy path", role: "candidate", tab: "jobs", push: [{ key: "uploadResume" }, { key: "checkProfile" }] },
  { id: "ref.live", label: "Referrer · job posted", group: "Happy path", role: "referrer", tab: "requests", push: [{ key: "jobLive" }] },
  { id: "cand.track", label: "Candidate · Track a request", group: "Happy path", role: "candidate", tab: "requests", push: [{ key: "trackDetails", props: { id: "flipkart" } }] },
  { id: "ref.reqs", label: "Referrer · Referral requests", group: "Happy path", role: "referrer", tab: "requests" },
  { id: "ref.req", label: "Referrer · One request", group: "Happy path", role: "referrer", tab: "requests", push: [{ key: "referralRequest", props: { id: "abhinav" } }] },
  { id: "ref.refs", label: "Referrer · Your referrals", group: "Happy path", role: "referrer", force: "referrals.abhinav", tab: "referrals" },
  { id: "ref.posts", label: "Referrer · Manage your posts", group: "Happy path", role: "referrer", tab: "posts" },
  { id: "link.page", label: "The no-install link page", group: "Happy path", role: "referrer", tab: "requests", push: [{ key: "linkPage" }] },

  /* ── nothing yet ─────────────────────────────────────────────────────── */
  { id: "jobs.empty", label: "Jobs · nothing to show", group: "Nothing yet", role: "candidate", force: "jobs.empty", tab: "jobs" },
  { id: "requests.empty", label: "Your requests · empty", group: "Nothing yet", role: "candidate", force: "requests.empty", tab: "requests" },
  { id: "messages.empty", label: "Messages · empty", group: "Nothing yet", role: "candidate", force: "messages.empty", tab: "messages" },
  { id: "messages.search", label: "Messages · search finds nothing", group: "Nothing yet", role: "candidate", force: "messages.search", tab: "messages" },
  { id: "ref.messages.empty", label: "Referrer messages · empty", group: "Nothing yet", role: "referrer", force: "messages.empty", tab: "profile", push: [{ key: "messages" }] },
  { id: "notifs.empty", label: "Notifications · empty", group: "Nothing yet", role: "candidate", force: "notifs.empty", tab: "jobs", push: [{ key: "notifications" }] },
  { id: "ref.notifs.empty", label: "Referrer notifications · empty", group: "Nothing yet", role: "referrer", force: "notifs.empty", tab: "requests", push: [{ key: "notifications" }] },
  { id: "reqs.empty", label: "Referral requests · none yet", group: "Nothing yet", role: "referrer", force: "reqs.empty", tab: "requests" },
  { id: "reqs.handled", label: "Referral requests · all handled", group: "Nothing yet", role: "referrer", force: "reqs.handled", tab: "requests" },
  { id: "referrals.empty", label: "Your referrals · empty", group: "Nothing yet", role: "referrer", force: "referrals.empty", tab: "referrals" },
  { id: "posts.empty", label: "Manage your posts · empty", group: "Nothing yet", role: "referrer", force: "posts.empty", tab: "posts" },

  /* ── waiting ─────────────────────────────────────────────────────────── */
  { id: "jobs.loading", label: "Jobs · loading", group: "Waiting", role: "candidate", force: "jobs.loading", tab: "jobs" },
  { id: "link.reading", label: "Link page · reading the resume", group: "Waiting", role: "referrer", force: "link.reading", tab: "requests", push: [{ key: "linkPage" }] },
  { id: "profile.reading", label: "Check your details · reading", group: "Waiting", role: "candidate", force: "profile.reading", tab: "jobs", push: [{ key: "uploadResume" }, { key: "checkProfile" }] },
  { id: "link.closed", label: "Link page · job closed", group: "Rules and limits", role: "referrer", force: "link.closed", tab: "requests", push: [{ key: "linkPage" }] },
  { id: "link.asked", label: "Link page · already asked", group: "Rules and limits", role: "referrer", force: "link.asked", tab: "requests", push: [{ key: "linkPage" }] },
  { id: "referrals.updated", label: "Your referrals · updated", group: "Happy path", role: "referrer", force: "referrals.updated", tab: "referrals" },
  { id: "referrals.loading", label: "Your referrals · loading", group: "Waiting", role: "referrer", force: "referrals.loading", tab: "referrals" },
  { id: "reqs.fit", label: "Referral requests · fit checked again", group: "Rules and limits", role: "referrer", force: "reqs.fit", tab: "requests" },
  { id: "req.updated", label: "One request · profile updated", group: "Rules and limits", role: "referrer", force: "req.updated", tab: "requests", push: [{ key: "referralRequest", props: { id: "abhinav" } }] },
  { id: "req.sixmonths", label: "One request · referred here in 6 months", group: "Rules and limits", role: "referrer", force: "req.sixmonths", tab: "requests", push: [{ key: "referralRequest", props: { id: "abhinav" } }] },
  { id: "req.recent", label: "One request · may have been referred here", group: "Rules and limits", role: "referrer", force: "req.recent", tab: "requests", push: [{ key: "referralRequest", props: { id: "abhinav" } }] },
  { id: "req.skill", label: "One request · skill removed", group: "Rules and limits", role: "referrer", force: "req.skill", tab: "requests", push: [{ key: "referralRequest", props: { id: "abhinav" } }] },
  { id: "refer.undo", label: "After refer · undo", group: "Happy path", role: "referrer", force: "refer.undo", tab: "requests", push: [{ key: "referralRequest", props: { id: "abhinav" } }] },
  { id: "messages.loading", label: "Messages · loading", group: "Waiting", role: "candidate", force: "messages.loading", tab: "messages" },
  { id: "messages.error", label: "Messages · couldn’t load", group: "Went wrong", role: "candidate", force: "messages.error", tab: "messages" },
  { id: "job.asked", label: "Job · already asked", group: "Rules and limits", role: "candidate", force: "job.asked", tab: "jobs", push: [{ key: "job", props: { id: "flipkart" } }] },
  { id: "job.skipped", label: "Job · resume skipped", group: "Rules and limits", role: "candidate", force: "job.skipped", tab: "jobs", push: [{ key: "job", props: { id: "flipkart" } }] },
  { id: "requests.justsent", label: "Your requests · just sent", group: "Happy path", role: "candidate", force: "requests.justsent", tab: "requests" },
  { id: "send.sending", label: "Send · sending", group: "Waiting", role: "candidate", force: "send.sending", tab: "jobs", push: [{ key: "job", props: { id: "flipkart" } }, { key: "checkRequest" }] },
  { id: "track.loading", label: "Track details · loading", group: "Waiting", role: "candidate", force: "track.loading", tab: "requests", push: [{ key: "trackDetails", props: { id: "flipkart" } }] },
  { id: "reqs.loading", label: "Referral requests · loading", group: "Waiting", role: "referrer", force: "reqs.loading", tab: "requests" },
  { id: "offline.jobs", label: "Offline · Jobs", group: "Waiting", role: "candidate", force: "offline", tab: "jobs" },
  { id: "offline.send", label: "Offline · Check your request", group: "Waiting", role: "candidate", force: "offline", tab: "jobs", push: [{ key: "job", props: { id: "flipkart" } }, { key: "checkRequest" }] },

  /* ── it went wrong ───────────────────────────────────────────────────── */
  { id: "login.cancelled", label: "Login · LinkedIn cancelled", group: "Went wrong", role: "candidate", force: "login.cancelled" },
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
  { id: "track.noanswer", label: "No answer after 7 days", group: "The answer", role: "candidate", tab: "requests", push: [{ key: "trackDetails", props: { id: "zepto", stage: "noanswer" } }] },
  { id: "track.notmoving", label: "Not moving forward", group: "The answer", role: "candidate", tab: "requests", push: [{ key: "trackDetails", props: { id: "phonepe" } }] },
  { id: "track.onhold", label: "On hold", group: "The answer", role: "candidate", tab: "requests", push: [{ key: "trackDetails", props: { id: "meta", stage: "onhold", updated: "16 Sep" } }] },
  { id: "track.closed", label: "Role closed", group: "The answer", role: "candidate", tab: "requests", push: [{ key: "trackDetails", props: { id: "phonepe", stage: "closed" } }] },
  { id: "track.selected", label: "Selected", group: "The answer", role: "candidate", tab: "requests", push: [{ key: "trackDetails", props: { id: "swiggy" } }] },
  { id: "track.withdrawn", label: "Withdrawn by you", group: "The answer", role: "candidate", tab: "requests", push: [{ key: "trackDetails", props: { id: "phonepe", stage: "withdrawn", updated: "Just now" } }] },
  { id: "job.before", label: "Job · already referred at this company", group: "Rules and limits", role: "candidate", tab: "jobs", push: [{ key: "job", props: { id: "google" } }] },

  /* ── sheets ──────────────────────────────────────────────────────────── */
  {
    id: "sheet.notmoving",
    label: "Not moving forward sheet",
    group: "Sheets",
    role: "referrer",
    tab: "requests",
    push: [{ key: "referralRequest", props: { id: "abhinav" } }],
    sheet: { key: "notMoving", props: { id: "abhinav", name: "Abhinav Saxena", role: "Product Designer, Blinkit", match: "4 of 7 skills · 3 yrs" } },
  },
  {
    id: "sheet.seen",
    label: "Seen it move sheet",
    group: "Sheets",
    role: "referrer",
    tab: "referrals",
    sheet: { key: "seenItMove", props: { name: "Aviral Dixit", role: "UX Designer, Razorpay", since: "Submitted 12 days ago" } },
  },
  {
    id: "sheet.seen.error",
    label: "Seen it move · couldn’t update",
    group: "Went wrong",
    role: "referrer",
    force: "sheet.seen.error",
    tab: "referrals",
    sheet: { key: "seenItMove", props: { name: "Aviral Dixit", role: "UX Designer, Razorpay", since: "Submitted 12 days ago" } },
  },
  { id: "sheet.share", label: "Share your link sheet", group: "Sheets", role: "referrer", tab: "requests", sheet: { key: "shareLink" } },
  { id: "sheet.dob", label: "Date of birth picker", group: "Sheets", role: "candidate", tab: "jobs", push: [{ key: "job", props: { id: "flipkart" } }, { key: "checkRequest" }], sheet: { key: "dob" } },
  { id: "sheet.logout", label: "Log out action sheet", group: "Sheets", role: "candidate", tab: "profile", sheet: { key: "logout" } },
  { id: "sheet.withdraw", label: "Withdraw request alert", group: "Sheets", role: "candidate", tab: "requests", push: [{ key: "trackDetails", props: { id: "zepto" } }], sheet: { key: "withdraw", props: { id: "zepto" } } },
  { id: "sheet.switch", label: "Switch role alert", group: "Sheets", role: "candidate", tab: "profile", sheet: { key: "switchRole" } },
  { id: "sheet.resume", label: "Add your resume sheet", group: "Sheets", role: "candidate", force: "job.skipped", tab: "jobs", sheet: { key: "addResume" } },
];

export const GROUPS = ["Happy path", "The answer", "Nothing yet", "Waiting", "Went wrong", "Rules and limits", "Sheets"];
