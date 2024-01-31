import type {Metadata, Viewport} from 'next'
import {notFound} from 'next/navigation'
import type {PageBlock} from 'notion-types'
import {getBlockTitle, getPageProperty} from 'notion-utils'
import * as React from 'react'

import {NotionPage} from '@/components/notion/notion-page'
import {domain, isDev} from '@/lib/config'
import * as config from '@/lib/config'
import {getSiteMap} from '@/lib/get-site-map'
import {getSocialImageUrl} from '@/lib/get-social-image-url'
import {mapImageUrl} from '@/lib/map-image-url'
import {getCanonicalPageUrl} from '@/lib/map-page-url'
import {resolveNotionPage} from '@/lib/resolve-notion-page'
import {AppConfig} from '@/utils/AppConfig'

type NotionDomainDynamicPageProps = {params: {pageId: string; locale: string}}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    {media: '(prefers-color-scheme: light)', color: '#fefffe'},
    {media: '(prefers-color-scheme: dark)', color: '#2d3439'}
  ]
}

export async function generateMetadata({
  params
}: NotionDomainDynamicPageProps): Promise<Metadata> {
  // read route params
  const id = params.pageId

  const props = await resolveNotionPage(domain, id)

  if ('error' in props) {
    throw new Error('Failed to resolve notion page')
  }

  const keys = Object.keys(props.recordMap?.block || {})
  const block = keys?.length && props.recordMap?.block?.[keys[0]!]?.value

  if (!block) {
    throw new Error('block not found')
  }

  const canonicalPageUrl =
    !config.isDev && getCanonicalPageUrl(props.site, props.recordMap)(id)

  const socialImage = mapImageUrl(
    getPageProperty<string>('Social Image', block, props.recordMap) ||
      (block as PageBlock).format?.page_cover ||
      config.defaultPageCover!,
    block
  )

  const socialImageUrl = getSocialImageUrl(id) || socialImage
  const socialDescription =
    getPageProperty<string>('Description', block, props.recordMap) ||
    config.description

  const title = getBlockTitle(block, props.recordMap) || props.site.name
  const description = socialDescription ?? props.site?.description
  const rssFeedUrl = `${config.host}/feed`

  const metaData: Metadata = {
    generator: AppConfig.name,
    applicationName: AppConfig.name,
    referrer: 'origin-when-cross-origin',
    keywords: AppConfig.keywords,
    authors: AppConfig.authors,
    creator: AppConfig.authors[0]?.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false
    },
    title,
    description,
    appleWebApp: {
      title,
      statusBarStyle: 'black-translucent'
    },
    robots: {
      index: true,
      follow: true
    },
    twitter: {
      card: socialImageUrl ? 'summary_large_image' : 'summary',
      title,
      description,
      images: socialImageUrl
        ? {
            url: socialImageUrl,
            alt: title
          }
        : undefined
    },
    openGraph: {
      title,
      description,
      type: 'website',
      images: socialImageUrl
        ? {
            url: socialImageUrl,
            width: 1200,
            height: 630
          }
        : undefined,
      locale: params.locale
    },
    alternates: {
      canonical: '',
      types: {
        'application/rss+xml': rssFeedUrl,
        title: props.site.name
      }
    }
  }

  if (canonicalPageUrl) {
    if (!metaData.openGraph) {
      metaData.openGraph = {}
    }
    if (!metaData.alternates) {
      metaData.alternates = {}
    }
    metaData.openGraph.url = canonicalPageUrl
    metaData.alternates.canonical = canonicalPageUrl
  }

  if (props.site) {
    if (!metaData.openGraph) {
      metaData.openGraph = {}
    }
    metaData.openGraph.siteName = props.site.name
  }

  if (config.twitter) {
    if (!metaData.twitter) {
      metaData.twitter = {}
    }
    metaData.twitter.creator = `@${config.twitter}`
  }

  return metaData
}

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

export default async function NotionDomainDynamicPage({
  params
}: NotionDomainDynamicPageProps) {
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
