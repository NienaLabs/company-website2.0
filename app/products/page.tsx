import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Specialized Software & Systems | Niena Labs",
  description:
    "Explore specialized software, edge perception pipelines, and infrastructure engineered by Niena Labs: Compound-V retail perception, factory defect inspection, sortation classifiers, and ambient voice agents.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Specialized Software & Systems | Niena Labs",
    description:
      "Explore specialized software, edge perception pipelines, and infrastructure engineered by Niena Labs: Compound-V retail perception, factory defect inspection, sortation classifiers, and ambient voice agents.",
    url: "https://www.nienalabs.com/products",
    type: "website",
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
