import type { Metadata } from "next";
import CompoundVClient from "./CompoundVClient";

export const metadata: Metadata = {
  title: "Compound-V: Retail Perception & Behavioral Engine — Case Study",
  description:
    "An engineering case study on Compound-V: Niena Labs' edge-native retail perception engine designed for in-store behavioral intelligence, loss prevention, and checkout verification with zero cloud dependency.",
  alternates: {
    canonical: "/case-studies/compound-v",
  },
  openGraph: {
    title: "Compound-V: Retail Perception & Behavioral Engine — Case Study | Niena Labs",
    description:
      "How Niena Labs engineered an edge-native retail perception and behavioral engine that eliminates false alarms and protects store inventory with 100% on-premise privacy compliance.",
    url: "https://www.nienalabs.com/case-studies/compound-v",
    type: "article",
    images: [
      {
        url: "/images/capabilities/camera-compound-v.png",
        width: 1200,
        height: 800,
        alt: "Compound-V Case Study",
      },
    ],
  },
};

export default function CompoundVCaseStudyPage() {
  return <CompoundVClient />;
}

