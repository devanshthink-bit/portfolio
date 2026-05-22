"use client";
import dynamic from "next/dynamic";

const CaseStudyTOC = dynamic(() => import("./CaseStudyTOC"), { ssr: false });

export default function CaseStudyTOCClient() {
  return <CaseStudyTOC />;
}
