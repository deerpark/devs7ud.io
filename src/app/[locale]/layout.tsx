import { config as faConfig } from "@fortawesome/fontawesome-svg-core"
import { unstable_setRequestLocale } from "next-intl/server"
import { frFR, koKR, enUS } from "@clerk/localizations"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { ClerkProvider } from "@clerk/nextjs"
import { notFound } from "next/navigation"
import { useMessages } from "next-intl"
import "@/styles/global.css"

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
    <ClerkProvider
      localization={
        params.locale === "fr" ? frFR : params.locale === "en" ? enUS : koKR
      }
    >
      <html
        lang={params.locale}
        className={cn(
          Fonts.inter.variable,
          params.locale === "ko" ? Fonts.oaGothic.variable : ""
        )}
      >
        <body className="overflow-hidden">
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
    </ClerkProvider>
  )
}

// export const runtime = 'edge';
