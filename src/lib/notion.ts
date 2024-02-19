import type {
  BlockObjectResponse,
  CreateCommentParameters,
  CreateCommentResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"
import {
  APIErrorCode,
  Client,
  ClientErrorCode,
  LogLevel,
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
  logLevel: process.env.NODE_ENV !== "production" ? LogLevel.DEBUG : undefined,
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

export const postComment = cache(
  async ({
    page_id,
    content = "",
  }: {
    page_id?: string
    content: string
  }): Promise<CreateCommentResponse> => {
    console.log("page_id", page_id)
    try {
      if (!page_id)
        return {
          object: "comment",
          id: "",
        }

      const params: CreateCommentParameters = {
        parent: {
          page_id,
        },
        rich_text: [
          {
            text: {
              content,
            },
          },
        ],
      }

      console.log("params", params)
      const response = await notionClient.comments.create(params)
      console.log("response", response)
      return response
    } catch (error) {
      console.log("error", error)
      resolveError(error)
      return {
        object: "comment",
        id: page_id || "",
      }
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
  async (locale: string = "ko", databaseKey = "posts", tag?: string) => {
    const database_id =
      notionEnv[databaseKey as keyof typeof notionEnv] || env.NOTION_DATABASE_ID
    try {
      return notionClient.databases.query({
        filter: {
          and: tag
            ? [
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
                {
                  select: {
                    equals: tag,
                  },
                  property: "Tags",
                },
              ]
            : [
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

export const searchPages = cache(
  async (locale: string = "ko", databaseKey = "posts", keyword: string) => {
    const database_id =
      notionEnv[databaseKey as keyof typeof notionEnv] || env.NOTION_DATABASE_ID
    try {
      return notionClient.databases.query({
        filter: {
          or: [
            {
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
                {
                  title: {
                    contains: keyword,
                  },
                  property: "Title",
                },
              ],
              or: [
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
                {
                  title: {
                    contains: keyword,
                  },
                  property: "Description",
                },
              ],
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
