import type { Metadata } from "next";
import Viewer from "@/components/sidedoor/Viewer";

export const metadata: Metadata = {
  title: "Sidedoor — working prototype",
  description:
    "The Sidedoor V6 screens, built in code as a working iOS app: the referrer and candidate flows end to end, and every state.",
};

export default function SidedoorPrototypePage() {
  return (
    <main className="proto-page">
      <Viewer />
    </main>
  );
}
