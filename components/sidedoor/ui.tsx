"use client";
// The V6 component library, in code. One file, because every screen draws from the same set and
// the rules ("same kind of thing, same values") only hold if there is one place to change them.
// Names match the Figma components: AppHeader, SectionLabel, DetailField, MatchRow, PersonRow,
// RequestCard, PostCard, MenuRow, Tag, Button, InputField, Switch, SegmentedControl, TabBar.
import Image, { type StaticImageData } from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Icon, type IconName } from "./Icon";
import { useNav } from "./nav";
import { useStore } from "./store";
import { RULES, fieldError, showDays, showYears, type FieldKind } from "./rules";
export { allValid, fieldError, showDays, showYears, type FieldKind } from "./rules";

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
  pinned,
  fixedActions,
  ownOffline,
}: {
  /** Stays put under the large title while only the list below it scrolls: a filter, a search. */
  pinned?: ReactNode;
  /** The action block sits on the bottom edge from the start and the content scrolls under it. */
  fixedActions?: boolean;
  /** the screen says it's offline at its own button, so the top note would repeat it */
  ownOffline?: boolean;
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
  const { offline } = useStore();
  const ownRef = useRef<HTMLDivElement>(null);
  const ref = scrollRef ?? ownRef;
  // A fixed action block floats over the end of the content, so the content keeps that much
  // room at its foot and its last line can still scroll clear of the button.
  const fixedRef = useRef<HTMLDivElement>(null);
  const [fixedH, setFixedH] = useState(0);
  useLayoutEffect(() => {
    const el = fixedRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setFixedH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [fixedActions]);
  return (
    <>
      <StatusBar light={light} />
      {!noBar && (
        <div className={`sd-nav-wrap${scrolled && pinned === undefined ? " is-scrolled" : ""}${largeTitle ? " has-large" : ""}`}>
          <div className="sd-nav">
            <span className="sd-nav-lead">{back && <BackButton onClick={onBack} />}</span>
            <span className="sd-nav-title">{title ?? largeTitle}</span>
            <span className="sd-nav-trail">{right}</span>
          </div>
        </div>
      )}
      {pinned !== undefined && (
        // the title and the controls under it don't move; a hairline shows once the list is under them
        <div className={`sd-pinned${scrolled ? " is-scrolled" : ""}`}>
          {largeTitle && <h1 className="sd-largetitle">{largeTitle}</h1>}
          {pinned && <div className="sd-pad">{pinned}</div>}
        </div>
      )}
      <div
        className="sd-body"
        // Lenis owns the page wheel; a nested scroller only gets it when it says so.
        data-lenis-prevent
        ref={ref}
        onScroll={(e) => {
          const y = (e.target as HTMLDivElement).scrollTop;
          setScrolled(y > (largeTitle && pinned === undefined ? 32 : 4));
          onScroll?.(y);
        }}
      >
        {largeTitle && pinned === undefined && <h1 className="sd-largetitle">{largeTitle}</h1>}
        {headerAccessory}
        {/* Figma "Offline": one amber note at the top of whatever the screen shows, which is
            what was last loaded. Actions that need the network say so themselves. */}
        {offline && !ownOffline && (
          <div className="sd-pad" style={{ paddingTop: 24 }}>
            <Note style="buffer" icon="info.circle.fill">You’re offline. Showing what was saved.</Note>
          </div>
        )}
        <div className={pad ? "sd-pad" : undefined}>{children}</div>
        {/* The action block scrolls with the content. On a short screen `margin-top: auto`
            pushes it to the bottom; on a long one it follows the content and the page ends
            40 below it (DESIGN_LANGUAGE, "Spacing by role"). */}
        {actions && !fixedActions ? (
          <div className="sd-actionblock">{actions}</div>
        ) : (
          // height comes from CSS: 112 under a tab bar, 40 without one. An inline height here
          // used to stack on top of the body's own padding-bottom and left a dead half-screen.
          <div style={fixedH ? { height: fixedH } : undefined} />
        )}
      </div>
      {actions && fixedActions && (
        <div className="sd-actionblock is-fixed" ref={fixedRef}>
          {actions}
        </div>
      )}
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

/**
 * The selection pill that glides between options, as iOS 26 does in its tab bar and segmented
 * controls: it slides to the new place and swells a little on the way, like a drop of glass,
 * then settles. The resting place is plain CSS (--i), so it is right before any script runs.
 */
function useGlide(index: number) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(index);
  useLayoutEffect(() => {
    const el = ref.current;
    const from = prev.current;
    prev.current = index;
    if (!el || from === index || !el.animate) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const at = (i: number, sx = 1, sy = 1) => `translateX(${i * 100}%) scale(${sx}, ${sy})`;
    el.animate(
      [
        { transform: at(from) },
        { transform: at(from + (index - from) * 0.55, 1.16, 1.1), offset: 0.45 },
        { transform: at(index) },
      ],
      { duration: 480, easing: "cubic-bezier(0.32, 0.72, 0, 1)" }
    );
  }, [index]);
  return ref;
}

export function TabBar({
  tabs,
  active,
  onPick,
}: {
  tabs: { key: string; label: string; icon: IconName; iconOn: IconName; badge?: number }[];
  active: string;
  onPick: (key: string) => void;
}) {
  const onAt = Math.max(0, tabs.findIndex((t) => t.key === active));
  const glide = useGlide(onAt);
  return (
    <nav className="sd-tabbar" aria-label="Tabs" style={{ "--n": tabs.length } as CSSProperties}>
      <span className="sd-glide" ref={glide} style={{ "--i": onAt } as CSSProperties} aria-hidden />
      {tabs.map((t) => {
        const on = t.key === active;
        return (
          <button key={t.key} className={`sd-tab${on ? " is-on" : ""}`} onClick={() => onPick(t.key)} aria-current={on}>
            <Icon name={on ? t.iconOn : t.icon} size={24} />
            <span>{t.label}</span>
            {!!t.badge && <span className="sd-tab-badge">{t.badge}</span>}
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
/** A small outlined row action. `done` keeps the same box but greys it and adds a check
 *  (Invite → Invited), so the two states match in size and shape. */
export function SmallButton({ children, onClick, done }: { children: ReactNode; onClick?: () => void; done?: boolean }) {
  return (
    <span className="sd-hit44">
      <button className={`sd-btn small${done ? " is-done" : ""}`} onClick={onClick} disabled={done}>
        {done && <Icon name="checkmark" size={14} />}
        {children}
      </button>
    </span>
  );
}

export function TextButton({ children, onClick, disabled }: { children: ReactNode; onClick?: () => void; disabled?: boolean }) {
  return (
    <button className="sd-textbtn" onClick={onClick} disabled={disabled}>
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
      {/* chips carry a 12 mark to match their 12px text; notes keep 14 */}
      {icon && <Icon name={icon} size={note ? 14 : 12} />}
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

/** Every list card uses this: lead (avatar or logo), a head row (title + time or an action),
 *  supporting lines, then one row of chips. See .sd-lc in app.css. */
export function ListCard({
  lead,
  title,
  titleMark,
  when,
  end,
  lines = [],
  chips,
  onClick,
}: {
  lead: ReactNode;
  title: ReactNode;
  titleMark?: ReactNode;
  when?: string;
  end?: ReactNode;
  lines?: ReactNode[];
  chips?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <Card onClick={onClick}>
      <div className="sd-lc">
        {lead}
        <div className="sd-lc-body">
          <div className="sd-lc-head">
            <span className="sd-lc-title">
              <span>{title}</span>
              {titleMark}
            </span>
            {end ?? (when && <span className="sd-lc-when">{when}</span>)}
          </div>
          {lines.map((l, i) => (
            <span className="sd-lc-line" key={i}>
              {l}
            </span>
          ))}
        </div>
      </div>
      {/* chips run the full card width, so two chips fit on one row */}
      {chips && <div className="sd-lc-chips">{chips}</div>}
    </Card>
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
      {icon && <Icon name={icon} size={16} color="tone" />}
      <span>{children}</span>
      {end && <span className="sd-sl-end">{end}</span>}
    </div>
  );
}

export function Section({ label, icon, end, children, style, required }: { label?: string; icon?: IconName; end?: ReactNode; children: ReactNode; style?: CSSProperties; required?: boolean }) {
  return (
    <section className="sd-section" style={style}>
      {label && (
        <SectionLabel icon={icon} end={end}>
          {label}
          {required && (
            <span className="sd-req" aria-label="required">
              {" "}*
            </span>
          )}
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
      {/* list row: 26 icon, Medium 14/20 label, a small light-grey chevron as iOS draws it */}
      {icon && <Icon name={icon} size={26} color={destructive ? "var(--sd-ios-red)" : "tone"} />}
      <span className="t-label" style={{ color: destructive ? "var(--sd-ios-red)" : "var(--sd-text)" }}>
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
      <Icon name="doc.on.doc.fill" size={18} color="tone" style={{ flex: "0 0 auto" }} />
    </div>
  );
}

/* ── edit in place ──────────────────────────────────────────────────────── */
export type EditSpec = { name: string; value: string; kind?: FieldKind; required?: boolean; multiline?: boolean; placeholder?: string; fixed?: boolean };

/** A phone number reads masked, as Figma draws it: +91 98XXX XXX21. */
const mask = (spec: EditSpec, v: string) => {
  if (spec.kind === "days") return showDays(v);
  if (spec.kind === "years") return showYears(v);
  if (spec.kind !== "phone") return v;
  const d = v.replace(/\D/g, "").slice(-10);
  return d.length === 10 ? `+91 ${d.slice(0, 2)}XXX XXX${d.slice(-2)}` : v;
};

/**
 * The iOS way to change a block of details: "Edit" turns each line into a field in place and
 * becomes "Done". Done stays off until every field passes its rule. `fixed` lines (the resume
 * file) stay as they are.
 */
export function useEditable(specs: EditSpec[]) {
  const [values, setValues] = useState(() => specs.map((f) => f.value));
  const [editing, setEditing] = useState(false);
  const ok = specs.every((f, i) => f.fixed || !fieldError(f.kind, values[i], f.required));
  const button = (
    <TextButton onClick={() => setEditing((e) => !e)} disabled={editing && !ok}>
      {editing ? "Done" : "Edit"}
    </TextButton>
  );
  const body = editing ? (
    <Box>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {specs.map((f, i) =>
          f.fixed ? (
            <DetailField key={f.name} name={f.name} value={values[i]} />
          ) : (
            <Field
              key={f.name}
              label={f.name}
              value={values[i]}
              onChange={(v) => setValues((all) => all.map((x, j) => (j === i ? v : x)))}
              kind={f.kind}
              required={f.required}
              multiline={f.multiline}
              placeholder={f.placeholder}
            />
          )
        )}
      </div>
    </Box>
  ) : (
    <Box>
      {specs.map((f, i) => (
        <DetailField key={f.name} name={f.name} value={mask(f, values[i])} />
      ))}
    </Box>
  );
  return { editing, button, body, values, ok };
}

/**
 * "Replace" and photo "Edit": opens the system file picker and checks what comes back — the
 * file type and a size limit — before it takes the new file's name.
 */
export function useFilePick({ name, accept, maxMB, what }: { name: string; accept: string; maxMB: number; what: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState(name);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const exts = accept.split(",").map((e) => e.trim().toLowerCase());
  const pick = (f: File | undefined) => {
    if (!f) return;
    const ext = "." + (f.name.split(".").pop() ?? "").toLowerCase();
    if (!exts.includes(ext)) return setError(`Use a ${exts.map((e) => e.slice(1).toUpperCase()).join(", ")} file.`);
    if (f.size > maxMB * 1024 * 1024) return setError(`That ${what} is over ${maxMB} MB. Use a smaller one.`);
    setError(null);
    setFile(f.name);
    if (f.type.startsWith("image/")) setUrl(URL.createObjectURL(f));
  };
  const picker = (
    <input
      ref={input}
      type="file"
      accept={accept}
      hidden
      onChange={(e) => {
        pick(e.target.files?.[0]);
        e.target.value = "";
      }}
    />
  );
  const open = () => input.current?.click();
  const errorLine = error && (
    <span className="sd-field-err" role="alert">
      <Icon name="info.circle.fill" size={14} />
      {error}
    </span>
  );
  return { file, url, open, picker, errorLine };
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
  // Unsplash (free licence), 23 Sep: Kritika by Vishal Bhutani, Nisha by Arnab De, Rohit by Abhishek Rai
  "kritika-rao", "nisha-rao", "rohit-menon",
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
 * Where a company logo lives. Every Logo/* in Figma is a vector, so the site draws the vector —
 * the old PNG exports had Figma's own canvas baked in behind them (a grey box, or a black one on
 * the job banner). Swiggy and Groww are the two Figma places as images, so they stay PNG.
 */
const RASTER_LOGOS = new Set(["swiggy", "groww"]);
export const logoSrc = (logo: string) => `/images/sidedoor/${logo}.${RASTER_LOGOS.has(logo) ? "png" : "svg"}`;

/**
 * A company logo on a white tile. The V6 logos are wordmarks of very different shapes, so the
 * logo is fitted inside the padded box rather than forced to a width: a square mark fills it,
 * a wide wordmark sits centred at full width. 74 with 10 padding is the detail-header size
 * from DESIGN_LANGUAGE; 44 is the leading slot in a list card.
 */
export function LogoTile({ logo, alt, size = 74 }: { logo: string; alt: string; size?: number }) {
  // Figma Frame 310: a 74 tile padded 12 (spacing scale), the logo fills the 50 inside
  const pad = size >= 74 ? 12 : Math.round(size * 0.16);
  return (
    <span className="sd-logotile" style={{ width: size, height: size, padding: pad }}>
      <Image
        src={logoSrc(logo)}
        alt={alt}
        width={size * 4}
        height={size * 4}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
        unoptimized
      />
    </span>
  );
}

export function LogoSmall({ logo, alt }: { logo: string; alt: string }) {
  return (
    <span className="sd-logo-sm">
      <Image src={logoSrc(logo)} alt={alt} width={28} height={28} style={{ width: 28, height: "auto" }} unoptimized />
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
      <div style={{ flex: "1 1 auto", display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
        <span className="sd-person-name">
          <span className="sd-1line">{name}</span>
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
/** Figma's six step kinds (V6 Tracking Flow):
 *  done    — blue circle-check, blue title, solid blue line after it
 *  next    — blue active-radio, the step you are waiting to reach
 *  waiting — amber clock with white hands, amber line: it sits with someone else
 *  pending — grey ring, the steps further ahead
 *  failed  — grey circle-x, grey title: the request ended short
 *  success — green circle-check, green title: selected */
export type Step = { title: string; when?: string; state: "done" | "next" | "waiting" | "pending" | "failed" | "success" };

// Figma's own glyphs, exported from the V6 instances so the marks match exactly.
const TL_PATH: Record<Step["state"], string> = {
  done: "M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM10.71 15.71C10.51 15.91 10.26 16 10 16C9.74 16 9.49 15.9 9.29 15.71L6.29 12.71L7.7 11.3L9.99 13.59L15.28 8.3L16.69 9.71L10.69 15.71H10.71Z",
  next: "M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18Z",
  waiting: "M7.31055 13.1572H11.9863C12.1966 13.1572 12.3729 13.0861 12.5151 12.9438C12.6574 12.8016 12.7285 12.6253 12.7285 12.415V6.33838C12.7285 6.13428 12.6574 5.9611 12.5151 5.81885C12.3729 5.67659 12.1966 5.60547 11.9863 5.60547C11.7822 5.60547 11.609 5.67659 11.4668 5.81885C11.3245 5.9611 11.2534 6.13428 11.2534 6.33838V11.6821H7.31055C7.10026 11.6821 6.92399 11.7533 6.78174 11.8955C6.63949 12.0316 6.56836 12.2048 6.56836 12.415C6.56836 12.6253 6.63949 12.8016 6.78174 12.9438C6.92399 13.0861 7.10026 13.1572 7.31055 13.1572ZM11.9956 21.5811C10.672 21.5811 9.43197 21.3306 8.27539 20.8296C7.11881 20.3348 6.1014 19.6483 5.22314 18.77C4.34489 17.8918 3.65527 16.8743 3.1543 15.7178C2.65951 14.5612 2.41211 13.3211 2.41211 11.9976C2.41211 10.674 2.65951 9.43392 3.1543 8.27734C3.65527 7.11458 4.34489 6.09717 5.22314 5.2251C6.1014 4.34684 7.11881 3.66032 8.27539 3.16553C9.43197 2.66455 10.672 2.41406 11.9956 2.41406C13.3192 2.41406 14.5592 2.66455 15.7158 3.16553C16.8786 3.66032 17.8991 4.34684 18.7773 5.2251C19.6556 6.09717 20.3421 7.11458 20.8369 8.27734C21.3379 9.43392 21.5884 10.674 21.5884 11.9976C21.5884 13.3211 21.3379 14.5612 20.8369 15.7178C20.3421 16.8743 19.6556 17.8918 18.7773 18.77C17.8991 19.6483 16.8786 20.3348 15.7158 20.8296C14.5592 21.3306 13.3192 21.5811 11.9956 21.5811Z",
  pending: "M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z",
  failed: "M11.9956 21.5811C10.672 21.5811 9.43197 21.3306 8.27539 20.8296C7.11882 20.3348 6.1014 19.6483 5.22314 18.77C4.34489 17.8918 3.65527 16.8743 3.1543 15.7178C2.65951 14.5612 2.41211 13.3211 2.41211 11.9976C2.41211 10.674 2.65951 9.43392 3.1543 8.27734C3.65527 7.11458 4.34489 6.09717 5.22314 5.2251C6.1014 4.34684 7.11882 3.66032 8.27539 3.16553C9.43197 2.66455 10.672 2.41406 11.9956 2.41406C13.3192 2.41406 14.5592 2.66455 15.7158 3.16553C16.8786 3.66032 17.8991 4.34684 18.7773 5.2251C19.6556 6.09717 20.3421 7.11458 20.8369 8.27734C21.3379 9.43392 21.5884 10.674 21.5884 11.9976C21.5884 13.3211 21.3379 14.5612 20.8369 15.7178C20.3421 16.8743 19.6556 17.8918 18.7773 18.77C17.8991 19.6483 16.8786 20.3348 15.7158 20.8296C14.5592 21.3306 13.3192 21.5811 11.9956 21.5811ZM8.95264 15.9219C9.20622 15.9219 9.42269 15.8384 9.60205 15.6714L12.0049 13.25L14.417 15.6714C14.584 15.8384 14.7943 15.9219 15.0479 15.9219C15.2952 15.9219 15.5024 15.8384 15.6694 15.6714C15.8426 15.4982 15.9292 15.291 15.9292 15.0498C15.9292 14.7962 15.8426 14.589 15.6694 14.4282L13.248 12.0068L15.6787 9.58545C15.8519 9.40609 15.9385 9.19889 15.9385 8.96387C15.9385 8.72266 15.8519 8.51855 15.6787 8.35156C15.5117 8.17839 15.3076 8.0918 15.0664 8.0918C14.8252 8.0918 14.618 8.17839 14.4448 8.35156L12.0049 10.7729L9.57422 8.35156C9.40104 8.19076 9.19385 8.11035 8.95264 8.11035C8.71143 8.11035 8.50423 8.19385 8.33105 8.36084C8.16406 8.52165 8.08057 8.72884 8.08057 8.98242C8.08057 9.21126 8.16715 9.41536 8.34033 9.59473L10.7617 12.0068L8.34033 14.4375C8.16715 14.6045 8.08057 14.8086 8.08057 15.0498C8.08057 15.291 8.16406 15.4982 8.33105 15.6714C8.50423 15.8384 8.71143 15.9219 8.95264 15.9219Z",
  success: "",
};
TL_PATH.success = TL_PATH.done;

export function Timeline({ steps }: { steps: Step[] }) {
  return (
    <div className="sd-timeline">
      {steps.map((s, i) => (
        <div className={`sd-tl-step is-${s.state}`} key={s.title}>
          <span className="sd-tl-rail">
            <svg className="sd-tl-mark" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              {s.state === "waiting" ? (
                <>
                  <circle cx="12" cy="12" r="9.6" className="sd-tl-disc" />
                  <path d={TL_PATH.waiting.slice(0, TL_PATH.waiting.indexOf("M", 1))} className="sd-tl-hands" />
                </>
              ) : (
                <path d={TL_PATH[s.state]} fill="currentColor" />
              )}
            </svg>
            {i < steps.length - 1 && <span className="sd-tl-line" />}
          </span>
          <span className="sd-tl-body">
            <span className="sd-tl-title">{s.title}</span>
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
  boxHeight,
  value,
  onChange,
  placeholder,
  help,
  error,
  multiline,
  end,
  lead,
  type = "text",
  readOnly,
  onClick,
  kind,
  required,
}: {
  /** what the field holds: sets the keyboard, what typing keeps, and the check on leaving */
  kind?: FieldKind;
  /** marks the label with * and says "Required." when left empty */
  required?: boolean;
  label?: string;
  /** V6 puts a small icon beside the field's label, not inside the box */
  icon?: IconName;
  /** A field whose mark is a brand logo rather than an SF symbol (the LinkedIn field). */
  iconNode?: ReactNode;
  /** Figma draws one or two boxes shorter than the standard 52 (the short-note input is 44). */
  boxHeight?: number;
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  help?: string;
  error?: string;
  multiline?: boolean;
  end?: ReactNode;
  /** Something inside the box before the text: Figma's Company field leads with the logo. */
  lead?: ReactNode;
  type?: string;
  readOnly?: boolean;
  onClick?: () => void;
}) {
  const [focus, setFocus] = useState(false);
  // a field is checked once it has been left, and again as it is fixed; not while first typing
  const [left, setLeft] = useState(false);
  const rule = kind ? RULES[kind] : undefined;
  const shown = error ?? (left && !readOnly ? fieldError(kind, value, required) : null) ?? undefined;
  const change = (v: string) => onChange?.(rule?.keep ? rule.keep(v) : v);
  const blur = () => {
    setFocus(false);
    setLeft(true);
  };
  // a field that filters its own typing trims itself; a browser maxLength would cut a paste
  // like "abc2.5" before the letters were dropped
  const max = rule?.keep ? undefined : rule?.max;
  return (
    <div className="sd-field">
      {label && (
        <label className="t-h-xs" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {iconNode ?? (icon && <Icon name={icon} size={16} color="tone" />)}
          <span>
            {label}
            {required && (
              <span className="sd-req" aria-label="required">
                {" "}*
              </span>
            )}
          </span>
        </label>
      )}
      {/* Figma's InputField box (Frame 234) is a fixed 52 with its row centred, not 48. */}
      <div
        className={`sd-input${focus ? " is-focus" : ""}${shown ? " is-error" : ""}`}
        // the whole 52 box is the target, not just the 20-tall text inside it
        onClick={(e) => {
          onClick?.();
          if (e.target === e.currentTarget) e.currentTarget.querySelector<HTMLElement>("input, textarea")?.focus();
        }}
        style={{ alignItems: multiline ? "flex-start" : "center", minHeight: boxHeight ?? (multiline ? 100 : 52) }}
      >
        {lead}
        {multiline ? (
          <textarea
            value={value}
            placeholder={placeholder}
            onChange={(e) => change(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={blur}
            maxLength={max}
            aria-invalid={!!shown}
            rows={2}
            readOnly={readOnly}
          />
        ) : (
          <input
            value={value}
            placeholder={placeholder}
            onChange={(e) => change(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={blur}
            maxLength={max}
            inputMode={rule?.mode}
            aria-invalid={!!shown}
            type={type}
            readOnly={readOnly}
          />
        )}
        {end}
      </div>
      {shown ? (
        <span className="sd-field-err" role="alert">
          <Icon name="info.circle.fill" size={14} />
          {shown}
        </span>
      ) : help ? (
        <span className="sd-field-help">{help}</span>
      ) : null}
      {/* long free text shows how much room is left once it gets close */}
      {max && (kind === "note" || kind === "tips") && value.length > max * 0.8 && (
        <span className="sd-field-help" style={{ textAlign: "right" }}>
          {value.length}/{max}
        </span>
      )}
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

/** iOS stepper: a grey 94×32 pill split into − and +, each half a 44pt target. An end that
 *  can't go further dims and stops. */
/** The number lives inside the stepper, so the words beside it never change. */
export function Stepper({ value, min, max, onChange, label, show = String }: { value: number; min: number; max: number; onChange: (v: number) => void; label: string; show?: (v: number) => string }) {
  return (
    <span className="sd-stepper" role="group" aria-label={label}>
      <button onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`Fewer: ${label}`}>
        <Icon name="minus" size={16} />
      </button>
      <output aria-live="polite">{show(value)}</output>
      <button onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`More: ${label}`}>
        <Icon name="plus" size={16} />
      </button>
    </span>
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
  const onAt = Math.max(0, options.indexOf(value));
  const glide = useGlide(onAt);
  return (
    <div className="sd-seg" style={{ "--n": options.length } as CSSProperties}>
      <span className="sd-glide" ref={glide} style={{ "--i": onAt } as CSSProperties} aria-hidden />
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
export function Sheet({ title, children, onClose, leaving, closeButton }: { title?: string; children: ReactNode; onClose: () => void; leaving?: boolean; closeButton?: boolean }) {
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
        // a press on a button or in the date wheels is a tap or a spin, never a drag of the sheet
        onPointerDown={(e) => !(e.target as Element).closest("button, input, .sd-wheels") && down(e.clientY)}
        onPointerMove={(e) => move(e.clientY)}
        onPointerUp={up}
        onPointerCancel={up}
      >
        <span className="sd-grab" />
        {closeButton && (
          // the iOS sheet close: a grey disc with an × at the top right, level with the title
          <button className="sd-sheet-x" aria-label="Close" onClick={onClose}>
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}
        {title && (
          // Figma, every sheet: the title sits 24 under the handle in a 22-tall box, 12 above the content
          <div style={{ paddingBottom: 12 }}>
            <h2 className="sd-sheet-title" style={{ height: 22, padding: closeButton ? "0 40px" : undefined }}>{title}</h2>
          </div>
        )}
        <div className="sd-sheet-body" data-lenis-prevent>{children}</div>
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

/** The iOS alert: a short question in the middle of the screen, for a step that can't be taken back. */
export function Alert({
  title,
  message,
  confirm,
  onConfirm,
  onCancel,
  leaving,
}: {
  title: string;
  message?: string;
  confirm: string;
  onConfirm: () => void;
  onCancel: () => void;
  leaving?: boolean;
}) {
  return (
    <>
      <div className={`sd-scrim${leaving ? " is-out" : ""}`} />
      <div className={`sd-alert${leaving ? " is-out" : ""}`} role="alertdialog" aria-labelledby="sd-alert-title">
        <div className="sd-alert-text">
          <h2 id="sd-alert-title" className="sd-alert-title">{title}</h2>
          {message && <p className="sd-alert-msg">{message}</p>}
        </div>
        <div className="sd-alert-btns">
          <button className="sd-alert-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="sd-alert-btn is-default" onClick={onConfirm}>
            {confirm}
          </button>
        </div>
      </div>
    </>
  );
}

/* ── toast ──────────────────────────────────────────────────────────────── */
export function Toast({ children, icon = "checkmark", action }: { children: ReactNode; icon?: IconName; action?: ReactNode }) {
  return (
    <div className="sd-toast">
      {/* Figma's undo toast carries no mark: the line runs the width and the link sits right */}
      {!action && <Icon name={icon} size={18} style={{ color: "var(--sd-text-success)" }} />}
      <span style={{ flex: 1 }}>{children}</span>
      {action}
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
/** The iOS empty and error screen (ContentUnavailableView): a mark, a short title, one line,
 *  then the action, all centred. Errors get a red mark and a Try again button. */
export function Empty({
  icon,
  title,
  body,
  action,
  error,
}: {
  icon?: IconName;
  title: string;
  body?: string;
  action?: ReactNode;
  error?: boolean;
}) {
  return (
    <div className="sd-empty" role={error ? "alert" : undefined}>
      <Icon
        name={error ? "info.circle.fill" : icon ?? "tray.fill"}
        size={44}
        style={{ color: error ? "var(--sd-text-error)" : "var(--sd-icon-accent)" }}
      />
      <div className="sd-empty-txt">
        <h2 className="t-h-md">{title}</h2>
        {body && <p className="t-body muted">{body}</p>}
      </div>
      {action && <div className="sd-empty-action">{action}</div>}
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
      data-lenis-prevent
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
