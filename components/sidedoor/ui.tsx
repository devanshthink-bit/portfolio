"use client";
// The V6 component library, in code. One file, because every screen draws from the same set and
// the rules ("same kind of thing, same values") only hold if there is one place to change them.
// Names match the Figma components: AppHeader, SectionLabel, DetailField, MatchRow, PersonRow,
// RequestCard, PostCard, MenuRow, Tag, Button, InputField, Switch, SegmentedControl, TabBar.
import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Icon, type IconName } from "./Icon";
import { useNav } from "./nav";

/* ── status bar ─────────────────────────────────────────────────────────── */
export function StatusBar({ light }: { light?: boolean }) {
  return (
    <div className={`sd-statusbar${light ? " is-light" : ""}`} aria-hidden="true">
      <b>9:41</b>
      <span className="sd-sb-right">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor" style={{ color: light ? "#fff" : "#1a1a1a" }}>
          <rect x="0" y="7.5" width="3" height="4.5" rx="1" />
          <rect x="5" y="5" width="3" height="7" rx="1" />
          <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor" style={{ color: light ? "#fff" : "#1a1a1a" }}>
          <path d="M8.5 11.4 6.3 9.1a3.2 3.2 0 0 1 4.4 0l-2.2 2.3ZM4.4 7.2 2.8 5.5a8.2 8.2 0 0 1 11.4 0l-1.6 1.7a5.9 5.9 0 0 0-8.2 0ZM1 3.7 0 2.6a12 12 0 0 1 17 0l-1 1.1a10.6 10.6 0 0 0-15 0Z" />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13" style={{ color: light ? "#fff" : "#1a1a1a" }}>
          <rect x="0.5" y="0.5" width="22" height="12" rx="3.5" fill="none" stroke="currentColor" strokeOpacity="0.4" />
          <rect x="2" y="2" width="19" height="9" rx="2.2" fill="currentColor" />
          <path d="M24.5 4.3c1 .3 1.6 1 1.6 2.2s-.6 1.9-1.6 2.2V4.3Z" fill="currentColor" fillOpacity="0.5" />
        </svg>
      </span>
    </div>
  );
}

export function HomeIndicator({ light }: { light?: boolean }) {
  return <div className={`sd-home${light ? " is-light" : ""}`} aria-hidden="true" />;
}

/* ── screen chrome ──────────────────────────────────────────────────────── */
export function BarButton({
  icon,
  label,
  onClick,
  badge,
}: {
  icon?: IconName;
  label?: string;
  onClick?: () => void;
  badge?: boolean;
}) {
  return (
    <button className="sd-barbtn" onClick={onClick} aria-label={label ?? icon} style={{ position: "relative" }}>
      {icon && <Icon name={icon} size={22} />}
      {label && !icon && <span className="t-label">{label}</span>}
      {badge && (
        <i
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--sd-ios-red)",
          }}
        />
      )}
    </button>
  );
}

export function BackButton({ onClick }: { onClick?: () => void }) {
  const nav = useNav();
  return (
    <button className="sd-barbtn is-back" onClick={onClick ?? nav.pop} aria-label="Back">
      <Icon name="chevron.left" size={22} style={{ color: "var(--sd-link)" }} />
    </button>
  );
}

/**
 * Every screen is this. `title` centred with a back chevron is an inner screen; `largeTitle`
 * is a tab root, where the big name shrinks into the bar as you scroll (iOS).
 */
