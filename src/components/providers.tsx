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

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps & {
  locale?: string
  messages?: AbstractIntlMessages | undefined
}) {
  return (
    <NextThemesProvider {...props}>
      <TooltipProvider>
        <NextIntlClientProvider locale={props.locale} messages={props.messages}>
          {children}
          <TailwindIndicator />
          <Toaster />
          <Bootstrap />
        </NextIntlClientProvider>
      </TooltipProvider>
    </NextThemesProvider>
  )
}
