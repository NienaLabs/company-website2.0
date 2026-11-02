"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Feather, Accessibility, Zap, ShieldCheck, Server, Database, FolderTree, Cpu, Network } from "lucide-react";
import { Card } from "./ui/Card";
import { Typography } from "./ui/Typography";

function GitHubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
gsap.registerPlugin(useGSAP, ScrollTrigger);

const libraries = [
  {
    id: "alugard-drop",
    name: "alugard-drop",
    tagline: "High-performance sensory interaction, zero framework tax.",
    description:
      "A zero-dependency, ultra-light interaction runtime engineered for precision UI and tactile control surfaces. Runs identically in embedded web views, industrial touch interfaces, and standard web applications.",
    highlights: [
      { text: "Framework agnostic, runs on any UI runtime", Icon: Layers },
      { text: "Zero dependencies, pure micro-loop performance", Icon: Feather },
      { text: "Accessible by default with hardware input support", Icon: Accessibility },
      { text: "Tree-shakeable, < 4kb gzipped overhead", Icon: Zap },
    ],
    href: "https://github.com/orgs/Nienalabs-community/repositories",
    tag: "Interaction Runtime",
    logoImage: "/images/projects/alugard.png",
  },
  {
    id: "niena-telemetry-kit",
    name: "niena-telemetry-kit",
    tagline: "Deterministic binary telemetry and edge model serialization.",
    description:
      "A high-throughput telemetry pipeline and model communication protocol for edge computing appliances. Stream real-time sensor metrics and vision inference results with microsecond latency.",
    highlights: [
      { text: "Sub-millisecond binary serialization format", Icon: Cpu },
      { text: "Air-gapped edge buffer with auto-reconnection", Icon: ShieldCheck },
      { text: "Hardware cryptographic signatures for telemetry", Icon: Server },
      { text: "Zero memory allocation in hot ingestion loops", Icon: Network },
    ],
    href: "https://github.com/orgs/Nienalabs-community/repositories",
    tag: "Edge Telemetry Protocol",
    logoText: "Niena Telemetry",
  },
];

export default function OpenSourceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) {
        gsap.set(".opensource-card", { opacity: 1 });
        return;
      }

      if (!contextSafe) return;

      const createAnimation = contextSafe(() => {
        gsap.fromTo(
          headerRef.current,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
          }
        );

        gsap.fromTo(
          manifestoRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: manifestoRef.current, start: "top 80%" },
          }
        );

        const cards = gsap.utils.toArray(".opensource-card");
        cards.forEach((card: any, i) => {
          gsap.fromTo(
            card,
            { y: 48, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: "power2.out",
              delay: i * 0.15,
              scrollTrigger: { trigger: card, start: "top 82%" },
            }
          );
        });
      });

      const timer = setTimeout(() => {
        createAnimation();
      }, 100);
      return () => clearTimeout(timer);
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      id="open-source"
      style={{
        background: "var(--bg)",
        padding: "var(--space-10) 0",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="section-container">
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: "var(--space-8)", opacity: 0 }}>
          <div style={{ marginBottom: "16px" }}>
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
              Open Infrastructure
            </span>
          </div>

          <Typography variant="large-title" style={{ marginBottom: "16px" }}>
            Open tools for the intelligence frontier.
          </Typography>
        </div>

        {/* Philosophy statement */}
        <div
          ref={manifestoRef}
          style={{
            opacity: 0,
            maxWidth: "680px",
            marginBottom: "var(--space-9)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(17px, 2vw, 21px)",
              color: "var(--text-primary)",
              lineHeight: 1.75,
            }}
          >
            Bringing intelligence into the physical economy requires open, battle-tested
            foundations. Everything we build at the runtime and telemetry layer that
            accelerates engineering for operators and roboticists, we publish openly. No gatekeeping. No cloud lock-in.
          </p>
        </div>

        {/* Library cards */}
        <div
          className="bento-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "var(--space-6)",
          }}
        >
          {libraries.map((lib, i) => {
            const cardColorIndex = (i % 4) + 1;

            return (
              <Card
                key={lib.id}
                className="opensource-card"
                variant="dynamic"
                dynamicColor={cardColorIndex.toString() as any}
                interactive={true}
                style={{
                  opacity: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "32px",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        padding: "4px 10px",
                        borderRadius: "var(--radius-full)",
                        backgroundColor: "rgba(0,0,0,0.2)",
                        color: "inherit",
                      }}
                    >
                      {lib.tag}
                    </span>
                    <a
                      href={lib.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "inherit",
                        display: "flex",
                        alignItems: "center",
                        opacity: 0.8,
                        transition: "opacity 150ms ease",
                      }}
                      className="hover:opacity-100"
                    >
                      <GitHubIcon />
                    </a>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "24px",
                      fontWeight: 600,
                      marginBottom: "8px",
                      color: "inherit",
                    }}
                  >
                    {lib.name}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      fontWeight: 500,
                      opacity: 0.9,
                      marginBottom: "16px",
                    }}
                  >
                    {lib.tagline}
                  </p>

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      lineHeight: 1.6,
                      opacity: 0.85,
                      marginBottom: "24px",
                    }}
                  >
                    {lib.description}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    borderTop: "1px solid rgba(255,255,255,0.15)",
                    paddingTop: "20px",
                  }}
                >
                  {lib.highlights.map((h, hIdx) => {
                    const HIcon = h.Icon;
                    return (
                      <div
                        key={hIdx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "12px",
                          opacity: 0.9,
                        }}
                      >
                        <HIcon size={14} />
                        <span>{h.text}</span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Community CTA */}
        <Card
          variant="glass"
          style={{
            marginTop: "var(--space-8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
            padding: "28px 36px",
          }}
        >
          <div>
            <Typography variant="title3" style={{ marginBottom: "6px" }}>
              Join the Niena Labs Community
            </Typography>
            <Typography variant="body2" color="secondary" style={{ maxWidth: "520px" }}>
              Our telemetry protocols, runtime benchmarks, and hardware schematics live in the
              Niena Labs Community GitHub organization.
            </Typography>
          </div>
          <a
            href="https://github.com/orgs/Nienalabs-community/repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              fontWeight: 600,
              flexShrink: 0,
              padding: "10px 24px",
              borderRadius: "var(--radius-full)",
            }}
          >
            <GitHubIcon />
            Explore on GitHub
          </a>
        </Card>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #open-source .bento-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
