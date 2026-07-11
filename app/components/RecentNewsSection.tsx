"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const newsItems = [
  {
    id: 1,
    date: "July 2026",
    title: "Nienalabs joins the moorle startup competition",
    description:
      "We are proud to announce our participation in the prestigious Moorle Startup Competition, bringing our vision of enterprise-scale architecture to a global stage.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
    link: "#",
  },
  {
    id: 2,
    date: "Summer 2026",
    title: "We'll be hosting an online summer bootcamp",
    description:
      "An intensive online program designed to forge the next generation of engineers. Building scalable systems is not just theory—it is rigorous practice.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80",
    link: "#",
  },
  {
    id: 3,
    date: "Coming Soon",
    title: "Our new Ecommerce platform",
    description:
      "Currently in the works: a platform engineered to redefine how people order things. Built for uncompromising scale and precision.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80",
    link: "#",
  },
];

const AUTO_PLAY_MS = 5000;

export default function RecentNewsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef(false);

  // ── Scroll to a slide by index ───────────────────────────────────────────
  // We use track.scrollTo() NOT scrollIntoView().
  // scrollIntoView() scrolls EVERY ancestor (including the page) to bring the
  // element into view — that's why the page was jumping to the news section.
  // track.scrollTo() only moves the track's own scrollLeft and never touches
  // the page's vertical scroll position.
  const goToSlide = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;

    activeIndexRef.current = index;
    track.scrollTo({
      left: index * track.clientWidth,
      behavior: "smooth",
    });
  }, []);

  // ── Dot highlight (pure DOM, no GSAP) ──
  const updateDots = useCallback((index: number) => {
    dotsRef.current.forEach((dot, i) => {
      if (!dot) return;
      if (i === index) {
        dot.style.backgroundColor = "var(--amber)";
        dot.style.transform = "scaleX(1.3)";
        dot.setAttribute("aria-current", "true");
      } else {
        dot.style.backgroundColor = "var(--surface-2)";
        dot.style.transform = "scaleX(1)";
        dot.removeAttribute("aria-current");
      }
    });
  }, []);

  // ── Auto-play: setInterval, not GSAP.delayedCall ──
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (isPausedRef.current) return;
      const next = (activeIndexRef.current + 1) % newsItems.length;
      goToSlide(next);
    }, AUTO_PLAY_MS);
  }, [goToSlide]);

  const handlePrev = useCallback(() => {
    const prev =
      activeIndexRef.current === 0
        ? newsItems.length - 1
        : activeIndexRef.current - 1;
    goToSlide(prev);
    startTimer(); // reset auto-play on manual nav
  }, [goToSlide, startTimer]);

  const handleNext = useCallback(() => {
    const next = (activeIndexRef.current + 1) % newsItems.length;
    goToSlide(next);
    startTimer();
  }, [goToSlide, startTimer]);

  const handleDotClick = useCallback(
    (i: number) => {
      goToSlide(i);
      startTimer();
    },
    [goToSlide, startTimer]
  );

  // ── IntersectionObserver: detect which slide is in view → update dots ──
  // This replaces GSAP's onUpdate callbacks with a passive, compositor-safe API.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const index = Array.from(track.children).indexOf(
              entry.target as HTMLElement
            );
            if (index !== -1) {
              activeIndexRef.current = index;
              updateDots(index);
            }
          }
        }
      },
      {
        root: track,
        threshold: 0.5,
      }
    );

    Array.from(track.children).forEach((slide) => observer.observe(slide));

    // Initialise first dot
    updateDots(0);

    // Kick off auto-play
    startTimer();

    return () => {
      observer.disconnect();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [updateDots, startTimer]);

  return (
    <section
      className="mt-20"
      style={{
        background: "var(--bg)",
        padding: "var(--space-11) 0",
      }}
    >
      <div
        className="section-container"
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 var(--space-6)" }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "var(--space-8)",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(32px, 5vw, 48px)",
                color: "var(--text-primary)",
                lineHeight: 1.1,
              }}
            >
              Announcements &amp; Updates
            </h2>
          </div>

          {/* Arrow controls — desktop */}
          <div className="carousel-controls" style={{ display: "flex", gap: "12px" }}>
            <button
              aria-label="Previous slide"
              onClick={handlePrev}
              onMouseEnter={() => { isPausedRef.current = true; }}
              onMouseLeave={() => { isPausedRef.current = false; }}
              className="carousel-arrow-btn"
            >
              <ChevronLeft size={20} strokeWidth={1} />
            </button>
            <button
              aria-label="Next slide"
              onClick={handleNext}
              onMouseEnter={() => { isPausedRef.current = true; }}
              onMouseLeave={() => { isPausedRef.current = false; }}
              className="carousel-arrow-btn"
            >
              <ChevronRight size={20} strokeWidth={1} />
            </button>
          </div>
        </div>

        {/* ── CSS Scroll-Snap Track ─────────────────────────────────────────── */}
        {/*
          The overflow container hides the other slides.
          scroll-snap-type: x mandatory makes the browser snap between slides.
          All movement happens in the compositor thread — zero JS animation.
        */}
        <div
          ref={trackRef}
          className="news-track"
          onMouseEnter={() => { isPausedRef.current = true; }}
          onMouseLeave={() => { isPausedRef.current = false; }}
        >
          {newsItems.map((item) => (
            <div key={item.id} className="news-slide">
              <div className="news-card-layout">
                {/* Image */}
                <div className="news-image-area">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    style={{ objectFit: "cover", filter: "sepia(20%) brightness(0.65)" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(12,13,16,0.4)",
                    }}
                  />
                </div>

                {/* Text */}
                <div className="news-text-area">
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "11px", fontWeight: 600,
                      letterSpacing: "0.06em",
                      color: "var(--amber)",
                      textTransform: "uppercase",
                      marginBottom: "var(--space-4)",
                    }}
                  >
                    {item.date}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: "clamp(26px, 4vw, 38px)",
                      color: "var(--text-primary)",
                      lineHeight: 1.15,
                      marginBottom: "var(--space-4)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "16px",
                      color: "var(--text-secondary)",
                      lineHeight: 1.8,
                      marginBottom: "var(--space-6)",
                      maxWidth: "540px",
                    }}
                  >
                    {item.description}
                  </p>
                  <Link
                    href={item.link}
                    className="news-read-link"
                  >
                    Read Full Story
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginTop: "var(--space-6)",
          }}
        >
          {newsItems.map((_, i) => (
            <button
              key={i}
              ref={(el) => { dotsRef.current[i] = el; }}
              onClick={() => handleDotClick(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="carousel-dot"
            />
          ))}
        </div>
      </div>

      <style>{`
        /* ── Scroll-snap track ─────────────────────────────────────── */
        .news-track {
          display: flex;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          /* scroll-behavior: smooth handled by scrollIntoView() call in JS */
          scrollbar-width: none;
          -ms-overflow-style: none;
          border-radius: var(--radius-cell);
          /* GPU compositing layer */
          will-change: scroll-position;
          transform: translateZ(0);
          /*
            CRITICAL: contain horizontal overscroll so that swiping left/right
            inside the carousel does NOT bubble up to the page's vertical
            scroll — this was causing the hero-to-work snap on mobile.
          */
          overscroll-behavior-x: contain;
          /*
            Tell the browser this element handles horizontal touch panning.
            This keeps swipe recognition in the compositor thread and prevents
            Lenis / the page scroll handler from stealing the gesture.
          */
          touch-action: pan-x;
        }
        .news-track::-webkit-scrollbar { display: none; }

        /* Each slide fills the track's visible width and snaps */
        .news-slide {
          flex: 0 0 100%;
          width: 100%;
          scroll-snap-align: start;
          scroll-snap-stop: always;
        }

        /* ── Card Layout ────────────────────────────────────────────── */
        .news-card-layout {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-cell);
          overflow: hidden;
        }
        .news-image-area {
          position: relative;
          min-height: 400px;
        }
        .news-text-area {
          padding: var(--space-8) var(--space-7);
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-left: 1px solid rgba(255,255,255,0.08);
        }

        /* ── Read link ─────────────────────────────────────────────── */
        .news-read-link {
          display: inline-block;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 10px 24px;
          border-radius: var(--radius-btn);
          cursor: pointer;
          text-decoration: none;
          transition: border-color 200ms ease, color 200ms ease;
        }
        .news-read-link:hover {
          border-color: var(--amber);
          color: var(--amber);
        }

        /* ── Arrow buttons ─────────────────────────────────────────── */
        .carousel-arrow-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-btn);
          color: var(--text-secondary);
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 200ms ease, color 200ms ease;
        }
        .carousel-arrow-btn:hover {
          border-color: rgba(255,255,255,0.3);
          color: var(--text-primary);
        }

        /* ── Dot indicators ────────────────────────────────────────── */
        .carousel-dot {
          width: 48px;
          height: 2px;
          background: var(--surface-2);
          border: none;
          cursor: pointer;
          transform-origin: center;
          transition: background-color 300ms ease, transform 300ms ease;
        }

        /* ── Mobile ────────────────────────────────────────────────── */
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
            border-top: 1px solid rgba(255,255,255,0.08) !important;
          }
          .carousel-controls {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
