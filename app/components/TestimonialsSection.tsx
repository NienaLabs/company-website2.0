"use client";

const testimonials = [
  {
    quote: "They did not build what we asked for. They built what we needed — which turned out to be a far harder and more valuable thing. Niena Labs understood our problem before we fully did.",
    name: "AMARA OSEI", company: "VANTARA HEALTH", role: "Co-Founder & CEO",
  },
  {
    quote: "In twelve years of building startups, I have never had an engineering partner who treated architecture decisions with the same gravitas as business decisions. This is a different kind of firm.",
    name: "LARS ERIKSEN", company: "FIELDSTREAM", role: "CTO",
  },
  {
    quote: "The platform they delivered has processed over three million transactions without a single incident. The foundation they laid means we can move fast without breaking things.",
    name: "PRIYA CHANDRASEKHAR", company: "AETHER LOGISTICS", role: "VP Engineering",
  },
];

// Duplicate for infinite scroll to work smoothly
const infiniteTestimonials = [...testimonials, ...testimonials];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" style={{ background: "transparent", padding: "var(--space-10) 0", overflow: "hidden", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div className="testimonials-scale-wrapper" style={{ transformOrigin: "center center", willChange: "transform, opacity", opacity: 0, transform: "scale(0.5)" }}>
        
        {/* Header */}
        <div className="section-container">
          <div style={{ marginBottom: "var(--space-10)", textAlign: "center" }}>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 600,
              fontSize: "clamp(32px, 5vw, 48px)", color: "var(--text-primary)", lineHeight: 1.1,
            }}>
              What they say.
            </h2>
            <div style={{ width: "40px", height: "1px", background: "var(--amber)", marginTop: "16px", marginLeft: "auto", marginRight: "auto" }} />
          </div>
        </div>

        {/* Carousel */}
        <div className="carousel-wrapper" style={{ position: "relative", width: "100%", overflow: "hidden", padding: "var(--space-4) 0" }}>
          <div className="carousel-track">
            {/* Group 1 */}
            <div className="carousel-group">
              {infiniteTestimonials.map((t, i) => (
                <div key={`g1-${i}`} className="testimonial-card">
                  <div style={{
                    fontFamily: "var(--font-display)", fontSize: "40px",
                    color: "rgba(255,176,32,0.2)", lineHeight: 1, marginBottom: "16px"
                  }}>
                    &ldquo;
                  </div>
                  <blockquote style={{
                    fontFamily: "var(--font-body)", fontSize: "16px", color: "var(--text-secondary)",
                    lineHeight: 1.6, flexGrow: 1, marginBottom: "24px"
                  }}>
                    {t.quote}
                  </blockquote>
                  <div>
                    <div style={{
                      fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em",
                      color: "var(--text-primary)", textTransform: "uppercase",
                    }}>
                      {t.name}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-display)", fontSize: "11px", letterSpacing: "0.06em",
                      color: "var(--text-muted)", textTransform: "uppercase", marginTop: "4px"
                    }}>
                      {t.role} · {t.company}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Group 2 (Duplicate for seamless loop) */}
            <div className="carousel-group" aria-hidden="true">
              {infiniteTestimonials.map((t, i) => (
                <div key={`g2-${i}`} className="testimonial-card">
                  <div style={{
                    fontFamily: "var(--font-display)", fontSize: "40px",
                    color: "rgba(255,176,32,0.2)", lineHeight: 1, marginBottom: "16px"
                  }}>
                    &ldquo;
                  </div>
                  <blockquote style={{
                    fontFamily: "var(--font-body)", fontSize: "16px", color: "var(--text-secondary)",
                    lineHeight: 1.6, flexGrow: 1, marginBottom: "24px"
                  }}>
                    {t.quote}
                  </blockquote>
                  <div>
                    <div style={{
                      fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em",
                      color: "var(--text-primary)", textTransform: "uppercase",
                    }}>
                      {t.name}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-display)", fontSize: "11px", letterSpacing: "0.06em",
                      color: "var(--text-muted)", textTransform: "uppercase", marginTop: "4px"
                    }}>
                      {t.role} · {t.company}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .carousel-track {
            display: flex;
            gap: 24px;
            width: max-content;
            padding: 0 var(--space-4);
          }

          .carousel-group {
            display: flex;
            gap: 24px;
            animation: scrollLeft 40s linear infinite;
          }

          .carousel-track:hover .carousel-group {
            animation-play-state: paused;
          }

          @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-100% - 24px)); }
          }

          .testimonial-card {
            flex: 0 0 380px;
            display: flex;
            flex-direction: column;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: var(--space-6);
            transition: box-shadow 0.3s ease, transform 0.3s ease, background 0.3s ease;
            cursor: default;
          }

          .testimonial-card:hover {
            box-shadow: 0 0 0 4px var(--amber-glow);
            transform: translateY(-4px);
            background: rgba(255, 255, 255, 0.04);
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .testimonial-card {
              flex: 0 0 300px;
              padding: var(--space-5);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
