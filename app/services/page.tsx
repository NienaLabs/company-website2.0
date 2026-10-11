import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { servicesList } from "../../lib/services";
import { Terminal, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "What We Build — Capabilities & Engineering Services | Niena Labs",
  description:
    "Explore our complete suite of software capabilities: Developer Tools, Enterprise Web, Mobile, AI-Driven Systems, Cloud Infrastructure, and Desktop Applications.",
};

export default function ServicesIndexPage() {
  return (
    <div
      style={{
        background: "var(--color-bg)",
        color: "var(--color-fg)",
        minHeight: "100vh",
        paddingTop: "140px",
        paddingBottom: "var(--spacing-24)",
      }}
    >
      <div className="section-container">
        {/* Header */}
        <div style={{ maxWidth: "780px", marginBottom: "var(--spacing-16)" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 6vw, 64px)",
              fontWeight: 600,
              color: "var(--color-fg)",
              lineHeight: 1.1,
              marginBottom: "var(--spacing-4)",
            }}
          >
            What we build.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "20px",
              color: "var(--color-fg-muted)",
              lineHeight: 1.7,
            }}
          >
            We architect and deliver software across six specialized domains. From
            ultra-fast developer tools to distributed enterprise clouds and custom AI
            pipelines, each discipline is engineered with uncompromising rigor.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "var(--spacing-8)",
          }}
        >
          {servicesList.map((service) => {
            const altColorVar = `var(--color-alt-${service.altColorIndex})`;

            return (
              <div
                key={service.id}
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderRadius: "var(--radius-3xl)",
                  border: "1px solid var(--color-border)",
                  padding: "var(--spacing-8)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all var(--motion-productive-shift)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Background soft glow on card */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "-40px",
                    right: "-40px",
                    width: "180px",
                    height: "180px",
                    borderRadius: "var(--radius-full)",
                    background: altColorVar,
                    opacity: 0.08,
                    filter: "blur(40px)",
                    pointerEvents: "none",
                  }}
                />

                <div>
                  {/* Top Bar with Icon & Label */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "var(--spacing-6)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600,
                        color: altColorVar,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        padding: "4px 12px",
                        borderRadius: "var(--radius-full)",
                        backgroundColor: "var(--color-surface-raised)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      {service.label}
                    </span>

                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {service.iconType === "3d" ? (
                        <Image
                          src={service.icon}
                          alt={service.label}
                          width={60}
                          height={60}
                          style={{ objectFit: "contain" }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "52px",
                            height: "52px",
                            borderRadius: "var(--radius-full)",
                            backgroundColor: "var(--color-surface-raised)",
                            border: `1px solid ${altColorVar}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Terminal size={28} style={{ color: altColorVar }} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Title & Body */}
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "26px",
                      fontWeight: 600,
                      color: "var(--color-fg)",
                      whiteSpace: "pre-line",
                      lineHeight: 1.25,
                      marginBottom: "12px",
                    }}
                  >
                    {service.title}
                  </h2>

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "15px",
                      color: "var(--color-fg-muted)",
                      lineHeight: 1.7,
                      marginBottom: "var(--spacing-6)",
                    }}
                  >
                    {service.body}
                  </p>

                  {/* Highlights */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      marginBottom: "var(--spacing-8)",
                    }}
                  >
                    {service.techStack.slice(0, 4).map((tech, tIdx) => (
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
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Learn More Action Button */}
                <Link
                  href={`/services/${service.slug}`}
                  className="natural-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 var(--spacing-6)",
                    minHeight: "48px",
                    borderRadius: "var(--radius-full)",
                    backgroundColor: "var(--color-surface-raised)",
                    border: "1px solid var(--color-border-strong)",
                    color: "var(--color-fg)",
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all var(--motion-micro-feedback)",
                  }}
                >
                  <span>Explore {service.label}</span>
                  <ArrowUpRight size={16} style={{ color: altColorVar }} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
