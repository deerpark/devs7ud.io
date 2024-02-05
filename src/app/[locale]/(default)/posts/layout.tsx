import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

import { Posts } from "@/components/posts"
import { getPages } from "@/lib/notion"
import List from "@/components/list"

type PageLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default async function PageLayout({ children }: PageLayoutProps) {
  const pages = await getPages()

  return (
    <div className="flex w-full">
      <List
        title="Posts"
        contents={
          pages.results.length ? (
            <Posts data={pages.results as PageObjectResponse[]} />
          ) : (
            <div id="list" className="bg-dots min-h-screen w-full">
              <div className="bg-background lg:bg-card relative size-full max-h-screen min-h-screen flex-none overflow-y-auto border-r lg:w-80 xl:w-96">
                등록된 포스트가 없습니다.
              </div>
            </div>
          )
        }
      >
        {children}
      </List>
    </div>
  )
}

// export const runtime = 'edge';
