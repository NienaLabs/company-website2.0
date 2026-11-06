import { MetadataRoute } from 'next';
import { getBlogPosts } from '../lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.nienalabs.com';
  const siteRevisionDate = new Date();

  // Dynamic Blog Posts
  const posts = await getBlogPosts();
  const blogUrls = posts
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  return [
    // 01. Primary Landing Page
    {
      url: baseUrl,
      lastModified: siteRevisionDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },

    // 02. Specialized Products & Vision Engines
    {
      url: `${baseUrl}/products`,
      lastModified: siteRevisionDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },

    // 03. Flagship Case Study: Compound-V
    {
      url: `${baseUrl}/case-studies/compound-v`,
      lastModified: siteRevisionDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // 04. Research & Engineering Blog
    {
      url: `${baseUrl}/blog`,
      lastModified: posts[0]?.date ? new Date(posts[0].date) : siteRevisionDate,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    ...blogUrls,

    // 05. Careers & Engineering Collective
    {
      url: `${baseUrl}/careers`,
      lastModified: siteRevisionDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // 06. Governance & Terms of Service
    {
      url: `${baseUrl}/terms`,
      lastModified: siteRevisionDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
