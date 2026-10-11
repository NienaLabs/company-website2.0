"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Play, Pause, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PI = Math.PI;
const B = 0.19;
const K = Math.exp(2 * PI * B);
const N = 32;
const D = (2 * PI) / 9;
const T0 = 2 * PI;
const O = (t: number) => Math.exp(B * (t - T0)); // logarithmic spiral r = a·e^(bθ)
const P = (r: number, t: number): [number, number] => [r * Math.cos(t), r * Math.sin(t)];
const H0 = T0 + 15 * D;
const H1 = T0 + N * D;
const HS = T0 + 2 * D;
const PAL = [
  ["#c9c070", "#5c561a"],
  ["#5c561a", "#14130a"],
  ["#a89f3c", "#3e3a12"],
  ["#2f2c0e", "#0b0a04"],
  ["#e6dfa0", "#8f8629"],
  ["#6f6820", "#1b1a09"],
];

function getTile(i: number) {
  const [a, b] = PAL[i % 6];
  const ink = [0, 2, 4].includes(i % 6) ? "#1c1a08" : "#e0d994";
  let g = "";
  const t = i % 5;
  if (t === 0) {
    for (let k = 0; k < 7; k++) {
      const h = 60 + ((k * 37 + i * 53) % 130);
      g += `<rect x='${40 + k * 48}' y='${250 - h}' width='30' height='${h}' rx='6' fill='${ink}' opacity='.75'/>`;
    }
  } else if (t === 1) {
    let pts = "";
    for (let k = 0; k < 9; k++) {
      pts += `${30 + k * 42},${170 - 60 * Math.sin(k * 0.8 + i) - k * 8} `;
    }
    g = `<polyline points='${pts}' fill='none' stroke='${ink}' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/>`;
  } else if (t === 2) {
    for (let k = 0; k < 8; k++) {
      g += `<rect x='${40 + (k % 3) * 24}' y='${38 + k * 30}' width='${60 + ((k * 71 + i * 29) % 200)}' height='13' rx='6' fill='${ink}' opacity='.7'/>`;
    }
  } else if (t === 3) {
    g = `<circle cx='200' cy='150' r='80' fill='none' stroke='${ink}' stroke-opacity='.25' stroke-width='30'/><circle cx='200' cy='150' r='80' fill='none' stroke='${ink}' stroke-width='30' stroke-dasharray='${200 + i * 13} 600' stroke-linecap='round'/>`;
  } else if (t === 4) {
    for (let k = 0; k < 4; k++) {
      g += `<rect x='${40 + (k % 2) * 170}' y='${40 + (k >> 1) * 120}' width='150' height='100' rx='16' fill='${ink}' opacity='${0.18 + k * 0.14}'/>`;
    }
  }
  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient></defs><rect width='400' height='300' fill='url(#g)'/>${g}</svg>`
    )
  );
}

const septum = (t: number, u: number): [number, number] =>
  P(O(t) * Math.pow(1 / K, u), t - 0.6 * D * Math.sin(PI * u));

interface ChamberItem {
  i: number;
  a: number;
  clipId: string;
  id: string;
  d: string;
  tileHref: string;
  x: number;
  y: number;
  width: number;
  height: number;
  glossOpacity: string;
}

function buildChambers(): ChamberItem[] {
  const chambers: ChamberItem[] = [];
  for (let i = 0; i < N; i++) {
    const a = T0 + i * D;
    const b = a + D;
    const pts: [number, number][] = [];
    for (let k = 0; k <= 6; k++) {
      const t = a + (D * k) / 6;
      pts.push(P(O(t), t));
    }
    for (let k = 1; k <= 8; k++) {
      pts.push(septum(b, k / 8));
    }
    for (let k = 1; k <= 6; k++) {
      const t = b - (D * k) / 6;
      pts.push(P(O(t) / K, t));
    }
    for (let k = 7; k >= 1; k--) {
      pts.push(septum(a, k / 8));
    }
    const d = "M" + pts.map((p) => p[0].toFixed(4) + " " + p[1].toFixed(4)).join("L") + "Z";
    const xs = pts.map((p) => p[0]);
    const ys = pts.map((p) => p[1]);
    const x = Math.min(...xs);
    const y = Math.min(...ys);
    const width = Math.max(...xs) - x;
    const height = Math.max(...ys) - y;
    const glossOpacity = (0.2 + 0.8 * Math.max(0, Math.cos(a - 2.2))).toFixed(2);

    chambers.push({
      i,
      a,
      clipId: `hero-clip-${i}`,
      id: `hero-ch-${i}`,
      d,
      tileHref: getTile(i),
      x,
      y,
      width,
      height,
      glossOpacity,
    });
  }
  return chambers;
}

const CHAMBERS_DATA = buildChambers();
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export interface CarouselSlide {
  id: string;
  category: string;
  title: string;
  description: string;
  asset: {
    type: "image" | "video";
    src: string;
    poster?: string;
    alt: string;
  };
  link: string;
}

// Directly aligned with Niena Labs Capabilities:
// 1. AI-Driven Systems
// 2. Enterprise Web
// 3. Mobile Applications
// 4. Cloud Infrastructure
// 5. Desktop Applications
// 6. Developer Tools & Automation
const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: "ai-vision-factory",
    category: "AI-Driven Systems",
    title: "Computer Vision to Track Workflows & Factory Work",
    description:
      "Smart camera vision systems that monitor work in real time, catch product flaws immediately, and keep busy warehouse floors operating smoothly.",
    asset: {
      type: "image",
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80",
      alt: "Factory assembly line with automated inspection equipment",
    },
    link: "/services/ai",
  },
  {
    id: "ai-custom-models",
    category: "AI-Driven Systems",
    title: "Custom AI Models for Recommendations & Deep Research",
    description:
      "Tailored machine learning models that analyze your company data to power personalized recommendations, accelerate scientific research, and automate complex decisions.",
    asset: {
      type: "image",
      src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=80",
      alt: "Neural network intelligence flow representing custom trained AI models",
    },
    link: "/services/ai",
  },
  {
    id: "enterprise-web",
    category: "Enterprise Web",
    title: "Scalable Web Platforms Built for High-Traffic Growth",
    description:
      "Modern, secure web applications that stay fast under heavy traffic, connect your databases, and scale effortlessly as your business grows.",
    asset: {
      type: "image",
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
      alt: "Enterprise web software dashboard displaying real-time operations",
    },
    link: "/services/enterprise",
  },
  {
    id: "mobile-apps",
    category: "Mobile Applications",
    title: "Fast Mobile Apps for Customers & Field Teams",
    description:
      "Polished iOS and Android apps that feel instant to use, work reliably even with spotty connectivity, and keep your field team productive.",
    asset: {
      type: "image",
      src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80",
      alt: "Mobile application interface running on smartphone",
    },
    link: "/services/mobile",
  },
  {
    id: "cloud-infrastructure",
    category: "Cloud Infrastructure",
    title: "Reliable Cloud Systems Engineered for High Availability",
    description:
      "Automated cloud setups that safeguard your company data, manage traffic surges automatically, and keep your software online around the clock.",
    asset: {
      type: "image",
      src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
      alt: "Modern cloud server datacenter infrastructure with network indicator lights",
    },
    link: "/services/cloud",
  },
  {
    id: "desktop-apps",
    category: "Desktop Applications",
    title: "High-Performance Desktop Software for Power Users",
    description:
      "Native desktop tools for professionals who handle large datasets, complex workflows, and demanding compute tasks without lag.",
    asset: {
      type: "image",
      src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80",
      alt: "High performance workstation running technical computing software",
    },
    link: "/services/desktop",
  },
  {
    id: "developer-tools",
    category: "Developer Tools",
    title: "Custom Internal Tools That Multiply Team Productivity",
    description:
      "Tailored internal tools, automated workflows, and management consoles that eliminate repetitive tasks and help your staff get more done.",
    asset: {
      type: "image",
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
      alt: "Developer engineering environment and custom workflow tools",
    },
    link: "/services/devtools",
  },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const camRef = useRef<SVGGElement>(null);
  const wallRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const rimRef = useRef<SVGPathElement>(null);
  const chamberElsRef = useRef<Array<SVGGElement | null>>([]);
  const stRef = useRef({ intro: 1, p: 0 });

  // Carousel interactive state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Autoplay timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, currentIndex]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const togglePlay = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsPlaying((prev) => !prev);
  };

  const activeSlide = CAROUSEL_SLIDES[currentIndex];

  useGSAP(
    () => {
      const svg = svgRef.current;
      const cam = camRef.current;
      const wall = wallRef.current;
      const glow = glowRef.current;
      const rim = rimRef.current;
      const section = sectionRef.current;

      if (!svg || !cam || !wall || !glow || !rim || !section) return;

      const ease = gsap.parseEase("power2.inOut");
      const st = stRef.current;

      function render() {
        if (!svg || !cam || !wall || !glow || !rim) return;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const m = vw < 820;
        const pe = ease(st.p);
        const base = HS + (H0 - HS) * st.intro;
        const head = base + (H1 - H0) * pe;
        const R0 = m ? Math.min(vw * 0.4, vh * 0.27) : Math.min(vh * 0.4, vw * 0.23);
        const R1 = 0.58 * Math.hypot(vw, vh);
        const R = R0 * Math.pow(R1 / R0, pe);
        const s = R / O(head);
        const x0 = m ? vw / 2 : vw * 0.72;
        const y0 = m ? vh * 0.72 : vh * 0.52;
        const cx = x0 + (vw / 2 - x0) * pe;
        const cy = y0 + (vh / 2 - y0) * pe;
        const rot = -(1 - st.intro) * 70 - pe * 38;

        svg.setAttribute("viewBox", `0 0 ${vw} ${vh}`);
        cam.setAttribute("transform", `translate(${cx} ${cy}) rotate(${rot}) scale(${s})`);

        for (let i = 0; i < CHAMBERS_DATA.length; i++) {
          const c = CHAMBERS_DATA[i];
          const el = chamberElsRef.current[i];
          if (el) {
            const l = clamp((head - c.a) / (1.5 * D), 0, 1);
            const e = l * l * (3 - 2 * l);
            el.setAttribute("opacity", e.toFixed(4));
            el.setAttribute("transform", `scale(${(0.88 + 0.12 * e).toFixed(4)})`);
          }
        }

        let d = "";
        let r2 = "";
        for (let t = T0; t < head; t += 0.12) {
          const p = P(O(t), t);
          const q = P(O(t) * 0.93, t);
          d += (d ? "L" : "M") + p[0].toFixed(3) + " " + p[1].toFixed(3);
          r2 += (r2 ? "L" : "M") + q[0].toFixed(3) + " " + q[1].toFixed(3);
        }
        const qHead = P(O(head), head);
        d += "L" + qHead[0].toFixed(3) + " " + qHead[1].toFixed(3);

        wall.setAttribute("d", d);
        glow.setAttribute("d", d);
        rim.setAttribute("d", r2);
      }

      window.addEventListener("resize", render, { passive: true });
      render();

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        st.intro = 1;
        st.p = 0.5;
        render();
        gsap.set(".hero-k0", { opacity: 1, y: 0 });
        gsap.set(".hero-carousel-container", { opacity: 1, x: 0, pointerEvents: "auto" });
        gsap.set(".hero-carousel-card", { opacity: 1, y: 0, scale: 1 });
        gsap.set(".hero-final .hero-k", { opacity: 1, y: 0 });
        gsap.set(".hero-stat", { opacity: 1 });
        return () => {
          window.removeEventListener("resize", render);
        };
      }

      // Initial entrance reveal for carousel card and tagline
      gsap.fromTo(
        ".hero-carousel-card",
        { opacity: 0, y: 28, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out", delay: 0.15 }
      );
      gsap.fromTo(
        ".hero-tagline-left",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.35 }
      );

      // Scroll-driven growth timeline pinned for 450% scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=450%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          onRefresh: render,
          onUpdate: (self) => {
            const container = section.querySelector<HTMLElement>(".hero-carousel-container");
            if (container) {
              container.style.pointerEvents = self.progress > 0.08 ? "none" : "auto";
            }
          },
          onLeaveBack: () => {
            gsap.set(
              [".hero-carousel-container", ".hero-quote-top-right", ".hero-brand-bottom-right"],
              { opacity: 1, x: 0, filter: "none", clearProps: "filter" }
            );
            const container = section.querySelector<HTMLElement>(".hero-carousel-container");
            if (container) container.style.pointerEvents = "auto";
          },
        },
      });

      tl.to(st, { p: 1, duration: 10, ease: "none", onUpdate: render }, 0)
        .to(
          [".hero-carousel-container", ".hero-quote-top-right", ".hero-brand-bottom-right"],
          {
            x: -70,
            opacity: 0,
            filter: "blur(12px)",
            duration: 2.2,
            ease: "power2.out",
            stagger: 0.05,
          },
          0
        )
        .to(".hero-glare", { opacity: 0.45, duration: 6, ease: "none" }, 0)
        .to(".hero-scrim", { opacity: 1, duration: 2.2, ease: "power1.inOut" }, 5)
        .fromTo(
          ".hero-final .hero-k",
          { y: 46, opacity: 0, filter: "blur(14px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, stagger: 0.45, ease: "power3.out" },
          5.6
        )
        .fromTo(
          ".hero-stat",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.3 },
          8.4
        );

      return () => {
        window.removeEventListener("resize", render);
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="hero" className="hero-stage">
      {/* Logarithmic Spiral SVG Background */}
      <svg ref={svgRef} id="spiral" className="hero-spiral" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fffbe0" stopOpacity="0.4" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="gloss" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.3" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fffbe0" stopOpacity="0.75" />
            <stop offset="0.7" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#fff" stopOpacity="0.12" />
          </linearGradient>
          <g id="clips">
            {CHAMBERS_DATA.map((c) => (
              <clipPath id={c.clipId} key={c.clipId}>
                <path d={c.d} />
              </clipPath>
            ))}
          </g>
        </defs>
        <g ref={camRef} id="cam">
          <g id="chambers">
            {CHAMBERS_DATA.map((c, i) => (
              <g
                key={c.id}
                id={c.id}
                ref={(el) => {
                  chamberElsRef.current[i] = el;
                }}
                opacity="0"
              >
                <g clipPath={`url(#${c.clipId})`}>
                  <image
                    href={c.tileHref}
                    x={c.x}
                    y={c.y}
                    width={c.width}
                    height={c.height}
                    preserveAspectRatio="xMidYMid slice"
                  />
                </g>
                <path d={c.d} fill="url(#sheen)" />
                <path d={c.d} fill="url(#gloss)" opacity={c.glossOpacity} />
                <path
                  d={c.d}
                  fill="none"
                  stroke="#070705"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d={c.d}
                  fill="none"
                  stroke="#e6dfa0"
                  strokeOpacity="0.35"
                  strokeWidth="0.8"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            ))}
          </g>
          <path
            ref={rimRef}
            id="rim"
            fill="none"
            stroke="#fffbe0"
            strokeOpacity="0.55"
            strokeWidth="5"
            strokeDasharray="140 90 30 70 220 110"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            ref={glowRef}
            id="glow"
            fill="none"
            stroke="#8f8629"
            strokeOpacity="0.45"
            strokeWidth="10"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            ref={wallRef}
            id="wall"
            fill="none"
            stroke="#d9d08a"
            strokeWidth="2.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>

      <div className="hero-glare" />

      {/* Top Right: "There's always a beginning" Pure Text */}
      <div className="hero-quote-top-right hero-k0">
        <p className="hero-quote-text">&ldquo;There&rsquo;s always a beginning&rdquo;</p>
      </div>

      {/* Bottom Right: Niena Labs Branding */}
      <div className="hero-brand-bottom-right hero-k0">
        <h1 className="hero-heading">
          <span className="hero-out">Niena</span> <span>Labs</span>
        </h1>
      </div>

      {/* Left/Center Stage: Compact, Client-Focused Capabilities Carousel */}
      <div className="hero-carousel-container" aria-label="Capabilities Showcase Carousel">
        <div className="hero-carousel-card">
          {/* Asset Media Frame (supports both image and video) */}
          <div className="hero-carousel-media-box">
            {activeSlide.asset.type === "video" ? (
              <video
                key={activeSlide.id}
                src={activeSlide.asset.src}
                poster={activeSlide.asset.poster}
                autoPlay
                loop
                muted
                playsInline
                className="hero-carousel-media"
              />
            ) : (
              <img
                key={activeSlide.id}
                src={activeSlide.asset.src}
                alt={activeSlide.asset.alt}
                className="hero-carousel-media"
                loading="eager"
              />
            )}
            <div className="hero-carousel-media-gradient" />

            {/* Category Header in Dark Pill — High-contrast White Text, No Pulse */}
            <div key={`cat-${activeSlide.id}`} className="hero-carousel-header-pill">
              <span>{activeSlide.category}</span>
            </div>

            {/* Slide Index in Matching Dark Pill */}
            <div key={`counter-${activeSlide.id}`} className="hero-carousel-counter-pill">
              <span>{String(currentIndex + 1).padStart(2, "0")} / {String(CAROUSEL_SLIDES.length).padStart(2, "0")}</span>
            </div>
          </div>

          {/* Text and Actions Section */}
          <div className="hero-carousel-body">
            <h3 key={`title-${activeSlide.id}`} className="hero-carousel-title">
              {activeSlide.title}
            </h3>
            <p key={`desc-${activeSlide.id}`} className="hero-carousel-desc">
              {activeSlide.description}
            </p>

            <div className="hero-carousel-action-row">
              <Link key={`btn-${activeSlide.id}`} href={activeSlide.link} className="hero-carousel-learn-btn">
                <span>Learn More</span>
                <ArrowUpRight size={14} />
              </Link>

              {/* Controls Cluster: Arrows & Pause/Play */}
              <div className="hero-carousel-controls" role="group" aria-label="Carousel navigation controls">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="hero-ctrl-btn"
                  aria-label="Previous capability"
                  title="Previous capability"
                >
                  <ChevronLeft size={15} />
                </button>

                <button
                  type="button"
                  onClick={togglePlay}
                  className={`hero-ctrl-btn ${isPlaying ? "active" : ""}`}
                  aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
                  title={isPlaying ? "Pause autoplay" : "Start autoplay"}
                >
                  {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="hero-ctrl-btn"
                  aria-label="Next capability"
                  title="Next capability"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>

            {/* Autoplay Slide Progress Bars */}
            <div className="hero-carousel-progress-track">
              {CAROUSEL_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`hero-progress-pill ${idx === currentIndex ? "active" : ""}`}
                  aria-label={`Jump to slide ${idx + 1}`}
                >
                  <span
                    className={`hero-progress-fill ${
                      idx === currentIndex && isPlaying ? "animating" : ""
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tagline on the left below carousel */}
        <p className="hero-tagline-left">
          We build custom AI systems, Software Development, Embedded system softwares, cloud infrastructure, and developer tools.
        </p>
      </div>

      {/* Dark Scrim overlay during scroll expansion */}
      <div className="hero-scrim" />

      {/* Final Manifesto reveal on scroll */}
      <div className="hero-final">
        <h2 className="hero-k">
          The world is a better place <span>when we use technology to solve real problems.</span>
        </h2>
        <p className="hero-k">
          We contribute to human progress by empowering businesses and individuals with tools that make their lives easier by solving those problems.
        </p>
        <div className="hero-row hero-k">
          <a className="hero-btn solid" href="#contact">
            Build With Us
          </a>
        </div>
      </div>

      {/* Statistics indicators revealed in final scroll stage */}
      <div className="hero-stats">
        <div className="hero-stat">
          <b>Scalable</b>
          <span>built to grow with your business</span>
        </div>
        <div className="hero-stat">
          <b>Reliable</b>
          <span>engineered for the long run</span>
        </div>
        <div className="hero-stat">
          <b>Intentional</b>
          <span>made to matter</span>
        </div>
      </div>

      <style>{`
        .hero-stage {
          --sea: #0a0a0b;
          --deep: #050505;
          --pearl: #f4f1e2;
          --mute: #aaa78f;
          --o9: #2f2c0e;
          --o7: #5c561a;
          --o5: #8f8629;
          --o3: #cfc678;
          --line: rgba(244, 241, 226, 0.16);
          --display: var(--font-family-heading, "Space Grotesk", sans-serif);
          --body: var(--font-family-body, "Inter", sans-serif);
          --mono: var(--font-family-monospace, "IBM Plex Mono", monospace);

          position: relative;
          height: 100vh;
          height: 100svh;
          overflow: hidden;
          background: radial-gradient(70% 90% at 75% 20%, rgba(255, 255, 230, 0.08), transparent 60%),
                      linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, transparent 35%, rgba(0, 0, 0, 0.45) 100%),
                      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Cg fill='%2352501f' fill-opacity='0.4'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z' opacity='.5'%3E%3C/path%3E%3Cpath d='M15 15h50l-5 5H20v40l-5 5V15zm0 50h50V15L80 0v80H0l15-15zm32.07-32.07l3.54-3.54A15 15 0 0 1 29.4 50.6l3.53-3.53a10 10 0 1 0 14.14-14.14zM32.93 47.07a10 10 0 1 1 14.14-14.14L32.93 47.07z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E") 0 0/80px 80px #0a0a0b;
          color: var(--pearl);
          font-family: var(--body);
        }

        .hero-spiral {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .hero-glare {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          mix-blend-mode: screen;
          background: linear-gradient(115deg, rgba(245, 240, 190, 0.2) 0%, transparent 34%, transparent 62%, rgba(143, 134, 41, 0.18) 100%),
                      radial-gradient(40% 55% at 78% 30%, rgba(255, 252, 220, 0.16), transparent 70%);
        }

        /* Top Right Quotation - Pure refined typography without pills */
        .hero-quote-top-right {
          position: absolute;
          top: clamp(86px, 11vh, 102px);
          right: 5vw;
          z-index: 10;
          pointer-events: none;
        }

        .hero-quote-text {
          font-family: var(--display);
          font-weight: 500;
          font-size: clamp(15px, 1.35vw, 19px);
          color: var(--pearl);
          letter-spacing: 0.02em;
          opacity: 0.9;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
        }

        /* Bottom Right Brand Typography */
        .hero-brand-bottom-right {
          position: absolute;
          bottom: clamp(24px, 4.5vh, 42px);
          right: 5vw;
          z-index: 10;
          text-align: right;
          max-width: 440px;
          pointer-events: none;
        }

        .hero-heading {
          font-family: var(--display);
          font-weight: 700;
          font-size: clamp(38px, 5.5vw, 84px);
          line-height: 0.95;
          letter-spacing: -0.03em;
          margin-bottom: 10px;
        }

        .hero-heading .hero-out {
          color: transparent;
          -webkit-text-stroke: 1.5px var(--o3);
        }

        .hero-tagline-left {
          margin-top: 14px;
          font-family: var(--body);
          font-size: clamp(13px, 1.05vw, 15px);
          line-height: 1.5;
          color: var(--mute);
          max-width: 44ch;
          letter-spacing: 0.01em;
        }

        /* Left/Center Stage: Compact, Controlled-Height Carousel */
        .hero-carousel-container {
          position: absolute;
          left: 5vw;
          top: calc(50% + 24px);
          transform: translateY(-50%);
          width: min(500px, 42vw);
          max-height: calc(100vh - 140px);
          z-index: 25;
          pointer-events: auto;
          touch-action: pan-y;
        }

        .hero-carousel-card {
          background: rgba(14, 14, 16, 0.78);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(244, 241, 226, 0.16);
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 230, 0.12);
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          z-index: 26;
          pointer-events: auto;
          touch-action: pan-y;
        }

        .hero-carousel-card:hover {
          border-color: rgba(207, 198, 120, 0.35);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.65), 0 0 25px rgba(224, 209, 46, 0.1);
        }

        .hero-carousel-media-box {
          position: relative;
          width: 100%;
          height: clamp(140px, 18vh, 185px);
          overflow: hidden;
          background: #08080a;
        }

        .hero-carousel-media {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          animation: slideMediaIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes slideMediaIn {
          0% {
            opacity: 0;
            transform: scale(1.08);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
          }
        }

        .hero-carousel-media-gradient {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(10, 10, 11, 0.25) 0%, transparent 40%, rgba(14, 14, 16, 0.95) 100%);
        }

        /* Dark Pills with White Text and No Pulses */
        .hero-carousel-header-pill {
          position: absolute;
          top: 14px;
          left: 16px;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          padding: 6px 14px;
          background: rgba(8, 8, 10, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 999px;
          font-family: var(--mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #ffffff;
          text-transform: uppercase;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45);
          animation: pillFadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both;
        }

        .hero-carousel-counter-pill {
          position: absolute;
          top: 14px;
          right: 16px;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          padding: 6px 12px;
          background: rgba(8, 8, 10, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 999px;
          font-family: var(--mono);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45);
          animation: pillFadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both;
        }

        @keyframes pillFadeIn {
          0% {
            opacity: 0;
            transform: translateY(-8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-carousel-body {
          padding: 16px 20px 18px;
        }

        .hero-carousel-title {
          font-family: var(--display);
          font-weight: 600;
          font-size: clamp(17px, 1.5vw, 21px);
          line-height: 1.25;
          letter-spacing: -0.02em;
          color: var(--pearl);
          margin-bottom: 8px;
          animation: titleFadeIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.08s both;
        }

        @keyframes titleFadeIn {
          0% {
            opacity: 0;
            transform: translateY(12px);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }

        .hero-carousel-desc {
          font-size: clamp(12.5px, 0.95vw, 14px);
          line-height: 1.5;
          color: var(--mute);
          margin-bottom: 14px;
          animation: descFadeIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.16s both;
        }

        @keyframes descFadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-carousel-action-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 14px;
        }

        .hero-carousel-learn-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          background: var(--o9);
          color: var(--pearl);
          border: 1px solid var(--o5);
          border-radius: 999px;
          font-family: var(--body);
          font-weight: 500;
          font-size: 13px;
          letter-spacing: 0.01em;
          text-decoration: none;
          box-shadow: inset 0 1px 0 rgba(255, 255, 220, 0.15);
          animation: btnFadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.22s both;
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }

        @keyframes btnFadeIn {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-carousel-learn-btn:hover {
          background: var(--o5);
          color: #12110a;
          border-color: var(--o3);
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(224, 209, 46, 0.35);
        }

        .hero-carousel-learn-btn:focus-visible {
          outline: 2px solid var(--o3);
          outline-offset: 3px;
        }

        .hero-carousel-controls {
          display: flex;
          align-items: center;
          gap: 6px;
          position: relative;
          z-index: 30;
          pointer-events: auto;
        }

        .hero-ctrl-btn {
          display: inline-grid;
          place-items: center;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(244, 241, 226, 0.05);
          border: 1px solid var(--line);
          color: var(--pearl);
          cursor: pointer;
          position: relative;
          z-index: 31;
          pointer-events: auto !important;
          user-select: none;
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
        }

        .hero-ctrl-btn:hover {
          background: var(--o5);
          color: #12110a;
          border-color: var(--o3);
          transform: scale(1.06);
        }

        .hero-ctrl-btn:focus-visible {
          outline: 2px solid var(--o3);
          outline-offset: 2px;
        }

        .hero-ctrl-btn.active {
          border-color: rgba(207, 198, 120, 0.4);
          background: rgba(207, 198, 120, 0.12);
        }

        /* Progress track with subtle line indicators */
        .hero-carousel-progress-track {
          display: flex;
          align-items: center;
          gap: 5px;
          width: 100%;
          padding-top: 2px;
          position: relative;
          z-index: 30;
          pointer-events: auto;
        }

        .hero-progress-pill {
          position: relative;
          z-index: 31;
          pointer-events: auto !important;
          flex: 1;
          height: 3px;
          border-radius: 999px;
          background: rgba(244, 241, 226, 0.14);
          border: none;
          cursor: pointer;
          overflow: hidden;
          padding: 0;
          transition: background 0.2s;
        }

        .hero-progress-pill:hover {
          background: rgba(244, 241, 226, 0.3);
        }

        .hero-progress-pill.active {
          background: rgba(244, 241, 226, 0.25);
        }

        .hero-progress-fill {
          position: absolute;
          inset: 0;
          width: 0%;
          background: var(--o3);
          border-radius: 999px;
        }

        .hero-progress-fill.animating {
          animation: progressFill 6s linear forwards;
        }

        @keyframes progressFill {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        /* Scrim & Final Scroll Stages */
        .hero-scrim {
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
          background: radial-gradient(ellipse at center, rgba(6, 6, 5, 0.95) 0, rgba(6, 6, 5, 0.82) 30%, rgba(6, 6, 5, 0.3) 60%, transparent 80%);
          z-index: 3;
        }

        .hero-final {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 6vw 8vh;
          z-index: 6;
          pointer-events: none;
        }

        .hero-final .hero-k {
          opacity: 0;
        }

        .hero-final h2 {
          font-family: var(--display);
          font-weight: 700;
          font-size: clamp(34px, 5.2vw, 76px);
          line-height: 1.04;
          letter-spacing: -0.03em;
          max-width: 20ch;
          margin-bottom: 22px;
          color: var(--pearl);
        }

        .hero-final h2 span {
          display: block;
          color: rgba(244, 241, 226, 0.62);
        }

        .hero-final p {
          font-size: clamp(16px, 1.5vw, 21px);
          line-height: 1.5;
          color: #d6d2b8;
          max-width: 48ch;
          margin-bottom: 32px;
        }

        .hero-row {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .hero-final .hero-row {
          pointer-events: auto;
        }

        .hero-btn {
          display: inline-block;
          padding: 13px 24px;
          border-radius: 999px;
          font-family: var(--body);
          font-weight: 500;
          font-size: 15px;
          border: 1px solid var(--line);
          transition: background 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          cursor: pointer;
          text-decoration: none;
        }

        .hero-btn:focus-visible {
          outline: 2px solid var(--o3);
          outline-offset: 3px;
          box-shadow: 0 0 0 4px var(--amber-glow, rgba(224, 209, 46, 0.35));
        }

        .hero-btn.solid {
          background: var(--o9);
          color: var(--pearl);
          border-color: var(--o5);
          box-shadow: inset 0 1px 0 rgba(255, 255, 220, 0.2);
        }

        .hero-btn.solid:hover {
          background: var(--o5);
          color: #12110a;
          transform: translateY(-2px);
        }

        .hero-btn.ghost {
          color: var(--pearl);
          background: transparent;
        }

        .hero-btn.ghost:hover {
          background: rgba(244, 241, 226, 0.09);
          border-color: var(--o3);
          transform: translateY(-2px);
        }

        .hero-stats {
          position: absolute;
          left: 5vw;
          right: 5vw;
          bottom: 5vh;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          z-index: 6;
          pointer-events: none;
        }

        .hero-stat {
          opacity: 0;
          flex: 1;
          padding-top: 14px;
          border-top: 1px solid var(--line);
        }

        .hero-stat b {
          display: block;
          font-family: var(--display);
          font-weight: 600;
          font-size: clamp(22px, 2.6vw, 36px);
          letter-spacing: -0.02em;
          color: var(--pearl);
        }

        .hero-stat span {
          font-size: 14px;
          color: var(--mute);
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .hero-quote-top-right {
            top: 76px;
            right: 16px;
          }

          .hero-carousel-container {
            width: calc(100vw - 32px);
            max-width: 480px;
            left: 16px;
            top: 116px;
            transform: none;
            max-height: calc(100vh - 190px);
          }

          .hero-carousel-media-box {
            height: clamp(120px, 16vh, 150px);
          }

          .hero-carousel-body {
            padding: 12px 16px 14px;
          }

          .hero-carousel-title {
            font-size: 16px;
            margin-bottom: 6px;
          }

          .hero-carousel-desc {
            font-size: 12px;
            margin-bottom: 10px;
            line-height: 1.4;
          }

          .hero-brand-bottom-right {
            bottom: 16px;
            right: 16px;
            left: 16px;
            max-width: none;
            text-align: center;
          }

          .hero-heading {
            font-size: clamp(32px, 7vw, 44px);
            margin-bottom: 4px;
          }

          .hero-tagline-left {
            margin-top: 10px;
            font-size: 12px;
            text-align: center;
            margin-left: auto;
            margin-right: auto;
          }

          .hero-stats {
            flex-direction: column;
            gap: 8px;
          }

          .hero-stat {
            padding-top: 8px;
          }

          .hero-stat b {
            display: inline;
            margin-right: 8px;
            font-size: 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-spiral,
          .hero-carousel-container,
          .hero-carousel-card,
          .hero-quote-top-right,
          .hero-brand-bottom-right,
          .hero-carousel-header-pill,
          .hero-carousel-counter-pill,
          .hero-carousel-title,
          .hero-carousel-desc,
          .hero-carousel-learn-btn,
          .hero-carousel-media {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
          .hero-progress-fill.animating {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}