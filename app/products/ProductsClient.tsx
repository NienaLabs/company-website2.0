"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Terminal,
} from "lucide-react";
import ScrollBlurReveal from "../components/ui/ScrollBlurReveal";
import "./products.css";

interface SystemItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  link: string;
}

const specializedSystems: SystemItem[] = [
  {
    id: "defect-vision",
    tag: "Industrial Vision Engine",
    title: "Sub-Millimeter Defect & Fracture Interception",
    description:
      "High-speed optical inspection models operating directly on conveyor lines up to 120 FPS. Flags surface cracks, micro-fractures, and structural tears in microseconds to guarantee zero defect leakage to downstream assemblies.",
    image: "/images/capabilities/detection-broken-parts.png",
    ctaText: "Deploy on Factory Line",
    link: "/#contact",
  },
  {
    id: "logistics-sortation",
    tag: "Logistics & Sortation Classifier",
    title: "Autonomous Packaging & Parcel Classification",
    description:
      "Real-time carton dimension estimation, barcode verification, package structural integrity assessment, and automated AGV dispatch routing across high-speed distribution lanes.",
    image: "/images/capabilities/classification-of-factory-box.png",
    ctaText: "Integrate with WMS",
    link: "/#contact",
  },
  {
    id: "surface-telemetry",
    tag: "Fleet Surface Telemetry",
    title: "Automated Vehicular Surface Damage Assessment",
    description:
      "Microscopic paint scratch, body abrasion, and panel dent segmentation under challenging reflections, generating automated digital inspection audit trails for rental yards and fleet depots.",
    image: "/images/capabilities/detection-car-scratch.png",
    ctaText: "Automate Fleet Triage",
    link: "/#contact",
  },
  {
    id: "ambient-voice",
    tag: "Multimodal Conversational AI",
    title: "Sub-300ms Real-Time Voice Agents & Avatars",
    description:
      "Low-latency speech-to-speech runtime and expressive neural avatars capable of fluid multi-turn dialogue, built for automated concierge desks, healthcare intake, and interactive ambient spaces.",
    image: "/images/capabilities/voice-agents-and-avatars.png",
    ctaText: "Explore Voice Runtimes",
    link: "/#contact",
  },
];

const openSourceProjects = [
  {
    id: "alugard-drop",
    tag: "High-Performance UI Engine",
    title: "alugard-drop",
    description:
      "A zero-dependency, framework-agnostic drag-and-drop library built for 60 FPS precision across complex nested trees and dense enterprise workflows. Compatible with React, Vue, Svelte, or vanilla DOM.",
    link: "https://github.com/orgs/Nienalabs-community/repositories",
    icon: Layers,
    logoImage: "/images/projects/alugard.png",
  },
  {
    id: "niena-starter-kit",
    tag: "Enterprise Next.js CLI",
    title: "niena-starter-kit",
    description:
      "An opinionated CLI scaffolder for production Next.js architectures. Ships with enterprise-grade authentication, modular database adapters, and strict design token foundations.",
    link: "https://github.com/orgs/Nienalabs-community/repositories",
    icon: Terminal,
  },
];

