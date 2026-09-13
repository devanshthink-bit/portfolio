import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume · Devansh Somvanshi",
};

// Opens from the dock like About. The PDF is served from /public/resume, inside the site.
export default function ResumePage() {
  return (
    <div className="section" style={{ marginTop: 24 }}>
      <h3 className="section-title">Resume</h3>
      <iframe className="resume-frame" src="/resume/Devansh_Somvanshi_CV.pdf#view=FitH" title="Devansh Somvanshi, resume" />
    </div>
  );
}
