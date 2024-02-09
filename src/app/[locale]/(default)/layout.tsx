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
        postCount={pages?.results?.length || 0}
        bookmarkCount={bookmarks?.results?.length || 0}
      />
      <div
        id="contents"
        className="ease-expo-in-out relative flex max-h-screen flex-1 overflow-y-auto transition-all duration-500"
      >
        {children}
      </div>
    </div>
  )
}

// export const runtime = 'edge';
