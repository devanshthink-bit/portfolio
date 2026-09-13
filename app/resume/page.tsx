import type { Metadata } from "next";
import ResumeActions from "../../components/ResumeActions";

export const metadata: Metadata = {
  title: "Resume · Devansh Somvanshi",
};

// Opens from the dock like About. The résumé shows whole, in one view with no scroll, with a row
// of actions above it (download, open, print, copy link, share on phones).
// The image is his CV PDF rendered at 3x (2382 x 3369, lossless WebP) and served as is,
// not through the Next image optimiser, which shrank it and made it soft.
export default function ResumePage() {
  return (
    <>
      <style>{`
        .page-wrapper:has(.resume-page) { height: 100dvh; padding-bottom: 0; overflow: hidden; }
        .resume-page { display: flex; flex-direction: column; align-items: center; gap: 14px; }
        .resume-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
        .resume-btn { display: inline-flex; align-items: center; gap: 7px; height: 36px; padding: 0 14px;
          border-radius: 100px; border: 0; background: transparent; cursor: pointer;
          font-family: var(--font-inter), sans-serif; font-size: 13.5px; font-weight: 500; letter-spacing: -0.01em;
          color: var(--text-primary); text-decoration: none; box-shadow: inset 0 0 0 1px var(--border);
          transition: background-color 0.2s ease, box-shadow 0.2s ease; }
        .resume-btn:hover { box-shadow: inset 0 0 0 1px var(--text-muted); }
        .resume-btn.is-primary { background: var(--text-primary); color: var(--bg); box-shadow: none; }
        .resume-btn.is-primary:hover { opacity: 0.88; }
        .resume-btn:focus-visible { outline: 2px solid var(--text-primary); outline-offset: 2px; }
        /* 50px is the button row plus its gap; 100px at the bottom clears the dock. */
        .resume-page img { display: block; height: auto; width: auto; max-width: 100%;
          max-height: calc(100dvh - var(--nav-h) - 24px - 50px - 100px); }
        @media (max-width: 640px) {
          .resume-btn { height: 32px; padding: 0 11px; font-size: 12.5px; }
          .resume-page img { max-height: calc(100dvh - var(--nav-h) - 16px - 90px - 100px); }
        }
      `}</style>
      <div className="resume-page">
        <ResumeActions />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/resume/Devansh_Somvanshi_CV.webp" alt="Devansh Somvanshi, resume" width={2382} height={3369} fetchPriority="high" />
      </div>
    </>
  );
}
