import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

import { getTranslations, unstable_setRequestLocale } from "next-intl/server"
import { getPages, getUsers } from "@/lib/notion"
import { Posts } from "@/components/posts"
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
  const users = await getUsers()
  const t = await getTranslations()

  return (
    <div className="flex w-full">
      <List
        title={
          <span className="lg:ml-3">{t("SYSTEM.navigation.index.posts")}</span>
        }
        contents={
          pages.results.length ? (
            <Posts
              data={pages.results as PageObjectResponse[]}
              byline
              users={"results" in users ? users.results : []}
            />
          ) : (
            <div id="list" className="min-h-screen w-full">
              <div className="bg-popover lg:bg-card/30 relative size-full max-h-screen min-h-screen flex-none overflow-y-auto border-r px-6 py-3 lg:w-80 xl:w-96">
                <span className="text-muted-foreground">
                  {t("POSTS.empty")}
                </span>
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
