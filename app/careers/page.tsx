"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Typography } from "../components/ui/Typography";
import { Card } from "../components/ui/Card";
import { SearchX } from "lucide-react";

gsap.registerPlugin(useGSAP);

export default function CareersPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP((_context, contextSafe) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    
    gsap.fromTo(
      ".fade-in-up",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.2 }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--bg)]">
      {/* SVG Pattern Hero Section */}
      <section 
        className="relative overflow-hidden flex flex-col justify-center border-b border-[var(--color-border)]"
        style={{
          backgroundColor: '#0a0a0c',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z' opacity='.5'%3E%3C/path%3E%3Cpath d='M15 15h50l-5 5H20v40l-5 5V15zm0 50h50V15L80 0v80H0l15-15zm32.07-32.07l3.54-3.54A15 15 0 0 1 29.4 50.6l3.53-3.53a10 10 0 1 0 14.14-14.14zM32.93 47.07a10 10 0 1 1 14.14-14.14L32.93 47.07z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")`,
          color: '#f5f3ee',
          minHeight: '85vh',
          paddingTop: 'calc(var(--space-9) + 80px)',
          paddingBottom: 'var(--space-9)',
        }}
      >
        <div className="section-container relative z-10 w-full">
          <div className="max-w-4xl flex flex-col" style={{ gap: 'var(--space-5)' }}>
            <div className="fade-in-up">
              <Typography variant="caption1" color="brand" className="uppercase tracking-widest font-bold" style={{ marginBottom: 'var(--space-3)' }}>
                Careers
              </Typography>
              <Typography variant="display" className="leading-tight tracking-tight" style={{ color: '#f5f3ee' }}>
                Join the <br />
                <span className="opacity-75">collective.</span>
              </Typography>
            </div>
            
            <div className="flex flex-col max-w-2xl fade-in-up" style={{ gap: 'var(--space-4)' }}>
              <Typography variant="body1" className="text-xl md:text-2xl leading-relaxed opacity-90 font-medium" style={{ color: '#d4d4d8' }}>
                We build scalable, AI-driven enterprise applications for businesses ready to scale. 
              </Typography>
              
              <Typography variant="body1" className="text-xl md:text-2xl leading-relaxed opacity-90 font-medium" style={{ color: '#d4d4d8' }}>
                We're looking for individuals who believe in building with unprecedented purpose and precision.
              </Typography>
            </div>
          </div>
        </div>
      </section>

      {/* No Openings Section */}
      <section style={{ paddingTop: 'calc(var(--spacing-section-gap) * 1.5)', paddingBottom: 'calc(var(--spacing-section-gap) * 1.5)' }}>
        <div className="section-container">
          <div className="max-w-3xl mx-auto fade-in-up">
            <Card 
              variant="glass" 
              className="text-center flex flex-col items-center px-6 py-12 md:px-12 md:py-16"
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: 'var(--color-surface-raised)', color: 'var(--color-fg-muted)' }}
              >
                <SearchX size={32} strokeWidth={1.5} />
              </div>
              
              <Typography variant="title2" style={{ marginBottom: 'var(--space-3)' }}>
                No Current Openings
              </Typography>
              
              <Typography variant="body1" color="secondary" style={{ maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
                Our engineering team is currently at full capacity. We aren't actively 
                recruiting for new roles today, but we're always looking out for exceptional 
                talent. We will update this space when new roles open.
              </Typography>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
