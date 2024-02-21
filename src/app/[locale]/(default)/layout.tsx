import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ThemeProvider } from "@/components/providers"
import { Sidebar } from "@/components/sidebar"
import { getMessages } from "next-intl/server"
import { currentUser } from "@clerk/nextjs"
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
      user={
        user
          ? { id: user.id, imageUrl: user.imageUrl, username: user.username }
          : null
      }
    >
      <ResizablePanelGroup
        direction="horizontal"
        id="root"
        className="flex size-full min-h-screen items-stretch lg:overflow-hidden"
      >
        <Sidebar
          counts={{
            posts: pages?.results?.length || 0,
            bookmarks: bookmarks?.results?.length || 0,
          }}
        />
        <ResizablePanel defaultSize={50}>
          <div
            id="contents"
            className="relative flex flex-1 lg:max-h-screen lg:overflow-y-auto"
          >
            {children}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ThemeProvider>
  )
}

// export const runtime = 'edge';
