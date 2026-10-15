import type { Metadata } from 'next';
import LocalBusinessesClient from './LocalBusinessesClient';

export const metadata: Metadata = {
  title: "Work for Local Businesses — Digital Craftsmanship",
  description:
    "We partner with local businesses from restaurants to fashion brands to craft premium digital experiences that elevate their brand and drive real growth.",
  alternates: {
    canonical: "/local-businesses",
  },
  openGraph: {
    title: "Work for Local Businesses | Niena Labs",
    description:
      "We partner with local businesses from restaurants to fashion brands to craft premium digital experiences that elevate their brand and drive real growth.",
    url: "https://www.nienalabs.com/local-businesses",
    type: "website",
  },
};

export default function LocalBusinessesPage() {
  return <LocalBusinessesClient />;
}
