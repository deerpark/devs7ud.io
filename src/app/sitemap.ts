import type {MetadataRoute} from 'next'

import {host} from '@/lib/config'
import {getSiteMap} from '@/lib/get-site-map'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteMap = await getSiteMap()

  return Object.keys(siteMap.canonicalPageMap).map((canonicalPagePath) => ({
    url: `${host}/${canonicalPagePath}`
  }))
}
