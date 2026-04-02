import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nienalabs — Building the Software That Pushes Humanity Forward",
  description:
    "Nienalabs builds scalable, AI-driven enterprise applications for businesses ready to scale. Custom software engineered with precision, for ideas that matter.",
  keywords: [
    "enterprise software",
    "AI applications",
    "custom software development",
    "scalable applications",
    "software engineering",
    "Nienalabs",
  ],
  openGraph: {
    title: "Nienalabs — Built with Purpose",
    description:
      "We build scalable enterprise software for companies that intend to matter.",
    type: "website",
    url: "https://nienalabs.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nienalabs — Built with Purpose",
  },
  icons: {
    icon: [
      { url: "/logo-white.svg", sizes: "48x48", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
