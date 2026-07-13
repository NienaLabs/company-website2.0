"use client";

import { useEffect, useRef, useState } from "react";
import { ReactLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<any>(null);
  const [isTouchOnly, setIsTouchOnly] = useState<boolean | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    setIsTouchOnly(isTouch);
  }, []);

  useEffect(() => {
    // ── Refresh timing ────────────────────────────────────────────────────
    let refreshed = false;
    const onUnlocked = () => {
      if (refreshed) return;
      refreshed = true;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => ScrollTrigger.refresh())
      );
    };
    window.addEventListener("page-unlocked", onUnlocked);

    const fallbackRaf = requestAnimationFrame(() => {
      if (!refreshed) {
        refreshed = true;
        ScrollTrigger.refresh();
      }
    });

    return () => {
      cancelAnimationFrame(fallbackRaf);
      window.removeEventListener("page-unlocked", onUnlocked);
    };
  }, []);

  useEffect(() => {
    // Prevent massive layout thrashing on mobile when the URL bar hides/shows
    ScrollTrigger.config({ ignoreMobileResize: true });

    if (isTouchOnly === true) return; // Native momentum scroll handles it

    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // ReactLenis might not have populated the ref immediately, so we check safely
    let lenisInst = lenisRef.current?.lenis;
    if (lenisInst) {
      lenisInst.on("scroll", ScrollTrigger.update);
    } else {
      // Fallback if ref is late
      setTimeout(() => {
        lenisInst = lenisRef.current?.lenis;
        if (lenisInst) lenisInst.on("scroll", ScrollTrigger.update);
      }, 100);
    }

    return () => {
      gsap.ticker.remove(update);
      if (lenisInst) {
        lenisInst.off("scroll", ScrollTrigger.update);
      }
    };
  }, [isTouchOnly]);

  if (isTouchOnly === null) {
    // SSR or initial client render, render children normally
    return <>{children}</>;
  }

  if (isTouchOnly) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        syncTouch: false,
        touchMultiplier: 0,
        autoRaf:false
      }}
    >
      {children}
    </ReactLenis>
  );
}
