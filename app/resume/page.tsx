import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Resume · Devansh Somvanshi",
};

// Opens from the dock like About. Only the résumé shows: the CV page as a sharp image
// (rendered from his CV PDF at 1696 x 2400), with no PDF viewer around it.
export default function ResumePage() {
  return (
    <Image
      src="/resume/Devansh_Somvanshi_CV.webp"
      alt="Devansh Somvanshi, resume"
      width={1696}
      height={2400}
      priority
      sizes="(max-width: 980px) 100vw, 868px"
      style={{ width: "100%", height: "auto", display: "block", marginTop: 24 }}
    />
  );
}
