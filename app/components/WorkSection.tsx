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
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
    imageLeft: true,
  },
  {
    id: "niena",
    category: "AI-Driven Career Integration",
    title: "Niena — The Professional Catalyst",
    body: "An intelligent ecosystem redefining the professional journey. Niena leverages advanced AI to harmonize resume synthesis with real-time, high-fidelity interview simulations. By bridging the gap between talent and opportunity, it provides a sophisticated matching engine that aligns aspirations with the market's most compelling roles.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80",
    imageLeft: false,
  },
];

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP((_context, contextSafe) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Detect touch-only devices — scrub parallax causes scroll jank on mobile.
    const isMobile = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    if (!contextSafe) return;

    const createAnimation = contextSafe(() => {
      projects.forEach((p, i) => {
        const imgEl = imageRefs.current[i];
        const txtEl = textRefs.current[i];
        if (!imgEl || !txtEl) return;

        // Pre-promote to a GPU layer so transforms don't trigger repaints.
        gsap.set(imgEl, { willChange: "transform" });
        gsap.set(txtEl, { willChange: "transform, opacity" });

        gsap.fromTo(imgEl,
          { scale: 1.05 },
          { scale: 1, duration: 1.2, ease: "power2.out",
            scrollTrigger: { trigger: imgEl, start: "top 80%" } }
        );

        // Parallax only on desktop — too expensive on mobile.
        if (!isMobile) {
          gsap.to(imgEl.querySelector("img"), {
            y: 32, ease: "none",
            scrollTrigger: {
              trigger: imgEl,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,   // smoothed scrub prevents per-frame jank
            },
          });
        }

        gsap.fromTo(txtEl,
          { x: p.imageLeft ? 24 : -24, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: txtEl, start: "top 75%" } }
        );
      });
    });

    const timer = setTimeout(() => {
      createAnimation();
    }, 100);
    return () => clearTimeout(timer);
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{ background: "var(--bg)", padding: "var(--space-10) 0" }}
    >
      <div className="section-container">
        <div style={{ marginBottom: "var(--space-10)" }}>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 600,
            fontSize: "clamp(32px, 5vw, 48px)", color: "var(--text-primary)", lineHeight: 1.1, marginBottom: "16px",
          }}>
            Built with purpose.
          </h2>
          <div style={{ width: "40px", height: "1px", background: "var(--amber)", marginBottom: "20px" }} />
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "17px",
            color: "var(--text-secondary)", maxWidth: "520px", lineHeight: 1.85,
          }}>
            A selection of products we are proud to have built. Each one started as an idea someone believed in.
          </p>
          <div style={{ marginTop: "16px", marginBottom: "40px" }}>
            <Link href="/local-businesses" style={{
              display: "inline-block",
              fontFamily: "var(--font-display)", fontSize: "11px", letterSpacing: "0.06em",
              color: "var(--amber)", textTransform: "uppercase", textDecoration: "none",
              borderBottom: "1px solid rgba(255,176,32,0.3)", paddingBottom: "4px",
              transition: "border-color 0.3s ease, color 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--amber)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,176,32,0.3)";
              e.currentTarget.style.color = "var(--amber)";
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
              <div style={{ position: "absolute", inset: 0, background: "rgba(255,176,32,0.06)", mixBlendMode: "multiply" }} />
              <div className="img-scrim" />
            </div>

            <div ref={(el) => { textRefs.current[i] = el; }} className="work-text-container" style={{ direction: "ltr", padding: "0 var(--space-4)" }}>
              <div style={{
                fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em",
                color: "rgba(255,176,32,0.6)", textTransform: "uppercase", marginBottom: "16px",
              }}>
                {project.category}
              </div>
              <h3 style={{
                fontFamily: "var(--font-display)", fontWeight: 600,
                fontSize: "clamp(24px, 3vw, 36px)", color: "var(--text-primary)", lineHeight: 1.15, marginBottom: "20px",
              }}>
                {project.title}
              </h3>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: "16px",
                color: "var(--text-secondary)", lineHeight: 1.85, marginBottom: "24px",
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
