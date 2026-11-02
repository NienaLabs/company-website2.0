import type { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers — Engineering Collective",
  description:
    "We engineer deterministic computer vision pipelines, embedded perception engines, and high-assurance systems for factories, physical facilities, and edge hardware. Explore disciplines and speculative opportunities at Niena Labs.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers — Engineering Collective | Niena Labs",
    description:
      "We engineer deterministic computer vision pipelines, embedded perception engines, and high-assurance systems for physical facilities and edge silicon.",
    url: "https://www.nienalabs.com/careers",
    type: "website",
  },
};

export default function CareersPage() {
  return <CareersClient />;
}
