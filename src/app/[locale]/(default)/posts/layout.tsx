type PageLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function PageLayout({children}: PageLayoutProps) {
  return <div className='flex w-full'>{children}</div>
}

// export const runtime = 'edge';
