type PageLayoutProps = Readonly<{
  children: React.ReactNode
  params: { slug: string; locale: string }
}>

import { metadata as metaOrigin } from "@/lib/metadata"

import { Metadata, ResolvingMetadata } from "next/types"
import { getPageBySlug } from "@/lib/notion"
import "@/styles/prism-theme.css"
import "@/styles/notion.css"

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const post = await getPageBySlug(params.slug)

  // guard
  if (!post) return metaOrigin

  const title = (post.properties.Title as any).title[0].plain_text
  const description = (post.properties?.Description as any)?.rich_text[0]
    ?.plain_text
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
  const image = (post.properties.Banner as any).url

  return {
    ...metaOrigin,
    title,
    description,
    openGraph: {
      images: [image, ...previousImages],
    },
  }
}

export default function PageLayout({ children, params }: PageLayoutProps) {
  console.log("post params", params)
  return children
}

// export const runtime = 'edge';
