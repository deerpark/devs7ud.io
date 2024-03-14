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
import { MultiSelect, PostProps } from "@/types/post.type"
import { getTranslations } from "next-intl/server"
import Comments from "@/components/comments"
import Contents from "@/components/contents"
import Tags from "@/components/tags"

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

export default async function Page({
  params,
}: {
  params: { slug: string; locale: string }
}) {
  const t = await getTranslations()
  const post = await getPageBySlug(params.slug)
  const users = await getUsers()

  // Redirect to not found page!
  if (!post) notFound()

  const content = await getPageContent(post.id)
  const commentsResults = await getComments({ parent: post.id })

  console.log("Post: ", post)
  // console.log("content: ", content)
  // console.log("Users:", users)
  // console.log("Html: ", html)
  // console.log("Comments: ", comments)
  const template = (post?.properties?.Template as any)?.rich_text[0]?.plain_text

  const notionRenderer = new NotionRenderer({
    client: notionClient,
  })
  notionRenderer.use(hljsPlugin({}))
  notionRenderer.use(bookmarkPlugin(undefined))
  const html = await notionRenderer.render(...content)
  let pageComponent:
    | React.ComponentType<Omit<PostProps, "page" | "users" | "comments">>
    | string

  try {
    pageComponent = template
      ? dynamic(() => import(`@/components/templates/${template}`))
      : ""
  } catch (error) {
    console.error(error)
    pageComponent = t("SYSTEM.server.error.template")
  }

  const comments = "results" in commentsResults ? commentsResults.results : []
  const tags: MultiSelect[] = (post.properties?.Tags as any)?.multi_select || []

  return (
    <>
      <div className="max-w-full flex-1 space-y-20 sm:min-w-96 2xl:mx-auto 2xl:max-w-max">
        <Contents
          post={post}
          locale={params.locale}
          content={html}
          users={users}
          page={pageComponent}
          comments={comments}
        />
        <Tags items={tags} />
      </div>
      <Comments comments={comments} page_id={post.id} />
    </>
  )
}
