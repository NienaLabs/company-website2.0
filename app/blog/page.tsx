import { BlogPostMeta, getBlogPosts, getCategories } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import ScrollBlurReveal from '@/app/components/ui/ScrollBlurReveal';
import '@/app/blog/blog.css';

export const metadata: Metadata = {
  title: 'Engineering Essays & Field Reports | Niena Labs',
  description:
    'Technical deep dives on edge-native perception, streaming computer vision, physical-world machine learning, and high-assurance systems.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Engineering Essays & Field Reports | Niena Labs',
    description:
      'Technical deep dives on edge-native perception, streaming computer vision, physical-world machine learning, and high-assurance systems.',
    url: 'https://www.nienalabs.com/blog',
    type: 'website',
  },
};

function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-card" prefetch={true}>
      {post.coverImage && (
        <div className="blog-card-image">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="blog-card-body">
        <div className="blog-card-meta">
          <span className="blog-category-tag">{post.category}</span>
          <span className="blog-meta-separator" />
          <time dateTime={post.date}>
            {new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }).format(new Date(post.date))}
          </time>
        </div>

        <h3 className="blog-card-title">{post.title}</h3>

        <p className="blog-card-excerpt">{post.excerpt}</p>

        <div className="blog-card-author-row">
          {post.authorAvatar && (
            <div className="blog-card-author-avatar">
              <Image
                src={post.authorAvatar}
                alt={post.author}
                fill
                className="object-cover"
              />
            </div>
          )}
          <span className="blog-card-author-name">{post.author}</span>
          <span className="blog-card-reading-time">{post.readingTime} min read</span>
        </div>
      </div>
    </Link>
  );
}

function BlogFeatured({ post }: { post: BlogPostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-featured" prefetch={true}>
      <div className="blog-featured-image">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 55vw"
          className="object-cover"
        />
      </div>

      <div className="blog-featured-body">
        <div className="blog-card-meta">
          <span className="blog-category-tag featured">{post.category}</span>
          <span className="blog-meta-separator" />
          <time dateTime={post.date}>
            {new Intl.DateTimeFormat('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            }).format(new Date(post.date))}
          </time>
          <span className="blog-meta-separator" />
          <span>{post.readingTime} min read</span>
        </div>

        <h2 className="blog-featured-title">{post.title}</h2>

        <p className="blog-featured-excerpt">{post.excerpt}</p>

        <div className="blog-featured-author-row">
          {post.authorAvatar && (
            <div className="blog-featured-author-avatar">
              <Image
                src={post.authorAvatar}
                alt={post.author}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            <span className="blog-featured-author-name">{post.author}</span>
            {post.authorRole && (
              <span className="blog-featured-author-role">{post.authorRole}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function BlogListingPage() {
  const posts = await getBlogPosts();
  const categories = await getCategories();

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const regularPosts = posts.filter((p) => p.slug !== featuredPost?.slug);

  return (
    <main className="blog-listing-main">
      {/* ── Blog Hero ── */}
      <section className="blog-listing-hero" aria-label="Research & Essays">
        <div className="blog-hero-container">
          <div className="blog-hero-content">
            <span className="blog-hero-tag">Engineering Research & Field Notes</span>

            <ScrollBlurReveal as="h1" className="blog-hero-title">
              Engineering essays and technical insights.
            </ScrollBlurReveal>

            <ScrollBlurReveal as="p" className="blog-hero-lead">
              Technical deep dives on edge-native perception, streaming computer
              vision pipelines, physical-world machine learning, and
              high-assurance systems architecture.
            </ScrollBlurReveal>
          </div>
        </div>
      </section>

      {/* ── Blog Posts Section ── */}
      <div className="blog-page-container">
        {/* Categories Bar */}
        <div className="blog-filters">
          <button className="blog-filter-pill active">All Posts</button>
          {categories.map((category) => (
            <button key={category} className="blog-filter-pill">
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && <BlogFeatured post={featuredPost} />}

        {/* Posts Grid */}
        {regularPosts.length > 0 ? (
          <div className="blog-grid">
            {regularPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="blog-empty">
            <h2>No additional posts found.</h2>
            <p>Check back shortly for upcoming technical field reports.</p>
          </div>
        )}
      </div>
    </main>
  );
}
