"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, DynamicColor } from "./ui/Card";
import { Typography } from "./ui/Typography";
import { Carousel } from "./ui/Carousel";
import { Terminal } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const capabilities = [
  {
    id: "devtools",
    label: "Developer Tools",
    title: "DX that\naccelerates.",
    body: "Custom tooling, CLIs, and dev environments that remove friction and multiply engineering velocity.",
    icon: Terminal
  },
  {
    id: "enterprise",
    label: "Enterprise Web",
    title: "Scalable by architecture,\nnot by accident.",
    body: "End-to-end web platforms engineered to grow with your business, from 100 users to 10 million.",
    icon: "/images/icons/website3d.png"
  },
  {
    id: "mobile",
    label: "Mobile",
    title: "iOS & Android,\nnative at heart.",
    body: "Cross-platform applications that feel native on every device, delivering performance users expect.",
    icon: "/images/icons/mobile3d.png"
  },
  {
    id: "ai",
    label: "AI-Driven",
    title: "Intelligence embedded,\nnot bolted on.",
    body: "AI systems integrated at the architecture level, not afterthoughts, but load-bearing pillars.",
    icon: "/images/icons/brain3d.png"
  },
  {
    id: "cloud",
    label: "Cloud",
    title: "Infrastructure that\ndisappears.",
    body: "Cloud architecture so reliable and invisible that your team only thinks about the product.",
    icon: "/images/icons/Cloud3d.png"
  },
  {
    id: "desktop",
    label: "Desktop",
    title: "Power without\ncompromise.",
    body: "High-performance desktop applications for professionals who demand more from their tools.",
    icon: "/images/icons/desktop3d.png"
  },
];

function CapabilityCardItem({ cap, isFocused, altColorIndex }: { cap: any, isFocused: boolean, altColorIndex: DynamicColor }) {
  const [isHovered, setIsHovered] = useState(false);
  const active = isFocused || isHovered;

  return (
    <Card
      variant={active ? "dynamic" : "outlined"}
      dynamicColor={altColorIndex}
      interactive={true}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        flex: 1,
        minHeight: "340px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        transition: "all var(--motion-productive-shift)",
      }}
    >
      {/* Icon — absolute to the card, top-right */}
      {cap.icon && (
        <div 
          style={{ 
            position: "absolute", 
            top: "var(--space-5)", 
            right: "var(--space-5)", 
            opacity: active ? 1 : 0.5, 
            transform: active ? "scale(1.1)" : "scale(1)",
            transition: "all 0.3s ease", 
            zIndex: 0 
          }}
        >
          {typeof cap.icon === 'string' ? (
            <img 
              src={cap.icon} 
              alt={cap.label} 
              style={{ width: "80px", height: "80px", objectFit: "contain", filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.15))" }} 
            />
          ) : (
            <cap.icon 
              size={80} 
              strokeWidth={1} 
              style={{ color: `var(--color-alt-${altColorIndex}-active)`, filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.15))" }} 
            />
          )}
        </div>
      )}

      {/* Text — top-left, constrained so it doesn't overlap the icon */}
      <div style={{
        position: "relative", 
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        maxWidth: "70%",
      }}>
        <Typography 
          variant="caption1" 
          style={{ 
            color: active ? "inherit" : `var(--color-alt-${altColorIndex})`,
            textTransform: "uppercase", 
            letterSpacing: "0.06em", 
            marginBottom: "8px", 
            opacity: 0.9 
          }}
        >
          {cap.label}
        </Typography>
        
        <Typography 
          variant="title2" 
          style={{ whiteSpace: "pre-line", marginBottom: "8px" }}
        >
          {cap.title}
        </Typography>
        
        {cap.body && (
          <Typography 
            variant="body1" 
            color={active ? "inherit" : "secondary"}
            style={{ opacity: active ? 0.9 : 1 }}
          >
            {cap.body}
          </Typography>
        )}
      </div>
    </Card>
  );
}

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  useGSAP((_context, contextSafe) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    if (!contextSafe) return;

    gsap.fromTo(carouselContainerRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      }
    );

  }, { scope: sectionRef, dependencies: [] });

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{ background: "var(--color-bg)", padding: "var(--spacing-20) 0" }}
    >
      <div className="section-container">
        <div style={{ marginBottom: "var(--spacing-16)" }}>
          <Typography variant="large-title" style={{ marginBottom: "4px" }}>
            What we build.
          </Typography>
        </div>

        <div ref={carouselContainerRef} style={{ opacity: 0 }}>
          <Carousel
            items={capabilities}
            autoPlay={true}
            interval={4000}
            renderItem={(cap, i, isFocused) => {
              const altColorIndex = ((i % 4) + 1).toString() as DynamicColor;
              return <CapabilityCardItem key={cap.id} cap={cap} isFocused={isFocused} altColorIndex={altColorIndex} />;
            }}
          />
        </div>
      </div>
    </section>
  );
}
