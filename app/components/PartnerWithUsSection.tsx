"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

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
      id="partner-with-us"
      style={{
        backgroundColor: "#0a0a0c",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Cg fill='%23ffffff' fill-opacity='0.025'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z' opacity='.5'%3E%3C/path%3E%3Cpath d='M15 15h50l-5 5H20v40l-5 5V15zm0 50h50V15L80 0v80H0l15-15zm32.07-32.07l3.54-3.54A15 15 0 0 1 29.4 50.6l3.53-3.53a10 10 0 1 0 14.14-14.14zM32.93 47.07a10 10 0 1 1 14.14-14.14L32.93 47.07z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")`,
        padding: "clamp(80px, 10vw, 140px) 0",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Ambient Central Amber Light Behind Content */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(224, 209, 46, 0.08) 0%, rgba(224, 209, 46, 0.02) 45%, transparent 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

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
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              <span>Partner With Us</span>
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(34px, 5.5vw, 56px)",
              fontWeight: 600,
              color: "#ffffff",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "var(--spacing-4)",
            }}
          >
            Engineering partners for companies ready to matter.
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(16px, 1.8vw, 19px)",
              lineHeight: 1.7,
              color: "rgba(255, 255, 255, 0.72)",
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            We don&apos;t take on hundreds of routine projects. We forge deep,
            high-conviction partnerships with visionary founders and enterprises,
            embedding principal architects to turn ambitious roadmaps into reality.
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
              backgroundColor: "rgba(18, 18, 22, 0.8)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: "var(--radius-3xl)",
              border: "1px solid rgba(224, 209, 46, 0.28)",
              boxShadow:
                "0 24px 70px -15px rgba(0, 0, 0, 0.9), 0 0 50px -10px rgba(224, 209, 46, 0.16)",
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
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                marginBottom: "clamp(12px, 2vw, 18px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "12px",
                  fontFamily: "var(--font-mono)",
                  color: "rgba(255, 255, 255, 0.8)",
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
                <span style={{ fontWeight: 600, color: "#ffffff" }}>
                  NIENA LABS
                </span>
                <span style={{ opacity: 0.5 }}>//</span>
                <span>PARTNERSHIP SHOWCASE</span>
              </div>

            
            </div>

            {/* Responsive 16:9 YouTube Video Frame */}
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
                title="Partner with Niena Labs"
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
            href="#contact"
            className="natural-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "0 var(--spacing-8)",
              minHeight: "50px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "var(--color-brand)",
              color: "var(--color-brand-fg)",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 8px 24px -6px var(--color-brand)",
              transition: "all var(--motion-micro-feedback)",
            }}
          >
            <span>Start a Partnership Conversation</span>
            <ArrowUpRight size={16} />
          </Link>

          <Link
            href="#services"
            className="natural-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "0 var(--spacing-6)",
              minHeight: "50px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "transparent",
              color: "#ffffff",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all var(--motion-micro-feedback)",
            }}
          >
            <span>Explore What We Build</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
