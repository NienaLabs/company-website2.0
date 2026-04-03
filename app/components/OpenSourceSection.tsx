"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const libraries = [
  {
    id: "alugard-drop",
    name: "alugard-drop",
    tagline: "Drag-and-drop, without the framework tax.",
    description:
      "A zero-dependency, framework-agnostic drag-and-drop library built for precision and performance. Works identically in React, Vue, Svelte, Angular, or vanilla JavaScript — no lock-in, no overhead.",
    highlights: [
      "Framework agnostic — runs on any stack",
      "Zero dependencies",
      "Accessible by default with keyboard and screen reader support",
      "Tree-shakeable, < 4kb gzipped",
    ],
    href: "https://github.com/orgs/Niena Labs-community/repositories",
    tag: "Library",
  },
  {
    id: "niena-starter-kit",
    name: "niena-starter-kit",
    tagline: "Scaffold a production Next.js app in under a minute.",
    description:
      "An opinionated CLI scaffolder for Next.js projects. Ships with enterprise-grade authentication out of the box, fully customizable auth screens, and a menu-driven stack selection — so your first commit is already production-ready.",
    highlights: [
      "Built-in Auth with customizable UI screens",
      "Choose your backend: tRPC or REST",
      "Choose your ORM: Prisma or Drizzle — fully configured",
      "Environment scaffolding, typed routes, and project structure included",
    ],
    href: "https://github.com/orgs/Niena Labs-community/repositories",
    tag: "CLI Tool",
  },
];

function GitHubArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function OpenSourceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Header block enter
    gsap.fromTo(headerRef.current,
      { y: 32, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
      }
    );

    // Manifesto statement
    gsap.fromTo(manifestoRef.current,
      { opacity: 0 },
      {
        opacity: 1, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: manifestoRef.current, start: "top 80%" },
      }
    );

    // Library cards
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card,
        { y: 48, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.75, ease: "power2.out", delay: i * 0.15,
          scrollTrigger: { trigger: card, start: "top 82%" },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="open-source"
      style={{
        background: "var(--color-void)",
        padding: "var(--space-10) 0",
        borderTop: "var(--border-gold-faint)",
      }}
    >
      <div className="section-container">
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: "var(--space-8)", opacity: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <div className="overline">Open Source</div>
            {/* GitHub org pill */}
            <a
              href="https://github.com/orgs/Niena Labs-community/repositories"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "'Cinzel', serif",
                fontSize: "8px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                background: "rgba(201,168,76,0.08)",
                border: "var(--border-gold)",
                borderRadius: "var(--radius-tag)",
                padding: "4px 10px",
                textDecoration: "none",
                transition: "background 200ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(201,168,76,0.15)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(201,168,76,0.08)")}
            >
              <GitHubArrowIcon />
              Niena Labs Community
            </a>
          </div>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(32px, 5vw, 48px)",
            color: "var(--color-text-primary)",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}>
            We build in public.
          </h2>
          <div style={{ width: "40px", height: "1px", background: "var(--color-gold)" }} />
        </div>

        {/* Philosophy statement */}
        <div
          ref={manifestoRef}
          style={{
            opacity: 0,
            maxWidth: "640px",
            marginBottom: "var(--space-9)",
          }}
        >
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontStyle: "italic",
            fontSize: "clamp(18px, 2.2vw, 22px)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.8,
          }}>
            The best tools should be free. Everything we build internally that can
            help other engineers — we open-source. No paywalls. No waitlists.
            Pull it, use it, ship faster.
          </p>
        </div>

        {/* Library cards */}
        <div className="bento-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "var(--space-6)",
        }}>
          {libraries.map((lib, i) => (
            <div
              key={lib.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="bento-cell"
              style={{
                opacity: 0,
                padding: "var(--space-7)",
                position: "relative",
                // Chamfered top-right corner
                clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
                borderTop: "1px solid rgba(201,168,76,0.35)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-5)",
              }}
            >
              {/* Tag */}
              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "8px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(201,168,76,0.55)",
              }}>
                {lib.tag}
              </div>

              {/* Name */}
              <div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(22px, 2.8vw, 32px)",
                  color: "var(--color-text-primary)",
                  lineHeight: 1.1,
                  marginBottom: "8px",
                }}>
                  {lib.name}
                </div>
                <div style={{
                  fontFamily: "'EB Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "15px",
                  color: "var(--color-gold)",
                  lineHeight: 1.5,
                }}>
                  {lib.tagline}
                </div>
              </div>

              {/* Description */}
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "15px",
                color: "var(--color-text-secondary)",
                lineHeight: 1.85,
              }}>
                {lib.description}
              </p>

              {/* Highlights */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {lib.highlights.map((h, j) => (
                  <li
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontFamily: "'EB Garamond', serif",
                      fontSize: "14px",
                      color: "rgba(232,223,200,0.6)",
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: "var(--color-gold)", flexShrink: 0, marginTop: "2px" }}>—</span>
                    {h}
                  </li>
                ))}
              </ul>

              {/* View on GitHub */}
              <div style={{ marginTop: "auto", paddingTop: "var(--space-4)" }}>
                <a
                  href={lib.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: "'Cinzel', serif",
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(232,223,200,0.5)",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(201,168,76,0.2)",
                    paddingBottom: "2px",
                    transition: "color 200ms ease, border-color 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-gold)";
                    e.currentTarget.style.borderColor = "var(--color-gold)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(232,223,200,0.5)";
                    e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)";
                  }}
                >
                  <GitHubArrowIcon />
                  View on GitHub
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Community CTA */}
        <div style={{
          marginTop: "var(--space-8)",
          padding: "var(--space-7)",
          background: "rgba(201,168,76,0.04)",
          border: "var(--border-gold-faint)",
          borderRadius: "var(--radius-cell)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "24px",
        }}>
          <div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(18px, 2.5vw, 24px)",
              color: "var(--color-text-primary)",
              marginBottom: "8px",
            }}>
              Join the community.
            </div>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: "15px",
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              maxWidth: "480px",
            }}>
              All our libraries live in the Niena Labs Community GitHub organization.
              Contributions, issues, and ideas are always welcome.
            </p>
          </div>
          <a
            href="https://github.com/orgs/Niena Labs-community/repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "9px", flexShrink: 0 }}
          >
            <GitHubArrowIcon />
            Explore on GitHub
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #open-source .section-container > div:last-child {
            flex-direction: column !important;
          }
          #open-source .bento-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
