import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#d97706" },
    { media: "(prefers-color-scheme: dark)", color: "#ffb020" },
  ],
};

export const metadata: Metadata = {
  title: "Niena Labs — Building the Software That Pushes Humanity Forward",
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
  openGraph: {
    title: "Niena Labs — Built with Purpose",
    description:
      "We build scalable enterprise software for companies that intend to matter.",
    type: "website",
    url: "https://Niena Labs.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Niena Labs — Built with Purpose",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
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
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
