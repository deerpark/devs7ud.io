import { Sidebar } from "@/components/sidebar"
import { getPages } from "@/lib/notion"

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
  return (
    <div id="root" className="flex size-full h-screen">
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
  )
}

// export const runtime = 'edge';
