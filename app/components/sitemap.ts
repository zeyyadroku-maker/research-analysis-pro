import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://syllogos.ai'
  
  // Static routes
  const routes = [
    '',
    '/search',
    '/about',
    '/pricing',
    '/contact',
    '/blog',
    '/docs',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}