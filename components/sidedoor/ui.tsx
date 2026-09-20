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
      {/* All three are Figma's own vectors (StatusBar V6: SIM 20x14, WiFi 20x12, Battery 28x14),
          placed at the offsets Figma gives them. The old wifi arc peaked at y -0.93 in a viewBox
          that started at 0, which is why its top was being cut off. */}
      <span className="sd-sb-right">
        <svg width="20" height="14" viewBox="0 0 20 14" fill="currentColor">
          <rect x="0.4" y="8.4" width="3.2" height="4.6" rx="1" />
          <rect x="5.8" y="6" width="3.2" height="7" rx="1" />
          <rect x="11.1" y="3.4" width="3.2" height="9.6" rx="1" />
          <rect x="16.4" y="1" width="3.2" height="12" rx="1" />
        </svg>
        <svg width="20" height="12" viewBox="0 0 20 12" fill="currentColor">
          <path transform="translate(2.2 0.5)" d="M 7.8459995845792285 0 C 10.623158061106409 0 13.278924694133153 0.9796300145698773 15.381064929907506 2.775240522454262 L 15.560497436261933 2.9285083212073784 C 15.705505810528754 3.0523718802205733 15.71404474168077 3.2731382172297305 15.579035074646145 3.4077727756390312 L 14.339215244105283 4.64414779293583 C 14.21909902046929 4.763930287995203 14.027109453331116 4.772323803635892 13.89694292266167 4.6634827036924476 L 13.743428072009825 4.5351191847593135 C 12.088345760593688 3.151192210395756 10.013907078098304 2.398392820696371 7.8459995845792285 2.398392820696371 C 5.670693584359374 2.398392820696371 3.589599379849173 3.1563777608669077 1.9320552268350424 4.548956061373701 L 1.7784825476892845 4.67797942832734 C 1.6483466523529244 4.787312513026733 1.4559477781508336 4.779126306304945 1.3356236800931296 4.6591365187179665 L 0.09598304740082217 3.4229401009847455 C -0.03883752963783513 3.288494108047123 -0.03054020619564607 3.0680998124838474 0.11400975268306388 2.9441130974665275 L 0.29275671764997624 2.790794157869214 C 2.397482844353937 0.9854800026244741 5.060618446965237 0 7.8459995845792285 0 Z" />
          <path transform="translate(4.9 4.3)" d="M 5.13461147343857 0 C 6.884531801071594 0 8.564697198674867 0.5805183996391101 9.933418007969559 1.6555737380195017 L 10.126852084463307 1.8075055782331575 C 10.281069051174578 1.9286345672431626 10.294615604901617 2.1568774954740806 10.15580462052608 2.2953028094646677 L 8.911947064912347 3.535704296850684 C 8.796898591399868 3.650433124046836 8.614861210847787 3.6636108408728436 8.48440332102308 3.566654210761734 L 8.332776228240398 3.4539644443923523 C 7.408344773003315 2.7669247164466535 6.293645777382687 2.398392783873909 5.13461147343857 2.398392783873909 C 3.9684405303830697 2.3983927838739074 2.8472293384602683 2.7715083128851674 1.9197299571492126 3.466432582016028 L 1.7679479994027179 3.5801543443793764 C 1.6374823564950438 3.6779050754104623 1.4547752030048973 3.6650346134273217 1.3393849791682213 3.54996498660111 L 0.09598581434042094 2.3100203574162346 C -0.04253170027303982 2.1718876936238094 -0.029380668516447286 1.9442215750979055 0.12412617808186165 1.8228639602917784 L 0.31646406207429467 1.6708078084895228 C 1.6884393959556643 0.5861679548368304 3.376250152930365 0 5.13461147343857 0 Z" />
          <path transform="translate(7.6 8.1)" d="M 2.4139273036345803 0 C 3.1173754486895366 0 3.8008986619506886 0.18484673787628175 4.403165827248228 0.537312568626529 L 4.647188429620751 0.6801222555293217 C 4.832191268887169 0.7883917782991822 4.864725418343733 1.0417796036006945 4.713045248227254 1.19303834770189 L 2.629551264181996 3.270743502049389 C 2.501576202972484 3.3983629983766273 2.294087603320908 3.3983629983766273 2.1661125421113963 3.270743502049389 L 0.09600906686066357 1.2063916149603038 C -0.05500596084868428 1.055796177415675 -0.0235292139078071 0.8036988142249846 0.15990719114048052 0.6946310435580348 L 0.40119297157471284 0.5511670817025175 C 1.008989838981723 0.1897827142670468 1.7011887686081317 0 2.4139273036345803 0 Z" />
        </svg>
        <svg width="28" height="14" viewBox="0 0 28 14" fill="currentColor">
          <rect x="0.5" y="1" width="24" height="12" rx="3" fill="none" stroke="#6b7280" />
          <rect x="2" y="2.5" width="21" height="9" rx="1.33" />
          <path transform="translate(26 5)" d="M 1.5000001192092896 2 C 1.5000001192092896 3.1045695543289185 0.8284271359443665 3.7999999970197678 0 4 C 0 4 0.000011537224054336548 3.1045695543289185 0.000011537224054336548 2 C 0.000011537224054336548 0.8954304456710815 0 0 0 0 C 0.8284271359443665 0.20000000298023224 1.5000001192092896 0.8954304456710815 1.5000001192092896 2 Z" />
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
      {icon && <Icon name={icon} size={24} />}
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
      <Icon name="chevron.left" size={24} />
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
      {/* Figma pads the onboarding/edit form bodies 32 at the top */}
      <div style={{ paddingTop: 32 }} />
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
            <Icon name={on ? t.iconOn : t.icon} size={24} />
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
  inline,
  style,
}: {
  children: ReactNode;
  type?: "primary" | "secondary" | "apple" | "destructive";
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
  small?: boolean;
  /** A button that shares a row with another, as in the drop zone: 44 tall, label 14/20. */
  inline?: boolean;
  style?: CSSProperties;
}) {
  return (
    <button
      className={`sd-btn ${type}${small ? " small" : ""}${inline ? " inline" : ""}`}
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
export function Note({ children, style: kind = "neutral", icon }: { children: ReactNode; style?: TagStyle; icon?: IconName }) {
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

export function Section({ label, icon, end, children, style }: { label?: string; icon?: IconName; end?: ReactNode; children: ReactNode; style?: CSSProperties }) {
  return (
    <section className="sd-section" style={style}>
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
/** Figma DetailField: the label sits above the value, 2px apart. Copy=On adds an 18px
 *  copy mark on the right, 8px clear of the text. The whole field is 38 tall. */
export function DetailField({ name, value, copy }: { name: string; value: ReactNode; copy?: boolean }) {
  const text = (
    <span style={{ display: "flex", flexDirection: "column", gap: 2, flex: "1 1 auto", minWidth: 0 }}>
      <span className="t-label-sm muted">{name}</span>
      <span className="t-label">{value}</span>
    </span>
  );
  if (!copy) return <div style={{ display: "flex" }}>{text}</div>;
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {text}
      <Icon name="doc.on.doc.fill" size={18} style={{ color: "var(--sd-icon-2)", flex: "0 0 auto" }} />
    </div>
  );
}

/** Figma MatchRow: a 24px mark, 12px clear of a two-line block whose lines are 2px apart.
 *  Matched draws a filled check in blue and turns its title blue; missing and removed draw
 *  the empty circle in #d1d3d8 and keep the title in ink. */
export function MatchRow({ ok, children, source }: { ok: boolean; children: ReactNode; source?: string }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <Icon
        name={ok ? "checkmark.circle.fill" : "circle"}
        size={24}
        style={{ color: ok ? "var(--sd-link)" : "var(--sd-border)", flex: "0 0 auto" }}
      />
      <span style={{ flex: "1 1 auto", display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
        <span className="t-h-xs" style={ok ? { color: "var(--sd-link)" } : undefined}>
          {children}
        </span>
        {source && <span className="t-label-sm muted">{source}</span>}
      </span>
    </div>
  );
}

/* ── people and logos ───────────────────────────────────────────────────── */
/**
 * The people V6 draws as a photo. Figma fills every AvatarPlaceholder with a portrait — 16 of
 * them across 96 cards — so a name that is on this list resolves to its photo automatically and
 * every list, chat row and header gets the right face without being told.
 */
const PEOPLE = new Set([
  "aarush-gupta", "abhay-verma", "abhinav-saxena", "abhishek-tyagi", "advika-singh", "amit-patel",
  "arpita-singh", "avinash-banerjee", "aviral-dixit", "ayesha-sharma", "himani-kaushik",
  "joy-sehgal", "nithin-agarwal", "shivangi-joshi", "shreya-verma", "vanya-kapoor",
]);

const slugOf = (name: string) =>
  name.toLowerCase().replace(/[^a-z\s]/g, "").trim().replace(/\s+/g, "-");

export function Avatar({ name, size = 44, src }: { name: string; size?: number; src?: string | StaticImageData }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  const slug = slugOf(name);
  const photo = src ?? (PEOPLE.has(slug) ? `/images/sidedoor/people/${slug}.png` : undefined);
  return (
    <span className="sd-av" style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}>
      {photo ? (
        <Image src={photo} alt="" width={size} height={size} style={{ width: size, height: size, objectFit: "cover" }} />
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
          {verified && <Icon name="checkmark.seal.fill" size={16} style={{ color: "var(--sd-text-success)" }} />}
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
            {/* Figma marks are 24px: a filled circle-check once done, active-radio for the
                step you are on, and the empty circle in #d1d3d8 for the ones ahead. */}
            {s.state === "done" && (
              <Icon name="checkmark.circle.fill" size={24} style={{ color: "var(--sd-link)", flex: "0 0 auto" }} />
            )}
            {s.state === "current" && (
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  border: "2px solid var(--sd-link)",
                  display: "grid",
                  placeItems: "center",
                  flex: "0 0 auto",
                }}
              >
                <i style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--sd-link)" }} />
              </span>
            )}
            {s.state === "pending" && (
              <Icon name="circle" size={24} style={{ color: "var(--sd-border)", flex: "0 0 auto" }} />
            )}
            {i < steps.length - 1 && (
              <span className={`sd-tl-line${s.state === "done" ? "" : " is-dashed"}`} />
            )}
          </span>
          <span className="sd-tl-body">
            <span className={`sd-tl-title${s.state === "done" ? " is-done" : ""}`}>{s.title}</span>
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
  icon,
  iconNode,
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
  /** V6 puts a small icon beside the field's label, not inside the box */
  icon?: IconName;
  /** A field whose mark is a brand logo rather than an SF symbol (the LinkedIn field). */
  iconNode?: ReactNode;
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
      {label && (
        <label className="t-h-xs" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {iconNode ?? (icon && <Icon name={icon} size={16} style={{ color: "var(--sd-icon-2)" }} />)}
          {label}
        </label>
      )}
      {/* Figma's InputField box (Frame 234) is a fixed 52 with its row centred, not 48. */}
      <div
        className={`sd-input${focus ? " is-focus" : ""}${error ? " is-error" : ""}`}
        onClick={onClick}
        style={{ alignItems: multiline ? "flex-start" : "center", minHeight: multiline ? 100 : 52 }}
      >
        {multiline ? (
          <textarea
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            rows={2}
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
    <button className="sd-radio" onClick={onClick} aria-pressed={on}>
      <span className="sd-radio-txt">
        <span className="t-h-xs">{title}</span>
        {sub && <span className="t-label-sm muted">{sub}</span>}
      </span>
      {on && <Icon name="checkmark" size={20} style={{ color: "var(--sd-link)", flex: "0 0 auto" }} />}
    </button>
  );
}

/** Figma stacks the options flush inside one white r12 card. */
export function RadioList({ children }: { children: ReactNode }) {
  return <div className="sd-radiolist">{children}</div>;
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

/** Figma SkeletonCard: a 56px round block, 12 clear of three bars 140x16, 180x12 and
 *  110x20, eight apart. The card is 96 tall. */
export function SkeletonCard() {
  return (
    <Card>
      <div style={{ display: "flex", gap: 12 }}>
        <Skel w={56} h={56} r={9999} />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Skel w={140} h={16} />
          <Skel w={180} h={12} />
          <Skel w={110} h={20} />
        </div>
      </div>
    </Card>
  );
}

/**
 * Figma draws an empty state as one left-aligned line of Inter Medium 14/20 in #636a75 with
 * a full-width primary button 12 below it — no icon disc, no separate heading. `icon` is kept
 * on the signature so call sites read the same, and is not drawn.
 */
export function Empty({
  icon,
  title,
  body,
  action,
}: {
  icon?: IconName;
  title: string;
  body?: string;
  action?: ReactNode;
}) {
  const line = body ? `${title.replace(/\.$/, "")}. ${body}` : title;
  return (
    <div className="sd-empty">
      <p className="t-label muted">{line}</p>
      {action}
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
          /* Figma: every row is Inter Medium 14/20 — only the colour changes */
          style={{ color: it === value ? "var(--sd-text)" : "var(--sd-text-2)" }}
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