export default function ProductsClient() {
  return (
    <div className="products-page">
      {/* ── 01: Hero Section ── */}
      <section className="products-hero" aria-label="Specialized Software Overview">
        <div className="products-hero-container">
          <div className="products-hero-content">
            <ScrollBlurReveal as="h1" className="products-hero-title">
              Intelligence built for the real economy.
            </ScrollBlurReveal>

            <ScrollBlurReveal as="p" className="products-hero-lead">
              Specialized software engines, high-throughput edge perception
              pipelines, and developer infrastructure engineered to operate
              deterministically in physical and industrial environments.
            </ScrollBlurReveal>
          </div>
        </div>
      </section>

      {/* ── 02: Flagship Showcase: Compound-V ── */}
      <section
        className="products-flagship-section"
        aria-label="Flagship Product: Compound-V"
      >
        <div className="products-hero-container">
          <div className="compound-v-card">
            <div className="compound-v-content">
              <div className="compound-v-meta">
                <span className="compound-v-tag">
                  Retail Perception Pipeline
                </span>
                <span className="compound-v-status-pill">
                  <span className="compound-v-status-dot" />
                  v6 Production
                </span>
              </div>

              <ScrollBlurReveal as="h2" className="compound-v-title">
                Compound-V: Edge-Native Retail Perception & Behavioral Engine
              </ScrollBlurReveal>

              <ScrollBlurReveal as="p" className="compound-v-description">
                Compound-V is our specialized streaming computer vision and
                behavioral reasoning pipeline engineered for physical retail
                spaces. Operating directly on in-store optical feeds, it tracks
                customer engagement, dwell time, staff assistance velocity, and
                checkout workflows with zero cloud latency and strict on-premises
                privacy.
              </ScrollBlurReveal>

              <div className="compound-v-features">
                <div className="compound-v-feature-item">
                  <CheckCircle2
                    size={16}
                    className="compound-v-feature-icon"
                    aria-hidden="true"
                  />
                  <span>Dwell time & pathing analytics</span>
                </div>
                <div className="compound-v-feature-item">
                  <CheckCircle2
                    size={16}
                    className="compound-v-feature-icon"
                    aria-hidden="true"
                  />
                  <span>Staff coverage & service velocity</span>
                </div>
                <div className="compound-v-feature-item">
                  <CheckCircle2
                    size={16}
                    className="compound-v-feature-icon"
                    aria-hidden="true"
                  />
                  <span>Queue & checkout verification</span>
                </div>
                <div className="compound-v-feature-item">
                  <CheckCircle2
                    size={16}
                    className="compound-v-feature-icon"
                    aria-hidden="true"
                  />
                  <span>On-prem edge privacy architecture</span>
                </div>
              </div>

              <div className="compound-v-actions">
                <Link
                  href="/case-studies/compound-v"
                  className="compound-v-btn-primary"
                >
                  <span>Explore Case Study</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>

                <Link href="/#contact" className="compound-v-btn-secondary">
                  <span>Deploy in Store</span>
                </Link>
              </div>
            </div>

            <div className="compound-v-media">
              <div className="compound-v-media-frame">
                <Image
                  src="/images/capabilities/camera-compound-v.png"
                  alt="Compound-V retail perception camera telemetry"
                  width={1400}
                  height={900}
                  className="compound-v-image"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03: Specialized Systems Grid ── */}
      <section
        className="products-grid-section"
        aria-label="Specialized Vision & Ambient Engines"
      >
        <div className="products-hero-container">
          <header className="products-section-header">
            <ScrollBlurReveal as="h2" className="products-section-title">
              Specialized Software & Vision Engines
            </ScrollBlurReveal>
            <ScrollBlurReveal as="p" className="products-section-subtitle">
              Purpose-built machine learning pipelines deployed on-site across
              factories, logistics hubs, automotive yards, and client interfaces.
            </ScrollBlurReveal>
          </header>

          <div className="products-grid">
            {specializedSystems.map((item) => (
              <article key={item.id} className="product-item-card">
                <div className="product-item-media">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={800}
                    height={500}
                    className="product-item-img"
                    loading="lazy"
                  />
                </div>

                <div className="product-item-body">
                  <span className="product-item-tag">{item.tag}</span>

                  <ScrollBlurReveal as="h3" className="product-item-title">
                    {item.title}
                  </ScrollBlurReveal>

                  <ScrollBlurReveal as="p" className="product-item-desc">
                    {item.description}
                  </ScrollBlurReveal>

                  <div className="product-item-action">
                    <Link href={item.link} className="product-item-link">
                      <span>{item.ctaText}</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04: Open Source Developer Infrastructure ── */}
      <section
        className="products-oss-section"
        aria-label="Open Source Infrastructure"
      >
        <div className="products-hero-container">
          <header className="products-section-header">
            <ScrollBlurReveal as="h2" className="products-section-title">
              Open-Source Infrastructure & Tools
            </ScrollBlurReveal>
            <ScrollBlurReveal as="p" className="products-section-subtitle">
              Reliable, framework-agnostic building blocks released to the
              developer community for building high-performance software.
            </ScrollBlurReveal>
          </header>

          <div className="oss-grid">
            {openSourceProjects.map((oss) => (
              <article key={oss.id} className="oss-card">
                <div className="oss-header">
                  <div className="oss-icon-box">
                    <oss.icon size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <span className="oss-tag">{oss.tag}</span>
                    <h3 className="oss-title">{oss.title}</h3>
                  </div>
                </div>

                <p className="oss-desc">{oss.description}</p>

                <div>
                  <a
                    href={oss.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="oss-link"
                  >
                    <span>View Repository on GitHub</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
