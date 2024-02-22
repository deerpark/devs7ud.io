import MainLayout from "@/components/main/main-layout"
import { ThemeProvider } from "@/components/providers"
import { getMessages } from "next-intl/server"
import { currentUser } from "@clerk/nextjs"
import { getPages } from "@/lib/notion"
import { headers } from "next/headers"
import * as React from "react"

import "@/styles/global.css"

type DefaultLayoutProps = Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>

export default async function DefaultLayout({
  children,
  params,
}: DefaultLayoutProps) {
  const pages = await getPages(params.locale)
  const bookmarks = await getPages(params.locale, "bookmarks")
  const user = await currentUser()

  // Using internationalization in Client Components
  const messages = await getMessages()
  const headersList = headers()
  const url = headersList.get("Referer") || ""

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      url={url}
      enableSystem
      disableTransitionOnChange
      locale={params.locale}
      messages={messages}
      user={
        user
          ? {
              id: user.id,
              imageUrl: user.imageUrl,
              username: user.username,
              emailAddresses: user.emailAddresses,
            }
          : null
      }
    >
      <MainLayout
        counts={{
          posts: pages?.results?.length || 0,
          bookmarks: bookmarks?.results?.length || 0,
        }}
      >
        {children}
      </MainLayout>
    </ThemeProvider>
  )
}

// export const runtime = 'edge';
