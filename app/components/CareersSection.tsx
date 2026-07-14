"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CareersSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const timer = setTimeout(() => {
      gsap.fromTo(
        ".careers-fade",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, 100);
    return () => clearTimeout(timer);
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section
      ref={sectionRef}
      id="careers"
      style={{
        background: "var(--bg)",
        padding: "var(--space-10) 0",
        borderTop: "var(--border-hairline)",
      }}
    >
      <div className="section-container">
        <div className="careers-fade overline" style={{ marginBottom: "16px" }}>Careers</div>
        <h2
          className="careers-fade"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(32px, 5vw, 48px)",
            color: "var(--text-primary)",
            lineHeight: 1.1,
            marginBottom: "24px",
          }}
        >
          Open Roles
        </h2>
        <div className="careers-fade" style={{ width: "40px", height: "1px", background: "var(--amber)", marginBottom: "40px" }} />

        <div className="careers-fade" style={{
          background: "linear-gradient(to bottom, rgba(255,176,32,0.02), transparent)",
          borderTop: "1px solid rgba(255,176,32,0.1)",
          borderBottom: "1px solid rgba(255,176,32,0.1)",
          padding: "64px 32px",
          textAlign: "center",
        }}>
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontSize: "12px",
            letterSpacing: "0.06em",
            color: "var(--amber)",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}>
            No Current Openings
          </h3>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "17px",
            color: "var(--text-secondary)",
            maxWidth: "500px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}>
            Our engineering team is currently at full capacity. We aren&apos;t actively 
            recruiting for new roles today, but we&apos;re always looking out for exceptional 
            talent who believe in building with purpose.
          </p>
        </div>
      </div>
    </section>
  );
}
