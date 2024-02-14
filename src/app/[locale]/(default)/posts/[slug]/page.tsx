import bookmarkPlugin from "@notion-render/bookmark-plugin"
import { NotionRenderer } from "@notion-render/client"
// Plugins
import hljsPlugin from "@notion-render/hljs-plugin"
import { notFound } from "next/navigation"
import dynamic from "next/dynamic"

import {
  getComments,
  getPageBySlug,
  getPageContent,
  getPages,
  getUsers,
  notionClient,
} from "@/lib/notion"
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { getTranslations } from "next-intl/server"
import { Post } from "@/components/posts/post"

export async function generateStaticParams({
  params,
}: {
  params: { locale: string }
}) {
  const pages = await getPages(params.locale)
  return pages?.results?.map((post) => ({
    slug: ((post as PageObjectResponse).properties?.Slug as any)?.rich_text[0]
      .plain_text,
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const t = await getTranslations()
  const post = await getPageBySlug(params.slug)
  const users = await getUsers()

  // Redirect to not found page!
  if (!post) notFound()

  const content = await getPageContent(post.id)
  const comments = await getComments({ parent: post.id })

  // console.log("Post: ", post)
  // console.log("content: ", content)
  // console.log("Users:", users)
  // console.log("Html: ", html)
  // console.log("Comments: ", comments)
  const user =
    "results" in users
      ? users.results.find((u) => u.id === post.created_by.id)
      : undefined
  const poster = (post?.properties?.OpenGraph as any)?.files[0]?.file?.url
  const include = (post?.properties?.Include as any)?.rich_text[0]?.plain_text

  const notionRenderer = new NotionRenderer({
    client: notionClient,
  })
  let html: string | React.ComponentType<{}>

  try {
    notionRenderer.use(hljsPlugin({}))
    notionRenderer.use(bookmarkPlugin(undefined))
    html = include
      ? dynamic(() => import(`@/components/pages/${include}`))
      : await notionRenderer.render(...content)
  } catch (error) {
    console.error(error)
    html = t("SYSTEM.server.error.include")
  }

  return (
    <Post
      post={post}
      content={html}
      createdBy={user}
      poster={poster}
      comments={"results" in comments ? comments.results : []}
    />
  )
}
