"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from "next-themes";

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
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const { resolvedTheme } = useTheme();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const isLightMode = resolvedTheme === 'light';
  const currentLogo = (isLightMode && isScrolled) ? "/logo-black.svg" : "/logo-white.svg";

  useGSAP(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Use a CSS class toggle instead of GSAP for backdrop-filter.
    // This runs in the browser's compositor thread (zero main-thread cost).
    ScrollTrigger.create({
      start: "top+=80 top",
      onEnter: () => {
        nav.classList.add("nav-scrolled");
        nav.classList.remove("nav-transparent");
        setIsScrolled(true);
      },
      onLeaveBack: () => {
        nav.classList.remove("nav-scrolled");
        nav.classList.add("nav-transparent");
        setIsScrolled(false);
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
      className="nav-transparent"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: "transparent",
        transition: "background-color 300ms ease, backdrop-filter 300ms ease",
        willChange: "transform",
        transform: "translateZ(0)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isBannerVisible && (
        <div style={{
          width: "100%",
          background: "linear-gradient(90deg, var(--amber-strong) 0%, var(--amber) 50%, var(--amber-strong) 100%)",
          borderBottom: "1px solid var(--amber-deep)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          overflow: "hidden"
        }}>
          {/* Subtle glow behind text */}
          <div style={{
            position: "absolute",
            width: "250px",
            height: "100%",
            background: "radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, transparent 70%)",
            pointerEvents: "none"
          }} />

          {/* Animated shimmering effect */}
          <div className="shimmer-effect" style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "50%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            pointerEvents: "none"
          }} />

          <Link href="/bootcamp/courses" className="banner-link" style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            zIndex: 1,
          }}>
        
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: "13px", fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--on-amber)",
              transition: "opacity 300ms ease"
            }} className="banner-text">
              Join Our Upcoming Bootcamp
            </span>
            <span className="banner-arrow" style={{
              color: "var(--on-amber)",
              fontSize: "14px",
              transition: "transform 300ms ease",
              lineHeight: 1
            }}>
              →
            </span>
          </Link>

          <button
            onClick={() => setIsBannerVisible(false)}
            aria-label="Close banner"
            style={{
              position: "absolute",
              right: "16px",
              background: "transparent",
              border: "none",
              color: "var(--on-amber)",
              opacity: 0.7,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px",
              transition: "opacity 200ms ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "0.7"}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div
        className="section-container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "20px", paddingBottom: "20px", width: "100%" }}
      >
        {/* Logo */}
        <div
          ref={logoRef}
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
        >

          <Image src={currentLogo} alt="Logo" width={25} height={25} />

          <span className="logo-text" style={{
            fontFamily: "var(--font-display)",
            fontSize: "18px",
            letterSpacing: "0.06em",
            color: "var(--text-primary)",
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
        <div ref={ctaRef} className="cta-container" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link href="/bootcamp/courses" className="nav-link mobile-hidden" style={{ fontSize: "13px", fontWeight: 600 }}>
            Bootcamp
          </Link>
          {/* GitHub Community Link */}
          <a
            href="https://github.com/orgs/Niena Labs-community/repositories"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Niena Labs GitHub Community"
            title="Niena Labs Open Source Community"
            className="mobile-hidden"
            style={{
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              transition: "color 200ms ease",
              lineHeight: 1,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--amber)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            <GitHubIcon />
          </a>

          <ThemeToggle />
          <CallButton />
        </div>
      </div>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(250%) skewX(-20deg); }
        }
        .shimmer-effect {
          animation: shimmer 5s infinite;
        }
        .banner-link:hover .banner-text {
          opacity: 0.8 !important;
        }
        .banner-link:hover .banner-arrow {
          transform: translateX(4px);
        }
        @media (max-width: 768px) {
          .desktop-nav-links { display: none !important; }
          .mobile-hidden { display: none !important; }
          .cta-container { gap: 12px !important; }
          .logo-text { font-size: 14px !important; letter-spacing: 0.15em !important; }
        }
        @media (max-width: 480px) {
          .logo-text { font-size: 12px !important; letter-spacing: 0.1em !important; }
          .call-btn { padding: 8px 12px !important; font-size: 8px !important; }
          .banner-text { font-size: 8px !important; letter-spacing: 0.1em !important; }
        }
        @media (max-width: 360px) {
          .logo-text { display: none !important; }
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
        className="btn-secondary call-btn"
        style={{ fontSize: "11px", fontWeight: 600 }}
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
          background: "var(--bg)",
          border: "1px solid var(--border)",
          color: "var(--amber)",
          fontSize: "11px", fontWeight: 600,
          padding: "4px 8px",
          borderRadius: "4px",
          whiteSpace: "nowrap",
          fontFamily: "var(--font-display)",
          letterSpacing: "0.06em",
          zIndex: 10,
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
        }}>
          Number Copied!
        </div>
      )}
    </div>
  )
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ width: 28, height: 28 }} />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle Theme"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        backgroundColor: "transparent",
        color: "var(--text-muted)",
        border: "1px solid var(--border)",
        cursor: "pointer",
        transition: "all 200ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--text-primary)";
        e.currentTarget.style.borderColor = "var(--border-strong)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--text-muted)";
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      {isDark ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
