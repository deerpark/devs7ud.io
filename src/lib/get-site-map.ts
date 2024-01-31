import {getAllPagesInSpace, getPageProperty /* uuidToId */} from 'notion-utils'
import pMemoize from 'p-memoize'

import type * as types from '@/types/notion.type'

import * as config from './config'
import {includeNotionIdInUrls} from './config'
import {getCanonicalPageId} from './get-canonical-page-id'
import {notion} from './notion-api'

const uuid = !!includeNotionIdInUrls

async function getAllPagesImpl(
  rootNotionPageId: string,
  rootNotionSpaceId: string
): Promise<Partial<types.SiteMap>> {
  const getPage = async (pageId: string, ...args: unknown[]) => {
    // console.log('\nnotion getPage', uuidToId(pageId))
    return notion.getPage(pageId, ...(args as any))
  }

  const pageMap = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    getPage
  )

  const canonicalPageMap = Object.keys(pageMap).reduce(
    (map, pageId: string) => {
      const recordMap = pageMap[pageId]
      if (!recordMap) {
        throw new Error(`Error loading page "${pageId}"`)
      }

      const block = recordMap.block[pageId]?.value
      if (
        !(getPageProperty<boolean | null>('Public', block!, recordMap) ?? true)
      ) {
        return map
      }

      const canonicalPageId = getCanonicalPageId(pageId, recordMap, {
        uuid
      })

      if (map[canonicalPageId as keyof typeof map]) {
        // you can have multiple pages in different collections that have the same id
        // TODO: we may want to error if neither entry is a collection page
        /* console.warn('error duplicate canonical page id', {
          canonicalPageId,
          pageId,
          existingPageId: map[canonicalPageId as keyof typeof map]
        }) */

        return map
      }
      return {
        ...map,
        [canonicalPageId as keyof typeof map]: pageId
      }
    },
    {}
  )

  return {
    pageMap,
    canonicalPageMap
  }
}

const getAllPages = pMemoize(getAllPagesImpl, {
  cacheKey: (...args) => JSON.stringify(args)
})

export async function getSiteMap(): Promise<types.SiteMap> {
  const partialSiteMap = await getAllPages(
    config.rootNotionPageId,
    config.rootNotionSpaceId!
  )

  return {
    site: config.site,
    ...partialSiteMap
  } as types.SiteMap
}
