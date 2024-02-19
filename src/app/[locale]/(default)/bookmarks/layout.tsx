import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

import { getTranslations, unstable_setRequestLocale } from "next-intl/server"
import { Bookmarks } from "@/components/bookmarks"
import Search from "@/components/search/search"
import { getPages } from "@/lib/notion"
import List from "@/components/list"
import * as React from "react"

type PageLayoutProps = Readonly<{
  children: React.ReactNode
  params: { locale: string; slug: string }
}>

export default async function PageLayout({
  children,
  params,
}: PageLayoutProps) {
  unstable_setRequestLocale(params.locale)
  const pages = await getPages(params.locale, "bookmarks")
  // console.log(pages)
  const t = await getTranslations()

  return (
    <div className="flex w-full">
      <List
        title={
          <span className="ml-3 text-2xl font-black lg:text-base lg:font-semibold">
            {t("SYSTEM.navigation.me.bookmarks")}
          </span>
        }
        contents={
          pages.results.length ? (
            <Bookmarks data={pages.results as PageObjectResponse[]} />
          ) : (
            <div id="list" className="min-h-screen w-full">
              <div className="mx-3 flex flex-1">
                <span className="text-muted-foreground">
                  {t("BOOKMARKS.empty")}
                </span>
              </div>
            </div>
          )
        }
        search={!params.slug ? <Search /> : undefined}
      >
        {children}
      </List>
    </div>
  )
}

// export const runtime = 'edge';
