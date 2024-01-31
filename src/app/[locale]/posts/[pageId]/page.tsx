import * as React from 'react'

import { NotionPage } from '@/components/notion/notion-page'
import { domain, isDev } from '@/lib/config'
import { getSiteMap } from '@/lib/get-site-map'
import { resolveNotionPage } from '@/lib/resolve-notion-page'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  if (isDev) {
    return {
      paths: [],
      fallback: true
    }
  }

  const siteMap = await getSiteMap()

  const staticPaths = Object.keys(siteMap.canonicalPageMap).map((pageId) => ({
    pageId
  }))

  console.log(staticPaths)
  return staticPaths
}

export default async function NotionDomainDynamicPage({params}: { params: { pageId: string } }) {
  if (!params.pageId) {
    notFound()
  }

  try {
    const props = await resolveNotionPage(domain, params.pageId)

    return <NotionPage {...props} />
  } catch (err) {
    console.error('page error', domain, params.pageId, err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export const revalidate = 30