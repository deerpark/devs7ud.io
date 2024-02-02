'use client'

import '@fortawesome/fontawesome-svg-core/styles.css'
import '@/styles/global.css'

import NextError from 'next/error'
import {useEffect} from 'react'

import ErrorComponent from '@/components/ui/error'
import * as Fonts from '@/lib/fonts'

export {metadata} from '@/lib/metadata'
export {viewport} from '@/lib/viewport'

export default function GlobalError(props: {
  error: Error & {digest?: string}
  reset: () => void
  params: {locale: string}
}) {
  useEffect(() => {
    console.error(props.error)
  }, [props.error])

  return (
    <html lang={props.params.locale}>
      <body className={Fonts.inter.className}>
        <ErrorComponent reset={props.reset}>
          {/* This is the default Next.js error component but it doesn't allow omitting the statusCode property yet. */}
          <NextError statusCode={undefined as any} />
        </ErrorComponent>
      </body>
    </html>
  )
}
