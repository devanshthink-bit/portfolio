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

// Google Fonts serves a TTF subset for just these characters; Satori can't read woff2.
// If the fetch fails the image still builds, in the default font.
async function font(spec: string, text: string) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${spec}&text=${encodeURIComponent(text)}`)).text();
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

  const [manrope, serif] = await Promise.all([
    font("Manrope:wght@700", NAME + "Designer Developer."),
    font("Instrument+Serif:ital@1", "&"),
  ]);
  const fonts = [
    manrope && { name: "Manrope", data: manrope, weight: 700 as const, style: "normal" as const },
    serif && { name: "Instrument Serif", data: serif, weight: 400 as const, style: "italic" as const },
  ].filter((f): f is NonNullable<typeof f> => !!f);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 64, padding: "0 80px", background: "#fafafa" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} width={470} height={470} alt="" style={{ borderRadius: 24, objectFit: "cover", boxShadow: "0 20px 48px rgba(29, 29, 29, 0.16)" }} />
        {/* The name at the photo's top edge, the role at its bottom edge: two lines, nothing else. */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, height: 470, padding: "6px 0" }}>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Manrope", fontWeight: 700, fontSize: 76, letterSpacing: "-0.04em", lineHeight: 1.02, color: "#1d1d1d" }}>
            <span>Devansh</span>
            <span>Somvanshi</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", fontFamily: "Manrope", fontWeight: 700, fontSize: 34, letterSpacing: "-0.02em", color: "#4a4948" }}>
            Designer
            <span style={{ fontFamily: "Instrument Serif", fontStyle: "italic", fontWeight: 400, fontSize: 48, color: "#918e89", margin: "0 10px" }}>&amp;</span>
            Developer.
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
