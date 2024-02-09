import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

import { getTranslations, unstable_setRequestLocale } from "next-intl/server"
import { FaBookmarkIcon } from "@/components/icon-duotone"
import { Bookmarks } from "@/components/bookmarks"
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
  const pages = await getPages(params.locale, "bookmarks")
  console.log(pages)
  const t = await getTranslations()

  return (
    <div className="flex w-full">
      <List
        title={
          <div className="flex items-center space-x-2 lg:flex-col lg:justify-center lg:space-x-0 lg:space-y-2 lg:py-5">
            <FaBookmarkIcon className="hidden size-5 lg:block lg:size-8" />
            <span className="text-foreground lg:text-muted-foreground line-clamp-1 transform-gpu text-base font-black lg:text-xs lg:font-medium">
              {t("SYSTEM.navigation.me.bookmarks")}
            </span>
          </div>
        }
        contents={
          pages.results.length ? (
            <Bookmarks data={pages.results as PageObjectResponse[]} />
          ) : (
            <div id="list" className="min-h-screen w-full">
              <div className="bg-popover lg:bg-card/30 relative size-full max-h-screen min-h-screen flex-none overflow-y-auto border-r px-6 py-3 lg:w-80 xl:w-96">
                <span className="text-muted-foreground">
                  {t("BOOKMARKS.empty")}
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
