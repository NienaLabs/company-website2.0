"use client";

import React, { useRef, useMemo } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollBlurReveal.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type ScrollBlurTag =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div"
  | "article"
  | "header";

export interface ScrollBlurRevealProps {
  children?: React.ReactNode;
  text?: string;
  as?: ScrollBlurTag;
  className?: string;
  style?: React.CSSProperties;
  /** Custom trigger element ref if scrolling is tied to a parent section */
  triggerRef?: React.RefObject<HTMLElement | null>;
  /** ScrollTrigger start position (default: "top 85%") */
  start?: string;
  /** ScrollTrigger end position (default: "top 35%") */
  end?: string;
  /** Scrub smoothing value or boolean (default: 0.8) */
  scrub?: boolean | number;
  /** Starting blur in pixels (default: 12) */
  blurAmount?: number;
  /** Starting opacity (default: 0.15) */
  initialOpacity?: number;
  /** Starting Y translate offset in px (default: 8) */
  yOffset?: number;
  /** Duration of each line unblur tween (default: 0.5) */
  duration?: number;
  /** Stagger delay between lines in timeline units (default: 0.18) */
  stagger?: number;
  /** If true, treats child elements as individual animated targets instead of splitting text */
  animateChildren?: boolean;
}

function extractText(children: React.ReactNode, textProp?: string): string {
  if (textProp) return textProp;
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) {
    return children
      .map((c) =>
        typeof c === "string" || typeof c === "number" ? String(c) : ""
      )
      .join("");
  }
  return "";
}

function groupWordsIntoLines(container: HTMLElement | null): HTMLElement[][] {
  if (!container) return [];
  const wordEls = Array.from(
    container.querySelectorAll<HTMLElement>(".scroll-blur-word")
  );
  if (wordEls.length === 0) return [];

  const lines: HTMLElement[][] = [];
  let currentLine: HTMLElement[] = [];
  let currentTop = -99999;

  for (const el of wordEls) {
    const top = Math.round(el.offsetTop);
    if (Math.abs(top - currentTop) > 6) {
      if (currentLine.length > 0) {
        lines.push(currentLine);
      }
      currentLine = [el];
      currentTop = top;
    } else {
      currentLine.push(el);
    }
  }

  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  return lines;
}

function groupDirectChildren(container: HTMLElement | null): HTMLElement[][] {
  if (!container) return [];
  const childEls = Array.from(container.children) as HTMLElement[];
  return childEls.map((el) => [el]);
}

export default function ScrollBlurReveal({
  children,
  text,
  as: Tag = "p",
  className,
  style,
  triggerRef,
  start = "top 85%",
  end = "top 35%",
  scrub = 0.8,
  blurAmount = 12,
  initialOpacity = 0.15,
  yOffset = 8,
  duration = 0.5,
  stagger = 0.18,
  animateChildren = false,
}: ScrollBlurRevealProps) {
  const elementRef = useRef<HTMLElement>(null);

  const rawText = useMemo(
    () => extractText(children, text),
    [children, text]
  );

  const words = useMemo(() => {
    if (animateChildren || !rawText.trim()) return [];
    return rawText.trim().split(/\s+/);
  }, [animateChildren, rawText]);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!elementRef.current) return;

      if (prefersReducedMotion) {
        gsap.set(elementRef.current, {
          filter: "none",
          opacity: 1,
          y: 0,
        });
        return;
      }

      let activeTimeline: gsap.core.Timeline | null = null;

      const buildAnimation = () => {
        if (activeTimeline) {
          activeTimeline.kill();
          activeTimeline = null;
        }

        const lines = animateChildren
          ? groupDirectChildren(elementRef.current)
          : groupWordsIntoLines(elementRef.current);

        if (lines.length === 0) return;

        const allTargets = lines.flat();

        gsap.set(allTargets, {
          filter: `blur(${blurAmount}px)`,
          opacity: initialOpacity,
          y: yOffset,
          willChange: "filter, opacity, transform",
        });

        const triggerTarget = triggerRef?.current || elementRef.current;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerTarget,
            start,
            end,
            scrub,
          },
        });

        lines.forEach((lineTargets, idx) => {
          tl.to(
            lineTargets,
            {
              filter: "blur(0px)",
              opacity: 1,
              y: 0,
              duration,
              ease: "power2.out",
            },
            idx * stagger
          );
        });

        activeTimeline = tl;
      };

      buildAnimation();

      if (typeof document !== "undefined" && document.fonts?.ready) {
        document.fonts.ready.then(() => {
          buildAnimation();
          ScrollTrigger.refresh();
        });
      }

      let resizeTimeout: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          buildAnimation();
          ScrollTrigger.refresh();
        }, 150);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        clearTimeout(resizeTimeout);
        if (activeTimeline) {
          activeTimeline.kill();
        }
      };
    },
    {
      scope: elementRef,
      dependencies: [
        start,
        end,
        scrub,
        blurAmount,
        initialOpacity,
        yOffset,
        duration,
        stagger,
        animateChildren,
      ],
    }
  );

  const Component = Tag as any;

  if (!animateChildren && words.length > 0) {
    return (
      <Component
        ref={elementRef}
        className={`scroll-blur-container ${className || ""}`}
        style={style}
      >
        {words.map((word, idx) => (
          <span key={idx} className="scroll-blur-word">
            {word}
          </span>
        ))}
      </Component>
    );
  }

  return (
    <Component
      ref={elementRef}
      className={`scroll-blur-container ${className || ""}`}
      style={style}
    >
      {children}
    </Component>
  );
}

