import Image from "next/image";


export default function Hero() {
  return (
    <section className="intro">
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
        <h1>Designer &amp; Developer.</h1>
        <h1>Curious about how things work and building them right.</h1>
      </div>

      <div className="intro-body">
        <p>
          A product designer, with a background in engineering where I spent three years shipping 0→1 flagship products used by millions across greentech, workforce enablement, and hospitality, at both startups and scale.
        </p>
        <p>
          I care deeply about craft and detail, and about building products that are both functional and delightful.
        </p>
        <p>
          Most good conversations start with a simple hello.{" "}
          <a
            className="inline-link"
            href="https://wa.me/916396483499?text=Hi%20Devansh%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect."
            target="_blank"
            rel="noopener noreferrer"
          >
            Let&apos;s make it one
            {/* Lucide arrow-up-right, drawn rather than typed */}
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ marginLeft: 4, verticalAlign: "-2px" }}>
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
        </p>
      </div>

    </section>
  );
}
