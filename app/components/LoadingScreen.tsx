"use client";

import { useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function LoadingScreen() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const progressObj = useRef({ value: 0 });
  const fakeTimeline = useRef<gsap.core.Timeline | null>(null);

  // Dismiss the loader
  const dismiss = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Kill the fake progress if still running
    if (fakeTimeline.current) fakeTimeline.current.kill();

    // Snap to 100%
    gsap.to(progressObj.current, {
      value: 100,
      duration: 0.4,
      ease: "power2.out",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = `${Math.round(progressObj.current.value)}`;
        }
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${progressObj.current.value / 100})`;
        }
      },
    });

    // Exit animation
    const exitTl = gsap.timeline({ delay: 0.5 });

    exitTl
      // Fade the counter + bar first
      .to([counterRef.current, progressBarRef.current?.parentElement], {
        opacity: 0,
        y: -10,
        duration: 0.35,
        ease: "power2.in",
      })
      // Fade watermark
      .to(
        watermarkRef.current,
        {
          opacity: 0,
          scale: 1.05,
          duration: 0.4,
          ease: "power2.in",
        },
        "-=0.2"
      )
      // Slide the overlay halves apart (curtain reveal)
      .to(overlay, {
        clipPath: "inset(50% 0 50% 0)",
        duration: 0.7,
        ease: "power3.inOut",
      })
      // Clean up
      .set(overlay, { display: "none" })
      .add(() => {
        // Re-enable scroll
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        // Tell SmoothScrollProvider that layout is fully settled
        window.dispatchEvent(new CustomEvent("page-unlocked"));
      });
  }, []);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;

      // Lock scroll during load
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      // Subtle watermark entrance
      gsap.fromTo(
        watermarkRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out", delay: 0.1 }
      );

      // Fake progress: fast start → slows down drastically
      // 0→70 in 1.5s, 70→88 in 2s, 88→95 in 2.5s (never reaches 100 on its own)
      const tl = gsap.timeline();
      fakeTimeline.current = tl;

      const updateDisplay = () => {
        if (counterRef.current) {
          counterRef.current.textContent = `${Math.round(progressObj.current.value)}`;
        }
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${progressObj.current.value / 100})`;
        }
      };

      tl
        // Phase 1: Rapid start → 0 to 70
        .to(progressObj.current, {
          value: 70,
          duration: 1.5,
          ease: "power1.out",
          onUpdate: updateDisplay,
        })
        // Phase 2: Slowing down → 70 to 88
        .to(progressObj.current, {
          value: 88,
          duration: 2,
          ease: "power2.out",
          onUpdate: updateDisplay,
        })
        // Phase 3: Crawl → 88 to 95
        .to(progressObj.current, {
          value: 95,
          duration: 2.5,
          ease: "power3.out",
          onUpdate: updateDisplay,
        })
        // Phase 4: Near-stall → 95 to 98 (feels stuck)
        .to(progressObj.current, {
          value: 98,
          duration: 4,
          ease: "power4.out",
          onUpdate: updateDisplay,
        });

      // Listen for real page load
      const handleLoad = () => dismiss();

      if (document.readyState === "complete") {
        // Already loaded — give a minimum display time so it's not jarring
        gsap.delayedCall(1.8, dismiss);
      } else {
        window.addEventListener("load", () => {
          // Ensure at least 1.5s of loading feel
          const elapsed = tl.time();
          const minDelay = Math.max(0, 1.5 - elapsed);
          gsap.delayedCall(minDelay, dismiss);
        });
      }

      return () => {
        window.removeEventListener("load", handleLoad);
      };
    },
    { scope: overlayRef }
  );

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        clipPath: "inset(0 0 0 0)",
      }}
    >
      {/* Subtle radial glow behind watermark */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(255,176,32,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Watermark — large, faint brand name */}
      <div
        ref={watermarkRef}
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0px",
          userSelect: "none",
          pointerEvents: "none",
          opacity: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(48px, 12vw, 120px)",
            letterSpacing: "0.06em",
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,176,32,0.12)",
            textTransform: "uppercase",
          }}
        >
          Niena
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(48px, 12vw, 120px)",
            letterSpacing: "0.06em",
            lineHeight: 1,
            color: "rgba(255,176,32,0.07)",
            textTransform: "uppercase",
          }}
        >
          Labs
        </span>
      </div>

      {/* Bottom loading area */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(48px, 8vh, 96px)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          width: "clamp(200px, 40vw, 320px)",
        }}
      >
        {/* Percentage counter */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "2px",
          }}
        >
          <span
            ref={counterRef}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "14px",
              letterSpacing: "0.06em",
              color: "rgba(255,176,32,0.5)",
              fontVariantNumeric: "tabular-nums",
              minWidth: "32px",
              textAlign: "right",
            }}
          >
            0
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "11px", fontWeight: 600,
              letterSpacing: "0.06em",
              color: "rgba(255,176,32,0.3)",
            }}
          >
            %
          </span>
        </div>

        {/* Progress bar track */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "rgba(255,176,32,0.08)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Progress bar fill */}
          <div
            ref={progressBarRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(90deg, rgba(255,176,32,0.15), rgba(255,176,32,0.45))",
              transformOrigin: "left",
              transform: "scaleX(0)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
