// A realistic iPhone, drawn the way the RedBus prototype viewer draws it: a titanium rim, a black
// glass bezel, side buttons and the Dynamic Island. The frame is built at its true size
// (430 x 902, screen 402 x 874) and scaled as one piece with --n (the frame width in px), so
// every phone on a page is the same shape at any size. Server-safe: no hooks.
import Image from "next/image";

type PhoneProps = {
  src?: string;
  alt?: string;
  lofi?: boolean;          // lo-fi screens have no status bar of their own, so the mock draws one
  n?: number;              // frame width in px; the class sets the default
  className?: string;
  priority?: boolean;
  children?: React.ReactNode; // e.g. the live prototype iframe, at 402 x 874
};

export function IPhone({ src, alt = "", lofi, n, className, priority, children }: PhoneProps) {
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
        </div>
      </div>
    </div>
  );
}

// Handwritten notes beside a phone, the way the case study's screens have always been annotated.
export function PhoneNote({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="phone-note">
      <p className="phone-note-title">{title}</p>
      {sub && <p className="phone-note-sub">{sub}</p>}
    </div>
  );
}

// One phone with its notes: phone on the left, notes on the right; stacked on a phone screen.
export function PhoneShot({ notes, ...phone }: PhoneProps & { notes?: { title: string; sub?: string }[] }) {
  return (
    <div className="phone-shot">
      <IPhone {...phone} />
      {notes && notes.length > 0 && (
        <div className="phone-notes">
          {notes.map((x) => <PhoneNote key={x.title} {...x} />)}
        </div>
      )}
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
