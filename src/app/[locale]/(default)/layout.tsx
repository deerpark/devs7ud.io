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
  return (
    <div className="flex size-full h-screen">
      <Sidebar postCount={pages?.results?.length || 0} />
      <div className="relative flex max-h-screen flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

// export const runtime = 'edge';
