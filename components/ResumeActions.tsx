"use client";
import { useEffect, useState } from "react";
import { RESUME_ICON } from "./BottomNav";

const PDF = "/resume/Devansh_Somvanshi_CV.pdf";

// Solar Linear, same set and stroke as the dock. Download uses the dock's résumé icon.
const ICONS = {
  download: RESUME_ICON,
  open: "<path d=\"M13 11L22 2M22 7.34375V2H16.6562\"/><path d=\"M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2\"/>",
  print: "<path d=\"M6 17.9827C4.44655 17.9359 3.51998 17.7626 2.87868 17.1213C2 16.2426 2 14.8284 2 12C2 9.17157 2 7.75736 2.87868 6.87868C3.75736 6 5.17157 6 8 6H16C18.8284 6 20.2426 6 21.1213 6.87868C22 7.75736 22 9.17157 22 12C22 14.8284 22 16.2426 21.1213 17.1213C20.48 17.7626 19.5535 17.9359 18 17.9827\"/><path d=\"M17.9827 6C17.9359 4.44655 17.7626 3.51998 17.1213 2.87868C16.2426 2 14.8284 2 12 2C9.17157 2 7.75736 2 6.87868 2.87868C6.23738 3.51998 6.06413 4.44655 6.01732 6M18 12V16C18 18.8284 18 20.2426 17.1213 21.1213C16.2426 22 14.8284 22 12 22C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V12\"/><path d=\"M19.5 12.4434C17.8729 11.7128 15.4115 11.0003 12 11.0003C8.58854 11.0003 6.12712 11.7128 4.5 12.4434\"/>",
  link: "<path d=\"M14.1625 18.4876L13.4417 19.2084C11.053 21.5971 7.18019 21.5971 4.79151 19.2084C2.40283 16.8198 2.40283 12.9469 4.79151 10.5583L5.51236 9.8374\"/><path d=\"M9.8374 14.1625L14.1625 9.8374\"/><path d=\"M9.8374 5.51236L10.5583 4.79151C12.9469 2.40283 16.8198 2.40283 19.2084 4.79151C21.5971 7.18019 21.5971 11.053 19.2084 13.4417L18.4876 14.1625\"/>",
  share: "<path d=\"M9 12C9 13.3807 7.88071 14.5 6.5 14.5C5.11929 14.5 4 13.3807 4 12C4 10.6193 5.11929 9.5 6.5 9.5C7.88071 9.5 9 10.6193 9 12Z\"/><path d=\"M14 6.5L9 10\"/><path d=\"M14 17.5L9 14\"/><path d=\"M19 18.5C19 19.8807 17.8807 21 16.5 21C15.1193 21 14 19.8807 14 18.5C14 17.1193 15.1193 16 16.5 16C17.8807 16 19 17.1193 19 18.5Z\"/><path d=\"M19 5.5C19 6.88071 17.8807 8 16.5 8C15.1193 8 14 6.88071 14 5.5C14 4.11929 15.1193 3 16.5 3C17.8807 3 19 4.11929 19 5.5Z\"/>",
};

function Icon({ name }: { name: keyof typeof ICONS }) {
  return <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden dangerouslySetInnerHTML={{ __html: ICONS[name] }} />;
}

export default function ResumeActions() {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  useEffect(() => setCanShare(typeof navigator !== "undefined" && !!navigator.share), []);

  const pageUrl = () => window.location.origin + "/resume";

  const print = () => {
    // Print the PDF itself, not the page around it. If the browser blocks that, open the PDF.
    const f = document.createElement("iframe");
    f.style.cssText = "position:fixed;width:0;height:0;border:0;right:0;bottom:0";
    f.src = PDF;
    f.onload = () => {
      try { f.contentWindow?.focus(); f.contentWindow?.print(); }
      catch { window.open(PDF, "_blank"); }
      setTimeout(() => f.remove(), 60000);
    };
    document.body.appendChild(f);
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(pageUrl()); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    catch { window.prompt("Copy this link", pageUrl()); }
  };

  const share = () => navigator.share({ title: "Devansh Somvanshi, resume", url: pageUrl() }).catch(() => {});

  return (
    <div className="resume-actions">
      <a className="resume-btn is-primary" href={PDF} download="Devansh_Somvanshi_CV.pdf"><Icon name="download" />Download</a>
      <a className="resume-btn" href={PDF} target="_blank" rel="noopener noreferrer"><Icon name="open" />Open PDF</a>
      <button className="resume-btn" type="button" onClick={print}><Icon name="print" />Print</button>
      <button className="resume-btn" type="button" onClick={copy}><Icon name="link" />{copied ? "Link copied" : "Copy link"}</button>
      {canShare && <button className="resume-btn" type="button" onClick={share}><Icon name="share" />Share</button>}
    </div>
  );
}
