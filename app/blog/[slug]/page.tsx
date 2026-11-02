import { getBlogPostBySlug, getBlogPosts, extractHeadings } from '@/lib/blog';
import { renderBlogContent } from '@/lib/blog-renderer';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ShareButtons from '@/app/components/ShareButtons';
import 'katex/dist/katex.min.css';
import '@/app/blog/blog.css';

// ── Static Generation & Metadata ──────────────────────────────────────────

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
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

  const postUrl = `https://www.nienalabs.com/blog/${slug}`;
  const imageUrl = post.meta.coverImage.startsWith('http')
    ? post.meta.coverImage
    : `https://www.nienalabs.com${post.meta.coverImage}`;

  return {
    title: `${post.meta.title} — Niena Labs Blog`,
    description: post.meta.excerpt,
    keywords: post.meta.tags,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      url: postUrl,
      siteName: 'Niena Labs',
      type: 'article',
      publishedTime: post.meta.date,
      modifiedTime: post.meta.updatedAt || post.meta.date,
      authors: [post.meta.author],
      tags: post.meta.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.title,
      description: post.meta.excerpt,
      images: [imageUrl],
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

  const postUrl = `https://www.nienalabs.com/blog/${slug}`;
  const imageUrl = post.meta.coverImage.startsWith('http')
    ? post.meta.coverImage
    : `https://www.nienalabs.com${post.meta.coverImage}`;

  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    headline: post.meta.title,
    description: post.meta.excerpt,
    image: [imageUrl],
    datePublished: post.meta.date,
    dateModified: post.meta.updatedAt || post.meta.date,
    author: {
      '@type': 'Person',
      name: post.meta.author,
      ...(post.meta.authorRole ? { jobTitle: post.meta.authorRole } : {}),
      ...(post.meta.authorProfile?.startsWith('http')
        ? { url: post.meta.authorProfile }
        : {}),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Niena Labs',
      url: 'https://www.nienalabs.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.nienalabs.com/android-chrome-512x512.png',
      },
    },
    keywords: post.meta.tags?.join(', '),
  };

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.nienalabs.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.nienalabs.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.meta.title,
        item: postUrl,
      },
    ],
  };

  return (
    <main className="blog-article-main">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      <article>
        <header className="blog-article-header">
          <div className="blog-article-header-inner">
            <div className="blog-article-cover-frame">
              <Image
                src={post.meta.coverImage}
                alt={post.meta.title}
                fill
                priority
                sizes="(max-width: 960px) 100vw, 960px"
                className="object-cover"
              />
            </div>

            <div className="blog-article-meta-block">
              <div className="blog-card-meta justify-center">
                <span className="blog-category-tag active">{post.meta.category}</span>
                <span className="blog-meta-separator" />
                <span>{formattedDate}</span>
                <span className="blog-meta-separator" />
                <span>{post.meta.readingTime} min read</span>
              </div>

              <h1 className="blog-article-title">{post.meta.title}</h1>

              <div className="blog-article-author-row">
                {post.meta.authorAvatar && (
                  <div className="blog-article-author-avatar">
                    <Image
                      src={post.meta.authorAvatar}
                      alt={post.meta.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="text-left">
                  {post.meta.authorProfile ? (
                    <a
                      href={post.meta.authorProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="blog-article-author-link"
                    >
                      {post.meta.author}
                    </a>
                  ) : (
                    <span className="blog-article-author-name">
                      {post.meta.author}
                    </span>
                  )}
                  {post.meta.authorRole && (
                    <span className="blog-article-author-role">
                      {post.meta.authorRole}
                    </span>
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

              <ShareButtons
                slug={post.meta.slug}
                title={post.meta.title}
                author={post.meta.author}
              />
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
                        className={`blog-toc-item ${i === 0 ? 'active' : ''}`}
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

      {/* Return to Blog Link */}
      <div className="blog-post-container pt-0">
        <div className="blog-related">
          <h2 className="blog-related-title">More from our blog</h2>
          <Link href="/blog" className="blog-back-link">
            &larr; Back to all posts
          </Link>
        </div>
      </div>
    </main>
  );
}
