"use client";
import { IPhone } from "./IPhone";
import SidedoorApp from "./sidedoor/App";

// The Sidedoor prototype, live in the case study: the same React app the prototype page runs, in
// the same phone, on the RedBus-style stage in Sidedoor blue. It starts at the login screen.
export default function SidedoorEmbed() {
  return (
    <div className="cs-proto-stage is-blue">
      <span className="cs-proto-badge"><i />Live prototype, tap anywhere</span>
      <div className="sd-live">
        <IPhone>
          <SidedoorApp />
        </IPhone>
      </div>
    </div>
  );
}
