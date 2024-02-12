import bookmarkPlugin from "@notion-render/bookmark-plugin"
import { NotionRenderer } from "@notion-render/client"
// Plugins
import hljsPlugin from "@notion-render/hljs-plugin"
import { notFound } from "next/navigation"

import {
  getComments,
  getPageBySlug,
  getPageContent,
  getPages,
  getUsers,
  notionClient,
} from "@/lib/notion"
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { Bookmark } from "@/components/bookmarks/bookmark"

export async function generateStaticParams({
  params,
}: {
  params: { locale: string }
}) {
  const bookmarks = await getPages(params.locale, "bookmarks")
  return bookmarks?.results?.map((post) => ({
    slug: ((post as PageObjectResponse).properties?.Slug as any)?.rich_text[0]
      .plain_text,
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const bookmark = await getPageBySlug(params.slug, "bookmarks")
  const users = await getUsers()

  // Redirect to not found page!
  if (!bookmark) notFound()

  const content = await getPageContent(bookmark.id)
  const comments = await getComments({ parent: bookmark.id })

  const notionRenderer = new NotionRenderer({
    client: notionClient,
  })

  notionRenderer.use(hljsPlugin({}))
  notionRenderer.use(bookmarkPlugin(undefined))
  const html = await notionRenderer.render(...content)

  console.log("Bookmark: ", bookmark)
  // console.log("Users:", users)
  // console.log("Html: ", html)
  // console.log("Comments: ", comments)
  const user =
    "results" in users
      ? users.results.find((u) => u.id === bookmark.created_by.id)
      : undefined

  return (
    <Bookmark
      bookmark={bookmark}
      content={html}
      createdBy={user}
      comments={"results" in comments ? comments.results : []}
    />
  )
}
