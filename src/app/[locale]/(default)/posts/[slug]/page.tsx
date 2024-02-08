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
import { Post } from "@/components/posts/post"

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPageBySlug(params.slug)
  const users = await getUsers()

  // Redirect to not found page!
  if (!post) notFound()

  const content = await getPageContent(post.id)
  const comments = await getComments({ parent: post.id })

  const notionRenderer = new NotionRenderer({
    client: notionClient,
  })

  notionRenderer.use(hljsPlugin({}))
  notionRenderer.use(bookmarkPlugin(undefined))
  const html = await notionRenderer.render(...content)

  console.log("Post: ", post)
  // console.log("Users:", users)
  // console.log("Html: ", html)
  // console.log("Comments: ", comments)
  const user =
    "results" in users
      ? users.results.find((u) => u.id === post.created_by.id)
      : undefined

  return (
    <Post
      post={post}
      content={html}
      createdBy={user}
      comments={"results" in comments ? comments.results : []}
    />
  )
}
