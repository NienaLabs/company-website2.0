"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const newsItems = [
  {
    id: 1,
    date: "July 2026",
    title: "Nienalabs joins the moorle startup competition",
    description: "We are proud to announce our participation in the prestigious Moorle Startup Competition, bringing our vision of enterprise-scale architecture to a global stage.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
    link: "#",
  },
  {
    id: 2,
    date: "Summer 2026",
    title: "We'll be hosting an online summer bootcamp",
    description: "An intensive online program designed to forge the next generation of engineers. Building scalable systems is not just theory—it is rigorous practice.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80",
    link: "#",
  },
  {
    id: 3,
    date: "Coming Soon",
    title: "Our new Ecommerce platform",
    description: "Currently in the works: a platform engineered to redefine how people order things. Built for uncompromising scale and precision.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80",
    link: "#",
  },
];

const SLIDE_COUNT = newsItems.length;
const AUTO_PLAY_DELAY = 5; // seconds

export default function RecentNewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const autoPlayRef = useRef<gsap.core.Tween | null>(null);
  const isHoveredRef = useRef(false);

  // Navigate to a specific slide index — pure GSAP, zero React state
  const goToSlide = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const prevIndex = activeIndexRef.current;
    activeIndexRef.current = index;

    // Animate the track
    gsap.to(track, {
      xPercent: -index * 100,
      duration: 0.7,
      ease: "power3.out",
    });

    // Update dot indicators via direct DOM manipulation
    const prevDot = dotsRef.current[prevIndex];
    const nextDot = dotsRef.current[index];

    if (prevDot) {
      gsap.to(prevDot, {
        backgroundColor: "var(--color-slate-mid)",
        scaleX: 1,
        duration: 0.3,
        ease: "power1.out",
      });
    }
    if (nextDot) {
      gsap.to(nextDot, {
        backgroundColor: "var(--color-gold)",
        scaleX: 1.3,
        duration: 0.3,
        ease: "power1.out",
      });
    }
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((activeIndexRef.current + 1) % SLIDE_COUNT);
  }, [goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(activeIndexRef.current === 0 ? SLIDE_COUNT - 1 : activeIndexRef.current - 1);
  }, [goToSlide]);

  // Schedule the next auto-play tick
  const scheduleAutoPlay = useCallback(() => {
    // Kill any pending delayed call first
    if (autoPlayRef.current) {
      autoPlayRef.current.kill();
      autoPlayRef.current = null;
    }

    if (!isHoveredRef.current) {
      autoPlayRef.current = gsap.delayedCall(AUTO_PLAY_DELAY, () => {
        nextSlide();
        scheduleAutoPlay();
      });
    }
  }, [nextSlide]);

  const pauseAutoPlay = useCallback(() => {
    isHoveredRef.current = true;
    if (autoPlayRef.current) {
      autoPlayRef.current.kill();
      autoPlayRef.current = null;
    }
  }, []);

  const resumeAutoPlay = useCallback(() => {
    isHoveredRef.current = false;
    scheduleAutoPlay();
  }, [scheduleAutoPlay]);

  // Wrap navigation to also reset auto-play timer
  const handlePrev = useCallback(() => {
    prevSlide();
    scheduleAutoPlay();
  }, [prevSlide, scheduleAutoPlay]);

  const handleNext = useCallback(() => {
    nextSlide();
    scheduleAutoPlay();
  }, [nextSlide, scheduleAutoPlay]);

  const handleDotClick = useCallback((i: number) => {
    goToSlide(i);
    scheduleAutoPlay();
  }, [goToSlide, scheduleAutoPlay]);

  // Initialize: set first dot active + kick off auto-play
  useGSAP(() => {
    const firstDot = dotsRef.current[0];
    if (firstDot) {
      gsap.set(firstDot, {
        backgroundColor: "var(--color-gold)",
        scaleX: 1.3,
      });
    }

    scheduleAutoPlay();

    return () => {
      if (autoPlayRef.current) autoPlayRef.current.kill();
    };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--color-void)",
        padding: "var(--space-11) 0",
        borderTop: "1px solid var(--border-gold-faint)"
      }}
    >
      <div className="section-container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 var(--space-6)" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "var(--space-8)" }}>
          <div>
            <div className="overline" style={{ marginBottom: "12px", color: "var(--color-gold)" }}>Recent News</div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
              fontSize: "clamp(32px, 5vw, 48px)", color: "var(--color-text-primary)", lineHeight: 1.1,
            }}>
              Announcements &amp; Updates
            </h2>
          </div>

          {/* Controls - Desktop */}
          <div className="carousel-controls" style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={handlePrev}
              onMouseEnter={pauseAutoPlay}
              onMouseLeave={resumeAutoPlay}
              style={{
                background: "transparent",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-btn)",
                color: "var(--color-text-secondary)",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "var(--border-emphasis)";
                e.currentTarget.style.color = "var(--color-text-primary)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.color = "var(--color-text-secondary)";
              }}
            >
              <ChevronLeft size={20} strokeWidth={1} />
            </button>
            <button
              onClick={handleNext}
              onMouseEnter={pauseAutoPlay}
              onMouseLeave={resumeAutoPlay}
              style={{
                background: "transparent",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-btn)",
                color: "var(--color-text-secondary)",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "var(--border-emphasis)";
                e.currentTarget.style.color = "var(--color-text-primary)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.color = "var(--color-text-secondary)";
              }}
            >
              <ChevronRight size={20} strokeWidth={1} />
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div
          style={{ overflow: "hidden", borderRadius: "var(--radius-cell)" }}
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
        >
          <div
            ref={trackRef}
            style={{
              display: "flex",
              willChange: "transform",
            }}
          >
            {newsItems.map((item) => (
              <div
                key={item.id}
                style={{
                  flex: "0 0 100%",
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "1fr 1.2fr",
                  background: "var(--color-slate-deep)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-cell)",
                  overflow: "hidden",
                }}
                className="news-card-layout"
              >
                {/* Image Area */}
                <div style={{ position: "relative", minHeight: "400px" }} className="news-image-area">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    style={{ objectFit: "cover", filter: "sepia(20%) brightness(0.65)" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(10,18,20,0.4)" }} />
                </div>

                {/* Text Area */}
                <div style={{
                  padding: "var(--space-8) var(--space-7)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderLeft: "1px solid var(--border-subtle)"
                }} className="news-text-area">
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "0.14em",
                    color: "var(--color-gold)", textTransform: "uppercase", marginBottom: "var(--space-4)"
                  }}>
                    {item.date}
                  </div>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                    fontSize: "clamp(26px, 4vw, 38px)", color: "var(--color-text-primary)", lineHeight: 1.15, marginBottom: "var(--space-4)"
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontFamily: "'EB Garamond', serif", fontSize: "16px",
                    color: "var(--color-text-secondary)", lineHeight: 1.8, marginBottom: "var(--space-6)", maxWidth: "540px"
                  }}>
                    {item.description}
                  </p>

                  <div>
                    <Link href={item.link} style={{
                      display: "inline-block",
                      background: "transparent",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--color-text-secondary)",
                      fontFamily: "'Cinzel', serif",
                      fontSize: "10px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      padding: "10px 24px",
                      borderRadius: "var(--radius-btn)",
                      cursor: "pointer",
                      textDecoration: "none",
                      transition: "all 0.2s ease"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = "var(--color-gold)";
                      e.currentTarget.style.color = "var(--color-gold)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = "var(--border-subtle)";
                      e.currentTarget.style.color = "var(--color-text-secondary)";
                    }}
                    >
                      Read Full Story
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "var(--space-6)" }}>
          {newsItems.map((_, i) => (
            <button
              key={i}
              ref={(el) => { dotsRef.current[i] = el; }}
              onClick={() => handleDotClick(i)}
              style={{
                width: "48px",
                height: "2px",
                background: "var(--color-slate-mid)",
                border: "none",
                cursor: "pointer",
                transformOrigin: "center",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .news-card-layout {
            grid-template-columns: 1fr !important;
          }
          .news-image-area {
            min-height: 240px !important;
          }
          .news-text-area {
            padding: var(--space-6) !important;
            border-left: none !important;
            border-top: 1px solid var(--border-subtle) !important;
          }
          .carousel-controls {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
