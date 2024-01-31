"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { Toaster } from "@/components/ui/sonner"
import { Bootstrap } from "@/components/bootstrap"

export function ThemeProvider({ children, ...props }: ThemeProviderProps & {locale?: string;messages?: AbstractIntlMessages | undefined;}) {
  return (
    <NextThemesProvider {...props}>
      <TooltipProvider>
        <NextIntlClientProvider
          locale={props.locale}
          messages={props.messages}
        >
          {children}
          <TailwindIndicator />
          <Toaster />
          <Bootstrap />
        </NextIntlClientProvider>
      </TooltipProvider>
    </NextThemesProvider>
  )
}