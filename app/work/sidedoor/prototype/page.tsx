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
          him, and switch back to watch the same request move. Swipe from the left edge to go back.
        </p>
      </header>
      <Viewer />
      <section className="proto-notes">
        <h2>How to walk it</h2>
        <ol>
          <li>
            <b>Candidate:</b> sign in → Get referred → upload resume → See jobs → Interaction Designer → Ask Nithin →
            fill the four details the portal also asks for → Send.
          </li>
          <li>
            <b>Referrer:</b> Profile → Switch role → Requests → Abhinav Saxena → check the fit line by line → Refer →
            copy the portal fields → Mark as submitted.
          </li>
          <li>
            <b>Back to the candidate:</b> Switch role again. The Flipkart request now reads Submitted, with the timeline
            moved and the date on it.
          </li>
        </ol>
        <p className="proto-sub">
          The work email code is <b>482013</b>. States that only a real backend can cause — loading, couldn’t load,
          couldn’t send — are wired to the same screens and show on their own.
        </p>
      </section>
    </main>
  );
}