export function Screen({
  title,
  largeTitle,
  back,
  onBack,
  right,
  children,
  actions,
  pad = true,
  light,
  noBar,
  scrollRef,
  onScroll,
  headerAccessory,
}: {
  title?: string;
  largeTitle?: string;
  back?: boolean;
  onBack?: () => void;
  right?: ReactNode;
  children: ReactNode;
  /** Buttons pinned to the bottom of the screen, above the tab bar. */
  actions?: ReactNode;
  pad?: boolean;
  light?: boolean;
  noBar?: boolean;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
  onScroll?: (y: number) => void;
  headerAccessory?: ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);
  const ownRef = useRef<HTMLDivElement>(null);
  const ref = scrollRef ?? ownRef;
  return (
    <>
      <StatusBar light={light} />
      {!noBar && (
        <div className={`sd-nav-wrap${scrolled ? " is-scrolled" : ""}${largeTitle ? " has-large" : ""}`}>
          <div className="sd-nav">
            <span className="sd-nav-lead">{back && <BackButton onClick={onBack} />}</span>
            <span className="sd-nav-title">{title ?? largeTitle}</span>
            <span className="sd-nav-trail">{right}</span>
          </div>
        </div>
      )}
      <div
        className="sd-body"
        ref={ref}
        onScroll={(e) => {
          const y = (e.target as HTMLDivElement).scrollTop;
          setScrolled(y > (largeTitle ? 32 : 4));
          onScroll?.(y);
        }}
      >
        {largeTitle && <h1 className="sd-largetitle">{largeTitle}</h1>}
        {headerAccessory}
        <div className={pad ? "sd-pad" : undefined}>{children}</div>
        {/* The action block scrolls with the content. On a short screen `margin-top: auto`
            pushes it to the bottom; on a long one it follows the content and the page ends
            40 below it (DESIGN_LANGUAGE, "Spacing by role"). */}
        {actions ? (
          <div className="sd-actionblock">{actions}</div>
        ) : (
          <div style={{ height: 108 }} />
        )}
      </div>
    </>
  );
}

/** A screen with no tab bar and no phone chrome reuse: forms in onboarding, web link pages. */
export function FormScreen({
  title,
  subtitle,
  step,
  back,
  onBack,
  children,
  actions,
  right,
}: {
  title: string;
  subtitle?: string;
  step?: string;
  back?: boolean;
  onBack?: () => void;
  children?: ReactNode;
  actions?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <Screen back={back} onBack={onBack} title={step} right={right} actions={actions}>
      <div style={{ paddingTop: 32 - 24 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 4, textAlign: "center" }}>
        <h2 className="t-h-sm">{title}</h2>
        {subtitle && <p className="t-label muted">{subtitle}</p>}
      </div>
      <div style={{ height: 24 }} />
      {children}
    </Screen>
  );
}

/* ── tab bar ────────────────────────────────────────────────────────────── */
export type TabKey = "home" | "requests" | "messages" | "profile";

export function TabBar({
  tabs,
  active,
  onPick,
}: {
  tabs: { key: string; label: string; icon: IconName; iconOn: IconName; badge?: number }[];
  active: string;
  onPick: (key: string) => void;
}) {
  return (
    <nav className="sd-tabbar" aria-label="Tabs">
      {tabs.map((t) => {
        const on = t.key === active;
        return (
          <button key={t.key} className={`sd-tab${on ? " is-on" : ""}`} onClick={() => onPick(t.key)} aria-current={on}>
            <Icon name={on ? t.iconOn : t.icon} size={25} />
            <span>{t.label}</span>
            {!!t.badge && <i className="sd-tab-badge">{t.badge}</i>}
          </button>
        );
      })}
    </nav>
  );
}

