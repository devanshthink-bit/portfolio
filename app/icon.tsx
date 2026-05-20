import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import path from "path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  const avatarPath = path.join(process.cwd(), "public", "images", "avatar.jpg");
  const avatarData = readFileSync(avatarPath);
  const avatarSrc = `data:image/jpeg;base64,${avatarData.toString("base64")}`;

  // Satori doesn't clip children via overflow:hidden + border-radius.
  // Applying border-radius directly on the <img> produces a transparent-cornered PNG.
  return new ImageResponse(
    (
      <div style={{ width: 64, height: 64, display: "flex" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarSrc}
          width={64}
          height={64}
          style={{ objectFit: "cover", objectPosition: "center top", borderRadius: "50%" }}
          alt=""
        />
      </div>
    ),
    { width: 64, height: 64 }
  );
}
