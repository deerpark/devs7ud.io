import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import FloatingMenu from "@/components/floating-menu"

import { getTranslations, unstable_setRequestLocale } from "next-intl/server"
import { getPages, getUsers } from "@/lib/notion"
import { Posts } from "@/components/posts"
import * as React from "react"

type PageLayoutProps = Readonly<{
  params: { locale: string; slug: string }
}>

export default async function PostsPage({ params }: PageLayoutProps) {
  unstable_setRequestLocale(params.locale)
  const pages = await getPages(params.locale)
  const users = await getUsers()
  const t = await getTranslations()
  return (
    <>
      {pages.results.length ? (
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
      )}
      <FloatingMenu />
    </>
  )
}
