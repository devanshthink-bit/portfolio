import Image from "next/image";

export default function About() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 56, marginTop: 24 }}>
      <div className="section">
        <h3 className="section-title">About Me</h3>
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: 10, overflow: "hidden" }}>
          <Image
            src="/images/about.jpg"
            alt="Devansh at the beach"
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 32 }}>
          <h2 style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: "26px", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.4, color: "var(--text-primary)", margin: 0 }}>Designing with craft, building with code.</h2>
          <p className="section-body" style={{ margin: 0 }}>
            I didn&apos;t grow up calling it design, but I was always curious about how things worked.
          </p>
          <p className="section-body" style={{ margin: 0 }}>
            My first exposure to it was on my mom&apos;s Samsung Galaxy R — I&apos;d spend hours exploring apps, downloading random ones, almost in awe of how they worked. I didn&apos;t have the word for it back then, but I was already falling in love with <strong>product design</strong>.
          </p>
          <p className="section-body" style={{ margin: 0 }}>
            Before screens took over, I was obsessed with cars. That instinct for how things feel and function stayed — it just shifted from physical objects to digital products.
          </p>
          <p className="section-body" style={{ margin: 0 }}>
            Today, I see myself as a <strong>design–engineer </strong>hybrid working at the intersection of design, engineering, and product. I don&apos;t just design — I build and ship product features, integrating agentic AI into my workflows.
          </p>
          <p className="section-body" style={{ margin: 0 }}>
            My Workflow includes tools like Claude Code, Cursor, and Codex to accelerate development and translate ideas into production-ready features. As a Software Development Engineer previously, I&apos;ve worked on shipping flagship products across workforce enablement, hospitality, and greentech at <strong>GoodWorker</strong>, <strong>Stanza Living</strong>, and <strong>Devic Earth</strong>, with products serving over a <strong>million</strong> users.
          </p>
        </div>
      </div>
    </div>
  );
}
