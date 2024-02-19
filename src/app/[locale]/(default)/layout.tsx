import { ThemeProvider } from "@/components/providers"
import { currentUser } from "@clerk/nextjs/server"
import { Sidebar } from "@/components/sidebar"
import { getMessages } from "next-intl/server"
import { getPages } from "@/lib/notion"
import { headers } from "next/headers"

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
      user={user}
    >
      <div id="root" className="flex size-full min-h-screen">
        <Sidebar
          counts={{
            posts: pages?.results?.length || 0,
            bookmarks: bookmarks?.results?.length || 0,
          }}
        />
        <div
          id="contents"
          className="relative flex max-h-screen flex-1 overflow-y-auto"
        >
          {children}
        </div>
      </div>
    </ThemeProvider>
  )
}

// export const runtime = 'edge';
