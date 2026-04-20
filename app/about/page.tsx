import Image from "next/image";

export default function About() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: 10, overflow: "hidden" }}>
        <Image
          src="/about.jpg"
          alt="Devansh at the beach"
          fill
          style={{ objectFit: "cover", objectPosition: "center top" }}
          priority
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <p className="section-body" style={{ margin: 0 }}>
          I&apos;m a former Software Development Engineer (SDE) pivoting into Product
          Design, where I&apos;m currently focused on designing AI-powered experiences.
          My journey began in Computer Science, but I quickly became fascinated by
          the &ldquo;Why&rdquo; behind the code. This curiosity led me to explore UX design,
          where I discovered my passion for solving complex problems through
          intuitive interfaces.
        </p>
        <p className="section-body" style={{ margin: 0 }}>
          While my official title is Product Designer, I see myself as a
          design-engineer hybrid. I&apos;m passionate about bridging the gap between
          design and engineering, capable of leading projects from initial research
          through to development. I&apos;m particularly excited about leveraging AI in
          my design process and creating new user experiences, using tools like
          Cursor, Claude Code and Codex to enhance my workflow.
        </p>
        <p className="section-body" style={{ margin: 0 }}>
          During my career as an SDE, I&apos;ve worked on shipping exciting products at
          Affinidi, Stanza Living and Devic Earth, which have shaped my approach to
          creating technology that enhances user experiences.
        </p>
        <p className="section-body" style={{ margin: 0 }}>
          <a className="inline-link" href="mailto:devansh.think@gmail.com">
            Get in touch →
          </a>
        </p>
      </div>
    </div>
  );
}
