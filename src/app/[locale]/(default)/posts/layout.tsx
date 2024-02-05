import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

import { Posts } from "@/components/posts"
import { getPages } from "@/lib/notion"
import List from "@/components/list"

type PageLayoutProps = Readonly<{
  children: React.ReactNode
  params: { locale: string; slug: string }
}>

export default async function PageLayout({
  children,
  params,
}: PageLayoutProps) {
  const pages = await getPages()

  return (
    <div className="flex w-full">
      <div
        id="list"
        className={`bg-dots ${
          params.slug ? "hidden lg:flex" : "min-h-screen w-full"
        }`}
      >
        <List title="Posts">
          {pages.results.length ? (
            <Posts
              data={pages.results as PageObjectResponse[]}
              slug={params.slug}
            />
          ) : (
            <div>등록된 포스트가 없습니다.</div>
          )}
        </List>
      </div>
      {children}
    </div>
  )
}

// export const runtime = 'edge';
