"use client";

import { useRef } from "react";
import Link from "next/link";
import ScrollBlurReveal from "./ui/ScrollBlurReveal";

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      style={{
        backgroundColor: "var(--color-bg)",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        padding: "clamp(100px, 12vw, 160px) 0",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div
        className="section-container"
        style={{ maxWidth: "860px", position: "relative", zIndex: 1 }}
      >
        <ScrollBlurReveal
          as="div"
          triggerRef={sectionRef}
          start="top 75%"
          end="bottom 55%"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(28px, 4.5vw, 52px)",
            color: "var(--color-fg)",
            lineHeight: 1.25,
            marginBottom: "12px",
          }}
        >
          If you are ready to bring intelligence out of the cloud and into the real economy,
        </ScrollBlurReveal>

        <ScrollBlurReveal
          as="div"
          triggerRef={sectionRef}
          start="top 60%"
          end="bottom 45%"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(28px, 4.5vw, 52px)",
            color: "var(--color-brand)",
            lineHeight: 1.25,
            marginBottom: "52px",
          }}
        >
          we are ready to engineer the systems with you.
        </ScrollBlurReveal>

        <ScrollBlurReveal
          animateChildren
          triggerRef={sectionRef}
          start="top 45%"
          end="bottom 35%"
          blurAmount={8}
        >
          <Link
            href="/#contact"
            className="btn-primary"
            style={{
              fontSize: "13px",
              fontWeight: 600,
              padding: "16px 44px",
              borderRadius: "var(--radius-full)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Deploy With Us
          </Link>
        </ScrollBlurReveal>
      </div>
    </section>
  );
}
