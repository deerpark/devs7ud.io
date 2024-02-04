import {Sidebar} from '@/components/sidebar'

type DefaultLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function DefaultLayout({children}: DefaultLayoutProps) {
  return (
    <div className='relative flex size-full min-h-screen'>
      <Sidebar />
      <div className='flex flex-1'>{children}</div>
    </div>
  )
}

// export const runtime = 'edge';
