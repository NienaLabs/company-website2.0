"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const overlineRef = useRef<HTMLDivElement>(null);
  const part1Ref = useRef<HTMLDivElement>(null);
  const part2Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
    });

    tl.fromTo(glowRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" })
      .fromTo(overlineRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.5")
      .fromTo(part1Ref.current, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.3")
      .fromTo(part2Ref.current, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4")
      .fromTo(ctaRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.2");
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        background: "var(--color-abyss)", minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        textAlign: "center", position: "relative", overflow: "hidden",
        padding: "var(--space-11) 0",
      }}
    >
      <div
        ref={glowRef}
        style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 65%)",
          pointerEvents: "none", transform: "scale(0)", opacity: 0,
        }}
      />
      <div className="section-container" style={{ maxWidth: "820px", position: "relative", zIndex: 1 }}>
        <div
          ref={overlineRef}
          style={{
            fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "0.28em",
            color: "rgba(201,168,76,0.5)", textTransform: "uppercase",
            marginBottom: "40px", opacity: 0,
          }}
        >
          For Founders · For Builders · For Dreamers
        </div>
        <div
          ref={part1Ref}
          style={{
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
            fontSize: "clamp(28px, 4.5vw, 52px)", color: "var(--color-text-primary)",
            lineHeight: 1.25, marginBottom: "8px", opacity: 0,
          }}
        >
          If you believe your idea could make a huge impact on the world —
        </div>
        <div
          ref={part2Ref}
          style={{
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic",
            fontSize: "clamp(28px, 4.5vw, 52px)", color: "var(--color-gold)",
            lineHeight: 1.25, marginBottom: "56px", opacity: 0,
          }}
        >
          we&apos;re ready to build it with you.
        </div>
        <div ref={ctaRef} style={{ opacity: 0 }}>
          <a href="#contact" className="btn-primary" style={{ fontSize: "10px", padding: "14px 40px" }}>
            Reach Out
          </a>
        </div>
      </div>
    </section>
  );
}
