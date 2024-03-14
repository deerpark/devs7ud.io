type PageLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default async function PageLayout({ children }: PageLayoutProps) {
  return <div className="">{children}</div>
}

// export const runtime = 'edge';
