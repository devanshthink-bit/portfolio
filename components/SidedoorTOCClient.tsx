"use client";
import CaseStudyTOC from "./CaseStudyTOC";

// The same left-hand contents list as RedBus, with Sidedoor's sections.
const sidedoorSections = [
  { id: "toc-problem",    label: "The Problem" },
  { id: "toc-why",        label: "Why It Matters" },
  { id: "toc-solution",   label: "The Solution" },
  { id: "toc-process",    label: "The Process" },
  { id: "toc-principles", label: "Principles" },
  { id: "toc-decisions",  label: "Key Decisions" },
  { id: "toc-usecases",   label: "Edge Cases" },
  { id: "toc-metrics",    label: "Metrics" },
  { id: "toc-next",       label: "What's Next" },
  { id: "toc-reflection", label: "Reflection" },
];

export default function SidedoorTOCClient() {
  return <CaseStudyTOC sections={sidedoorSections} variant="left" />;
}
