"use client"

import "@fortawesome/fontawesome-svg-core/styles.css"
import "@/styles/global.css"

import { unstable_setRequestLocale } from "next-intl/server"
import NextError from "next/error"
import { useEffect } from "react"

import { ThemeProvider } from "@/components/providers"
import ErrorComponent from "@/components/ui/error"
import { useMessages } from "next-intl"
import * as Fonts from "@/lib/fonts"
import { cn } from "@/lib/utils"

export { metadata } from "@/lib/metadata"
export { viewport } from "@/lib/viewport"

type GlobalErrorProps = Readonly<{
  error: Error & { digest?: string }
  reset: () => void
  params: { locale: string }
}>

export default function GlobalError(props: GlobalErrorProps) {
  unstable_setRequestLocale(props.params.locale)

  // Using internationalization in Client Components
  const messages = useMessages()

  useEffect(() => {
    console.error(props.error)
  }, [props.error])

  return (
    <html
      lang={props.params.locale}
      className={cn(
        Fonts.inter.variable,
        props.params.locale === "ko" ? Fonts.oaGothic.variable : ""
      )}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          locale={props.params.locale}
          messages={messages}
        >
          <ErrorComponent reset={props.reset} className="min-h-screen">
            {/* This is the default Next.js error component but it doesn't allow omitting the statusCode property yet. */}
            <NextError statusCode={undefined as any} />
          </ErrorComponent>
        </ThemeProvider>
      </body>
    </html>
  )
}
