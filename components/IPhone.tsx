// A realistic iPhone, drawn the way the RedBus prototype viewer draws it: a titanium rim, a black
// glass bezel, side buttons and the Dynamic Island. The frame is built at its true size
// (430 x 902, screen 402 x 874) and scaled as one piece with --n (the frame width in px), so
// every phone on a page is the same shape at any size. Server-safe: no hooks.
import Image from "next/image";

// A dashed box on the screen, in % of the screen: [left, top, width, height]. The screenshots have
// the screen's own shape (780 x 1688 or 804 x 1748 for 402 x 874), so % of the image is % of the screen.
// `n` only ties a box to its note for the connector line (PhoneShot); it is never shown.
export type Mark = { n: number; box: [number, number, number, number] };

export type PhoneProps = {
  src?: string;
  alt?: string;
  lofi?: boolean;          // lo-fi screens have no status bar of their own, so the mock draws one
  n?: number;              // frame width in px; the class sets the default
  className?: string;
  priority?: boolean;
  marks?: Mark[];          // dashed boxes around the part of the screen a note talks about
  children?: React.ReactNode; // e.g. the live prototype iframe, at 402 x 874
};

export function IPhone({ src, alt = "", lofi, n, className, priority, marks, children }: PhoneProps) {
  return (
    <div className={`iphone ${className ?? ""}`} style={n ? ({ "--n": n } as React.CSSProperties) : undefined}>
      <div className="iphone-frame">
        <i className="iphone-btn silent" /><i className="iphone-btn up" /><i className="iphone-btn down" /><i className="iphone-btn power" />
        <i className="iphone-island" aria-hidden="true" />
        <div className={`iphone-screen${lofi ? " is-lofi" : ""}`}>
          {lofi && (
            <div className="iphone-sbar" aria-hidden="true">
              <b>9:41</b>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/redbus/status-icons.svg" alt="" />
            </div>
          )}
          {children ?? (src && (
            <div className="iphone-shot">
              <Image src={src} alt={alt} fill sizes="(max-width: 640px) 260px, 300px" priority={priority} style={{ objectFit: "cover", objectPosition: "top" }} />
            </div>
          ))}
          {marks?.map((m) => (
            <span key={m.n} data-mark={m.n} className="iphone-mark" aria-hidden="true"
              style={{ left: `${m.box[0]}%`, top: `${m.box[1]}%`, width: `${m.box[2]}%`, height: `${m.box[3]}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// A note beside a phone: a small red number, a line, and a quieter line under it.
export function PhoneNote({ n, title, sub }: { n?: number; title: string; sub?: string }) {
  return (
    <div className="phone-note">
      {n != null && <span className="phone-note-n" aria-hidden="true">{n}</span>}
      <div>
        <p className="phone-note-title">{title}</p>
        {sub && <p className="phone-note-sub">{sub}</p>}
      </div>
    </div>
  );
}

// Several phones in a row, each with an optional caption under it.
export function PhoneRow({ phones, className }: { phones: (PhoneProps & { label?: string; caption?: string })[]; className?: string }) {
  return (
    <div className={`phone-row ${className ?? ""}`}>
      {phones.map(({ label, caption, ...p }, i) => (
        <figure key={i} className="phone-fig">
          <IPhone {...p} />
          {(label || caption) && (
            <figcaption>
              {label && <span className="phone-fig-label">{label}</span>}
              {caption && <span className="phone-fig-cap">{caption}</span>}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
