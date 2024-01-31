import { host } from '@/lib/config'

import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV === 'production') {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/get-tweet-ast/*', '/api/search-notion'],
      },
      sitemap: `${host}/sitemap.xml`,
    }
  } else {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
      sitemap: `${host}/sitemap.xml`,
    }
  }
}
