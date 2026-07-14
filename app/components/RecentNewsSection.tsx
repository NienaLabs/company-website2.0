"use client";

import Link from "next/link";

// ── News items (carousel commented out — only startup competition is live) ──
// const newsItems = [
//   {
//     id: 1,
//     date: "July 2026",
//     title: "Nienalabs joins the moorle startup competition",
//     description:
//       "We are proud to announce our participation in the prestigious Moorle Startup Competition, bringing our vision of enterprise-scale architecture to a global stage.",
//     image:
//       "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
//     link: "#",
//   },
//   {
//     id: 2,
//     date: "Summer 2026",
//     title: "We'll be hosting an online summer bootcamp",
//     description:
//       "An intensive online program designed to forge the next generation of engineers. Building scalable systems is not just theory—it is rigorous practice.",
//     image:
//       "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80",
//     link: "#",
//   },
//   {
//     id: 3,
//     date: "Coming Soon",
//     title: "Our new Ecommerce platform",
//     description:
//       "Currently in the works: a platform engineered to redefine how people order things. Built for uncompromising scale and precision.",
//     image:
//       "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80",
//     link: "#",
//   },
// ];

export default function RecentNewsSection() {
  // ── Carousel hooks (commented out along with carousel) ──
  // const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
  //   Autoplay({ delay: 5000, stopOnInteraction: true }),
  // ]);
  // const [selectedIndex, setSelectedIndex] = useState(0);
  // const [isReady, setIsReady] = useState(false);
  // useEffect(() => { ... }, []);
  // const scrollPrev = useCallback(() => { if (emblaApi) emblaApi.scrollPrev(); }, [emblaApi]);
  // const scrollNext = useCallback(() => { if (emblaApi) emblaApi.scrollNext(); }, [emblaApi]);
  // const scrollTo = useCallback((index: number) => { if (emblaApi) emblaApi.scrollTo(index); }, [emblaApi]);
  // const onSelect = useCallback(() => { if (!emblaApi) return; setSelectedIndex(emblaApi.selectedScrollSnap()); }, [emblaApi, setSelectedIndex]);
  // useEffect(() => { if (!emblaApi) return; onSelect(); emblaApi.on("select", onSelect); emblaApi.on("reInit", onSelect); }, [emblaApi, onSelect]);

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
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                color: "var(--amber)",
                textTransform: "uppercase",
                marginBottom: "var(--space-3)",
              }}
            >
              July 2026
            </div>
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

          {/* Vote CTA — desktop */}
          <Link
            href="https://startup.moolre.com"
            target="_blank"
            rel="noopener noreferrer"
            className="vote-cta-btn"
          >
            🗳️ Vote for Us
          </Link>
        </div>

        {/* ── Startup Competition Card ─────────────────────────────────── */}
        <div className="competition-card">
          {/* YouTube iframe */}
          <div className="competition-video-area">
            <iframe
              src="https://www.youtube.com/embed/3U9qoDYStJc"
              title="Nienalabs — Moorle Startup Competition"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </div>

          {/* Text panel */}
          <div className="competition-text-area">
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
              Live Now
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
              Nienalabs joins the Moorle Startup Competition
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "16px",
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                marginBottom: "var(--space-6)",
                maxWidth: "480px",
              }}
            >
              We are proud to be competing in the prestigious Moorle Startup
              Competition. Watch our pitch and support us by casting your vote 
              every vote counts as we bring enterprise-scale architecture to a
              global stage.
            </p>

            <Link
              href="https://startup.moolre.com"
              target="_blank"
              rel="noopener noreferrer"
              className="vote-primary-btn"
            >
              🗳️&nbsp; Vote for Nienalabs
            </Link>
          </div>
        </div>

        {/* ── Embla Carousel (commented out) ─────────────────────────── */}
        {/*
        <div className="embla" ref={isReady ? emblaRef : null} style={{ overflow: "hidden" }}>
          <div className="embla__container" style={{ display: "flex" }}>
            {newsItems.map((item) => (
              <div
                className="embla__slide"
                key={item.id}
                style={{ flex: "0 0 100%", minWidth: 0, paddingRight: "1px" }}
              >
                <div className="news-card-layout">
                  <div className="news-image-area">
                    <Image src={item.image} alt={item.title} fill style={{ objectFit: "cover", filter: "sepia(20%) brightness(0.65)" }} />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(12,13,16,0.4)" }} />
                  </div>
                  <div className="news-text-area">
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", color: "var(--amber)", textTransform: "uppercase", marginBottom: "var(--space-4)" }}>
                      {item.date}
                    </div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(26px, 4vw, 38px)", color: "var(--text-primary)", lineHeight: 1.15, marginBottom: "var(--space-4)" }}>
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "var(--space-6)", maxWidth: "540px" }}>
                      {item.description}
                    </p>
                    <Link href={item.link} className="news-read-link">Read Full Story</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "var(--space-6)" }}>
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
        */}
      </div>

      <style>{`
        /* ── Competition Card ────────────────────────────────────────── */
        .competition-card {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-cell);
          overflow: hidden;
        }
        .competition-video-area {
          position: relative;
          padding-top: 56.25%; /* 16:9 */
          background: #000;
        }
        .competition-text-area {
          padding: var(--space-8) var(--space-7);
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-left: 1px solid rgba(255,255,255,0.08);
        }

        /* ── Vote primary button ────────────────────────────────────── */
        .vote-primary-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--amber);
          color: #0c0d10;
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 14px 32px;
          border-radius: var(--radius-btn);
          text-decoration: none;
          transition: opacity 200ms ease, transform 200ms ease;
          align-self: flex-start;
        }
        .vote-primary-btn:hover {
          opacity: 0.85;
          transform: translateY(-2px);
        }

        /* ── Vote CTA header button ─────────────────────────────────── */
        .vote-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1px solid var(--amber);
          color: var(--amber);
          font-family: var(--font-display);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 10px 24px;
          border-radius: var(--radius-btn);
          text-decoration: none;
          transition: background 200ms ease, color 200ms ease;
          white-space: nowrap;
        }
        .vote-cta-btn:hover {
          background: var(--amber);
          color: #0c0d10;
        }

        /* ── Legacy carousel styles (kept for reference) ────────────── */
        /* .news-card-layout { ... } */
        /* .news-image-area { ... } */
        /* .news-text-area { ... } */
        /* .news-read-link { ... } */
        /* .carousel-arrow-btn { ... } */
        /* .carousel-dot { ... } */

        /* ── Mobile ────────────────────────────────────────────────── */
        @media (max-width: 768px) {
          .competition-card {
            grid-template-columns: 1fr !important;
          }
          .competition-text-area {
            padding: var(--space-6) !important;
            border-left: none !important;
            border-top: 1px solid rgba(255,255,255,0.08) !important;
          }
          .vote-cta-btn {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
