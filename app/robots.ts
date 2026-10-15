import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/employees/'],
    },
    sitemap: 'https://www.nienalabs.com/sitemap.xml',
  };
}
