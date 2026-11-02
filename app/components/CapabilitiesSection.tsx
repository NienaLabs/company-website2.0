"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import ScrollBlurReveal from "./ui/ScrollBlurReveal";
import "./CapabilitiesSection.css";

interface CapabilityItem {
  id: string;
  tag: string;
  status: string;
  title: string;
  headline: string;
  body: string;
  bullets: string[];
  image: string;
  isReversed: boolean;
}

const capabilities: CapabilityItem[] = [
  {
    id: "compound-v-retail",
    tag: "Retail Intelligence & Computer Vision",
    status: "Compound-V Retail Pipeline",
    title: "In-Store Activity Monitoring via Compound-V",
    headline:
      "Real-time customer journey tracking and workforce activity analytics for retail spaces.",
    body: "Compound-V is our specialized computer vision model pipeline and software suite built for modern retail environments. Operating directly on in-store optical feeds, Compound-V continuously monitors customer engagement, foot traffic, and employee assistance workflows. Retailers gain instant, objective visibility into checkout wait times, shelf engagement, and staff coverage without compromising shopper privacy.",
    bullets: [
      "Real-time customer dwell time, pathing, and shelf engagement analytics",
      "Worker activity tracking, desk coverage, and service velocity metrics",
      "Automated queue monitoring and checkout bottleneck interception",
      "On-premise edge inference ensuring full biometric and privacy compliance",
    ],
    image: "/images/capabilities/camera-compound-v.png",
    isReversed: false,
  },
  {
    id: "defect-interception",
    tag: "Industrial Quality Control",
    status: "Assembly Inspection Vision",
    title: "Sub-Millimeter Defect & Fracture Interception",
    headline: "Catching structural breaks and assembly flaws at conveyor speed.",
    body: "High-velocity production environments cannot rely on manual sampling or human inspection fatigue. We deploy dedicated machine learning vision models that inspect components directly on conveyor belts, flagging surface tears, micro-fractures, and structural breaks in microseconds to guarantee zero defect leakage to downstream assemblies.",
    bullets: [
      "High-speed visual anomaly detection up to 120 FPS",
      "Sub-millimeter crack and structural defect classification",
      "Automated pneumatic and robotic rejection triggering",
      "Comprehensive yield analytics and defect density heatmapping",
    ],
    image: "/images/capabilities/detection-broken-parts.png",
    isReversed: true,
  },
  {
    id: "warehouse-classification",
    tag: "Warehouse & Fulfillment Ops",
    status: "Logistics Neural Classifier",
    title: "Autonomous Packaging & Sortation Classification",
    headline:
      "Streamlining warehouse dispatch with intelligent parcel perception.",
    body: "Modern warehouses handle thousands of varying parcels, cartons, and container batches hourly. Our computer vision pipelines automatically categorize packages across high-speed distribution lanes, verify label placement and barcode integrity, estimate volumetric dimensions, and guide robotic or conveyor routing with 99.9% accuracy.",
    bullets: [
      "Real-time carton classification, volume, and dimension estimation",
      "Packaging structural integrity checks (crush and puncture flags)",
      "Automated dispatch routing and automated guided vehicle (AGV) handoff",
      "Direct API integration with warehouse management systems (WMS)",
    ],
    image: "/images/capabilities/classification-of-factory-box.png",
    isReversed: false,
  },
  {
    id: "automotive-telemetry",
    tag: "Automotive Fleet Inspection",
    status: "Surface Telemetry Engine",
    title: "Automated Vehicular Surface Damage Assessment",
    headline:
      "Objective, microscopic scratch and abrasion detection for fleets.",
    body: "Vehicle exterior evaluation in rental fleets, logistics yards, and insurance triage has historically been subjective and dispute-prone. We train and deploy machine learning models capable of identifying microscopic paint scratches, body abrasions, and panel dents under challenging reflections, creating instant audit trails before and after vehicle operations.",
    bullets: [
      "Microscopic paint scratch and panel dent segmentation",
      "Reflection normalization across varying natural and artificial light",
      "Instant before-and-after digital inspection audit trails",
      "Accelerated turnaround times for rental returns and logistics depots",
    ],
    image: "/images/capabilities/detection-car-scratch.png",
    isReversed: true,
  },
  {
    id: "conversational-avatars",
    tag: "Conversational AI & Ambient Interfaces",
    status: "Multimodal Agent Runtime",
    title: "Real-Time Voice Agents & Intelligent Avatars",
    headline:
      "Human-grade conversational presence for customer desks and living spaces.",
    body: "We bring natural human-machine interaction into physical and digital environments. Our speech models and expressive neural avatars handle complex multi-turn voice conversations with sub-300ms latency. From automated concierge desks and healthcare intake kiosks to enterprise assistants, our avatars listen, reason, and respond naturally with deep contextual grounding.",
    bullets: [
      "Sub-300ms streaming speech-to-speech conversational latency",
      "Lip-synchronized, expressive real-time neural avatar rendering",
      "Domain-specific tool calling and enterprise database integration",
      "Multimodal spatial awareness for kiosks, tablets, and ambient screens",
    ],
    image: "/images/capabilities/voice-agents-and-avatars.png",
    isReversed: false,
  },
];

export default function CapabilitiesSection() {
  return (
    <section
      id="capabilities"
      className="capabilities-section"
      aria-label="How We Integrate Intelligence Into Your Environment"
    >
      <div className="capabilities-container">
        {/* ── Section Header ── */}
        <header className="capabilities-header">
          <ScrollBlurReveal as="h2" className="capabilities-title">
            How We Integrate Intelligence Into Your Environment
          </ScrollBlurReveal>
          <ScrollBlurReveal as="p" className="capabilities-subtitle">
            From in-store activity monitoring with Compound-V to automated
            industrial vision and conversational voice agents, explore how our
            machine learning models solve high-stakes challenges across physical
            and digital operations.
          </ScrollBlurReveal>
        </header>

        {/* ── Alternating 2-Column Capability Items ── */}
        <div className="capabilities-list">
          {capabilities.map((item, index) => (
            <article
              key={item.id}
              className={`capability-row${item.isReversed ? " is-reversed" : ""}`}
            >
              {/* Image Column */}
              <div className="capability-image-col">
                <div className="capability-image-card">
                  <div className="capability-image-inner">
                    <span className="capability-status-pill">
                      <span className="capability-status-dot" />
                      {item.status}
                    </span>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={1600}
                      height={1000}
                      className="capability-img"
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </div>
              </div>

              {/* Text Column */}
              <div className="capability-text-col">
                <div className="capability-tag-wrapper">
                  <span className="capability-tag">{item.tag}</span>
                </div>

                <ScrollBlurReveal as="h3" className="capability-item-title">
                  {item.title}
                </ScrollBlurReveal>

                <ScrollBlurReveal as="p" className="capability-headline">
                  {item.headline}
                </ScrollBlurReveal>

                <ScrollBlurReveal as="p" className="capability-body">
                  {item.body}
                </ScrollBlurReveal>

                <ul className="capability-bullets" role="list">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="capability-bullet-item">
                      <CheckCircle2
                        size={16}
                        className="capability-bullet-icon"
                        aria-hidden="true"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="capability-action">
                  <Link
                    href={
                      item.id === "compound-v-retail"
                        ? "/case-studies/compound-v"
                        : "/#contact"
                    }
                    className="capability-cta-btn"
                  >
                    <span>
                      {item.id === "compound-v-retail"
                        ? "Read Compound-V Case Study"
                        : "Deploy in Your Environment"}
                    </span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
