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
    title: `${service.label} — ${service.title.replace("\n", " ")}`,
    description: service.heroDescription,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.label} — Niena Labs`,
      description: service.heroDescription,
      url: `https://www.nienalabs.com/services/${service.slug}`,
      type: "website",
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
    <div className="service-page-wrapper">
      {/* Dynamic Ambient Background Glow in this Capability's Alt Color */}
      <div
        aria-hidden="true"
        className="service-ambient-glow"
        style={{
          background: `radial-gradient(circle at 50% 180px, ${altColorVar} 0%, transparent 68%)`,
        }}
      />

      {/* Top Header & Breadcrumbs */}
      <section className="service-header-section">
        <div className="section-container">
          <div className="service-breadcrumb-bar">
            {/* Back button */}
            <Link
              href="/#services"
              className="natural-btn service-back-link"
            >
              <ArrowLeft size={14} />
              <span>Back to What We Build</span>
            </Link>

            {/* Breadcrumb Path */}
            <nav aria-label="Breadcrumb" className="service-breadcrumbs">
              <Link
                href="/"
                className="hover:text-[var(--color-fg)] transition-colors"
              >
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                href="/services"
                className="hover:text-[var(--color-fg)] transition-colors"
              >
                Services
              </Link>
              <span aria-hidden="true">/</span>
              <span style={{ color: altColorVar, fontWeight: 600 }}>
                {service.label}
              </span>
            </nav>
          </div>

          {/* Hero Two-Column Layout */}
          <div className="service-hero-grid">
            {/* Left Hero Content */}
            <div className="service-hero-left">
              {/* Display Headline */}
              <h1 className="service-hero-title">
                {service.title}
              </h1>

              {/* Tagline / Subtitle */}
              <p className="service-hero-tagline">
                {service.tagline}
              </p>

              {/* Comprehensive Description */}
              <p className="service-hero-desc">
                {service.heroDescription}
              </p>

              {/* CTA Cluster */}
              <div className="service-hero-cta-cluster">
                <Link
                  href="/#contact"
                  className="natural-btn service-hero-primary-btn"
                  style={{
                    backgroundColor: altColorVar,
                    boxShadow: `0 8px 24px -6px ${altColorVar}`,
                  }}
                >
                  <span>Start a Project</span>
                  <ArrowUpRight size={16} />
                </Link>

                <a
                  href="#case-studies"
                  className="natural-btn service-hero-secondary-btn"
                >
                  <span>Explore Solutions</span>
                  <ChevronRight size={16} />
                </a>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="service-hero-visual-col">
              <div
                className="service-hero-visual-card"
                style={{
                  boxShadow: `0 24px 60px -12px rgba(0,0,0,0.35), 0 0 0 1px ${altColorVar}22`,
                }}
              >
                {/* 3D Icon Presentation */}
                <div className="service-hero-icon-wrap">
                  {service.iconType === "3d" ? (
                    <Image
                      src={service.icon}
                      alt={service.label}
                      width={160}
                      height={160}
                      className="w-full h-full object-contain"
                      priority
                    />
                  ) : (
                    <div
                      className="service-hero-icon-fallback"
                      style={{
                        border: `2px solid ${altColorVar}`,
                        boxShadow: `0 0 40px ${altColorVar}33`,
                      }}
                    >
                      <Terminal size={56} style={{ color: altColorVar }} />
                    </div>
                  )}
                </div>

                {/* Subtitle tag inside card */}
                <h3 className="service-hero-card-title">
                  {service.label} Engine
                </h3>

                <p className="service-hero-card-desc">
                  Engineered with clean architectural patterns, robust data integrity,
                  and maintainable modern codebases.
                </p>

                {/* Status indicator pill */}
                <div className="service-hero-status-pill">
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "var(--radius-full)",
                      backgroundColor: altColorVar,
                      boxShadow: `0 0 8px ${altColorVar}`,
                      display: "inline-block",
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
      <section className="service-metrics-section">
        <div className="section-container">
          <div className="service-metrics-grid">
            {service.metrics.map((metric, idx) => (
              <div key={idx} className="service-metric-item">
                <div
                  className="service-metric-value"
                  style={{ color: altColorVar }}
                >
                  {metric.value}
                </div>
                <div className="service-metric-label">
                  {metric.label}
                </div>
                <div className="service-metric-detail">
                  {metric.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 03 — Core Architectural Pillars */}
      <section className="service-pillars-section">
        <div className="section-container">
          <div className="service-section-header">
            <h2 className="service-section-title">
              Architectural Pillars
            </h2>
            <p className="service-section-desc">
              Every system we engineer is anchored in rigorous software principles,
              minimizing operational entropy and maximizing velocity.
            </p>
          </div>

          <div className="service-pillars-grid">
            {service.pillars.map((pillar, idx) => (
              <div key={idx} className="service-pillar-card">
                <div>
                  <div
                    className="service-pillar-icon-box"
                    style={{
                      border: `1px solid ${altColorVar}`,
                      color: altColorVar,
                    }}
                  >
                    {idx === 0 && <Layers size={20} />}
                    {idx === 1 && <Cpu size={20} />}
                    {idx === 2 && <ShieldCheck size={20} />}
                    {idx === 3 && <Zap size={20} />}
                  </div>

                  <h3 className="service-pillar-title">
                    {pillar.title}
                  </h3>

                  <p className="service-pillar-desc">
                    {pillar.description}
                  </p>
                </div>

                <div className="service-pillar-tags">
                  {pillar.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="service-pillar-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 04 — Real-World Solutions & Implementations */}
      <section id="case-studies" className="service-case-studies-section">
        <div className="section-container">
          <div className="service-section-header">
            <h2 className="service-section-title">
              Deployed Solutions &amp; Case Studies
            </h2>
            <p className="service-section-desc">
              How we approach and deliver {service.label.toLowerCase()} architecture
              for real-world products and teams.
            </p>
          </div>

          <div className="service-case-studies-list">
            {service.caseStudies.map((study, idx) => (
              <div key={idx} className="service-case-study-card">
                {/* Media Container */}
                {study.image && (
                  <div className="service-case-study-media">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      sizes="(max-width: 992px) 100vw, 50vw"
                      style={{
                        objectFit: "cover",
                        filter: "contrast(1.05) brightness(0.9)",
                      }}
                    />
                    <div
                      aria-hidden="true"
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
                        bottom: "var(--spacing-3)",
                        left: "var(--spacing-3)",
                        right: "var(--spacing-3)",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span className="service-case-study-badge">
                        {study.subtitle}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content Container */}
                <div className="service-case-study-content">
                  <div className="service-case-study-tags">
                    {study.tags.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="service-case-study-tag"
                        style={{ color: altColorVar }}
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <h3 className="service-case-study-title">
                    {study.title}
                  </h3>

                  <p className="service-case-study-desc">
                    {study.description}
                  </p>

                  {/* Impact Highlight Card */}
                  <div
                    className="service-case-study-highlight"
                    style={{ border: `1px solid ${altColorVar}` }}
                  >
                    <CheckCircle2
                      size={18}
                      style={{ color: altColorVar, flexShrink: 0 }}
                    />
                    <span className="service-case-study-highlight-text">
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
      <section className="service-tech-section">
        <div className="section-container">
          <div className="service-tech-grid">
            {/* Tech Stack Box */}
            <div className="service-tech-box">
              <h3 className="service-tech-box-title">
                Technology Stack &amp; Runtimes
              </h3>
              <p className="service-tech-box-desc">
                We carefully select best-of-breed languages, frameworks, and low-level
                tooling tailored to the throughput and latency requirements of {service.label.toLowerCase()}.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {service.techStack.map((tech, idx) => (
                  <span key={idx} className="service-tech-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Deliverables Box */}
            <div className="service-tech-box">
              <h3 className="service-tech-box-title">
                Deliverables &amp; Production Artifacts
              </h3>
              <p className="service-tech-box-desc">
                Full sovereign ownership. When we conclude our engagement, your team
                holds complete command of the architecture.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {service.deliverables.map((item, idx) => (
                  <div key={idx} className="service-deliverable-item">
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
      <section className="service-roadmap-section">
        <div className="section-container">
          <div className="service-section-header">
            <h2 className="service-section-title">
              Our Engineering Execution Roadmap
            </h2>
            <p className="service-section-desc">
              How we take your {service.label.toLowerCase()} initiative from blueprint
              to bulletproof production deployment.
            </p>
          </div>

          <div className="service-roadmap-grid">
            {service.processSteps.map((p, idx) => (
              <div key={idx} className="service-roadmap-card">
                <div
                  className="service-roadmap-step"
                  style={{ color: altColorVar }}
                >
                  {p.step}
                </div>
                <h4 className="service-roadmap-title">
                  {p.title}
                </h4>
                <p className="service-roadmap-desc">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 07 — Explore Other Capabilities Navigator */}
      <section className="service-navigator-section">
        <div className="section-container">
          <div className="service-navigator-header">
            <div>
              <h2 className="service-navigator-title">
                Explore Other Capabilities
              </h2>
            </div>
            <Link
              href="/#services"
              className="natural-btn service-back-link"
            >
              <span>View All on Homepage</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="service-navigator-grid">
            {otherServices.map((other) => {
              const otherAltColor = `var(--color-alt-${other.altColorIndex})`;
              return (
                <Link
                  key={other.id}
                  href={`/services/${other.slug}`}
                  className="service-navigator-card group"
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
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
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
                        wordBreak: "break-word",
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
      <section className="service-cta-banner-section">
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
            <h2 className="service-cta-title">
              Ready to engineer your next {service.label.toLowerCase()} platform?
            </h2>
            <p className="service-cta-desc">
              Whether you need senior architecture leadership or end-to-end execution,
              our engineers are ready to turn your vision into high-performance software.
            </p>

            <Link
              href="/#contact"
              className="natural-btn service-cta-btn"
              style={{
                backgroundColor: altColorVar,
                boxShadow: `0 10px 30px -8px ${altColorVar}`,
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
