import type { Metadata, Viewport } from "next";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import CookieConsent from "./components/CookieConsent";

export const viewport: Viewport = {
  themeColor: "#e0d12e",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nienalabs.com"),
  title: {
    default: "Niena Labs — Intelligence for the Real Economy",
    template: "%s | Niena Labs",
  },
  description:
    "Niena Labs builds specialized software, infrastructure, and hardware that bring intelligence into the real economy and improve people's lives across businesses, factories, institutions, and living spaces.",
  keywords: [
    "intelligence products",
    "specialized software",
    "edge infrastructure",
    "connected hardware",
    "industrial computer vision",
    "real economy intelligence",
    "decision intelligence",
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
    title: "Niena Labs — Intelligence for the Real Economy",
    description:
      "Specialized software, infrastructure, and hardware designed to bring intelligence into businesses, factories, institutions, and living spaces.",
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
    title: "Niena Labs | There's always a beginning",
    description:
      "Specialized software, infrastructure, and hardware that bring intelligence into the real economy.",
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
    "Niena Labs builds specialized software, infrastructure, and hardware that bring intelligence into the real economy and improve people's lives.",
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
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  const hasValidGtm = Boolean(gtmId && gtmId.startsWith("GTM-"));
  const hasValidGa = Boolean(gaId && gaId.startsWith("G-"));

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google Consent Mode v2: Default to denied unless previously granted */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              try {
                var consent = localStorage.getItem('niena_cookie_consent');
                var defaultState = (consent === 'granted') ? 'granted' : 'denied';
                gtag('consent', 'default', {
                  'ad_storage': defaultState,
                  'ad_user_data': defaultState,
                  'ad_personalization': defaultState,
                  'analytics_storage': defaultState,
                  'wait_for_update': 500
                });
              } catch(e) {
                gtag('consent', 'default', {
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied',
                  'analytics_storage': 'denied',
                  'wait_for_update': 500
                });
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
      </head>
      {hasValidGtm && <GoogleTagManager gtmId={gtmId!} />}
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
            <CookieConsent />
          </SmoothScrollProvider>
        </ThemeProvider>
        {hasValidGa && <GoogleAnalytics gaId={gaId!} />}
      </body>
    </html>
  );
}
