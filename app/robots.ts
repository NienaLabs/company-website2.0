import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/employees/'],
    },
    sitemap: 'https://nienalabs.com/sitemap.xml',
  };
}
