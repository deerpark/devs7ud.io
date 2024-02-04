'use client'

import {TooltipProvider} from '@radix-ui/react-tooltip'
import type {AbstractIntlMessages} from 'next-intl'
import {NextIntlClientProvider} from 'next-intl'
import {ThemeProvider as NextThemesProvider} from 'next-themes'
import type {ThemeProviderProps} from 'next-themes/dist/types'
import * as React from 'react'

import {Bootstrap} from '@/components/bootstrap'
import {TailwindIndicator} from '@/components/tailwind-indicator'
import {Toaster} from '@/components/ui/sonner'

const globalNavigationContext = {
  isOpen: false,
  setIsOpen: (_: boolean) => {}
}

export const GlobalNavigationContext = React.createContext(
  globalNavigationContext
)

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps & {
  locale?: string
  messages?: AbstractIntlMessages | undefined
}) {
  const initialState = {
    isOpen: false,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setIsOpen
  }

  const [state, setState] = React.useState(initialState)

  function setIsOpen(isOpen: boolean) {
    return setState({...state, isOpen})
  }

  return (
    <NextThemesProvider {...props}>
      <TooltipProvider>
        <NextIntlClientProvider locale={props.locale} messages={props.messages}>
          <GlobalNavigationContext.Provider value={state}>
            {children}
          </GlobalNavigationContext.Provider>
          <TailwindIndicator />
          <Toaster />
          <Bootstrap />
        </NextIntlClientProvider>
      </TooltipProvider>
    </NextThemesProvider>
  )
}
