"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Feather, Accessibility, Zap, ShieldCheck, Server, Database, FolderTree } from "lucide-react";
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
    tagline: "Drag-and-drop, without the framework tax.",
    description:
      "A zero-dependency, framework-agnostic drag-and-drop library built for precision and performance. Works identically in React, Vue, Svelte, Angular, or vanilla JavaScript, no lock-in, no overhead.",
    highlights: [
      { text: "Framework agnostic, runs on any stack", Icon: Layers },
      { text: "Zero dependencies", Icon: Feather },
      { text: "Accessible by default with keyboard and screen reader support", Icon: Accessibility },
      { text: "Tree-shakeable, < 4kb gzipped", Icon: Zap },
    ],
    href: "https://github.com/orgs/Nienalabs-community/repositories",
    tag: "Library",
    logoImage: "/images/projects/alugard.png",
  },
  {
    id: "niena-starter-kit",
    name: "niena-starter-kit",
    tagline: "Scaffold a production Next.js app in under a minute.",
    description:
      "An opinionated CLI scaffolder for Next.js projects. Ships with enterprise-grade authentication out of the box, fully customizable auth screens, and a menu-driven stack selection, so your first commit is already production-ready.",
    highlights: [
      { text: "Built-in Auth with customizable UI screens", Icon: ShieldCheck },
      { text: "Choose your backend: tRPC or REST", Icon: Server },
      { text: "Choose your ORM: Prisma or Drizzle, fully configured", Icon: Database },
      { text: "Environment scaffolding, typed routes, and project structure included", Icon: FolderTree },
    ],
    href: "https://github.com/orgs/Nienalabs-community/repositories",
    tag: "CLI Tool",
    logoText: "Niena Starter Kit",
  },
];


export default function OpenSourceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP((_context, contextSafe) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      // Revert opacity to 1 if no animation
      gsap.set(".opensource-card", { opacity: 1 });
      return;
    }

    if (!contextSafe) return;

    const createAnimation = contextSafe(() => {
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
      const cards = gsap.utils.toArray(".opensource-card");
      cards.forEach((card: any, i) => {
        gsap.fromTo(card,
          { y: 48, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.75, ease: "power2.out", delay: i * 0.15,
            scrollTrigger: { trigger: card, start: "top 82%" },
          }
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
          <div style={{ maxWidth: "540px" }}>

          </div>

          <Typography variant="large-title" style={{ marginBottom: "16px" }}>
            We build in public.
          </Typography>
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
            fontFamily: "var(--font-body)",
            fontSize: "clamp(18px, 2.2vw, 22px)",
            color: "var(--text-primary)",
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
          {libraries.map((lib, i) => {
            const cardColorIndex = (i % 4) + 1;
            const availableIconColors = [1, 2, 3, 4]
              .filter(c => c !== cardColorIndex)
              .map(c => `var(--color-alt-${c})`);

            return (
            <Card
              key={lib.id}
              className="opensource-card"
              variant="dynamic"
              dynamicColor={cardColorIndex.toString() as any}
              interactive={true}
              style={{
                opacity: 0,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-5)",
              }}
            >
              {/* Tag */}
              <Typography 
                variant="caption1"
                style={{
                  textTransform: "uppercase",
                  color: "inherit",
                  opacity: 0.6,
                }}
              >
                {lib.tag}
              </Typography>

              {/* Name / Logo */}
              <div>
                <div style={{ marginBottom: "16px", minHeight: "40px", display: "flex", alignItems: "center" }}>
                  {lib.logoImage ? (
                    <img src={lib.logoImage} alt={lib.name} style={{ height: "40px", objectFit: "contain" }} />
                  ) : lib.logoText ? (
                    <Typography variant="title2" style={{ fontStyle: "italic", margin: 0 }}>
                      {lib.logoText}
                    </Typography>
                  ) : (
                    <Typography variant="title2" style={{ margin: 0 }}>
                      {lib.name}
                    </Typography>
                  )}
                </div>
                <Typography variant="body1" color="inherit" style={{ opacity: 0.9 }}>
                  {lib.tagline}
                </Typography>
              </div>

              {/* Description */}
              <Typography variant="body2" color="inherit" style={{ opacity: 0.8 }}>
                {lib.description}
              </Typography>

              {/* Highlights */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {lib.highlights.map((h, j) => {
                  const IconComp = h.Icon;
                  return (
                  <li
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      color: "inherit",
                      opacity: 0.8,
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: availableIconColors[j % availableIconColors.length], flexShrink: 0, marginTop: "2px", opacity: 1 }}>
                      <IconComp size={16} strokeWidth={2.5} />
                    </span>
                    {h.text}
                  </li>
                )})}
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
                    fontFamily: "var(--font-display)",
                    fontSize: "11px", fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "inherit",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.3)",
                    paddingBottom: "2px",
                    transition: "opacity 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.7";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  <GitHubIcon />
                  View on GitHub
                </a>
              </div>
            </Card>
          )})}
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
          }}
        >
          <div>
            <Typography variant="title3" style={{ marginBottom: "8px" }}>
              Join the community 🎉
            </Typography>
            <Typography variant="body2" color="secondary" style={{ maxWidth: "480px" }}>
              All our libraries live in the Niena Labs Community GitHub organization.
              Contributions, issues, and ideas are always welcome.
            </Typography>
          </div>
          <a
            href="https://github.com/orgs/Nienalabs-community/repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "11px", fontWeight: 600, flexShrink: 0 }}
          >
            <GitHubIcon />
            Explore on GitHub
          </a>
        </Card>
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
