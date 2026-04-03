"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from 'next/image'

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Inline GitHub SVG — no icon library needed
function GitHubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const nav = navRef.current;
    if (!nav) return;

    ScrollTrigger.create({
      start: "top+=80 top",
      onEnter: () => {
        gsap.to(nav, {
          backgroundColor: "rgba(10,18,20,0.92)",
          backdropFilter: "blur(16px)",
          duration: 0.3,
          ease: "power1.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(nav, {
          backgroundColor: "rgba(10,18,20,0)",
          backdropFilter: "blur(0px)",
          duration: 0.3,
          ease: "power1.out",
        });
      },
    });

    const tl = gsap.timeline({ delay: 0.6 });

    tl.fromTo(logoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" }
    );
    tl.fromTo(linksRef.current?.querySelectorAll("a") ?? [],
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" },
      "-=0.4"
    );
    tl.fromTo(ctaRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    );
  }, { scope: navRef });

  return (
    <header
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: "rgba(10,18,20,0)",
        padding: "20px 0",
        transition: "background-color 300ms ease",
      }}
    >
      <div
        className="section-container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        {/* Logo */}
        <div
          ref={logoRef}
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
        >

          <Image src="/logo-white.svg" alt="Logo" width={25} height={25} />

          <span style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "18px",
            letterSpacing: "0.28em",
            color: "var(--color-text-primary)",
            textTransform: "uppercase",
          }}>
            Niena Labs
          </span>
        </div>

        {/* Nav Links */}
        <div
          ref={linksRef}
          className="desktop-nav-links"
          style={{ display: "flex", gap: "36px", alignItems: "center" }}
        >
          {["Services", "Work", "Open Source", "About"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              className="nav-link"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right — GitHub + CTA */}
        <div ref={ctaRef} style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* GitHub Community Link */}
          <a
            href="https://github.com/orgs/Niena Labs-community/repositories"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Niena Labs GitHub Community"
            title="Niena Labs Open Source Community"
            style={{
              color: "rgba(232,223,200,0.45)",
              display: "flex",
              alignItems: "center",
              transition: "color 200ms ease",
              lineHeight: 1,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(232,223,200,0.45)")}
          >
            <GitHubIcon />
          </a>

          <CallButton />
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav-links { display: none !important; }
        }
      `}</style>
    </header>
  );
}

function CallButton() {
  const [copied, setCopied] = useState(false);

  const handleCallClick = () => {
    navigator.clipboard.writeText("+233556732796");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <a
        href="tel:+233556732796"
        onClick={handleCallClick}
        className="btn-secondary"
        style={{ fontSize: "9px" }}
      >
        Book a Call
      </a>
      {copied && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginTop: "8px",
          background: "var(--color-abyss)",
          border: "var(--border-gold-faint)",
          color: "var(--color-gold)",
          fontSize: "9px",
          padding: "4px 8px",
          borderRadius: "4px",
          whiteSpace: "nowrap",
          fontFamily: "'Cinzel', serif",
          letterSpacing: "0.1em",
          zIndex: 10,
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
        }}>
          Number Copied!
        </div>
      )}
    </div>
  )
}
