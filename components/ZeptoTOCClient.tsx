"use client";
import dynamic from "next/dynamic";

const CaseStudyTOC = dynamic(() => import("./CaseStudyTOC"), { ssr: false });

const zeptoSections = [
  { id: "toc-hook",       label: "The 7pm Problem" },
  { id: "toc-insight",    label: "How People Shop" },
  { id: "toc-who",        label: "Who Uses Zepto" },
  { id: "toc-breaks",     label: "Four Things Break" },
  { id: "toc-solution",   label: "The Redesign" },
  { id: "toc-decisions",  label: "The Hard Calls" },
  { id: "toc-metrics",    label: "Proving It Works" },
  { id: "toc-next",       label: "Still to Build" },
  { id: "toc-reflection", label: "Honest Take" },
];

export default function ZeptoTOCClient() {
  return <CaseStudyTOC sections={zeptoSections} />;
}
