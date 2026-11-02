"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollBlurReveal from "./ui/ScrollBlurReveal";
import "./IntroSection.css";

const LEAD_TEXT =
  "Niena Labs is a software company dedicated to building specialized software, infrastructure, and hardware that bring intelligence into the real economy and improve people's lives. Our solutions are designed for a wide range of environments, from businesses, factories, and institutions to homes and personal spaces.";

const BODY_TEXT =
  "Our vision is to deliver innovative solutions that use intelligence to solve real-world problems. If you have a problem that requires specialized software, infrastructure, or hardware, reach out to us. We'd be happy to help.";

export default function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="intro-section"
      aria-label="About Niena Labs"
    >
      <div className="intro-container">
        <div className="intro-content">
          <ScrollBlurReveal
            as="p"
            className="intro-lead"
            triggerRef={sectionRef}
            start="top 75%"
            end="bottom 50%"
            text={LEAD_TEXT}
          />

          <ScrollBlurReveal
            as="p"
            className="intro-body"
            triggerRef={sectionRef}
            start="top 55%"
            end="bottom 35%"
            text={BODY_TEXT}
          />

          <ScrollBlurReveal
            animateChildren
            className="intro-action"
            triggerRef={sectionRef}
            start="top 45%"
            end="bottom 25%"
            blurAmount={8}
          >
            <Link href="/#contact" className="intro-cta-link">
              <span>Reach Out to Us</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </ScrollBlurReveal>
        </div>
      </div>
    </section>
  );
}
