"use client";

import { Card, DynamicColor } from "./ui/Card";
import { Typography } from "./ui/Typography";
import { Carousel } from "./ui/Carousel";

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
  // Add a few more to make the carousel feel full
  {
    quote: "Working with them was the single most impactful decision we made this year. They delivered a product that entirely redefined our competitive advantage.",
    name: "DAVID CHEN", company: "NEXUS SYSTEMS", role: "Product Lead",
  },
  {
    quote: "An incredibly rare mix of high-level strategic thinking and flawless execution. They don't just write code, they engineer outcomes.",
    name: "SARAH JENKINS", company: "ORBITAL", role: "CEO",
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" style={{ background: "transparent", padding: "var(--space-10) 0", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div className="testimonials-scale-wrapper" style={{ transformOrigin: "center center", willChange: "transform, opacity" }}>
        
        {/* Header */}
        <div className="section-container">
          <div style={{ marginBottom: "var(--spacing-16)", textAlign: "center" }}>
            <Typography variant="large-title" style={{ marginBottom: "4px" }}>
              What they say.
            </Typography>
          </div>
        </div>

        {/* Carousel */}
        <div>
          <Carousel
            items={testimonials}
            variant="marquee"
            marqueeSpeed="50s"
            renderItem={(t, i) => {
              const altColorIndex = ((i % 4) + 1).toString() as DynamicColor;
              
              return (
                <Card
                  variant="glass"
                  dynamicColor={altColorIndex}
                  interactive={true}
                  style={{
                    width: "380px",
                    minHeight: "300px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{
                    fontFamily: "var(--font-display)", fontSize: "40px",
                    color: "inherit", 
                    opacity: 0.3,
                    lineHeight: 1, marginBottom: "16px"
                  }}>
                    &ldquo;
                  </div>
                  
                  <blockquote style={{ flexGrow: 1, marginBottom: "24px" }}>
                    <Typography 
                      variant="body1" 
                      color="inherit"
                      style={{ opacity: 0.95 }}
                    >
                      "{t.quote}"
                    </Typography>
                  </blockquote>
                  
                  <div>
                    <Typography 
                      variant="caption1" 
                      style={{ 
                        color: "inherit",
                        textTransform: "uppercase", 
                        letterSpacing: "0.06em", 
                        marginBottom: "4px",
                        fontWeight: 600
                      }}
                    >
                      {t.name}
                    </Typography>
                    
                    <Typography 
                      variant="caption1" 
                      color="inherit"
                      style={{ 
                        textTransform: "uppercase", 
                        letterSpacing: "0.06em",
                        opacity: 0.8
                      }}
                    >
                      {t.role} · {t.company}
                    </Typography>
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
