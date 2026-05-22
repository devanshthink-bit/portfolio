"use client";
import dynamic from "next/dynamic";

const CaseStudyTOC = dynamic(() => import("./CaseStudyTOC"), { ssr: false });

const zoomSections = [
  { id: "toc-problem",   label: "The Pattern" },
  { id: "toc-reframe",   label: "The Reframe" },
  { id: "toc-solution",  label: "The Solution" },
  { id: "toc-trust",     label: "Trust First" },
  { id: "toc-process",   label: "The Process" },
  { id: "toc-decisions", label: "Key Decisions" },
  { id: "toc-metrics",   label: "Metrics" },
  { id: "toc-next",      label: "What's Next" },
  { id: "toc-reflection",label: "Reflection" },
];

export default function ZoomAgentTOCClient() {
  return <CaseStudyTOC sections={zoomSections} />;
}
