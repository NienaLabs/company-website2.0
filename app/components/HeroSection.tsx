"use client";

import React, { useEffect, useState, useRef } from "react";
import "./Hero.css";

const CLIPS = [
  {
    id: 1,
    src: "/video/camera.mp4",
    poster: "/video/camera.jpg",
    caption: "Real-time machine vision & optical activity recognition",
    fallback: "/video/camera.jpg",
  },
  {
    id: 2,
    src: "/video/factory.mp4",
    poster: "/video/factory.jpg",
    caption: "High-speed automated robotics for factories & assembly lines",
    fallback: "/video/factory.jpg",
  },
  {
    id: 3,
    src: "/video/car.mp4",
    poster: "/video/car.jpg",
    caption: "Autonomous edge perception & vehicular telemetry",
    fallback: "/video/car.jpg",
  },
  {
    id: 4,
    src: "/video/drone.mp4",
    poster: "/video/drone.jpg",
    caption: "Autonomous drones that perceive, plan and navigate",
    fallback: "/video/drone.jpg",
  },
  {
    id: 5,
    src: "/video/brain.mp4",
    poster: "/video/brain.jpg",
    caption: "Neural compute & decision intelligence pipelines",
    fallback: "/video/brain.jpg",
  },
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const roRef = useRef<ResizeObserver | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Exact math: Viewport diagonal diameter calculation ensures the circular image
  // reaches all screen corners on any display size.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const d = Math.sqrt(
        Math.pow(el.offsetWidth, 2) + Math.pow(el.offsetHeight, 2)
      );
      el.style.setProperty("--diameter", `${d}px`);
    };

    update();

    roRef.current = new ResizeObserver(update);
    roRef.current.observe(el);

    return () => roRef.current?.disconnect();
  }, []);

  // Base carousel auto-rotation timing: 5500ms
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % CLIPS.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  // Manage video playback on active slide transition
  useEffect(() => {
    const activeVideo = videoRefs.current[activeSlide];
    if (activeVideo && activeVideo.src) {
      activeVideo.currentTime = 0;
      activeVideo.play().catch(() => {
        // Video file not yet added to disk or autoplay policy blocked;
        // fallback image stays 100% visible
      });
    }

    videoRefs.current.forEach((v, idx) => {
      if (idx !== activeSlide && v) {
        v.pause();
      }
    });
  }, [activeSlide]);

  const active = CLIPS[activeSlide];

  return (
    <section
      className="slider-container"
      ref={containerRef}
      aria-label="Niena Labs — Intelligence for the Real Economy"
    >
      {/* ── Slide List: Rotating Circular Images & Videos ── */}
      <div className="slider-list">
        {CLIPS.map((clip, index) => (
          <div
            key={clip.id}
            className={`slider-item${index === activeSlide ? " active" : ""}`}
            aria-hidden={index !== activeSlide}
          >
            <div
              className="slider-image"
              style={
                {
                  "--url": `url('${clip.fallback}')`,
                } as React.CSSProperties
              }
            >
              {/* Unsplash fallback image (always visible if video is loading/missing) */}
              <img
                src={clip.fallback}
                alt={clip.caption}
                className="slider-media-fallback"
                loading={index === 0 ? "eager" : "lazy"}
              />

              {/* Video layer (smoothly fades in once playing) */}
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={clip.src}
                poster={clip.fallback}
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                className="slider-media-video"
                onPlaying={(e) => {
                  e.currentTarget.classList.add("is-playing");
                }}
                onError={(e) => {
                  e.currentTarget.classList.remove("is-playing");
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── Scrim Overlay for Guaranteed Contrast ── */}
      <div className="slider-scrim" aria-hidden="true" />

      {/* ── Content: Centered Manifesto Headline ── */}
      <div className="slider-content">
        <div className="hero-center-statement">
          <h1 className="hero-statement-title">
            The world is a better place when we use super intelligence to solve problems.
          </h1>
        </div>
      </div>
    </section>
  );
}

// Named alias
export { HeroSection as Hero };
