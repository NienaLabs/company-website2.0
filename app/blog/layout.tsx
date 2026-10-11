import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Engineering Blog & Technical Insights — Niena Labs',
  description:
    'Deep dives on enterprise software architecture, building search engines from scratch, React Server Components, low-level algorithms, and AI systems.',
  keywords: [
    'Software Engineering',
    'Search Engine Architecture',
    'Inverted Index',
    'React Server Components',
    'AI Systems',
    'System Design',
    'Niena Labs Blog',
  ],
  alternates: {
    canonical: 'https://nienalabs.com/blog',
  },
  openGraph: {
    title: 'Engineering Blog & Technical Insights — Niena Labs',
    description:
      'Deep dives on enterprise software architecture, building search engines from scratch, React Server Components, low-level algorithms, and AI systems.',
    type: 'website',
    url: 'https://nienalabs.com/blog',
    siteName: 'Niena Labs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Blog & Technical Insights — Niena Labs',
    description:
      'Deep dives on enterprise software architecture, building search engines from scratch, React Server Components, low-level algorithms, and AI systems.',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
