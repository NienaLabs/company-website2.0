import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/solutions",
        destination: "/#pillars",
        permanent: false,
      },
      {
        source: "/services/developer-tools",
        destination: "/services/devtools",
        permanent: true,
      },
      {
        source: "/services/enterprise-web",
        destination: "/services/enterprise",
        permanent: true,
      },
      {
        source: "/services/mobile-apps",
        destination: "/services/mobile",
        permanent: true,
      },
      {
        source: "/services/ai-driven",
        destination: "/services/ai",
        permanent: true,
      },
      {
        source: "/services/ai-systems",
        destination: "/services/ai",
        permanent: true,
      },
      {
        source: "/services/cloud-infrastructure",
        destination: "/services/cloud",
        permanent: true,
      },
      {
        source: "/services/desktop-apps",
        destination: "/services/desktop",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
