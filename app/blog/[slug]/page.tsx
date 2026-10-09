import { getBlogPostBySlug, getBlogPosts, extractHeadings } from '@/lib/blog';
import { renderBlogContent } from '@/lib/blog-renderer';
import { Typography } from '@/app/components/ui/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ShareButtons from '@/app/components/ShareButtons';
import 'katex/dist/katex.min.css';

const HERO_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z' opacity='.5'%3E%3C/path%3E%3Cpath d='M15 15h50l-5 5H20v40l-5 5V15zm0 50h50V15L80 0v80H0l15-15zm32.07-32.07l3.54-3.54A15 15 0 0 1 29.4 50.6l3.53-3.53a10 10 0 1 0 14.14-14.14zM32.93 47.07a10 10 0 1 1 14.14-14.14L32.93 47.07z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")`;

// ── Static Generation & Metadata ──────────────────────────────────────────

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found — Niena Labs Blog',
    };
  }

  return {
    title: `${post.meta.title} — Niena Labs Blog`,
    description: post.meta.excerpt,
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      type: 'article',
      publishedTime: post.meta.date,
      modifiedTime: post.meta.updatedAt || post.meta.date,
      authors: [post.meta.author],
      tags: post.meta.tags,
      images: [{ url: new URL(post.meta.coverImage, 'https://nienalabs.com').toString() }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.title,
      description: post.meta.excerpt,
      images: [new URL(post.meta.coverImage, 'https://nienalabs.com').toString()],
    },
  };
}

// ── Page Component ─────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const htmlContent = renderBlogContent(post.content);
  const headings = extractHeadings(post.content);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(post.meta.date));

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.meta.title,
            datePublished: post.meta.date,
            dateModified: post.meta.updatedAt || post.meta.date,
            author: { '@type': 'Person', name: post.meta.author },
            publisher: { '@type': 'Organization', name: 'Niena Labs' },
            image: post.meta.coverImage,
            description: post.meta.excerpt,
          }),
        }}
      />

      <article>
        <header 
          data-theme="dark"
          className="relative overflow-hidden flex flex-col justify-center border-b border-[var(--color-border)]"
          style={{
            backgroundColor: '#0a0a0c',
            backgroundImage: HERO_BG,
            paddingTop: 'calc(var(--space-9) + 80px)',
            paddingBottom: 'var(--space-9)',
          }}
        >
          <div 
            className="w-full max-w-[1120px] mx-auto relative z-10 flex flex-col items-center"
            style={{ gap: '4rem', paddingLeft: '24px', paddingRight: '24px' }}
          >
            
            <div className="relative z-10 shadow-2xl border border-[#ffffff10] w-full max-w-[960px] aspect-[16/9] md:aspect-[21/9] rounded-[var(--radius-3xl)] overflow-hidden">
              <Image
                src={post.meta.coverImage}
                alt={post.meta.title}
                fill
                priority
                sizes="(max-width: 960px) 100vw, 960px"
                className="object-cover"
              />
            </div>

            <div className="max-w-[800px] w-full flex flex-col items-center text-center px-2">
              <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                <span
                  className="blog-filter-pill active"
                  style={{ minHeight: '24px', padding: '0 12px', fontSize: '11px' }}
                >
                  {post.meta.category}
                </span>
                <span className="text-zinc-400 text-[13px] font-medium">{formattedDate}</span>
                <div className="w-[4px] h-[4px] rounded-full bg-zinc-600" />
                <span className="text-zinc-400 text-[13px] font-medium">
                  {post.meta.readingTime} min read
                </span>
              </div>

              <Typography variant="display" as="h1" className="text-white leading-tight mb-8 break-words w-full">
                {post.meta.title}
              </Typography>

              <div className="flex items-center justify-center gap-4">
                {post.meta.authorAvatar && (
                  <div className="w-12 h-12 rounded-full overflow-hidden relative border border-[#ffffff20]">
                    <Image src={post.meta.authorAvatar} alt={post.meta.author} fill className="object-cover" />
                  </div>
                )}
                <div className="text-left">
                  {post.meta.authorProfile ? (
                    <a href={post.meta.authorProfile} target="_blank" rel="noopener noreferrer" className="hover:underline text-[var(--amber)] transition-colors">
                      <Typography variant="caption1" className="block font-medium">
                        {post.meta.author}
                      </Typography>
                    </a>
                  ) : (
                    <Typography variant="caption1" className="block font-medium text-zinc-100">
                      {post.meta.author}
                    </Typography>
                  )}
                  {post.meta.authorRole && (
                    <Typography variant="caption1" className="text-zinc-400 block mt-0.5">
                      {post.meta.authorRole}
                    </Typography>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="blog-post-container">
          <div className="blog-layout-inner">
            <div className="blog-content">
            {/* The generated HTML from TipTap */}
            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
            
            <ShareButtons slug={post.meta.slug} title={post.meta.title} author={post.meta.author} />
          </div>

          {/* Desktop Table of Contents */}
          {headings.length > 0 && (
            <aside className="blog-toc">
              <div className="blog-toc-title">On this page</div>
              <ul className="blog-toc-list">
                {headings.map((heading, i) => (
                  <li key={i}>
                    <a
                      href={`#${heading.id}`}
                      className={`blog-toc-item ${i === 0 ? 'active' : ''}`} // Hardcoded active for now
                      data-level={heading.level}
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
        </div>
      </article>

      {/* Related Posts could go here */}
      <div className="blog-post-container !pt-0">
        <div className="blog-related">
          <Typography variant="title2" className="blog-related-title">
            More from our blog
          </Typography>
          <Link href="/blog" className="text-[var(--amber)] hover:underline">
            &larr; Back to all posts
          </Link>
        </div>
      </div>
    </main>
  );
}
