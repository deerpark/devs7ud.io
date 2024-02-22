"use client"

import * as React from "react"

type BetaContainerProps = {} & React.PropsWithChildren

export default function BetaContainer({ children }: BetaContainerProps) {
  return (
    <div
      id="main"
      className="relative flex max-h-screen w-full flex-1 flex-col overflow-y-auto"
    >
      <div className="space-y-1 p-3">{children}</div>
    </div>
  )
}
