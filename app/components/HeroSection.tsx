"use client";

import { useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// 3x3 grid, read left-to-right / top-to-bottom. Index 4 is the center cell
// that fills the screen on load — it's now a looping video instead of a still image.
const GRID_IMAGES = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80", // 0 top-left    - office
  "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?auto=format&fit=crop&w=900&q=80", // 1 top-mid     - architecture
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80", // 2 top-right   - workspace
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80", // 3 mid-left    - architecture detail
  null, // 4 CENTER — handled separately as a video, see HERO_VIDEO_SRC below
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80", // 5 mid-right   - team
  "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=900&q=80", // 6 bottom-left - meeting
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80", // 7 bottom-mid  - collaboration
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80", // 8 bottom-right- business
];

// Center-cell video. Place hero.mp4 in /public and reference it as "/hero.mp4".
const HERO_VIDEO_SRC = "/hero.mp4";
// Optional poster shown before the video has enough data to paint a frame.
const HERO_VIDEO_POSTER =
  "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=1600&q=80";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<Array<HTMLDivElement | null>>([]);
  const textVeilRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const overlineRef = useRef<HTMLDivElement>(null);
  const headline1Ref = useRef<HTMLDivElement>(null);
  const headline2Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(gridRef.current, { scale: 1, clearProps: "transform" });
      gsap.set(textVeilRef.current, { opacity: 1 });
      gsap.set(wordmarkRef.current, { opacity: 0 });
      gsap.set(
        [
          overlineRef.current,
          ...(headline1Ref.current?.querySelectorAll(".word") ?? []),
          ...(headline2Ref.current?.querySelectorAll(".word") ?? []),
          subRef.current,
          ...(ctasRef.current?.querySelectorAll("a") ?? []),
        ],
        { opacity: 1, y: 0 }
      );
      return;
    }

    gsap.set(gridRef.current, { scale: 3, transformOrigin: "center center" });

    gsap.set(headline1Ref.current?.querySelectorAll(".word") ?? [], { y: 24, opacity: 0 });
    gsap.set(headline2Ref.current?.querySelectorAll(".word") ?? [], { y: 24, opacity: 0 });
    gsap.set(subRef.current, { y: 16, opacity: 0 });
    gsap.set(ctasRef.current?.querySelectorAll("a") ?? [], { y: 16, opacity: 0 });
    gsap.set(textVeilRef.current, { opacity: 0 });
    gsap.set(wordmarkRef.current, { opacity: 1 });

    const entrance = gsap.timeline({ delay: 0.2 });
    entrance
      .fromTo(
        overlineRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
      );

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=125%",
        scrub: 0.6,
        pin: pinRef.current,
        pinSpacing: true,
      },
    });

    scrollTl
      .to(
        gridRef.current,
        { scale: 1, duration: 1, ease: "power2.inOut" },
        0
      )
      .fromTo(
        wordmarkRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -16, duration: 0.5, ease: "power2.out" },
        0
      )
      .to(
        headline1Ref.current?.querySelectorAll(".word") ?? [],
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.04, ease: "power2.out" },
        0.15
      )
      .to(
        headline2Ref.current?.querySelectorAll(".word") ?? [],
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out" },
        0.35
      )
      .to(
        subRef.current,
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        0.65
      )
      .to(
        ctasRef.current?.querySelectorAll("a") ?? [],
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: "power2.out" },
        0.8
      )
      .to(
        textVeilRef.current,
        { opacity: 1, duration: 0.5, ease: "power2.out" },
        0.6
      );

    return () => {
      entrance.kill();
      scrollTl.kill();
    };
  }, { scope: sectionRef });

  const wrapWords = (text: string) =>
    text.split(" ").map((w, i) => (
      <span key={i} className="word" style={{ display: "inline-block", marginRight: "0.25em" }}>
        {w}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="arch-grid"
      style={{
        position: "relative",
        height: "225vh",
        background: "var(--color-void)",
      }}
    >
      <div
        ref={pinRef}
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "600px",
          overflow: "hidden",
        }}
      >
        <div
          ref={gridRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(3, 1fr)",
            gap: "6px",
            background: "var(--color-void)",
          }}
        >
          {GRID_IMAGES.map((src, i) => (
            <div
              key={i}
              ref={(el) => {
                cellRefs.current[i] = el;
              }}
              style={{
                position: "relative",
                overflow: "hidden",
                willChange: "transform, opacity",
              }}
            >
              {i === 4 ? (
                <video
                  src={HERO_VIDEO_SRC}
                  poster={HERO_VIDEO_POSTER}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : (
                <img
                  src={src as string}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              )}
              {/* Slim gold hairline so cells read as an intentional grid once revealed */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  boxShadow: "inset 0 0 0 0.5px rgba(201,168,76,0.18)",
                  pointerEvents: "none",
                }}
              />
            </div>
          ))}

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(60% 55% at 50% 46%, rgba(10,18,20,0.78) 0%, rgba(10,18,20,0.42) 55%, rgba(10,18,20,0.15) 100%)",
              pointerEvents: "none",
            }}
          />
        </div>

        <div
          ref={textVeilRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 4,
            background:
              "linear-gradient(180deg, rgba(6,10,12,0.15) 0%, rgba(6,10,12,0.55) 30%, rgba(6,10,12,0.72) 55%, rgba(6,10,12,0.55) 80%, rgba(6,10,12,0.2) 100%)",
            pointerEvents: "none",
          }}
        />

        <div
          ref={wordmarkRef}
          style={{
            position: "absolute",
            bottom: "32px",
            left: "32px",
            zIndex: 5,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            gap: "0 20px",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontWeight: 800,
              fontSize: "clamp(48px, 9vw, 128px)",
              lineHeight: 0.9,
              letterSpacing: "0.01em",
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(201,168,76,0.85)",
            } as CSSProperties}
          >
            Niena
          </span>
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontWeight: 800,
              fontSize: "clamp(48px, 9vw, 128px)",
              lineHeight: 0.9,
              letterSpacing: "0.01em",
              color: "rgba(201,168,76,0.9)",
            }}
          >
            Labs
          </span>
        </div>

        <div
          className="hero-text-wrapper"
          style={{
            position: "relative",
            zIndex: 5,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 var(--space-6)",
          }}
        >
          <div style={{ maxWidth: "820px" }}>
            <div
              ref={overlineRef}
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "9px",
                letterSpacing: "0.32em",
                color: "rgba(201,168,76,0.6)",
                textTransform: "uppercase",
                marginBottom: "24px",
                opacity: 0,
              }}
            >
              The world is a beautiful place, but we can still do more together
            </div>

            <div
              ref={headline1Ref}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(44px, 7vw, 72px)",
                lineHeight: 1.05,
                color: "var(--color-text-primary)",
                marginBottom: "8px",
              }}
            >
              {wrapWords("Every idea that matters")}
            </div>

            <div
              ref={headline2Ref}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(44px, 7vw, 72px)",
                lineHeight: 1.05,
                color: "rgba(232,223,200,0.55)",
                marginBottom: "36px",
              }}
            >
              {wrapWords("deserves the engineering to match.")}
            </div>

            <p
              ref={subRef}
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "18px",
                color: "var(--color-text-secondary)",
                maxWidth: "560px",
                margin: "0 auto 48px",
                lineHeight: 1.8,
              }}
            >
              We&apos;re a software company that builds scalable applications for businesses that intend to matter.
            </p>

            <div
              ref={ctasRef}
              style={{
                display: "flex",
                gap: "24px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a href="#contact" className="btn-primary">Build With Us</a>
              <a href="#work" className="btn-secondary">See Our Work</a>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-text-wrapper {
            padding-top: 100px !important;
          }
        }
        @media (max-width: 480px) {
          .hero-text-wrapper {
            padding-top: 90px !important;
          }
        }
      `}</style>
    </section>
  );
}