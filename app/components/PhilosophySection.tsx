"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const philosophyParts = [
  {
    text: "We believe the world can be changed the way we found it.",
    color: "var(--color-text-primary)",
    size: "clamp(28px, 4vw, 48px)",
    italic: false,
  },
  {
    text: "Every product we build has one purpose:",
    color: "var(--color-text-secondary)",
    size: "clamp(22px, 3vw, 36px)",
    italic: false,
  },
  {
    text: "to push humanity forward.",
    color: "var(--color-gold)",
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
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 300,
        fontSize: size,
        fontStyle: italic ? "italic" : "normal",
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
            color: "rgba(232,223,200,0.12)",
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
  const overlineRef = useRef<HTMLDivElement>(null);
  const separatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(goldRuleRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "power2.out", transformOrigin: "left",
        scrollTrigger: { trigger: goldRuleRef.current, start: "top 80%" } }
    );

    gsap.fromTo(overlineRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: overlineRef.current, start: "top 85%" } }
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
      style={{ background: "var(--color-void)", padding: "var(--space-11) 0" }}
    >
      <div className="section-container" style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
        <div ref={overlineRef} className="overline" style={{ marginBottom: "20px", opacity: 0 }}>
          Our Philosophy
        </div>
        <div
          ref={goldRuleRef}
          style={{
            width: "80px", height: "1px", background: "var(--color-gold)",
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
            background: "linear-gradient(to bottom, rgba(201,168,76,0.4), transparent)",
            margin: "48px auto 0", transformOrigin: "top", transform: "scaleY(0)",
          }}
        />
      </div>
    </section>
  );
}
