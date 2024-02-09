import bookmarkPlugin from "@notion-render/bookmark-plugin"
import { NotionRenderer } from "@notion-render/client"
// Plugins
import hljsPlugin from "@notion-render/hljs-plugin"
import { notFound } from "next/navigation"

import {
  getComments,
  getPageBySlug,
  getPageContent,
  getUsers,
  notionClient,
} from "@/lib/notion"
import { Bookmark } from "@/components/bookmarks/bookmark"

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
