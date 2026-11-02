"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShieldAlert,
  Eye,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Server,
  Lock,
  Layers,
  Activity,
  AlertTriangle,
  FileCheck2,
  Cpu,
} from "lucide-react";
import "./CompoundV.css";

export default function CompoundVClient() {
  return (
    <main className="cv-page">
      <div className="cv-container">
        {/* ── Case Study Header ── */}
        <header className="cv-header">
          <div className="cv-meta-bar">
            <span className="cv-badge">Case Study // Retail Intelligence</span>
            <span className="cv-meta-date">Production Deployment · Edge Engine</span>
          </div>

          <h1 className="cv-title">
            Compound-V: Edge-Native Retail Perception &amp; Behavioral Engine
          </h1>

          <p className="cv-subtitle">
            How Niena Labs engineered a real-time computer vision engine that
            eliminates false-alarm fatigue, protects store inventory, and tracks
            customer behavior on standard CCTV with zero cloud dependency.
          </p>
        </header>

        {/* ── Primary Hero Visual Card ── */}
        <div className="cv-hero-media">
          <div className="cv-hero-media-inner">
            <Image
              src="/images/capabilities/camera-compound-v.png"
              alt="Compound-V In-Store Behavioral Perception Interface"
              width={1920}
              height={1080}
              priority
              className="cv-hero-img"
            />
          </div>
        </div>

        {/* ── Metrics Strip ── */}
        <section
          className="cv-metrics-strip"
          aria-label="Key Performance Indicators"
        >
          <div className="cv-metric-cell">
            <span className="cv-metric-value">&lt; 50ms</span>
            <span className="cv-metric-label">Local Edge Response</span>
            <p className="cv-metric-desc">
              Real-time inference loop executed entirely on-premise without
              external network latency.
            </p>
          </div>

          <div className="cv-metric-cell">
            <span className="cv-metric-value">85%+</span>
            <span className="cv-metric-label">False Alarm Reduction</span>
            <p className="cv-metric-desc">
              Illumination-invariant differential analysis ignores shadows,
              reflections, and lighting shifts.
            </p>
          </div>

          <div className="cv-metric-cell">
            <span className="cv-metric-value">100%</span>
            <span className="cv-metric-label">Privacy Compliant</span>
            <p className="cv-metric-desc">
              Zero facial recognition, zero biometric databases. Strictly
              anonymized spatial motion coordinates.
            </p>
          </div>

          <div className="cv-metric-cell">
            <span className="cv-metric-value">30 FPS</span>
            <span className="cv-metric-label">Real-Time Operator HUD</span>
            <p className="cv-metric-desc">
              Decoupled multi-rate display engine providing instantaneous video
              telemetry to floor teams.
            </p>
          </div>
        </section>

        {/* ── Section 1: The Core Problem ── */}
        <section className="cv-editorial-section">
          <div className="cv-two-col">
            <div className="cv-col-sticky">
              <h2 className="cv-section-title">
                Why Conventional Vision Fails in Physical Retail
              </h2>
            </div>

            <div className="cv-col-content">
              <p className="cv-prose">
                Traditional retail loss prevention has long oscillated between
                two extremes: passive CCTV cameras that merely record theft for
                post-incident review, or naive AI systems that overwhelm store
                managers with hundreds of false alarms every shift.
              </p>

              <p className="cv-prose">
                Through empirical field measurements, our engineering team
                uncovered the fatal flaw behind most retail vision algorithms:{" "}
                <span className="cv-prose-highlight">
                  The 15-Pixel Hand Tracking Trap.
                </span>{" "}
                Under standard ceiling-mounted security cameras, human hands
                frequently occupy as little as 15 pixels. Systems that depend on
                hand-keypoint gestures and micro-finger tracking inevitably
                collapse when hands dip into shopping baskets, grab items behind
                display dividers, or move behind shopping carts.
              </p>

              <div className="cv-cards-grid">
                <div className="cv-card">
                  <div className="cv-card-header">
                    <div className="cv-card-icon">
                      <AlertTriangle size={18} aria-hidden="true" />
                    </div>
                    <h3 className="cv-card-title">Ambient Lighting Drift</h3>
                  </div>
                  <p className="cv-card-body">
                    Shoppers walking between overhead lighting arrays cast deep
                    moving silhouettes across shelf slots. Standard pixel-difference
                    algorithms mistake ambient shading shifts for product
                    removals.
                  </p>
                </div>

                <div className="cv-card">
                  <div className="cv-card-header">
                    <div className="cv-card-icon">
                      <Eye size={18} aria-hidden="true" />
                    </div>
                    <h3 className="cv-card-title">Temporary Aisle Occlusion</h3>
                  </div>
                  <p className="cv-card-body">
                    Shoppers browse in clusters, pushing carts and standing
                    directly between cameras and shelves. Fragile trackers lose
                    shopper identity within seconds, breaking continuous visit
                    history.
                  </p>
                </div>

                <div className="cv-card">
                  <div className="cv-card-header">
                    <div className="cv-card-icon">
                      <Server size={18} aria-hidden="true" />
                    </div>
                    <h3 className="cv-card-title">Cloud Latency &amp; Cost</h3>
                  </div>
                  <p className="cv-card-body">
                    Streaming multiple high-resolution camera feeds to cloud
                    servers introduces 2–5 second delays—far too late to prevent
                    unpaid exits—while incurring exorbitant recurring bandwidth
                    charges.
                  </p>
                </div>

                <div className="cv-card">
                  <div className="cv-card-header">
                    <div className="cv-card-icon">
                      <Lock size={18} aria-hidden="true" />
                    </div>
                    <h3 className="cv-card-title">Biometric Privacy Hazards</h3>
                  </div>
                  <p className="cv-card-body">
                    Consumers and regulators rightly reject facial recognition
                    databases. Cloud storage of customer imagery creates massive
                    legal, regulatory, and brand liabilities for retail
                    operators.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2: The Compound-V Architecture ── */}
        <section className="cv-editorial-section">
          <div className="cv-two-col">
            <div className="cv-col-sticky">
              <h2 className="cv-section-title">
                Physical Evidence Over Fragile Heuristics
              </h2>
            </div>

            <div className="cv-col-content">
              <p className="cv-prose">
                Compound-V discards unreliable hand-tracking heuristics in favor
                of an evidence-anchored pipeline. Rather than guessing what a
                15-pixel hand might be holding, our engine tracks confirmed
                physical fixture evidence combined with continuous temporal
                shopper reasoning.
              </p>

              <div className="cv-pipeline-container">
                <div className="cv-pipeline-header">
                  <h3 className="cv-pipeline-title">
                    Four-Stage Edge Pipeline Overview
                  </h3>
                  <p className="cv-pipeline-desc">
                    High-throughput, real-time spatial intelligence executed
                    entirely on local edge compute appliances.
                  </p>
                </div>

                <div className="cv-pipeline-steps">
                  <div className="cv-step-box">
                    <span className="cv-step-number">Stage 01</span>
                    <h4 className="cv-step-title">Spatial Movement &amp; Zones</h4>
                    <p className="cv-step-desc">
                      Constant-time tracking of human presence and body joints
                      within calibrated 2D floor polygon zones. Maintains
                      trajectory continuity even when limbs are occluded behind
                      carts or shelves.
                    </p>
                  </div>

                  <div className="cv-step-box">
                    <span className="cv-step-number">Stage 02</span>
                    <h4 className="cv-step-title">Illumination-Invariant Scene Evidence</h4>
                    <p className="cv-step-desc">
                      Evaluates shelf slots using structural gradient and color
                      chroma differentials. Strips away shadows and exposure
                      shifts, confirming only actual product displacements.
                    </p>
                  </div>

                  <div className="cv-step-box">
                    <span className="cv-step-number">Stage 03</span>
                    <h4 className="cv-step-title">Temporal Journey Modeling</h4>
                    <p className="cv-step-desc">
                      Continuous sequence reasoning preserves each shopper&apos;s
                      interaction timeline (pickup count, put-back count,
                      handover events, and zone dwell time) across the entire store visit.
                    </p>
                  </div>

                  <div className="cv-step-box">
                    <span className="cv-step-number">Stage 04</span>
                    <h4 className="cv-step-title">Two-Tier Alert Arbitration</h4>
                    <p className="cv-step-desc">
                      Corroborates temporal consistency and physical shelf
                      evidence before alerting. Splits outcomes into Critical
                      Real-Time Alerts and Human Audit Review queues.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 3: Dual-Tier Alerting & Anti-Fatigue ── */}
        <section className="cv-editorial-section">
          <div className="cv-two-col">
            <div className="cv-col-sticky">
              <h2 className="cv-section-title">
                Zero False-Alarm Fatigue for Store Teams
              </h2>
            </div>

            <div className="cv-col-content">
              <p className="cv-prose">
                The primary reason security teams disable automated AI systems is
                alert fatigue. If a system triggers five false alarms an hour,
                operators ignore it. Compound-V introduces a guarded state
                handover protocol that guarantees high confidence before sounding
                an alarm.
              </p>

              <div className="cv-tier-grid">
                <div className="cv-tier-card tier-critical">
                  <span className="cv-tier-tag">
                    <ShieldAlert size={14} aria-hidden="true" />
                    Tier 1: Critical Real-Time Alert
                  </span>
                  <h3 className="cv-tier-title">High-Risk Verified Evidence</h3>
                  <p className="cv-tier-desc">
                    Triggered only when an item removal is physically verified on
                    the shelf, the object trajectory confirms concealment or
                    unpaid exit trajectory, and the temporal pattern is sustained
                    across multiple consecutive verification ticks.
                  </p>
                  <ul className="cv-tier-list" role="list">
                    <li className="cv-tier-item">
                      <CheckCircle2 size={14} color="var(--color-brand)" />
                      <span>Instant floor staff &amp; security radio notification</span>
                    </li>
                    <li className="cv-tier-item">
                      <CheckCircle2 size={14} color="var(--color-brand)" />
                      <span>Automated video replay generation (10s buffer)</span>
                    </li>
                    <li className="cv-tier-item">
                      <CheckCircle2 size={14} color="var(--color-brand)" />
                      <span>Zero-latency HUD overlay highlight for floor team</span>
                    </li>
                  </ul>
                </div>

                <div className="cv-tier-card tier-review">
                  <span className="cv-tier-tag">
                    <FileCheck2 size={14} aria-hidden="true" />
                    Tier 2: Human Audit Review Queue
                  </span>
                  <h3 className="cv-tier-title">Silent Ambiguity Ledger</h3>
                  <p className="cv-tier-desc">
                    When visual evidence is incomplete—such as a shopper lingering
                    in an occluded angle, or customer-to-customer item handovers
                    requiring checkout confirmation—the system abstains from
                    disruptive alarms and logs the event for silent verification.
                  </p>
                  <ul className="cv-tier-list" role="list">
                    <li className="cv-tier-item">
                      <CheckCircle2 size={14} color="var(--color-fg-muted)" />
                      <span>Silent logging to supervisor review dashboard</span>
                    </li>
                    <li className="cv-tier-item">
                      <CheckCircle2 size={14} color="var(--color-fg-muted)" />
                      <span>Cross-checked against POS checkout register records</span>
                    </li>
                    <li className="cv-tier-item">
                      <CheckCircle2 size={14} color="var(--color-fg-muted)" />
                      <span>Continuous background calibration feedback loop</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 4: Privacy by Design ── */}
        <section className="cv-editorial-section">
          <div className="cv-two-col">
            <div className="cv-col-sticky">
              <h2 className="cv-section-title">
                Enterprise Ethics: Privacy by Design
              </h2>
            </div>

            <div className="cv-col-content">
              <div className="cv-privacy-box">
                <div className="cv-privacy-content">
                  <p className="cv-prose">
                    Compound-V is engineered from the ground up to respect
                    consumer privacy and adhere to the strictest global regulatory
                    standards. It treats physical security and human dignity as
                    complementary engineering requirements.
                  </p>

                  <div className="cv-privacy-points">
                    <div className="cv-privacy-pill">
                      <ShieldCheck size={16} color="var(--color-brand)" />
                      <span>Zero Facial Recognition</span>
                    </div>

                    <div className="cv-privacy-pill">
                      <Lock size={16} color="var(--color-brand)" />
                      <span>No Biometric Data Storage</span>
                    </div>

                    <div className="cv-privacy-pill">
                      <Server size={16} color="var(--color-brand)" />
                      <span>100% On-Premise Processing</span>
                    </div>

                    <div className="cv-privacy-pill">
                      <Activity size={16} color="var(--color-brand)" />
                      <span>Anonymized Spatial Telemetry</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="cv-prose" style={{ fontSize: "0.95rem" }}>
                    Video streams never leave the store&apos;s local appliance. All
                    spatial reasoning is performed in volatile runtime memory
                    using abstract coordinate points. Once a customer exits the
                    store, their ephemeral track state is safely purged.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 5: Real-World Business Outcomes ── */}
        <section className="cv-editorial-section">
          <div className="cv-two-col">
            <div className="cv-col-sticky">
              <h2 className="cv-section-title">
                Comprehensive Store Operations &amp; Intelligence
              </h2>
            </div>

            <div className="cv-col-content">
              <p className="cv-prose">
                While Compound-V was built to eliminate shrinkage and checkout
                discrepancies, the underlying perception engine yields profound
                operational benefits across the entire physical store lifecycle:
              </p>

              <div className="cv-cards-grid">
                <div className="cv-card">
                  <h3 className="cv-card-title">Shrinkage &amp; Theft Interception</h3>
                  <p className="cv-card-body">
                    Identifies product concealment, bulk shelf sweeping, and
                    unpaid checkout bypass in real time, enabling discreet floor
                    staff intervention before suspects exit.
                  </p>
                </div>

                <div className="cv-card">
                  <h3 className="cv-card-title">Checkout Verification</h3>
                  <p className="cv-card-body">
                    Reconciles customer basket handovers against POS register
                    scans, identifying accidental unscanned items and ticket
                    switching at self-checkout stations.
                  </p>
                </div>

                <div className="cv-card">
                  <h3 className="cv-card-title">Customer Journey &amp; Dwell Heatmaps</h3>
                  <p className="cv-card-body">
                    Aggregates anonymous foot-traffic flows, product engagement
                    hotspots, and average aisle dwell times to help merchandisers
                    optimize store layouts.
                  </p>
                </div>

                <div className="cv-card">
                  <h3 className="cv-card-title">Queue &amp; Workforce Velocity</h3>
                  <p className="cv-card-body">
                    Detects checkout register queue formation in real time,
                    automatically alerting floor managers to dispatch additional
                    cashiers before customer friction occurs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Case Study Footer CTA ── */}
        <div className="cv-cta-banner">
          <h2 className="cv-cta-title">
            Deploy Compound-V in Your Retail Environment
          </h2>
          <p className="cv-cta-subtitle">
            Compound-V connects directly with existing CCTV, USB, and
            RTSP camera networks. Schedule a technical briefing with our
            engineering team to evaluate edge appliance deployment for your
            stores.
          </p>
          <Link href="/#contact" className="cv-cta-btn">
            <span>Schedule a Technical Briefing</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
