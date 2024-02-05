import { Sidebar } from "@/components/sidebar"

type DefaultLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="flex size-full h-screen">
      <Sidebar />
      <div className="relative flex max-h-screen flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

// export const runtime = 'edge';
