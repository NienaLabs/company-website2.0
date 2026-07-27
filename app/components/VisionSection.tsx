"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsToSplitRef = useRef<HTMLDivElement>(null);

  const imagineAnimatedRef = useRef<HTMLSpanElement>(null);
  const buildAnimatedRef = useRef<HTMLSpanElement>(null);
  const tellAnimatedRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // 1. Split text on plain text
    // @ts-ignore - SplitType works on Elements
    const splitText = new SplitType(wordsToSplitRef.current, { types: "words" });

    // Use textContent instead of innerText because innerText might be empty before paint!
    const imagineWord = splitText.words?.find(w => w.textContent?.trim().toLowerCase().replace(/[^a-z]/g, '') === "imagine");
    const buildWord = splitText.words?.find(w => w.textContent?.trim().toLowerCase().replace(/[^a-z]/g, '') === "build");
    const tellWord = splitText.words?.find(w => w.textContent?.trim().toLowerCase().replace(/[^a-z]/g, '') === "tell");

    // Color the static ones so they match (just in case they blink before hiding)
    if (imagineWord) imagineWord.style.color = "var(--amber)";
    if (buildWord) buildWord.style.color = "var(--amber)";
    if (tellWord) tellWord.style.color = "var(--amber)";

    // Words that should fly away
    const flyAwayWords = splitText.words?.filter(w => w !== imagineWord && w !== buildWord && w !== tellWord) || [];

    const setupMatch = () => {
      const matchLocation = (staticEl: HTMLElement | undefined, animatedEl: HTMLElement) => {
        if (!staticEl) return;
        // Clear previous transforms to measure original flex layout position
        gsap.set(animatedEl, { x: 0, y: 0, fontSize: "clamp(24px, 3vw, 32px)", scale: 1 });
        const boundsRel = staticEl.getBoundingClientRect();
        const boundsAbs = animatedEl.getBoundingClientRect();
        
        gsap.set(animatedEl, {
          x: boundsRel.left - boundsAbs.left,
          y: boundsRel.top - boundsAbs.top,
        });
      };

      if (imagineAnimatedRef.current) matchLocation(imagineWord, imagineAnimatedRef.current);
      if (buildAnimatedRef.current) matchLocation(buildWord, buildAnimatedRef.current);
      if (tellAnimatedRef.current) matchLocation(tellWord, tellAnimatedRef.current);
    };

    // Run setup immediately, but also after a tiny delay in case fonts are loading
    setupMatch();
    setTimeout(setupMatch, 100);
    window.addEventListener("resize", setupMatch);

    // Make duplicates visible and hide the static originals
    gsap.set([imagineAnimatedRef.current, buildAnimatedRef.current, tellAnimatedRef.current], { visibility: "visible" });
    if (imagineWord) gsap.set(imagineWord, { visibility: "hidden" });
    if (buildWord) gsap.set(buildWord, { visibility: "hidden" });
    if (tellWord) gsap.set(tellWord, { visibility: "hidden" });
    
    gsap.set(".is-punctuation", { autoAlpha: 0 });

    // 3. Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%", // Extended scroll distance for full effect
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
    // Animated words move to center (both x and y together for a straight line)
    .to([imagineAnimatedRef.current, buildAnimatedRef.current, tellAnimatedRef.current], {
      x: 0,
      y: 0,
      fontSize: "clamp(2.5rem, 8vw, 7rem)",
      // Kept out color change so they remain amber
      ease: "sine.inOut",
      duration: 2,
    }, "<0.2")
    // Punctuation fades in
    .to(".is-punctuation", {
      autoAlpha: 1,
      fontSize: "clamp(2.5rem, 8vw, 7rem)",
      stagger: 0.2,
    }, "-=1");

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
        overflow: "hidden" 
      }}
    >
      <div className="section-container" style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", zIndex: 2 }}>
        {/* Centered Text */}
        <div style={{ padding: "var(--space-4)", maxWidth: "800px" }}>
          <div style={{
            fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em",
            color: "var(--amber)", textTransform: "uppercase", marginBottom: "24px",
          }}>
            Our Vision
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(40px, 5vw, 64px)", color: "var(--text-primary)", marginBottom: "var(--space-6)", lineHeight: 1.1 }}>
            The Blueprint
          </h2>
          <div ref={wordsToSplitRef} style={{ fontFamily: "var(--font-body)", fontSize: "clamp(24px, 3vw, 32px)", lineHeight: 1.6, color: "var(--text-secondary)" }}>
            We imagine a world transformed by bold engineering. 
            We build the resilient systems that scale those ideas. 
            We tell the story of human progress through code.
          </div>
        </div>
      </div>

      {/* Animated Words Layer (Final centered layout) */}
      <div className="animated-words-container" style={{ 
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10,
        display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "16px",
        fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--amber)",
        padding: "0 var(--space-4)"
      }}>
        <span style={{ display: "flex", alignItems: "baseline" }}>
          <span ref={imagineAnimatedRef} style={{ visibility: "hidden", display: "inline-block", lineHeight: 1.6, fontSize: "clamp(24px, 3vw, 32px)", fontFamily: "var(--font-body)", color: "var(--amber)", fontWeight: 400 }}>imagine</span>
          <span className="is-punctuation" style={{ visibility: "hidden", color: "var(--amber)" }}>,</span>
        </span>
        <span style={{ display: "flex", alignItems: "baseline" }}>
          <span ref={buildAnimatedRef} style={{ visibility: "hidden", display: "inline-block", lineHeight: 1.6, fontSize: "clamp(24px, 3vw, 32px)", fontFamily: "var(--font-body)", color: "var(--amber)", fontWeight: 400 }}>build</span>
          <span className="is-punctuation" style={{ visibility: "hidden", color: "var(--amber)" }}>,</span>
        </span>
        <span style={{ display: "flex", alignItems: "baseline" }}>
          <span ref={tellAnimatedRef} style={{ visibility: "hidden", display: "inline-block", lineHeight: 1.6, fontSize: "clamp(24px, 3vw, 32px)", fontFamily: "var(--font-body)", color: "var(--amber)", fontWeight: 400 }}>tell</span>
          <span className="is-punctuation" style={{ visibility: "hidden", color: "var(--amber)" }}>.</span>
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
