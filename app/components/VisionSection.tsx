"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import ScrollBlurReveal from "./ui/ScrollBlurReveal";
import TestimonialsSection from "./TestimonialsSection";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsToSplitRef = useRef<HTMLDivElement>(null);

  const perceivesAnimatedRef = useRef<HTMLSpanElement>(null);
  const enduresAnimatedRef = useRef<HTMLSpanElement>(null);
  const actsAnimatedRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // 1. Split text on plain text
    // @ts-ignore - SplitType works on Elements
    const splitText = new SplitType(wordsToSplitRef.current, { types: "words" });

    const perceivesWord = splitText.words?.find(
      (w) => w.textContent?.trim().toLowerCase().replace(/[^a-z]/g, "") === "perceives"
    );
    const enduresWord = splitText.words?.find(
      (w) => w.textContent?.trim().toLowerCase().replace(/[^a-z]/g, "") === "endures"
    );
    const actsWord = splitText.words?.find(
      (w) => w.textContent?.trim().toLowerCase().replace(/[^a-z]/g, "") === "acts"
    );

    if (perceivesWord) perceivesWord.style.color = "var(--amber)";
    if (enduresWord) enduresWord.style.color = "var(--amber)";
    if (actsWord) actsWord.style.color = "var(--amber)";

    // Words that should fly away
    const flyAwayWords =
      splitText.words?.filter(
        (w) => w !== perceivesWord && w !== enduresWord && w !== actsWord
      ) || [];

    const setupMatch = () => {
      const matchLocation = (
        staticEl: HTMLElement | undefined,
        animatedEl: HTMLElement
      ) => {
        if (!staticEl) return;
        gsap.set(animatedEl, { x: 0, y: 0, fontSize: "clamp(24px, 3vw, 32px)", scale: 1 });
        const boundsRel = staticEl.getBoundingClientRect();
        const boundsAbs = animatedEl.getBoundingClientRect();

        gsap.set(animatedEl, {
          x: boundsRel.left - boundsAbs.left,
          y: boundsRel.top - boundsAbs.top,
        });
      };

      if (perceivesAnimatedRef.current) matchLocation(perceivesWord, perceivesAnimatedRef.current);
      if (enduresAnimatedRef.current) matchLocation(enduresWord, enduresAnimatedRef.current);
      if (actsAnimatedRef.current) matchLocation(actsWord, actsAnimatedRef.current);
    };

    setupMatch();
    setTimeout(setupMatch, 100);
    window.addEventListener("resize", setupMatch);

    // Make duplicates visible and hide the static originals
    gsap.set(
      [perceivesAnimatedRef.current, enduresAnimatedRef.current, actsAnimatedRef.current],
      { visibility: "visible" }
    );
    if (perceivesWord) gsap.set(perceivesWord, { visibility: "hidden" });
    if (enduresWord) gsap.set(enduresWord, { visibility: "hidden" });
    if (actsWord) gsap.set(actsWord, { visibility: "hidden" });

    gsap.set(".is-punctuation", { autoAlpha: 0 });

    // 3. Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=250%",
        scrub: 1,
        pin: true,
      },
    });

    // Text words fly away
    tl.to(flyAwayWords, {
      opacity: 0,
      rotationZ: 30,
      rotationX: 40,
      yPercent: -300,
      xPercent: 100,
      stagger: 0.05,
    })
      // Animated words move to center
      .to(
        [perceivesAnimatedRef.current, enduresAnimatedRef.current, actsAnimatedRef.current],
        {
          x: 0,
          y: 0,
          fontSize: "clamp(2.5rem, 8vw, 7rem)",
          ease: "sine.inOut",
          duration: 2,
        },
        "<0.2"
      )
      // Punctuation fades in
      .to(
        ".is-punctuation",
        {
          autoAlpha: 1,
          fontSize: "clamp(2.5rem, 8vw, 7rem)",
          stagger: 0.2,
        },
        "-=1"
      )
      // Fade out static text before zooming
      .to(
        ".section-container",
        {
          opacity: 0,
          duration: 0.5,
        },
        "-=0.5"
      )
      // Zoom into the text to reveal what's underneath
      .to(
        ".animated-words-container",
        {
          scale: 30,
          opacity: 0,
          duration: 2,
          ease: "power2.in",
          force3D: false,
        },
        "+=0.5"
      )
      // Fade out the solid background of Vision to reveal Testimonials behind it
      .to(
        ".vision-bg",
        {
          opacity: 0,
          duration: 1.5,
          ease: "power2.inOut",
        },
        "<0.5"
      )
      // Scale up and fade in Testimonials from behind
      .to(
        ".testimonials-scale-wrapper",
        {
          scale: 1,
          opacity: 1,
          duration: 2,
          ease: "power2.out",
        },
        "<"
      );

    return () => {
      window.removeEventListener("resize", setupMatch);
      splitText.revert();
    };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="vision"
      style={{
        position: "relative",
        height: "100vh",
        background: "var(--bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Testimonials Section rendered absolutely behind */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <TestimonialsSection />
      </div>

      {/* Vision Background Layer */}
      <div
        className="vision-bg"
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--bg)",
          zIndex: 1,
        }}
      />

      <div
        className="section-container"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Centered Text */}
        <div style={{ padding: "var(--space-4)", maxWidth: "880px" }}>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: "var(--amber)",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            Our Vision & Thesis
          </div>
          <ScrollBlurReveal
            as="h2"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(36px, 5vw, 60px)",
              color: "var(--text-primary)",
              marginBottom: "var(--space-6)",
              lineHeight: 1.15,
            }}
          >
            Physical-World Intelligence
          </ScrollBlurReveal>
          <div
            ref={wordsToSplitRef}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(22px, 2.8vw, 30px)",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
            }}
          >
            Software that perceives the physical world.
            Infrastructure that endures every operational constraint.
            Hardware that acts with decisive intent.
          </div>
        </div>
      </div>

      {/* Animated Words Layer (Final centered layout) */}
      <div
        className="animated-words-container"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 10,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          color: "var(--color-fg)",
          padding: "0 var(--space-4)",
          transformOrigin: "center center",
        }}
      >
        <span style={{ display: "flex", alignItems: "baseline" }}>
          <span
            ref={perceivesAnimatedRef}
            style={{
              visibility: "hidden",
              display: "inline-block",
              lineHeight: 1.6,
              fontSize: "clamp(24px, 3vw, 32px)",
              fontFamily: "var(--font-body)",
              color: "var(--color-alt-1)",
              fontWeight: 400,
            }}
          >
            perceives
          </span>
          <span className="is-punctuation" style={{ visibility: "hidden", color: "var(--color-alt-1)" }}>
            ,
          </span>
        </span>
        <span style={{ display: "flex", alignItems: "baseline" }}>
          <span
            ref={enduresAnimatedRef}
            style={{
              visibility: "hidden",
              display: "inline-block",
              lineHeight: 1.6,
              fontSize: "clamp(24px, 3vw, 32px)",
              fontFamily: "var(--font-body)",
              color: "var(--color-brand)",
              fontWeight: 400,
            }}
          >
            endures
          </span>
          <span className="is-punctuation" style={{ visibility: "hidden", color: "var(--color-brand)" }}>
            ,
          </span>
        </span>
        <span style={{ display: "flex", alignItems: "baseline" }}>
          <span
            ref={actsAnimatedRef}
            style={{
              visibility: "hidden",
              display: "inline-block",
              lineHeight: 1.6,
              fontSize: "clamp(24px, 3vw, 32px)",
              fontFamily: "var(--font-body)",
              color: "var(--color-alt-3)",
              fontWeight: 400,
            }}
          >
            acts
          </span>
          <span className="is-punctuation" style={{ visibility: "hidden", color: "var(--color-alt-3)" }}>
            .
          </span>
        </span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .animated-words-container {
            flex-direction: column !important;
            gap: 4px !important;
          }
        }
      `}</style>
    </section>
  );
}
