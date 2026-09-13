"use client";
import dynamic from "next/dynamic";

const CaseStudyTOC = dynamic(() => import("./CaseStudyTOC"), { ssr: false });

const redbusSections = [
  { id: "toc-problem",  label: "The Problem" },
  { id: "toc-idea",     label: "The Idea" },
  { id: "toc-doubts",   label: "Doubts" },
  { id: "toc-versions", label: "Versions" },
  { id: "toc-testing",  label: "Testing" },
  { id: "toc-design",   label: "The Design" },
  { id: "toc-try",      label: "Try It" },
  { id: "toc-next",     label: "What's Next" },
];

export default function RedbusTOCClient() {
  return <CaseStudyTOC sections={redbusSections} />;
}
