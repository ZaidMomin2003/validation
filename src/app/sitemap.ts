import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://cleanmails.com';

  const staticRoutes = [
    '',
    '/auth',
    '/auth/forgot-password',
    '/blogs',
    '/bulk-validate',
    '/changelog',
    '/delivery',
    '/extract-from-text',
    '/feedback',
    '/lists',
    '/pricing',
    '/privacy',
    '/profile',
    '/single-email',
    '/spam-checker',
    '/subscription',
    '/support',
    '/terms',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteUrl}/blogs/${post.slug}`,
    lastModified: new Date('2025-12-23T12:00:00Z').toISOString(), // Placeholder, ideally use post-specific date
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
