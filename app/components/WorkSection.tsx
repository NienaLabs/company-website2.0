"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image"

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    id: "atlas",
    category: "High-Velocity Event Ticketing",
    title: "Atlas — The Sovereign Exchange",
    body: "A high-velocity ticketing platform engineered for the modern event landscape. Atlas serves as a primary gateway for thousands of users, facilitating seamless access to premier entertainment experiences through mission-critical infrastructure that handles high-demand releases with absolute precision.",
    image: "/images/projects/atlas_marketplace_cover.png",
    imageLeft: true,
  },
  {
    id: "niena",
    category: "AI-Driven Career Integration",
    title: "Niena — The Professional Catalyst",
    body: "An intelligent ecosystem redefining the professional journey. Niena leverages advanced AI to harmonize resume synthesis with real-time, high-fidelity interview simulations. By bridging the gap between talent and opportunity, it provides a sophisticated matching engine that aligns aspirations with the market's most compelling roles.",
    image: "/images/projects/campushelper_cover.png",
    imageLeft: false,
  },
];

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    projects.forEach((p, i) => {
      const imgEl = imageRefs.current[i];
      const txtEl = textRefs.current[i];
      if (!imgEl || !txtEl) return;

      gsap.fromTo(imgEl,
        { scale: 1.05 },
        { scale: 1, duration: 1.2, ease: "power2.out",
          scrollTrigger: { trigger: imgEl, start: "top 80%" } }
      );

      gsap.to(imgEl.querySelector("img"), {
        y: 40, ease: "none",
        scrollTrigger: { trigger: imgEl, start: "top bottom", end: "bottom top", scrub: true },
      });

      gsap.fromTo(txtEl,
        { x: p.imageLeft ? 30 : -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: txtEl, start: "top 75%" } }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{ background: "var(--color-abyss)", padding: "var(--space-10) 0" }}
    >
      <div className="section-container">
        <div style={{ marginBottom: "var(--space-10)" }}>
          <div className="overline" style={{ marginBottom: "12px" }}>Selected Work</div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
            fontSize: "clamp(32px, 5vw, 48px)", color: "var(--color-text-primary)", lineHeight: 1.1, marginBottom: "16px",
          }}>
            Built with purpose.
          </h2>
          <div style={{ width: "40px", height: "1px", background: "var(--color-gold)", marginBottom: "20px" }} />
          <p style={{
            fontFamily: "'EB Garamond', serif", fontSize: "17px",
            color: "var(--color-text-secondary)", maxWidth: "520px", lineHeight: 1.85,
          }}>
            A selection of products we are proud to have built. Each one started as an idea someone believed in.
          </p>
          <div style={{ marginTop: "16px", marginBottom: "40px" }}>
            <Link href="/local-businesses" style={{
              display: "inline-block",
              fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "0.15em",
              color: "var(--color-gold)", textTransform: "uppercase", textDecoration: "none",
              borderBottom: "1px solid rgba(201,168,76,0.3)", paddingBottom: "4px",
              transition: "border-color 0.3s ease, color 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-gold)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)";
              e.currentTarget.style.color = "var(--color-gold)";
            }}
            >
              Show most recent work for local businesses →
            </Link>
          </div>
        </div>

        {projects.map((project, i) => (
          <div
            key={project.id}
            className="work-grid"
            style={{
              display: "grid", gap: "4%",
              marginBottom: i < projects.length - 1 ? "var(--space-10)" : 0,
              alignItems: "center",
              ...(project.imageLeft ? {} : { direction: "rtl" }),
            }}
          >
            <div
              ref={(el) => { imageRefs.current[i] = el; }}
              className="work-image-container"
              style={{ position: "relative", height: "480px", borderRadius: "var(--radius-cell)", overflow: "hidden", direction: "ltr" }}
            >
              <Image      
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 900px) 100vw, 58vw"
                style={{ objectFit: "cover", filter: "sepia(15%) brightness(0.75)", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "rgba(201,168,76,0.06)", mixBlendMode: "multiply" }} />
              <div className="img-scrim" />
            </div>

            <div ref={(el) => { textRefs.current[i] = el; }} className="work-text-container" style={{ direction: "ltr", padding: "0 var(--space-4)" }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "0.22em",
                color: "rgba(201,168,76,0.6)", textTransform: "uppercase", marginBottom: "16px",
              }}>
                {project.category}
              </div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                fontSize: "clamp(24px, 3vw, 36px)", color: "var(--color-text-primary)", lineHeight: 1.15, marginBottom: "20px",
              }}>
                {project.title}
              </h3>
              <p style={{
                fontFamily: "'EB Garamond', serif", fontSize: "16px",
                color: "var(--color-text-secondary)", lineHeight: 1.85, marginBottom: "24px",
              }}>
                {project.body}
              </p>
              <a href="#contact" className="btn-ghost" style={{ marginTop: "8px" }}>Start a similar project →</a>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .work-grid { grid-template-columns: 58% 38%; }
        @media (max-width: 900px) {
          .work-grid { grid-template-columns: 1fr !important; gap: 40px !important; direction: ltr !important; }
          .work-image-container { height: 320px !important; }
          .work-text-container { padding: 0 !important; }
        }
      `}</style>
    </section>
  );
}
