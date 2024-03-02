type PageLayoutProps = Readonly<{
  children: React.ReactNode
  params: { slug: string; locale: string }
}>

import { metadata as metaOrigin } from "@/lib/metadata"

import { getPageBySlug } from "@/lib/notion"
import { Metadata } from "next/types"
import "@/styles/prism-theme.css"
import "@/styles/notion.css"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  // fetch data
  const post = await getPageBySlug(params.slug)

  // guard
  if (!post) return metaOrigin

  const title = (post.properties.Title as any).title[0].plain_text
  const description = (post.properties?.Description as any)?.rich_text[0]
    ?.plain_text

  return {
    ...metaOrigin,
    title,
    description,
  }
}

export default function PageLayout({ children /* params */ }: PageLayoutProps) {
  // console.log("post params", params)
  return children
}

// export const runtime = 'edge';
