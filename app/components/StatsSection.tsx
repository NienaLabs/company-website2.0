"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stats = [
  { value: 50, suffix: "+", label: "Products shipped", countable: true },
  { value: 3, suffix: "", label: "Continents served", countable: true },
  { value: null, display: "∞", label: "Ideas worth building", countable: false },
  { value: null, display: "01", label: "Purpose", countable: false },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const dividerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    stats.forEach((stat, i) => {
      const el = numberRefs.current[i];
      if (!el) return;

      if (stat.countable && stat.value !== null) {
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 70%",
          onEnter: () => {
            gsap.to(obj, {
              val: stat.value,
              duration: 1.5,
              ease: "power2.out",
              delay: i * 0.2,
              onUpdate: () => { el.textContent = Math.round(obj.val) + stat.suffix; },
            });
          },
        });
      } else {
        gsap.fromTo(el,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: i * 0.2,
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          }
        );
      }
    });

    dividerRefs.current.forEach((div, i) => {
      if (!div) return;
      gsap.fromTo(div,
        { scaleY: 0 },
        {
          scaleY: 1, duration: 0.4, ease: "power2.out", delay: 1.2 + i * 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="stats"
      style={{
        background: "var(--color-void)", padding: "var(--space-10) 0",
        borderTop: "var(--border-gold-faint)", borderBottom: "var(--border-gold-faint)",
      }}
    >
      <div className="section-container">
        <div className="overline" style={{ marginBottom: "var(--space-8)", textAlign: "center" }}>
          By the numbers
        </div>
        <div className="stats-grid" style={{ display: "grid", position: "relative" }}>
          {stats.map((stat, i) => (
            <div key={i} className={`stat-item stat-${i}`} style={{ padding: "var(--space-8) var(--space-6)", position: "relative", textAlign: "center" }}>
              {i > 0 && (
                <div
                  ref={(el) => { dividerRefs.current[i - 1] = el; }}
                  className="stat-divider"
                  style={{
                    position: "absolute", left: 0, top: "10%", bottom: "10%",
                    width: "1px", background: "rgba(201,168,76,0.15)",
                    transformOrigin: "top", transform: "scaleY(0)",
                  }}
                />
              )}
              <div
                ref={(el) => { numberRefs.current[i] = el; }}
                style={{
                  fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                  fontSize: "clamp(48px, 6vw, 80px)", color: "var(--color-gold)", lineHeight: 1, marginBottom: "16px",
                }}
              >
                {stat.display ?? "0"}
              </div>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "0.2em",
                color: "rgba(232,223,200,0.4)", textTransform: "uppercase",
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .stats-grid { grid-template-columns: 1fr 1fr 1fr 1fr; }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr 1fr; row-gap: 32px; }
          .stat-2 .stat-divider { display: none !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr; row-gap: 40px; }
          .stat-divider { display: none !important; }
        }
      `}</style>
    </section>
  );
}
