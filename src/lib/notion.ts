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

const notionEnv = {
  auth: env.NOTION_TOKEN,
  posts: env.NOTION_DATABASE_ID,
  bookmarks: env.NOTION_BOOKMARKS_DATABASE_ID,
}

export const notionClient = new Client({
  auth: notionEnv.auth,
})

export const getUsers = cache(async () => {
  try {
    return await notionClient.users.list({})
  } catch (error) {
    resolveError(error)
    return []
  }
})

export const getComments = cache(
  async ({
    discussion_id,
    parent,
  }: {
    discussion_id?: string
    parent?: string
  }) => {
    try {
      if (!discussion_id && !parent) return []
      const block_id = (discussion_id || parent)!
      const response = await notionClient.comments.list({
        block_id,
      })
      return response
    } catch (error) {
      resolveError(error)
      return []
    }
  }
)

function resolveError(error: unknown) {
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
}

export const getPages = cache(
  async (_locale?: string, databaseKey = "posts") => {
    const locale = _locale || "ko"
    const database_id =
      notionEnv[databaseKey as keyof typeof notionEnv] || env.NOTION_DATABASE_ID
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
        database_id,
      })
    } catch (error: unknown) {
      resolveError(error)
      return {
        type: "page",
        page_or_database: {},
        object: "list",
        next_cursor: null,
        has_more: false,
        results: [],
      }
    }
  }
)

export const getPageContent = cache((pageId: string) => {
  return notionClient.blocks.children
    .list({ block_id: pageId })
    .then((res) => res.results as BlockObjectResponse[])
})

export const getPageBySlug = cache((slug: string, databaseKey = "posts") => {
  const database_id =
    notionEnv[databaseKey as keyof typeof notionEnv] || env.NOTION_DATABASE_ID
  return notionClient.databases
    .query({
      database_id,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    })
    .then((res) => res.results[0] as PageObjectResponse | undefined)
})
