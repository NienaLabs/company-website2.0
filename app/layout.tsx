import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SmoothScrollProvider from "./components/SmoothScrollProvider";

export const viewport: Viewport = {
  themeColor: "#e0d12e",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nienalabs.com"),
  title: {
    default: "Niena Labs — Building the Software That Pushes Humanity Forward",
    template: "%s | Niena Labs",
  },
  description:
    "Niena Labs builds scalable, AI-driven enterprise applications for businesses ready to scale. Custom software engineered with precision, for ideas that matter.",
  keywords: [
    "enterprise software",
    "AI applications",
    "custom software development",
    "scalable applications",
    "software engineering",
    "Niena Labs",
  ],
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Niena Labs — Built with Purpose",
    description:
      "We build scalable enterprise software for companies that intend to matter.",
    type: "website",
    url: "https://www.nienalabs.com",
    siteName: "Niena Labs",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Niena Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Niena Labs — Built with Purpose",
    description:
      "We build scalable enterprise software for companies that intend to matter.",
    images: ["/android-chrome-512x512.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
};

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Niena Labs",
  url: "https://www.nienalabs.com",
  logo: "https://www.nienalabs.com/android-chrome-512x512.png",
  description:
    "Niena Labs builds scalable, AI-driven enterprise applications for businesses ready to scale. Custom software engineered with precision.",
  sameAs: [
    "https://github.com/orgs/Nienalabs-community",
    "https://gh.linkedin.com/company/niena-labs",
    "https://x.com/LabsNiena86233",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@nienalabs.com",
    contactType: "customer service",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="/niena-spiral-background.svg"
          as="image"
          type="image/svg+xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <Navbar />
            <main className="flex-grow min-h-screen flex flex-col">
              {children}
            </main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
