import bookmarkPlugin from "@notion-render/bookmark-plugin"
import { NotionRenderer } from "@notion-render/client"
// Plugins
import hljsPlugin from "@notion-render/hljs-plugin"
import { notFound } from "next/navigation"

import { getPageBySlug, getPageContent, notionClient } from "@/lib/notion"
import { Post } from "@/components/posts/post"

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPageBySlug(params.slug)

  // Redirect to not found page!
  if (!post) notFound()

  const content = await getPageContent(post.id)

  const notionRenderer = new NotionRenderer({
    client: notionClient,
  })

  notionRenderer.use(hljsPlugin({}))
  notionRenderer.use(bookmarkPlugin(undefined))
  const html = await notionRenderer.render(...content)

  console.log("Post: ", post)
  // console.log("Html: ", html)

  return <Post post={post} content={html} />
}
