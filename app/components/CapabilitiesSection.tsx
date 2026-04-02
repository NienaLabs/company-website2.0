"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const capabilities = [
  {
    id: "enterprise",
    label: "Enterprise Web",
    title: "Scalable by architecture,\nnot by accident.",
    body: "End-to-end web platforms engineered to grow with your business — from 100 users to 10 million.",
    featured: true,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    id: "mobile",
    label: "Mobile",
    title: "iOS & Android,\nnative at heart.",
    body: "Cross-platform applications that feel native on every device, delivering performance users expect.",
  },
  {
    id: "ai",
    label: "AI-Driven",
    title: "Intelligence embedded,\nnot bolted on.",
    body: "AI systems integrated at the architecture level — not afterthoughts, but load-bearing pillars.",
  },
  {
    id: "cloud",
    label: "Cloud",
    title: "Infrastructure that\ndisappears.",
    body: "Cloud architecture so reliable and invisible that your team only thinks about the product.",
  },
  {
    id: "desktop",
    label: "Desktop",
    title: "Power without\ncompromise.",
    body: "High-performance desktop applications for professionals who demand more from their tools.",
  },
];

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cellsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    cellsRef.current.filter(Boolean).forEach((cell, i) => {
      gsap.fromTo(cell,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: i * 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{ background: "var(--color-abyss)", padding: "var(--space-10) 0" }}
    >
      <div className="section-container">
        <div style={{ marginBottom: "var(--space-9)" }}>
          <div className="overline" style={{ marginBottom: "12px" }}>Capabilities</div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
            fontSize: "clamp(32px, 5vw, 48px)", color: "var(--color-text-primary)", lineHeight: 1.1, marginBottom: "4px",
          }}>
            What we build.
          </h2>
          <div style={{ width: "40px", height: "1px", background: "var(--color-gold)", marginTop: "16px" }} />
        </div>

        <div className="capabilities-grid" style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gridTemplateRows: "230px 230px",
          gap: "var(--space-6)",
        }}>
          {capabilities.map((cap, i) => (
            <div
              key={cap.id}
              ref={(el) => { cellsRef.current[i] = el; }}
              className="bento-cell"
              style={{
                gridRow: cap.featured ? "1 / 3" : undefined,
                position: "relative",
                overflow: "hidden",
                opacity: 0,
                ...(cap.featured ? {
                  borderTop: "1px solid rgba(201,168,76,0.8)",
                  clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
                } : {}),
              }}
            >
              {cap.featured && cap.image && (
                <>
                  <img
                    src={cap.image}
                    alt=""
                    style={{
                      position: "absolute", inset: 0, width: "100%", height: "100%",
                      objectFit: "cover", filter: "sepia(20%) brightness(0.7)",
                    }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "rgba(201,168,76,0.08)", mixBlendMode: "multiply",
                  }} />
                </>
              )}
              {cap.featured && <div className="img-scrim" />}

              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: cap.featured ? "var(--space-7)" : "var(--space-6)",
              }}>
                <div style={{
                  fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "0.2em",
                  color: "rgba(201,168,76,0.7)", textTransform: "uppercase", marginBottom: "10px",
                }}>
                  {cap.label}
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                  fontSize: cap.featured ? "clamp(20px, 2.5vw, 28px)" : "clamp(16px, 1.8vw, 22px)",
                  color: "var(--color-text-primary)", lineHeight: 1.3, whiteSpace: "pre-line",
                  marginBottom: cap.featured ? "12px" : "8px",
                }}>
                  {cap.title}
                </div>
                {cap.body && (
                  <p style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: cap.featured ? "15px" : "13px",
                    color: "rgba(232,223,200,0.55)", lineHeight: 1.7, marginBottom: 0,
                  }}>
                    {cap.body}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 992px) {
          .capabilities-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: auto auto auto !important;
          }
          .bento-cell:first-child { grid-row: 1 !important; grid-column: 1 / 3 !important; min-height: 280px; }
        }
        @media (max-width: 600px) {
          .capabilities-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .bento-cell:first-child { grid-column: 1 !important; }
          .bento-cell { min-height: 200px; }
        }
      `}</style>
    </section>
  );
}
