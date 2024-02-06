import "@fortawesome/fontawesome-svg-core/styles.css"
import "@/styles/global.css"

import { config as faConfig } from "@fortawesome/fontawesome-svg-core"
import { unstable_setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { useMessages } from "next-intl"

import SkipToContent from "@/components/skip-to-content"
import { ThemeProvider } from "@/components/providers"
import * as Fonts from "@/lib/fonts"

export { metadata } from "@/lib/metadata"
export { viewport } from "@/lib/viewport"
import GoogleAnalytics from "@/components/google-analytics"
import { Bootstrap } from "@/components/bootstrap"
import { appConfig } from "@/config/app"
import { cn } from "@/lib/utils"

faConfig.autoAddCss = false

export function generateStaticParams() {
  return appConfig.locales.map((locale) => ({ locale }))
}

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  unstable_setRequestLocale(params.locale)

  // Validate that the incoming `locale` parameter is valid
  if (!appConfig.locales.includes(params.locale)) notFound()

  // Using internationalization in Client Components
  const messages = useMessages()

  return (
    <html lang={params.locale} className={cn(Fonts.inter.variable)}>
      <body>
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
        <Bootstrap />
        <GoogleAnalytics />
      </body>
    </html>
  )
}

// export const runtime = 'edge';
