"use client";
// Login and both onboarding paths. Copy is taken from the V6 screens, unchanged.
import Image from "next/image";
import { useState } from "react";
import { useNav } from "../nav";
import { useStore } from "../store";
import {
  Actions,
  Button,
  Field,
  Icon,
  Note,
  RadioOption,
  Screen,
  SectionLabel,
  Section,
  StatusBar,
  Switch,
  Tag,
  TextButton,
  Box,
  DetailField,
} from "../ui";

/** The Apple mark, drawn white so it reads on the black button. */
function AppleMark() {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="#fff" aria-hidden="true" style={{ display: "block" }}>
      <path d="M16.6 12.7c0-2.8 2.3-4.2 2.4-4.2-1.3-1.9-3.3-2.2-4.1-2.2-1.7-.2-3.4 1-4.3 1s-2.2-1-3.7-1C5.1 6.3 3.3 7.4 2.3 9.2c-2 3.5-.5 8.6 1.4 11.4.9 1.4 2 2.9 3.5 2.9 1.4-.1 1.9-.9 3.6-.9s2.2.9 3.7.9c1.5 0 2.5-1.4 3.4-2.8 1.1-1.6 1.5-3.1 1.5-3.2-.1 0-2.9-1.1-2.8-4.4ZM13.8 4.3c.8-.9 1.3-2.2 1.1-3.5-1.1 0-2.5.8-3.3 1.7-.7.8-1.3 2.1-1.2 3.4 1.3.1 2.5-.6 3.4-1.6Z" />
    </svg>
  );
}

