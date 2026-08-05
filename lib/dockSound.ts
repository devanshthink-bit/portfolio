/* Synthesised dock click — a short rubbery "thock" (pitch drop + fast decay). */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

export function playDockClick(pitch = 1) {
  const ac = getCtx();
  if (!ac) return;
  // A click is a user gesture, so resuming here is allowed; the first one is
  // still audible because we fire once the context is actually running.
  if (ac.state === "suspended") void ac.resume().then(() => fire(ac, pitch));
  else fire(ac, pitch);
}

function fire(ac: AudioContext, pitch: number) {
  const t = ac.currentTime;
  const f = pitch * (1 + (Math.random() - 0.5) * 0.05); // keeps repeats from sounding mechanical

  const osc = ac.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(420 * f, t);
  osc.frequency.exponentialRampToValueAtTime(150 * f, t + 0.055);

  // Rolled off well below the mix so it sits under the page rather than on top of it
  const filter = ac.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 950;

  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.055, t + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.085);

  osc.connect(filter).connect(gain).connect(ac.destination);
  osc.start(t);
  osc.stop(t + 0.1);
}
