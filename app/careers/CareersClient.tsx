"use client";

import { useState } from "react";
import {
  Eye,
  Cpu,
  Network,
  Layers,
  ArrowUpRight,
  Mail,
  Copy,
  Check,
} from "lucide-react";
import ScrollBlurReveal from "../components/ui/ScrollBlurReveal";
import "./careers.css";

interface Discipline {
  id: string;
  track: string;
  title: string;
  description: string;
  tags: string[];
  icon: typeof Eye;
}

const disciplines: Discipline[] = [
  {
    id: "edge-vision",
    track: "Track 01 · Perception Systems",
    title: "Streaming Vision & Causal Reasoning",
    description:
      "Design sub-millimeter defect interception models, illumination-invariant spatial perception engines (like Compound-V), and causal temporal sequence models running deterministically on edge silicon.",
    tags: ["TensorRT / ONNX", "PyTorch", "Spatial Perception", "Temporal GRU", "C++ / Python"],
    icon: Eye,
  },
  {
    id: "embedded-kernel",
    track: "Track 02 · Edge Hardware & OS",
    title: "Real-Time Runtime & Device Drivers",
    description:
      "Architect low-latency Linux kernel optimizations, multi-camera sensor synchronization pipelines (MIPI / GMSL / USB3), and deterministic hardware-accelerated inference appliances for physical facilities.",
    tags: ["NVIDIA Jetson", "Linux RT-Preempt", "GStreamer / V4L2", "Rust / C++", "MIPI / RTSP"],
    icon: Cpu,
  },
  {
    id: "distributed-systems",
    track: "Track 03 · Core Infrastructure",
    title: "Resilient Edge-to-Cloud Fabric",
    description:
      "Build zero-data-loss telemetry pipelines, local-first offline storage sinks, deterministic arbitration state machines, and real-time composite operational streams operating reliably under intermittent network connectivity.",
    tags: ["Distributed State", "Local-First", "High Throughput", "TypeScript / Go", "WebSockets"],
    icon: Network,
  },
  {
    id: "industrial-hardware",
    track: "Track 04 · Systems Engineering",
    title: "Ruggedized Field Computing & I/O",
    description:
      "Integrate edge computer vision appliances into live factory conveyor belts, warehouse sortation lines, and commercial retail fixtures with industrial I/O protocols and rigorous thermal management.",
    tags: ["Industrial I/O", "PLC / SCADA", "Thermal Dynamics", "Field Validation", "CAD / Mechanical"],
    icon: Layers,
  },
];

const principles = [
  {
    number: "01",
    heading: "Physical Ground Truth",
    body: "We calibrate against optical noise, mechanical vibrations, and variable factory lighting, not sterile academic benchmarks.",
  },
  {
    number: "02",
    heading: "Deterministic Latency",
    body: "Our inference and control loops operate within rigid frame budgets where delayed decisions cause physical defects or inventory leakage.",
  },
  {
    number: "03",
    heading: "Deep System Ownership",
    body: "Engineers touch hardware enclosures, sensor firmware, sequence models, and client control planes. There is no hand-off to someone else.",
  },
];

