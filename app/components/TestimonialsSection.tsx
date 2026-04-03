"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

function TestimonialBlock({
  quote, name, company, role, isLast,
}: {
  quote: string; name: string; company: string; role: string; isLast: boolean;
}) {
  const blockRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const block = blockRef.current;
    if (!block || prefersReducedMotion) return;

    const words = block.querySelectorAll(".q-word");
    const attr = block.querySelector(".attribution");

    ScrollTrigger.create({
      trigger: block,
      start: "top 75%",
      onEnter: () => {
        gsap.to(words, { opacity: 1, duration: 0.4, stagger: 0.025, ease: "power2.out" });
        if (attr) {
          gsap.fromTo(attr, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: words.length * 0.025 + 0.2 });
        }
        if (dividerRef.current) {
          gsap.fromTo(dividerRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.8, ease: "power2.out", delay: words.length * 0.025 + 0.4, transformOrigin: "left" }
          );
        }
      },
    });
  }, { scope: blockRef });

  return (
    <div ref={blockRef} style={{ padding: "var(--space-9) 0", position: "relative" }}>
      <blockquote style={{
        fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300,
        fontSize: "clamp(20px, 2.5vw, 28px)", color: "var(--color-text-primary)",
        lineHeight: 1.55, maxWidth: "840px", margin: "0 0 32px",
      }}>
        {quote.split(" ").map((word, i) => (
          <span key={i} className="q-word" style={{ display: "inline-block", marginRight: "0.28em", opacity: 0.12 }}>
            {word}
          </span>
        ))}
      </blockquote>
      <div className="attribution" style={{
        fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "0.2em",
        color: "var(--color-text-muted)", textTransform: "uppercase", opacity: 0,
      }}>
        — {name} · {company} · {role}
      </div>
      <div
        ref={dividerRef}
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
          background: isLast ? "var(--color-gold)" : "rgba(201,168,76,0.12)",
          transform: "scaleX(0)", transformOrigin: "left",
        }}
      />
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" style={{ background: "var(--color-void)", padding: "var(--space-10) 0" }}>
      <div className="section-container">
        <div style={{ marginBottom: "var(--space-8)" }}>
          <div className="overline" style={{ marginBottom: "12px" }}>Client Voices</div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
            fontSize: "clamp(32px, 5vw, 48px)", color: "var(--color-text-primary)", lineHeight: 1.1,
          }}>
            What they say.
          </h2>
          <div style={{ width: "40px", height: "1px", background: "var(--color-gold)", marginTop: "16px" }} />
        </div>
        <div style={{ position: "relative" }}>
          <div aria-hidden="true" style={{
            position: "absolute", top: "-20px", left: "-40px",
            fontFamily: "'Cormorant Garamond', serif", fontSize: "200px",
            color: "rgba(201,168,76,0.07)", lineHeight: 1, pointerEvents: "none", userSelect: "none",
          }}>
            &ldquo;
          </div>
          {testimonials.map((t, i) => (
            <TestimonialBlock key={i} {...t} isLast={i === testimonials.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
