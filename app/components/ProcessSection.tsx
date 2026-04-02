"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const steps = [
  {
    num: "01", label: "Understand", title: "We begin with the problem, not the stack.",
    body: "Before a single line of code is written, we interrogate every assumption. We map the real user, define the real constraint, and identify what success actually looks like — not what it is assumed to be.",
  },
  {
    num: "02", label: "Architect", title: "Every line of code is preceded by a decision.",
    body: "System design comes first. We choose the right data model, the right communication patterns, the right separations of concern. Architecture is not overhead — it is the investment that prevents collapse at scale.",
  },
  {
    num: "03", label: "Build", title: "Precision. Iteration. No shortcuts.",
    body: "Engineering with craft: clean APIs, typed contracts, automated tests, and code that reads as well as it runs. Velocity without quality is debt. We build to last.",
  },
  {
    num: "04", label: "Launch", title: "Deployment is not the finish line.",
    body: "A launch is a beginning. We set up observability, error tracking, performance baselines, and feedback loops from day one — so you know the moment anything changes in production.",
  },
  {
    num: "05", label: "Evolve", title: "The best software is always becoming.",
    body: "The world changes. Your product must change with it. We remain close partners long after delivery — refining, extending, and accelerating as your business discovers what it truly needs.",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    const mm = gsap.matchMedia();

    mm.add("(min-width: 901px)", () => {
      const totalScroll = track.scrollWidth - window.innerWidth * 0.55;

      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${totalScroll + 400}`,
          pin: true,
          scrub: 1.5,
          onUpdate: (self) => {
            const p = self.progress;
            if (progressBarRef.current) gsap.set(progressBarRef.current, { scaleX: p });

            const activeIndex = Math.floor(p * steps.length);
            cards.forEach((card, i) => {
              const topBorder = card.querySelector<HTMLElement>(".card-top-border");
              const bodyText = card.querySelector<HTMLElement>(".card-body-text");
              if (topBorder) topBorder.style.opacity = i === activeIndex ? "1" : "0";
              if (bodyText) bodyText.style.opacity = i === activeIndex ? "1" : "0.4";
            });
          },
        }
      });
    });

    mm.add("(max-width: 900px)", () => {
      // On mobile, just do simple entry animations for the cards instead of pinned horizontal scroll
      cards.forEach((card) => {
        const topBorder = card.querySelector<HTMLElement>(".card-top-border");
        const bodyText = card.querySelector<HTMLElement>(".card-body-text");
        if (topBorder) topBorder.style.opacity = "1";
        if (bodyText) bodyText.style.opacity = "1";

        gsap.fromTo(card,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 85%" } }
        );
      });
    });

  }, { scope: sectionRef });

  return (
    <div
      ref={sectionRef}
      id="process"
      className="process-container"
    >
      {/* Left Panel */}
      <div className="process-left">
        <div>
          <div className="overline" style={{ marginBottom: "16px" }}>Our Process</div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
            fontSize: "clamp(32px, 4vw, 52px)", color: "var(--color-text-primary)", lineHeight: 1.1, marginBottom: "24px",
          }}>
            How we build.
          </h2>
          <div style={{ width: "40px", height: "1px", background: "var(--color-gold)", marginBottom: "24px" }} />
          <p style={{
            fontFamily: "'EB Garamond', serif", fontSize: "16px",
            color: "var(--color-text-secondary)", lineHeight: 1.85, maxWidth: "380px",
          }}>
            Great software is not built by following a template. It is built by thinking — deeply, in sequence, without skipping steps.
          </p>
          <div className="desktop-progress" style={{ marginTop: "48px", height: "1px", background: "rgba(201,168,76,0.15)", position: "relative", maxWidth: "240px" }}>
            <div
              ref={progressBarRef}
              style={{
                position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
                background: "var(--color-gold)", transformOrigin: "left", transform: "scaleX(0)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Right Scroll Track */}
      <div className="process-right">
        <div
          ref={trackRef}
          className="h-scroll-track"
          style={{ willChange: "transform" }}
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="process-card"
              style={{
                background: "var(--color-slate-deep)", border: "var(--border-subtle)",
                borderRadius: "var(--radius-cell)", padding: "var(--space-7)", position: "relative",
              }}
            >
              <div className="card-top-border" style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                background: "var(--color-gold)", opacity: i === 0 ? 1 : 0, transition: "opacity 300ms ease",
              }} />
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(60px, 8vw, 80px)",
                color: "rgba(201,168,76,0.12)", lineHeight: 1, position: "absolute",
                top: "20px", right: "24px", letterSpacing: "-2px", userSelect: "none",
              }}>
                {step.num}
              </div>
              <div style={{ position: "relative", zIndex: 1, marginTop: "20px" }}>
                <div style={{
                  fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "0.22em",
                  color: "rgba(201,168,76,0.6)", textTransform: "uppercase", marginBottom: "12px",
                }}>
                  {step.label}
                </div>
                <div style={{ width: "40px", height: "1px", background: "var(--color-gold)", marginBottom: "20px" }} />
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(22px, 3vw, 26px)",
                  color: "var(--color-text-primary)", lineHeight: 1.25, marginBottom: "20px",
                }}>
                  {step.title}
                </h3>
                <p className="card-body-text" style={{
                  fontFamily: "'EB Garamond', serif", fontSize: "15px",
                  color: "var(--color-text-secondary)", lineHeight: 1.85,
                  opacity: i === 0 ? 1 : 0.4, transition: "opacity 300ms ease",
                }}>
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .process-container { height: 100vh; background: var(--color-void); overflow: hidden; display: flex; }
        .process-left { width: 40%; flex-shrink: 0; display: flex; align-items: center; padding: 0 var(--space-9); }
        .process-right { width: 60%; overflow: hidden; display: flex; align-items: center; }
        .h-scroll-track { padding-left: 48px; padding-right: 200px; display: flex; gap: 24px; align-items: center; }
        .process-card { width: 320px; min-height: 440px; flex-shrink: 0; }
        
        @media (max-width: 900px) {
          .process-container { height: auto !important; min-height: auto; flex-direction: column; overflow: visible; padding: var(--space-10) 0; }
          .process-left { width: 100%; padding: 0 var(--space-4); margin-bottom: var(--space-8); }
          .process-right { width: 100%; overflow: visible; }
          .h-scroll-track { flex-direction: column; padding: 0 var(--space-4); gap: 32px; align-items: stretch; }
          .process-card { width: 100%; min-height: auto; }
          .desktop-progress { display: none !important; }
        }
      `}</style>
    </div>
  );
}
