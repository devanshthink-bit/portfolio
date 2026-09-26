"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
// Lenis's own rules: no CSS smooth-scroll fighting it, and iframes ignore the pointer while
// the page glides, so the wheel never catches on the live prototype.
import "lenis/dist/lenis.css";

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Every page opens at its top, even on a refresh: the browser's own scroll restoring would
    // otherwise put the reader back wherever they last were (a case study opened mid-way).
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    // A refresh opens at the top too, even when the address still carries a section from the menu's
    // Work link (/#recent-work): a phone refresh used to land on the case studies, not the hero
    // (Devansh, 26 Sep 2026). A link followed to a section still lands there.
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav?.type === "reload" && window.location.hash) {
      history.replaceState(history.state, "", window.location.pathname + window.location.search);
    }
    if (!window.location.hash) window.scrollTo(0, 0);

    // Anyone who asked for less motion keeps the browser's plain scrolling.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // lerp: each frame covers 8.5% of the way left, so the wheel eases out softly.
    // Touch stays native: phones already glide, and syncing it feels heavy.
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true });
    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let raf: number;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // A new page starts at the top, with no leftover glide from the last one.
  // A link to a section (/#recent-work) is left to land where it points.
  useEffect(() => {
    if (window.location.hash) return;
    const toTop = () => {
      const lenis = lenisRef.current;
      // stop() cancels a glide still running from the last page (a click mid-scroll used to
      // carry it over and land the new page at the old position); then back to the top.
      if (lenis) lenis.stop();
      window.scrollTo(0, 0);
      if (lenis) { lenis.start(); lenis.resize(); lenis.scrollTo(0, { immediate: true, force: true }); }
    };
    toTop();
    // Once more after the new page has laid out, so nothing restores an old position over it.
    const raf = requestAnimationFrame(() => requestAnimationFrame(toTop));
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
