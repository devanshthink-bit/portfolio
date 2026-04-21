import Image from "next/image";

export default function Hero() {
  return (
    <section className="intro" style={{ marginTop: 24 }}>
      <div className="avatar">
        <Image
          src="/images/avatar.jpg"
          alt="Devansh"
          width={140}
          height={140}
          className="avatar-img"
          priority
        />
      </div>
      <div className="intro-headings">
        <h1>Designer & Developer.</h1>
        <h1>Curious about how things work and why they matter.</h1>
      </div>
      <div className="intro-body">
        <p>
          I was lucky to have fallen in love with design and code early in life,
          and luckier to still feel the same way.
        </p>
        <p>
          I care deeply about craft and polish — building products that are both
          functional and beautiful.
        </p>
        <p>
          Some of the best conversations I&apos;ve had started with a random
          hello on the internet. So…{" "}
          <a
            className="inline-link"
            href="mailto:devansh.think@gmail.com"
          >
            Message me →
          </a>
        </p>
      </div>
    </section>
  );
}
