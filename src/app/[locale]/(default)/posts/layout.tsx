import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

import { getTranslations, unstable_setRequestLocale } from "next-intl/server"
import { Posts } from "@/components/posts"
import { getPages } from "@/lib/notion"
import List from "@/components/list"

type PageLayoutProps = Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>

export default async function PageLayout({
  children,
  params,
}: PageLayoutProps) {
  unstable_setRequestLocale(params.locale)
  const pages = await getPages(params.locale)
  const t = await getTranslations()

  return (
    <div className="flex w-full">
      <List
        title={t("SYSTEM.navigation.index.posts")}
        contents={
          pages.results.length ? (
            <Posts data={pages.results as PageObjectResponse[]} />
          ) : (
            <div id="list" className="bg-dots min-h-screen w-full">
              <div className="bg-background lg:bg-card relative size-full max-h-screen min-h-screen flex-none overflow-y-auto border-r lg:w-80 xl:w-96">
                {t("POSTS.empty")}
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
