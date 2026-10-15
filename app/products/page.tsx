import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Products & Open Source Software",
  description:
    "Explore software built by Niena Labs: AI career platforms, desktop utilities, high-performance drag-and-drop libraries, and Next.js developer tools.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Products & Open Source Software | Niena Labs",
    description:
      "Explore software built by Niena Labs: AI career platforms, desktop utilities, high-performance drag-and-drop libraries, and Next.js developer tools.",
    url: "https://www.nienalabs.com/products",
    type: "website",
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
