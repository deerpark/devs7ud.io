type PageLayoutProps = Readonly<{
  children: React.ReactNode
  params: { slug: string; locale: string }
}>

import "@/styles/prism-theme.css"
import "@/styles/notion.css"

export default function PageLayout({ children, params }: PageLayoutProps) {
  console.log("post params", params)
  return children
}

// export const runtime = 'edge';
