"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const octagonRef = useRef<SVGSVGElement>(null);
  const overlineRef = useRef<HTMLDivElement>(null);
  const headline1Ref = useRef<HTMLDivElement>(null);
  const headline2Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Continuous rotation via ticker — must be manually cleaned up
    const angleRef = { value: 0 };
    const ticker = () => {
      if (octagonRef.current) {
        angleRef.value += 0.025;
        octagonRef.current.style.transform = `rotate(${angleRef.value}deg)`;
      }
    };
    gsap.ticker.add(ticker);

    // Entrance timeline
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(octagonRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
    );

    if (overlineRef.current) {
      tl.fromTo(overlineRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        "t=0.4"
      );
    }

    if (headline1Ref.current) {
      tl.fromTo(headline1Ref.current.querySelectorAll(".word"),
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.04, ease: "power2.out" },
        "t=0.65"
      );
    }

    if (headline2Ref.current) {
      tl.fromTo(headline2Ref.current.querySelectorAll(".word"),
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.04, ease: "power2.out" },
        "t=0.85"
      );
    }

    if (subRef.current) {
      tl.fromTo(subRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "t=1.1"
      );
    }

    if (ctasRef.current) {
      tl.fromTo(ctasRef.current.querySelectorAll("a"),
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: "power2.out" },
        "t=1.4"
      );
    }

    if (scrollIndicatorRef.current) {
      tl.fromTo(scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" },
        "t=1.9"
      );

      const line = scrollIndicatorRef.current.querySelector(".scroll-line");
      if (line) {
        gsap.to(line, {
          opacity: 0.3,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: 2.4,
        });
      }

      ScrollTrigger.create({
        start: "top+=100 top",
        onEnter: () => gsap.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.4 }),
        onLeaveBack: () => gsap.to(scrollIndicatorRef.current, { opacity: 1, duration: 0.4 }),
      });
    }

    // Ticker is not auto-cleaned by useGSAP — must return explicit cleanup
    return () => {
      gsap.ticker.remove(ticker);
    };
  }, { scope: sectionRef });

  const wrapWords = (text: string) =>
    text.split(" ").map((w, i) => (
      <span key={i} className="word" style={{ display: "inline-block", marginRight: "0.25em" }}>
        {w}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="arch-grid"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "600px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-void)",
        overflow: "hidden",
      }}
    >
      {/* Rotating Octagon — positioned via margin offsets so rotate() works cleanly */}
      <svg
        ref={octagonRef}
        viewBox="0 0 600 600"
        width="600"
        height="600"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          marginTop: "-300px",
          marginLeft: "-300px",
          opacity: 0,
          pointerEvents: "none",
          transformOrigin: "center center",
        }}
      >
        <defs>
          {/* Radial veil: dark at center → transparent at edge — keeps hero text readable */}
          <radialGradient id="center-veil" cx="50%" cy="50%" r="42%">
            <stop offset="0%"   stopColor="#0a1214" stopOpacity="0.72" />
            <stop offset="70%"  stopColor="#0a1214" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#0a1214" stopOpacity="0"    />
          </radialGradient>
        </defs>

        {/* Outer octagon */}
        <polygon
          points="300,20 490,110 580,300 490,490 300,580 110,490 20,300 110,110"
          fill="none"
          stroke="rgba(201,168,76,0.22)"
          strokeWidth="1"
        />

        {/* Inner octagon */}
        <polygon
          points="300,60 460,140 540,300 460,460 300,540 140,460 60,300 140,140"
          fill="none"
          stroke="rgba(201,168,76,0.12)"
          strokeWidth="0.5"
        />

        {/*
          Wheel spokes — 8 lines from center (300,300) to each inner vertex.
          Same color as inner octagon for visual unity.
        */}
        <line x1="300" y1="300" x2="300" y2="60"  stroke="rgba(201,168,76,0.35)" strokeWidth="0.5" />
        <line x1="300" y1="300" x2="460" y2="140" stroke="rgba(201,168,76,0.35)" strokeWidth="0.5" />
        <line x1="300" y1="300" x2="540" y2="300" stroke="rgba(201,168,76,0.35)" strokeWidth="0.5" />
        <line x1="300" y1="300" x2="460" y2="460" stroke="rgba(201,168,76,0.35)" strokeWidth="0.5" />
        <line x1="300" y1="300" x2="300" y2="540" stroke="rgba(201,168,76,0.35)" strokeWidth="0.5" />
        <line x1="300" y1="300" x2="140" y2="460" stroke="rgba(201,168,76,0.35)" strokeWidth="0.5" />
        <line x1="300" y1="300" x2="60"  y2="300" stroke="rgba(201,168,76,0.35)" strokeWidth="0.5" />
        <line x1="300" y1="300" x2="140" y2="140" stroke="rgba(201,168,76,0.35)" strokeWidth="0.5" />

        {/* Small hub circle at center where spokes converge */}
        <circle cx="300" cy="300" r="4" fill="none" stroke="rgba(201,168,76,0.5)" strokeWidth="0.5" />

        {/* Corner connector ticks between outer ↔ inner vertices */}
        <line x1="300" y1="20"  x2="300" y2="60"  stroke="rgba(201,168,76,0.1)" strokeWidth="0.5" />
        <line x1="490" y1="110" x2="460" y2="140" stroke="rgba(201,168,76,0.1)" strokeWidth="0.5" />
        <line x1="580" y1="300" x2="540" y2="300" stroke="rgba(201,168,76,0.1)" strokeWidth="0.5" />
        <line x1="490" y1="490" x2="460" y2="460" stroke="rgba(201,168,76,0.1)" strokeWidth="0.5" />
        <line x1="300" y1="580" x2="300" y2="540" stroke="rgba(201,168,76,0.1)" strokeWidth="0.5" />
        <line x1="110" y1="490" x2="140" y2="460" stroke="rgba(201,168,76,0.1)" strokeWidth="0.5" />
        <line x1="20"  y1="300" x2="60"  y2="300" stroke="rgba(201,168,76,0.1)" strokeWidth="0.5" />
        <line x1="110" y1="110" x2="140" y2="140" stroke="rgba(201,168,76,0.1)" strokeWidth="0.5" />

        {/* Radial veil applied on top of all geometry — darkens center for text legibility */}
        <circle cx="300" cy="300" r="300" fill="url(#center-veil)" />
      </svg>

      {/* Hero Content */}
      <div
        style={{
          textAlign: "center",
          maxWidth: "820px",
          padding: "0 var(--space-6)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          ref={overlineRef}
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "9px",
            letterSpacing: "0.32em",
            color: "rgba(201,168,76,0.6)",
            textTransform: "uppercase",
            marginBottom: "24px",
            opacity: 0,
          }}
        >
          We believe the world can be changed
        </div>

        <div
          ref={headline1Ref}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(44px, 7vw, 72px)",
            lineHeight: 1.05,
            color: "var(--color-text-primary)",
            marginBottom: "8px",
          }}
        >
          {wrapWords("Every idea that matters")}
        </div>

        <div
          ref={headline2Ref}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(44px, 7vw, 72px)",
            lineHeight: 1.05,
            color: "rgba(232,223,200,0.55)",
            marginBottom: "36px",
          }}
        >
          {wrapWords("deserves the engineering to match.")}
        </div>

        <p
          ref={subRef}
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: "18px",
            color: "var(--color-text-secondary)",
            maxWidth: "560px",
            margin: "0 auto 48px",
            lineHeight: 1.8,
            opacity: 0,
          }}
        >
          We build scalable enterprise software for companies that intend to matter.
        </p>

        <div
          ref={ctasRef}
          style={{
            display: "flex",
            gap: "24px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a href="#contact" className="btn-primary">Build With Us</a>
          <a href="#work" className="btn-secondary">See Our Work</a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          opacity: 0,
        }}
      >
        <div
          className="scroll-line"
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, rgba(201,168,76,0.6), transparent)",
            margin: "0 auto 8px",
          }}
        />
        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "7px",
            letterSpacing: "0.22em",
            color: "rgba(201,168,76,0.35)",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </div>
      </div>
    </section>
  );
}
