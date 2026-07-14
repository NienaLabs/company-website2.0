"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

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

export default function RecentNewsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Defer initialization to avoid synchronous layout reads (offsetWidth) during initial render
    const idleCallback = (window as any).requestIdleCallback || setTimeout;
    const handle = idleCallback(() => setIsReady(true), { timeout: 2000 });
    return () => {
      if ((window as any).cancelIdleCallback) {
        (window as any).cancelIdleCallback(handle);
      } else {
        clearTimeout(handle);
      }
    };
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

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
              onClick={scrollPrev}
              className="carousel-arrow-btn"
            >
              <ChevronLeft size={20} strokeWidth={1} />
            </button>
            <button
              aria-label="Next slide"
              onClick={scrollNext}
              className="carousel-arrow-btn"
            >
              <ChevronRight size={20} strokeWidth={1} />
            </button>
          </div>
        </div>

        {/* Embla Carousel Viewport */}
        <div className="embla" ref={isReady ? emblaRef : null} style={{ overflow: "hidden" }}>
          <div className="embla__container" style={{ display: "flex" }}>
            {newsItems.map((item) => (
              <div
                className="embla__slide"
                key={item.id}
                style={{
                  flex: "0 0 100%",
                  minWidth: 0,
                  paddingRight: "1px", // Small padding to prevent visual glitch on snap
                }}
              >
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
                        fontSize: "11px",
                        fontWeight: 600,
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
                    <Link href={item.link} className="news-read-link">
                      Read Full Story
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === selectedIndex ? "true" : undefined}
              className={`carousel-dot ${i === selectedIndex ? "is-selected" : ""}`}
            />
          ))}
        </div>
      </div>

      <style>{`
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
        .carousel-dot.is-selected {
          background: var(--amber);
          transform: scaleX(1.3);
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
