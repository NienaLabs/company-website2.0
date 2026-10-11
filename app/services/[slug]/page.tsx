import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  servicesList,
  getServiceBySlug,
  getAllServiceSlugs,
} from "../../../lib/services";
import {
  Terminal,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  ChevronRight,
} from "lucide-react";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Capability Not Found — Niena Labs",
    };
  }

  return {
    title: `${service.label} — ${service.title.replace("\n", " ")} | Niena Labs`,
    description: service.heroDescription,
    openGraph: {
      title: `${service.label} — Niena Labs`,
      description: service.heroDescription,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const otherServices = servicesList.filter((s) => s.id !== service.id);

  // Dynamic color helper classes/styles based on altColorIndex
  const altColorVar = `var(--color-alt-${service.altColorIndex})`;

  return (
    <div
      style={{
        background: "var(--color-bg)",
        color: "var(--color-fg)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dynamic Ambient Background Glow in this Capability's Alt Color */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "1400px",
          height: "650px",
          background: `radial-gradient(circle at 50% 180px, ${altColorVar} 0%, transparent 68%)`,
          opacity: 0.12,
          pointerEvents: "none",
          filter: "blur(110px)",
          zIndex: 0,
        }}
      />

      {/* Top Header & Breadcrumbs */}
      <section
        style={{
          paddingTop: "140px",
          paddingBottom: "var(--spacing-6)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="section-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "var(--spacing-4)",
              marginBottom: "var(--spacing-8)",
              borderBottom: "1px solid var(--color-border)",
              paddingBottom: "var(--spacing-4)",
            }}
          >
            {/* Back button */}
            <Link
              href="/#services"
              className="natural-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
                fontSize: "13px",
                fontFamily: "var(--font-mono)",
                color: "var(--color-fg-muted)",
                backgroundColor: "var(--color-surface-raised)",
                padding: "8px 18px",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--color-border)",
                transition: "all var(--motion-micro-feedback)",
              }}
            >
              <ArrowLeft size={14} />
              <span>Back to What We Build</span>
            </Link>

            {/* Breadcrumb Path */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                fontFamily: "var(--font-mono)",
                color: "var(--color-fg-subtle)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              <Link
                href="/"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  transition: "color 150ms",
                }}
              >
                Home
              </Link>
              <span>/</span>
              <Link
                href="/#services"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  transition: "color 150ms",
                }}
              >
                Services
              </Link>
              <span>/</span>
              <span style={{ color: altColorVar, fontWeight: 600 }}>
                {service.label}
              </span>
            </div>
          </div>

          {/* Hero Two-Column Layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "var(--spacing-10)",
              alignItems: "center",
              paddingBottom: "var(--spacing-12)",
            }}
          >
            {/* Left Hero Content */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* Display Headline */}
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "clamp(36px, 5.5vw, 62px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "var(--color-fg)",
                  marginBottom: "var(--spacing-4)",
                  whiteSpace: "pre-line",
                }}
              >
                {service.title}
              </h1>

              {/* Tagline / Subtitle */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(17px, 2vw, 21px)",
                  lineHeight: 1.6,
                  color: "var(--color-fg-muted)",
                  marginBottom: "var(--spacing-4)",
                  maxWidth: "640px",
                }}
              >
                {service.tagline}
              </p>

              {/* Comprehensive Description */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  lineHeight: 1.8,
                  color: "var(--color-fg-subtle)",
                  marginBottom: "var(--spacing-8)",
                  maxWidth: "620px",
                }}
              >
                {service.heroDescription}
              </p>

              {/* CTA Cluster */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--spacing-3)",
                  alignItems: "center",
                }}
              >
                <Link
                  href="/#contact"
                  className="natural-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "0 var(--spacing-6)",
                    minHeight: "48px",
                    borderRadius: "var(--radius-full)",
                    backgroundColor: altColorVar,
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                    boxShadow: `0 8px 24px -6px ${altColorVar}`,
                    transition: "all var(--motion-micro-feedback)",
                  }}
                >
                  <span>Start a Project</span>
                  <ArrowUpRight size={16} />
                </Link>

                <a
                  href="#case-studies"
                  className="natural-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "0 var(--spacing-6)",
                    minHeight: "48px",
                    borderRadius: "var(--radius-full)",
                    backgroundColor: "transparent",
                    color: "var(--color-fg)",
                    border: "1px solid var(--color-border-strong)",
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all var(--motion-micro-feedback)",
                  }}
                >
                  <span>Explore Solutions</span>
                  <ChevronRight size={16} />
                </a>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              {/* Outer Decorative Glow Container */}
              <div
                style={{
                  width: "100%",
                  maxWidth: "460px",
                  minHeight: "440px",
                  borderRadius: "var(--radius-3xl)",
                  backgroundColor: "var(--color-surface-glass-base)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: `1px solid var(--color-border-strong)`,
                  boxShadow: `0 24px 60px -12px rgba(0,0,0,0.35), 0 0 0 1px ${altColorVar}22`,
                  padding: "var(--spacing-8)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  textAlign: "center",
                }}
              >
                {/* 3D Icon Presentation */}
                <div
                  style={{
                    width: "160px",
                    height: "160px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "var(--spacing-6)",
                    filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.3))",
                    position: "relative",
                  }}
                >
                  {service.iconType === "3d" ? (
                    <Image
                      src={service.icon}
                      alt={service.label}
                      width={160}
                      height={160}
                      style={{ objectFit: "contain" }}
                      priority
                    />
                  ) : (
                    <div
                      style={{
                        width: "140px",
                        height: "140px",
                        borderRadius: "var(--radius-full)",
                        backgroundColor: "var(--color-surface-raised)",
                        border: `2px solid ${altColorVar}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 0 40px ${altColorVar}33`,
                      }}
                    >
                      <Terminal size={80} style={{ color: altColorVar }} />
                    </div>
                  )}
                </div>

                {/* Subtitle tag inside card */}
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "22px",
                    fontWeight: 600,
                    color: "var(--color-fg)",
                    marginBottom: "8px",
                  }}
                >
                  {service.label} Engine
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    color: "var(--color-fg-muted)",
                    maxWidth: "340px",
                    lineHeight: 1.6,
                    marginBottom: "var(--spacing-6)",
                  }}
                >
                  Engineered with clean architectural patterns, robust data integrity,
                  and maintainable modern codebases.
                </p>

                {/* Status indicator pill */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 14px",
                    borderRadius: "var(--radius-full)",
                    backgroundColor: "var(--color-surface-raised)",
                    border: "1px solid var(--color-border)",
                    fontSize: "12px",
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-fg-muted)",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "var(--radius-full)",
                      backgroundColor: altColorVar,
                      boxShadow: `0 0 8px ${altColorVar}`,
                    }}
                  />
                  <span>Active Architecture Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02 — Impact Metrics Bar (Bento Stats) */}
      <section
        style={{
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          backgroundColor: "var(--color-surface-raised)",
          padding: "var(--spacing-10) 0",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="section-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "var(--spacing-8)",
            }}
          >
            {service.metrics.map((metric, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderLeft: idx > 0 ? "1px solid var(--color-border)" : "none",
                  paddingLeft: idx > 0 ? "var(--spacing-6)" : "0",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "clamp(34px, 4vw, 44px)",
                    fontWeight: 700,
                    color: altColorVar,
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  {metric.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "var(--color-fg)",
                    marginBottom: "4px",
                  }}
                >
                  {metric.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "var(--color-fg-subtle)",
                    lineHeight: 1.4,
                  }}
                >
                  {metric.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 03 — Core Architectural Pillars */}
      <section
        style={{
          padding: "var(--spacing-20) 0",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="section-container">
          <div style={{ marginBottom: "var(--spacing-12)", maxWidth: "700px" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(30px, 4.5vw, 44px)",
                fontWeight: 600,
                color: "var(--color-fg)",
                lineHeight: 1.15,
                marginBottom: "12px",
              }}
            >
              Architectural Pillars
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "17px",
                color: "var(--color-fg-muted)",
                lineHeight: 1.7,
              }}
            >
              Every system we engineer is anchored in rigorous software principles,
              minimizing operational entropy and maximizing velocity.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "var(--spacing-6)",
            }}
          >
            {service.pillars.map((pillar, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderRadius: "var(--radius-2xl)",
                  border: "1px solid var(--color-border)",
                  padding: "var(--spacing-8)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all var(--motion-productive-shift)",
                  position: "relative",
                }}
              >
                <div>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "var(--radius-full)",
                      backgroundColor: "var(--color-surface-raised)",
                      border: `1px solid ${altColorVar}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "var(--spacing-6)",
                      color: altColorVar,
                    }}
                  >
                    {idx === 0 && <Layers size={20} />}
                    {idx === 1 && <Cpu size={20} />}
                    {idx === 2 && <ShieldCheck size={20} />}
                    {idx === 3 && <Zap size={20} />}
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "var(--color-fg)",
                      marginBottom: "12px",
                    }}
                  >
                    {pillar.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "15px",
                      color: "var(--color-fg-muted)",
                      lineHeight: 1.7,
                      marginBottom: "var(--spacing-6)",
                    }}
                  >
                    {pillar.description}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    borderTop: "1px solid var(--color-border)",
                    paddingTop: "var(--spacing-4)",
                  }}
                >
                  {pillar.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        fontSize: "11px",
                        fontFamily: "var(--font-mono)",
                        color: "var(--color-fg-subtle)",
                        padding: "2px 8px",
                        backgroundColor: "var(--color-surface-raised)",
                        borderRadius: "var(--radius-full)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 04 — Real-World Solutions & Implementations (Aligned with Hero Carousel) */}
      <section
        id="case-studies"
        style={{
          padding: "var(--spacing-20) 0",
          backgroundColor: "var(--color-surface-raised)",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="section-container">
          <div style={{ marginBottom: "var(--spacing-12)", maxWidth: "700px" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(30px, 4.5vw, 44px)",
                fontWeight: 600,
                color: "var(--color-fg)",
                lineHeight: 1.15,
                marginBottom: "12px",
              }}
            >
              Deployed Solutions & Case Studies
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "17px",
                color: "var(--color-fg-muted)",
                lineHeight: 1.7,
              }}
            >
              How we approach and deliver {service.label.toLowerCase()} architecture
              for real-world products and teams.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-12)",
            }}
          >
            {service.caseStudies.map((study, idx) => (
              <div
                key={idx}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "var(--spacing-8)",
                  alignItems: "center",
                  backgroundColor: "var(--color-surface)",
                  borderRadius: "var(--radius-3xl)",
                  border: "1px solid var(--color-border)",
                  padding: "var(--spacing-8)",
                  overflow: "hidden",
                }}
              >
                {/* Media Container */}
                {study.image && (
                  <div
                    style={{
                      position: "relative",
                      height: "360px",
                      borderRadius: "var(--radius-2xl)",
                      overflow: "hidden",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      style={{
                        objectFit: "cover",
                        filter: "contrast(1.05) brightness(0.9)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "var(--spacing-4)",
                        left: "var(--spacing-4)",
                        right: "var(--spacing-4)",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          fontFamily: "var(--font-mono)",
                          backgroundColor: "rgba(0,0,0,0.75)",
                          color: "#ffffff",
                          padding: "4px 12px",
                          borderRadius: "var(--radius-full)",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        {study.subtitle}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content Container */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      marginBottom: "var(--spacing-4)",
                    }}
                  >
                    {study.tags.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: "11px",
                          fontFamily: "var(--font-mono)",
                          fontWeight: 600,
                          color: altColorVar,
                          textTransform: "uppercase",
                        }}
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "24px",
                      fontWeight: 600,
                      color: "var(--color-fg)",
                      lineHeight: 1.25,
                      marginBottom: "12px",
                    }}
                  >
                    {study.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "15px",
                      color: "var(--color-fg-muted)",
                      lineHeight: 1.8,
                      marginBottom: "var(--spacing-6)",
                    }}
                  >
                    {study.description}
                  </p>

                  {/* Impact Highlight Card */}
                  <div
                    style={{
                      padding: "var(--spacing-4) var(--spacing-6)",
                      borderRadius: "var(--radius-xl)",
                      backgroundColor: "var(--color-surface-raised)",
                      border: `1px solid ${altColorVar}`,
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <CheckCircle2 size={18} style={{ color: altColorVar, flexShrink: 0 }} />
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "var(--color-fg)",
                      }}
                    >
                      {study.highlight}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 05 — Tech Stack & Deliverables */}
      <section
        style={{
          padding: "var(--spacing-20) 0",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="section-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "var(--spacing-10)",
            }}
          >
            {/* Tech Stack Box */}
            <div
              style={{
                backgroundColor: "var(--color-surface)",
                borderRadius: "var(--radius-3xl)",
                border: "1px solid var(--color-border)",
                padding: "var(--spacing-8)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "var(--color-fg)",
                  marginBottom: "var(--spacing-4)",
                }}
              >
                Technology Stack & Runtimes
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  color: "var(--color-fg-muted)",
                  lineHeight: 1.7,
                  marginBottom: "var(--spacing-6)",
                }}
              >
                We carefully select best-of-breed languages, frameworks, and low-level
                tooling tailored to the throughput and latency requirements of {service.label.toLowerCase()}.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {service.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "var(--radius-full)",
                      backgroundColor: "var(--color-surface-raised)",
                      border: "1px solid var(--color-border-strong)",
                      fontSize: "13px",
                      fontFamily: "var(--font-mono)",
                      color: "var(--color-fg)",
                      fontWeight: 500,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Deliverables Box */}
            <div
              style={{
                backgroundColor: "var(--color-surface)",
                borderRadius: "var(--radius-3xl)",
                border: "1px solid var(--color-border)",
                padding: "var(--spacing-8)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "var(--color-fg)",
                  marginBottom: "var(--spacing-4)",
                }}
              >
                Deliverables & Production Artifacts
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  color: "var(--color-fg-muted)",
                  lineHeight: 1.7,
                  marginBottom: "var(--spacing-6)",
                }}
              >
                Full sovereign ownership. When we conclude our engagement, your team
                holds complete command of the architecture.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {service.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      fontSize: "14px",
                      fontFamily: "var(--font-body)",
                      color: "var(--color-fg)",
                      lineHeight: 1.5,
                    }}
                  >
                    <CheckCircle2
                      size={18}
                      style={{ color: altColorVar, flexShrink: 0, marginTop: "2px" }}
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 06 — Engineering Process Steps */}
      <section
        style={{
          padding: "var(--spacing-16) 0",
          backgroundColor: "var(--color-surface-raised)",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="section-container">
          <div style={{ marginBottom: "var(--spacing-12)", maxWidth: "700px" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(30px, 4.5vw, 44px)",
                fontWeight: 600,
                color: "var(--color-fg)",
                lineHeight: 1.15,
                marginBottom: "12px",
              }}
            >
              Our Engineering Execution Roadmap
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "17px",
                color: "var(--color-fg-muted)",
                lineHeight: 1.7,
              }}
            >
              How we take your {service.label.toLowerCase()} initiative from blueprint
              to bulletproof production deployment.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "var(--spacing-6)",
            }}
          >
            {service.processSteps.map((p, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderRadius: "var(--radius-2xl)",
                  border: "1px solid var(--color-border)",
                  padding: "var(--spacing-6)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "32px",
                    fontWeight: 700,
                    color: altColorVar,
                    marginBottom: "var(--spacing-3)",
                    lineHeight: 1,
                  }}
                >
                  {p.step}
                </div>
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "var(--color-fg)",
                    marginBottom: "8px",
                  }}
                >
                  {p.title}
                </h4>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    color: "var(--color-fg-muted)",
                    lineHeight: 1.6,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 07 — Explore Other Capabilities Navigator */}
      <section
        style={{
          padding: "var(--spacing-20) 0",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="section-container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "var(--spacing-4)",
              marginBottom: "var(--spacing-10)",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(26px, 4vw, 36px)",
                  fontWeight: 600,
                  color: "var(--color-fg)",
                  margin: 0,
                }}
              >
                Explore Other Capabilities
              </h2>
            </div>
            <Link
              href="/#services"
              className="natural-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--color-fg)",
                textDecoration: "none",
                fontSize: "13px",
                fontFamily: "var(--font-mono)",
                padding: "8px 16px",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--color-border)",
                backgroundColor: "var(--color-surface-raised)",
              }}
            >
              <span>View All on Homepage</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "var(--spacing-6)",
            }}
          >
            {otherServices.map((other) => {
              const otherAltColor = `var(--color-alt-${other.altColorIndex})`;
              return (
                <Link
                  key={other.id}
                  href={`/services/${other.slug}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundColor: "var(--color-surface)",
                    borderRadius: "var(--radius-2xl)",
                    border: "1px solid var(--color-border)",
                    padding: "var(--spacing-6)",
                    transition: "all var(--motion-productive-shift)",
                    minHeight: "220px",
                  }}
                  className="group"
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "var(--spacing-3)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontFamily: "var(--font-mono)",
                          fontWeight: 600,
                          color: otherAltColor,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {other.label}
                      </span>
                      <ArrowUpRight
                        size={16}
                        style={{ color: "var(--color-fg-subtle)" }}
                      />
                    </div>

                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "18px",
                        fontWeight: 600,
                        color: "var(--color-fg)",
                        whiteSpace: "pre-line",
                        marginBottom: "8px",
                        lineHeight: 1.3,
                      }}
                    >
                      {other.title}
                    </h4>

                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "13px",
                        color: "var(--color-fg-muted)",
                        lineHeight: 1.5,
                      }}
                    >
                      {other.body}
                    </p>
                  </div>

                  <div
                    style={{
                      borderTop: "1px solid var(--color-border)",
                      paddingTop: "var(--spacing-3)",
                      marginTop: "var(--spacing-4)",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      fontFamily: "var(--font-mono)",
                      color: otherAltColor,
                      fontWeight: 600,
                    }}
                  >
                    <span>Learn More</span>
                    <ChevronRight size={14} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 08 — Closing Call to Action Banner */}
      <section
        style={{
          padding: "var(--spacing-20) 0 var(--spacing-24) 0",
          backgroundColor: "var(--color-surface-raised)",
          borderTop: "1px solid var(--color-border)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="section-container">
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 600,
                color: "var(--color-fg)",
                lineHeight: 1.15,
                marginBottom: "var(--spacing-4)",
              }}
            >
              Ready to engineer your next {service.label.toLowerCase()} platform?
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "18px",
                color: "var(--color-fg-muted)",
                lineHeight: 1.7,
                maxWidth: "600px",
                marginBottom: "var(--spacing-8)",
              }}
            >
              Whether you need senior architecture leadership or end-to-end execution,
              our engineers are ready to turn your vision into high-performance software.
            </p>

            <Link
              href="/#contact"
              className="natural-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "0 var(--spacing-8)",
                minHeight: "52px",
                borderRadius: "var(--radius-full)",
                backgroundColor: altColorVar,
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: `0 10px 30px -8px ${altColorVar}`,
                transition: "all var(--motion-micro-feedback)",
              }}
            >
              <span>Schedule Architecture Consultation</span>
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
