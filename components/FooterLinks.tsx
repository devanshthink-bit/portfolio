"use client";
import { useState } from "react";
import { Copy, Check } from "@phosphor-icons/react";

const EMAIL = "devansh.think@gmail.com";

/* Icons: Phosphor, Fill weight (MIT), the site's one icon set. */
function CopyIcon({ size = 14 }: { size?: number }) { return <Copy size={size} weight="fill" aria-hidden />; }
function CheckIcon({ size = 14 }: { size?: number }) { return <Check size={size} weight="fill" aria-hidden />; }

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
        <h3 className="footer-heading">Let&apos;s get in touch?</h3>
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
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--text-muted)", display: "flex", alignItems: "center", transition: "color 0.2s" }}
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
        <a href="https://www.linkedin.com/in/devansh-somvanshi" className="footer-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com/devanshthink-bit" className="footer-link" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://X.com/devanshmusings" className="footer-link" target="_blank" rel="noopener noreferrer">X.com</a>
        <a href="https://www.instagram.com/i.pretend.here" className="footer-link" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
    </div>
  );
}
