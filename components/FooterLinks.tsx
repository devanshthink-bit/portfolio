"use client";
import { useState } from "react";

const EMAIL = "devansh.think@gmail.com";

function CopyIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function FooterLinks() {
  const [copied, setCopied] = useState(false);

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="footer-links">
      <a href="https://www.linkedin.com/in/devansh-somvanshi" className="footer-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <a href={`mailto:${EMAIL}`} className="footer-link">Email</a>
        <button
          onClick={copyEmail}
          aria-label="Copy email"
          title={copied ? "Copied!" : "Copy email"}
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--text-muted)", display: "flex", alignItems: "center", transition: "color 0.2s" }}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </span>
      <a href="https://www.instagram.com/i.pretend.here" className="footer-link" target="_blank" rel="noopener noreferrer">Instagram</a>
    </div>
  );
}
