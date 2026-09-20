import type { Metadata } from "next";
import Viewer from "@/components/sidedoor/Viewer";

export const metadata: Metadata = {
  title: "Sidedoor — working prototype",
  description:
    "The Sidedoor V6 screens, built in code as a working iOS app: both happy paths end to end, every state, on an iPhone 17.",
};

export default function SidedoorPrototypePage() {
  return (
    <main className="proto-page">
      <header className="proto-head">
        <p className="proto-eyebrow">Sidedoor · V6</p>
        <h1>Working prototype</h1>
        <p className="proto-sub">
          Every V6 screen, in code. Send a request as Abhinav, then <b>Profile → Switch role</b> to become Nithin, refer
          him, and switch back to watch the same request move. Swipe from the left edge to go back. The work email code
          is <b>482013</b>.
        </p>
      </header>
      <Viewer />
    </main>
  );
}
