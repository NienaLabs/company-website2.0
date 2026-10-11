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
  const [isTouchOnly, setIsTouchOnly] = useState<boolean>(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouch) {
      setIsTouchOnly(true);
    }
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

    if (isTouchOnly) {
      lenisRef.current?.lenis?.destroy();
      return; // Native momentum scroll handles it on mobile
    }

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

  // On touch-only mobile devices, disable Lenis completely for native momentum scroll
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
        autoRaf: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
