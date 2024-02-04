type PageLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function PageLayout({children}: PageLayoutProps) {
  return children
}

// export const runtime = 'edge';
