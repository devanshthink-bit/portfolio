import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

// The link preview when the site is shared (WhatsApp, LinkedIn, X, Slack): the photo on the left,
// a short summary on the right, in the site's colours and fonts (Devansh, 26 Sep 2026).
// Built once at build time. Case study pages inherit it unless they set their own.

export const alt = "Devansh Somvanshi, designer and developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAME = "Devansh Somvanshi";
const HEAD = "Designer & Developer.";
const BODY = "A product designer with three years in engineering, shipping products used by millions at startups and at scale.";
const STATS: [string, string][] = [["3+ yrs", "in engineering"], ["3", "products"], ["2M+", "reach"]];
const URL = "devanshsomvanshi.com";

// Google Fonts serves a TTF subset for just these characters; Satori can't read woff2.
// If the fetch fails the image still builds, in the default font.
async function font(family: string, weight: number, text: string) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`)).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!src) return null;
    return await (await fetch(src)).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image() {
  const avatar = await readFile(path.join(process.cwd(), "public", "images", "avatar.jpg"));
  const photo = `data:image/jpeg;base64,${avatar.toString("base64")}`;

  const bold = NAME + HEAD + STATS.map((s) => s[0]).join("");
  const regular = BODY + STATS.map((s) => s[1]).join("");
  const [manrope, inter, mono] = await Promise.all([
    font("Manrope", 700, bold),
    font("Inter", 400, regular),
    font("Geist+Mono", 500, URL.toUpperCase() + "PORTFOLIO"),
  ]);
  const fonts = [
    manrope && { name: "Manrope", data: manrope, weight: 700 as const, style: "normal" as const },
    inter && { name: "Inter", data: inter, weight: 400 as const, style: "normal" as const },
    mono && { name: "Geist Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ].filter((f): f is NonNullable<typeof f> => !!f);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 64, padding: "0 80px", background: "#fafafa" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} width={470} height={470} alt="" style={{ borderRadius: 24, objectFit: "cover", boxShadow: "0 20px 48px rgba(29, 29, 29, 0.16)" }} />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontFamily: "Geist Mono", fontSize: 18, letterSpacing: "0.08em", color: "#918e89" }}>PORTFOLIO</div>
          <div style={{ fontFamily: "Manrope", fontSize: 54, letterSpacing: "-0.03em", lineHeight: 1.1, color: "#1d1d1d", marginTop: 18 }}>{NAME}</div>
          <div style={{ fontFamily: "Manrope", fontSize: 30, letterSpacing: "-0.02em", color: "#4a4948", marginTop: 10 }}>{HEAD}</div>
          <div style={{ fontFamily: "Inter", fontSize: 22, lineHeight: 1.5, letterSpacing: "-0.011em", color: "#4a4948", marginTop: 24 }}>{BODY}</div>
          <div style={{ display: "flex", alignItems: "baseline", marginTop: 32 }}>
            {STATS.map(([n, l], i) => (
              <div key={n} style={{ display: "flex", alignItems: "baseline" }}>
                {i > 0 && <div style={{ width: 1, height: 22, background: "#d9d5ce", margin: "0 20px" }} />}
                <div style={{ fontFamily: "Manrope", fontSize: 28, letterSpacing: "-0.02em", color: "#1d1d1d" }}>{n}</div>
                <div style={{ fontFamily: "Inter", fontSize: 18, color: "#918e89", marginLeft: 8 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: "Geist Mono", fontSize: 18, letterSpacing: "0.08em", color: "#918e89", marginTop: 40 }}>{URL.toUpperCase()}</div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
