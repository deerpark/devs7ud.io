import "server-only"

import type {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"
import {
  APIErrorCode,
  Client,
  ClientErrorCode,
  isNotionClientError,
} from "@notionhq/client"
import { cache } from "react"

import { env } from "@/lib/env"

export const notionClient = new Client({
  auth: env.NOTION_TOKEN,
})

export const getPages = cache(async (_locale?: string) => {
  const locale = _locale || "ko"
  try {
    return notionClient.databases.query({
      filter: {
        and: [
          {
            property: "Status",
            status: {
              equals: "Published",
            },
          },
          {
            property: "Locale",
            select: {
              equals: locale,
            },
          },
        ],
      },
      database_id: env.NOTION_DATABASE_ID!,
    })
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      // error is now strongly typed to NotionClientError
      switch (error.code) {
        case ClientErrorCode.RequestTimeout:
          console.error(ClientErrorCode.RequestTimeout)
          break
        case APIErrorCode.ObjectNotFound:
          console.error(APIErrorCode.ObjectNotFound)
          break
        case APIErrorCode.Unauthorized:
          console.error(APIErrorCode.Unauthorized)
          break
        default:
          console.error(error.code)
      }
    }
    return {
      type: "page",
      page_or_database: {},
      object: "list",
      next_cursor: null,
      has_more: false,
      results: [],
    }
  }
})

export const getPageContent = cache((pageId: string) => {
  return notionClient.blocks.children
    .list({ block_id: pageId })
    .then((res) => res.results as BlockObjectResponse[])
})

export const getPageBySlug = cache((slug: string) => {
  return notionClient.databases
    .query({
      database_id: env.NOTION_DATABASE_ID!,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    })
    .then((res) => res.results[0] as PageObjectResponse | undefined)
})
