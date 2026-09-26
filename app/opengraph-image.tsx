import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

// The link preview when the site is shared (WhatsApp, LinkedIn, X, Slack): the photo on the left,
// the name, role and address on the right, nothing else, in the site's colours and fonts (Devansh, 26 Sep 2026).
// Built once at build time. Case study pages inherit it unless they set their own.

export const alt = "Devansh Somvanshi, designer and developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAME = "Devansh Somvanshi";
const HEAD = "Designer & Developer.";
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

  const [manrope, mono] = await Promise.all([
    font("Manrope", 700, NAME + HEAD),
    font("Geist+Mono", 500, URL.toUpperCase()),
  ]);
  const fonts = [
    manrope && { name: "Manrope", data: manrope, weight: 700 as const, style: "normal" as const },
    mono && { name: "Geist Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ].filter((f): f is NonNullable<typeof f> => !!f);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 64, padding: "0 80px", background: "#fafafa" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} width={470} height={470} alt="" style={{ borderRadius: 24, objectFit: "cover", boxShadow: "0 20px 48px rgba(29, 29, 29, 0.16)" }} />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontFamily: "Manrope", fontSize: 60, letterSpacing: "-0.03em", lineHeight: 1.1, color: "#1d1d1d" }}>{NAME}</div>
          <div style={{ fontFamily: "Manrope", fontSize: 32, letterSpacing: "-0.02em", color: "#918e89", marginTop: 14 }}>{HEAD}</div>
          <div style={{ fontFamily: "Geist Mono", fontSize: 18, letterSpacing: "0.08em", color: "#918e89", marginTop: 56 }}>{URL.toUpperCase()}</div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
