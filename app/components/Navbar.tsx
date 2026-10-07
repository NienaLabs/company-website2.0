"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from "next-themes";
import { Globe, Smartphone, Brain, Cloud, Monitor, ChevronDown, RefreshCw, Users, Compass } from "lucide-react";

import { Card } from './ui/Card';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const servicesData = [
  {
    title: "Enterprise Web",
    description: "End-to-end web platforms engineered to grow with your business, from 100 users to 10 million.",
    tags: ["SCALABLE ARCHITECTURE", "WEB PLATFORMS", "HIGH PERFORMANCE"],
    icon: Globe,
    dynamicColor: "2" as const
  },
  {
    title: "Mobile",
    description: "Cross-platform applications that feel native on every device, delivering performance users expect.",
    tags: ["IOS & ANDROID", "NATIVE PERFORMANCE", "CROSS-PLATFORM"],
    icon: Smartphone,
    dynamicColor: "1" as const
  },
  {
    title: "AI-Driven",
    description: "AI systems integrated at the architecture level, not afterthoughts, but load-bearing pillars.",
    tags: ["EMBEDDED INTELLIGENCE", "AI ARCHITECTURE", "MACHINE LEARNING"],
    icon: Brain,
    dynamicColor: "4" as const
  },
  {
    title: "Cloud",
    description: "Cloud architecture so reliable and invisible that your team only thinks about the product.",
    tags: ["CLOUD INFRASTRUCTURE", "RELIABILITY", "DEVOPS"],
    icon: Cloud,
    dynamicColor: "3" as const
  },
  {
    title: "Desktop",
    description: "High-performance desktop applications for professionals who demand more from their tools.",
    tags: ["HIGH PERFORMANCE", "NATIVE DESKTOP", "PROFESSIONAL TOOLS"],
    icon: Monitor,
    dynamicColor: "2" as const
  },
  {
    title: "Team augmentation",
    description: "Senior engineers embedded alongside your team.",
    tags: ["EMBEDDED ENGINEERS", "SENIOR TEAM EXTENSION", "FLEXIBLE SCALING", "DELIVERY SUPPORT"],
    icon: Users,
    dynamicColor: "4" as const
  },
  {
    title: "Consulting & advisory",
    description: "Audits, architecture reviews and technical guidance.",
    tags: ["TECHNICAL AUDITS", "ARCHITECTURE REVIEWS", "TECH CONSULTING", "WORKSHOPS & UPSKILLING"],
    icon: Compass,
    dynamicColor: "3" as const
  },
  {
    title: "App modernization & optimization",
    description: "Faster, healthier apps - upgrades, migrations and performance.",
    tags: ["PERFORMANCE OPTIMIZATION", "ARCHITECTURE MIGRATIONS", "BROWNFIELD INTEGRATION", "RN UPGRADES"],
    icon: RefreshCw,
    dynamicColor: "1" as const
  }
];

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
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  

  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const isLightMode = resolvedTheme === 'light';
  const currentLogo = "/logo-black.svg" 

  useGSAP(() => {
    const nav = navRef.current;
    if (!nav) return;

    ScrollTrigger.create({
      start: "top top-=" + 80,
      onUpdate: (self) => {
        if (self.direction === 1) {
          gsap.to(nav, { yPercent: -100, duration: 0.3, ease: "power2.out", overwrite: true });
        } else {
          gsap.to(nav, { yPercent: 0, duration: 0.3, ease: "power2.out", overwrite: true });
        }
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

  // Hide Navbar in the Admin dashboard
  if (pathname?.startsWith('/employees')) {
    return null;
  }

  return (
    <header
      ref={navRef}
      className="nav-scrolled"
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
    >      <div
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
          {/* Services with Mega Menu */}
          <div 
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
            style={{ padding: '20px 0', margin: '-20px 0', display: 'flex', alignItems: 'center', position: 'static' }}
          >
            <span 
              className={`nav-link ${isServicesOpen ? 'active' : ''}`}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              Services 
              <ChevronDown 
                size={14} 
                style={{ 
                  transform: isServicesOpen ? 'rotate(180deg)' : 'none', 
                  transition: 'transform 200ms ease' 
                }} 
              />
            </span>

            {/* Mega Menu Dropdown */}
            <div
              className="absolute left-0 w-full"
              style={{
                top: '100%',
                background: 'var(--surface)',
                borderTop: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                opacity: isServicesOpen ? 1 : 0,
                visibility: isServicesOpen ? 'visible' : 'hidden',
                transition: 'opacity 200ms ease, visibility 200ms ease',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
              }}
            >
              <div className="section-container" style={{ padding: '40px var(--space-8)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px' }}>
                  {servicesData.map((service, idx) => (
                    <a key={idx} href="#services" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', textDecoration: 'none', cursor: 'pointer' }} className="group">
                      {/* Icon Box */}
                      <Card 
                        variant="dynamic"
                        dynamicColor={service.dynamicColor}
                        className="w-14 h-14 shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:shadow-lg [&_.natural-card]:!p-0 [&_.natural-card]:items-center [&_.natural-card]:justify-center"
                      >
                        <service.icon size={24} color="#ffffff" />
                      </Card>
                      
                      {/* Content */}
                      <div>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, color: 'var(--color-fg)', marginBottom: '8px', marginTop: 0, transition: 'color 200ms ease' }}>
                          {service.title}
                        </h4>
                        <p style={{ fontSize: '14px', color: 'var(--color-fg-muted)', marginBottom: '16px' }}>
                          {service.description}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', rowGap: '4px' }}>
                          {service.tags.map((tag, tIdx) => (
                            <span key={tIdx} style={{ 
                              fontSize: '10px', 
                              fontWeight: 600, 
                              color: 'var(--color-fg-subtle)', 
                              letterSpacing: '0.05em',
                              textTransform: 'uppercase',
                              display: 'flex',
                              alignItems: 'center'
                            }}>
                              {tag}
                              {tIdx < service.tags.length - 1 && <span style={{ margin: '0 6px', width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'var(--border)' }}></span>}
                            </span>
                          ))}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link href="/products" className="nav-link">
            Products
          </Link>
          <Link href="/careers" className="nav-link">
            Careers
          </Link>
          <Link href="/blog" className="nav-link">
            Blog
          </Link>
        </div>

        {/* Right — GitHub + CTA */}
        <div ref={ctaRef} className="cta-container" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link href="/bootcamp/courses" className="nav-link mobile-hidden" style={{ fontSize: "13px", fontWeight: 600 }}>
            Bootcamp
          </Link>
          {/* GitHub Community Link */}
          <a
            href="https://github.com/orgs/Nienalabs-community/repositories"
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
        @media (max-width: 768px) {
          .desktop-nav-links { display: none !important; }
          .mobile-hidden { display: none !important; }
          .cta-container { gap: 12px !important; }
          .logo-text { font-size: 14px !important; letter-spacing: 0.15em !important; }
        }
        @media (max-width: 480px) {
          .logo-text { font-size: 12px !important; letter-spacing: 0.1em !important; }
          .call-btn { padding: 8px 12px !important; font-size: 8px !important; }
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
