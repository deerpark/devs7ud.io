import "@fortawesome/fontawesome-svg-core/styles.css"
import "@/styles/global.css"

import { config as faConfig } from "@fortawesome/fontawesome-svg-core"
import { unstable_setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { useMessages } from "next-intl"

import SkipToContent from "@/components/skip-to-content"
import { ThemeProvider } from "@/components/providers"
import { AppConfig } from "@/config/app"
import * as Fonts from "@/lib/fonts"

export { metadata } from "@/lib/metadata"
export { viewport } from "@/lib/viewport"

faConfig.autoAddCss = false

export function generateStaticParams() {
  return AppConfig.locales.map((locale) => ({ locale }))
}

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  unstable_setRequestLocale(params.locale)

  // Validate that the incoming `locale` parameter is valid
  if (!AppConfig.locales.includes(params.locale)) notFound()

  // Using internationalization in Client Components
  const messages = useMessages()

  return (
    <html lang="en">
      <body className={Fonts.inter.className}>
        <SkipToContent />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          locale={params.locale}
          messages={messages}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

// export const runtime = 'edge';