/* ── Login ──────────────────────────────────────────────────────────────── */
export function Login() {
  const nav = useNav();
  const [page, setPage] = useState(0);
  const lines = ["Get referred by insiders", "Refer someone in minutes", "See where your request got to"];
  return (
    <>
      <StatusBar />
      <div className="sd-login">
        <div style={{ display: "flex", flexDirection: "column", gap: 36, alignItems: "center", paddingTop: 18 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
            <Image src="/images/sidedoor/sidedoor-mark.png" alt="" width={54} height={69} style={{ width: 54, height: "auto" }} />
            <Image src="/images/sidedoor/sidedoor-word.png" alt="SideDoor" width={132} height={24} style={{ width: 132, height: "auto" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            <p className="t-h-sm">{lines[page]}</p>
            <div style={{ display: "flex", gap: 8 }}>
              {lines.map((l, i) => (
                <button
                  key={l}
                  onClick={() => setPage(i)}
                  aria-label={`Page ${i + 1}`}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: i === page ? "var(--sd-link)" : "var(--sd-n200)",
                  }}
                />
              ))}
            </div>
          </div>
          <Image src="/images/sidedoor/splash.png" alt="" width={227} height={256} style={{ width: 227, height: "auto" }} priority />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", alignItems: "center" }}>
          {/* order and the 8 gap are decisions in LOG.md: LinkedIn, Google, Apple */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
            <Button
              onClick={() => nav.reset("role")}
              icon={<Image src="/images/sidedoor/linkedin.png" alt="" width={24} height={24} />}
            >
              Sign in with LinkedIn
            </Button>
            <Button
              type="secondary"
              onClick={() => nav.reset("role")}
              icon={<Image src="/images/sidedoor/google-icon.png" alt="" width={24} height={24} />}
            >
              Sign in with Google
            </Button>
            <Button
              type="apple"
              onClick={() => nav.reset("role")}
              icon={<AppleMark />}
            >
              Sign in with Apple
            </Button>
          </div>
          <p className="t-label muted" style={{ textAlign: "center" }}>
            Already have an account?{" "}
            <button className="link" style={{ textDecoration: "underline" }} onClick={() => nav.reset("role")}>
              Log in
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

/* ── Role ───────────────────────────────────────────────────────────────── */
export function RoleSelection() {
  const nav = useNav();
  const { dispatch } = useStore();
  const pick = (role: "referrer" | "candidate") => {
    dispatch({ t: "role", v: role });
    nav.push(role === "referrer" ? "verifyEmail" : "uploadResume");
  };
  const card = (img: string, w: number, h: number, head: string, sub: string, go: () => void) => (
    <button
      onClick={go}
      style={{
        background: "#fff",
        borderRadius: "var(--sd-r-lg)",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        width: "100%",
      }}
    >
      <Image src={`/images/sidedoor/${img}.png`} alt="" width={w} height={h} style={{ width: w, height: "auto" }} />
      <span style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span className="t-h-sm">{head}</span>
        <span className="t-label muted">{sub}</span>
      </span>
    </button>
  );
  return (
    <Screen title="Choose your role" back onBack={() => nav.reset("login")}>
      <div style={{ paddingTop: 8, display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>
        <p className="t-label muted">You can change this later</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
          {card("role-referrer", 109, 100, "Refer someone", "I work at a company and can refer candidates", () => pick("referrer"))}
          {card("role-candidate", 114, 103, "Get referred", "I’m looking for jobs through referrals", () => pick("candidate"))}
        </div>
      </div>
    </Screen>
  );
}

/* ── shared: the drop-a-file block ──────────────────────────────────────── */
function DocUpload({
  what,
  file,
  onUpload,
}: {
  what: string;
  file: string | null;
  onUpload: () => void;
}) {
  if (file)
    return (
      <div style={{ background: "#fff", borderRadius: "var(--sd-r-lg)", padding: 16, display: "flex", gap: 12, alignItems: "center" }}>
        <Image src="/images/sidedoor/doc-icon.png" alt="" width={36} height={42} style={{ width: 36, height: "auto" }} />
        <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <span className="t-h-xs" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            Uploaded
            <Icon name="checkmark" size={14} style={{ color: "var(--sd-text-success)" }} />
          </span>
          <span className="t-label-sm muted">{file} · PDF · 212 KB</span>
        </span>
        <TextButton onClick={onUpload}>Replace</TextButton>
      </div>
    );
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "var(--sd-r-lg)",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
        <Image src="/images/sidedoor/doc-icon.png" alt="" width={44} height={51} style={{ width: 44, height: "auto" }} />
        <span className="t-h-sm">
          Drop your <span className="link">{what}</span>
        </span>
      </div>
      <div style={{ display: "flex", gap: 12, width: "100%" }}>
        {/* side by side, so they need less side padding than a full-width button */}
        <Button type="secondary" onClick={onUpload} icon={<Icon name="square.and.arrow.down" size={18} />} style={{ padding: "12px 12px", minHeight: 48 }}>
          Upload file
        </Button>
        <Button type="secondary" onClick={onUpload} icon={<Icon name="link" size={18} />} style={{ padding: "12px 12px", minHeight: 48 }}>
          Paste link
        </Button>
      </div>
      <p className="t-label-sm muted">PDF, DOCX or TXT · up to 10 MB</p>
    </div>
  );
}

function AutofillInfo({ items }: { items: string[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <p className="t-h-xs">What we’ll auto fill</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {items.map((i) => (
          <span key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Icon name="checkmark" size={16} style={{ color: "var(--sd-text-success)" }} />
            <span className="t-label">{i}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Candidate: upload your resume ──────────────────────────────────────── */
export function UploadResume() {
  const nav = useNav();
  const { resume, dispatch } = useStore();
  return (
    <Screen
      title="Your resume"
      back
      actions={
        <Actions>
          <Button disabled={!resume} onClick={() => nav.push("checkProfile")}>
            Next
          </Button>
          <Button type="secondary" onClick={() => nav.push("checkProfile")}>
            Fill in myself
          </Button>
          <TextButton
            onClick={() => {
              dispatch({ t: "skipResume" });
              nav.reset("tabs");
            }}
          >
            Skip for now
          </TextButton>
        </Actions>
      }
    >
      <div style={{ paddingTop: 8, display: "flex", flexDirection: "column", gap: 24 }}>
        <p className="t-label muted">We fill in your details, you check them.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <DocUpload
            what="resume"
            file={resume}
            onUpload={() => dispatch({ t: "resume", v: "Abhinav_Saxena_Resume.pdf" })}
          />
          <AutofillInfo items={["Work details", "Role and level", "Projects and skills", "Education"]} />
        </div>
      </div>
    </Screen>
  );
}

/* ── Candidate: check your details ──────────────────────────────────────── */
export function CheckProfile() {
  const nav = useNav();
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  return (
    <Screen
      title="Check your details"
      back
      actions={<Button onClick={() => nav.reset("tabs")}>See jobs</Button>}
    >
      <div style={{ paddingTop: 8, display: "flex", flexDirection: "column", gap: 24 }}>
        <p className="t-label muted">Filled from your resume. Check these before you send anything.</p>

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
            <CompanyRow logo="blinkit" role="Product Designer" company="Blinkit" when="Sep 2023–Present" />
            <div style={{ height: 16 }} />
            <CompanyRow logo="makemytrip" role="Associate Product Designer" company="MakeMyTrip" when="Jun 2022–Aug 2023" />
          </Box>
        </Section>

        <Section label="Projects" icon="folder.fill" end={<TextButton>Edit</TextButton>}>
          <Box>
            <Project title="Blinkit Merchant App UX Revamp" skills={["Product strategy", "Systems design", "Prototyping", "User research", "Figma"]} />
            <div style={{ height: 16 }} />
            <Project title="MakeMyTrip Booking Experience Redesign" skills={["User research", "Interaction design", "Usability testing", "Figma"]} />
            <div style={{ height: 8 }} />
            <TextButton>Show project details</TextButton>
          </Box>
        </Section>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Field
            label="LinkedIn profile (optional)"
            value={linkedin}
            onChange={setLinkedin}
            placeholder="Paste your profile link. Referrers check it."
          />
          <Field label="Portfolio (optional)" value={portfolio} onChange={setPortfolio} placeholder="Behance, Dribbble or your site" />
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

export function CompanyRow({ logo, role, company, when }: { logo: string; role: string; company: string; when: string }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
      <Image src={`/images/sidedoor/${logo}.png`} alt="" width={28} height={28} style={{ width: 28, height: "auto", flex: "0 0 auto", marginTop: 2 }} />
      <span style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <span className="t-h-xs">{role}</span>
        <span className="t-label-sm muted">{company}</span>
      </span>
      <span className="t-label-sm muted" style={{ flex: "0 0 auto" }}>
        {when}
      </span>
    </div>
  );
}

export function Project({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span className="t-h-xs">{title}</span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {skills.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>
    </div>
  );
}

/* ── Referrer: where you work ───────────────────────────────────────────── */
export function VerifyEmail() {
  const nav = useNav();
  const { dispatch } = useStore();
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("nithin.agarwal@flipkart.com");
  const personal = /@(gmail|yahoo|outlook|hotmail)\./i.test(email);
  const wrong = code.length === 6 && code !== "482013";
  return (
    <Screen
      title="Where you work"
      back
      actions={
        <Actions>
          <Note>We never contact your company or HR</Note>
          <Button
            disabled={code.length !== 6 || personal || wrong}
            onClick={() => {
              dispatch({ t: "verify" });
              nav.push("addJob");
            }}
          >
            Verify
          </Button>
          <TextButton>Resend code</TextButton>
        </Actions>
      }
    >
      <div style={{ paddingTop: 8, display: "flex", flexDirection: "column", gap: 24 }}>
        <p className="t-label muted">
          Candidates see your name, role and company. The verified tick shows after we check your work email.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Field label="Your name" value="Nithin Agarwal" />
          <Field
            label="Work email"
            value={email}
            onChange={setEmail}
            error={personal ? "Use your work email. A personal one can’t be verified." : undefined}
          />
          <Field
            label="Code from your email"
            value={code}
            onChange={(v) => setCode(v.replace(/\D/g, "").slice(0, 6))}
            placeholder="6-digit code"
            help={!wrong ? "For this prototype the code is 482013" : undefined}
            error={wrong ? "That code doesn’t match. Check the email again." : undefined}
          />
          <Field label="Your role" value="Design Manager" />
          <Field label="Where you work from" value="Bengaluru, KA" />
        </div>
      </div>
    </Screen>
  );
}

/* ── Referrer: add a job ────────────────────────────────────────────────── */
export function AddJob() {
  const nav = useNav();
  const [file, setFile] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  return (
    <Screen
      title="Add a job"
      back
      actions={
        <Actions>
          <Button disabled={!file} onClick={() => nav.push("checkPost")}>
            Next
          </Button>
          <Button type="secondary" onClick={() => nav.push("checkPost")}>
            Fill in myself
          </Button>
        </Actions>
      }
    >
      <div style={{ paddingTop: 8, display: "flex", flexDirection: "column", gap: 24 }}>
        <p className="t-label muted">
          Paste its link from your careers page, or upload the description. We fill in the rest.
        </p>
        {failed && (
          <Note style="failure" icon="xmark.circle.fill">
            Couldn’t read this file or link. Try another, or fill it in yourself.
          </Note>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <DocUpload
            what="job description"
            file={file}
            onUpload={() => {
              // one in three uploads fails on purpose, so the error state is reachable
              if (!file && Math.random() < 0.0) setFailed(true);
              setFile("Flipkart_IxDesigner_JD.docx");
            }}
          />
          <AutofillInfo items={["Role and level", "Requirements", "Responsibilities", "Work details"]} />
        </div>
      </div>
    </Screen>
  );
}

/* ── Referrer: check your job post ──────────────────────────────────────── */
export function CheckPost() {
  const nav = useNav();
  const { jobId, rules, tips, dispatch } = useStore();
  return (
    <Screen
      title="Check your job post"
      back
      actions={
        <Actions>
          {!jobId.trim() && <p className="t-label-sm muted">Add the job ID to post.</p>}
          <Button
            disabled={!jobId.trim()}
            onClick={() => {
              dispatch({ t: "post" });
              nav.push("jobLive");
            }}
          >
            Post job
          </Button>
          <Button type="secondary" onClick={() => nav.reset("tabs")}>
            Save as draft
          </Button>
        </Actions>
      }
    >
      <div style={{ paddingTop: 8, display: "flex", flexDirection: "column", gap: 24 }}>
        <p className="t-label muted">Filled from Flipkart_IxDesigner_JD.docx. Check it before you post.</p>

        <Section
          label="Job ID"
          icon="doc.on.doc.fill"
          end={!jobId.trim() ? <Tag style="buffer">Still needed</Tag> : undefined}
        >
          <Field
            value={jobId}
            onChange={(v) => dispatch({ t: "jobId", v })}
            placeholder="From the job’s page on your portal"
            help="Not in the description. Candidates send it with every request."
          />
        </Section>

        <Section label="From the job description" icon="briefcase.fill" end={<TextButton>Edit</TextButton>}>
          <Box>
            <DetailField name="Company" value="Flipkart" />
            <DetailField name="Job title" value="Interaction Designer" />
            <DetailField name="Experience" value="3+ yrs" />
            <DetailField name="Location" value="Bengaluru, KA · Remote or hybrid" />
            <DetailField
              name="Skills (7)"
              value="UX research, Interaction design, Prototyping, AI-assisted design, Design system, Figma, A/B testing"
            />
            <DetailField name="Employment" value="Full time · joining within 30 days" />
          </Box>
        </Section>

        <Section label="Your rules" icon="gearshape.fill">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <RuleRow
              title="Experience must match"
              sub="Requests under 3 yrs go to Lower match. You can still refer them."
              on={rules.experience}
              onChange={(v) => dispatch({ t: "rule", k: "experience", v })}
            />
            <RuleRow
              title="Up to 10 requests a week"
              sub="When it’s full, candidates see you’re full this week and ask again on Monday."
              on={rules.weekly}
              onChange={(v) => dispatch({ t: "rule", k: "weekly", v })}
            />
          </div>
        </Section>

        <Field
          label="Tips for candidates (optional)"
          value={tips}
          onChange={(v) => dispatch({ t: "tips", v })}
          placeholder="e.g. Link a portfolio with end-to-end case studies. Shown on the job."
          multiline
        />

        <Section label="Job description" icon="paperclip">
          <Box>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="t-label" style={{ flex: 1 }}>
                Flipkart_IxDesigner_JD.docx
              </span>
              <TextButton>Replace</TextButton>
            </div>
          </Box>
        </Section>
      </div>
    </Screen>
  );
}

function RuleRow({ title, sub, on, onChange }: { title: string; sub: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{ background: "#fff", borderRadius: "var(--sd-r-lg)", padding: 16, display: "flex", gap: 12, alignItems: "flex-start" }}>
      <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <span className="t-h-xs">{title}</span>
        <span className="t-label-sm muted">{sub}</span>
      </span>
      <Switch on={on} onChange={onChange} />
    </div>
  );
}

/* ── Referrer: your job is live ─────────────────────────────────────────── */
export function JobLive() {
  const nav = useNav();
  const { jobId } = useStore();
  return (
    <Screen
      title="Job posted"
      back
      actions={
        <Actions>
          <Button onClick={() => nav.openSheet("shareLink")}>Share your link</Button>
          <TextButton onClick={() => nav.reset("tabs")}>Share later</TextButton>
        </Actions>
      }
    >
      <div style={{ paddingTop: 8, display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center", textAlign: "center" }}>
          <span
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "var(--sd-link)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Icon name="checkmark" size={24} style={{ color: "#fff" }} />
          </span>
          <h2 className="t-h-sm">Your job is live</h2>
          <p className="t-label muted">Interaction Designer · Flipkart · Job ID {jobId || "184223"}</p>
        </div>
        <Section
          label="Your link for this job"
          icon="link"
          end={
            <span className="sd-hit44">
              <Icon name="doc.on.doc.fill" size={18} style={{ color: "var(--sd-link)" }} />
            </span>
          }
        >
          <Box>
            <p className="t-label link">sidedoor.app/r/nithin-agarwal</p>
          </Box>
        </Section>
        <p className="t-label muted">
          Send it to people who already messaged you about this job. They send everything your portal needs, without the
          app.
        </p>
      </div>
    </Screen>
  );
}

export { RadioOption, SectionLabel };
