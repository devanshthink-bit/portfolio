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
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// Lucide's LinkedIn, GitHub and Instagram (the site's icon set, drawn inline). Lucide has no X logo, so X
// is Tabler's, which uses the same 24px grid and rounded strokes (1.75px, Devansh picked it over 2px, 26 Sep 2026).
const SOCIALS = [
  { label: "LinkedIn", text: "LinkedIn", href: "https://www.linkedin.com/in/devansh-somvanshi", icon: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></> },
  { label: "GitHub", text: "GitHub", href: "https://github.com/devanshthink-bit", icon: <><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></> },
  { label: "X", text: "X.com", href: "https://X.com/devanshmusings", icon: <><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></> },
  { label: "Instagram", text: "Instagram", href: "https://www.instagram.com/i.pretend.here", icon: <><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></> },
];

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
      <div className="footer-cta">
        <h3 className="footer-heading">The inbox is open.</h3>
        <span
          className="footer-email-row"
          onMouseEnter={() => window.dispatchEvent(new Event("cursor:hide"))}
          onMouseLeave={() => window.dispatchEvent(new Event("cursor:show"))}
        >
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`}
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {EMAIL}
          </a>
          <button
            onClick={copyEmail}
            aria-label="Copy email"
            title={copied ? "Copied!" : "Copy email"}
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--text-muted)", display: "flex", alignItems: "center", transition: "color 0.3s var(--ease-out)" }}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        </span>
      </div>
      <div
        className="footer-socials"
        onMouseEnter={() => window.dispatchEvent(new Event("cursor:hide"))}
        onMouseLeave={() => window.dispatchEvent(new Event("cursor:show"))}
      >
        {/* Text links on the web, icons on phones (globals.css swaps them). */}
        {SOCIALS.map(({ text, href }) => (
          <a key={text} href={href} className="footer-link" target="_blank" rel="noopener noreferrer">{text}</a>
        ))}
        {SOCIALS.map(({ label, href, icon }) => (
          <a key={label} href={href} className="footer-icon" target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              {icon}
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
