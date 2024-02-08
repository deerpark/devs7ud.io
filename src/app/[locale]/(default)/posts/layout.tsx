import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

import { getTranslations, unstable_setRequestLocale } from "next-intl/server"
import { getPages, getUsers } from "@/lib/notion"
import { FaBlogIcon } from "@/components/icon"
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
          <div className="flex items-center space-x-2 lg:flex-col lg:justify-center lg:space-x-0 lg:space-y-2 lg:py-5">
            <FaBlogIcon className="hidden size-5 lg:block lg:size-8" />
            <span className="text-foreground lg:text-muted-foreground line-clamp-1 transform-gpu text-base font-black lg:text-xs lg:font-medium">
              {t("SYSTEM.navigation.index.posts")}
            </span>
          </div>
        }
        contents={
          pages.results.length ? (
            <Posts
              data={pages.results as PageObjectResponse[]}
              byline
              users={"results" in users ? users.results : []}
            />
          ) : (
            <div id="list" className="bg-dots min-h-screen w-full">
              <div className="bg-background lg:bg-card relative size-full max-h-screen min-h-screen flex-none overflow-y-auto border-r px-6 py-3 lg:w-80 xl:w-96">
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
