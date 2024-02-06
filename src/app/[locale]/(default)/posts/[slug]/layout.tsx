import * as Fonts from "@/lib/fonts"

type PageLayoutProps = Readonly<{
  children: React.ReactNode
  params: { slug: string; locale: string }
}>

export default function PageLayout({ children, params }: PageLayoutProps) {
  console.log("post params", params)
  return <div className={Fonts.oaGothic.variable}>{children}</div>
}

// export const runtime = 'edge';
