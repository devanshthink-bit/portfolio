import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume · Devansh Somvanshi",
};

// Opens from the dock like About. Only the résumé shows, whole, in one view with no scroll.
// The image is his CV PDF rendered at 3x (2382 x 3369, lossless WebP) and served as is,
// not through the Next image optimiser, which shrank it and made it soft.
export default function ResumePage() {
  return (
    <>
      <style>{`
        .page-wrapper:has(.resume-page) { height: 100dvh; padding-bottom: 0; overflow: hidden; }
        .resume-page { display: flex; justify-content: center; }
        /* 100px at the bottom clears the dock (24px from the edge, 64px tall). */
        .resume-page img { display: block; height: auto; width: auto; max-width: 100%;
          max-height: calc(100dvh - var(--nav-h) - 24px - 100px); }
      `}</style>
      <div className="resume-page">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/resume/Devansh_Somvanshi_CV.webp" alt="Devansh Somvanshi, resume" width={2382} height={3369} fetchPriority="high" />
      </div>
    </>
  );
}
