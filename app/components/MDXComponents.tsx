import React from 'react';
import { Typography } from './ui/Typography';
import Link from 'next/link';
import Image from 'next/image';

export const MDXComponents = {
  h1: (props: any) => <Typography variant="large-title" className="mt-12 mb-6" {...props} />,
  h2: (props: any) => <Typography variant="title1" className="mt-10 mb-5" {...props} />,
  h3: (props: any) => <Typography variant="title2" className="mt-8 mb-4" {...props} />,
  p: (props: any) => <Typography variant="body1" className="mb-6 text-[--color-text-secondary]" {...props} />,
  a: ({ href, children, ...props }: any) => {
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className="text-[--color-primary] hover:shadow-[0_0_0_4px_var(--amber-glow)] rounded-sm transition-all duration-300 outline-none focus-visible:shadow-[0_0_0_4px_var(--amber-glow)]" {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-[--color-primary] hover:shadow-[0_0_0_4px_var(--amber-glow)] rounded-sm transition-all duration-300 outline-none focus-visible:shadow-[0_0_0_4px_var(--amber-glow)]" {...props}>
        {children}
      </a>
    );
  },
  ul: (props: any) => <ul className="list-disc list-inside mb-6 text-[--color-text-secondary]" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-6 text-[--color-text-secondary]" {...props} />,
  li: (props: any) => <li className="mb-2" {...props} />,
  pre: (props: any) => (
    <pre className="bg-[--color-surface-glass-base] backdrop-blur-md p-6 rounded-[var(--radius-2xl)] overflow-x-auto mb-6 border border-[--color-border-subtle]" {...props} />
  ),
  code: (props: any) => (
    <code className="font-mono text-[14px] bg-[--color-surface-sunken] px-1.5 py-0.5 rounded-[var(--radius-sm)] text-[--color-text-primary]" style={{ fontFamily: 'var(--font-mono)' }} {...props} />
  ),
  img: (props: any) => (
    <div className="relative w-full aspect-video my-8 rounded-[var(--radius-3xl)] overflow-hidden">
      <Image src={props.src} alt={props.alt || ''} fill className="object-cover" />
    </div>
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-[--color-primary] pl-6 py-2 my-6 italic bg-[--color-surface-glass-base] rounded-r-[var(--radius-lg)] text-[--color-text-secondary]" {...props} />
  )
};
