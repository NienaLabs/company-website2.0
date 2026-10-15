import { MetadataRoute } from 'next';
import { getBlogPosts } from '../lib/blog';
import { getPrimaryServiceSlugs } from '../lib/services';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.nienalabs.com';
  // Use a stable build/revision date rather than changing dynamically on every request
  const siteRevisionDate = new Date('2026-10-15T00:00:00.000Z');

  const posts = await getBlogPosts();
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const serviceSlugs = getPrimaryServiceSlugs();
  const serviceUrls = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: siteRevisionDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: siteRevisionDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: posts[0]?.date ? new Date(posts[0].date) : siteRevisionDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...blogUrls,
    {
      url: `${baseUrl}/services`,
      lastModified: siteRevisionDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...serviceUrls,
    {
      url: `${baseUrl}/products`,
      lastModified: siteRevisionDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: siteRevisionDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bootcamp/courses`,
      lastModified: siteRevisionDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: siteRevisionDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/local-businesses`,
      lastModified: siteRevisionDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
