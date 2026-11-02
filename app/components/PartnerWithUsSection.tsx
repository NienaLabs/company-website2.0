"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Activity, ShieldCheck } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function PartnerWithUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const videoFrameRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;
      if (!contextSafe) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.fromTo(
        headerRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
      )
        .fromTo(
          videoFrameRef.current,
          { y: 40, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        );
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      id="showcase"
      style={{
        backgroundColor: "var(--color-bg)",
        padding: "clamp(80px, 10vw, 140px) 0",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div
        className="section-container"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Section Heading & Subtitle */}
        <div
          ref={headerRef}
          style={{
            maxWidth: "760px",
            margin: "0 auto var(--spacing-12) auto",
            textAlign: "center",
          }}
        >
          {/* Overline pill */}
          <div style={{ marginBottom: "var(--spacing-4)" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "rgba(224, 209, 46, 0.08)",
                border: "1px solid rgba(224, 209, 46, 0.3)",
                color: "var(--color-brand)",
                fontSize: "12px",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              <span>Field Telemetry & Systems Showcase</span>
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(34px, 5.5vw, 56px)",
              fontWeight: 600,
              color: "var(--color-fg)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "var(--spacing-4)",
            }}
          >
            Intelligence in motion: Real systems solving real problems.
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(16px, 1.8vw, 19px)",
              lineHeight: 1.7,
              color: "var(--color-fg-muted)",
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            Watch how Niena Labs brings specialized software, edge infrastructure,
            and connected hardware together to automate mission-critical operations
            and improve everyday human life.
          </p>
        </div>

        {/* Cinematic Video Showcase Container */}
        <div
          ref={videoFrameRef}
          style={{
            maxWidth: "960px",
            margin: "0 auto var(--spacing-10) auto",
            position: "relative",
          }}
        >
          {/* Glowing Outer Card Frame */}
          <div
            style={{
              backgroundColor: "var(--md-sys-color-surface-container-low)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: "var(--radius-3xl)",
              border: "1px solid rgba(224, 209, 46, 0.28)",
              boxShadow:
                "0 24px 70px -15px rgba(0, 0, 0, 0.7), 0 0 50px -10px rgba(224, 209, 46, 0.12)",
              padding: "clamp(12px, 2vw, 20px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top Frame Status Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "4px 8px clamp(10px, 1.5vw, 16px) 8px",
                borderBottom: "1px solid var(--color-border)",
                marginBottom: "clamp(12px, 2vw, 18px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "12px",
                  fontFamily: "var(--font-mono)", /* taste-skill-ignore */
                  color: "var(--color-fg)",
                  letterSpacing: "0.04em",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "var(--radius-full)",
                    backgroundColor: "var(--color-brand)",
                    boxShadow: "0 0 10px var(--color-brand)",
                  }}
                />
                <span style={{ fontWeight: 600 }}>
                  NIENA LABS
                </span>
                <span style={{ opacity: 0.5 }}>//</span>
                <span>REAL-WORLD INTELLIGENCE SHOWCASE</span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "11px",
                  fontFamily: "var(--font-mono)", /* taste-skill-ignore */
                  color: "var(--color-fg-subtle)",
                }}
              >
                <span>STATUS: OPERATIONAL</span>
              </div>
            </div>

            {/* Responsive 16:9 Video Frame */}
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingBottom: "56.25%", // 16:9 aspect ratio
                height: 0,
                borderRadius: "var(--radius-2xl)",
                overflow: "hidden",
                backgroundColor: "#000000",
                boxShadow: "inset 0 0 30px rgba(0, 0, 0, 0.8)",
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/A0aFUptdZ28?rel=0&modestbranding=1"
                title="Intelligence Products in the Real Economy — Niena Labs"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            </div>
          </div>
        </div>

        {/* Action Call to Action Row */}
        <div
          ref={ctaRef}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "var(--spacing-4)",
          }}
        >
          <Link
            href="/#contact"
            className="btn-primary"
            style={{
              padding: "14px 36px",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              borderRadius: "var(--radius-full)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              textTransform: "uppercase",
            }}
          >
            <span>Deploy to Your Environment</span>
            <ArrowUpRight size={16} />
          </Link>

          <Link
            href="/products"
            className="btn-secondary"
            style={{
              padding: "14px 32px",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              borderRadius: "var(--radius-full)",
              textTransform: "uppercase",
            }}
          >
            <span>Explore All Products</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
