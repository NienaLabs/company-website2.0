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

    const timer = setTimeout(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      tl.fromTo(glowRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" })
        .fromTo(overlineRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.5")
        .fromTo(part1Ref.current, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.3")
        .fromTo(part2Ref.current, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .fromTo(ctaRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.2");
    }, 100);
    return () => clearTimeout(timer);
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        backgroundColor: '#0a0a0c',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z' opacity='.5'%3E%3C/path%3E%3Cpath d='M15 15h50l-5 5H20v40l-5 5V15zm0 50h50V15L80 0v80H0l15-15zm32.07-32.07l3.54-3.54A15 15 0 0 1 29.4 50.6l3.53-3.53a10 10 0 1 0 14.14-14.14zM32.93 47.07a10 10 0 1 1 14.14-14.14L32.93 47.07z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")`,
        minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        textAlign: "center", position: "relative", overflow: "hidden",
        padding: "160px 0",
      }}
    >
      <div
        ref={glowRef}
        style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.12) 0%, transparent 65%)",
          pointerEvents: "none", transform: "scale(0)", opacity: 0,
        }}
      />
      <div className="section-container" style={{ maxWidth: "820px", position: "relative", zIndex: 1 }}>
        <div
          ref={overlineRef}
          style={{
            fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em",
            color: "rgba(255, 255, 255, 0.6)", textTransform: "uppercase",
            marginBottom: "40px", opacity: 0,
          }}
        >
          For Founders · For Builders · For Dreamers
        </div>
        <div
          ref={part1Ref}
          style={{
            fontFamily: "var(--font-display)", fontWeight: 600,
            fontSize: "clamp(28px, 4.5vw, 52px)", color: "#ffffff",
            lineHeight: 1.25, marginBottom: "8px", opacity: 0,
          }}
        >
          If you believe your idea could make a huge impact on the world 
        </div>
        <div
          ref={part2Ref}
          style={{
            fontFamily: "var(--font-display)", fontWeight: 600,
            fontSize: "clamp(28px, 4.5vw, 52px)", color: "#ffffff",
            lineHeight: 1.25, marginBottom: "56px", opacity: 0,
          }}
        >
          we&apos;re ready to build it with you.
        </div>
        <div ref={ctaRef} style={{ opacity: 0 }}>
          <a href="#contact" className="btn-primary" style={{ fontSize: "13px", fontWeight: 600, padding: "14px 40px" }}>
            Reach Out
          </a>
        </div>
      </div>
    </section>
  );
}
