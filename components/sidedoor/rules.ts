/* ── field rules ─────────────────────────────────────────────────────────
   What each kind of field accepts. `keep` runs on every keystroke and drops what can't belong
   (letters in a number of years). `check` runs when the field is left, and before the screen's
   main button turns on; it returns the line to show, or null. */
export type FieldKind =
  | "name" | "email" | "workEmail" | "phone" | "city" | "cities" | "role" | "roles" | "years" | "days"
  | "code" | "jobId" | "linkedin" | "url" | "note" | "tips" | "text";

const LETTERS = /^[\p{L}][\p{L} .'’-]*$/u;
export const RULES: Record<FieldKind, { keep?: (v: string) => string; check?: (v: string) => string | null; max?: number; mode?: "numeric" | "decimal" | "email" | "url" | "tel" }> = {
  name: { max: 60, check: (v) => (v.trim().length < 2 || !LETTERS.test(v.trim()) ? "Use letters only, at least 2." : null) },
  email: { max: 80, mode: "email", check: (v) => (/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim()) ? null : "Enter an email like name@company.com.") },
  workEmail: {
    max: 80,
    mode: "email",
    check: (v) =>
      !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim())
        ? "Enter an email like name@company.com."
        : /@(gmail|yahoo|outlook|hotmail|icloud|proton|rediffmail)\./i.test(v)
          ? "Use your work email. We check it’s a company address."
          : null,
  },
  phone: { max: 15, mode: "tel", keep: (v) => v.replace(/[^\d+ ]/g, "").slice(0, 15), check: (v) => (/^(\+91 ?)?[6-9]\d{9}$/.test(v.replace(/ /g, "")) ? null : "Enter a 10-digit mobile number.") },
  city: { max: 40, check: (v) => (/^[\p{L}][\p{L} .-]*(, ?[\p{L}]{2,})?$/u.test(v.trim()) ? null : "Use a city name, like Bengaluru, KA.") },
  cities: { max: 80, keep: (v) => v.replace(/[^\p{L} ,.-]/gu, "").slice(0, 80), check: (v) => (/^[\p{L}][\p{L} .-]*(, ?[\p{L}][\p{L} .-]*)*$/u.test(v.trim()) ? null : "List places with commas, like Bengaluru, Remote.") },
  role: { max: 60, check: (v) => (/^[\p{L}][\p{L}\d .&/,()-]*$/u.test(v.trim()) && v.trim().length >= 2 ? null : "Enter a job title, like Product Designer.") },
  roles: { max: 120, check: (v) => (/^[\p{L}][\p{L}\d .&/,()-]*$/u.test(v.trim()) ? null : "List roles with commas, like Product Designer, UX Designer.") },
  // years: a whole or half number, 0 to 40 — "0" when there is no gap
  years: { max: 4, mode: "decimal", keep: (v) => v.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1").replace(/^(\d{0,2})\d*/, "$1").replace(/(\.\d).*/, "$1"), check: (v) => (v !== "" && Number(v) <= 40 ? null : "Enter years, 0 to 40. Use 0 if there’s no gap.") },
  days: { max: 3, mode: "numeric", keep: (v) => v.replace(/\D/g, "").slice(0, 3), check: (v) => (v !== "" && Number(v) <= 180 ? null : "Enter days, 0 to 180.") },
  code: { max: 7, mode: "numeric", keep: (v) => v.replace(/[^\d ]/g, "").slice(0, 7), check: (v) => (/^\d{6}$/.test(v.replace(/ /g, "")) ? null : "Enter the 6 digits from the email.") },
  jobId: { max: 20, keep: (v) => v.replace(/[^A-Za-z0-9-]/g, "").slice(0, 20), check: (v) => (/^[A-Za-z0-9-]{3,20}$/.test(v) ? null : "Enter the job ID, 3 to 20 letters or numbers.") },
  linkedin: { max: 120, mode: "url", check: (v) => (/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_%-]{3,100}\/?$/i.test(v.trim()) ? null : "Paste a profile link, like linkedin.com/in/yourname.") },
  url: { max: 200, mode: "url", check: (v) => (/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(v.trim()) ? null : "Paste a link, like behance.net/yourname.") },
  note: { max: 120 },
  tips: { max: 300 },
  text: { max: 200 },
};

/** The line a field would show, or null when it's fine. An empty optional field is fine. */
export function fieldError(kind: FieldKind | undefined, value: string, required?: boolean): string | null {
  const v = value ?? "";
  if (!v.trim()) return required ? "Required." : null;
  return (kind && RULES[kind].check?.(v)) || null;
}

/** True when every [kind, value, required] passes: what the screen's main button waits for. */
export const allValid = (fields: [FieldKind | undefined, string, boolean?][]) => fields.every(([k, v, r]) => !fieldError(k, v, r));

/** How a stored number of years reads on screen: "0" is "None". Older free text shows as it is. */
export const showYears = (v: string) =>
  !/^\d+(\.\d)?$/.test(v) ? v : Number(v) === 0 ? "None" : `${v} ${Number(v) === 1 ? "year" : "years"}`;
/** "30" reads "30 days". */
export const showDays = (v: string) => (/^\d+$/.test(v) ? `${v} ${v === "1" ? "day" : "days"}` : v);
