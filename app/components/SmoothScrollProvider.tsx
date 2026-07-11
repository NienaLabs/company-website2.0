"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Skip Lenis on touch-only devices — native momentum scroll is already
    // buttery and adding JS interpolation on top causes the stuttering.
    const isTouchOnly =
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    if (isTouchOnly) {
      // On mobile, let the browser handle momentum natively.
      // Still configure ScrollTrigger to be mobile-friendly.
      ScrollTrigger.config({ ignoreMobileResize: true });
      return;
    }

    const lenis = new Lenis({
      // lerp (linear interpolation) gives the silky catch-up feel.
      // 0.1 = very smooth, 0.08 = ultra buttery, 0.12 = snappier.
      lerp: 0.1,
      smoothWheel: true,
      // touchMultiplier: 0 prevents Lenis from intercepting touch scroll
      touchMultiplier: 0,
      wheelMultiplier: 0.9,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    // ── Correct Lenis + GSAP + ScrollTrigger integration ─────────────────
    //
    // Lenis v1 works by intercepting wheel events, interpolating the target
    // scroll position, and then calling window.scrollTo() with the smoothed
    // value. This means the NATIVE scroll events still fire — ScrollTrigger
    // listens to those directly. No scrollerProxy is needed or wanted.
    //
    // scrollerProxy was removed because:
    //   • Lenis already feeds real scroll values back to window.scrollY
    //   • scrollerProxy's scrollTop SETTER calls lenis.scrollTo() which
    //     conflicts with ScrollTrigger pin calculations and causes the
    //     page to jump/snap when the hero pin tries to lock position.
    //
    // The only wiring needed is:
    //   1. Drive Lenis from GSAP's ticker so they share one RAF loop
    //   2. Call ScrollTrigger.update() on each Lenis scroll event so
    //      scrub animations stay frame-perfectly in sync

    // 1. Share the RAF loop
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // 2. Sync ScrollTrigger to Lenis scroll events
    lenis.on("scroll", ScrollTrigger.update);

    // ── Refresh timing ────────────────────────────────────────────────────
    // Refresh ScrollTrigger after the loading screen exits so all element
    // positions are finalised. Falls back to rAF if the event never fires.
    let refreshed = false;
    const onUnlocked = () => {
      if (refreshed) return;
      refreshed = true;
      // Double rAF: first frame for layout, second for paint
      requestAnimationFrame(() =>
        requestAnimationFrame(() => ScrollTrigger.refresh())
      );
    };
    window.addEventListener("page-unlocked", onUnlocked);

    // Fallback in case LoadingScreen is absent (e.g. dev hot reload)
    const fallbackRaf = requestAnimationFrame(() => {
      if (!refreshed) {
        refreshed = true;
        ScrollTrigger.refresh();
      }
    });

    return () => {
      cancelAnimationFrame(fallbackRaf);
      window.removeEventListener("page-unlocked", onUnlocked);
      lenis.destroy();
      gsap.ticker.remove(onTick);
    };
  }, []);

  return <>{children}</>;
}
