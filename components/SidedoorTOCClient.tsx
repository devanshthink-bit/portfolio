"use client";
import CaseStudyTOC from "./CaseStudyTOC";

// The same left-hand contents list as RedBus, with Sidedoor's sections.
const sidedoorSections = [
  { id: "toc-intro",   label: "Introduction" },
  { id: "toc-problem", label: "The Problem" },
  { id: "toc-design",  label: "The Design" },
  { id: "toc-try",     label: "Try It" },
  { id: "toc-behind",  label: "Behind the Scenes" },
  { id: "toc-testing", label: "Attacking It" },
  { id: "toc-choices", label: "Choices" },
  { id: "toc-next",    label: "What's Next" },
];

export default function SidedoorTOCClient() {
  return <CaseStudyTOC sections={sidedoorSections} variant="left" />;
}
