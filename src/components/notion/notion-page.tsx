'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import {useTheme} from 'next-themes'
import {formatDate, getBlockTitle} from 'notion-utils'
import * as React from 'react'
import BodyClassName from 'react-body-classname'
import type {NotionComponents} from 'react-notion-x'
import {NotionRenderer} from 'react-notion-x'
import TweetEmbed from 'react-tweet-embed'
import {useSearchParam} from 'react-use'

import {NotionPage404} from '@/components/notion/notion-page-404'
import {NotionPageAside} from '@/components/notion/notion-page-aside'
import {NotionPageFooter} from '@/components/notion/notion-page-footer'
import {NotionPageHeader} from '@/components/notion/notion-page-header'
import * as config from '@/lib/config'
import {mapImageUrl} from '@/lib/map-image-url'
import {mapPageUrl} from '@/lib/map-page-url'
import {searchNotion} from '@/lib/search-notion'
import styles from '@/styles/styles.module.css'
import type * as types from '@/types/notion.type'
import {cn} from '@/utils/cn'

// -----------------------------------------------------------------------------
// dynamic imports for optional components
// -----------------------------------------------------------------------------

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(async (m) => {
    // add / remove any prism syntaxes here
    /* await Promise.allSettled([
      import('prismjs/components/prism-markup-templating.js'),
    ]) */
    return m.Code
  })
)

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  {
    ssr: false
  }
)
const Modal = dynamic(
  () =>
    import('react-notion-x/build/third-party/modal').then((m) => {
      m.Modal.setAppElement('.notion-viewport')
      return m.Modal
    }),
  {
    ssr: false
  }
)

const Tweet = ({id}: {id: string}) => {
  return <TweetEmbed tweetId={id} />
}

const propertyLastEditedTimeValue: NotionComponents['propertyLastEditedTimeValue'] =
  ({block, pageHeader}, defaultFn: () => React.ReactNode) => {
    if (pageHeader && block?.last_edited_time) {
      return `Last updated ${formatDate(block?.last_edited_time, {
        month: 'long'
      })}`
    }

    return defaultFn()
  }

const propertyDateValue: NotionComponents['propertyDateValue'] = (
  {data, schema, pageHeader},
  defaultFn: () => React.ReactNode
) => {
  if (pageHeader && schema?.name?.toLowerCase() === 'published') {
    const publishDate = data?.[0]?.[1]?.[0]?.[1]?.start_date

    if (publishDate) {
      return `${formatDate(publishDate, {
        month: 'long'
      })}`
    }
  }

  return defaultFn()
}

const propertyTextValue: NotionComponents['propertyTextValue'] = (
  {schema, pageHeader},
  defaultFn: () => React.ReactNode
) => {
  if (pageHeader && schema?.name?.toLowerCase() === 'author') {
    return <b>{defaultFn()}</b>
  }

  return defaultFn()
}

export const NotionPage: React.FC<types.PageProps> = ({
  site,
  recordMap,
  error,
  pageId
}) => {
  if (!site || !recordMap) return null

  const lite = useSearchParam('lite')

  const components = React.useMemo(
    () => ({
      nextImage: Image,
      nextLink: Link,
      Code,
      Collection,
      Equation,
      Pdf,
      Modal,
      Tweet,
      Header: NotionPageHeader,
      propertyLastEditedTimeValue,
      propertyTextValue,
      propertyDateValue
    }),
    []
  )

  // lite mode is for oembed
  const isLiteMode = lite === 'true'

  const {theme} = useTheme()
  const isDarkMode = React.useMemo(() => theme === 'dark', [theme])

  const siteMapPageUrl = React.useMemo(() => {
    const params: any = {}
    if (lite) params.lite = lite

    const searchParams = new URLSearchParams(params)
    return mapPageUrl(site!, recordMap!, searchParams)
  }, [site, recordMap, lite])

  const keys = Object.keys(recordMap?.block || {})
  const block = keys?.length && recordMap?.block?.[keys[0]!]?.value

  if (!block) return null

  // const isRootPage =
  //   parsePageId(block?.id) === parsePageId(site?.rootNotionPageId)
  const isBlogPost =
    block?.type === 'page' && block?.parent_table === 'collection'

  const showTableOfContents = !!isBlogPost
  const minTableOfContentsItems = 3

  const pageAside = React.useMemo(
    () => (
      <NotionPageAside
        block={block}
        recordMap={recordMap}
        isBlogPost={isBlogPost}
      />
    ),
    [block, recordMap, isBlogPost]
  )

  const footer = React.useMemo(() => <NotionPageFooter />, [])

  if (error || !site || !block) {
    return <NotionPage404 site={site} pageId={pageId} error={error} />
  }

  const title = getBlockTitle(block, recordMap) || site.name

  console.log('notion page', {
    isDev: config.isDev,
    title,
    pageId,
    rootNotionPageId: site.rootNotionPageId,
    recordMap
  })

  if (!config.isServer) {
    // add important objects to the window global for easy debugging
    const g = window as any
    g.pageId = pageId
    g.recordMap = recordMap
    g.block = block
  }

  return (
    <>
      {isLiteMode && <BodyClassName className='notion-lite' />}
      {isDarkMode && <BodyClassName className='dark-mode' />}

      <NotionRenderer
        bodyClassName={cn(
          styles.notion,
          pageId === site.rootNotionPageId && 'index-page'
        )}
        darkMode={isDarkMode}
        components={components}
        recordMap={recordMap}
        rootPageId={site.rootNotionPageId}
        rootDomain={site.domain}
        fullPage={!isLiteMode}
        previewImages={!!recordMap.preview_images}
        showCollectionViewDropdown={false}
        showTableOfContents={showTableOfContents}
        minTableOfContentsItems={minTableOfContentsItems}
        defaultPageIcon={config.defaultPageIcon!}
        defaultPageCover={config.defaultPageCover!}
        defaultPageCoverPosition={config.defaultPageCoverPosition}
        mapPageUrl={siteMapPageUrl}
        mapImageUrl={mapImageUrl}
        searchNotion={config.isSearchEnabled ? searchNotion : undefined}
        pageAside={pageAside}
        footer={footer}
      />
    </>
  )
}
