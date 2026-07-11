"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const philosophyParts = [
  {
    text: "We believe the world can be changed the way we found it.",
    color: "var(--text-primary)",
    size: "clamp(28px, 4vw, 48px)",
    italic: false,
  },
  {
    text: "Every product we build has one purpose:",
    color: "var(--text-secondary)",
    size: "clamp(22px, 3vw, 36px)",
    italic: false,
  },
  {
    text: "to push humanity forward.",
    color: "var(--amber)",
    size: "clamp(28px, 4vw, 48px)",
    italic: true,
  },
];

function WordReveal({
  text,
  color,
  size,
  italic,
  delay,
}: {
  text: string;
  color: string;
  size: string;
  italic: boolean;
  delay: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const container = containerRef.current;
    if (!container || prefersReducedMotion) {
      container?.querySelectorAll<HTMLElement>("span").forEach((s) => {
        s.style.color = color;
      });
      return;
    }

    ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      onEnter: () => {
        gsap.to(container.querySelectorAll("span"), {
          color,
          duration: 0.4,
          stagger: 0.03,
          ease: "power2.out",
          delay,
        });
      },
    });
  }, { scope: containerRef, dependencies: [color, delay] });

  return (
    <div
      ref={containerRef}
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: size,
        fontStyle: "normal",
        lineHeight: 1.3,
        marginBottom: "16px",
      }}
    >
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            marginRight: "0.28em",
            color: "var(--text-muted)",
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const goldRuleRef = useRef<HTMLDivElement>(null);
  const separatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(goldRuleRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "power2.out", transformOrigin: "left",
        scrollTrigger: { trigger: goldRuleRef.current, start: "top 80%" } }
    );



    gsap.fromTo(separatorRef.current,
      { scaleY: 0 },
      { scaleY: 1, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: separatorRef.current, start: "top 90%" } }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      style={{ background: "var(--bg)", padding: "var(--space-11) 0" }}
    >
      <div className="section-container" style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
        <div
          ref={goldRuleRef}
          style={{
            width: "80px", height: "1px", background: "var(--amber)",
            margin: "0 auto 48px", transformOrigin: "left", transform: "scaleX(0)",
          }}
        />
        {philosophyParts.map((part, i) => (
          <WordReveal key={i} {...part} delay={i * 0.1} />
        ))}
        <div
          ref={separatorRef}
          style={{
            width: "1px", height: "64px",
            background: "linear-gradient(to bottom, rgba(255,176,32,0.4), transparent)",
            margin: "48px auto 0", transformOrigin: "top", transform: "scaleY(0)",
          }}
        />
      </div>
    </section>
  );
}
