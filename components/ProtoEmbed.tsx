"use client";
import { IPhone } from "./IPhone";

// The live RedBus hi-fi prototype. `?test` hides the viewer's rails; inside a 402-wide frame the
// viewer drops its own phone and becomes the bare screen, so this mock is the only phone.
const PROTO_URL = "https://devanshthink-bit.github.io/redbus-return-capture/?test&fidelity=hifi";

export default function ProtoEmbed() {
  return (
    <div
      className="cs-proto-stage"
      // The site draws its own cursor; inside the iframe the native one takes over.
      onMouseEnter={() => window.dispatchEvent(new Event("cursor:hide"))}
      onMouseLeave={() => window.dispatchEvent(new Event("cursor:show"))}
    >
      <span className="cs-proto-badge"><i />Live prototype, tap anywhere</span>
      <IPhone>
        <iframe
          src={PROTO_URL}
          title="RedBus return capture, working hi-fi prototype"
          loading="lazy"
          allow="fullscreen"
        />
      </IPhone>
    </div>
  );
}
