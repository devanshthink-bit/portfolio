export default function About() {
  return (
    <main className="py-24 mx-auto max-w-[672px]">
      <div className="space-y-5 text-base text-black leading-loose">
        <p>
          I'm Devansh, a designer focused on creating thoughtful digital
          experiences. I work at the intersection of visual design and product
          thinking.
        </p>
        <p>
          With a background in communication design, I care deeply about the
          details — typography, hierarchy, and the space between things.
        </p>
        <p>
          Currently open to new projects.{" "}
          <a
            href="mailto:devansh.think@gmail.com"
            className="underline underline-offset-4 hover:opacity-50 transition-opacity duration-200"
          >
            Get in touch.
          </a>
        </p>
      </div>
    </main>
  );
}
