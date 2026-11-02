"use client";

import { Card, DynamicColor } from "./ui/Card";
import { Typography } from "./ui/Typography";
import { Carousel } from "./ui/Carousel";
import ScrollBlurReveal from "./ui/ScrollBlurReveal";

const testimonials = [
  {
    quote:
      "Niena Labs' edge vision systems caught over 4,000 micro-flaws on our precision machining lines in the first 30 days. Running inference at the edge with sub-12ms response meant zero line stoppage and 100% data privacy.",
    name: "MARCUS VANCE",
    company: "APEX INDUSTRIAL",
    role: "VP of Advanced Manufacturing",
  },
  {
    quote:
      "Deploying high-assurance intelligence in a hospital network requires uncompromising privacy. Niena Labs provided on-premise neural hardware and diagnostic software that keeps patient data strictly within our physical enclaves.",
    name: "DR. ELENA ROSTOVA",
    company: "BIOHEALTH RESEARCH",
    role: "Director of Clinical Computing",
  },
  {
    quote:
      "The autonomous decision engines adapted to national supply chain disruptions in real time. We experienced an 18% improvement in logistics throughput within the first quarter.",
    name: "KWAME MENSAH",
    company: "AETHER LOGISTICS",
    role: "Chief Operating Officer",
  },
  {
    quote:
      "Their ambient sensing hardware operates with surgical precision. It enhances environmental comfort and energy efficiency across our commercial properties without a single invasive camera or microphone.",
    name: "SOPHIA LINDQVIST",
    company: "NORDIC HABITAT",
    role: "Head of Smart Infrastructure",
  },
  {
    quote:
      "Most AI vendors offer cloud APIs that collapse in real factory conditions. Niena Labs engineered ruggedized hardware and deterministic software that just works on the shop floor.",
    name: "DAVID CHEN",
    company: "NEXUS SYSTEMS",
    role: "Chief Technology Officer",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      style={{
        position: "relative",
        background: "transparent",
        padding: "var(--space-10) 0",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        className="testimonials-scale-wrapper"
        style={{
          position: "relative",
          transformOrigin: "center center",
          willChange: "transform, opacity",
        }}
      >
        {/* Header */}
        <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: "var(--spacing-12)", textAlign: "center" }}>
            <ScrollBlurReveal
              as="h2"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(32px, 4.5vw, 48px)",
                color: "var(--color-fg)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: "4px",
              }}
            >
              Deployed where failure is not an option.
            </ScrollBlurReveal>
          </div>
        </div>

        {/* Carousel */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Carousel
            items={testimonials}
            variant="marquee"
            marqueeSpeed="55s"
            renderItem={(t, i) => {
              const altColorIndex = ((i % 4) + 1).toString() as DynamicColor;

              return (
                <Card
                  variant="glass"
                  dynamicColor={altColorIndex}
                  interactive={true}
                  style={{
                    width: "400px",
                    minHeight: "310px",
                    display: "flex",
                    flexDirection: "column",
                    padding: "28px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "36px",
                      color: "inherit",
                      opacity: 0.3,
                      lineHeight: 1,
                      marginBottom: "12px",
                    }}
                  >
                    &ldquo;
                  </div>

                  <blockquote style={{ flexGrow: 1, marginBottom: "20px" }}>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "14px",
                        lineHeight: 1.6,
                        opacity: 0.95,
                        margin: 0,
                      }}
                    >
                      {t.quote}
                    </p>
                  </blockquote>

                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "12px",
                        color: "inherit",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: "4px",
                        fontWeight: 700,
                      }}
                    >
                      {t.name}
                    </div>

                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "12px",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        opacity: 0.8,
                      }}
                    >
                      {t.role} · {t.company}
                    </div>
                  </div>
                </Card>
              );
            }}
          />
        </div>
      </div>
    </section>
  );
}
