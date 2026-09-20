"use client";
// Login and both onboarding paths. Copy is taken from the V6 screens, unchanged.
import Image from "next/image";
import { useState, type ReactNode } from "react";
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

/** Figma's own Apple vector, not a redraw. */
function AppleMark() {
  return (
    <Image src="/images/sidedoor/apple-mark.svg" alt="" width={24} height={24} style={{ width: 24, height: 24, display: "block" }} unoptimized />
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
            {/* the mark is a bitmap in Figma (exported at 4x); the wordmark is a vector, so it is
                the same SVG Figma draws, not a flattened PNG */}
            <Image src="/images/sidedoor/sidedoor-mark.png" alt="" width={216} height={276} style={{ width: 54, height: 69 }} priority />
            <Image src="/images/sidedoor/sidedoor-word.svg" alt="SideDoor" width={132} height={24} style={{ width: 132, height: 24 }} unoptimized priority />
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
          <Image src="/images/sidedoor/splash.png" alt="" width={908} height={1024} style={{ width: 227, height: 256 }} priority />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", alignItems: "center" }}>
          {/* order and the 8 gap are decisions in LOG.md: LinkedIn, Google, Apple */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
            <Button
              onClick={() => nav.reset("role")}
              icon={<Image src="/images/sidedoor/linkedin.svg" alt="" width={24} height={24} style={{ width: 24, height: 24 }} unoptimized />}
            >
              Sign in with LinkedIn
            </Button>
            <Button
              type="secondary"
              onClick={() => nav.reset("role")}
              icon={<Image src="/images/sidedoor/google-icon.svg" alt="" width={24} height={24} style={{ width: 24, height: 24 }} unoptimized />}
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
      <div style={{ paddingTop: 32, display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>
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
/**
 * Figma DocUpload: a white r12 card padded 16, holding a second r12 box with a 1px #d1d3d8
 * stroke and its own 16 of padding. Before upload the box stacks the 44x51 doc mark, the
 * prompt, two 44-tall buttons 12 apart and the format line; after upload it swaps the
 * buttons for the file name in blue and its type and size beneath.
 */
function DocUpload({
  what,
  file,
  onUpload,
}: {
  what: string;
  file: string | null;
  onUpload: () => void;
}) {
  const shell = (gap: number, children: ReactNode) => (
    <div style={{ background: "var(--sd-n0)", borderRadius: "var(--sd-r-lg)", padding: 16 }}>
      <div
        style={{
          border: "1px solid var(--sd-border)",
          borderRadius: "var(--sd-r-lg)",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap,
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
  const mark = (label: ReactNode) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
      <Image src="/images/sidedoor/doc-icon.png" alt="" width={44} height={51} style={{ width: 44, height: "auto" }} />
      <span className="t-h-sm">{label}</span>
    </div>
  );
  if (file)
    return shell(
      12,
      <>
        {mark("Uploaded")}
        <span className="t-h-xs link">{file}</span>
        <span className="t-label-sm muted">PDF · 212 KB</span>
      </>
    );
  return shell(
    16,
    <>
      {mark(
        <>
          Drop your <span className="link">{what}</span>
        </>
      )}
      <div style={{ display: "flex", gap: 12, width: "100%" }}>
        <Button type="secondary" onClick={onUpload} icon={<Icon name="square.and.arrow.down" size={18} />} style={{ padding: "12px 12px", minHeight: 44 }}>
          Upload file
        </Button>
        <Button type="secondary" onClick={onUpload} icon={<Icon name="link" size={18} />} style={{ padding: "12px 12px", minHeight: 44 }}>
          Paste link
        </Button>
      </div>
      <p className="t-label-sm muted">PDF, DOCX or TXT · up to 10 MB</p>
    </>
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
  const { resume, force, dispatch } = useStore();
  const [failed, setFailed] = useState(force === "resume.unreadable");
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
      <div style={{ paddingTop: 32, display: "flex", flexDirection: "column", gap: 24 }}>
        <p className="t-label muted">We fill in your details, you check them.</p>
        {failed && (
          <Note style="failure" icon="xmark.circle.fill">
            Couldn’t read this file. Try another, or fill it in yourself.
          </Note>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <DocUpload
            what="resume"
            file={resume}
            onUpload={() => {
              setFailed(false);
              dispatch({ t: "resume", v: "Abhinav_Saxena_Resume.pdf" });
            }}
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
      <div style={{ paddingTop: 32, display: "flex", flexDirection: "column", gap: 24 }}>
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
            icon="link"
            value={linkedin}
            onChange={setLinkedin}
            placeholder="Paste your profile link. Referrers check it."
          />
          <Field label="Portfolio (optional)" icon="link" value={portfolio} onChange={setPortfolio} placeholder="Behance, Dribbble or your site" />
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
    // Figma Company Row: a 40px logo, 8 clear, role Semi Bold 16/24 over company 12/16
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Image src={`/images/sidedoor/${logo}.png`} alt="" width={40} height={40} style={{ width: 40, height: "auto", flex: "0 0 auto" }} />
      <span style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <span className="t-h-sm">{role}</span>
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
      <span className="t-h-sm">{title}</span>
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
  const { force, dispatch } = useStore();
  const [code, setCode] = useState(force === "verify.wrong-code" ? "482010" : "");
  const [email, setEmail] = useState(force === "verify.personal" ? "nithin.agarwal@gmail.com" : "nithin.agarwal@flipkart.com");
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
      <div style={{ paddingTop: 32, display: "flex", flexDirection: "column", gap: 24 }}>
        <p className="t-label muted">
          Candidates see your name, role and company. The verified tick shows after we check your work email.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Field label="Your name" icon="person.fill" value="Nithin Agarwal" />
          <Field
            label="Work email"
            icon="envelope.fill"
            value={email}
            onChange={setEmail}
            error={personal ? "Use your work email. A personal one can’t be verified." : undefined}
          />
          <Field
            label="Code from your email"
            icon="lock.fill"
            value={code}
            onChange={(v) => setCode(v.replace(/\D/g, "").slice(0, 6))}
            placeholder="6-digit code"
            help={!wrong ? "For this prototype the code is 482013" : undefined}
            error={wrong ? "That code doesn’t match. Check the email again." : undefined}
          />
          <Field label="Your role" icon="briefcase.fill" value="Design Manager" />
          <Field label="Where you work from" icon="mappin.and.ellipse" value="Bengaluru, KA" />
        </div>
      </div>
    </Screen>
  );
}

/* ── Referrer: add a job ────────────────────────────────────────────────── */
export function AddJob() {
  const nav = useNav();
  const { force } = useStore();
  const [file, setFile] = useState<string | null>(null);
  const [failed, setFailed] = useState(force === "job.unreadable");
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
      <div style={{ paddingTop: 32, display: "flex", flexDirection: "column", gap: 24 }}>
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
              setFailed(false);
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
      <div style={{ paddingTop: 32, display: "flex", flexDirection: "column", gap: 24 }}>
        <p className="t-label muted">Filled from Flipkart_IxDesigner_JD.docx. Check it before you post.</p>

        <Section
          label="Job ID"
          icon="doc.on.doc.fill"
          end={!jobId.trim() ? <Tag style="buffer">Still needed</Tag> : undefined}
        >
          <Field
            icon="doc.on.doc.fill"
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
          icon="lightbulb.fill"
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
      <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
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
