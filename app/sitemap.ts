import { MetadataRoute } from 'next';
import { getBlogPosts } from '../lib/blog';
import { courses } from '../lib/courses';

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

  // Dynamic Bootcamp Course Tracks
  const courseUrls = courses.map((course) => ({
    url: `${baseUrl}/bootcamp/courses/${course.slug}`,
    lastModified: siteRevisionDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
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

    // 05. Software Development Bootcamp
    {
      url: `${baseUrl}/bootcamp/courses`,
      lastModified: siteRevisionDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...courseUrls,

    // 06. Careers & Engineering Collective
    {
      url: `${baseUrl}/careers`,
      lastModified: siteRevisionDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // 07. Governance & Terms of Service
    {
      url: `${baseUrl}/terms`,
      lastModified: siteRevisionDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
