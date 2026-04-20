"use client";
import { useState } from "react";

export default function Navbar() {
  const [isNerd, setIsNerd] = useState(false);

  const setMode = (nerd: boolean) => {
    setIsNerd(nerd);
    if (nerd) {
      document.documentElement.classList.add("nerd-mode");
    } else {
      document.documentElement.classList.remove("nerd-mode");
    }
  };

  return (
    <header className="site-header">
      <a
        href="/"
        className="header-left"
        onMouseEnter={(e) => { e.currentTarget.querySelector<HTMLSpanElement>('.header-name')!.textContent = "Hey there!"; }}
        onMouseLeave={(e) => { e.currentTarget.querySelector<HTMLSpanElement>('.header-name')!.textContent = "Devansh Somvanshi"; }}
      >
        <span className="header-shimmer" aria-hidden="true" />
        <span className="header-name">Devansh Somvanshi</span>
      </a>
      <div className="mode-toggle" role="group" aria-label="Page mode">
        <div className={`mode-toggle-slider${isNerd ? " nerd" : ""}`} aria-hidden="true" />
        <button
          type="button"
          className={`mode-toggle-option${!isNerd ? " active" : ""}`}
          aria-pressed={!isNerd}
          onClick={() => setMode(false)}
        >
          Calm Mode
        </button>
        <button
          type="button"
          className={`mode-toggle-option${isNerd ? " active" : ""}`}
          aria-pressed={isNerd}
          onClick={() => setMode(true)}
        >
          Nerd Mode
        </button>
      </div>
    </header>
  );
}
