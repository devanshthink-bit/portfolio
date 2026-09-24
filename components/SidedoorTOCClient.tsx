"use client";
import CaseStudyTOC from "./CaseStudyTOC";

// The same left-hand contents list as RedBus, with the sections of Sidedoor's story.
const sidedoorSections = [
  { id: "toc-intro",  label: "Introduction" },
  { id: "toc-try",    label: "Try It" },
  { id: "toc-story",  label: "The Story" },
  { id: "toc-behind", label: "Behind the Scenes" },
  { id: "toc-grind",  label: "The Grind" },
  { id: "toc-next",   label: "What's Next" },
];

export default function SidedoorTOCClient() {
  return <CaseStudyTOC sections={sidedoorSections} variant="left" />;
}