/* ── buttons ────────────────────────────────────────────────────────────── */
export function Button({
  children,
  type = "primary",
  onClick,
  disabled,
  icon,
  small,
  style,
}: {
  children: ReactNode;
  type?: "primary" | "secondary" | "apple" | "destructive";
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
  small?: boolean;
  style?: CSSProperties;
}) {
  return (
    <button
      className={`sd-btn ${type}${small ? " small" : ""}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {icon}
      {children}
    </button>
  );
}

/** A small action inside a card row. 28pt tall, 44pt tap area (Apple's rule). */
export function SmallButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <span className="sd-hit44">
      <button className="sd-btn small" onClick={onClick}>
        {children}
      </button>
    </span>
  );
}

export function TextButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button className="sd-textbtn" onClick={onClick}>
      {children}
    </button>
  );
}

export function Actions({ children }: { children: ReactNode }) {
  return <div className="sd-actions">{children}</div>;
}

/* ── tags ───────────────────────────────────────────────────────────────── */
export type TagStyle = "neutral" | "primary" | "success" | "buffer" | "failure";

export function Tag({
  children,
  style: kind = "neutral",
  icon,
  note,
}: {
  children: ReactNode;
  style?: TagStyle;
  icon?: IconName;
  note?: boolean;
}) {
  return (
    <span className={`sd-tag ${kind}${note ? " note" : ""}`}>
      {icon && <Icon name={icon} size={16} />}
      <span>{children}</span>
    </span>
  );
}

/** A note is a Tag, not a coloured box (V2 pattern). Always above the thing it explains. */
export function Note({ children, style: kind = "neutral", icon = "info.circle.fill" }: { children: ReactNode; style?: TagStyle; icon?: IconName }) {
  return (
    <Tag style={kind} icon={icon} note>
      {children}
    </Tag>
  );
}

/* ── cards, sections, lists ─────────────────────────────────────────────── */
export function Card({ children, onClick, style }: { children: ReactNode; onClick?: () => void; style?: CSSProperties }) {
  return (
    <div
      className="sd-card"
      onClick={onClick}
      style={{ ...style, cursor: onClick ? "pointer" : undefined }}
      role={onClick ? "button" : undefined}
    >
      {children}
    </div>
  );
}

export function Box({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="sd-box" style={style}>
      {children}
    </div>
  );
}

export function SectionLabel({ icon, children, end }: { icon?: IconName; children: ReactNode; end?: ReactNode }) {
  return (
    <div className="sd-seclabel">
      {icon && <Icon name={icon} size={16} style={{ color: "var(--sd-icon-2)" }} />}
      <span>{children}</span>
      {end && <span className="sd-sl-end">{end}</span>}
    </div>
  );
}

export function Section({ label, icon, end, children }: { label?: string; icon?: IconName; end?: ReactNode; children: ReactNode }) {
  return (
    <section className="sd-section">
      {label && (
        <SectionLabel icon={icon} end={end}>
          {label}
        </SectionLabel>
      )}
      {children}
    </section>
  );
}

export function ListGroup({ children }: { children: ReactNode }) {
  return <div className="sd-list">{children}</div>;
}

export function Row({
  icon,
  children,
  end,
  onClick,
  chevron,
  destructive,
}: {
  icon?: IconName;
  children: ReactNode;
  end?: ReactNode;
  onClick?: () => void;
  chevron?: boolean;
  destructive?: boolean;
}) {
  return (
    <div className={`sd-row${onClick ? " is-tap" : ""}`} onClick={onClick} role={onClick ? "button" : undefined}>
      {icon && <Icon name={icon} size={22} style={{ color: destructive ? "var(--sd-ios-red)" : "var(--sd-icon-2)" }} />}
      <span className="t-body-lg" style={{ color: destructive ? "var(--sd-ios-red)" : undefined }}>
        {children}
      </span>
      {end && <span style={{ marginLeft: "auto" }}>{end}</span>}
      {chevron && (
        <span className="sd-row-chev" style={{ marginLeft: end ? 6 : "auto" }}>
          <Icon name="chevron.right" size={16} style={{ color: "var(--sd-n400)" }} />
        </span>
      )}
    </div>
  );
}

/** Label on the left, value on the right, in a read-only details box. */
export function DetailField({ name, value, icon }: { name: string; value: ReactNode; icon?: IconName }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "8px 0" }}>
      {icon && <Icon name={icon} size={16} style={{ color: "var(--sd-icon-2)", marginTop: 2 }} />}
      <span className="t-label-sm muted" style={{ width: 104, flex: "0 0 auto" }}>
        {name}
      </span>
      <span className="t-label" style={{ flex: "1 1 auto" }}>
        {value}
      </span>
    </div>
  );
}

/** One line of the fit report: what matched, and where it came from. */
export function MatchRow({ ok, children, source }: { ok: boolean; children: ReactNode; source?: string }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "6px 0" }}>
      {ok ? (
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "var(--sd-link)",
            display: "grid",
            placeItems: "center",
            flex: "0 0 auto",
            marginTop: 1,
          }}
        >
          <Icon name="checkmark" size={11} style={{ color: "#fff" }} />
        </span>
      ) : (
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            border: "2px solid var(--sd-border)",
            flex: "0 0 auto",
            marginTop: 1,
          }}
        />
      )}
      <span style={{ flex: "1 1 auto" }}>
        <span className="t-h-xs">{children}</span>
        {source && (
          <span className="t-label-sm muted" style={{ display: "block" }}>
            {source}
          </span>
        )}
      </span>
    </div>
  );
}

/* ── people and logos ───────────────────────────────────────────────────── */
export function Avatar({ name, size = 44, src }: { name: string; size?: number; src?: string | StaticImageData }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <span className="sd-av" style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}>
      {src ? (
        <Image src={src} alt="" width={size} height={size} style={{ objectFit: "cover" }} />
      ) : (
        initials
      )}
    </span>
  );
}

/**
 * A company logo on a white tile. The V6 logos are wordmarks of very different shapes, so the
 * logo is fitted inside the padded box rather than forced to a width: a square mark fills it,
 * a wide wordmark sits centred at full width. 74 with 10 padding is the detail-header size
 * from DESIGN_LANGUAGE; 44 is the leading slot in a list card.
 */
export function LogoTile({ logo, alt, size = 74 }: { logo: string; alt: string; size?: number }) {
  const pad = size >= 74 ? 10 : Math.round(size * 0.16);
  return (
    <span className="sd-logotile" style={{ width: size, height: size, padding: pad }}>
      <Image
        src={`/images/sidedoor/${logo}.png`}
        alt={alt}
        width={size * 4}
        height={size * 4}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </span>
  );
}

export function LogoSmall({ logo, alt }: { logo: string; alt: string }) {
  return (
    <span className="sd-logo-sm">
      <Image src={`/images/sidedoor/${logo}.png`} alt={alt} width={28} height={28} style={{ width: 28, height: "auto" }} />
    </span>
  );
}

export function PersonRow({
  name,
  sub,
  time,
  verified,
  avatarSize = 44,
  end,
}: {
  name: string;
  sub?: string;
  time?: string;
  verified?: boolean;
  avatarSize?: number;
  end?: ReactNode;
}) {
  return (
    <div className="sd-person">
      <Avatar name={name} size={avatarSize} />
      <div style={{ flex: "1 1 auto", display: "flex", flexDirection: "column", gap: 4 }}>
        <span className="sd-person-name">
          {name}
          {verified && <Icon name="checkmark.seal.fill" size={16} style={{ color: "var(--sd-link)" }} />}
        </span>
        {sub && <span className="sd-person-sub">{sub}</span>}
      </div>
      {time && (
        <span className="sd-person-time">
          <Icon name="clock" size={13} />
          {time}
        </span>
      )}
      {end}
    </div>
  );
}

/* ── timeline ───────────────────────────────────────────────────────────── */
export type Step = { title: string; when?: string; state: "done" | "current" | "pending" };

export function Timeline({ steps }: { steps: Step[] }) {
  return (
    <div className="sd-timeline">
      {steps.map((s, i) => (
        <div className="sd-tl-step" key={s.title}>
          <span className="sd-tl-rail">
            {s.state === "done" && (
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "var(--sd-link)",
                  display: "grid",
                  placeItems: "center",
                  flex: "0 0 auto",
                }}
              >
                <Icon name="checkmark" size={11} style={{ color: "#fff" }} />
              </span>
            )}
            {s.state === "current" && (
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: "2px solid var(--sd-link)",
                  display: "grid",
                  placeItems: "center",
                  flex: "0 0 auto",
                }}
              >
                <i style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--sd-link)" }} />
              </span>
            )}
            {s.state === "pending" && (
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: "2px solid var(--sd-border)",
                  flex: "0 0 auto",
                }}
              />
            )}
            {i < steps.length - 1 && (
              <span className={`sd-tl-line${s.state === "current" || s.state === "pending" ? " is-dashed" : ""}`} />
            )}
          </span>
          <span className="sd-tl-body">
            <span className={`sd-tl-title${s.state === "done" || s.state === "current" ? " is-done" : ""}`}>{s.title}</span>
            {s.when && <span className="sd-tl-when">{s.when}</span>}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── inputs ─────────────────────────────────────────────────────────────── */
export function Field({
  label,
  value,
  onChange,
  placeholder,
  help,
  error,
  multiline,
  end,
  type = "text",
  readOnly,
  onClick,
}: {
  label?: string;
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  help?: string;
  error?: string;
  multiline?: boolean;
  end?: ReactNode;
  type?: string;
  readOnly?: boolean;
  onClick?: () => void;
}) {
  const [focus, setFocus] = useState(false);
  return (
    <div className="sd-field">
      {label && <label className="t-h-xs">{label}</label>}
      <div
        className={`sd-input${focus ? " is-focus" : ""}${error ? " is-error" : ""}`}
        onClick={onClick}
        style={{ alignItems: multiline ? "flex-start" : "center", minHeight: multiline ? 96 : 48 }}
      >
        {multiline ? (
          <textarea
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            rows={4}
            readOnly={readOnly}
          />
        ) : (
          <input
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            type={type}
            readOnly={readOnly}
          />
        )}
        {end}
      </div>
      {error ? <span className="sd-field-err">{error}</span> : help ? <span className="sd-field-help">{help}</span> : null}
    </div>
  );
}

export function Search({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="sd-search">
      <Icon name="magnifyingglass" size={17} style={{ color: "var(--sd-placeholder)" }} />
      <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export function Switch({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button className={`sd-switch${on ? " is-on" : ""}`} onClick={() => onChange(!on)} role="switch" aria-checked={on}>
      <i />
    </button>
  );
}

export function Segmented({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="sd-seg">
      {options.map((o) => (
        <button key={o} className={o === value ? "is-on" : ""} onClick={() => onChange(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}

export function Tabs({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="sd-tabs">
      {options.map((o) => (
        <button key={o} className={o === value ? "is-on" : ""} onClick={() => onChange(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}

export function RadioOption({
  title,
  sub,
  on,
  onClick,
}: {
  title: string;
  sub?: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        gap: 12,
        alignItems: "center",
        background: "#fff",
        borderRadius: "var(--sd-r-lg)",
        padding: 16,
        textAlign: "left",
        boxShadow: on ? "inset 0 0 0 2px var(--sd-link)" : "none",
      }}
    >
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          border: on ? "7px solid var(--sd-link)" : "2px solid var(--sd-border)",
          flex: "0 0 auto",
        }}
      />
      <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span className="t-h-sm">{title}</span>
        {sub && <span className="t-label muted">{sub}</span>}
      </span>
    </button>
  );
}

/* ── sheets ─────────────────────────────────────────────────────────────── */
/** A bottom sheet you can drag down to dismiss, like every iOS sheet. */
export function Sheet({ title, children, onClose, leaving }: { title?: string; children: ReactNode; onClose: () => void; leaving?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const start = useRef<number | null>(null);
  const [dy, setDy] = useState(0);
  const [settling, setSettling] = useState(false);

  const down = (y: number) => {
    start.current = y;
    setSettling(false);
  };
  const move = (y: number) => {
    if (start.current == null) return;
    setDy(Math.max(0, y - start.current));
  };
  const up = () => {
    if (start.current == null) return;
    const far = dy > 110;
    start.current = null;
    if (far) {
      onClose();
      return;
    }
    setSettling(true);
    setDy(0);
  };

  return (
    <>
      <div className={`sd-scrim${leaving ? " is-out" : ""}`} onClick={onClose} />
      <div
        ref={ref}
        className={`sd-sheet${leaving ? " is-out" : ""}${dy ? " is-dragging" : settling ? " is-settling" : ""}`}
        style={dy ? { transform: `translateY(${dy}px)` } : undefined}
        onPointerDown={(e) => down(e.clientY)}
        onPointerMove={(e) => move(e.clientY)}
        onPointerUp={up}
        onPointerCancel={up}
      >
        <span className="sd-grab" />
        {title && (
          <div style={{ padding: "8px 0 16px" }}>
            <h2 className="sd-sheet-title">{title}</h2>
          </div>
        )}
        <div className="sd-sheet-body">{children}</div>
      </div>
    </>
  );
}

/** The iOS action sheet: used for Log out, which is red and asks first. */
export function ActionSheet({
  message,
  options,
  onCancel,
}: {
  message?: string;
  options: { label: string; destructive?: boolean; onClick: () => void }[];
  onCancel: () => void;
}) {
  return (
    <>
      <div className="sd-scrim" onClick={onCancel} />
      <div className="sd-actionsheet">
        <div className="sd-as-group">
          {message && <div className="sd-as-msg">{message}</div>}
          {options.map((o) => (
            <button key={o.label} className={`sd-as-btn${o.destructive ? " is-destructive" : ""}`} onClick={o.onClick}>
              {o.label}
            </button>
          ))}
        </div>
        <div className="sd-as-group sd-as-cancel">
          <button className="sd-as-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

/* ── toast ──────────────────────────────────────────────────────────────── */
export function Toast({ children, icon = "checkmark" }: { children: ReactNode; icon?: IconName }) {
  return (
    <div className="sd-toast">
      <Icon name={icon} size={18} style={{ color: "var(--sd-text-success)" }} />
      <span>{children}</span>
    </div>
  );
}

/* ── loading and empty ──────────────────────────────────────────────────── */
export function Skel({ w, h, r = 4, style }: { w?: number | string; h: number; r?: number; style?: CSSProperties }) {
  return <span className="sd-skel" style={{ display: "block", width: w ?? "100%", height: h, borderRadius: r, ...style }} />;
}

export function SkeletonCard() {
  return (
    <Card>
      <div style={{ display: "flex", gap: 12 }}>
        <Skel w={44} h={44} r={22} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <Skel w="70%" h={16} />
          <Skel w="45%" h={14} />
        </div>
      </div>
      <div style={{ height: 12 }} />
      <Skel h={14} />
    </Card>
  );
}

export function Empty({
  icon,
  title,
  body,
  action,
}: {
  icon: IconName;
  title: string;
  body?: string;
  action?: ReactNode;
}) {
  return (
    <div className="sd-empty">
      <span className="sd-empty-icon">
        <Icon name={icon} size={30} />
      </span>
      <h3 className="t-h-sm">{title}</h3>
      {body && <p className="t-body muted" style={{ maxWidth: 300 }}>{body}</p>}
      {action && <div style={{ width: "100%", marginTop: 12 }}>{action}</div>}
    </div>
  );
}

export function Spinner() {
  return <span className="sd-spin" />;
}

/* ── the wheel date picker ──────────────────────────────────────────────── */
const ROW = 36;

/**
 * One column of the picker. The browser's own scroll snapping fought the initial position, so
 * the column snaps itself: it scrolls to the chosen row on mount, and when a drag stops it
 * settles on the nearest row and reports it.
 */
function Wheel({ items, value, onPick }: { items: string[]; value: string; onPick: (v: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const settle = useRef<number | null>(null);
  const quiet = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const i = Math.max(0, items.indexOf(value));
    quiet.current = true;
    el.scrollTop = i * ROW;
    // let the programmatic jump land before scroll events count again
    const t = window.setTimeout(() => (quiet.current = false), 60);
    return () => clearTimeout(t);
    // only on mount: after that the scroll drives the value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pickAt = (top: number) => {
    const i = Math.max(0, Math.min(items.length - 1, Math.round(top / ROW)));
    if (items[i] !== value) onPick(items[i]);
    return i;
  };

  return (
    <div
      className="sd-wheel"
      ref={ref}
      onScroll={(e) => {
        if (quiet.current) return;
        const el = e.target as HTMLDivElement;
        if (settle.current) clearTimeout(settle.current);
        settle.current = window.setTimeout(() => {
          const i = pickAt(el.scrollTop);
          quiet.current = true;
          el.scrollTo({ top: i * ROW, behavior: "smooth" });
          window.setTimeout(() => (quiet.current = false), 260);
        }, 90) as unknown as number;
      }}
    >
      <div className="sd-wheel-pad" />
      {items.map((it, i) => (
        <div
          key={it}
          onClick={() => {
            quiet.current = true;
            ref.current?.scrollTo({ top: i * ROW, behavior: "smooth" });
            onPick(it);
            window.setTimeout(() => (quiet.current = false), 260);
          }}
          style={{ color: it === value ? "var(--sd-text)" : "var(--sd-text-2)", fontWeight: it === value ? 600 : 400 }}
        >
          {it}
        </div>
      ))}
      <div className="sd-wheel-pad" />
    </div>
  );
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
const YEARS = Array.from({ length: 40 }, (_, i) => String(2006 - i));

export function WheelDate({ onPick }: { onPick: (v: string) => void }) {
  const [d, setD] = useState("14");
  const [m, setM] = useState("March");
  const [y, setY] = useState("1997");
  useEffect(() => {
    onPick(`${d} ${m.slice(0, 3)} ${y}`);
  }, [d, m, y, onPick]);
  return (
    <div className="sd-wheels">
      <span className="sd-wheel-sel" />
      <Wheel items={DAYS} value={d} onPick={setD} />
      <Wheel items={MONTHS} value={m} onPick={setM} />
      <Wheel items={YEARS} value={y} onPick={setY} />
    </div>
  );
}

export { Icon };
export type { IconName };
