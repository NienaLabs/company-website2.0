import type { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers — Join Our Engineering Collective",
  description:
    "We build scalable, AI-driven enterprise applications for businesses ready to scale. Join our collective of engineers building software with purpose and precision.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers — Join Our Engineering Collective | Niena Labs",
    description:
      "We build scalable, AI-driven enterprise applications for businesses ready to scale. Join our collective of engineers building software with purpose and precision.",
    url: "https://www.nienalabs.com/careers",
    type: "website",
  },
};

export default function CareersPage() {
  return <CareersClient />;
}
