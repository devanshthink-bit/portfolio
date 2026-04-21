"use client";

const DESIGN_ICONS = [
  "/icons/QfrqU7nAVHGgNlVyLKrhENuKbo.svg",
  "/icons/Z3e4wvYLGkoXSjrDh9mtlcTE.svg",
  "/icons/MtgZvHuuNbCiCRAvWXXlAh3RV0.svg",
  "/icons/j8c9duNcO535JoY2AXW8jVwuLU.svg",
  "/icons/Gkv6V8TJ45wHYG5S0f4jve25o.svg",
  "/icons/9atmkPpaYsWFGg9AF3KAEikU0.svg",
  "/icons/nNMwGShQfctasC7rX6s6h7AQLEg.svg",
  "/icons/1Lbr1dm8IKZwoPONAFLXVetxQk.svg",
  "/icons/O2RCTcZ1UzM4WjVmDAl4DDn16o.svg",
  "/icons/MzkdurmLnroE3qD8C6k0dmlYvc.svg",
  "/icons/AlYCHF50iXV90tza5lP7ObIfr7M.svg",
];

const TECH_ICONS = [
  "/icons/gKNRW2pBrHA6eFKyRaC6ySJ4f0.svg",
  "/icons/hhfAgvUFHhNh3PTx7RUMJRSk75Q.svg",
  "/icons/FR9hJ342YKyl6hBzB0GN96jc5U.svg",
  "/icons/uR79o5S4LyIrzLOGN394WncyY8.svg",
  "/icons/tnH4sRRIjlPCnVH02sUsIs0OU.svg",
  "/icons/wzxCJpSncE9cosXbIZNGJTrIy0.svg",
  "/icons/xSsbGz8udxP7GvfcxbMwFFQU0wI.svg",
  "/icons/JOOX86dMdE9ixzBq9RQ7LdSDqEw.svg",
  "/icons/RNRwcTJ8WJWFwOMp4ubwsyjIs.svg",
  "/icons/jSaI7sD5evlaWVr6256mY1Yze4w.svg",
  "/icons/QAccMhIST85uwtFqH3eBpW1O8.svg",
  "/icons/0ZzD8krRDZNAUr4qNkm57pd01Y.svg",
  "/icons/Z5WnEnZWum7rF27zb5ycWpYO08.svg",
  "/icons/p5nYE0QiVjsc6scgVr2F0mUvzY.svg",
  "/icons/uyERLkTb4cGew2A5L8kHqnxu5M.svg",
  "/icons/FB5DWYTn9Nj097r64ScvFOehY.svg",
  "/icons/1Ne8z7V0Hec8Bug0kh8tJ6Rsrw.svg",
  "/icons/hgiqxWSXXo8KAhQNcfZkIrRcXMg.svg",
  "/icons/JooanEUxDATu8Pyu4FOakZBAkc.svg",
  "/icons/se8Mli5fukiUde8rsMBgjV2NMkM.svg",
  "/icons/TwPerUv83Gxcuk5WwvsYLJmC48.svg",
  "/icons/KoMpzhXJgdgaIn1xT63rlkNPRhg.svg",
  "/icons/kBegbc9BS6YmIE352vejA8BAYkU.svg",
];

function Ticker({ icons, duration }: { icons: string[]; duration: number }) {
  const doubled = [...icons, ...icons];
  return (
    <div style={{ overflow: "hidden", width: "100%", position: "relative" }}>
      <div style={{
        display: "flex",
        gap: 48,
        width: "max-content",
        animation: `ticker-scroll ${duration}s linear infinite`,
        willChange: "transform",
      }}>
        {doubled.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            style={{ height: 40, width: "auto", flexShrink: 0, display: "block" }}
          />
        ))}
      </div>
    </div>
  );
}

export default function StackTicker() {
  return (
    <>
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div className="section">
          <h3 className="section-title">Design Stack</h3>
          <Ticker icons={DESIGN_ICONS} duration={22} />
        </div>
        <div className="section">
          <h3 className="section-title">Tech Stack</h3>
          <Ticker icons={TECH_ICONS} duration={30} />
        </div>
      </div>
    </>
  );
}
