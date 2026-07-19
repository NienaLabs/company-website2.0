"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FOOTER_LINKS = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Careers", href: "/careers" },
  { label: "Bootcamp", href: "/bootcamp/courses" },
  { label: "Contact", href: "#contact" },
  { label: "Local Businesses", href: "/local-businesses" },
];

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);

  const isDark = resolvedTheme === "dark";
  const logoSrc = isDark ? "/logo-white.svg" : "/logo-black.svg";

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const timer = setTimeout(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      tl.fromTo(
        brandRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "back.out(1.4)" }
      )
        .fromTo(
          linksRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          copyrightRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        );
    }, 100);

    return () => clearTimeout(timer);
  }, { scope: sectionRef, dependencies: [] });

  return (
    <footer
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(255,176,32,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 var(--space-5)",
          width: "100%",
          maxWidth: "1280px",
        }}
      >
        {/* Brand: Logo + Wordmark */}
        <div
          ref={brandRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(8px, 1vw, 14px)",
            marginBottom: "clamp(16px, 2vw, 28px)",
            opacity: 0,
            willChange: "transform",
          }}
        >
          <Image
            src={logoSrc}
            alt="Niena Labs"
            width={56}
            height={56}
            priority
            style={{ display: "block", flexShrink: 0 }}
          />
          <div
            className="footer-wordmark"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(52px, 10vw, 120px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              background:
                "linear-gradient(135deg, var(--amber) 0%, #ffc65c 40%, var(--amber) 70%, var(--amber-strong) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            nienalabs
          </div>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(14px, 1.6vw, 18px)",
            color: "var(--text-muted)",
            lineHeight: 1.6,
            maxWidth: "420px",
            marginBottom: "clamp(40px, 6vh, 72px)",
          }}
        >
          Building the software that pushes humanity forward.
        </p>

        {/* Links */}
        <div
          ref={linksRef}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "clamp(16px, 2vw, 32px)",
            marginBottom: "clamp(40px, 6vh, 72px)",
            opacity: 0,
          }}
        >
          {FOOTER_LINKS.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  transition: "color 150ms ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--amber)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  transition: "color 150ms ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--amber)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
              >
                {link.label}
              </a>
            )
          )}
        </div>
      </div>

      {/* Copyright */}
      <div
        ref={copyrightRef}
        style={{
          position: "absolute",
          bottom: "clamp(24px, 4vh, 48px)",
          fontFamily: "var(--font-display)",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.06em",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          opacity: 0,
        }}
      >
        © {new Date().getFullYear()} Niena Labs · All Rights Reserved
      </div>
    </footer>
  );
}