export default function CareersClient() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("careers@nienalabs.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const mailtoUrl =
    "mailto:careers@nienalabs.com?subject=Engineering%20Collective%20Inquiry%20%E2%80%94%20Niena%20Labs&body=Hi%20Niena%20Labs%20Team%2C%0A%0AI'm%20reaching%20out%20regarding%20engineering%20opportunities%20at%20Niena%20Labs.%0A%0A%E2%80%A2%20Core%20Focus%20%2F%20Discipline%3A%0A%E2%80%A2%20Selected%20Projects%20%2F%20GitHub%20Links%3A%0A%E2%80%A2%20A%20hard%20system%20problem%20I've%20solved%3A%0A%0ABest%20regards%2C";

  return (
    <div className="careers-page">
      {/* ── 01: Hero Section ── */}
      <section className="careers-hero" aria-label="Careers Overview">
        <div className="careers-container">
          <div className="careers-hero-content">
            <div className="careers-status-pill">
              <span className="careers-status-dot" />
              <span>Engineering Roster: Full Capacity · Accepting Speculative Inquiries</span>
            </div>

            <ScrollBlurReveal as="h1" className="careers-hero-title">
              Build intelligence for physical reality.
            </ScrollBlurReveal>

            <ScrollBlurReveal as="p" className="careers-hero-lead">
              We engineer deterministic computer vision pipelines, embedded perception engines,
              and high-assurance systems for factories, physical facilities, and edge hardware.
              We look for deep generalists and systems specialists who thrive under physical
              constraints.
            </ScrollBlurReveal>
          </div>
        </div>
      </section>

      {/* ── 02: Core Engineering Disciplines ── */}
      <section className="careers-disciplines-section" aria-label="Engineering Disciplines">
        <div className="careers-container">
          <div className="careers-section-header">
            <ScrollBlurReveal as="h2" className="careers-section-title">
              Engineering Disciplines We Build With
            </ScrollBlurReveal>
            <ScrollBlurReveal as="p" className="careers-section-desc">
              Our products require deep integration between hardware, machine perception, and
              fault-tolerant edge runtimes.
            </ScrollBlurReveal>
          </div>

          <div className="careers-grid">
            {disciplines.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="discipline-card">
                  <div className="discipline-card-header">
                    <div className="discipline-icon-wrap">
                      <Icon size={24} strokeWidth={1.75} />
                    </div>
                    <span className="discipline-track-label">{item.track}</span>
                  </div>

                  <h3 className="discipline-title">{item.title}</h3>
                  <p className="discipline-description">{item.description}</p>

                  <div className="discipline-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="discipline-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 03: Engineering Principles ── */}
      <section className="careers-principles-section" aria-label="How We Build">
        <div className="careers-container">
          <div className="careers-section-header">
            <ScrollBlurReveal as="h2" className="careers-section-title">
              Engineering Principles
            </ScrollBlurReveal>
            <ScrollBlurReveal as="p" className="careers-section-desc">
              How we approach problems, make tradeoffs, and measure our craft.
            </ScrollBlurReveal>
          </div>

          <div className="principles-grid">
            {principles.map((pr) => (
              <div key={pr.number} className="principle-item">
                <span className="principle-num">{pr.number}</span>
                <h3 className="principle-heading">{pr.heading}</h3>
                <p className="principle-body">{pr.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04: Speculative Application / Talent Network ── */}
      <section className="careers-cta-section" aria-label="Join the Collective">
        <div className="careers-container">
          <div className="careers-cta-card">
            <div>
              <h2 className="careers-cta-title">
                Submit a Speculative Profile
              </h2>
              <p className="careers-cta-text">
                While our active roster is currently at full capacity, we always make room for
                exceptional engineers who demonstrate deep systems intuition and rigorous craft.
              </p>

              <div className="careers-cta-specs">
                <div className="careers-cta-spec-item">
                  <span className="careers-cta-spec-bullet">✓</span>
                  <span>GitHub repositories, open-source commits, or live system architectures</span>
                </div>
                <div className="careers-cta-spec-item">
                  <span className="careers-cta-spec-bullet">✓</span>
                  <span>Teardowns or write-ups of non-trivial engineering bottlenecks you solved</span>
                </div>
                <div className="careers-cta-spec-item">
                  <span className="careers-cta-spec-bullet">✓</span>
                  <span>Direct experience with edge silicon, camera pipelines, or deterministic software</span>
                </div>
              </div>
            </div>

            <div className="careers-cta-action-panel">
              <a
                href={mailtoUrl}
                className="careers-btn-primary"
              >
                <Mail size={16} />
                <span>Email Systems Team</span>
                <ArrowUpRight size={15} />
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="careers-btn-secondary"
              >
                {copied ? <Check size={16} color="var(--color-brand)" /> : <Copy size={16} />}
                <span>{copied ? "Email Copied to Clipboard" : "careers@nienalabs.com"}</span>
              </button>

              <p className="careers-action-note">
                Directly reviewed by our principal engineers within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
