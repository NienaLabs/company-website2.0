import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Niena Labs',
  description:
    'Insights on enterprise software, AI architecture, and the craft of building software that matters.',
  openGraph: {
    title: 'Blog — Niena Labs',
    description:
      'Insights on enterprise software, AI architecture, and the craft of building software that matters.',
    type: 'website',
    url: 'https://nienalabs.com/blog',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
