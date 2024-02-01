import bookmarkPlugin from '@notion-render/bookmark-plugin'
import {NotionRenderer} from '@notion-render/client'
// Plugins
import hljsPlugin from '@notion-render/hljs-plugin'
import {notFound} from 'next/navigation'

import {Post} from '@/components/post'
import {getPageBySlug, getPageContent, notionClient} from '@/lib/notion'

export default async function Page({params}: {params: {slug: string}}) {
  console.log('Slug: ', params)
  const post = await getPageBySlug(params.slug)

  // Redirect to not found page!
  if (!post) notFound()

  const content = await getPageContent(post.id)

  const notionRenderer = new NotionRenderer({
    client: notionClient
  })

  notionRenderer.use(hljsPlugin({}))
  notionRenderer.use(bookmarkPlugin(undefined))
  const html = await notionRenderer.render(...content)

  console.log('Post: ', post)
  console.log('Html: ', html)

  const banner = {
    url: (post.properties.Banner as any).url
  }

  return (
    <Post
      title={(post.properties.Title as any).title[0].plain_text}
      banner={banner}
      content={html}
    />
  )
}
