import { BlogPostMeta, getBlogPosts, getCategories, getTags } from '@/lib/blog';
import { Typography } from '@/app/components/ui/Typography';
import Link from 'next/link';
import Image from 'next/image';
import { Card, DynamicColor } from '@/app/components/ui/Card';

// ── Components ─────────────────────────────────────────────────────────────

function BlogCard({ post, index }: { post: BlogPostMeta; index: number }) {
  const variant = post.cardTheme && post.cardTheme !== 'default' ? 'dynamic' : 'outlined';
  const dynamicColor = (post.cardTheme !== 'default' ? post.cardTheme : '1') as DynamicColor;
  
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full outline-none group" prefetch={true}>
      <Card 
        variant={variant} 
        dynamicColor={dynamicColor} 
        interactive={true}
        image={post.coverImage}
        className="h-full cursor-pointer rounded-[var(--radius-2xl)]"
      >
        <div className="flex flex-col flex-1 gap-3">
          <div className="flex items-center gap-2 font-body text-xs mb-1">
            <span
              className="blog-filter-pill"
              style={{
                borderColor: variant === 'dynamic' ? `var(--color-alt-${dynamicColor}-fg)` : 'var(--amber)',
                color: variant === 'dynamic' ? `var(--color-alt-${dynamicColor}-fg)` : 'var(--amber)',
                minHeight: '24px',
                padding: '0 8px',
                fontSize: '10px',
              }}
            >
              {post.category}
            </span>
            <div className="w-[3px] h-[3px] rounded-full bg-current opacity-50" />
            <time dateTime={post.date} className="opacity-70">
              {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(post.date))}
            </time>
          </div>
          
          <Typography variant="title2" as="h3" className="mb-2">
            {post.title}
          </Typography>
          
          <Typography variant="body2" className={`line-clamp-2 ${variant === 'dynamic' ? 'opacity-90' : 'text-[var(--text-secondary)]'}`}>
            {post.excerpt}
          </Typography>
          
          <div className="flex items-center gap-2 mt-auto pt-4 text-xs font-medium">
            {post.authorAvatar && (
              <div className="w-6 h-6 rounded-full overflow-hidden relative bg-[var(--surface-2)]">
                <Image src={post.authorAvatar} alt={post.author} fill className="object-cover" />
              </div>
            )}
            <span className="truncate opacity-80">{post.author}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

function BlogFeatured({ post }: { post: BlogPostMeta }) {
  const variant = post.cardTheme && post.cardTheme !== 'default' ? 'dynamic' : 'outlined';
  const dynamicColor = (post.cardTheme !== 'default' ? post.cardTheme : '1') as DynamicColor;

  return (
    <Link href={`/blog/${post.slug}`} className="block outline-none group mb-12" prefetch={true}>
      <Card 
        variant={variant} 
        dynamicColor={dynamicColor} 
        interactive={true}
        className="cursor-pointer rounded-[var(--radius-3xl)] p-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-2 md:p-6">
          <div className="relative w-full aspect-video md:aspect-[4/3] rounded-[var(--radius-2xl)] overflow-hidden">
            <Image src={post.coverImage} alt={post.title} fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 font-body text-xs mb-1">
              <span
                className="blog-filter-pill active"
                style={{
                  minHeight: '24px',
                  padding: '0 8px',
                  fontSize: '10px',
                  borderColor: variant === 'dynamic' ? `var(--color-alt-${dynamicColor}-fg)` : 'var(--amber)',
                  backgroundColor: variant === 'dynamic' ? `var(--color-alt-${dynamicColor}-fg)` : 'var(--amber)',
                  color: variant === 'dynamic' ? `var(--color-alt-${dynamicColor})` : 'var(--color-bg)',
                }}
              >
                {post.category}
              </span>
              <div className="w-[3px] h-[3px] rounded-full bg-current opacity-50" />
              <time dateTime={post.date} className="opacity-70">
                {new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(post.date))}
              </time>
              <div className="w-[3px] h-[3px] rounded-full bg-current opacity-50" />
              <span className="opacity-70">{post.readingTime} min read</span>
            </div>
            
            <Typography variant="title1" as="h2" className="leading-tight">
              {post.title}
            </Typography>
            
            <Typography variant="body1" className={variant === 'dynamic' ? 'opacity-90' : 'text-[var(--text-secondary)]'}>
              {post.excerpt}
            </Typography>
            
            <div className="flex items-center gap-3 mt-4 text-sm font-medium">
              {post.authorAvatar && (
                <div className="w-10 h-10 rounded-full overflow-hidden relative bg-[var(--surface-2)] border border-[var(--border)]">
                  <Image src={post.authorAvatar} alt={post.author} fill className="object-cover" />
                </div>
              )}
              <div>
                <span className="block opacity-90">{post.author}</span>
                {post.authorRole && <span className="block text-xs opacity-60 font-normal">{post.authorRole}</span>}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

const HERO_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z' opacity='.5'%3E%3C/path%3E%3Cpath d='M15 15h50l-5 5H20v40l-5 5V15zm0 50h50V15L80 0v80H0l15-15zm32.07-32.07l3.54-3.54A15 15 0 0 1 29.4 50.6l3.53-3.53a10 10 0 1 0 14.14-14.14zM32.93 47.07a10 10 0 1 1 14.14-14.14L32.93 47.07z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")`;

// ── Page Component ─────────────────────────────────────────────────────────

export default async function BlogListingPage() {
  const posts = await getBlogPosts();
  const categories = await getCategories();

  const featuredPost = posts.find(p => p.featured) || posts[0];
  const regularPosts = posts.filter(p => p.slug !== featuredPost?.slug);

  return (
    <main className="min-h-screen">
      <section 
        data-theme="dark"
        className="relative overflow-hidden flex flex-col justify-center border-b border-[var(--color-border)]"
        style={{
          backgroundColor: '#0a0a0c',
          backgroundImage: HERO_BG,
          paddingTop: 'calc(var(--space-9) + 80px)',
          paddingBottom: 'var(--space-9)',
        }}
      >
        <div className="section-container relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-8">
          <div className="max-w-4xl flex flex-col" style={{ gap: 'var(--space-5)' }}>
            <div>
              <Typography variant="caption1" color="brand" className="uppercase tracking-widest font-bold mb-3">
                Niena Labs Blog
              </Typography>
              <Typography variant="display" className="leading-tight tracking-tight text-white mb-4">
                Insights & Ideas
              </Typography>
            </div>
            
            <div className="flex flex-col max-w-2xl">
              <Typography variant="body1" className="text-xl md:text-2xl leading-relaxed opacity-90 font-medium text-[#d4d4d8]">
                Explore our thoughts on enterprise software architecture, AI integration, 
                design systems, and the craft of building software that matters.
              </Typography>
            </div>
          </div>
        </div>
      </section>

      <div className="blog-page-container mt-8">
        {/* Filter Bar (Static for now, will make interactive in Phase 4) */}
      <div className="blog-filters">
        <button className="blog-filter-pill active">All Posts</button>
        {categories.map(category => (
          <button key={category} className="blog-filter-pill">
            {category}
          </button>
        ))}
      </div>

      {featuredPost && <BlogFeatured post={featuredPost} />}

      {regularPosts.length > 0 ? (
        <div className="blog-grid">
          {regularPosts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      ) : (
        <div className="blog-empty">
          <Typography variant="title2">No more posts yet.</Typography>
          <Typography variant="body2" className="mt-2 text-[var(--text-muted)]">
            Check back later for new insights!
          </Typography>
        </div>
      )}
      </div>
    </main>
  );
}

// Trigger reload
