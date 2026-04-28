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
        <h1>Curious about how things work and building them right.</h1>
      </div>
      <div className="intro-body">
        <p>
          An AI-first product designer, with a background in engineering where I spent three years shipping 0→1 flagship products used by millions across greentech, workforce enablement, and hospitality, at both startups and scale.
        </p>
        <p>
          I care deeply about craft and detail — building products that are both functional and delightful.
        </p>
        <p>
          Most good conversations start with a simple hello.{" "}
          <a
            className="inline-link"
            href="https://wa.me/916396483499?text=Hi%20Devansh%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect."
            target="_blank"
            rel="noopener noreferrer"
          >
            Let&apos;s make it one →
          </a>
        </p>
      </div>
    </section>
  );
}
