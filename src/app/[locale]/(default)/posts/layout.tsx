import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

import { getTranslations, unstable_setRequestLocale } from "next-intl/server"
import { getPages, getUsers } from "@/lib/notion"
import Search from "@/components/search/search"
import { Posts } from "@/components/posts"
import { cookies } from "next/headers"
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
  const pages = await getPages(params.locale)
  const users = await getUsers()
  const t = await getTranslations()
  const layout = JSON.parse(
    cookies().get("react-resizable-panels:container")?.value || "[30, 70]"
  )

  return (
    <List
      title={
        <span className="ml-3 text-2xl font-black lg:text-base lg:font-semibold">
          {t("SYSTEM.navigation.index.posts")}
        </span>
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
            <div className="mx-3 flex flex-1">
              <span className="text-muted-foreground">{t("POSTS.empty")}</span>
            </div>
          </div>
        )
      }
      search={!params.slug ? <Search /> : undefined}
      layout={layout}
    >
      {children}
    </List>
  )
}

// export const runtime = 'edge';
