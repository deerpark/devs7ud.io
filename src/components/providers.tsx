"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import type { AbstractIntlMessages } from "next-intl"
import { NextIntlClientProvider } from "next-intl"
import * as React from "react"

import { TailwindIndicator } from "@/components/tailwind-indicator"
import { Toaster } from "@/components/ui/sonner"
import { User } from "@clerk/nextjs/server"
import { env } from "@/lib/env"

const globalNavigationContext = {
  isOpen: false,
  setIsOpen: (_: boolean) => {},
  url: env.NEXT_PUBLIC_HOST,
  user: null as User | null,
}

export const GlobalNavigationContext = React.createContext(
  globalNavigationContext
)

export function ThemeProvider({
  children,
  url,
  user,
  ...props
}: ThemeProviderProps & {
  locale?: string
  url: string
  messages?: AbstractIntlMessages | undefined
  user: User | null
}) {
  const initialState = {
    isOpen: false,
    setIsOpen,
    url,
    user,
  }

  const [state, setState] = React.useState(initialState)

  function setIsOpen(isOpen: boolean) {
    return setState({ ...state, isOpen })
  }

  return (
    <NextThemesProvider {...props}>
      <TooltipProvider>
        <NextIntlClientProvider
          locale={props.locale}
          messages={props.messages}
          timeZone="Asia/Seoul"
        >
          <GlobalNavigationContext.Provider value={state}>
            {children}
          </GlobalNavigationContext.Provider>
          <TailwindIndicator />
          <Toaster />
        </NextIntlClientProvider>
      </TooltipProvider>
    </NextThemesProvider>
  )
}
