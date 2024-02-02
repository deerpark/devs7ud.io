import '@fortawesome/fontawesome-svg-core/styles.css'
import '@/styles/global.css'

import {config as faConfig} from '@fortawesome/fontawesome-svg-core'
import {notFound} from 'next/navigation'
import {useMessages} from 'next-intl'
import {unstable_setRequestLocale} from 'next-intl/server'

import LocaleSwitcher from '@/components/locale-switcher'
import {ThemeProvider} from '@/components/providers'
import {ThemeToggle} from '@/components/theme-toggle'
import * as Fonts from '@/lib/fonts'
import {AppConfig} from '@/utils/AppConfig'

export {metadata} from '@/lib/metadata'
export {viewport} from '@/lib/viewport'

faConfig.autoAddCss = false

export function generateStaticParams() {
  return AppConfig.locales.map((locale) => ({locale}))
}

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode
  params: {locale: string}
}>

export default function LocaleLayout({children, params}: LocaleLayoutProps) {
  unstable_setRequestLocale(params.locale)

  // Validate that the incoming `locale` parameter is valid
  if (!AppConfig.locales.includes(params.locale)) notFound()

  // Using internationalization in Client Components
  const messages = useMessages()

  return (
    <html lang='en'>
      <body className={Fonts.inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
          locale={params.locale}
          messages={messages}>
          <main className='flex min-h-screen flex-col items-center p-24'>
            <div className='flex flex-none items-center'>
              <p className='flex-none'>
                Get started by editing&nbsp;
                <code className='font-mono font-bold'>src/app/page.tsx</code>
              </p>
              <p className='flex-1' />
              <div className='flex flex-none items-center space-x-2'>
                <LocaleSwitcher />
                <ThemeToggle />
              </div>
            </div>
            {children}
            <div className='flex-none'>
              &copy; DEVS7UD.IO {new Date().getFullYear()}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

// export const runtime = 'edge';
