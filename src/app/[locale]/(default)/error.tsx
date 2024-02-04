'use client'

// Error components must be Client Components

import {useEffect} from 'react'

import ErrorComponent from '@/components/ui/error'

export default function Error({
  children,
  error,
  reset
}: {
  children?: React.ReactNode
  error: Error & {digest?: string}
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return <ErrorComponent reset={reset}>{children}</ErrorComponent>
}
