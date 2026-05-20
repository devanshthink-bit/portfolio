"use client";
import { useEffect, useState } from "react";

const PHRASES = [
  "Designer & Developer.",
  "AI-first Product Designer.",
  "Design Engineer.",
  "0→1 Builder.",
];

type Phase = "typing" | "holding" | "erasing";

export default function TypewriterHeadline() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(PHRASES[0].length);
  const [phase, setPhase] = useState<Phase>("holding");

  useEffect(() => {
    const phrase = PHRASES[phraseIdx];

    if (phase === "holding") {
      const t = setTimeout(() => setPhase("erasing"), 2400);
      return () => clearTimeout(t);
    }

    if (phase === "erasing") {
      if (charIdx === 0) {
        const next = (phraseIdx + 1) % PHRASES.length;
        setPhraseIdx(next);
        setPhase("typing");
        return;
      }
      const t = setTimeout(() => setCharIdx(c => c - 1), 30);
      return () => clearTimeout(t);
    }

    if (phase === "typing") {
      if (charIdx === phrase.length) {
        setPhase("holding");
        return;
      }
      const t = setTimeout(() => setCharIdx(c => c + 1), 55);
      return () => clearTimeout(t);
    }
  }, [phase, charIdx, phraseIdx]);

  const displayText = PHRASES[phraseIdx].slice(0, charIdx);

  return (
    <h1>
      {displayText}
      <span className="typing-cursor" aria-hidden />
    </h1>
  );
}
