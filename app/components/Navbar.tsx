"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Factory,
  Building2,
  Landmark,
  Home,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const environmentsData = [
  {
    title: "Factories & Manufacturing",
    href: "/#capabilities",
    description:
      "Real-time sub-millimeter computer vision, automated defect interception, and predictive industrial telemetry.",
    tags: ["COMPUTER VISION", "EDGE INFERENCE", "DEFECT INTERCEPTION"],
    icon: Factory,
    dynamicColor: "1" as const,
  },
  {
    title: "Businesses & Enterprise",
    href: "/#capabilities",
    description:
      "Autonomous operational intelligence, decision engines, and high-velocity workflow automation.",
    tags: ["DECISION INTELLIGENCE", "AUTONOMOUS WORKFLOWS", "PREDICTIVE OPS"],
    icon: Building2,
    dynamicColor: "2" as const,
  },
  {
    title: "Institutions & Healthcare",
    href: "/#capabilities",
    description:
      "High-assurance compute platforms, secure research intelligence, and clinical workflow assistance.",
    tags: ["HIGH ASSURANCE", "RESEARCH COMPUTE", "DATA INTEGRITY"],
    icon: Landmark,
    dynamicColor: "3" as const,
  },
  {
    title: "Homes & Living Spaces",
    href: "/#capabilities",
    description:
      "Private on-device ambient intelligence, local neural compute appliances, and intelligent living spaces.",
    tags: ["AMBIENT INTELLIGENCE", "LOCAL COMPUTE", "PRIVACY PRESERVING"],
    icon: Home,
    dynamicColor: "4" as const,
  },
];

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
  const [isEnvironmentsOpen, setIsEnvironmentsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();

  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDarkHero = pathname === "/" && !isScrolled;

  const logoSrc =
    !mounted
      ? pathname === "/"
        ? "/logo-white.svg"
        : resolvedTheme === "dark"
        ? "/logo-white.svg"
        : "/logo-black.svg"
      : isDarkHero
      ? "/logo-white.svg"
      : resolvedTheme === "dark"
      ? "/logo-white.svg"
      : "/logo-black.svg";

  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;

      ScrollTrigger.create({
        start: "top top-=80",
        onUpdate: (self) => {
          if (self.direction === 1 && self.scroll() > 140) {
            gsap.to(nav, {
              yPercent: -100,
              duration: 0.3,
              ease: "power2.out",
              overwrite: true,
            });
          } else {
            gsap.to(nav, {
              yPercent: 0,
              duration: 0.3,
              ease: "power2.out",
              overwrite: true,
            });
          }
        },
      });

      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        linksRef.current?.querySelectorAll("a, span.nav-trigger") ?? [],
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: "power2.out" }
      );
      tl.fromTo(
        ctaRef.current,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
        "-=0.25"
      );
    },
    { scope: navRef }
  );

  // Hide Navbar in the Admin dashboard
  if (pathname?.startsWith("/employees")) {
    return null;
  }

  return (
    <header
      ref={navRef}
      className={`navbar-header ${
        isDarkHero ? "nav-dark-hero" : isScrolled ? "nav-scrolled" : "nav-standard"
      }`}
      aria-label="Main Navigation"
    >
      <div
        className="section-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "18px",
          paddingBottom: "18px",
          width: "100%",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          ref={logoRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          <Image
            src={logoSrc}
            alt="Niena Labs Logo"
            width={26}
            height={26}
            priority
          />
          <span
            className="logo-text"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "17px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              transition: "color 200ms ease",
            }}
          >
            Niena Labs
          </span>
        </Link>

        {/* Nav Links */}
        <div
          ref={linksRef}
          className="desktop-nav-links"
          style={{ display: "flex", gap: "32px", alignItems: "center" }}
        >
          {/* Environments Mega Menu */}
          <div
            onMouseEnter={() => setIsEnvironmentsOpen(true)}
            onMouseLeave={() => setIsEnvironmentsOpen(false)}
            style={{
              padding: "20px 0",
              margin: "-20px 0",
              display: "flex",
              alignItems: "center",
              position: "static",
            }}
          >
            <span
              className={`nav-link nav-trigger ${isEnvironmentsOpen ? "active" : ""}`}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              Industries
              <ChevronDown
                size={14}
                style={{
                  transform: isEnvironmentsOpen ? "rotate(180deg)" : "none",
                  transition: "transform 200ms ease",
                }}
              />
            </span>

            {/* Mega Menu Dropdown */}
            <div
              className="absolute left-0 w-full"
              style={{
                top: "100%",
                background: "var(--md-sys-color-surface-container, var(--color-surface))",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderTop: "1px solid var(--color-border)",
                borderBottom: "1px solid var(--color-border)",
                opacity: isEnvironmentsOpen ? 1 : 0,
                visibility: isEnvironmentsOpen ? "visible" : "hidden",
                transition: "opacity 200ms ease, visibility 200ms ease",
                boxShadow: "0 24px 48px rgba(0,0,0,0.35)", /* taste-skill-ignore */
              }}
            >
              <div
                className="section-container"
                style={{ padding: "36px var(--space-8)" }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "32px",
                  }}
                >
                  {environmentsData.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setIsEnvironmentsOpen(false)}
                      style={{
                        display: "flex",
                        gap: "20px",
                        alignItems: "flex-start",
                        textDecoration: "none",
                        cursor: "pointer",
                        padding: "12px",
                        borderRadius: "var(--radius-lg)",
                        transition: "background-color 150ms ease",
                      }}
                      className="group hover:bg-[var(--md-sys-color-surface-container-high)]"
                    >
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "var(--radius-xl)",
                          backgroundColor: `var(--color-alt-${item.dynamicColor})`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          transition: "transform 200ms ease",
                        }}
                        className="group-hover:scale-105"
                      >
                        <item.icon size={22} color="#ffffff" />
                      </div>

                      <div>
                        <h4
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "var(--color-fg)",
                            marginBottom: "6px",
                            marginTop: 0,
                          }}
                        >
                          {item.title}
                        </h4>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: 1.5,
                            color: "var(--color-fg-muted)",
                            marginBottom: "10px",
                          }}
                        >
                          {item.description}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "8px",
                            rowGap: "4px",
                          }}
                        >
                          {item.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              style={{
                                fontSize: "10px",
                                fontWeight: 600,
                                color: "var(--color-fg-subtle)",
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {tag}
                              {tIdx < item.tags.length - 1 && (
                                <span
                                  style={{
                                    margin: "0 6px",
                                    width: "3px",
                                    height: "3px",
                                    borderRadius: "50%",
                                    backgroundColor: "var(--border)",
                                  }}
                                />
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link href="/#capabilities" className="nav-link">
            Capabilities
          </Link>
          <Link href="/products" className="nav-link">
            Products
          </Link>
          <a
            href="https://github.com/orgs/Nienalabs-community/repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
          >
            Open Source <ArrowUpRight size={12} />
          </a>
          <Link href="/blog" className="nav-link">
            Research & Blog
          </Link>
        </div>

        {/* Right — GitHub + Theme + Deploy CTA */}
        <div
          ref={ctaRef}
          className="cta-container"
          style={{ display: "flex", alignItems: "center", gap: "14px" }}
        >
          {/* GitHub Community Link */}
          <a
            href="https://github.com/orgs/Nienalabs-community/repositories"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Niena Labs GitHub Community"
            title="Niena Labs Open Source Community"
            className="mobile-hidden nav-meta-btn"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "var(--radius-full, 9999px)",
              backgroundColor: "transparent",
              border: "1px solid",
              cursor: "pointer",
              transition:
                "color 200ms ease, border-color 200ms ease, transform 150ms ease",
              lineHeight: 1,
            }}
          >
            <GitHubIcon />
          </a>

          <ThemeToggle />

          <Link
            href="/#contact"
            className="btn-primary"
            style={{
              padding: "10px 22px",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              borderRadius: "var(--radius-full)",
              textTransform: "uppercase",
            }}
          >
            Contact Us
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav-links { display: none !important; }
          .mobile-hidden { display: none !important; }
          .cta-container { gap: 10px !important; }
          .logo-text { font-size: 14px !important; letter-spacing: 0.12em !important; }
        }
        @media (max-width: 480px) {
          .logo-text { font-size: 13px !important; }
        }
        @media (max-width: 360px) {
          .logo-text { display: none !important; }
        }
      `}</style>
    </header>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ width: 36, height: 36 }} />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle Theme"
      className="nav-meta-btn"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "var(--radius-full, 9999px)",
        backgroundColor: "transparent",
        border: "1px solid",
        cursor: "pointer",
        transition:
          "color 200ms ease, border-color 200ms ease, transform 150ms ease",
      }}
    >
      {isDark ? (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
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
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
