// Every in-page jump (dock Work, case study contents) goes through Lenis, so it glides at one
// pace instead of the browser's own quick smooth scroll fighting Lenis.
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function smoothScrollTo(top: number) {
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o: object) => void } }).__lenis;
  if (!lenis) return window.scrollTo({ top, behavior: "smooth" });
  // Short hops are quick, long jumps take their time: 0.9s up to 1.7s.
  const duration = Math.min(1.7, 0.9 + Math.abs(top - window.scrollY) / 2500);
  lenis.scrollTo(top, { duration, easing: easeInOutCubic });
}
