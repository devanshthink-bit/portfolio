import type { Metadata } from "next";
import ResumeActions from "../../components/ResumeActions";

export const metadata: Metadata = {
  title: "Resume · Devansh Somvanshi",
};

// Opens from the dock like About. The résumé shows whole, in one view with no scroll, with a row
// of actions above it (download, open, print, copy link, share on phones).
// The image is his CV PDF rendered at 3x (2382 x 3369, lossless WebP) and served as is,
// not through the Next image optimiser, which shrank it and made it soft.
// Percent of the sheet: x and width over 794, y over 1123.
const RESUME_LINKS = [
  { label: "Portfolio", href: "/", x: 66.88, y: 15.32, w: 8.06 },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/devansh-somvanshi", x: 75.82, y: 15.32, w: 7.81 },
  { label: "GitHub", href: "https://github.com/devanshthink-bit", x: 84.38, y: 15.32, w: 6.93 },];

export default function ResumePage() {
  return (
    <>
      <style>{`
        .page-wrapper:has(.resume-page) { height: 100dvh; padding-bottom: 0; overflow: hidden; }
        /* The résumé stays centred; the actions hang off its right edge in a column. */
        .resume-page { display: flex; justify-content: center; }
        .resume-sheet { position: relative; max-width: 100%; }
        .resume-actions { position: absolute; top: 0; left: calc(100% + 16px);
          display: flex; flex-direction: column; align-items: flex-start; gap: 8px; }
        .resume-btn { display: inline-flex; align-items: center; height: 40px; padding: 0 11px;
          border-radius: 100px; border: 0; background: var(--bg); cursor: pointer;
          font-family: var(--font-inter), sans-serif; font-size: 13.5px; font-weight: 500; letter-spacing: -0.01em;
          color: var(--text-primary); text-decoration: none; white-space: nowrap; box-shadow: inset 0 0 0 1px var(--border);
          transition: box-shadow 0.3s var(--ease-out), opacity 0.3s var(--ease-out); }
        .resume-btn svg { width: 18px; height: 18px; flex: none; }
        .resume-btn-label { display: inline-block; overflow: hidden; max-width: 0; opacity: 0; margin-left: 0;
          transition: max-width 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease, margin-left 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
        .resume-btn:hover .resume-btn-label, .resume-btn:focus-visible .resume-btn-label { max-width: 110px; opacity: 1; margin-left: 8px; }
        .resume-btn:hover { box-shadow: inset 0 0 0 1px var(--text-muted); }
        .resume-btn.is-primary { background: var(--text-primary); color: var(--bg); box-shadow: none; }
        .resume-btn.is-primary:hover { opacity: 0.88; }
        .resume-btn:focus-visible { outline: 2px solid var(--text-primary); outline-offset: 2px; }
        /* 132px at the bottom: the dock (24px off the edge + 76px tall) and a 32px gap, so the page never touches it. */
        .resume-page img { display: block; height: auto; width: auto; max-width: 100%;
          max-height: calc(100dvh - var(--nav-h) - 24px - 132px); }
        /* An image has no links, so the PDF's link areas are laid back over it. Positions are the
           PDF's own link rects on its 794 x 1123 page, widened to take in each icon. */
        .resume-img { position: relative; }   /* the links' box is the image alone, never the action row */
        /* The page sits on the site like a sheet of paper: soft corners and a layered shadow
           that fades into the ground, so the space around it feels intended. */
        .resume-img { border-radius: 14px; overflow: hidden;
          box-shadow: 0 0 0 1px rgba(40,30,20,0.05), 0 1px 2px rgba(40,30,20,0.04),
            0 8px 24px -8px rgba(40,30,20,0.10), 0 36px 72px -24px rgba(40,30,20,0.16); }
        .resume-img img { display: block; }
        html.nerd-mode .resume-img { box-shadow: 0 0 0 1px rgba(255,255,255,0.06),
            0 8px 24px -8px rgba(0,0,0,0.5), 0 36px 72px -24px rgba(0,0,0,0.6); }
        .resume-link { position: absolute; border-radius: 4px; }
        .resume-link:focus-visible { outline: 2px solid var(--text-primary); outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) { .resume-btn-label { transition: none; } }
        /* Phones have no room at the side: a row of icons above the résumé, no labels. */
        @media (max-width: 640px) {
          .resume-sheet { display: flex; flex-direction: column; }
          .resume-actions { order: -1; position: static; flex-direction: row; justify-content: center; margin-bottom: 12px; }
          .resume-btn-label { display: none; }
          .resume-page img { max-height: calc(100dvh - var(--nav-h) - 16px - 52px - 132px); }
        }
      `}</style>
      <div className="resume-page">
        <div className="resume-sheet">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="resume-img">
            <img src="/resume/Devansh_Somvanshi_CV.webp" alt="Devansh Somvanshi, resume" width={2382} height={3369} fetchPriority="high" />
            {RESUME_LINKS.map((l) => (
              <a key={l.label} className="resume-link" href={l.href} aria-label={l.label}
                {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                style={{ left: `${l.x}%`, top: `${l.y}%`, width: `${l.w}%`, height: "1.78%" }} />
            ))}
          </div>
          <ResumeActions />
        </div>
      </div>
    </>
  );
}
