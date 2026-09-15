"use client";
import CaseStudyTOC from "./CaseStudyTOC";

const redbusSections = [
  { id: "toc-intro",   label: "Introduction" },
  { id: "toc-problem", label: "The Problem" },
  { id: "toc-design",  label: "The Design" },
  { id: "toc-try",     label: "Try It" },
  { id: "toc-behind",  label: "Behind the Scenes" },
  { id: "toc-testing", label: "Testing" },
  { id: "toc-choices", label: "Choices" },
  { id: "toc-next",    label: "What's Next" },
];

export default function RedbusTOCClient() {
  return <CaseStudyTOC sections={redbusSections} variant="left" />;
}
